/*
全站路由处理
order by qinhaozhi Data:20170915
(Remember to write down each change)
*/
//import Vue from 'vue'
import Router from 'vue-router'


// const appTest = () => import('@/page/appTest.vue') // appTest
const notFound = () => import('@/page/notFound/notFound') // 404页面
const main = () => import('@/page/main/menu') // 菜单
const form = () => import('@/page/main/form') // 可配置form
const echarts = () => import('@/page/main/echarts') // cdn引入第三方示例

Vue.use(Router)

// console.log(process.env)

export default new Router({
  mode: 'history',
  // base: '/' + process.env.URL_BASE,
  routes: [
    // {
    //   path: '/CZD',
    //   meta: {
    //     title: ""
    //   },
    //   component: CZDindex,
    // },
    {
      path: '/main',
      meta: {
        title: ""
      },
      component: main,
      children: [{
        path: 'echarts',
        component: echarts,
        meta: [],
      },{
        path: 'form',
        component: form,
        meta: [],
      }]
    },
    // {
    //   path: '/form',
    //   component: form,
    //   meta: [],
    // },
    {
      path: '*',
      meta: {
        title: "",
      },
      component: notFound
    },
    {
      path: '/form',
      component: form,
      meta: [],
    }
  ]

})
