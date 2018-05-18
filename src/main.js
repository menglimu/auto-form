/*
IT is very important ,页面的相关公共配置
order by qinhaozhi Data:20170915
(Remember to write down each change)
*/

//解决兼容性
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

import Vue from 'vue'
import App from './App'
import router from './router'

// import https from './api/https.js' //所有的请求地址管理
import rem from './utils/rem.js' //rem移动端适配
import baidu from './utils/baidu.js' //百度统计
// import filter from './utils/filter.js' //公共的过滤器
// import validate from './utils/validate.js' //公共的过滤器
// import wxFun from './utils/wxFun.js' //公共微信方法
// import publicFunction from './utils/public.js' //公共的处理函数
// import directive from './utils/directive.js' //自定义指令
// import bridge from './utils/jsNativeBridgeAdaptor.js' //jsbridge

import ElementUI from 'element-ui'
import './style/element-theme.scss'
// import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)


//通过js引入字体图标，以免font文件位置错误
require('./style/fonts/ionicicon.css');

//添加路由拦截器
router.beforeEach((to, from, next) => {
  let thisPageTitle = to.meta.title ? to.meta.title : '';
  document.title = thisPageTitle;
  if (to.meta.login) { // 判断该路由是否需要登录权限
    if (publicFunction.fun.getUserInfo().token) {
      next();
    } else {
      //next();
      publicFunction.fun.toLogin()
    }
  } else {
    next();
  }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
