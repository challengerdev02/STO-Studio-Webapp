import {
  serverRequest,
  UPDATE_ACCOUNT,
  updateAccount as defaultAccountAction,
} from '../../../../actions';
import { updateAccountMe as updateAccountMiddleware } from './index';
import { APP_URL, PATCH } from '../../../../../_shared/constants';

jest.mock('../../../../actions/app/api');

describe('Update Account: Update Account Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let updateAccount = defaultAccountAction;

  beforeEach(() => {
    updateAccount = jest.fn(defaultAccountAction).mockReturnValue({
      type: UPDATE_ACCOUNT.START,
      meta: payload,
    });
    mockedRedux.Account = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      updateState: jest.fn(),
    };
    mockedRedux.store.updateState.mockReturnValue({
      Account: {
        Account: mockedRedux.Account,
      },
    });
    mockedRedux.updateAccountAction = updateAccountMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the updateAccount action since it is not in the tarupdateed list of actions', () => {
    mockedRedux.updateAccountAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.updateAccountAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(updateAccount).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the updateAccount actions, then apiRequest action with correct parameters', () => {
    const { ...rest } = payload;
    mockedRedux.updateAccountAction(updateAccount(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: PATCH,
        url: `${APP_URL.account.update}`,
        onSuccess: '@@account/update_account_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: UPDATE_ACCOUNT.START,
      meta: { ...payload },
    });
  });
});
