// Selecting elements from the HTML document
const messageElement = document.querySelector('.message');
const numberElement = document.querySelector('.number');
const scoreElement = document.querySelector('.score');
const guessInput = document.querySelector('.guess');
const againButton = document.querySelector('.again');
const highscoreElement = document.querySelector('.highscore');

let secretNumber;
let score;
let highscore;

// Function to display a message
function displayMessage(message) {
    messageElement.textContent = message;
}

// Function to generate a random secret number
function generateSecretNumber() {
    return Math.trunc(Math.random() * 20) + 1;
}

// Initialize the game
function initializeGame() {
    secretNumber = generateSecretNumber();
    score = 20;
    highscore = 0;

    numberElement.textContent = '?';
    scoreElement.textContent = score;
    guessInput.value = '';
    displayMessage('Start guessing...');
    document.querySelector('body').style.backgroundColor = '#222';
    numberElement.style.width = '15rem';
}

// Check the user's guess
function checkGuess() {
    const guess = Number(guessInput.value);

    // When there is no input
    if (!guess || guess % 1 !== 0 || guess < 1 || guess > 20) {
        displayMessage('⛔ Please enter a valid number between 1 and 20!');

        // When the guess is correct
    } else if (guess === secretNumber) {
        displayMessage('🎉 Correct number!');
        document.querySelector('body').style.backgroundColor = 'green';
        numberElement.style.width = '30rem';
        numberElement.textContent = secretNumber;

        if (score > highscore) {
            highscore = score;
            highscoreElement.textContent = highscore;
        }

        // When the guess is incorrect
    } else {
        if (score > 1) {
            displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
            score--;
            scoreElement.textContent = score;
        } else {
            displayMessage('💣 Game over! You lost.');
            scoreElement.textContent = 0;
        }
    }
}

// Event listeners
document.querySelector('.check').addEventListener('click', checkGuess);

guessInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

againButton.addEventListener('click', initializeGame);

// Initialize the game when the page loads
initializeGame();