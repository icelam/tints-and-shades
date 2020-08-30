import { css } from 'lit-element';

/**
 * Shared styles for tooltips
 */
const commonTooltipStyles = css`
  [data-tooltip] {
    position: relative;
  }

  [data-tooltip]::after {
    font-family: 'Source Code Pro', monospace, sans-serif;
    display: flex;
    justify-content: center;
    background: var(--color-tooltip-background);
    border-radius: 0.125rem;
    color: var(--color-tooltip-text);
    content: attr(data-tooltip);
    margin: -1.25rem 0 0 -1.5625rem;
    font-size: 0.75rem;
    line-height: 1rem;
    width: 3.125rem;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 0;
  }

  [data-tooltip]::before {
    border: solid;
    border-color: var(--color-tooltip-background) transparent;
    border-width: 0.25rem 0.1875rem 0 0.1875rem;
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    margin: -0.25rem 0 0 -0.1875rem;
  }

  [data-tooltip]::before,
  [data-tooltip]::after {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s linear;
  }

  [data-tooltip]:hover::before,
  [data-tooltip]:hover::after {
    opacity: 1;
  }
`;

export default commonTooltipStyles;
