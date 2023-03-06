import { createActionType } from '@/shared/utils';
import { ActionOption } from '../../../../types';

export const BECOME_A_CREATOR = createActionType('BECOME_A_CREATOR', 'ACCOUNT');

export const becomeACreator = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: BECOME_A_CREATOR.START,
  meta: {
    ...options,
    payload,
  },
});
