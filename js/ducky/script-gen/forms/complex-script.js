import { script as script1 } from '../../../../actions/win/change-wp.js';
import { script as script2 } from '../../../../actions/win/exec-from-pwsh.js';
import { script as script3 } from '../../../../actions/win/launch-cmd.js';
import { script as script4 } from '../../../../actions/mac/launch-term.js';
import { script as script5 } from '../../../../actions/lin/launch-term.js';
import { script as script6 } from '../../../../actions/win/open-webpg.js';
import { script as script7 } from '../../../../actions/mac/open-webpg.js';
import { script as script8 } from '../../../../actions/lin/open-webpg.js';

import { keypresses } from '../gen/duckify.js';


// Define value correspondance between actions and files
const actionFiles = [
    {
        id: 'action1',
        script: script1,
    },
    {
        id: 'action2',
        script: script2,
    },
    {
        id: 'action3',
        script: script3,
    },
    {
        id: 'action4',
        script: script4,
    },
    {
        id: 'action5',
        script: script5,
    },
    {
        id: 'action6',
        script: script6,
    },
    {
        id: 'action7',
        script: script7,
    },
    {
        id: 'action8',
        script: script8,
    },
]




// Ensuring only OS-compatible actions are made available to click
let search = "";

for (const radio of document.getElementsByClassName('comp-radio')) {
    radio.addEventListener('change', (e) => {
        
        e.preventDefault();
        e.stopPropagation();
        
    
        // Getting all comp-actions element
        const actions = document.getElementsByClassName('comp-action');

    
        // Setting the current OS to the one selected
        switch (e.target.id) {
            case 'comp-win':
                search = 'comp-action-win';
                break;
            
            case 'comp-mac':
                search = 'comp-action-mac';
                break;

            case 'comp-lin':
                search = 'comp-action-lin';
                break;
            
            default:
        }


        // Incidentally enabling and disabling corresponding checkboxes
        for (const action of actions) {

            if (action.className.includes(search)) {
                action.disabled = false;
            } else {
                action.disabled = true;
                action.checked = false;
            }
        }


        // Disabling the 'Generate' button
        document.getElementById('comp-generate-btn').disabled = true;
    });
}




// Enabling generate button when at least one option is selected
const actions = document.getElementsByClassName('comp-action');

for (const box of actions) {

    // Detecting change in checkbox
    box.addEventListener('change', (e) => {

        e.preventDefault();
        e.stopPropagation();


        // If this particular checkbox gets checked
        if (e.target.checked) {

            // Enable Generate button
            document.getElementById('comp-generate-btn').disabled = false;

        // Else, if there are no more checked boxes
        } else if (!Array.from(actions).some(b => b.checked)) {

            // Disable Generate button
            document.getElementById('comp-generate-btn').disabled = true;
        }
    });
}




// Checking validity for the complex script
export function checkValidityComp () {

    let blocks = [];

    let bchecked = 0;
    let achecked = 0;
    let rad = null;

    const warning = document.getElementById('comp-script-invalid');



    // Getting the selected OS
    const radios = Array.from(document.getElementsByClassName('comp-radio'));
    for (const radio of radios) {
        if (radio.checked) {
            bchecked ++;
            rad = radio;
        }
    }

    // If there are more than one checked OS
    if (bchecked !== 1) {

        // Show error in code
        warning.innerText = `Un seul OS maximum doit être sélectionné.`;
        warning.className = 'd-block pt-3 red-text animated bounceIn faster';

        return null;
    }

    // Get the selected OS
    const os = rad.id.split('comp-')[1];



    // Retrieving the checked boxes for this OS
    const actions = Array.from(document.getElementsByClassName(`comp-action-${os}`));
    for (const action of actions) {

        // If this box was checked
        if (action.checked) {
            achecked ++;

            const found = actionFiles.find(a => a.id === action.id);
            if (found !== undefined) {
                blocks.push(found);
            } else {
                blocks.push(null);
            }
        }
    }


    // If zero or too many actions were checked
    if (achecked === 0) {

        // Show error in code
        warning.innerText = `Aucune action n'est sélectionnée.`;
        warning.className = 'd-block pt-3 red-text animated bounceIn faster';

        return null;
    
    } else if (achecked > actions.length) {

        // Show error in code
        warning.innerText = `Trop d'actions ont été sélectionnées.`;
        warning.className = 'd-block pt-3 red-text animated bounceIn faster';

        return null;

    } else {

        // Show status OK
        warning.className = 'd-block pt-3 green-text animated fadeIn faster';
        warning.innerText = 'Aucun problème détecté dans la sélection.';
    }

    return instructify(blocks);
}




// Turn blocks into instructions
function instructify (blocks) {

    let instructions = [];


    // For each of the selected blocks
    for (const block of blocks) {

        // For each line of the corresponding script
        for( const line of block.script) {

            // Retrieve instruction and body
            let inst = line.split(' ')[0];
            let bod = line.split(' ').splice(1).join(' ');


            if (keypresses.find(k => k === inst)) {
                bod = `${inst} ${bod}`;
                inst = 'KEY';
            }


            instructions.push({instruction: inst, body: bod});
        }
    }


    return instructions;
}




// Remove any error warnings in the code
export function removeCompErrorWarnings () {

    const warn = document.getElementById('comp-script-invalid');
    warn.innerText = '';
    warn.className = 'd-none';
}
