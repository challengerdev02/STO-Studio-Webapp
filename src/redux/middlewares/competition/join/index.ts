import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PUT } from '../../../../_shared/constants';
import { JOIN_COMPETITION } from '../../../actions';

export const joinCompetition: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === JOIN_COMPETITION.START) {
      const { onFinish, competitionId, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PUT,
          url: `${APP_URL.competition}/${competitionId}/join`,
          onFinish,
          onSuccess: JOIN_COMPETITION.SUCCESS,
          ...rest,
        })
      );
    }
  };
