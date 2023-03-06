import {
  useAccountBalance,
  useWallet,
  WalletContextState,
} from '@suiet/wallet-kit';
import { Storage } from '@/shared/utils';
import {
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
import {
  BaseProviderActions,
  BaseProviderActionTypes,
  ReduxDispatch,
} from '../base';
import { Dispatch, useEffect } from 'react';
import { ActionOption } from '../../redux/types';
import { getAccount } from '@/actions';
import { clearProvider } from '../evm/utils';
import { notification } from 'antd';

export interface SUIWalletState extends WalletContextState {
  connect: (id: string) => void;
  sign: () => void;
  getBalance: () => void;
  signedAddress?: string;
}

export function useSuiWallet(
  dispatch: Dispatch<BaseProviderActions>,
  reduxDispatcher: ReduxDispatch
): SUIWalletState {
  const wallet = useWallet();
  const { error, balance } = useAccountBalance();

  const connect = async (walletName: string) => {
    try {
      wallet.select(walletName);
    } catch (e) {
      console.log(e);
    }
  };

  const sign = async () => {
    const storage = new Storage(
      WEB3_SIGNATURE_STORAGE_KEY,
      {},
      {
        set: WEB3_SIGNATURE_STORAGE_SET_KEY,
      }
    );

    try {
      const encoder = new TextEncoder();

      const messageObject = {
        timestamp: Date.now(),
        address: wallet.account?.address,
        publicKey: wallet.account?.publicKey,
        label: wallet.account?.label,
        chainId: wallet.chain?.id,
      };

      // These formatting is important for displaying the signing message.
      const message = `Welcome to MetaComic! Click to sign in and 
accept the MetaComics Terms of Service: 
${
  process.env.NEXT_PUBLIC_TERMS_OF_SERVICE ??
  'https://metacomic.tawk.help/article/terms-of-service'
}

This request will not trigger a blockchain transaction 
or cost any gas fees.

Your authentication status will reset after 24 hours.

Chain ID: ${messageObject.chainId}

Address: 
${messageObject.address}

Nonce: ${messageObject.timestamp}`;

      const array = encoder.encode(message);

      const result = await wallet.signMessage({
        message: array,
      });

      if (!result) return;

      dispatch({
        type: BaseProviderActionTypes.ACCOUNT_PROPERTIES,
        payload: {
          sui: {
            signedAddress: messageObject.address,
          },
          isConnected: true,
          isConnecting: false,
        },
      });

      onToggleSignaturePrompt(false);
      getServerAccount();

      storage.update((prevState) => {
        return {
          ...prevState,
          ...messageObject,
          message,
          ...result,
          env: 'sui',
        };
      });
    } catch (e: any) {
      console.error('%cSUI SignMessage failed', 'color: red', e);
      disconnect();
      onToggleSignaturePrompt(false);
      clearProvider(dispatch);
      notification.error({
        placement: 'bottomLeft',
        message: "We couldn't connect to your wallet.",
        description: e.message,
      });
    }
  };

  const getBalance = async () => {
    if (!error) {
      return balance;
    }

    console.error('%cSUI GetBalance failed', 'color: red', error);
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
    dispatch({
      type: BaseProviderActionTypes.CONNECTED,
      payload: {
        env: 'sui',
        sui: wallet,
      },
    });

    const signatureStorage = new Storage(
      WEB3_SIGNATURE_STORAGE_KEY,
      {},
      {
        set: WEB3_SIGNATURE_STORAGE_SET_KEY,
      }
    );

    const storedAccount = signatureStorage.get()?.['address'];

    if (!storedAccount || storedAccount != wallet.account?.address) {
      onToggleSignaturePrompt(true);
    } else {
      getServerAccount();
    }
  };

  const disconnect = async () => {
    await wallet.disconnect();
    clearProvider(dispatch);
    dispatch({
      type: BaseProviderActionTypes.DISCONNECTED,
      payload: {
        env: null,
        sui: null,
        isConnected: false,
      },
    });
  };

  useEffect(() => {
    console.log('Wallet::::', wallet);
    if (!wallet.connected) return;

    const off = wallet.on('chainChange', ({ chain }) => {
      console.log('chainChange', chain);
    });

    detectConnection();
    return () => {
      off();
    };
  }, [wallet.connected]);

  return {
    ...wallet,
    connect,
    sign,
    getBalance,
    disconnect,
  };
}
