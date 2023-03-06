import Img from '/public/assets/logo-dark.svg';
import { BaseLayoutHeaderProps, Footer, LayoutHeader } from '@/components';
import { ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BaseWeb3Context } from '../../blockchain/base';
import { Storage } from '@/shared/utils';
import {
  WEB3_CACHED_PROVIDER_KEY,
  WEB3_SIGNATURE_STORAGE_KEY,
} from '@/shared/constants';
import { get, has, isEmpty } from 'lodash';
import { UserContext, UserContextProvider } from '@/context';
import { Main, MainContainer } from '@/components/layout/main-layout';
import { useWallet } from '../../blockchain/evm/hooks';
import { useAccount, useSearchItem, useUIState } from '@/hooks';
import { SUPPORTED_NETWORKS } from '../../blockchain/evm/utils';
import { useDispatch } from 'react-redux';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ActionOption } from '../../redux/types';
import { getAccount } from '@/actions';

interface MainLayoutProps {
  children: ReactNode | ReactNode[];
}

export const MainLayoutContainer = (props: MainLayoutProps) => {
  const { children } = props;

  const { accounts, disconnect, isConnected, chainId, signedAddress } =
    useContext(BaseWeb3Context);

  const walletAddress = (accounts ?? [])[0];
  const router = useRouter();

  const onConnectWallet = () => {
    if (!/connect/.test(router.pathname)) {
      router.push(`/connect?referrer=${router.asPath}`);
    }
  };

  const onDisconnectWallet = async () => {
    await disconnect();
    router.push(`/connect?referrer=/account`);
  };

  const dispatchAction = useDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleGetAccount = (options?: ActionOption) => {
    if (!executeRecaptcha) return;
    try {
      executeRecaptcha?.('subscription')
        .then((captcha) => {
          dispatchAction(
            getAccount({
              key: '@@user-account',
              ...options,
              captcha,
            })
          );
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (signedAddress && walletAddress && executeRecaptcha) {
      handleGetAccount();
    }
  }, [signedAddress, isConnected, executeRecaptcha]);

  const onCreate = () => {
    if (isConnected && !/connect/.test(router.pathname)) {
      router.push('/assets/create');
    } else {
      onConnectWallet();
    }
  };
  const supportedNetworks = Object.keys(SUPPORTED_NETWORKS)
    .map((k: any) => SUPPORTED_NETWORKS[k])
    .map((d: any) => d.name)
    .sort();

  return (
    <MainContainer>
      <UserContextProvider dependencies={[walletAddress]}>
        <LayoutHeaderContainer
          walletAddress={walletAddress}
          onDisconnectWallet={onDisconnectWallet}
          onConnectWallet={onConnectWallet}
          onCreate={onCreate}
        />
      </UserContextProvider>
      {chainId && !SUPPORTED_NETWORKS[chainId] && (
        <div
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#ff00007a',
          }}
        >
          <h3 style={{ margin: 'auto', textAlign: 'center' }}>
            The selected network is not supported. Please switch to one of{' '}
            <b>{supportedNetworks.join(', ')}</b>
          </h3>
        </div>
      )}

      <Main>{children}</Main>
      <Footer imgSrc={Img} />
    </MainContainer>
  );
};

// TODO: Clear redux store on disconnect
export const LayoutHeaderContainer = (
  props: Omit<BaseLayoutHeaderProps, 'loading' | 'getBalance'>
) => {
  const balanceKey = '@@header/get-balance';
  const searchKey = '@@header/search-key';
  const hCOMI_BAL_KEY = '@@header/get-hCOMI-balance';

  const user = useContext(UserContext);
  const { accounts, isConnected } = useContext(BaseWeb3Context);
  const { handleGetHCOMIBalance, tip: hComiBalance } = useAccount({
    key: hCOMI_BAL_KEY,
  });

  const { getBalance, balance } = useWallet(props.walletAddress as string, {
    key: balanceKey,
  });
  const walletAddress = (accounts ?? [])[0];

  const { items, handleSearch, clearSearch } = useSearchItem({
    key: searchKey,
  });

  const {
    uiLoaders: {
      [balanceKey]: isGettingBalance,
      [searchKey]: isSearching,
      [hCOMI_BAL_KEY]: isGettingHComiBalance,
    },
  } = useUIState();

  const onSearch = (value: string) => {
    handleSearch({ params: { search: value } });
  };

  const onGetHCOMIBalance = () => {
    if (isConnected && walletAddress) {
      handleGetHCOMIBalance(walletAddress, {
        uiKey: hCOMI_BAL_KEY,
        noSuccessMessage: true,
      });
    }
  };

  return (
    <LayoutHeader
      {...user}
      {...props}
      getBalance={getBalance}
      balanceObject={balance}
      isGettingBalance={isGettingBalance}
      items={items}
      onSearch={onSearch}
      isSearching={isSearching}
      clearSearch={clearSearch}
      onGetHCOMIBalance={onGetHCOMIBalance}
      hComiBalance={hComiBalance}
      isGettingHComiBalance={isGettingHComiBalance}
    />
  );
};

//TODO: create layer to pull recorded user from upstream.
export const AuthLayoutContainer = (props: MainLayoutProps) => {
  const { children } = props;
  const { accounts, isConnected, chainId } = useContext(BaseWeb3Context);
  const address = (accounts ?? [])[0];
  const router = useRouter();

  const onAuthenticateUser = () => {
    const storage = new Storage(WEB3_SIGNATURE_STORAGE_KEY);
    // const providerStorage = new Storage(WEB3_CACHED_PROVIDER_KEY);
    const chainIdStorage = get(storage.get(), 'chainId');
    const timestampStorage = get(storage.get(), 'timestamp');
    const isGreaterThan24Hours =
      timestampStorage &&
      new Date().getTime() - parseInt(timestampStorage) > 86400000;

    if (!address || !isConnected) {
      if (!/connect/.test(router.pathname)) {
        router.replace(`/connect?referrer=${router.asPath}`).then();
        return;
      }
    }
    if (
      (!address &&
        // !isConnected ||
        isEmpty(storage.get())) ||
      !has(localStorage, WEB3_CACHED_PROVIDER_KEY) ||
      chainIdStorage !== chainId ||
      isGreaterThan24Hours
    ) {
      // storage.clear();
      // providerStorage.clear();
      // if (!/connect/.test(router.pathname)) {
      //   router.replace(`/connect?referrer=${router.asPath}`);
      // }
    }
  };

  useEffect(() => {
    onAuthenticateUser();
  }, [address, isConnected]);

  return <>{children}</>;
};
