import { UPDATE_ACCOUNT, updateAccount } from './index';

describe('Update account Actions', () => {
  it('should dispatch an action to update account', () => {
    const accountMePayload = {
      link: 'test-link.com',
      artist: 'test-artist',
      key: '@@update-account-me-key',
      onFinish: () => {},
    };

    const { key, onFinish, link, artist } = accountMePayload;
    const payload = {
      link,
      artist,
    };

    const expectedAction = {
      type: UPDATE_ACCOUNT.START,
      meta: {
        payload: payload,
        key,
        onFinish,
      },
    };
    expect(updateAccount(payload, { key, onFinish })).toEqual(expectedAction);

    expect(UPDATE_ACCOUNT.START).toEqual('@@account/update_account_START');
    expect(UPDATE_ACCOUNT.END).toEqual('@@account/update_account_END');
    expect(UPDATE_ACCOUNT.SUCCESS).toEqual('@@account/update_account_SUCCESS');
    expect(UPDATE_ACCOUNT.ERROR).toEqual('@@account/update_account_ERROR');
  });
});
