import {
  LitElement, html, css, CSSResult, customElement, TemplateResult, property
} from 'lit-element';
import '@components/Colors/ColorPicker';
import '@components/Colors/ColorRandomize';

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
      }

      .color-input-set .color-picker {
        flex: 0 1 20%;
      }

      .color-input-set .color-input {
        flex: 1 0 auto;
        padding: 0 0.6875rem;
      }

      .color-input-set .color-randomize {
        flex: 0 1 20px;
      }
    `;
  }

  @property({ type: String }) selectedColor = '';

  @property() onColorPickerChange?: (event: Event) => void;

  @property() onRandomizeColor?: (event: Event) => void;

  render(): TemplateResult {
    return html`
      <div class="color-input-set">
        <color-picker class="color-picker"
          .selectedColor=${this.selectedColor}
          .onColorPickerChange=${this.onColorPickerChange}
        >
        </color-picker>
        <div class="color-input"></div>
        <color-randomize
          class="color-randomize"
          .onRandomizeColor=${this.onRandomizeColor}
        >
        </color-randomize>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tints-shades-generator': TintsShadesGenerator;
  }
}

export default TintsShadesGenerator;
