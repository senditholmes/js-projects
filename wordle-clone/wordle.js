const wordOfTheDayContainer = document.querySelector(
  ".word-of-the-day-container"
);

const guessButton = document.querySelector(".guess-button");
guessButton.addEventListener("click", handleGuess);

function handleGuess(event) {
  let guess = [];
  guess[0] = document.querySelector("#row1letter1").value;
  guess[1] = document.querySelector("#row1letter2").value;
  guess[2] = document.querySelector("#row1letter3").value;
  guess[3] = document.querySelector("#row1letter4").value;
  guess[4] = document.querySelector("#row1letter5").value;

  const guessAsString = guess.join("");
  console.log(guessAsString);
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
