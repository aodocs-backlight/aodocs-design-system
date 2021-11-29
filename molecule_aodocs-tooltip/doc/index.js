import '../../shared/doc/demo-header';
import '../src/aodocs-tooltip';
import '../../molecule_linear-progress/src/linear-progress';

let linearEl1 = null;
let linearEl2 = null;
let linearEl3 = null;
addEventListener('load', function () {
  linearEl1 = document.querySelector('#progress1');
  linearEl2 = document.querySelector('#progress2');
  linearEl3 = document.querySelector('#progress3');
  let config = [
    {
      color: 'var(--aodocs-theme-light-green)',
      value: 200,
      title: 'Finished'
    },
    {
      color: 'var(--aodocs-theme-light-red)',
      value: 9,
      title: 'Errors'
    },
    {
      color: 'var(--aodocs-theme-light-blue)',
      value: 19,
      title: 'Running'
    },
    {
      color: 'var(--aodocs-theme-grey-strokes)',
      value: 768,
      title: 'Pending'
    }
  ];
  linearEl1.config = config;
  linearEl2.config = config;
  linearEl3.config = config;
  document.body.classList.remove('unresolved');
});
