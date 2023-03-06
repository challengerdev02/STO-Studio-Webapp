import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const BROWSE_SERIES = createActionType('BROWSE_SERIES', 'SERIES');

export const browseSeries = (options?: ActionOption) => ({
  type: BROWSE_SERIES.START,
  meta: {
    ...options,
  },
});
