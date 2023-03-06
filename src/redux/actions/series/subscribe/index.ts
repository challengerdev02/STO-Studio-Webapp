import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const SUBSCRIBE_TO_SERIES = createActionType(
  'SUBSCRIBE_TO_SERIES',
  'SERIES'
);

export const subscribeToSeries = (
  payload: Record<string, any>,
  id: string,
  options?: ActionOption
) => {
  return {
    type: SUBSCRIBE_TO_SERIES.START,
    meta: {
      ...options,
      id,
      payload,
    },
  };
};
