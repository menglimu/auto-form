<template>
  <div class="manage_page fillcontain">
      <el-menu class="menu" :default-active="defaultActive" style="min-height: 100%;" router background-color="#324057" text-color="#fff" active-text-color="#ffd04b">
        <template v-for="(routerItem, index) in routerInfo">
          <el-menu-item index="manage" :index="'/'+routerItem.path" v-if="!routerItem.children||routerItem.children.length==0"><i class="el-icon-menu"></i>{{routerItem.name}}</el-menu-item>
          <el-submenu v-else>
            <template slot="title"><i v-if="routerItem.meta.icon" :class="routerItem.meta.icon"></i>{{routerItem.name}}</template>
            <el-menu-item :key="index" v-for="(child, index) in routerItem.children" :index="'/'+routerItem.path+'/'+child.path">{{child.name}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
      <keep-alive v-if="!$route.meta.noKeepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
  </div>
</template>
<script>
import {routerInfo} from './../router'
export default {
    components: {},
    data() {
      return {
        routerInfo,
      }
    },
    created() {
      
    },
    mounted() {

    },
    methods: {

    },
    watch: {
      '$route' (to, from) {
      let isBack = this.$router.isBack;
      if(isBack){
        this.$router.isBack = false;
        this.transitionName = 'slide-right';
      }else{
        this.transitionName = 'slide-left';
      }
      }
  },
  computed: {
    defaultActive: function() {
      return this.$route.path //.replace('/', '');
    }
  },
}

</script>
<style lang="scss" scoped>
.manage_page {
  min-width: 1200px;
  @include inline(2);
  align-items: flex-start;
  .menu{
    width: 200px;
  }
  .menu-box {
    min-height: 100%;
    background-color: #324057;
    // min-width: 200px;
    .menu{
    	border-right: 0;
    }
  }
}

</style>


	