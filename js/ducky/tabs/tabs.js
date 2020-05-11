import $ from 'jquery';

document.ready(function() {

    const hash = window.location.hash;
    
    if (hash === '#tutoriels' || hash === '#ressources') {
        hash && $('ul.nav a[href="' + hash + '"]').tab('show');
    }
});