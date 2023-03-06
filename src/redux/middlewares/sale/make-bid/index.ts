import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '../../../../_shared/constants';
import { CREATE_BID } from '../../../actions';

export const createBid: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === CREATE_BID.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.bids}`,
          onFinish,
          payload,
          onSuccess: CREATE_BID.SUCCESS,
          ...rest,
        })
      );
    }
  };
