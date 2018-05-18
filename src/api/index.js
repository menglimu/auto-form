/*
前端和服务端的请求交互
order by qinhaozhi Data:20170915
(Remember to write down each change)
*/
import Qs from 'qs'     //引入Qs， https://www.npmjs.com/package/qs
import pubFun from '../utils/public.js'
import Mint from 'mint-ui'

var $pubF = pubFun.fun

// 配置API接口地址
//var root = '/api/'    //本地开发，统一的服务请求接口前需加标志，区分出来URL路由请求
var root = process.env.API_ROOT
// 引用axios
var axios = require('axios')

/*
  接口处理函数
*/
function apiAxios (method, url, params, success, failure) {

  //参数过滤
  if (params) {
    params = filterNull(params)
  }else{
    params = {}
  }
  if(!params.isNotShowLoading){
    Mint.Indicator.open({
  	  text: '加载中...',
  	  spinnerType: 'double-bounce'
    });
  }

  //服务端请求公共参数，例如  params.a = 1;
  params.os = $pubF.getUrlParam("os") || $pubF.getUserInfo().os || "wap"
  params.wap = true
  params.msydChannel = 1
  params.readSource = "xiao_dai"
  params.msydSubChannel = $pubF.getSession("subChannel") || params.subChannel || 144
  params.msydEquipment = params.msydEquipment || 4;
  params.token = $pubF.getUserInfo().token
  params.sourceId = $pubF.getUserInfo().sourceId
  //设备指纹参数
  params.BQStokenKey = $pubF.getDeviceFingerprint().tokenKey
  params.partnerId = $pubF.getDeviceFingerprint().partnerId
  params.afSwiftNumber = "msydxdh5"
  params.requestSource = 'H5'//h5公共参数
  if($pubF.getProperty("latitude")){
    params.latitude = $pubF.getProperty("latitude")
  }
  if($pubF.getProperty("longitude")){
    params.longitude = $pubF.getProperty("longitude")
  }

  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ?  Qs.stringify(params) : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root
  })
  .then(function (res) {
    if(!params.isNotHideLoading){
      Mint.Indicator.close();
    }
    if(res.data.ec == "M00003" && !params.notToLogin){
      $pubF.toLogin()
    }else if(res.data.ec == "M00012"){
      Mint.MessageBox({
        title: '温馨提示',
        message: res.data.em,
        showCancelButton: false,
        confirmButtonText: "确定"
      })
      .then(action => {
        if (action == 'confirm') {
          $pubF.toLogin()
        }
      });
    }else{
      if(success){
        success(res.data)
      }
    }
  })
  .catch((err) => {
    Mint.Indicator.close();
  })

}

function canvasDataURL(path, obj, callback){
  var img = new Image();
  img.src = path;
  img.onload = function(){
      var that = this;
      // 默认按比例压缩
      var w = that.width,
          h = that.height,
          scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      var quality = 0.7;  // 默认图片质量为0.7
      //生成canvas
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      // 创建属性节点
      var anw = document.createAttribute("width");
      anw.nodeValue = w;
      var anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if(obj.quality && obj.quality <= 1 && obj.quality > 0){
          quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      var base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback(base64);
  }
}

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].replace(/\s/g,'')
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  fileUpload: function (url, params, success, failure) {
    return upload(url, params, success, failure)
  }
}
