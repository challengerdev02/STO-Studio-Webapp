import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const UPDATE_SERIES = createActionType('UPDATE_SERIES', 'SERIES');

export const updateSeries = (
  payload: Record<string, any>,
  id: string,
  options?: ActionOption
) => ({
  type: UPDATE_SERIES.START,
  meta: {
    ...options,
    id,
    payload,
  },
});
