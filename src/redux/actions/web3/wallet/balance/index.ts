import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../../types';

export const GET_WALLET_BALANCE = createActionType(
  'GET_WALLET_BALANCE',
  'WEB3'
);

export const getWalletBalance = (
  provider: any,
  address: string,
  options?: ActionOption
) => ({
  type: GET_WALLET_BALANCE.START,
  meta: {
    ...options,
    address,
    provider,
  },
});
