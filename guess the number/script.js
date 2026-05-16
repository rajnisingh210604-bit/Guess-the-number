// Game variables
let secret;
let attempts;
let maxAttempts = 7;
let gameOver;

// Start a new game
function newGame() {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameOver = false;

  document.getElementById('guess-input').value = '';
  document.getElementById('guess-input').disabled = false;
  document.getElementById('btn-guess').disabled = false;
  document.getElementById('chips').innerHTML = '';
  document.getElementById('attempts-left').textContent = maxAttempts;

  setFeedback('', 'Make your first guess!');
}

// Called every time the user clicks Guess
function makeGuess() {
  if (gameOver) return;

  let input = document.getElementById('guess-input');
  let guess = parseInt(input.value);

  // Validate input
  if (isNaN(guess) || guess < 1 || guess > 100) {
    setFeedback('', '⚠️ Please enter a number between 1 and 100.');
    return;
  }

  attempts++;
  let attemptsRemaining = maxAttempts - attempts;
  document.getElementById('attempts-left').textContent = attemptsRemaining;

  // This is where the while loop logic lives
  // In Python it would be: while attempts < maxAttempts
  if (guess < secret) {
    setFeedback('low', `⬆️ ${guess} is too low! Try higher.`);
    addChip(guess, 'low');
  } else if (guess > secret) {
    setFeedback('high', `⬇️ ${guess} is too high! Try lower.`);
    addChip(guess, 'high');
  } else {
    setFeedback('win', `🎉 Correct! The number was ${secret}. You got it in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!`);
    addChip(guess, 'win');
    endGame();
    return;
  }

  // Check if attempts are exhausted (while loop's exit condition)
  if (attempts >= maxAttempts) {
    setFeedback('lose', `😢 Game over! The number was ${secret}.`);
    endGame();
  }

  input.value = '';
  input.focus();
}

// Update the feedback box
function setFeedback(type, message) {
  let fb = document.getElementById('feedback');
  fb.className = 'feedback ' + type;
  fb.textContent = message;
}

// Add a guess chip to history
function addChip(number, type) {
  let chip = document.createElement('span');
  chip.className = 'chip ' + type;
  chip.textContent = type === 'low' ? number + ' ↑' : type === 'high' ? number + ' ↓' : number + ' ✓';
  document.getElementById('chips').appendChild(chip);
}

// Disable input when game ends
function endGame() {
  gameOver = true;
  document.getElementById('guess-input').disabled = true;
  document.getElementById('btn-guess').disabled = true;
}

// Allow pressing Enter to guess
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('guess-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') makeGuess();
  });

  newGame(); // Start the game on page load
});