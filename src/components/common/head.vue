<style lang="scss" scoped>
    @import '../../css/mixin.scss';
    .header{
        z-index: 600;
        line-height: 0.8rem;
        height: 0.8rem;
         
        background-image: linear-gradient(90deg, 
            #4989e7 0%, 
            #4985f4 100%), 
        linear-gradient(
            #e7e7e7, 
            #e7e7e7);
        background-blend-mode: normal, 
            normal;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        font-size: 0.32rem;
        color: #fff;
        .left{
            display: block;
            font-size: 0.6rem;
            position: absolute;
            top: 0.2rem;
            left: 0.1rem;
            padding: 0 0.2rem;
            // min-width: 0.88rem;
            height: 0.44rem; 
            width: 0.3rem;
        }
        .right{
            position: absolute;
            top: 0;
            right: 0;
        }
        .home{
            padding: 0 0.2rem;
            min-width: 0.88rem;
            font-size: 0.6rem;
            color: $main-color;
        }
    } 
    .header-stance{
        height: 0.8rem;
    }
</style>
<template>
    <div class="header-box">
        <div class="header">
            <img src="./../../assets/images/left_arrow.png" class="left" @click="onBack"></img>
            {{title}}
            <div class="right">
                <slot name="right">
                    <div @click="gotoAddress('/')" class="ion-ios-home-outline home" slot="right"></div>
                </slot>
            </div>
        </div>
        <div class="header-stance"></div>
    </div>
    
</template>

<script>
    export default {
        props: {
            title:{
                type: null,
                default: '',
            },
            back:null,
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
            gotoAddress(path){
               this.$router.push(path)
            },
            onBack() {
                if (!this.back) {
                    // this.messageBox.alert(history.length);
                    let lastUrl = document.referrer
                    if (!history.length||history.length == 1) {
                        this.$router.push('/')
                    }else{
                        this.$router.go(-1)
                    }
                }else{
                    this.$router.push(this.back)
                }
                
                
            }
        },
    }
</script>