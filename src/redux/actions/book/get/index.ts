import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_BOOK = createActionType('GET_BOOK', 'BOOK');

export const getBook = (id: string, options?: ActionOption) => ({
  type: GET_BOOK.START,
  meta: {
    ...options,
    id,
  },
});
