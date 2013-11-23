/*exported highlightWordsNoCase*/function highlightWordsNoCase(e,t,n){"use strict";var r=new RegExp("("+RegExp.escape(t)+")","gi");return e.replace(r,'<span class="'+n+'">$1</span>')}RegExp.escape=function(e){"use strict";var t=/[.*+?|()\[\]{}\\$^]/g;return e.replace(t,"\\$&")};window.Modernizr=function(e,t,n){function A(e){f.cssText=e}function O(e,t){return A(p.join(e+";")+(t||""))}function M(e,t){return typeof e===t}function _(e,t){return!!~(""+e).indexOf(t)}function D(e,t){for(var r in e){var i=e[r];if(!_(i,"-")&&f[i]!==n)return t=="pfx"?i:!0}return!1}function P(e,t,r){for(var i in e){var s=t[e[i]];if(s!==n)return r===!1?e[i]:M(s,"function")?s.bind(r||t):s}return!1}function H(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+v.join(r+" ")+r).split(" ");if(M(t,"string")||M(t,"undefined"))return D(i,t);i=(e+" "+m.join(r+" ")+r).split(" ");return P(i,t,n)}function B(){i.input=function(n){for(var r=0,i=n.length;r<i;r++)w[n[r]]=n[r]in l;w.list&&(w.list=!!t.createElement("datalist")&&!!e.HTMLDataListElement);return w}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));i.inputtypes=function(e){for(var r=0,i,s,u,a=e.length;r<a;r++){l.setAttribute("type",s=e[r]);i=l.type!=="text";if(i){l.value=c;l.style.cssText="position:absolute;visibility:hidden;";if(/^range$/.test(s)&&l.style.WebkitAppearance!==n){o.appendChild(l);u=t.defaultView;i=u.getComputedStyle&&u.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0;o.removeChild(l)}else/^(search|tel)$/.test(s)||(/^(url|email)$/.test(s)?i=l.checkValidity&&l.checkValidity()===!1:i=l.value!=c)}b[e[r]]=!!i}return b}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var r="2.6.1",i={},s=!0,o=t.documentElement,u="modernizr",a=t.createElement(u),f=a.style,l=t.createElement("input"),c=":)",h={}.toString,p=" -webkit- -moz- -o- -ms- ".split(" "),d="Webkit Moz O ms",v=d.split(" "),m=d.toLowerCase().split(" "),g={svg:"http://www.w3.org/2000/svg"},y={},b={},w={},E=[],S=E.slice,x,T=function(e,n,r,i){var s,a,f,l=t.createElement("div"),c=t.body,h=c?c:t.createElement("body");if(parseInt(r,10))while(r--){f=t.createElement("div");f.id=i?i[r]:u+(r+1);l.appendChild(f)}s=["&#173;",'<style id="s',u,'">',e,"</style>"].join("");l.id=u;(c?l:h).innerHTML+=s;h.appendChild(l);if(!c){h.style.background="";o.appendChild(h)}a=n(l,e);c?l.parentNode.removeChild(l):h.parentNode.removeChild(h);return!!a},N=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t).matches;var r;T("@media "+t+" { #"+u+" { position: absolute; } }",function(t){r=(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle)["position"]=="absolute"});return r},C=function(){function r(r,i){i=i||t.createElement(e[r]||"div");r="on"+r;var s=r in i;if(!s){i.setAttribute||(i=t.createElement("div"));if(i.setAttribute&&i.removeAttribute){i.setAttribute(r,"");s=M(i[r],"function");M(i[r],"undefined")||(i[r]=n);i.removeAttribute(r)}}i=null;return s}var e={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return r}(),k={}.hasOwnProperty,L;!M(k,"undefined")&&!M(k.call,"undefined")?L=function(e,t){return k.call(e,t)}:L=function(e,t){return t in e&&M(e.constructor.prototype[t],"undefined")};Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new TypeError;var r=S.call(arguments,1),i=function(){if(this instanceof i){var e=function(){};e.prototype=n.prototype;var s=new e,o=n.apply(s,r.concat(S.call(arguments)));return Object(o)===o?o:s}return n.apply(t,r.concat(S.call(arguments)))};return i});y.flexbox=function(){return H("flexWrap")};y.flexboxlegacy=function(){return H("boxDirection")};y.canvas=function(){var e=t.createElement("canvas");return!!e.getContext&&!!e.getContext("2d")};y.canvastext=function(){return!!i.canvas&&!!M(t.createElement("canvas").getContext("2d").fillText,"function")};y.webgl=function(){return!!e.WebGLRenderingContext};y.touch=function(){var n;"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:T(["@media (",p.join("touch-enabled),("),u,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=e.offsetTop===9});return n};y.geolocation=function(){return"geolocation"in navigator};y.postmessage=function(){return!!e.postMessage};y.websqldatabase=function(){return!!e.openDatabase};y.indexedDB=function(){return!!H("indexedDB",e)};y.hashchange=function(){return C("hashchange",e)&&(t.documentMode===n||t.documentMode>7)};y.history=function(){return!!e.history&&!!history.pushState};y.draganddrop=function(){var e=t.createElement("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e};y.websockets=function(){return"WebSocket"in e||"MozWebSocket"in e};y.rgba=function(){A("background-color:rgba(150,255,150,.5)");return _(f.backgroundColor,"rgba")};y.hsla=function(){A("background-color:hsla(120,40%,100%,.5)");return _(f.backgroundColor,"rgba")||_(f.backgroundColor,"hsla")};y.multiplebgs=function(){A("background:url(https://),url(https://),red url(https://)");return/(url\s*\(.*?){3}/.test(f.background)};y.backgroundsize=function(){return H("backgroundSize")};y.borderimage=function(){return H("borderImage")};y.borderradius=function(){return H("borderRadius")};y.boxshadow=function(){return H("boxShadow")};y.textshadow=function(){return t.createElement("div").style.textShadow===""};y.opacity=function(){O("opacity:.55");return/^0.55$/.test(f.opacity)};y.cssanimations=function(){return H("animationName")};y.csscolumns=function(){return H("columnCount")};y.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";A((e+"-webkit- ".split(" ").join(t+e)+p.join(n+e)).slice(0,-e.length));return _(f.backgroundImage,"gradient")};y.cssreflections=function(){return H("boxReflect")};y.csstransforms=function(){return!!H("transform")};y.csstransforms3d=function(){var e=!!H("perspective");e&&"webkitPerspective"in o.style&&T("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=t.offsetLeft===9&&t.offsetHeight===3});return e};y.csstransitions=function(){return H("transition")};y.fontface=function(){var e;T('@font-face {font-family:"font";src:url("https://")}',function(n,r){var i=t.getElementById("smodernizr"),s=i.sheet||i.styleSheet,o=s?s.cssRules&&s.cssRules[0]?s.cssRules[0].cssText:s.cssText||"":"";e=/src/i.test(o)&&o.indexOf(r.split(" ")[0])===0});return e};y.generatedcontent=function(){var e;T(['#modernizr:after{content:"',c,'";visibility:hidden}'].join(""),function(t){e=t.offsetHeight>=1});return e};y.video=function(){var e=t.createElement("video"),n=!1;try{if(n=!!e.canPlayType){n=new Boolean(n);n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,"");n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,"");n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}}catch(r){}return n};y.audio=function(){var e=t.createElement("audio"),n=!1;try{if(n=!!e.canPlayType){n=new Boolean(n);n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,"");n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,"");n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,"");n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,"")}}catch(r){}return n};y.localstorage=function(){try{localStorage.setItem(u,u);localStorage.removeItem(u);return!0}catch(e){return!1}};y.sessionstorage=function(){try{sessionStorage.setItem(u,u);sessionStorage.removeItem(u);return!0}catch(e){return!1}};y.webworkers=function(){return!!e.Worker};y.applicationcache=function(){return!!e.applicationCache};y.svg=function(){return!!t.createElementNS&&!!t.createElementNS(g.svg,"svg").createSVGRect};y.inlinesvg=function(){var e=t.createElement("div");e.innerHTML="<svg/>";return(e.firstChild&&e.firstChild.namespaceURI)==g.svg};y.smil=function(){return!!t.createElementNS&&/SVGAnimate/.test(h.call(t.createElementNS(g.svg,"animate")))};y.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(h.call(t.createElementNS(g.svg,"clipPath")))};for(var j in y)if(L(y,j)){x=j.toLowerCase();i[x]=y[j]();E.push((i[x]?"":"no-")+x)}i.input||B();i.addTest=function(e,t){if(typeof e=="object")for(var r in e)L(e,r)&&i.addTest(r,e[r]);else{e=e.toLowerCase();if(i[e]!==n)return i;t=typeof t=="function"?t():t;s&&(o.className+=" "+(t?"":"no-")+e);i[e]=t}return i};A("");a=l=null;(function(e,t){function l(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;n.innerHTML="x<style>"+t+"</style>";return r.insertBefore(n.lastChild,r.firstChild)}function c(){var e=g.elements;return typeof e=="string"?e.split(" "):e}function h(e){var t=a[e[o]];if(!t){t={};u++;e[o]=u;a[u]=t}return t}function p(e,n,s){n||(n=t);if(f)return n.createElement(e);s||(s=h(n));var o;s.cache[e]?o=s.cache[e].cloneNode():i.test(e)?o=(s.cache[e]=s.createElem(e)).cloneNode():o=s.createElem(e);return o.canHaveChildren&&!r.test(e)?s.frag.appendChild(o):o}function d(e,n){e||(e=t);if(f)return e.createDocumentFragment();n=n||h(e);var r=n.frag.cloneNode(),i=0,s=c(),o=s.length;for(;i<o;i++)r.createElement(s[i]);return r}function v(e,t){if(!t.cache){t.cache={};t.createElem=e.createElement;t.createFrag=e.createDocumentFragment;t.frag=t.createFrag()}e.createElement=function(n){return g.shivMethods?p(n,e,t):t.createElem(n)};e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+c().join().replace(/\w+/g,function(e){t.createElem(e);t.frag.createElement(e);return'c("'+e+'")'})+");return n}")(g,t.frag)}function m(e){e||(e=t);var n=h(e);g.shivCSS&&!s&&!n.hasCSS&&(n.hasCSS=!!l(e,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}"));f||v(e,n);return e}var n=e.html5||{},r=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,i=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,s,o="_html5shiv",u=0,a={},f;(function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>";s="hidden"in e;f=e.childNodes.length==1||function(){t.createElement("a");var e=t.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()}catch(n){s=!0;f=!0}})();var g={elements:n.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:n.shivCSS!==!1,supportsUnknownElements:f,shivMethods:n.shivMethods!==!1,type:"default",shivDocument:m,createElement:p,createDocumentFragment:d};e.html5=g;m(t)})(this,t);i._version=r;i._prefixes=p;i._domPrefixes=m;i._cssomPrefixes=v;i.mq=N;i.hasEvent=C;i.testProp=function(e){return D([e])};i.testAllProps=H;i.testStyles=T;i.prefixed=function(e,t,n){return t?H(e,t,n):H(e,"pfx")};o.className=o.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(s?" js "+E.join(" "):"");return i}(this,this.document);(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(){var t=this;t.top="auto",t.left="auto",t.right="auto",t.bottom="auto",t.set=function(n,r){e.isNumeric(r)&&(t[n]=Math.round(r))}}function n(e,t,n){function r(r,i){o(),e.data(m)||(r?(i&&e.data(g,!0),n.showTip(e)):(N.tipOpenImminent=!0,a=setTimeout(function(){a=null,s()},t.intentPollInterval)))}function i(r){o(),N.tipOpenImminent=!1,e.data(m)&&(e.data(g,!1),r?n.hideTip(e):(N.delayInProgress=!0,a=setTimeout(function(){a=null,n.hideTip(e),N.delayInProgress=!1},t.closeDelay)))}function s(){var i=Math.abs(N.previousX-N.currentX),s=Math.abs(N.previousY-N.currentY),o=i+s;t.intentSensitivity>o?n.showTip(e):(N.previousX=N.currentX,N.previousY=N.currentY,r())}function o(){a=clearTimeout(a),N.delayInProgress=!1}function u(){n.resetPosition(e)}var a=null;this.show=r,this.hide=i,this.cancel=o,this.resetPosition=u}function r(){function e(e,i,o,u,a){var f,l=i.split("-")[0],c=new t;switch(f=s(e)?r(e,l):n(e,l),i){case"n":c.set("left",f.left-o/2),c.set("bottom",N.windowHeight-f.top+a);break;case"e":c.set("left",f.left+a),c.set("top",f.top-u/2);break;case"s":c.set("left",f.left-o/2),c.set("top",f.top+a);break;case"w":c.set("top",f.top-u/2),c.set("right",N.windowWidth-f.left+a);break;case"nw":c.set("bottom",N.windowHeight-f.top+a),c.set("right",N.windowWidth-f.left-20);break;case"nw-alt":c.set("left",f.left),c.set("bottom",N.windowHeight-f.top+a);break;case"ne":c.set("left",f.left-20),c.set("bottom",N.windowHeight-f.top+a);break;case"ne-alt":c.set("bottom",N.windowHeight-f.top+a),c.set("right",N.windowWidth-f.left);break;case"sw":c.set("top",f.top+a),c.set("right",N.windowWidth-f.left-20);break;case"sw-alt":c.set("left",f.left),c.set("top",f.top+a);break;case"se":c.set("left",f.left-20),c.set("top",f.top+a);break;case"se-alt":c.set("top",f.top+a),c.set("right",N.windowWidth-f.left)}return c}function n(e,t){var n,r,i=e.offset(),s=e.outerWidth(),o=e.outerHeight();switch(t){case"n":n=i.left+s/2,r=i.top;break;case"e":n=i.left+s,r=i.top+o/2;break;case"s":n=i.left+s/2,r=i.top+o;break;case"w":n=i.left,r=i.top+o/2;break;case"nw":n=i.left,r=i.top;break;case"ne":n=i.left+s,r=i.top;break;case"sw":n=i.left,r=i.top+o;break;case"se":n=i.left+s,r=i.top+o}return{top:r,left:n}}function r(e,t){function n(){d.push(f.matrixTransform(c))}var r,i,s,o,u=e.closest("svg")[0],a=e[0],f=u.createSVGPoint(),l=a.getBBox(),c=a.getScreenCTM(),h=l.width/2,p=l.height/2,d=[],v=["nw","n","ne","e","se","s","sw","w"];if(f.x=l.x,f.y=l.y,n(),f.x+=h,n(),f.x+=h,n(),f.y+=p,n(),f.y+=p,n(),f.x-=h,n(),f.x-=h,n(),f.y-=p,n(),d[0].y!==d[1].y||d[0].x!==d[7].x)for(i=Math.atan2(c.b,c.a)*T,s=Math.ceil((i%360-22.5)/45),1>s&&(s+=8);s--;)v.push(v.shift());for(o=0;d.length>o;o++)if(v[o]===t){r=d[o];break}return{top:r.y+N.scrollTop,left:r.x+N.scrollLeft}}this.compute=e}function i(n){function i(e){e.data(m,!0),T.queue(function(t){s(e),t()})}function s(e){var t;if(e.data(m)){if(N.isTipOpen)return N.isClosing||o(N.activeHover),T.delay(100).queue(function(t){s(e),t()}),void 0;e.trigger("powerTipPreRender"),t=f(e),t&&(T.empty().append(t),e.trigger("powerTipRender"),N.activeHover=e,N.isTipOpen=!0,T.data(b,n.mouseOnToPopup),n.followMouse?u():(w(e),N.isFixedTipOpen=!0),T.fadeIn(n.fadeInTime,function(){N.desyncTimeout||(N.desyncTimeout=setInterval(S,500)),e.trigger("powerTipOpen")}))}}function o(e){N.isClosing=!0,N.activeHover=null,N.isTipOpen=!1,N.desyncTimeout=clearInterval(N.desyncTimeout),e.data(m,!1),e.data(g,!1),T.fadeOut(n.fadeOutTime,function(){var r=new t;N.isClosing=!1,N.isFixedTipOpen=!1,T.removeClass(),r.set("top",N.currentY+n.offset),r.set("left",N.currentX+n.offset),T.css(r),e.trigger("powerTipClose")})}function u(){if(!N.isFixedTipOpen&&(N.isTipOpen||N.tipOpenImminent&&T.data(y))){var e,r,i=T.outerWidth(),s=T.outerHeight(),o=new t;o.set("top",N.currentY+n.offset),o.set("left",N.currentX+n.offset),e=l(o,i,s),e!==C.none&&(r=c(e),1===r?e===C.right?o.set("left",N.windowWidth-i):e===C.bottom&&o.set("top",N.scrollTop+N.windowHeight-s):(o.set("left",N.currentX-i-n.offset),o.set("top",N.currentY-s-n.offset))),T.css(o)}}function w(t){var r,i;n.smartPlacement?(r=e.fn.powerTip.smartPlacementLists[n.placement],e.each(r,function(e,n){var r=l(E(t,n),T.outerWidth(),T.outerHeight());return i=n,r===C.none?!1:void 0})):(E(t,n.placement),i=n.placement),T.addClass(i)}function E(e,r){var i,s,o=0,u=new t;u.set("top",0),u.set("left",0),T.css(u);do i=T.outerWidth(),s=T.outerHeight(),u=x.compute(e,r,i,s,n.offset),T.css(u);while(5>=++o&&(i!==T.outerWidth()||s!==T.outerHeight()));return u}function S(){var e=!1;!N.isTipOpen||N.isClosing||N.delayInProgress||(N.activeHover.data(m)===!1||N.activeHover.is(":disabled")?e=!0:a(N.activeHover)||N.activeHover.is(":focus")||N.activeHover.data(g)||(T.data(b)?a(T)||(e=!0):e=!0),e&&o(N.activeHover))}var x=new r,T=e("#"+n.popupId);0===T.length&&(T=e("<div/>",{id:n.popupId}),0===d.length&&(d=e("body")),d.append(T)),n.followMouse&&(T.data(y)||(h.on("mousemove",u),p.on("scroll",u),T.data(y,!0))),n.mouseOnToPopup&&T.on({mouseenter:function(){T.data(b)&&N.activeHover&&N.activeHover.data(v).cancel()},mouseleave:function(){N.activeHover&&N.activeHover.data(v).hide()}}),this.showTip=i,this.hideTip=o,this.resetPosition=w}function s(e){return window.SVGElement&&e[0]instanceof SVGElement}function o(){N.mouseTrackingActive||(N.mouseTrackingActive=!0,e(function(){N.scrollLeft=p.scrollLeft(),N.scrollTop=p.scrollTop(),N.windowWidth=p.width(),N.windowHeight=p.height()}),h.on("mousemove",u),p.on({resize:function(){N.windowWidth=p.width(),N.windowHeight=p.height()},scroll:function(){var e=p.scrollLeft(),t=p.scrollTop();e!==N.scrollLeft&&(N.currentX+=e-N.scrollLeft,N.scrollLeft=e),t!==N.scrollTop&&(N.currentY+=t-N.scrollTop,N.scrollTop=t)}}))}function u(e){N.currentX=e.pageX,N.currentY=e.pageY}function a(e){var t=e.offset(),n=e[0].getBoundingClientRect(),r=n.right-n.left,i=n.bottom-n.top;return N.currentX>=t.left&&N.currentX<=t.left+r&&N.currentY>=t.top&&N.currentY<=t.top+i}function f(t){var n,r,i=t.data(E),s=t.data(S),o=t.data(x);return i?(e.isFunction(i)&&(i=i.call(t[0])),r=i):s?(e.isFunction(s)&&(s=s.call(t[0])),s.length>0&&(r=s.clone(!0,!0))):o&&(n=e("#"+o),n.length>0&&(r=n.html())),r}function l(e,t,n){var r=N.scrollTop,i=N.scrollLeft,s=r+N.windowHeight,o=i+N.windowWidth,u=C.none;return(r>e.top||r>Math.abs(e.bottom-N.windowHeight)-n)&&(u|=C.top),(e.top+n>s||Math.abs(e.bottom-N.windowHeight)>s)&&(u|=C.bottom),(i>e.left||e.right+t>o)&&(u|=C.left),(e.left+t>o||i>e.right)&&(u|=C.right),u}function c(e){for(var t=0;e;)e&=e-1,t++;return t}var h=e(document),p=e(window),d=e("body"),v="displayController",m="hasActiveHover",g="forcedOpen",y="hasMouseMove",b="mouseOnToPopup",w="originalTitle",E="powertip",S="powertipjq",x="powertiptarget",T=180/Math.PI,N={isTipOpen:!1,isFixedTipOpen:!1,isClosing:!1,tipOpenImminent:!1,activeHover:null,currentX:0,currentY:0,previousX:0,previousY:0,desyncTimeout:null,mouseTrackingActive:!1,delayInProgress:!1,windowWidth:0,windowHeight:0,scrollTop:0,scrollLeft:0},C={none:0,top:1,bottom:2,left:4,right:8};e.fn.powerTip=function(t,r){if(!this.length)return this;if("string"===e.type(t)&&e.powerTip[t])return e.powerTip[t].call(this,this,r);var s=e.extend({},e.fn.powerTip.defaults,t),u=new i(s);return o(),this.each(function(){var t,r=e(this),i=r.data(E),o=r.data(S),a=r.data(x);r.data(v)&&e.powerTip.destroy(r),t=r.attr("title"),i||a||o||!t||(r.data(E,t),r.data(w,t),r.removeAttr("title")),r.data(v,new n(r,s,u))}),s.manual||this.on({"mouseenter.powertip":function(t){e.powerTip.show(this,t)},"mouseleave.powertip":function(){e.powerTip.hide(this)},"focus.powertip":function(){e.powerTip.show(this)},"blur.powertip":function(){e.powerTip.hide(this,!0)},"keydown.powertip":function(t){27===t.keyCode&&e.powerTip.hide(this,!0)}}),this},e.fn.powerTip.defaults={fadeInTime:200,fadeOutTime:100,followMouse:!1,popupId:"powerTip",intentSensitivity:7,intentPollInterval:100,closeDelay:100,placement:"n",smartPlacement:!1,offset:10,mouseOnToPopup:!1,manual:!1},e.fn.powerTip.smartPlacementLists={n:["n","ne","nw","s"],e:["e","ne","se","w","nw","sw","n","s","e"],s:["s","se","sw","n"],w:["w","nw","sw","e","ne","se","n","s","w"],nw:["nw","w","sw","n","s","se","nw"],ne:["ne","e","se","n","s","sw","ne"],sw:["sw","w","nw","s","n","ne","sw"],se:["se","e","ne","s","n","nw","se"],"nw-alt":["nw-alt","n","ne-alt","sw-alt","s","se-alt","w","e"],"ne-alt":["ne-alt","n","nw-alt","se-alt","s","sw-alt","e","w"],"sw-alt":["sw-alt","s","se-alt","nw-alt","n","ne-alt","w","e"],"se-alt":["se-alt","s","sw-alt","ne-alt","n","nw-alt","e","w"]},e.powerTip={show:function(t,n){return n?(u(n),N.previousX=n.pageX,N.previousY=n.pageY,e(t).data(v).show()):e(t).first().data(v).show(!0,!0),t},reposition:function(t){return e(t).first().data(v).resetPosition(),t},hide:function(t,n){return t?e(t).first().data(v).hide(n):N.activeHover&&N.activeHover.data(v).hide(!0),t},destroy:function(t){return e(t).off(".powertip").each(function(){var t=e(this),n=[w,v,m,g];t.data(w)&&(t.attr("title",t.data(w)),n.push(E)),t.removeData(n)}),t}},e.powerTip.showTip=e.powerTip.show,e.powerTip.closeTip=e.powerTip.hide});(function(e){"use strict";e.fn.completion=function(t){function s(e){var t=n.itemTemplate.clone();r.append(t);n.responseFiller.call(t,e);return t}var n=e.extend({requestURL:"",itemTemplate:e("<li></li>"),responseFiller:function(t){e(this).text(t)},completionBoxID:"completion-Box",queryOnCallback:function(e){return e},queryOffCallback:function(){},userChoiceHandler:function(){},userRequestWithNoChoiceHandler:function(){},updateInputFromSelection:function(){},escapeHandler:function(){}},t),r=e("#"+n.completionBoxID),i=e();this.data("oldVal",this.val());this.bind("propertychange keyup input paste",function(t){var o=e(this);if([40,38,27,13].indexOf(t.which)>-1)return;if(o.data("oldVal")===o.val())return;o.data("oldVal",o.val());if(o.val()===""){r.fadeOut(100);n.queryOffCallback.call(this);return}n.queryOnCallback.call(this,o.val());e.ajax({dataType:"json",url:n.requestURL,data:{request:o.val()},queue:"completion",success:function(e){if(e.length===0){r.fadeOut(50,function(){r.empty()});i=null;return}r.empty();r.is(":hidden")&&r.fadeIn(100);for(var t=0;t<e.length;t++)s(e[t]).data("associatedData",e[t]);i=r.children().first().addClass("selected")}})});this.keydown(function(e){e.which===27&&n.escapeHandler.call(this);if(i===null)return;if(e.which===40){i=i.removeClass("selected").next().addClass("selected");i.length===0&&(i=r.children().first().addClass("selected"));n.updateInputFromSelection.call(i[0]);return!1}if(e.which===38){i=i.removeClass("selected").prev().addClass("selected");i.length===0&&(i=r.children().last().addClass("selected"));n.updateInputFromSelection.call(i[0]);return!1}});r.on("mouseenter","li",function(){if(i[0]!==this){i.removeClass("selected");i=e(this).addClass("selected");n.updateInputFromSelection.call(this)}});r.on("click","li",function(){n.userChoiceHandler.call(this)});this.keypress(function(e){if(e.which===13)if(i!==null){n.userChoiceHandler.call(i[0]);i=null}else n.userRequestWithNoChoiceHandler.call()});var o=e(this);this.data("completion",{clear:function(){r.fadeOut(100)},setInputValue:function(e){o.val(e).data("oldVal",e);return o}});return this.data("completion")}})(jQuery);var cookies=function(){"use strict";return{create:function(e,t,n){var r;if(n){var i=new Date;i.setTime(i.getTime()+n*24*60*60*1e3);r="; expires="+i.toGMTString()}else r="";document.cookie=e+"="+t+r+"; path=/"},read:function(e){var t=e+"=",n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)===" ")i=i.substring(1,i.length);if(i.indexOf(t)===0)return i.substring(t.length,i.length)}return null},erase:function(e){this.createCookie(e,"",-1)}}}(),GoogleMap=function(){"use strict";var e="GoogleMapGeoLocationLatitude",t="GoogleMapGeoLocationLongitude",n={url:"../img/map/cercle.png",size:new google.maps.Size(30,30),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(15,15)},r=function(e,t,n){var r={center:e,zoom:t,mapTypeId:n,styles:[{featureType:"road",stylers:[{visibility:"simplified"}]}]},i,s=!1;this.setMap=function(e){i=e};this.getMap=function(){return i};this.getMapOptions=function(){return r};this.reinitSetLocationToCurrent=function(){s=!1};this.cancelSetLocationToCurrent=function(){s=!0};this.isSetLocationToCurrentCanceled=function(){return s}};r.prototype={createMap:function(e){this.setMap(new google.maps.Map(e,this.getMapOptions()));return this},addMarker:function(e){return new google.maps.Marker({position:e,map:this.getMap(),icon:n})},addInfoWindow:function(e,t){return new google.maps.InfoWindow({content:e,maxWidth:t})},addPopForMarker:function(e,t){var n=!1;google.maps.event.addListener(e,"click",function(){n?t.close():t.open(this.getMap(),e);n=!n})},setLocationToCurrent:function(){function o(o){if(r.isSetLocationToCurrentCanceled()===!1){if(o.coords.latitude===i&&o.coords.longitude===s)return;cookies.create(e,o.coords.latitude,100);cookies.create(t,o.coords.longitude,100);n.setCenter(new google.maps.LatLng(o.coords.latitude,o.coords.longitude))}else r.reinitSetLocationToCurrent()}function u(e){console.log("error: "+e)}var n=this.getMap(),r=this,i=cookies.read(e),s=cookies.read(t);i!==null&&s!==null&&n.setCenter(new google.maps.LatLng(i,s));navigator.geolocation&&navigator.geolocation.getCurrentPosition(o,u)},setCenter:function(e){this.getMap().setCenter(e)},loadPins:function(e,t){var n=this;$.get(e).done(function(e){for(var r=0;r<e.length;r++){var i=n.addMarker(new google.maps.LatLng(e[r].latitude,e[r].longitude));t.call(i,e[r])}}).fail(function(){console.log("something went wrong, please refresh")})}};return r}(),pinsHandler=function(){"use strict";function r(t){t.close();n.getMap().setOptions({zoomControl:!0,scrollwheel:!0,disableDoubleClickZoom:!1,draggable:!0,panControl:!0});e=!1}function i(e,t,n,r){return function(){}}var e=!1,t=null,n=null;return{init:function(e){n=e;var t=$('<div id="infoWindow" style="width: 150px; height:150px; word-wrap: break-word; text-align: left; padding: 5px;"/>'),s=n.addInfoWindow(t[0],300);google.maps.event.addListener(s,"closeclick",function(){r(s)});n.loadPins(baseURL+"/api/requests",function(e){google.maps.event.addListener(this,"click",i(t,s,e,this))})}}}(),CustomEventsDetectionModule=function(){"use strict";return{transitionEndEventName:function(){var e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};return e[Modernizr.prefixed("transition")]}}}(),AlertMapModule=function(){"use strict";var e=$("#map_canvas"),t=new google.maps.LatLng(36.843611,10.197424),n=new GoogleMap(t,12,google.maps.MapTypeId.ROADMAP);console.log(e);return{init:function(){n.createMap(e[0]);n.setLocationToCurrent();pinsHandler.init(n)}}}(),ModalAlertMapModule=function(){"use strict";return{init:function(){var e=$("#maps-modal-container"),t=e.find("#maps-modal-reveal"),n=!1;AlertMapModule.init()}}}(),DetailMapModule=function(){"use strict";function l(n){if(s===null)if(r.getMap().getZoom()>=e){u.val(n.latLng.lat());a.val(n.latLng.lng());i===null?i=r.addMarker(n.latLng):i.setPosition(n.latLng);$.powerTip.hide(t);if(f!==null){google.maps.event.removeListener(f);f=null}}else{if(t.data("initialTipOn")){$.powerTip.hide(t,!0);t.data("initialTipOn",!1)}i===null?t.data("powertip","Please <b>zoom in</b> to be able to choose a location."):t.data("powertip","Please <b>zoom in</b> to be able to change the location.");$.powerTip.show(t);f===null&&(f=google.maps.event.addListener(r.getMap(),"zoom_changed",function(){r.getMap().getZoom()>=e?$.powerTip.hide(t):$.powerTip.show(t)}))}}function c(e){t.powerTip({manual:!0});if(e===undefined)google.maps.event.addListenerOnce(r.getMap(),"idle",function(){t.data("powertip","<b>Choose</b> a location.");t.data("initialTipOn",!0);$.powerTip.show(t)});else{i=r.addMarker(e);r.getMap().setCenter(e)}google.maps.event.addListener(r.getMap(),"click",l)}function h(){function s(){n=e.val();i=t.val();p(n,i)}var e=$("#title_input"),t=$("#description_input"),n="",i="";google.maps.event.addListenerOnce(r.getMap(),"idle",function(){(e.val()!==""||t.val()!=="")&&s()});e.keyup(s);e.change(s);t.keyup(s);t.change(s)}function p(n,u){o.html("<b>"+n+"</b><br />"+u);if(i!==null&&s===null){r.getMap().getZoom()<e&&r.getMap().setZoom(e);s=r.addInfoWindow(o[0],300);s.open(r.getMap(),i);r.getMap().setOptions({zoomControl:!1,scrollwheel:!1,disableDoubleClickZoom:!0,draggable:!1,panControl:!1});$.powerTip.hide(t);google.maps.event.addListener(s,"closeclick",function(){s=null;r.getMap().setOptions({zoomControl:!0,scrollwheel:!0,disableDoubleClickZoom:!1,draggable:!0,panControl:!0})})}}function d(){var e=$("#photo-upload"),t=$("#upload-info"),n=t.text();e.change(function(){var r=e.val();r.match(/fakepath/)&&(r=r.replace(/C:\\fakepath\\/i,""));r===""&&(r=n);t.text(r)})}var e=15,t=$("#map-detail-canvas"),n=new google.maps.LatLng(36.843611,10.197424),r=new GoogleMap(n,e,google.maps.MapTypeId.ROADMAP),i=null,s=null,o=$('<div id="infoWindow" style="width: 300px; height:200px; word-wrap: break-word; text-align: left;"/>'),u=$("#latitude_input"),a=$("#longitude_input"),f=null;return{init:function(){r.createMap(t[0]);if(u.val()!==""&&a.val()!==""){var e=new google.maps.LatLng(u.val(),a.val());c(e)}else{r.setLocationToCurrent();c()}h();d()}}}(),ReportMapModule=function(){"use strict";return{init:function(){var e=$("#report-page #map"),t=new google.maps.LatLng(e.data("latitude"),e.data("longitude")),n=new GoogleMap(t,15,google.maps.MapTypeId.ROADMAP);n.createMap(e[0]);n.getMap().setOptions({zoomControl:!1,scrollwheel:!1,disableDoubleClickZoom:!0,draggable:!1,panControl:!1});n.addMarker(t);var r=$("#data-container");$(".report-place").click(function(){r.hasClass("mapDisplayed")?r.removeClass("mapDisplayed"):r.addClass("mapDisplayed")});$(".enlarge-photo-button").click(function(){if(r.hasClass("photoDisplayed")){r.removeClass("photoDisplayed");$(this).removeClass("icon-resize-small").addClass("icon-resize-full")}else{r.addClass("photoDisplayed");$(this).removeClass("icon-resize-full").addClass("icon-resize-small")}})}}}(),MainMapModule=function(){"use strict";function o(e){var t={address:e};n.removeClass("icon-search").addClass("icon-remove");s.geocode(t,function(e,t){if(t!=="OK")return;i.cancelSetLocationToCurrent();i.getMap().fitBounds(e[0].geometry.viewport);i.setCenter(e[0].geometry.location)})}var e=$(".google-Map"),t=$(".google-Search-input"),n=$(".google-Search-searchIcon"),r=new google.maps.LatLng(36.843611,10.197424),i=new GoogleMap(r,12,google.maps.MapTypeId.ROADMAP),s=new google.maps.Geocoder;return{init:function(){i.createMap(e[0]);i.setLocationToCurrent();pinsHandler.init(i);t.focus();var r=t.completion({requestURL:baseURL+"/api/suggestion/place",itemTemplate:$("<li/>").append('<span class="google-Search-suggestionText" />').append('<span class="google-Search-suggestionReports"></span>').append('<span class="google-Search-suggestionType"></span>'),responseFiller:function(e){var n=t.val();$(this).find(".google-Search-suggestionText").html(highlightWordsNoCase(e.text,n,"normalWeight"));$(this).find(".google-Search-suggestionReports").text(e.reports);$(this).find(".google-Search-suggestionType").text(e.type)},queryOnCallback:function(){n.hasClass("icon-search")&&n.removeClass("icon-search").addClass("icon-remove")},queryOffCallback:function(){n.hasClass("icon-remove")&&n.removeClass("icon-remove").addClass("icon-search")},userChoiceHandler:function(){var e=$(this).data("associatedData");o(e.text+" "+e.type);r.setInputValue(e.text).focus();r.clear()},userRequestWithNoChoiceHandler:function(){o(t.val());r.clear()},updateInputFromSelection:function(){r.setInputValue($(this).data("associatedData").text)},escapeHandler:function(){r.clear();r.setInputValue("");n.removeClass("icon-remove").addClass("icon-search")}});n.click(function(){r.setInputValue("").focus();if($(this).hasClass("icon-remove")){r.clear();$(this).removeClass("icon-remove").addClass("icon-search")}})}}}(),facebookShareModule=function(){"use strict";function n(){FB.ui({method:"feed",name:e.data("name"),caption:e.data("caption"),description:e.data("description"),link:e.data("link"),picture:e.data("picture")},function(e){if(e&&e.post_id){var n=t.data("shareCount")+1;t.data("powertip",r(n)).data("shareCount",n)}});return!1}function r(e){switch(e){case 0:return"Be the first to share!";case 1:return"1 share";default:return e+" shares"}}function i(){FB.api({method:"fql.query",query:'SELECT share_count FROM link_stat WHERE url = "'+e.data("link")+'"'},function(e){var n=parseInt(e[0].share_count,10);t.data("powertip",r(n)).data("shareCount",n).powerTip({placement:"n"})})}var e,t;return{init:function(r,s){e=r;t=s;$.ajaxSetup({cache:!0});t.click(function(){return!1});$.getScript("//connect.facebook.net/en_UK/all.js",function(){FB.init({appId:Config.facebook.appID,channelUrl:baseURL+"/channel"});t.click(function(){n(e)});i(e,t)})}}}();$(document).ready(function(){"use strict";ModalAlertMapModule.init();$("#details_page").length===1&&DetailMapModule.init();var e=$("#report-page");e.length===1&&ReportMapModule.init();$("#map-page").length===1&&MainMapModule.init();var t=$(".share-facebook");t.length>0&&facebookShareModule.init(e,t);var n=$("#buttonGroup");n.children().click(function(){n.addClass("hide").parent().text("Someone is coming... Searching...")})});