import { Middleware } from 'redux';
import { RootState } from '../../../../state';
import { serverRequest } from '../../../../actions/app/api';
import { APP_URL, PATCH } from '@/shared/constants';
import { UPDATE_ACCOUNT } from '@/actions';

export const updateAccountMe: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPDATE_ACCOUNT.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PATCH,
          url: `${APP_URL.account.update}`,
          onFinish,
          payload,
          onSuccess: UPDATE_ACCOUNT.SUCCESS,
          ...rest,
        })
      );
    }
  };
