// Ensuring only OS-compatible actions are made available to click
let search = "";

for (const radio of document.getElementsByClassName('custom-control-input')) {
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

        // If this particular checkbox gets checked
        if (e.target.checked) {

            // Enable Generate button
            document.getElementById('comp-generate-btn').disabled = false;

        // Else, if no ckeckbox is left checked
        } else if (!Array.from(actions).find(b => { b.checked })) {

            // Disable Generate button
            document.getElementById('comp-generate-btn').disabled = true;
        }
    });
}
