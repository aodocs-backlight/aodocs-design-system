import '../../shared/doc/demo-header';
import '@aodocs/auto-complete';

var autoCompleteEl = undefined;

addEventListener('load', function() {
  document.body.classList.remove('unresolved');
  autoCompleteEl = document.getElementById('my-auto-complete');
  autoCompleteEl.addEventListener('autoCompleteValueChanged', computeAutoCompleteValues);
});

function computeAutoCompleteValues(value) {
  const n = Math.floor(Math.random() * 10) + 1;
  const values = [];
  for (let i = 0; i <= n; i++) {
    values.push(value.detail + '_' + (Math.random() + 1).toString(36).substring(2))
  }
  setTimeout(() => {
    autoCompleteEl.values = values;
  }, 3000)
}
