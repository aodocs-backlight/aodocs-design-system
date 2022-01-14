import '../../shared/doc/demo-header';
import '../src/linear-progress';


let linearEl = null;
let linearEl2 = null;
let linearEl3 = null;
let linearEl4 = null;
let linearEl5 = null; 
let linearEl6 = null; 
let count = 0;
addEventListener('load', function () {
  document.body.classList.remove('unresolved');
  linearEl = document.querySelector('#progress1');
  linearEl2 = document.querySelector('#progress2');
  linearEl3 = document.querySelector('#progress3');
  linearEl4 = document.querySelector('#progress4');
  linearEl5 = document.querySelector('#progress5');
  linearEl6 = document.querySelector('#progress6');

  linearEl2.displayTotal = false;

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
  let config2 = [
    {
      color: 'var(--aodocs-theme-light-green)',
      value: 1,
      title: 'Finished'
    },
    {
      color: 'var(--aodocs-theme-light-red)',
      value: 0,
      title: 'Errors'
    },
    {
      color: 'var(--aodocs-theme-light-blue)',
      value: 0,
      title: 'Running'
    },
    {
      color: 'var(--aodocs-theme-grey-strokes)',
      value: 999,
      title: 'Pending'
    }
  ];
  let config3 = [
    {
      color: 'var(--aodocs-theme-light-green)',
      value: 1,
      title: 'Finished'
    }
  ];
  linearEl.config = config3;
  linearEl2.config = config;
  linearEl3.config = config;
  linearEl4.config = config;
  linearEl5.config = config2;
  linearEl6.config = config2;

  setInterval(() => {
    count++;
    if (count < 12) {
      config[0].value = config[0].value + 50;
      config[1].value = config[1].value + 2;
      config[2].value = config[2].value + 16;
      config[3].value = config[3].value - 68;
    } else {
      count = 0;
      config[0].value = 200;
      config[1].value = 10;
      config[2].value = 20;
      config[3].value = 770;
    }
    // linearEl.config = [];
    // linearEl.config = config;
    linearEl2.config = [];
    linearEl2.config = config;
    linearEl3.config = [];
    linearEl3.config = config;
    linearEl4.config = [];
    linearEl4.config = config;
  }, 1000);
});
