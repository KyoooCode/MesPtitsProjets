let mult = document.getElementById("calc-multiplication");
let add = document.getElementById("calc-addition");
let sub = document.getElementById("calc-soustraction");
let div = document.getElementById("calc-division");
let equal = document.getElementById("calc-egal");

let ac = document.getElementById("utils-ac");

let zoneCalc  = document.getElementById("resultat");

let chiffres = document.querySelectorAll(".chiffre");
let operat = document.querySelectorAll(".calc");

let calc = [];

let calculList = (inputArray)=> {
    let array = inputArray.slice();
  
    let applyOperator = (op, op1, op2)=> {
        switch (op) {
            case "+":
                return op1 + op2;
            case "-":
                return op1 - op2;
            case "*":
                return op1 * op2;
            case "/":
                return op1 / op2;
        }
    } 
  
    let highPriority = ()=> {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "*" || array[i] === "/") {
                let op = array[i];
                let op1 = array[i - 1];
                let op2 = array[i + 1];

                let resultat = applyOperator(op, op1, op2);
                array.splice(i - 1, 3, resultat);
                i--;
            }
        }
    }
  
    let resolveOperations = ()=> {
        highPriority();

        while (array.length > 1) {
            let op = array[0];
            let op1 = array[1];
            let op2 = array[2];

            let resultat = applyOperator(op1, op, op2);
            array.splice(0, 3, resultat);
        }
    }
  
    resolveOperations();
    return array[0];
}
  

let isInList = (array, elt)=>{

    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
        if (array[i] == elt) {
            return true;
        }
    }
    return false;
}

let isEmpty = (array)=>{
    return array.length === 0;
}

let ifLastIsOpeReplace = (elt)=>{
    if (calc[calc.length-1] === "-" || calc[calc.length-1] === "+" || calc[calc.length-1] === "*" || calc[calc.length-1] === "/") {
        calc[calc.length-1] = elt;
        return true;
    }
    return false;
}

let isLastIsOpe = ()=>{
    if (calc[calc.length-1] === "-" || calc[calc.length-1] === "+" || calc[calc.length-1] === "*" || calc[calc.length-1] === "/") {
        return true;
    }
    return false;
}

let isLastNumber = ()=>{
    if (typeof calc[calc.length-1] === "number"){
        return true
    }
    return false
} 

let isOpeInCalc = ()=>{
    calc.forEach((e)=>{
        if (calc[e] === "-" || calc[e] === "+") {
            return true
        }
    });
    return false
}

clavier.addEventListener('click', (e)=>{
    let eTarget = e.target.id.split("-");
    let type = eTarget[0];
    let idBtn = eTarget[1];


    switch (type) {
        case "calc":
            if (isEmpty(calc)){
                break;
            }
            switch (idBtn) {
                case "division":
                    if (ifLastIsOpeReplace("/")){
                        console.log(calc);
                        break;
                    }
                    calc.push("/");
                    console.log(calc);
                    break;

                case "multiplication":
                    if (ifLastIsOpeReplace("*")){
                        console.log(calc);
                        break;
                    }
                    calc.push("*");
                    console.log(calc);
                    break;

                case "soustraction":
                    if (ifLastIsOpeReplace("-")){
                        console.log(calc);
                        break;
                    }
                    if (isOpeInCalc()) {
                        
                    }
                    calc.push("-");
                    console.log(calc);
                    break;

                case "addition":
                    if (ifLastIsOpeReplace("+")){
                        console.log(calc);
                        break;
                    }
                    calc.push("+");
                    console.log(calc);
                    break;
                case "egal":
                    calc = [calculList(calc)];
                    console.log(calc);
                    zoneCalc.textContent = calculList(calc);
            }
            break;

        case "utils":
            switch (idBtn) {
                case "ac":
                    calc = [];
                    ac.textContent = "AC";
                    zoneCalc.textContent = "0";
                    console.log(calc);
                    break;
            
                case "plusmoins":

                    break;

                case "pourcent":


                    break;
            }
            break;

        case "ch":
            let chClick = parseInt(e.target.textContent);
            if (calc != []) {
                ac.textContent = "C";
            }
            if (isLastNumber()) {
                calc[calc.length-1] += chClick.toString();
                calc[calc.length-1] = parseInt(calc[calc.length-1] );

                zoneCalc.textContent = calc[calc.length-1].toString();
                console.log(calc);
                break;
            }
            calc.push(chClick);
            console.log(calc)
            zoneCalc.textContent = calc[calc.length-1].toString();
            break;

        default:
            break;

    }
})