<template>
<div>
    <keep-alive>
        <router-view  v-if="!$route.meta || !$route.meta.noKeepAlive"></router-view>
    </keep-alive>
    <router-view  v-if="$route.meta && $route.meta.noKeepAlive"></router-view>
</div>
</template>
<script type="text/javascript">
	export default{

	}
</script>