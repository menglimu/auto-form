<template>
<div class="notFoundCss">
  <img src="./images/404.jpg" alt="">
  <p>亲，您找的页面不见了</p>
</div>
</template>
<script>
export
default {
  components: {

  },
  data() {
    return {

    }
  },
  created() {

  },

  methods: {

  }

}
</script>
<style media="screen" lang="scss" scoped>
.notFoundCss{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background: #f4f4f4;
  text-align: center;
  p{
    padding-top: 1rem;
  }
  img{
    width: 3.6rem;
    margin-top: 2.7rem;
  }
}
</style>
