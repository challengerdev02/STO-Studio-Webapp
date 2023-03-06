import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PATCH } from '../../../../_shared/constants';
import { UPDATE_ASSET } from '../../../actions';

export const updateAsset: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPDATE_ASSET.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PATCH,
          url: `${APP_URL.assets.update}/${id}`,
          onFinish,
          payload,
          onSuccess: UPDATE_ASSET.SUCCESS,
          ...rest,
        })
      );
    }
  };
