import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult, svg
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { classMap } from 'lit-html/directives/class-map';
import arrowIcon from '@images/icons/arrow.svg';
import '@components/Input/InputText';
import commonButtonStyles from '@components/Button/button.styles';
import { ColorInputMode } from '@types';

/**
 * Click to generate random color
 */
@customElement('color-input')
class ColorInput extends LitElement {
  static get styles(): CSSResult[] {
    return [
      commonButtonStyles,
      css`
        :host {
          display: block;
        }

        .color-input-group {
          border: 0.0625rem solid var(--color-input-border);
          border-radius: 0.3125rem;
          overflow: hidden;
          display: flex;
        }

        .color-input-group--error {
          border-color: var(--color-input-border-error);
        }

        .color-input-label {
          text-align: center;
          line-height: 1.5rem;
          padding: 0.4375rem;
          background-color:var(--color-input-label-background);
          color: var(--color-input-label-text);
          flex: 1 0 3rem;
        }

        .color-input-text {
          flex: 0 1 auto;
        }

        .color-input-mode {
          flex: 1 0 9px;
          padding: 0.6875rem;
          line-height: 1rem;
        }

        .color-input-mode .icon-button svg {
          display: block;
          height: 1rem;
          width: auto;
          fill: var(--color-input-mode-icon);
          transition: fill 0.1s linear;
        }

        .color-input-mode .icon-button:hover svg {
          fill: var(--color-input-mode-icon-hover);
        }
      `
    ];
  }

  @property() colorInputMode: ColorInputMode = 'hex';

  @property({ type: String }) colorInputValue = '';

  @property() onColorInputChange?: (value: string) => void;

  @property() onColorInputKeypress?: (event: KeyboardEvent) => void;

  @property() onColorInputModeClick?: () => void;

  @property({ type: Boolean }) colorInputHasError = false;

  render(): TemplateResult {
    return html`
      <div
        class="color-input-group"
        class=${classMap({
          'color-input-group': true,
          'color-input-group--error': this.colorInputHasError
        })}
      >
        <div class="color-input-label">
          ${this.colorInputMode === 'hex' ? '#' : 'RGB'}
        </div>
        <div class="color-input-text">
          <input-text
            maxlength="${this.colorInputMode === 'hex' ? 6 : 13}"
            textAlign="center"
            .onInput=${this.onColorInputChange}
            .onKeyPress=${this.onColorInputKeypress}
            .inputValue=${this.colorInputValue}
          >
          </input-text>
        </div>
        <div class="color-input-mode">
          <button
            type="button"
            class="button icon-button"
            @click=${this.onColorInputModeClick}
          >
            ${svg`${unsafeHTML(arrowIcon)}`}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'color-input': ColorInput;
  }
}

export default ColorInput;
