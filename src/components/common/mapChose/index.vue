<template>
  <div>
    
  </div>
</template>

<script>
import {loadSource} from "@/utils"
//import component from "@/"
export default {
  name: "map-chose",
  components: {},
  props: {},
  data () {
    return {
    }
  },

  created() {
    loadSource("https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js").then(()=>{
      
    })
  },

  mounted() {},

  methods: {},

  computed: {},
  activated() {},
}
</script>

<style lang='scss' scoped>
  
</style>