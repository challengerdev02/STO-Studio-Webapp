import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { getAuthMessage, Storage } from '@/shared/utils';
import {
  WEB3_CACHED_PROVIDER_KEY,
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
  THEME_STORAGE_KEY,
  SOLANA_CHAIN_ID,
} from '@/shared/constants';
import {
  BaseProviderActions,
  BaseProviderActionTypes,
  ReduxDispatch,
} from '../base';
import { Dispatch, useEffect } from 'react';
import { ActionOption } from '../../redux/types';
import { getAccount } from '@/actions';
import { onWalletConnectionError } from '../evm/utils';
import { notification } from 'antd';
import bs58 from 'bs58';
import { useRouter } from 'next/router';

export interface SolanaWalletState extends WalletContextState {
  connectWallet: (providerName: any) => void;
  signWallet: (message: string) => Promise<string>;
  sign: () => void;
  getBalance: () => void;
  signedAddress?: string;
  accounts?: string[];
  providerName?: string;
  chainId?: number;
}

export function useSolanaWallet(
  dispatch: Dispatch<BaseProviderActions>,
  reduxDispatcher: ReduxDispatch
): SolanaWalletState {
  const wallet = useWallet();
  const router = useRouter();
  const connectWallet = async (providerName: any) => {
    dispatch({
      type: BaseProviderActionTypes.CONNECTING,
      payload: {
        isConnecting: true,
        isConnected: false,
        solana: {
          providerName,
          chainId: SOLANA_CHAIN_ID,
        },
        env: 'solana',
      },
    });

    try {
      wallet.select(providerName);
      const storage = new Storage(WEB3_CACHED_PROVIDER_KEY);
      storage.set(providerName);
    } catch (e) {
      onToggleSignaturePrompt(false);
      onWalletConnectionError(dispatch, e);
    }
  };

  const signWallet = async (message: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const signature: any = await wallet.signMessage?.(data);
    return signature;
  };

  const sign = async () => {
    try {
      const storage = new Storage(
        WEB3_SIGNATURE_STORAGE_KEY,
        {},
        {
          set: WEB3_SIGNATURE_STORAGE_SET_KEY,
        }
      );

      const encoder = new TextEncoder();
      const messageObject = {
        address: wallet.publicKey?.toBase58(),
        chainId: SOLANA_CHAIN_ID,
        timestamp: Date.now(),
      };

      const message = getAuthMessage({
        walletAddress: String(messageObject.address),
        environment: 'solana',
        nonce: messageObject.timestamp,
      });

      const data = encoder.encode(message);
      const signature: any = await wallet.signMessage?.(data);
      const serializedSignature = bs58.encode(signature);

      notification.success({
        placement: 'bottomLeft',
        message: 'Wallet Connected Successfully',
      });

      storage.update((prevState) => {
        return {
          ...prevState,
          ...messageObject,
          signature: serializedSignature,
          message,
          connectionEnvironment: 'solana',
        };
      });
      dispatch({
        type: BaseProviderActionTypes.ACCOUNT_PROPERTIES,
        payload: {
          solana: {
            signedAddress: wallet.publicKey?.toBase58(),
            accounts: [String(wallet.publicKey?.toBase58())],
          },
          isConnected: true,
          isConnecting: false,
        },
      });

      onToggleSignaturePrompt(false);
      getServerAccount();
      router.replace('/account/wallet-setup');
    } catch (e: any) {
      console.error('%cSolana SignMessage failed', 'color: red', e);
      notification.error({
        placement: 'bottomLeft',
        message: "We couldn't connect to your wallet.",
        description: e.message,
      });
    }
  };

  const getBalance = async () => {
    return '0';
  };

  const onToggleSignaturePrompt = (visibility: boolean = false) => {
    dispatch({
      type: BaseProviderActionTypes.TOGGLE_PROMPT,
      payload: { showSignaturePrompt: visibility },
    });
  };

  const getServerAccount = (options?: ActionOption) => {
    reduxDispatcher(
      getAccount({
        key: '@@user-account',
        ...options,
      })
    );
  };

  const detectConnection = () => {
    const signatureStorage = new Storage(
      WEB3_SIGNATURE_STORAGE_KEY,
      {},
      {
        set: WEB3_SIGNATURE_STORAGE_SET_KEY,
      }
    );

    const storedAccount = signatureStorage.get()?.['address'];

    if (!storedAccount || storedAccount != wallet.publicKey) {
      onToggleSignaturePrompt(true);
    } else {
      getServerAccount();
    }
  };

  const disconnect = async () => {
    wallet.disconnect();
    Storage.keepOnly(['persist:metacomic', THEME_STORAGE_KEY]);
    dispatch({
      type: BaseProviderActionTypes.DISCONNECTED,
      payload: {
        solana: {
          providerName: undefined,
          accounts: [],
        },
        isConnected: false,
        isConnecting: false,
      },
    });
  };

  useEffect(() => {
    if (!wallet.connected) return;

    // const off = wallet.on('chainChange', ({ chain }) => {
    //     console.log('chainChange', chain);
    // });

    detectConnection();
    return () => {
      console.log('chainChange');
    };
  }, [wallet.connected]);

  return {
    ...wallet,
    signWallet,
    connectWallet,
    sign,
    getBalance,
    disconnect,
  };
}
