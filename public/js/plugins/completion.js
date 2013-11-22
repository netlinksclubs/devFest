(function ($) {
    "use strict";

    $.fn.completion = function(options) {
        var settings = $.extend({
            requestURL: "",
            itemTemplate: $('<li></li>'),
            responseFiller: function(responseItem) {
                $(this).text(responseItem);
            },
            completionBoxID: "completion-Box",
            queryOnCallback: function(query) { return query; },
            queryOffCallback: function() {},
            userChoiceHandler: function() {},
            userRequestWithNoChoiceHandler: function() {},
            updateInputFromSelection: function() {},
            escapeHandler: function() {}
        }, options);

        var $completionBox = $("#" + settings.completionBoxID);

        var currentlySelectedElement = $();

        function addSuggestion(dataObject) {
            var $completionElement = settings.itemTemplate.clone();

            $completionBox.append($completionElement);

            settings.responseFiller.call($completionElement, dataObject);

            return $completionElement;
        }

        // Save current value of element
        this.data('oldVal', this.val());

        // Look for changes in the value
        this.bind("propertychange keyup input paste", function(e){
            var $this = $(this);

            // We don't handle arrowup, arrowdown, escape and enter clicks
            // This ensures that value changes from these interactions don't get in the way
            if([40, 38, 27, 13].indexOf(e.which) > -1) {
                return ;
            }

            // If value hasn't changed pointless to do anything
            if ($this.data('oldVal') === $this.val()) {
                return ;
            }
            
            // Updated stored value
            $this.data('oldVal', $this.val());

            if($this.val() === '') {
                $completionBox.fadeOut(100);

                settings.queryOffCallback.call(this);

                return ;
            }

            // Callback for query initiation
            settings.queryOnCallback.call(this, $this.val());

            $.ajax({
                dataType: "json",
                url: settings.requestURL,
                data: {request: $this.val()},
                queue: 'completion',
                success: function(data) {
                    if(data.length === 0) {
                        $completionBox.fadeOut(50, function() {
                            $completionBox.empty();
                        });

                        currentlySelectedElement = null;

                        return ;
                    }

                    $completionBox.empty();

                    if($completionBox.is(':hidden')) {
                        $completionBox.fadeIn(100);
                    }

                    for(var i=0; i < data.length; i++) {
                        addSuggestion(data[i]).data('associatedData', data[i]);
                    }

                    currentlySelectedElement = $completionBox.children().first().addClass('selected');
                }
            });
        });

        this.keydown(function(e) {
            if(e.which === 27) { // Escape character
                settings.escapeHandler.call(this);
            }

            if(currentlySelectedElement === null) {
                return ;
            }

            if (e.which === 40) {
                currentlySelectedElement = currentlySelectedElement.removeClass('selected').next().addClass('selected');

                if(currentlySelectedElement.length === 0) {
                    currentlySelectedElement = $completionBox.children().first().addClass('selected');
                }

                settings.updateInputFromSelection.call(currentlySelectedElement[0]);

                return false;
            } else if (e.which === 38) { //Up arrow
                currentlySelectedElement = currentlySelectedElement.removeClass('selected').prev().addClass('selected');

                if(currentlySelectedElement.length === 0) {
                    currentlySelectedElement = $completionBox.children().last().addClass('selected');
                }

                settings.updateInputFromSelection.call(currentlySelectedElement[0]);

                return false;
            }
        });

        $completionBox.on('mouseenter', 'li', function() {
            if(currentlySelectedElement[0] !== this) {
                currentlySelectedElement.removeClass('selected');
                currentlySelectedElement = $(this).addClass('selected');

                settings.updateInputFromSelection.call(this);
            }
        });

        $completionBox.on('click', 'li', function() {
            settings.userChoiceHandler.call(this);
        });

        // Handle enter presses
        this.keypress(function(e) {
            if(e.which === 13) {
                if(currentlySelectedElement !== null) {
                    settings.userChoiceHandler.call(currentlySelectedElement[0]);

                    currentlySelectedElement = null;
                } else {
                    settings.userRequestWithNoChoiceHandler.call();
                }
            }
        });

        var $input = $(this);
        this.data('completion', {
            clear: function() {
                $completionBox.fadeOut(100);
            },
            setInputValue: function(value) {
                $input.val(value).data('oldVal', value);

                return $input;
            }
        });

        return this.data('completion');
    };

}(jQuery));