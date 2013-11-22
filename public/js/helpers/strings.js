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