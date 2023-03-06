import {
  serverRequest,
  UPDATE_BOOK_SALE_SCHEDULE,
  updateBookSaleSchedule as defaultBookSaleScheduleAction,
} from '../../../actions';
import { updateBookSaleSchedule as updateBookSaleScheduleMiddleware } from './index';
import { APP_URL, PUT } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Update Book Sale Schedule: Update Book Sale Schedule Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payloadObj = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let updateBookSaleSchedule = defaultBookSaleScheduleAction;

  beforeEach(() => {
    updateBookSaleSchedule = jest
      .fn(defaultBookSaleScheduleAction)
      .mockReturnValue({
        type: UPDATE_BOOK_SALE_SCHEDULE.START,
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
    mockedRedux.updateBookAction = updateBookSaleScheduleMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the updateBookSaleSchedule action since it is not in the targeted list of actions', () => {
    mockedRedux.updateBookAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.updateBookAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(updateBookSaleSchedule).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the updateBookSaleSchedule actions, then apiRequest action with correct parameters', () => {
    const { id, payload, options, ...rest } = payloadObj;
    mockedRedux.updateBookAction(updateBookSaleSchedule(payload, id, options));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: PUT,
        url: `${APP_URL.saleOptions.update}/${id}`,
        payload,
        onSuccess: '@@book/update_book_sale_schedule_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: UPDATE_BOOK_SALE_SCHEDULE.START,
      meta: { ...payloadObj },
    });
  });
});
