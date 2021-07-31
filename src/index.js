import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  const greeting = document.querySelector('.start-game');
  const form = document.getElementById('nameForm');
  const name = form.querySelector('.input');
  const warning = form.querySelector('.warning');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (name.value.length > 12) {
      warning.style.opacity = '1';
      return;
    }
    greeting.parentNode.removeChild(greeting);
    ClientGame.init({ tagID: 'game', playerName: name.value });
  });
});
