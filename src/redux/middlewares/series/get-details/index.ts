import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_SERIES_DETAILS } from '@/actions';

export const getSeriesDetails: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_SERIES_DETAILS.START) {
      const { id, payload, onFinish, ...rest } = action.meta;

      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.series.get}/${id}/details`,
          onFinish,
          payload,
          onSuccess: GET_SERIES_DETAILS.SUCCESS,
          ...rest,
        })
      );
    }
  };
