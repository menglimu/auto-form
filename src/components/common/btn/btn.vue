<!-- size：传值block为块级按钮  size?'lm-btn-'+size:'',
disabled：是否禁止点击，默认false,-->
<template>
  <button class="lm-button lm-btn-block" :class="[{'disabled':disabled}]" 
  @click.stop="onClick($event)">
    <slot></slot>
  </button>
</template>
<style lang='scss'>
  .lm-button {
    position: relative;
    overflow: hidden;
    border: none;
    border-radius: 4px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    /*默认尺寸*/
    margin: 0 auto;
    &.lm-btn-block {
      display: block;
      height: 0.75rem;
      background-image: linear-gradient(90deg, 
        #4989e7 0%, 
        #4985f4 100%), 
      linear-gradient(
        #e9e9e9, 
        #e9e9e9);
      background-blend-mode: normal, 
        normal;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.26rem;
      line-height: 0.75rem;
    }
    /*禁止点击*/
    &.disabled {
      color: #c3c3c3;
      background: #d9d9d9;
      cursor: not-allowed;
    }
  }
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: white;
    animation: ripple 1.5s;
    animation-fill-mode: forwards;
    pointer-events: none;
  }
  @keyframes ripple {
    from {
      transform: scale(1);
      opacity: 0.4;
    }
    to {
      transform: scale(50);
      opacity: 0;
    }
  }
</style>
<script>
  export default {
    props: ["size","disabled"],
    data() {
      return {
      }
    },
    ready() {
    },
    methods: {
      onClick(e) {
        if (this.disabled) {
          return
        }
        if (this.ripple) {
          this.$el.removeChild(this.ripple)
          clearInterval(this.timer)
        }
        let btn = this.$el
        let ripple = document.createElement('div')
        ripple.classList.add('ripple-effect')
        ripple.style.left = e.offsetX - 10 + 'px'
        ripple.style.top = e.offsetY - 10 + 'px'
        btn.appendChild(ripple)
        this.ripple = ripple
        this.timer = setTimeout(() => {
          btn.removeChild(this.ripple)
          this.ripple = false
        }, 1500)
        this.$emit("click")
      }
    }
  }
</script>