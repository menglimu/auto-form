<style lang="scss" scoped>
@import './../../../../css/mixin.scss';
.ms-mask-box {
  position: fixed;
  @include pos();
  z-index: 998;
  .ms-mask {
    @include pos();
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
<template>
  <div class="ms-mask-box" v-show="show">
    <div class="ms-mask" @click="hide"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    'show': {
      type: null,
      default: true,
    }
  },
  components: {

  },

  data() {
    return {

    }
  },

  created() {

  },

  mounted() {

  },

  computed: {

  },

  methods: {
    hide() {
      this.$emit('click', false)
    }
  },
}

</script>
