<template>
<div class="router-box">
    <keep-alive>
        <router-view  v-if="!$route.meta || !$route.meta.noKeepAlive"></router-view>
    </keep-alive>
    <router-view  v-if="$route.meta && $route.meta.noKeepAlive"></router-view>
</div>
</template>
<script type="text/javascript"> 
export default { 
  //   render: function(createElement) {
  //       if(this.$route.meta && this.$route.meta.noKeepAlive){
  //           return createElement("router-view");
  //       }else if(!this.$route.meta || !this.$route.meta.noKeepAlive){
  //           return createElement("keep-alive",[createElement("router-view")]);
  //       }else{
  //           console.log(213123);
  //       }
  //   }
};
</script>
<style lang="scss" scoped>
.router-box {
  height: 100%;
}
</style>
