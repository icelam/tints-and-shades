import { CopyFormat } from '@types';
import { saveCopyFormat } from '@storage';
import getMainWindow from '../main';

/**
 * Set copy format when user explicitly set it through theme preference menu
 */
const setCopyFormat = (newCopyFormat: CopyFormat): void => {
  const window = getMainWindow();
  window.webContents.send('CHANGE_COPY_FORMAT', newCopyFormat);
  saveCopyFormat(newCopyFormat);
};

export default setCopyFormat;
