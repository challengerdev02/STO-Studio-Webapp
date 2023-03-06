import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_LATEST_BID } from '../../../actions';

export const getLatestBid: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_LATEST_BID.START) {
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.bids}/search/one`,
          onSuccess: GET_LATEST_BID.SUCCESS,
          ...action.meta,
        })
      );
    }
  };
