import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_BOOK_SALE_SCHEDULE = createActionType(
  'GET_BOOK_SALE_SCHEDULE',
  'BOOK'
);

export const getBookSaleSchedule = (id: string, options?: ActionOption) => ({
  type: GET_BOOK_SALE_SCHEDULE.START,
  meta: {
    ...options,
    id,
  },
});
