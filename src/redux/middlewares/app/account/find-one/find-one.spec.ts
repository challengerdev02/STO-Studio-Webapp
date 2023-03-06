import {
  serverRequest,
  FIND_ACCOUNT,
  getAccount as defaultAccountAction,
} from '../../../../actions';
import { findOneAccount as findOneAccountMiddleware } from './index';
import { APP_URL, GET } from '../../../../../_shared/constants';

jest.mock('../../../../actions/app/api');

describe('Get Artist: Get Account Search Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    key: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let getAccount = defaultAccountAction;

  beforeEach(() => {
    getAccount = jest.fn(defaultAccountAction).mockReturnValue({
      type: FIND_ACCOUNT.START,
      meta: payload,
    });
    mockedRedux.account = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      Account: {
        Account: mockedRedux.Account,
      },
    });
    mockedRedux.getAccountAction = findOneAccountMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the getAccount action since it is not in the targeted list of actions', () => {
    mockedRedux.getAccountAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getAccountAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getAccount).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getAccount actions, then apiRequest action with correct parameters', () => {
    const { key, ...rest } = payload;
    mockedRedux.getAccountAction(getAccount(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.account.search.one}`,
        onSuccess: FIND_ACCOUNT.SUCCESS,
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: FIND_ACCOUNT.START,
      meta: { ...payload },
    });
  });
});
