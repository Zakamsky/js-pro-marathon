import './index.scss';
import Catty from './assets/Female-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const spriteW = 48;
const spriteH = 48;

const shots = 3;
let cycle = 0;
let frame = 0;

let bottomPressed = false;
let UpPressed = false;
let LeftPressed = false;
let RightPressed = false;
let py = 300 - spriteH / 2;
let px = 300 - spriteW / 2;

function keyDownHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown' || e.key === 's') {
    bottomPressed = true;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp' || e.key === 'w') {
    UpPressed = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
    LeftPressed = true;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
    RightPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown' || e.key === 's') {
    bottomPressed = false;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp' || e.key === 'w') {
    UpPressed = false;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
    LeftPressed = false;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
    RightPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = Catty;

img.addEventListener('load', () => {
  document.querySelector('.loading').style.display = 'none';
  setInterval(() => {
    if (bottomPressed && py <= 600 - spriteH) {
      py += 10;
      frame = 0;
      cycle = (cycle + 1) % shots;
    }
    if (UpPressed && py >= 0) {
      py -= 10;
      frame = 3;
      cycle = (cycle + 1) % shots;
    }
    if (LeftPressed && px >= 0) {
      px -= 10;
      frame = 1;
      cycle = (cycle + 1) % shots;
    }
    if (RightPressed && px <= 600 - spriteW) {
      px += 10;
      frame = 2;
      cycle = (cycle + 1) % shots;
    }

    ctx.clearRect(0, 0, 600, 600);
    // todo: === temp ===

    // gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);

    gradient.addColorStop(0, 'rgba(100, 200, 150, .1)');
    gradient.addColorStop(1, 'rgba(100, 200, 150, .6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 600);

    // grid

    for (let x = 36.5; x < 600; x += spriteW) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 600);
    }

    for (let y = 36.5; y < 600; y += spriteH) {
      ctx.moveTo(0, y);
      ctx.lineTo(600, y);
    }

    ctx.strokeStyle = 'rgba(90, 190, 140, .7)';
    ctx.stroke();

    // center
    ctx.beginPath();
    ctx.arc(300, 300, spriteW / 2 + 10, 0, 2 * Math.PI);
    ctx.stroke();

    // todo: === temp end ===
      const offset = frame * spriteH;
    ctx.drawImage(img, cycle * spriteW, offset, spriteW, spriteH, px, py, spriteW, spriteH);
  }, 120);
});

// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(550, 50 );
// ctx.lineTo(50, 150 );
// ctx.lineTo(550, 150 );
// ctx.closePath();
//
// ctx.moveTo(50, 450);
// ctx.lineTo(550, 450);
// ctx.lineTo(50, 550);
// ctx.lineTo(550, 550);
// ctx.closePath();
//
// ctx.strokeStyle = 'rebeccapurple';
// ctx.lineWidth = 3;
// ctx.fillStyle = 'rgba(100, 200, 150, .4)';
// ctx.fill();
// ctx.stroke();
//
// ctx.beginPath();
// ctx.arc(300, 300, 100, 0, 2*Math.PI);
// ctx.stroke();
//
// ctx.strokeStyle = 'rgb(100, 200, 150)';
//
// ctx.beginPath();
// ctx.moveTo(50, 250);
// ctx.quadraticCurveTo(160, 100, 290, 290)
// ctx.stroke();
//
// ctx.beginPath();
// ctx.moveTo(310, 310);
// ctx.bezierCurveTo(460, 460, 390, 390,  550, 290)
// ctx.stroke();

// ctx.strokeStyle = 'red';
// ctx.lineWidth = 4;
// ctx.strokeRect(20, 20, 200, 100);
//

//
// ctx.fillStyle = 'rgba(100, 200, 150, .4)';
// ctx.fillRect(100, 400, 350, 150 );
//
// ctx.clearRect( 50, 50, 300, 400);

// let xy = 0
// setInterval(() => {
//     ctx.clearRect(0, 0, 600, 600);
//     xy +=10;
//     ctx.fillStyle = 'rgba(100, 200, 150, .4)';
//     ctx.fillRect(xy, xy, 100, 50);
// }, 50);
