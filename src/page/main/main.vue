<style lang="scss" scoped>
  .lm-form-inline .el-input{
    width: 150px;
  }
</style>
<template>
  <div>
  </div>
</template>
<script>
// import msvideo from '@/components/video/video'
export default {
  components: {

  },

  data() {
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
          lable: '用户名', //输入框前显示
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

  },

  methods: {

  },
}

</script>