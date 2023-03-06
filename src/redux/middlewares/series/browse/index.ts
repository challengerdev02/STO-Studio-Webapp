import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { BROWSE_SERIES } from '@/actions';

export const browseSeries: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === BROWSE_SERIES.START) {
      const { onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.series.get}/browse`,
          onFinish,
          onSuccess: BROWSE_SERIES.SUCCESS,
          ...rest,
        })
      );
    }
  };
