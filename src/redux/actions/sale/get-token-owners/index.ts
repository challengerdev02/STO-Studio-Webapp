import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_TOKEN_OWNERS = createActionType('GET_TOKEN_OWNERS', 'SALE');

export const getTokenOwners = (
  tokenAddress: string,
  chainId: number,
  options?: ActionOption
) => ({
  type: GET_TOKEN_OWNERS.START,
  meta: {
    tokenAddress,
    chainId,
    ...options,
  },
});
