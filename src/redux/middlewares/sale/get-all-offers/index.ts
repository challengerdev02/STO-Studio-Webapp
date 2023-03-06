import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_ALL_OFFERS } from '../../../actions';

export const getAllOffers: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_ALL_OFFERS.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.offers}`,
          onFinish,
          payload,
          onSuccess: GET_ALL_OFFERS.SUCCESS,
          ...rest,
        })
      );
    }
  };
