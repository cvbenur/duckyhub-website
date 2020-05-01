// Create new element to be added
function createNewScriptLine () {

    // Initialize the select div
    let select = document.createElement('select');
    select.className = "browser-default custom-select keyword-list";

    // Initialize the select's options individually
    let none = document.createElement('option');
    none.selected = true;
    none.value = "none";
    none.innerHTML = "Sélectionner une option";
    

    let string = document.createElement('option');
    string.value = "string";
    string.innerHTML = "Taper une chaîne de caractères";


    let key = document.createElement('option');
    key.value = "key";
    key.innerHTML = "Pression de touche du clavier";
    

    let delay = document.createElement('option');
    delay.value = "delay";
    delay.innerHTML = "Pause (en ms)";
    

    let rem = document.createElement('option');
    rem.value = "rem";
    rem.innerHTML = "Ligne de commentaire";


    // Append options to select
    select.appendChild(none);
    select.appendChild(string);
    select.appendChild(key);
    select.appendChild(delay);
    select.appendChild(rem);


    // Initialize div, append select to it
    let selectDiv = document.createElement('div');
    selectDiv.appendChild(select);


    // Initialize input
    let input = document.createElement('input');
    input.type = "text";
    input.name = "line-text";
    input.className = "form-control";
    input.placeholder = "Ecrire votre instruction ici !";


    // Initialize div, append input to it
    let col = document.createElement('div');
    col.className = "col px-2";
    col.appendChild(input);



    // Initialize i
    let i = document.createElement('i');
    i.className = "fas fa-trash-alt";


    // Initialize button
    let button = document.createElement('button');
    button.type = "button";
    button.disabled = true;
    button.className = "btn red white-text py-2 my-0 px-3 btn-line-remove";
    button.onclick = () => { removeLineOnClick(event) };


    // Append i to button
    button.appendChild(i);


    // Initialize row div
    let row = document.createElement('div');
    row.className = "line-form-row row pt-2";


    // Append subdivs to row div
    row.appendChild(selectDiv);
    row.appendChild(col);
    row.appendChild(button);


    // Return resulting row div
    return row;
}



// Add new line on click
document.getElementById('add-line-btn').addEventListener('click', () => {

    // Append the new div to DOM
    document.getElementById('line-lines').appendChild(createNewScriptLine());

    // Get the remove buttons in a collection
    const rmvBtns = document.getElementsByClassName('btn-line-remove');

    // Changing the add line button's text
    if (rmvBtns.length > 0) {
        document.getElementById('add-line-btn').innerHTML = '<i class="fas fa-plus"></i> Ajouter une ligne';
        document.getElementById('line-generate-btn').disabled = false;
    }

    // Enable all remove buttons when there is more than one line
    if (rmvBtns.length > 1) {
        for (let btn of rmvBtns) {
            btn.disabled = false;
        }
    }
});



// Remove line on click
export function removeLineOnClick (e) {
    e.preventDefault();
    e.stopPropagation();

    // Setting variables
    const elt = e.target;
    let parent = elt.parentElement;

    // Getting the right div to remove
    while (parent.className != "line-form-row row pt-2") {
        parent = parent.parentElement;
    }

    // Actually removing the div
    parent.remove();

    // Ensuring the last remaining remove button is disabled and not clickable
    const rmvBtns = document.getElementsByClassName('btn-line-remove');
    if (rmvBtns.length === 1) {
        rmvBtns[0].disabled = true;
    }
}


// Form validation
// TODO