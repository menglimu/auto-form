<template>
  <div :id="id" class="echarts"></div>
</template>

<script>
import {loadSource, createRandomId} from "@/utils"
export default {
  name: "echarts",
  components: {},
  data() {
    return {
      id: createRandomId(),
      echarts: null,
    }
  },
  created() {
    loadSource("https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js").then(()=>{
      // 基于准备好的dom，初始化echarts实例
      this.echarts = echarts.init(document.getElementById(this.id))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data:["销量"]
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.echarts.setOption(option)
    })
    let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize"
    window.addEventListener(resizeEvt, ()=>{
      this.echarts.resize()
    }, false)
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
  .echarts{
    width: 100%;
    height: 100%;
  }
</style>
