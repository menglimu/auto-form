<style lang="scss">
.lm-check-icon {
  // width: 0.4rem;
  // height: 0.4rem;
  // border: 0.02rem solid #ccc;
  border-radius: 50%; // @extend %flex-middle;
  // @include badge(0.4rem);
  display: inline-block;
  font-size: 0.4rem;
  font-weight: 600;
  color: #d2d2d2;
}

.lm-check-icon.checked {
  border: 0;
  color: #09BB07;
  &:before {
    opacity: 1;
  }
}

.lm-check-icon.disabled {
  background: #f3f3f3;
}

</style>
<template>
  <span class="lm-check-icon" :class="{
            'checked': value,
            'disabled': disabled,
            'ion-ios-circle-outline' : !value,
            'ion-checkmark-circled' : value
        }" @click="checkAction()">
    </span>
</template>
<script>
export default {
  props: {
    disabled: {
      type: null,
      default: false
    },
    value: {
      type: null,
      default: false
    },
  },
  methods: {
    checkAction() {
      if (!this.disabled) {
        this.$emit('input', !this.value)
      }
    },
  },
  computed: {
    // checkedSelf(){
    //     return this.checked
    // }
  },
}

</script>
