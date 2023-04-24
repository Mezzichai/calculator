import parseToInt from '../parseTo.js';

  //could have just grabbed elems by id, then multiplied by 
//value... but thats no fun
const errMsg = document.getElementById("err-msg");
const inputs = document.getElementsByClassName("input");
const inputsArray = Array.from(inputs);


// hide the errmsg
function errMsgOff() {
    !errMsg.classList.contains('hide') ? 
    errMsg.classList.add('hide') :
    null
}
//add an event listener to trigger the errMsgOff when any field is changed
inputsArray.map(input => {
    input.addEventListener("input", errMsgOff)
})


//maps the id as a key to its value over an object
//?could i have use the reduce function to get them all by id?
function inputValues() {
    const inputValues = inputsArray.reduce((acc, input) => {
        acc[input.id] = input.value;
        return acc;
      }, {});

    return inputValues
}

const costPerPieceSub = document.getElementById("cost-per-piece-sub-total")
const postageSub = document.getElementById("postage-sub-total")
const costPerPieceResult = document.getElementById("cost-per-piece")
const totalMailingCost = document.getElementById('total-mailing-cost')
const clear = document.getElementById('clear')


clear.addEventListener('click', (event)=> {
    event.preventDefault();
    errMsgOff()
    const inputValuesObj = inputValues();

    //set obj values to 0
    for (const key in inputValuesObj) {
        // if (Object.hasOwnProperty.call(inputValuesObj, key)) {
          inputValuesObj[key] = '';
        // }
    }

    //set element values to 0
    inputsArray.forEach(input => {
        input.value = inputValuesObj[input.id]
    })
    postageSub.textContent = 0
    costPerPieceSub.textContent = 0
    costPerPieceResult.textContent = 0
    totalMailingCost.textContent = 0
})


const form = document.querySelector(".input-container");
form.addEventListener("submit", handleSubmit);





function handleSubmit(e) {
//passing the event object from the function doesnt work either
e.preventDefault()

//needs to be invoked and parsed here so that we calculate the last used field values
const inputValuesObj = parseToInt(inputValues());

try{
    costPerPieceSub.textContent = (
        inputValuesObj["data-cost-input"] + 
        inputValuesObj["print-input"] + 
        inputValuesObj["postage-input"]) * 
        inputValuesObj["qty-input"]

    postageSub.textContent = 
        inputValuesObj["postage-input"] * inputValuesObj["qty-input"]

    totalMailingCost.textContent = 
        parseToInt(costPerPieceSub.textContent) + 
        parseToInt(postageSub.textContent)

    costPerPieceResult.textContent = parseToInt(totalMailingCost.textContent)/inputValuesObj['qty-input']
    
    if (isNaN(parseToInt(totalMailingCost.textContent))) {
        throw new Error("Please fill out all the fields")
    }
    
} catch (error) {
    console.log(error)
    errMsg.textContent = error.message
    errMsg.classList.remove('hide')  
    }
}