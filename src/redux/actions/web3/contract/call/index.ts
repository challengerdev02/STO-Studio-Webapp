import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../../types';
import { omit } from 'lodash';

export const CALL_CONTRACT_METHOD = createActionType(
  'CALL_CONTRACT_METHOD',
  'WEB3'
);

export interface ContractMethodAction {
  contractAddress: string;
  method: {
    name: string;
    args?: any[];
    options?: Record<string, any>;
  };
  provider: any;
  options?: ActionOption;
  abiName?: string;
}

export const callContractMethod = (meta: ContractMethodAction) => ({
  type: CALL_CONTRACT_METHOD.START,
  meta: {
    ...omit(meta, 'options'),
    ...(meta?.options ?? {}),
  },
});
