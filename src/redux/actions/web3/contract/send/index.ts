import { createActionType } from '@/shared/utils';
import { ContractMethodAction } from '@/actions';
import { omit } from 'lodash';

export const SEND_CONTRACT_METHOD = createActionType(
  'SEND_CONTRACT_METHOD',
  'WEB3'
);

export const sendContractMethod = (meta: ContractMethodAction) => {
  return {
    type: SEND_CONTRACT_METHOD.START,
    meta: {
      ...omit(meta, 'options'),
      ...(meta?.options ?? {}),
    },
  };
};
