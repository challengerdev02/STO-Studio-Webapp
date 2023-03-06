import { MainLoader, SaleScheduling } from '@/components';
import {
  useBook,
  useBookSaleSchedule,
  useExternalResource,
  useUIState,
} from '@/hooks';
import { useRouter } from 'next/router';
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { get, has } from 'lodash';
import { Web3Namespace } from '../../../blockchain/evm/namespaces';
import {
  objectId,
  signSale,
  SUPPORTED_NETWORKS,
  toEther,
} from '../../../blockchain/evm/utils';
import { BaseWeb3Context } from '../../../blockchain/base';
import Web3 from 'web3';
import { nanoid } from 'nanoid';
import { Modal, notification } from 'antd';
import { useContract } from '../../../blockchain/evm/hooks';
import { debugLog, isURI } from '@/shared/utils';
import { instance } from '@/shared/utils/api';
import { toBN } from 'web3-utils';

export enum SaleScheduleType {
  Resale = 'resale',
  Initial = 'initial',
}

export enum SaleAssetType {
  Book = 'book',
  Scene = 'scene',
  Character = 'character',
}
interface SaleScheduleContainerProps {
  scheduleType?: SaleScheduleType;
  saleAssetType?: SaleAssetType;
}
export const SaleScheduleContainer = (props: SaleScheduleContainerProps) => {
  const { scheduleType = SaleScheduleType.Initial } = props;
  const [firstTimeFee, setFirstTimeFee] = useState<string>('0');

  const key = '@@create-book-schedule-container';
  const contractUIKey = `${key}/proxy-contract`;
  const scheduleSaleKey = `${key}/create`;
  const findTokenOwnerUIKey = `${key}/token-owner`;
  const getTokenMetadataKey = `${key}/token-metadata`;
  const router = useRouter();
  const { assetID, tokenID, tokenHash } = router.query;
  const {
    provider,
    accounts,
    chainId,
    isConnected,
    verifyChain: verifyWeb3Chain,
  } = useContext(BaseWeb3Context);

  const walletAddress = accounts && accounts[0];

  const { send: proxyContractSend, call: proxyContractCall } = useContract({
    address: process.env.NEXT_PUBLIC_MC_PROXY_REGISTRY_ADDRESS,
    options: { uiKey: contractUIKey },
  });

  const [selectedForm, setSelectedForm] = useState(
    Web3Namespace.SaleTypeEnumString.BuyNow as string
  );

  const { uiLoaders } = useUIState();

  const loading = uiLoaders[key];
  const queryingContract = uiLoaders[contractUIKey];
  const schedulingSale = uiLoaders[scheduleSaleKey];
  const findingTokenOwner = uiLoaders[findTokenOwnerUIKey];
  const gettingMetadata = uiLoaders[getTokenMetadataKey];

  const [loadingAsset, setLoaddingAsset] = useState(false);

  const optionsObject = {
    onFinish: (record: Record<string, any>) => {
      if (scheduleType === SaleScheduleType.Initial) {
        router.push(`/assets/${get(record, 'asset._id')}`).then();
        return;
      }

      router
        .push(`/collection/${walletAddress}/${tokenHash}/${tokenID}`)
        .then();
    },
  };

  const { handleCreateBookSaleSchedule } = useBookSaleSchedule({
    key,
    options: optionsObject,
  });
  const { book, handleGetBook } = useBook({ key });

  const { call: bookContractCall, contract } = useContract({
    address: tokenHash as string,
    options: { uiKey: contractUIKey },
    abiName: 'Book',
  });

  const { getExternalResource, resource } = useExternalResource({ key });

  const isOwner =
    has(contract, 'balanceOf') &&
    walletAddress &&
    toBN(contract['balanceOf']).gtn(0);

  const onQueryTokenFromBlockchain = () => {
    // Find Token Owner
    bookContractCall(
      'balanceOf',
      { uiKey: findTokenOwnerUIKey },
      walletAddress,
      tokenID
    );

    const onTokenURIFinish = (url: any) => {
      if (url && isURI(url)) {
        //prettier-ignore
        getExternalResource(url, { key: getTokenMetadataKey, headers: new Headers() });
      }
    };

    // Get Token URI
    bookContractCall(
      'uri',
      {
        onFinish: onTokenURIFinish,
        uiKey: getTokenMetadataKey,
      },
      tokenID
    );
  };

  const onGetAsset = () => {
    if (
      scheduleType === SaleScheduleType.Resale &&
      tokenID &&
      tokenHash &&
      isConnected &&
      provider
    ) {
      onQueryTokenFromBlockchain();
      return;
    }

    if (assetID) {
      handleGetBook(assetID?.toString() ?? '');
    }
  };

  useEffect(() => {
    onGetAsset();
  }, [assetID, tokenID, tokenHash, isConnected, provider]);

  const onSignSale = useCallback(
    (values: any) => {
      if (tokenHash && tokenID) {
        setLoaddingAsset(true);
        instance({
          method: 'get',
          url: `/sale-options/get-asset/${tokenHash}/${tokenID}/${
            values.blockchain ?? chainId
          }`,
          data: null,
          params: null,
          isExternal: true,
        } as any)
          .then((v) => {
            values.assetId = v.data.asset._id;
            values.assetType = v.data.assetType;
            values.token = tokenHash;
            values.tokenId = tokenID;
            generateSignatureData(values);
            setLoaddingAsset(false);
          })
          .catch((_: any) => {
            setLoaddingAsset(false);
          });
      } else {
        values.assetType = 'Book';
        values.tokenId = '0';
        values.assetId = get(book, '_id', objectId());
        generateSignatureData(values);
      }
    },
    [book, provider, chainId]
  );

  const generateSignatureData = (values: any) => {
    const endDate = Math.floor(new Date(values.endDate).getTime() / 1000);
    const startDate = Math.floor(new Date(values.startDate).getTime() / 1000);

    values.royalty = Number(values.royalty);
    values.price = Number(values.price);
    values.maxSupply = Number(values.maxSupply);
    values.blockchain = String(values.blockchain ?? chainId);

    const signatureObject: Web3Namespace.ISale = {
      seller: walletAddress,
      token: values.token ?? process.env.NEXT_PUBLIC_ADDRESS_ZERO,
      tokenId: values.tokenId,
      saleId: nanoid(),
      assetId: values.assetId,
      maxSupply: get(values, 'maxSupply', 1).toString(),
      price: Web3.utils.toWei(String(get(values, 'price', 1))),
      endDate,
      startDate,
      royalty: Math.floor(get(values, 'royalty', 0) * 100).toString(),
      saleType: Web3Namespace.SaleTypeEnum[
        get(values, 'saleType', 'BuyNow')
      ] as unknown as Web3Namespace.SaleTypeEnum,
      assetType: get(Web3Namespace.AssetTypeEnum, values.assetType),
      mint: true,
    };

    if (tokenID && tokenHash && scheduleType === SaleScheduleType.Resale) {
      signatureObject.token = tokenHash as string;
      signatureObject.tokenId = tokenID as string;
      //  signatureObject.data = '';
      signatureObject.mint = false;
    }

    const saleObject: Record<string, any> = {
      // salesType: Web3Namespace.SaleTypeEnumString.BuyNow,
      assetType: values.assetType,
      assetId: signatureObject.assetId,
      asset: signatureObject.assetId,
      mint: signatureObject.mint,
      token: signatureObject.token,
      tokenId: signatureObject.tokenId,
      data: String(book?._id ?? ''),
      symbol: get(book, 'title', 'Metacomics').substring(0, 2).toLowerCase(),
      proxyAddress: process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS,
      proxyRegistry: process.env.NEXT_PUBLIC_MC_PROXY_REGISTRY_ADDRESS,
      saleId: signatureObject.saleId,
      endDate,
      startDate,
      price: signatureObject.price,
      maxSupply: get(values, 'maxSupply', 1),
      royalty: get(values, 'royalty', 0),
    };
    // if (tokenID && tokenHash && scheduleType === SaleScheduleType.Resale) {
    //   saleObject.asset = String(tokenHash);
    // }

    const onCreateSaleFinish = () => {
      router.push(`/assets/${saleObject.asset}/${saleObject.saleId}`).then();
    };

    signSale(
      provider,
      String(walletAddress),
      Number(values.blockchain ?? chainId),
      signatureObject,
      (err, result) => {
        if (err || result.error) {
          notification.error({
            message: 'Oops!',
            description: err?.message ?? result?.error?.message,
            placement: 'bottomLeft',
          });
          return;
        }
        saleObject.signature = result.result;
        debugLog('Sale')({ ...values, ...saleObject });
        handleCreateBookSaleSchedule(
          {
            ...values,
            ...saleObject,
          },
          { uiKey: scheduleSaleKey, onFinish: onCreateSaleFinish }
        );
      }
    );
  };

  const addProxy = (values: any) => {
    const args = [process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS];
    proxyContractSend(
      'addProxy',
      { from: walletAddress },
      {
        onFinish: () => {
          onSignSale(values);
        },
      },
      ...args
    );
  };

  const onVerifyProxy = (values: any) => {
    const args = [
      walletAddress,
      process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS,
    ];
    const options = {
      onFinish: (isApproved: any) => {
        if (!isApproved) {
          const chain = get(SUPPORTED_NETWORKS, [chainId ?? 1]);
          Modal.info({
            title: 'First time fee',
            content: (
              <span>
                You&apos;ll be charge a one time fee of{' '}
                <b>
                  {firstTimeFee} {chain.nativeCurrency.symbol}
                </b>{' '}
                to begin selling with this address
              </span>
            ),
            onOk: () => {
              addProxy(values);
            },
            okButtonProps: {
              shape: 'round',
              size: 'small',
            },
            maskClosable: true,
            onCancel: () => {},
          });

          return;
        }
        onSignSale(values);
      },
    };
    proxyContractCall('isApproved', options, ...args);
  };

  const onGetFirstTimeFee = () => {
    const options = {
      onFinish: (fee: any) => {
        setFirstTimeFee(toEther(fee ?? '0'));
        // //console.log(`%cFEE:: ${fee}`, 'color:pink;font-size:20px');
      },
    };
    proxyContractCall('fee', options, ...[]);
  };

  const onScheduleSale = (values: any) => {
    if (!isConnected && !/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`).then();
      return;
    }
    if (!values.blockchain) values.blockchain = chainId;
    if (values.blockchain !== chainId) {
      const chain = SUPPORTED_NETWORKS[values.blockchain ?? chainId];
      verifyWeb3Chain(
        values.blockchain ?? chainId,
        [chain.rpcURL!],
        chain.name!,
        chain.nativeCurrency,
        [chain.explorerURL],
        () => {
          onGetFirstTimeFee();
          onVerifyProxy(values);
        }
      ).catch((reason) => {
        notification.error({
          message: reason.message,
          placement: 'bottomLeft',
          duration: 4,
        });
      });
      return;
    }

    onGetFirstTimeFee();
    onVerifyProxy(values);
  };

  const onFormTypeChange = (formType: string) => {
    setSelectedForm(formType);
  };
  // fixed server rending issues
  if (typeof window === 'undefined') return <Fragment />;
  // fixed server rending issues

  if (
    loading ||
    (!book?._id && scheduleType === SaleScheduleType.Initial) ||
    (findingTokenOwner && scheduleType === SaleScheduleType.Resale) ||
    (gettingMetadata && scheduleType === SaleScheduleType.Resale) ||
    !isConnected
  ) {
    return (
      <div style={{ height: '50vh' }} className={'meta-flex-center meta-flex'}>
        <MainLoader height={40} width={40} />
      </div>
    );
  }

  const title = book?.title ?? get(resource, [getTokenMetadataKey, 'name'], '');

  return (
    <SaleScheduling
      title={`${title}${tokenID ? ` - Token #${tokenID}` : ''}`}
      onFinish={onScheduleSale}
      onFormTypeChange={onFormTypeChange}
      selectedForm={selectedForm}
      loading={loadingAsset || schedulingSale || queryingContract}
      disabled={scheduleType === SaleScheduleType.Resale ? !isOwner : false}
      scheduleType={scheduleType}
      currentChainId={chainId}
    />
  );
};
