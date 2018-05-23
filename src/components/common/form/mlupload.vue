<style lang="scss" scoped>


</style>
<template>
  <el-upload name="files" ref="upload" list-type="picture" :action="uploadAction" :with-credentials="true" :auto-upload="false" :limit="limit" :file-list="fileList" :on-change="change" :on-remove="change" :multiple="multipleChild">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadSubmit">上传到服务器</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="clearUpload">清除所有文件</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
  </el-upload>
</template>
<script>
// import msvideo from '@/components/video/video'
export default {
  components: {

  },
  name: 'mlupload',
  data() {
    if (this.value) {
      var pic = this.value.split(",")
      var fileList = []
      for (var i = 0; i < pic.length; i++) {
        fileList.push({
          name: '',
          fileId: pic[i],
          url: 'fastDfsView.action?fileId=' + pic[i],
        })
      }
    }
    var multipleChild = this.multiple
    if (this.limit == 1) {
      multipleChild = false
    }
    return {
      fileList: fileList,
      multipleChild: multipleChild
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    //上传数量
    limit: {
      type: null,
      default: 99,
    },
    //是否可以多选
    multiple: {
      type: null,
      default: true
    },
    //上传地址
    uploadAction: {
      type: null,
      default: '/fastDfsUpload.action'
    }
  },
  methods: {
    uploadSubmit: function() {
      this.$refs.upload.submit();
    },
    clearUpload: function() {
      this.$refs.upload.clearFiles()
      this.$emit('input', '')
    },
    change: function(file, fileList) {
      var pic = ''
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].status == "success") {
          if (fileList[i].fileId) {
            pic += fileList[i].fileId + ','
          } else if (fileList[i].response) {
            pic += fileList[i].response.attrs.fileId + ','
          }
        }
      }
      if (pic) {
        pic = pic.substr(0, pic.length - 1)
      }
      if (pic != this.value) {
        this.$emit('input', pic)
      }

    },
  }
}

</script>
