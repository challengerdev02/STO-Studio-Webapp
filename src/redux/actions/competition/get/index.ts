import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const GET_COMPETITION = createActionType(
  'GET_COMPETITION',
  'COMPETITION'
);

export const getCompetition = (
  competitionId: string,
  options?: ActionOption
) => ({
  type: GET_COMPETITION.START,
  meta: {
    ...options,
    competitionId,
  },
});
