// Select the game area
const gameArea = document.getElementById("game-area");

// Load sound files
const correctSound = new Audio("audio/correct.wav");
const incorrectSound = new Audio("audio/wrong.wav");
const gameOverSound = new Audio("audio/gameover.wav");
const restartSound = new Audio("audio/start.wav"); // New restart sound

// Function to generate a random color
function getRandomColor() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to generate a random position
function getRandomPosition() {
  const areaWidth = gameArea.offsetWidth;
  const areaHeight = gameArea.offsetHeight;

  const x = Math.random() * (areaWidth - 50); // 50 is the max object size
  const y = Math.random() * (areaHeight - 50);

  return { x, y };
}

// Function to create a random object
function createRandomObject() {
  const object = document.createElement("div");
  object.classList.add("game-object");

  // Set random color
  const color = getRandomColor();
  object.style.backgroundColor = color;

  // Set random position
  const position = getRandomPosition();
  object.style.left = `${position.x}px`;
  object.style.top = `${position.y}px`;

  // Add click event listener
  object.addEventListener("click", () => {
    if (color === targetColor) {
      score += 10; // Correct click: Increase score
      correctSound.play(); // Play correct sound
    } else {
      score -= 5; // Wrong click: Decrease score
      wrongClicks++;
      incorrectSound.play(); // Play incorrect sound
      if (wrongClicks >= maxWrongClicks) {
        gameOver(); // Trigger game over
      }
    }
    updateScore();
    object.remove(); // Remove object after click
  });

  // Append to the game area
  gameArea.appendChild(object);

  // Remove the object after a set time
  setTimeout(() => {
    object.remove();
  }, 2000); // Object stays for 2 seconds
}

// Select DOM elements
const targetColorDisplay = document.getElementById("color-display");
const scoreDisplay = document.getElementById("score");

// Game state variables
let targetColor = "";
let score = 0;
let wrongClicks = 0;
const maxWrongClicks = 3; // Max wrong clicks allowed

// Function to update the target color
function updateTargetColor() {
  targetColor = getRandomColor();
  targetColorDisplay.textContent = targetColor;
  targetColorDisplay.style.color = targetColor; // Update text color for visibility
}

// Function to update the score
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Function to handle Game Over
function gameOver() {
  gameOverSound.play(); // Play game over sound
  alert("Game Over! You've made too many wrong clicks.");
  
  // Stop the game (clear intervals)
  clearInterval(objectGenerationInterval);
  clearInterval(targetColorChangeInterval);
  
  // Show Restart Button
  document.getElementById("restart-button").style.display = "inline-block"; 
}

// Function to restart the game
function restartGame() {
  restartSound.play(); // Play restart sound when the game restarts
  
  // Reset game state variables
  score = 0;
  wrongClicks = 0;
  updateScore();  // Reset score on UI
  updateTargetColor();  // Reset target color
  document.getElementById("restart-button").style.display = "none";  // Hide the restart button
  
  // Restart the game intervals
  objectGenerationInterval = setInterval(() => createRandomObject(), 1000);
  targetColorChangeInterval = setInterval(() => updateTargetColor(), 5000);
}

// Initialize the target color
updateTargetColor();

// Generate objects at intervals
let objectGenerationInterval = setInterval(() => {
  createRandomObject();
}, 1000); // Generate a new object every second

// Change the target color every 5 seconds
let targetColorChangeInterval = setInterval(() => {
  updateTargetColor();
}, 5000);
