import {
  GET_BOOK_SALE_SCHEDULE,
  getBookSaleSchedule as defaultBookSaleScheduleAction,
  serverRequest,
} from '../../../actions';
import { getBookSaleSchedule as getBookSaleScheduleMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Get Book Sale Schedule: Get Book Sale Schedule Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let getBookSaleSchedule = defaultBookSaleScheduleAction;

  beforeEach(() => {
    getBookSaleSchedule = jest
      .fn(defaultBookSaleScheduleAction)
      .mockReturnValue({
        type: GET_BOOK_SALE_SCHEDULE.START,
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
    mockedRedux.getBookSaleScheduleAction = getBookSaleScheduleMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the getBookSaleSchedule action since it is not in the targeted list of actions', () => {
    mockedRedux.getBookSaleScheduleAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getBookSaleScheduleAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getBookSaleSchedule).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getBookSaleSchedule actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.getBookSaleScheduleAction(getBookSaleSchedule(id));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.saleOptions.get}/${id}`,
        onSuccess: GET_BOOK_SALE_SCHEDULE.SUCCESS,
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_BOOK_SALE_SCHEDULE.START,
      meta: { ...payload },
    });
  });
});
