import { ipcRenderer } from 'electron';
import { getUserPreferedTheme, getOsTheme } from '@utils/getThemes';
import { AppTheme } from '@types';

const setInitialAppTheme = async () => {
  const userPreference = await getUserPreferedTheme();
  const osTheme = getOsTheme();
  const themeToUse: AppTheme = userPreference && userPreference !== 'system'
    ? userPreference
    : osTheme;
  window.document.documentElement.setAttribute('data-theme', themeToUse);
};

window.addEventListener('DOMContentLoaded', () => {
  setInitialAppTheme();
});

// nodeIntegration is set to `false` for security reasons
// Inject functions needed for web contents here
window.ipcRenderer = ipcRenderer;
