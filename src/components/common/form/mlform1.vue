<style lang="scss" scoped>
  .ml-form-string,
  .ml-form-phone,
  .ml-form-mail,
  .ml-form-bankCode,
  .ml-form-idCard,
  .ml-form-text,
  .ml-form-number,
  {
    width: 350px;
  }
</style>
<template>
  <el-form :model="val">
    
    <el-form-item v-for="item in config.dataList" :class="['ml-form-'+item.type]" :rules="rules[item.key]" :label="item.label" :prop="item.key" :key="item.key">
      <!-- 基本输入框 -->
      <el-input v-if="item.type==='string' || item.type==='phone' || item.type==='mail' || item.type==='bankCode' || item.type==='idCard' || item.type==='number'" 
      type="text" :placeholder="item.placeholder" :disabled="item.disable" 
      :readonly="item.readonly" v-model="val[item.key]" clearable></el-input>
      <!-- 文本域 -->
      <el-input v-if="item.type==='text'" :rows="5" max="item.max" type="textarea" :placeholder="item.placeholder" :disabled="item.disable"  :readonly="item.readonly" v-model="val[item.key]" clearable></el-input>
      <!-- 开关 -->
      <el-switch v-if="item.type==='boolean'" v-model="val[item.key]"></el-switch>
      <!-- 密码 TODO 可点击查看文本 -->
      <el-input v-if="item.type==='password'" 
      type="password" :placeholder="item.placeholder" :disabled="item.disable" 
      :readonly="item.readonly" v-model="val[item.key]" clearable></el-input>
      
      <el-select v-if="item.type==='select'" v-model="val[item.key]" :placeholder="item.placeholder">
        <el-option v-for="option in item.options" :key="option.value"  :label="option.label" :value="option.value" :disabled="option.disabled">
        </el-option>
      </el-select>

      <el-radio v-if="item.type==='radio'" v-for="option in item.options" :disabled="option.disabled" v-model="val[item.key]" :label="option.value">{{option.label}}</el-radio>

       <el-checkbox v-if="item.type==='checkbox'" v-for="option in item.options" :disabled="option.disabled" v-model="val[item.key]" :label="option.value">{{option.label}}</el-checkbox>

      <!-- <el-input-number  v-if="item.type==='boolean'" v-model="val[item.key]" :disabled="item.readonly||item.disable" :min="item.min" :max="item.max" :label="item.placeholder"></el-input-number> -->

    </el-form-item>

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
    this.config.dataList.forEach(data => {
      if (!data.placeholder&&data.label) {
        data.placeholder = `请输入${data.label}`
      }
      if (!data.error&&data.label) {
        data.error = `请输入合法的${data.label}`
      }
      if (!data.show) {
        data.show = true
      }
    })
    let obj = {}
    if (typeof(this.value) == 'object') {
      obj = this.value
    }
    obj = Object.assign(this.initVal(this.config.dataList),obj)
    
    return {
      model: {},
      val: obj,
        // {  
        //   "value": "date",
        //   "lable": "日期",
        // },
        // {  
        //   "value": "time",
        //   "lable": "时分秒时间点",
        // },
        // {  
        //   "value": "dateTime",
        //   "lable": "具体时间点",
        // },
        // {  
        //   "value": "datetimerange",
        //   "lable": "时间范围",
        // },
        // {  
        //   "value": "upload",
        //   "lable": "图片上传"
        // },
        // {  
        //   "value": "color",
        //   "lable": "颜色选择"
        // },
        // {  
        //   "value": "address",
        //   "lable": "地址选择"
        // },
        // {  
        //   "value": "editor",
        //   "lable": "富文本编辑"
        // },
        // {  
        //   "value": "array",
        //   "lable": "可增加单个输入类型",
        // },
        // {  
        //   "value": "arrayObj",
        //   "lable": "可增加对象输入",
        // },
    }
  },
 
  created() {
    
    
  },

  mounted() {

  },

  computed: {
    
    rules() {
      let obj = {}
      this.config.dataList.forEach(data => {
        let rules = []
        if (data.show) {
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
            rules.push({ pattern: /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/,message: data.error})
          }else if (data.type == 'mail') {
            rules.push({ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: data.error })
          }else if (data.type == 'bankCode') {
            rules.push({ pattern: /^([1-9]{1})(\d{15}|\d{18})$/,message: data.error })
          }else if (data.type == 'idCard') {
            rules.push({ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: data.error })
          }else if (data.type == 'number') {
            rules.push({ pattern: /^[-]?\d+(\.\d+)?$/,message: data.error })
          }
        }
        obj[data.key] = rules
      })
      return obj
    },
  },

  methods: {
    initVal(list) {
      let obj = {}
      list.forEach(data => {
        if(data.type=='array'){
          obj[data.key] = []
          // data.child.forEach(array => {
          //   obj[data.key].push(this.getValByType(array))
          // })
        }else{
          obj[data.key] = this.getValByType(data)
        } 
      })
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
      }else if (obj.type == 'checkbox') {
        return []
      }else if ((obj.type == 'select'&&obj.must) || (obj.type == 'radio'&&obj.must)) {
        for (var i = 0; i < obj.options.length; i++) {
          if (!obj.options[i].disabled) {
           return obj.options[i].value
          }
        }
         return null
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
      this.model = obj
      this.$emit('input', obj)
      console.log(key,val,obj,this.model);
    }
  },
}

</script>