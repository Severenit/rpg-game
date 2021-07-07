import './index.scss';
import SenseiWalk from './assets/M-walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let pY = 0;

function keyDownHandler(e) {
    if (e.key === 'Down' || e.key === 'ArrowDown') {
        bottomPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Down' || e.key === 'ArrowDown') {
        bottomPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = SenseiWalk;

img.addEventListener('load', () => {
    setInterval(() => {
        if (bottomPressed) {
            pY += 10;
            cycle = (cycle + 1) % shots;
        }

        ctx.clearRect(0, 0, 600, 600);
        ctx.drawImage(img, cycle * spriteW, 0, spriteW, spriteH, 0, pY, 48, 48);
    }, 120);
});
