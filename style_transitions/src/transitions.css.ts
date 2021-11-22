import {css} from 'lit';

export const smoothWidthTransition = css`
    .smooth-width-transition {
      -webkit-transition: width 0.6s ease-in-out;
      -moz-transition: width 0.6s ease-in-out;
      -o-transition: width 0.6s ease-in-out;
      transition: width 0.6s ease-in-out;
    }
  `