import * as path from 'path';
import * as url from 'url';
import {
  app, BrowserWindow, Menu, ipcMain
} from 'electron';
import { getStoredWindowLocation, saveWindowPositionToStorage, debounce } from '@utils';
import { applicationMenu, settingMenu } from '@menus';
import { IS_DEVELOPEMENT, IS_LINUX, APP_ICON_PATH } from '@constants';
import { Position } from '@types';

const WINDOW_WIDTH = 396;
const WINDOW_HEIGHT = 190;

let mainWindow: BrowserWindow;

const createWindow = async () => {
  const WINDOW_POSITION = await getStoredWindowLocation();

  mainWindow = new BrowserWindow({
    frame: false,
    show: false, // Hide window until page is ready whe 'ready-to-show' is emitted
    transparent: false,
    autoHideMenuBar: true,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    x: WINDOW_POSITION?.x ?? undefined,
    y: WINDOW_POSITION?.y ?? undefined,
    resizable: false,
    backgroundColor: '#ffffff', // TODO: dark mode
    webPreferences: {
      nodeIntegration: true,
      devTools: IS_DEVELOPEMENT
    },
    // For app icon to be displayed correctly on linux AppImage
    // https://github.com/electron-userland/electron-builder/issues/2269
    icon: IS_LINUX ? APP_ICON_PATH : undefined
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    // IS_DEVELOPEMENT && mainWindow?.webContents.openDevTools();
  });

  mainWindow.on('move', debounce(() => {
    const { x, y } = mainWindow?.getBounds() ?? {};
    saveWindowPositionToStorage(x, y);
  }, 500));
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On macOS it's common for applications and their menu bar to stay active
  // until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the dock icon is clicked
  // and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Application menu bar
Menu.setApplicationMenu(applicationMenu);

// Event Handlers
ipcMain.on('QUIT_APP', () => mainWindow?.close());

ipcMain.on('MINIMIZE_APP', () => mainWindow?.minimize());

ipcMain.on('PIN_APP', (_, value: boolean) => {
  mainWindow?.setAlwaysOnTop(value);
});

ipcMain.on('OPEN_SETTING_MENU', (_, mousePosition: Position) => {
  settingMenu.popup({
    window: mainWindow,
    x: mousePosition.x,
    y: mousePosition.y
  });
});

// Export mainWindow for other file which requies BrowserWindow to work
const getMainWindow = (): BrowserWindow => mainWindow;
export default getMainWindow;
