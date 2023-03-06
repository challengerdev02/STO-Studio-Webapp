import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const LIKE_ASSET = createActionType('LIKE_ASSET', 'ASSET');
export const UNLIKE_ASSET = createActionType('UNLIKE_ASSET', 'ASSET');

export const likeAsset = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: LIKE_ASSET.START,
  meta: {
    payload,
    ...options,
  },
});

export const unlikeAsset = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: UNLIKE_ASSET.START,
  meta: { payload, ...options },
});
