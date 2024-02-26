let mult = document.getElementById("calc-multiplication");
let add = document.getElementById("calc-addition");
let sub = document.getElementById("calc-soustraction");
let div = document.getElementById("calc-division");
let equal = document.getElementById("calc-egal");

let ac = document.getElementById("utils-ac");

let zoneCalc = document.getElementById("resultat");

let chiffres = document.querySelectorAll(".chiffre");
let operat = document.querySelectorAll(".calc");

let calc = [];

let calculList = (inputArray) => {
    let array = inputArray.slice();

    let applyOperator = (op, op1, op2) => {
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

    let highPriority = () => {
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

    let resolveOperations = () => {
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

let formatNumber = (number) => {
    return number.toLocaleString('fr-FR', { maximumFractionDigits: 9 });
}

let isInList = (array, elt) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == elt) {
            return true;
        }
    }
    return false;
}

let isEmpty = (array) => {
    return array.length === 0;
}

let ifLastIsOpeReplace = (elt) => {
    if (calc[calc.length - 1] === "-" || calc[calc.length - 1] === "+" || calc[calc.length - 1] === "*" || calc[calc.length - 1] === "/") {
        calc[calc.length - 1] = elt;
        return true;
    }
    return false;
}

let isLastIsOpe = () => {
    if (calc[calc.length - 1] === "-" || calc[calc.length - 1] === "+" || calc[calc.length - 1] === "*" || calc[calc.length - 1] === "/") {
        return true;
    }
    return false;
}

let isLastNumber = () => {
    return typeof calc[calc.length - 1] === "number";
}

let isOpeInCalc = () => {
    calc.forEach((e) => {
        if (calc[e] === "-" || calc[e] === "+") {
            return true;
        }
    });
    return false;
}

let getLastEltInArray = (array) => {
    return array[array.length - 1];
}

let plusMinus = false;

clavier.addEventListener('click', (e) => {
    let eTarget = e.target.id.split("-");
    let type = eTarget[0];
    let idBtn = eTarget[1];

    switch (type) {
        case "calc":
            if (isEmpty(calc)) {
                break;
            }
            switch (idBtn) {
                case "division":
                    if (ifLastIsOpeReplace("/")) {
                        console.log(calc);
                        break;
                    }
                    calc.push("/");
                    console.log(calc);
                    break;

                case "multiplication":
                    if (ifLastIsOpeReplace("*")) {
                        console.log(calc);
                        break;
                    }
                    calc.push("*");
                    console.log(calc);
                    break;

                case "soustraction":
                    if (ifLastIsOpeReplace("-")) {
                        console.log(calc);
                        break;
                    }
                    if (calc.length === 3) {
                        calc = [calculList(calc)];
                        console.log(calc);
                    }
                    calc.push("-");
                    console.log(calc);
                    break;

                case "addition":
                    if (ifLastIsOpeReplace("+")) {
                        console.log(calc);
                        break;
                    }
                    if (calc.length === 3) {
                        calc = [calculList(calc)];
                        zoneCalc.textContent = formatNumber(getLastEltInArray(calc));
                    }
                    calc.push("+");
                    console.log(calc);
                    break;
                case "egal":
                    calc = [calculList(calc)];
                    console.log(calc);
                    zoneCalc.textContent = formatNumber(getLastEltInArray(calc));
            }
            break;

        case "utils":
            if (isEmpty(calc)) {
                break;
            }
            switch (idBtn) {
                case "ac":
                    calc = [];
                    ac.textContent = "AC";
                    zoneCalc.textContent = "0";
                    plusMinus = false;
                    console.log(calc);
                    break;

                case "plusmoins":
                    if (isLastIsOpe()) {
                        calc.push(parseInt("-0"));
                    }
                    if (plusMinus) {
                        plusMinus = false;
                        let lastElt = getLastEltInArray(calc);
                        calc[calc.length - 1] = Math.abs(parseInt(lastElt));
                        zoneCalc.textContent = formatNumber(getLastEltInArray(calc));
                        console.log(calc);
                        break;
                    } else {
                        plusMinus = true;
                        let lastElt = getLastEltInArray(calc);
                        calc[calc.length - 1] = parseInt("-" + lastElt);
                        zoneCalc.textContent = formatNumber(getLastEltInArray(calc));
                        console.log(calc);
                        break;
                    }
                case "pourcent":
                    if (!isEmpty(calc) && isLastNumber()) {
                        calc[calc.length - 1] /= 100;
                        zoneCalc.textContent = formatNumber(getLastEltInArray(calc));
                        console.log(calc);
                    }
                    break;
            }
            break;

        case "ch":
            let chClick = parseInt(e.target.textContent);
            ac.textContent = "C";
            if (isLastNumber()) {
                calc[calc.length - 1] += chClick.toString();
                calc[calc.length - 1] = parseInt(getLastEltInArray(calc));
                zoneCalc.textContent = formatNumber(getLastEltInArray(calc));
                console.log(calc);
                break;
            }
            calc.push(chClick);
            console.log(calc)
            zoneCalc.textContent = formatNumber(getLastEltInArray(calc));
            break;

        default:
            break;
    }
});
