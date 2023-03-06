import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const UPDATE_BOOK = createActionType('UPDATE_BOOK', 'BOOK');

export const updateBook = (
  payload: Record<string, any>,
  id: string,
  options?: ActionOption
) => ({
  type: UPDATE_BOOK.START,
  meta: {
    ...options,
    id,
    payload,
  },
});
