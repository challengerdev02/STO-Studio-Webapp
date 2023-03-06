import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_ALL_SALE_ASSETS } from '../../../actions';

export const getAllSaleAssets: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ALL_SALE_ASSETS.START) {
      const { payload, onFinish, virtualized = false, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.saleOptions.fetchAll}`,
          onFinish,
          payload,
          onSuccess: (data: any) =>
            dispatch({
              type: GET_ALL_SALE_ASSETS.SUCCESS,
              payload: data,
              virtualized,
              ...rest,
            }),
          ...rest,
        })
      );
    }
  };
