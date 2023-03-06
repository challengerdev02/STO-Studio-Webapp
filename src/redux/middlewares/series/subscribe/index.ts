import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PUT } from '@/shared/constants';
import { SUBSCRIBE_TO_SERIES } from '@/actions';

export const subscribeToSeries: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === SUBSCRIBE_TO_SERIES.START) {
      const { id, payload, onFinish, ...rest } = action.meta;

      dispatch(
        serverRequest({
          method: PUT,
          url: `${APP_URL.series.update}/${id}/subscriptions`,
          onFinish,
          payload,
          onSuccess: SUBSCRIBE_TO_SERIES.SUCCESS,
          ...rest,
        })
      );
    }
  };
