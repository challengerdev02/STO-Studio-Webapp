import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../../types';

export const GET_ACCOUNT = createActionType('GET_ACCOUNT', 'ACCOUNT');

export const getAccount = (options?: ActionOption) => ({
  type: GET_ACCOUNT.START,
  meta: {
    ...options,
  },
});
