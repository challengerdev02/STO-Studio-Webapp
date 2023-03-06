import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, DELETE } from '@/shared/constants';
import { DELETE_ARTIST } from '@/actions';

export const deleteArtist: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === DELETE_ARTIST.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: DELETE,
          url: `${APP_URL.artist.delete}`,
          onFinish,
          payload,
          onSuccess: DELETE_ARTIST.SUCCESS,
          ...rest,
        })
      );
    }
  };
