let squares = document.querySelectorAll(".square");
let playerOneturn = true;
let playerTwoTurn = false;

squares.forEach((square) => {
  // add event listener
  square.addEventListener("click", function handleUserTurn(e) {
    const clickedSquare = e.currentTarget;
    // if square is not blank, return
    if (clickedSquare.innerText != "") {
      return;
    }

    if (playerOneturn) {
      clickedSquare.innerText = "O";
      previousGuess = "O";
    } else if (playerTwoTurn) {
      clickedSquare.innerText = "X";
      previousGuess = "X";
    }
    playerOneturn = !playerOneturn;
    playerTwoTurn = !playerTwoTurn;
  });
}); // END OF FIRST FOREACH
