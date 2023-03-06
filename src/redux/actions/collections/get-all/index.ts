import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_ALL_COLLECTIONS = createActionType(
  'GET_ALL_COLLECTIONS',
  'COLLECTIONS'
);

export const getAllCollections = (options?: ActionOption) => ({
  type: GET_ALL_COLLECTIONS.START,
  meta: {
    ...options,
  },
});
