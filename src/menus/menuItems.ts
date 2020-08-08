import { MenuItemConstructorOptions } from 'electron';
import translations from '@translations';
import {
  showAboutDialog,
  openIssuePage,
  checkUpdates,
  clearAppStorage,
  openStorageFolder
} from '@utils';

/**
 * Menu item for setting copy format
 */
export const copyFormatMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.copyFormat,
  submenu: [
    {
      label: translations.menus.copyAsHex,
      type: 'radio',
      checked: true
      // TODO: Set copy as HEX, share value between setting menu and app menu
    },
    {
      label: translations.menus.copyAsRgb,
      type: 'radio'
      // TODO: Set copy as RGB, share value between setting menu and app menu
    },
    {
      label: translations.menus.copyAccordingToInputMode,
      type: 'radio'
      // TODO: Set copy according to input mode, share value between setting menu and app menu
    }
  ]
};

/**
 * Menu item for setting theme
 */
export const themeMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.theme,
  submenu: [
    {
      label: translations.menus.lightTheme,
      type: 'radio',
      checked: true
      // TODO: Set Light theme, share value between setting menu and app menu
    },
    {
      label: translations.menus.darkTheme,
      type: 'radio'
      // TODO: Set Dark theme, share value between setting menu and app menu
    }
  ]
};

/**
 * Menu item for displaying application information
 */
export const aboutMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.about,
  accelerator: 'CmdOrCtrl+I',
  click: showAboutDialog
};

/**
 * Menu item for checking updates
 */
export const checkUpdatesMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.checkUpdates,
  accelerator: 'CmdOrCtrl+U',
  click: checkUpdates
};

/**
 * Menu item for reporting issues
 */
export const reportIssueMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.reportIssue,
  click: openIssuePage
};

/**
 * Menu item for quiting application
 */
export const quitMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.quitApplication,
  role: 'quit'
};

/**
 * Menu item displayed only in development mode for debug purpose
 */
export const developerMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.developer,
  submenu: [
    { label: translations.menus.toggleDevTools, role: 'toggleDevTools' },
    { label: translations.menus.reload, role: 'reload' },
    { type: 'separator' },
    {
      label: translations.menus.inpsectStorage,
      accelerator: 'CmdOrCtrl+Shift+S',
      click: openStorageFolder
    },
    {
      label: translations.menus.clearStorage,
      accelerator: 'CmdOrCtrl+Shift+C',
      click: clearAppStorage
    }
  ]
};

/**
 * Menu which is displayed as the first item in menu bar of macOS
 */
export const appMenuItem: MenuItemConstructorOptions = {
  label: translations.app.name,
  submenu: [
    aboutMenuItem,
    checkUpdatesMenuItem,
    reportIssueMenuItem,
    quitMenuItem
  ]
};
