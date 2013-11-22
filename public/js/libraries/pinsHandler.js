/*global baseURL*/
/*global google*/
/*exported pinsHandler*/


var pinsHandler = (function() {
    "use strict";

    var // windowIsOpen indicates whether the info window is open or not
        windowIsOpen = false,
        currentMarker = null,
        googleMap = null;

    function closeInfoWindow(infoWindow) {
        infoWindow.close();

        googleMap.getMap().setOptions({
            zoomControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            draggable: true,
            panControl: true
        });

        windowIsOpen = false;
    }

    function createMarkerHandler($infoWindowContent, infoWindow, data, marker) {
        return function() {
            if(! windowIsOpen)
            {
                currentMarker = marker;

                $infoWindowContent.html(
                    '<b>' + data.title + '</b><br />' +
                    data.description + '<br/>' +
                    '<a href="' + baseURL + '/report/' + data.id + '">visit report</a>'
                );

                infoWindow.open(googleMap.getMap(), marker);

                googleMap.getMap().setOptions({
                    zoomControl: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true,
                    draggable: false,
                    panControl: false
                });

                windowIsOpen = true;
            } else if(currentMarker === marker) {
                closeInfoWindow(infoWindow);
            }
        };
    }

    return {
        init: function(providedGoogleMap) {
            googleMap = providedGoogleMap;

            var $infoWindowContent = $('<div id="infoWindow" style="width: 150px; height:150px; word-wrap: break-word; text-align: left; padding: 5px;"/>'),
            infoWindow = googleMap.addInfoWindow($infoWindowContent[0], 300);

            google.maps.event.addListener(infoWindow, 'closeclick', function() {
                closeInfoWindow(infoWindow);
            });

            googleMap.loadPins(baseURL + '/api/report', function(data) {
                google.maps.event.addListener(this, 'click', createMarkerHandler($infoWindowContent, infoWindow, data, this));
            });
        }
    };
}());