import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_ALL_SALE_ASSETS = createActionType(
  'GET_ALL_SALE_ASSETS',
  'SALE'
);

export const getAllSaleAssets = (options?: ActionOption) => ({
  type: GET_ALL_SALE_ASSETS.START,
  meta: {
    ...options,
  },
});
