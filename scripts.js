
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
            if (afterEquals === false){
                switch(true){
                    case (tempInput === '' && heldValue != 0): finalValue = heldValue; break;
                    case (tempInput != '' && heldValue === 0): finalValue = tempInput; break;
                    default: finalValue = equals(heldValue,operatorChoice,tempInput); break;
                }
                screen.textContent = finalValue;
                heldValue = finalValue;
                fullInput = heldValue;
                afterEquals = true;
            }
        }
        else if (tempInput!= ''){   
            console.log(`Full before: ${fullInput}`)
            fullInput += btn.textContent; 
            if (heldValue != 0){               
                tempValue = equals( heldValue, operatorChoice, tempInput);
                heldValue = tempValue;             
            }
            else {
                heldValue = tempInput;         
            }         
            console.log(`Full after: ${fullInput}`)
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
    return sol;
});

