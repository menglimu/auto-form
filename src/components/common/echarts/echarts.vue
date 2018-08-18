<template>
  <div class="echarts"></div>
</template>

<script>
import {loadSource} from "@/utils"
export default {
  name: "echarts",
  components: {},
  data() {
    return {
      echarts: null,
    }
  },
  mounted() {
    loadSource("https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js").then(()=>{
      // 基于准备好的dom，初始化echarts实例
      this.echarts = echarts.init(this.$el)
    })
    let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize"
    window.addEventListener(resizeEvt, ()=>{
      this.echarts.resize()
    }, false)
  },
  methods: {
    getAsync() {
      return new Promise((resolve, reject) => {
        let isAsync = () => {
          if (this.echarts) {
            resolve(this.echarts)
          }else{
            setTimeout(isAsync,10);
          }
        }
        isAsync()
      })
    },
    setOption(option) {
      this.getAsync().then((echarts) => {
        this.echarts.setOption(option)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .echarts{
    width: 100%;
    height: 100%;
  }
</style>
