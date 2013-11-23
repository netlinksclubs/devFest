/*global GoogleMap */
/*global google */
/*global pinsHandler*/

/*exported AlertMapModule*/

var AlertMapModule = (function() {
    "use strict";

    var $mapCanvas = $('#map_canvas'),
        location = new google.maps.LatLng(36.843611, 10.197424),
        googleAlertMap = new GoogleMap(location, 12, google.maps.MapTypeId.ROADMAP);

    return {
        init: function () {
            // Initialize map and save the returned object as map
            googleAlertMap.createMap($mapCanvas[0]);
            googleAlertMap.setLocationToCurrent();

            pinsHandler.init(googleAlertMap);
        }
    };
})();