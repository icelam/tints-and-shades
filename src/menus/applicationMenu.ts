import { Menu, MenuItemConstructorOptions } from 'electron';

import { IS_DEVELOPEMENT } from '@constants';

import {
  appMenuItem,
  copyFormatMenuItem,
  themeMenuItem,
  developerMenuItem
} from './menuItems';

/**
 * Menu template for creating application menu displayed in macOS
 */
const applicationMenuTemplate: MenuItemConstructorOptions[] = [
  appMenuItem,
  copyFormatMenuItem,
  themeMenuItem
];

if (IS_DEVELOPEMENT) {
  applicationMenuTemplate.push(developerMenuItem);
}

/**
 * Application menu displayed in macOS
 */
const applicationMenu = Menu.buildFromTemplate(applicationMenuTemplate);

export default applicationMenu;
