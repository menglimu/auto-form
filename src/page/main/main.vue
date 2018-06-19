<template>
  <div class="">
    <el-select v-model="value" placeholder="请选择" @change="change">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
    <div class="bg">背景主题</div>
    <div class="color">颜色主题</div>
    <el-button  type="primary">element主题</el-button>
  </div>
</template>
<script>
import {changeTheme} from "@/utils" // router
export default {
  components: {},
  data() {
    return {
      options: [{
        value: "default",
        label: "默认"
      }, {
        value: "blue",
        label: "蓝色"
      }, {
        value: "yellow",
        label: "黄色"
      }],
      value: "default"
    } 
  },
  created() {
  },
  mounted() {

  },
  methods: {
    change(val) {
      changeTheme(val)
    }
  },
  watch: {
  },
  computed: {
    
  },
}

</script>
<style lang="scss" scoped>


</style>


	