import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '@/shared/constants';
import { CREATE_SCENE } from '@/actions';

export const createScene: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === CREATE_SCENE.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.scene.create}`,
          onFinish,
          payload,
          onSuccess: CREATE_SCENE.SUCCESS,
          ...rest,
        })
      );
    }
  };
