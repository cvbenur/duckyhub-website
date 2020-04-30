// Create new element to be added
function createNewScriptLine () {


    let select = document.createElement('select');
    select.className = "browser-default custom-select keyword-list";

    let none = document.createElement('option');
    none.selected = true;
    none.value = "none";
    none.innerHTML = "Sélectionner une option";
    select.appendChild(none);

    let string = document.createElement('option');
    string.value = "string";
    string.innerHTML = "Taper une chaîne de caractères";
    select.appendChild(string);

    let key = document.createElement('option');
    key.value = "key";
    key.innerHTML = "Pression de touche du clavier";
    select.appendChild(key);

    let delay = document.createElement('option');
    delay.value = "delay";
    delay.innerHTML = "Pause (en ms)";
    select.appendChild(delay);

    let rem = document.createElement('option');
    rem.value = "rem";
    rem.innerHTML = "Ligne de commentaire";
    select.appendChild(rem);



    let selectDiv = document.createElement('div');
    selectDiv.appendChild(select);


    let input = document.createElement('input');
    input.type = "text";
    input.name = "line-text";
    input.className = "form-control";
    input.placeholder = "Ecrire votre instruction ici !";


    let col = document.createElement('div');
    col.className = "col px-2";
    col.appendChild(input);




    let i = document.createElement('i');
    i.className = "fas fa-trash-alt";

    let button = document.createElement('button');
    button.type = "button";
    button.className = "btn red white-text py-2 my-0 px-3 btn-line-remove";
    button.appendChild(i);



    let row = document.createElement('div');
    row.className = "line-form-row row pt-2";
    row.appendChild(selectDiv);
    row.appendChild(col);
    row.appendChild(button);


    return row;
}



// Add new line on click
document.getElementById('add-line-btn').addEventListener('click', () => {

    document.getElementById('line-whole-script').appendChild(createNewScriptLine());

    for (let btn of document.getElementsByClassName('btn-line-remove')) {
        btn.disabled = false;
    }
});



// Remove line on click
// TODO





window.addEventListener('load', function() {


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('line-needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {

        form.addEventListener('submit', function(event) {

            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
            
        }, false);

    });

}, false);