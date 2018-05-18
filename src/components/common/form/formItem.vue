<style lang="scss" scoped>
  .lm-form-inline .el-input{
    width: 150px;
  }
</style>
<template>
  <el-form-item :rules="rules" :label="config.label" :prop="config.key">
    <el-input v-if="config.type==='string'" type="text" :placeholder="config.placeholder" :disabled="config.disable" :readonly="config.readonly" :value="value" @input="change" 
    clearable></el-input>
    <el-input v-if="config.type==='phone'" type="text" :placeholder="config.placeholder" :disabled="config.disable" :readonly="config.readonly" :value="value" @input="change" 
    clearable></el-input>
  </el-form-item>
</template>
<script>
// import msvideo from '@/components/video/video'
export default {
  components: {

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
      inputData:[
        {
          type: 'string',//
          key: 'name',    //输出的key
          readonly: false,//只读 
          disabled: false,//不可操作
          must: true, //必填
          value: '', //默认值
          placeholder: '请输入用户名', //
          label: '用户名', //输入框前显示
          error: '请输入活动名称', //输入不符合时的提示
          reg: '',//正则
          show: '',//什么情况下显示
          min: 1, //最小字符数 
          max: 10, //最大字符数
        },
      ],
      typeInfo: [
        {  
          "value": "string",
          "lable": "字符串",
        },
        {  
          "value": "phone",
          "lable": "手机号",
        },
        {  
          "value": "mail",
          "lable": "邮箱",
        },
        {  
          "value": "bankCode",
          "lable": "银行卡号",
        },
        {  
          "value": "idCard",
          "lable": "身份证号",
        },
        {  
          "value": "number",
          "lable": "数字",
        },
        {  
          "value": "text",
          "lable": "文本域",
        },
        {  
          "value": "boolean",
          "lable": "布尔(是否)",
        },
        {  
          "value": "password",
          "lable": "密码",
        },
        {  
          "value": "radio",
          "lable": "单选",
        },
        {  
          "value": "checkbox",
          "lable": "多选",
        },
        {  
          "value": "select",
          "lable": "下拉",
        },
        {  
          "value": "date",
          "lable": "日期",
        },
        {  
          "value": "time",
          "lable": "时分秒时间点",
        },
        {  
          "value": "dateTime",
          "lable": "具体时间点",
        },
        {  
          "value": "datetimerange",
          "lable": "时间范围",
        },
        {  
          "value": "upload",
          "lable": "图片上传"
        },
        {  
          "value": "color",
          "lable": "颜色选择"
        },
        {  
          "value": "address",
          "lable": "地址选择"
        },
        {  
          "value": "editor",
          "lable": "富文本编辑"
        },
        {  
          "value": "array",
          "lable": "可增加单个输入类型",
        },
        {  
          "value": "arrayObj",
          "lable": "可增加对象输入",
        },
      ]
        
    }
  },

  created() {

  },

  mounted() {

  },

  computed: {
    rules() {
      let rules = []
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
      console.log(rules);
      return rules;
    }
  },

  methods: {
    change(val) {
      this.$emit('input', this.config.key, val)
    }
  },
}

</script>