<style lang="scss" scoped>
div{
		z-index: 999;
    background-color: rgba(0,0,0,0.8);
    position: fixed;
    @include pos(0);
}
</style>
<template>
	<transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div v-if="popList.length>0"></div>
  </transition>
</template>
<script>
export default {
  data(){
    return {
      popList: []
    }
  },
  methods: {
    close() {
      this.popList = []
    },
    //遮罩加一次
    push() {
      this.popList.push(1)
    },
    //遮罩减一次
    delete() {
      this.popList.pop()
    }
  }
}
</script>