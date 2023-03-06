import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_SCENE = createActionType('GET_SCENE', 'SCENE');

export const getScene = (id: string, options?: ActionOption) => ({
  type: GET_SCENE.START,
  meta: {
    ...options,
    id,
  },
});
