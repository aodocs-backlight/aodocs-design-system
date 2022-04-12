import { LitElement, TemplateResult, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atom_icon';
import '../../colors';
import { CopyToClipboardEvent } from './copy-to-clipboard-event';
import { marginsRem } from '../../style_spacing';
import { flexRow } from '../../style_positioning';
import '../../typography';

@customElement('aodocs-copy-to-clipboard')
export class CopyToClipboard extends LitElement {
  static styles = [
    css`
    :host {
      --aodocs-copy-to-clipboard-text-color: rgba(0, 0, 0, 0.54);
      --aodocs-copy-to-clipboard-icon-color: rgba(0, 0, 0, 0.54);
    }
    

    .aodocs-copy-to-clipboard:hover {
      cursor: pointer;
    }

    .aodocs-copy-to-clipboard:hover .aodocs-copy-to-clipboard__icon--display {
      opacity: 1;
    }
    .aodocs-copy-to-clipboard__text {
      color: var(--aodocs-copy-to-clipboard-text-color, rgba(0, 0, 0, 0.54));
    }
    .aodocs-copy-to-clipboard__icon {
      color: var(--aodocs-copy-to-clipboard-icon-color, rgba(0, 0, 0, 0.54));
      font-size: 1.2rem;
    }
    .aodocs-copy-to-clipboard__icon--display {
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
    `,
    flexRow,
    marginsRem
  ];

  @property({ type: String })
  public text = undefined;

  @property({ type: String })
  public value = undefined;

  protected override render(): TemplateResult {
    if (this._hasNoDisplayTextSet()) {
      this._warnUserForMandatoryField();
      return this._renderEmpty();
    }
    return this._render();
  }

  private _warnUserForMandatoryField(): void {
    console.error('Input `text` is not set but mandatory to use this component');
  }

  private _hasNoDisplayTextSet(): boolean {
    return !this.text;
  }

  private _renderEmpty(): TemplateResult {
    return html``;
  }

  private _render(): TemplateResult {
    return html`
      <div class="flex-row mx-05--rem aodocs-copy-to-clipboard" @click=${this.copyToClipboardAndEmit}>
      <span class="mr-05--rem aodocs-copy-to-clipboard__text">${this.text}</span>
      <span class="aodocs-copy-to-clipboard__icon--display">
        <slot name="icon">
          <mwc-icon class="aodocs-copy-to-clipboard__icon">content_copy</mwc-icon>
        </slot>
      </span>
    </div>
    `;
  }

  public copyToClipboardAndEmit(): void {
    const valueToCopy = this.value ?? this.text;
    const event = new CopyToClipboardEvent(valueToCopy);
    navigator.clipboard.writeText(valueToCopy);
    this.dispatchEvent(event);
  } 
}
