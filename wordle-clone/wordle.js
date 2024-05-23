// GLOBALS
let currentGuessNumber = "1";
const max = 1;
let wordOfTheDay;
let puzzleNumber;

// INIT CONTAINERS FOR DATA DISPLAY
const wordOfTheDayContainer = document.querySelector(
  ".word-of-the-day-container"
);

// SET CURRENT ROW AND ADD LISTENERS
let currentRow = document.querySelector(`#r${currentGuessNumber}`);
currentRow.addEventListener("keydown", handleInput);

// INIT FOCUS AND ATTRIBUTES
let unDisabledBoxes = currentRow.querySelectorAll("input");
unDisabledBoxes.forEach((box) => {
  box.removeAttribute("disabled");
});
let initBox = document.querySelector(`#r${currentGuessNumber}l1`);
initBox.focus();

// FETCH
getWordOfTheDay();
async function getWordOfTheDay() {
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await res.json();

  wordOfTheDay = data.word;
  puzzleNumber = data.puzzleNumber;

  wordOfTheDayContainer.innerText = `Today's word: ${wordOfTheDay}. Puzzle Number: ${puzzleNumber}`;
}

// MAIN GAME BODY FLOW
function handleInput(event) {
  if (
    isLetter(event.key) ||
    event.key === "Backspace" ||
    event.key === "Delete"
  ) {
    setTimeout(function () {
      let guess = Array(5);

      for (let i = 0; i < guess.length; i++) {
        guess[i] = document.querySelector(
          `#r${currentGuessNumber}l${i + 1}`
        ).value;
      }
      const wordToValidate = guess.join("");
      console.log(wordToValidate);
      console.log(guess);

      if ((wordToValidate.length === 5) & !guess.includes("")) {
        console.log("sending to validate");
        const guessJSON = { word: wordToValidate };
        handleValidate(guessJSON);
      }
    });

    if (
      (event.key === "Backspace") &
      (event.target.previousElementSibling != null)
    ) {
      setTimeout(function () {
        event.target.previousElementSibling.focus();
      });
    }
  } else {
    event.preventDefault();
  }

  setTimeout(function () {
    if (
      (event.target.nextElementSibling != null) &
      (event.key != "Backspace")
    ) {
      event.target.nextElementSibling.focus();
    }
  });
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
  let currentGuess = guessConfirmation.word;

  if (guessConfirmation.validWord === true) {
    compareWord(wordOfTheDay, currentGuess);
  }
}

function compareWord(wordOfTheDay, currentGuess) {
  if (wordOfTheDay === currentGuess) {
    alert("YOU WON!");
    currentRow.style.backgroundColor = "green";
  } else {
    // split both words into arrays, and compare one by one
    const wordSplit = wordOfTheDay.split("");
    const guessSplit = currentGuess.split("");

    // check if the letters include
    for (let i = 0; i < wordSplit.length; i++) {
      if (guessSplit.includes(wordSplit[i])) {
        // find index of included letter
        let index = guessSplit.indexOf(wordSplit[i]);
        let includedLetter = document.querySelector(
          `#r${currentGuessNumber}l${index + 1}`
        );
        includedLetter.style.backgroundColor = "yellow";
      }
    }

    for (let j = 0; j < wordSplit.length; j++) {
      if (wordSplit[j] === guessSplit[j]) {
        let exactLetter = document.querySelector(
          `#r${currentGuessNumber}l${j + 1}`
        );
        exactLetter.style.backgroundColor = "green";
      }
    }
  }

  handleNextGuess();
}

function handleNextGuess() {
  let newGuessNumberAsInt = parseInt(currentGuessNumber) + 1;
  currentGuessNumber = newGuessNumberAsInt.toString();
  let currentBox = document.querySelector(`#r${currentGuessNumber}l1`);
  currentRow = document.querySelector(`#r${currentGuessNumber}`);

  unDisabledBoxes = currentRow.querySelectorAll("input");
  unDisabledBoxes.forEach((box) => {
    box.removeAttribute("disabled");
  });
  currentRow.addEventListener("keydown", handleInput);
  currentBox.focus();
}

// HELPERS
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
