let firstNumber;
let secondNumber;
let operator;

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
    if(second === 0) return "ERROR";
    return first / second;
}
function operate(operator, first, second){
    switch(operator){
        case "add":
            return add(first, second);
        case "subtract":
            return subtract(first, second);
        case "multiply":
            return multiply(first, second);
        case "subtract":
            return divide(first, second);
    }
}