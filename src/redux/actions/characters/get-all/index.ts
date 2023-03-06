import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_CHARACTERS = createActionType('GET_CHARACTERS', 'CHARACTER');

export const fetchCharacters = (options?: ActionOption) => ({
  type: GET_CHARACTERS.START,
  meta: {
    ...options,
  },
});
