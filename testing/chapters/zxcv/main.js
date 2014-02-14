// the config block. special emphasis on baseurl being up two and into js
require.config({
    baseUrl: '../../js',
    paths: {
        bootstrap:  '../lib/js/bootstrap-3',
        jquery:     '../lib/js/jquery',
    },
    shim: {
        bootstrap: {deps: ['jquery']}
    }
});

// we need contents and jquery now, but we also want to make sure bootstrap is
// loaded for the page
require(['contents', 'jquery', 'bootstrap'], function(contentsConstructor) {
    var links = $('#links')[0];
    var contents = new contentsConstructor('../../contents.xml', 'Two');
    var element, wrapper;

    element = $('#title')[0];
    element.innerText = 'Chapter ' + contents.getNumber() + ': Two';

    var index = contents.getIndex();
    element = document.createElement('a');
    element.className = 'btn btn-primary';
    element.innerText = 'Table of Contents';
    element.href = '../../' + index.path;
    links.appendChild(element);

    var prev = contents.getPrev();
    if (prev.name !== 'index') {
        element = document.createElement('a');
        element.className = 'btn btn-default';
        element.innerText = 'Previous: Chapter ' + prev.number + ' - ' + prev.name;
        element.href = '../../' + prev.path;
        links.appendChild(element);
    }

    var next = contents.getNext();
    if (next.name !== 'index') {
        element = document.createElement('a');
        element.className = 'btn btn-default';
        element.innerText = 'Next: Chapter ' + next.number + ' - ' + next.name;
        element.href = '../../' + prev.path;
        links.appendChild(element);
    }

});
// vim: et sts=4 sw=4
