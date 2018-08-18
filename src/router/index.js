/*
权限控制，通过修改meta来控制
全站路由处理
order by qinhaozhi Data:20170915
(Remember to write down each change)
*/
import Vue from 'vue'
import Router from 'vue-router'
import router from '@common/router'//根据noKeepAlive判断是否缓存

// const appTest = () => import('@/page/appTest.vue') // appTest
const notFound = () => import('@/page/notFound/notFound') // 404页面
const noPower = () => import('@/page/noPower/') // 401页面
const login = () => import('@/page/login/') // 登录

const index = () => import('@/page/index') // 菜单
const form = () => import('@/page/main/form') // 可配置form
const formTest = () => import('@/page/main/formTest') // 可配置form测试
const echarts = () => import('@/page/main/echarts') // cdn引入第三方示例
const main = () => import('@/page/main/main') // 首页
const role = () => import('@/page/main/set/role') // 角色管理
const power = () => import('@/page/main/set/power') // 权限管理


Vue.use(Router)

let routerInfo = [

  {
    path: '/',
    meta: {
      title: ""
    },
    component: index,
    children: [
      {
        path: '',
        component: main,
        name: '首页',
        meta: {
          icon: 'el-icon-menu',
          noKeepAlive: false, //不使用keepalive
          noShowMenu: false, //不显示在菜单中
          hasPower: true, //是否有权限
          // index: '/test/form', 激活的菜单
        },
      },
      {
        path: 'test',
        component: router,
        name: '测试',
        meta: {
          icon: 'el-icon-edit',
          hasPower: true, //是否有权限
          noKeepAlive: false, //不使用keepalive
        },
        children: [
          {
            path: 'echarts',
            component: echarts,
            name: '图表CDN引入',
            meta: {
              icon: 'el-icon-edit',
              hasPower: true, //是否有权限
              noKeepAlive: true, //不使用keepalive
            }, 
            children: [
              {
                path: 'echarts',
                component: echarts,
                name: '图表CDN引入',
                meta: {
                  icon: 'el-icon-edit',
                  hasPower: true, //是否有权限
                  noKeepAlive: true, //不使用keepalive
                },
              }
            ]
          }, {
            path: 'form',
            component: form,
            name: '动态生成表单',
            meta: {
              hasPower: true, //是否有权限
              noKeepAlive: false, //不使用keepalive
            }
          }, {
            path: 'formTest',
            component: formTest,
            name: '动态生成表单测试',
            meta: {
              hasPower: true, //是否有权限
              noKeepAlive: true, //不使用keepalive
            }
          }
        ]
      },
      {
        path: 'set',
        component: router,
        name: '设置',
        meta: {
          icon: 'el-icon-edit',
          hasPower: true, //是否有权限
          noKeepAlive: false, //不使用keepalive
        },
        children: [
          {
            path: 'power',
            component: power,
            name: '权限管理',
            meta: {
              hasPower: true, //是否有权限
              noKeepAlive: false, //不使用keepalive
            }
          }, {
            path: 'role',
            component: role,
            name: '角色管理',
            meta: {
              hasPower: true, //是否有权限
              noKeepAlive: true, //不使用keepalive
            }
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    meta: {
      title: "",
      noKeepAlive: true,
      noShowMenu: true,
      hasPower: true,
    },
    component: login
  },
  {
    path: '/error/401',
    meta: {
      title: "",
      noKeepAlive: true,
      noShowMenu: true,
      hasPower: true,
    },
    component: noPower
  },
  {
    path: '*',
    meta: {
      title: "",
      noKeepAlive: true,
      noShowMenu: true,
      hasPower: true,
    },
    component: notFound
  },
  
]
// setTimeout(()=>{
//   staticRouter.addRoutes(routerInfo)
// },5000)
// export {routerInfo}
export default new Router({
  mode: 'history',
  base: process.env.URL_BASE,
  routes: routerInfo

})
