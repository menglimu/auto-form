<style lang="scss" scoped>
.load-mask {
  z-index: 1001;
  .load-box {
    margin: 4rem auto 0;
    .load {
      width: 0.8rem;
      display: block;
      color: #fff;
      margin: 0 auto;
      text-align: center;
      line-height: 0.8rem;
      animation: rotate 2s infinite linear;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotateY(0);
  }
  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: rotateZ(360deg);
  }
}

</style>
<template>
  <msMask :show="isShow" class="load-mask">
    <div class="load-box">
      <!-- <div class="ion-load-c load"></div> -->
      <img src="./images/laoding.png" class="load">
    </div>
  </msMask>
</template>
<script>
import msMask from '@/components/common/msMask'
export default {
  props: {

  },
  components: {
    msMask
  },

  data() {
    return {
      showList: [],
    }
  },

  created() {

  },

  mounted() {

  },

  computed: {
    isShow() {
      return this.showList.length > 0
    }
  },

  methods: {
    hide() {
      // this.isShow = false
      this.showList.pop()
    },
    show() {
      // this.isShow = true
      this.showList.push(1)
    },
    hideAll() {
      this.showList = []
    }
  },
}

</script>
