<style lang="scss" scoped>
  @import '../../css/mixin.scss';
  .mschose-box{
    padding-bottom: 0.1rem;
    .mschose-item{
      display: inline-block;
      min-width: 1rem;
      height: 0.6rem;
      background-color: #ffffff;
      border-radius: 0.1rem;
      border: solid 0.01rem #cdcdcd;
      text-align: center;
      font-size: 0.24rem;
      color: #999;
      line-height: 0.6rem;
      margin-top: 0.1rem;
      margin-left: 0.1rem;
      padding: 0 0.2rem;
      &.togss{
        border: solid 0.01rem #4986f0;
        position: relative;
        &:after{
          position: absolute;
          bottom: 0;
          right: 0;
          display: block;
          content: '';
          width: 0.37rem;
          height: 0.31rem;
          background-image: url("./images/gou.png");
          background-size: 100% 100%;
        }
      }
    }
  }
  
</style>
<template>
  <div class="mschose-box">
    <div class="mschose-item" v-for="(item,index) in data" @click="chooses(index+1)"  v-bind:class="{'togss':selectClass==index+1}" :key="item">{{item}}</div>
  </div>
</template>
<script>
// import msvideo from '@/components/video/video'
export default {
  components: {

  },

  data() {
    return {
      infos:"",
      selectClass:"",
    }
  },
  props:{
    data:{
      type: null,
      default: [],
      
    },
   myMessage:{
     ins:""
   }
  },

  created() {

  },

  mounted() {
     this.chooses(this.myMessage);
    // console.log(this.myMessage)

  },

  computed: {
    

  },

  methods: {
    changeRouter() {
        
    },
    setIconDefault (){

    },
    chooses(indexs){
      this.infos = indexs;
      //  console.log(indexs)
      this.$emit('input', this.infos);
      this.selectClass = indexs;
      // console.log(this.selectClass)
    },
    
    
  },
  watch:{
      $route(){

      },
      // active(){
          
      // },
  }
}

</script>
