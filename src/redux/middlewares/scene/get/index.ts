import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_SCENE } from '@/actions';

export const getScene: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_SCENE.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.scene.get}/${id}`,
          onFinish,
          payload,
          onSuccess: GET_SCENE.SUCCESS,
          ...rest,
        })
      );
    }
  };
