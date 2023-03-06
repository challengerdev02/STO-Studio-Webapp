import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_CHARACTER = createActionType('GET_CHARACTER', 'CHARACTER');

export const getCharacter = (id: string, options?: ActionOption) => ({
  type: GET_CHARACTER.START,
  meta: {
    ...options,
    id,
  },
});
