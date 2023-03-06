import {
  CREATE_BOOK_SALE_SCHEDULE,
  createBookSaleSchedule as defaultBookSaleScheduleAction,
  serverRequest,
} from '../../../actions';
import { createBookSaleSchedule as createBookSaleScheduleMiddleware } from './index';
import { APP_URL, POST } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Create Book Sale Schedule: Create Book Sale Schedule Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let createBookSaleSchedule = defaultBookSaleScheduleAction;

  beforeEach(() => {
    createBookSaleSchedule = jest
      .fn(defaultBookSaleScheduleAction)
      .mockReturnValue({
        type: CREATE_BOOK_SALE_SCHEDULE.START,
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
    mockedRedux.createBookSaleScheduleAction = createBookSaleScheduleMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the createBook action since it is not in the targeted list of actions', () => {
    mockedRedux.createBookSaleScheduleAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.createBookSaleScheduleAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(createBookSaleSchedule).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the createBookSaleScheduleAction actions, then apiRequest action with correct parameters', () => {
    mockedRedux.createBookSaleScheduleAction(createBookSaleSchedule(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: POST,
        url: `${APP_URL.saleOptions.create}`,
        ...payload,
        onSuccess: '@@book/create_book_sale_schedule_SUCCESS',
        successMessage: 'Sale scheduled successfully',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: CREATE_BOOK_SALE_SCHEDULE.START,
      meta: { ...payload },
    });
  });
});
