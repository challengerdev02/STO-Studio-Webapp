import { Middleware } from 'redux';
import { RootState } from '../../../../state';
import { serverRequest } from '../../../../actions/app/api';
import { APP_URL, PATCH } from '@/shared/constants';
import { BECOME_A_CREATOR } from '@/actions';

export const becomeCreator: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === BECOME_A_CREATOR.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PATCH,
          url: `${APP_URL.users}/becomeCreator`,
          onFinish,
          payload,
          onSuccess: BECOME_A_CREATOR.SUCCESS,
          ...rest,
        })
      );
    }
  };
