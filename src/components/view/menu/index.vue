<template>
  <el-menu class="menu" :default-active="defaultActive" style="min-height: 100%;" router :background-color="main" text-color="#fff" :active-text-color="active">
    <menuItem v-for="(router, index) in routerInfo" v-if="router.meta.hasPower&&!router.meta.noShowMenu" :key="index" :router="router"></menuItem>
  </el-menu>
</template>
<script>
import menuItem from "./menuItem" // router
import {themes, getStore} from "@/utils"

export default {
  components: { menuItem },
  // props: ['routerInfo'],
  data() {
    return {
      main: null,
      active: null
    }
  },
  created() {
    let theme = getStore("theme") || "default"
    this.setColor(theme)
    this.$bus.$on("changeTheme",this.setColor)
  },
  mounted() {},
  methods: {
    setColor(theme) {
      this.main = themes[theme].main
      this.active = themes[theme].active
    }
  },
  watch: {},
  computed: {
    defaultActive() {
      return this.$route.meta.index || this.$route.path
    },
    routerInfo() {
      for (var i = 0; i < this.$router.options.routes.length; i++) {
        if (this.$router.options.routes[i].path == "/") {
          return this.$router.options.routes[i].children
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>


    