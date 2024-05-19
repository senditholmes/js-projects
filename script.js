let currentScreen = "0";
let runningTotal = null;

function handleButtonPress(userInput) {
  if (isNaN(parseInt(userInput)) === false) {
    // is a number
    handleNumberPress(userInput);
  } else if (isNaN(parseInt(userInput)) === true) {
    // is a symbol
    handleSymbolPress(userInput);
  }
}

function handleNumberPress(number) {
  if (currentScreen === "0") {
    reRender(number);
  } else if ((currentScreen != "0") & (runningTotal === null)) {
    concatNewNumber = currentScreen + number;
    reRender(concatNewNumber);
  } else {
    reRender(number);
  }
}

function handleSymbolPress(symbol) {
  switch (symbol) {
    case "C":
      runningTotal = null;
      reRender("0");
      break;

    case "←":
      if (currentScreen.length === 1) {
        reRender("0");
      } else {
        operationInProgress = true;
        newScreenValue = currentScreen.substring(0, currentScreen.length - 1);
        reRender(newScreenValue);
      }
      break;

    case "+":
      if (runningTotal === null) {
        runningTotal = parseInt(currentScreen);
        reRender(currentScreen);
      } else {
        runningTotal += parseInt(currentScreen);
      }
      break;

    case "=":
      finalResult = parseInt(currentScreen) + runningTotal;
      reRender(finalResult.toString());
      operationInProgress = false;
      break;

    default:
      console.log("no conditions met");
  }
}

function reRender(newScreenValue) {
  currentScreen = newScreenValue;
  document.querySelector(".screen").innerText = newScreenValue;
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", (e) => {
    handleButtonPress(e.target.innerText);
  });
}

init();
