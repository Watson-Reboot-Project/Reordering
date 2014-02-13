define(['jquery'], function () {
    function contentsConstructor(xml_location) {
        // so we have a reference to our `contents` object throughout
        var self = this;

        // inner function called on each button click to prep for next page
        var setPos = function (pos) {//{{{
            return function () {
                sessionStorage.pos = JSON.stringify(pos);

                var x = (sessionStorage.x !== undefined) ?  JSON.parse(sessionStorage.x) : [];
                x.push(pos);
                sessionStorage.x = JSON.stringify(x);
            };
        };//}}}

        // do all of this when making the object
        var init = function () {
            // try and pull in our data from local storage, if it's not there,
            // pull it in from disk
            var items = sessionStorage.items;
            if (items === undefined) {
                console.log('[+] Pulling in XML from disk...');//{{{
                items = self.items = [];

                // synchronously pull in xml and parse it into self.index and
                // self.items
                $.ajax({ url: xml_location,
                         async: false,
                         success: function (xml) {


                    var item, i = 0;
                    var $xmlobj = $($('index', xml)[0]);
                    var index = self.index = {};

                    // set up the 'Table Of Contents' item
                    index.name = 'Home';
                    index.path = $xmlobj.find('path').text();
                    index.fullname = $xmlobj.find('name').text();

                    // set up our list of items
                    $chapters = $('chapter', xml);
                    for (i = 0; i < $chapters.length; i++) {
                        item = {};
                        $xmlobj = $($chapters[i]);

                        item.name = $xmlobj.find('name').text();
                        item.path = $xmlobj.find('path').text();
                        item.fullname = 'Chapter ' + (i + 1) + ': ' + item.name;
                        item.pos = i;
                        item.onclick = setPos(item.pos);

                        items.push(item);
                    }

                    // put them in storage
                    sessionStorage.items = JSON.stringify(items);
                    sessionStorage.index = JSON.stringify(index);

                }});//}}}
            } else {
                // otherwise, they exist in storage
                console.log('[+] Pulling in items from sessionStorage...');//{{{

                self.index = JSON.parse(sessionStorage.index);
                self.items = JSON.parse(items);
                self.pos = sessionStorage.pos;
                if (self.pos !== undefined) {
                    self.pos = JSON.parse(self.pos);
                } else {
                    console.log('[+] No pos yet.');
                }

                // functions don't get stored correctly, so we recreate them on loadup
                for (var i = 0; i < self.items.length; i++) {
                    var item = self.items[i];
                    item.onclick = setPos(item.pos);
                }//}}}
            }
        };

        // get the next item in sequence
        // (used for setting up links)
        self.getNext = function () {//{{{
            var pos = self.pos;
            if (pos === undefined) {
                $('#title').setText('<h1>ERROR</h1>');
                throw new Error('[-] No position set');
            }

            if (self.items.length == pos + 1) {
                // the current item is last: link them home
                return self.index;
            } else {
                return self.items[pos + 1];
            }
        };//}}}

        // get the previous item in sequence
        // (used for setting up links)
        self.getPrev = function () {//{{{
            var pos = self.pos;
            if (pos === undefined) {
                $('#title').setText('<h1>ERROR</h1>');
                throw new Error('[-] No position set');
            }

            if (0 === pos) {
                // the current item is the first: link them home
                return self.index;
            } else {
                return self.items[pos - 1];
            }
        };//}}}

        // get the current item
        // (used for getting our own chapter title)
        self.getCurrent = function () {//{{{
            var pos = self.pos;
            if (pos === undefined) {
                $('#title').setText('<h1>ERROR</h1>');
                throw new Error('[-] No position set');
            }

            // all they want is current
            return self.items[pos];
        };//}}}

        // call our loadup function
        init();
    }

    return contentsConstructor;

});
// vim: et sts=4 sw=4 fdm=marker
