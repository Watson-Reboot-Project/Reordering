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
    // grab the html element we're going to be sticking our links in
    var links = $('#links')[0];
    // grab the html element we're going to put our title in
    var element = $('#title')[0];
    // make our `contents` object
    var contents = new contentsConstructor('../../contents.xml');
    // grab our current item
    var current = contents.getCurrent();

    // set our title
    element.innerText = current.name;

    // a function to make links. reduce code duplication
    var addLink = function (item) {
        var element = document.createElement('a');
        element.innerText = item.fullname;
        element.onclick = item.onclick;
        element.href = '../../' + item.path;
        element.className = 'btn btn-default';

        links.appendChild(element);
    };

    // make a link for both back and forth
    addLink(contents.getPrev());
    addLink(contents.getNext());

});
// vim: et sts=4 sw=4
