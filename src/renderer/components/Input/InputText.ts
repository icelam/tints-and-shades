import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import commonInputStyles from './input.styles';

/**
 * Text input component
 */
@customElement('input-text')
class InputText extends LitElement {
  static get styles(): CSSResult[] {
    return [
      commonInputStyles,
      css`
        :host {
          display: block;
        }
      `
    ];
  }

  @property() onInput?: (value: string) => void;

  @property() onKeyPress?: (event: KeyboardEvent) => void;

  @property({ type: Number }) maxlength?: number;

  @property({ type: String }) autoComplete: 'on' | 'off' = 'off';

  @property({ type: String }) textAlign: 'left' | 'center' | 'right' = 'left';

  @property({ type: String }) inputValue = '';

  render(): TemplateResult {
    return html`
      <input
        type="text"
        maxlength="${ifDefined(this.maxlength)}"
        autocomplete="${this.autoComplete}"
        class=${classMap({
          input: true,
          [`input--align-${this.textAlign}`]: true
        })}
        @input=${(event: Event) => {
          const { value } = event.target as HTMLInputElement;
          this.onInput && this.onInput(value);
        }}
        @keypress=${this.onKeyPress}
        .value=${this.inputValue}
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-text': InputText;
  }
}

export default InputText;
