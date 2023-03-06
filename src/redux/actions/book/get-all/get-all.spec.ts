import { GET_BOOKS, fetchBooks } from './index';

describe('Get Book Actions', () => {
  it('should dispatch an action to get book', () => {
    const bookPayload = {
      key: '@@delete-book-key',
      onFinish: () => {},
    };

    const { key, onFinish } = bookPayload;

    const expectedAction = {
      type: GET_BOOKS.START,
      meta: {
        key,
        onFinish,
      },
    };
    expect(fetchBooks({ key, onFinish })).toEqual(expectedAction);

    expect(GET_BOOKS.START).toEqual('@@book/get_books_START');
    expect(GET_BOOKS.END).toEqual('@@book/get_books_END');
    expect(GET_BOOKS.SUCCESS).toEqual('@@book/get_books_SUCCESS');
    expect(GET_BOOKS.ERROR).toEqual('@@book/get_books_ERROR');
  });
});
