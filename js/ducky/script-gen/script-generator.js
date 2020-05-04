import { createNewScriptLine, removeLineOnClick } from './forms/line-script.js';
import * as Comp from './forms/complex-script.js';
import { generateLineScript, generateCompScript, downloadScript } from './gen/generate.js';



/*
    ####    FOR BOTH SCRIPTS    ####
*/


// Generating script on Generate button click
for (const btn of Array.from(document.getElementsByClassName('generate-btn'))) {

    // Click detected
    btn.addEventListener('click', (e) => {

        switch (e.target.id) {

            // Click detected for Line Script
            case 'line-generate-btn':

                removeAlerts('line');

                generatedLine = generateLineScript();
                
                if (generatedLine) {
                    lineState = captureLineStates();
                }
                break;
            
            // Click detected for Complex Script
            case 'comp-generate-btn':

                removeAlerts('comp');


                generatedComp = generateCompScript();
                break;

            // Safety
            default:
        }
    });
}




// TODO: Warn user on change after generation
document.addEventListener('change', (e) => {

    if (generatedLine) {

        const alDl = document.getElementById('line-dl-alert');

        if (e.target.name === 'line-text' || e.target.className.includes('keyword-list')) {


            if (e.target.name === 'line-text') {

                if (!currentAlerts.some(a => a.spot === e.target.parentElement.children[1])) {

                    showAlert('line', 'input', e.target);

                } else if (e.target.value === lineState.find(s => s.line === e.target.parentElement.parentElement.children[0].children[0].innerHTML).input) {

                    removeAlert({script: 'line', type: 'input', spot: e.target.parentElement.children[1]});
                        
                    alDl.className = 'd-none ' + alDl.className;

                }

            } else if (e.target.className.includes('keyword-list')) {

                if (!currentAlerts.some(a => a.spot === e.target.parentElement.parentElement.children[2].children[1])) {

                    showAlert('line', 'select', e.target);

                } else if (e.target.value === lineState.find(s => s.line === e.target.parentElement.parentElement.children[0].children[0].innerHTML).select) {

                    removeAlert({script: 'line', type: 'select', spot: e.target.parentElement.parentElement.children[2].children[1]});

                    alDl.className = 'd-none ' + alDl.className;
                }

            }
        }
    }


    // FIXME
    if (generatedComp) {

        if (e.target.type === 'radio' || e.target.type === checkbox) {
            alert = document.getElementById('comp-dl-alert');
            alert.className = alert.className.split('d-none ')[1];

            console.log('change chakal');
        }
    }
});




// TODO: Show alert on page
let currentAlerts = [];

function showAlert (script, type, target) {

    let div = document.createElement('div');
    div.className = 'text-left line-error orange-text';
    div.innerText = 'Cette ligne a changé depuis la dernière génération.'

    switch (type) {
        case 'input':
            target.parentElement.appendChild(div);
            break;

        case 'select':
            target.parentElement.parentElement.children[2].appendChild(div);
            break;

        default:    // Do nothing
    }
    



    let msg = document.getElementById(`${script}-${type}-alert`);
    msg.className = msg.className.split('d-none');


    let alert = document.getElementById(`${script}-dl-alert`);
    alert.className = 'orange-text pb-3 animated tada';


    currentAlerts.push({script: script, type: type, spot: div});
}


// Remove all alerts for a specified script
function removeAlerts (scr) {

    for (const alert of currentAlerts) {

        if (alert.script === scr) {

            removeAlert(alert);
        }
    }

    if (currentAlerts.length === 0) {
        let a = document.getElementById(`${scr}-dl-alert`);
        a.className = 'd-none ' + a.className;
    }
}


// Removes a single specific alert on page
function removeAlert (alert) {

    let a = document.getElementById(`${alert.script}-${alert.type}-alert`);
    a.className = 'd-none ' + a.className;
    alert.spot.remove();

    currentAlerts.splice(alert);
}




/*
    ####    FOR LINE SCRIPT    ####
*/


// Define generation state for line script
let generatedLine = false;
// Define state of each line on generation
let lineState;




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
            line: lines[i].children[0].children[0].innerHTML,
            select: lines[i].children[1].children[0].value,
            input: lines[i].children[2].children[0].value
        };
    }

    return state;
}




// Handle line script download on click
document.getElementById('line-dl-btn').addEventListener('click', () => {
    downloadScript('line');
});




/*
    ####    FOR COMPLEX SCRIPT    ####
*/


// Define generation state for complex script
let generatedComp = false;




// Handle complex script download on click
document.getElementById('comp-dl-btn').addEventListener('click', () => {
    downloadScript('comp');
});
