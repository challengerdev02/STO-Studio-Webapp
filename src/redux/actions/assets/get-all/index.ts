import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_ALL_CREATED_ASSETS = createActionType(
  'GET_ALL_CREATED_ASSETS',
  'ASSETS'
);

export const getAllCreatedAssets = (options?: ActionOption) => ({
  type: GET_ALL_CREATED_ASSETS.START,
  meta: {
    ...options,
  },
});
