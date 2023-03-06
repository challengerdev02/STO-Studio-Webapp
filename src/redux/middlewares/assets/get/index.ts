import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_ASSET, GET_CREATED_ASSETS } from '../../../actions';

export const getCreatedAssets: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_CREATED_ASSETS.START) {
      const { onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.assets.get}`,
          onFinish,
          onSuccess: GET_CREATED_ASSETS.SUCCESS,
          ...rest,
        })
      );
    }
  };

export const getAsset: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ASSET.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.assets.get}/${id}`,
          onFinish,
          payload,
          onSuccess: GET_ASSET.SUCCESS,
          ...rest,
        })
      );
    }
  };
