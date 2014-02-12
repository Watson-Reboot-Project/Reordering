define(['jquery'], function () {
    return function(xml_location) {
        var self = this;

        var init = function () {

            var items = self.items = JSON.parse(sessionStorage.getItem('items'));

            if (items === null) {
                items = self.items = [];

                // $.get(xml_location, {}, function(xml) {
                $.ajax({url: xml_location,
                        async: false,
                        success: function (xml) {

                    console.log('[+] Pulling in XML from disk...');

                    var item, i = 0;
                    var index = self.index = $($('index', xml)[0]).find('name').text();

                    $('chapter', xml).each(function () {
                        i += 1;
                        item = {};
                        $xmlobj = $(this);

                        item.name = $xmlobj.find('name').text();
                        item.path = $xmlobj.find('path').text();
                        item.fullname = 'Chapter ' + i + ': ' + item.name;

                        items.push(item);
                    });

                    sessionStorage.items = JSON.stringify(items);
                    sessionStorage.index = JSON.stringify(index);

                }});

            } else {
                self.index = JSON.parse(sessionStorage.index);
            }
        };

        self.getNext = function () {
            var current = sessionStorage.current;
            if (current === null) {
                document.write('<h1>ERROR</h1>');
                throw new Error('sessionStorage does not contain current');
            }

            var n = self.items.indexOf(current);
            if (self.items.length == n + 1) {
                // the current item is last: link them home
                return self.index;
            } else {
                return self.items[n + 1];
            }
        };

        self.getPrev = function () {
            var current = sessionStorage.current;
            if (current === null) {
                document.write('<h1>ERROR</h1>');
                throw new Error('sessionStorage does not contain current');
            }

            var n = self.items.indexOf(current);
            if (0 === n) {
                // the current item is the first: link them home
                return self.index;
            } else {
                return self.items[n - 1];
            }
        };

        self.getCurrent = function () {
            var current = sessionStorage.current;
            if (current === null) {
                document.write('<h1>ERROR</h1>');
                throw new Error('sessionStorage does not contain current');
            }

            // all they want is current
            return current;
        };

        init();
    };
});
// vim: et sts=4 sw=4
