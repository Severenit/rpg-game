import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import { getTime } from './common/util';

window.addEventListener('load', async () => {
  // const socket = io('https://jsmarathonpro.herokuapp.com/', {
  //   path: '/game'
  // });
  const levelCfg = await fetch('https://jsmarathonpro.herokuapp.com/api/v1/world').then(res => res.json());
  const sprites = await fetch('https://jsmarathonpro.herokuapp.com/api/v1/sprites').then(res => res.json());
  console.log('####: w', levelCfg);
  console.log('####: w', sprites);

  const $startGame = document.querySelector('.start-game');
  const $nameForm = document.getElementById('nameForm');
  const $inputName = document.getElementById('name');

  const $chatWrap = document.querySelector('.chat-wrap');
  const $form = document.getElementById('form');
  const $input = document.getElementById('input');
  const $message = document.querySelector('.message');

  $startGame.style.display = 'flex';

  const submitName = (e) => {
    e.preventDefault();

    if ($inputName.value) {
      ClientGame.init({
        tagId: 'game',
        playerName: $inputName.value,
        levelCfg,
        sprites,
        apiCfg: {
          url: 'https://jsmarathonpro.herokuapp.com/',
          path: '/game',
        }
      });

      // socket.emit('start', $inputName.value);

      $chatWrap.style.display = 'block';

      $nameForm.removeEventListener('submit', submitName);
      $startGame.remove();
    }
  };

  $nameForm.addEventListener('submit', submitName);

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    if ($input.value) {
      // socket.emit('chat message', $input.value);

      $input.value = '';
    }
  });

  // socket.on('chat online', (data) => {
  //   console.log('####: chat online', data);
  // });
  //
  // socket.on('chat connection', (data) => {
  //   console.log('####: chat connection', data);
  //   $message.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> ${data.msg}</p>`);
  // });
  //
  // socket.on('chat disconnect', (data) => {
  //   $message.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> ${data.msg}</p>`);
  // });
  //
  // socket.on('chat message', (data) => {
  //   $message.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`);
  // });
});
