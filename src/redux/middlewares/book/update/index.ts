import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PATCH } from '../../../../_shared/constants';
import { UPDATE_BOOK } from '../../../actions';

export const updateBook: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPDATE_BOOK.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PATCH,
          url: `${APP_URL.book.update}/${id}`,
          onFinish,
          payload,
          onSuccess: UPDATE_BOOK.SUCCESS,
          ...rest,
        })
      );
    }
  };
