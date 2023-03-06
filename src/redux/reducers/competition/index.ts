import { CompetitionNamespace } from '@/shared/namespaces/competition';
import { Action } from '../../types';
import { GET_COMPETITION, GET_COMPETITION_ENTRIES } from '@/actions';
import { get } from 'lodash';

export interface CompetitionReducerState {
  competitions: Record<string, CompetitionNamespace.Competition[]>;
  competition: Record<string, CompetitionNamespace.Competition>;
  entries: Record<string, CompetitionNamespace.CompetitionEntry[]>;
}

export const competitionDefaultState: CompetitionReducerState = {
  competitions: {},
  competition: {},
  entries: {},
};

const CompetitionReducer = (
  state = competitionDefaultState,
  action: Action
) => {
  switch (action.type) {
    case GET_COMPETITION_ENTRIES.SUCCESS:
      const payload = action.virtualized
        ? [...get(state.entries, [action.key], []), ...(action.payload ?? [])]
        : action.payload;
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.key]: payload,
        },
      };
    case GET_COMPETITION.SUCCESS:
      return {
        ...state,
        competition: {
          ...state.competition,
          [action.key]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default CompetitionReducer;
