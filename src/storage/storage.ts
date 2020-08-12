import * as storage from 'electron-json-storage';
import log from 'electron-log';
import { Position, AppThemeOptions, AppThemeStorage } from '@types';

const POSITION_STORAGE_PATH = 'windowPosition';
const THEME_STORAGE_PATH = 'appTheme';
// const PIN_STATUS_STORAGE_PATH = 'window.pin';

/**
 * Get user defined theme preference stored in storage
 * @returns {AppThemeStorage} theme preference stored as JSON
 */
export const getAppTheme = async (): Promise<AppThemeStorage> => {
  try {
    const appTheme = await new Promise((resolve, reject) => {
      storage.get(THEME_STORAGE_PATH, (error: Error, data: Position) => {
        if (error) { reject(error); }
        resolve(data);
      });
    });
    return appTheme as AppThemeStorage;
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from getAppTheme()');
    return {};
  }
};

/**
 * Save user defined theme preference to storage
 * @param {AppThemeOptions} user defined theme
 */
export const saveAppTheme = (theme?: AppThemeOptions): void => {
  try {
    if (!theme) {
      throw new Error('Theme not provided when trying to save theme');
    }

    storage.set(THEME_STORAGE_PATH, { theme }, (error) => {
      if (error) { throw error; }
    });
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from saveAppTheme()');
  }
};

/**
 * Get window position stored in storage
 * @returns {Position} window position stored when window is moved
 */
export const getWindowLocation = async (): Promise<Position> => {
  try {
    const windowPosition = await new Promise((resolve, reject) => {
      storage.get(POSITION_STORAGE_PATH, (error: Error, data: Position) => {
        if (error) { reject(error); }
        resolve(data);
      });
    });
    return windowPosition as Position;
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from getWindowLocation()');
    return {};
  }
};

/**
 * Save window position to storage
 * @param {number} x - X coordinate of window position
 * @param {number} y - Y coordinate of window position
 */
export const saveWindowPosition = (x?: number, y?: number): void => {
  try {
    if (!x || !y) {
      throw new Error('Missing X or Y in position when trying to save window position');
    }

    const windowPositionData: Position = { x, y };
    storage.set(POSITION_STORAGE_PATH, windowPositionData, (error) => {
      if (error) { throw error; }
    });
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from saveWindowPosition()');
  }
};

/**
 * Get storage path
 * @returns {string} folder path which contains all the stored json
 */
export const getStoragePath = (): string => storage.getDataPath();

/**
 * Clear all preference saved in storage
 * @return {boolean} whether clear is success
 */
export const clearStorage = async (): Promise<boolean> => {
  try {
    await new Promise((resolve, reject) => {
      storage.clear((error: Error) => {
        if (error) { reject(error); }
        resolve();
      });
    });
    return true;
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from clearStorage()');
    return false;
  }
};
