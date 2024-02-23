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

let isEmpty = (array)=>{
    return array.length === 0;
}

clavier.addEventListener('click', (e)=>{
    let eTarget = e.target.id.split("-");
    let type = eTarget[0];
    let idBtn = eTarget[1];

    let ifLastIsOpeReplace = (elt)=>{
        if (calc[calc.length-1] === "-" || calc[calc.length-1] === "+" || calc[calc.length-1] === "*" || calc[calc.length-1] === "/") {
            calc[calc.length-1] = elt;
            return true;
        }
        return false;
    }

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

                default: //pourcent
                    break;
            }
            break;

        case "ch":
            if (calc != []) {
                ac.textContent = "C";
            }
            calc.push(e.target.textContent);
            console.log(calc);
            break;
        
        default:
            break;

    }
})