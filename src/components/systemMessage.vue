<template>
  	<div class="content" id="JsystemMessage">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">系统消息</h1>
		</header>
		<div class="main">
			<div class="sysNews_wrap">
				<ul>
					<li v-for="(item,index) in list">
						<router-link :to="{name:'messageDetail',params:{id:item.id}}">
							<p class="time">{{item.add_time | Time}}</p>
							<div class="sysbox">
								<div class="imgbox">
									<img :src="item.image">
								</div>
								<p class="cont">{{item.title}}</p>
							</div>
						</router-link>
					</li>					
				</ul>
			</div>
			<div class="nomore" v-if="nomore == 1">已经到底啦~</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      page:1,
      hasAjax:0,
      nomore:0,
      list:[]
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
  },
  mounted(){
  	this.loadMore();
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
      if( this.hasAjax == 0 ){
        this.hasAjax = 1;
        this.$http.post('/Shop/Message/systemMessage', {page:this.page},{emulateJSON:true}).then(function(response){  
          this.hasAjax = 0;
          if( this.page == 0 ){
            this.list = response.data.data.list;
            this.page++;              
          }else{
            if( response.data.data.list.length == 0 ){                
              this.hasAjax = 1;
              this.nomore = 1;
            }else{
              this.page++;
              this.list = this.list.concat(response.data.data.list);
            }
          }
          this.$store.commit('loading',{show:false});                                         
        });        
      }else{
        this.$store.commit('loading',{show:false});                                         
      }
    },
    loadMore(){         
        var that = this;
        this.$store.commit('scrollFun',{dom:"JsystemMessage",auto:true,bottomCall:function(){   
          that.$store.commit('loading',{show:true,text:'加载中...'});         
          that.getData();
        }})
    }
  }

}
</script>

