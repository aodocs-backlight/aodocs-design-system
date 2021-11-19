import {css, unsafeCSS} from 'lit';

export const absolute = css`
  .absolute {
    position: absolute;
  }
`;

export const fullWidth = css`
  .full-width {
    width: 100%;
  }
`;

export const zIndexMixin = (value: number) => {
    const className = `.z-index-${value}`;
    return css`${unsafeCSS(className)} {
      z-index: ${value};
    }`;
};