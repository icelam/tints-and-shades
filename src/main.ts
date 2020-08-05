import * as path from 'path';
import * as url from 'url';
import {
  app, BrowserWindow, Menu, ipcMain
} from 'electron';
import { getStoredWindowLocation, saveWindowPositionToStorage, debounce } from './utils';

const WINDOW_WIDTH = 396;
const WINDOW_HEIGHT = 190;
const IS_DEVELOPEMENT = process.env.ELECTRON_ENV === 'development';

let mainWindow: BrowserWindow | null = null;

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
    }
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

// Hide all menu bar items on macOS
// Note: Hiding all menu items seems to diable opening DevTools with shortcuts on macOS
// TODO: Put some useful item in menu and touch bar
if (!IS_DEVELOPEMENT) {
  Menu.setApplicationMenu(null);
}

// Handle event send from ipcRenderer
ipcMain.on('QUIT_APP', () => mainWindow?.close());

ipcMain.on('MINIMIZE_APP', () => mainWindow?.minimize());

ipcMain.on('PIN_APP', (_, value: boolean) => {
  mainWindow?.setAlwaysOnTop(value);
});
