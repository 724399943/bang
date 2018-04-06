<template>
  <div class="content" id="Jsearch">
		<header class="head sear">
        <a href="javascript:window.history.go(-1);" class="ico whiteback"></a>
        <h1 class="y-confirm-order-h1"><input type="text" autofocus="autofocus" placeholder="请输入关键字" class="seinput" v-model="keyword"></h1>          
        <a href="javascript:;" class="search white" @touchstart="search"></a>
        <!-- <a href="javascript:;" class="cancel">取消</a> -->
    </header>
		<div class="main navtop" v-if="is_search==1">
			 <nav class="searNav sfix">
          <span :class="{on:is_tab=='demand'}" @touchstart="ontabFun('demand')">需求</span>   
          <span :class="{on:is_tab=='user'}" @touchstart="ontabFun('user')">用户</span>
       </nav>
       <div class="home-main">
         <div class="home-user-cont" v-if="is_tab=='demand'">
            <div class="cont-row" v-for="(item,index) in list">
              <router-link :to="{name:'demandDetail',params:{order_sn:item.order_sn}}">
                <div class="user-row">
                    <div class="urbox">
                        <div class="imgbox">
                            <img :src="item.headimgurl">
                        </div>
                        <div class="urmsg">
                            <p class="name">{{item.nickname}} <span class="lv">{{item.level_name}}</span></p>
                            <p class="time">{{item.add_time | Time}}发布</p>
                        </div>
                    </div>
                    <span class="umsg">留言 {{item.comment_number}}</span>
                </div>
                <div class="describe">{{item.title}}</div>
                <template v-if="item.images">
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
                </template>
                <div class="urgent">{{item.describe}}</div>
                <div class="order">{{item.provide_describe}}</div>
            </router-link>
            </div>              
         </div>
         <div class="home-user-cont" v-else>
            <div class="ser-user" v-for="(user,index) in list">
              <router-link :to="{name:'userHomepage',query:{id:user.id}}">
                <div class="usrbox">
                    <div class="imgbox">
                        <img :src="user.headimgurl">
                    </div>
                    <p class="name">{{user.nickname}}<span class="lv">{{user.level_name}}</span><span class="follow" @touchstart="followUser(user.id,index)"><template v-if="user.is_follow == 0">加关注</template><template v-else>已关注</template></span></p>
                </div>
                <p class="pt">来服务帮291天了，成交过{{user.deal_number}}次，现居广东广州男生。</p>
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
      nomore:0,
      is_search:0,
      keyword:null,
      is_tab:'demand'
    }
  },
  created(){
    
  },
  mounted(){
    this.loadMore();
  },
  methods: {
    search:function(){  
      this.$store.commit('loading',{show:true,text:'加载中...'});
      this.list = [];
      this.page = 1;
      this.hasAjax = 0;
      this.nomore = 0; 
      this.is_tab = 'demand';   
      this.is_search = 1;
      this.getData();
    },
    getData(){
      if( this.hasAjax == 0 ){
        this.hasAjax = 1;
        if( this.is_tab == 'demand' ){
          var postUrl = "/Shop/Service/serviceList";
        }else{
          var postUrl = "/Shop/User/userList";
        }
        this.$http.post(postUrl, {page:this.page,keyword:this.keyword},{emulateJSON:true}).then(function(response){
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
        this.$store.commit('scrollFun',{dom:"Jsearch",auto:true,bottomCall:function(){   
          that.$store.commit('loading',{show:true,text:'加载中...'});         
          that.getData();
        }})
    },
    ontabFun(type){
      this.is_tab = type;   
      this.list = [];
      this.page = 1;
      this.hasAjax = 0;
      this.nomore = 0; 
      this.$store.commit('loading',{show:true,text:'加载中...'});  
      this.getData();
    },
    followUser(id,index){      
      var postUrl = this.list[index].is_follow==0 ? "/Shop/User/followUser" : "/Shop/User/cancelAttention";
      this.$http.post(postUrl, {user_id:id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        if( returnData.status == 200000 ){
          this.list[index].is_follow = this.list[index].is_follow==0 ? 1 : 0;
        }
      });
    }
  }

}
</script>

