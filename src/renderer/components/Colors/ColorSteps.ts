import {
  LitElement, html, css, CSSResult, property, customElement, TemplateResult
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import commonTooltipStyles from '@components/Tooltip/tooltip.styles';
import { generateTintsOrShades } from '@utils/color';
import { TintsOrShadesMode } from '@types';

/**
 * Click to generate random color
 */
@customElement('color-steps')
class ColorSteps extends LitElement {
  static get styles(): CSSResult[] {
    return [
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
    `
    ];
  }

  @property({ type: String }) mode: TintsOrShadesMode = 'tints';

  @property({ type: String }) selectedColor = '';

  render(): TemplateResult {
    const colorSteps = generateTintsOrShades(this.selectedColor, this.mode);
    // TODO: Copy color to clipbpard, allow select copy mode
    return html`
      ${colorSteps.map((color) => html`
        <div
          class="color-steps__step"
          style=${styleMap({
            'background-color': color.hex
          })}
          data-tooltip="${color.hex.replace('#', '')}"
        ></div>
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
