import { DELETE_BOOK, deleteBook } from './index';

describe('Delete Book Actions', () => {
  it('should dispatch an action to delete book', () => {
    const bookPayload = {
      id: 'test-id',
      key: '@@delete-book-key',
      onFinish: () => {},
    };

    const { id, key, onFinish } = bookPayload;

    const expectedAction = {
      type: DELETE_BOOK.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(deleteBook(id, { key, onFinish })).toEqual(expectedAction);

    expect(DELETE_BOOK.START).toEqual('@@book/delete_book_START');
    expect(DELETE_BOOK.END).toEqual('@@book/delete_book_END');
    expect(DELETE_BOOK.SUCCESS).toEqual('@@book/delete_book_SUCCESS');
    expect(DELETE_BOOK.ERROR).toEqual('@@book/delete_book_ERROR');
  });
});
