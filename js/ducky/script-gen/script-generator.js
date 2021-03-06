import { createNewScriptLine, removeLineOnClick } from './forms/line-script.js';
import { generateLineScript, generateCompScript } from './gen/generate.js';



/*
    ####    FOR BOTH SCRIPTS    ####
*/

// Define an array storing all current alerts
let currentAlerts = [];


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

                if (generatedComp) {
                    compState = captureCompStates();
                }
                break;

            // Safety
            default:
        }
    });
}




// Warn user on change after script generation
document.addEventListener('input', (e) => {

    // If a line script has already been generated
    if (generatedLine) {

        // In the case of a change in the inputs or selects
        if (e.target.name === 'line-text' || e.target.className.includes('keyword-list')) {


            // In the case of an input change
            if (e.target.name === 'line-text') {

                // If this line doesn't already have an alert displayed
                if (!currentAlerts.some(a => a.spot === e.target.parentElement.children[1])) {

                    // Show alert on this line
                    showAlert('line', 'input', e.target);


                // Else, if the change is the user going back to the state captured on generation
                } else if (e.target.value === lineState.find(s => s.line === e.target.parentElement.parentElement.children[0].children[0].innerHTML).input) {

                    // Remove the alert on this line
                    removeAlert({script: 'line', type: 'input', spot: e.target.parentElement.children[1]});
                }

            
            // Else, in the case of a select change
            } else if (e.target.className.includes('keyword-list')) {

                // If this line doesn't already have an alert displayed
                if (!currentAlerts.some(a => a.spot === e.target.parentElement.parentElement.children[2].children[1])) {

                    // Show alert on this line
                    showAlert('line', 'select', e.target);

                // Else, if the chande is the user going back to the state captured on generation
                } else if (e.target.value === lineState.find(s => s.line === e.target.parentElement.parentElement.children[0].children[0].innerHTML).select) {

                    // Remove the alert on this line
                    removeAlert({script: 'line', type: 'select', spot: e.target.parentElement.parentElement.children[2].children[1]});
                }

            }
        }
    }


    // If a complex script has already been generated
    if (generatedComp) {

        let planned = false;


        // In case of a change in the radios or checkboxes
        if (e.target.type === 'radio' || e.target.type === 'checkbox') {


            // If the target is a radio button
            if (e.target.type === 'radio') {


                // Removing all OS alerts
                for (const a of currentAlerts.filter(a => a.script === 'comp' && a.type === 'os')) {
                    removeAlert(a);
                }

                // Removing all checkbox alerts
                for (const a of currentAlerts.filter(a => a.script === 'comp' && a.type === 'check')) {
                    removeAlert(a);
                }



                // If the selected OS is not the captured one
                if (e.target.value !== compState.os) {

                    showAlert('comp', 'os', e.target);

                // Else, if we're coming back to the captured OS
                } else {

                    planned = true;

                    // For each of the actions
                    for (const box of Array.from(document.getElementsByClassName('comp-action'))) {

                        // If the action was checked at generation
                        if (compState.ticked.some(b => b.id === box.id)) {

                            // Check it again
                            box.checked = true;

                        }
                    }

                    planned = false;
                }
            }




            // If the target is a checkbox
            if (e.target.type === 'checkbox') {

                if (!planned) {

                    // If the selected checkbox was not checked on generation
                    if (!compState.ticked.some(b => b.id === e.target.id)) {


                        // If this box is getting checked
                        if (e.target.checked) {

                            showAlert('comp', 'check', e.target);

                        // Else
                        } else {

                            removeAlert(currentAlerts.find(a => a.type === 'check' && a.spot.children[0].id === e.target.id));
                        }

                    // Else
                    } else {


                        // If this box is getting unchecked
                        if (!e.target.checked) {

                            showAlert('comp', 'uncheck', e.target);

                        // Else
                        } else {

                            removeAlert(currentAlerts.find(a => a.type === 'uncheck' && a.spot.children[0].id === e.target.id));
                        }
                    }
                }
            }
        }
    }
});





// Show alert on page
function showAlert (script, type, target) {

    let div = document.createElement('div');
    let parent = target;



    if (script === 'line') {

        div.className = 'text-left line-error orange-text';


        while (parent.className !== "line-form-row row pt-2") {
            parent = parent.parentElement;
        }

        
        const existing = currentAlerts.find(a => a.spot === parent);
        if (existing !== undefined) {
            if (typeof existing === []) {
                for (const ex of existing) {
                    removeAlert(ex);
                }
            } else {
                removeAlert(existing);
            }
        }
        

        switch (type) {
            case 'input':
                div.innerText = 'Ligne modifiée.';
                break;

            case 'select':
                div.innerText = 'Ligne modifiée.';
                break;
            
            case 'remove':
                div.innerText = 'Ligne suivante supprimée';

            case 'add':
                div.innerText = 'Nouvelle ligne';

            default:    // Do nothing
        }

        parent.children[2].appendChild(div);

    } else {

        parent = target.parentElement;

        switch (type) {
            case 'os':
                div.innerText = 'OS cible modifié.';
                div.className = 'text-center line-error orange-text';
                break;

            case 'check':
                div.innerText = 'Action ajoutée.';
                div.className = 'text-left line-error orange-text';
                break;

            case 'uncheck':
                div.innerText = 'Action retirée.';
                div.className = 'text-left line-error orange-text';
                break;

            default:    // Do nothing
        }

        parent.appendChild(div);
    }



    let msg = document.getElementById(`${script}-${type}-alert`);
    msg.className = msg.className.split('d-none');


    let alert = document.getElementById(`${script}-dl-alert`);
    alert.className = 'orange-text pb-3 animated tada';

    currentAlerts.push({script: script, type: type, spot: parent});
}


// Remove all alerts for a specified script
function removeAlerts (scr) {

    for (const alert of currentAlerts) {

        if (alert.script === scr) {

            removeAlert(alert);
        }
    }
}


// Removes a single specific alert on page
function removeAlert (alert) {

    let a = document.getElementById(`${alert.script}-${alert.type}-alert`);
    a.className = 'd-none' + a.className;


    if (alert.script === 'line') {

        alert.spot.children[2].lastChild.remove();

    } else {

        alert.spot.lastChild.remove();
    }
    currentAlerts.splice(currentAlerts.indexOf(alert), 1);


    if (!currentAlerts.some(a => a.script === alert.script && a.type === alert.type)) {
        document.getElementById(`${alert.script}-${alert.type}-alert`).className = 'd-none';
    }


    if (!currentAlerts.some(a => a.script === alert.script)) {

        if (alert.script === 'line') {

            document.getElementById('line-add-alert').className = 'd-none';
            document.getElementById('line-remove-alert').className = 'd-none';
            document.getElementById('line-input-alert').className = 'd-none';
            document.getElementById('line-select-alert').className = 'd-none';

        } else {

            document.getElementById('comp-os-alert').className = 'd-none';
            document.getElementById('comp-check-alert').className = 'd-none';
            document.getElementById('comp-uncheck-alert').className = 'd-none';
        }

        const al = document.getElementById(`${alert.script}-dl-alert`);
        al.className = 'd-none ' + al.className;
    }
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


    if (generatedLine) {
        showAlert('line', 'add', document.getElementById('line-lines').lastChild);
    }
});




// Remove line on click
document.addEventListener('click', (e) => {

    if (e.target.className.includes('btn-line-remove') || e.target.parentElement.className.includes('btn-line-remove')) {

        e.preventDefault();
        e.stopPropagation();


        let parent = e.target.parentElement;


        // Getting the right div to remove
        while (parent.className !== "line-form-row row pt-2") {
            parent = parent.parentElement;
        }

        const line = parseInt(parent.parentElement.parentElement.children[0].children[0].innerText.split('.')[0], 10);
        const olderSibling = Array.from(document.getElementsByClassName('line-form-row')).find(l => parseInt(l.children[0].children[0].innerText.split('.')[0], 10) === line);


        // If a script has already been generated
        if (generatedLine) {

            // If the deleted line was empty
            if ((parent.children[1].children[0].value === 'none') || (parent.children[2].children[0].value.trim() === '')) {
                
                // Remove the alert from the currentAlerts array
                removeAlert(currentAlerts.find(a => parseInt(a.spot.parentElement.parentElement.children[0].children[0].innerText, 10) === line));

            // Else if there already was an alert on the removed line
            } else if (currentAlerts.some(a => a.spot === parent)) {

                // Remove all alerts linked to the deleted line
                const existing = currentAlerts.find(a => a.spot === parent);
                if (existing !== undefined) {
                    if (typeof existing === []) {
                        for (const ex of existing) {
                            removeAlert(ex);
                        }
                    } else {
                        removeAlert(ex);
                    }
                }

            } else {

                showAlert('line', 'remove', olderSibling);

            }
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




/*
    ####    FOR COMPLEX SCRIPT    ####
*/


// Define generation state for comp script
let generatedComp = false;
// Define state of each block on generation
let compState;




// Capture states for complex script on generation
function captureCompStates () {

    let state = {
        os: '',
        ticked: []
    };

    let os = '';


    // Getting the selected OS
    const radios = Array.from(document.getElementsByClassName('comp-radio'));
    for (const radio of radios) {
        if (radio.checked) {
            os = radio.value;
        }
    }
    state.os = os;


    // Retrieving the checked boxes
    const actions = Array.from(document.getElementsByClassName(`comp-action-${os}`));
    for (const action of actions) {
        if (action.checked) {
            state.ticked.push(action);
        }
    }

    return state;
}
