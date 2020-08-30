import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult, svg
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import randomIcon from '@images/icons/random.svg';
import commonButtonStyles from '@components/Button/button.styles';

/**
 * Click to generate random color
 */
@customElement('color-randomize')
class ColorRandomize extends LitElement {
  static get styles(): CSSResult[] {
    return [
      commonButtonStyles,
      css`
        :host {
          display: block;
        }

        .icon-button svg {
          height: 1.25rem;
          width: 1.25rem;
          fill: var(--color-body-icon);
          display: block;
          transition: fill 0.1s linear;
        }

        .icon-button:hover svg {
          fill: var(--color-body-icon-hover);
        }
      `
    ];
  }

  @property() onRandomizeColor?: (event: Event) => void;

  render(): TemplateResult {
    return html`
      <button
        type="button"
        class="button icon-button"
        @click=${this.onRandomizeColor}
      >
        ${svg`${unsafeHTML(randomIcon)}`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'color-randomize': ColorRandomize;
  }
}

export default ColorRandomize;
