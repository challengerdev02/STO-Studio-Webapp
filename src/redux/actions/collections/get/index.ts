import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_COLLECTIONS = createActionType(
  'GET_COLLECTIONS',
  'COLLECTIONS'
);

export const getCollections = (options?: ActionOption) => ({
  type: GET_COLLECTIONS.START,
  meta: {
    ...options,
  },
});
