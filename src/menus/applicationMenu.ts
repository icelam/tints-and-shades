import { Menu, MenuItemConstructorOptions } from 'electron';

import { IS_DEVELOPEMENT } from '@constants';

import {
  appMenuItem,
  copyFormatMenuItem,
  themeMenuItem,
  developerMenuItem
} from './menuItems';

const applicationMenuTemplate: MenuItemConstructorOptions[] = [
  appMenuItem,
  copyFormatMenuItem,
  themeMenuItem
];

if (IS_DEVELOPEMENT) {
  applicationMenuTemplate.push(developerMenuItem);
}

const applicationMenu = Menu.buildFromTemplate(applicationMenuTemplate);

export default applicationMenu;
