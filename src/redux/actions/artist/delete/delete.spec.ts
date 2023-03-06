import { DELETE_ARTIST, deleteArtist } from './index';

describe('Delete Artist Actions', () => {
  it('should dispatch an action to delete artist', () => {
    const artistPayload = {
      id: 'test-id',
      key: '@@delete-artist-key',
      onFinish: () => {},
    };

    const { key, id, onFinish } = artistPayload;

    const expectedAction = {
      type: DELETE_ARTIST.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(deleteArtist(id, { key, onFinish })).toEqual(expectedAction);

    expect(DELETE_ARTIST.START).toEqual('@@artist/delete_artist_START');
    expect(DELETE_ARTIST.END).toEqual('@@artist/delete_artist_END');
    expect(DELETE_ARTIST.SUCCESS).toEqual('@@artist/delete_artist_SUCCESS');
    expect(DELETE_ARTIST.ERROR).toEqual('@@artist/delete_artist_ERROR');
  });
});
