import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_TOKEN_OWNERS } from '../../../actions';

export const getTokenOwners: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_TOKEN_OWNERS.START) {
      const {
        payload,
        onFinish,
        tokenAddress,
        chainId,
        virtualized = false,
        ...rest
      } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.saleOptions.fetchAll}/getOwners/${tokenAddress}?chainId=${chainId}`,
          onFinish,
          payload,
          onSuccess: (data: any) =>
            dispatch({
              type: GET_TOKEN_OWNERS.SUCCESS,
              payload: data,
              virtualized,
              ...rest,
            }),
          ...rest,
        })
      );
    }
  };
