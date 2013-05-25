(function ($) {
    $.fn.searcher = function (options) {
        var $shadowInput = $('<input/>'),
            $input = this,
            currentHit = null,
            replaceHitWithSpaces = function (length) {
                var replaceString = '';
                for (var x = 0; x < length; x++) {
                    replaceString += ' ';
                }
                ;
                return replaceString + (currentHit ? currentHit.substr(length, currentHit.length - length) : '');
            },
            ignoredKeys = [91, // CMD
                18, // ALT
                17, // CTRL
                16, // SHIFT
                9], // TAB
            reset = function () {
                $shadowInput.val('');
                currentHit = null;
            };
        // Configure shadowInput
        $shadowInput.attr({
            type: 'text',
            readonly: ''
        })
            .addClass($input.attr('class'))
            .css({
                position: 'absolute',
                borderColor: 'transparent',
                background: window.getComputedStyle($input.get(0), null).getPropertyValue('background'),
                backgroundColor: window.getComputedStyle($input.get(0), null).getPropertyValue('background-color'),
                zIndex: -1,
                color: 'silver',
                outline: 'none',
                fontFamily: 'Courier'
            });

        // Configure input target
        $input.css({
            background: 'transparent',
            fontFamily: 'Courier'
        });

        // Set options
        options = $.extend({
            url: '/users'
        }, options);

        // Set key events and fetching
        $input.on('keyup', function (event) {
            var query = $input.val();
            if ($input.val().length <= 1 || (event.keyCode === 8 && $input.val().length === 1)) {
                reset();
            } else if (ignoredKeys.indexOf(event.keyCode) === -1) {
                $.getJSON(options.url, {query: $input.val()}, function (user) {
                    if (query !== $input.val()) { // Make sure we are handling result according to what was queried
                        return;
                    }

                    if (user) {
                        currentHit = user.displayName;
                        $input.val(currentHit.substr(0, $input.val().length));
                        $shadowInput.val(replaceHitWithSpaces($input.val().length));
                    } else {
                        reset();
                    }
                });
            }
        });

        $input.on('keydown', function (event) {

            if ($input.val().length === 0) {
                return;
            } else if ((event.keyCode === 13 || event.keyCode === 39) && $shadowInput.val().length > 0) {
                $input.val(replaceHitWithSpaces(0));
                reset();
            } else if (event.keyCode === 8 && ($input.val().length <= 1 || window.getSelection().toString() === $input.val())) {
                reset();
            } else if (event.keyCode === 8) {
                $shadowInput.val(replaceHitWithSpaces($input.val().length - 1));
            } else {
                $shadowInput.val(replaceHitWithSpaces($input.val().length + 1))
            }
        });

        $input.on('blur', function () {
            if ($shadowInput.val().length > 0) {
                $input.val(replaceHitWithSpaces(0));
                reset();
            }
        });

        $input.before($shadowInput);
        return this;
    };
}(jQuery));