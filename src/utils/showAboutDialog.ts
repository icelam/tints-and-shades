import {
  shell,
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

/**
 * Display a dialog which contains short description of this app
 */
const showAboutDialog = (): void => {
  const messageOptions: MessageBoxOptions = {
    type: 'info',
    icon: nativeImage.createFromPath(APP_ICON_PATH),
    buttons: [translations.dialogs.openGithub, translations.dialogs.close],
    defaultId: 1,
    cancelId: 1,
    noLink: true,
    title: translations.menus.about,
    message: `${translations.app.name} (${APP_VERSION})`,
    detail: `${translations.dialogs.description}\n
${translations.dialogs.electronVersion}${ELECTRON_VERSION}
${translations.dialogs.nodeVersion}${NODE_VERSION}
${translations.dialogs.chromeVersion}${CHROME_VERSION}
${translations.dialogs.v8Version}${V8_VERSION}\n`
  };

  dialog.showMessageBox(messageOptions).then(async ({ response }) => {
    if (response === 0) {
      await shell.openExternal(translations.app.githubUrl);
    }
  });
};

export default showAboutDialog;
