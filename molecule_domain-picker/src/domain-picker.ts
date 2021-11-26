import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../colors';
import '../../molecule_auto-complete';
import { AutoComplete } from '../../molecule_auto-complete';
import { AodocsService } from '../../service_aodocs';

@customElement('aodocs-domain-picker')
export class DomainPicker extends LitElement {
  @property({ type: Boolean })
  private dry = false;

  @property({ type: String })
  token: string;

  @property({ type: Boolean })
  public loading = false;

  @property({ type: Boolean })
  public disabled = false;

  @property({ type: String })
  public apiUrl?: string;

  @property({ type: Array })
  public domains: string[] = [];

  private _autoCompleteEl: AutoComplete;

  public render() {
    return html`
      <aodocs-auto-complete
        .values="${this.domains}"
        ?loading="${this.loading}"
        ?disabled="${this.disabled}"
      ></aodocs-auto-complete>
    `;
  }

  public async firstUpdated(): Promise<void> {
    if (!this.dry) {
      this.disabled = true;
      this.loading = true;
      const service = new AodocsService(this.apiUrl);
      const user = await service.getUser(this.token);
      this.domains = user.availableDomains || [];
      this.disabled = false;
      this.loading = false;
    }

    this._autoCompleteEl = this.shadowRoot.querySelector(
      'aodocs-auto-complete'
    );
    this._autoCompleteEl.addEventListener(
      'autoCompleteValueSelected',
      this._forwardValueSelected
    );
  }

  public async update(changes): Promise<void> {
    super.update(changes);
    if (!this.dry) {
      const service = new AodocsService(this.apiUrl);
      const user = await service.getUser(this.token);
      this._autoCompleteEl.values = user.availableDomains;
    }
  }

  private _forwardValueSelected(event: CustomEvent): void {
    const customEvent = new CustomEvent('domainSelected', {
      detail: event.detail
    });
    this.dispatchEvent(customEvent);
  }
}
