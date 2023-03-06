import {
  fetchBooks as defaultBookAction,
  GET_BOOKS,
  serverRequest,
} from '../../../actions';
import { fetchBooks as fetchBooksMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Get Books: Get Books Test', function () {
  //console.log(serverRequest);
  const mockedRedux: Record<string, any> = {};

  const payload = {
    params: {},
    key: '@@test-id',
    uiKey: '@@key-test-id',
  };

  let getBooks = defaultBookAction;

  beforeEach(() => {
    getBooks = jest.fn(defaultBookAction).mockReturnValue({
      type: GET_BOOKS.START,
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
    mockedRedux.getBooksAction = fetchBooksMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the getBooks action since it is not in the targeted list of actions', () => {
    mockedRedux.getBooksAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getBooksAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getBooks).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getBooks actions, then apiRequest action with correct parameters', () => {
    mockedRedux.getBooksAction(getBooks(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.book.get}`,
        ...payload,
        onSuccess: '@@book/get_books_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_BOOKS.START,
      meta: { ...payload },
    });
  });
});
