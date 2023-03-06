import {
  serverRequest,
  UPDATE_BOOK,
  updateBook as defaultBookAction,
} from '../../../actions';
import { updateBook as updateBookMiddleware } from './index';
import { APP_URL, PATCH } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Update Book: Update Book Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payloadObj = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let updateBook = defaultBookAction;

  beforeEach(() => {
    updateBook = jest.fn(defaultBookAction).mockReturnValue({
      type: UPDATE_BOOK.START,
      meta: payloadObj,
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
    mockedRedux.updateBookAction = updateBookMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the updateBook action since it is not in the targeted list of actions', () => {
    mockedRedux.updateBookAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.updateBookAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(updateBook).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the updateBook actions, then apiRequest action with correct parameters', () => {
    const { id, payload, options, ...rest } = payloadObj;
    mockedRedux.updateBookAction(updateBook(payload, id, options));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: PATCH,
        url: `${APP_URL.book.update}/${id}`,
        payload,
        onSuccess: '@@book/update_book_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: UPDATE_BOOK.START,
      meta: { ...payloadObj },
    });
  });
});
