import {
  shell,
  MenuItemConstructorOptions,
  dialog,
  MessageBoxOptions,
  nativeImage,
  Notification
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
import { clearStorage } from '@utils';

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

export const aboutMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.about,
  accelerator: 'CmdOrCtrl+I',
  click: (): void => {
    const options: MessageBoxOptions = {
      type: 'info',
      icon: nativeImage.createFromPath(APP_ICON_PATH),
      buttons: [translations.app.openGithub, translations.app.close],
      defaultId: 1,
      cancelId: 1,
      noLink: true,
      title: translations.menus.about,
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
  label: translations.menus.checkUpdates,
  accelerator: 'CmdOrCtrl+U'
  // TODO: Check for updates using latest release API from github
};

export const reportIssueMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.reportIssue,
  click: async (): Promise<void> => {
    await shell.openExternal(translations.app.issueUrl);
  }
};

export const quitMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.quitApplication,
  role: 'quit'
};

export const developerMenuItem: MenuItemConstructorOptions = {
  label: translations.menus.developer,
  submenu: [
    { label: translations.menus.toggleDevTools, role: 'toggleDevTools' },
    { label: translations.menus.reload, role: 'reload' },
    {
      label: translations.menus.clearStorage,
      accelerator: 'CmdOrCtrl+Shift+C',
      click: async (): Promise<void> => {
        const isStorageCleared = await clearStorage();
        const notification = new Notification({
          title: isStorageCleared
            ? translations.menus.clearStorageSuccess
            : translations.menus.clearStorageFailure,
          body: isStorageCleared
            ? translations.menus.clearStorageSuccessBody
            : translations.menus.clearStorageFailureBody
        });
        notification.show();
      }
    }
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
