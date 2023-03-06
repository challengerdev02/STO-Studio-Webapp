import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_LATEST_BID = createActionType('GET_LATEST_BID', 'SALE');

export const getLatestBid = (options?: ActionOption) => ({
  type: GET_LATEST_BID.START,
  meta: {
    ...options,
  },
});
