import * as https from 'https';
import {
  shell,
  dialog,
  MessageBoxOptions,
  nativeImage
} from 'electron';
import log from 'electron-log';
import translations from '@translations';
import {
  APP_VERSION,
  APP_ICON_PATH,
  GITHUB_REPO_URL,
  GITHUB_RELEASE_API
} from '@constants';
import getMainWindow from '../main';

/**
 * Check for updates using Github API, and show result in dialog
 */
const checkUpdates = (): void => {
  const window = getMainWindow();
  const requestOptions = {
    headers: {
      'User-Agent': window?.webContents.getUserAgent()
    }
  };

  https.get(GITHUB_RELEASE_API, requestOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const releaseData = JSON.parse(data);
      const statusCode = res.statusCode ?? 0;
      const isRequestSuccess = statusCode >= 200 && statusCode < 300;
      const hasUpdate = releaseData?.['tag_name'] > APP_VERSION;

      if (!isRequestSuccess) {
        log.error(`Failed to check for update. API returned error message: ${releaseData?.message}. (Status Code: ${statusCode})`);
      }

      // eslint-disable-next-line no-nested-ternary
      const messageOptions: MessageBoxOptions = isRequestSuccess
        ? hasUpdate
          ? {
            type: 'info',
            icon: nativeImage.createFromPath(APP_ICON_PATH),
            buttons: [translations.dialogs.update, translations.dialogs.close],
            defaultId: 0,
            cancelId: 1,
            noLink: true,
            title: translations.menus.checkUpdates,
            message: translations.dialogs.newUpdateAvailable,
            detail: translations.dialogs.newUpdateAvailableDetail
          }
          : {
            type: 'info',
            icon: nativeImage.createFromPath(APP_ICON_PATH),
            buttons: [translations.dialogs.close],
            defaultId: 0,
            cancelId: 1,
            noLink: true,
            title: translations.menus.checkUpdates,
            message: 'No update available',
            detail: 'You are currently using the latest version of this app.'
          }
        : {
          type: 'info',
          icon: nativeImage.createFromPath(APP_ICON_PATH),
          buttons: [translations.dialogs.openGithub, translations.dialogs.close],
          defaultId: 0,
          cancelId: 1,
          noLink: true,
          title: translations.menus.checkUpdates,
          message: translations.dialogs.failedToCheckUpdate,
          detail: translations.dialogs.failedToCheckUpdateDetail
        };

      dialog.showMessageBox(messageOptions).then(async ({ response }) => {
        if ((!isRequestSuccess || (isRequestSuccess && hasUpdate)) && response === 0) {
          await shell.openExternal(`${GITHUB_REPO_URL}/releases`);
        }
      });
    });
  }).on('error', (error) => {
    log.error(error?.message ?? 'Unknown error when checking for updates');
  });
};

export default checkUpdates;
