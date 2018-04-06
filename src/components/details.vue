<template>
  	<div class="content">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">详情</h1>
		</header>
		<div class="main">
			<div class="news_detail" v-html="dataJson.content">
          
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      dataJson:{}
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
      this.$http.post('/Shop/Article/articleDetail', {id:this.$route.params.id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.dataJson = returnData.data;
        }
      });
    }
  }

}
</script>

