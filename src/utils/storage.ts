import * as storage from 'electron-json-storage';
import log from 'electron-log';
import { Position } from '@types';

const POSITION_STORAGE_PATH = 'window.position';
// const PIN_STATUS_STORAGE_PATH = 'window.pin';

/**
 * Get window position stored in storage
 * @returns {Position} window position stored when window is moved
 */
export const getStoredWindowLocation = async (): Promise<Position> => {
  try {
    const windowPosition = await new Promise((resolve, reject) => {
      storage.get(POSITION_STORAGE_PATH, (error: Error, data: Position) => {
        if (error) { reject(error); }
        resolve(data);
      });
    });
    return windowPosition as Position;
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from getStoredWindowLocation()');
    return {};
  }
};

/**
 * Save window position to storage
 * @param {number} x - X coordinate of window position
 * @param {number} y - Y coordinate of window position
 */
export const saveWindowPositionToStorage = (x?: number, y?: number): void => {
  try {
    if (!x || !y) {
      throw new Error('Missing X or Y in position');
    }

    const windowPositionData: Position = { x, y };
    storage.set(POSITION_STORAGE_PATH, windowPositionData, (error) => {
      if (error) { throw error; }
    });
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from saveWindowPositionToStorage()');
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
