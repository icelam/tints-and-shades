import { Menu, MenuItemConstructorOptions } from 'electron';
import {
  copyFormatMenuItem,
  themeMenuItem,
  aboutMenuItem,
  checkUpdatesMenuItem,
  reportIssueMenuItem,
  quitMenuItem
} from './menuItems';

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

const settingMenu = Menu.buildFromTemplate(settingMenuTemplate);

export default settingMenu;
