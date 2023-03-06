import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_BOOK } from '../../../actions';

export const getBook: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_BOOK.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.book.get}/${id}`,
          onFinish,
          payload,
          onSuccess: GET_BOOK.SUCCESS,
          ...rest,
        })
      );
    }
  };
