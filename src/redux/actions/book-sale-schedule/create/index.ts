import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const CREATE_BOOK_SALE_SCHEDULE = createActionType(
  'CREATE_BOOK_SALE_SCHEDULE',
  'BOOK'
);

export const createBookSaleSchedule = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: CREATE_BOOK_SALE_SCHEDULE.START,
  meta: {
    ...options,
    payload,
  },
});
