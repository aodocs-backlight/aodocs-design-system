import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atom_button';
import { Dialog } from '@material/mwc-dialog';
import {spaceBetween, flex, alignCenter} from '../../style_positioning';
import '../../atom-icon-button';
import { textColorMixin, textColor } from '../../style_colors';
import { paddingsPx } from '../../style_spacing';
import {borderBoxSizingBorderBox} from '../../style_positioning';

@customElement('aodocs-base-dialog')
export class AodocsBaseDialog extends Dialog {
  static override styles = [
    ...Dialog.styles,
    ...paddingsPx,
    spaceBetween,
    flex,
    alignCenter,
    textColorMixin(textColor.WHITE),
    borderBoxSizingBorderBox,
    css`
      .mdc-dialog .aodocs-dialog__container {
        background-color: var(--mdc-theme-primary);
      }
      .mdc-dialog .aodocs-dialog__title {
        color: var(--mdc-theme-white);
      }
    `
  ];

  @property({type: Boolean})
  private removeContentPadding = false;

  protected getInitialFocusEl(): HTMLElement|null {
    const initialFocusEl = super.getInitialFocusEl();
    const contentSlot = this.contentSlot as HTMLSlotElement;
    contentSlot.classList.add('border-box--box-sizing');
    console.log('contentSlot.classList: ', contentSlot)
    console.log('initialFocusEl: ', initialFocusEl)
    return initialFocusEl;
  }

  protected render() {
    const styles = [];
    if (this.removeContentPadding) {
      styles.push(css`
      .mdc-dialog .mdc-dialog__content {
        padding: 0 !important;
      }
    `)
    }
    const dialog = super.render();
    return html`
    <style>${styles}</style>
    ${dialog}
    `;
  }

  protected renderHeading() {
    return html`
      <div class="align-center flex  pr-5--px justify-space-between aodocs-dialog__container">
        <h2 id="title" class="mdc-dialog__title aodocs-dialog__title">
          ${this.heading}
        </h2>
        <mwc-icon-button icon="close" 
          class="text--white" 
          @click=${this.close}>
        </mwc-icon-button>
      </div>
    `;
  }
}
