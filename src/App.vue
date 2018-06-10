<template>
<div id="app" class="full">
    <router-view class="full"></router-view>
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
    
    // this.$http.post('msg').then(res => {
    //   console.log(res)
    // })
  },
  methods: {

  },
}
</script>

<style lang="scss">
  @import "./style/style.scss";
  html,body{
    padding: 0;
    margin: 0;
  }
  html,body,.full{
    height: 100%;
    width: 100%;
  }
</style>
