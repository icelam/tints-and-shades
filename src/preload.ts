import { ipcRenderer } from 'electron';
import { getUserPreferedTheme, getOsTheme } from '@utils/getThemes';
import {
  getWindowPinStatus,
  getSelectedColor,
  getColorInputMode,
  getCopyFormat
} from '@storage';
import { AppTheme } from '@types';
import { convertColorHexToRgbString } from '@utils/color';

// nodeIntegration is set to `false` for security reasons
// Inject functions needed for web contents here
window.ipcRenderer = ipcRenderer;

const setInitialAppTheme = async () => {
  const userPreference = await getUserPreferedTheme();
  const osTheme = getOsTheme();
  const themeToUse: AppTheme = userPreference && userPreference !== 'system'
    ? userPreference
    : osTheme;
  window.document.documentElement.setAttribute('data-theme', themeToUse);
};

const restoreCopyFormat = async () => {
  const { copyFormat } = await getCopyFormat();
  window.document.getElementById('app')?.setAttribute('copyFormat', copyFormat ?? 'hex');
};

const restoreWindowPinStatus = async (): Promise<void> => {
  const { isPinned } = await getWindowPinStatus();
  window.document.getElementById('app')?.setAttribute('shouldPinFrame', isPinned ? 'true' : 'false');
};

const restoreSelectedColorAndInputMode = async (): Promise<void> => {
  const { inputMode } = await getColorInputMode();
  if (inputMode) {
    window.document.getElementById('app')?.setAttribute('colorInputMode', inputMode);
  }

  const { selectedColor } = await getSelectedColor();
  if (selectedColor) {
    window.document.getElementById('app')?.setAttribute('selectedColor', selectedColor);

    // Format input value according to input mode
    let inputValue = '';
    if (inputMode === 'rgb') {
      inputValue = convertColorHexToRgbString(selectedColor);
    } else {
      inputValue = selectedColor.replace('#', '');
    }

    inputValue && window.document.getElementById('app')?.setAttribute('colorInputValue', inputValue);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  setInitialAppTheme();
  restoreCopyFormat();
  restoreWindowPinStatus();
  restoreSelectedColorAndInputMode();
});
