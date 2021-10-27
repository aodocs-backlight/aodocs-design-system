import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@aodocs/select';

@customElement('domain-picker')
export class SimpleGreeting extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    :host {
      color: blue;
    }
  `;

    // Declare reactive properties
    @property()
    name?: string = 'World';

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>
                    <br>
        <h2>Filled</h2>
        <mwc-select label="filled" id="filled">
            <mwc-list-item></mwc-list-item>
            <mwc-list-item value="1">Option 1</mwc-list-item>
            <mwc-list-item value="2">Option 2</mwc-list-item>
            <mwc-list-item value="3">Option 3</mwc-list-item>
        </mwc-select>
        <div>Value: <span id="filledValue"></span></div>`;
    }
}
