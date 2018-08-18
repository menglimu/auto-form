<template>
  <div class="map"></div>
</template>

<script>
import {loadSource} from "@/utils"
export default {
  name: "map",
  components: {},
  props: {},
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    
    loadSource("http://api.map.baidu.com/getscript?v=2.0&ak=l4aUB0y5tI5bFfGbZUScijxkR26mMzI1&services=&t=20180629105709").then(()=>{
      // 基于准备好的dom，初始化echarts实例
      this.map = new BMap.Map(this.$el);
      var point = new BMap.Point(104.06792346,30.67994285);
      this.map.centerAndZoom(point, 12);
	    this.map.enableScrollWheelZoom(true);
    })
    let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize"
  },
  created() {
    // window.addEventListener(resizeEvt, ()=>{
    //   this.echarts.resize()
    // }, false)
  },
  methods: {
    getAsync() {
      return new Promise((resolve, reject) => {
        let isAsync = () => {
          if (this.map) {
            resolve(this.map)
          }else{
            setTimeout(isAsync,10);
          }
        }
        isAsync()
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .map{
    width: 100%;
    height: 100%;
  }
</style>
