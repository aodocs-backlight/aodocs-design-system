import {css, unsafeCSS, CSSResult} from 'lit';

export enum color {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  WHITE = 'WHITE'
}

const colorMap = {
    [color.PRIMARY]: '--mdc-theme-primary',
    [color.SECONDARY]: '--mdc-theme-secondary',
    [color.WHITE]: '--mdc-theme-white',
}

export const bgcColorMixin = (value: color): CSSResult => {
    const className = `.bgc--${value.toLocaleLowerCase()}`;
    return css`${unsafeCSS(className)} {
      background-color: var(${unsafeCSS(colorMap[value])});
    }`;
}