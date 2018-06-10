(function(doc, win) {
  var maxWidthREM = 1920;
  var minWidthREM = 1200;
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      // docEl.style.fontSize = 50 * ((clientWidth >= maxWidthREM ? maxWidthREM : clientWidth) / (maxWidthREM / 2)) + 'px';
      docEl.style.fontSize = 100/1920 * (clientWidth <= minWidthREM ? minWidthREM : clientWidth) + 'px';
    };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
