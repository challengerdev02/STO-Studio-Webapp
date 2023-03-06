import ArtistReducer, { ArtistDefaultState as defaultState } from './index';
import { arrayToById } from '../../../_shared/utils';
import { CREATE_ARTIST, GET_ALL_ARTIST, GET_ARTIST } from '@/actions';

describe('Reducer: Artist', () => {
  it('Should return a artist', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const mockAction = {
      type: CREATE_ARTIST.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      artist: {
        ...defaultState.artist,
        [mockAction.key]: mockAction.payload,
      },
    };
    expect(ArtistReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should get list of artist', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];
    const mockAction = {
      type: GET_ALL_ARTIST.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };

    const byId = arrayToById(mockAction?.payload ?? []);

    const expectedResult = {
      ...defaultState,
      artistsById: {
        ...defaultState.artistsById,
        [mockAction.key]: byId,
      },
      allArtists: {
        ...defaultState.allArtists,
        [mockAction.key]: mockAction.payload ?? [],
      },
    };
    expect(ArtistReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should Create a artist', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const mockAction = {
      type: CREATE_ARTIST.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      artist: {
        ...defaultState.artist,
        [mockAction.key]: mockAction.payload,
      },
    };

    expect(ArtistReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('should return initial state when there is no action', () => {
    expect(ArtistReducer(defaultState, { type: '' })).toEqual(defaultState);
  });
});
