import { MainLoader } from '@/components';
import { useAccount, useSale, useUIState } from '@/hooks';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import { ViewSaleAsset } from '@/components/sale/view';
import { Bidding } from '@/components/isomorphic/bidding';
import { get, has } from 'lodash';
import { useContract, useERC20Token } from '../../../blockchain/evm/hooks';
import {
  fixDecimals,
  getProvider,
  signBid,
  SUPPORTED_NETWORKS,
  toEther,
} from '../../../blockchain/evm/utils';
import { BaseWeb3Context } from '../../../blockchain/base';
import Web3 from 'web3';
import { notification } from 'antd';
import { Offer } from '@/components/isomorphic/offers';
import { Web3Namespace } from '../../../blockchain/evm/namespaces';
import BN from 'bn.js';
import { ActionOption } from '../../../redux/types';

export const ViewSaleAssetContainer = () => {
  const router = useRouter();
  const { saleID } = router.query;

  // Keys
  const key = '@@view-sale-asset-container';
  const createBidUIKey = `${key}/create-bid`;
  const getAllBidsUIKey = `${key}/get-all-bid`;
  const getLatestBidsUIKey = `${key}/get-latest-bid`;
  const contractUIKey = `${key}/mc-trader-contract`;
  const getTokenOwnersKey = `${key}/get-token-owners`;
  const findAccountUIKey = `${key}/find-account`;
  const findCreatorUIKey = `${key}/find-creator`;
  const deployBookKey = `${key}/deploy-book`;
  const getTokenActivityKey = `${key}/get-token-activity`;
  const claimingBidKey = `${key}/claim-winning-bid`;
  const likeAssetKey = `${key}/like-asset`;
  const getTokenPriceHistory = `${key}/get-token-price-history`;

  const { accounts, isConnected, provider, chainId } =
    useContext(BaseWeb3Context);

  const [countDownFinished, setCountDownFinished] = useState(false);
  const walletAddress = (accounts ?? [])[0];
  const [backupProvider, setBackupProvider] = useState();
  const [asset, setAsset] = useState<any>({});

  const {
    getSaleAsset,
    asset: assetData,
    getAllBids,
    createBid,
    bids,
    getLatestBid,
    bid: latestBid,
    getTokenOwners,
    tokenOwners,
    getTokenActivity,
    tokenActivity,
    likeAsset,
    unlikeAsset,
  } = useSale({ key });

  useEffect(() => {
    if (assetData?._id && asset?._id != assetData?._id) {
      setAsset(assetData);
    }
  }, [assetData?._id]);

  const onCountdownFinished = () => {
    if (get(asset, 'saleType') == 'Auction' && !countDownFinished) {
      setCountDownFinished(true);
      onGetLatestBid();
    }
  };

  const { uiLoaders, pagination } = useUIState();
  // UI Loading and Pagination State
  const loading = uiLoaders[key];
  const creatingBid = uiLoaders[createBidUIKey];
  const gettingAllBids = uiLoaders[getAllBidsUIKey];
  const gettingLatestBids = uiLoaders[getLatestBidsUIKey];
  const gettingTokenOwners = uiLoaders[getTokenOwnersKey];
  const mcTraderContractLoader = uiLoaders[contractUIKey];
  const deployingBook = uiLoaders[deployBookKey];
  const likingAsset = uiLoaders[likeAssetKey];
  const bidsPagination = pagination[getAllBidsUIKey];
  // const findingOwnerAccount = uiLoaders[findAccountUIKey];
  const gettingTokenActivity = uiLoaders[getTokenActivityKey];
  const gettingTokenPriceHistory = uiLoaders[getTokenPriceHistory];

  const [previewVisibility, setPreviewVisibility] = useState<boolean>(false);

  const [bidVisibility, setBidVisibility] = useState<boolean>(false);

  const [offerVisibility, setOfferVisibility] = useState<boolean>(false);

  const [isDeployed, setIsDeployed] = useState<boolean>(true);

  const [biddingToken, setBiddingToken] = useState<Record<string, any>>({});
  const { handleFindOneAccount: findOneAccount, search: searchAccounts } =
    useAccount({ key });
  const {
    handleFindOneAccount: findCreatorAccount,
    search: searchCreatorAccounts,
  } = useAccount({ key: key + 'creator' });

  const erc20TokenKey = `@@bidding-token/${biddingToken.symbol}`;

  const { getTokenBalance, getTokenAllowance, approveToken, contract } =
    useERC20Token({
      contractAddress: biddingToken.address,
      options: {
        key: erc20TokenKey,
      },
    });

  const { call: dataContractCall, contract: dataContract } = useContract({
    address: process.env.NEXT_PUBLIC_DATA_CONTRACT_ADDRESS,
    options: { uiKey: contractUIKey },
  });
  const {
    send: traderContractSend,
    call: callTrader,
    callFromAddress: callContractWithAddress,
    // contractFromAddress,
    verifyChain,
  } = useContract({
    address: process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS,
    options: { uiKey: contractUIKey, key },
  });

  const [soldCount, setSoldCount] = useState(0);

  const ownerOf = asset.seller;

  const {
    uiLoaders: { [erc20TokenKey]: queryingContract },
  } = useUIState();

  const getTokenId = () => {
    const tokenID: string = get(asset, 'tokenId', null);
    if (!tokenID || tokenID == '0') return asset?.edition;
    return tokenID;
  };

  const onGetPriceHistory = (page = 1, perPage = 10) => {
    dataContractCall(
      'getTokenPurchaseHistory',
      { uiKey: getTokenPriceHistory },
      ...[asset.assetAddress, getTokenId(), page, perPage]
    );
  };
  const onBiddingTokenChange = (token: Record<string, any>) => {
    setBiddingToken(token);
  };

  const onGetBids = (params = {}, others = {}) => {
    getAllBids({
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

  const onGetTokenActivity = (params = {}) => {
    if (!asset || !asset?.token) return;
    const address = get(asset, 'assetAddress');

    getTokenActivity(
      address,
      getTokenId(),
      Number(asset.blockChain),
      Object.assign({}, { uiKey: getTokenActivityKey, params })
    );
  };
  //
  useEffect(() => {
    if (asset?.assetAddress) {
      if (Number(chainId) != Number(asset?.blockChain)) {
        setBackupProvider(getProvider(Number(asset.blockChain)));
      } else {
        setBackupProvider(provider);
      }
      if (backupProvider) {
        checkDeployed();
        onGetPriceHistory();
      }
    }
    if (asset?.assetAddress && latestBid?.bidder && backupProvider) {
      isClaimed();
    }
  }, [asset.saleId, latestBid.bidder, provider]);
  //
  useEffect(() => {
    if (asset?.assetAddress && latestBid?.bidder) {
      isClaimed();
    }
  }, [asset.saleId, latestBid.bidder]);
  //
  useEffect(() => {
    if (
      backupProvider &&
      isConnected &&
      asset?.assetAddress &&
      provider &&
      asset.saleId
    ) {
      getSoldCount();
    }
  }, [asset.saleId, backupProvider]);

  const isClaimed = () => {
    callTrader(
      'claimedAuction',
      {
        key,
      },
      asset.saleId,
      latestBid.bidder,
      Number(latestBid.nonce)
    );
  };
  const checkDeployed = () => {
    callContractWithAddress(
      asset?.assetAddress,
      'creativeWorkType',
      {
        provider: backupProvider ?? provider,
        onFinish: () => {
          setIsDeployed(true);
        },
        onAfterError: () => {
          setIsDeployed(false);
        },
        uiKey: findAccountUIKey,
      },
      'Book'
    );
    // callTrader(
    //   'nfts',
    //   {
    //     key,
    //     onFinish: (data: any) => {
    //       setIsDeployed(data);
    //     },
    //   },
    //   asset?.assetAddress,
    // );
  };

  const getSoldCount = () => {
    if (backupProvider && isConnected && asset.assetAddress && asset.saleId) {
      callTrader(
        'orderCount',
        {
          key,
          onFinish: (data: any) => {
            setSoldCount(data);
          },
          provider: backupProvider,
        },
        asset.assetAddress,
        asset.saleId
      );
    }
  };
  const onGetLatestBid = (params = {}) => {
    getLatestBid({
      params: Object.assign({}, params, {
        saleId: saleID,
        latest: JSON.stringify({ createdAt: -1 }),
      }),
      uiKey: getLatestBidsUIKey,
    });
  };

  const onGetTokenOwners = (params = {}) => {
    getTokenOwners(asset.assetAddress, Number(asset.blockChain), {
      uiKey: getTokenOwnersKey,
      params,
    });
  };

  const onGetTokenOwner = () => {
    if (asset?.seller)
      findOneAccount({
        params: { walletAddress: asset.seller },
        uiKey: findAccountUIKey,
      });
    if (asset?.assetPayload?.creator)
      findCreatorAccount({
        params: { walletAddress: asset.assetPayload?.creator },
        uiKey: findCreatorUIKey,
      });
    // const onOwnerOfFinish = (data: any) => {
    //   //prettier-ignore
    //   findOneAccount({ params: { walletAddress: data }, uiKey: findAccountUIKey });
    // };
    //
    // // Get Owner
    // //prettier-ignore
    //
    // const address = get(asset, 'token');
    // const tokenID = get(asset, 'tokenId');
    //
    // callContractWithAddress(
    //   address,
    //   'balanceOf',
    //   {
    //     provider: backupProvider ?? provider,
    //     onFinish: onOwnerOfFinish,
    //     uiKey: findAccountUIKey,
    //   },
    //   'Book',
    //   walletAddress,
    //   tokenID
    // );
  };

  const onDeployBook = () => {
    const onFinish = (_: any) => {
      setTimeout(() => checkDeployed(), 1000);
    };

    const assetSignature = get(asset, 'assetSignature');
    const seller = get(asset, 'seller');
    const assetPayload = getAsset();
    const args = [seller, assetPayload, assetSignature];
    verifyChain(asset['blockChain'], () =>
      traderContractSend(
        'deployBook',
        { from: walletAddress },
        {
          provider,
          onFinish,
          uiKey: deployBookKey,
          onSuccess: 'Asset deployed successfully',
        },
        ...args
      )
    );
  };

  const onPaginateTokenOwners = (page: number, perPage: number) => {
    onGetTokenOwners({
      params: {
        page,
        perPage,
      },
      uiKey: getTokenOwnersKey,
    });
  };

  const onGetAssets = () => {
    if (saleID) {
      const query: Record<string, any> = {
        population: JSON.stringify([
          { path: 'asset', populate: { path: 'series' } },
        ]),
      };
      if (saleID) {
        query.saleId = saleID;
      }

      getSaleAsset({
        params: query,
      });
    }
  };

  const onPaginateBids = (page: number, perPage: number) => {
    onGetBids(
      {
        page,
        perPage,
      },
      { uiKey: getAllBidsUIKey }
    );
  };

  const onPreviewBook = (visibility: boolean) => {
    setPreviewVisibility(visibility);
  };

  const onToggleBidUI = (visibility: boolean) => {
    onGetLatestBid();
    setBidVisibility(visibility);
  };

  const onToggleOfferUI = (visibility: boolean) => {
    setOfferVisibility(visibility);
  };

  const onSignBid = (values: Record<string, any>) => {
    const bid = new Web3().utils.toWei(values.bid);
    const bidProperties = {
      amount: bid,
      nonce: Math.floor(Date.now() / 1000).toString(),
      saleSignature: get(asset, 'saleSignature'),
    };

    signBid(
      provider,
      walletAddress,
      chainId as number,
      bidProperties,
      (err: any, result: any) => {
        if (err || result.error) {
          notification.error({
            message: 'Oops!',
            description: err?.message ?? result?.error?.message,
            placement: 'bottomLeft',
          });
          return;
        }

        const signature = get(result, 'result');

        const onFinish = () => {
          onToggleBidUI(false);
          const bidListComponent = document.getElementById(
            'meta-bid-list-component'
          );
          if (bidListComponent) {
            bidListComponent.scrollIntoView({ behavior: 'smooth' });
          }
          onGetBids({}, { uiKey: getAllBidsUIKey });
        };

        const payload = {
          token: biddingToken.address,
          nonce: Number(bidProperties.nonce),
          amount: bid,
          signature,
          saleId: get(asset, 'saleId'),
        };

        // //console.log(payload);

        createBid(payload, {
          uiKey: createBidUIKey,
          onFinish,
        });
      }
    );
  };

  const onPlaceBid = (values: Record<string, any>) => {
    if (!isConnected && !/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`).then();
      return;
    }

    verifyChain(asset['blockChain'], () => onSignBid(values));
  };

  const onPlaceOffer = () => {
    if (!isConnected && !/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`).then();
      return;
    }
  };

  const getSale = (): Web3Namespace.ISale => {
    const saleType = get(asset, 'saleType');
    const saleTypeFromEnum = get(Web3Namespace.SaleTypeEnum, saleType);

    const assetType = get(asset, 'assetType');
    const assetTypeFromEnum = get(Web3Namespace.AssetTypeEnum, assetType);

    return {
      mint: get(asset, 'mint'),
      saleId: get(asset, 'saleId'),
      token: get(asset, 'token'),
      tokenId: String(get(asset, 'tokenId')),
      assetId: String((get(asset, 'asset') as any)._id),
      // data: Web3.utils.stringToHex(get(asset, 'data')),
      maxSupply: get(asset, 'maxSupply'),
      price: get(asset, 'price'),
      royalty: String(Math.floor(Number(get(asset, 'royalty')) * 100)),
      startDate: Number(get(asset, 'startDateTimestamp')),
      endDate: Number(get(asset, 'endDateTimestamp')),
      saleType: saleTypeFromEnum,
      seller: get(asset, 'seller'),
      assetType: assetTypeFromEnum,
    };
  };

  const getAsset = () => {
    return Object.assign({}, get(asset, 'assetPayload'), {
      pageURIs: get(asset, 'pageURIs'),
      editors: get(asset, 'asset.editors', []),
      bookAddress: process.env.NEXT_PUBLIC_ADDRESS_ZERO,
      saleId: get(asset, 'saleId'),
    });
  };

  const onPlaceBuyNowOrder = () => {
    const sale = getSale();
    const assetPayload = getAsset();

    const args = [
      { ...sale, version: 1 },
      1,
      get(asset, 'saleSignature'),
      get(asset, 'traderSignature'),
      assetPayload,
      get(asset, 'assetSignature'),
    ];

    traderContractSend(
      'buyNowBook',
      { from: walletAddress },
      {
        successMessage: 'Asset successfully purchased!',
        errorMessage: 'Oops! Something went wrong.',
        onFinish: () =>
          setTimeout(() => {
            getSoldCount();
            onGetTokenOwners();
            onGetPriceHistory();
            onGetTokenActivity();
          }, 2000),
      },
      ...args
    );
  };

  const onApproveTokenForBuyNow = () => {
    if (!backupProvider && Number(asset.blockChain) != chainId) return;
    const chain = SUPPORTED_NETWORKS[Number(asset.blockChain)];
    const assetPrice = fixDecimals(
      new BN(get(asset, 'price')),
      Number(chain?.usdToken?.decimals)
    );

    getTokenBalance(walletAddress, {
      provider,
      onFinish: (receipt: any) => {
        const bal = new BN(receipt);
        if (bal.lt(assetPrice)) {
          notification.error({
            message: 'Oops!',
            description: `Your ${biddingToken.symbol} balance is too low`,
            placement: 'bottomLeft',
          });
          return;
        } else {
          getTokenAllowance(walletAddress, {
            provider: provider,
            onFinish: (receipt: any) => {
              const allowance = new BN(receipt);

              if (allowance.eq(new BN(0)) || assetPrice.gt(allowance)) {
                approveToken(walletAddress, get(asset, 'price'), {
                  onFinish: onPlaceBuyNowOrder,
                });
              } else {
                onPlaceBuyNowOrder();
              }
            },
          });
        }
      },
    });
  };

  const onBuyNow = () => {
    if (!isConnected && !/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`).then();
      return;
    }

    verifyChain(asset['blockChain'], () => onApproveTokenForBuyNow());
  };

  const buyAuction = () => {
    const sale = getSale();
    const args = [
      { ...sale, version: 1 },
      latestBid.amount,
      latestBid.nonce,
      latestBid.bidder,
      get(asset, 'saleSignature'),
      get(asset, 'traderSignature'),
      latestBid.bidSignature,
      latestBid.winningBidSignature,
      getAsset(),
      get(asset, 'assetSignature'),
    ];
    traderContractSend(
      'buyAuctionBook',
      { from: walletAddress },
      {
        successMessage: 'Asset successfully purchased!',
        errorMessage: 'Oops! Something went wrong.',
        onFinish: () => {
          isClaimed();
          onGetTokenOwners();
          onGetPriceHistory();
          onGetTokenActivity();
        },
        key: key,
        uiKey: claimingBidKey,
      },
      ...args
    );
  };

  const onApproveToken = (
    address: string,
    amount: string | BN,
    options?: ActionOption
  ) => {
    if (!isConnected && !/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`);
      return;
    }
    verifyChain(asset['blockChain'], () =>
      approveToken(address, amount, options)
    );
  };

  const onGetTokenBalanceAndAllowance = (walletAddress: string) => {
    if (!isConnected && !/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`).then();
      return;
    }
    // verifyChain(asset['blockChain'], () => {
    if (backupProvider) {
      getTokenBalance(walletAddress, { provider: backupProvider });
      getTokenAllowance(walletAddress, { provider: backupProvider });
    }
    // });
  };

  const onLikeAsset = () => {
    const liked: boolean = get(asset.asset, 'liked', false);

    if (liked) {
      unlikeAsset(
        { assetId: get(asset, 'asset._id') },
        {
          uiKey: likeAssetKey,
          onFinish: (d: any) => {
            setAsset((asset: any) => {
              asset.asset.liked = false;
              asset.asset.likes = d.likes;
              return asset;
            });
          },
        }
      );
      return;
    }

    likeAsset(
      { assetId: get(asset, 'asset._id') },
      {
        uiKey: likeAssetKey,
        onFinish: (d: any) => {
          setAsset((asset: any) => {
            asset.asset.liked = true;
            asset.asset.likes = d.likes;
            return asset;
          });
        },
      }
    );
  };

  useEffect(() => {
    if (asset?.assetAddress) {
      checkDeployed();
    }
  }, [asset?.assetAddress]);
  useEffect(() => {
    onGetAssets();
  }, [saleID, walletAddress, isConnected]);

  useEffect(() => {
    if (isConnected && biddingToken.symbol && backupProvider) {
      onGetTokenBalanceAndAllowance(walletAddress);
    }
  }, [biddingToken.symbol, isConnected]);

  useEffect(() => {
    if (
      has(asset, 'assetAddress') &&
      isConnected &&
      (backupProvider || provider)
    ) {
      onGetTokenOwners();
    }
    if (asset.saleType == 'Auction') {
      onGetBids();
      onGetLatestBid();
    }
  }, [asset?.assetAddress, isConnected, backupProvider]);

  useEffect(() => {
    if (asset?.blockChain && asset?._id) {
      onGetTokenOwner();
      const chain =
        get(SUPPORTED_NETWORKS, Number(asset.blockChain)) ??
        get(
          SUPPORTED_NETWORKS,
          Number(process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID)
        );

      onBiddingTokenChange(chain.usdToken);
    }
  }, [asset?._id, asset.blockChain, isConnected]);

  useEffect(() => {
    onGetTokenActivity();
  }, [asset.token, ownerOf, isConnected]);

  if (loading || !asset._id) {
    return (
      <div style={{ height: '50vh' }} className={'meta-flex-center meta-flex'}>
        <MainLoader height={40} width={40} />
      </div>
    );
  }

  return (
    <Fragment>
      <Offer
        walletAddress={walletAddress as string}
        onVisibilityChange={onToggleOfferUI}
        visibility={offerVisibility}
        onPlaceOffer={onPlaceOffer}
        offerToken={{
          ...biddingToken,
          balance: get(contract, 'balanceOf'),
          allowance: get(contract, 'allowance'),
        }}
        onOfferTokenChange={onBiddingTokenChange}
        approveToken={approveToken}
        queryingContract={queryingContract}
        initialValues={{
          amount: toEther(asset.price),
          token: biddingToken.symbol,
        }}
      />
      <Bidding
        blockchain={asset.blockChain}
        walletAddress={walletAddress as string}
        onVisibilityChange={onToggleBidUI}
        visibility={bidVisibility}
        onPlaceBid={onPlaceBid}
        biddingToken={{
          ...biddingToken,
          balance: get(contract, 'balanceOf'),
          allowance: get(contract, 'allowance'),
        }}
        onBiddingTokenChange={onBiddingTokenChange}
        approveToken={onApproveToken}
        queryingContract={queryingContract}
        initialValues={{
          bid: toEther(asset.price),
          token: biddingToken.symbol,
        }}
        latestBid={latestBid}
        loading={creatingBid || gettingLatestBids}
      />
      <ViewSaleAsset
        {...asset}
        gettingTokenPriceHistory={gettingTokenPriceHistory}
        likingAsset={likingAsset}
        onLikeAsset={onLikeAsset}
        onCountDownFinished={onCountdownFinished}
        onPreviewBook={onPreviewBook}
        onDeployBook={onDeployBook}
        previewVisibility={previewVisibility}
        onToggleBidUI={onToggleBidUI}
        onToggleOfferUI={onToggleOfferUI}
        onPaginateBids={onPaginateBids}
        onBuyNow={onBuyNow}
        onBuyAuction={buyAuction}
        bids={bids}
        onGetTokenActivity={onGetTokenActivity}
        soldCount={soldCount}
        gettingAllBids={gettingAllBids}
        deployingBook={deployingBook}
        bidsPagination={bidsPagination}
        queryingContract={queryingContract || mcTraderContractLoader}
        onPaginateTokenOwners={onPaginateTokenOwners}
        tokenOwners={tokenOwners.filter(
          (d) => d.token_id == String(getTokenId())
        )}
        gettingTokenOwners={gettingTokenOwners}
        ownerOf={ownerOf}
        ownerOfUserAccount={searchAccounts(key)}
        walletAddress={walletAddress as string}
        tokenActivity={tokenActivity}
        creatorAccount={searchCreatorAccounts(key + 'creator')}
        gettingTokenActivity={gettingTokenActivity}
        latestBid={latestBid}
        isDeployed={isDeployed}
        priceHistory={dataContract['getTokenPurchaseHistory']}
      />
    </Fragment>
  );
};
