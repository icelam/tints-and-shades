import { AppTheme, CopyFormat } from '@types';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';

import '@styles/index.scss';
import './app';

// Event Handlers for handiing events sent from main process
window.ipcRenderer?.on('CHANGE_RENDERER_THEME', (_, theme: AppTheme) => {
  window.document.documentElement.setAttribute('data-theme', theme);
});

window.ipcRenderer?.on('CHANGE_COPY_FORMAT', (_, format: CopyFormat) => {
  window.document.getElementById('app')?.setAttribute('copyFormat', format);
});
