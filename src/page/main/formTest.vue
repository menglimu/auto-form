<template>
  <div>
    <mlform ref='form' :config="config" v-model="userInput"></mlform>
  </div>
</template>

<script>
import mlform from "@/components/common/form"
import {getSession} from "@/utils"
export default {
  name: "formTest",
  components: {mlform},
  props: {},
  data () {
    return {
      config: "",
      userInput: {},
      show: false,
    }
  },

  created() {
    this.config = getSession("config")
  },

  mounted() {
    this.$bus.$on("form",config => this.config = config)
  },

  methods: {
    showForm() {
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },

  computed: {},
  activated() {},
}
</script>

<style lang='scss' scoped>
  .config-input{
    width: 8rem;
    height: 6rem;
  }
</style>