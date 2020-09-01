import * as path from 'path';
import * as url from 'url';
import {
  app, BrowserWindow, Menu, ipcMain, nativeTheme, clipboard
} from 'electron';
import { debounce, listenToSystemThemeChange, getUserPreferedTheme } from '@utils';
import {
  getWindowLocation,
  saveWindowPosition,
  getWindowPinStatus,
  saveWindowPinStatus,
  saveSelectedColor,
  saveColorInputMode,
  getCopyFormat
} from '@storage';
import { applicationMenu, settingMenu } from '@menus';
import {
  IS_DEVELOPEMENT,
  IS_LINUX,
  APP_ICON_PATH,
  IS_MAC,
  MAIN_WINDOW_WIDTH,
  MAIN_WINDOW_HEIGHT
} from '@constants';
import {
  Position, AppThemeOptions, ColorInputMode, CopyFormat
} from '@types';

let mainWindow: BrowserWindow;

/**
 * Create main application window
 */
const createWindow = async () => {
  const WINDOW_POSITION = await getWindowLocation();
  const { isPinned: initialWindowPinStatus } = await getWindowPinStatus();

  mainWindow = new BrowserWindow({
    frame: false,
    show: false, // Hide window until page is ready whe 'ready-to-show' is emitted
    transparent: true,
    autoHideMenuBar: true,
    width: MAIN_WINDOW_WIDTH,
    height: MAIN_WINDOW_HEIGHT,
    x: WINDOW_POSITION?.x ?? undefined,
    y: WINDOW_POSITION?.y ?? undefined,
    resizable: false,
    backgroundColor: nativeTheme.shouldUseDarkColors
      ? '#2d2d2d'
      : '#ffffff',
    alwaysOnTop: initialWindowPinStatus ?? false,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      devTools: IS_DEVELOPEMENT,
      enableRemoteModule: true
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
  });

  mainWindow.on('move', debounce(() => {
    const { x, y } = mainWindow?.getBounds() ?? {};
    saveWindowPosition(x, y);
  }, 500));
};

// App listener bindings
// TODO: check for updates when app starts
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On macOS it's common for applications and their menu bar to stay active
  // until the user quits explicitly with Cmd + Q
  if (!IS_MAC) {
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

// It would be good to move setInitialTheme into menuItem.ts
// However, it would mean to make settingMenu as an async function which would be hard to import
// Another apporach is to move this to utils folder but it will breaks other menu items
// since introducing `settingMenu` would introduce circular self-reference
// TODO: Rethink the approach of initializing checked theme value
const setInitialTheme = async () => {
  const userPreference = await getUserPreferedTheme();
  const initialAppTheme: AppThemeOptions = userPreference ?? 'system';
  settingMenu.getMenuItemById(`${initialAppTheme}-theme`).checked = true;
};
setInitialTheme();
listenToSystemThemeChange();

const setInitialCopyFormat = async () => {
  const { copyFormat } = await getCopyFormat();
  const initialCopyFormat: CopyFormat = copyFormat ?? 'hex';
  settingMenu.getMenuItemById(`copy-format-${initialCopyFormat}`).checked = true;
};
setInitialCopyFormat();

// Event Handlers
ipcMain.on('QUIT_APP', () => mainWindow?.close());

ipcMain.on('MINIMIZE_APP', () => mainWindow?.minimize());

ipcMain.on('PIN_APP', (_, value: boolean) => {
  mainWindow?.setAlwaysOnTop(value);
  saveWindowPinStatus(value);
});

ipcMain.on('OPEN_SETTING_MENU', (_, mousePosition: Position) => {
  settingMenu.popup({
    window: mainWindow,
    x: mousePosition.x,
    y: mousePosition.y
  });
});

ipcMain.on('SAVE_SELECTED_COLOR', (_, value: string) => {
  saveSelectedColor(value);
});

ipcMain.on('SAVE_COLOR_INPUT_MODE', (_, value: ColorInputMode) => {
  saveColorInputMode(value);
});

ipcMain.on('COPY_COLOR_TO_CLIPBOARD', (_, value: string) => {
  clipboard.writeText(value);
});

// Export mainWindow for other file which requies BrowserWindow to work
const getMainWindow = (): BrowserWindow => mainWindow;
export default getMainWindow;
