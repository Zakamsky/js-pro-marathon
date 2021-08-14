import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  const greeting = document.querySelector('.start-game');
  const form = document.getElementById('nameForm');
  const name = form.querySelector('.input');
  const warning = {};
  warning.long = form.querySelector('.warning--long');
  warning.short = form.querySelector('.warning--short');

  const submitName = (evt) => {
    evt.preventDefault();
    Object.values(warning).map((item) => item.classList.remove('warning--show'));

    if (name.value.length > 12) {
      warning.long.classList.add('warning--show');
      return;
    }
    if (name.value.length < 1) {
      warning.short.classList.add('warning--show');
      return;
    }

    // greeting.parentNode.removeChild(greeting);
    ClientGame.init({ tagID: 'game', playerName: name.value });
    form.removeEventListener('submit', submitName);
    greeting.remove();
  };
  /* form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    Object.values(warning).map((item) => item.classList.remove('warning--show'));

    if (name.value.length > 12) {
      warning.long.classList.add('warning--show');
      return;
    }
    if (name.value.length < 1) {
      warning.short.classList.add('warning--show');
      return;
    }

    // greeting.parentNode.removeChild(greeting);
    ClientGame.init({ tagID: 'game', playerName: name.value });
    greeting.remove();
  }); */

  form.addEventListener('submit', submitName);
});
