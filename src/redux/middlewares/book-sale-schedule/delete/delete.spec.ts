import {
  DELETE_BOOK_SALE_SCHEDULE,
  deleteBookSaleSchedule as defaultBookSaleScheduleAction,
  serverRequest,
} from '../../../actions';
import { deleteBookSaleSchedule as deleteBookSaleScheduleMiddleware } from './index';
import { APP_URL, DELETE } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Delete Book Sale Schedule: Delete Book Sale Schedule Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let deleteBookSaleSchedule = defaultBookSaleScheduleAction;

  beforeEach(() => {
    deleteBookSaleSchedule = jest
      .fn(defaultBookSaleScheduleAction)
      .mockReturnValue({
        type: DELETE_BOOK_SALE_SCHEDULE.START,
        meta: payload,
      });
    mockedRedux.booksSaleSchedule = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      bookSaleSchedule: {
        booksSaleSchedule: mockedRedux.booksSaleSchedule,
      },
    });
    mockedRedux.deleteBookSaleScheduleAction = deleteBookSaleScheduleMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the createBook action since it is not in the targeted list of actions', () => {
    mockedRedux.deleteBookSaleScheduleAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.deleteBookSaleScheduleAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(deleteBookSaleSchedule).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the deleteBookSaleScheduleAction actions, then apiRequest action with correct parameters', () => {
    const { id } = payload;
    mockedRedux.deleteBookSaleScheduleAction(deleteBookSaleSchedule(id));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: DELETE,
        url: `${APP_URL.saleOptions.delete}`,
        ...payload,
        onSuccess: '@@book/delete_book_sale_schedule_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: DELETE_BOOK_SALE_SCHEDULE.START,
      meta: { ...payload },
    });
  });
});
