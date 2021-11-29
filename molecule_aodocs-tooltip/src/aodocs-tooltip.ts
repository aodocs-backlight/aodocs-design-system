import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {elevation1} from '../../style_elevation';
import {paddingsRem} from '../../style_spacing';

@customElement('aodocs-tooltip')
export class AodocsTooltip extends LitElement {
  static styles = [
    paddingsRem,
    elevation1,
    css`
      .aodocs-tooltip {
        position: relative;
        display: inline-block;
      }
      .aodocs-tooltip .aodocs-tooltip__content {
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
        visibility: hidden;
        background-color: var(--mdc-theme-white);
        color: var(--aodocs-theme-text);
        text-align: center;
        border-radius: 6px;
        position: absolute;
        z-index: 1;
        top: 125%;
        right: 1rem;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .aodocs-tooltip .aodocs-tooltip__content::before {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 80%;
        transform: rotate(180deg);
        border-width: 15px;
        border-style: solid;
        border-color: white transparent transparent transparent;
      }

      .aodocs-tooltip:hover .aodocs-tooltip__content {
        visibility: visible;
        opacity: 1;
      }
    `
  ];

  @property({type: Boolean})
  displayed = false;

  @property({type: String})
  minWidth = '2rem';

  @property({type: String})
  minWidthTooltip = '2rem';

  @property({type: String})
  displayText = '';

  public render() {
    return html`
      <div class="aodocs-tooltip">
        <div style="position: relative" style="min-width: ${this.minWidth};"> 
          <slot name="main">${this.displayText}</slot>
        </div>
        <div class="aodocs-tooltip__content elevation-1 pa-1--rem" style="min-width: ${this.minWidthTooltip};">
          <slot name="tooltip"></slot>
        </div>
      </div>
    `;
  }
}
