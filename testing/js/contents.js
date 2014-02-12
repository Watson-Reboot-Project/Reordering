define(['jquery'], function () {
    return function(xml_location) {
        var items;

        var init = function () {
            items = JSON.parse(sessionStorage.items);
            if (items === null) {
                items = [];

                $.get(xml_location, {}, function(xml) {
                    var item, i = 0;

                    var index = $('index', xml)[0].find('name').text();

                    $('chapter', xml).each(function () {
                        i += 1;
                        item = {};
                        $xmlobj = $(this);

                        item.name = $xmlobj.find('name').text();
                        item.path = $xmlobj.find('path').text();
                        item.fullname = 'Chapter ' + i + ': ' + item.name;

                        // if (items.length !== 0) {
                        //     prev = items[items.length - 1];
                        //     item.prev = {name: prev.name, path: prev.path,
                        //             fullname: prev.fullname};
                        //     prev.next = {name: item.name, path: item.path,
                        //             fullname: item.fullname};
                        // } else {
                        //     item.prev = {name: 'Home', path: '../../index.html',
                        //             fullname: index};
                        // }

                        items.push(item);
                    });

                    // items[items.length - 1].next = {name: 'Home',
                    //         path: '../../index.html', fullname: index};
                    sessionStorage.items = JSON.stringify(items);
                });
            }
        };

        this.getNextLink = function (element) {
            // TODO:
        };

        this.prepForNext = function () {
            // TODO:
        };

        this.getPreviousLink = function () {
            // TODO:
        };

        this.prepForPrevious = function () {
            // TODO:
        };

        this.getCurrent = function () {
            // TODO:
        };

        init();
    }
});
// vim: et sts=4 sw=4
