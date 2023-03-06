import { NearProtocolController } from '../controller';
import { NextRouter } from 'next/router';
import { flatten, get, has, isEmpty } from 'lodash';
import { NearWalletConnectorState } from '../connector';
import {
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
import { Storage } from '@/shared/utils';
import {
  BaseProviderActions,
  BaseProviderActionTypes,
  BaseProviderState,
  ReduxDispatch,
} from '../../base';
import { Dispatch } from 'react';
import { ActionOption } from '../../../redux/types';
import { getAccount } from '@/actions';

export class NearProtocolProvider {
  controller: NearProtocolController;
  router: NextRouter;
  nearState?: NearWalletConnectorState | null = null;
  state: BaseProviderState;
  dispatch: Dispatch<BaseProviderActions>;
  reduxDispatcher: ReduxDispatch;

  constructor(
    router: NextRouter,
    state: BaseProviderState,
    dispatch: Dispatch<BaseProviderActions>,
    reduxDispatcher: ReduxDispatch
  ) {
    this.controller = new NearProtocolController('testnet');
    this.router = router;

    this.state = state;
    this.nearState = state.near;
    this.dispatch = dispatch;
    this.reduxDispatcher = reduxDispatcher;
  }

  onInit = async () => {
    try {
      const { contract, walletConnection, nearConfig, currentUser } =
        await this.controller.connect();

      this.dispatch({
        type: BaseProviderActionTypes.INITIATE,
        payload: {
          isConnecting: false,
          isConnected: false,
          near: {
            contract,
            wallet: walletConnection,
            nearConfig,
            currentUser,
          },
        },
      });
    } catch (e) {
      // onWalletConnectionError(dispatch, e);
    }
  };

  disconnect = async () => {
    if (this.nearState?.wallet) {
      this.nearState.wallet.signOut();
    }
  };

  connect = async () => {
    this.dispatch({
      type: BaseProviderActionTypes.CONNECTING,
      payload: {
        isConnecting: true,
      },
    });
    if (this.nearState?.wallet && this.nearState.nearConfig) {
      await this.nearState.wallet.requestSignIn({
        contractId: this.nearState.nearConfig.contractName,
        methodNames: flatten([
          NearProtocolController.changeMethods,
          NearProtocolController.viewMethods,
        ]),
      });
    }
  };

  getBalance = async () => {
    if (this.nearState?.currentUser) {
      return this.nearState.currentUser.balance;
    }
    return '0';
  };

  sign = async () => {
    if (this.nearState?.wallet && this.nearState.currentUser) {
      const storage = new Storage(
        WEB3_SIGNATURE_STORAGE_KEY,
        {},
        {
          set: WEB3_SIGNATURE_STORAGE_SET_KEY,
        }
      );

      const data = await this.controller.sign(
        this.nearState.wallet._keyStore,
        this.nearState.currentUser.accountId,
        this.nearState.wallet._networkId
      );

      this.dispatch({
        type: BaseProviderActionTypes.ACCOUNT_PROPERTIES,
        payload: {
          near: {
            signedAddress: data.address,
          },
        },
      });

      this.onToggleSignaturePrompt(false);
      this.getServerAccount();

      storage.update((prevState) => {
        return {
          ...prevState,
          ...data,
          accountId: this.nearState?.currentUser?.accountId,
          networkId: this.nearState?.wallet?._networkId,
          env: 'near',
        };
      });
    }
  };

  detectConnection = async () => {
    const connectedParams = ['account_id', 'all_keys', 'public_key'];
    const connected = connectedParams.every(
      (param) =>
        has(this.router.query, param) && !isEmpty(get(this.router.query, param))
    );

    if (connected) {
      const accountId = get(this.router.query, 'account_id') as string;
      await this.onInit();
      this.dispatch({
        type: BaseProviderActionTypes.CONNECTED,
        payload: {
          isConnecting: false,
          isConnected: true,
          env: 'near',
        },
      });

      const signatureStorage = new Storage(
        WEB3_SIGNATURE_STORAGE_KEY,
        {},
        {
          set: WEB3_SIGNATURE_STORAGE_SET_KEY,
        }
      );

      const storedAccount = signatureStorage.get()?.['accountId'];

      if (!storedAccount || storedAccount != accountId) {
        this.onToggleSignaturePrompt(true);
      } else {
        this.dispatch({
          type: BaseProviderActionTypes.ACCOUNT_PROPERTIES,
          payload: {
            near: {
              signedAddress: get(this.router.query, 'account_id') as string,
            },
          },
        });
        this.getServerAccount();
      }
    }

    return connected;
  };

  onToggleSignaturePrompt = (visibility: boolean = false) => {
    this.dispatch({
      type: BaseProviderActionTypes.TOGGLE_PROMPT,
      payload: { showSignaturePrompt: visibility },
    });
  };

  getServerAccount = (options?: ActionOption) => {
    this.reduxDispatcher(
      getAccount({
        key: '@@user-account',
        ...options,
      })
    );
  };
}
