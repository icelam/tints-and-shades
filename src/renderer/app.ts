import { ipcRenderer } from 'electron';
import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult
} from 'lit-element';
import '@components/Header/FrameHeader';

/**
 * Enrty point of the app
 */
@customElement('generator-app')
class GeneratorApp extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }
    `;
  }

  /**
   * Whether the current frame set to always on top or not.
   */
  @property({ type: Boolean })
  shouldPinFrame = false; // TODO: Save and get value from storage on app load

  render(): TemplateResult {
    return html`
      <frame-header
        .closeFrame=${this.closeFrame}
        .minimizeFrame=${this.minimizeFrame}
        .pinFrame=${this.pinFrame}
        .shouldPinFrame=${this.shouldPinFrame}
        .openSettingMenu=${this.openSettingMenu}
      >
      </frame-header>
    `;
  }

  private closeFrame() {
    ipcRenderer.send('QUIT_APP');
  }

  private openSettingMenu(event: MouseEvent) {
    ipcRenderer.send('OPEN_SETTING_MENU', {
      x: event.clientX + 10,
      y: event.clientY + 10
    });
  }

  private minimizeFrame() {
    ipcRenderer.send('MINIMIZE_APP');
  }

  private pinFrame() {
    const newPinState = !this.shouldPinFrame;
    this.shouldPinFrame = newPinState;
    ipcRenderer.send('PIN_APP', newPinState);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'generator-app': GeneratorApp;
  }
}

export default GeneratorApp;
