import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult
} from 'lit-element';
import '@components/Header/FrameHeader';
import '@pages/TintsShadesGenerator';
import { randomHexColor } from '@utils/color';

/**
 * Enrty point of the app
 */
@customElement('generator-app')
class GeneratorApp extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        background-color: var(--color-background);
        height: 100%;
      }
    `;
  }

  /**
   * Whether the current frame is set to always on top or not.
   */
  @property({
    type: Boolean,
    converter(value) {
      // HTML attributes was use to set the status storage in storage
      // and it only accepts string value, boolean convertion is done here
      return typeof value === 'boolean'
        ? value
        : value === 'true';
    }
  })
  shouldPinFrame = false;

  /**
   * Current selectedColor from user
   */
  // TODO: Save and restore selected color from storage
  @property({ type: String }) selectedColor = '#46beb9';

  render(): TemplateResult {
    return html`
      <frame-header
        .closeFrame=${this.closeFrame}
        .minimizeFrame=${this.minimizeFrame}
        .pinFrame=${this.pinFrame.bind(this)}
        .shouldPinFrame=${this.shouldPinFrame}
        .openSettingMenu=${this.openSettingMenu}
      >
      </frame-header>
      <tints-shades-generator
        .selectedColor=${this.selectedColor}
        .onColorPickerChange=${this.onColorPickerChange.bind(this)}
        .onRandomizeColor=${this.onRandomizeColor.bind(this)}
      >
      </tints-shades-generator>
    `;
  }

  private closeFrame(): void {
    window.ipcRenderer.send('QUIT_APP');
  }

  private openSettingMenu(event: MouseEvent): void {
    window.ipcRenderer.send('OPEN_SETTING_MENU', {
      x: event.clientX + 10,
      y: event.clientY + 10
    });
  }

  private minimizeFrame(): void {
    window.ipcRenderer.send('MINIMIZE_APP');
  }

  private pinFrame(): void {
    const newPinState = !this.shouldPinFrame;
    this.shouldPinFrame = newPinState;
    window.ipcRenderer.send('PIN_APP', newPinState);
  }

  private onColorPickerChange(event): void {
    this.selectedColor = event.target.value;
  }

  private onRandomizeColor(): void {
    this.selectedColor = `#${randomHexColor()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'generator-app': GeneratorApp;
  }
}

export default GeneratorApp;
