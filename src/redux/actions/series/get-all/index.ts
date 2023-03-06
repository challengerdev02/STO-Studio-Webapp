import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_ALL_SERIES = createActionType('GET_ALL_SERIES', 'SERIES');

export const getAllSeries = (options?: ActionOption) => ({
  type: GET_ALL_SERIES.START,
  meta: {
    ...options,
  },
});
