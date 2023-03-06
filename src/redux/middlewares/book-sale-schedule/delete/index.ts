import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, DELETE } from '../../../../_shared/constants';
import { DELETE_BOOK_SALE_SCHEDULE } from '../../../actions';

export const deleteBookSaleSchedule: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === DELETE_BOOK_SALE_SCHEDULE.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: DELETE,
          url: `${APP_URL.saleOptions.delete}`,
          onFinish,
          payload,
          onSuccess: DELETE_BOOK_SALE_SCHEDULE.SUCCESS,
          ...rest,
        })
      );
    }
  };
