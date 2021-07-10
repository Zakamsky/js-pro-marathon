import './index.scss';
import Catty from './assets/Female-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasW = canvas.offsetWidth;
const canvasH = canvas.offsetHeight;

const spriteW = 48;
const spriteH = 48;

const shots = 3;
let cycle = 0;
let frame = 0;

let direction = null;
let py = canvasW / 2 - spriteH / 2;
let px = canvasW / 2 - spriteW / 2;

function keyDownHandler(e) {
  direction = e.key;
}

function keyUpHandler(e) {
  if (direction === e.key) {
    direction = null;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = Catty;

img.addEventListener('load', () => {
  document.querySelector('.loading').style.display = 'none';
  setInterval(() => {
    switch (direction) {
      case 's':
      case 'ArrowDown':
      case 'Down':
        if (py <= canvasH - spriteH) {
          py += 10;
          frame = 0;
          cycle = (cycle + 1) % shots;
        }
        break;
      case 'w':
      case 'ArrowUp':
      case 'Up':
        if (py > 0) {
          py -= 10;
          frame = 3;
          cycle = (cycle + 1) % shots;
        }
        break;
      case 'a':
      case 'ArrowLeft':
      case 'Left':
        if (px >= 0) {
          px -= 10;
          frame = 1;
          cycle = (cycle + 1) % shots;
        }
        break;
      case 'd':
      case 'ArrowRight':
      case 'Right':
        if (px <= canvasW - spriteW) {
          px += 10;
          frame = 2;
          cycle = (cycle + 1) % shots;
        }
        break;
      default:
        break;
    }

    ctx.clearRect(0, 0, canvasW, canvasH);
    // todo: === temp ===

    // gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasH);

    gradient.addColorStop(0, 'rgba(100, 200, 150, .1)');
    gradient.addColorStop(1, 'rgba(100, 200, 150, .6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // grid

    for (let x = 36.5; x < canvasW; x += spriteW) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasH);
    }

    for (let y = 36.5; y < canvasH; y += spriteH) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvasW, y);
    }

    ctx.strokeStyle = 'rgba(90, 190, 140, .7)';
    ctx.stroke();

    // center
    ctx.beginPath();
    ctx.arc(canvasW / 2, canvasH / 2, spriteW / 2 + 10, 0, 2 * Math.PI);
    ctx.stroke();

    // todo: === temp end ===
    const offset = frame * spriteH;
    ctx.drawImage(img, cycle * spriteW, offset, spriteW, spriteH, px, py, spriteW, spriteH);
  }, 120);
});
