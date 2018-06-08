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
          "label": "字符串",
        },
        {  
          "value": "phone",
          "label": "手机号",
        },
        {  
          "value": "mail",
          "label": "邮箱",
        },
        {  
          "value": "bankCode",
          "label": "银行卡号",
        },
        {  
          "value": "idCard",
          "label": "身份证号",
        },
        {  
          "value": "number",
          "label": "数字",
        },
        {  
          "value": "text",
          "label": "文本域",
        },
        {  
          "value": "boolean",
          "label": "布尔(是否)",
        },
        {  
          "value": "password",
          "label": "密码",
        },
        {  
          "value": "radio",
          "label": "单选",
        },
        {  
          "value": "checkbox",
          "label": "多选",
        },
        {  
          "value": "select",
          "label": "下拉",
        },
        {  
          "value": "date",
          "label": "日期",
        },
        {  
          "value": "time",
          "label": "时分秒时间点",
        },
        {  
          "value": "dateTime",
          "label": "具体时间点",
        },
        {  
          "value": "datetimerange",
          "label": "时间范围",
        },
        {  
          "value": "upload",
          "label": "图片上传"
        },
        {  
          "value": "color",
          "label": "颜色选择"
        },
        {  
          "value": "address",
          "label": "地址选择"
        },
        {  
          "value": "editor",
          "label": "富文本编辑"
        },
        {  
          "value": "array",
          "label": "可增加单个输入类型",
        },
        {  
          "value": "object",
          "label": "可增加对象输入",
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