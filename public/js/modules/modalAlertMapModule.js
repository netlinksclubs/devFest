/*global AlertMapModule */
/*global CustomEventsDetectionModule*/
/*global Modernizr*/

/*exported ModalAlertMapModule*/

/*
 * This module takes care of the display of the map modal box
 */
var ModalAlertMapModule = (function() {
    "use strict";

    return {
        init: function () {
            // Get maps modal container
            var $mapsModalContainer = $('#maps-modal-container'),
                // Get maps modal reveal button
                $mapsModalReveal = $mapsModalContainer.find('#maps-modal-reveal'),
                initialized = false;

            // When user clicks on the reveal button
            $mapsModalReveal.on('click', function() {

                // If not already initialized
                if (!initialized) {
                    if (Modernizr.csstransitions) {
                        // Begin loading data at the end of the transition
                        $mapsModalContainer.bind(CustomEventsDetectionModule.transitionEndEventName(), function() {
                            AlertMapModule.init();
                            $mapsModalContainer.addClass('loaded');

                            $(this).unbind(CustomEventsDetectionModule.transitionEndEventName());
                        });
                    } else {
                        // No animation support just do it already
                        AlertMapModule.init();

                        $mapsModalContainer.addClass('loaded');
                    }

                    initialized = true;
                }

                // If not already revealed
                if (!$mapsModalContainer.hasClass('revealed')) {
                    // Add the class revealed to the container
                    $mapsModalContainer.addClass('revealed');
                } else {
                    // Remove the class revealed from the container
                    $mapsModalContainer.removeClass('revealed');
                }
            });

            // When the user clicks on the modal box
            $mapsModalContainer.find('#maps-modal-box').on('click', function(e) {
                // if they clicked on the box only and not any other element in the box
                if (this === e.target) {
                    // Remove the class revealed
                    $mapsModalContainer.removeClass('revealed');
                }
            });
        }
    };
}());