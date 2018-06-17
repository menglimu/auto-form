/*
IT is very important ,页面的相关公共配置
order by qinhaozhi Data:20170915
(Remember to write down each change)
*/

// //解决兼容性
// import Es6Promise from 'es6-promise'
// Es6Promise.polyfill()

import Vue from "vue"
import App from "./App"
import router from "./router"

import https from "./api/" //所有的请求地址管理

// //使用mock
// require("@/api/mock")
//使用rem
require("@/utils/rem")
//加载权限、主题
import {getPower,changeTheme,getStore} from "./utils"



//添加路由拦截器
router.beforeEach((to, from, next) => {
  // let thisPageTitle = to.meta.title ? to.meta.title : '';
  // document.title = thisPageTitle;

  next()

  // if (typeof to.meta.hasPower == "undefined") {
  //   window.location.reload()
  // } else if (!to.meta.hasPower) {
  //   next({ path: "/error/401", replace: true })
  // } else {
  //   next()
  // }

  
  // if (to.meta.login) { // 判断该路由是否需要登录权限
  //   if (publicFunction.fun.getUserInfo().token) {
  //     next();
  //   } else {
  //     //next();
  //     publicFunction.fun.toLogin()
  //   }
  // } else {
  //   next();
  // }
})
//有主题时，加载主题文件
getStore("theme")&&changeTheme(getStore("theme"))

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
})

//后台获取权限，然后加载初始
// getPower(router, () => {
//   new Vue({
//     el: "#app",
//     router,
//     render: h => h(App)
//   })
// })

