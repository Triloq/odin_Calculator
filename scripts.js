
// Set up caluclator screen
const screen = document.querySelector('.result-Screen');
const fullInputScreen = document.querySelector('.full-Input-Text')
// Set up global variables
let tempInput = '';
let fullInput = '';
let finalValue = 0;
let heldValue = 0;
let operatorChoice = '';
let tempValue = 0;
let afterEquals = false;

// this is the max number of significant digits to be shown after solution
let screenLength = 10;

// Set up digits
const digits = document.querySelectorAll('.digit');
digits.forEach(btn => {
    btn.addEventListener ('click', event => {
        afterEqualsFunction();
        let input = btn.textContent;
        tempInput += input;
        fullInput += input;
        screen.textContent = tempInput;
        fullInputScreen.textContent = fullInput;
    });
});

const afterEqualsFunction = (() => {
    if (afterEquals === true ){
        heldValue = 0;
        finalValue = 0;
        fullInput = '';
        afterEquals = false;
    };
});

// Set up operator buttons
const operators = document.querySelectorAll('.operator');
operators.forEach(btn => {
    btn.addEventListener('click', event => {
        afterEquals = false;   
        btn.classList.remove('operator');
        // Special case for equals
        if (btn.className === 'equals'){
            // switch to tell if equals has been hit without new input or hit twice (on accident)
            switch(true){
                case (tempInput === '' && heldValue != 0): finalValue = heldValue; break;
                case (tempInput != '' && heldValue === 0): finalValue = tempInput; break;
                default: finalValue = equals(heldValue,operatorChoice,tempInput); break;
            }
            // finalValue = manyDigits(finalValue);
            screen.textContent = finalValue;
            heldValue = finalValue;
            fullInput = heldValue;
            afterEquals = true;
            
        }
        else if (tempInput!= ''){
            // Will happen as long as there has been new digits pressed since last operator
            fullInput += btn.textContent; 
            if (heldValue != 0){               
                tempValue = equals( heldValue, operatorChoice, tempInput);
                heldValue = tempValue;             
            }
            else {
                heldValue = tempInput;         
            }         
        }
        else {
            // specific case of hitting another operator after an equals to continue equation
            fullInput += btn.textContent;
        }   
        // Adjust global variables
        operatorChoice = btn.className;
        tempInput = '';
        fullInputScreen.textContent = fullInput;
    });
});

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
    // Change the number of sig digits and convert to scientific notation when greater than screenLength
    sol = Math.round((sol + Number.EPSILON) * 1e10) / 1e10;
    sol = parseFloat(Math.round((sol + Number.EPSILON) * 1e10) / 1e10);
    sol = countSignificantIntegers(sol);
    
    return sol;
});

const countSignificantIntegers = ((num, count = 0) => {

    count = (num + '').replace(".", "").length;
    if ( count > screenLength ){
        return num.toExponential(5);
    }
    else {
        return num;
    }
});


// found at https://stackoverflow.com/questions/22884720/what-is-the-fastest-way-to-count-the-number-of-significant-digits-of-a-number
// critical flaw that 0's before a decimal aren't considered significant for some reason
// didn't use but keeping here for potential future
var log10 = Math.log(10);
function getSignificantDigitCount(n) {
    n = Math.abs(String(n).replace(".", "")); //remove decimal and make positive
    if (n == 0) return 0;
    while (n != 0 && n % 10 == 0) n /= 10; //kill the 0s at the end of n

    return Math.floor(Math.log(n) / log10) + 1; //get number of digits
}

const clearAll = (() => {
    tempInput = '';
    fullInput = '';
    finalValue = 0;
    heldValue = 0;
    operatorChoice = '';
    tempValue = 0;
    afterEquals = false;
})