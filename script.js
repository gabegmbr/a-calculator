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

function isNumber(){
    let lastChar = parseInt(text.slice(-1));
    return !isNaN(lastChar);
}

function inputOperator(opr){
    if(opr == '='){
        operate(operator, parseFloat(x), parseFloat(y));
        updateText();
    } else{
        if(operatorPressed == false && isNumber()){
            text += opr;
            operator = opr;
            updateText();
            operatorPressed = true;
        } else{
            if(isNumber() == false){ //if last inserted char is not a number, change operator (prevents user from adding a sequence of operators)
                text = text.slice(0, -1);
                text += opr;
                operator = opr;
                updateText();
            }
        }
    }
}

function input(num){
    if(operatorPressed == false){
        text += num;
        x += num;
        if(num == '.'){
            xDecimalPoint = true
            decimalButton.disabled = true;
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