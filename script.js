// MAIN
function init() {
  document.querySelector(".calc-buttons").addEventListener("click", (e) => {
    handleButtonPress(e.target.innerText);
  });
}

init();

// FUNCTIONS

function handleButtonPress(userInput) {
  if (isNaN(parseInt(userInput)) === false) {
    // is a number
    handleNumberPress(userInput);
    reRender(userInput);
  } else if (isNaN(parseInt(userInput)) === true) {
    // is a symbol
    handleSymbolPress(userInput);
  }
}

function handleNumberPress(value) {
  console.log(value);
}

function handleSymbolPress(value) {
  console.log(value);
}

function reRender(newScreenInput) {
  document.querySelector(".screen").innerText = newScreenInput;
}
