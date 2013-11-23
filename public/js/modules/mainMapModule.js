/*global google*/
/*global GoogleMap*/
/*global baseURL*/

/*global pinsHandler*/
/*global highlightWordsNoCase*/

/*exported MainMapModule*/

var MainMapModule = (function() {
    "use strict";

    var $googleMapCanvas = $('.google-Map'),
        $googleSearchInput = $('.google-Search-input'),
        $googleSearchIcon = $('.google-Search-searchIcon'),

        location = new google.maps.LatLng(36.843611, 10.197424),
        googleMap = new GoogleMap(location, 12, google.maps.MapTypeId.ROADMAP),

        geocoder = new google.maps.Geocoder();

    function requestHandler(request) {
        var geocoderRequest = {
                address: request
            };

        // Update UI
        $googleSearchIcon.removeClass('icon-search').addClass('icon-remove');

        // Launch a geocoding request to google Maps API
        geocoder.geocode(geocoderRequest, function(geocoderResult, geocoderStatus) {
            // If this fails...
            if(geocoderStatus !== 'OK') {
                // TODO: Report the error
                return;
            }

            // Cancel the SetLocationToCurrent action if it was previously launched
            googleMap.cancelSetLocationToCurrent();
            
            googleMap.getMap().fitBounds(geocoderResult[0].geometry.viewport);
            googleMap.setCenter(geocoderResult[0].geometry.location);
        });
    }

    return {
        init: function() {
            // Hide the alternative map
            //$('#maps-modal-reveal').hide();

            // Initialise google map
            googleMap.createMap($googleMapCanvas[0]);
            // Set location to current geo location
            googleMap.setLocationToCurrent();

            // Init pins
            pinsHandler.init(googleMap);

            // Put focus on the search box
            $googleSearchInput.focus();

            // Setup completition for the map search box
            var completion = $googleSearchInput.completion({
                requestURL: baseURL + '/api/suggestion/place',
                itemTemplate: $('<li/>')
                    .append('<span class="google-Search-suggestionText" />')
                    .append('<span class="google-Search-suggestionReports"></span>')
                    .append('<span class="google-Search-suggestionType"></span>'),
                responseFiller: function(responseItem) {
                    var query = $googleSearchInput.val();

                    $(this).find('.google-Search-suggestionText').html(highlightWordsNoCase(responseItem.text, query, 'normalWeight'));
                    $(this).find('.google-Search-suggestionReports').text(responseItem.reports);
                    $(this).find('.google-Search-suggestionType').text(responseItem.type);
                },
                queryOnCallback: function() {
                    if($googleSearchIcon.hasClass('icon-search')) {
                        $googleSearchIcon.removeClass('icon-search').addClass('icon-remove');
                    }
                },
                queryOffCallback: function() {
                    if($googleSearchIcon.hasClass('icon-remove')) {
                        $googleSearchIcon.removeClass('icon-remove').addClass('icon-search');
                    }
                },
                userChoiceHandler: function() {
                    var data = $(this).data('associatedData');
                    requestHandler(
                        data.text +
                        ' ' +
                        data.type
                    );

                    completion.setInputValue(data.text).focus();

                    completion.clear();
                },
                userRequestWithNoChoiceHandler: function() {
                    requestHandler($googleSearchInput.val());

                    completion.clear();
                },
                updateInputFromSelection: function() {
                    completion.setInputValue($(this).data('associatedData').text);
                },
                escapeHandler: function() {
                    completion.clear();

                    completion.setInputValue('');

                    $googleSearchIcon.removeClass('icon-remove').addClass('icon-search');
                }
            });

            $googleSearchIcon.click(function() {
                completion.setInputValue('').focus();

                if($(this).hasClass('icon-remove')) {
                    completion.clear();

                    $(this).removeClass('icon-remove').addClass('icon-search');
                }
            });
        }
    };
}) ();