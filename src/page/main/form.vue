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
import mlform from '@/components/common/form/mlform'
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
            show: '',//什么情况下显示
            label: '用户名', //输入框前显示
            placeholder: '请输入用户名', //
            error: '请输入活动名称', //输入不符合时的提示
            reg: '',//正则

            min: 1, //最小字符数 
            max: 10, //最大字符数
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