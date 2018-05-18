<template>
    <input type="checkbox" class="m-switch" v-model="checked"/>
</template>

<script type="text/babel">
    /**
     * 不兼容鸟包火狐
     */
    export default {
        name: 'yd-switch',
        data() {
            return {
                checked: false
            }
        },
        props: {
            value: Boolean
        },
        watch: {
            checked(val) {
                this.$emit('input', val);
            }
        },
        mounted() {
            this.checked = this.value;
        }
    }
</script>

<style lang="scss">
    .m-switch {
      position: relative;
      display: block;
      width: 1rem;
      height: 0.64rem;
      left: 0;
      border: 0.02rem solid #DFDFDF;
      border-radius: 0.6rem;
      background-color: #DFDFDF;
      -webkit-appearance: none;
      -moz-appearance: none;
      &:before, &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 0.6rem;
        border-radius: 0.3rem;
        transition: transform .3s;
      }
      &:before {
        width: 1rem;
        background-color: #FDFDFD;
      }
      &:after {
        width: 0.6rem;
        background-color: #FFF;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
      }
      &:checked {
        border-color: #4CD864;
        background-color: #4CD864;
        &:before {
          transform: scale(0);
        }
        &:after {
          transform: translateX(0.4rem);
        }
      }
    }

</style>
