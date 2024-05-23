let firstNumber;
let secondNumber;
let operator;
let currentValue = 0;
const ERROR = "cringe"
const numberButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const togglePolarityButton = document.querySelector(".toggle-polarity");
const percentButton = document.querySelector(".percentage");
const deleteButton = document.querySelector(".delete");
const decimalButton = document.querySelector(".decimal");
const calculateButton = document.querySelector(".calculate");
const equationDisplay = document.querySelector(".equation");
const numberDisplay = document.querySelector(".current");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => onNumberClicked(+button.textContent));
});
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => onOperatorClicked(button.textContent));
});
calculateButton.addEventListener("click", calculate);
deleteButton.addEventListener("click", deleteNumber);
clearButton.addEventListener("click", clear);
togglePolarityButton.addEventListener("click", togglePolarity);
decimalButton.addEventListener("click", decimal);
percentButton.addEventListener("click", percentage);

function add(first, second){
    return first + second;
}
function subtract(first, second){
    return first - second;
}
function multiply(first, second){
    return first * second;
}
function divide(first, second){
    if(second === 0) return ERROR;
    return first / second;
}
function operate(operator, first, second){
    switch(operator){
        case "+":
            return add(first, second);
        case "-":
            return subtract(first, second);
        case "*":
            return multiply(first, second);
        case "/":
            return divide(first, second);
        default:
            return currentValue;
    }
}

function onNumberClicked(number){
    if(currentValue === 0 && numberDisplay.textContent !== "0."){
        numberDisplay.textContent = "";
    }

    numberDisplay.textContent += number;
    currentValue = +numberDisplay.textContent;
    if(operator){
        secondNumber = currentValue;
    } else {
        firstNumber = currentValue;
    }
}

function onOperatorClicked(operatorSelected){
    if(operator){
        calculate();
    }
    operator = operatorSelected;
    currentValue = 0;
}

function calculate(){
    let result = operate(operator, firstNumber, secondNumber);
    result = parseFloat(result.toFixed(3));
    numberDisplay.textContent = result;
    firstNumber = result;
    currentValue = result;
    operator = "";
}

function clear(){
    currentValue = 0;
    firstNumber = 0;
    secondNumber = 0;
    numberDisplay.textContent = "0";
}

function deleteNumber(){
    if(currentValue % 1 !== 0){
        let deletedNumStr = numberDisplay.textContent.slice(0, -1);
        currentValue = parseFloat(deletedNumStr) + 0;
    } else if(currentValue < 0) {
        currentValue = Math.ceil(currentValue / 10);
    } else {
        currentValue = Math.floor(currentValue / 10);
    }
    numberDisplay.textContent = currentValue;
}

function togglePolarity(){
    currentValue = -currentValue;
    numberDisplay.textContent = currentValue;
    if(operator){
        secondNumber = currentValue;
    } else {
        firstNumber = currentValue;
    }
}

function decimal(){
    if(currentValue === 0){
        numberDisplay.textContent = 0;
    }
    if(!numberDisplay.textContent.includes(".")){
        numberDisplay.textContent += "."
    }
}

function percentage(){
    currentValue /= 100;
    numberDisplay.textContent = currentValue;
    if(operator){
        secondNumber = currentValue;
    } else {
        firstNumber = currentValue;
    }
}