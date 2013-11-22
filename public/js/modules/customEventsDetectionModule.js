/*global Modernizr */

/*exported CustomEventsDetectionModule*/

var CustomEventsDetectionModule = (function() {
    "use strict";

    return {
        transitionEndEventName: function() {
            var transEndEventNames = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd',
                'msTransition'     : 'MSTransitionEnd',
                'transition'       : 'transitionend'
            };

            return transEndEventNames[Modernizr.prefixed('transition')];
        }
    };
}());