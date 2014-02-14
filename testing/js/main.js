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
    var contents = new contentsConstructor('contents.xml', 'index');
    // grab the html element we're going to stuff our links in
    var links = $('#links')[0];

    var items = contents.getItems();

    // for each item in the Table of Contents, make a link
    for (var i = 0; i < items.length; i++) {
        // grab the next item from contents
        var item = items[i];
        // make an html element for it
        element = document.createElement('a');

        // set it's name
        element.innerHTML = 'Chapter ' + item.number + ': ' + item.name;
        // set the path to jump to
        element.href = item.path;
        // make it look pretty
        element.className = 'btn btn-default';

        // and drop it in the page
        links.appendChild(element);
    }
});
// vim: et sts=4 sw=4 fdm=indent
