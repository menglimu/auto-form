<template>
    <el-menu-item :index="(router.meta&&router.meta.index)||(url+router.path)" v-if="!router.children||router.children.length==0">
        <i :class="router.meta.icon" v-if="router.meta&&router.meta.icon"></i>
        {{router.name}}
    </el-menu-item>

    <el-submenu v-else :index="(router.meta&&router.meta.index)||(url+router.path)">
        <template slot="title">
            <i v-if="router.meta.icon" :class="router.meta.icon"></i>{{router.name}}</template>
        <!-- 递归调用自身，直到router不含有子节点 -->
        <menuItem :key="index" v-for="(child, index) in router.children" :router="child" :url="url+router.path+'/'" v-if='child.meta.hasPower&&!child.meta.noShowMenu'>{{child.name}}
        </menuItem>
    </el-submenu>
</template>
<script>
export default {
  // 递归组件必须有name
  name: "menuItem",
  props: {
    router: null,
    url: {
      type: String,
      default: "/"
    }
  },
  data() {
    return {
      authority: {}
    }
  }
}
</script>