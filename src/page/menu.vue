<template>
  <div class="manage_page fillcontain">
      <mlMenu class="menu"></mlMenu>
      <router></router>
  </div>
</template>
<script>
import router from "@common/router" // router
import mlMenu from "@view/menu" // router
export default {
  components: {router,mlMenu},
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
      
  },
  watch: {
  },
  computed: {
    defaultActive: function() {
      console.log(this.$router)
      return this.$route.meta.index || this.$route.path
    }
  },
}

</script>
<style lang="scss" scoped>
.manage_page {
  min-width: 1200px;
  @include inline(2);
  align-items: flex-start;
  padding-left: 200px;
  .menu{
    width: 200px;
    position: fixed;
    left: 0;
    overflow: hidden;
  }
}

</style>


	