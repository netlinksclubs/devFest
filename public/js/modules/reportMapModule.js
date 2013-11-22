/*global google */
/*global GoogleMap */

/*exported ReportMapModule*/

var ReportMapModule = (function() {
	"use strict";
	return {
		init: function () {
			// Get maps modal container
			var $map = $('#report-page #map'),
				location = new google.maps.LatLng($map.data('latitude'), $map.data('longitude')),
				googleMap = new GoogleMap(location, 15, google.maps.MapTypeId.ROADMAP);

			googleMap.createMap($map[0]);

			googleMap.getMap().setOptions({
				zoomControl: false,
				scrollwheel: false,
				disableDoubleClickZoom: true,
				draggable: false,
				panControl: false
			});

			googleMap.addMarker(location);

			var $dataContainer = $('#data-container');

			$('.report-place').click(function() {
				if($dataContainer.hasClass('mapDisplayed')) {
					$dataContainer.removeClass('mapDisplayed');
				} else {
					$dataContainer.addClass('mapDisplayed');
				}
			});

			$('.enlarge-photo-button').click(function() {
				if($dataContainer.hasClass('photoDisplayed')) {
					$dataContainer.removeClass('photoDisplayed');
					$(this).removeClass('icon-resize-small').addClass('icon-resize-full');
				} else {
					$dataContainer.addClass('photoDisplayed');
					$(this).removeClass('icon-resize-full').addClass('icon-resize-small');
				}
			});
		}
	};
})();