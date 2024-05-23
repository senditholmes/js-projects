// GLOBALS
const currentGuessNumber = "1";
const max = 1;
let wordOfTheDay;
let puzzleNumber;

// ELEMENTS
const currentRow = document.querySelector(`#r${currentGuessNumber}`);
currentRow.addEventListener("keydown", handleInput);
const wordOfTheDayContainer = document.querySelector(
  ".word-of-the-day-container"
);
const firstBox = document.querySelector("#r1l1");
firstBox.focus();

// HELPERS
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

// EVENT LISTENER
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

  // if the current event input = 1
  // AND previous keypress was NOT backspace, auto next focus
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
  } else {
    alert("WRONG GUESS");
  }
}

async function getWordOfTheDay() {
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await res.json();

  wordOfTheDay = data.word;
  puzzleNumber = data.puzzleNumber;

  wordOfTheDayContainer.innerText = `Today's word: ${wordOfTheDay}. Puzzle Number: ${puzzleNumber}`;
}

getWordOfTheDay();
