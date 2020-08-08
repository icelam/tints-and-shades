import { shell } from 'electron';
import { getStoragePath } from '@storage';

/**
 * Open storage folder in file manager
 */
const openStorageFolder = (): void => {
  const storagePath = getStoragePath();
  shell.showItemInFolder(storagePath);
};

export default openStorageFolder;
