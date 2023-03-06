import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_ALL_ARTIST } from '@/actions';

export const fetchAllArtists: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ALL_ARTIST.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.artist.fetchAll}`,
          onFinish,
          payload,
          onSuccess: GET_ALL_ARTIST.SUCCESS,
          ...rest,
        })
      );
    }
  };
