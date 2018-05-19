/*
全站路由处理
order by qinhaozhi Data:20170915
(Remember to write down each change)
*/
import Vue from 'vue'
import Router from 'vue-router'


// const appTest = () => import('@/page/appTest.vue') // appTest
const notFound = () => import('@/page/notFound/notFound') // 404页面
const main = () => import('@/page/main/menu') // 404页面
const form = () => import('@/page/main/form') // 404页面

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
        path: '',
        component: form,
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
