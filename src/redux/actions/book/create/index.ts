import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const CREATE_BOOK = createActionType('CREATE_BOOK', 'BOOK');

export const createBook = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: CREATE_BOOK.START,
  meta: {
    ...options,
    payload,
  },
});
