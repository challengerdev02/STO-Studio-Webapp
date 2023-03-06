import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_TOKEN_ACTIVITY } from '../../../actions';

export const getTokenActivity: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_TOKEN_ACTIVITY.START) {
      const {
        payload,
        onFinish,
        tokenAddress,
        virtualized = false,
        tokenId,
        chainId,
        ...rest
      } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.saleOptions.fetchAll}/getTokenActivities/${tokenAddress}?tokenId=${tokenId}&chainId=${chainId}`,
          onFinish,
          payload,
          onSuccess: (data: any) =>
            dispatch({
              type: GET_TOKEN_ACTIVITY.SUCCESS,
              payload: data,
              virtualized,
              ...rest,
            }),
          ...rest,
        })
      );
    }
  };
