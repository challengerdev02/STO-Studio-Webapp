import { MainLoader, TokenAsset } from '@/components';
import { useAccount, useExternalResource, useSale, useUIState } from '@/hooks';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import { get } from 'lodash';
import { useContract, useERC20Token } from '../../../blockchain/evm/hooks';
import { signOffer, toEther } from '../../../blockchain/evm/utils';
import { BaseWeb3Context } from '../../../blockchain/base';
import { Offer } from '@/components/isomorphic/offers';
import { UserNamespace } from '@/shared/namespaces/user';
import Web3 from 'web3';
import { add } from 'date-fns';
import { notification } from 'antd';
import { debugLog, parseIpfsUrl } from '@/shared/utils';
import { nanoid } from 'nanoid';
import { GetFee } from '@/components/account/fee';
import { STATE_KEYS } from '@/shared/constants';
import { Connection } from '@solana/web3.js';
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from '@nfteyez/sol-rayz';

export const TokenAssetContainerKey = '@@token-asset-container';
export const TokenAssetContainer = () => {
  // Keys
  const collection = new Connection(
    'https://try-rpc.mainnet.solana.blockdaemon.tech/'
  );
  const contractUIKey = `${TokenAssetContainerKey}/mc-trader-contract`;
  const findAccountUIKey = `${TokenAssetContainerKey}/find-account`;
  const getTokenMetadataUIKey = `${TokenAssetContainerKey}/get-token-metadata`;
  const getTokenActivityKey = `${TokenAssetContainerKey}/get-token-activity`;
  const getTokenPriceHistory = `${TokenAssetContainerKey}/get-token-price-history`;
  const createOfferUIKey = `${TokenAssetContainerKey}/make-offer`;
  const acceptOfferUIKey = `${TokenAssetContainerKey}/accept-offer`;
  const getAllOffersUIKey = `${TokenAssetContainerKey}/get-all-offer`;
  const [metadata, setMetadata] = useState<{
    address: string;
    title: string;
    description: string;
    image: string;
    attributes: any;
  }>();
  const {
    query: { saleID, tokenHash, tokenID, chooseFee, owner: ownerAddress },
    ...router
  } = useRouter();

  const { accounts, isConnected, provider, chainId } =
    useContext(BaseWeb3Context);

  const {
    getSaleAsset,
    getTokenActivity,
    tokenActivity,
    createOffer,
    getAllOffers,
    offers,
  } = useSale({ key: TokenAssetContainerKey });

  const asset = Object.assign(
    {},
    {
      asset: {},
      tokenId: tokenID,
      assetAddress: tokenHash,
      blockchain: chainId,
    }
  );

  const [feeModalVisibility, setFeeModalVisibility] = useState(!!chooseFee);
  const { handleFindOneAccount: findOneAccount, search: searchAccounts } =
    useAccount({ key: TokenAssetContainerKey });
  const { handleFindOneAccount: findCreatorAccount } = useAccount({
    key: TokenAssetContainerKey + 'creator',
  });

  const { uiLoaders, pagination } = useUIState();

  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [previewVisibility, setPreviewVisibility] = useState<boolean>(false);

  const [offerVisibility, setOfferVisibility] = useState<boolean>(false);

  const [biddingToken, setBiddingToken] = useState<Record<string, any>>({});

  const erc20TokenKey = `@@bidding-token/${biddingToken.symbol}`;

  const {
    getTokenBalance,
    getTokenAllowance,
    approveToken,
    contract: biddingTokenContract,
  } = useERC20Token({
    contractAddress: biddingToken.address,
    options: {
      key: erc20TokenKey,
    },
  });

  const { user } = useAccount({
    key: STATE_KEYS.currentUser,
    autoFetch: true,
  });

  const {
    call: bookContractCall,
    // contract,
    // verifyChain,
  } = useContract({
    address: tokenHash as string,
    options: { uiKey: contractUIKey },
    abiName: 'ERC721',
  });
  const { contract: dataContract } = useContract({
    address: process.env.NEXT_PUBLIC_DATA_CONTRACT_ADDRESS,
    options: { uiKey: contractUIKey },
  });

  const { send: traderContractSend } = useContract({
    address: process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS,
    options: { uiKey: contractUIKey, key: TokenAssetContainerKey },
  });

  const { getExternalResource, resource } = useExternalResource({
    key: TokenAssetContainerKey,
  });

  const walletAddress = (accounts ?? [])[0];

  // UI Loading and Pagination State
  const loading =
    uiLoaders[TokenAssetContainerKey] ||
    uiLoaders[findAccountUIKey] ||
    uiLoaders[getTokenMetadataUIKey];
  const mcTraderContractLoader = uiLoaders[contractUIKey];
  const gettingTokenActivity = uiLoaders[getTokenActivityKey];
  const gettingTokenPriceHistory = uiLoaders[getTokenPriceHistory];
  const makingOffer = uiLoaders[createOfferUIKey];
  const gettingAllOffers = uiLoaders[getAllOffersUIKey];

  const queryingContract = uiLoaders[erc20TokenKey];

  const offersPagination = pagination[getAllOffersUIKey];

  const onBiddingTokenChange = (token: Record<string, any>) => {
    setBiddingToken(token);
  };

  const onGetTokenActivity = (params = {}) => {
    getTokenActivity(
      tokenHash as string,
      tokenID as string,
      chainId as number,
      Object.assign({}, { uiKey: `${getTokenActivityKey}`, params })
    );
  };

  const onGetAssets = () => {
    if (saleID || tokenHash) {
      const query: Record<string, any> = {};
      if (saleID) {
        query.saleId = saleID;
      }
      if (tokenHash) {
        query.assetAddress = tokenHash;
      }

      getSaleAsset({
        params: query,
      });
    }
  };

  const onPreviewBook = (visibility: boolean) => {
    setPreviewVisibility(visibility);
  };

  const onToggleOfferUI = (visibility: boolean) => {
    setOfferVisibility(visibility);
  };

  const onGetTokenIDMetadata = () => {
    //  onGetTokenOwner();

    const onTokenURIFinish = (url: any) => {
      //prettier-ignore
      console.log('URRRRRRL', url)

      getExternalResource(parseIpfsUrl(url), {
        uiKey: getTokenMetadataUIKey,
        headers: new Headers(),
      });
    };

    // Get URI
    bookContractCall(
      'tokenURI',
      {
        onFinish: onTokenURIFinish,
        uiKey: getTokenMetadataUIKey,
      },
      tokenID
    );
  };

  const onGetOffers = (params = {}, others = {}) => {
    getAllOffers({
      params: Object.assign(
        {},
        {
          saleId: saleID,
          population: JSON.stringify(['user']),
        },
        params
      ),
      ...others,
    });
  };

  const onPaginateOffers = (page: number, perPage: number) => {
    onGetOffers({ page, perPage }, { uiKey: getAllOffersUIKey });
  };

  const onSignOffer = (values: Record<string, any>) => {
    const amount = new Web3().utils.toWei(values.amount);
    const expirationDuration = values.expirationDuration;
    let expirationDate: Date;
    if (expirationDuration != 0) {
      expirationDate = add(new Date(), {
        days: expirationDuration,
      });
      expirationDate.setHours(
        values.expirationDate?.hours?.() ?? 0,
        values.expirationDate?.minutes?.() ?? 0,
        0,
        0
      );
    } else {
      expirationDate = new Date(values.expirationDate?.toDate() ?? new Date());
    }

    const offerProperties = {
      expiry: Math.floor(new Date(expirationDate).getTime() / 1000),
      price: amount,
      token: tokenHash as string,
      tokenId: tokenID as string,
      offerId: `offer:${nanoid()}`,
      // biddingToken: biddingToken.address,
    };

    const requestObject: Record<string, any> = {
      ...offerProperties,
      biddingToken: biddingToken.address,
      price: amount,
    };

    const onFinishedOffer = () => {
      onToggleOfferUI(false);
      onGetOffers({}, { uiKey: getAllOffersUIKey });
    };

    const onSignOfferFinish = (err: any, signedOffer: Record<string, any>) => {
      if (err || signedOffer.error) {
        notification.error({
          message: 'Oops!',
          description: err?.message ?? signedOffer?.error?.message,
          placement: 'bottomLeft',
        });
        return;
      }

      requestObject.signature = signedOffer.result;
      debugLog('Sale')({ ...values, ...requestObject });
      createOffer(requestObject, {
        uiKey: createOfferUIKey,
        onFinish: onFinishedOffer,
      });
    };
    signOffer(
      provider,
      walletAddress,
      chainId as number,
      offerProperties,
      onSignOfferFinish
    );
    // //console.log(values, { amount, biddingToken, expirationDate });
  };

  const onPlaceOffer = (values: Record<string, any>) => {
    if (!isConnected && !/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`);
      return;
    }
    // verifyChain(asset['blockChain'], () => onSignOffer(values));

    onSignOffer(values);
    // //console.log(values);
  };

  const onCreateSale = () => {
    if (!isConnected && !/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`);
      return;
    }
    router.push(`/assets/t/${tokenHash}/${tokenID}/sale`);
  };

  // useEffect(() => {
  //   if (asset?.blockChain && asset?._id) {
  //     const chain =
  //       SUPPORTED_NETWORKS[asset.blockChain] ??
  //       SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID as string];
  //
  //     onBiddingTokenChange(chain.usdToken);
  //   }
  // }, [asset?._id, asset.blockChain]);

  const onAcceptOffer = (values: Record<string, any>) => {
    const args = [
      {
        tokenId: get(values, 'tokenId'),
        token: get(values, 'token'),
        price: get(values, 'price'),
        expiry: get(values, 'expiry'),
        offerId: get(values, 'offerId'),
      },
      get(values, 'address'),
      get(values, 'offerSignature'),
    ];

    const contractOptions = {
      from: walletAddress,
    };
    const actionOptions = {
      uiKey: `${acceptOfferUIKey}/${get(values, 'offerSignature')}`,
      onFinish: () => {
        // onGetTokenOwner();
      },
      successMessage: `Offer from ${get(values, 'address')} for ${toEther(
        get(values, 'price', '0')
      )} accepted successfully`,
    };
    traderContractSend('acceptOffer', contractOptions, actionOptions, ...args);
  };

  useEffect(() => {
    if (resource) {
      console.log('RESOURCE', resource);
      findCreatorAccount({
        params: {
          walletAddress: get(
            resource,
            [TokenAssetContainerKey, 'creator'],
            null
          ),
        },
        uiKey: findAccountUIKey,
      });
    }
  }, [resource]);

  useEffect(() => {
    onGetAssets();
    if (tokenHash && isConnected) {
      onGetTokenIDMetadata();
      // onGetTokenActivity();
      // onGetPriceHistory();
    }
    setIsOwner(
      walletAddress?.toLowerCase() == String(ownerAddress).toLowerCase()
    );
  }, [saleID, tokenHash, walletAddress, tokenID, isConnected]);

  useEffect(() => {
    if (isConnected && biddingToken.symbol) {
      getTokenBalance(walletAddress);
      getTokenAllowance(walletAddress);
    }
  }, [biddingToken.symbol, isConnected]);

  useEffect(() => {
    if (walletAddress) {
      onGetOffers();
      findOneAccount({
        params: { walletAddress: ownerAddress },
        uiKey: findAccountUIKey,
      });
    }
  }, [walletAddress, isConnected]);

  if (loading) {
    return (
      <div style={{ height: '50vh' }} className={'meta-flex-center meta-flex'}>
        <MainLoader height={40} width={40} />
      </div>
    );
  }

  const assetOwner = searchAccounts(TokenAssetContainerKey);
  const assetCreator = searchAccounts(TokenAssetContainerKey + 'creator');
  if (!metadata?.image) {
    resolveToWalletAddress({
      text: String(ownerAddress),
    }).then((publicAddress) => {
      getParsedNftAccountsByOwner({
        publicAddress,
        connection: collection,
      }).then(async (nftArray) => {
        for (const item of nftArray) {
          if (item.mint === String(tokenHash)) {
            const r = await fetch(item.data.uri).then((resp) => resp.json());
            var attributes = [];
            for (const r_item of r.attributes) {
              attributes.push({
                title: r_item.trait_type,
                value: r_item.value,
                data_type: r_item.trait_type,
              });
            }
            setMetadata({
              image: r.image,
              address: item.mint,
              title: item.data.name,
              description: r.description,
              attributes: attributes,
            });
          }
        }
      });
    });
  }

  const blockchainAssetMetadata = {
    title: metadata?.title,
    infoLink: get(resource, [TokenAssetContainerKey, 'infoLink'], ''),
    coverImage: metadata?.image,
    thumbnail: metadata?.image,
    genres: get(resource, [TokenAssetContainerKey, 'genres'], []),
    ageRating: get(resource, [TokenAssetContainerKey, 'contentRating'], []),
    artists: get(resource, [TokenAssetContainerKey, 'artists'], []),
    blockChain: get(resource, [TokenAssetContainerKey, 'chainId'], chainId),
    type: get(resource, [TokenAssetContainerKey, 'type'], 'Book'),
    pages: get(resource, [TokenAssetContainerKey, 'pages'], undefined),
    attributes: metadata?.attributes,
    description: metadata?.description,
    user: assetOwner as UserNamespace.User,
    creator: assetCreator as UserNamespace.User,
    isOwner,
    price: 0,
  };

  asset.asset = Object.assign({}, asset.asset, blockchainAssetMetadata);
  // console.log('ASSETTTT', asset?.asset)
  // asset.blockchain = blockchainAssetMetadata.blockChain;

  return (
    <Fragment>
      <Offer
        walletAddress={walletAddress as string}
        onVisibilityChange={onToggleOfferUI}
        visibility={offerVisibility}
        onPlaceOffer={onPlaceOffer}
        offerToken={{
          ...biddingToken,
          balance: get(biddingTokenContract, 'balanceOf'),
          allowance: get(biddingTokenContract, 'allowance'),
        }}
        onOfferTokenChange={onBiddingTokenChange}
        approveToken={approveToken}
        queryingContract={queryingContract || makingOffer}
        initialValues={{
          amount: toEther('0'),
          token: biddingToken.symbol,
        }}
      />
      <GetFee
        chainId={String(chainId)}
        contractAddress={String(tokenHash)}
        tokenId={Number(tokenID)}
        visibility={feeModalVisibility}
        onVisibilityChange={(visible: boolean) =>
          setFeeModalVisibility(visible)
        }
        user={user}
        account={accounts?.[0]}
        onPay={(data) => console.log(data)}
      />

      <TokenAsset
        {...asset}
        onPreviewBook={onPreviewBook}
        previewVisibility={previewVisibility}
        onToggleOfferUI={onToggleOfferUI}
        onCreateSale={onCreateSale}
        queryingContract={queryingContract || mcTraderContractLoader}
        tokenId={tokenID as string}
        contractAddress={String(tokenHash)}
        tokenActivity={tokenActivity}
        gettingTokenActivity={gettingTokenActivity}
        gettingTokenPriceHistory={gettingTokenPriceHistory}
        priceHistory={dataContract['getTokenPurchaseHistory']}
        onGetTokenActivity={onGetTokenActivity}
        gettingAllOffers={gettingAllOffers}
        offers={offers}
        offersPagination={offersPagination}
        onPaginateOffers={onPaginateOffers}
        onAcceptOffer={onAcceptOffer}
        onFeeVisibilityChange={(visible: boolean) =>
          setFeeModalVisibility(visible)
        }
        uiLoaders={uiLoaders}
      />
    </Fragment>
  );
};
