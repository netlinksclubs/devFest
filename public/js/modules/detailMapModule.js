/*global google */
/*global GoogleMap */

/*exported DetailMapModule*/

var DetailMapModule = (function() {
	"use strict";
	
	// Constants
	var MINIMUM_ZOOM_ALLOWED = 15;

	var $mapDetailCanvas = $('#map-detail-canvas'),
		location = new google.maps.LatLng(36.843611, 10.197424),
		googleDetailMap = new GoogleMap(location, MINIMUM_ZOOM_ALLOWED, google.maps.MapTypeId.ROADMAP),

		current_marker = null,

		infoWindow = null,
		$infoWindowContent = $('<div id="infoWindow" style="width: 300px; height:200px; word-wrap: break-word; text-align: left;"/>');


	var $latitude_input = $('#latitude_input'),
		$longitude_input = $('#longitude_input');

	var zoomChangedEventListener = null;
	function handleMapClick(event) {
		// Check if user isn't in infowWindow mode
		if(infoWindow === null) {
			if(googleDetailMap.getMap().getZoom() >= MINIMUM_ZOOM_ALLOWED)
			{
				// Update the input fields with the new values
				$latitude_input.val(event.latLng.lat());
				$longitude_input.val(event.latLng.lng());

				if(current_marker === null) {
					// Create new marker if no one is already created
					current_marker = googleDetailMap.addMarker(event.latLng);
				} else {
					current_marker.setPosition(event.latLng);
				}

				// Hide any previous tooltips (user completed the given task)
				$.powerTip.hide($mapDetailCanvas);

				// Clean up the zoom change event listener
				if(zoomChangedEventListener !== null) {
					google.maps.event.removeListener(zoomChangedEventListener);
					zoomChangedEventListener = null;
				}
			} else {
				if($mapDetailCanvas.data('initialTipOn')) {
					$.powerTip.hide($mapDetailCanvas, true);

					$mapDetailCanvas.data('initialTipOn', false);
				}

				if(current_marker === null) {
					$mapDetailCanvas.data('powertip', 'Please <b>zoom in</b> to be able to choose a location.');
				} else {
					$mapDetailCanvas.data('powertip', 'Please <b>zoom in</b> to be able to change the location.');
				}

				$.powerTip.show($mapDetailCanvas);

				if(zoomChangedEventListener === null)
				{
					zoomChangedEventListener = google.maps.event.addListener(googleDetailMap.getMap(), 'zoom_changed', function() {
						if(googleDetailMap.getMap().getZoom() >= MINIMUM_ZOOM_ALLOWED)
						{
							$.powerTip.hide($mapDetailCanvas);
						} else {
							$.powerTip.show($mapDetailCanvas);
						}
					});
				}
			}
		}
	}

	/*
	*	Initializes the marker mechanism
	*   What the marker mechanism does:
	*       - Update latitude and longitude as user changes marker position
	*       - Create the marker and update it's coordinates as needed on the map
	*       - Enforce a minimum zoom value for the user to choose or change location
	*       - Display tooltips guiding user through the marker placement process
	*/
	function initMarkerMechanism(location) {
		$mapDetailCanvas.powerTip({
			manual: true
		});

		// Location undefined then show tip to user
		if(location === undefined)
		{
			google.maps.event.addListenerOnce(googleDetailMap.getMap(), 'idle', function() {
				$mapDetailCanvas.data('powertip', '<b>Choose</b> a location.');
				$mapDetailCanvas.data('initialTipOn', true);

				$.powerTip.show($mapDetailCanvas);
			});
		} else {
			// Default location provided set a marker for it
			current_marker = googleDetailMap.addMarker(location);
			// Position map
			googleDetailMap.getMap().setCenter(location);
		}

		google.maps.event.addListener(googleDetailMap.getMap(), 'click', handleMapClick);
	}

	function initMarkerInfoWindowMechanism() {
		var $title_input = $('#title_input'),
			$description_input = $('#description_input'),

			title = '',
			description = '';

		function updateTitleAndDescription() {
			title = $title_input.val();
			description = $description_input.val();
			
			updateInfoWindowContent(title, description);
		}

		google.maps.event.addListenerOnce(googleDetailMap.getMap(), 'idle', function() {
			if($title_input.val() !== '' || $description_input.val() !== '') {
				updateTitleAndDescription();
			}
		});

		$title_input.keyup(updateTitleAndDescription);
		$title_input.change(updateTitleAndDescription);

		$description_input.keyup(updateTitleAndDescription);
		$description_input.change(updateTitleAndDescription);
	}

	function updateInfoWindowContent(title, description) {
		$infoWindowContent.html('<b>' + title + '</b><br />' + description);

		// If there is a marker on the map and infowindow hasn't already been created
		if(current_marker !== null && infoWindow === null) {

			if(googleDetailMap.getMap().getZoom() < MINIMUM_ZOOM_ALLOWED) {
				googleDetailMap.getMap().setZoom(MINIMUM_ZOOM_ALLOWED);
			}
			
			infoWindow = googleDetailMap.addInfoWindow($infoWindowContent[0], 300);
			infoWindow.open(googleDetailMap.getMap(), current_marker);

			googleDetailMap.getMap().setOptions({
				zoomControl: false,
				scrollwheel: false,
				disableDoubleClickZoom: true,
				draggable: false,
				panControl: false
			});

			$.powerTip.hide($mapDetailCanvas);

			google.maps.event.addListener(infoWindow, 'closeclick', function() {
				infoWindow = null;

				googleDetailMap.getMap().setOptions({
					zoomControl: true,
					scrollwheel: true,
					disableDoubleClickZoom: false,
					draggable: true,
					panControl: true
				});
			});
		}
	}

	function initFileUploadMechanism() {
		var $photoUpload = $('#photo-upload'),
			$uploadInfo = $('#upload-info'),
			initialText = $uploadInfo.text();

		$photoUpload.change(function() {
			var filePath = $photoUpload.val();

			if(filePath.match(/fakepath/)) {
				// update the file-path text using case-insensitive regex
				filePath = filePath.replace(/C:\\fakepath\\/i, '');
			}

			if(filePath === '') {
				filePath = initialText;
			}

			$uploadInfo.text(filePath);
		});
	}

	return {
		init: function () {
			googleDetailMap.createMap($mapDetailCanvas[0]);

			if($latitude_input.val() !== '' && $longitude_input.val() !== '') {
				var longLat = new google.maps.LatLng($latitude_input.val(), $longitude_input.val());

				initMarkerMechanism(longLat);
			} else {
				googleDetailMap.setLocationToCurrent();

				initMarkerMechanism();
			}

			initMarkerInfoWindowMechanism();

			initFileUploadMechanism();
		}
	};
})();