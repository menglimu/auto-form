<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.message-box {
  width: 85%;
  background: #fff;
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;
  position: fixed;
  z-index: 1000;
  left: 7.5%;
  padding: 0.2rem;
  top: 4rem;
  h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 0.1rem;
    color: #005c97;
  }
  .msg {
    word-break: break-all;
    min-height: 0.8rem;
    padding: 0.1rem 0 0.3rem;
    font-size: 0.28rem;
  }
  .line {
    display: block;
    height: 1px;
    background-color: #e7e7e7;
    margin-bottom: 0.2rem;
  }
  .message-alert {
    .btn {
      // background: #EF544F;
      background-image: linear-gradient(90deg,
      #4989e7 0%,
      #4985f4 100%),
      linear-gradient( #e9e9e9,
      #e9e9e9);
      background-blend-mode: normal,
      normal;
      box-shadow: 0rem 0.03rem 0.07rem 0rem rgba(73, 133, 244, 0.7);
      border-radius: 0.1rem;
      color: #FFFFFF;
      width: 100%;
    }
  }
  .message-confirm,
  .message-prompt {
    .btn-row {
      display: flex;
      .btn {
        height: 39px;
        font-size: 15px;
        width: 43%;
        border-radius: 2px;
      }
    }
    .message-disagree {
      background: #FFFFFF;
      color: #666666;
      border: 1px solid #b7b7b7;
    }
    .message-agree {
      border-radius: 2px;
      background-color: #EF544F;
      color: #FFFFFF;
    }
  }
  .message-prompt {
    .msg {
      text-align: left;
      font-size: 0.26rem;
    }
    input {
      width: 90%;
      height: 0.7rem;
      font-size: 0.28rem;
      border: 1px solid #dfdfdf;
      margin-bottom: 0.3rem;
      padding: 0 0.2rem;
    }
  }
}

</style>
<template>
  <msMask v-if="show" @click="quit">
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOutRight">
      <div class="message-box" v-show="showPage">
        <h3>{{config.title}}</h3>
        <div class="message-alert" v-if="config.type=='alert'">
          <div class="msg">{{config.msg}}</div>
          <span class="line"></span>
          <btn class="btn" @click="sure">确定</btn>
        </div>
        <div class="message-confirm" v-if="config.type=='confirm'">
          <div class="msg">{{config.msg}}</div>
          <span class="line"></span>
          <div class="btn-row">
            <btn class="btn message-disagree" @click="quit">取消</btn>
            <btn class="btn message-agree" @click="sure">确定</btn>
          </div>
        </div>
        <div class="message-prompt" v-if="config.type=='prompt'">
          <div class="msg">{{config.msg}}</div>
          <input v-model="inputVal"></input>
          <span class="line"></span>
          <div class="btn-row">
            <btn class="btn message-disagree" @click="quit">取消</btn>
            <btn class="btn message-agree" @click="sure">确定</btn>
          </div>
        </div>
      </div>
    </transition>
  </msMask>
</template>
<script>
import btn from "@/components/common/btn"
import msMask from '@/components/common/msMask'
export default {
  components: {
    btn,
    msMask
  },
  // props:["config"],
  data() {
    return {
      config: {},
      inputVal: '',
      show: true,
      showPage: false
    }
  },
  mounted() {
    this.showPage = true
  },
  methods: {
    sure() {
      this.setShow()
      this.callback && this.callback(true, this.inputVal)
    },
    quit() {
      this.setShow()
      this.callback && this.callback(false, this.inputVal)
    },
    setShow() {
      this.showPage = false
      setTimeout(()=>{
        this.show = false
      },600)
    }
  },
}

</script>
