<style lang="scss" scoped>
.ojb-form{
  // display: inline-block;
  // margin-top: 20px;
  .button-new-tag{
    margin-left: 20px;
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
    padding-left: 20px;
  }
}
</style>
<template>
  <div class="ojb-form">
    <el-tag class="el-tag" :key="index" :class="[{'active':index == btnActive}]" closable v-for="(item, index) in value" :disable-transitions="false" @click.native="changeTab(index)" @close="tagClose(index)"> 
      {{name}}{{index+1}}
    </el-tag>
    <el-button class="button-new-tag" size="small" @click="add">新建{{name}}</el-button>
    
    <!-- <div class="btn-box"></div> -->
    <div class="form-box" v-for="(item, index) in value" v-show="index == btnActive">
      <mlform :config="config" :rootVal="rootVal" :parentVal="parentVal" :value="item" @input="change(index,$event)"></mlform>
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
    name: {
      type: null,
    },
    configAll:{
      type: Object,
      required: true,
    },
    child: {
      type: Array,
      default: [],
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

  },
  name: 'formObject',
  data() {
    return {
      config: Object.assign({},this.configAll,{dataList: this.child}),
      btnActive: 0,
    }
  },

  created() {

  },

  mounted() {

  },

  computed: {

  },

  methods: {
    change(index,val) {
      let obj = [...this.value]
      obj[index] = val
      this.$emit('input',obj)
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
      if (index <= this.btnActive) {
        this.btnActive = obj.length - 1
      }
      this.$emit('input',obj)
      
    },
    changeTab: function (index){
      this.btnActive = index
    },
  },
}

</script>
