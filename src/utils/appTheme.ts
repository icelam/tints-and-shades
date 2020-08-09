import { nativeTheme } from 'electron';
import { AppTheme, AppThemeOptions } from '@types';
import { saveAppTheme } from '@storage';
import { getOsTheme, getUserPreferedTheme } from './getThemes';
import getMainWindow from '../main';

/**
 * Set app theme when user explicitly set it through theme preference menu
 */
export const setAppTheme = (theme: AppThemeOptions): void => {
  const window = getMainWindow();
  const osTheme = getOsTheme();
  const themeToUse: AppTheme = theme !== 'system' ? theme : osTheme;
  window.webContents.send('CHANGE_RENDERER_THEME', themeToUse);
  saveAppTheme(theme);
};

/**
 * Listen to theme change on system preferences
 */
export const listenToSystemThemeChange = (): void => {
  nativeTheme.on('updated', async () => {
    const window = getMainWindow();
    const userPreference = await getUserPreferedTheme();
    const osTheme = getOsTheme();
    const themeToUse: AppTheme = userPreference && userPreference !== 'system'
      ? userPreference
      : osTheme;
    window.webContents.send('CHANGE_RENDERER_THEME', themeToUse);
  });
};
