let currentScreen = "0";
let runningTotal = null;
let previousOperation = null;
let finalResult = null;

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
  } else if (currentScreen != "0") {
    concatNewNumber = currentScreen + number;
    reRender(concatNewNumber);
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
        newScreenValue = currentScreen.substring(0, currentScreen.length - 1);
        reRender(newScreenValue);
      }
      break;

    case "+":
    case "-":
    case "×":
    case "÷":
      handleOperation(symbol);
      break;

    case "=":
      if (previousOperation === null) {
        break;
      } else if (previousOperation === "+") {
        finalResult = runningTotal += parseInt(currentScreen);
      } else if (previousOperation === "-") {
        finalResult = runningTotal -= parseInt(currentScreen);
      } else if (previousOperation === "×") {
        finalResult = runningTotal *= parseInt(currentScreen);
      } else if (previousOperation === "÷") {
        finalResult = runningTotal /= parseInt(currentScreen);
      }
      reRender(finalResult.toString());

      previousOperation = null;
      runningTotal = null;
      finalResult = null;
      break;

    default:
      console.log("no conditions met");
  }
}

function handleOperation(symbol) {
  if (runningTotal === null) {
    runningTotal = parseInt(currentScreen);
  } else if (symbol === "+") {
    runningTotal += parseInt(currentScreen);
  } else if (symbol === "-") {
    runningTotal -= parseInt(currentScreen);
  } else if (symbol === "÷") {
    runningTotal /= parseInt(currentScreen);
  } else if (symbol === "x") {
    runningTotal *= parseInt(currentScreen);
  }
  previousOperation = symbol;
  console.log(previousOperation);
  reRender("0");
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
