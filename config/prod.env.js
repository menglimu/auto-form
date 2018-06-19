var merge = require("webpack-merge")
var testEnv = require("./test.env")

var config = {
  NODE_ENV: '"production"',
  API_ROOT: '"/api/"',
  IMG_BASE: '""',
  URL_BASE: '"/auto-form/"',
  URL_FINGER: '"df.baiqishi.com"',
}
if (process.argv.splice(2)[0] == "test") {
  config = merge(config, testEnv)
}

module.exports = config
