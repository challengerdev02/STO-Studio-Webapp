import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_ARTIST } from '@/actions';

export const getArtist: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ARTIST.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.artist.get}/${id}`,
          onFinish,
          payload,
          onSuccess: GET_ARTIST.SUCCESS,
          ...rest,
        })
      );
    }
  };
