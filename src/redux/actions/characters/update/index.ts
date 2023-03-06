import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const UPDATE_CHARACTER = createActionType(
  'UPDATE_CHARACTER',
  'CHARACTER'
);

export const updateCharacter = (
  payload: Record<string, any>,
  id: string,
  options?: ActionOption
) => ({
  type: UPDATE_CHARACTER.START,
  meta: {
    ...options,
    id,
    payload,
  },
});
