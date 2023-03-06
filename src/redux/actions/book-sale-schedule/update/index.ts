import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const UPDATE_BOOK_SALE_SCHEDULE = createActionType(
  'UPDATE_BOOK_SALE_SCHEDULE',
  'BOOK'
);

export const updateBookSaleSchedule = (
  payload: Record<string, any>,
  id: string,
  options?: ActionOption
) => ({
  type: UPDATE_BOOK_SALE_SCHEDULE.START,
  meta: {
    ...options,
    id,
    payload,
  },
});
