var clientWidth = document.documentElement.clientWidth;
if (clientWidth){
    document.documentElement.style.fontSize = clientWidth / 750 * 100 + 'px';
}

(function(win, doc) {
    //rem根html字体大小计算
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = clientWidth / 750 * 100 + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(window, document);  