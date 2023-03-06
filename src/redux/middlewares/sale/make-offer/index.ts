import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '../../../../_shared/constants';
import { CREATE_OFFER } from '../../../actions';

export const createOffer: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === CREATE_OFFER.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.offers}`,
          onFinish,
          payload,
          onSuccess: CREATE_OFFER.SUCCESS,
          ...rest,
        })
      );
    }
  };
