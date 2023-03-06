import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { MAKE_API_REQUEST } from '../../../actions';

export const makeServerRequest: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === MAKE_API_REQUEST.START) {
      const { payload, onFinish, method, url, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method,
          url,
          onFinish,
          payload,
          onSuccess: MAKE_API_REQUEST.SUCCESS,
          ...rest,
        })
      );
    }
  };
