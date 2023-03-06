import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_SCENES } from '@/actions';

export const fetchScenes: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_SCENES.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.scene.fetchAll}`,
          onFinish,
          payload,
          onSuccess: GET_SCENES.SUCCESS,
          ...rest,
        })
      );
    }
  };
