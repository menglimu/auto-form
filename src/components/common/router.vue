<template>
    <keep-alive v-if="!$route.meta||!$route.meta.noKeepAlive">
        <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
</template>
<script type="text/javascript">
	export default{

	}
</script>