import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const CREATE_BID = createActionType('CREATE_BID', 'SALE');

export const createBid = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: CREATE_BID.START,
  meta: {
    ...options,
    payload,
  },
});
