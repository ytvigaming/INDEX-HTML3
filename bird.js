// script.js

const gameContainer = document.getElementById('gameContainer');
const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score');

let birdY = 200;
let gravity = 0.5;
let velocity = 0;
let isGameOver = false;
let score = 0;

// Function to make the bird jump
function jump() {
    if (!isGameOver) {
        velocity = -10;
    }
}

// Key and click listeners to control the bird
document.addEventListener('keydown', jump);
document.addEventListener('click', jump);

// Game loop
function gameLoop() {
    if (isGameOver) return;

    // Apply gravity to bird
    velocity += gravity;
    birdY += velocity;
    bird.style.top = birdY + 'px';

    // Check if the bird hits the ground or top of the game container
    if (birdY >= 570 || birdY <= 0) {
        gameOver();
    }

    // Generate pipes and check collisions
    handlePipes();

    // Update score
    scoreDisplay.textContent = score;

    // Repeat the game loop
    requestAnimationFrame(gameLoop);
}

// Pipe generation and collision check
const pipes = [];
let pipeInterval = 0;

function handlePipes() {
    pipeInterval++;

    // Generate pipes every 90 frames
    if (pipeInterval % 90 === 0) {
        createPipe();
    }

    // Move pipes and check for collisions
    pipes.forEach(pipe => {
        pipe.x -= 2;
        pipe.topPipe.style.left = pipe.x + 'px';
        pipe.bottomPipe.style.left = pipe.x + 'px';

        // Collision detection
        if (
            pipe.x < 80 && pipe.x > 20 &&
            (birdY < pipe.height || birdY > pipe.height + 150)
        ) {
            gameOver();
        }

        // Remove pipes that go off screen and increment score
        if (pipe.x < -60) {
            pipes.shift();
            score++;
        }
    });
}

// Function to create pipes
function createPipe() {
    const pipeHeight = Math.floor(Math.random() * 200) + 100;

    const topPipe = document.createElement('div');
    topPipe.classList.add('pipe');
    topPipe.style.height = pipeHeight + 'px';
    topPipe.style.top = '0px';
    topPipe.style.left = '400px';

    const bottomPipe = document.createElement('div');
    bottomPipe.classList.add('pipe');
    bottomPipe.style.height = (600 - pipeHeight - 150) + 'px';
    bottomPipe.style.bottom = '0px';
    bottomPipe.style.left = '400px';

    gameContainer.appendChild(topPipe);
    gameContainer.appendChild(bottomPipe);

    pipes.push({
        x: 400,
        height: pipeHeight,
        topPipe: topPipe,
        bottomPipe: bottomPipe
    });
}

// End the game
function gameOver() {
    isGameOver = true;
    alert('Game Over! Your score: ' + score);
    location.reload();
}

// Start the game loop
gameLoop();
