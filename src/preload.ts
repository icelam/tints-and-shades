import { ipcRenderer } from 'electron';
import { getUserPreferedTheme, getOsTheme } from '@utils/getThemes';
import { getWindowPinStatus, getSelectedColor, getColorInputMode } from '@storage';
import { AppTheme } from '@types';
import { convertColorHexToRgbString } from '@utils/color';

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

restoreWindowPinStatus();
restoreSelectedColorAndInputMode();
