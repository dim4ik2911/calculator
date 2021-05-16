//object to track the values
const calculator = {
  displayValue: "0", // our value
  firstOperand: null, //a first operand of expression
  waitingForSecondOperand: false, // check if the first two were true, if yes we are waiting for second operand
  operator: null, // the operator of expression
};

// update display function
function updateDisplay() {
  // select an element with class of "space"
  const display = document.querySelector(".screen");
  // update the value of the element with the contents of "calculator.displayValue"
  display.value = calculator.displayValue;
}

updateDisplay();

//key presses
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
    console.log("operator", target.value);
    return;
  }

  //if element buttons contains class decimal
  if (target.classList.contains("dot")) {
    console.log("decimal", target.value);
    return;
  }

  //if element buttons contains class clear
  if (target.classList.contains("clear")) {
    console.log("clear", target.value);
    return;
  }

  //if element buttons does not contain any of above, it means numbe was clicked
  console.log("digit", target.value);
});
