const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const levelDisplay = document.getElementById("level");
const gameContainer = document.querySelector(".game-container");

let ballSpeedX = 4;
let ballSpeedY = -4;
let ballPosition = { x: 300, y: 200 };
let paddlePosition = { x: 250 };
let score = 0;
let lives = 3;
let level = 1;
let bricks = [];
let gameRunning = false;

const brickRows = 5;
const brickColumns = 10;
const brickWidth = 50;
const brickHeight = 20;

document.getElementById('startBtn').addEventListener('click', () => {
  startGame();
  gameRunning = true;
  gameLoop();
});


function createBricks() {
  for (let i = 0; i < brickRows; i++) {
    for (let j = 0; j < brickColumns; j++) {
      const brick = document.createElement("div");
      brick.classList.add("brick");
      brick.style.top = `${i * (brickHeight + 5)}px`;
      brick.style.left = `${j * (brickWidth + 5)}px`;
      bricks.push(brick);
      gameContainer.appendChild(brick);
    }
  }
}

function moveBall() {
  ballPosition.x += ballSpeedX;
  ballPosition.y += ballSpeedY;

  // Ball collision with walls
  if (ballPosition.x + 12 >= gameContainer.offsetWidth || ballPosition.x <= 0)
    ballSpeedX = -ballSpeedX;
  if (ballPosition.y <= 0) ballSpeedY = -ballSpeedY;

  // Ball collision with paddle (check if ball is above paddle and within paddle's horizontal range)
  if (
    ballPosition.y + 12 >= paddle.offsetTop &&
    ballPosition.y + 12 <= paddle.offsetTop + 10 &&
    ballPosition.x + 12 >= paddlePosition.x &&
    ballPosition.x <= paddlePosition.x + 100
  ) {
    // Ensuring that the ball doesn't pass through the paddle by adjusting its position
    ballPosition.y = paddle.offsetTop - 12; // Set ball just above paddle to avoid passing through
    ballSpeedY = -ballSpeedY; // Invert ball direction when it hits paddle
    score++;
    scoreDisplay.textContent = score;
  }

  // Ball out of bounds (below the game area)
  if (ballPosition.y + 12 >= gameContainer.offsetHeight) {
    lives--;
    livesDisplay.textContent = lives;
    if (lives > 0) {
      resetBall();
    } else {
      alert("Game Over! Skor kamu: " + score);
      startGame();
    }
  }

  // Update ball position
  ball.style.left = `${ballPosition.x}px`;
  ball.style.top = `${ballPosition.y}px`;
}

function movePaddle(event) {
  const paddleSpeed = 30 + (level - 1) * 2; // Paddle speed increases by 2 with each level
  const maxLeft = 0;
  const maxRight = gameContainer.offsetWidth - paddle.offsetWidth;

  if (event.key === "ArrowLeft") {
    paddlePosition.x = Math.max(maxLeft, paddlePosition.x - paddleSpeed);
  } else if (event.key === "ArrowRight") {
    paddlePosition.x = Math.min(maxRight, paddlePosition.x + paddleSpeed);
  }

  paddle.style.left = `${paddlePosition.x}px`;
}

function resetBall() {
  ballPosition = { x: 300, y: 200 };
  ball.style.left = `${ballPosition.x}px`;
  ball.style.top = `${ballPosition.y}px`;
}

function startGame() {
  ballPosition = { x: 300, y: 200 };
  ballSpeedX = 4 + (level - 1) * 3; // Bola speed increases by 3 with each level
  ballSpeedY = -4 - (level - 1) * 3; // Bola speed increases by 3 with each level
  paddlePosition.x = 250;
  score = 0;
  lives = 3;
  level = 1;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  levelDisplay.textContent = level;
  ball.style.left = `${ballPosition.x}px`;
  ball.style.top = `${ballPosition.y}px`;
  paddle.style.left = `${paddlePosition.x}px`;

  bricks.forEach((brick) => brick.remove());
  bricks = [];
  createBricks();
}

function detectBrickCollision() {
  bricks.forEach((brick) => {
    if (
      !brick.classList.contains("break") &&
      ballPosition.y <= brick.offsetTop + brickHeight &&
      ballPosition.y + 12 >= brick.offsetTop &&
      ballPosition.x + 12 >= brick.offsetLeft &&
      ballPosition.x <= brick.offsetLeft + brickWidth
    ) {
      ballSpeedY = -ballSpeedY;
      brick.classList.add("break");
      score += 10;
      scoreDisplay.textContent = score;

      // Check if all bricks are broken
      if (bricks.every((brick) => brick.classList.contains("break"))) {
        level++;
        levelDisplay.textContent = level;

        // Tambahkan nyawa maksimal 5
        if (lives < 5) lives++;
        {
          livesDisplay.textContent = lives;
        }

        ballSpeedX += 3;
        ballSpeedY -= 3;
        paddlePosition.x = 250;
        resetBall();

        bricks.forEach((brick) => brick.classList.remove("break"));
      }
    }
  });
}

function gameLoop() {
  if (!gameRunning) return; // Jangan lanjut jika belum diklik tombol "Main"
  
  moveBall();
  detectBrickCollision();
  requestAnimationFrame(gameLoop);
}


window.addEventListener("keydown", movePaddle);

createBricks();
