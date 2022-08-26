import { LitElement, TemplateResult, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../colors';
import '../../molecule_auto-complete';
import { textColor, textColorMixin } from '../../style_colors';
import { flex, spaceBetween } from '../../style_positioning';
import { paddingsRem, marginsRem } from '../../style_spacing';
import { smoothWidthTransition } from '../../style_transitions';
import { typography } from '../../style_typography';
import '../../typography';
import { Config } from './linear-progress.model';

@customElement('aodocs-linear-progress')
export class LinearProgress extends LitElement {
  static styles = [
    textColorMixin(textColor.SUBTITLE1),
    paddingsRem,
    marginsRem,
    spaceBetween,
    typography,
    smoothWidthTransition,
    flex,
    css`
    .detail-title-margin-bottom {
      margin-bottom: var(--detail-title-margin-bottom, 0.5rem);
    }
    `
  ];

  @property({ type: Boolean })
  public displayDetails = false;

  @property({ type: Boolean })
  public onlyDetails = false;

  @property({ type: Boolean })
  public displayTotal = false;

  @property({ type: String })
  public title = '';

  @property({ type: Number })
  public total = 0;

  @property({ type: String })
  public backgroundColor = 'var(--aodocs-theme-grey-strokes)';

  @property({ type: String })
  public width = '100%';

  @property({ type: String })
  public height = '10px';

  @property({type: String})
  public minWidth = '10px';

  @property({ type: Array })
  public config: Config[] = [];

  protected override render(): TemplateResult {
    return html`
      ${this._displayTitle()}
      ${this._renderBar()}
      ${this._displayDetails()}
    `;
  }
private _renderBar(): unknown {
  return this.onlyDetails ? html`` : html`
    <div class="flex" style="background-color: ${this.backgroundColor}; height: ${this.height}; width: ${this.width};">
      ${this._renderParts()}
    </div>
  `;
}

  private _displayTitle(): TemplateResult {
    return this.displayDetails && !!this.title
      ? html`
          <p class="mdc-typography mdc-typography--subtitle1 text--subtitle1">
            ${this.title}
          </p>
        `
      : html``;
  }

  private _displayDetails(): TemplateResult {
    return (this.displayDetails || this.onlyDetails)
      ? html`
          <div class="flex justify-space-between ${this.onlyDetails ? '' : 'pr-6--rem'}">
            ${this._renderDetailParts()} ${this._renderDetailTotal()}
          </div>
        `
      : html``;
  }

  _renderDetailParts(): TemplateResult[] {
    if (this.config?.length > 0) {
      return this.config.map(part => this._renderDetailPart(part));
    }

    return [html``];
  }

  private _renderDetailTotal(): TemplateResult {
    return this.displayTotal
      ? html`
          <div class="mdc-typography">
            <p class="mdc-typography--subtitle1 text--subtitle1 my-0--rem detail-title-margin-bottom">Total</p>
            <p class="mdc-typography--headline5 text--subtitle1 my-0--rem">
              ${this.total}
            </p>
          </div>
        `
      : html``;
  }

  private _renderDetailPart(part: Config): TemplateResult {
    return html`
      <div class="mdc-typography">
        <p class="mdc-typography--subtitle1 text--subtitle1 my-0--rem detail-title-margin-bottom">
          ${part.title ?? 'No title'}
        </p>
        <p class="mdc-typography--headline5 my-0--rem" style="color: ${part.color}">
          ${part.value}
        </p>
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
        style="height: ${this.height}; min-width: ${this
          .minWidth}; width: ${this._partWidth(
          part
        )}%; background-color: var(--mdc-theme-white);"
      >
        <div style="height: 100%; width: 100%%; 
          background-color: ${part.color};">
        </div>
      </div>
    `;
  }

  private _partWidth(part: Config): number {
    return (part.value / this.total) * 100;
  }
}
