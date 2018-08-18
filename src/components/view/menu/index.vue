<template>
<div class="manage_page fillcontain">
  <el-menu @select="selectTop" class="top-menu" :default-active="activeTop" mode="horizontal" :background-color="main" text-color="#fff" :active-text-color="active">
    <img src="~@assets/images/logo.png" alt="logo" class="logo">
    <div class="menu-box"> <!-- el-scrollbar -->
      <el-menu-item class="item" v-for="(router, index) in routerInfo" v-if="router.meta.hasPower&&!router.meta.noShowMenu" :key="index" :index="router.path">
        <i :class="router.meta.icon" v-if="router.meta&&router.meta.icon"></i>{{router.name}}
      </el-menu-item>
    </div>
    <div class="user-info">
      <img src="~@assets/images/default_head.png" alt="头像">
      <el-dropdown class="name">
        <span class="el-dropdown-link">
          {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>锁定</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
  <el-menu class="menu" v-if="activeRouter&&activeRouter[0].children" :default-active="defaultActive" style="min-height: 100%;" router :background-color="main" text-color="#fff" :active-text-color="active">
    <menuItem v-for="(router, index) in activeRouter[0].children" v-if="router.meta.hasPower&&!router.meta.noShowMenu" :key="index" :router="router" :url="'/'+activeRouter[0].path+'/'"></menuItem>
  </el-menu>
  <div v-else class="menu bg"></div>
  <router class="router"></router>
</div>
  
</template>
<script>
import menuItem from "./menuItem" // router
import router from "@common/router" // router
import {themes, getStore} from "@/utils"

export default {
  components: { menuItem, router, },
  // props: ['routerInfo'],
  data() {
    return {
      main: null,
      active: null,
      name: null,
      activeRouter: null,
    }
  },
  created() {
    let theme = getStore("theme") || "default"
    this.name = getStore("token")
    this.setColor(theme)
    this.$bus.$on("changeTheme",this.setColor)
    this.activeTop = this.$route.path.split('/')[1]
    this.selectTop(this.activeTop)
  },
  mounted() {},
  methods: {
    setColor(theme) {
      this.main = themes[theme].main
      this.active = themes[theme].active
    },
    selectTop(index) {
      this.activeRouter = this.routerInfo.filter(val => val.path === index)
    }
  },
  watch: {},
  computed: {
    defaultActive() {
      this.activeTop = this.$route.path.split('/')[1]
      console.log(this.activeTop);
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
  
  .manage_page {
    min-width: 1200px;
    @include inline(2);
    align-items: flex-start;
    padding-left: 200px;
    padding-top: 64px;
    .top-menu{
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      // padding-left: 200px;
      z-index: 10;
      display: flex;
      align-items: center;
      padding-bottom: 3px;
      .logo{
        height: 60px;
        width: 200px;
      }
      .menu-box{
        flex: 1;
        .item{
          float: left;
          height: 60px;
          line-height: 60px;
          margin: 0;
          border-bottom: 2px solid transparent;
        }
      }
      .user-info{
        padding: 0 20px;
        &>img{
          width: 30px;
          height: 30px;
          border-radius: 100%;
          vertical-align: middle;
        }
        .name{
          cursor: pointer;
          color: #fff;
        }
      }
    }
    .menu{
      width: 200px;
      min-height: 100%;
      position: fixed;
      left: 0;
      top: 60px;
      z-index: 10;
      overflow: hidden;
      border-right: 0;
    }
    .router{
      min-height: 100%;
      min-width: 100%;
    }
  }
</style>


    