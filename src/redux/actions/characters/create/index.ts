import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const CREATE_CHARACTER = createActionType(
  'CREATE_CHARACTER',
  'CHARACTER'
);

export const createCharacter = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: CREATE_CHARACTER.START,
  meta: {
    ...options,
    payload,
  },
});
