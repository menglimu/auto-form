<style lang="scss">
.ml-form-string,
.ml-form-phone,
.ml-form-mail,
.ml-form-bankCode,
.ml-form-idCard,
// .ml-form-text,
.ml-form-number,
.ml-form-password, {
  .mlform & .el-input {
    width: 220px;
  }
  .el-form--inline & .el-input {
    width: 100%;
  }
}
.el-form--inline .mlform-item{
  margin-right: 0;
  padding-right: 10px;
}
.mlform {
  
  .ml-form-text,
  .ml-form-editor,
  .ml-form-radio,
  .ml-form-checkbox,
  .ml-form-upload {
    display: block;
  }
  .ml-form-checkbox,
  .ml-form-radio {
    display: block;
    @include inline(2);
  }
  .ml-form-editor {
    .el-form-item__content {
      width: 80%;
    }
  }
  .ml-form-object {
    .el-form-item__content {
      margin-left: 0 !important;
    } 
  }

  .remark {
    color: #999;
    padding-left: 20px;
  }
  .ml-form-object {
    @include inline(2);
    align-items: flex-start;
    margin-top: 20px;
  }
  .ml-form-text {
    .el-form-item__content {
      width: 600px;
    }
  }
  .ml-form-color .el-color-picker {
    float: left;
  }
  .el-color-picker__trigger {
    width: 80px;
  }
  .mlform-item-block {
    display: block;
  }
}
</style>
<template>
  <el-form-item class='mlform-item' :style="{width: configAll.inputWidth}" :class="['ml-form-'+config.type,{'mlform-item-block': config.block}]"  v-if="config.type!=='object'" :label="config.label" v-show="getShow(config.show)" :required="required" :error="error" :validateStatus='validateStatus'>
    <!-- 基本文本输入框 -->
    <el-input v-if="config.type==='string' || config.type==='phone' || config.type==='mail' || config.type==='bankCode' || config.type==='idCard' || config.type==='number'" type="text" :placeholder="config.placeholder" :disabled="config.disabled || configAll.view" :readonly="config.readonly" :value="value" @input="input" @blur="blur" clearable>
      <template slot="prepend" v-if='config.prepend'>{{config.prepend}}</template>
      <template slot="append" v-if='config.append'>{{config.append}}</template>
    </el-input>
    <!-- 密码 TODO 可点击查看文本 -->
    <el-input v-if="config.type==='password'" type="password" :placeholder="config.placeholder" :disabled="config.disabled || configAll.view" :readonly="config.readonly" :value="value" @input="input" @blur="blur" clearable></el-input>
    <!-- 文本域 -->
    <el-input v-if="config.type==='text'" :rows="8" max="config.max" type="textarea" :placeholder="config.placeholder" :disabled="config.disabled || configAll.view" :readonly="config.readonly" :value="value" @input="input" @blur="blur" clearable></el-input>
    <!-- 开关 -->
    <el-switch v-if="config.type==='boolean'" :value="value" @input="input" @blur="blur" :disabled="config.disabled || configAll.view"></el-switch>
    <!-- 下拉 -->
    <el-select v-if="config.type==='select'" :multiple="config.multiple" :value="value" @input="input" @blur="blur" :placeholder="config.placeholder" :disabled="config.disabled || configAll.view">
      <el-option v-for="option in config.options" :key="option.value" :label="option.label" :value="option.value" :disabled="option.disabled">
      </el-option>
    </el-select>
    <!-- 单选 -->
    <el-radio v-if="config.type==='radio'" v-for="option in config.options" :disabled="config.disabled || configAll.view" :value="value" @input="input" @blur="blur" :key="option.value" :label="option.value">{{option.label}}</el-radio>
    <!-- 多选 -->
    <el-checkbox v-if="config.type==='checkbox'" v-for="option in config.options" :disabled="config.disabled || configAll.view" :value="value" @input="input" @blur="blur" :key="option.value" :label="option.value">{{option.label}}</el-checkbox>
    <!-- 日期选择 -->
    <el-date-picker v-if="config.type==='date'" :value="value" @input="input" @blur="blur" :placeholder="config.placeholder" type="date" :disabled="config.disabled || configAll.view">
    </el-date-picker>
    <!-- 时间选择 -->
    <el-time-picker v-if="config.type==='time'" :value="value" @input="input" @blur="blur" :placeholder="config.placeholder" :disabled="config.disabled || configAll.view">
    </el-time-picker>
    <!-- 日期时间选择 -->
    <el-date-picker v-if="config.type==='dateTime'" :value="value" @input="input" @blur="blur" :placeholder="config.placeholder" type="datetime" :disabled="config.disabled || configAll.view">
    </el-date-picker>
    <!-- 日期时间范围选择 -->
    <el-date-picker v-if="config.type==='datetimerange'" :value="value" @input="input" @blur="blur" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" :disabled="config.disabled || configAll.view">
    </el-date-picker>
    <!-- 时间段选择 -->
    <el-time-picker is-range v-if="config.type==='timerange'" :value="value" @input="input" @blur="blur" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :placeholder="config.placeholder" :disabled="config.disabled || configAll.view">
    </el-time-picker>
    <!-- 颜色选择 -->
    <el-color-picker v-if="config.type==='color'" :value="value" @input="input" @blur="blur" :disabled="config.disabled || configAll.view"></el-color-picker>
    <!-- 图片上传 -->
    <mlupload v-if="config.type==='upload'" :limit="config.limit" :value="value" @input="input" :disabled="config.disabled || configAll.view"></mlupload>
    <!-- 百度富文本 -->
    <mleditor v-if="config.type==='editor'" :value="value" @input="input" @blur="blur" :defaultMsg="config.defaultMsg" :disabled="config.disabled || configAll.view"></mleditor>
    <!-- 地图选择点 -->
    <mapChose v-if="config.type==='mapChose'" :value="value" @input="input" :config="config" :disabled="config.disabled || configAll.view"></mapChose>
    <!-- 后面的标注 -->
    <span class="remark" v-if="config.remark">{{config.remark}}</span>
  </el-form-item>
  <!-- 可增加组输入 -->
  <ojbForm v-else v-show="getShow(config.show)" :required="required" :error="error" :validateStatus='validateStatus' :config="config" :configAll="configAll" :value="value" @input="input" :rootVal="_rootVal" :parentVal="_thisVal" ref="ojbFormItem"></ojbForm>
</template>
<script>
// import msvideo from '@/components/video/video'
// import formItem from './formItem.vue'
import mlupload from "./mlupload.vue"
import ojbForm from "./ojbForm.vue"
import mleditor from "@common/editor"
import mapChose from "@common/mapChose"
import {insertStyle} from "@/utils"
export default {
  components: {
    mlupload,
    mleditor,
    ojbForm,
    mapChose
  },

  props: {
    config: {
      type: Object,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    configAll: {
      type: Object,
      required: true
    },
    _rootVal: {
      type: Object,
      required: true
    },
    _parentVal: {
      type: Object,
      required: true
    },
    _thisVal: {
      type: Object,
      required: true
    }
    // valObj:{
    //   type: Object,
    //   required: true
    // }
  },

  data() { 
    if (!this.config.placeholder && this.config.label) {
      this.config.placeholder = `请输入${this.config.label}`
    }
    if (!this.config.error && this.config.label) {
      this.config.error = `请输入合法的${this.config.label}`
    }
    if (
      !this.config.show &&
      this.config.show != false &&
      this.config.show != "false"
    ) {
      this.config.show = true
    }
    //TODO  show条件判断 默认当前层级 $parent至上一层
    return {
      validateStatus: "",
      error: "",
      required: this.config.must,
      show: true,
      beforeHide: null,
    }
  },

  created() { },

  mounted() {
    if(this.configAll.labelWidth){
      //  插入样式字符串到文档中
      insertStyle(`.el-form--inline .el-form-item__content{ width: calc(100% - ${this.configAll.labelWidth});}`)
    }
    
  },

  computed: {
    rules() {
      let obj = {
        blur: [],
        input: []
      }
      let data = this.config
      // this.config.dataList.forEach(data => {
      // if (this.getShow(data.show)) {
      // if (data.must) {
      //   console.log(this.required);
      //   this.required = true;
      //   console.log(this.required);
      //   // obj.blur.push({ required: true, message: data.error, trigger: 'blur' })
      // }
      if (data.min != undefined && data.max != undefined) {
        obj.input.push({
          pattern: new RegExp(`^{${data.min},${data.max}}$`),
          message: `输入字符长度应在 ${data.min} 到 ${data.max} 个字符`
        })
      }
      if (data.reg) {
        obj.input.push({
          pattern: data.reg, //  /^[\u4E00-\u9FA5]+$/
          message: data.error
        })
      }
      if (data.type == "phone") {
        obj.input.push({
          pattern: /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/,
          message: data.error,
          trigger: "change"
        })
      } else if (data.type == "mail") {
        obj.input.push({
          pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: data.error,
          trigger: "change"
        })
      } else if (data.type == "bankCode") {
        obj.input.push({
          pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
          message: data.error,
          trigger: "change"
        })
      } else if (data.type == "idCard") {
        obj.input.push({
          pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
          message: data.error,
          trigger: "change"
        })
      } else if (data.type == "number") {
        obj.input.push({
          pattern: /^[-]?\d+(\.\d+)?$/,
          message: data.error,
          trigger: "change"
        })
      }
      // }
      // })
      return obj
    }
  },

  methods: {
    input(val) {
      if (this.value == val) {
        return
      }
      this.$emit("input", val)
      this.validateInput(val)
      // this.validateStatus = 'error'
      //     this.error = 'rule.message'
      // this.validateStatus = 'success'
      // this.error = '请输入'
      // rules.input.forEach(rule => {
      //   // .test
      // })
    },
    validate() {
      return (
        this.validateInput(this.value, "blur", true) &&
        this.validateInput(this.value, "input", true)
      )
    },
    validateNoMsg() {
      return (
        this.validateInputNoMsg(this.value, "blur", true) &&
        this.validateInputNoMsg(this.value, "input", true)
      )
    },
    blur() {
      this.validateInput(this.value, "blur") && this.validateInput(this.value)
    },
    //只有全局调用表单验证的时候，校验object子元素否则延迟，不能返回nextTick不能返回状态，得使用回调的方式
    validateInput(val, type = "input", validate = false) {
      if (!this.show) {
        return true
      }
      if (this.required && (!val || val.length == 0)) {
        this.validateStatus = "error"
        this.error = `必填项${this.config.label}不能为空`
        return false
      }
      if (this.config.type == "object" && validate) {
        return this.$refs["ojbFormItem"].validate()
      } else if (this.config.type == "object" && !validate) {
        this.validateStatus = ""
        return true
      }
      for (var i = 0; i < this.rules[type].length; i++) {
        if (
          this.rules[type][i].pattern &&
          !this.rules[type][i].pattern.test(val)
        ) {
          this.validateStatus = "error"
          this.error = this.rules[type][i].message
          return false
        }
      }
      this.validateStatus = "success"
      return true
    },
    //只有全局调用表单验证的时候，校验object子元素
    validateInputNoMsg(val, type = "input", validate = false) {
      if (!this.show) {
        return true
      }
      if (this.required && (!val || val.length == 0)) {
        return false
      }
      if (this.config.type == "object" && validate) {
        return this.$refs["ojbFormItem"].validateNoMsg()
      } else if (this.config.type == "object" && !validate) {
        return true
      }
      for (var i = 0; i < this.rules[type].length; i++) {
        if (
          this.rules[type][i].pattern &&
          !this.rules[type][i].pattern.test(val)
        ) {
          return false
        }
      }
      return true
    },
    // 根据条件来显示隐藏
    // _rootVal 通过根数据来控制
    getShow() {
      let show = this.config.show
      if (show === false || show === "false") {
        return false
      } else if (!show || show === true || show === "true") {
        return true
      } else {
        // let option = show.split(/[=.:]/)
        // // let option = show.split(/[\=\.\:]/)
        // let val = null
        // let start = 0
        // if (option[0] == "$_root") {
        //   val = this._rootVal
        //   start = 1
        // } else if (option[0] == "$_parent") {
        //   val = this._parentVal
        //   start = 1
        // } else {
        //   val = this._thisVal
        // }

        // for (var i = start; i < option.length - 1; i++) {
        //   if (option[i] == "$_parent") {
        //     val = val._parentVal
        //   } else if (option[i]) {
        //     val = val[option[i]]
        //   }
        // }
        // let term = option[option.length - 1]
        // if (term === "true") {
        //   term = true
        // } else if (term === "false") {
        //   term = false
        // }
        // if (val == term) {
        if (eval(show)) {
          if(this.show === false){
            this.$emit("show", this.beforeHide) 
          }
          this.show = true
        } else {
          //不显示的时候，重置值
          if (this.show === true) {
            this.beforeHide = this.value
            this.$emit("hide", this.config.key)
          }
          
          // if (this.config.type == "object") {
          //   if (this.value != []) {
          //     this.$emit("input", [])
          //   }
          // } else {
          //   if (this.value != null) {
          //     this.$emit("input", null)
          //   }
          // }
          this.show = false
        }
        return this.show
      }
    }

    //规则
  }
}
</script>