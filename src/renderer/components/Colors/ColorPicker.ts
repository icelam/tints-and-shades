import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

/**
 * Opens a color picker interface
 */
@customElement('color-picker')
class ColorPicker extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }

      label {
        border: 1px solid var(--color-input-border);
        border-radius: 0.3125rem;
        height: 2.5rem;
        display: block;
        box-sizing: border-box;
        cursor: pointer;
      }

      input[type="color"] {
        opacity: 0;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
        border: none;
        outline: none;
      }
    `;
  }

  @property({ type: String }) selectedColor = '';

  @property() onColorPickerChange?: (event: Event) => void;

  render(): TemplateResult {
    return html`
      <label style=${styleMap({ backgroundColor: this.selectedColor })}>
        <input
          type="color"
          tabindex="-1"
          .value=${this.selectedColor}
          @change=${this.onColorPickerChange}
        >
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'color-picker': ColorPicker;
  }
}

export default ColorPicker;
