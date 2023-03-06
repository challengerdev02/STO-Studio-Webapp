import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../../types';

export const TIP_USER = createActionType('TIP_USER', 'TIP');
export const GET_USER_TIP_BALANCE = createActionType(
  'GET_USER_TIP_BALANCE',
  'TIP'
);

export const tipUser = (
  walletAddress: string,
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: TIP_USER.START,
  meta: {
    ...options,
    payload,
    walletAddress,
  },
});

export const getUserTipBalance = (
  walletAddress: string,
  options?: ActionOption
) => ({
  type: GET_USER_TIP_BALANCE.START,
  meta: {
    ...options,
    walletAddress,
  },
});
