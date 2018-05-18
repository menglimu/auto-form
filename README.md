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

TODO: 单个组件过大，使用异步组件优化
export default () => import('@/page/notFound/notFound')

<!-- TODO: dll优化库文件 -->

<!-- TODO: router.js过长，router放在每个目录下面，在在router.js中拼装 -->

TODO: header公共引入，非父子组件交互，控制返回

<!-- TODO: mock模拟数据 -->