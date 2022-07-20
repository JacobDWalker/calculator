
let userInput = document.getElementById('user-input-display');
let calculationDisplay = document.getElementById('calc-output-display');

// Adds numbers and operator symbols to user input display screen
document.querySelectorAll('.user-input').forEach(item => {
    item.addEventListener('click', evt => {
        if (midOperation) {
            midOperation = false;
        }
        userInput.textContent += evt.target.textContent;
    })
})

// Adds listener to operators for user display and to prevent multiple adjacent operators
document.querySelectorAll('.operation').forEach(item => {
    item.addEventListener('click', (evt) => {
        if (!midOperation) {
            userInput.textContent += evt.target.textContent;
            midOperation = true;
            midDecimal = false;
        } else {
            alert("Invalid Input: multiple operators");
        }
    } )
})

// Clears user input display
document.querySelector('#clear').addEventListener('click', ()=> {
    userInput.textContent = ""
    calculationDisplay.textContent = "";
    midOperation = false
    midDecimal = false;
});
// Deletes last character on user display
document.querySelector('#backspace').addEventListener('click', () => {
    if (regex.test(userInput.textContent.slice(-1))) {
        midOperation = false;
    }
    userInput.textContent = userInput.textContent.substring(0, userInput.textContent.length - 1);
})

// Creates decimal button functionality, prevents more than tenth place
document.querySelector('#decimal').addEventListener('click', evt => {
    if (!midOperation && !midDecimal) {
        userInput.textContent += evt.target.textContent;
        midDecimal = true;
    }
})

document.getElementById('equals').addEventListener('click', () => {
    if (regex.test(userInput.textContent.slice(-1))) {
        return
    }
    let convertedArray = convertTypes(userInput.textContent.split(regex));
    if (convertedArray.length === 1) {
        calculationDisplay.textContent = convertedArray[0];
    } else {
        calculationDisplay.textContent = calculate(convertedArray);
    }
})

function decimalToFixed (number) {
    if (number % 1 !== 0) {
        return Number(number.toFixed(5));
    }
    return number;
}

function add (num1, num2) {
    let calc = num1 + num2;
    return decimalToFixed(calc);
}

function subtract (num1, num2) {
    let calc = num1 - num2;
    return decimalToFixed(calc);
}

function divide (num1, num2) {
    if (num2 === 0) {
        return "divide by 0 error";
    }
    let calc = num1 / num2;
    return decimalToFixed(calc);
}

function multiply (num1, num2) {
    let calc = num1 * num2;
    return decimalToFixed(calc);
}

function modulo (num1, num2) {
    let calc = num1 % num2;
    return decimalToFixed(calc);
}

const regex = /([-+/*%])\b/g



function convertTypes(operationArray) {
    for (let i = 0; i < operationArray.length; i += 2) {
        operationArray[i] = Number(operationArray[i]);
    }
    return operationArray;
}

// All odd indices = operations; all even indices = numbers;
function calculate(operationArray) {
    let calcResult = 0;
    for (let i = 1; i < operationArray.length; i += 2) {
        calcResult = getOperation(operationArray[i - 1], operationArray[i], operationArray[i + 1]);
        if (typeof calcResult === "string") {
            return calcResult;
        }
        operationArray[i + 1] = calcResult;
    }
     return calcResult;
}


function getOperation(num1, operator, num2) {
    if (operator === "+") {
        return add(num1, num2);
    }
    if (operator === "-") {
        return subtract(num1, num2);
    }
    if (operator === "/") {
        return divide(num1, num2);
    }
    if (operator === "*") {
        return multiply(num1, num2);
    }
    if (operator === "%") {
        return modulo(num1, num2);
    }
}

let midOperation = false;
let midDecimal = false;
