import $ from "jquery"
import duckify from './duckify'

var text = "";

var generated = false;
var warned = false;
var blob;


// Generating the item list on click of the 'Generate' button
/*
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
*/


// Generating script from line generator
export function generateLineScript () {
    console.log('line');
    // TODO
}


// Generating script from complex generator
export function generateCompScript () {
    console.log('comp');
    // TODO
}





// Starting download on click of the 'Download' button
$('#dl-btn').click(function() {
    $(this).attr('href', window.URL.createObjectURL(blob));
    $(this).attr('download', 'script.txt');
});


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