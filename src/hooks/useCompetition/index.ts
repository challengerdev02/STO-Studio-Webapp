import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import {
  getCompetition,
  getCompetitionEntries,
  joinCompetition,
} from '@/actions';
import { CompetitionNamespace } from '@/shared/namespaces/competition';

interface UseCompetition {
  allCompetition: CompetitionNamespace.Competition[];
  entries: CompetitionNamespace.CompetitionEntry[];
  competition: CompetitionNamespace.Competition;
  handleGetEntries: (competitionId: string, options?: ActionOption) => void;
  handleGetCompetition: (competitionId: string, options?: ActionOption) => void;
  handleJoinCompetition: (
    competitionId: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
}

interface UseCompetitionProps {
  key: string;
  options?: ActionOption;
}

export const useCompetition = (
  parameter: UseCompetitionProps
): UseCompetition => {
  const { key, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const {
    competitions: allCompetition,
    competition,
    entries,
  } = useSelector((state: RootState) => {
    return {
      competitions: state.competition.competitions[key] ?? [],
      entries: state.competition.entries[key] ?? [],
      competition: state.competition.competition[key] ?? [],
    };
  });

  const handleGetEntries = (competitionId: string, options?: ActionOption) => {
    dispatch(
      getCompetitionEntries(
        competitionId,
        Object.assign({}, defaultOptions, { key }, options)
      )
    );
  };

  const handleGetCompetition = (
    competitionId: string,
    options?: ActionOption
  ) => {
    dispatch(
      getCompetition(
        competitionId,
        Object.assign({}, defaultOptions, { key }, options)
      )
    );
  };

  const handleJoinCompetition = (
    competitionId: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      joinCompetition(
        competitionId,
        payload,
        Object.assign({}, defaultOptions, { key }, options)
      )
    );
  };

  return {
    allCompetition,
    entries,
    competition,
    handleGetEntries,
    handleGetCompetition,
    handleJoinCompetition,
  };
};
