import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  ClientGame.init({ tagID: 'game' });
});

// import Catty from './assets/Female-2-Walk.png';

// const spriteW = 48;
// const spriteH = 48;
//

// =============== CHARACTER ================= //
// const shots = 3;
// let cycle = 0;
// let frame = 0;
//
// let direction = null;
// let py = canvasW / 2 - spriteH / 2;
// let px = canvasW / 2 - spriteW / 2;
//
// function keyDownHandler(e) {
//   direction = e.key;
// }
//
// function keyUpHandler(e) {
//   if (direction === e.key) {
//     direction = null;
//   }
// }
//
// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);
//
// const playerImg = document.createElement('img');
// playerImg.src = Catty;
//
// const walk = (timestamp) => {
//   switch (direction) {
//     case 's':
//     case 'ArrowDown':
//     case 'Down':
//       if (py <= canvasH - spriteH) {
//         py += 10;
//         frame = 0;
//         cycle = (cycle + 1) % shots;
//       }
//       break;
//     case 'w':
//     case 'ArrowUp':
//     case 'Up':
//       if (py > 0) {
//         py -= 10;
//         frame = 3;
//         cycle = (cycle + 1) % shots;
//       }
//       break;
//     case 'a':
//     case 'ArrowLeft':
//     case 'Left':
//       if (px >= 0) {
//         px -= 10;
//         frame = 1;
//         cycle = (cycle + 1) % shots;
//       }
//       break;
//     case 'd':
//     case 'ArrowRight':
//     case 'Right':
//       if (px <= canvasW - spriteW) {
//         px += 10;
//         frame = 2;
//         cycle = (cycle + 1) % shots;
//       }
//       break;
//     default:
//       break;
//   }
//
//   ctx.clearRect(0, 0, canvasW, canvasH);
//
//   const offset = frame * spriteH;
//   ctx.drawImage(playerImg, cycle * spriteW, offset, spriteW, spriteH, px, py, spriteW, spriteH);
//
//   window.requestAnimationFrame(walk);
// };
//
// playerImg.addEventListener('load', () => {
//
//   window.requestAnimationFrame(walk);
//
// });
