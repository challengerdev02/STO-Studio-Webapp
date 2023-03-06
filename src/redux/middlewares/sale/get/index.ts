import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_SALE_ASSET } from '../../../actions';

export const getSaleAsset: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_SALE_ASSET.START) {
      const { onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.saleOptions.get}/search/one`,
          onFinish,
          onSuccess: GET_SALE_ASSET.SUCCESS,
          ...rest,
        })
      );
    }
  };
