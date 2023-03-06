import {
  DELETE_BOOK,
  deleteBook as defaultBookAction,
  serverRequest,
} from '../../../actions';
import { deleteBook as deleteBookMiddleware } from './index';
import { APP_URL, DELETE } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Delete Book: Delete Book Test', function () {
  //console.log(serverRequest);
  const mockedRedux: Record<string, any> = {};

  const payload = {
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let deleteBook = defaultBookAction;

  beforeEach(() => {
    deleteBook = jest.fn(defaultBookAction).mockReturnValue({
      type: DELETE_BOOK.START,
      meta: payload,
    });
    mockedRedux.books = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      book: {
        books: mockedRedux.book,
      },
    });
    mockedRedux.deleteBookAction = deleteBookMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the deleteBook action since it is not in the targeted list of actions', () => {
    mockedRedux.deleteBookAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.deleteBookAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(deleteBook).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the deleteBook actions, then apiRequest action with correct parameters', () => {
    const { id } = payload;
    mockedRedux.deleteBookAction(deleteBook(id));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: DELETE,
        url: `${APP_URL.book.delete}`,
        ...payload,
        onSuccess: '@@book/delete_book_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: DELETE_BOOK.START,
      meta: { ...payload },
    });
  });
});
