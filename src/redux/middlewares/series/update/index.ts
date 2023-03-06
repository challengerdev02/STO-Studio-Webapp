import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PUT } from '@/shared/constants';
import { UPDATE_SERIES } from '@/actions';

export const updateSeries: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPDATE_SERIES.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PUT,
          url: `${APP_URL.series.update}/${id}`,
          onFinish,
          payload,
          onSuccess: UPDATE_SERIES.SUCCESS,
          ...rest,
        })
      );
    }
  };
