/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
    let value = window.localStorage.getItem(name);
    try {
        value = JSON.parse(value);
        return value;
    } catch(e) {
        console.log(e);
        return value;
    }
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

//设置sessionStorage
export const setSession = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
export const getSession = name => {
    if (!name) return;
    let value = window.sessionStorage.getItem(name);
    try {
        value = JSON.parse(value);
        return value;
    } catch(e) {
        console.log(e);
        return value;
    }
}

/**
 * 删除sessionStorage
 */
export const removeSession = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}
// 获取URL后面参数
export const GetQueryString = name =>{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
//获取host
export const getHost = function() {
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
//rem转换px
export const rem2px = function(rem){
    var clientWidth = document.documentElement.clientWidth;
    if (clientWidth){
        return clientWidth / 750 * 100 * rem;
    }else{
        return rem;
    }
}
/**
 * 获取style样式
 */
const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 
// 获取滚动dom infiniteScroll里使用
const getScrollview = function (el) {
    let currentNode = el;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};

/* istanbul ignore next */
const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

// /* istanbul ignore next */
// export function hasClass(el, cls) {
//   if (!el || !cls) return false;
//   if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
//   if (el.classList) {
//     return el.classList.contains(cls);
//   } else {
//     return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
//   }
// };

// /* istanbul ignore next */
// export function addClass(el, cls) {
//   if (!el) return;
//   var curClass = el.className;
//   var classes = (cls || '').split(' ');

//   for (var i = 0, j = classes.length; i < j; i++) {
//     var clsName = classes[i];
//     if (!clsName) continue;

//     if (el.classList) {
//       el.classList.add(clsName);
//     } else {
//       if (!hasClass(el, clsName)) {
//         curClass += ' ' + clsName;
//       }
//     }
//   }
//   if (!el.classList) {
//     el.className = curClass;
//   }
// };

/* istanbul ignore next */
// export function removeClass(el, cls) {
//   if (!el || !cls) return;
//   var classes = cls.split(' ');
//   var curClass = ' ' + el.className + ' ';

//   for (var i = 0, j = classes.length; i < j; i++) {
//     var clsName = classes[i];
//     if (!clsName) continue;

//     if (el.classList) {
//       el.classList.remove(clsName);
//     } else {
//       if (hasClass(el, clsName)) {
//         curClass = curClass.replace(' ' + clsName + ' ', ' ');
//       }
//     }
//   }
//   if (!el.classList) {
//     el.className = trim(curClass);
//   }
// };

const hasClass = function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

const addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
};

const removeClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
};
//中文转阿拉伯数字
var chnNumChar = {
  零:0,
  一:1,
  二:2,
  三:3,
  四:4,
  五:5,
  六:6,
  七:7,
  八:8,
  九:9
};
var chnNameValue = {
  十:{value:10, secUnit:false},
  百:{value:100, secUnit:false},
  千:{value:1000, secUnit:false},
  万:{value:10000, secUnit:true},
  亿:{value:100000000, secUnit:true}
}
function ChineseToNumber(chnStr){
    var rtn = 0;
    var section = 0;
    var number = 0;
    var secUnit = false;
    var str = chnStr.split('');

    for(var i = 0; i < str.length; i++){
        var num = chnNumChar[str[i]];
        if(typeof num !== 'undefined'){
            number = num;
            if(i === str.length - 1){
                section += number;
            }
        }else{
            var unit = chnNameValue[str[i]].value;
            secUnit = chnNameValue[str[i]].secUnit;
            if(secUnit){
                section = (section + number) * unit;
                rtn += section;
                section = 0;
            }else{
                section += (number * unit);
            }
            number = 0;
        }
    }
    return rtn + section;
}
export {getStyle, getScrollview, addClass, removeClass, once ,ChineseToNumber};