import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PATCH } from '@/shared/constants';
import { UPDATE_SCENE } from '@/actions';

export const updateScene: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPDATE_SCENE.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PATCH,
          url: `${APP_URL.scene.update}/${id}`,
          onFinish,
          payload,
          onSuccess: UPDATE_SCENE.SUCCESS,
          ...rest,
        })
      );
    }
  };
