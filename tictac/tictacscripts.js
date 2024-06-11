const squares = document.querySelectorAll(".square");
let turnAlternator = true;
const playerOne = {
  name: document.querySelector("#p1-name").innerText,
  symbol: "X",
  rows: [0, 0, 0],
  columns: [0, 0, 0],
  diags: [0, 0],
};
const playerTwo = {
  name: document.querySelector("#p2-name").innerText,
  symbol: "O",
  rows: [0, 0, 0],
  columns: [0, 0, 0],
  diags: [0, 0],
};
const players = [playerOne, playerTwo];

// INIT
function init() {
  squares.forEach((square) => {
    square.addEventListener("click", handleUserTurn);
  });
}

function handleUserTurn(e) {
  const clickedSquare = e.currentTarget;
  // if square is not blank, return
  if (clickedSquare.innerText != "") {
    return;
  }

  // else enter correct symbol
  if (turnAlternator) {
    clickedSquare.innerText = playerOne.symbol;
  } else if (!turnAlternator) {
    clickedSquare.innerText = playerTwo.symbol;
  }

  // get the index of the clicked square 1-9
  // let clickedSquareIndex = clickedSquare.id.substring(1) - 1;
  let clickedRow = parseInt(clickedSquare.className.substring(8, 10)) - 1;
  let clickedColumn = parseInt(clickedSquare.className.substring(11, 13)) - 1;
  let clickedDiagonal = parseInt(clickedSquare.className.substring(14)) - 1;

  if (clickedDiagonal === "") {
    clickedDiagonal = null;
  }

  updateBoard(clickedRow, clickedColumn, clickedDiagonal);
}

function updateBoard(row, column, diag) {
  let playerToIncrease;

  if (turnAlternator) {
    playerToIncrease = playerOne;
  } else {
    playerToIncrease = playerTwo;
  }
  // update player's arrays
  if (diag != NaN) {
    if (diag != 2) {
      playerToIncrease.diags[diag]++;
      if (playerToIncrease.diags[diag] === 3) {
        console.log("GAME WON WITH DIAGS");
        return;
      }
      // need to update both diag arrays
    } else if (diag === 2) {
      playerToIncrease.diags[0]++;
      playerToIncrease.diags[1]++;

      if (playerToIncrease.diags[0] === 3 || playerToIncrease.diags[1] === 3) {
        console.log("GAME WON WITH DIAGS");
        return;
      }
    }
  } //end of diag

  // update row input and check for win
  playerToIncrease.rows[row]++;
  if (playerToIncrease.rows[row] === 3) {
    console.log("GAME WON WITH ROWS");
    return;
  }

  // update column input and check for win
  playerToIncrease.columns[column]++;
  if (playerToIncrease.columns[column] === 3) {
    console.log("GAME WON WITH COLUMNS");
    return;
  }
  turnAlternator = !turnAlternator;
  console.log("nobody won");
}

// RUN
init();
