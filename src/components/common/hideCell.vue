<!-- 
    头部使用template传入slot=title
    
 -->
<style lang="scss" scoped>
    // @import './../../css/mixin.scss';
    .cell{
        border-top: 0!important;
    }
</style>
<template>
	<div class="ms-hide-cell">
        <div class="title" @click="changeState">
            <cell :icon='icon' class="cell">
                <slot name="title"></slot>
            </cell>
        </div>
        <div v-show="!contentHide" class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    import cell from './cell'
    export default {
		props: {
			hide:{
                type: null,
                default: true,
            }
		},
		components: { 
            cell
		},
		
    	data(){
            return{
                contentHide : this.hide
            }
        },
		
        created(){
           
        },
		
        mounted(){
            
        },
		
        computed: {
            icon() {
                return this.contentHide ? 'ion-ios-arrow-right' : 'ion-ios-arrow-down'
            }
        },
		
        methods: {
            changeState() {
                this.contentHide = !this.contentHide
            }
        },
    }
</script>