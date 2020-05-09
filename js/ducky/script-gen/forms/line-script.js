import { keypresses } from '../gen/duckify.js';


// Create new element to be added
export function createNewScriptLine () {

    // Initialize the select div
    let select = document.createElement('select');
    select.required = true;
    select.className = "browser-default custom-select keyword-list";

    // Initialize the select's options individually
    let none = document.createElement('option');
    none.selected = true;
    none.value = "none";
    none.innerText = "Aucun";
    

    let string = document.createElement('option');
    string.value = "string";
    string.innerText = "STRING";


    let key = document.createElement('option');
    key.value = "key";
    key.innerText = "Touches";
    

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
    lineNbr.className = 'ducky-blue-text text-left';

    let lineNbrDiv = document.createElement('div');
    lineNbrDiv.className = 'mt-1 line-number-div ';

    const number = parseInt(lineNbr.innerText.split('.')[0], 10);
    if (number < 10) {
        lineNbrDiv.className += 'mr-4';
    } else if (number < 100) {
        lineNbrDiv.className += 'mr-2';
    }
    lineNbrDiv.appendChild(lineNbr);


    // Initialize div, append select to it
    let selectDiv = document.createElement('div');
    selectDiv.appendChild(select);


    // Initialize input
    let input = document.createElement('input');
    input.required = true;
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
    button.className = "btn red white-text rounded waves-effect py-2 my-0 px-3 btn-line-remove";


    // Append i to button
    button.appendChild(i);


    // Initialize button div
    let buttonDiv = document.createElement('div');
    buttonDiv.appendChild(button);


    // Initialize row div
    let row = document.createElement('div');
    row.className = "line-form-row row pt-2";


    // Append subdivs to row div
    row.appendChild(lineNbrDiv);
    row.appendChild(selectDiv);
    row.appendChild(col);
    row.appendChild(buttonDiv);


    // Return resulting row div
    return row;
}



// Remove line on click
export function removeLineOnClick (parent) {

    // Actually removing the div
    parent.remove();


    // Ensuring the last remaining remove button is disabled and not clickable
    const rmvBtns = document.getElementsByClassName('btn-line-remove');
    if (rmvBtns.length === 1) {
        rmvBtns[0].disabled = true;
    }


    // Relabel line numbers
    const nbrs = document.getElementsByClassName('line-number-div');
    for (let i = 0; i < nbrs.length; i++) {
        nbrs[i].children[0].innerText = i + 1 + '.';
    }



    // Resize margins on line numbers
    const lines = [...document.querySelectorAll('div.line-number-div')];
    for (let i=0; i < lines.length; i++) {
        if (parseInt(lines[i].children[0].innerText.split('.')[0], 10) < 10) {
            lines[i].className = 'mt-1 line-number-div mr-4';
        } else if (i < 100) {
            lines[i].className = 'mt-1 line-number-div mr-2';
        }
    }
}



// Form validation
export function checkValidityLine () {

    let instructions = [];
    let invalid = [];

    const warning = document.getElementById('line-script-invalid');


    // Get all form lines
    for (const line of document.getElementsByClassName('line-form-row')) {

        // Check validity line by line
        const lineInfo = checkLineValidity(line);
        if (lineInfo === null) {

            invalid.push(line.children[0].innerText.split('.')[0]);
        }

        instructions.push(lineInfo);
    }

    
    // If there are any problems
    if (invalid.length === 0) {

        // Show status OK
        warning.className = 'd-block pt-3 green-text animated fadeIn faster';
        warning.innerText = 'Aucun problème détecté dans le code.';

    } else if (invalid.length > 1) {

        let numbers = '';

        for (let i=0; i < invalid.length; i++) {
            numbers += `${invalid[i]}`;

            if (i < invalid.length - 1) {
                numbers += `, `;
            }
        }

        // Show error in code
        warning.innerText = `Erreurs détectées aux lignes ${numbers}.`;
        warning.className = 'd-block pt-3 red-text animated bounceIn faster';

    } else {

        // Show error in code
        warning.innerText = `Erreur détectée à la ligne ${invalid[0]}.`;
        warning.className = 'd-block pt-3 red-text animated bounceIn faster';
    }


    return instructions;
}



// Define dictionnary of error divs
const errors = [
    {
        name: 'int',
        body: '<div class="red-text">La valeur doit être un nombre entier positif</div>'
    },
    {
        name: 'key',
        body: '<div class="red-text">La commande n\'est pas valide</div>'
    },
    {
        name: 'empty',
        body: '<div class="red-text">La ligne est vide</div>'
    },
    {
        name: 'xss-js',
        body: '<div class="purple-text">Tiens donc, ça ressemble à du JavaScript!</div>'
    },
    {
        name: 'xss-sql',
        body: '<div class="purple-text">Tiens donc, ça ressemble à du SQL!</div>'
    }
];

// Check line validity
function checkLineValidity (line) {

    const select = line.children[1].children[0];
    const input = line.children[2].children[0];
    input.value = input.value.trim();


    // Define new element for line info
    const lineInfo = {
        instruction: '',
        body: ''
    };


    // Testing the line's body
    switch (select.value) {

        // Handle STRING
        case 'string':
            
            // Input sanitization
            lineInfo.instruction = select.value;
            lineInfo.body = sanitize(input);
            break;


        // Handle key press
        case 'key':
            // Check that the keypress proposition is valid
            if (!checkKeypressValidity(input.value)) {

                // Output error under erroneous input field
                displayError(input, 'key');
                return null;
            }

            lineInfo.instruction = select.value;
            lineInfo.body = input.value;
            break;

        
        // Handle DELAY
        case 'delay':
            // Check that the parsed value is an integer
            if (isNaN(parseInt(input.value, 10))) {

                // Output error under erroneous input field
                displayError(input, 'int');
                return null;
            }

            lineInfo.instruction = select.value;
            lineInfo.body = parseInt(input.value, 10);
            break;
        
        
        // Handle REPEAT
        case 'repeat':
            // Check that the parsed value is an integer
            if (isNaN(parseInt(input.value, 10))) {

                // Output error under erroneous input field
                displayError(input, 'int');
                return null;
            }

            lineInfo.instruction = select.value;
            lineInfo.body = parseInt(input.value, 10);
            break;
        
        
        // Handle REM
        case 'rem':
            
            // Input sanitization
            lineInfo.instruction = select.value;
            lineInfo.body = sanitize(input);
            break;

        
        // Handle empty line
        default:

            // Output error under erroneous input field
            displayError(input, 'empty');
            return null;
    }


    return lineInfo;
}



// Define input issues
const sanityIssues = {
    jsStart: new RegExp('<script>', 'gi'),
    jsEnd: new RegExp('</script>', 'gi'),
    sqlSelect: new RegExp('select', 'gi'),
    sqlFrom: new RegExp('from', 'gi')
}

// Sanitize inputs
function sanitize (input) {

    // Check for XSS attempts
    if (input.value.match(sanityIssues.jsStart) !== null || input.value.match(sanityIssues.jsEnd) !== null) {

        displayError(input, 'xss-js');
    
    } else if (input.value.match(sanityIssues.sqlSelect) !== null && input.value.match(sanityIssues.sqlFrom) !== null) {

        displayError(input, 'xss-sql');
    }


    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
        '`': '&grave'
    };

    const reg = /[&<>"'`/]/ig;
    return input.value.replace(reg, (match) => (map[match]));
}



// Display error on page
function displayError (input, errorCode) {

    let div = document.createElement('div');
    div.className = 'text-left line-error';
    div.innerHTML = errors.find(e => e.name === errorCode).body;

    input.parentElement.appendChild(div);
}



// Check keypresses arguments validity
function checkKeypressValidity (string) {

    // Check the args against the array of possible key presses
    for (const arg of string.split(' ')) {
        if (!keypresses.some(key => arg.toUpperCase() === key)) return false;
    }
    
    return true;
}



// Remove error warnings in the code
export function removeErrorWarnings () {
    Array.from(document.getElementsByClassName('line-error')).forEach(div => {
        const parent = div.parentElement;
        parent.removeChild(div);
    });
}