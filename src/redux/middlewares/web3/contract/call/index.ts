import {
  CALL_CONTRACT_METHOD,
  setUIError,
  startUILoading,
  stopUILoading,
} from '@/actions';
import { Middleware } from 'redux';
import { RootState } from '../../../../state';
import { ContractUtils } from '../../../../../blockchain/evm/utils';
import { Contract } from 'web3-eth-contract';
import { notification } from 'antd';
import { capitalize, has, isFunction } from 'lodash';
import { debugLog, truncateEthAddress } from '@/shared/utils';

export const callContractMethod: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === CALL_CONTRACT_METHOD.START) {
      const {
        method,
        contractAddress,
        provider,
        key = 'CALL_CONTRACT_METHOD',
        uiKey,
        onFinish,
        onAfterError,
        successMessage,
        errorMessage,
        abiName,
      } = action.meta;

      dispatch(startUILoading(uiKey ?? key ?? contractAddress));

      try {
        const contractUtils = new ContractUtils(provider);

        let abi = ContractUtils.abiFromAddress(contractAddress);
        if (abiName && has(ContractUtils.ABIs, abiName)) {
          abi = ContractUtils.ABIs[abiName];
        }

        const contract: Contract = contractUtils.connect(contractAddress, abi);

        debugLog(`Contract(${truncateEthAddress(contractAddress)})`)({
          method,
          abi,
          contractAddress,
        });

        const receipt = await contractUtils.call(
          contract,
          method.name,
          ...(method?.args ?? [])
        );

        debugLog(`Receipt for ${method.name}`)(receipt);

        dispatch(stopUILoading(uiKey ?? key ?? contractAddress));

        dispatch({
          type: CALL_CONTRACT_METHOD.SUCCESS,
          payload: { receipt, contractAddress, methodName: method.name },
          key: key ?? contractAddress,
        });

        if (onFinish && isFunction(onFinish)) {
          onFinish(receipt);
        }

        if (successMessage) {
          notification.success({
            message: capitalize(successMessage),
            key,
            duration: 6,
            placement: 'bottomLeft',
          });
        }
      } catch (e: any) {
        debugLog(
          `Contract(${truncateEthAddress(contractAddress)})`,
          'error'
        )(e);
        dispatch(stopUILoading(uiKey ?? key ?? contractAddress));

        dispatch(setUIError(uiKey ?? key ?? contractAddress, e.message));

        dispatch({
          type: CALL_CONTRACT_METHOD.ERROR,
          payload: e.message,
          key: key ?? contractAddress,
        });
        if (onAfterError && isFunction(onAfterError)) {
          onAfterError(e);
        }
        console.error(e.message);
        if (!onAfterError) {
          if (
            !String(e.message).includes('ABI') &&
            String(e.message).includes('Provider')
          ) {
            notification.error({
              message: 'Oops!',
              description: errorMessage ?? e.message,
              placement: 'bottomLeft',
            });
          }
        }
      }
    }
  };
