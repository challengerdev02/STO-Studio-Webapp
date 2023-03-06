import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const DELETE_SCENE = createActionType('DELETE_SCENE', 'SCENE');

export const deleteScene = (id: string, options?: ActionOption) => ({
  type: DELETE_SCENE.START,
  meta: {
    ...options,
    id,
  },
});
