import  addNewField  from './addNewField.js';


const inputContainer = document.getElementById('input-container');
const addField = document.getElementById('add-field')
console.log(inputContainer.innerHTML)
addField.addEventListener('click', ()=>{
    inputContainer.innerHTML = addNewField(inputContainer)
})




