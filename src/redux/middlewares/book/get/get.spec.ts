import {
  serverRequest,
  GET_BOOK,
  getBook as defaultBookAction,
} from '../../../actions';
import { getBook as getBookMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Get Book: Get Book Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let getBook = defaultBookAction;

  beforeEach(() => {
    getBook = jest.fn(defaultBookAction).mockReturnValue({
      type: GET_BOOK.START,
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
    mockedRedux.getBookAction = getBookMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the getBook action since it is not in the targeted list of actions', () => {
    mockedRedux.getBookAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getBookAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getBook).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getBook actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.getBookAction(getBook(id));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.book.get}/${id}`,
        onSuccess: '@@book/get_book_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_BOOK.START,
      meta: { ...payload },
    });
  });
});
