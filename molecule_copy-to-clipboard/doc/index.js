import '../../shared/doc/demo-header';
import '../../atom_snackbar';
import '../src/copy-to-clipboard';
import '../../atom_icon';

let copyEl2 = null;
let copyEl3 = null;
let valueEl = null;
let snack = null;
addEventListener('load', function () {
  document.body.classList.remove('unresolved');
  copyEl2 = document.querySelector('#copy2');
  copyEl3 = document.querySelector('#copy3');
  valueEl = document.querySelector('#value');
  snack = document.querySelector('#snack');
  copyEl2.addEventListener('textCopied', textCopied);
  copyEl3.addEventListener('textCopied', textCopiedWithSnack);
});

function textCopied(event) {
  valueEl.innerHTML = event.message;
}

function textCopiedWithSnack(event) {
  snack.labelText = `Text copied: ${event.message}`;  
  snack.open = true;
}
