import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '../../../../_shared/constants';
import { CREATE_BOOK } from '../../../actions';

export const createBook: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === CREATE_BOOK.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.book.create}`,
          onFinish,
          payload,
          onSuccess: CREATE_BOOK.SUCCESS,
          ...rest,
        })
      );
    }
  };
