require.config({
    // baseUrl: './',
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
    var contents = new contentsConstructor('contents.xml'),
        links = $('#links')[0],
        item,
        element;

    element = $('#title')[0];
    element.innerText = contents.index;

    for (var i = 0; i < contents.items.length; i++) {
        item = contents.items[i];
        element = document.createElement('a');

        element.innerHTML = item.fullname;
        element.onclick = function() { sessionStorage.current = JSON.stringify(item); }
        element.href = item.path;
        element.className = 'btn btn-default';

        links.appendChild(element);
    }

});

