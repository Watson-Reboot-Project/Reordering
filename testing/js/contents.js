define(['angular', 'jquery'], function () {
    var app = angular.module('ContentsModule', []);

    app.controller('Controller', function($scope) {

        $.get('contents.xml', {}, function (xml) {
            var items = [],
                item;

            $('chapter', xml).each(function () {
                item = {name: $(this).text()};
                item.path = 'chapters/' + item.name + '/index.html';

                if (items.length != 0) {
                    prev = items[items.length - 1];
                    item.prev = item;
                    prev.next = item;
                }

                items.push(item);
            });

            console.log(items);
            $scope.items = items;
            $scope.$apply();
        });
    });
});
