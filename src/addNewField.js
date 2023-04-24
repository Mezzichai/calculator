function addNewField(location) {

    const currHtml = location.innerHtml
    const inputField = `
    <label class="name">
        Enter the quantity
        <input class='input' 
        type='number'
        step="0.01"
        placeholder="Enter the quantity"/>
    </label>`

    const newHtml = inputField + currHtml

    return newHtml
}

export default addNewField