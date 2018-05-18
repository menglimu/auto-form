
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    console.log(userAgent);
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	  var isChrome = userAgent.indexOf("Chrome")>-1;
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
        if (IE9) {
            return "IE9";
        }
        if(!IE55 && !IE6 && !IE7 && !IE8 && !IE9){
            return 'IE9+';
        }
    }//isIE end
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
	if  (isChrome){
	    return "Chrome";
	}
}//myBrowser() end

var thisWebVersion = myBrowser();

if (thisWebVersion == "IE8" || thisWebVersion == "IE7" || thisWebVersion == "IE6" || thisWebVersion == "IE9") {
  alert("版本过低")
  $('body').html("")
}
