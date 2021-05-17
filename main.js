////OBJECT TO TRACK VALUES
const calculator = {
  displayValue: "0", // our value on the screen at the beginning, after pressing cancel or after reload
  firstOperand: null, //a first operand of expression is set to no value
  waitingForSecondOperand: false, // set to false as would be change to true if firstOperand and operator are entered
  operator: null, // the operator of expression is set no value
};

//FUNCTION TO INPUT THE NUMBERS
function inputNumber(number) {
  const displayValue = calculator.displayValue;
  const waitingForSecondOperand = calculator.waitingForSecondOperand;
  // to overwrite first value
  if (waitingForSecondOperand === true) {
    calculator.displayValue = number;
    calculator.waitingForSecondOperand = false;
  } else {
    // if value on the screen is 0, we replace it with a number
    if (displayValue === "0") {
      calculator.displayValue = number;
      // if it is not zero we add a number following a number on the screen
    } else {
      calculator.displayValue = displayValue + number;
    }
  }
}

// FUNCTION DOT
function inputDot(dot) {
  ///if dot is added after clicking operator it means it is second operand
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

// FUNCTION TO WORK WITH OPERATORS
function workWithOperator(nextOperator) {
  const firstOperand = calculator.firstOperand;
  const displayValue = calculator.displayValue;
  const operator = calculator.operator;
  const inputValue = parseFloat(displayValue);
  // we replace a string with float number

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    //we are checking if first operand is equal null as we defined in the beginning and if inputValue is a number
    calculator.firstOperand = inputValue;
    //now first operand of our calculator is equal to the value we wrote
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  // we change calculator key waitingForSecondOperator to true, because first operand has been entered
  calculator.operator = nextOperator;
}
// FUNCTION FOR OPERATORS
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

// FUNCTION TO RESET A CALCULATOR /// WHEN WE PRESS A BUTTON "C"
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// FUNCTION TO UPDATE DISPLAY /// USED MANY TIMES AS SOON AS ANY BUTTON CLICKED
function updateDisplay() {
  // select an element with class of "space"
  const display = document.querySelector(".screen");
  // update the value of the element with the contents of "calculator.displayValue"
  display.value = calculator.displayValue;
}
// updateDisplay();

//BUTTONS PRESSES
const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
  //target = clicked element
  const target = event.target;
  //if element buttons contains class operator
  if (target.classList.contains("operator")) {
    workWithOperator(target.value);
    updateDisplay();
    return;
  }
  //if element buttons contains class decimal
  if (target.classList.contains("dot")) {
    inputDot(target.value);
    updateDisplay();
    return;
  }
  //if element buttons contains class clear
  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  //if element buttons does not contain any of above, it means number was clicked and we use inputNumber function to display a number
  inputNumber(target.value);
  updateDisplay();
});
