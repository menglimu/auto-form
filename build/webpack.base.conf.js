var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals:{
    'vue': 'Vue',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@component': resolve('src/components'),//组件目录
      '@assets': resolve('src/assets'),
      '@scss': resolve('src/style/scss'),//css目录

      // 路径别名使用方式
      // alias: {
      //  'src': path.resolve(__dirname, '../src'),
      //  'assets': path.resolve(__dirname, '../src/assets'),
      //  'components': path.resolve(__dirname, '../src/components')
      // }
      // <template>
      //  <img src="~assets/images/logo.jpg" />
      // </template>
      // <script>
      // import 'assets/css/style.css'
      // </script>
      // <style>
      // .logo {
      //  background: url(~asset/images/bg.jpg)
      // }
      // </style>
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]') , // //'[name].[ext]'
          // publicPath:"./",  //替换CSS引用的图片路径 可以替换成爱拍云上的路径  ./ 
          // outputPath:"static/css/"  //
        }
      }
    ]
  }
}
