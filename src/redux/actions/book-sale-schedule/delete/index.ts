import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const DELETE_BOOK_SALE_SCHEDULE = createActionType(
  'DELETE_BOOK_SALE_SCHEDULE',
  'BOOK'
);

export const deleteBookSaleSchedule = (id: string, options?: ActionOption) => ({
  type: DELETE_BOOK_SALE_SCHEDULE.START,
  meta: {
    ...options,
    id,
  },
});
