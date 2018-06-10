/*
全站路由处理
order by qinhaozhi Data:20170915
(Remember to write down each change)
*/
//import Vue from 'vue'
import Router from 'vue-router'


// const appTest = () => import('@/page/appTest.vue') // appTest
const notFound = () => import('@/page/notFound/notFound') // 404页面
const router = () => import('@view/router') // router

const menu = () => import('@/page/menu') // 菜单
const form = () => import('@/page/main/form') // 可配置form
const echarts = () => import('@/page/main/echarts') // cdn引入第三方示例

Vue.use(Router)

let routerInfo = [
  {
    path: '',
    component: echarts,
    name: '首页',
    meta:{
      icon: 'el-icon-edit',
    },
  },
  {
    path: 'test',
    component: router,
    name: '测试',
    meta:{
      icon: 'el-icon-edit',
    },
    children: [
      {
        path: 'echarts',
        component: echarts,
        name: '图表CDN引入',
      },{
        path: 'form',
        component: form,
        name: '动态生成表单',
      }
    ]
  },
]
export {routerInfo}
export default new Router({
  mode: 'history',
  // base: '/' + process.env.URL_BASE,
  routes: [
    {
      path: '/',
      meta: {
        title: ""
      },
      component: menu,
      children: routerInfo
    },
    {
      path: '*',
      meta: {
        title: "",
      },
      component: notFound
    },
  ]

})
