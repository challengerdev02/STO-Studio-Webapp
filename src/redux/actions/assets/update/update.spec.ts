import { UPDATE_ASSET, updateAsset } from './index';

describe('Update Book Actions', () => {
  it('should dispatch an action to update book', () => {
    const bookPayload = {
      id: 'test-id',
      link: 'test-link.com',
      artist: 'test-artist',
      key: '@@delete-book-key',
      onFinish: () => {},
    };

    const { id, key, onFinish, link, artist } = bookPayload;
    const payload = {
      link,
      artist,
    };

    const expectedAction = {
      type: UPDATE_ASSET.START,
      meta: {
        payload: payload,
        id,
        key,
        onFinish,
      },
    };
    expect(updateAsset(payload, id, { key, onFinish })).toEqual(expectedAction);

    expect(UPDATE_ASSET.START).toEqual('@@book/update_book_START');
    expect(UPDATE_ASSET.END).toEqual('@@book/update_book_END');
    expect(UPDATE_ASSET.SUCCESS).toEqual('@@book/update_book_SUCCESS');
    expect(UPDATE_ASSET.ERROR).toEqual('@@book/update_book_ERROR');
  });
});
