import {
  fetchBooksSaleSchedule as defaultBookSaleScheduleAction,
  GET_BOOKS_SALE_SCHEDULE,
  serverRequest,
} from '../../../actions';
import { fetchBooksSaleSchedule as getBooksSaleScheduleMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Get Books Sale Schedule: Get Books Sale Schedule Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    params: {},
    key: '@@test-id',
    uiKey: '@@key-test-id',
  };

  let getBooksSaleSchedule = defaultBookSaleScheduleAction;

  beforeEach(() => {
    getBooksSaleSchedule = jest
      .fn(defaultBookSaleScheduleAction)
      .mockReturnValue({
        type: GET_BOOKS_SALE_SCHEDULE.START,
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
    mockedRedux.getBooksSaleScheduleAction = getBooksSaleScheduleMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the getBooksSaleSchedule action since it is not in the targeted list of actions', () => {
    mockedRedux.getBooksSaleScheduleAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getBooksSaleScheduleAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getBooksSaleSchedule).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getBooksSaleSchedule actions, then apiRequest action with correct parameters', () => {
    mockedRedux.getBooksSaleScheduleAction(getBooksSaleSchedule(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.saleOptions.fetchAll}`,
        onSuccess: GET_BOOKS_SALE_SCHEDULE.SUCCESS,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_BOOKS_SALE_SCHEDULE.START,
      meta: { ...payload },
    });
  });
});
