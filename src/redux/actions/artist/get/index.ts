import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_ARTIST = createActionType('GET_ARTIST', 'ARTIST');

export const getArtist = (id: string, options?: ActionOption) => ({
  type: GET_ARTIST.START,
  meta: {
    ...options,
    id,
  },
});
