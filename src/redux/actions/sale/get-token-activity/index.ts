import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_TOKEN_ACTIVITY = createActionType(
  'GET_TOKEN_ACTIVITY',
  'SALE'
);

export const getTokenActivity = (
  tokenAddress: string,
  tokenId: string,
  chainId: number,
  options?: ActionOption
) => ({
  type: GET_TOKEN_ACTIVITY.START,
  meta: {
    tokenAddress,
    tokenId,
    chainId,
    ...options,
  },
});
