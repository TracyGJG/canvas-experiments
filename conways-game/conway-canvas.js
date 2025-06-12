const pxWidth = 8;
const pxHeight = 8;
const cvs = document.getElementById('myCanvas');
const ctx = cvs.getContext('2d');

function clearCanvas() {
  ctx.fillStyle = '#FFFF77';
  ctx.fillRect(0, 0, 100 * pxWidth - 1, 100 * pxHeight - 1);
}

function drawCell(x, y) {
  ctx.fillStyle = '#0000FF';
  ctx.fillRect(x * pxWidth, y * pxHeight, pxWidth - 1, pxHeight - 1);
}

const loopRound = idx => (idx + 100) % 100;

function neighbours(cell) {
  return [
    [loopRound(cell[0] - 1), loopRound(cell[1] - 1)],
    [cell[0], loopRound(cell[1] - 1)],
    [loopRound(cell[0] + 1), loopRound(cell[1] - 1)],
    [loopRound(cell[0] - 1), cell[1]],
    [loopRound(cell[0] + 1), cell[1]],
    [loopRound(cell[0] - 1), loopRound(cell[1] + 1)],
    [cell[0], loopRound(cell[1] + 1)],
    [loopRound(cell[0] + 1), loopRound(cell[1] + 1)]
  ];
}

const startButton = document.querySelector('button');
startButton.addEventListener('click', _ => {
  startButton.disabled = true;
  cycle = 0;
  runCycle();
});
