import { platform } from 'os';

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
