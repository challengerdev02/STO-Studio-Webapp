import { NearWalletConnectorState } from '../near/connector';
import {
  EVMWalletConnectorExtendedValues,
  EVMWalletConnectorState,
} from '../evm/connector';
import { useRouter } from 'next/router';
import { EVMProvider } from '../evm/provider';
import {
  Context,
  createContext,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { NearProtocolProvider } from '../near/provider';
import { isPlainObject } from 'lodash';
import { useDispatch } from 'react-redux';
import { Modal, Typography } from 'antd';
import { SUIWalletState, useSuiWallet } from '../sui';
import { SolanaWalletState, useSolanaWallet } from '../solana';
import { WalletContextState as SUIWalletContextState } from '@suiet/wallet-kit';
import { getBtcSeedSignature } from '../evm/utils';
import { sha256 } from '@/shared/utils';

export interface BaseProviderState {
  isConnected?: boolean;
  isConnecting?: boolean;
  showSignaturePrompt?: boolean;
  env?: string | null;
  near?: NearWalletConnectorState | null;
  evm?: EVMWalletConnectorState | null;
  sui?: ({ signedAddress?: string } & Partial<SUIWalletContextState>) | null;
  solana?: Partial<SolanaWalletState> | null;
}

export enum BaseProviderActionTypes {
  CONNECTOR = 'CONNECTOR',
  INITIATE = 'INITIATE',
  ERROR = 'ERROR',
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
  ACCOUNT_PROPERTIES = 'ACCOUNT_PROPERTIES',
  TOGGLE_PROMPT = 'TOGGLE_PROMPT',
}

export interface BaseProviderActions {
  type: BaseProviderActionTypes;
  payload: BaseProviderState;
}

const defaultState: BaseProviderState = {
  isConnected: false,
  isConnecting: false,
  env: null,
  near: null,
  evm: null,
  sui: null,
  solana: null,
};

export type MergeTypes<A, B, C> = {
  [key in keyof A]: key extends keyof B
    ? B[key]
    : key extends keyof C
    ? C[key]
    : A[key];
} & B &
  C;

export interface BaseProviderExtendedValues
  extends EVMWalletConnectorExtendedValues {}

type NearSUIStateMerge = MergeTypes<
  Partial<NearWalletConnectorState>,
  Partial<SUIWalletState>,
  Partial<SolanaWalletState>
>;

export interface BaseProviderContextValues
  extends Partial<EVMWalletConnectorState>,
    Pick<BaseProviderState, 'env' | 'isConnected' | 'isConnecting'>,
    BaseProviderExtendedValues,
    NearSUIStateMerge {
  connect: (...args: string[]) => Promise<void>;
  sign: (...args: any[]) => Promise<void>;
  disconnect: () => Promise<void>;
  getBalance: () => Promise<string>;
  unlockOrdinalWallet: (
    userInf: { walletAddress: string; user: string },
    ...args: any[]
  ) => Promise<any>;
}

export const BaseWeb3Context: Context<BaseProviderContextValues> =
  createContext<BaseProviderContextValues>({
    connect: async () => {},
    sign: async () => {},
    disconnect: async () => {},
    getBalance: async () => '0',
    unlockOrdinalWallet: async () => null,
    ...defaultState,
  });

interface BaseProviderProps {
  children: ReactNode | ReactNode[];
}

export type ReduxDispatch = ReturnType<typeof useDispatch>;

export const BaseProvider = (props: BaseProviderProps) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, defaultState);
  const reduxDispatcher = useDispatch();

  const suiProvider = useSuiWallet(dispatch, reduxDispatcher);
  const solanaProvider = useSolanaWallet(dispatch, reduxDispatcher);
  const evmProvider = new EVMProvider(router, state, dispatch, reduxDispatcher);
  const nearProvider = new NearProtocolProvider(
    router,
    state,
    dispatch,
    reduxDispatcher
  );

  const connect = async (...args: any[]) => {
    switch (args[0]) {
      case 'near':
        await nearProvider.connect();
        break;

      case 'sui':
        suiProvider.connect(args[1]);
        break;

      case 'solana':
        solanaProvider.select(args[1]);
        break;

      case 'evm':
      default:
        await evmProvider.connect(args[1]);
        break;
    }
  };

  const disconnect = async () => {
    switch (state.env) {
      case 'near':
        await nearProvider.disconnect();
        break;

      case 'sui':
        await suiProvider.disconnect();
        break;

      case 'sui':
        await suiProvider.disconnect();
        break;

      case 'evm':
      default:
        await evmProvider.disconnect();
        break;
    }
  };

  const sign = async (...args: any[]) => {
    switch (state.env) {
      case 'near':
        await nearProvider.sign();
        break;

      case 'sui':
        await suiProvider.sign();
        break;

      case 'solana':
        await solanaProvider.sign({
          messageObject: args[1],
          message: args[2],
          result: args[3],
        });
        break;

      case 'evm':
      default:
        await evmProvider.sign(args[0]);
        break;
    }
  };

  const signMessage = async (...args: any[]) => {
    switch (state.env) {
      case 'near':
      //return await nearProvider.signMessage();

      case 'sui':
      //return await suiProvider.signMessage();

      case 'evm':
      default:
        return evmProvider.signMessage(args[0]);
    }
  };

  const unlockOrdinalWallet = async (
    info: { walletAddress: string; userId: string },
    ..._: any[]
  ) => {
    switch (state.env) {
      default:
        const message = getBtcSeedSignature({
          walletAddress: info.walletAddress,
          user: info.userId,
          environment: state.env,
        });
        return signMessage(message)
          .then((signature) => {
            return Buffer.from(sha256(signature), 'hex');
          })
          .catch((e) => {
            console.error(e);
            throw e;
          });
    }
  };

  const getBalance = async (): Promise<string> => {
    switch (state.env) {
      case 'near':
        return await nearProvider.getBalance();

      case 'evm':
      default:
        return await evmProvider.getBalance();
    }
  };

  const onToggleSignaturePrompt = (visibility: boolean = false) => {
    dispatch({
      type: BaseProviderActionTypes.TOGGLE_PROMPT,
      payload: { showSignaturePrompt: visibility },
    });
  };

  const onInit = async (): Promise<void> => {
    await nearProvider.onInit();
    await evmProvider.onInit();
  };

  useEffect(() => {
    nearProvider.detectConnection();
  }, [router.query]);

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    evmProvider.removeListeners(state.evm?.provider);
    evmProvider.initializeListeners(state.evm?.provider);

    return () => {
      evmProvider.removeListeners(state.evm?.provider);
    };
  }, [state.evm?.provider]);

  // Add extension function [functions used by every provider]
  const extensions = { verifyEVMChain: evmProvider.verifyChain };
  // Create a joint state
  const _envState = Object.assign(
    {},
    state.near,
    state.evm,
    state.solana,
    suiProvider ? suiProvider : null
  );

  // console.log("nadafaf", s)
  const _values: BaseProviderContextValues = {
    ..._envState,
    connect,
    disconnect,
    sign,
    getBalance,
    ...state,
    signMessage,
    unlockOrdinalWallet,
    ...extensions,
  };

  return (
    <BaseWeb3Context.Provider value={_values}>
      <Modal
        visible={state?.showSignaturePrompt}
        onCancel={async () => {
          await _values.disconnect();
          onToggleSignaturePrompt(false);
        }}
        okText={'Accept and Sign'}
        cancelText={'Cancel'}
        okButtonProps={{
          shape: 'round',
        }}
        cancelButtonProps={{
          shape: 'round',
        }}
        onOk={() => _values.sign(_values?.chainChangeCallback)}
      >
        <Typography.Title>Signature Required!</Typography.Title>

        <span>
          By connecting your wallet and using {process.env.NEXT_PUBLIC_APP_NAME}
          , you agree to our{' '}
          <a
            href={
              process.env.NEXT_PUBLIC_TERMS_OF_SERVICE ??
              'https://metacomic.tawk.help/article/terms-of-service'
            }
            target={'_blank'}
            rel={'noreferrer'}
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            target={'_blank'}
            href={
              process.env.NEXT_PUBLIC_PRIVACY_POLICY ??
              'https://metacomic.tawk.help/article/privacy-policy'
            }
            rel={'noreferrer'}
          >
            Privacy Policy
          </a>
          .
        </span>
      </Modal>
      {props.children}
    </BaseWeb3Context.Provider>
  );
};

const appendReducerState = (
  state: Record<string, any>,
  incoming: Record<string, any>
): Record<string, any> => {
  const _state = { ...state };

  for (const prop in incoming) {
    if (isPlainObject(state[prop]) && isPlainObject(incoming[prop])) {
      _state[prop] = Object.assign({}, state[prop], incoming[prop]);
    } else {
      _state[prop] = incoming[prop];
    }
  }

  return _state;
};

export function reducer(state: BaseProviderState, action: BaseProviderActions) {
  const { type, payload } = action;
  switch (type) {
    case BaseProviderActionTypes.CONNECTOR:
    case BaseProviderActionTypes.INITIATE:
    case BaseProviderActionTypes.ERROR:
    case BaseProviderActionTypes.CONNECTED:
    case BaseProviderActionTypes.CONNECTING:
    case BaseProviderActionTypes.DISCONNECTED:
    case BaseProviderActionTypes.ACCOUNT_PROPERTIES:
    case BaseProviderActionTypes.TOGGLE_PROMPT:
      return appendReducerState(state, payload);
    default:
      return state;
  }
}
