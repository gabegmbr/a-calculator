let x, y, operator, xDecimalPoint, yDecimalPoint, operatorPressed;
let ans;


let displayOperation = document.getElementById("displayNum");
let displayResult = document.getElementById("displayResult");
let decimalButton = document.getElementById("decimalButton");

function allClear(){
    x = y = text = '';
    operatorPressed = xDecimalPoint = yDecimalPoint = false;
    ans = 0;
    displayOperation.textContent = "0";
    displayResult.textContent = "0";
    decimalButton.disabled = false;
}

allClear();

function updateText(){
    displayOperation.textContent = text;
    displayResult.textContent = ans;
}

function isNumber(){ //function that checks if the last char of the input string is a number.
    let lastChar = parseInt(text.slice(-1));
    return !isNaN(lastChar);
}

function isStringEmpty(){ //function to check if the input string is empty. basis of conditionals that prevents user from adding an operator before adding a number
    let char = text.slice(-1);
    if(char == '') return true;
    else return false;
}

function inputOperator(opr){
    if(opr == '=' && isStringEmpty() == false){
        if(y != ''){ //if y is defined, perform operation
            operate(operator, parseFloat(x), parseFloat(y));
            updateText();
        } else{ //else, ans = x. update text.
            ans = x;
            updateText();
        }
    } else{
        if(operatorPressed == false && isNumber() == true){
            text += opr;
            operator = opr;
            updateText();
            operatorPressed = true;
        } else{
            if(isNumber() == false && isStringEmpty() == false){ //if last inserted char is not a number and the string is not empty, change operator (prevents user from adding a sequence of operators)
                text = text.slice(0, -1);
                text += opr;
                operator = opr;
                updateText();
            } else if(isStringEmpty() == false){ //if last char is a number, perform operation
                operatorPressed = true;
                operate(operator, parseFloat(x), parseFloat(y));
                operator = opr;
                x = ans;
                y = '';
                text += opr;
                updateText();
            }
        }
    }
}

function input(num){
    if(operatorPressed == false){
        text += num; //input text
        x += num; //
        if(num == '.'){ 
            xDecimalPoint = true
            decimalButton.disabled = true; //prevents user from adding another decimal point
        }
    } else{
        if(yDecimalPoint == false) decimalButton.disabled = false;
        text += num;
        y += num;
        if(num == '.'){
            yDecimalPoint = true;
            decimalButton.disabled = true;
        }
    }
    updateText();
}

function operate(operator, x, y){
    switch (operator){
        case '+':
            ans = x+y
            break;
        case '-':
            ans = x-y;
            break;
        case '*':
            ans = x*y;
            break;
        case '/':
            ans = x/y;
            break;
    }
    return ans;
}