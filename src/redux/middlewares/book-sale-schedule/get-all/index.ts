import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_BOOKS_SALE_SCHEDULE } from '../../../actions';

export const fetchBooksSaleSchedule: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_BOOKS_SALE_SCHEDULE.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.saleOptions.fetchAll}`,
          onFinish,
          payload,
          onSuccess: GET_BOOKS_SALE_SCHEDULE.SUCCESS,
          ...rest,
        })
      );
    }
  };
