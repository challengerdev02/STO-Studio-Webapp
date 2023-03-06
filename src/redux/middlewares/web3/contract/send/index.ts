import {
  SEND_CONTRACT_METHOD,
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

export const sendContractMethod: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === SEND_CONTRACT_METHOD.START) {
      const {
        method,
        contractAddress,
        provider,
        key = 'SEND_CONTRACT_METHOD',
        uiKey,
        onFinish,
        successMessage,
        errorMessage,
        abiName,
      } = action.meta;
      // logger('%cActions', 'font-size: 20px; color: pink;', action.meta);

      dispatch(startUILoading(uiKey ?? key ?? contractAddress));

      try {
        const contractUtils = new ContractUtils(provider);

        let abi = ContractUtils.abiFromAddress(contractAddress);
        if (abiName && has(ContractUtils.ABIs, abiName)) {
          abi = ContractUtils.ABIs[abiName];
        }

        const contract: Contract = contractUtils.connect(contractAddress, abi);

        const send = contractUtils.send(
          contract,
          method.name,
          ...(method?.args ?? [])
        );

        debugLog(`Contract(${truncateEthAddress(contractAddress)})`)({
          method,
          abi,
          contractAddress,
        });

        const receipt = await send(method?.options ?? {});

        debugLog(`Receipt for ${method.name}`)(receipt);

        dispatch(stopUILoading(uiKey ?? key ?? contractAddress));

        dispatch({
          type: SEND_CONTRACT_METHOD.SUCCESS,
          payload: receipt,
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
          type: SEND_CONTRACT_METHOD.ERROR,
          payload: e.message,
          key: key ?? contractAddress,
        });
        if (!String(e.message).includes('ABI')) {
          console.error(e.message);
          notification.error({
            message: 'Oops!',
            description: errorMessage ?? e.message,
            placement: 'bottomLeft',
          });
        }
      }
    }
  };
