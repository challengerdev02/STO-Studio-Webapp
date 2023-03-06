import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_OFFER = createActionType('GET_OFFER', 'SALE');

export const getOffer = (offerId: string, options?: ActionOption) => ({
  type: GET_OFFER.START,
  meta: {
    offerId,
    ...options,
  },
});
