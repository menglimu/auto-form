import Vue from "vue"

/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return
  if (typeof content == "object") {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return
  let value = window.localStorage.getItem(name)
  try {
    value = JSON.parse(value)
    return value
  } catch (e) {
    // console.log(e)
    return value
  }
}

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

//设置sessionStorage
const setSession = (name, content) => {
  if (!name) return
  if (typeof content == "object") {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}
/**
 * 获取sessionStorage
 */
const getSession = name => {
  if (!name) return
  let value = window.sessionStorage.getItem(name)
  try {
    value = JSON.parse(value)
    return value
  } catch (e) {
    // console.log(e)
    return value
  }
}

/**
 * 删除sessionStorage
 */
const removeSession = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
// 获取URL后面参数
const GetQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
//获取host
const getHost = function() {
  var _http = window.location.protocol
  var _hostname = window.location.hostname
  var _port = window.location.port
  var _pathname = window.location.pathname
  var http = ""
  if (_port) {
    return http = _http + "//" + _hostname + ":" + _port + "/"
  }
  return http = _http + "//" + _hostname + "/"
}
//rem转换px
const rem2px = function(rem) {
  var clientWidth = document.documentElement.clientWidth
  if (clientWidth) {
    return clientWidth / 750 * 100 * rem
  } else {
    return rem
  }
}
// 生成随机id
const createRandomId = function() {
  return (Math.random() * 10000000).toString(16).substr(0, 4) + "-" + (new Date()).getTime() + "-" + Math.random().toString().substr(2, 5)
}
//比较2个对象是否相等
const isEqual = function(x, y) {
  // If both x and y are null or undefined and exactly the same 
  if (x === y) {
    return true
  }

  // If they are not strictly equal, they both need to be Objects 
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false
  }

  //They must have the exact same prototype chain,the closest we can do is
  //test the constructor. 
  if (x.constructor !== y.constructor) {
    return false
  }

  for (var p in x) {
    //Inherited properties were tested using x.constructor === y.constructor
    if (x.hasOwnProperty(p)) {
      // Allows comparing x[ p ] and y[ p ] when set to undefined 
      if (!y.hasOwnProperty(p)) {
        return false
      }

      // If they have the same strict value or identity then they are equal 
      if (x[p] === y[p]) {
        continue
      }

      // Numbers, Strings, Functions, Booleans must be strictly equal 
      if (typeof(x[p]) !== "object") {
        return false
      }

      // Objects and Arrays must be tested recursively 
      if (x[p]!==y[p]) {
        return false
      }
    }
  }

  for (p in y) {
    // allows x[ p ] to be set to undefined 
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false
    }
  }
  return true
}


/**
 * 获取style样式
 */
const getStyle = (element, attr, NumberMode = "int") => {
  let target
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === "scrollTop") {
    target = element.scrollTop
  } else if (element.currentStyle) {
    target = element.currentStyle[attr]
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr]
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == "float" ? parseFloat(target) : parseInt(target)
}
// 获取滚动dom infiniteScroll里使用
const getScrollview = function(el) {
  let currentNode = el
  while (currentNode && currentNode.tagName !== "HTML" && currentNode.tagName !== "BODY" && currentNode.nodeType === 1) {
    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
    if (overflowY === "scroll" || overflowY === "auto") {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

/* istanbul ignore next */
const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

const hasClass = function(elem, cls) {
  cls = cls || ""
  if (cls.replace(/\s/g, "").length == 0) return false
  return new RegExp(" " + cls + " ").test(" " + elem.className + " ")
}

const addClass = function(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == "" ? cls : ele.className + " " + cls
  }
}

const removeClass = function(ele, cls) {
  if (hasClass(ele, cls)) {
    let newClass = " " + ele.className.replace(/[\t\r\n]/g, "") + " "
    while (newClass.indexOf(" " + cls + " ") >= 0) {
      newClass = newClass.replace(" " + cls + " ", " ")
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, "")
  }
}
//加载文件
let loadFile = function(link,id) {
  return new Promise((resolve, reject) => {  
    var head = document.getElementsByTagName("head")[0]
    var load = null
    if(id && document.getElementById(id)){
      load =  document.getElementById(id)
      // if (/\.js$/.test(link)) {
      //   load.src = link
      // }else 
      if (/\.css$/.test(link)) {
        load.href = link
      }else{
        load.src = link
      }
    }else{if (/\.css$/.test(link)) {
        load = document.createElement("link")
        load.type = "text/css"
        load.rel = "stylesheet"
        load.href = link
      }else { //(/\.js$/.test(link))
        load = document.createElement("script")
        load.type ="text/javascript"
        load.src = link
      }
      // load.id = id
      head.appendChild(load)  
    }
    if (!/*@cc_on!@*/0) { //if not IE
      //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
      load.onload = function () {
        hasLoad.push(link)
        resolve(link,"加载完成")
        console.log(link,"加载完成")
      }
    } else {
      //IE6、IE7 support js.onreadystatechange
      load.onreadystatechange = function () {
        hasLoad.push(link)
        resolve(link,"加载完成")
        console.log(link,"加载完成")
      }
    } 
  })
}
let hasLoad = []
//动态插入js.css到html
let getload = function (link) {
  for (var i = 0; i < hasLoad.length; i++) {
    if (!link||hasLoad[i] == link) {
      return new Promise((resolve, reject) => { 
        resolve("已加载")
      })
    } 
  }
  return loadFile(link)
}
//动态插入js.css到html
const loadSource = function (link) { 
  let getArr = []
   
  if (typeof link == "string") {
    getArr.push(getload(link))
  }else if (typeof link == "object") {
    link.forEach((obj) => {
      getArr.push(getload(obj))
    })
  }

  return Promise.all(getArr)
}
// loadSource(['https://cdn.bootcss.com/element-ui/1.4.0/locale/zh-CN.js','https://cdn.bootcss.com/element-ui/1.4.0/theme-default/index.css']).then(()=>{
//       console.log(23123)
//     })

//  插入样式字符串到文档中
const insertStyle = function(str) {
  var nod = document.createElement("style")
  nod.type="text/css";
  if(nod.styleSheet){         //ie下
  nod.styleSheet.cssText = str;
  } else {
  nod.innerHTML = str;       //或者写成 nod.appendChild(document.createTextNode(str))
  }
  document.getElementsByTagName("head")[0].appendChild(nod);

}
// 复制对象，深拷贝
const copyObj = function(obj){
  return JSON.parse(JSON.stringify(obj))
}

//业务相关公共方法
const setPower = function (power, router, all, path) {
  let hasPower = true
  let allPath = "/" + (path.replace(/(^\/*)|(\/*$)/g, "") + "/" + router.path.replace(/(^\/*)|(\/*$)/g, "")).replace(/(^\/*)|(\/*$)/g, "")
  if (allPath != "/") {
    allPath = allPath + "/"
  }
  if (!all) {
    if (power.hasOwnProperty(allPath + "*")) {
      setPower(power, router, true, path)
      return
    } else if (power.hasOwnProperty(allPath + "")) {
      hasPower = true
      all = false
    } else {
      hasPower = false
      all = false
    }
  }

  if (router.meta) {
    router.meta.hasPower = hasPower
  } else {
    router.meta = { hasPower: hasPower }
  }
  if (router.children && router.children.length > 0) {
    router.children.forEach(route => {
      setPower(power, route, all, allPath)
    })
  }
}
//加载用户权限到router中
const getPower = function (router,fn) {
  let routerInfo = null
  for (var i = 0; i < router.options.routes.length; i++) {
    if (router.options.routes[i].path == "/") {
      routerInfo = router.options.routes[i]
      break
    }
  }
  if (process == true) {
    setPower({"/*":{}}, routerInfo, false, "")
    typeof fn == "function" && fn()
  } else{
    Vue.$http.post("power").then(res => {
      setPower(res, routerInfo, false, "")
      typeof fn == "function" && fn()
    })
  }
}
//主题色 在themes中加的style要放入该变量
const themes = {
  "default": {
    "main": "#324057",
    "active": "#ffd04b"
  },
  "blue": {
    "main": "#6565eb",
    "active": "#013468"
  },
  "yellow": {
    "main": "#c9f846",
    "active": "#596801"
  },
}
//element默认主题
const eleTheme = {
  "main": "#409EFF",
  "active": "#66b1ff"
}
let oldCluster = eleTheme
let newCluster = null
//后台返回的css内容
let chalk = null
//通过URL获取css样式内容
const getCSSString = function(callback) {
  let url = document.getElementById('element-link').href
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      chalk = xhr.responseText.replace(/@font-face{[^}]+}/, '')
      callback()
    }
  }
  xhr.open('GET', url)
  xhr.send()
}


// 更新css内容
const updateStyle = function() {
  let newStyle = chalk
  for (const key in oldCluster) {
    if (oldCluster.hasOwnProperty(key) && newCluster.hasOwnProperty(key)) {
      newStyle = newStyle.replace(new RegExp(oldCluster[key], 'ig'), newCluster[key]) 
    }
  }
  let styleTag = document.getElementById('element-style')
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.setAttribute('id', 'element-style')
    document.head.appendChild(styleTag)
  }
  styleTag.innerText = newStyle
  chalk = newStyle
  oldCluster = Object.assign({},newCluster)
}

//改变element主题
const changeEle = function(theme) {
  newCluster = themes[theme]
  if (!chalk) {
    getCSSString(updateStyle)
  } else {
    updateStyle()
  }
}
//加载默认主题element颜色
// if(!getStore("theme")){
//   changeEle("default")
// }

//改变主题
const changeTheme = function(theme) {
  if(typeof themeURL  == "undefined"){
    return
  }
  // themeURL 打包后，通过build/themeExtract加入到HTML中的全局变量
  loadFile(themeURL["themes-"+theme],"themeCss").then(()=>{
    setStore("theme",theme)
    changeEle(theme)
    Vue.$bus.$emit("changeTheme",theme)
  })
}
export { setStore, getStore, removeStore, getSession, setSession, removeSession, GetQueryString, getHost, rem2px, createRandomId, isEqual,
  getStyle, getScrollview, addClass, removeClass, once, loadSource, getPower, changeTheme, themes, insertStyle, copyObj}
