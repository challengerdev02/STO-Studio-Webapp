import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, DELETE } from '@/shared/constants';
import { DELETE_SCENE } from '@/actions';

export const deleteScene: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === DELETE_SCENE.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: DELETE,
          url: `${APP_URL.scene.delete}`,
          onFinish,
          payload,
          onSuccess: DELETE_SCENE.SUCCESS,
          ...rest,
        })
      );
    }
  };
