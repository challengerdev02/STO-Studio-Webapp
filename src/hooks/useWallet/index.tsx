import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import { useEffect, useState } from 'react';
import { WalletLink } from 'walletlink';
import ethProvider from 'eth-provider';
import { get, has, isEmpty, isFunction } from 'lodash';
import {
  THEME_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
import { Storage } from '@/shared/utils';
import { notification } from 'antd';
import { SUPPORTED_NETWORKS } from '../../blockchain/evm/utils';

const providerOptions = Object.freeze({
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
  binancechainwallet: {
    package: true,
  },
  frame: {
    package: ethProvider, // required
  },
  walletlink: {
    package: WalletLink, // Required
    options: {
      appName: 'MetaComic', // Required
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: process.env.NEXT_PUBLIC_FORMATIC_KEY,
    },
  },
});

interface UseWalletProps {
  autoConnect?: boolean;
  listeners?: {
    onChainChanged?: (chainId: number) => void;
    onNetworkChanged?: (networkId: number) => void;
    onAccountsChanged?: (accounts: string[]) => void;
    onDisconnect?: () => void;
  };
}

export interface Wallet {
  changeId: number;
  networkId: number;
  accounts: Promise<string[]>;
}

export const useWallet = (props?: UseWalletProps) => {
  const { autoConnect = false, listeners = {} } = props ?? {};
  const [provider, setProvider] = useState<any>(null);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [address, setAddress] = useState<string | null>();
  const [chainId, setChainId] = useState<number | null>();

  const clearProvider = async () => {
    if (web3Modal) {
      Storage.keepOnly(['persist:metacomic', THEME_STORAGE_KEY]);
      await web3Modal.clearCachedProvider();
      setProvider(null);
    }
  };

  const onConnectError = async (e: any) => {
    await clearProvider();
    notification.error({
      placement: 'bottomLeft',
      message: "We couldn't connect to your wallet.",
      description: (
        <div>
          <div style={{ paddingBottom: 20 }}>
            <span>{e?.message ?? 'Something went wrong'}</span>
          </div>
          <div
            style={{ paddingBottom: 20, color: 'var(--text-secondary-color)' }}
          >
            If issue persist, please contact support.
          </div>
          {e.code && (
            <span style={{ color: 'var(--disabled-color)' }}>
              Error code: {e.code}
            </span>
          )}
        </div>
      ),
      duration: 10,
    });
    return null;
  };

  const connect = async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();

        const web3 = new Web3(provider);

        const chainId = await web3.eth.getChainId();
        const accounts = await web3.eth.getAccounts();
        setChainId(chainId);
        const storage = new Storage(
          WEB3_SIGNATURE_STORAGE_KEY,
          {},
          {
            set: WEB3_SIGNATURE_STORAGE_SET_KEY,
          }
        );

        const chainIdStorage = get(storage.get(), 'chainId');
        const timestampStorage = get(storage.get(), 'timestamp');
        const isGreaterThan24Hours =
          timestampStorage &&
          new Date().getTime() - parseInt(timestampStorage) > 86400000;

        if (
          isEmpty(storage.get()) ||
          !has(localStorage, 'WEB3_CONNECT_CACHED_PROVIDER') ||
          chainIdStorage !== chainId ||
          isGreaterThan24Hours
        ) {
          if (!SUPPORTED_NETWORKS[chainId]) {
            await disconnect();
            connect();
          }
          const walletAddress = accounts[0];
          setAddress(accounts[0]);
          const messageObject = {
            chainId,
            timestamp: Date.now(),
          };
          const message = web3.utils.fromUtf8(
            `Welcome to MetaComic! Click to sign in and accept the MetaComics Terms of Service: ${
              process.env.NEXT_PUBLIC_TERMS_OF_SERVICE ??
              'https://metacomic.tawk.help/article/terms-of-service'
            }
            
            This request will not trigger a blockchain transaction or cost any gas fees.
            
            Your authentication status will reset after 24 hours.
            
            Chain ID: ${messageObject.chainId}
            
            Address: ${walletAddress}
            
            Nonce: ${messageObject.timestamp}`
          );
          // //console.log(`"${message}"`);
          await web3.eth.personal.sign(
            message,
            walletAddress,
            '',
            (error: Error, signature: string) => {
              if (error) {
                return;
              }

              notification.success({
                placement: 'bottomLeft',
                message: 'Wallet Connected Successfully',
              });

              storage.update((prevState) => {
                return {
                  ...prevState,
                  eth: {
                    ...messageObject,
                    signature,
                    address: walletAddress,
                    message,
                  },
                };
              });
            }
          );
        }

        setProvider(provider);

        return provider;
      } catch (e: any) {
        return await onConnectError(e);
      }
    }
  };

  const disconnect = async () => {
    if (web3Modal) {
      await clearProvider();

      notification.info({
        placement: 'bottomLeft',
        message: 'You have disconnected your wallet',
        description: 'Click on connect wallet to connect again',
      });

      if (listeners?.onDisconnect && isFunction(listeners.onDisconnect)) {
        listeners.onDisconnect();
      }
    }
    setAddress(null);
  };

  const initialListeners = async () => {
    if (provider && isFunction(provider?.on)) {
      // Subscribe to accounts change
      provider.on('accountsChanged', (accounts: any) => {
        connect();
        if (
          listeners?.onAccountsChanged &&
          isFunction(listeners.onAccountsChanged)
        ) {
          listeners.onAccountsChanged(accounts);
        }
        //console.log('accountsChanged', accounts);
        !!accounts[0] && setAddress(accounts[0]);
      });

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId: any) => {
        connect();
        if (listeners?.onChainChanged && isFunction(listeners.onChainChanged)) {
          listeners.onChainChanged(chainId);
        }
        //console.log('chainChanged', chainId);
        setChainId(chainId);
      });

      // Subscribe to networkId change
      provider.on('networkChanged', (networkId: any) => {
        connect();
        if (listeners?.onChainChanged && isFunction(listeners.onChainChanged)) {
          listeners.onChainChanged(networkId);
        }
        //console.log('networkChanged', networkId);
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
        theme: {
          background: 'var(--web3-modal-background)',
          main: 'var(--heading-color)',
          secondary: 'var(--text-color)',
          border: 'var(--border-color-base)',
          hover: 'var(--web3-modal-hover)',
        },
      });
      setWeb3Modal(web3Modal);
    }
  }, []);

  useEffect(() => {
    if (
      autoConnect &&
      web3Modal &&
      Storage.hasKey('WEB3_CONNECT_CACHED_PROVIDER') &&
      !Storage.isEmpty('WEB3_CONNECT_CACHED_PROVIDER')
    ) {
      connect();
    }
  }, [web3Modal]);

  useEffect(() => {
    initialListeners();
  }, [provider]);

  return {
    connect,
    disconnect,
    provider,
    address,
    chainId,
  };
};

export default useWallet;
