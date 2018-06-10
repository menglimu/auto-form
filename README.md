# h5

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# 测试环境打包 
npm run test

# build for production and view the bundle analyzer report
npm run build --report
```
  
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## TODO
- [x] 单个组件过大，使用异步组件优化 export default () => import('@/page/notFound/notFound')
- [x] rem适应pc布局，字体
- [x] 根据router动态生成导航菜单(待测试存在子路径的情况)
- [x] 代理接口，测试环境配置
- [x] mock
- [x] webpack图片压缩插件
- [ ] Form复杂输入,表单隐藏后，删除value
- [x] cnd按需引入
- [ ] 权限控制
- [ ] 主题颜色改变
- [ ] keep-alive保存用户输入
- [ ] header公共引入，非父子组件交互，控制返回
- [ ] router.js过长，router放在每个目录下面，在在router.js中拼装
