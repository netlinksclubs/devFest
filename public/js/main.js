/*exported highlightWordsNoCase*/

RegExp.escape = function(str)
{
    "use strict";
    var specials = /[.*+?|()\[\]{}\\$^]/g; // .*+?|()[]{}\$^

    return str.replace(specials, "\\$&");
};

function highlightWordsNoCase(line, word, cssClass)
{
    "use strict";
    var regex = new RegExp("(" + RegExp.escape(word) + ")", "gi");
    return line.replace(regex, "<span class=\"" + cssClass + "\">$1</span>");
}

/* **********************************************
     Begin modernizr.js
********************************************** */

/*!
 * Modernizr v2.6.1
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.6.1',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body ? body : document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = "";
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      !body ? fakeBody.parentNode.removeChild(fakeBody) : div.parentNode.removeChild(div);

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq).matches;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   daneden.me/2011/12/putting-up-with-androids-bullshit/
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#modernizr:after{content:"',smile,'";visibility:hidden}'].join(''), function( node ) {
          bool = node.offsetHeight >= 1;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /*! HTML5 Shiv v3.6 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
    ;(function(window, document) {
    /*jshint evil:true */
      /** Preset options */
      var options = window.html5 || {};

      /** Used to skip problem elements */
      var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

      /** Not all elements can be cloned in IE (this list can be shortend) **/
      var saveClones = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i;

      /** Detect whether the browser supports default html5 styles */
      var supportsHtml5Styles;

      /** Name of the expando, to work with multiple documents or to re-shiv one document */
      var expando = '_html5shiv';

      /** The id for the the documents expando */
      var expanID = 0;

      /** Cached data for each document */
      var expandoData = {};

      /** Detect whether the browser supports unknown elements */
      var supportsUnknownElements;

      (function() {
        try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
        } catch(e) {
          supportsHtml5Styles = true;
          supportsUnknownElements = true;
        }

      }());

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a style sheet with the given CSS text and adds it to the document.
       * @private
       * @param {Document} ownerDocument The document.
       * @param {String} cssText The CSS text.
       * @returns {StyleSheet} The style element.
       */
      function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement('p'),
            parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

        p.innerHTML = 'x<style>' + cssText + '</style>';
        return parent.insertBefore(p.lastChild, parent.firstChild);
      }

      /**
       * Returns the value of `html5.elements` as an array.
       * @private
       * @returns {Array} An array of shived element node names.
       */
      function getElements() {
        var elements = html5.elements;
        return typeof elements == 'string' ? elements.split(' ') : elements;
      }

        /**
       * Returns the data associated to the given document
       * @private
       * @param {Document} ownerDocument The document.
       * @returns {Object} An object of data.
       */
      function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
        }
        return data;
      }

      /**
       * returns a shived element for the given nodeName and document
       * @memberOf html5
       * @param {String} nodeName name of the element
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived element.
       */
      function createElement(nodeName, ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
        }
        if (!data) {
            data = getExpandoData(ownerDocument);
        }
        var node;

        if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
        } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
        } else {
            node = data.createElem(nodeName);
        }

        // Avoid adding some elements to fragments in IE < 9 because
        // * Attributes like `name` or `type` cannot be set/changed once an element
        //   is inserted into a document/fragment
        // * Link elements with `src` attributes that are inaccessible, as with
        //   a 403 response, will cause the tab/window to crash
        // * Script elements appended to fragments will execute when their `src`
        //   or `text` property is set
        return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
      }

      /**
       * returns a shived DocumentFragment for the given document
       * @memberOf html5
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived DocumentFragment.
       */
      function createDocumentFragment(ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
        }
        data = data || getExpandoData(ownerDocument);
        var clone = data.frag.cloneNode(),
            i = 0,
            elems = getElements(),
            l = elems.length;
        for(;i<l;i++){
            clone.createElement(elems[i]);
        }
        return clone;
      }

      /**
       * Shivs the `createElement` and `createDocumentFragment` methods of the document.
       * @private
       * @param {Document|DocumentFragment} ownerDocument The document.
       * @param {Object} data of the document.
       */
      function shivMethods(ownerDocument, data) {
        if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
        }


        ownerDocument.createElement = function(nodeName) {
          //abort shiv
          if (!html5.shivMethods) {
              return data.createElem(nodeName);
          }
          return createElement(nodeName, ownerDocument, data);
        };

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
          'var n=f.cloneNode(),c=n.createElement;' +
          'h.shivMethods&&(' +
            // unroll the `createElement` calls
            getElements().join().replace(/\w+/g, function(nodeName) {
              data.createElem(nodeName);
              data.frag.createElement(nodeName);
              return 'c("' + nodeName + '")';
            }) +
          ');return n}'
        )(html5, data.frag);
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Shivs the given document.
       * @memberOf html5
       * @param {Document} ownerDocument The document to shiv.
       * @returns {Document} The shived document.
       */
      function shivDocument(ownerDocument) {
        if (!ownerDocument) {
            ownerDocument = document;
        }
        var data = getExpandoData(ownerDocument);

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
          data.hasCSS = !!addStyleSheet(ownerDocument,
            // corrects block display not defined in IE6/7/8/9
            'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
            // adds styling not present in IE6/7/8/9
            'mark{background:#FF0;color:#000}'
          );
        }
        if (!supportsUnknownElements) {
          shivMethods(ownerDocument, data);
        }
        return ownerDocument;
      }

      /*--------------------------------------------------------------------------*/

      /**
       * The `html5` object is exposed so that more elements can be shived and
       * existing shiving can be detected on iframes.
       * @type Object
       * @example
       *
       * // options can be changed before the script is included
       * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
       */
      var html5 = {

        /**
         * An array or space separated string of node names of the elements to shiv.
         * @memberOf html5
         * @type Array|String
         */
        'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',

        /**
         * A flag to indicate that the HTML5 style sheet should be inserted.
         * @memberOf html5
         * @type Boolean
         */
        'shivCSS': (options.shivCSS !== false),

        /**
         * Is equal to true if a browser supports creating unknown/HTML5 elements
         * @memberOf html5
         * @type boolean
         */
        'supportsUnknownElements': supportsUnknownElements,

        /**
         * A flag to indicate that the document's `createElement` and `createDocumentFragment`
         * methods should be overwritten.
         * @memberOf html5
         * @type Boolean
         */
        'shivMethods': (options.shivMethods !== false),

        /**
         * A string to describe the type of `html5` object ("default" or "default print").
         * @memberOf html5
         * @type String
         */
        'type': 'default',

        // shivs the document according to the specified `html5` object options
        'shivDocument': shivDocument,

        //creates a shived element
        createElement: createElement,

        //creates a shived documentFragment
        createDocumentFragment: createDocumentFragment
      };

      /*--------------------------------------------------------------------------*/

      // expose html5
      window.html5 = html5;

      // shiv the document
      shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);

/* **********************************************
     Begin jquery.powertip.min.js
********************************************** */

/*!
 PowerTip - v1.2.0 - 2013-04-03
 http://stevenbenner.github.com/jquery-powertip/
 Copyright (c) 2013 Steven Benner (http://stevenbenner.com/).
 Released under MIT license.
 https://raw.github.com/stevenbenner/jquery-powertip/master/LICENSE.txt
*/
(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(){var t=this;t.top="auto",t.left="auto",t.right="auto",t.bottom="auto",t.set=function(o,n){e.isNumeric(n)&&(t[o]=Math.round(n))}}function o(e,t,o){function n(n,i){r(),e.data(v)||(n?(i&&e.data(m,!0),o.showTip(e)):(P.tipOpenImminent=!0,l=setTimeout(function(){l=null,s()},t.intentPollInterval)))}function i(n){r(),P.tipOpenImminent=!1,e.data(v)&&(e.data(m,!1),n?o.hideTip(e):(P.delayInProgress=!0,l=setTimeout(function(){l=null,o.hideTip(e),P.delayInProgress=!1},t.closeDelay)))}function s(){var i=Math.abs(P.previousX-P.currentX),s=Math.abs(P.previousY-P.currentY),r=i+s;t.intentSensitivity>r?o.showTip(e):(P.previousX=P.currentX,P.previousY=P.currentY,n())}function r(){l=clearTimeout(l),P.delayInProgress=!1}function a(){o.resetPosition(e)}var l=null;this.show=n,this.hide=i,this.cancel=r,this.resetPosition=a}function n(){function e(e,i,r,a,l){var p,c=i.split("-")[0],u=new t;switch(p=s(e)?n(e,c):o(e,c),i){case"n":u.set("left",p.left-r/2),u.set("bottom",P.windowHeight-p.top+l);break;case"e":u.set("left",p.left+l),u.set("top",p.top-a/2);break;case"s":u.set("left",p.left-r/2),u.set("top",p.top+l);break;case"w":u.set("top",p.top-a/2),u.set("right",P.windowWidth-p.left+l);break;case"nw":u.set("bottom",P.windowHeight-p.top+l),u.set("right",P.windowWidth-p.left-20);break;case"nw-alt":u.set("left",p.left),u.set("bottom",P.windowHeight-p.top+l);break;case"ne":u.set("left",p.left-20),u.set("bottom",P.windowHeight-p.top+l);break;case"ne-alt":u.set("bottom",P.windowHeight-p.top+l),u.set("right",P.windowWidth-p.left);break;case"sw":u.set("top",p.top+l),u.set("right",P.windowWidth-p.left-20);break;case"sw-alt":u.set("left",p.left),u.set("top",p.top+l);break;case"se":u.set("left",p.left-20),u.set("top",p.top+l);break;case"se-alt":u.set("top",p.top+l),u.set("right",P.windowWidth-p.left)}return u}function o(e,t){var o,n,i=e.offset(),s=e.outerWidth(),r=e.outerHeight();switch(t){case"n":o=i.left+s/2,n=i.top;break;case"e":o=i.left+s,n=i.top+r/2;break;case"s":o=i.left+s/2,n=i.top+r;break;case"w":o=i.left,n=i.top+r/2;break;case"nw":o=i.left,n=i.top;break;case"ne":o=i.left+s,n=i.top;break;case"sw":o=i.left,n=i.top+r;break;case"se":o=i.left+s,n=i.top+r}return{top:n,left:o}}function n(e,t){function o(){d.push(p.matrixTransform(u))}var n,i,s,r,a=e.closest("svg")[0],l=e[0],p=a.createSVGPoint(),c=l.getBBox(),u=l.getScreenCTM(),f=c.width/2,w=c.height/2,d=[],h=["nw","n","ne","e","se","s","sw","w"];if(p.x=c.x,p.y=c.y,o(),p.x+=f,o(),p.x+=f,o(),p.y+=w,o(),p.y+=w,o(),p.x-=f,o(),p.x-=f,o(),p.y-=w,o(),d[0].y!==d[1].y||d[0].x!==d[7].x)for(i=Math.atan2(u.b,u.a)*O,s=Math.ceil((i%360-22.5)/45),1>s&&(s+=8);s--;)h.push(h.shift());for(r=0;d.length>r;r++)if(h[r]===t){n=d[r];break}return{top:n.y+P.scrollTop,left:n.x+P.scrollLeft}}this.compute=e}function i(o){function i(e){e.data(v,!0),O.queue(function(t){s(e),t()})}function s(e){var t;if(e.data(v)){if(P.isTipOpen)return P.isClosing||r(P.activeHover),O.delay(100).queue(function(t){s(e),t()}),void 0;e.trigger("powerTipPreRender"),t=p(e),t&&(O.empty().append(t),e.trigger("powerTipRender"),P.activeHover=e,P.isTipOpen=!0,O.data(g,o.mouseOnToPopup),o.followMouse?a():(b(e),P.isFixedTipOpen=!0),O.fadeIn(o.fadeInTime,function(){P.desyncTimeout||(P.desyncTimeout=setInterval(H,500)),e.trigger("powerTipOpen")}))}}function r(e){P.isClosing=!0,P.activeHover=null,P.isTipOpen=!1,P.desyncTimeout=clearInterval(P.desyncTimeout),e.data(v,!1),e.data(m,!1),O.fadeOut(o.fadeOutTime,function(){var n=new t;P.isClosing=!1,P.isFixedTipOpen=!1,O.removeClass(),n.set("top",P.currentY+o.offset),n.set("left",P.currentX+o.offset),O.css(n),e.trigger("powerTipClose")})}function a(){if(!P.isFixedTipOpen&&(P.isTipOpen||P.tipOpenImminent&&O.data(T))){var e,n,i=O.outerWidth(),s=O.outerHeight(),r=new t;r.set("top",P.currentY+o.offset),r.set("left",P.currentX+o.offset),e=c(r,i,s),e!==I.none&&(n=u(e),1===n?e===I.right?r.set("left",P.windowWidth-i):e===I.bottom&&r.set("top",P.scrollTop+P.windowHeight-s):(r.set("left",P.currentX-i-o.offset),r.set("top",P.currentY-s-o.offset))),O.css(r)}}function b(t){var n,i;o.smartPlacement?(n=e.fn.powerTip.smartPlacementLists[o.placement],e.each(n,function(e,o){var n=c(y(t,o),O.outerWidth(),O.outerHeight());return i=o,n===I.none?!1:void 0})):(y(t,o.placement),i=o.placement),O.addClass(i)}function y(e,n){var i,s,r=0,a=new t;a.set("top",0),a.set("left",0),O.css(a);do i=O.outerWidth(),s=O.outerHeight(),a=k.compute(e,n,i,s,o.offset),O.css(a);while(5>=++r&&(i!==O.outerWidth()||s!==O.outerHeight()));return a}function H(){var e=!1;!P.isTipOpen||P.isClosing||P.delayInProgress||(P.activeHover.data(v)===!1||P.activeHover.is(":disabled")?e=!0:l(P.activeHover)||P.activeHover.is(":focus")||P.activeHover.data(m)||(O.data(g)?l(O)||(e=!0):e=!0),e&&r(P.activeHover))}var k=new n,O=e("#"+o.popupId);0===O.length&&(O=e("<div/>",{id:o.popupId}),0===d.length&&(d=e("body")),d.append(O)),o.followMouse&&(O.data(T)||(f.on("mousemove",a),w.on("scroll",a),O.data(T,!0))),o.mouseOnToPopup&&O.on({mouseenter:function(){O.data(g)&&P.activeHover&&P.activeHover.data(h).cancel()},mouseleave:function(){P.activeHover&&P.activeHover.data(h).hide()}}),this.showTip=i,this.hideTip=r,this.resetPosition=b}function s(e){return window.SVGElement&&e[0]instanceof SVGElement}function r(){P.mouseTrackingActive||(P.mouseTrackingActive=!0,e(function(){P.scrollLeft=w.scrollLeft(),P.scrollTop=w.scrollTop(),P.windowWidth=w.width(),P.windowHeight=w.height()}),f.on("mousemove",a),w.on({resize:function(){P.windowWidth=w.width(),P.windowHeight=w.height()},scroll:function(){var e=w.scrollLeft(),t=w.scrollTop();e!==P.scrollLeft&&(P.currentX+=e-P.scrollLeft,P.scrollLeft=e),t!==P.scrollTop&&(P.currentY+=t-P.scrollTop,P.scrollTop=t)}}))}function a(e){P.currentX=e.pageX,P.currentY=e.pageY}function l(e){var t=e.offset(),o=e[0].getBoundingClientRect(),n=o.right-o.left,i=o.bottom-o.top;return P.currentX>=t.left&&P.currentX<=t.left+n&&P.currentY>=t.top&&P.currentY<=t.top+i}function p(t){var o,n,i=t.data(y),s=t.data(H),r=t.data(k);return i?(e.isFunction(i)&&(i=i.call(t[0])),n=i):s?(e.isFunction(s)&&(s=s.call(t[0])),s.length>0&&(n=s.clone(!0,!0))):r&&(o=e("#"+r),o.length>0&&(n=o.html())),n}function c(e,t,o){var n=P.scrollTop,i=P.scrollLeft,s=n+P.windowHeight,r=i+P.windowWidth,a=I.none;return(n>e.top||n>Math.abs(e.bottom-P.windowHeight)-o)&&(a|=I.top),(e.top+o>s||Math.abs(e.bottom-P.windowHeight)>s)&&(a|=I.bottom),(i>e.left||e.right+t>r)&&(a|=I.left),(e.left+t>r||i>e.right)&&(a|=I.right),a}function u(e){for(var t=0;e;)e&=e-1,t++;return t}var f=e(document),w=e(window),d=e("body"),h="displayController",v="hasActiveHover",m="forcedOpen",T="hasMouseMove",g="mouseOnToPopup",b="originalTitle",y="powertip",H="powertipjq",k="powertiptarget",O=180/Math.PI,P={isTipOpen:!1,isFixedTipOpen:!1,isClosing:!1,tipOpenImminent:!1,activeHover:null,currentX:0,currentY:0,previousX:0,previousY:0,desyncTimeout:null,mouseTrackingActive:!1,delayInProgress:!1,windowWidth:0,windowHeight:0,scrollTop:0,scrollLeft:0},I={none:0,top:1,bottom:2,left:4,right:8};e.fn.powerTip=function(t,n){if(!this.length)return this;if("string"===e.type(t)&&e.powerTip[t])return e.powerTip[t].call(this,this,n);var s=e.extend({},e.fn.powerTip.defaults,t),a=new i(s);return r(),this.each(function(){var t,n=e(this),i=n.data(y),r=n.data(H),l=n.data(k);n.data(h)&&e.powerTip.destroy(n),t=n.attr("title"),i||l||r||!t||(n.data(y,t),n.data(b,t),n.removeAttr("title")),n.data(h,new o(n,s,a))}),s.manual||this.on({"mouseenter.powertip":function(t){e.powerTip.show(this,t)},"mouseleave.powertip":function(){e.powerTip.hide(this)},"focus.powertip":function(){e.powerTip.show(this)},"blur.powertip":function(){e.powerTip.hide(this,!0)},"keydown.powertip":function(t){27===t.keyCode&&e.powerTip.hide(this,!0)}}),this},e.fn.powerTip.defaults={fadeInTime:200,fadeOutTime:100,followMouse:!1,popupId:"powerTip",intentSensitivity:7,intentPollInterval:100,closeDelay:100,placement:"n",smartPlacement:!1,offset:10,mouseOnToPopup:!1,manual:!1},e.fn.powerTip.smartPlacementLists={n:["n","ne","nw","s"],e:["e","ne","se","w","nw","sw","n","s","e"],s:["s","se","sw","n"],w:["w","nw","sw","e","ne","se","n","s","w"],nw:["nw","w","sw","n","s","se","nw"],ne:["ne","e","se","n","s","sw","ne"],sw:["sw","w","nw","s","n","ne","sw"],se:["se","e","ne","s","n","nw","se"],"nw-alt":["nw-alt","n","ne-alt","sw-alt","s","se-alt","w","e"],"ne-alt":["ne-alt","n","nw-alt","se-alt","s","sw-alt","e","w"],"sw-alt":["sw-alt","s","se-alt","nw-alt","n","ne-alt","w","e"],"se-alt":["se-alt","s","sw-alt","ne-alt","n","nw-alt","e","w"]},e.powerTip={show:function(t,o){return o?(a(o),P.previousX=o.pageX,P.previousY=o.pageY,e(t).data(h).show()):e(t).first().data(h).show(!0,!0),t},reposition:function(t){return e(t).first().data(h).resetPosition(),t},hide:function(t,o){return t?e(t).first().data(h).hide(o):P.activeHover&&P.activeHover.data(h).hide(!0),t},destroy:function(t){return e(t).off(".powertip").each(function(){var t=e(this),o=[b,h,v,m];t.data(b)&&(t.attr("title",t.data(b)),o.push(y)),t.removeData(o)}),t}},e.powerTip.showTip=e.powerTip.show,e.powerTip.closeTip=e.powerTip.hide});

/* **********************************************
     Begin completion.js
********************************************** */

(function ($) {
    "use strict";

    $.fn.completion = function(options) {
        var settings = $.extend({
            requestURL: "",
            itemTemplate: $('<li></li>'),
            responseFiller: function(responseItem) {
                $(this).text(responseItem);
            },
            completionBoxID: "completion-Box",
            queryOnCallback: function(query) { return query; },
            queryOffCallback: function() {},
            userChoiceHandler: function() {},
            userRequestWithNoChoiceHandler: function() {},
            updateInputFromSelection: function() {},
            escapeHandler: function() {}
        }, options);

        var $completionBox = $("#" + settings.completionBoxID);

        var currentlySelectedElement = $();

        function addSuggestion(dataObject) {
            var $completionElement = settings.itemTemplate.clone();

            $completionBox.append($completionElement);

            settings.responseFiller.call($completionElement, dataObject);

            return $completionElement;
        }

        // Save current value of element
        this.data('oldVal', this.val());

        // Look for changes in the value
        this.bind("propertychange keyup input paste", function(e){
            var $this = $(this);

            // We don't handle arrowup, arrowdown, escape and enter clicks
            // This ensures that value changes from these interactions don't get in the way
            if([40, 38, 27, 13].indexOf(e.which) > -1) {
                return ;
            }

            // If value hasn't changed pointless to do anything
            if ($this.data('oldVal') === $this.val()) {
                return ;
            }
            
            // Updated stored value
            $this.data('oldVal', $this.val());

            if($this.val() === '') {
                $completionBox.fadeOut(100);

                settings.queryOffCallback.call(this);

                return ;
            }

            // Callback for query initiation
            settings.queryOnCallback.call(this, $this.val());

            $.ajax({
                dataType: "json",
                url: settings.requestURL,
                data: {request: $this.val()},
                queue: 'completion',
                success: function(data) {
                    if(data.length === 0) {
                        $completionBox.fadeOut(50, function() {
                            $completionBox.empty();
                        });

                        currentlySelectedElement = null;

                        return ;
                    }

                    $completionBox.empty();

                    if($completionBox.is(':hidden')) {
                        $completionBox.fadeIn(100);
                    }

                    for(var i=0; i < data.length; i++) {
                        addSuggestion(data[i]).data('associatedData', data[i]);
                    }

                    currentlySelectedElement = $completionBox.children().first().addClass('selected');
                }
            });
        });

        this.keydown(function(e) {
            if(e.which === 27) { // Escape character
                settings.escapeHandler.call(this);
            }

            if(currentlySelectedElement === null) {
                return ;
            }

            if (e.which === 40) {
                currentlySelectedElement = currentlySelectedElement.removeClass('selected').next().addClass('selected');

                if(currentlySelectedElement.length === 0) {
                    currentlySelectedElement = $completionBox.children().first().addClass('selected');
                }

                settings.updateInputFromSelection.call(currentlySelectedElement[0]);

                return false;
            } else if (e.which === 38) { //Up arrow
                currentlySelectedElement = currentlySelectedElement.removeClass('selected').prev().addClass('selected');

                if(currentlySelectedElement.length === 0) {
                    currentlySelectedElement = $completionBox.children().last().addClass('selected');
                }

                settings.updateInputFromSelection.call(currentlySelectedElement[0]);

                return false;
            }
        });

        $completionBox.on('mouseenter', 'li', function() {
            if(currentlySelectedElement[0] !== this) {
                currentlySelectedElement.removeClass('selected');
                currentlySelectedElement = $(this).addClass('selected');

                settings.updateInputFromSelection.call(this);
            }
        });

        $completionBox.on('click', 'li', function() {
            settings.userChoiceHandler.call(this);
        });

        // Handle enter presses
        this.keypress(function(e) {
            if(e.which === 13) {
                if(currentlySelectedElement !== null) {
                    settings.userChoiceHandler.call(currentlySelectedElement[0]);

                    currentlySelectedElement = null;
                } else {
                    settings.userRequestWithNoChoiceHandler.call();
                }
            }
        });

        var $input = $(this);
        this.data('completion', {
            clear: function() {
                $completionBox.fadeOut(100);
            },
            setInputValue: function(value) {
                $input.val(value).data('oldVal', value);

                return $input;
            }
        });

        return this.data('completion');
    };

}(jQuery));

/* **********************************************
     Begin cookies.js
********************************************** */

/*exported cookies*/
var cookies = (function() {
    "use strict";
    return {
        create: function(name, value, days) {
            var expires;

            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                expires = "; expires="+date.toGMTString();
            } else {
                expires = "";
            }

            document.cookie = name + "=" + value + expires + "; path=/";
        },
        read: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1,c.length);
                }
                
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length,c.length);
                }
            }

            return null;
        },
        erase: function(name) {
            this.createCookie(name, "", -1);
        }
    };
}());

/* **********************************************
     Begin googleMap.js
********************************************** */

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

/* **********************************************
     Begin pinsHandler.js
********************************************** */

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

/* **********************************************
     Begin customEventsDetectionModule.js
********************************************** */

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

/* **********************************************
     Begin alertMapModule.js
********************************************** */

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

/* **********************************************
     Begin modalAlertMapModule.js
********************************************** */

/*global AlertMapModule */
/*global CustomEventsDetectionModule*/
/*global Modernizr*/

/*exported ModalAlertMapModule*/

/*
 * This module takes care of the display of the map modal box
 */
var ModalAlertMapModule = (function() {
    "use strict";

    return {
        init: function () {
            // Get maps modal container
            var $mapsModalContainer = $('#maps-modal-container'),
                // Get maps modal reveal button
                $mapsModalReveal = $mapsModalContainer.find('#maps-modal-reveal'),
                initialized = false;

            // When user clicks on the reveal button
            $mapsModalReveal.on('click', function() {

                // If not already initialized
                if (!initialized) {
                    if (Modernizr.csstransitions) {
                        // Begin loading data at the end of the transition
                        $mapsModalContainer.bind(CustomEventsDetectionModule.transitionEndEventName(), function() {
                            AlertMapModule.init();
                            $mapsModalContainer.addClass('loaded');

                            $(this).unbind(CustomEventsDetectionModule.transitionEndEventName());
                        });
                    } else {
                        // No animation support just do it already
                        AlertMapModule.init();

                        $mapsModalContainer.addClass('loaded');
                    }

                    initialized = true;
                }

                // If not already revealed
                if (!$mapsModalContainer.hasClass('revealed')) {
                    // Add the class revealed to the container
                    $mapsModalContainer.addClass('revealed');
                } else {
                    // Remove the class revealed from the container
                    $mapsModalContainer.removeClass('revealed');
                }
            });

            // When the user clicks on the modal box
            $mapsModalContainer.find('#maps-modal-box').on('click', function(e) {
                // if they clicked on the box only and not any other element in the box
                if (this === e.target) {
                    // Remove the class revealed
                    $mapsModalContainer.removeClass('revealed');
                }
            });
        }
    };
}());

/* **********************************************
     Begin detailMapModule.js
********************************************** */

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

/* **********************************************
     Begin reportMapModule.js
********************************************** */

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

/* **********************************************
     Begin mainMapModule.js
********************************************** */

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
                console.log(geocoderStatus);
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
            $('#maps-modal-reveal').hide();

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

/* **********************************************
     Begin facebookShareModule.js
********************************************** */

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

/* **********************************************
     Begin script.js
********************************************** */

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