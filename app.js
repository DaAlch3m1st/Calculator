const display = document.getElementById('display');
const clearBtn = document.getElementById('clear');

const numberButtons = document.querySelectorAll('.numbers');
const equalBtn = document.getElementById('equal');

let isFirstNumberEntered = false;
let isSecondNumberEntered = false;
let isOperatorEntered = false;

let firstNum = null;
let selectedOperator = null;
let secondNum = null;

let firstNumArr = [];
let secondNumArr = [];
let operatorArr = [];

// Event listener for number and operator buttons
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        const paraNode = document.createElement('p');
        const isOperator = button.classList.contains('operator');

        if (!isOperatorEntered && !isOperator) {
            // Handle first number input
            paraNode.classList = 'firstNumber';
            paraNode.textContent = button.textContent;
            display.appendChild(paraNode);
            firstNumArr.push(paraNode.textContent);
            isFirstNumberEntered = true;

        } else if (isOperator && operatorArr.length == 0) {
            // Handle operator input
            paraNode.textContent = button.textContent;
            paraNode.classList = 'selectedOperator';
            display.appendChild(paraNode);
            isOperatorEntered = true;
            operatorArr.push(paraNode.textContent);
            isFirstNumberEntered = false;

        } else if (isOperatorEntered && !isOperator) {
            // Handle second number input
            paraNode.textContent = button.textContent;
            paraNode.classList = 'secondNumber';
            display.appendChild(paraNode);
            secondNumArr.push(paraNode.textContent);
            isSecondNumberEntered = true;
        }

        console.log(isFirstNumberEntered);
        console.log(isOperatorEntered);
        console.log(isSecondNumberEntered);
    });
});

// Function to hide previous calculations from display
function hidePreviousCalculations() {
    const classesToHide = ['firstNumber', 'selectedOperator', 'secondNumber', 'result'];

    classesToHide.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(element => {
            // element.style.display = 'none';
            element.remove();
            console.clear('clear');
        });
    });
}

// Event listener for the clear button
function clearDisplay() {
    clearBtn.addEventListener('click', function() {
        // Remove all display elements and reset states
        document.querySelectorAll('p').forEach(para => {
            para.remove();
            console.clear('clear');
        });
        
        firstNumArr = [];
        secondNumArr = [];
        operatorArr = [];
        isFirstNumberEntered = false;
        isSecondNumberEntered = false;
        isOperatorEntered = false;
    });
}

// Event listener for the equal button to perform the calculation
function performCalculation() {
    equalBtn.addEventListener('click', function() {

        let number1 = parseInt(firstNumArr.join(''), 10);
        let number2 = parseInt(secondNumArr.join(''), 10);
        let operator = operatorArr.join('');
        
        let result;

        if (isOperatorEntered || !isOperatorEntered) {
            // Perform the appropriate operation based on the selected operator
            if (operator === '+') {
                result = number1 + number2;
            } else if (operator === '-') {
                result = number1 - number2;
            } else if (operator === '*') {
                result = number1 * number2;
            } else if (operator === '/') {
                result = number1 / number2;
                result = result.toFixed(2); // Round the result for division
            } else if(operator === '%') { 
                result = number1 % number2;
            } else {
                console.log('Invalid operator');
                return;
            }
            const resultNode = document.createElement('p');
            resultNode.textContent = result;
            display.appendChild(resultNode);

            // Prepare for the next calculation
            firstNumArr = [];  
            secondNumArr = [];  
            firstNumArr.push(result);
            operatorArr = [];  
            isOperatorEntered = false;  
            
            hidePreviousCalculations();

            if (!isFirstNumberEntered) {
                resultNode.classList = 'result';
            }
        }
    });
}

clearDisplay();
performCalculation();