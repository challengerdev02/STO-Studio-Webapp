import { NextRouter } from 'next/router';
import { EVMWalletConnectorState } from '../connector';
import { Web3Controller } from '../controller';
import Web3 from 'web3';
import { Storage } from '@/shared/utils';
import {
  WEB3_CACHED_PROVIDER_KEY,
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
import {
  clearProvider,
  onWalletConnectionError,
  signMessage,
  toEther,
} from '../utils';
import { notification } from 'antd';
import { isFunction } from 'lodash';
import { Dispatch } from 'react';
import {
  BaseProviderActions,
  BaseProviderActionTypes,
  BaseProviderState,
  ReduxDispatch,
} from '../../base';
import { providerOptions } from '../provider-options';
import { ActionOption } from '../../../redux/types';
import { getAccount } from '@/actions';

export class EVMProvider {
  controller: Web3Controller;
  router: NextRouter;
  state: BaseProviderState;
  evmState?: EVMWalletConnectorState | null = null;
  dispatch: Dispatch<BaseProviderActions>;
  reduxDispatcher: ReduxDispatch;

  constructor(
    router: NextRouter,
    state: BaseProviderState,
    dispatch: Dispatch<BaseProviderActions>,
    reduxDispatcher: ReduxDispatch
  ) {
    this.router = router;
    this.controller = new Web3Controller({
      providerOptions,
      network: 'mainnet',
    });

    this.state = state;
    this.evmState = this.state.evm;
    this.dispatch = dispatch;
    this.reduxDispatcher = reduxDispatcher;
  }

  connect = async (providerName?: string) => {
    // if (providerName === 'metamask' && !isMetamask()) {
    //   const a = document.createElement('a');
    //   a.href = 'https://metamask.io/download';
    //   a.target = '_blank';
    //   a.click();
    //   return;
    // }
    //
    this.dispatch({
      type: BaseProviderActionTypes.CONNECTING,
      payload: {
        isConnecting: true,
        isConnected: false,
        evm: {
          providerName,
        },
        env: 'evm',
      },
    });

    try {
      const provider = await this.controller.connect(
        providerName ?? 'metamask'
      );

      const web3 = new Web3(provider);

      const chainId = await web3.eth.getChainId();
      const accounts = await web3.eth.getAccounts();

      const storage = new Storage(WEB3_CACHED_PROVIDER_KEY);
      const signatureStorage = new Storage(
        WEB3_SIGNATURE_STORAGE_KEY,
        {},
        {
          set: WEB3_SIGNATURE_STORAGE_SET_KEY,
        }
      );

      storage.set(providerName);

      const storedAddress = signatureStorage.get()?.['address'];

      // await signMessage(web3, { chainId, accounts });
      this.dispatch({
        type: BaseProviderActionTypes.CONNECTED,
        payload: {
          isConnecting: false,
          isConnected: true,
          evm: {
            providerName,
            provider,
            chainId,
            accounts,
          },
          env: 'evm',
        },
      });

      if (!storedAddress || storedAddress != accounts[0]) {
        this.onToggleSignaturePrompt(true);
      } else {
        this.dispatch({
          type: BaseProviderActionTypes.ACCOUNT_PROPERTIES,
          payload: {
            evm: {
              signedAddress: accounts[0],
            },
          },
        });
        this.handleGetAccount();
      }
    } catch (e) {
      // //console.log('SignatureError', e);
      this.onToggleSignaturePrompt(false);
      onWalletConnectionError(this.dispatch, e);
    }
  };

  sign = async (callback?: () => void) => {
    console.log(
      this.evmState?.chainId &&
        this.evmState.accounts &&
        this.evmState.provider,
      this.evmState
    );
    try {
      if (
        this.evmState?.chainId &&
        this.evmState.accounts &&
        this.evmState.provider
      ) {
        const web3 = new Web3(this.evmState.provider);
        await signMessage(web3, {
          chainId: this.evmState.chainId,
          accounts: this.evmState.accounts,
        });
        this.dispatch({
          type: BaseProviderActionTypes.ACCOUNT_PROPERTIES,
          payload: {
            evm: {
              signedAddress: this.state?.evm?.accounts?.[0],
            },
          },
        });
        this.handleGetAccount();
        this.onToggleSignaturePrompt(false);
        if (callback) {
          callback();
        }
      }
    } catch (e) {
      onWalletConnectionError(this.dispatch, e);
    }
  };

  onToggleSignaturePrompt = (visibility: boolean = false) => {
    this.dispatch({
      type: BaseProviderActionTypes.TOGGLE_PROMPT,
      payload: { showSignaturePrompt: visibility },
    });
  };

  disconnect = async () => {
    clearProvider(this.dispatch);

    notification.info({
      placement: 'bottomLeft',
      message: 'You have disconnected your wallet',
      description: 'Click on connect wallet to connect again',
    });
  };

  onInit = async () => {
    if (
      Storage.hasKey(WEB3_CACHED_PROVIDER_KEY) &&
      !Storage.isEmpty(WEB3_CACHED_PROVIDER_KEY)
    ) {
      await this.connect(
        JSON.parse(Storage.get(WEB3_CACHED_PROVIDER_KEY) ?? '') as string
      );
    }
  };

  accountsChangedListener = () => {
    // if (
    //   Storage.hasKey(WEB3_CACHED_PROVIDER_KEY) &&
    //   !Storage.isEmpty(WEB3_CACHED_PROVIDER_KEY)
    // ) {

    if (this.state) {
      const signatureStorage = new Storage(
        WEB3_SIGNATURE_STORAGE_KEY,
        {},
        {
          set: WEB3_SIGNATURE_STORAGE_SET_KEY,
        }
      );
      // const providerName = state.pr
      clearProvider(this.dispatch);
      signatureStorage.clear();
      this.onToggleSignaturePrompt(true);
      this.connect(this.evmState?.providerName);
    }
    // }
    // window.location.reload();
  };

  chainChangedListener = (chainId: any) => {
    if (this.evmState) {
      // this.dispatch({
      //   type: BaseProviderActionTypes.CONNECTED,
      //   payload: {
      //     chainId: new Web3().utils.toNumber(chainId),
      //   },
      // });

      this.controller
        .connect(String(this.evmState.providerName))
        .then((provider) => {
          //console.log(chainId);
          this.dispatch({
            type: BaseProviderActionTypes.CONNECTED,
            payload: {
              // ...evmState,
              evm: {
                chainId: new Web3().utils.toNumber(chainId),
                provider,
              },
            },
          });
        });

      // if (evmState.chainId && new Web3().utils.toHex(evmState.chainId) != chainId) {
      // if (this.evmState.providerName) {
      this.connect(this.evmState.providerName as string);
      // }
      // }

      //TODO: add function that tells users to switch back to recognised chain. [Use a modal to allow users to switch]
    }
  };

  initializeListeners = (provider: any) => {
    if (provider && isFunction(provider?.on)) {
      // Subscribe to account change
      provider.on('accountsChanged', this.accountsChangedListener);

      // Subscribe to chainId change
      provider.on('chainChanged', this.chainChangedListener);
    }
  };

  removeListeners = (provider: any) => {
    if (provider && isFunction(provider?.on)) {
      // Subscribe to account change
      if (isFunction(provider.removeListener)) {
        provider.removeListener(
          'accountsChanged',
          this.accountsChangedListener
        );

        // Subscribe to chainId change
        provider?.removeListener('chainChanged', this.chainChangedListener);
      }
    }
  };

  getBalance = async () => {
    const address = this.evmState?.accounts?.[0];
    if (
      this.state &&
      this.evmState &&
      this.state?.isConnected &&
      this.evmState.provider &&
      address
    ) {
      const address = this.evmState.accounts?.[0];
      const web3 = new Web3(this.evmState.provider);
      const balance = await web3.eth.getBalance(address as string);

      return toEther(balance);
    }
    return '0';
  };

  verifyChain = async (
    chainId: string,
    rpcURLs: string[],
    chainName: string,
    nativeCurrency?: Record<string, any>,
    blockExplorerUrls?: string[],
    callback?: () => void
  ) => {
    if (this.evmState?.provider) {
      Web3Controller.verifyChain(
        this.evmState.provider,
        new Web3().utils.toHex(chainId),
        rpcURLs,
        chainName,
        nativeCurrency,
        blockExplorerUrls
      ).then(async () => {
        // //console.log('accountCHANGE', chainId, evmState.chainId);
        if (this.evmState && parseInt(chainId) !== this.evmState.chainId) {
          // onToggleSignaturePrompt(true);
        }
        this.dispatch({
          type: BaseProviderActionTypes.CONNECTED,
          payload: {
            ...this.evmState,
            evm: {
              chainId: parseInt(chainId),
              chainChangeCallback: callback,
            },
            // provider: { ... evmState.provider}
          },
        });
        // storage.clear();
      });
    }
  };

  handleGetAccount = (options?: ActionOption) => {
    // console.log('GETTINGACCOUNT');
    this.reduxDispatcher(
      getAccount({
        key: '@@user-account',
        ...options,
      })
    );
  };
}
