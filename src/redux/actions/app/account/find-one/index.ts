import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../../types';

export const FIND_ACCOUNT = createActionType('FIND_ACCOUNT', 'ACCOUNT');

export const findAccount = (options?: ActionOption) => ({
  type: FIND_ACCOUNT.START,
  meta: {
    ...options,
  },
});
