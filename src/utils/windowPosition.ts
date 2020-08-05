import * as storage from 'electron-json-storage';
import log from 'electron-log';

type WindowPosition = {
  x?: number; y?: number;
};

/**
 * Get window position stored in storage
 * @returns {WindowPosition} window position stored when window is moved
 */
export const getStoredWindowLocation = async (): Promise<WindowPosition> => {
  try {
    const windowPosition = await new Promise((resolve, reject) => {
      storage.get('windowPosition', (error, data) => {
        if (error) { reject(error); }
        resolve(data);
      });
    });
    return windowPosition as WindowPosition;
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

    const windowPositionData: WindowPosition = { x, y };
    storage.set('windowPosition', windowPositionData, (error) => {
      if (error) { throw error; }
    });
  } catch (error) {
    log.error(error?.message ?? 'Unknown error from saveWindowPositionToStorage()');
  }
};
