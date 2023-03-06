import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '@/shared/constants';
import { CREATE_ARTIST } from '@/actions';

export const createArtist: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === CREATE_ARTIST.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.artist.create}`,
          onFinish,
          payload,
          onSuccess: CREATE_ARTIST.SUCCESS,
          ...rest,
        })
      );
    }
  };
