const squares = document.querySelectorAll(".square");
let numberOfPlayedTurns = 0;
const playerOne = {
  name: document.querySelector("#p1-name").innerText,
  symbol: "X",
  currentTurn: true,
};
const playerTwo = {
  name: document.querySelector("#p2-name").innerText,
  symbol: "O",
  currentTurn: false,
};
const players = [playerOne, playerTwo];

function handleUserTurn(e) {
  const currentGuesses = new Array();
  const clickedSquare = e.currentTarget;
  // if square is not blank, return
  if (clickedSquare.innerText != "") {
    return;
  }

  // else enter correct symbol
  if (playerOne.currentTurn === true) {
    clickedSquare.innerText = playerOne.symbol;
    previousGuess = playerOne.symbol;
  } else if (playerTwo.currentTurn === true) {
    clickedSquare.innerText = playerTwo.symbol;
    previousGuess = playerTwo.symbol;
  }
  playerOne.currentTurn = !playerOne.currentTurn;
  playerTwo.currentTurn = !playerTwo.currentTurn;
  numberOfPlayedTurns++;

  squares.forEach((square) => {
    currentGuesses.push(square.innerText);
  });

  // is win possible?
  if (numberOfPlayedTurns > 4) {
    checkWin(currentGuesses);
  }
}

function checkWin(currentGuesses, numberOfPlayedTurns) {
  console.log(currentGuesses);

  // loop top left to bottom right
  for (let i = 0; i < currentGuesses.length; i++) {}
}

function init() {
  squares.forEach((square) => {
    square.addEventListener("click", handleUserTurn);
  });
}

init();
