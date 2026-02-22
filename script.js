const result =document.getElementById("result");
result.value = "";
const buttons = document.querySelectorAll(".btn");
const operators = ["+", "-", "*", "%", "/", "."];

let calculated = false;


// button clicks  

buttons.forEach(btn => {
    btn.addEventListener("click", () => handleInput(btn));
});

// keyboard  input  

document.addEventListener("keydown",(e) => {
    const key = e.key;
    if(key === "Enter" || key === "=") {
        e.preventDefault();
        return calculate();
    }
    if (key === "Escape") return clearDisplay();
    if (key === "Backspace") return deleteChar();

    if (/[\d+\-*/%.]/.test(key)){
        const lastChar = result.value.slice(-1);

        // prevent typing digits after result 
        if(calculated && /\d/.test(key)) return;

        // Prevent double operators except minus (-)
    if(operators.includes(key) && operators.includes(lastChar)) {
        if (key === "-" && lastChar !== "-") {
         // allow minus 
        } else if(key !== "-"){
return;
       // block double operators 
        }
    }
       
        result.value += key;
        calculated = false;
    }
});

function handleInput(btn) {
    const value = btn.getAttribute("data-value");
    const action = btn.getAttribute("data-action");
    const lastChar = result.value.slice(-1);
    if (action === "clear") return clearDisplay();
    if (action === "delete") return deleteChar();
    if (action === "calculate") return calculate();

   

      // prevent typing digits after result 
        if(calculated && / \d/.test(value)) return;

       // Prevent double operators except minus (-)
    if(operators.includes(value) && operators.includes(lastChar)) {
        if (value === "-" && lastChar !== "-" ) {
            // Allow minus 
           
        }else if(value !== "-") {
return;

        }
    }



        result.value += value;
        calculated = false;
}

    function clearDisplay() {
        result.value = "";
    }
    function deleteChar() {
        result.value = result.value.slice(0, -1);
    }
    function calculate() {
try {
    let evalResult = eval(result.value);
       if( evalResult !== undefined){
        result.value = parseFloat(evalResult.toFixed(10)); // round decimal
       }
       calculated = true;
}catch {
    result.value = "Error";
    calculated = false;
}
    }
