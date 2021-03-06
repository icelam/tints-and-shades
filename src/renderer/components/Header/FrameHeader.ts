import {
  LitElement, html, property, customElement, css, svg, TemplateResult, CSSResult
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { classMap } from 'lit-html/directives/class-map';
import pinIcon from '@images/icons/pin.svg';
import settingIcon from '@images/icons/setting.svg';
import commonButtonStyles from '@components/Button/button.styles';

/**
 * The frame header.
 */
@customElement('frame-header')
class FrameHeader extends LitElement {
  static get styles(): CSSResult[] {
    return [
      commonButtonStyles,
      css`
        :host {
          -webkit-app-region: drag;
          background-color: var(--color-frame-header-background);
          color: var(--color-frame-header-text);
          padding: 0.6875rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 0.875rem;
        }

        .header-group {
          display: flex;
        }

        .frame-control-button {
          width: 0.875rem;
          height: 0.875rem;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          border-radius: 100%;
          margin: 0 0.5rem 0 0;
        }

        .frame-control-button > span {
          font-family: 'Roboto-Regular', sans-serif;
          line-height: 0.875rem;
          font-size: 0.875rem;
          display: block;
          opacity: 0;
          transition: opacity 0.1s linear;
        }

        .frame-control-button:hover > span {
          opacity: 1;
        }

        .frame-control-button--close {
          background-color: var(--color-frame-control-close);
          color: var(--color-frame-control-close-text);
        }

        .frame-control-button--minimize {
          background-color: var(--color-frame-control-minimize);
          color: var(--color-frame-control-minimize-text);
        }

        .icon-button svg {
          height: 0.875rem;
          width: 0.875rem;
          fill: var(--color-frame-header-icon);
          margin: 0 0 0 0.5rem;
          display: block;
          transition: fill 0.1s linear;
        }

        .icon-button:hover svg {
          fill: var(--color-frame-header-icon-hover);
        }

        .pin-button--active svg {
          transform: rotate(45deg);
        }
      `
    ];
  }

  @property({ type: Boolean }) shouldPinFrame = false;

  @property() closeFrame?: () => void;

  @property() minimizeFrame?: () => void;

  @property() pinFrame?: () => void;

  @property() openSettingMenu?: (event: MouseEvent) => void;

  render(): TemplateResult {
    return html`
      <div class="header-group">
        <button
          type="button"
          class="button frame-control-button frame-control-button--close"
          @click=${this.closeFrame}
        >
          <span>&times;</span>
        </button>
        <button
          type="button"
          class="button frame-control-button frame-control-button--minimize"
          @click=${this.minimizeFrame}
        >
          <span>&minus;</span>
        </button>
      </div>
      <div class="header-group">
        <button
          type="button"
          class=${classMap(
            {
              button: true,
              'icon-button': true,
              'pin-button': true,
              'pin-button--active': this.shouldPinFrame
            }
          )}
          @click=${this.pinFrame}
        >
          ${svg`${unsafeHTML(pinIcon)}`}
        </button>
        <button
          type="button"
          class="button icon-button"
          @click=${this.openSettingMenu}
        >
          ${svg`${unsafeHTML(settingIcon)}`}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'frame-header': FrameHeader;
  }
}

export default FrameHeader;
