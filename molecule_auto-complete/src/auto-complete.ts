import {LitElement, css, html, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '../../textfield';
import '../../atom_linear-progress';
import '../../list';
import '../../menu';
import {Nested} from '../../model_nested';
import '../../colors';
import {absolute, zIndexMixin, fullWidth} from '../../style_positioning';
import {color, bgcColorMixin} from '../../style_colors';

@customElement('aodocs-auto-complete')
export class AutoComplete extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = [css`
    :host {
      color: var(--mdc-theme-primary);
    }
    .elevation {
      box-shadow:  2px 4px 7px -3px #ccc;
    }

    {...colors}
    `, absolute, zIndexMixin(1000), bgcColorMixin(color.WHITE), fullWidth];

    private readonly DEBOUNCE_TIME: number = 1;
    private readonly DEBOUNCE_TIME_CONVERTER_MS: number = 1000;

    @property({type: Boolean})
    public loading: boolean = false;

    @property({type: Boolean})
    public disabled: boolean = false;

    @property({type: String})
    public noData = 'No data available';

    /** Debounce time in second */
    @property({type: Number})
    public debounce = this.DEBOUNCE_TIME;

    @property({type: Number})
    public minChar = null;

    @property({type: String})
    public label = "Auto Complete Field";

    @property({type: String})
    public displayName: string;

    @property({type: String})
    public placeholder = "Start typing";

    @property({type: Boolean})
    public returnObject = false;

    @property({type: String})
    public key = 'id';

    @property({type: Boolean})
    public displayList = false;

    @property({type: Array})
    public values: string[] | Nested[] | null = null;

    @property({type: String})
    public value = undefined;

    @property({type: String})
    public helperText = '';

    @state()
    private _hideItems: boolean = true;

    @state()
    private _search: string = undefined;

    private timer: number = undefined;

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
            <div style="position: relative">
              <mwc-textfield
                helper="${this.helperText}"
                class="full-width"
                id="textfield"
                label="${this.label}"
                ?disabled="${this.disabled}"
                placeholder="${this.placeholder}"
                value="${this.value}"
                @input=${this._onValueChanged}
                @click=${this._displayListIfNotNullOnClick}
                >
              </mwc-textfield>
              ${this.dislayLoader()}
              ${this._displayAutoCompleteList()}
            </div>
            `;
    }

    public displayListIfNotNull(): void {
      if(!!this.values && this._minLengthReached) {
        this.displayList = true;
      }
    }

    public updated(): void {
      this._applyCustomLoaderStyle();
    }

    public dislayLoader(): TemplateResult {
      if (this.loading && this._minLengthReached) {
        return html`<mwc-linear-progress class="full-width" indeterminate></mwc-linear-progress>`;
      }

      return html``;
    }

    private _displayListIfNotNullOnClick(event: PointerEvent): void {
      if (!this.disabled) {
        this._hideItems = false;
        this.displayListIfNotNull();
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

    private async _onValueChanged(event: any): Promise<void> {
      clearTimeout(this.timer);
      this._search = event.target.value;
      if (!this._minLengthReached) {
        this.helperText = this.minChar > 0 ? `At least ${this.minChar} characters` : undefined;
      } else {
        this.helperText = undefined;
        this._handleFilterValues(this._search);
      }
    }
    private _handleFilterValues(_search: string): void {
      if (this.returnObject) {
        const customEvent = new CustomEvent('autoCompleteValueChanged', {
            detail: this._search
        });
        this.timer = setTimeout(() => {
          this.dispatchEvent(customEvent);
        }, this._debounce) 
      }
    }

    private _displayAutoCompleteList(): TemplateResult {
      this.displayListIfNotNull();
      if (!this._canDisplayItemsList) {
        return html``;
      }
      return html`
        <mwc-list activatable id="activatable" class="elevation absolute bgc--white z-index-1000 full-width" @click style="width: 100%">
          ${this._listItems(this.values)}
        </mwc-list>
      `;
    }

    private _listItems(items: string[] | Nested[]): TemplateResult[] {
      if (!this._canDisplayItemsList) {
        return [html``];
      } else if (!items || items.length <= 0) {
        return [html`<mwc-list-item><h4>${this.noData}</h4></mwc-list-item>`];
      } else if (this.returnObject) {
        this._checkReturnObjectRequirements();
        return this._objectListItems(<Nested[]>items);
      }
      const values = (<string[]>items).filter(item => item.includes(this._search ?? ''));
      return values?.length > 0 ? this._stringListItems(values) : [html`<mwc-list-item><h4>${this.noData}</h4></mwc-list-item>`];
    }

    private _stringListItems(items: string[]): TemplateResult[] {
      return items?.map(item => html`<mwc-list-item value="${item}" @click=${() => this._setSelectedValue(item)}>${item}</mwc-list-item>`);
    }

    private _objectListItems(items: Nested[]): TemplateResult[] {
      return items?.map(item => html`<mwc-list-item value="${item[this.key]}" @click=${() => this._setSelectedValue(item)}>${item[this.displayName]}</mwc-list-item>`);
    }

    private _setSelectedValue(item: string | Nested) {
      this.value = this.returnObject ? item[this.displayName] : item;
      const customEvent = new CustomEvent('autoCompleteValueSelected', {
            detail: item
      });
      this.dispatchEvent(customEvent);
      this._hideItems = true;
    }

    private _checkReturnObjectRequirements() {
      if (!this.displayName) {
        throw new Error(`In order to use the aodocs-autocomplete, you need to provide the display name object key`)
      }
    }

    private _hideListOnClickIfNeeded(element: Element): void {
        this._hideItems = true;
    }

    private get _minLengthReached(): boolean {
      return !this.minChar || this._search?.length >= this.minChar;
    }

    private get _debounce(): number {
      return this.debounce ?? this.DEBOUNCE_TIME * this.DEBOUNCE_TIME_CONVERTER_MS;
    }
    

    private  get _canDisplayItemsList(): boolean {
      return !this.loading && !this._hideItems && this.displayList && this._minLengthReached;
    }
}
