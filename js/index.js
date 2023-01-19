//canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const border = (canvas.style.border = "1px solid black");
const intro = document.querySelector(".game-intro");
canvas.style.display = "none";
//background
const bgImg1 = new Image();
bgImg1.src =
  "https://media.discordapp.net/attachments/1062053353837830236/1065601329701072946/road.png";
let bgImg1Y = 0;
const bgImg2 = new Image();
bgImg2.src =
  "https://media.discordapp.net/attachments/1062053353837830236/1065601329701072946/road.png";
let bgImg2Y = -canvas.height;

let randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

let animateId;
let gameOver = false;
let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;
let isMovingDown = false;
let score = 0;

let objectY = 0;
let objectX = randomNumber(0, 450);
let objectWidth = randomNumber(50, 250);
let objectHeight = 15;
let objectSpeed = 6;

//car
const car = new Image();
car.src = "/images/car.png";
let carHeight = 100;
let carWidth = 50;
let carY = canvas.height / 2 + 150;
let carX = canvas.width / 2 - 24;
const carSpeed = 6;

const drawCar = () => {
  ctx.drawImage(car, carX, carY, carWidth, carHeight);
};

//obstacle
const drawObject = () => {
  ctx.beginPath();
  ctx.fillStyle = "tomato";
  ctx.rect(objectX, objectY, objectWidth, objectHeight);
  ctx.fill();
  ctx.closePath();
};

//animate function
function animate() {
  ctx.drawImage(bgImg1, 0, bgImg1Y, canvas.width, canvas.height);
  ctx.drawImage(bgImg2, 0, bgImg2Y, canvas.width, canvas.height);

  //background image animation
  bgImg1Y += 3;
  bgImg2Y += 3;

  if (bgImg1Y > canvas.height) {
    bgImg1Y = -canvas.height;
  }
  if (bgImg2Y > canvas.height) {
    bgImg2Y = -canvas.height;
  }
  ctx.font = "48px serif";
  ctx.fillText(score, 10, 48);

  //car movements
  drawCar();
  if (isMovingLeft && carX > 0) {
    carX -= carSpeed;
  }
  if (isMovingRight && carX + carWidth < canvas.width) {
    carX += carSpeed;
  }
  if (isMovingUp && carY > 0) {
    carY -= carSpeed;
  }
  if (isMovingDown && carY + carHeight < canvas.height) {
    carY += carSpeed;
  }

  //object
  drawObject();
  objectY += objectSpeed;

  if (objectY > canvas.height) {
    objectY = 0;
    objectWidth = randomNumber(80, 350);
    objectX = randomNumber(0, 450);
    score += 1;
  }

  if (
    objectX < carX + carWidth &&
    objectX + objectWidth > carX &&
    objectY < carY + carHeight &&
    objectHeight + objectY > carY
  ) {
    gameOver = true;
  }
  //plays the game aslong its not game over
  if (!gameOver) {
    animateId = requestAnimationFrame(animate);
  } else {
    objectY = 0;
    objectX = 150;
    objectWidth = 150;
    objectHeight = 15;
    objectSpeed = 6;
    carHeight = 100;
    carWidth = 50;
    carY = canvas.height / 2 + 150;
    carX = canvas.width / 2 - 24;
    score = 0;
    cancelAnimationFrame(animateId);
    gameOver = false;
    intro.style.display = "block";
    canvas.style.display = "none";
  }
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    if (!gameOver) {
      startGame();
    }
  };

  document.addEventListener("keypress", (event) => {
    console.log(event);
    if (event.key === "a") {
      //moves car left
      isMovingLeft = true;
    }
    if (event.key === "d") {
      //moves car right
      isMovingRight = true;
    }
    if (event.key === "w") {
      //moves car up
      isMovingUp = true;
    }
    if (event.key === "s") {
      //moves car down
      isMovingDown = true;
    }
  });

  document.addEventListener("keyup", () => {
    // Stop moving the car
    isMovingLeft = false;
    isMovingRight = false;
    isMovingDown = false;
    isMovingUp = false;
  });

  function startGame() {
    animate();
    intro.style.display = "none";
    canvas.style.display = "block";
  }
};
