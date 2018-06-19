<template>
  <div class="login-box">
    <div class="login">
      <el-input placeholder="用户名" v-model="name"></el-input>
      <el-input placeholder="密码" type="password"  v-model="psw"></el-input>
      <el-button class="login-btn" type="primary" @click="login" size="small">登     录</el-button>
    </div>
  </div>
</template>

<script>
//import component from "@/"
import {getPower,setStore} from "@/utils"
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      name: null,
      psw: null,
    }
  },

  created() {},

  mounted() {},

  methods: {
    login() {
      this.$http.post('login',{name: this.name,psw: this.psw}).then((result) => {
        setStore("token",result.token)
        getPower(this.$router, () => {
          this.$router.push('/')
        })
      })
    }
  },

  computed: {}
}
</script>

<style lang='scss' scoped>
.login-box {
  background: url("~@assets/images/login_bg_default.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  .login {
    background: linear-gradient(
      230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%
    );
    height: 300px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    padding: 100px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
    transition-property: transform, opacity, box-shadow, top, left;
    transition-duration: 0.5s;
    transform: rotateX(0deg);
    width: 240px;
    .login-btn{
      display: block;
      margin: 20px auto;
      width: 80%;
    }
  }
}
</style>
<style lang="scss">
.login-box{
  .el-input__inner{
    color: #fff;
    background: none;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid;
  }
}
</style>
