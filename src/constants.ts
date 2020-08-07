import { platform } from 'os';
import * as path from 'path';

const currentPlatform = platform();
export const IS_MAC = currentPlatform === 'darwin';
export const IS_WINDOWS = currentPlatform === 'win32';
export const IS_LINUX = [
  'aix',
  'freebsd',
  'linux',
  'openbsd',
  'android',
  'sunos'
].includes(currentPlatform);

export const IS_DEVELOPEMENT = process.env.NODE_ENV === 'development';

export const APP_VERSION = '0.1.0';

const { versions } = process;
export const ELECTRON_VERSION = versions.electron;
export const NODE_VERSION = versions.node;
export const CHROME_VERSION = versions.chrome;
export const V8_VERSION = versions.v8;

export const APP_ICON_PATH = path.join(__dirname, './icon.png');
