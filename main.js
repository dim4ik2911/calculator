//OBJECT TO TRACK VALUES
const calculator = {
  displayValue: "0", // our value
  firstOperand: null, //a first operand of expression
  waitingForSecondOperand: false, // check if the first two were true, if yes we are waiting for second operand
  operator: null, // the operator of expression
};

// UPDATE DISPLAY FUNCTION
function updateDisplay() {
  // select an element with class of "space"
  const display = document.querySelector(".screen");
  // update the value of the element with the contents of "calculator.displayValue"
  display.value = calculator.displayValue;
}

updateDisplay();

//BUTTONS PRESSES
const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (event) => {
  //target = clicked element
  const target = event.target;

  //Check if clicked element is a button.
  //If not, stop executing function
  if (!target.matches("button")) {
    return;
  }

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
    console.log("clear", target.value);
    return;
  }

  //if element buttons does not contain any of above, it means number was clicked and we use inputNumber function to display a number
  inputNumber(target.value);
  updateDisplay();
});

//INPUT THE NUMBERS
function inputNumber(number) {
  const displayValue = calculator.displayValue;
  const waitingForSecondOperand = calculator.waitingForSecondOperand;
  // to not overwrite firstvalue
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
  console.log(calculator);
}

// ADDING DOT IF IT IS NOT THERE AT THE MOMENT WHEN WE PRESS IT
function inputDot(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

// FUNCTION TO WORK WITH OPERATORS
function workWithOperator(nextOperator) {
  // destructuring the calculator object
  const { firstOperand, displayValue, operator } = calculator;
  //could write instead of this in more specific way
  // const firstOperand = calculator.firstOperand;
  // const displayValue = calculator.displayValue;
  // const operator = calculator.operator;
  const inputValue = parseFloat(displayValue);
  // we replace a string with float number
  if (firstOperand === null && !isNaN(inputValue)) {
    //we are checking if first operand is equal null as we defined in the beginning and if inputValue is a number
    calculator.firstOperand = inputValue;
    //now first operand of our calculator is equal to the value we wrote
  }

  calculator.waitingForSecondOperand = true;
  // we change calculator key waitingForSecondOperator to true, because first operand has been entered
  calculator.operator = nextOperator;
  console.log(calculator);
}