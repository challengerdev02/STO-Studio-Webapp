import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, DELETE } from '../../../../_shared/constants';
import { DELETE_BOOK } from '../../../actions';

export const deleteBook: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === DELETE_BOOK.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: DELETE,
          url: `${APP_URL.book.delete}`,
          onFinish,
          payload,
          onSuccess: DELETE_BOOK.SUCCESS,
          ...rest,
        })
      );
    }
  };
