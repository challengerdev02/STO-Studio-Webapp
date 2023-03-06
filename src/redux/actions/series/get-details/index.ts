import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_SERIES_DETAILS = createActionType(
  'GET_SERIES_DETAILS',
  'SERIES'
);

export const getSeriesDetails = (id: string, options?: ActionOption) => ({
  type: GET_SERIES_DETAILS.START,
  meta: {
    ...options,
    id,
  },
});
