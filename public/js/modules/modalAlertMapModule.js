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

            AlertMapModule.init();

            // When the user clicks on the modal box
            /*$mapsModalContainer.find('#maps-modal-box').on('click', function(e) {
                // if they clicked on the box only and not any other element in the box
                if (this === e.target) {
                    // Remove the class revealed
                    $mapsModalContainer.removeClass('revealed');
                }
            });*/
        }
    };
}());