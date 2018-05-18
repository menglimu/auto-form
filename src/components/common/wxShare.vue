<style lang="scss" scoped>
    @import './../../css/mixin.scss';
    .wx-share{
        position: fixed;
        @include pos(0);
        background: rgba(0, 0, 0, 0.4);
        z-index: 999;
        img{
          width: 3.3rem;
          display: block;
          position: fixed;
          @include pos(0,0,auto,auto);
        }
    }  
  
</style>

<template>
    <div class="wx-share" v-show="value" @click="hide">
        <img src="static/images/wxshare.png">
    </div>

</template>

<script>
    import {getHost} from '@/global/msUtils'
    import wx from 'weixin-js-sdk'
// const wx = r => require.ensure([], () => r(require('weixin-js-sdk')), 'weixinjssdk')
// const wx = require('weixin-js-sdk')
 // require.ensure([], () => {
 //     const wx =  require("weixin-js-sdk");
 //  }, err => {
 //      console.error("We failed to load chunk: " + err);
 //  }, "wxshare");
  // const wx = resolve => require(['weixin-js-sdk'], resolve)
    
    export default {
        components: { 
            

        },
    
        props:{
            // shareData:null,
            value:{
                default : false
            }
        },

        data(){
            return{
                // show: true,
                shareData:{
                    title: '新鲜水果凑不停。好友凑单乐翻天',
                    content: '快来家易连一起凑单吧',
                    url: getHost()+'h5',
                    iconUrl: getHost()+'h5/static/images/logo.png',
                    success: function () {
                        
                    },
                    cancel: function () {
                        
                    },
                }
            }
        },
    
        created(){
          this.$http.post('getUserId',{}).then((data)=>{
              if (data.ec == 'M00000') {
                if(this.shareData.url.indexOf("?")!=-1) {
                  this.shareData.url +=("&share=" + data.cd.uid)
                }else{
                  this.shareData.url +=("?share=" + data.cd.uid)
                }
                  
                  this.shareConfig(this.shareData)
              }else{
                  this.messageBox.alert(data.em)
              }
          })
          this.$on('share', (shareData) => {
              this.shareConfig(shareData)
          }); 
          let param = {
            debug:false,
            jsApiList: ["showOptionMenu", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
          };
          this.$http.post('getShareConfig',{url: location.href}).then((data)=>{
                if (data.ec == 'M00000') {
                     wx.config({...data.cd,...param})
                }else{
                    this.messageBox.alert(data.em)
                }
           })
        },
    
        mounted(){
            
        },
    
        computed: {
    
        },
    
        methods: {
            gotoAddress(path){
               this.$router.push(path)
            },
            hide(){
              // this.show=false
              this.$emit('input', false)
            },
            shareConfig(shareData) {
                console.log(shareData)
                let _self = this
                wx.ready(function() {
                    _self.shareContent(shareData)
                });
            },
            shareContent(shareData) {
              console.log(shareData);
              wx.showOptionMenu();
              //分享到朋友圈
              wx.onMenuShareTimeline({
                  title: shareData.content,
                  //title: shareData.title,
                  link: shareData.url,
                  imgUrl: shareData.iconUrl,
                  success: shareData.success,
                  cancel: shareData.cancel
              });
              //分享给朋友
              wx.onMenuShareAppMessage({
                  title: shareData.title,
                  desc: shareData.content,
                  link: shareData.url,
                  imgUrl: shareData.iconUrl,
                  type: 'link',
                  success: shareData.success,
                  cancel: shareData.cancel
              });
              wx.onMenuShareQQ({
                  title: shareData.title,
                  desc: shareData.content,
                  link: shareData.url,
                  imgUrl: shareData.iconUrl,
                  success: shareData.success,
                  cancel: shareData.cancel
              });
              //分享到微博
              wx.onMenuShareWeibo({
                  title: shareData.title,
                  desc: shareData.content,
                  link: shareData.url,
                  imgUrl: shareData.iconUrl,
                  success: shareData.success,
                  cancel: shareData.cancel
              });
              //分享到QQ空间
              wx.onMenuShareQZone({
                  title: shareData.title,
                  desc: shareData.content,
                  link: shareData.url,
                  imgUrl: shareData.iconUrl,
                  success: shareData.success,
                  cancel: shareData.cancel
              });
            }
        },
    }
</script>

