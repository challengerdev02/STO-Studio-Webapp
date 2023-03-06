import { Middleware } from 'redux';
import { RootState } from '../../../../state';
import { serverRequest } from '../../../../actions/app/api';
import { APP_URL, PUT } from '@/shared/constants';
import { FOLLOW_USER } from '@/actions';

export const followUser: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === FOLLOW_USER.START) {
      const { payload, userId, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PUT,
          url: `${APP_URL.users}/${userId}/follow`,
          onFinish,
          payload,
          onSuccess: FOLLOW_USER.SUCCESS,
          ...rest,
        })
      );
    }
  };
