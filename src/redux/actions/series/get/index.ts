import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_SERIES = createActionType('GET_SERIES', 'SERIES');

export const getSeries = (id: string, options?: ActionOption) => ({
  type: GET_SERIES.START,
  meta: {
    ...options,
    id,
  },
});
