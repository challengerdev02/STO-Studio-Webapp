import { createActionString } from '@/shared/utils';

export const SESSION_TOKEN = createActionString('SESSION_TOKEN', 'AUTH');

export const setSessionToken = (value: Record<string, any>) => ({
  type: SESSION_TOKEN,
  value,
});
