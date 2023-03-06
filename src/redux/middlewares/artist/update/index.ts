import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PUT } from '@/shared/constants';
import { UPDATE_ARTIST } from '@/actions';

export const updateArtist: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPDATE_ARTIST.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PUT,
          url: `${APP_URL.artist.update}/${id}`,
          onFinish,
          payload,
          onSuccess: UPDATE_ARTIST.SUCCESS,
          ...rest,
        })
      );
    }
  };
