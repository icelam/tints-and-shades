import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult, svg
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import copyIcon from '@images/icons/copy.svg';
import commonButtonStyles from '@components/Button/button.styles';
import commonTooltipStyles from '@components/Tooltip/tooltip.styles';
import { generateTintsOrShades, removeHashFromHexColor } from '@utils/color';
import { TintsOrShadesMode, CopyFormat, ColorInputMode } from '@types';

/**
 * Click to generate random color
 */
@customElement('color-steps')
class ColorSteps extends LitElement {
  static get styles(): CSSResult[] {
    return [
      commonButtonStyles,
      commonTooltipStyles,
      css`
      :host {
        display: flex;
        height: 2.125em;
        border-radius: 0.25em;
        box-sizing: border-box;
      }

      .color-steps__step {
        flex: 1 0 auto;
        border-color: var(--color-color-steps-border);
        border-style: solid;
        border-width: 1px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .color-steps__step:first-child {
        border-top-left-radius: 0.25em;
        border-bottom-left-radius: 0.25em;
        border-width: 1px 0 1px 1px;
      }

      .color-steps__step:last-child {
        border-top-right-radius: 0.25em;
        border-bottom-right-radius: 0.25em;
        border-width: 1px 1px 1px 0;
      }

      .color-steps__step .copy-button {
        box-shadow: 0 1px 2px var(--color-copy-button-shadow);
        background-color: var(--color-copy-button-background);
        color: var(--color-copy-button-text);
        height: 1.25rem;
        width: 1.25rem;
        border-radius: 0.125rem;
        padding: 0.25rem;
        line-height: 0.75rem;
        opacity: 0;
        transition: opacity 0.1s linear;
      }

      .color-steps__step:hover .copy-button {
        opacity: 1;
      }

      .color-steps__step .copy-button > svg {
        fill: var(--color-copy-button-text);
        height: 0.75rem;
        width: auto;
        transition: opacity 0.1s linear;
      }

      .color-steps__step:hover .copy-button:active > svg {
        fill: var(--color-copy-button-text-active);
      }
    `
    ];
  }

  @property() copyFormat: CopyFormat = 'hex';

  @property() colorInputMode: ColorInputMode = 'hex';

  @property() mode: TintsOrShadesMode = 'tints';

  @property({ type: String }) selectedColor = '';

  @property() copyColorToClipboard?: (event: MouseEvent) => void;

  render(): TemplateResult {
    const colorSteps = generateTintsOrShades(this.selectedColor, this.mode);
    const parsedCopyformat = this.copyFormat === 'input' ? this.colorInputMode : this.copyFormat;
    const copyDataKey = parsedCopyformat === 'rgb' ? 'rgbString' : 'hex';
    return html`
      ${colorSteps.map((color) => html`
        <div
          class="color-steps__step"
          style=${styleMap({
            'background-color': color.hex
          })}
          data-tooltip="${removeHashFromHexColor(color.hex)}"
        >
          <button
            class="button copy-button"
            @click=${this.copyColorToClipboard}
            value="${removeHashFromHexColor(color[copyDataKey])}"
          >
            ${svg`${unsafeHTML(copyIcon)}`}
          </button>
        </div>
      `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'color-steps': ColorSteps;
  }
}

export default ColorSteps;
