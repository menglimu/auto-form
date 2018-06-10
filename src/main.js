/*
IT is very important ,页面的相关公共配置
order by qinhaozhi Data:20170915
(Remember to write down each change)
*/

// //解决兼容性
// import Es6Promise from 'es6-promise'
// Es6Promise.polyfill()

//import Vue from 'vue'
import App from './App'
import router from './router'

// import https from './api/' //所有的请求地址管理

// import ElementUI from 'element-ui'
// // import './style/element-theme.scss'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

//使用mock
// require('@/api/mock')

require('@/utils/rem')


//添加路由拦截器
// router.beforeEach((to, from, next) => {
//   let thisPageTitle = to.meta.title ? to.meta.title : '';
//   document.title = thisPageTitle;
//   if (to.meta.login) { // 判断该路由是否需要登录权限
//     if (publicFunction.fun.getUserInfo().token) {
//       next();
//     } else {
//       //next();
//       publicFunction.fun.toLogin()
//     }
//   } else {
//     next();
//   }
// })




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // template: '<App/>',
  // components: {
  //   App
  // }
})
