<!-- multi 是否多选 
    radioData 选项数组[
                {checked:false,label:'木有法',img:"",disabled:true,value:muyoufa},
            ]
    left 左对齐
-->
<style lang="scss">
@import './../../css/mixin.scss';
.lm-radio-group {
  border-bottom: 0.01rem solid #e7e7e7;
  .lm-radio-row {
    @include inline($class: '.text') height: 0.8rem;
    margin: 0 0.3rem;
    border-bottom: 0.01rem solid #e7e7e7;
    img {
      width: 0.48rem;
    }
    &.left {
      .text {
        text-align: right;
        padding-right: 0.2rem;
      }
      @for $i from 1 through 3 {
        &>*:nth-child(#{$i}) {
          order: (4 - $i);
        }
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
}

</style>
<template>
  <div class="lm-radio-group">
    <div v-for="(val, index) in radio" class="lm-radio-row" :class="{left:left}" @click="checkAction(index)">
      <img v-if="val.img" :src="val.img">
      <span class="text">{{val.label}}</span>
      <check :value="val.checked" @input="checkInput(arguments[0],index)"></check>
      <!-- @input="checkInput(arguments[0],index)" -->
    </div>
  </div>
</template>
<script>
import check from "./check"
export default {
  components: {
    check,
  },
  props: {
    "radioData": {
      type: Array
    },
    "multi": {
      type: Boolean,
      default: false,
    },
    "left": {
      type: Boolean,
      default: false,
    },
    "must": {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      radio: this.radioData,
      value: [],
    }
  },
  created() {
    for (var i = 0; i < this.radio.length; i++) {
      this.radio[i].checked && this.changeValue(this.radio[i].checked, i)
    }
  },
  methods: {
    checkAction(index) {
      this.changeValue(!this.radio[index].checked, index)
    },
    checkInput(val, index) {
      this.changeValue(val, index)
    },
    changeValue(val, index) {
      if (this.radio[index].disabled) {
        return;
      }

      if (!this.multi) {
        this.checkFalse()
        if (this.must) {
          val = true
        }
        this.radio[index].checked = val
        this.$emit('input', val && (this.radio[index].value || index) || false);
      } else {
        if (this.must && this.value.length == 1) {
          if (this.radio[index].checked && !val) {
            val = true
          }
        }
        this.radio[index].checked = val
        this.value = []
        for (var i = 0; i < this.radio.length; i++) {
          this.radio[i].checked && this.value.push(this.radio[i].value || i)
        }
        this.$emit('input', this.value);
      }
    },
    //循环设置单选为false
    checkFalse() {
      for (var i = 0; i < this.radio.length; i++) {
        this.radio[i].checked = false;
      }
    }
  },
  computed: {

  },
}

</script>
