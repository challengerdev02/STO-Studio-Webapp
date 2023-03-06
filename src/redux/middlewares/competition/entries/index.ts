import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '../../../../_shared/constants';
import { GET_COMPETITION_ENTRIES } from '../../../actions';

export const getCompetitionEntries: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_COMPETITION_ENTRIES.START) {
      const { onFinish, competitionId, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.competition}/${competitionId}/entries`,
          onFinish,
          onSuccess: GET_COMPETITION_ENTRIES.SUCCESS,
          ...rest,
        })
      );
    }
  };
