<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">常见问题</h1>
		</header>
		<div class="main">
			 <div class="y-bindphone">
          <ul>              
            <li class="ute" v-for="(item,index) in dataList">
              <router-link :to="{name:'details',params:{id:item.id}}">
                <span>{{item.title}}</span>
              </router-link>
            </li>                                       
          </ul>
      </div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      dataList:[]
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
      this.$http.post('/Shop/Article/singleArticle', {sign:'commonProblem'},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.dataList = returnData.data.data;
        }
      });
    }
  }

}
</script>

