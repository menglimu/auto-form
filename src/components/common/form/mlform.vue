<style lang="scss" scoped>
  .lm-form-inline .el-input{
    width: 150px;
  }
</style>
<template>
  <el-form :model="val">

    <formItem
      v-for="item in config.dataList"
      :key="item.key"
      :config="item"
      :value="val[item.key]"
      @input="change"
      >
    </formItem>

  </el-form>
</template>
<script>
import formItem from './formItem.vue'
export default {
  components: {
    formItem
  },
  props: {
    value:{
      type: null,
    },
    config:{
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },

  created() {

  },

  mounted() {

  },

  computed: {
    val() {
      let obj = {}
      if (!this.value || Object.is(this.value, {})) {
        this.initVal(this.config.dataList,obj)
        this.change()
      }else{
        return this.value
      }
    }
  },

  methods: {
    initVal(list, obj) {
      list.forEach(data => {
        if(data.type=='array'){
          obj[data.key] = []
          data.child.forEach(array => {
            obj[data.key].push(this.getValByType(array))
          })
        }else{
          obj[data.key] = this.getValByType(array)
        } 
      })
    },
    //为各种类型的设置初始值  arrayObj类型时候，直接调用form组件
    // TODO: 下拉是否多选
    // 地址、时间 初始值
    getValByType(obj) {
      if (obj.value) {
        return obj.value
      }else if (obj.type == 'boolean') {
        return false
      }else if (obj.type == 'radio'&&obj.must) {
        return obj.options[0] || null
      }else if (obj.type == 'checkbox') {
        return []
      }else if (obj.type == 'select'&&obj.must) {
        return obj.options[0] || null
      }else if(obj.type=='arrayObj'){
        return {}
          // obj[data.key] = {}
          // this.initVal(data.child,obj[data.key])
      }else{
        return null
      }
    },
    //监听值改变
    change(key,val) {
      let obj = Object.assign({},this.val)
      obj[key] = val
      this.$emit('input', obj)
      console.log(key,val,obj);
    }
  },
}

</script>