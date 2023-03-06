import { useLocalStorage } from '../useLocalStorage';
import { Storage } from '@/shared/utils/storage';
import { THEME_STORAGE_KEY, THEME_STORAGE_SET_KEY } from '@/shared/constants';
import { useEffect, useState } from 'react';

export type ThemeInterface = 'dark' | 'light';

export const changeTheme =
  (storage: Storage) =>
  (theme: ThemeInterface = 'light') => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(theme);
  };

const isSystemDarkMode = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return true;
  }
  return false;
};

export const useTheme = () => {
  const storage = useLocalStorage(THEME_STORAGE_KEY, null, {
    set: THEME_STORAGE_SET_KEY,
  });

  const [theme, setTheme] = useState(storage.get());

  useEffect(() => {
    window.addEventListener(THEME_STORAGE_SET_KEY, (e: Record<string, any>) => {
      setTheme(e.detail.state);
    });
  }, []);

  const change = (cb: (prevTheme: ThemeInterface) => ThemeInterface) => {
    const newTheme = cb(theme);
    changeTheme(storage)(newTheme);
  };

  const loadAndObserve = () => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const newColorScheme = e.matches ? 'dark' : 'light';
        changeTheme(storage)(newColorScheme);
      });

    if (!storage.get()) {
      if (isSystemDarkMode()) {
        changeTheme(storage)('dark');
        return;
      }
      changeTheme(storage)('light');
      return;
    }
    changeTheme(storage)(storage.get());
  };

  return { value: theme, change, loadAndObserve };
};
