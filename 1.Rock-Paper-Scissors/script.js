// Example
const options = [
    'Rock', // 1
    'Paper', // 2
    'Scissors' // 3
];

// Mode of play - either random or user input
let rnd = true;
// Stores the winner - 1: left player, 2: right player, 0: game not started
let winner = 0;
// Stores number of wins for the left player
let leftPlayerPoints = 0;
// Stores number of wins for the right player
let rightPlayerPoints = 0;
// Stores number of wins before game over
let winPoints = 10;
// Stores either there is a winner or not;
let haveWinner = false;

let layout = lpPointsEl = rpPointsEl = rpc1 =
    rpc2 = rpc3 = winnerEl = rndEl = userInput =
    leftEl = rightEl = null;

// Init
setTimeout(() => {
    // Loader
    layout = document.getElementsByClassName('layout')[0];
    // Remove loader
    layout.remove();

    lpPointsEl = document.getElementById('lp-points');
    rpPointsEl = document.getElementById('rp-points');

    // Set initial points(0) to both players
    lpPointsEl.innerHTML = leftPlayerPoints;
    rpPointsEl.innerHTML = rightPlayerPoints;

    rpc1 = document.getElementsByClassName('rpc1')[0];
    rpc2 = document.getElementsByClassName('rpc2')[0];
    rpc3 = document.getElementsByClassName('rpc3')[0];

    // Hide right user prompt fields
    rpc1.style.visibility = 'hidden';
    rpc3.style.visibility = 'hidden';

    // Store elements to their corresponding variables
    winnerEl = document.getElementById('winner');
    rndEl = document.getElementById('rnd');
    userInput = document.getElementById('user-input');
    leftEl = document.querySelectorAll('#left-player .left-choice')[0];
    rightEl = document.querySelectorAll('#right-player span#rpc2')[0];
});

function randomPlay() {
    rnd = true;
    // Random number from 1-3
    let leftPlayer = getRand();

    // Disable user play
    userInput.disabled = true;
    userInput.classList.add('disabled');

    // Hide right user prompt fields
    rpc1.style.visibility = 'hidden';
    rpc3.style.visibility = 'hidden';

    // Set white background to all choices
    window['rpc1'].style.backgroundColor = 'white';
    window['rpc2'].style.backgroundColor = 'white';
    window['rpc3'].style.backgroundColor = 'white';

    // Sleep time expects milliseconds
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    
    // Wait half a sec before picking choice for right player (Math.random() problem)
    sleep(500).then(() => {
        let rightPlayer = getRand();

        pickWinner(leftPlayer, rightPlayer);
    });
}

function getRand() {
    return Math.floor(Math.random() * 3) + 1
}

/**
 * @description Decides the winner of the current turn and the game in general 
 * 
 * @param {Number} choice1 Left player choice 1-3
 * @param {Number} choice2 Right player choice 1-3
 * @param {String} caller Either random play game or user input
 */
function pickWinner(choice1, choice2) {
    if (haveWinner) {
        // Reset points for both players
        lpPointsEl.innerHTML = 0;
        rpPointsEl.innerHTML = 0;

        haveWinner = false;
    }

    // Display selected choice
    leftEl.innerHTML = options[choice1 - 1];

    if (rnd) {
        rightEl.innerHTML = options[choice2 - 1];
    }
    // No winner yet
    winner = 0;
    // 1st scenario - both are equal
    if (choice1 == choice2 && rnd) {
        // Repeat play only for random plays
        repeatPlay();
    } else if (choice1 == 1 && choice2 == 3) { // Rock beats scissors
        winner = 1; // Left player wins
    } else if (choice2 == 1 && choice1 == 3) { // Rock beats scissors
        winner = 2; // Right player wins
    } else if (choice1 == 2 && choice2 == 1) { // Paper beats rock
        winner = 1; // Left player wins
    } else if (choice2 == 2 && choice1 == 1) { // Paper beats rock
        winner = 2; // Right player wins
    } else if (choice1 == 3 && choice2 == 2) { // Scissors beat paper
        winner = 1; // Left player wins
    } else if (choice2 == 3 && choice1 == 2) { // Scissors beat paper
        winner = 2; // Right player wins
    }
    
    let winnerDisplay = 'Draw! Picking again...';
    let winnerColor = 'lightgreen';
    let loserColor = 'lightcoral';

    if (!rnd) {
        // Different message when user is picking
        winnerDisplay = 'Draw! Pick an option from the right display:';
    }

    // Set initial color of both screens to be red
    document.getElementById('left-player').setAttribute('style', 'background-color: '+ loserColor);
    document.getElementById('right-player').setAttribute('style', 'background-color: '+ loserColor);
    
    if (winner == 1) {
        // Assign a new point
        leftPlayerPoints += 1;
        // Set text
        winnerDisplay = 'Left player wins!';
        // Change color to green
        document.getElementById('left-player').setAttribute('style', 'background-color: '+ winnerColor);
        // Update points
        lpPointsEl.innerHTML = leftPlayerPoints;
    } else if (winner == 2) {
        // Assign a new point
        rightPlayerPoints += 1;
        // Set text
        winnerDisplay = 'Right player wins!';
        // Change color to green
        document.getElementById('right-player').setAttribute('style', 'background-color: '+ winnerColor);
        // Update points
        rpPointsEl.innerHTML = rightPlayerPoints;
    }
    // Set game winner: when 10 points reached
    if (leftPlayerPoints == winPoints) {
        winnerDisplay = 'Left player wins the game! Game over!';
        haveWinner = true;
    } else if (rightPlayerPoints == winPoints) {
        winnerDisplay = 'Right player wins the game! Game over!';
        haveWinner = true;
    }

    if (haveWinner) {
        // Reset players points
        leftPlayerPoints = 0;
        rightPlayerPoints = 0;
        // Remove disabled for buttons
        userInput.disabled = false;
        userInput.classList.remove('disabled');

        rndEl.disabled = false;
        rndEl.classList.remove('disabled');
    }

    winnerEl.innerHTML = winnerDisplay;
}

function userPlay() {
    rnd = false;

    // Set white background to all choices
    window['rpc1'].style.backgroundColor = 'white';
    window['rpc2'].style.backgroundColor = 'white';
    window['rpc3'].style.backgroundColor = 'white';

    if (haveWinner) {
        // Reset background color for both containers when there was already one game played
        document.getElementsByClassName('container')[0].style = '#F2F2F2';
        document.getElementsByClassName('container')[1].style = '#F2F2F2';
        // Reset text for left player choice when there was already one game played
        leftEl.innerHTML = '';
    }

    // Disable random play button
    rndEl.disabled = true;
    rndEl.classList.add('disabled');

    // Show prompt buttons
    rpc1.style.visibility = 'visible';
    rpc3.style.visibility = 'visible';

    // Fill prompt buttons with values
    rpc1.children[0].innerHTML = options[0];
    rpc2.children[0].innerHTML = options[1];
    rpc3.children[0].innerHTML = options[2];

    // Reset points for both players
    lpPointsEl.innerHTML = 0;
    rpPointsEl.innerHTML = 0;

    // Set user message
    winnerEl.innerHTML = 'Pick an option from the right display:';
}

/**
 * @description Equal choices
 */
function repeatPlay() {
    if (rnd) { // Wait 3 seconds between random plays
        document.getElementsByTagName('body')[0].appendChild(layout);

        setTimeout(()=> {
            randomPlay();

            layout.remove();
        }, 3000);
    } else { // No need to wait 3 seconds when user is picking
        userPlay();
    }
}

function userChoice(choice) {
    if (rnd) {
        return;
    }
    // Set white background to all choices
    window['rpc1'].style.backgroundColor = 'white';
    window['rpc2'].style.backgroundColor = 'white';
    window['rpc3'].style.backgroundColor = 'white';
    // Random number from 1-3
    let leftPlayer = getRand();
    // Colorize the selected choice
    window['rpc'+ choice].style.backgroundColor = 'skyblue';
    // Play!
    pickWinner(leftPlayer, choice);
}