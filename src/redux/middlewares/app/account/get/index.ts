import { Middleware } from 'redux';
import { RootState } from '../../../../state';
import { serverRequest } from '../../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_ACCOUNT } from '@/actions';

export const getAccountMe: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ACCOUNT.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.account.get}`,
          onFinish,
          payload,
          onSuccess: GET_ACCOUNT.SUCCESS,
          ...rest,
        })
      );
    }
  };
