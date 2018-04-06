<template>
  	<div class="content" id="Jranking">
  		<header class="head">
  			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<nav class="billnav">
				<div class="navname" :class="{on:type==1}" @click="ontabFun(1)">成交榜</div>
				<div class="navname" :class="{on:type==2}" @click="ontabFun(2)">积分榜</div>
			</nav>
		</header>
		<div class="main pd">
			<div class="rankList">
				<div class="topList">
					<div class="top_rank">
						<router-link :to="{name:'userHomepage',params:{id:userTwo.id}}">
							<img src="../assets/images/home_icon_ranking_two.png" class="ico">
							<div class="headBox r1">
								<img :src="userTwo.headimgurl">
								<div class="lv"><span>{{userTwo.level_name}}</span></div>
							</div>
							<p class="name">{{userTwo.nickname}}</p>		
							<p class="pt" v-if="type==1">成交{{userTwo.deal_number}}笔</p>
							<p class="pt" v-else>{{userTwo.point}}积分</p>	
						</router-link>			
					</div>
					<div class="top_rank one">
						<router-link :to="{name:'userHomepage',params:{id:userOne.id}}">
							<img src="../assets/images/home_icon_ranking_one.png" class="ico">
							<div class="headBox r2">
								<img :src="userOne.headimgurl">
								<div class="lv"><span>{{userOne.level_name}}</span></div>
							</div>
							<p class="name">{{userOne.nickname}}</p>		
							<p class="pt" v-if="type==1">成交{{userOne.deal_number}}笔</p>	
							<p class="pt" v-else>{{userOne.point}}积分</p>		
						</router-link>
					</div>
					<div class="top_rank">
						<router-link :to="{name:'userHomepage',params:{id:userThree.id}}">
							<img src="../assets/images/home_icon_ranking_three.png" class="ico">
							<div class="headBox r3">
								<img :src="userThree.headimgurl">
								<div class="lv"><span>{{userThree.level_name}}</span></div>
							</div>
							<p class="name">{{userThree.nickname}}</p>		
							<p class="pt" v-if="type==1">成交{{userThree.deal_number}}笔</p>
							<p class="pt" v-else>{{userThree.point}}积分</p>		
						</router-link>	
					</div>
				</div>
				<div class="rankRow" v-for="(item,index) in list">
					<router-link :to="{name:'userHomepage',params:{id:item.id}}">
						<div class="rank">{{index+4}}</div>
						<div class="rowbox">
		                    <div class="imgbox">
		                        <img :src="item.headimgurl">
		                    </div>
		                    <div class="rankmsg">
		                        <p class="name">{{item.nickname}} <span class="lv">{{item.level_name}}</span></p>
		                        <p class="pt" v-if="type==1">成交{{item.deal_number}}笔</p>
		                        <p class="pt" v-else>{{item.point}}积分</p>	
		                    </div>
	                  	</div>
	                </router-link>
				</div>				
				<div class="usrRank">您的排名 {{myRank}}</div>
			</div>			
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			type:1,
			page:1,
			hasAjax:0,
			list:[],
			userOne:{},
			userTwo:{},
			userThree:{},
			myRank:null
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
	        this.$http.post('/Shop/User/userList', {type:this.type,page:this.page},{emulateJSON:true}).then(function(response){  
	          this.hasAjax = 0;	   	                
	          if( this.page == 0 ){
	            this.list = response.data.data.list;
	            this.page++;              
	          }else{
	            if( response.data.data.list.length == 0 ){                
	              this.hasAjax = 1;
	            }else{
	              this.page++;
	              this.list = this.list.concat(response.data.data.list);
	            }
	          }	
	          this.$store.commit('loading',{show:false});               
	          if( this.page == 2 ){
	          	  this.userOne = this.list[0];                                     
		          this.userTwo = this.list[1];
		          this.userThree = this.list[2];
		          this.list.splice(0,3);	
		          this.myRank = response.data.data.myRank;
	          }             
	        });        
	      }else{
	      	this.$store.commit('loading',{show:false}); 
	      }
	    },
	    loadMore(){         
	        var that = this;
	        this.$store.commit('scrollFun',{dom:"Jranking",auto:true,bottomCall:function(){   
	          that.$store.commit('loading',{show:true,text:'加载中...'});         
	          that.getData();
	        }})
	    },
	    ontabFun(type){
	    	this.type = type;
	    	this.page = 1;
	    	this.hasAjax = 0;
	    	this.list = [];
	    	this.getData();
	    }
	}

}
</script>

