import { css, unsafeCSS } from 'lit';

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

export const borderBoxSizingBorderBox = css`
  .border-box--box-sizing {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

export const zIndexMixin = (value: number) => {
  const className = `.z-index-${value}`;
  return css`
    ${unsafeCSS(className)} {
      z-index: ${value};
    }
  `;
};

export const flex = css`
  .flex {
    display: flex;
  }
`;

export const flexRow = css`
  .flex-row {
    display: flex;
    flex-direction: row;
  }
`;

export const spaceBetween = css`
  .justify-space-between {
    justify-content: space-between;
  }
`;

export const alignCenter = css`
  .align-center {
    align-items: center;
  }
`;
