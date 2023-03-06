import { GET_ALL_ARTIST, getAllArtists } from './index';

describe('Get all Artist Actions', () => {
  it('should dispatch an action to get all artist', () => {
    const artistPayload = {
      id: 'test-id',
      key: '@@get-all-artist-key',
      onFinish: () => {},
    };

    const { key, onFinish } = artistPayload;

    const expectedAction = {
      type: GET_ALL_ARTIST.START,
      meta: {
        key,
        onFinish,
      },
    };
    expect(getAllArtists({ key, onFinish })).toEqual(expectedAction);

    expect(GET_ALL_ARTIST.START).toEqual('@@artist/get_all_artist_START');
    expect(GET_ALL_ARTIST.END).toEqual('@@artist/get_all_artist_END');
    expect(GET_ALL_ARTIST.SUCCESS).toEqual('@@artist/get_all_artist_SUCCESS');
    expect(GET_ALL_ARTIST.ERROR).toEqual('@@artist/get_all_artist_ERROR');
  });
});
