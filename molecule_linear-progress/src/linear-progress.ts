import {LitElement, html, TemplateResult, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '../../molecule_auto-complete';
import '../../colors';
import '../../typography';
import {flex, spaceBetween} from '../../style_positioning';
import {smoothWidthTransition} from '../../style_transitions';
import {Config} from './linear-progress.model';
import {typography} from '../../style_typography';
import {textColorMixin, textColor} from '../../style_colors';
import {paddingsRem} from '../../style_spacing';

@customElement('aodocs-linear-progress')
export class LinearProgress extends LitElement {
  static styles = [
    textColorMixin(textColor.SUBTITLE1), 
    paddingsRem, 
    spaceBetween, 
    typography, 
    smoothWidthTransition, 
    flex
  ];

  @property({type: Boolean})
  public displayDetails: boolean = false;

  @property({type: Boolean})
  public displayTotal: boolean = true;

  @property({type: String})
  public title: string = '';

  @property({type: Number})
  public total: number = 0;

  @property({type: String})
  public backgroundColor: String = 'var(--aodocs-theme-grey-strokes)';

  @property({type: String})
  public width: string = '100%';

  @property({type: String})
  public height = '10px';

  @property({type: Number})
  public minWidth = '10';

  @property({type: Array})
  public config: Config[] = [];

  protected override render(): TemplateResult {
    return html`
    ${this._displayTitle()}
    <div class="flex" style="height: ${this.height}; width: ${this.width};">
      ${this._renderParts()}
    </div>
    ${this._displayDetails()}
    `;
  }

  private _displayTitle(): TemplateResult {
    return this.displayDetails && !!this.title ? html`
      <p class="mdc-typography mdc-typography--subtitle1 text--subtitle1">${this.title}</p>
    ` : html``;
  }
  
  private _displayDetails(): TemplateResult {
    return this.displayDetails ? html`
    <div class="flex justify-space-between pr-6--rem">
      ${this._renderDetailParts()}
      ${this._renderDetailTotal()}
    </div>` : html``;
  }

  _renderDetailParts(): TemplateResult[] {
    if (this.config?.length > 0) {
      return this.config.map(part => this._renderDetailPart(part));
    }

    return [html``];
  }

  private _renderDetailTotal(): TemplateResult {
    return this.displayTotal ? html`
      <div class="mdc-typography">
        <p class="mdc-typography--subtitle1 text--subtitle1">Total</p>
        <p class="mdc-typography--headline5 text--subtitle1">${this.total}</p>
      </div>
    ` : html``;
  }

  private _renderDetailPart(part: Config): TemplateResult {
    return html`
      <div class="mdc-typography">
        <p class="mdc-typography--subtitle1 text--subtitle1">${part.title ?? 'No title'}</p>
        <p class="mdc-typography--headline5" style="color: ${part.color}">${part.value}</p>
      </div>
    `;
  }

  private _renderParts(): TemplateResult[] {
    const parts = this.config?.filter(part => part.value > 0);
    if (parts?.length > 0) {
      return parts.map(part => this._renderPart(part));
    }

    return [html``];
  }

  private _renderPart(part: Config): TemplateResult {
    return html`
    <div
      class="smooth-width-transition"
      style="height: ${this.height}; min-width: ${this.minWidth}; width: ${this._partWidth(part)}%; background-color: ${part.color};">
    </div>`;
  }

  private _partWidth(part: Config): number {
    return (part.value / this.total) * 100;
  }
}
