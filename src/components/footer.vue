<style lang="scss" scoped>
    footer{
        z-index: 999;
        display: flex;
        position: fixed;
        width: 100%;
        bottom: 0;
        font-size: 0.28rem;
        box-shadow: 0 -0.1rem 0.1rem rgba(0, 0, 0, 0.1);
        padding-bottom: 0.1rem;
        &>div{
            flex: 1;
            text-align: center;
            &>div:first-child{
              font-size: 0.4rem;
              line-height: 0.5rem;
            }
            &>div:last-child{
                line-height: 0.3rem;
            }
        }
   }
</style>

<template>
    <footer>
        <div v-for="(foot, index) in data" @click = "gotoAddress(foot.address)" :class="{'active' : active==index}">
           <div :class="foot.icon"></div>
           <div>{{foot.name}}</div>
        </div>
    </footer>
</template>

<script>
    export default {
        props: {
          "active": null,
          data:{
            default: function () {
              return [
                {
                  name: '首页',
                  icon: 'ion-ios-home-outline',
                  address: '/order',
                },
                {
                name: '分类',
                  icon: 'ion-ios-list-outline',
                  address: '/category',
                },
                {
                  name: '购物车',
                  icon: 'ion-ios-cart-outline',
                  address: '/order',
                },
                {
                  name: '个人中心',
                  icon: 'ion-android-person',
                  address: '/order',
                },
              ]
            }
            
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
          gotoAddress(path){
            this.$router.push(path)
          }
        },
    }
</script>