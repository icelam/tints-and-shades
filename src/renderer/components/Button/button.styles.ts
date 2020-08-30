import { css } from 'lit-element';

/**
 * Shared styles for buttons
 */
const commonButtonStyles = css`
  .button {
    -webkit-app-region: no-drag;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    border: 0;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-appearance:none;
    appearance: none;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    display: inline;
    text-decoration: none;
    margin: 0;
    padding: 0;
    text-align: center;
    vertical-align: top;
  }

  /* Remove 3D button press effect in IE11 */
  .button:focus * {
    position: relative;
    top: 0px;
    left: 0px;
  }

  /* Prevent event firing from child svg */
  .button > svg {
    pointer-events: none;
  }
`;

export default commonButtonStyles;
