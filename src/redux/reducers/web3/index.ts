import { Action } from '../../types';
import {
  CALL_CONTRACT_METHOD,
  GET_WALLET_BALANCE,
  SEND_CONTRACT_METHOD,
} from '@/actions';

export interface Web3ReducerState {
  balance: {
    default: string;
    [address: string]: string;
  };
  contracts: Record<
    string,
    {
      [key: string]: any;
    }
  >;
}

export const Web3DefaultState: Web3ReducerState = {
  contracts: {},
  balance: {
    default: '',
  },
};

const Web3Reducer = (state = Web3DefaultState, action: Action) => {
  switch (action.type) {
    case GET_WALLET_BALANCE.SUCCESS: {
      return {
        ...state,
        balance: {
          ...state.balance,
          default: action.payload,
        },
      };
    }
    case SEND_CONTRACT_METHOD.SUCCESS:
    case CALL_CONTRACT_METHOD.SUCCESS: {
      const { contractAddress, methodName, receipt } = action.payload;
      const balance = state.balance;
      if (methodName === 'balanceOf') {
        balance[contractAddress] = receipt;
      }

      return {
        ...state,
        contracts: {
          ...state.contracts,
          [contractAddress]: {
            ...state.contracts[contractAddress],
            [methodName]: receipt,
          },
        },
        balance,
      };
    }
    default:
      return { ...state };
  }
};

export default Web3Reducer;
