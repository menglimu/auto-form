<!--
<msbasePicker :initFirst="false" :data="squareData" v-model="sendData.houseSize"></msbasePicker>
data:[{code:'01',text:'5年',}, {code:'02',text: '10年',}, {code:'03',text: '15年'}, {code:'04',text: '20年'}, {code:'05',text: '25年'}
value 返回code值
 -->
<style lang="scss" scoped>
.picker-box {
  position: absolute;
  bottom: 0;
  background: #fff;
  width: 100%;
  .btn-box {
    padding: 0 0.2rem 0 0.2rem;
    font-size: 0.32rem!important;
    background: #f3f3f3;
  }
}
.showVal{
  width: 100%;
  height: 100%;
}
</style>
<template>
<div>
  <div class="showVal" @click="showPop">
    <template v-if="value&&slots.length>0">{{codeToName}}</template>
    <span v-else>{{placeholder}}</span>
  </div>
  <div v-show="popShow" class="msui-mask">
    <div class="picker-box">
      <div class="msui-row flex-box btn-box msui-color-blue">
        <div class="box msui-text-left" @click="close">取消</div>
        <div class="box msui-text-right" @click="sure">确定</div>
      </div>
      <mt-picker ref='picker' v-if="slots.length>0" :valueKey="textKey" :slots="showData" @change="onChange"></mt-picker>
    </div>
  </div>
</div>
</template>
<script>

export
default {
  components: {
  },
  props: {
    value: {
      type: null,
      default: '',
    },
    data: {
      type: null,
      default: [],
    },
    //取值的键名
    valueKey: {
      type: null,
      default: "code"
    },
    //显示的键名
    textKey: {
      type: null,
      default: "text"
    },
    //是否需要默认值
    initFirst: {
      type: null,
      default: true
    },
    placeholder: {
      type: null,
      default: '请选择'
    }
  },
  data() {
    let slots = []
    if (typeof(this.data[0])!='object') {
      for (var i = 0; i < this.data.length; i++) {
        slots.push({
          code: this.data[i],
          text: this.data[i]
        })
      }
    }else{
      slots = this.data
    }
    let defaultIndex = 0
    if (this.value) {
     defaultIndex = slots.findIndex(value => value[this.valueKey] == this.value)
    }
    return {
      popShow: false,
      showData: [{
        flex: 1,
        values: slots,
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: defaultIndex,
      }],
      choseVal: '',
      slots: slots,
      choseObj: '',
    }
  },
  created() {
     this.showData[0].valueKey = this.data.valueKey;
  },
  methods: {
    sure() {
      this.$emit('input',this.choseVal)
      this.$emit('change',this.choseObj)
      this.close()
    },
    close() {
      this.popShow = false
    },
    onChange(index, val) {
      this.choseVal = val[0][this.valueKey]
      this.choseObj = val[0]
      if (!this.value && this.initFirst) {
        this.$emit('input',this.choseVal)
        this.$emit('change',this.choseObj)
      }
    },
    showPop(){
      if(!this.slots || this.slots.length == 0){
        return
      }
      this.popShow = true
      if (this.value) {
        let obj = this.getObj(this.value) || this.slots[0]
        this.$refs.picker.setSlotValue(0, obj)
      }
    },
    getObj(val) {
      return this.slots.find(value => value[this.valueKey] == val)
    }
  },
  computed: {
    codeToName: function () {
      let val = this.getObj(this.value)
      if (val) {
        return val[this.textKey]
      }
      return ''
    }
  },
  watch: {
    data: function (val, oldVal) {
      let slots = []
      if (typeof(this.data[0])!='object') {
        for (var i = 0; i < this.data.length; i++) {
          slots.push({
            code: this.data[i],
            text: this.data[i]
          })
        }
      }else{
        slots = this.data
      }
      let defaultIndex = 0
      if (this.value) {
       defaultIndex = slots.findIndex(value => value[this.valueKey] == this.value)
      }
      this.showData[0].values = slots
      this.showData[0].defaultIndex = defaultIndex
      this.slots = slots;
      this.getObj(this.showData[0].valueKey);
    },
  }

}

</script>
