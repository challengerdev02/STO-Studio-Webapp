import { GET_BOOK, getBook } from './index';

describe('Get Book Actions', () => {
  it('should dispatch an action to get book', () => {
    const bookPayload = {
      id: 'test-id',
      key: '@@delete-book-key',
      onFinish: () => {},
    };

    const { id, key, onFinish } = bookPayload;

    const expectedAction = {
      type: GET_BOOK.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(getBook(id, { key, onFinish })).toEqual(expectedAction);

    expect(GET_BOOK.START).toEqual('@@book/get_book_START');
    expect(GET_BOOK.END).toEqual('@@book/get_book_END');
    expect(GET_BOOK.SUCCESS).toEqual('@@book/get_book_SUCCESS');
    expect(GET_BOOK.ERROR).toEqual('@@book/get_book_ERROR');
  });
});
