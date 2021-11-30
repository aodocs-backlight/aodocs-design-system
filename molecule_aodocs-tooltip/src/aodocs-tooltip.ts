import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {elevation1} from '../../style_elevation';
import {paddingsRem} from '../../style_spacing';
import {zIndexMixin} from '../../style_positioning';

@customElement('aodocs-tooltip')
export class AodocsTooltip extends LitElement {
  static styles = [
    zIndexMixin(100),
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
        top: 200%;
        right: 1rem;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .aodocs-tooltip:hover .aodocs-tooltip__content {
        visibility: visible;
        opacity: 1;
      }

      .aodocs-tooltip .aodocs-tooltip__content .arrow {
        width: 60px;
        height: 30px;
        position: absolute;
        bottom: 100%;
        right: 0;
        transform: translateX(-50%);
        overflow: hidden;
      }
      .aodocs-tooltip .aodocs-tooltip__content .arrow:after {
        content: "";
        position: absolute;
        width: 25px;
        height: 25px;
        background: var(--mdc-theme-white);;
        transform: translateX(-50%) translateY(50%) rotate(45deg);
        bottom: 0;
        left: 50%;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
      }

      .aodocs-tooltip:hover .aodocs-tooltip__content .arrow {
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
        <div class="aodocs-tooltip__content elevation-1 pa-1--rem z-index-100" style="min-width: ${this.minWidthTooltip};">
          <div class="arrow"></div>
          <slot name="tooltip"></slot>
        </div>
      </div>
    `;
  }
}
