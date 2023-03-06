import { CREATE_ARTIST, createArtist } from './index';

describe('Create Artist Actions', () => {
  it('should dispatch an action to create artist', () => {
    const artistPayload = {
      title: 'test-title',
      link: 'test-link.com',
      key: '@@create-artist-key',
      onFinish: () => {},
    };

    const { title, link, key, onFinish } = artistPayload;

    const expectedAction = {
      type: CREATE_ARTIST.START,
      meta: {
        payload: { title, link },
        key,
        onFinish,
      },
    };
    expect(createArtist({ title, link }, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(CREATE_ARTIST.START).toEqual('@@artist/create_artist_START');
    expect(CREATE_ARTIST.END).toEqual('@@artist/create_artist_END');
    expect(CREATE_ARTIST.SUCCESS).toEqual('@@artist/create_artist_SUCCESS');
    expect(CREATE_ARTIST.ERROR).toEqual('@@artist/create_artist_ERROR');
  });
});
