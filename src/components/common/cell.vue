<!-- 
    传入2个并列的div，第一个自动flex拉伸，
    icon，传入图标
 -->
<style lang="scss" scoped>
    @import './../../css/mixin.scss';
    .ms-cell{
        @include inline($class:'.ms-cell-main');
        font-size: 0.3rem;
        padding: 0.2rem;
        border-bottom: 1px solid #e7e7e7;
        .ms-cell-main{
            @include inline(1);
            // > *:last-child{
            //     text-align: right;
            // }
        }
        .right-icon{
            margin-left: 0.2rem;
        }
        &:first-child{
            border-top:  1px solid #e7e7e7;
        }
    }
	
</style>
<template>
	<div class="ms-cell">
        <div class="ms-cell-main">
            <slot></slot>
        </div>
        <div class="right-icon" v-if="icon" :class="[icon == 'null' ? '':icon]"></div>
    </div>
</template>

<script>
    export default {
		props: {
			icon:{
                type: null,
                default: 'ion-ios-arrow-right'
            }
		},
		components: { 
			
		},
		
    	data(){
            return{
                
            }
        },
		
        created(){
           
        },
		
        mounted(){
            
        },
		
        computed: {

        },
		
        methods: {

        },
    }
</script>