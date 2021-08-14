import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import {getTime} from "./common/util";

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
  const messageBlock = chatWrap.querySelector('.message');

  let socket = null;

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


    const myName = name.value;

    socket = io('https://jsprochat.herokuapp.com/');
    socket.emit('start', name.value);

    chatWrap.style.display = 'block';
    form.removeEventListener('submit', submitName);
    greeting.remove();


    socket.on('chat online', (data) => {
      console.log('### io chat online data: ', data);

      messageBlock.insertAdjacentHTML('afterbegin', `<br><p><b>${getTime(data.time)}</b> - Всего онлайн: ${data.online}</p><br>`);
    })

    socket.on('chat connection', (data) => {
      console.log('### io connection data', data);
      messageBlock.insertAdjacentHTML('afterbegin', `<p><b>${getTime(data.time)}</b> - ${data.msg}</p>`);
    })

    socket.on('chat message', (data) => {
      console.log('### io message data', data);
      const mssgClass = myName === data.name ? 'accent' : '';
      const mssgHtml = `<p class="${mssgClass}"><b>${getTime(data.time)}</b>/<i>${data.name}</i> - ${data.msg}</p>`;
      messageBlock.insertAdjacentHTML('afterbegin', mssgHtml);
    })

    socket.on('chat disconnect', (data) => {
      console.log('### io message data', data);

      messageBlock.insertAdjacentHTML('afterbegin', `<p><b>${getTime(data.time)}</b> - ${data.msg}</p>`);
    })

  };

  form.addEventListener('submit', submitName);

  chatForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (chatInput.value) {
      console.log( '### chatInput.value: ', chatInput.value );
      socket.emit( 'chat message', chatInput.value );
      chatInput.value = '';
    }
  });


});
