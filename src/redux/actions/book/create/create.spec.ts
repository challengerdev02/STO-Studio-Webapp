import { CREATE_BOOK, createBook } from './index';

describe('Create Book Actions', () => {
  it('should dispatch an action to create book', () => {
    const bookPayload = {
      title: 'test-title',
      link: 'test-link.com',
      key: '@@create-book-key',
      onFinish: () => {},
    };

    const { title, link, key, onFinish } = bookPayload;

    const expectedAction = {
      type: CREATE_BOOK.START,
      meta: {
        payload: { title, link },
        key,
        onFinish,
      },
    };
    expect(createBook({ title, link }, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(CREATE_BOOK.START).toEqual('@@book/create_book_START');
    expect(CREATE_BOOK.END).toEqual('@@book/create_book_END');
    expect(CREATE_BOOK.SUCCESS).toEqual('@@book/create_book_SUCCESS');
    expect(CREATE_BOOK.ERROR).toEqual('@@book/create_book_ERROR');
  });
});
