import {
  shell,
  MenuItemConstructorOptions,
  dialog,
  MessageBoxOptions,
  nativeImage
} from 'electron';
import translations from '@translations';
import {
  APP_VERSION,
  ELECTRON_VERSION,
  NODE_VERSION,
  CHROME_VERSION,
  V8_VERSION,
  APP_ICON_PATH
} from '@constants';

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
  accelerator: 'CmdOrCtrl+I',
  click: (): void => {
    const options: MessageBoxOptions = {
      type: 'info',
      icon: nativeImage.createFromPath(APP_ICON_PATH),
      buttons: [translations.app.openGithub, translations.app.close],
      defaultId: 1,
      cancelId: 1,
      noLink: true,
      title: translations.menuItems.about,
      message: `${translations.app.name} (v${APP_VERSION})`,
      detail: `${translations.app.description}\n
Electron version: ${ELECTRON_VERSION}
Node version: ${NODE_VERSION}
Chrome version: ${CHROME_VERSION}
V8 version: ${V8_VERSION}\n`
    };

    dialog.showMessageBox(options).then(async ({ response }) => {
      if (response === 0) {
        await shell.openExternal(translations.app.githubUrl);
      }
    });
  }
};

export const checkUpdatesMenuItem: MenuItemConstructorOptions = {
  label: translations.menuItems.checkUpdates,
  accelerator: 'CmdOrCtrl+U'
  // TODO: Check for updates using latest release API from github
};

export const reportIssueMenuItem: MenuItemConstructorOptions = {
  label: translations.menuItems.reportIssue,
  click: async (): Promise<void> => {
    await shell.openExternal(translations.app.issueUrl);
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
