<template>
  <div class="content" id="JmyAttention">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">我的关注</h1>
		</header>
		<div class="main">
			 <div class="cont-row mbd">
          <div class="demandTop">
              <div class="user-row pd borb" v-for="(item,index) in list">
                <router-link :to="{name:'userHomepage',params:{id:item.id}}">
                  <div class="urbox">
                      <div class="imgbox">
                          <img :src="item.headimgurl">
                      </div>
                      <div class="urmsg">
                          <p class="name">{{item.nickname}}</p>
                          <p class="time">{{item.signature}}</p>
                      </div>
                  </div>
                </router-link>
              </div>              
          </div>   
       </div>
       <div class="nomore" v-if="nomore == 1">已经到底啦~</div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      list:[],
      page:1,
      hasAjax:0,
      nomore:0
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
        this.$http.post('/Shop/User/myAttention', {page:this.page},{emulateJSON:true}).then(function(response){ 
          this.hasAjax = 0;
          if( this.page == 0 ){
            this.list = response.data.data.data;
            this.page++;              
          }else{
            if( response.data.data.data.length == 0 ){                
              this.hasAjax = 1;
              this.nomore = 1;
            }else{
              this.page++;
              this.list = this.list.concat(response.data.data.data);
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
        this.$store.commit('scrollFun',{dom:"JmyAttention",auto:true,bottomCall:function(){   
          that.$store.commit('loading',{show:true,text:'加载中...'});         
          that.getData();
        }})
    }
  }

}
</script>

