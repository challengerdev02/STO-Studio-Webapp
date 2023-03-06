import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_EXTERNAL_RESOURCE = createActionType('GET_EXTERNAL_RESOURCE');

export const getExternalResource = (options?: ActionOption) => ({
  type: GET_EXTERNAL_RESOURCE.START,
  meta: {
    ...options,
  },
});
