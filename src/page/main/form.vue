<style lang="scss" scoped>
  .lm-form-inline .el-input{
    width: 150px;
  }
</style>
<template>
  <div class="form">
      <mlform ref='form' :config="config2" v-model="userInput"></mlform>
      <el-button @click='submitBtnClick'>提交</el-button>
      {{userInput}}
      <el-input type="text" v-model="input"></el-input>
  </div>
</template>
<script>
import mlform from "@/components/common/form"
import {setSession} from "@/utils"
export default {
  components: {
    mlform
  },

  data() {
    return {
      input: "",
      config: {
        labelWidth: "100px",
        inline: true,
        dataList:[
          {
            type: "string",//
            key: "name",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: true,//什么情况下显示
            label: "用户名", //输入框前显示
            placeholder: "请输入用户名", //
            error: "请输入活动名称", //输入不符合时的提示
            reg: "",//正则

            prepend: "前头",
            append: "后头",
            remark: "密码为你的用户名",//显示在输入框后的文字

            block: true,//独占一行

            width: "60px",

            min: 1, //最小字符数 
            max: 10, //最大字符数
          },
          {
            type: "phone",//
            key: "phone",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "13712349654", //默认值
            show: true,//什么情况下显示
            label: "手机号", //输入框前显示
          },
          {
            type: "mail",//
            key: "mail",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "邮箱", //输入框前显示
          },
          {
            type: "bankCode",//
            key: "bankCode",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "银行卡号", //输入框前显示
          },
          {
            type: "idCard",//
            key: "idCard",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "身份证号", //输入框前显示
          },
          {
            type: "text",//
            key: "text",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "文本域", //输入框前显示
          },
          {
            type: "boolean",//
            key: "boolean",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "不二", //输入框前显示
          },
          {
            type: "number",//
            key: "number",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "数字", //输入框前显示
          },
          {
            type: "password",//
            key: "password",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "select==选项2",//什么情况下显示
            label: "密码", //输入框前显示
          },
          {
            type: "password",//
            key: "password1",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "密码", //输入框前显示
          },
          {
            type: "select",//
            key: "select",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "下拉", //输入框前显示
            multiple: true,//是否多选
            options: [{
              value: "选项1",
              label: "黄金糕",
              disabled: true
            }, {
              value: "选项2",
              label: "双皮奶"
            }, {
              value: "选项3",
              label: "蚵仔煎"
            }, {
              value: "选项4",
              label: "龙须面"
            }, {
              value: "选项5",
              label: "北京烤鸭"
            }],
          },
          {
            type: "radio",//
            key: "radio",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "单选", //输入框前显示
            options: [{
              value: "选项1",
              label: "黄金糕",
              disabled: true
            }, {
              value: "选项2",
              label: "双皮奶"
            }, {
              value: "选项3",
              label: "蚵仔煎"
            }, {
              value: "选项4",
              label: "龙须面"
            }, {
              value: "选项5",
              label: "北京烤鸭"
            }],
          },
          {
            type: "checkbox",//
            key: "checkbox",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "多选", //输入框前显示
            options: [{
              value: "选项1",
              label: "黄金糕",
              disabled: true
            }, {
              value: "选项2",
              label: "双皮奶"
            }, {
              value: "选项3",
              label: "蚵仔煎"
            }, {
              value: "选项4",
              label: "龙须面"
            }, {
              value: "选项5",
              label: "北京烤鸭"
            }],
          },
          {
            type: "date",//
            key: "date",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "日期", //输入框前显示
          },
          {
            type: "time",//
            key: "time",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "时间", //输入框前显示
          },
          {
            type: "dateTime",//
            key: "dataTime",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "日期时间", //输入框前显示
          },
          {
            type: "datetimerange",//
            key: "datetimerange",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "日期范围", //输入框前显示
          },
          {
            type: "timerange",//
            key: "timerange",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "时间范围", //输入框前显示
          },
          {
            type: "color",//
            key: "color",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "颜色", //输入框前显示
          },
          {
            type: "upload",//
            key: "upload",    //输出的key
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "图片上传", //输入框前显示
            limit: 1,
          },
          {
            type: "editor",//
            key: "editor",    //输出的key
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "富文本", //输入框前显示

            defaultMsg: "1231阿萨德312", //默认值
            config: {},
          },
          {
            type: "object",//
            key: "object",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "用户名", //输入框前显示
            placeholder: "请输入用户名", //
            error: "请输入活动名称", //输入不符合时的提示
            reg: "",//正则

            accordion: true, //手风琴模式(只激活显示一个)

            child:[
              {
                type: "time",//
                key: "time",    //输出的key
                readonly: false,//只读 
                disabled: false,//不可操作
                must: true, //必填
                value: "", //默认值
                show: "$_root.select==选项2",//什么情况下显示
                label: "时间", //输入框前显示
              },
              {
                type: "phone",//
                key: "phone",    //输出的key
                readonly: false,//只读 
                disabled: false,//不可操作
                must: true, //必填
                value: "13712349654", //默认值
                show: "$_parent.radio=选项3",//什么情况下显示
                label: "手机号", //输入框前显示
              },
              {
                type: "radio",//
                key: "radio",    //输出的key
                readonly: false,//只读 
                disabled: false,//不可操作
                must: true, //必填
                value: "", //默认值
                show: "",//什么情况下显示
                label: "单选", //输入框前显示
                options: [{
                  value: "选项1",
                  label: "黄金糕",
                  disabled: true
                }, {
                  value: "选项2",
                  label: "双皮奶"
                }, {
                  value: "选项3",
                  label: "蚵仔煎"
                }, {
                  value: "选项4",
                  label: "龙须面"
                }, {
                  value: "选项5",
                  label: "北京烤鸭"
                }],
              },
              {
                type: "mail",//
                key: "mail",    //输出的key
                readonly: false,//只读 
                disabled: false,//不可操作
                must: true, //必填
                value: "", //默认值
                show: "",//什么情况下显示
                label: "邮箱", //输入框前显示
              },
              {
                type: "object",//
                key: "object",    //输出的key
                readonly: false,//只读 
                disabled: false,//不可操作
                must: true, //必填
                value: "", //默认值
                show: "",//什么情况下显示
                label: "用户名", //输入框前显示
                placeholder: "请输入用户名", //
                error: "请输入活动名称", //输入不符合时的提示
                reg: "",//正则

                child:[
                  {
                    type: "time",//
                    key: "time",    //输出的key
                    readonly: false,//只读 
                    disabled: false,//不可操作
                    must: true, //必填
                    value: "", //默认值
                    show: "$_root.select==选项2",//什么情况下显示
                    label: "时间", //输入框前显示
                  },
                  {
                    type: "phone",//
                    key: "phone",    //输出的key
                    readonly: false,//只读 
                    disabled: false,//不可操作
                    must: true, //必填
                    value: "13712349654", //默认值
                    show: "$_parent.radio=选项3",//什么情况下显示
                    label: "手机号", //输入框前显示
                  },
                  {
                    type: "radio",//
                    key: "radio",    //输出的key
                    readonly: false,//只读 
                    disabled: false,//不可操作
                    must: true, //必填
                    value: "", //默认值
                    show: "",//什么情况下显示
                    label: "单选", //输入框前显示
                    options: [{
                      value: "选项1",
                      label: "黄金糕",
                      disabled: true
                    }, {
                      value: "选项2",
                      label: "双皮奶"
                    }, {
                      value: "选项3",
                      label: "蚵仔煎"
                    }, {
                      value: "选项4",
                      label: "龙须面"
                    }, {
                      value: "选项5",
                      label: "北京烤鸭"
                    }],
                  },
                ]
              },
            ]
          },
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
          //       "label": "多选",
          //     },
          //     {  
          //       "value": "select",
          //       "label": "下拉",
          //     },
          //     {  
          //       "value": "date",
          //       "label": "日期",
          //     },
          //   ]
          // },
        ],
      },
      config1: {
        // inline: false,
        labelWidth: "100px",
        dataList: [
          {
            type: "password",//
            key: "password",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "密码", //输入框前显示
          },
          {
            type: "mapChose",//
            key: "mapChose",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "选择位置", //输入框前显示
          },
          {
            type: "password",//
            key: "password1",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "this._thisVal.select==2",//什么情况下显示
            label: "密码1", //输入框前显示
          },
          {
            type: "select",//
            key: "select",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "下拉", //输入框前显示
            multiple: true,//是否多选
            options: [{
              value: "选项1",
              label: "黄金糕",
              disabled: true
            }, {
              value: "2",
              label: "双皮奶"
            }, {
              value: "选项3",
              label: "蚵仔煎"
            }, {
              value: "选项4",
              label: "龙须面"
            }, {
              value: "选项5",
              label: "北京烤鸭"
            }],
          },
          {
            type: "object",//
            key: "object",    //输出的key
            readonly: false,//只读 
            disabled: false,//不可操作
            must: true, //必填
            value: "", //默认值
            show: "",//什么情况下显示
            label: "用户名", //输入框前显示
            placeholder: "请输入用户名", //
            error: "请输入活动名称", //输入不符合时的提示
            reg: "",//正则

            accordion: true, //手风琴模式(只激活显示一个)

            child:[
              {
                type: "time",//
                key: "time",    //输出的key
                readonly: false,//只读 
                disabled: false,//不可操作
                must: true, //必填
                value: "", //默认值
                show: "",//什么情况下显示
                label: "时间", //输入框前显示
              },
            ]
          },
        ]
      },
      config2: {
        labelWidth: '2rem',
        inline: false,
        dataList: [
          {
            type: "boolean",//
            key: "inline",    //输出的key
            value: false, //默认值
            label: "行内模式", //输入框前显示
          },
          {
            type: "boolean",//
            key: "table",    //输出的key
            value: true, //默认值
            label: "表格配置", //输入框前显示
            remark: "加入表格配置，增删改查基础操作",
          },
          {
            type: "string",//
            key: "tableKey",    //输出的key
            label: "组件ID名", //输入框前显示
            value: "id",
            remark: "唯一主键的键名",
            show: "this._thisVal.table==true",
            block: true, //块级显示
            must: true,
            placeholder: "请输入键名", //
          },
          {
            type: "string",//
            key: "labelWidth",    //输出的key
            label: "label宽度", //输入框前显示
            value: "100px",
            remark: "输入框前的文字宽度，如100px,1rem,1em",
            block: true, //块级显示
            placeholder: "请输入用户名", //
          },
          {
            type: "string",//
            key: "inputWidth",    //输出的key
            label: "行内宽度", //输入框前显示
            show: "this._thisVal.inline==true",
            value: "33.33%",
            remark: "行内模式，输入项的长度，用百分比，如25%",
            block: true, //块级显示
            must: true,
            placeholder: "输入项宽度", //
          },
          {
            type: "object",//
            key: "dataList",    //输出的key
            label: "输入项", //输入框前显示
            error: "请输入活动名称", //输入不符合时的提示
            title: "label", //显示的title
            accordion: true, //手风琴模式(只激活显示一个)
            labelWidth: "100px",
            dataList:[
              {
                type: "select",//
                key: "type",    //输出的key
                readonly: false,//只读 
                disabled: false,//不可操作
                must: true, //必填
                value: "", //默认值
                // show: "",//什么情况下显示
                label: "下拉", //输入框前显示
                multiple: false,//是否多选
                remark: "选择输入框的类型",//显示在输入框后的文字
                options: [{  
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
                  "label": "日期范围",
                },
                {  
                  "value": "timerange",
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
                  "value": "object",
                  "label": "可增加输入对象"
                },
                {  
                  "value": "array",
                  "label": "可增加单个输入类型(未实现)",
                },
                ],
              },
              

              {
                type: "string",//
                key: "label",    //输出的key
                must: true, //必填
                label: "输入项label", //输入框前显示
                remark: "输入框前显示",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "key",    //输出的key
                must: true, //必填
                label: "输出的key", //输入框前显示
                remark: "输出的key,变量名，为英文不重复",//显示在输入框后的文字
              },
              {
                type: "object",
                key: "options",
                must: true,
                label: "数据源",
                show: "this._thisVal.type == 'select'||this._thisVal.type == 'radio'||this._thisVal.type == 'checkbox'",
                dataList: [
                  {
                    type: "string",//
                    key: "label",    //输出的key
                    must: true, //必填
                    label: "显示的名字", //输入框前显示
                    // remark: "输出的key,变量名，为英文不重复",//显示在输入框后的文字
                  },
                  {
                    type: "string",//
                    key: "value",    //输出的key
                    must: true, //必填
                    label: "存储的值", //输入框前显示
                    // remark: "输出的key,变量名，为英文不重复",//显示在输入框后的文字
                  },
                ],
              },
              {
                type: "boolean",//
                key: "showTable",    //输出的key
                show: "this._parentVal.table==true",
                value: true, //默认值
                label: "表格中显示", //输入框前显示
              },
              {
                type: "boolean",//
                key: "tableSearch",    //输出的key
                show: "this._parentVal.table==true",
                value: false, //默认值
                label: "表格搜索头", //输入框前显示
              },
              {
                type: "string",//
                key: "tableSearchDefault",    //输出的key
                show: "this._parentVal.table==true", 
                label: "搜索默认值", //输入框前显示
              },
              {
                type: "string",//
                key: "value",    //输出的key
                label: "默认值", //输入框前显示
                remark: "输入项的默认值，自动填充到输入框",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "show",    //输出的key
                label: "显示条件", //输入框前显示
                remark: "控制该输入项的显示隐藏，为js代码，如：this._thisVal.select==2。_thisVal表示当前对象，_rootVal表单根对象，_parentVal父对象",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "placeholder",    //输出的key
                label: "提示", //输入框前显示
                remark: "输入框内的提示",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "error",    //输出的key
                label: "错误提示", //输入框前显示
                remark: "输入不符合规则时的提示",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "reg",    //输出的key
                label: "正则", //输入框前显示
                remark: "正则验证表达式",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "prepend",    //输出的key
                label: "头部", //输入框前显示
                remark: "输入框内头部显示内容",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "append",    //输出的key
                label: "尾部", //输入框前显示
                remark: "输入框内尾部显示内容",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "remark",    //输出的key
                label: "备注尾部", //输入框前显示
                remark: "输入框后的备注内容",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "min",    //输出的key
                label: "最小输入长度", //输入框前显示
                remark: "纯数字",//显示在输入框后的文字
              },
              {
                type: "string",//
                key: "max",    //输出的key
                label: "最大输入长度", //输入框前显示
                remark: "纯数字",//显示在输入框后的文字
              },


              // min: 1, //最小字符数 
              // max: 10, //最大字符数
              {
                type: "boolean",//
                key: "must",    //输出的key
                value: false, //默认值
                label: "是否为必填项", //输入框前显示
              },
              {
                type: "boolean",//
                key: "readonly",    //输出的key
                value: false, //默认值
                label: "是否只读", //输入框前显示
              },
              {
                type: "boolean",//
                key: "disabled",    //输出的key
                value: false, //默认值
                label: "是否不可操作", //输入框前显示
              },
            ]
          },
        ]
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
      // this.$bus.$emit("config", this.userInput)
      setSession("config",this.userInput)
      this.$router.push("/test/formTest")
      console.log(this.$refs["form"].validate())
      
    }
  },
}

</script>