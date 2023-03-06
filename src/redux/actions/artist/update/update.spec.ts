import { UPDATE_ARTIST, updateArtist } from './index';

describe('Update Artist Actions', () => {
  it('should dispatch an action to update artist', () => {
    const artistPayload = {
      id: 'test-id',
      link: 'test-link.com',
      artist: 'test-artist',
      key: '@@delete-artist-key',
      onFinish: () => {},
    };

    const { id, key, onFinish, link, artist } = artistPayload;
    const payload = {
      link,
      artist,
    };

    const expectedAction = {
      type: UPDATE_ARTIST.START,
      meta: {
        payload: payload,
        id,
        key,
        onFinish,
      },
    };
    expect(updateArtist(payload, id, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(UPDATE_ARTIST.START).toEqual('@@artist/update_artist_START');
    expect(UPDATE_ARTIST.END).toEqual('@@artist/update_artist_END');
    expect(UPDATE_ARTIST.SUCCESS).toEqual('@@artist/update_artist_SUCCESS');
    expect(UPDATE_ARTIST.ERROR).toEqual('@@artist/update_artist_ERROR');
  });
});
