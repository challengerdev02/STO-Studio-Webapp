import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../../types';

export const FOLLOW_USER = createActionType('FOLLOW_USER', 'ACCOUNT');

export const followUser = (
  userId: string,
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: FOLLOW_USER.START,
  meta: {
    ...options,
    payload,
    userId,
  },
});
