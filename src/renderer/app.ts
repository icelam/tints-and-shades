import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult
} from 'lit-element';
import '@components/Header/FrameHeader';
import '@pages/TintsShadesGenerator';
import {
  randomHexColor,
  isValidHexColor,
  isValidRgbColor,
  convertColorRgbToHex,
  convertColorHexToRgbString,
  removeHashFromHexColor
} from '@utils/color';
import debounce from '@utils/debounce';
import { ColorInputMode, CopyFormat } from '@types';

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
   * Current copy format defined by user setting
   */
  @property() copyFormat: CopyFormat = 'input';

  /**
   * Current color selected by user
   */
  @property({ type: String }) selectedColor = '#46beb9';

  /**
  * Current color value input by user
  */
  @property({ type: String }) colorInputValue = '46beb9';

  /**
   * Current input mode of color input text box
   */
  @property() colorInputMode: ColorInputMode = 'hex';

  /**
   * Indicates if value of color input text box has error
   */
  @property({ type: Boolean }) colorInputHasError = false;

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
        .copyFormat=${this.copyFormat}
        .selectedColor=${this.selectedColor}
        .colorInputValue=${this.colorInputValue}
        .onColorPickerChange=${this.onColorPickerChange.bind(this)}
        .onRandomizeColor=${this.onRandomizeColor.bind(this)}
        .copyColorToClipboard=${this.copyColorToClipboard}
        .colorInputMode=${this.colorInputMode}
        .onColorInputChange=${debounce(this.onColorInputChange.bind(this), 500)}
        .onColorInputModeClick=${this.onColorInputModeClick.bind(this)}
        .onColorInputKeypress=${this.onColorInputKeypress.bind(this)}
        .colorInputHasError=${this.colorInputHasError}
      >
      </tints-shades-generator>
    `;
  }

  /**
   * Pass signal to main process to close application window
   */
  private closeFrame(): void {
    window.ipcRenderer.send('QUIT_APP');
  }

  /**
   * Pass signal to main process to open setting menu
   */
  private openSettingMenu(event: MouseEvent): void {
    window.ipcRenderer.send('OPEN_SETTING_MENU', {
      x: event.clientX + 10,
      y: event.clientY + 10
    });
  }

  /**
   * Pass signal to main process to minimize application window
   */
  private minimizeFrame(): void {
    window.ipcRenderer.send('MINIMIZE_APP');
  }

  /**
   * Pass signal to main process to set application window on top
   */
  private pinFrame(): void {
    const newPinState = !this.shouldPinFrame;
    this.shouldPinFrame = newPinState;
    window.ipcRenderer.send('PIN_APP', newPinState);
  }

  /**
   * Common color update code share between random color function and color picker chage
   */

  private setNewColor(color: string): void {
    this.selectedColor = color;

    // Format input value according to input mode
    let inputValue = '';
    if (this.colorInputMode === 'rgb') {
      inputValue = convertColorHexToRgbString(color);
    } else {
      inputValue = removeHashFromHexColor(color);
    }
    this.colorInputValue = inputValue;

    window.ipcRenderer.send('SAVE_SELECTED_COLOR', color);
  }

  /**
   * Handle change of colour through color picker
   */
  private onColorPickerChange(event: Event): void {
    const newColor = (event.target as HTMLInputElement).value;
    this.setNewColor(newColor);
  }

  /**
   * Generate a random color
   */
  private onRandomizeColor(): void {
    const newColor = randomHexColor() ?? this.selectedColor;
    this.setNewColor(newColor);
  }

  /**
   * Pass signal to main process to copy specified color to clipboard
   */
  private copyColorToClipboard(event: MouseEvent): void {
    const colorToCopy = (event?.target as HTMLButtonElement)?.value;
    if (colorToCopy) {
      window.ipcRenderer.send('COPY_COLOR_TO_CLIPBOARD', colorToCopy);
    }
  }

  /**
   * Handle change of colour through input box
   */
  private onColorInputChange(value: string): void {
    const isCurrentlyInHexMode = this.colorInputMode === 'hex';
    const isColorValid = isCurrentlyInHexMode
      ? isValidHexColor
      : isValidRgbColor;

    const inputHasError = !isColorValid(value);
    this.colorInputHasError = inputHasError;
    this.colorInputValue = value;

    if (!inputHasError) {
      const newHexColorValue = isCurrentlyInHexMode
        ? `#${value}`
        : convertColorRgbToHex(value) as string;
      this.selectedColor = newHexColorValue;

      window.ipcRenderer.send('SAVE_SELECTED_COLOR', newHexColorValue);
    }
  }

  /**
   * Change input mode from hex to rgb, or rgb to hex and apply formatting to input value
   * Input mode will be saved to storage and restore t next app launch
   */
  private onColorInputModeClick(): void {
    const isCurrentlyInHexMode = this.colorInputMode === 'hex';
    const newColorInputMode = isCurrentlyInHexMode ? 'rgb' : 'hex';
    this.colorInputMode = newColorInputMode;

    // Convert input value to desired format
    const isColorValid = isCurrentlyInHexMode
      ? isValidHexColor
      : isValidRgbColor;

    if (!isColorValid(this.colorInputValue)) {
      this.colorInputValue = '';
    } else if (isCurrentlyInHexMode) {
      this.colorInputValue = convertColorHexToRgbString(this.colorInputValue);
    } else {
      const hexValue = convertColorRgbToHex(this.colorInputValue) as string;
      this.colorInputValue = removeHashFromHexColor(hexValue);
    }

    window.ipcRenderer.send('SAVE_COLOR_INPUT_MODE', newColorInputMode);
  }

  /**
   * Prevent input of unwanted characters to color input field
   */
  private onColorInputKeypress(event: KeyboardEvent): void {
    const ALLOWED_CHARS = this.colorInputMode === 'hex'
      ? /[0-9A-Fa-f]+/
      : /[0-9, ]+/;
    if (!ALLOWED_CHARS.test(event.key)) {
      event.preventDefault();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'generator-app': GeneratorApp;
  }
}

export default GeneratorApp;
