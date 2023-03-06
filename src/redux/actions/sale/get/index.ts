import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_SALE_ASSET = createActionType('GET_SALE_ASSET', 'SALE');

export const getSaleAsset = (options?: ActionOption) => ({
  type: GET_SALE_ASSET.START,
  meta: {
    ...options,
  },
});
