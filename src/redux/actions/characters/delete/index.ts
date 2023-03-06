import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const DELETE_CHARACTER = createActionType(
  'DELETE_CHARACTER',
  'CHARACTER'
);

export const deleteCharacter = (id: string, options?: ActionOption) => ({
  type: DELETE_CHARACTER.START,
  meta: {
    ...options,
    id,
  },
});
