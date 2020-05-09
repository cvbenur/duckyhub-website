import { duckifyAndCodify } from './duckify';
import { checkValidityLine, removeErrorWarnings } from '../forms/line-script.js';
import { checkValidityComp } from '../forms/complex-script.js';



// Define the blob for the downloadable script
let blob;



/*
    ####    FOR BOTH SCRIPTS    ####
*/


// Remove previously generated script on page
function removeFormerScript (tag) {

    while (tag.firstChild) {
        tag.removeChild(tag.firstChild);
    }
}


// Prepares script download
function prepDownload (script) {
    blob = new Blob([script], {type: "text/plain;charset=utf-8"});
}


// Handle download for script
export function downloadScript (type) {
    document.getElementById(`${type}-dl-btn`).href = window.URL.createObjectURL(blob);
    document.getElementById(`${type}-dl-btn`).download = `script-${type}${generateHexString(4)}-dh.txt`;

    blob = null;
}


// Generate random hexa string
function generateHexString (length) {
    return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}



/*
    ####    FOR LINE SCRIPT     ####
*/


// Define tag in which to render the line script
const lineCodeTag = document.getElementById('line-script-render');

// Generating script from line generator
export function generateLineScript () {

    // Remove existing error warnings
    removeErrorWarnings();



    // Parse lines and check validity for the form
    const instructions = checkValidityLine();
    if (instructions.some(i => i === null)) return false;



    // Disable Generate button for 5 seconds after click
    document.getElementById('line-generate-btn').disabled = true;
    setTimeout(() => {
        document.getElementById('line-generate-btn').disabled = false;
    }, 5000);



    // Hide 'Nothing yet'
    document.getElementById('line-rien').className = 'd-none';

    
    
    // Remove existing script from page
    removeFormerScript(lineCodeTag);



    // Get duckified script and prepare render
    const scriptFinal = duckifyAndCodify(instructions);



    // Show rendered script on page
    lineCodeTag.parentElement.className = 'line-numbers mdb-color darken-3 py-3 animated fadeIn';
    


    // Prepare dl
    prepDownload(scriptFinal);

    

    // Enable dl
    document.getElementById('line-dl-btn').className = '';


    return true;
}




// Define tag in whitch to render the complex script
const compCodeTag = document.getElementById('comp-script-render');

// TODO: Generating script from complex generator
export function generateCompScript () {
    console.log('comp');

    // Parse lines and check validity for the form
    const instructions = checkValidityComp();
    if (instructions.some(i => i === null)) return false;

    return true;
}
