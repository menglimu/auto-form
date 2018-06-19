var merge = require("webpack-merge")
var prodEnv = require("./prod.env")

if (process.argv.splice(2)[0] == "mock") {
  console.log("mock123")
  //使用mock
  require("./../src/api/mock/index.js")
}
 
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/api/"',
  IMG_BASE: '""',
  URL_BASE: '"/auto-form/"',
  // URL_BASE: '"/"', //没有的时候用/
  URL_FINGER: '"dfst.baiqishi.com"',

  //index中使用的变量，不通过process.env.来引用，不加引号 
  API_URL: "http://172.30.10.70:8806", //后台接口地址
  PORT: "2333", //本地打开窗口
})
