import {
  LitElement, html, customElement, property, css, svg
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import LitElementLogo from '@images/litElement.svg';

/**
 * An example element.
 */
@customElement('my-element')
class MyElement extends LitElement {
  static get styles() {
    return css`
      div {
        background: linear-gradient(315deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%),
                    linear-gradient(315deg, #3FC7FF 0%, #00A3E6 100%);
        color: #ffffff;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: calc(0.625rem + 2vmin);
        padding: 5%;
        box-sizing: border-box;
        -webkit-app-region: drag;
      }

      svg {
        width: 40vmin;
        margin: 10vmin 0;
      }

      a {
        color: rgba(0,0,0,.87);
      }
    `;
  }

  /**
   * The source file name.
   */
  @property()
  source = 'src/renderer/components/my-element.ts';

  render() {
    return html`
      <div>
        ${svg`${unsafeHTML(LitElementLogo)}`}
        <p>Edit <code>${this.source}</code> and save to reload.</p>
        <a href="https://lit-element.polymer-project.org/" target="_blank" rel="noopener noreferrer">Learn LitElement</a>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}

export default MyElement;
