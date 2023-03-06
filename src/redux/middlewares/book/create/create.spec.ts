import {
  serverRequest,
  CREATE_BOOK,
  createBook as defaultBookAction,
} from '../../../actions';
import { createBook as createBookMiddleware } from './index';
import { APP_URL, POST } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Create Book: Create Book Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let createBook = defaultBookAction;

  beforeEach(() => {
    createBook = jest.fn(defaultBookAction).mockReturnValue({
      type: CREATE_BOOK.START,
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
        books: mockedRedux.books,
      },
    });
    mockedRedux.createBookAction = createBookMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the createBook action since it is not in the targeted list of actions', () => {
    mockedRedux.createBookAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.createBookAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(createBook).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the createBook actions, then apiRequest action with correct parameters', () => {
    mockedRedux.createBookAction(createBook(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: POST,
        url: `${APP_URL.book.create}`,
        ...payload,
        onSuccess: '@@book/create_book_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: CREATE_BOOK.START,
      meta: { ...payload },
    });
  });
});
