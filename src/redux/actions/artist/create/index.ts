import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const CREATE_ARTIST = createActionType('CREATE_ARTIST', 'ARTIST');

export const createArtist = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: CREATE_ARTIST.START,
  meta: {
    ...options,
    payload,
  },
});
