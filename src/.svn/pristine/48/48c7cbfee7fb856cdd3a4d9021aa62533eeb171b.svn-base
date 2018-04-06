<template>
  	<div class="content">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">需求详情</h1>
		</header>
		<div class="main pd">
			 <div class="cont-row">
          <div class="demandTop">
            <div class="user-row pd">
                <div class="urbox">
                    <div class="imgbox">
                        <img :src="userData.headimgurl">
                    </div>
                    <div class="urmsg">
                        <p class="name">{{userData.nickname}} <span class="lv">{{userData.level_name}}</span></p>
                        <p class="time">{{userData.add_time | Time}}发布于<span>{{userData.city}}</span></p>
                    </div>
                </div>
            </div> 
            <div class="describe">{{serData.title}}</div>
            <div class="urgent">{{serData.describe}}</div>
            <div class="order">{{serData.provide_describe}}</div>
            <template v-if="serData.images">
              <div class="picture" v-if="serData.images.length == 1">
                  <template v-for="(oimg,index) in serData.images">
                    <img :src="oimg">                  
                  </template>
              </div>
              <div class="picture" v-else-if="serData.images.length > 1">
                  <swiper auto height="140px">
                    <template v-for="(img,index) in serData.images">
                      <swiper-item class="black">
                        <router-link to="">
                          <img class="Sw-img" :src="img">
                        </router-link>              
                      </swiper-item>     
                    </template>                             
                  </swiper> 
              </div>
            </template> 
          </div>           
       </div>
      <div class="demandUsrbox">
        <div class="demandUser">
          <p class="name">{{userData.nickname}} <span class="lv">{{userData.level_name}}</span></p>
          <p class="pt">来服务帮{{userData.days}}天了，成交过{{userData.deal_number}}次。 现居{{userData.province}}{{userData.city}}的<template v-if="userData.sex==0">男</template><template v-else>女</template>生。</p>
          <div class="text">
            <span v-for="(auth,index) in authData"><em class="ico"></em>{{auth}}</span>
          </div>
          <div class="userBox">
              <div class="headbox">
                  <img :src="userData.headimgurl">
              </div>
          </div>
          <div class="un-skill">
              <span v-for="(sk,index) in skill.category_name">{{sk}}</span>
          </div>
        </div> 
      </div>
       <div class="msgBoard">
          <div class="title">留言({{commentData.length}})</div>
          <div class="msgRow">
            <div class="user-row mrb" v-for="(com,index) in commentData">
                <div class="urbox" @touchstart="leaveMsg(2,com.nickname,com.from_id,index,com.id)">
                    <div class="imgbox">
                        <img :src="com.headimgurl">
                    </div>
                    <div class="urmsg">
                        <p class="name">{{com.nickname}} <span class="lv">{{com.level_name}}</span></p>
                        <p class="time">{{com.add_time | Time}}发布</p>
                    </div>
                </div>
                <div class="comment">
                    <div class="usrcome">{{com.content}}</div>
                    <div class="replyMain">
                        <div class="replyCont" v-for="(scom,index) in com.second_comment">
                          <div class="user-row">
                              <div class="urbox">
                                  <div class="imgbox">
                                      <img :src="scom.from_headimgurl">
                                  </div>
                                  <div class="urmsg">
                                      <p class="name">{{scom.from_nickname}} <span class="lv">{{scom.from_level}}</span></p>
                                      <p class="time">{{scom.add_time | Time}}发布</p>
                                  </div>
                              </div>
                          </div>
                          <div class="replytext">回复@{{scom.to_nickname}}:{{scom.content}}</div>
                        </div>                        
                    </div>
                </div>
            </div>               
          </div>          
      </div>
      <footer class="demandfoot">
          <div class="footlf">
              <span class="leave" @touchstart="leaveMsg(1)">留言</span>
          </div>
          <div class="un-btnbox">
              <a href="javascript:;" class="cbtn" @click="cancelOrder($route.query.order_sn)" v-if="$route.query.status==1 || $route.query.status==2">取消订单</a>
              <router-link :to="{name:'editOrder',query:{order_sn:$route.query.order_sn}}" class="obtn" v-if="$route.query.status==1">修改订单</router-link>       
              <a href="javascript:;" class="obtn" v-if="$route.query.status==2" @click="finishOrder($route.query.order_sn,$route.query.order_type)">完成订单</a>  
              <a href="javascript:;" class="cbtn" v-if="$route.query.status==3 && serData.is_delete==1">已取消</a> 
              <a href="javascript:;" class="obtn" v-else-if="$route.query.status==3 && serData.is_delete==0">已完成</a>       
          </div>
      </footer>
      <div class="demandCome" v-if="addcommentBol==true"><input type="text" name="" :placeholder="placeholder" v-model="addCommentJson.content" @blur="addComment"></div>
		</div>
  </div>
</template>
<script>
import {Swiper,SwiperItem} from 'vux/src/components/swiper'
export default {

  data () {
    return {
      authData:[],
      commentData:[],
      serData:{},
      userData:{},
      user:{},
      skill:{},
      addcommentBol:false,
      addCommentJson:{},
      placeholder:"",
      levelComment:null,
      commentator:{},
      commentIndex:null
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
  },
  components : {
    Swiper,
    SwiperItem
  },
  mounted(){
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
      this.$http.post('/Shop/Service/serviceDetail', {order_sn:this.$route.query.order_sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.authData = returnData.data.authData;
          this.commentData = returnData.data.commentData;
          this.serData = returnData.data.serData;
          this.userData = returnData.data.userData;
          this.user = returnData.user;
        }
      });
      this.$http.post('/Shop/Skill/skill', {user_id:this.$route.query.id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.skill = returnData.data;         
        }
      });
    },
    leaveMsg(level,nickname,from_id,index,id){
      this.levelComment = level;
      this.placeholder = level==1?"说点什么吧(100字内)" : "回复@"+nickname+"：(100字内)";
      this.addcommentBol = true;
      if( level == 1 ){
        this.addCommentJson["to_id"] = this.userData.id;        
      }else{
        this.addCommentJson["to_id"] = from_id;  
        this.commentator["headimgurl"] = this.user.headimgurl;
        this.commentator["nickname"] = this.user.nickname;
        this.commentIndex = index;
        this.addCommentJson["pid"] = id;
      }
      this.addCommentJson["order_sn"] = this.serData.order_sn;
    },
    addComment(){
      if( !this.addCommentJson.content ){
        this.addcommentBol = false;
        return;
      }            
      this.$http.post('/Shop/Comment/addComment', this.addCommentJson,{emulateJSON:true}).then(function(response){
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        if( returnData.status == 200000 ){          
          var comment = {};
          comment["content"] = this.addCommentJson.content;
          comment["add_time"] = new Date().getTime();
          if( this.levelComment == 1 ){ 
            comment["headimgurl"] = this.user.headimgurl;
            comment["nickname"] = this.user.nickname;
            this.commentData.unshift(comment);
          }else{
            comment["from_headimgurl"] = this.commentator.headimgurl;
            comment["from_nickname"] = this.commentator.nickname;
            this.commentData[this.commentIndex].second_comment.unshift(comment);
          }                    
          this.addCommentJson = {};
        }else{
          this.addcommentBol = false;
        }
      });
    },
    cancelOrder(order_sn){
      this.$http.post('/Shop/Order/cancelOrder', {order_sn:order_sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        this.$router.go(-1);
      });
    },
    finishOrder:function(sn,order_type){
      this.$http.post('/Shop/Order/finishOrder', {order_type:order_type,order_sn:sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        this.$router.push("/receiveOrder");
      });
    }

  }

}
</script>

