<!-- TODO objform显示标题可配，错误信息优化
隐藏的组件的值的问题
 -->
<style lang="scss" scoped>
</style>
<template>
  <el-form class="mlform" :label-width="config.labelWidth" :inline="config.inline">

    <formItem
      v-for="item in config.dataList"
      :key="item.key"
      :config="item"
      :value="val[item.key]" 
      @input="change(item.key,$event)"
      ref="formItem"
      :_rootVal='_rootVal'
      :_parentVal='_parentVal'
      :_thisVal = 'val'
      :configAll='config' 
      @hide="hide"
      @show="show(item,$event)"
      >
    </formItem>

  </el-form>
</template>
<script>
import formItem from "./formItem.vue"
export default {
  components: {
    formItem
  },
  props: {
    value: {
      type: null
    },
    config: {
      type: Object,
      required: true
    },
    rootVal: {
      type: null
    },
    parentVal: {
      type: null
    }
  },
  data() {
    console.log(this.config)
    return {
      init: true
      // val: initVal,
      // {
      //   "value": "address",
      //   "label": "地址选择"
      // },
    }
  },

  created() {},

  mounted() {},

  computed: {
    val() {
      if (this.init) {
        this.init = false
        let obj = this.initVal()
        this.$emit("input", obj)
        return obj
      } else {
        return this.value
      }
    },
    // 获得form 的值的对象 根和父，objform 父必传
    _rootVal() {
      if (this.rootVal) {
        return this.rootVal
      } else {
        return this.val
      }
    },
    _parentVal() {
      if (this.parentVal) {
        return this.parentVal
      } else {
        return this.val
      }
    }
  },

  methods: {
    //验证数据
    validate() {
      let validateResult = true
      for (var i = 0; i < this.$refs["formItem"].length; i++) {
        if (!this.$refs["formItem"][i].validate()) {
          validateResult = false
        }
      }
      return validateResult
    },
    validateNoMsg() {
      let validateResult = true
      for (var i = 0; i < this.$refs["formItem"].length; i++) {
        if (!this.$refs["formItem"][i].validateNoMsg()) {
          validateResult = false
        }
      }
      console.log(validateResult)
      return validateResult
    },
    //初始化数据
    initVal() {
      let list = this.config.dataList
      let objInit = {}
      list.forEach(data => {
        objInit[data.key] = this.getValByType(data)
      })

      let obj = {}
      if (typeof this.value == "object") {
        obj = this.value
      }
      obj = Object.assign(objInit, obj)

      return obj
    },
    //为各种类型的设置初始值  arrayObj类型时候，直接调用form组件
    // TODO: 下拉是否多选
    // 地址、时间 初始值
    getValByType(obj) {
      if (obj.value) {
        return obj.value
      } else if (obj.type == "boolean") {
        return false
      } else if (
        obj.type == "checkbox" ||
        (obj.type == "select" && obj.multiple)
      ) {
        return []
      } else if (
        (obj.type == "select" && obj.must && !obj.multiple) ||
        (obj.type == "radio" && obj.must)
      ) {
        for (var i = 0; i < obj.options.length; i++) {
          if (!obj.options[i].disabled) {
            return obj.options[i].value
          }
        }
        return null
      } else if (obj.type == "object") {
        return []
      } else {
        return null
      }
    },
    //监听值改变
    change(key, val) {
      let obj = Object.assign({}, this.val)
      obj[key] = val
      this.$emit("input", obj)
    },
    hide(key){
      let obj = Object.assign({}, this.val)
      if (this.config.dataList.filter(obj => obj.key == key).length==1) {
        delete obj[key]
        this.$emit("input", obj)
      }      
    },
    show(item, val) {
      console.log(123)
      let obj = Object.assign({}, this.val)
      obj[item.key] = val || this.getValByType(item)
      this.$emit("input", obj)
    },
  }
}
</script>