import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '@/shared/constants';
import { UPLOAD_MEDIA } from '@/actions';

export const uploadMedia: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPLOAD_MEDIA.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.upload.create}`,
          onFinish,
          payload,
          onSuccess: UPLOAD_MEDIA.SUCCESS,
          ...rest,
        })
      );
    }
  };
