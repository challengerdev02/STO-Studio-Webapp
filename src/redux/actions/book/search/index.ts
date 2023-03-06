import { createActionString, createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const SEARCH_ITEMS = createActionType('SEARCH_ITEMS', 'BOOK');
export const CLEAR_SEARCH_ITEMS = createActionString(
  'CLEAR_SEARCH_ITEMS',
  'BOOK'
);

export const searchItems = (options?: ActionOption) => ({
  type: SEARCH_ITEMS.START,
  meta: {
    ...options,
  },
});

export const clearSearch = (options?: ActionOption) => ({
  type: CLEAR_SEARCH_ITEMS,
  meta: {
    ...options,
  },
  key: options?.key,
});
