import * as storage from 'electron-json-storage';
import log from 'electron-log';
import {
  Position, AppThemeOptions, AppThemeStorage, PinStatusStorage, SelectedColorStorage
} from '@types';

const WINDOW_POSITION_STORAGE_PATH = 'windowPosition';
const THEME_STORAGE_PATH = 'appTheme';
const WINDOW_PIN_STATUS_STORAGE_PATH = 'windowPinStatus';
const WINDOW_SELECTED_COLOR_STORAGE_PATH = 'selectedColor';

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

    const themeData: AppThemeStorage = { theme };
    storage.set(THEME_STORAGE_PATH, themeData, (error) => {
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
      storage.get(WINDOW_POSITION_STORAGE_PATH, (error: Error, data: Position) => {
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
    storage.set(WINDOW_POSITION_STORAGE_PATH, windowPositionData, (error) => {
      if (error) { throw error; }
    });
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from saveWindowPosition()');
  }
};

/**
 * Get window pin status stored in storage
 * @returns {PinStatusStorage} JSON that indicates whether window is always on top
 */
export const getWindowPinStatus = async (): Promise<PinStatusStorage> => {
  try {
    const pinStatus = await new Promise((resolve, reject) => {
      storage.get(WINDOW_PIN_STATUS_STORAGE_PATH, (error: Error, data: PinStatusStorage) => {
        if (error) { reject(error); }
        resolve(data);
      });
    });
    return pinStatus as PinStatusStorage;
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from getPinStatus()');
    return {};
  }
};

/**
 * Save window pin status to storage
 * @param {boolean} whether window is set to always on top
 */
export const saveWindowPinStatus = (isWindowPinned?: boolean): void => {
  try {
    if (typeof isWindowPinned !== 'boolean') {
      throw new Error('Status not defined when trying to save window pin status');
    }

    const pinStatusData: PinStatusStorage = { isPinned: isWindowPinned };
    storage.set(WINDOW_PIN_STATUS_STORAGE_PATH, pinStatusData, (error) => {
      if (error) { throw error; }
    });
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from savePinStatus()');
  }
};

/**
 * Get selectedColor stored in storage
 * @returns {SelectedColorStorage} JSON that contains user's last selected color
 */
export const getSelectedColor = async (): Promise<SelectedColorStorage> => {
  try {
    const selectedColor = await new Promise((resolve, reject) => {
      storage.get(WINDOW_SELECTED_COLOR_STORAGE_PATH, (
        error: Error, data: SelectedColorStorage
      ) => {
        if (error) { reject(error); }
        resolve(data);
      });
    });
    return selectedColor as SelectedColorStorage;
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from getPinStatus()');
    return {};
  }
};

/**
 * Save selected color to storage
 * @param {string} user selected color
 */
export const saveSelectedColor = (color?: string): void => {
  try {
    if (typeof color !== 'string') {
      throw new Error('Color is not defined when trying to save selected color');
    }

    const selectedColorData: SelectedColorStorage = { selectedColor: color };
    storage.set(WINDOW_SELECTED_COLOR_STORAGE_PATH, selectedColorData, (error) => {
      if (error) { throw error; }
    });
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from saveSelectedColor()');
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
