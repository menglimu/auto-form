<style lang="scss" scoped>
  @import '../../css/mixin.scss';
  .page-bottom {
    z-index: 100;
    position: fixed;
    width: 7.5rem;
    height: 0.98rem;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: -0.17rem 0rem 0.49rem 0rem rgba(109, 138, 255, 0.1);
    display: flex;
    text-align: center;
    align-items:center;
    font-size: 0.24rem;
    color: #999999;
    .text{
      padding-top: 0.06rem;
    }
    
    .icon-box{
      flex: 1;
    }
    img {
      width: 0.48rem;
      height: 0.48rem;
      display: block;
      margin: 0 auto;
    }
    .chosed{
      color: #4985f4;
    }
  }
  .header-stance{
    height: 1rem;
  }
</style>
<template>
  <div class="bottom-box">
    <div class="page-bottom">
      <div class="icon-box" @click="go(item.url,index)" v-for="(item, index) in iconData" :class="[active == index ?'chosed':'']">
        <img :src="item.icon">
        <div class="text">{{item.text}}</div>
      </div>
    </div>
    <div class="header-stance"></div>
  </div>
</template>
<script>
// import msvideo from '@/components/video/video'
export default {
  components: {

  },

  data() {
    return {
      iconData:[
        {
          icon: '/static/images/forjs/news.png',
          text: '消息',
          url: '/news/',
        },
        {
          icon: '/static/images/forjs/main.png',
          text: '业务',
          url: '/main/',
        },
        {
          icon: '/static/images/forjs/mine.png',
          text: '我的',
          url: '/mine/',
        },
      ],
      active: 1,
    }
  },

  created() {

  },

  mounted() {
    this.changeRouter()
  },

  computed: {

  },

  methods: {
    go(url,index) {
      if (this.active == index) {
        return
      }
      this.$router.push(url)
    },
    changeRouter() {
        var path=this.$route.path;   
        if (path.indexOf('/news') == 0) {
          this.active = 0;
        }
        else if (path.indexOf('/main') == 0) {
          this.active = 1;
        }  
        else if (path.indexOf('/mine') == 0) {
          this.active = 2;
        }
        else{
          this.active = 1;
        }
        this.setIconDefault()
        if (this.active == 0) {
          this.iconData[0].icon = '/static/images/forjs/news-click.png'
        }else if(this.active == 1){
          this.iconData[1].icon ='/static/images/forjs/main-click.png'
        }else if(this.active == 2){
          this.iconData[2].icon ='/static/images/forjs/mine-click.png'
        }
    },
    setIconDefault (){
        this.iconData[0].icon = '/static/images/forjs/news.png'
        this.iconData[1].icon ='/static/images/forjs/main.png'
        this.iconData[2].icon ='/static/images/forjs/mine.png'
    },
  },
  watch:{
      $route(){
          // alert('msg');
          this.changeRouter()
      },
      // active(){
          
      // },
  }
}

</script>
