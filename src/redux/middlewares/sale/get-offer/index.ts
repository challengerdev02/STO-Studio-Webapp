import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_OFFER } from '../../../actions';

export const getOffer: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_OFFER.START) {
      const { offerId, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.offers}/${offerId}`,
          onFinish,
          onSuccess: GET_OFFER.SUCCESS,
          ...rest,
        })
      );
    }
  };
