import { css } from 'lit-element';

/**
 * Shared styles for input elements
 */
const commonInputStyles = css`
  .input {
    background-color: var(--color-input-background);
    border-radius: 0;
    border: none;
    padding: 0.4375rem;
    font-family: inherit;
    font-size: 1em;
    line-height: 1.5em;
    color: var(--color-input-text);
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  .input:read-only {
    background-color: var(--color-input-background);
    border: none;
    color: var(--color-input-text);
    /* cursor: pointer; */
  }

  /* Placeholder */
  .input::placeholder {
    color: var(--color-input-placeholder);
  }

  .input::-webkit-input-placeholder {
    color: var(--color-input-placeholder);
  }

  .input::-moz-placeholder {
    color: var(--color-input-placeholder);
  }

  .input:-moz-placeholder {
    color: var(--color-input-placeholder);
  }

  .input:-ms-input-placeholder {
    color: var(--color-input-placeholder);
  }

  .input::-ms-input-placeholder {
    color: var(--color-input-placeholder);
  }

  /* Auto complete styles */
  .input:-webkit-autofill,
  .input:-webkit-autofill:hover,
  .input:-webkit-autofill:focus,
  .input:-webkit-autofill:active  {
    background-clip: content-box !important;
    -webkit-box-shadow: 0 0 0 50px var(--color-input-background) inset !important;
    -webkit-text-fill-color: var(--color-input-text) !important;
  }

  .input--align-left {
    text-align: left;
  }

  .input--align-center {
    text-align: center;
  }

  .input--align-right {
    text-align: right;
  }
`;

export default commonInputStyles;
