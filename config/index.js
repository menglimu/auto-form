// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var urlBase = require('./prod.env').URL_BASE
var dev = require('./dev.env')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../'+urlBase.substring(1,(urlBase.length-1))+'index.html'), //打包生成的路径 ../与src同级
    assetsRoot: path.resolve(__dirname, '../'+urlBase.substring(1,(urlBase.length-1))),   //打包生成的路径
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'+urlBase.substring(1,(urlBase.length-1)),// ./    线上部署的目录地址、www.baidu.com/h5 相对路径css图片资源、要出错
    productionSourceMap: false,//是否生成map文件
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: dev.PORT,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api': {
            target: dev.API_URL,
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
