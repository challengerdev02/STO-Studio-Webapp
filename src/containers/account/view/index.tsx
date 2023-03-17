import { MainLoader, ProfileScreen, TipAccount } from '@/components';
import { useAccount, useAssets, useSale, useSeries, useUIState } from '@/hooks';
import React, { useContext, useEffect, useState } from 'react';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { generateAvatar, timestamp, truncateEthAddress } from '@/shared/utils';
import { getSaleTypeActionTitle, toEther } from '../../../blockchain/evm/utils';
import { useCollections } from './../../../hooks/useCollections/index';
import { BaseWeb3Context } from '../../../blockchain/base';
import { get, toLower } from 'lodash';
import Web3 from 'web3';
import { UserNamespace } from '@/shared/namespaces/user';
// import { get } from 'lodash';

export const ViewAccountContainer = (props: {
  accountAddress?: string;
  user?: UserNamespace.User;
}) => {
  const key = '@@user-account';
  const createdAssetKey = `${key}/created`;
  const seriesKey = `${key}/series`;
  const collectedItemKey = `${key}/collected`;
  const avatarKey = `${key}/upload-avatar-on-view-account-container`;
  const bannerKey = `${key}/upload-banner-on-view-account-container`;
  const TIP_UI_KEY = `${key}/tip`;
  const TIP_BAL_UI_KEY = `${key}/tip/balance`;
  const FOLLOWING_USER_UI_KEY = `${key}/follow-user`;
  const router = useRouter();

  let { account, accountAddress } = router.query;

  const { isConnected, signedAddress, chainId } = useContext(BaseWeb3Context);

  const [walletAddress, setWalletAddress] = useState<string>();
  const [followingResponse, setFollowingResponse] = useState<
    Record<string, any>
  >({});

  const [tipViewVisibility, setTipViewVisibility] = useState<boolean>(false);
  const {
    user,
    handleUpdateAccount,
    handleFindOneAccount,
    search,
    handleGetAccount,
    handleGetHCOMIBalance,
    handleTipUser,
    handleFollowUser,
    tip: tipBalance,
  } = useAccount({ key, autoFetch: true });

  const { allSeries, handleGetAll: handleGetAllSeries } = useSeries({
    key: seriesKey,
    autoFetch: false,
    options: {
      params: {
        walletAddress: accountAddress ?? toLower(signedAddress),
      },
    },
  });

  useEffect(() => {
    if (!isConnected && !account && !accountAddress)
      router.replace('/connect?ref=/account');
  }, [isConnected, accountAddress]);

  // const [walletAddress, setWalletAddress] = useState<string>();

  useEffect(() => {
    if (account && String(account).startsWith('0x')) {
      setWalletAddress(String(account).toLowerCase());
    } else if (accountAddress && String(accountAddress).startsWith('0x')) {
      setWalletAddress(String(accountAddress).toLowerCase());
    } else {
      if (signedAddress) setWalletAddress(signedAddress);
    }
    if (signedAddress && !accountAddress && !account) {
      handleGetAccount();
    }
  }, [signedAddress, accountAddress, account]);

  // const isUserLoggedIn =
  //   !!walletAddress &&
  //   (account
  //     ? walletAddress.toLowerCase() ===
  //       (account as string)?.toLowerCase()
  //     : true);

  const userInfo = props.user ?? search(key);
  // //console.log('USERINFO', userInfo);

  const { uiLoaders, pagination } = useUIState();
  const loadingForOnsaleItems = uiLoaders[key];
  const loadingForCreatedItems = uiLoaders[createdAssetKey];
  const loadingForCollectedItems = uiLoaders[collectedItemKey];
  const loadingSeries = uiLoaders[seriesKey];
  const seriesPagination = pagination[key];
  const paginationDataForOnsaleItems = pagination[key];
  const paginationDataForCreatedItems = pagination[createdAssetKey];
  const paginationDataForCollectedItems = pagination[collectedItemKey];
  const avatarLoading = uiLoaders[avatarKey];
  const bannerLoading = uiLoaders[bannerKey];
  const tippingOwner = uiLoaders[TIP_UI_KEY];
  const followingUser = uiLoaders[FOLLOWING_USER_UI_KEY];
  const gettinghComiBalance = uiLoaders[TIP_BAL_UI_KEY];
  const [uploadResponse, setUploadResponse] = useState<any>();
  const [uploadCoverResponse, setUploadCoverResponse] = useState<any>();
  const [uploadStates, setUploadStates] = useState<Record<string, boolean>>({
    avatar: false,
    banner: false,
  });

  const { assets: bookSaleSchedules, getAllSaleAssets } = useSale({ key });
  const [assetType] = useState(null);
  const [saleType] = useState(null);
  const perPage = 12;
  const { collections, handleFetchCollections } = useCollections({
    key: collectedItemKey,
  });
  const { assets: createdAssets, handleFetchCreatedAssets } = useAssets({
    key: createdAssetKey,
  });

  const loading = {
    loadingForOnsaleItems,
    loadingForCreatedItems,
    loadingForCollectedItems,
    loadingSeries,
  };

  const showLoadMore = {
    forOnsaleItems: !!paginationDataForOnsaleItems?.next,
    forCreatedItems: !!paginationDataForCreatedItems?.next,
    forCollectedItems: !!paginationDataForCollectedItems?.next,
    series: !!seriesPagination?.next,
  };

  const userData = walletAddress == signedAddress ? user : userInfo;

  useEffect(() => {
    if (walletAddress) {
      if (walletAddress && walletAddress != 'account') {
        if (!props.user) {
          handleFindOneAccount({
            params: {
              walletAddress: walletAddress,
            },
          });
        }
      }
      // handleFetchCollections({
      //   params: {
      //     address: walletAddress,
      //     chainId,
      //     perPage,
      //   },
      // });
      handleFetchCreatedAssets({
        params: {
          population: JSON.stringify(['asset']),
          perPage,
          assetType: 'Book',
          walletAddress,
        },
      });
    }
  }, [isConnected, walletAddress]);

  useEffect(() => {
    if (chainId && walletAddress) {
      handleFetchCollections({
        params: {
          address: walletAddress,
          chainId,
          perPage,
        },
      });
    }
  }, [chainId, walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      getAllSaleAssets({
        params: {
          population: JSON.stringify(['user']),
          saleType,
          assetType,
          perPage,
          walletAddress: walletAddress,
          endDateTimestamp: { $gt: timestamp() },
        },
      });
    }
  }, [assetType, saleType, isConnected, walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      handleGetAllSeries({
        params: {
          walletAddress: toLower(walletAddress),
        },
      });
    }
  }, [walletAddress]);

  const onGetTipBalance = () => {
    if (isConnected && signedAddress) {
      handleGetHCOMIBalance(signedAddress, {
        uiKey: TIP_BAL_UI_KEY,
        noSuccessMessage: true,
      });
    }
  };

  const onTipOwner = (values: Record<string, any>) => {
    const body = { ...values };
    body.amount = Web3.utils
      .toWei(Web3.utils.toBN(values['amount'] ?? '0'))
      .toString();
    // console.table(body);
    // //console.log(body);

    if (isConnected && signedAddress && accountAddress) {
      handleTipUser(accountAddress as string, body, {
        uiKey: TIP_UI_KEY,
        onFinish: (_) => {
          onGetTipBalance();
          onTipViewVisibilityChange(false);
        },
      });
    }
  };

  const onTipViewVisibilityChange = (visibility = true) => {
    setTipViewVisibility(visibility);
  };

  const onFollowUser = (follow: boolean) => {
    if (isConnected && signedAddress && accountAddress && userData?._id) {
      handleFollowUser(
        userData?._id as string,
        { follow },
        {
          uiKey: FOLLOWING_USER_UI_KEY,
          noSuccessMessage: true,
          onFinish: (data) => {
            // //console.log(data);
            setFollowingResponse({ ...data, isFollowingUser: follow });
          },
        }
      );
    }
  };

  const handleLoadMoreContent = (action: Record<string, any>) => {
    switch (action.type) {
      case 'SHOW_MORE_SALE_ASSETS':
        return getAllSaleAssets({
          params: {
            walletAddress: walletAddress,
            population: JSON.stringify(['user']),
            saleType,
            assetType,
            perPage,
            page: paginationDataForOnsaleItems?.next ?? 1,
          },
          virtualized: true,
        });

      case 'SHOW_MORE_CREATED_ASSETS':
        return handleFetchCreatedAssets({
          params: {
            population: JSON.stringify(['asset']),
            perPage,
            page: paginationDataForCreatedItems?.next ?? 1,
            walletAddress: walletAddress,
          },
          virtualized: true,
        });

      case 'SHOW_MORE_COLLECTIONS':
        return handleFetchCollections({
          params: {
            address: walletAddress,
            population: JSON.stringify(['asset']),
            perPage,
            page: paginationDataForCollectedItems?.next ?? 1,
            endDateTimestamp: { $gt: timestamp() },
          },
          virtualized: true,
        });

      case 'SHOW_MORE_SERIES':
        return handleGetAllSeries({
          params: {
            walletAddress: toLower(walletAddress),
            // population: JSON.stringify(['asset']),
            perPage,
            page: paginationDataForCollectedItems?.next ?? 1,
            // endDateTimestamp: { $gt: timestamp() },
          },
          virtualized: true,
        });

      default:
        return;
    }
  };

  const seriesView = (allSeries ?? []).map((series) => ({
    ...series,
    cardType: 'series',
    coverInfo: {
      coverImg: series.image,
      menuItems: [],
    },
    cardData: {
      inWishlist: false,
      count: series?.subscribers ?? '0',
      iconURL:
        series.user?.avatar ?? generateAvatar(series?.user?.walletAddress),
      ...series,
      cardType: 'series',
    },
  }));

  const browseAuction = (bookSaleSchedules ?? []).map((book) => ({
    coverInfo: {
      countDown: '01:52:09 left 🔥',
      startDate: new Date(book.startDate ?? ''),
      endDate: new Date(book.endDate ?? ''),
      coverImg: book.asset.thumbnail ?? book.asset.coverImage ?? '',
      menuItems: [],
    },
    cardData: {
      title: book.title ?? '',
      actionTitle: getSaleTypeActionTitle(book.saleType ?? ''),
      placeBid: () => {
        router.push(`/assets/${book?._id}/${book?.saleId}`);
      },
      iconURL: book.user?.avatar ?? generateAvatar(book.user?.walletAddress),
      itemPrice: toEther(book.price),
      blockchain: book.blockChain,
      count: book.asset.likes,
      inWishlist: false,
      genres: get(book.asset, 'genres'),
    },
  }));

  const userCollections = (collections ?? []).map((collection) => ({
    token_address: collection.token_address ?? '',
    token_id: collection.token_id ?? '',
    amount: collection.amount ?? '',
    owner_of: collection.owner_of ?? '',
    token_hash: collection.token_hash ?? '',
    block_number_minted: collection.block_number_minted ?? '',
    block_number: collection.block_number ?? '',
    contract_type: collection.contract_type ?? '',
    name: collection.name ?? '',
    symbol: collection.symbol ?? '',
    token_uri: collection.token_uri
      ? `https://${collection.token_uri.split('https://')[1]}`
      : '',
    metadata: collection.metadata ?? {},
    synced_at: collection.synced_at ?? '',
    last_token_uri_sync: collection.last_token_uri_sync ?? '',
    last_metadata_sync: collection.last_metadata_sync ?? '',
    previewCollection: () => {
      router.push(
        `/collection/${collection.owner_of}/${collection.token_address}/${collection.token_id}`
      );
    },
  }));
  const userAssets = (createdAssets ?? []).map((asset) => ({
    asset: {
      active: asset?.asset?.active,
      book: asset?.asset?.book,
      coverImg: asset?.asset?.thumbnail ?? asset?.asset?.coverImage,
      description: asset?.asset?.description,
      explicitContent: asset?.asset?.explicitContent,
      publicId: asset?.asset.publicId,
      itemTitle: asset?.asset?.title,
      user: asset?.asset?.user,
      walletAddress: asset?.asset?.walletAddress,
      blockchain: process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID as string,
      __v: asset?.asset?.__v,
      previewCreatedAsset: () => {
        router.push(`/assets/${asset.asset._id}`);
      },
    },
    assetData: {
      ...asset?.asset,
      deleted: asset?.assetData?.deleted,
      inWishlist: false,
      count: asset?.likes ?? '0',
      assetType: asset?.assetType,
    },
    user: asset?.user,
    walletAddress: asset.walletAddress,
    __v: asset.__v,
  }));

  const mName = userData?.username
    ? userData?.username
    : walletAddress
    ? truncateEthAddress(userInfo?.walletAddress as string)
    : truncateEthAddress(user?.walletAddress as string);

  const $record = {
    ...userData,
    ...followingResponse,
    name: mName,
    walletAddress: walletAddress,
    // connections: {
    //   followers: account ? userInfo?.followers : user?.followers ?? 0,
    //   following: account ? userInfo?.followings : user?.followings ?? 0,
    //   ...followingResponse,
    // },
    createdAt: userData?.createdAt,
    auctions: [...browseAuction],
    series: seriesView,
    collections: [...userCollections],
    createdAssets: [...userAssets],
    coverImg: userData?.banner,
    profileImage: userData?.avatar,
    uploadStates,
    loadings: {
      bannerLoading,
      avatarLoading,
    },
  };

  const onUploadChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      notification.info({
        message: 'Upload in-progress',
        description: info.file.name,
        placement: 'bottomLeft',
        key: 'upload',
      });
      if (info.file.response && info.file.response.data) {
        setUploadResponse(info.file.response.data);
        setUploadStates((old) => ({ ...old, avatar: false }));
      }
    } else {
      setUploadStates((old) => ({ ...old, avatar: true }));
    }
    if (info.file.status === 'done') {
      notification.success({
        message: 'Upload success',
        description: info.file.name,
        placement: 'bottomLeft',
        key: 'upload',
      });
    } else if (info.file.status === 'error') {
      notification.error({
        message: `${info.file.name} file upload failed.`,
        description: info.file.response?.message,
        placement: 'bottomLeft',
        key: 'upload',
      });
    }
  };
  const onUploadCoverChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      notification.info({
        message: 'Upload in-progress',
        description: info.file.name,
        placement: 'bottomLeft',
        key: 'upload',
      });
      if (info.file.response && info.file.response.data) {
        setUploadCoverResponse(info.file.response.data);
        setUploadStates((old) => ({ ...old, banner: false }));
      }
    } else {
      setUploadStates((old) => ({ ...old, banner: true }));
    }
    if (info.file.status === 'done') {
      notification.success({
        message: 'Upload success',
        description: info.file.name,
        placement: 'bottomLeft',
        key: 'upload',
      });
    } else if (info.file.status === 'error') {
      notification.error({
        message: `${info.file.name} file upload failed.`,
        description: info.file.response?.message,
        placement: 'bottomLeft',
        key: 'upload',
      });
    }
  };
  const uploadProps = {
    name: 'file',
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    onChange: onUploadChange,
    maxCount: 1,
    showUploadList: {
      showRemoveIcon: false,
    },
  };
  const uploadCoverProps = {
    name: 'file',
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    onChange: onUploadCoverChange,
    maxCount: 1,
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  useEffect(() => {
    if (uploadResponse && uploadResponse.file && uploadResponse.file.url) {
      handleUpdateAccount(
        {
          avatar: uploadResponse.file.url,
        },
        {
          uiKey: avatarKey,
        }
      );
    }
  }, [uploadResponse?.file?.url]);

  useEffect(() => {
    if (
      uploadCoverResponse &&
      uploadCoverResponse.file &&
      uploadCoverResponse.file.url
    ) {
      handleUpdateAccount(
        {
          banner: uploadCoverResponse.file.url,
        },
        {
          uiKey: bannerKey,
        }
      );
    }
  }, [uploadCoverResponse?.file?.url]);

  useEffect(() => {
    if (signedAddress) {
      onGetTipBalance();
    }
  }, [signedAddress]);

  if (!user?.walletAddress && !accountAddress)
    return (
      <div
        style={{ height: '50vh' }}
        className={'meta-flex-center meta-flex'}
        data-testid="main-loader"
      >
        <MainLoader height={40} width={40} />
      </div>
    );

  return (
    <>
      <TipAccount
        username={mName}
        walletAddress={walletAddress}
        onVisibilityChange={onTipViewVisibilityChange}
        visibility={tipViewVisibility}
        onTip={onTipOwner}
        tipToken={{
          symbol: process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL,
          name: process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL,
          balance: get(tipBalance, 'balance', 0),
        }}
        queryingContract={gettinghComiBalance}
        loading={tippingOwner}
      />
      {/*{loading && (*/}
      {/*  <div*/}
      {/*    style={{ height: '50vh' }}*/}
      {/*    className={'meta-flex-center meta-flex'}*/}
      {/*  >*/}
      {/*    <MainLoader height={40} width={40} />*/}
      {/*  </div>*/}
      {/*)}*/}
      <ProfileScreen
        onLoadMore={handleLoadMoreContent}
        onFinish={() => {}}
        onFollowUser={onFollowUser}
        onTipUser={() => {
          onTipViewVisibilityChange(true);
        }}
        loadingState={loading}
        followingUser={followingUser}
        showLoad={showLoadMore}
        uploadProps={uploadProps}
        uploadCoverProps={uploadCoverProps}
        onEditProfile={() => {
          router.push(`/account/settings`);
        }}
        handleChangeCoverPhoto={() => {}}
        handleDeleteCoverPhoto={() => {
          handleUpdateAccount(
            {
              banner: '',
            },
            {
              uiKey: bannerKey,
            }
          );
        }}
        onResetForm={() => {}}
        onSearch={() => {}}
        $record={$record}
        isUserLoggedIn={
          router.pathname == '/account' &&
          toLower(userInfo?.walletAddress) === toLower(signedAddress) &&
          signedAddress != null
        }
        accountAddress={(walletAddress as string | undefined)?.toLowerCase()}
        signedAddress={signedAddress?.toLowerCase()}
      />
    </>
  );
};
