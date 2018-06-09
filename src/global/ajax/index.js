import axios from 'axios'
import config from './config'
//import Vue from 'vue';
axios(config);

const API = {
  //获取已授权列表
  get(url, param) {
    var config1 = {
      baseURL: process.env.API_ROOT + "/",
      timeout: 5000,
      // headers: {
      //     'x-access-token' : 'VSmFRhtbI7OxPN5BzIWj3V0ZvRkL/MtUmxxH+IFg9Y4='
      //     // 'sessionId':  Lockr.get("sessionId"),
      //     // 'authKey': Lockr.get("authKey"),
      // }
    }
    console.log(config1.baseURL);
    return axios.get(url, param, config1);
  },
  //添加授权
  post(url, param) {
    return axios.post(url, param, config);
  },
  reqSuccess(obj, msg) {
    obj.$message({
      message: msg,
      type: 'success'
    });
  },
  reqFail(obj, msg) {
    obj.$message({
      message: msg,
      type: 'success'
    });
  }
}
//添加一个请求拦截器
axios.interceptors.request.use(function(config) {
  //在请求发出之前进行一些操作
  //显示遮罩
  Vue.laodMask.show()
  return config;
}, function(err) {
  //Do something with request error
  // 隐藏遮罩
  Vue.laodMask.hide()
  return Promise.reject(error);
});
//添加一个响应拦截器
axios.interceptors.response.use(function(res) {
  //在这里对返回的数据进行处理
  // 隐藏遮罩
  Vue.laodMask.hide()
  if (res.data.ec == 'M00003') {
    // API.post('recordUrl',{
    //     url: window.location.href
    // }).then((data)=>{
    //     if (data.ec == 'M00000') {
    //         // window.location.href = "/index.php?s=/addon/Shop/WapApi/index/shop_id/1/publicid/4/"
    //     }else{
    //         alert(data.em)
    //     }
    // })
    // window.location.href = "http://www.jiayilian.net/index.php?s=/addon/Shop/WapApi/index/shop_id/1/publicid/4/"

  } else {
    return res.data;
  }

}, function(err) {
  // 隐藏遮罩
  Vue.laodMask.hide()
  //Do something with response error
  return Promise.reject(error);
})

Vue.$http = Vue.prototype.$http = API

// export default API;
