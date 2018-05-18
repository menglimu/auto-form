<template>
	<div class="noRecordTemplateCss" >
		 <img  src="../image/icon/noData.png"/>
		 <p>{{text}}</p>
		 <div class="tips">
			<p>一个人能积累多少钱，取决于他如何投资理财</p>
			<p>——(美)沃伦·巴菲特</p>
		 </div>

	</div>
</template>
<script>

export default {
  components: {

  },
  props: {
  	text:{
  	    type: null,
  	    default: '暂无相关信息'
  	}
  },
  data() {
    return {
    }
  },

  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.noRecordTemplateCss{
	position: fixed;
	background: #fff;
	width: 100%;
	height: 100%;
	text-align: center;
	img{
		margin-top:2.42rem;
		margin-bottom: 0.3rem;
		width: 2.1rem;
	}
	.tips{
		color:#999;
		margin-top:0.3rem;
		p{font-size:0.24rem;}
	}
}
</style>