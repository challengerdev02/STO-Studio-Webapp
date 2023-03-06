import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_BOOK_SALE_SCHEDULE } from '../../../actions';

export const getBookSaleSchedule: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_BOOK_SALE_SCHEDULE.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.saleOptions.get}/${id}`,
          onFinish,
          payload,
          onSuccess: GET_BOOK_SALE_SCHEDULE.SUCCESS,
          ...rest,
        })
      );
    }
  };
