// GLOBALS
const currentGuessNumber = "1";

// ELEMENTS
const currentRow = document.querySelector(`#r${currentGuessNumber}`);
currentRow.addEventListener("keyup", handleInput);
const wordOfTheDayContainer = document.querySelector(
  ".word-of-the-day-container"
);

// HELPERS
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

// EVENT LISTENER
function handleInput(event) {
  let guess = Array(5);
  guess[0] = document.querySelector(`#r${currentGuessNumber}l1`).innerHTML;
  guess[1] = document.querySelector(`#r${currentGuessNumber}l2`).innerHTML;
  guess[2] = document.querySelector(`#r${currentGuessNumber}l3`).innerHTML;
  guess[3] = document.querySelector(`#r${currentGuessNumber}l4`).innerHTML;
  guess[4] = document.querySelector(`#r${currentGuessNumber}l5`).innerHTML;
  const wordToValidate = guess.join("");
  console.log(wordToValidate);
  console.log(guess);

  if (!guess.includes("<br>")) {
    const guessJSON = { word: wordToValidate };
    handleValidate(guessJSON);
  }
}

async function handleValidate(guessJSON) {
  const response = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guessJSON),
  });
  const guessConfirmation = await response.json();

  if (guessConfirmation.validWord === true) {
    console.log("VALID WORD + CORRECT LENGTH");
  } else {
    console.log("Word is not valid mate");
  }
}

async function getWordOfTheDay() {
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await res.json();

  const wordOfTheDay = data.word;
  const puzzleNumber = data.puzzleNumber;

  wordOfTheDayContainer.innerText = `Today's word: ${wordOfTheDay}. Puzzle Number: ${puzzleNumber}`;
}

// PROGRAM START

function init() {
  getWordOfTheDay();
}

init();
