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

window.name = 'NG_DEFER_BOOTSTRAP!';

require(['angular', 'bootstrap', 'contents'], function() {
    angular.element(document).ready(function() {
        angular.resumeBootstrap(['ContentsModule']);
    });
});

