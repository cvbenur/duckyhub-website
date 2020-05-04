import { createNewScriptLine, removeLineOnClick } from './forms/line-script.js';
import * as Comp from './forms/complex-script.js';
import { generateLineScript, generateCompScript, downloadScript } from './gen/generate.js';



/*
    ####    FOR BOTH SCRIPTS    ####
*/

let generatedLine = false;
let lineState;

let generatedComp = false;


// Generating script on Generate button click
for (const btn of Array.from(document.getElementsByClassName('generate-btn'))) {

    // Click detected
    btn.addEventListener('click', (e) => {

        switch (e.target.id) {

            // Click detected for Line Script
            case 'line-generate-btn':
                generatedLine = generateLineScript();
                
                if (generatedLine) {
                    lineState = captureLineStates();
                }
                break;
            
            // Click detected for Complex Script
            case 'comp-generate-btn':
                generatedComp = generateCompScript();
                break;

            // Safety
            default:
        }
    });
}




/*
    ####    FOR LINE SCRIPT    ####
*/


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
document.addEventListener('click', (e) => {

    if (e.target.className.includes('btn-line-remove') || e.target.parentElement.className.includes('btn-line-remove')) {

        e.preventDefault();
        e.stopPropagation();


        let parent = e.target.parentElement;

        // Getting the right div to remove
        while (parent.className != "line-form-row row pt-2") {
            parent = parent.parentElement;
        }

        removeLineOnClick(parent);
    }
})




// Capture states for line script on generation
function captureLineStates () {
    let state = [];

    const lines = Array.from(document.getElementsByClassName('line-form-row'));


    for (let i=0; i< lines.length; i++) {

        state[i] = {
            select: lines[i].children[1].children[0].value,
            input: lines[i].children[2].children[0].value
        };
    }

    console.log(state);
    return state;
}



// Handle line script download on click
document.getElementById('line-dl-btn').addEventListener('click', () => {
    downloadScript('line');
});
