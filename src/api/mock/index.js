// 使用 Mock
var Mock = require("mockjs")

let data = {
  "msg": {
    a:1
  },
  "power": function (params) {
    if (JSON.parse(params.body).token == "admin") {
      return {"/*":{}}
    }else{
      return {
        "/":{},
        "/test/":{},
        "/test/form/":{},
        // '/test/echarts/':{},
      }
    }
  },
  // {
  //   // "/*":{},
  //   // '/test/*':{},
  //   // "/test/form/":{},
  //   // '/test/echarts/':{},
  //   "/":{},
  //   "/test/":{},
  //   "/test/form/":{},
  //   // '/test/echarts/':{},
  // },
  "login": function (params) {
    return {token: JSON.parse(params.body).name}
  }
}

for (key in data) { 
  Mock.mock("/api/"+key,data[key])
}

// var data = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// })