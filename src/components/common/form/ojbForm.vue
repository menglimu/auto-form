<style lang="scss" scoped>
.ojb-form{
  // display: inline-block;
  // margin-top: 20px;
  .button-new-tag{
    margin-left: 10px;
    height: 32px;
  }
  .el-tag{
    cursor: pointer;
    margin-left: 20px;
    margin-bottom: 8px;
    &.active{
      background-color: rgba(64, 158, 255, 0.63);
    }
  }
  // .btn-box{
  //   display: inline-flex;
  //   align-items: center;
  //   // alignment-adjust: middle;
  //   margin-bottom: 10px;
  //   .tag-box{
  //     flex: 1;
  //     // overflow-x: scroll;
  //     overflow-y: hidden;
  //     // height: 32px;
  //   }
  //   .button-new-tag{
  //     margin-left: 20px;
  //     height: 32px;
  //   }
  //   .el-tag{
  //     cursor: pointer;
  //     margin-left: 20px;
  //     &.active{
  //       background-color: rgba(64, 158, 255, 0.63);
  //     }
  //   }
  // }
  
  .form-box{
    margin-bottom: 22px;
  }
  .up{
    padding: 5px;
    margin-left: 20px;
  }
  .btn-box{
    margin-left: 5px;
  }
  .el-icon-success,.el-icon-error{
    margin-left: 30px;
    font-size: 20px;
    display: none;
    vertical-align: middle;
  }
  .el-icon-success{
    color: #67c23a;
  }
  .el-icon-error{
    color: #f56c6c;
  }
  .object-title-success{
    .el-icon-success{
      display: inline-block;
    }
  }
  .object-title-error{
    .el-icon-error{
      display: inline-block;
    }
  }
  .ojb-form-error{
    display: inline-block;
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-left: 10px;
  }
  .ojb-form-label{
    display: inline-block;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  .list-box{
    padding: 0 10px 10px;
    border-left: 1px solid #ebeef5;
  }
  &.required .ojb-form-label:before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  .title{
    padding-left: 10px;
    display: inline-block;
  }
}
</style>
<template>
<div class="ojb-form-box">
  <div class="ojb-form" :class="{required: required}">
    <span class="ojb-form-label" :style="{width: configAll.labelWidth}">{{config.label}}</span> <el-button class="button-new-tag" size="small" @click="add">新建{{config.label}}</el-button>
    <div v-if="validateState === 'error' && validateMessage" class="ojb-form-error">
      {{validateMessage}}
    </div>
    <!--  :value="btnActive" -->
    <el-collapse class="list-box" :style="{marginLeft: configAll.labelWidth}" :accordion='config.accordion' v-show="value&&value.length>0">
      <el-collapse-item :class="['object-title-'+validateResultArray[index]]" v-for="(item, index) in value" :key="index" :name="index">
        <template slot="title">
          <span :style="{width: config.labelWidth||configAll.labelWidth}" class="title">{{value[index][config.title] || config.label+(index+1)}}</span> 

          <el-button-group class="btn-box">
            <el-button type="primary" size="mini" :disabled='index==0' @click.stop="up(index)" icon="el-icon-caret-top">上移</el-button>
            <el-button type="primary" size="mini" @click.stop="tagClose(index)" icon="el-icon-delete">删除</el-button>
            <el-button type="primary" size="mini" :disabled="index==value.length-1" @click.stop="down(index)" icon="el-icon-caret-bottom">下移</el-button>
          </el-button-group>

          <i class="el-icon-success"></i>
          <i class="el-icon-error"></i>

        </template>

        <mlform :config="configForm" :rootVal="rootVal" :parentVal="parentVal" :value="item" @input="change(index,$event)" ref="form"></mlform>
      </el-collapse-item>
    </el-collapse>


  
    <!-- <el-tag class="el-tag" :key="index" :class="[{'active':index == btnActive}]" closable v-for="(item, index) in value" :disable-transitions="false" @click.native="changeTab(index)" @close="tagClose(index)"> 
      {{name}}{{index+1}}
    </el-tag>
    <el-button class="button-new-tag" size="small" @click="add">新建{{name}}</el-button>
    
    <!-- <div class="btn-box"></div> -->
    <!-- <div class="form-box" v-for="(item, index) in value" v-show="index == btnActive">
      <mlform :config="config" :rootVal="rootVal" :parentVal="parentVal" :value="item" @input="change(index,$event)"></mlform>
    </div> -->
    
  </div>
</div>
  
</template>
<script>
import mlform from './index.js'
export default {
  components: {
    mlform
  },
  props: {
    config:{
      type: Object,
      required: true,
    },
    configAll:{
      type: Object,
      required: true,
    },
    value:{
      type: null,
      required: true
    },
    rootVal:{
      type: null
    },
    parentVal:{
      type: null
    },
    // accordion:{ //手风琴模式
    //   type: Boolean,
    //   default: true,
    // },
    // 不能使用饿了么的item，会有样式问题
    // label: String,
    required: {
      type: Boolean,
      default: false,
    },
    error: String,
    validateStatus: String,

  },
  name: 'formObject',
  data() {
    return {
      configForm: Object.assign({},this.configAll,this.config),
      btnActive: 0,
      validateResultArray: [],
      validateMessage: '',
      validateState: '',
    }
  },

  created() {

  },

  mounted() {

  },

  computed: {
    
  },
  watch: {
    value() {
      let res = []
      for (var i = 0; i < this.value.length; i++) {
        res.push('')
      }
      this.validateResultArray = res
      for (var i = 0; i < this.value.length; i++) {
        let index = i
        this.$nextTick(function () {
          if (!this.$refs['form'][index].validateNoMsg()) {
            this.validateResultArray.splice(index,1,'error')
          }else{
            this.validateResultArray.splice(index,1,'success')
          }
          console.log(this.validateResultArray);
        })
      }
    },
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value;
        this.validateState = value ? 'error' : '';
      }
    },
    validateStatus(value) {
      this.validateState = value;
    }
  },
  methods: {
    //验证数据
    validate() {
      let validateResult = true
      for (var i = 0; i < this.value.length; i++) {
        if (!this.$refs['form'][i].validate()) {
          validateResult = false
        }
      }
      return validateResult;
    },
    validateNoMsg() {
      let validateResult = true
      for (var i = 0; i < this.value.length; i++) {
        if (!this.$refs['form'][i].validateNoMsg()) {
          validateResult = false
        }
      }
      return validateResult;
    },
    getOneNoMsg(i) {

      
      
    },


    change(index,val) {
      let obj = [...this.value]
      obj[index] = val
      this.$emit('input',obj)
    },
    up(index) {
      let obj = [...this.value]
      let val = obj[index]
      // obj.splice(index,1);
      // obj.splice(index-2,0,val);
      obj[index] = obj[index-1]
      obj[index-1] = val
      this.$emit('input',obj)
    },
    down(index) {
      let obj = [...this.value]
      let val = obj[index]
      obj[index] = obj[index+1]
      obj[index+1] = val
      this.$emit('input',obj)
      // [obj[index],obj[index+1]] = [obj[index+1],obj[index]]
    },
    add() {
      let obj = [...this.value]
      obj.push({})
      this.$emit('input',obj)
      this.btnActive = obj.length - 1
    },
    tagClose: function (index){
      let obj = [...this.value]
      obj.splice(index, 1);
      //   console.log(index,this.btnActive);
      // if (index < this.btnActive) {
      //   this.btnActive = obj.length - 1
      // }else if (index == this.btnActive) {
      //   this.btnActive = ''
      // }
      this.$emit('input',obj)
      
    },
    changeTab: function (index){
      this.btnActive = index
    },
  },
}

</script>
