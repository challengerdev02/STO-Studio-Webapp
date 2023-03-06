import { SESSION_TOKEN, setSessionToken } from './index';
import { RequestInterface } from '../../../types';

describe('Session Token Request Action', () => {
  it('should test Session Token request returns the correct data with the actual payload', () => {
    const meta: RequestInterface = { method: 'post', url: '/test' };
    const expectedAction = {
      type: SESSION_TOKEN,
      value: meta,
    };
    expect(setSessionToken(meta)).toEqual(expectedAction);
  });
});
