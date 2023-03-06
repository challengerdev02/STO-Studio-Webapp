import { Action } from '../../types';
import {
  CREATE_ARTIST,
  GET_ALL_ARTIST,
  GET_ARTIST,
  UPDATE_ARTIST,
} from '@/actions';
import { arrayToById } from '@/shared/utils';
import { ArtistNamespace } from '@/shared/namespaces/artist';

export interface ArtistReducerState {
  allArtists: Record<string, ArtistNamespace.Artist[]>;
  artistsById: Record<string, Record<string, ArtistNamespace.Artist>>;
  artist: Record<string, ArtistNamespace.Artist>;
}

export const ArtistDefaultState: ArtistReducerState = {
  allArtists: {},
  artistsById: {},
  artist: {},
};

const ArtistReducer = (state = ArtistDefaultState, action: Action) => {
  switch (action.type) {
    case CREATE_ARTIST.SUCCESS:
      return {
        ...state,
        artist: {
          ...state.artist,
          [action.key]: action.payload,
        },
      };

    case GET_ARTIST.SUCCESS:
      return {
        ...state,
        artist: {
          ...state.artist,
          [action.key]: action.payload,
        },
      };

    case GET_ALL_ARTIST.SUCCESS: {
      const byId = arrayToById(action?.payload ?? []);
      return {
        ...state,
        artistsById: {
          ...state.artistsById,
          [action.key]: byId,
        },
        allArtists: {
          ...state.allArtists,
          [action.key]: action.payload ?? [],
        },
      };
    }

    case UPDATE_ARTIST.SUCCESS: {
      const allArtists = state.allArtists[action.key] ?? [];

      const index = allArtists.findIndex((o) => o?._id === action.payload?._id);

      let currentArist = {};

      if (index !== -1) {
        currentArist = Object.assign({}, allArtists[index], action.payload);
        allArtists[index] = Object.assign(
          {},
          allArtists[index],
          action.payload
        );
      } else {
        currentArist = Object.assign({}, action.payload);
        allArtists.push(action.payload);
      }

      const byId = arrayToById(allArtists ?? []);

      return {
        ...state,
        artistsById: {
          ...state.artistsById,
          [action.key]: byId,
        },
        allArtists: {
          ...state.allArtists,
          [action.key]: allArtists ?? [],
        },
        artist: {
          ...state.artist,
          [action.key]: currentArist,
        },
      };
    }

    default:
      return state;
  }
};

export default ArtistReducer;
