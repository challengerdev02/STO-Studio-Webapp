import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_BOOKS_SALE_SCHEDULE = createActionType(
  'GET_BOOKS_SALE_SCHEDULE',
  'BOOK'
);

export const fetchBookSaleSchedules = (options?: ActionOption) => ({
  type: GET_BOOKS_SALE_SCHEDULE.START,
  meta: {
    ...options,
  },
});
