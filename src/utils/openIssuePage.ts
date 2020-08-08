import { shell } from 'electron';
import translations from '@translations';

/**
 * Open Github issue page
 */
const openIssuePage = async (): Promise<void> => {
  await shell.openExternal(translations.app.issueUrl);
};

export default openIssuePage;
