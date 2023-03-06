import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../types';

export const JOIN_COMPETITION = createActionType(
  'JOIN_COMPETITION',
  'COMPETITION'
);

export const joinCompetition = (
  competitionId: string,
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: JOIN_COMPETITION.START,
  meta: {
    ...options,
    payload,
    competitionId,
  },
});
