let x, y, operator, xDecimalPoint, yDecimalPoint, operatorRegistered;
let ans;

let displayOperation = document.getElementById("displayNum");
let displayResult = document.getElementById("displayResult");
let decimalButton = document.getElementById("decimalButton");

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

function allClear(){
    x = y = text = '';
    operatorRegistered = xDecimalPoint = yDecimalPoint = false;
    ans = 0;
    displayOperation.textContent = "0";
    displayResult.textContent = "0";
    decimalButton.disabled = false;
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
        if(operatorRegistered == false && isNumber() == true){
            text += opr;
            operator = opr;
            updateText();
            operatorRegistered = true;
        } else{
            if(isNumber() == false && isStringEmpty() == false){ //if last inserted char is not a number and the string is not empty, change operator (prevents user from adding a sequence of operators)
                text = text.slice(0, -1);
                text += opr;
                operator = opr;
                updateText();
            } else if(isStringEmpty() == false){ //if last char is a number, perform operation
                operatorRegistered = true;
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
    if(operatorRegistered == false){
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

function del(){
    if(operatorRegistered == false){
        if(text.slice(0, -1) == ''){
            allClear()
            return;
        }
        if(text.slice(-1) == '.'){ //re-enable decimal button
            xDecimalPoint = false; 
            decimalButton.disabled = false;
        } 
        x = x.slice(0, -1);
        text = text.slice(0, -1);
        updateText();
    } else{
        if(text.slice(-1) == operator){
            operator = '';
            operatorRegistered = false;
        } else if(y == '') allClear();
        if(text.slice(-1) == '.'){
            yDecimalPoint = false; 
            decimalButton.disabled = false;
        }
        y = y.slice(0, -1);
        text = text.slice(0, -1);
        updateText();
    }
}

allClear();