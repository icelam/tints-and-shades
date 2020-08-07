import { shell, MenuItemConstructorOptions } from 'electron';
import translations from '@translations';

export const copyFormatMenuItem: MenuItemConstructorOptions = {
  label: translations.menuItems.copyFormat,
  submenu: [
    {
      label: translations.menuItems.copyAsHex,
      type: 'radio',
      checked: true
      // TODO: Set copy as HEX, share value between setting menu and app menu
    },
    {
      label: translations.menuItems.copyAsRgb,
      type: 'radio'
      // TODO: Set copy as RGB, share value between setting menu and app menu
    },
    {
      label: translations.menuItems.copyAccordingToInputMode,
      type: 'radio'
      // TODO: Set copy according to input mode, share value between setting menu and app menu
    }
  ]
};

export const themeMenuItem: MenuItemConstructorOptions = {
  label: translations.menuItems.theme,
  submenu: [
    {
      label: translations.menuItems.lightTheme,
      type: 'radio',
      checked: true
      // TODO: Set Light theme, share value between setting menu and app menu
    },
    {
      label: translations.menuItems.darkTheme,
      type: 'radio'
      // TODO: Set Dark theme, share value between setting menu and app menu
    }
  ]
};

export const aboutMenuItem: MenuItemConstructorOptions = {
  label: translations.menuItems.about,
  accelerator: 'CmdOrCtrl+I'
  // TODO: Show app info like app version and short description
};

export const checkUpdatesMenuItem: MenuItemConstructorOptions = {
  label: translations.menuItems.checkUpdates,
  accelerator: 'CmdOrCtrl+U'
  // TODO: Check for updates using latest release API from github
};

export const reportIssueMenuItem: MenuItemConstructorOptions = {
  label: translations.menuItems.reportIssue,
  click: async (): Promise<void> => {
    await shell.openExternal(translations.app.githubUrl);
  }
};

export const quitMenuItem: MenuItemConstructorOptions = {
  label: translations.menuItems.quitApplication,
  role: 'quit'
};

export const developerMenuItem: MenuItemConstructorOptions = {
  label: 'Developer',
  submenu: [
    { role: 'toggleDevTools' },
    { role: 'reload' }
  ]
};

export const appMenuItem: MenuItemConstructorOptions = {
  label: translations.app.name,
  submenu: [
    aboutMenuItem,
    checkUpdatesMenuItem,
    reportIssueMenuItem,
    quitMenuItem
  ]
};
