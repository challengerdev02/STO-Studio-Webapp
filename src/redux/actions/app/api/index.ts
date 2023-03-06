import { CREATE_ARTIST } from '@/redux';
import { createActionType } from '../../../../_shared/utils';
import { ActionOption, RequestInterface } from '../../../types';

export const SERVER_REQUEST = createActionType('SERVER_REQUEST', 'APP');
export const MAKE_API_REQUEST = createActionType('MAKE_API_REQUEST');

export const serverRequest = (meta: RequestInterface) => ({
  type: SERVER_REQUEST.START,
  meta,
});

export const makeServerRequest = (
  url: String,
  method: String = 'get',
  payload?: Record<string, any>,
  options?: ActionOption
) => ({
  type: MAKE_API_REQUEST.START,
  meta: {
    ...options,
    url,
    method,
    payload,
  },
});

export default serverRequest;
