let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");


window.addEventListener("keydown", handelKeyboardInput);

const numberButtons = document.querySelectorAll(".btn:not(.operator):not(.allclear):not(.clear):not(.equals):not(.decimal)");

const operators = document.querySelectorAll(".btn.operator");

const decimals = document.querySelector(".btn.decimal");
decimals.addEventListener("click", () => {
 addDecimal();
});
const equals = document.querySelector(".btn.equals");
equals.addEventListener("click", () => {
  if (previousNum != "" && currentNum != "") {
    calculate();
  } 
});

const clear = document.querySelector(".btn.allclear");
clear.addEventListener("click", clearCalculator); 

const deleteBtn = document.querySelector(".btn.clear");
deleteBtn.addEventListener("click", handleDelete);

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});
    
function handleNumber(number) {
   if (currentDisplayNumber.textContent === "0" || currentDisplayNumber.textContent === "") {
     currentNum = number;
   } else if (currentNum.length < 15) {
     currentNum += number;
   }
   currentDisplayNumber.textContent = currentNum;
}

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Prevent equals button from triggering handleOperator
    if (!btn.classList.contains("equals")) {
      handleOperator(e.target.textContent);
    }
  });
});

function handleOperator(op) {
  if (previousNum !== "" && currentNum !== "") {
    calculate();
  }

  if (previousNum === "") {
    previousNum = currentNum;
  }
  operatorCheck(op);
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum + " " + operator;
  currentDisplayNumber.textContent = "0";
  currentNum = "";
}

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
    // Division by zero check BEFORE calculation
    if (operator === "/" && currentNum === 0) {
      previousNum = "ERROR, CANNOT DIVIDE BY ZERO";
      operator = "";
      displayResults(previousNum);
      return;
    }
    if (operator === "+") {
      currentNum = previousNum + currentNum;
    } else if (operator === "-") {
      currentNum = previousNum - currentNum;
    } else if (operator === "x") {
      currentNum = previousNum * currentNum;
    } else if (operator === "/") {
      currentNum = previousNum / currentNum;
    } else if (operator === "%") {
      currentNum = previousNum % currentNum;
    }
    let result = roundNumber(currentNum);
    displayResults(result.toString());
}

function roundNumber(num) {
  return Math.round(num * 10000) / 10000;
}

function displayResults(result) {
  if (result.length <= 11) {
    currentDisplayNumber.textContent = result;
  } else {
    currentDisplayNumber.textContent = result.slice(0, 11) + "...";
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  currentNum = "";
  previousNum = result;
}

function clearCalculator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDisplayNumber.textContent = currentNum;
  }
}

function handelKeyboardInput(e) {
    e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key); 
  }if (e.key === "Enter" || e.key === "="  && previousNum != "" && currentNum != "") { 
    calculate();
  }if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "%") {
    let op = e.key;
    handleOperator(op);
  } else if (e.key === "Backspace") {
    handleDelete();
  } else if (e.key === "Escape") {
    clear.click();
  } else if (e.key === ".") {
    addDecimal();
  }

}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNumber.textContent = "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}