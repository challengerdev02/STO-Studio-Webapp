import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_ALL_SERIES } from '@/actions';

export const fetchAllSeries: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ALL_SERIES.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.series.fetchAll}`,
          onFinish,
          payload,
          onSuccess: GET_ALL_SERIES.SUCCESS,
          ...rest,
        })
      );
    }
  };
