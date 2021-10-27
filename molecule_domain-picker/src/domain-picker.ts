import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@aodocs/select';
import {AodocsService} from 'service_aodocs';

@customElement('domain-picker')
export class DomainPicker extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    :host {
      color: blue;
    }
  `;

    private domains: string[];
    private service: AodocsService;

    @property()
    token: string;

    @property()
    apiUrl?: string;
  
    public async connectedCallback(): Promise<void> {
      super.connectedCallback();
      const service = new AodocsService(this.apiUrl);
      this.domains = await service.list('user/v1/me', this.token);
      console.log('DOMAINS: ', this.domains);
    }

    // Render the UI as a function of component state
    public render() {
        return html`<mwc-select label="Domains">
            <mwc-list-item></mwc-list-item>
            ${this._renderOptions()}
        </mwc-select>`;
    }

    private _renderOptions(): any[] {
      return this.domains?.map((domain, i) => html`<mwc-list-item value="${i}">${domain}</mwc-list-item>`) ?? [];
    } 
}
