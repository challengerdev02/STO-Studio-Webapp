import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_ALL_OFFERS = createActionType('GET_ALL_OFFERS', 'SALE');

export const getAllOffers = (options?: ActionOption) => ({
  type: GET_ALL_OFFERS.START,
  meta: {
    ...options,
  },
});
