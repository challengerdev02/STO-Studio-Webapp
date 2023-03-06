import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { SEARCH_ITEMS } from '../../../actions';

export const searchItems: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === SEARCH_ITEMS.START) {
      const { onFinish, virtualized = false, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.saleOptions.get}/search`,
          onFinish,
          onSuccess: (data) => {
            dispatch({
              type: SEARCH_ITEMS.SUCCESS,
              ...rest,
              payload: data,
              virtualized,
            });
          },
          ...rest,
        })
      );
    }
  };
