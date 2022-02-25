const output = document.querySelector(".output");
const numbers = document.querySelectorAll(".number");
const divideBtn = document.getElementById("divide");
const multiplyBtn = document.getElementById("multiply");
const subtractBtn = document.getElementById("subtract");
const addBtn = document.getElementById("add");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("del");
const decimalBtn = document.getElementById("decimal");

let a, b, operator, result, displayValue;
let isOperatorPressed = false;
let isEqualsPressed = false;
let isDecimalPressed = false;

function reset() {
  deleteSelectedClass();
  a = "";
  b = "";
  displayValue = 0;
  result = 0;
  output.innerText = result;
  isOperatorPressed = false;
  isEqualsPressed = false;
  isDecimalPressed = false;
}

function updateDisplay(e) {
  if (!isOperatorPressed) {
    displayValue = a;
    output.innerText = displayValue;
  } else {
    displayValue = b;
    output.innerText = displayValue;
  }
}

function deleteFromOutput() {
  if (displayValue <= 0) {
    return;
  }
  if (isEqualsPressed) {
    reset();
  }
  if (!isOperatorPressed) {
    a = a.slice(0, -1);
  } else {
    b = b.slice(0, -1);
  }
}

function operateEvent() {
  isOperatorPressed = true;
  if (a !== "" && b !== "") {
    operate(operator, a, b);
    output.innerText = result;
    a = result;
    b = "";
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "add":
      result = add(a, b);
      result = Math.round(result * 100) / 100;
      break;
    case "subtract":
      result = subtract(a, b);
      result = Math.round(result * 100) / 100;
      break;
    case "multiply":
      result = multiply(a, b);
      result = Math.round(result * 100) / 100;
      break;
    case "divide":
      result = divide(a, b);
      result = Math.round(result * 100) / 100;
  }
}

divideBtn.addEventListener("click", function (e) {
  if (a == "") {
    return;
  }
  deleteSelectedClass();
  if (a !== "") {
    this.classList.add("selected");
  }
  operator = "divide";
  operateEvent();
});

multiplyBtn.addEventListener("click", function (e) {
  if (a == "") {
    return;
  }
  deleteSelectedClass();
  if (a !== "") {
    this.classList.add("selected");
  }
  operator = "multiply";
  operateEvent();
});

subtractBtn.addEventListener("click", function (e) {
  if (a == "") {
    return;
  }
  deleteSelectedClass();
  if (a != "") {
    this.classList.add("selected");
  }
  operator = "subtract";
  operateEvent();
});

addBtn.addEventListener("click", function (e) {
  if (a == "") {
    return;
  }
  deleteSelectedClass();
  if (a !== "") {
    this.classList.add("selected");
  }
  operator = "add";
  operateEvent();
});

equalsBtn.addEventListener("click", function () {
  if (!isOperatorPressed || b == "") {
    return;
  }
  isEqualsPressed = true;
  operate(operator, a, b);
  output.innerText = result;
  isOperatorPressed = false;
  a = result;
  b = "";
});

clearBtn.addEventListener("click", function () {
  reset();
});

deleteBtn.addEventListener("click", function () {
  deleteFromOutput();
  updateDisplay();
});

decimalBtn.addEventListener("click", function () {
  if (isDecimalPressed) {
    alert("Decimal button is already pressed.");
    return;
  }
  if (!isOperatorPressed) {
    a += ".";
    isDecimalPressed = true;
  } else {
    b += ".";
    isDecimalPressed = true;
  }
  updateDisplay();
});

numbers.forEach(function (button) {
  button.addEventListener("click", function (e) {
    if (displayValue.length > 7 && !isOperatorPressed) {
      alert("Value too long.");
      return;
    }
    if (isEqualsPressed) {
      reset();
    }
    if (!isOperatorPressed) {
      a += e.target.innerText;
    } else {
      deleteSelectedClass();
      b += e.target.innerText;
    }
    updateDisplay(e);
  });
});

reset();

function deleteSelectedClass() {
  divideBtn.classList.remove("selected");
  multiplyBtn.classList.remove("selected");
  subtractBtn.classList.remove("selected");
  addBtn.classList.remove("selected");
}
