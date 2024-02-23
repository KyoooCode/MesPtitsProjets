let mult = document.getElementById("multiplication");
let add = document.getElementById("addition");
let sub = document.getElementById("soustraction");
let div = document.getElementById("division");
let equal = document.getElementById("egal");

let ac = document.getElementById("AC");

let zoneCalc  = document.getElementById("resultat");

let chiffres = document.querySelectorAll(".chiffre");
let operat = document.querySelectorAll(".calc");

let calc = "";
chiffres.forEach((e)=>{
    e.addEventListener('click', ()=>{
        calc += e.textContent;
        console.log(calc);
    })
})

zoneCalc.add

operat.forEach((e)=>{
    e.addEventListener('click', ()=>{
        if (e.id === "egal") {
            if (calc === ""){
                zoneCalc.innerHTML = "0";
                console.log("calc vide");
            }
            else{
                let resultat = eval(calc);
                calc  = "";
                calc += resultat;
                console.log(calc);
            }
        }
        else{
            calc += e.textContent;
            console.log(calc);
        }
    })
})