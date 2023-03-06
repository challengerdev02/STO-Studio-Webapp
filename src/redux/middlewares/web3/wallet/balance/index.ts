import { GET_WALLET_BALANCE, startUILoading, stopUILoading } from '@/actions';
import Web3 from 'web3';
import { Middleware } from 'redux';
import { RootState } from '../../../../state';

export const getWalletBalance: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_WALLET_BALANCE.START) {
      const { provider, address, key = 'GET_BALANCE' } = action.meta;
      dispatch(startUILoading(key));
      try {
        const web3 = new Web3(provider);
        web3.eth.getBalance(address).then((balance) => {
          dispatch(stopUILoading(key));
          dispatch({ type: GET_WALLET_BALANCE.SUCCESS, payload: balance });
        });
      } catch (e) {
        dispatch(stopUILoading(key));
        dispatch({ type: GET_WALLET_BALANCE.ERROR, e });
      }
    }
  };
