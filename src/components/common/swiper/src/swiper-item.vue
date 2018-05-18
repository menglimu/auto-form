<template>
    <div class="swiper-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'swiper-item',
        mounted() {
            this.$parent.init();
        }
    }
</script>
