// index 使用formdata提交数据
// index1 使用json提交数据

import axios from 'axios'
import Vue from 'vue';
import Qs from 'qs'
// import mscommon from '@/global/msUtils'
// axios({
//   headers: {
//     "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
//   },
  
// })
let http = axios.create({
  baseURL: process.env.API_ROOT+"/",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    // 'Content-Type':'application/x-www-form-urlencoded',
  },
  withCredentials: false,
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  /**
   * TOKEN 注入
   *
   * 此处直接在 query (GET方法) 或者 form-data (POST PUT DELETE 等方法) 注入session 参数
   * ！实际情况请根据前后端的API规范进行定义
   */
  // Vue.laodMask.show()
  console.log(config);
  // config.headers.common['x-access-token'] = getSession('openId')
  // config.headers.common['channel'] = 'wechat'
  
  return config
}, (error) => {
  // Vue.laodMask.hide()
  console.log(error);
  return Promise.reject(error)
})

http.interceptors.response.use(res => {

  /**
   * 响应状态判断
   *
   * 通过 state 进行服务状态的判断
   * 通过 error_message 提取后端提供的错误信息
   * ！实际情况请根据前后端的API规范进行定义
   */
  // Vue.laodMask.hide()
  
  let data = res.data

  return data
}, error => {
  // Vue.laodMask.hide()
  //错误处理
  if (error.response) {
    if (error.response.status == 401) {
      Vue.messageBox.alert('您无权进行该操作');
    }else{
      Vue.messageBox.alert('网络超时');
    }
  } else {
    Vue.messageBox.alert('网络超时');
  }
  return Promise.reject(error)
});

let getParms = function (params) {

  params = Object.assign({
    wap: true,
    // os: mscommon.getSession("os") || 'wap',
    // msydChannel: 1,
    // msydSubChannel: mscommon.getSession("msydSubChannel")|| 113,
    // msydEquipment: 4,
    // sourceId: mscommon.getSession('sourceId') || "",
  },params)

  return Qs.stringify(params)
}

const API = {
  //config.noCommon 不使用公共头部设置url及其他
  get (url,params={},config={}) {
    params = getParms(params)
    if (config.noCommon === false) {
      return axios.get(url,{params});
    }
    return http.get(url,{params});
  },
  post (url,params={},config={}) {
    params = getParms(params)
    if (config.noCommon === false) {
      return axios.post(url,params);
    }
    return http.post(url,params);
  },
  //并发 $http.all([getUserAccount(), getUserPermissions()])
  all (all){
    if (config.noCommon === false) {
      return axios.all(all);
    }
    return http.post(all);
  },
  // allEnd (){
  //   return http.spread
  // }
}
Vue.prototype.$http = API
// Vue.$http = API
// export default {
//   install () {
//     Vue.prototype.$http = http
//     Vue.http = http
//   }
// }