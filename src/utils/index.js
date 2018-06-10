/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return;
  let value = window.localStorage.getItem(name);
  try {
    value = JSON.parse(value);
    return value;
  } catch (e) {
    console.log(e);
    return value;
  }
}

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

//设置sessionStorage
const setSession = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
const getSession = name => {
  if (!name) return;
  let value = window.sessionStorage.getItem(name);
  try {
    value = JSON.parse(value);
    return value;
  } catch (e) {
    console.log(e);
    return value;
  }
}

/**
 * 删除sessionStorage
 */
const removeSession = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}
// 获取URL后面参数
const GetQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
//获取host
const getHost = function() {
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
const rem2px = function(rem) {
  var clientWidth = document.documentElement.clientWidth;
  if (clientWidth) {
    return clientWidth / 750 * 100 * rem;
  } else {
    return rem;
  }
}
// 生成随机id
const createRandomId = function() {
  return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
}
//比较2个对象是否相等
const isEqual = function(x, y) {
  // If both x and y are null or undefined and exactly the same 
  if (x === y) {
    return true;
  }

  // If they are not strictly equal, they both need to be Objects 
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }

  //They must have the exact same prototype chain,the closest we can do is
  //test the constructor. 
  if (x.constructor !== y.constructor) {
    return false;
  }

  for (var p in x) {
    //Inherited properties were tested using x.constructor === y.constructor
    if (x.hasOwnProperty(p)) {
      // Allows comparing x[ p ] and y[ p ] when set to undefined 
      if (!y.hasOwnProperty(p)) {
        return false;
      }

      // If they have the same strict value or identity then they are equal 
      if (x[p] === y[p]) {
        continue;
      }

      // Numbers, Strings, Functions, Booleans must be strictly equal 
      if (typeof(x[p]) !== "object") {
        return false;
      }

      // Objects and Arrays must be tested recursively 
      if (x[p]!==y[p]) {
        return false;
      }
    }
  }

  for (p in y) {
    // allows x[ p ] to be set to undefined 
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false;
    }
  }
  return true;
};


/**
 * 获取style样式
 */
const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}
// 获取滚动dom infiniteScroll里使用
const getScrollview = function(el) {
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

const hasClass = function(elem, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false;
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

const addClass = function(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
};

const removeClass = function(ele, cls) {
  if (hasClass(ele, cls)) {
    let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};
let hasLoad = []
//动态插入js.css到html
let getload = function (link) {
  for (var i = 0; i < hasLoad.length; i++) {
    if (!link||hasLoad[i] == link) {
      return new Promise((resolve, reject) => { 
        resolve('已加载')
      })
    } 
  }
  return new Promise((resolve, reject) => {  
    var head = document.getElementsByTagName('head')[0];
    var load = null
    if (/\.js$/.test(link)) {
      load = document.createElement('script');
      load.type ='text/javascript'
      load.src = link
    }else if (/\.css$/.test(link)) {
      var load = document.createElement('link');
      load.type = 'text/css';
      load.rel = 'stylesheet';
      load.href = link;
    }else{
      console.log('仅支持css,js文件')
      return
    }
    head.appendChild(load);  

    if (!/*@cc_on!@*/0) { //if not IE
        //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
        load.onload = function () {
          hasLoad.push(link)
          resolve('加载完成')
        }
    } else {
        //IE6、IE7 support js.onreadystatechange
        load.onreadystatechange = function () {
          hasLoad.push(link)
          resolve('加载完成')
        }
    }
  })
}
//动态插入js.css到html
const loadSource = async function (link) { 
    let getArr = []
   
    if (typeof link == 'string') {
      getArr.push(getload(link))
    }else if (typeof link == "object") {
      link.forEach((obj) => {
        getArr.push(getload(obj))
      })
    }

    return Promise.all(getArr);
}
// loadSource(['https://cdn.bootcss.com/element-ui/1.4.0/locale/zh-CN.js','https://cdn.bootcss.com/element-ui/1.4.0/theme-default/index.css']).then(()=>{
//       console.log(23123)
//     })

export { setStore, getStore, removeStore, getSession, setSession, removeSession, GetQueryString, getHost, rem2px, createRandomId, isEqual,
         getStyle, getScrollview, addClass, removeClass, once, loadSource };
