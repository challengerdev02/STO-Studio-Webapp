import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_BID = createActionType('GET_BID', 'SALE');

export const getBid = (bidId?: string, options?: ActionOption) => ({
  type: GET_BID.START,
  meta: {
    bidId,
    ...options,
  },
});
