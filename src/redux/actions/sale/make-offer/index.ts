import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const CREATE_OFFER = createActionType('CREATE_OFFER', 'SALE');

export const createOffer = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: CREATE_OFFER.START,
  meta: {
    ...options,
    payload,
  },
});
