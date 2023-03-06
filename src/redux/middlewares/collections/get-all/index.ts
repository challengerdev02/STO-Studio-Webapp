import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_ALL_COLLECTIONS } from '../../../actions';

export const getAllCollections: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ALL_COLLECTIONS.START) {
      const { payload, onFinish, virtualized = false, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.collections.get}`,
          onFinish,
          payload,
          onSuccess: (data: any) =>
            dispatch({
              type: GET_ALL_COLLECTIONS.SUCCESS,
              payload: data,
              virtualized,
              ...rest,
            }),
          ...rest,
        })
      );
    }
  };
