import { FIND_ACCOUNT, findAccount } from './index';

describe('Find account Actions', () => {
  it('should dispatch an action to find account', () => {
    const accountMePayload = {
      key: '@@find-account-key',
      onFinish: () => {},
    };

    const { key, onFinish } = accountMePayload;

    const expectedAction = {
      type: FIND_ACCOUNT.START,
      meta: {
        key,
        onFinish,
      },
    };
    expect(findAccount({ key, onFinish })).toEqual(expectedAction);

    expect(FIND_ACCOUNT.START).toEqual('@@account/find_account_START');
    expect(FIND_ACCOUNT.END).toEqual('@@account/find_account_END');
    expect(FIND_ACCOUNT.SUCCESS).toEqual('@@account/find_account_SUCCESS');
    expect(FIND_ACCOUNT.ERROR).toEqual('@@account/find_account_ERROR');
  });
});
