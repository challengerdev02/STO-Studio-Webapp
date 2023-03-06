import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const DELETE_BOOK = createActionType('DELETE_BOOK', 'BOOK');

export const deleteBook = (id: string, options?: ActionOption) => ({
  type: DELETE_BOOK.START,
  meta: {
    ...options,
    id,
  },
});
