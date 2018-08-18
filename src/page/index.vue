<template>
  <mlMenu></mlMenu>
</template>
<script>
import mlMenu from "@view/menu" // router
export default {
  components: {mlMenu},
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


</style>


	