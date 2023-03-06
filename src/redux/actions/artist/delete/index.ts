import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const DELETE_ARTIST = createActionType('DELETE_ARTIST', 'ARTIST');

export const deleteArtist = (id: string, options?: ActionOption) => ({
  type: DELETE_ARTIST.START,
  meta: {
    ...options,
    id,
  },
});
