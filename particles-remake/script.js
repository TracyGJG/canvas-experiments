/** @type HTMLCanvasElement */
const canvas = /** @type HTMLCanvasElement */ (document.getElementById(
  'myCanvas'
));
const context = canvas.getContext('2d');

let mouseX;
let mouseY;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasArea = canvasWidth * canvasHeight;
const numberOfBalls = Math.floor(canvasArea / 800);

const maxRadius = 35;
const growthRate = 1;
const shrinkRate = 4;
const range = 50;

canvas.onmousemove = function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

function Circle(xCoordinate, yCoordinate, radius) {
  const randomNumber = Math.floor(Math.random() * 4);
  this.color = colorArray[randomNumber];

  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.radius = radius;

  this.xVelocity = Math.random() * 2 - 1;
  this.yVelocity = Math.random() * 2 - 1;

  // As distance gets closer to 0, increase radius
  this.update = function () {
    this.xCoordinate += this.xVelocity;
    this.yCoordinate += this.yVelocity;
    const xDistance = mouseX - this.xCoordinate;
    const yDistance = mouseY - this.yCoordinate;
    const originalRadius = radius;

    // Movement Functions
    if (
      this.xCoordinate + this.radius > canvasWidth ||
      this.xCoordinate - this.radius < 0
    ) {
      this.xVelocity = -this.xVelocity;
    }
    if (
      this.yCoordinate + this.radius > canvasHeight ||
      this.yCoordinate - this.radius < 0
    ) {
      this.yVelocity = -this.yVelocity;
    }

    // Radius Decrease Functions
    // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
    if (
      xDistance < range &&
      xDistance > -1 * range &&
      this.radius < maxRadius &&
      yDistance < range &&
      yDistance > -1 * range
    ) {
      this.radius += growthRate;
    } else if (
      (xDistance >= range && originalRadius < this.radius) ||
      (xDistance <= -1 * range && originalRadius < this.radius) ||
      (yDistance >= range && originalRadius < this.radius) ||
      (yDistance <= -1 * range && originalRadius < this.radius)
    ) {
      this.radius -= shrinkRate;
    }

    this.draw();
  };

  this.draw = function () {
    context.beginPath();
    context.arc(
      this.xCoordinate,
      this.yCoordinate,
      Math.abs(this.radius),
      0,
      Math.PI * 2
    );
    context.fillStyle = this.color;
    context.fill();
  };
}

const colorArray = ['#272F32', '#9DBDC6', '#FF3D2E', '#DAEAEF'];
let circleArray = [];

for (let i = 0; i < numberOfBalls; i++) {
  const randomXCoordinate = Math.random() * canvasWidth;
  const randomYCoordinate = Math.random() * canvasHeight;
  const randomRadius = Math.random() * 5;
  circleArray.push(
    new Circle(randomXCoordinate, randomYCoordinate, randomRadius)
  );
}

function updateAll() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  window.requestAnimationFrame(updateAll);
}

updateAll();
