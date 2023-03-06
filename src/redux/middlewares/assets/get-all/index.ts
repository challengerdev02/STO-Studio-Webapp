import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_ALL_CREATED_ASSETS } from '../../../actions';

export const getAllCreatedAssets: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ALL_CREATED_ASSETS.START) {
      const { payload, onFinish, virtualized = false, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.assets.get}`,
          onFinish,
          payload,
          onSuccess: (data: any) =>
            dispatch({
              type: GET_ALL_CREATED_ASSETS.SUCCESS,
              payload: data,
              virtualized,
              ...rest,
            }),
          ...rest,
        })
      );
    }
  };
