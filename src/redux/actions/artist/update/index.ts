import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const UPDATE_ARTIST = createActionType('UPDATE_ARTIST', 'ARTIST');

export const updateArtist = (
  payload: Record<string, any>,
  id: string,
  options?: ActionOption
) => ({
  type: UPDATE_ARTIST.START,
  meta: {
    ...options,
    id,
    payload,
  },
});
