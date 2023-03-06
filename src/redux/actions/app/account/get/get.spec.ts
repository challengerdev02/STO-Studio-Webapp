import { GET_ACCOUNT, getAccount } from './index';

describe('Get account Actions', () => {
  it('should dispatch an action to get account', () => {
    const accountMePayload = {
      key: '@@get-account-key',
      onFinish: () => {},
    };

    const { key, onFinish } = accountMePayload;

    const expectedAction = {
      type: GET_ACCOUNT.START,
      meta: {
        key,
        onFinish,
      },
    };
    expect(getAccount({ key, onFinish })).toEqual(expectedAction);

    expect(GET_ACCOUNT.START).toEqual('@@account/get_account_START');
    expect(GET_ACCOUNT.END).toEqual('@@account/get_account_END');
    expect(GET_ACCOUNT.SUCCESS).toEqual('@@account/get_account_SUCCESS');
    expect(GET_ACCOUNT.ERROR).toEqual('@@account/get_account_ERROR');
  });
});
