import { Middleware } from 'redux';
import { RootState } from '../../../../state';
import { serverRequest } from '../../../../actions/app/api';
import { APP_URL, GET, POST } from '@/shared/constants';
import { GET_USER_TIP_BALANCE, TIP_USER } from '@/actions';

export const getUserTipBalance: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_USER_TIP_BALANCE.START) {
      const { walletAddress, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.users}/${walletAddress}/balance`,
          onFinish,
          onSuccess: GET_USER_TIP_BALANCE.SUCCESS,
          ...rest,
        })
      );
    }
  };

export const tipUser: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === TIP_USER.START) {
      const { payload, walletAddress, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.users}/${walletAddress}/tip`,
          onFinish,
          payload,
          onSuccess: TIP_USER.SUCCESS,
          ...rest,
        })
      );
    }
  };
