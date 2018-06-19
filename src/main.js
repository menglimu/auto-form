// //解决兼容性
// import Es6Promise from 'es6-promise'
// Es6Promise.polyfill()

import Vue from "vue"
import App from "./App"
import router from "./router"

import https from "@/api/" //所有的请求地址管理

//使用mock，打包，联调注释
require("@/api/mock")
//引入默认主题，因为使用文件方式，文件在打包后生产，开发环境中引入默认主题，打包注释
require("@/style/themes/default.scss")


//全局事件bus
Vue.$bus = Vue.prototype.$bus = new Vue()
//使用rem
require("@/utils/rem")
//加载权限、主题方法
import {getPower,changeTheme,getStore} from "@/utils"

//添加路由拦截器
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    if (!getStore("token")) {
      router.push("/login")
    } else {
      if (typeof to.meta.hasPower == "undefined") {
        window.location.reload()
      } else if (!to.meta.hasPower) {
        next({ path: "/error/401", replace: true })
      } else {
        next()
      }
    }
  } else {
    next()
  }
  let thisPageTitle = to.meta.title ? to.meta.title : ''
  document.title = thisPageTitle
})

//加载主题文件
changeTheme(getStore("theme")||"default")

/* eslint-disable no-new */
// new Vue({
//   el: "#app",
//   router,
//   render: h => h(App)
// })

//后台获取权限，然后加载初始
getPower(router, () => {
  new Vue({
    el: "#app",
    router,
    render: h => h(App)
  })
  if (!getStore("token")) {
    router.push("/login")
  }
})

