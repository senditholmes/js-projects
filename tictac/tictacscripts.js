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
    previousGuess = playerOne.symbol;
  } else if (!turnAlternator) {
    clickedSquare.innerText = playerTwo.symbol;
    previousGuess = playerTwo.symbol;
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
  console.log(diag);
  if (turnAlternator) {
    // update playerOne's arrays
    if (diag != NaN) {
      if (diag != 2) {
        playerOne.diags[diag]++;
      } else if (diag === 2) {
        playerOne.diags[0]++;
        playerOne.diags[1]++;

        if (playerOne.diags[0] === 3 || playerOne.diags[1] === 3) {
          console.log("GAME WON WITH DIAGS");
        }
      }
    } //end of diag
    playerOne.rows[row]++;
    if (playerOne.rows[row] === 3) {
      console.log("GAME WON WITH ROWS");
      return;
    }
    playerOne.columns[column]++;
    if (playerOne.columns[column] === 3) {
      console.log("GAME WON WITH COLUMNS");
      return;
    }
  } else if (!turnAlternator) {
    //update playerTwo's arrays
    if (diag != NaN) {
      if (diag != 3) {
        playerTwo.diags[diag]++;
      } else if (diag === 2) {
        playerTwo.diags[0]++;
        playerTwo.diags[1]++;

        if (playerOne.diags[0] === 3 || playerOne.diags[1] === 3) {
          console.log("GAME WON WITH DIAGS");
        }
      }
    }
    playerTwo.rows[row]++;
    if (playerOne.rows[row] === 3) {
      console.log("GAME WON WITH ROWS");
      return;
    }
    playerTwo.columns[column]++;
    if (playerOne.columns[column] === 3) {
      console.log("GAME WON WITH COLUMNS");
      return;
    }
  }
  turnAlternator = !turnAlternator;
  console.log("nobody won");
}

// RUN
init();
