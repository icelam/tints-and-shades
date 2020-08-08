import { Notification } from 'electron';
import translations from '@translations';
import { clearStorage } from '@storage';

/**
 * Clear all JSON saved in the storage folder
 */
const clearAppStorage = async (): Promise<void> => {
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
};

export default clearAppStorage;
