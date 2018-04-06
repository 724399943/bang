<template>
  <div class="content">
  	<header class="head bdnone">
      <a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">关于我们</h1>
		</header>
		<div class="main plg">      
      <div class="abudetail" v-html="dataJson.content">
          
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
      this.$http.post('/Shop/Article/singleArticle', {sign:'aboutUs '},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.dataJson = returnData.data.data[0];
        }
      });
    }
  }

}
</script>

