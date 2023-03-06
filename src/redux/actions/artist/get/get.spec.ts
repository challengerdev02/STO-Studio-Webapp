import { GET_ARTIST, getArtist } from './index';

describe('Get Artist Actions', () => {
  it('should dispatch an action to get artist', () => {
    const artistPayload = {
      id: 'test-id',
      key: '@@get-artist-key',
      onFinish: () => {},
    };

    const { key, id, onFinish } = artistPayload;

    const expectedAction = {
      type: GET_ARTIST.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(getArtist(id, { key, onFinish })).toEqual(expectedAction);

    expect(GET_ARTIST.START).toEqual('@@artist/get_artist_START');
    expect(GET_ARTIST.END).toEqual('@@artist/get_artist_END');
    expect(GET_ARTIST.SUCCESS).toEqual('@@artist/get_artist_SUCCESS');
    expect(GET_ARTIST.ERROR).toEqual('@@artist/get_artist_ERROR');
  });
});
