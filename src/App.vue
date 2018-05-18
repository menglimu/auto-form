<template>
<div id="app" class="full">
  <transition :name="transitionName">
      <router-view class="full"></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
       transitionName:"slide-left"
    }
  },
  created() {
    
  },
  methods: {

  },
}
</script>

<style lang="scss">
  @import "./style/style.scss";
  html,body,.full{
    height: 100%;
    width: 100%;
  }
</style>
