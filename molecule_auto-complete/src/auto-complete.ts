import {LitElement, css, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@aodocs/textfield';
import '@aodocs/linear-progress';
import '@aodocs/list';
import '@material/mwc-elevation-overlay/mwc-elevation-overlay.css';
import '@aodocs/menu';
import {Nested} from '../../model_nested';

@customElement('aodocs-auto-complete')
export class AutoComplete extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    :host {
      color: blue;
    }
    .elevation {
      box-shadow:  2px 4px 7px -3px #ccc;
    }

    .full-width {
      width: 100%;
    }
    `;

    @property({type: Array})
    public values = [];

    @property({type: Boolean})
    private returnObject = false;

    @property({type: String})
    private key = 'id';

    @property({type: Number})
    private minChar = 3;

    @property({type: String})
    private displayName;

    @property({type: Boolean})
    private displayList = false;

    @property({type: String})
    value = null;

    @property({type: String})
    private helperText = '';

    @property()
    private items: TemplateResult = html``;

    private y = 0;
    private loading = false;

    constructor() {
      super();
      this.addEventListener('click', (event: Event) => {  
        // Prevent to close the values list when clicking on the component
        event.stopImmediatePropagation();
      });
      window.addEventListener('click', (event: Event) => {  
        this._hideListOnClickIfNeeded(<Element>event.target);
      });
    }

    // Render the UI as a function of component state
    public render() {
        return html`
              <mwc-textfield
                required="${true}"
                helper="${this.helperText}"
                class="full-width"
                id="textfield"
                label="Standard"
                @input=${this.onValueChanged}
                @click=${this.displayListIfNotEmpty}
                >
              </mwc-textfield>
              ${this.dislayLoader()}
              ${this._displayAutoCompleteList()}`;
    }

    public updated(): void {
      this._applyCustomLoaderStyle();
    }

    public dislayLoader(): TemplateResult {
      if (this.loading) {
        return html`<mwc-linear-progress class="full-width" indeterminate></mwc-linear-progress>`;
      }

      return html``;
    }

    public displayListIfNotEmpty(): void {
      if (this.values?.length > 0) {
        this.displayList = true;
      }
    }

    private _applyCustomLoaderStyle(): void {
      const progress = this.shadowRoot.querySelector('mwc-linear-progress');
      if (!!progress) {
        const style = document.createElement( 'style' );
        style.innerHTML = '.mdc-linear-progress { height: 0.5px !important; }';
        progress.shadowRoot.appendChild( style );
      }
    }

    private async onValueChanged(event: any): Promise<void> {
      if (!!this.minChar && event.target.value.length < this.minChar) {
        this.values = [];
        this.displayList = false;
        this.helperText = this.minChar > 0 ? `At least ${this.minChar} characters` : undefined;
      } else {
        this.loading = true;
        this.helperText = undefined;
        const customEvent = new CustomEvent('autoCompleteValueChanged', {
            detail: event.target.value
        });
        this.dispatchEvent(customEvent);
        this.displayList = true;
      }
    }


    private _displayAutoCompleteList(): TemplateResult {
      this.loading = false;
      if (!this.displayList || !this.values) {
        return html``;
      }
      return html`
        <mwc-list activatable id="activatable" class="elevation" @click>
          ${this._listItems(this.values)}
        </mwc-list>
      `;
    }

    private _listItems(items: string[] | Nested[]): TemplateResult[] {
      if (!items || items.length <= 0) {
        html`No value found`;
      } else if (this.returnObject) {
        this._checkReturnObjectRequirements();
        return this._objectListItems(<Nested[]>items);
      }
      return this._stringListItems(<string[]>items);
    }

    private _stringListItems(items: string[]): TemplateResult[] {
      return items.map(item => html`<mwc-list-item value="${item}">${item}</mwc-list-item>`);
    }

    private _objectListItems(items: Nested[]): TemplateResult[] {
      return items.map(item => html`<mwc-list-item value="${item[this.key]}">${item[this.displayName]}</mwc-list-item>`);
    }

    private _checkReturnObjectRequirements() {
      if (!this.displayName) {
        throw new Error(`In order to use the aodocs-autocomplete, you need to provide the display name object key`)
      }
    }

    private _hideListOnClickIfNeeded(element: Element): void {
        this.displayList = false;
    }
}
