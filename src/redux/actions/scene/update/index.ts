import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const UPDATE_SCENE = createActionType('UPDATE_SCENE', 'SCENE');

export const updateScene = (
  payload: Record<string, any>,
  id: string,
  options?: ActionOption
) => ({
  type: UPDATE_SCENE.START,
  meta: {
    ...options,
    id,
    payload,
  },
});
