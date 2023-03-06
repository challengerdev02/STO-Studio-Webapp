import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const CREATE_SCENE = createActionType('CREATE_SCENE', 'SCENE');

export const createScene = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: CREATE_SCENE.START,
  meta: {
    ...options,
    payload,
  },
});
