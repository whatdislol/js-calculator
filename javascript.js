let firstNumber = 0;
let secondNumber = null;
let operator = null;
let currentValue = 0;
let isNewValue = true;
const ERROR = "cringe";
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

document.addEventListener("keydown", onKeyPress);
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
    if(currentValue === 0 && isNewValue){
        numberDisplay.textContent = "";
    }
    if(numberDisplay.textContent.length >= 12) return;
    
    numberDisplay.textContent += number;
    currentValue = +numberDisplay.textContent;
    if(operator){
        secondNumber = currentValue;
    } else {
        firstNumber = currentValue;
    }
    isNewValue = false;
}

function onOperatorClicked(operatorSelected){
    if(operator && secondNumber === currentValue){
        calculate();
    }
    isNewValue = true;
    operator = operatorSelected;
    currentValue = 0;
    equationDisplay.textContent = `${firstNumber} ${operator} `;
}

function calculate(){
    if(!operator || secondNumber === null) return;
    let result = operate(operator, firstNumber, secondNumber);
    if(result !== ERROR){
        result = parseFloat(result.toFixed(6).slice(0, 13));
        numberDisplay.textContent = result;
        equationDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
        firstNumber = result;
        currentValue = result;
    } else {
        numberDisplay.textContent = ERROR;
        equationDisplay.textContent = "";
        currentValue = 0;
        firstNumber = 0;
    }
    isNewValue = true;
    secondNumber = null;
    operator = null;
}

function clear(){
    currentValue = 0;
    firstNumber = 0;
    secondNumber = null;
    operator = null;
    isNewValue = true;
    numberDisplay.textContent = "0";
    equationDisplay.textContent = "";
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
    if(!operator) firstNumber = currentValue;
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
        isNewValue = false;
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

function onKeyPress(event){
    const key = event.key;
    const keyMap = {
        "0": "zero",
        "1": "one",
        "2": "two",
        "3": "three",
        "4": "four",
        "5": "five",
        "6": "six",
        "7": "seven",
        "8": "eight",
        "9": "nine",
        "+": "add",
        "-": "subtract",
        "*": "multiply",
        "/": "divide",
        "Escape": "clear",
        "%": "percentage",
        "Backspace": "delete",
        ".": "decimal",
        "=": "calculate",
        "Enter": "calculate"
    };
    if(key in keyMap){
        const buttonClass = keyMap[key];
        const button = document.querySelector(`.${buttonClass}`);
        if (button) {
            button.click();
        }
    }
}