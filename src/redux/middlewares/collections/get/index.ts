import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_COLLECTIONS } from '../../../actions';

export const getCollections: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_COLLECTIONS.START) {
      const { onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.collections.get}`,
          onFinish,
          onSuccess: GET_COLLECTIONS.SUCCESS,
          ...rest,
        })
      );
    }
  };
