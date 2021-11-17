import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../../molecule_auto-complete';
import {AutoComplete} from '../../molecule_auto-complete';
import {AodocsService} from '../../service_aodocs';

@customElement('domain-picker')
export class DomainPicker extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    :host {
      color: blue;
    }
  `;

    private service: AodocsService;

    @property({type: Boolean})
    private dry: boolean = false;

    @property()
    token: string;

    @property()
    apiUrl?: string;

    @property()
    public domains: string[] = [];

    private _autoCompleteEl: AutoComplete;
  
    public firstUpdated(): void {
      this._autoCompleteEl = <AutoComplete>this.shadowRoot.querySelector('aodocs-auto-complete');
      this.shadowRoot.querySelector('aodocs-auto-complete').addEventListener('autoCompleteValueChanged', this._onAutoCompleteChanged.bind(this))
    }

    public async update(changes): Promise<void> {
      super.update(changes);
      if (!this.dry) {
        const service = new AodocsService(this.apiUrl);
        const user = await service.getUser(this.token);
        this._autoCompleteEl.values = user.availableDomains;
      }
    }

    // Render the UI as a function of component state
    public render() {
        return html`<aodocs-auto-complete minChar="5" values="${this.domains}"></aodocs-auto-complete>`;
    }

    private async _onAutoCompleteChanged(event: MouseEvent): Promise<void> {
      if (!this.dry) {
        const service = new AodocsService(this.apiUrl);
        const user = await service.getUser(this.token);
        this._autoCompleteEl.values = user.availableDomains?.filter(domain => domain.includes(event.detail.toString())) ?? undefined;
      } else {
        const n = Math.floor(Math.random() * 10) + 1;
        const values = [];
        for (let i = 0; i <= n; i++) {
          values.push(event.detail + '_' + (Math.random() + 1).toString(36).substring(2))
        }

        // this._autoCompleteEl.values = values;
        this.domains = values;
      }
    } 
}
