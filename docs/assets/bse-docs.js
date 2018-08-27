(function() {
    // replace jQuery.ajax with a function that mocks a successful AJAX response.
    // call bseAjaxMockSuccess() before testing.  To Do:  use proper testing framework (jest) + http://sinonjs.org/#testing-ajax
    bseAjaxMockSuccess = function() {
        $.ajax = function(args) {
            args.beforeSend();
            console.log("call ajax:", args);
            setTimeout(function() {
                args.success({
                    message : 'Mock AJAX call (success).',
                    response: '<span title="Mock Response">AJAX Response</span>'
                });
            }, 3000);
            setTimeout(function() {
                args.complete();
            }, 3000);
        };

        $.fn.load = function() {
            var args = arguments,
                complete = args.length>2?args[2]:args.length>1 && typeof(args[1],'function')?args[1]:null,
                markup = '<div class="item active">' +
                            '<img title="Item Loaded via Ajax" src="http://4.bp.blogspot.com/-jcJfG6y-qq4/V33W8_zZ8mI/AAAAAAAAJ_4/qAHDRFGCqwoHv6Fb9hhdtfg1i9xQjyNJwCK4B/s1600/ajax-tutorial-javascript-jquery.jpg">' +
                            '<div class="carousel-caption">Source:http://4.bp.blogspot.com/-jcJfG6y-qq4/V33W8_zZ8mI/AAAAAAAAJ_4/qAHDRFGCqwoHv6Fb9hhdtfg1i9xQjyNJwCK4B/s1600/ajax-tutorial-javascript-jquery.jpg</div>' +
                            'Data loaded from ' + args[0] + ' would go here' +
                         '</div>',
                self = this;
            console.log("call AJAX load:", self, args);

            setTimeout(function() {
                self.html(markup);
                if (complete) {
                    complete('Mock AJAX load (success)', 200, {});
                }
            }, 3000);
        };
    };

    bseAjaxMockSuccess();  // mock Ajax requests in docs.
})();
