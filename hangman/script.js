let secret_word = 'SCREEN';
secret_word = secret_word.split("");

// Create an array with the same length as the word, filled with hyphens
let to_guess = Array(secret_word.length).fill('-');

let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
alphabet = alphabet.split("");

let chances = 5;

const showHiddenWord = () => {
    guess.innerHTML = "";
    for (let letter of to_guess) {
        guess.innerHTML += `<p>${letter}</p>`;
    }
}

const pick_letter = document.querySelector(".pick_letter");
const guess = document.querySelector(".guess");
const gameOver = document.querySelector(".fail");

// Clears the display if page was already use.

for (let letter of alphabet) {
    pick_letter.innerHTML += `<p>${letter}</p>`;
}

pick_letter.addEventListener('click', (event) => {

    if (event.target.tagName === 'P') {
        
        const clickedElement = event.target;
        const clickedLetter = event.target.innerText;
        console.log(`Letter Clicked: ${clickedLetter}`);
        
        if (secret_word.includes(clickedLetter)) {
            for (let i = 0; i < secret_word.length; i++) {

                if (secret_word[i] === clickedLetter) {
                    to_guess[i] = clickedLetter;
                    clickedElement.style.backgroundColor = "green";
                }
            }
            console.log(chances);
        }
        else {
            clickedElement.style.backgroundColor = "red";
            chances--;
            console.log(chances);

            drawHangman(chances);

            if (chances === 0) 
            {    
                youLost();
            }
        }

        if (to_guess.length === secret_word.length)
        {
            youWin();
        }

        showHiddenWord();

    }
});

showHiddenWord();

console.log(to_guess);

const youLost = () => {
    gameOver.style.display = "block";
}

const youWin = () => {
    gameOver.style.display = "block";
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// UPPER BAR
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'white';
ctx.strokeRect(100, 20, 70, 5);
ctx.closePath();

// COLUMN
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'white';
ctx.strokeRect(105, 20, 5, 100);
ctx.closePath();

// BASE
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'white';
ctx.strokeRect(100, 115, 15, 5);
ctx.closePath();

// ROPE
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'white';
ctx.strokeRect(160, 27, 1, 15);
ctx.closePath();


// BODY

const drawHangman = (remainingChances) => {
    // Optional: ctx.clearRect(150, 40, 50, 100); // Only clear the area where the man is

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'white';

    switch (remainingChances) {
        case 1: // First mistake: Head
            ctx.beginPath();
            ctx.arc(160, 50, 7, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            break;
        case 2: // Second mistake: Torso
            ctx.beginPath();
            ctx.moveTo(160, 57);
            ctx.lineTo(160, 80);
            ctx.stroke();
            break;
        case 3: // Third mistake: Arms (using your arc logic)
            ctx.beginPath();
            ctx.arc(160, 73, 12, 1 * Math.PI, 2 * Math.PI);
            ctx.stroke();
            break;
        case 4: // Fourth mistake: Legs
            ctx.beginPath();
            ctx.arc(160, 90, 12, 1 * Math.PI, 2 * Math.PI);
            ctx.stroke();
            break;
        case 0: // Final mistake: Game Over details?
            // Maybe draw an 'X' for eyes here
            break;
    }
};
