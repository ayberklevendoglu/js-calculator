let screen = "0";
let runningTotal = 0;
let prevOperator = null;
const result = document.querySelector(".result");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  reRender();
}

function handleNumber(number) {
  if (screen === "0") {
    screen = number;
  } else {
    screen += number;
  }
}

function handleMath(value) {
  if (screen === 0) return;
  const intScreen = parseInt(screen);
  if (runningTotal === 0) {
    runningTotal = intScreen;
  } else {
    flushOperation(intScreen);
  }
  prevOperator = value;
  screen = "0";
}

function flushOperation(intScreen) {
  switch (prevOperator) {
    case "+":
      runningTotal += intScreen;
      break;
    case "-":
      runningTotal -= intScreen;
      break;
    case "/":
      runningTotal /= intScreen;
      break;
    case "*":
      runningTotal *= intScreen;
      break;
    default:
      break;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      screen = "0";
      break;
    case "=":
      if (prevOperator === null) {
        return;
      }
      flushOperation(parseInt(screen));
      prevOperator = null;
      screen = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (screen.length === 1) {
        screen = "0";
      } else {
        screen = screen.substring(0, screen.length - 1);
      }
      break;
    case "+":
    case "-":
    case "/":
    case "*":
      handleMath(symbol);
      break;
    default:
      break;
  }
}

function init() {
  const calcButtons = document.querySelectorAll(".calc-button");
  calcButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      buttonClick(event.target.innerText);
    });
  });
}

function reRender() {
  result.innerText = screen;
}

init();
