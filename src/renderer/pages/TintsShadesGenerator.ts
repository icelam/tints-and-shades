import {
  LitElement, html, css, CSSResult, customElement, TemplateResult, property
} from 'lit-element';
import '@components/Colors/ColorPicker';
import '@components/Colors/ColorInput';
import '@components/Colors/ColorRandomize';
import '@components/Colors/ColorSteps';
import { ColorInputMode, CopyFormat } from '@types';

/**
 * Wrapper of tints and shades generation UI
 */
@customElement('tints-shades-generator')
class TintsShadesGenerator extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        padding: 0.6875rem;
      }

      .color-input-set {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }

      .color-input-set color-picker {
        flex: 1 0 20%;
      }

      .color-input-set color-input {
        flex: 0 1 auto;
        padding: 0 0.6875rem;
      }

      .color-input-set color-randomize {
        flex: 1 0 20px;
      }

      color-steps {
        margin-top: 0.5rem;
      }
    `;
  }

  @property() copyFormat: CopyFormat = 'hex';

  @property({ type: String }) selectedColor = '';

  @property({ type: String }) colorInputValue = '';

  @property() onColorPickerChange?: (event: Event) => void;

  @property() onRandomizeColor?: (event: Event) => void;

  @property() copyColorToClipboard?: (event: MouseEvent) => void;

  @property() colorInputMode: ColorInputMode = 'hex';

  @property() onColorInputChange?: (value: string) => void;

  @property() onColorInputModeClick?: () => void;

  @property() onColorInputKeypress?: (event: KeyboardEvent) => void;

  @property({ type: Boolean }) colorInputHasError = false;

  render(): TemplateResult {
    return html`
      <div class="color-input-set">
        <color-picker
          .selectedColor=${this.selectedColor}
          .onColorPickerChange=${this.onColorPickerChange}
        >
        </color-picker>
        <color-input
          .colorInputValue=${this.colorInputValue}
          .colorInputMode=${this.colorInputMode}
          .onColorInputChange=${this.onColorInputChange}
          .onColorInputModeClick=${this.onColorInputModeClick}
          .onColorInputKeypress=${this.onColorInputKeypress}
          .colorInputHasError=${this.colorInputHasError}
        >
        </color-input>
        <color-randomize
          .onRandomizeColor=${this.onRandomizeColor}
        >
        </color-randomize>
      </div>
      <color-steps
        .copyFormat=${this.copyFormat}
        .colorInputMode=${this.colorInputMode}
        .selectedColor=${this.selectedColor}
        .copyColorToClipboard=${this.copyColorToClipboard}
        mode="shades"
      >
      </color-steps>
      <color-steps
        .copyFormat=${this.copyFormat}
        .colorInputMode=${this.colorInputMode}
        .selectedColor=${this.selectedColor}
        .copyColorToClipboard=${this.copyColorToClipboard}
        mode="tints"
      >
      </color-steps>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tints-shades-generator': TintsShadesGenerator;
  }
}

export default TintsShadesGenerator;
