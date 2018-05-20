<style lang="scss" scoped>
  .lm-form-inline .el-input{
    width: 150px;
  }
</style>
<template>
  <div class="form">
      <mlform :config="config" v-model="userInput"></mlform>
  </div>
</template>
<script>
import mlform from '@/components/common/form/mlform1'
export default {
  components: {
    mlform
  },

  data() {
    return {
      config: {
        dataList:[
          {
            type: 'string',//
            key: 'name',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: true,//什么情况下显示
            label: '用户名', //输入框前显示
            placeholder: '请输入用户名', //
            error: '请输入活动名称', //输入不符合时的提示
            reg: '',//正则

            min: 1, //最小字符数 
            max: 10, //最大字符数
          },
          {
            type: 'phone',//
            key: 'phone',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '13712349654', //默认值
            show: true,//什么情况下显示
            label: '手机号', //输入框前显示
          },
          {
            type: 'mail',//
            key: 'mail',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '邮箱', //输入框前显示
          },
          {
            type: 'bankCode',//
            key: 'bankCode',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '银行卡号', //输入框前显示
          },
          {
            type: 'idCard',//
            key: 'idCard',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '身份证号', //输入框前显示
          },
          {
            type: 'text',//
            key: 'text',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '文本域', //输入框前显示
          },
          {
            type: 'boolean',//
            key: 'boolean',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '不二', //输入框前显示
          },
          {
            type: 'number',//
            key: 'number',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '数字', //输入框前显示
          },
          {
            type: 'password',//
            key: 'password',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '密码', //输入框前显示
          },
          {
            type: 'select',//
            key: 'select',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '密码', //输入框前显示
            options: [{
              value: '选项1',
              label: '黄金糕',
              disabled: true
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
          },
          {
            type: 'radio',//
            key: 'radio',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '密码', //输入框前显示
            options: [{
              value: '选项1',
              label: '黄金糕',
              disabled: true
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
          },
          {
            type: 'checkbox',//
            key: 'checkbox',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '密码', //输入框前显示
            options: [{
              value: '选项1',
              label: '黄金糕',
              disabled: true
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
          },
          {
            type: 'date',//
            key: 'date',    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: '', //默认值
            show: '',//什么情况下显示
            label: '密码', //输入框前显示
          },
          // {
          //   type: 'array',//
          //   key: 'name',    //输出的key
          //   readonly: false,//只读 
          //   disabled: false,//不可操作
          //   must: true, //必填
          //   value: '', //默认值
          //   show: '',//什么情况下显示
          //   label: '用户名', //输入框前显示
          //   placeholder: '请输入用户名', //
          //   error: '请输入活动名称', //输入不符合时的提示
          //   reg: '',//正则

          //   child:[]
          // },
          // {
          //   type: 'checkbox',//
          //   key: 'type',    //输出的key
          //   readonly: false,//只读 
          //   disabled: false,//不可操作
          //   must: true, //必填
          //   value: '', //默认值
          //   show: '',//什么情况下显示
          //   label: '用户名', //输入框前显示
          //   placeholder: '请输入用户名', //
          //   error: '请输入活动名称', //输入不符合时的提示
          //   reg: '',//正则

          //   options: [
          //     {  
          //       "value": "checkbox",
          //       "lable": "多选",
          //     },
          //     {  
          //       "value": "select",
          //       "lable": "下拉",
          //     },
          //     {  
          //       "value": "date",
          //       "lable": "日期",
          //     },
          //   ]
          // },
        ],
      },
      userInput: {},
    }
  },

  created() {

  },

  mounted() {

  },

  computed: {

  },

  methods: {
    submitBtnClick: function () {
      // body...
    }
  },
}

</script>