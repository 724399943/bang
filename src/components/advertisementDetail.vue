<template>
  	<div class="content">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">广告详情</h1>
		</header>
		<div class="main">
			<div class="news_detail" v-html="list.content">
          
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list:{}
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
  },
  mounted(){
    this.getData();
  },
  methods: {
    getData(){
      this.$http.post('/Shop/Index/bannerDetail', {id:this.$route.query.id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.list = returnData.data.list;
          this.$store.commit('loading',{show:false});
        }
      })
    }
  }

}
</script>

