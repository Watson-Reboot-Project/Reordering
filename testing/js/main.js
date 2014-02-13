// the config block. nothing special here. 
// we don't really need most of these libraries, but they're here regardless.
require.config({
    // baseUrl: 'testing/',
    paths: {
        angular:        '../lib/js/angular',
        bootstrap:      '../lib/js/bootstrap-3',
        jquery:         '../lib/js/jquery',
        less:           '../lib/js/less',
        'ui-bootstrap': '../lib/js/ui-bootstrap'
    },
    shim: {
        angular: {exports: 'angular'},
        'ui-bootstrap': {deps: ['angular']},
        bootstrap: {deps: ['jquery']}
    }
});

require(['contents', 'jquery', 'bootstrap'], function(contentsConstructor) {
    // instantiate our `contents`
    var contents = new contentsConstructor('contents.xml');
    // grab the html element we're going to stuff our links in
    var links = $('#links')[0];
    // grab the html element we're going to drop our title in
    var element = $('#title')[0];

    // set our title
    element.innerText = contents.index.name;

    // for each item in the Table of Contents, make a link
    for (var i = 0; i < contents.items.length; i++) {
        // grab the next item from contents
        var item = contents.items[i];
        // make an html element for it
        element = document.createElement('a');

        // set it's name
        element.innerHTML = item.fullname;
        // set the onclick function (necessary to keep track of where we are)
        element.onclick = item.onclick;
        // set the path to jump to
        element.href = item.path;
        // make it look pretty
        element.className = 'btn btn-default';

        // and drop it in the page
        links.appendChild(element);
    }
});
// vim: et sts=4 sw=4
