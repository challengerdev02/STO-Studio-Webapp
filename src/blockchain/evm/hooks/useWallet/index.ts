import { useContract } from '../useContract';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletBalance } from '@/actions';
import { RootState } from '../../../../redux/state';
import { ActionOption } from '../../../../redux/types';
import { useContext } from 'react';
import { BaseWeb3Context } from '../../../base';

export const useWallet = (walletAddress: string, options?: ActionOption) => {
  const { callFromAddress } = useContract({ options });
  const { provider } = useContext(BaseWeb3Context);
  const dispatch = useDispatch();

  const { balance } = useSelector((state: RootState) => ({
    balance: state.web3.balance,
  }));

  const getBalance = (
    contractAddress?: string,
    actionOptions: ActionOption = {}
  ) => {
    if (contractAddress) {
      callFromAddress(
        contractAddress,
        'balanceOf',
        actionOptions,
        walletAddress
      );
      return;
    }
    dispatch(getWalletBalance(provider, walletAddress, options));
  };

  return {
    getBalance,
    balance,
  };
};
