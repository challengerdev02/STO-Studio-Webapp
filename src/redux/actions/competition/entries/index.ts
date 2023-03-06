import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_COMPETITION_ENTRIES = createActionType(
  'GET_COMPETITION_ENTRIES',
  'COMPETITION'
);

export const getCompetitionEntries = (
  competitionId: string,
  options?: ActionOption
) => ({
  type: GET_COMPETITION_ENTRIES.START,
  meta: {
    ...options,
    competitionId,
  },
});
