import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '@/shared/constants';
import { CREATE_SERIES } from '@/actions';

export const createSeries: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === CREATE_SERIES.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.series.create}`,
          onFinish,
          payload,
          onSuccess: CREATE_SERIES.SUCCESS,
          ...rest,
        })
      );
    }
  };
