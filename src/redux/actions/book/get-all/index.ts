import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_BOOKS = createActionType('GET_BOOKS', 'BOOK');

export const fetchBooks = (options?: ActionOption) => ({
  type: GET_BOOKS.START,
  meta: {
    ...options,
  },
});
