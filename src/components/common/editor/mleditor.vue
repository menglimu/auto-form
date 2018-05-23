<style lang="scss" scoped>
</style>
<template>
  <div :id="id" type="text/plain"></div>
</template>
<script>
// 会报错，ueditor 通过标签去引入zh-cn.js和ueditor.css。不用管
import {createRandomId} from '@/global/msUtils'
require('./themes/default/css/ueditor.css');
require('./ueditor.config.js');
require('./ueditor.all.js');
require('./lang/zh-cn/zh-cn.js');
export default {
  name: 'UE',
  data () {
    return {
      editor: null,
      id: createRandomId()
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    },
    value: {
      type: null
    },
  },
  mounted() {
    this.editor = UE.getEditor(this.id, this.config); // 初始化UE
    this.editor.addListener("ready",  () => {
      if (this.value) {
        this.editor.setContent(this.value);
      }else if(this.defaultMsg){
        this.editor.setContent(this.defaultMsg);
      } // 确保UE加载完成后，放入内容。
    });
    this.editor.addListener("contentChange",() => {
      if (this.editor.getContent() == this.value) {
        return
      }
      this.$emit('input', this.getUEContent())
    });
  },
  methods: {
    getUEContent() { // 获取内容方法
      return this.editor.getContent()
    }
  },
  destroyed() {
    this.editor.destroy();
  }
}

</script>
