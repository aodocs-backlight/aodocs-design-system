import { html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AodocsBaseDialog } from '../../atom_dialog';
import '../../atom_button';
import '../../atom_dialog';

@customElement('aodocs-dialog')
export class AodocsDialog extends AodocsBaseDialog {
  static override styles = [ ...AodocsBaseDialog.styles ];

  @property({type: Boolean})
  public open = false;

  @property({type: String})
  public triggerButtonText = 'Click me';

  @property({type: String})
  public heading = 'Click me';

  protected override render() {
    const dialog = super.render();
    return html`
      <slot name="trigger" @click=${this._openDialog}>
        <mwc-button color="primary"  
          unelevated 
          label="${this.triggerButtonText}">
        </mwc-button>
      </slot>
      ${dialog}
    `;
  }

  private _openDialog(): void {
    this.open = true;
  }

  private _closeDialog(): void {
    this.open = false;
  }
}
