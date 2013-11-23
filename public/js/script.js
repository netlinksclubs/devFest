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

    var $buttonGroup = $('#buttonGroup');
    $buttonGroup.children().click(function() {
        $buttonGroup.addClass('hide')
            .parent()
            .text("Someone is coming... Searching...");
    });

    var $userMeetBox = $('#userMeetBox');
    (function refreshResponse() {
        $.ajax({
            type: "POST",
            url: baseURL + '/request/hasresponse',
            dataType: 'json',
        })
        .done(function( data ) {
            if(data.length > 0)
            {
                $userMeetBox.find('.userSocialInfo .icon-google-plus').attr('href', 'http://plus.google.com/' + data[0].google_id);
                $userMeetBox.find('.userTitle').text(data[0].first_name + ' ' + data[0].last_name);
                $userMeetBox.find('.userPic').attr('src', data[0].avatar);

                $userMeetBox.fadeIn(1000);

                $buttonGroup.parent().text('Yay, someone is here for you :)');
            }
            else
            {
                setTimeout(refreshResponse, 1000);
            }
            
        });
    })();

    $('#closeBox').click(function() {
        $.ajax({
            type: "POST",
            url: baseURL + '/request/makedone',
            dataType: 'json',
        })
        .done(function( data ) {
            $userMeetBox.fadeOut(700);
        });
    });

    $bulle=$(".bulle");
    $bulle.text("");
    chaine=$bulle.attr("data-contentbefore");
    i=1;
    a = new Audio("kbsound.mp3");

    function textTyping() 
    {
        if ($bulle.text()==$bulle.attr("data-contentbefore")){
            $bulle.text("");
        }
        $bulle.text($bulle.text()+chaine.charAt(0));
        chaine=chaine.slice(1,chaine.length);
        if (chaine!="") {
            setTimeout(textTyping,100); 
            a.play();
        }
        else {
            if (i==1) {
            setTimeout(startAnimations,2000); 
            $bulle.text($bulle.attr("data-contentbefore"));
            chaine=$bulle.attr("data-contentafter");
            ch=chaine;
            setTimeout(textTyping,3000);
            i++; }

        }

    }

    textTyping();



    function startAnimations() {
        i++;
        $('body').css('-webkit-animation','animfilter linear 3s forwards running');
        $('#animation1').css('-webkit-animation','showsun linear 5s forwards running');
        $('#slogan').css('-webkit-animation','show 6s ease-out 0s forwards running');
        $('.googlebutton').css('-webkit-animation','show 8s ease-out 0s forwards running');
    }
});