<!-- 
放弃使用item独立组件方式，因为model验证在出现了延迟，
因为显示隐藏的动态验证方式 继续使用item重新实现验证
rootVal 用来处理show的根数据
TODO: 点击按钮验证、可增加简单类型输入

 -->

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
  <el-form :model="val" class="ml-form"  :label-width="config.labelWidth" :inline="config.inline">
  <!-- {{rules()}} -->
    <!-- :rules="rules()" form使用 -->
    <!-- :rules="rules[item.key]"  之前form-item使用 :rules="rules(item)"-->
    <el-form-item :inline="true" v-show="getShow(item.show)" v-for="item in config.dataList" :class="['ml-form-'+item.type]" :rules="rules(item)" :label="item.label" :prop="item.key" :key="item.key">
      <!-- {{rules(item)}} -->
      <!-- {{getShow(item.show,_rootVal)}} -->
      <!-- 基本输入框 -->
      <el-input v-if="item.type==='string' || item.type==='phone' || item.type==='mail' || item.type==='bankCode' || item.type==='idCard' || item.type==='number'" 
      type="text" :placeholder="item.placeholder" :disabled="item.disable" :style="{width: item.width + 'px' }" 
      :readonly="item.readonly" v-model="val[item.key]" clearable>
        <template slot="prepend" v-if='item.prepend'>{{item.prepend}}</template>
        <template slot="append" v-if='item.append'>{{item.append}}</template>
      </el-input>
       
      <!-- 密码 TODO 可点击查看文本 -->
      <el-input v-if="item.type==='password'" :style="{width: item.width + 'px' }" 
      type="password" :placeholder="item.placeholder" :disabled="item.disable" 
      :readonly="item.readonly" v-model="val[item.key]" clearable></el-input>

      <!-- 文本域 -->
      <el-input v-if="item.type==='text'" :rows="8" max="item.max" type="textarea" :placeholder="item.placeholder" :disabled="item.disable"  :readonly="item.readonly" v-model="val[item.key]" clearable></el-input>

      <!-- 开关 -->
      <el-switch v-if="item.type==='boolean'" v-model="val[item.key]"></el-switch>
      
      <el-select v-if="item.type==='select'" :multiple="item.multiple" v-model="val[item.key]" :placeholder="item.placeholder">
        <el-option v-for="option in item.options" :key="option.value"  :label="option.label" :value="option.value" :disabled="option.disabled">
        </el-option>
      </el-select>

      <el-radio v-if="item.type==='radio'" v-for="option in item.options" :disabled="option.disabled" v-model="val[item.key]" :key="option.value" :label="option.value">{{option.label}}</el-radio>

       <el-checkbox v-if="item.type==='checkbox'" v-for="option in item.options" :disabled="option.disabled" v-model="val[item.key]" :key="option.value" :label="option.value">{{option.label}}</el-checkbox>

      <el-date-picker v-if="item.type==='date'" v-model="val[item.key]" :placeholder="item.placeholder" type="date">
      </el-date-picker>

      <el-time-picker v-if="item.type==='time'" v-model="val[item.key]" :placeholder="item.placeholder">
      </el-time-picker>

      <el-date-picker v-if="item.type==='dateTime'" v-model="val[item.key]" :placeholder="item.placeholder" type="datetime">
      </el-date-picker>

      <el-date-picker v-if="item.type==='datetimerange'" v-model="val[item.key]" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
      </el-date-picker>

      <el-time-picker is-range v-if="item.type==='timerange'" v-model="val[item.key]"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :placeholder="item.placeholder">
      </el-time-picker>
      
      <el-color-picker v-if="item.type==='color'" v-model="val[item.key]"></el-color-picker>

      <mlupload v-if="item.type==='upload'" :limit="item.limit" v-model="val[item.key]"></mlupload>
      
      <mleditor v-if="item.type==='editor'" v-model="val[item.key]" :defaultMsg="item.defaultMsg"></mleditor>

      <ojbForm v-if="item.type==='object'" :accordion="item.accordion" :name="item.label" :configAll="config" :child='item.child' v-model="val[item.key]" :rootVal="_rootVal" :parentVal="val"></ojbForm>

      <!-- <el-input-number  v-if="item.type==='boolean'" v-model="val[item.key]" :disabled="item.readonly||item.disable" :min="item.min" :max="item.max" :label="item.placeholder"></el-input-number> -->
      <span class="remark" v-if="item.remark">{{item.remark}}</span>
    </el-form-item>

  </el-form>
</template>
<script>
import formItem from './formItem.vue'
import mlupload from './mlupload.vue'
import ojbForm from './ojbForm.vue'
import mleditor from '@/components/common/editor'
import {isEqual} from '@/global/msUtils.js'
isEqual({},{})
export default {
  components: {
    formItem,mlupload,mleditor,ojbForm
  },
  props: {
    value:{
      type: null,
    },
    config:{
      type: Object,
      required: true
    },
    rootVal:{
      type: null
    },
    parentVal:{
      type: null
    }
  },
  data() {
    //设置初始值
    this.config.dataList.forEach(data => {
      if (!data.placeholder&&data.label) {
        data.placeholder = `请输入${data.label}`
      }
      if (!data.error&&data.label) {
        data.error = `请输入合法的${data.label}`
      }
      if (data.type == 'upload') {
        data.limit = data.limit || 999
      }
    })
    // let initVal = this.initVal()
    // // this.val = initVal
    // this.$emit('input',initVal)
    return {
      model: {},
      init: true,
      // val: initVal, 
        // {  
        //   "value": "address",
        //   "lable": "地址选择"
        // },
    }
  },
 
  created() {
    
    
  },

  mounted() {
    
  },

  computed: {
    val: {
      get() {
        if (this.init) {
          this.init = false
          let obj = this.initVal()
          this.$emit('input',obj)
          return obj
        }else{
          return this.value
        }
        
      },
      set(val) {
        this.val = val
      }
    },
    
    
    // 获得form 的值的对象 根和父，objform 父必传 
    _rootVal() {
      if (this.rootVal) {
        return this.rootVal
      }else{
        return this.val
      }
    },
    _parentVal() {
      if (this.parentVal) {
        return this.parentVal
      }else{
        return this.val
      }
    }
  },

  methods: {
    initVal() {
      let list = this.config.dataList
      let objInit = {}
      list.forEach(data => {
        objInit[data.key] = this.getValByType(data)
      })


      let obj = {}
      if (typeof(this.value) == 'object') {
        obj = this.value
      }
      obj = Object.assign(objInit,obj)

      return obj
    },
    //为各种类型的设置初始值  arrayObj类型时候，直接调用form组件
    // TODO: 下拉是否多选
    // 地址、时间 初始值
    getValByType(obj) {
      if (obj.value) {
        return obj.value
      }else if (obj.type == 'boolean') {
        return false
      }else if (obj.type == 'checkbox' || (obj.type == 'select'&&obj.multiple)) {
        return []
      }else if ((obj.type == 'select'&&obj.must&&!obj.multiple) || (obj.type == 'radio'&&obj.must)) {
        for (var i = 0; i < obj.options.length; i++) {
          if (!obj.options[i].disabled) {
           return obj.options[i].value
          }
        }
        return null
      }else if(obj.type=='object'){
        return []
      }else{
        return null
      }
    },
    //监听值改变
    change(key,val) {
      let obj = Object.assign({},this.val)
      obj[key] = val
      this.model = obj
      this.$emit('input', obj)
      console.log(key,val,obj,this.model);
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
    rules(data) {
      let obj = {}
      // this.config.dataList.forEach(data => {
        let rules = []
        if (this.getShow(data.show)) {
          if (data.must) {
            rules.push({ required: true, message: data.error, trigger: 'blur' })
          }
          if (data.min != undefined && data.max != undefined) {
            rules.push({ min: data.min, max: data.max, message: `输入字符长度应在 ${data.min} 到 ${data.max} 个字符`})
          }
          if (data.reg) {
            rules.push({ pattern: reg,//  /^[\u4E00-\u9FA5]+$/
            message: data.error })
          }
          if (data.type == 'phone') {
            rules.push({ pattern: /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/,message: data.error, trigger: 'change'})
          }else if (data.type == 'mail') {
            rules.push({ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: data.error, trigger: 'change'})
          }else if (data.type == 'bankCode') {
            rules.push({ pattern: /^([1-9]{1})(\d{15}|\d{18})$/,message: data.error, trigger: 'change' })
          }else if (data.type == 'idCard') {
            rules.push({ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: data.error, trigger: 'change' })
          }else if (data.type == 'number') {
            rules.push({ pattern: /^[-]?\d+(\.\d+)?$/,message: data.error, trigger: 'change' })
          }
        }
        obj[data.key] = rules
      // })
      console.log(obj);
      return rules
    },
    bulre() {
      console.log(123);
    }
  },

  watch: {
    val: {
      handler (cval, oval) {
        // this.$emit('input',this.val)
        if (!isEqual(cval,oval)) {
          this.$emit('input',this.val)
        }
      },
      deep: true
    }
  }
}

</script>