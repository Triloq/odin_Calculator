

// Set up caluclator screen
const screen = document.querySelector('.result-Screen');
const fullInputScreen = document.querySelector('.full-Input')

// Set up global variables
let tempInput = '';
let fullInput = '';
let finalValue = 0;
let heldValue = 0;
let operatorChoice = '';
let tempValue = 0;

// Set up digits
const digits = document.querySelectorAll('.digit');
digits.forEach(btn => {
    btn.addEventListener ('click', event => {
        let input = btn.textContent;
        tempInput += input;
        fullInput += input;
        screen.textContent = tempInput; 
    });
});

// Set up operator buttons
const operators = document.querySelectorAll('.operator');
operators.forEach(btn => {
    btn.addEventListener('click', event => {
        console.log(`Start Temp: ${tempValue}`);
        console.log(`Start Held: ${heldValue}`);
        btn.classList.remove('operator');
        // Special case for equals
        if (btn.className === 'equals'){
            finalValue = equals(heldValue,operatorChoice,tempInput);
            screen.textContent = finalValue;
            heldValue = finalValue;
        }
        else {
            if (heldValue != 0){
                
                console.log(`In Temp: ${tempValue}`);
                console.log(`In Held: ${heldValue}`);
                tempValue = equals( heldValue, operatorChoice, tempInput);
                heldValue = tempValue;
                console.log(`Out Temp: ${tempValue}`);
                console.log(`Out Held: ${heldValue}`);
            }
            else {
                heldValue = tempInput;
            }
            operatorChoice = btn.className;
        }
        // Adjust global variables
        fullInput += btn.textContent;
        tempInput = '';
        console.log(`End Temp: ${tempValue}`);
        console.log(`End Held: ${heldValue}`);
        
    });
});

/*
    1st operator press : temp input -> held value
    2nd+ operator press : new temp input ( current operator) held value
                             new value -> held value
    1st equals: current held value -> final value
    further operations : held value (operator) new input 
*/

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
    }
    return sol;
});

