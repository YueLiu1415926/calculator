activateButtons = function (){
    const formula = document.getElementById("formula");
    const result = document.getElementById("result");
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let input = button.getAttribute("id");
            let output = reactOnInput(result.textContent, input);
            result.textContent = output["result"];
            formula.textContent = output["formula"];
        })
    });
}

reactOnInput = function (text, input){
    const emptyFormula = " ";
    // 数字
    if (!isNaN(input)) {
        if (text === "0") {
            return {"formula":emptyFormula,"result":input};
        } else if (text === "NaN" || text === "Infinity") {
            return {"formula":emptyFormula,"result":text};
        } else {
            return {"formula":emptyFormula,"result":text + input};
        }
    }
    // 功能性按键
    else if (input === "clear") {
        return {"formula":emptyFormula,"result":"0"};
    } else if (input === "backspace") {
        if (text.length==1 || text === "NaN" || text === "Infinity"){
            return {"formula":emptyFormula,"result":"0"};
        }
        else{
            return {"formula":emptyFormula,"result":text.slice(0, -1)};
        }
    } else if (input === "equals") {
        let needParenthesesLeft = 0;
        let needParenthesesRight = 0;
        let countLeftParentheses = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] == "("){
                countLeftParentheses += 1;
            }
            else if (text[i] == ")"){
                if (countLeftParentheses > 0){
                    countLeftParentheses -= 1;
                }
                else{
                    needParenthesesLeft += 1;
                }
            }
        }
        needParenthesesRight = countLeftParentheses;
        let newText = "(".repeat(needParenthesesLeft) + text + ")".repeat(needParenthesesRight);
        return {"formula":newText,"result":eval(newText)};
    }
    // 其他
    else if (input === ".") {
        if (isNaN(text[text.length-1])){
            return {"formula":emptyFormula,"result":text};
        }
        let nums = text.split(/[+]|[-]|[*]|[/]|[%]|[(]|[)]/);
        let lastNum = nums[nums.length - 1];
        if (!lastNum.includes(".")) {
            return {"formula":emptyFormula,"result":text + "."};
        }
        else{
            return {"formula":emptyFormula,"result":text};
        }
    } else if (input === "("){
        if (text === "0") {
            return {"formula":emptyFormula,"result":input};
        }
        else if ((!isNaN(text[text.length-1])) || text[text.length-1] == ")"){
            return {"formula":emptyFormula,"result":text + "*("};
        }
        else if (text[text.length-1] == "."){
            return {"formula":emptyFormula,"result":text};
        }
        else {
            return {"formula":emptyFormula,"result":text + input};
        }
    } else if (input === ")"){
        if (text === "0") {
            return {"formula":emptyFormula,"result":text};
        }
        else if ((!isNaN(text[text.length-1])) || text[text.length-1] === ")"){
            return {"formula":emptyFormula,"result":text + input};
        }
        else {
            return {"formula":emptyFormula,"result":text};
        }
    } else if (input === "-"){
        if (text === "0"){
            return {"formula":emptyFormula,"result":input};
        }
        else if ((!isNaN(text[text.length-1])) || "()".includes(text[text.length-1])){
            return {"formula":emptyFormula,"result":text + input};
        }
        else if (text[text.length-1] === "."){
            return {"formula":emptyFormula,"result":text};
        }
        else {
            return {"formula":emptyFormula,"result":text + "(" + input};
        }
    } else if (input === "*"){
        if (text === "0"){
            return {"formula":emptyFormula,"result":text};
        }
        else if ((!isNaN(text[text.length-1])) || text[text.length-1] === ")"){
            return {"formula":emptyFormula,"result":text + input};
        }
        else if (text[text.length-1] === "*" && text[text.length-2] != "*"){
            return {"formula":emptyFormula,"result":text + input};
        }
        else {
            return {"formula":emptyFormula,"result":text};
        }
    } else {
        if ((!isNaN(text[text.length-1])) || text[text.length-1] === ")"){
            return {"formula":emptyFormula,"result":text + input};
        }
        else {
            return {"formula":emptyFormula,"result":text};
        }
    }
}
