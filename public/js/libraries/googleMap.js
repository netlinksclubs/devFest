/*global google */
/*global cookies*/
/* exported GoogleMap */

var GoogleMap = (function() {
    "use strict";
    var GEOLOCATION_LATITUDE_COOKIE_NAME = 'GoogleMapGeoLocationLatitude',
        GEOLOCATION_LONGITUDE_COOKIE_NAME = 'GoogleMapGeoLocationLongitude',
        GOOGLE_MAPS_PIN_ICON = {
            url: '../img/map/cercle.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(30, 30),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0,0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(15, 15)
        };
    // Google maps reference documentation: https://developers.google.com/maps/documentation/javascript/reference

    var mapConstructor = function (center, zoom, mapTypeId) {
        var mapOptions = {
            center: center,
            zoom: zoom,
            mapTypeId: mapTypeId, // Type of the map ROADMAP, SATELLITE, HYBRID, TERRAIN
            styles: [
                {
                    featureType: "road",
                    stylers: [
                      { visibility: "simplified" }
                    ]
                }
            ]
        },
        map,

        cancelSetLocationToCurrent = false;

        this.setMap = function (value) {
            map = value;
        };

        this.getMap = function () {
            return map;
        };

        this.getMapOptions = function () {
            return mapOptions;
        };

        this.reinitSetLocationToCurrent = function () {
            cancelSetLocationToCurrent = false;
        };

        this.cancelSetLocationToCurrent = function () {
            cancelSetLocationToCurrent = true;
        };

        this.isSetLocationToCurrentCanceled = function () {
            return cancelSetLocationToCurrent;
        };
    };

    mapConstructor.prototype = {
        createMap: function (map) {
            this.setMap(new google.maps.Map(map, this.getMapOptions()));

            return this;
        },
        addMarker: function (location) {
            return new google.maps.Marker({
                position: location,
                map: this.getMap(),
                icon: GOOGLE_MAPS_PIN_ICON
            });
        },
        addInfoWindow: function (contentString, maxWidth) {
            return new google.maps.InfoWindow({
                content: contentString,
                maxWidth: maxWidth
            });
        },
        addPopForMarker: function (marker, infoWindow) {
            // windowIsOpen indicates whether the info window is open or not
            var windowIsOpen = false;

            // Add event listner for clicks on the marker
            google.maps.event.addListener(marker, 'click', function() {
                if(windowIsOpen)
                {
                    infoWindow.close();
                }
                else
                {
                    infoWindow.open(this.getMap(), marker);
                }

                // if closed => open if open => closed
                windowIsOpen = !windowIsOpen;
            });
        },
        setLocationToCurrent: function () {
            var map = this.getMap(),
                globalThis = this;

            var storedLatitude = cookies.read(GEOLOCATION_LATITUDE_COOKIE_NAME),
                storedLongitude = cookies.read(GEOLOCATION_LONGITUDE_COOKIE_NAME);
            if(storedLatitude !== null && storedLongitude !== null) {
                // Temporary center
                map.setCenter(new google.maps.LatLng(storedLatitude, storedLongitude));
            }

            function success(position) {
                // Ensure that the switching of locations isn't canceled
                if(globalThis.isSetLocationToCurrentCanceled() === false) {
                    if(position.coords.latitude === storedLatitude && position.coords.longitude === storedLongitude) {
                        // Nothing todo previous position hasn't changed
                        return ;
                    }

                    cookies.create(GEOLOCATION_LATITUDE_COOKIE_NAME, position.coords.latitude, 100);
                    cookies.create(GEOLOCATION_LONGITUDE_COOKIE_NAME, position.coords.longitude, 100);

                    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                } else {
                    globalThis.reinitSetLocationToCurrent();
                }
            }

            function error(msg) {
                console.log('error: ' + msg);
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        },
        setCenter: function (position) {
            this.getMap().setCenter(position);
        },
        loadPins: function(url, callback) {
            var localThis = this;
            $.get(url).done(function(data) {
                for(var i = 0; i < data.length; i++) {
                    var marker = localThis.addMarker(new google.maps.LatLng(data[i].latitude, data[i].longitude));

                    callback.call(marker, data[i]);
                }
            }).fail(function() {
                console.log('something went wrong, please refresh');
            });
        }
    };

    return mapConstructor;
})();