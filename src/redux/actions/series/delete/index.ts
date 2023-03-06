import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const DELETE_SERIES = createActionType('DELETE_SERIES', 'SERIES');

export const deleteSeries = (id: string, options?: ActionOption) => ({
  type: DELETE_SERIES.START,
  meta: {
    ...options,
    id,
  },
});
