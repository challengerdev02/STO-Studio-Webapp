import { SERVER_REQUEST, serverRequest } from './index';
import { RequestInterface } from '../../../types';

describe('Server Request Action', () => {
  it('should test server request returns the correct data with the actual payload', () => {
    const meta: RequestInterface = { method: 'post', url: '/test' };
    const expectedAction = {
      type: SERVER_REQUEST.START,
      meta,
    };
    expect(serverRequest(meta)).toEqual(expectedAction);
  });
});
