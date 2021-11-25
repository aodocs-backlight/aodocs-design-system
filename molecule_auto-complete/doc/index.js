import '@aodocs/auto-complete';

import '../../shared/doc/demo-header';

let autoCompleteStringEl = undefined;
let autoCompleteObjectEl = undefined;
let autoCompleteNoDataEl = undefined;
addEventListener('load', function () {
  document.body.classList.remove('unresolved');
  autoCompleteStringEl = document.getElementById('my-auto-complete-string');
  computeAutoCompleteStringValues();
  autoCompleteStringEl.addEventListener(
    'autoCompleteValueSelected',
    onValueSelectedString
  );

  autoCompleteObjectEl = document.getElementById('my-auto-complete-object');
  autoCompleteObjectEl.addEventListener(
    'autoCompleteValueChanged',
    computeAutoCompleteObjectValues
  );
  autoCompleteObjectEl.addEventListener(
    'autoCompleteValueSelected',
    onValueSelectedObject
  );

  autoCompleteNoDataEl = document.getElementById('my-auto-complete-no-data');
  computeAutoCompleteNoData();
});

function computeAutoCompleteStringValues() {
  const n = Math.floor(Math.random() * 10) + 1;
  const values = [];
  for (let i = 0; i <= 30; i++) {
    values.push('random' + '_' + (Math.random() + 1).toString(36).substring(2));
  }
  autoCompleteStringEl.values = values;
}

function onValueSelectedString(value) {
  document.querySelector('#stringValue').innerHTML = value.detail;
}

function computeAutoCompleteObjectValues(value) {
  const n = Math.floor(Math.random() * 10) + 1;
  const values = [];
  for (let i = 0; i <= n; i++) {
    const obj = {
      id: i,
      name: value.detail + '_' + (Math.random() + 1).toString(36).substring(2),
      prop: `a_prop_${i}`,
      prop_b: `another_prop_${i}`,
      prop_c: `another_another_prop_${i}`
    };
    values.push(obj);
  }
  autoCompleteObjectEl.values = values;
}

function onValueSelectedObject(value) {
  document.querySelector('#objectValue').innerHTML = JSON.stringify(
    value.detail
  );
}

function computeAutoCompleteNoData() {
  autoCompleteNoDataEl.values = [];
}
