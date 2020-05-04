import $ from "jquery";
import { duckifyAndCodify } from './duckify';
import { checkValidity, removeErrorWarnings } from '../forms/line-script.js';

var text = "";

var generated = false;
var warned = false;
let blob;


// Generating the item list on click of the 'Generate' button
$('#generate-btn').click(function() {
    text="";

    let empty = false;
    let checked = false;

    // Parsing checkboxes
    $('input[type="checkbox"]').each(function() {

        // If the box is checked
        if ($(this).prop('checked')) {
            checked = true;
            
            // Emptying the list in order to let it contain only our selected items
            if (!empty) {
                $("#selected-list").empty();
                empty = true;
            }
           
            // Displaying selected items
            $("#selected-list").append("<p>" + duckify($(this).attr('value')) + "</p>");
            text += $(this).attr('value') + '\n';
        }
    });

    // If any boxes are checked
    if (checked) {
        warned = false;
        
        // Generating file
        blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        generated = true;

        // Display the 'Download' button
        $('#dl-btn').css('display', "");
    }
});




const linePreTag = document.getElementById('line-script-render').parentElement;

// Generating script from line generator
export function generateLineScript () {

    // Remove existing error warnings
    removeErrorWarnings();



    // Parse lines and check validity for the form
    const instructions = checkValidity();
    if (instructions.some(i => i === null)) return false;



    // Disable Generate button for 5 seconds after click
    document.getElementById('line-generate-btn').disabled = true;
    setTimeout(() => {
        document.getElementById('line-generate-btn').disabled = false;
    }, 5000);



    // Hide 'Nothing yet'
    document.getElementById('line-rien').className = 'd-none';

    
    
    // Remove existing script from page
    removeFormerScript(linePreTag);



    // Get duckified script and prepare render
    const scriptFinal = duckifyAndCodify(instructions);



    // Show rendered script on page
    linePreTag.className = 'line-numbers mdb-color darken-3 py-3 animated fadeIn';
    

    // Prepare dl
    if (!generatedLine) {
        prepDownload(scriptFinal);
    }


    // Enable dl
    document.getElementById('line-dl-btn').className = '';


    return true;
}



// TODO: Generating script from complex generator
export function generateCompScript () {
    console.log('comp');

    // TODO

    return true;
}




// Remove previously generated script on page
function removeFormerScript (tag) {

    const kiddies = tag.children[0].children;
    
    if (kiddies.length > 0) {
        for (const child of kiddies) {
            child.remove();
        }
    }
}



let generatedLine = false;

// Prepares script download
function prepDownload (script) {

    blob = new Blob([script], {type: "text/plain;charset=utf-8"});
    generatedLine = true;
}



// Handle download for script
export function downloadScript (type) {
    document.getElementById(`${type}-dl-btn`).href = window.URL.createObjectURL(blob);
    document.getElementById(`${type}-dl-btn`).download = `script-${type}${generateHexString(4)}-dh.txt`;
}




// Generate random hexa string
function generateHexString (length) {
    return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}


// Detecting changes in the checkboxes' status by parsing each checkbox
$('input[type="checkbox"]').each(function() {

    // On checkbox status change
    $(this).change(function() {
        var changed = false;
        
        // If we detect ANY change in the checking of a particular box
        if(this.checked) { changed = true; } else { changed = true; }

        // If the user hasn't been warned of a change already
        if (!warned) {

            // If changes have been detected and the file has already been generated
            if (changed && generated) {
                
                // Warning the user by appending a new <p> element
                $('#selected-list').append('<p id="warning">WARNING: Some of the attributes of your script have changed. To take these changes into account, generate a new script by clicking the "Generate" button.</p>');
                warned = true;
            }
        }
    })
});