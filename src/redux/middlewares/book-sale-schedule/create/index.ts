import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '../../../../_shared/constants';
import { CREATE_BOOK_SALE_SCHEDULE } from '../../../actions';

export const createBookSaleSchedule: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === CREATE_BOOK_SALE_SCHEDULE.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.saleOptions.create}`,
          onFinish,
          payload,
          successMessage: 'Sale scheduled successfully',
          onSuccess: CREATE_BOOK_SALE_SCHEDULE.SUCCESS,
          ...rest,
        })
      );
    }
  };
