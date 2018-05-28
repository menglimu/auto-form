<style lang="scss">
.ml-form{
  &.el-form--inline{
    .ml-form-string,
    .ml-form-phone,
    .ml-form-mail,
    .ml-form-bankCode,
    .ml-form-idCard,
    // .ml-form-text,
    .ml-form-number,
    .ml-form-password,
    {
    .el-input,{
        width: 220px;
      }
    }
    .ml-form-text,
    .ml-form-editor,
    .ml-form-radio,
    .ml-form-checkbox,
    .ml-form-upload,

    {
      display: block;
    }
    .ml-form-checkbox,
    .ml-form-radio,
    {
      @include inline(2);
    }
    .ml-form-editor{
      .el-form-item__content{
        width: 80%;
      }
    }
  }
  .remark{
    color: #999;
    padding-left: 20px;
  }
    .ml-form-object{
      @include inline(2);
      align-items: flex-start;
      margin-top: 20px;
    }
    .ml-form-text{
      .el-form-item__content{
        width: 600px;
      }
    }
    .ml-form-color .el-color-picker{
      float: left;
    }
    .el-color-picker__trigger{
      width: 80px;
    }
    
}

</style>
<template>
  <el-form-item :class="['ml-form-'+config.type]" :label="config.label" :prop="config.key">
    <el-input v-if="config.type==='string' || config.type==='phone' || config.type==='mail' || config.type==='bankCode' || config.type==='idCard' || config.type==='number'" 
      type="text" :placeholder="config.placeholder" :disabled="config.disable" :style="{width: config.width + 'px' }" 
      :readonly="config.readonly" :value="value" @input="input" :validateStatus="validateStatus" clearable>
        <template slot="prepend" v-if='config.prepend'>{{config.prepend}}</template>
        <template slot="append" v-if='config.append'>{{config.append}}</template>
      </el-input>
       
      <!-- 密码 TODO 可点击查看文本 -->
      <el-input v-if="config.type==='password'" :style="{width: config.width + 'px' }" 
      type="password" :placeholder="config.placeholder" :disabled="config.disable" 
      :readonly="config.readonly" :value="value" @input="input" clearable></el-input>

      <!-- 文本域 -->
      <el-input v-if="config.type==='text'" :rows="8" max="config.max" type="textarea" :placeholder="config.placeholder" :disabled="config.disable"  :readonly="config.readonly" :value="value" @input="input" clearable></el-input>

      <!-- 开关 -->
      <el-switch v-if="config.type==='boolean'" :value="value" @input="input"></el-switch>
      
      <el-select v-if="config.type==='select'" :multiple="config.multiple" :value="value" @input="input" :placeholder="config.placeholder">
        <el-option v-for="option in config.options" :key="option.value"  :label="option.label" :value="option.value" :disabled="option.disabled">
        </el-option>
      </el-select>

      <el-radio v-if="config.type==='radio'" v-for="option in config.options" :disabled="option.disabled" :value="value" @input="input" :key="option.value" :label="option.value">{{option.label}}</el-radio>

       <el-checkbox v-if="config.type==='checkbox'" v-for="option in config.options" :disabled="option.disabled" :value="value" @input="input" :key="option.value" :label="option.value">{{option.label}}</el-checkbox>

      <el-date-picker v-if="config.type==='date'" :value="value" @input="input" :placeholder="config.placeholder" type="date">
      </el-date-picker>

      <el-time-picker v-if="config.type==='time'" :value="value" @input="input" :placeholder="config.placeholder">
      </el-time-picker>

      <el-date-picker v-if="config.type==='dateTime'" :value="value" @input="input" :placeholder="config.placeholder" type="datetime">
      </el-date-picker>

      <el-date-picker v-if="config.type==='datetimerange'" :value="value" @input="input" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
      </el-date-picker>

      <el-time-picker is-range v-if="config.type==='timerange'" :value="value" @input="input"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :placeholder="config.placeholder">
      </el-time-picker>
      
      <el-color-picker v-if="config.type==='color'" :value="value" @input="input"></el-color-picker>

      <mlupload v-if="config.type==='upload'" :limit="config.limit" :value="value" @input="input"></mlupload>
      
      <mleditor v-if="config.type==='editor'" :value="value" @input="input" :defaultMsg="config.defaultMsg"></mleditor>

      <!-- <ojbForm v-if="config.type==='object'" :accordion="config.accordion" :name="config.label" :configAll="config" :child='config.child' :value="value" @input="input" :rootVal="_rootVal" :parentVal="val"></ojbForm> -->

      <!-- <el-input-number  v-if="config.type==='boolean'" :value="value" @input="input" :disabled="config.readonly||config.disable" :min="config.min" :max="config.max" :label="config.placeholder"></el-input-number> -->
      <span class="remark" v-if="config.remark">{{config.remark}}</span>
  </el-form-item>
</template>
<script>
// import msvideo from '@/components/video/video'
// import formItem from './formItem.vue'
import mlupload from './mlupload.vue'
import ojbForm from './ojbForm.vue'
import mleditor from '@/components/common/editor'
export default {
  components: {
    mlupload,mleditor,ojbForm
  },

  props:{
    config: {
      type: Object,
      required: true
    },
    value: {
      type: null,
      required: true
    }
    // valObj:{
    //   type: Object,
    //   required: true
    // }
  },

  data() {
    if (!this.config.placeholder&&this.config.label) {
      this.config.placeholder = `请输入${this.config.label}`
    }
    if (!this.config.error&&this.config.label) {
      this.config.error = `请输入合法的${this.config.label}`
    }
    if (!this.config.show) {
      this.config.show = true
    }
    //TODO  show条件判断 默认当前层级 $parent至上一层 
    return {
      validateStatus: ''
    }
  },

  created() {

  },

  mounted() {

  },

  computed: {
    rules() {
      let rules = []
      if (this.config.show) {
        if (this.config.must) {
          rules.push({ required: true, message: this.config.error, trigger: 'blur' })
        }
        if (this.config.min != undefined && this.config.max != undefined) {
          rules.push({ min: this.config.min, max: this.config.max, message: `输入字符长度应在 ${this.config.min} 到 ${this.config.max} 个字符`, trigger: 'blur' })
        }
        if (this.config.reg) {
          rules.push({ pattern: reg,//  /^[\u4E00-\u9FA5]+$/
          message: this.config.error })
        }
        if (this.config.type == 'phone') {
          rules.push({ pattern: /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/,message: this.config.error})
        }else if (this.config.type == 'mail') {
          rules.push({ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: this.config.error })
        }else if (this.config.type == 'bankCode') {
          rules.push({ pattern: /^([1-9]{1})(\d{15}|\d{18})$/,message: this.config.error })
        }else if (this.config.type == 'idCard') {
          rules.push({ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: this.config.error })
        }
      }
      
      console.log(rules);
      return rules;
    }
  },

  methods: {
    input(val) {
      this.$emit('input', val)
      this.validateStatus = 'error'
      this.rules().input.forEach(rule => {
        // .test
      })
    },
    // 根据条件来显示隐藏
    // _rootVal 通过根数据来控制
    getShow(show) {
      if (show === false || show === 'false') {
        return false
      }else if (!show || show === true || show === 'true') {
        return true
      }else{
        let option = show.split(/[\=\.\:]/)
        let val = null
        let start = 0
        if (option[0]=='$_root') {
          val = this._rootVal
          start = 1
        }else if(option[0]=='$_parent') {
          val = this._parentVal
          start = 1
        }else{
          val = this.val
        }
        
        for (var i = start; i < option.length - 1; i++) {
          if (option[i]=='$_parent') {
            val = val._parentVal
          }else if(option[i]){
            val = val[option[i]]
          }
        }
        let term = option[option.length - 1]
        if (term === 'true') {
          term = true
        }else if(term === 'false'){
          term = false
        }
        return val == term
      }
    },
    //规则
    rules() {
      let obj = {
        'blur': [],
        'input': [],
      }
      let data = this.config
      // this.config.dataList.forEach(data => {
        if (this.getShow(data.show)) {
          if (data.must) {
            obj.blur.push({ required: true, message: data.error, trigger: 'blur' })
          }
          if (data.min != undefined && data.max != undefined) {
            obj.input.push({ pattern: new RegExp(`^{${data.min},${data.max}}$`), message: `输入字符长度应在 ${data.min} 到 ${data.max} 个字符`})
          }
          if (data.reg) {
            obj.input.push({ pattern: reg,//  /^[\u4E00-\u9FA5]+$/
            message: data.error })
          }
          if (data.type == 'phone') {
            obj.input.push({ pattern: /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/,message: data.error, trigger: 'change'})
          }else if (data.type == 'mail') {
            obj.input.push({ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: data.error, trigger: 'change'})
          }else if (data.type == 'bankCode') {
            obj.input.push({ pattern: /^([1-9]{1})(\d{15}|\d{18})$/,message: data.error, trigger: 'change' })
          }else if (data.type == 'idCard') {
            obj.input.push({ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: data.error, trigger: 'change' })
          }else if (data.type == 'number') {
            obj.input.push({ pattern: /^[-]?\d+(\.\d+)?$/,message: data.error, trigger: 'change' })
          }
        }
      // })
      console.log(obj);
      return obj
    },
  },
}

</script>