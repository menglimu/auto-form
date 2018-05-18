function ms() {
    this.setProperty = function(key, value) {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    };
    this.removeProperty = function(key) {
        localStorage.removeItem(key);
    };
    this.getProperty = function(key) {
        var value = localStorage.getItem(key)
        try {
            value = JSON.parse(value);
            return value;
        } catch(e) {
            console.log(e);
            return value;
        }
    };
    this.setSession = function(key, value) {
        sessionStorage.setItem(key, value);
    };
    this.getSession = function(key) {
        return sessionStorage.getItem(key) || "";
    };
    this.removeSession = function(key) {
        sessionStorage.removeItem(key);
    };
    this.clearSession = function() {
        sessionStorage.clear();
    };

    //获取cookie
    this.getCookie = function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    };
    //存储cookie
    this.setCookie = function(name, value) {
        var minutes = 60*12;
        var exp = new Date();
        exp.setTime(exp.getTime() + minutes * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/; domain=.msyidai.com";
    };
    this.go = function(url) {
        window.location.href = url;
    };
    this.isWeiXin = function() {
        return /MicroMessenger/.test(navigator.userAgent);
    };
    this.isAndroid = function() {
        return /android/i.test(navigator.userAgent);
    };
    this.isIphone = function() {
        return /iphone/i.test(navigator.userAgent);
    };
    this.getHost = function() {
        var _http = window.location.protocol;
        var _hostname = window.location.hostname;
        var _port = window.location.port;
        var _pathname = window.location.pathname;
        var http = "";
        if (_port) {
            return http = _http + "//" + _hostname + ":" + _port + "/";
        }
        return http = _http + "//" + _hostname + "/";
    }

    /**
     * 获取url对象 不允许有=号的出现否则出问题
     */
    this.urlToObj = function() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    /*
        组装url
     */
    this.urlObjToStr = function(obj) {
            var length = obj && obj.length,
                idx = 0,
                url = '';
            for (var key in obj) {
                if (key != 'url' && obj[key] !== null) {
                    url += (key + '=' + encodeURIComponent(obj[key]) + '&');
                }
            }
            return url.substring(0, url.lastIndexOf('&'));
        }
    //获取时间戳
    this.getTimeNumber = function(time) {
        var stringTime = time;
        var timestamp2 = Date.parse(new Date(stringTime));
        timestamp2 = timestamp2 / 1000;
        return timestamp2;
    }
    //获取URL参数
    this.GetQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    this.keys = function(obj) {
        var keys = [];
        for (var pro in obj) {
            keys.push(pro);
        }
        return keys;
    }

    /* 
    获取values 
    */
    this.values = function(obj) {
            var values = [];
            for (var pro in obj) {
                values.push(obj[pro]);
            }
            return values;
        }
        //获取微信接口信息
    this.getWxJsConfig = function(url, fn) {
            return this.jqpost("wechat/getWxJsConfig", { "url": url, wap: true }, fn, function() {});
        }
        //微信分享
    this.wxShare = function(jsConfig, shareData) {
            wx.config({
                debug: false,
                appId: jsConfig.appId,
                timestamp: jsConfig.timestamp,
                nonceStr: jsConfig.nonceStr,
                signature: jsConfig.signature,
                jsApiList: ["showOptionMenu", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
                    //"hideMenuItems"
            });
            wx.ready(function() {
                wx.showOptionMenu();
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: shareData.content,
                    //title: shareData.title,
                    link: shareData.url,
                    imgUrl: shareData.iconUrl,
                    success: shareData.success,
                    cancel: shareData.cancel
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: shareData.title,
                    desc: shareData.content,
                    link: shareData.url,
                    imgUrl: shareData.iconUrl,
                    type: 'link',
                    success: shareData.success,
                    cancel: shareData.cancel
                });
                wx.onMenuShareQQ({
                    title: shareData.title,
                    desc: shareData.content,
                    link: shareData.url,
                    imgUrl: shareData.iconUrl,
                    success: shareData.success,
                    cancel: shareData.cancel
                });
                //分享到微博
                wx.onMenuShareWeibo({
                    title: shareData.title,
                    desc: shareData.content,
                    link: shareData.url,
                    imgUrl: shareData.iconUrl,
                    success: shareData.success,
                    cancel: shareData.cancel
                });
                //分享到QQ空间
                wx.onMenuShareQZone({
                    title: shareData.title,
                    desc: shareData.content,
                    link: shareData.url,
                    imgUrl: shareData.iconUrl,
                    success: shareData.success,
                    cancel: shareData.cancel
                });

            });
            wx.error(function(res) {
                //alert(res);
            });
        }
 }
 let $mscomm = new ms()
 export default $mscomm;