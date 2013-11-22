/*
    @codekit-prepend "helpers/strings.js"
    
    @codekit-prepend "libraries/modernizr.js"
    @codekit-prepend "plugins/jquery.powertip.min.js"
    @codekit-prepend "plugins/completion.js"
    @codekit-prepend "libraries/cookies.js"
    @codekit-prepend "libraries/googleMap.js"

    @codekit-prepend "libraries/pinsHandler.js"

    @codekit-prepend "modules/customEventsDetectionModule.js"
    @codekit-prepend "modules/alertMapModule.js"
    @codekit-prepend "modules/modalAlertMapModule.js"
    @codekit-prepend "modules/detailMapModule.js"
    @codekit-prepend "modules/reportMapModule.js"
    @codekit-prepend "modules/mainMapModule.js"

    @codekit-prepend "modules/facebookShareModule.js"
*/

$(document).ready(function() {
    "use strict";

	ModalAlertMapModule.init();

	if($('#details_page').length === 1) {
		DetailMapModule.init();
	}
    var $reportPage = $('#report-page');
	if($reportPage.length === 1) {
		ReportMapModule.init();
	}

    if($('#map-page').length === 1) {
        MainMapModule.init();
    }

    var $shareFacebook = $('.share-facebook');
    if($shareFacebook.length > 0) {
        facebookShareModule.init($reportPage, $shareFacebook);
    }
});