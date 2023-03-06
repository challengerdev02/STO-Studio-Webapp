import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_ALL_BIDS = createActionType('GET_ALL_BIDS', 'SALE');

export const getAllBids = (options?: ActionOption) => ({
  type: GET_ALL_BIDS.START,
  meta: {
    ...options,
  },
});
