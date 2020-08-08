import { Menu, MenuItemConstructorOptions } from 'electron';
import {
  copyFormatMenuItem,
  themeMenuItem,
  aboutMenuItem,
  checkUpdatesMenuItem,
  reportIssueMenuItem,
  quitMenuItem
} from './menuItems';

/**
 * Menu template for creating setting menu
 */
const settingMenuTemplate: MenuItemConstructorOptions[] = [
  copyFormatMenuItem,
  { type: 'separator' },
  themeMenuItem,
  { type: 'separator' },
  aboutMenuItem,
  checkUpdatesMenuItem,
  reportIssueMenuItem,
  quitMenuItem
];

/**
 * Setting menu displayed when clicking the setting icon
 */
const settingMenu = Menu.buildFromTemplate(settingMenuTemplate);

export default settingMenu;
