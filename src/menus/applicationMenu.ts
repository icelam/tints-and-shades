import { Menu, MenuItemConstructorOptions } from 'electron';

import { IS_DEVELOPEMENT } from '@constants';

import {
  appMenuItem,
  editMenuItem,
  developerMenuItem
} from './menuItems';

/**
 * Menu template for creating application menu displayed in macOS
 */
const applicationMenuTemplate: MenuItemConstructorOptions[] = [
  appMenuItem,
  editMenuItem
  // Temporary disable `copyFormatMenuItem` and `themeMenuItem`
  // Since importing `applicationMenu` and `settingMenu` at `setAppTheme()`
  // breaks functions of other menu items
  // TODO: Figure out a way to sync checked option value between two menus
];

if (IS_DEVELOPEMENT) {
  applicationMenuTemplate.push(developerMenuItem);
}

/**
 * Application menu displayed in macOS
 */
const applicationMenu = Menu.buildFromTemplate(applicationMenuTemplate);

export default applicationMenu;
