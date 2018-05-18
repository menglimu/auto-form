// this.messageBox.alert(123,{
//   title: 弹窗头部名称
// }).then(()=>{
  
// },()=>{
  
// })


import Vue from 'vue';
// import Promise from './../Promise';
const  messageConstructor = Vue.extend(require('./messageBox.vue'));
const messageBox = {}

function createMessage(config) {
 	let  message = new messageConstructor({
    el: document.createElement('div'),
  });
  //设置默认值，config中有重复的，将被替换，浅拷贝
  message.config = Object.assign({
    title : "消息提示"
  },config)
  //放弃自己写的promise。使用es6中的
  // let promise = new Promise()
  // message.callback = (data,inputVal='')=>{
  // 	if (data) {
  // 		promise.resolve(inputVal)
  // 	} else {
  // 		promise.reject()
  // 	}
  //   //公共遮罩mask层删除
  // 	Vue.popMask.delete()
  // }
  let promise = new Promise(function(resolve, reject) {
    message.callback = (data,inputVal='')=>{
     if (data) {
      //异步执行成功
      resolve(inputVal)
     } else {
      //异步执行失败
      reject()
     }
      //公共遮罩mask层删除
      // Vue.popMask.delete()
    }
  });
  //公共遮罩mask层增加
  // Vue.popMask.push()
  document.body.appendChild(message.$el);
  return promise
} 

messageBox.alert = function (msg,config={}) {
	config.type = 'alert'
	config.msg = msg
	return createMessage(config)
}

messageBox.confirm = function (msg,config={}) {
	config.type = 'confirm'
	config.msg = msg
	return createMessage(config)
}

messageBox.prompt = function (msg,config={}) {
	config.type = 'prompt'
	config.msg = msg
	return createMessage(config)
}

Vue.messageBox = Vue.prototype.messageBox = messageBox
//https://wangdahoo.github.io/vonic/docs/#!/
//轮播 按钮 选项卡 vumscroll 侧边栏 底部弹出选项 加载中
//轮播 选项卡 3级联动 