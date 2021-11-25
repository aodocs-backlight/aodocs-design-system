import { CSSResult, css, unsafeCSS } from 'lit';

export enum color {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  WHITE = 'WHITE'
}

export enum textColor {
  SUBTITLE1 = 'SUBTITLE1'
}

const colorMap = {
  [color.PRIMARY]: '--mdc-theme-primary',
  [color.SECONDARY]: '--mdc-theme-secondary',
  [color.WHITE]: '--mdc-theme-white'
};

const textColorMap = {
  [textColor.SUBTITLE1]: '--mdc-typography-subtitle1-color'
};

export const bgcColorMixin = (value: color): CSSResult => {
  const className = `.bgc--${value.toLocaleLowerCase()}`;
  return css`
    ${unsafeCSS(className)} {
      background-color: var(${unsafeCSS(colorMap[value])});
    }
  `;
};

export const textColorMixin = (value: textColor): CSSResult => {
  const className = `.text--${value.toLocaleLowerCase()}`;
  return css`
    ${unsafeCSS(className)} {
      color: var(${unsafeCSS(textColorMap[value])});
    }
  `;
};
