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
    }
}

function onNumberClicked(number){
    if(currentValue === 0){
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
    operator = operatorSelected;
    currentValue = 0;
}

function calculate(){
    let result = operate(operator, firstNumber, secondNumber);
    firstNumber = result;
    numberDisplay.textContent = result;
    operator = "";
}

function clear(){
    currentValue = 0;
    numberDisplay.textContent = "0";
}

function deleteNumber(){
    if(numberDisplay.textContent.length > 0){
        numberDisplay.textContent = numberDisplay.textContent.slice(0, -1);
        currentValue = +numberDisplay.textContent;
    }
}

function togglePolarity(){

}

function decimal(){

}

function percentage(){
    
}