import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_BID } from '../../../actions';

export const getBid: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_BID.START) {
      const { bidId, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.bids}/${bidId}`,
          onFinish,
          onSuccess: GET_BID.SUCCESS,
          ...rest,
        })
      );
    }
  };
