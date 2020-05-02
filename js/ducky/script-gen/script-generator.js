import { createNewScriptLine, removeLineOnClick } from './forms/line-script.js';
import * as Comp from './forms/complex-script.js';
import { generateLineScript, generateCompScript } from './gen/generate.js';



// Generating script on Generate button click
Array.from(document.getElementsByClassName('generate-btn')).forEach(btn => {

    // Click detected
    btn.addEventListener('click', (e) => {

        switch (e.target.id) {

            // Click detected for Line Script
            case 'line-generate-btn':
                generateLineScript();
                break;
            
            // Click detected for Complex Script
            case 'comp-generate-btn':
                generateCompScript();
                break;

            // Safety
            default:
        }
    });
});




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
