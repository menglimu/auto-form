<style lang="scss" scoped>
</style>
<template>
    <echarts ref="echarts"></echarts>
</template>
<script>
import echarts from '@common/echarts'
export default {
  components: {
    echarts
  },

  data() {
    return {

    }
  },

  created() {

  },

  mounted() {
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
    this.$refs.echarts.setOption(option)
    // setTimeout(() => {
    //   // 使用刚指定的配置项和数据显示图表。
    //   this.$refs.echarts.echarts.setOption(option)
    // }, 10);
    
  },

  computed: {

  },

  methods: {

  },
}

</script>