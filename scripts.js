
// Set up caluclator screen
const screen = document.querySelector('.result-Text');
const fullEqDisplayScreen = document.querySelector('.full-Input-Text')
// Set up global variables
let currentInput = '';
let fullEqDisplay = '';
let resultValue = 0;
let intermediaryResult = 0;
let operatorChoice = '';
let tempValue = 0;
let afterEquals = false;
let afterOperand = false;
let operand;
// this is the max number of significant digits to be shown after solution
let maxInputLength = 10;
let currentInputLength = 0;
let decimal = false;

// Set up digits
const digits = document.querySelectorAll('.digit');
digits.forEach(btn => {
    btn.addEventListener ('click', event => {
        if (currentInputLength < 10){
            afterEqualsFunction();
            afterOperand = false;
            let input = btn.textContent;
            currentInput += input;
            fullEqDisplay += input;
            screen.textContent = currentInput;
            // fullEqDisplayScreen.textContent = fullEqDisplay;
            currentInputLength++;
        }
    });
});

const afterEqualsFunction = (() => {
    if (afterEquals === true ){
        intermediaryResult = 0;
        resultValue = 0;
        fullEqDisplay = '';
        afterEquals = false;
    };
});

// Set up operator buttons
const operators = document.querySelectorAll('.operator');
operators.forEach(btn => {
    btn.addEventListener('click', event => {
        afterEquals = false;   
        btn.classList.remove('operator');
        currentInputLength = 0;
        decimal = false;
        // check for double input on operators
        
        // Special case for equals
        if (btn.className === 'equals'){
            // switch to tell if equals has been hit without new input or hit twice (on accident)
            switch(true){
                case (currentInput === '' && intermediaryResult != 0): resultValue = intermediaryResult; break;
                case (currentInput != '' && intermediaryResult === 0): resultValue = currentInput; break;
                default: resultValue = equals(intermediaryResult,operatorChoice,currentInput); break;
            }
            screen.textContent = resultValue;
            intermediaryResult = resultValue;
            // fullEqDisplay = intermediaryResult;
            afterEquals = true;

            let tempfullEqDisplay = fullEqDisplay + '=';
            fullEqDisplayScreen.textContent = tempfullEqDisplay;
            
        }
        else {
            switch (btn.textContent) {
                case '+': operand = '+'; break;
                case '-': operand = '-'; break;
                case 'x': operand = 'x'; break;
                case "\u00F7": operand = "\u00F7"; break;
                default: break;
            }
            if (currentInput!= ''){
                // Will happen as long as there has been new digits pressed since last operator
                fullEqDisplay += operand;
                if (intermediaryResult != 0){               
                    tempValue = equals( intermediaryResult, operatorChoice, currentInput);
                    intermediaryResult = tempValue;             
                }
                else {
                    intermediaryResult = currentInput + '';         
                }         
            }
            else {
                // specific case of hitting another operator after an equals to continue equation
                fullEqDisplay += operand;
            }   
            fullEqDisplayScreen.textContent = fullEqDisplay;
            afterOperand = true;
        }
        // Adjust global variables
        operatorChoice = btn.className;
        currentInput = '';
        // fullEqDisplayScreen.textContent = fullEqDisplay;
        
    });
});

// clear and delete
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

clearButton.addEventListener('click', event => {
    clearAll();
})

deleteButton.addEventListener('click', event => {
    deleteInput();
})

// decimal point and (+/-)
const decimalPoint = document.querySelector(".dot");
// const plusMinus = document.querySelector(".negative");

decimalPoint.addEventListener('click', event => {
    if(decimal === false){
        currentInput += '.';
        fullEqDisplay += '.';
        decimal = true;
    }
})

// const reverseSign = ((num) => num * -1);
// plusMinus.addEventListener('click', event => {
//     currentInput = reverseSign(currentInput);
    
// })

// Operation function
const add = ((a, b) => +a + +b);
const subtract = ((a, b) => a - b);
const multiply = ((a, b) => a * b);
const divide = ((a, b) => a / b);

const equals = ((a, op, b) => {
    let sol = 0;
    switch (op) {
        case 'multiply': sol = multiply(a, b); break;
        case 'add': sol = add(a,b); break;
        case 'divide': sol = divide(a, b); break;
        case 'subtract': sol = subtract(a, b); break;
        default: break;
    }
    // Change the number of sig digits and convert to scientific notation when greater than maxInputLength
    sol = Math.round((sol + Number.EPSILON) * 1e10) / 1e10;
    sol = parseFloat(Math.round((sol + Number.EPSILON) * 1e10) / 1e10);
    sol = countSignificantIntegers(sol);
    
    return sol;
});

const countSignificantIntegers = ((num, count = 0) => {

    count = (num + '').replace(".", "").length;
    if ( count > maxInputLength ){
        return num.toExponential(5);
    }
    else {
        return num;
    }
});

const clearAll = (() => {
    currentInput = '';
    fullEqDisplay = '';
    resultValue = 0;
    intermediaryResult = 0;
    operatorChoice = '';
    tempValue = 0;
    afterEquals = false;
    fullEqDisplayScreen.textContent = fullEqDisplay;
    screen.textContent = 0;
    currentInputLength = 0;
})

const deleteInput = (() => {
    fullEqDisplay = intermediaryResult;
    currentInput = '';
    screen.textContent = 0;
    currentInputLength = 0;
})