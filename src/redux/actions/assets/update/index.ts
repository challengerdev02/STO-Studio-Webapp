import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const UPDATE_ASSET = createActionType('UPDATE_ASSET', 'ASSET');

export const updateAsset = (
  payload: Record<string, any>,
  id: string,
  options?: ActionOption
) => ({
  type: UPDATE_ASSET.START,
  meta: {
    ...options,
    id,
    payload,
  },
});
