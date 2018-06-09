
//import Vue from 'vue'
var bridge = {};
bridge.bridge = null;
bridge.agent = navigator.userAgent.toLowerCase();
bridge.protocol = "http";
if (window.WebViewJavascriptBridge) {
	callback(WebViewJavascriptBridge)
} else {
	document.addEventListener('WebViewJavascriptBridgeReady', function () {
		callback(WebViewJavascriptBridge)
	}, false)
}
//判断是否为微信
bridge.isWeiXin = function() {
	return /MicroMessenger/.test(navigator.userAgent);
};
bridge.isIOS = function () {
	return (/(iphone|ipad|ipod)/i.test(bridge.agent));
};

bridge.isAndroid = function () {
	return (/(android)/i.test(bridge.agent));getUserInfo
};

bridge.isOther = function () {
	return !(/(iphone|ipad|ipod)/i.test(bridge.agent)) && !(/(android)/i.test(bridge.agent));
};

bridge.isMsokApp = function () {
	var navUsAg = navigator.userAgent.toLowerCase();
	return /msok-app/.test(navUsAg);
};

bridge.setupWebViewJavascriptBridge =  function(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
//IOS交互
bridge.iosSend = function(name,params,callbackFun){
	var obj = { "call_method": "toAppPage", "parameters":
		{ "pageName": name, "pageParams": params}
	}
	if(bridge.isMsokApp()){
		if(!bridge.isAndroid() && bridge.isIOS()){
			params.callback = 'callbackFun_'+name;
			bridge.registerFun(params.callback,callbackFun);
			bridge.setupWebViewJavascriptBridge(function(data){
				WebViewJavascriptBridge.callHandler('ObjcCallback', obj, function(response) {})
			})
		}else if(!bridge.isIOS() && bridge.isAndroid()){
			params.callback = 'callbackFun_'+name;
			window.androidjs.send(JSON.stringify(obj));
		}
    }

}
//APP方法注册
bridge.registerFun = function(name,callbackFun){
	bridge.setupWebViewJavascriptBridge(function(bridgeIos) {
		bridgeIos.registerHandler(name, function(data, responseCallback) {
			callbackFun(data);
		})
	})
}


bridge.connectWebViewJavascriptBridge = function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
		bridge.bridge = WebViewJavascriptBridge;
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function () {
			callback(WebViewJavascriptBridge);
			bridge.bridge = WebViewJavascriptBridge;
		}, false);
	}
};
bridge.connectWebViewJavascriptBridge(function (bridgeIOS) {
	bridgeIOS.init(function (message, responseCallback) {
		var obj = JSON.parse(message);
		if (obj && initPage) {
			eval("initPage('" + obj.parameters + "')");
		}
		if (responseCallback)
			responseCallback(data);
	});
});
bridge.send = function (option, responseHandler,noBrigeFn) {
	if (!option) {
		alert("缺失参数");
		return;
	}
	if (bridge.isIOS()) {
		if (!bridge.bridge) {
			if(typeof(noBrigeFn)=="function"){
				noBrigeFn();
			}
			return;
		}
		bridge.bridge.send(JSON.stringify(option), function (resp) {
			if (responseHandler)
				responseHandler(resp);
		});
		return;
	}
	if (bridge.isAndroid()) {
		var response = window.msok.send(JSON.stringify(option));
		if (response) response = JSON.parse(response);
		if (responseHandler)
			responseHandler(response);
		return;
	}
	if (responseHandler)
		responseHandler({
			'sessionId': localStorage.getItem("sessionId")
		});
};
bridge.loadPage = function (url, callback) {
	var r = new Date().getTime();
	url = url.indexOf("?") == -1 ? url + "?r=" + r : url + "&r=" + r;
	if (!bridge.isAndroid() && !bridge.isIOS()) {
		window.location.href = url;
		if (callback)
			callback();
		return;
	}
	bridge.send({
		"call_method": "loadPage",
		"parameters": {
			"page": url
		}
	}, function (data) {
		if (callback)
			callback(data);
	});
};
Vue.prototype.bridge = Vue.bridge = bridge
export default bridge
