    //could have just grabbed elems by id, then multiplied by 
//value... but thats no fun
const errMsg = document.getElementById("err-msg");

const inputs = document.getElementsByClassName("input");
const inputsArray = Array.from(inputs);



// hide the errmsg if a field is changed
inputsArray.map(input => {
    input.addEventListener("input", () => {
        !errMsg.classList.contains('hide') ? 
        errMsg.classList.add('hide') :
        null
    })
})

//maps the id as a key to its value over an object
function inputValues() {
    const inputValues = inputsArray.reduce((acc, input) => {
        acc[input.id] = input.value;
        return acc;
      }, {});

    return inputValues
}


const costPerPieceResult = document.getElementById("cost-per-piece-sub-total")
const postageResult = document.getElementById("postage-sub-total")
const totalMailingCostResult = document.getElementById('total-mailing-cost')
const clear = document.getElementById('clear')


clear.addEventListener('click', ()=> {

    const inputValuesObj = inputValues();

    //set obj values to 0
    for (const key in inputValuesObj) {
        if (Object.hasOwnProperty.call(inputValuesObj, key)) {
          inputValuesObj[key] = '';
        }
    }

    //set element values to 0
    inputsArray.forEach(input => {
        input.value = inputValuesObj[input.id]
    })

    totalMailingCostResult.textContent = 0
    costPerPieceResult.textContent = 0
    postageResult.textContent = 0
})


const form = document.querySelector(".input-container");
form.addEventListener("submit", handleSubmit);




function handleSubmit() {
    //passing the event object from the function doesnt work either
    event.preventDefault()
    

//need to put the submit handler so it recalculates everytime it is invoked
// const inputValuesObj = getInputValues();
const inputValuesObj = inputValues();


// parsing the values as integers
for (const key in inputValuesObj) {
    if (Object.hasOwnProperty.call(inputValuesObj, key)) {
      inputValuesObj[key] = parseInt(inputValuesObj[key], 10);
    }
  }


try{
    let totalMailingCost = inputValuesObj["qty-input"] + 
    inputValuesObj["data-cost-input"] +
    inputValuesObj["cost-per-piece-input"] +
    inputValuesObj["postage-input"];
    
    if (isNaN(totalMailingCost)) {
        throw new Error("Please fill out all the fields")
    }

    totalMailingCostResult.textContent = totalMailingCost
    costPerPieceResult.textContent = inputValuesObj["cost-per-piece-input"]
    postageResult.textContent = inputValuesObj["postage-input"]
} catch (error) {
    console.log("err")
    errMsg.textContent = error.message
    errMsg.classList.remove('hide')  
    }
}


