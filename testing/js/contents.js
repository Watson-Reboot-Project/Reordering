console.log('contents sourced');
define(['angular', 'jquery'], function () {
    var app = angular.module('ContentsModule', []);

    app.controller('Controller', function($scope) {
        console.log('Controller Called');

        $scope.items = [];

        $scope.find = function (name) {
            items = $scope.items
            for (var i = 0; i < $scope.items.length; i++) {
                if (items[i].name === name) {
                    return items[i];
                }
            }
            return {name: 'NOT FOUND', path: '#'};
        }

        // should set this up to take in `contents.xml` from somewhere else, so
        // we don't have to symlink it in each directory. also: not sure what
        // else we're going to need.
        $.get('contents.xml', {}, function (xml) {
            var items = [],
                item;

            $('chapter', xml).each(function () {
                item = {name: $(this).text()};
                item.path = 'chapters/' + item.name + '/index.html';

                if (items.length != 0) {
                    prev = items[items.length - 1];
                    item.prev = {name: prev.name, path: prev.path};
                    prev.next = {name: item.name, path: item.path};
                } else {
                    item.prev = {name: 'Home', path: 'index.html'};
                }

                items.push(item);
            });

            items[items.length - 1].next = {name: 'Home', path: 'index.html'};

            console.log(items);
            $scope.items = items;
            $scope.$apply();
        });
    });
});

