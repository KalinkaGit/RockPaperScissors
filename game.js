const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const valid = ['r', 'rock', 'p', 'paper', 'c', 'cissors'];
const wChoices = {
    rock: {
        name: "rock",
        wins: "cissors",
        loses: "paper"
    },
    paper: {
        name: "paper",
        wins: "rock",
        loses: "cissors"
    },
    cissors: {
        name: "cissors",
        wins: "paper",
        loses: "rock"
    }
}

let score = [0, 0];

function AskNew() {
    rl.question('New Game? [Y/n] ', newG => {
        if (newG.toLowerCase() == "y") {
            NewGame();
        } else {
            process.exit(1);
        }
    });
}

async function NewGame() {
    let keys = Object.keys(wChoices);
    let botChoice = wChoices[keys[keys.length * Math.random() << 0]];
    let choice = false;

    while (!choice) {
        choice = await AskChoice();
    }

    CheckWinner(choice, botChoice);
}

function AskChoice() {
    return new Promise(resolve => {
        rl.question('What do you pick? [Rock/Paper/Cissors] ', choice => {
            choice = choice.toLocaleLowerCase();

            if (valid.includes(choice)) {
                resolve(choice);
            } else {
                console.log('Invalid!');
                resolve(false);
            }
        });
    });
}

function CheckWinner(c, bc) {
    for (possibilities in wChoices) {
        if (wChoices[possibilities].name.startsWith(c)) {
            if (wChoices[possibilities].name == bc.name) {
                console.log(`Equality! (${score[0]}-${score[1]})`);
            } else if (wChoices[possibilities].wins == bc.name) {
                score = [score[0] + 1, score[1]];
                console.log(`You win! (${score[0]}-${score[1]})`);
            } else if (wChoices[possibilities].loses == bc.name) {
                score = [score[0], score[1] + 1];
                console.log(`You lose! (${score[0]}-${score[1]})`);
            }
            
            AskNew();
        }
    }
}

AskNew();
