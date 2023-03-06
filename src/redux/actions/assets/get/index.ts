import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_CREATED_ASSETS = createActionType(
  'GET_CREATED_ASSETS',
  'ASSETS'
);

export const getCreatedAssets = (options?: ActionOption) => ({
  type: GET_CREATED_ASSETS.START,
  meta: {
    ...options,
  },
});

export const GET_ASSET = createActionType('GET_ASSET', 'ASSETS');

export const getAsset = (id: string, options?: ActionOption) => ({
  type: GET_ASSET.START,
  meta: {
    ...options,
    id,
  },
});
