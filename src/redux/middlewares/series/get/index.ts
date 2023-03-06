import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_SERIES } from '@/actions';

export const getSeries: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_SERIES.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.series.get}/${id}`,
          onFinish,
          payload,
          onSuccess: GET_SERIES.SUCCESS,
          ...rest,
        })
      );
    }
  };
