import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_BOOKS } from '../../../actions';

export const fetchBooks: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_BOOKS.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.book.fetchAll}`,
          onFinish,
          payload,
          onSuccess: GET_BOOKS.SUCCESS,
          ...rest,
        })
      );
    }
  };
