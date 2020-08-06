import { ipcRenderer } from 'electron';
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
          display: block;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 0.875rem;
        }

        .header-group {
          display: flex;
        }

        .frame-control-button {
          width: 0.75rem;
          height: 0.75rem;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          border-radius: 100%;
          margin: 0 0.5rem 0 0;
        }

        .frame-control-button > span {
          font-family: 'Roboto-Regular', sans-serif;
          line-height: 0.75rem;
          font-size: 0.75rem;
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

  /**
   * Whether the current frame set to always on top or not.
   */
  @property({ type: Boolean })
  shouldPinFrame = false;

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
      <div type="button" class="header-group">
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
        <button type="button" class="button icon-button">
          ${svg`${unsafeHTML(settingIcon)}`}
        </button>
      </div>
    `;
  }

  private closeFrame() {
    ipcRenderer.send('QUIT_APP');
  }

  private minimizeFrame() {
    ipcRenderer.send('MINIMIZE_APP');
  }

  private pinFrame() {
    const newPinState = !this.shouldPinFrame;
    this.shouldPinFrame = newPinState;
    ipcRenderer.send('PIN_APP', newPinState);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'frame-header': FrameHeader;
  }
}

export default FrameHeader;
