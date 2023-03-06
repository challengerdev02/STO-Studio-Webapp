import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_ALL_ARTIST = createActionType('GET_ALL_ARTIST', 'ARTIST');

export const getAllArtists = (options?: ActionOption) => ({
  type: GET_ALL_ARTIST.START,
  meta: {
    ...options,
  },
});
