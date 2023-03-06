import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const CREATE_SERIES = createActionType('CREATE_SERIES', 'SERIES');

export const createSeries = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: CREATE_SERIES.START,
  meta: {
    ...options,
    payload,
  },
});
