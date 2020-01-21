// Example
const options = [
    'rock', // 1
    'paper', // 2
    'scissors' // 3
];

// Mode of play - either random or user input
let rnd = false;
let winner = 0;
let leftPlayerCounter = 0;
let rightPlayerCounter = 0;

function randomPlay() {
    rnd = true;
    // Random number from 1-3
    let leftPlayer = getRand();

    // Sleep time expects milliseconds
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    
    // Usage!
    sleep(500).then(() => {
        let rightPlayer = getRand();

        pickWinner(leftPlayer, rightPlayer);
    });
}

function getRand() {
    return Math.floor(Math.random() * 3) + 1
}

/**
 * 
 * @param {Number} choice1 Left player choice 1-3
 * @param {Number} choice2 Right player choice 1-3
 * @param {String} caller Either random play game or user input
 */
function pickWinner(choice1, choice2) {
    let leftEl = document.querySelectorAll('#left-player .left-choice')[0];
    let rightEl = document.querySelectorAll('#right-player .right-choice')[0];

    leftEl.innerHTML = options[choice1 - 1];
    rightEl.innerHTML = options[choice2 - 1];
    winner = 0;
    // 1st scenario - both are equal
    if (choice1 == choice2) {
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
    
    let winnerDisplay = 'no winner';
    let winnerColor = 'lightgreen';
    let loserColor = 'lightcoral';

    document.getElementById('left-player').setAttribute('style', 'background-color: '+ loserColor);
    document.getElementById('right-player').setAttribute('style', 'background-color: '+ loserColor);
    
    if (winner == 1) {
        winnerDisplay = 'Left player wins!';
        document.getElementById('left-player').setAttribute('style', 'background-color: '+ winnerColor);
    } else if (winner == 2) {
        winnerDisplay = 'Right player wins!'; 
        document.getElementById('right-player').setAttribute('style', 'background-color: '+ winnerColor);
    }

    let winnerEl = document.getElementById('winner');

    winnerEl.innerHTML = winnerDisplay;
}

function userPlay() {
    rnd = false;
}

/**
 * @description Equal choices
 */
function repeatPlay() {
    let scBtn = document.getElementsByClassName('sc-btn');

    for (let i = 0; i <= 1; i++) {
        scBtn[i].disabled = true;
        scBtn[i].setAttribute('background-color', '#6a946c');
        scBtn[i].setAttribute('color', 'lightgray');
    }

    setTimeout(()=> {
        if (rnd) {
            randomPlay();
        } else {
            userPlay();
        }

        for (let i = 0; i <= 1; i++) {
            scBtn[i].disabled = false;
            scBtn[i].setAttribute('background-color', '#4CAF50');
            scBtn[i].setAttribute('color', 'white');
        }
    }, 3000);  
}