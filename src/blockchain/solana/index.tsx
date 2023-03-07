import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
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

export interface SolanaWalletState extends WalletContextState {
  select: (walletName: any) => void;
  sign: ({}: any) => void;
  getBalance: () => void;
  signedAddress?: string;
}

export function useSolanaWallet(
  dispatch: Dispatch<BaseProviderActions>,
  reduxDispatcher: ReduxDispatch
): SolanaWalletState {
  const wallet = useWallet();

  const select = async (walletName: any) => {
    dispatch({
      type: BaseProviderActionTypes.CONNECTING,
      payload: {
        isConnecting: true,
        isConnected: false,
        solana: wallet,
        env: 'solana',
      },
    });
  };

  const sign = async ({ messageObject, message, result }: any) => {
    console.log({ messageObject, message, result });
    const storage = new Storage(
      WEB3_SIGNATURE_STORAGE_KEY,
      {},
      {
        set: WEB3_SIGNATURE_STORAGE_SET_KEY,
      }
    );

    try {
      dispatch({
        type: BaseProviderActionTypes.ACCOUNT_PROPERTIES,
        payload: {
          solana: wallet,
          evm: {
            signedAddress: messageObject.publicKey,
          },
          isConnected: true,
          isConnecting: false,
        },
      });

      onToggleSignaturePrompt(false);
      getServerAccount();

      storage.update((prevState) => {
        return {
          chainId: 100,
          ...prevState,
          ...messageObject,
          message,
          signature: result,
          ...result,
          address: messageObject.publicKey,
          env: 'solana',
          connectionEnvironment: 'solana',
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
    return '0';
  };

  const onToggleSignaturePrompt = (visibility: boolean = false) => {
    dispatch({
      type: BaseProviderActionTypes.TOGGLE_PROMPT,
      payload: { showSignaturePrompt: visibility },
    });
  };

  const getServerAccount = (options?: ActionOption) => {
    console.log(options, 'aaaaaaaaaaaaaaaaa');
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
        env: 'solana',
        solana: wallet,
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

    if (!storedAccount || storedAccount != wallet.publicKey) {
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
        solana: null,
        isConnected: false,
      },
    });
  };

  useEffect(() => {
    console.log('Wallet::::', wallet);
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
    select,
    sign,
    getBalance,
    disconnect,
  };
}
