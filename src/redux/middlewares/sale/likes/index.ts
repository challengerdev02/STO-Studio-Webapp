import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { PATCH } from '../../../../_shared/constants';
import { LIKE_ASSET, UNLIKE_ASSET } from '../../../actions';

export const likeAsset: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === LIKE_ASSET.START) {
      const { onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PATCH,
          url: `/assets/like`,
          onFinish,
          onSuccess: LIKE_ASSET.SUCCESS,
          ...rest,
        })
      );
    }

    if (action.type === UNLIKE_ASSET.START) {
      const { onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PATCH,
          url: `/assets/unlike`,
          onFinish,
          onSuccess: UNLIKE_ASSET.SUCCESS,
          ...rest,
        })
      );
    }
  };
