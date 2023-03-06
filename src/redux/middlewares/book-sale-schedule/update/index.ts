import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PUT } from '../../../../_shared/constants';
import { UPDATE_BOOK_SALE_SCHEDULE } from '../../../actions';

export const updateBookSaleSchedule: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPDATE_BOOK_SALE_SCHEDULE.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PUT,
          url: `${APP_URL.saleOptions.update}/${id}`,
          onFinish,
          payload,
          onSuccess: UPDATE_BOOK_SALE_SCHEDULE.SUCCESS,
          ...rest,
        })
      );
    }
  };
