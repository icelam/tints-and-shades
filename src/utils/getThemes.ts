/**
 *This file would be shared with renderer.
 * Please ONLY import and use things that is allowed in renderer
 */
import { nativeTheme, remote } from 'electron';
import { AppTheme, AppThemeOptions } from '@types';
import { getAppTheme } from '@storage';

export const getOsTheme = (): AppTheme => {
  const nativeThemeApi = nativeTheme || remote.nativeTheme;
  return nativeThemeApi.shouldUseDarkColors
    ? 'dark'
    : 'light';
};

export const getUserPreferedTheme = async (): Promise<AppThemeOptions | undefined> => {
  const { theme } = await getAppTheme();
  return theme;
};
