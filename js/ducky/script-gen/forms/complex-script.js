// Ensuring only OS-compatible actions are made available to click
let search = "";

for (const radio of document.getElementsByClassName('comp-radio')) {
    radio.addEventListener('change', (e) => {
        
        e.preventDefault();
        e.stopPropagation();


        console.log('ziakos');
        
    
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




// Define value correspondance between actions and files
const actionFiles = [
    {
        id: 'action1',
        filename: '../../../../actions/win/change-wp',
    },
    {
        id: 'action2',
        filename: '../../../../actions/win/exec-from-pwsh',
    },
    {
        id: 'action3',
        filename: '../../../../actions/win/launch-cmd',
    },
    {
        id: 'action4',
        filename: '../../../../actions/mac/launch-term',
    },
    {
        id: 'action5',
        filename: '../../../../actions/lin/launch-term',
    },
    {
        id: 'action6',
        filename: '../../../../actions/win/open-webpg',
    },
    {
        id: 'action7',
        filename: '../../../../actions/mac/open-webpg',
    },
    {
        id: 'action8',
        filename: '../../../../actions/lin/open-webpg',
    },
]

// Checking validity for the complex script
export function checkValidityComp () {

    let blocks = [];

    let bchecked = 0;
    let achecked = 0;

    const warning = document.getElementById('comp-script-invalid');



    // Getting the selected OS
    const radios = Array.from(document.getElementsByClassName('comp-radio'));
    for (const radio of radios) {
        if (radio.checked) {
            bchecked ++;
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
    os = radio.id.split('comp-')[1];



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
    }


    return blocks;
}
