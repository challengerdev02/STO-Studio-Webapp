import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const UPLOAD_MEDIA = createActionType('UPLOAD_MEDIA', 'MEDIA');

export const uploadMedia = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: UPLOAD_MEDIA.START,
  meta: {
    ...options,
    payload,
  },
});
