import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_SCENES = createActionType('GET_SCENES', 'SCENE');

export const fetchScenes = (options?: ActionOption) => ({
  type: GET_SCENES.START,
  meta: {
    ...options,
  },
});
