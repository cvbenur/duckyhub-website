// Create new element to be added
export function createNewScriptLine () {

    // Initialize the select div
    let select = document.createElement('select');
    select.className = "browser-default custom-select keyword-list";

    // Initialize the select's options individually
    let none = document.createElement('option');
    none.selected = true;
    none.value = "none";
    none.innerText = "Sélectionner une option";
    

    let string = document.createElement('option');
    string.value = "string";
    string.innerText = "STRING";


    let key = document.createElement('option');
    key.value = "key";
    key.innerText = "Touche(s) du clavier";
    

    let delay = document.createElement('option');
    delay.value = "delay";
    delay.innerText = "DELAY";


    let repeat = document.createElement('option');
    repeat.value = "repeat";
    repeat.innerText = "REPEAT";
    

    let rem = document.createElement('option');
    rem.value = "rem";
    rem.innerText = "REM";


    // Append options to select
    select.appendChild(none);
    select.appendChild(string);
    select.appendChild(key);
    select.appendChild(delay);
    select.appendChild(repeat);
    select.appendChild(rem);


    // Initialize line number
    let lineNbr = document.createElement('h4');
    lineNbr.innerText = document.getElementsByClassName('line-form-row').length + 1 + '.';
    lineNbr.className = 'ducky-blue-text line-number';

    let lineNbrDiv = document.createElement('div');
    lineNbrDiv.className = 'mt-1 pr-1';
    lineNbrDiv.appendChild(lineNbr);


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
    row.appendChild(lineNbrDiv);
    row.appendChild(selectDiv);
    row.appendChild(col);
    row.appendChild(button);


    // Return resulting row div
    return row;
}



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

    // Relabel line numbers
    const nbrs = document.getElementsByClassName('line-number');
    for (let i = 0; i < nbrs.length; i++) {
        nbrs[i].innerText = i + 1 + '.';
    }
}



// Form validation
export function checkValidity () {

    const warning = document.getElementById('line-script-invalid');


    // Get all form lines
    for (const line of document.getElementsByClassName('line-form-row')) {

        // Check validity line by line
        if (!checkLineValidity(line)) {

            // Show error in code
            warning.innerText = 'Erreur détectée ligne ' + line.children[0].innerText;
            warning.className = 'd-block pt-3 red-text animated bounceIn faster';

            return false;
        }
    }

    warning.className = 'd-block pt-3 green-text animated fadeIn faster';
    warning.innerText = 'Aucun problème détecté dans le code.';

    return true;
}



// Check line validity
function checkLineValidity (line) {

    let valid = true;


    const select = line.children[1].children[0];
    const input = line.children[2].children[0];
    console.log(select.value + ' : ' + input.value);


    switch (select.value) {

        // Handle STRING
        case 'string':
            // Do nothing
            break;


        // TODO: Handle key press
        case 'key':
            break;

        
        // Handle DELAY
        case 'delay' || 'repeat':
            // If the parsed value is NOT an integer
            if (isNaN(parseInt(input.value, 10))) valid = false;
            break;
        
        
        // Handle REPEAT
        case 'repeat':
            // If the parsed value is NOT an integer
            if (isNaN(parseInt(input.value, 10))) valid = false;
            break;
        
        
        // Handle REM
        case 'rem':
            // Do nothing
            break;

        
        // Handle empty line
        default:
            valid = false;
    }


    return valid;
}
