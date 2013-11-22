/*global baseURL*/
/*global FB*/
/*global Config*/
/*exported facebookShareModule*/

var facebookShareModule = (function() {
    "use strict";

    var $reportPage,
        $shareFacebook;

    function facebookShareDialog() {

        FB.ui(
            {
                method: 'feed',
                name: $reportPage.data('name'),
                caption: $reportPage.data('caption'),
                description: $reportPage.data('description'),
                link: $reportPage.data('link'),
                picture: $reportPage.data('picture')
            },
            function(response) {
                if (response && response.post_id) {
                    var count = $shareFacebook.data('shareCount') + 1;

                    $shareFacebook
                        .data('powertip', shareCountMessage(count))
                        .data('shareCount', count);
                }
            }
        );

        return false;
    }

    function shareCountMessage($count) {
        switch($count) {
            case 0:
                return "Be the first to share!";

            case 1:
                return "1 share";

            default:
                return $count + " shares";
        }
    }

    function initShareCount() {
        FB.api({
            method: 'fql.query',
            query: 'SELECT share_count FROM link_stat WHERE url = "' + $reportPage.data('link') + '"'
        }, function (data) {
            var count = parseInt(data[0].share_count, 10);

            $shareFacebook
                .data('powertip', shareCountMessage(count))
                .data('shareCount', count)
                .powerTip({
                    placement: 'n'
                });
        });
    }

    return {
        init: function ($passedReportPage, $passedShareFacebook) {
            $reportPage = $passedReportPage;
            $shareFacebook = $passedShareFacebook;

            $.ajaxSetup({ cache: true });

            $shareFacebook.click(function() {
                return false;
            });
            
            $.getScript('//connect.facebook.net/en_UK/all.js', function(){
                FB.init({
                    appId: Config.facebook.appID,
                    channelUrl: baseURL + '/channel',
                });

                $shareFacebook.click(function() {
                    facebookShareDialog($reportPage);
                });

                initShareCount($reportPage, $shareFacebook);
            });
        }
    };
})();