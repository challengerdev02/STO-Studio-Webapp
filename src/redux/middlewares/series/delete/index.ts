import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, DELETE } from '@/shared/constants';
import { DELETE_SERIES } from '@/actions';

export const deleteSeries: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === DELETE_SERIES.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: DELETE,
          url: `${APP_URL.series.delete}`,
          onFinish,
          payload,
          onSuccess: DELETE_SERIES.SUCCESS,
          ...rest,
        })
      );
    }
  };
