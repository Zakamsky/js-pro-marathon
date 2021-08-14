import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  const greeting = document.querySelector('.start-game');
  const form = document.getElementById('nameForm');
  const name = form.querySelector('.input');

  const warning = {};
  warning.long = form.querySelector('.warning--long');
  warning.short = form.querySelector('.warning--short');

  const chatWrap = document.querySelector('.chat-wrap');
  const chatForm = chatWrap.querySelector('#form');
  const chatInput = chatForm.querySelector('#input');

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

    ClientGame.init({
      tagID: 'game',
      playerName: name.value,
    });

    chatWrap.style.display = 'block';
    form.removeEventListener('submit', submitName);
    greeting.remove();
  };

  form.addEventListener('submit', submitName);

  chatForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (chatInput.value) {
      console.log('### chatInput.value: ', chatInput.value);

      chatInput.value = '';
    }
  });
});
