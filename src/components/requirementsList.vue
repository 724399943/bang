<template>
  	<div class="content" id="Jrequirement">
  		<header class="head">
  			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">{{category_name}}</h1>
			<router-link to="/search" class="search"></router-link>
		</header>
		<div class="main">
			<div class="require">
				<div class="cont-row" v-for="(item,index) in list">
	              <div class="user-row">
	                  <div class="urbox">
	                      <div class="imgbox">
	                          <img :src="item.headimgurl">
	                      </div>
	                      <div class="urmsg">
	                          <p class="name">{{item.nickname}} <span class="lv">{{item.level_name}}</span></p>
	                          <p class="time">{{item.add_time | Time}} 发布</p>
	                      </div>
	                  </div>
	                  <span class="umsg">留言 {{item.comment_number}}</span>
	              </div>
	              <div class="describe">{{item.title}}</div>
	              <div class="picture" v-if="item.images.length == 1">
                      <template v-for="(oimg,index) in item.images">
                        <img :src="oimg">                  
                      </template>
                  </div>
                  <div class="imgList" v-else>
                      <div class="imgbox" v-for="(img,index) in item.images">
                          <img :src="img">
                      </div>                      
                  </div>
                  <div class="urgent">{{item.describe}}</div>
                  <div class="order">{{item.provide_describe}}</div>
	          	</div>  				
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			category_name:this.$route.query.category_name,
			page:1,
			hasAjax:0,
      		nomore:0,
      		list:[]
		}
	},
	beforeCreate(){
		
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
	        this.$http.post('/Shop/Service/serviceList', {page:this.page,category_id:this.$route.query.category_id,pid:this.$route.query.pid},{emulateJSON:true}).then(function(response){  
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
	      }
	    },
	    loadMore(){         
	        var that = this;
	        this.$store.commit('scrollFun',{dom:"Jrequirement",auto:true,bottomCall:function(){ 
	          that.$store.commit('loading',{show:true,text:'加载中...'});          
	          that.getData();
	        }})
	    }
	}

}
</script>

