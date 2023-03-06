import { Storage } from '../../_shared';

export const useLocalStorage = <T extends any>(
  key: string,
  defaultValue?: T,
  customEvents?: any
) => {
  return new Storage(key, defaultValue, customEvents);
};
