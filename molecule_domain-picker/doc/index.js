import '@aodocs/domain-picker';

import '../../shared/doc/demo-header';

let domainPickerEl = null;
addEventListener('load', function () {
  document.body.classList.remove('unresolved');
  domainPickerEl = document.querySelector('aodocs-domain-picker');
  domainPickerEl.addEventListener('autoCompleteValueSelected', domainChanged);
  domainPickerEl.disabled = true;
  domainPickerEl.loading = true;
  setTimeout(() => {
    domainPickerEl.disabled = false;
    domainPickerEl.loading = false;
  }, 2000);

  const values = [];
  for (let i = 0; i <= 30; i++) {
    values.push('random' + '_' + (Math.random() + 1).toString(36).substring(2));
  }
  domainPickerEl.domains = values;
});

function domainChanged(event) {
  document.querySelector('#domain').innerHTML = JSON.stringify(event.detail);
}
