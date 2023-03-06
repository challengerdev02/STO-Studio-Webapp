import { ActionOption } from '../../../../redux/types';
import { callContractMethod, sendContractMethod } from '@/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { RootState } from '../../../../redux/state';
import { SUPPORTED_NETWORKS } from '../../utils';
import { notification } from 'antd';
import { BaseWeb3Context } from '../../../base';

interface UseContractReturnType {
  contract: any;
  contractFromAddress: Record<string, any>;
  verifyChain: (blockchain: any, callback?: () => void) => void;
  call: (methodName: string, options?: ActionOption, ...args: any[]) => void;
  send: (
    methodName: string,
    contractOptions?: Record<string, any>,
    options?: ActionOption,
    ...args: any[]
  ) => void;
  callFromAddress: (
    contractAddress: string,
    methodName: string,
    options?: ActionOption,
    _abiName?: string,
    ...args: any[]
  ) => void;
  sendFromAddress: (
    contractAddress: string,
    methodName: string,
    contractOptions?: Record<string, any>,
    options?: ActionOption,
    _abiName?: string,
    ...args: any[]
  ) => void;
}
interface UseContract {
  address?: string;
  options?: ActionOption;
  abiName?: 'Book' | 'Trader' | string;
}

/**
 * Factory hook to interact with a contract
 * @param params
 */
export const useContract = (params: UseContract): UseContractReturnType => {
  const { address, options, abiName } = params;
  const {
    provider,
    chainId,
    verifyEVMChain: verifyWeb3Chain,
  } = useContext(BaseWeb3Context);

  const dispatch = useDispatch();

  const { contract, contractFromAddress } = useSelector((state: RootState) => ({
    contract: state.web3.contracts[address as string] ?? {},
    contractFromAddress: state.web3.contracts ?? {},
  }));

  const onVerifyChain = (blockchain: any, callback?: () => void) => {
    if (Number(blockchain) !== Number(chainId)) {
      const chain = SUPPORTED_NETWORKS[blockchain];
      if (verifyWeb3Chain) {
        verifyWeb3Chain(
          blockchain,
          [chain.rpcURL!],
          chain.name!,
          chain.nativeCurrency,
          [chain.explorerURL!]
        )
          .then(() => {
            //console.log(e, callback);
            if (callback) {
              setTimeout(callback, 3000);
            }
          })
          .catch((reason) => {
            notification.error({
              message: reason.message,
              placement: 'bottomLeft',
              duration: 4,
            });
          });
      }
      return;
    }

    if (callback) {
      callback();
    }
  };

  /**
   * @description Dispatches an action to call a contract method
   * @param methodName
   * @param actionOptions
   * @param args
   */
  const call = (
    methodName: string,
    actionOptions: any = {},
    ...args: any[]
  ) => {
    //console.log('ADDRESSS', address, methodName, args);
    if (!address) return;
    dispatch(
      callContractMethod({
        contractAddress: address,
        method: {
          name: methodName,
          args: args ?? [],
        },
        provider: actionOptions?.provider ?? provider,
        abiName,
        options: Object.assign({}, options, actionOptions),
      })
    );
  };

  /**
   * @description Dispatches an action to send a transaction to a contract method
   * @param methodName
   * @param contractOptions
   * @param actionOptions
   * @param args
   */
  const send = (
    methodName: string,
    contractOptions: any = {},
    actionOptions = {},
    ...args: any[]
  ) => {
    if (!address) return;
    dispatch(
      sendContractMethod({
        contractAddress: address,
        method: {
          name: methodName,
          args: args ?? [],
          options: contractOptions,
        },
        provider: contractOptions?.provider ?? provider,
        abiName,
        options: Object.assign({}, options, actionOptions),
      })
    );
  };

  /**
   * @description Dispatches an action to call a contract method from a contract address
   * @param contractAddress
   * @param methodName
   * @param actionOptions
   * @param _abiName
   * @param args
   */
  const callFromAddress = (
    contractAddress: string,
    methodName: string,
    actionOptions = {},
    _abiName?: string,
    ...args: any[]
  ) => {
    dispatch(
      callContractMethod({
        contractAddress,
        method: {
          name: methodName,
          args: args ?? [],
        },
        provider,
        abiName: _abiName ?? abiName,
        options: Object.assign({}, options, actionOptions),
      })
    );
  };

  /**
   * @description Dispatches an action to send a transaction to a contract method from a contract address
   * @param contractAddress
   * @param methodName
   * @param contractOptions
   * @param actionOptions
   * @param args
   */
  const sendFromAddress = (
    contractAddress: string,
    methodName: string,
    contractOptions = {},
    actionOptions = {},
    ...args: any[]
  ) => {
    dispatch(
      sendContractMethod({
        contractAddress,
        method: {
          name: methodName,
          args: args ?? [],
          options: contractOptions,
        },
        provider,
        options: Object.assign({}, options, actionOptions),
      })
    );
  };

  return {
    call,
    send,
    contract,
    contractFromAddress,
    callFromAddress,
    sendFromAddress,
    verifyChain: onVerifyChain,
  };
};
