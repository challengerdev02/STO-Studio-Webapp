import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../../types';

export const UPDATE_ACCOUNT = createActionType('UPDATE_ACCOUNT', 'ACCOUNT');

export const updateAccount = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: UPDATE_ACCOUNT.START,
  meta: {
    ...options,
    payload,
  },
});
