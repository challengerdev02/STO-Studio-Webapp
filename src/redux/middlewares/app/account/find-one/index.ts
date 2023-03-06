import { Middleware } from 'redux';
import { RootState } from '../../../../state';
import { serverRequest } from '../../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { FIND_ACCOUNT } from '@/actions';

export const findOneAccount: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === FIND_ACCOUNT.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.account.search.one}`,
          onFinish,
          payload,
          onSuccess: FIND_ACCOUNT.SUCCESS,
          ...rest,
        })
      );
    }
  };
