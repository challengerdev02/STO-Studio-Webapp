import { ViewSeries } from '@/components/series/view';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import { useAccount, useSeries, useUIState } from '@/hooks';
import React, { useContext, useEffect, useState } from 'react';
import { CreateSeriesContainer } from '../create-series';
// import { toEther } from '@/web3/utils';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Web3 from 'web3';
import { TipAccount } from '@/components/account/tip';
import { notification } from 'antd';
import Head from 'next/head';
import { BaseWeb3Context } from '../../../../blockchain/base';

export const ViewSeriesContainer = () => {
  const KEY = `@@series/view`;
  const UI_KEY = `${KEY}-ui`;
  const SUBSCRIBE_UI_KEY = `${UI_KEY}/subscribe`;
  const TIP_UI_KEY = `${UI_KEY}/tip`;
  const TIP_BAL_UI_KEY = `${UI_KEY}/tip/balance`;
  const [tipViewVisibility, setTipViewVisibility] = useState<boolean>(false);
  const [seriesEditVisibility, setSeriesEditVisibility] =
    useState<boolean>(false);
  const router = useRouter();
  const { accounts, isConnected } = useContext(BaseWeb3Context);

  const {
    handleGetHCOMIBalance,
    handleTipUser,
    tip: tipBalance,
  } = useAccount({ key: KEY });
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);

  const ERC20_KEY = `${KEY}/tip-token/COMI`;
  // const CONTRACT_UI_KEY = `${KEY}/mc-trader-contract`;

  // const { send: traderContractSend } = useContract({
  //   address: process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS,
  //   options: { uiKey: CONTRACT_UI_KEY, key: KEY },
  // });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [series, setSeries] = useState<any>({});

  const signedWalletAddress = accounts?.[0];

  const slug: any = get(router, 'query.seriesID');

  const [seriesID, setSeriesID] = useState<string>();

  useEffect(() => {
    if (slug) {
      const parts = slug.split('-');
      if (parts[parts.length - 1] == seriesID) return;
      setSeriesID(parts[parts.length - 1]);
    }
  }, [slug]);

  const actionOptions = {
    uiKey: UI_KEY,
  };

  const { uiLoaders } = useUIState();
  const loading = uiLoaders[UI_KEY];
  const subscribing = uiLoaders[SUBSCRIBE_UI_KEY];
  const tippingOwner = uiLoaders[TIP_UI_KEY];
  const gettingBalance = uiLoaders[ERC20_KEY];

  const { handleGetDetails, seriesDetails, handleSubscribe } = useSeries({
    key: KEY,
    options: actionOptions,
  });

  const onGetTipBalance = () => {
    if (isConnected && signedWalletAddress) {
      handleGetHCOMIBalance(signedWalletAddress, {
        uiKey: TIP_BAL_UI_KEY,
        noSuccessMessage: true,
      });
    }
  };

  const onGetSeriesDetails = (otherParams = {}) => {
    handleGetDetails(seriesID?.toString() ?? '', {
      key: KEY,
      uiKey: UI_KEY,
      ...otherParams,
    });
  };

  const onTipOwner = (values: Record<string, any>) => {
    const body = { ...values };
    body.amount = Web3.utils
      .toWei(Web3.utils.toBN(values['amount'] ?? '0'))
      .toString();
    // console.table(body);
    // //console.log(body);

    if (isConnected && seriesDetails.walletAddress) {
      handleTipUser(seriesDetails.walletAddress, body, {
        uiKey: TIP_UI_KEY,
        onFinish: (_) => {
          onGetTipBalance();
          onTipViewVisibilityChange(false);
        },
      });
    }
  };

  const onTipViewVisibilityChange = (visibility = true) => {
    if (visibility) {
      if (!signedWalletAddress) {
        notification.error({
          message: 'You must be signed in to tip',
          placement: 'bottomLeft',
        });
        return;
      }
    }
    setTipViewVisibility(visibility);
  };
  const onSeriesEditModalVisibilityChange = (visibility = true) => {
    setSeriesEditVisibility(visibility);
  };
  const onSubscribe = (value?: boolean) => {
    if (!signedWalletAddress) {
      notification.error({
        message: 'You must be signed in to subscribe',
        placement: 'bottomLeft',
      });
      return;
    }
    if (!executeRecaptcha) {
      //console.log('Execute recaptcha not yet available');
      return;
    }
    setLoadingCaptcha(true);
    executeRecaptcha('subscription').then((gReCaptchaToken) => {
      //console.log('CAPATCH', gReCaptchaToken);
      handleSubscribe({ subscribe: value ?? false }, String(seriesID), {
        uiKey: SUBSCRIBE_UI_KEY,
        successMessage: value
          ? 'Successfully subscribed'
          : 'Unsubscribed successfully',
        noSuccessMessage: false,
        captcha: gReCaptchaToken,
        onFinish: (d) => {
          setSeries({
            ...seriesDetails,
            subscribed: !!value,
            subscribers: d.subscribers,
          });
          // onGetSeriesDetails({ uiKey: `${UI_KEY}/recall` });
        },
      });
    });
  };

  useEffect(() => {
    if (
      seriesID &&
      (seriesID != seriesDetails._id ||
        seriesDetails.walletAddress == signedWalletAddress?.toLowerCase())
    ) {
      // if (seriesID) {
      // //console.log('Hello World');
      onGetSeriesDetails();
    }
  }, [seriesID]);

  const getNextPage = (page: number) => {
    onGetSeriesDetails({
      params: {
        page,
      },
    });
  };

  useEffect(() => {
    setSeries(seriesDetails);
  }, [
    seriesDetails._id,
    seriesDetails.likes,
    seriesDetails.subscribers,
    seriesDetails.episodeData?.meta?.currentPage,
    // seriesDetails,
  ]);

  useEffect(() => {
    onGetTipBalance();
  }, [isConnected, signedWalletAddress]);

  return (
    <>
      <Head>
        <title>MataComic - {seriesDetails.title}</title>
        <meta name="description" content={seriesDetails.description} />
      </Head>
      <CreateSeriesContainer
        visibility={seriesEditVisibility}
        onVisibilityChange={onSeriesEditModalVisibilityChange}
        onCreateComplete={onGetSeriesDetails}
        domain={'revise'}
        seriesID={seriesDetails._id}
      />
      <TipAccount
        username={seriesDetails.walletAddress}
        walletAddress={signedWalletAddress}
        onVisibilityChange={onTipViewVisibilityChange}
        visibility={tipViewVisibility}
        onTip={onTipOwner}
        tipToken={{
          symbol: process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL,
          name: process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL,
          balance: get(tipBalance, 'balance', 0),
        }}
        queryingContract={gettingBalance}
        loading={tippingOwner}
      />
      <ViewSeries
        seriesDetails={series}
        loading={loading}
        subscribing={subscribing && loadingCaptcha}
        signedWalletAddress={signedWalletAddress}
        onTipOwner={onTipViewVisibilityChange}
        onSubscribe={onSubscribe}
        onRevise={onSeriesEditModalVisibilityChange}
        getNextPage={getNextPage}
      />
    </>
  );
};
