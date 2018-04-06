<template>
  <div class="content" id="JuserHomepage">
  	<header class="head">
      <a class="ico back" href="javascript:window.history.go(-1);"></a>
		</header>
		<div class="main">
      <div class="basicHeadBox">
          <div class="imgbox">
                <img v-if="userData.headimgurl!=''" :src="userData.headimgurl" alt="">       
                <img src="../assets/images/defaulit-head.png" v-else>
              <span class="lv">{{userData.level_name}}</span>
          </div>
          <p class="name"><span class="st">{{userData.nickname}}</span><em class="sex" :class="{boy:userData.sex==0,girl:userData.sex==1}"></em></p>  
      </div> 
      <div class="uhptab">
          <div class="tabspan">
            <span>关注({{userData.attention}})</span>
            <span>粉丝({{userData.fans}})</span>
          </div>
      </div>
      <div class="uhpdata">
          <div class="autograph">
              {{userData.signature}}
          </div>
          <div class="paper">
              <span v-for="(auth,index) in authData">{{auth}}</span>              
          </div>
      </div>
      <div class="uhpCont">
          <div class="uhpNav">
              <span :class="{on:is_tab==0}" @click="ontabFun(0)">需求</span>
              <span :class="{on:is_tab==1}" @click="ontabFun(1)">评价</span>
              <span :class="{on:is_tab==2}" @click="ontabFun(2)">技能</span>
          </div>
          <div class="uhp-demand" v-if="is_tab==0">
            <div class="cont-row" v-if="list.length>0" v-for="(demand,index) in list">
                <div class="user-row">
                    <div class="urbox">
                        <div class="imgbox">
                            <img :src="demand.headimgurl">
                        </div>
                        <div class="urmsg">
                            <p class="name">{{demand.nickname}} <span class="lv">{{demand.level_name}}</span></p>
                            <p class="time">{{demand.add_time | Time}}发布</p>
                        </div>
                    </div>
                    <span class="umsg">留言 {{demand.comment_number}}</span>
                </div>
                <div class="describe">{{demand.title}}</div>
                <template v-if="demand.images">
                  <div class="picture" v-if="demand.images.length == 1">
                      <template v-for="(oimg,index) in demand.images">
                        <img :src="oimg">                  
                      </template>
                  </div>
                  <div class="imgList" v-else>
                      <div class="imgbox" v-for="(img,index) in demand.images">
                          <img :src="img">
                      </div>                      
                  </div>
                </template>
                <div class="urgent">{{demand.describe}}</div>
                <div class="order">{{demand.provide_describe}}</div>
            </div>   
          </div>  
          <div class="uhpComment" v-else-if="is_tab==1">          
            <div class="msgRow msgBoard uhpeva" v-if="list.length>0" v-for="(eva,index) in list">
              <div class="user-row hpd mrb">
                  <div class="urbox">
                      <div class="imgbox">
                          <img :src="eva.headimgurl">
                      </div>
                      <div class="urmsg">
                          <p class="name">{{eva.nickname}} <span class="lv">{{eva.level_name}}</span></p>
                          <p class="time">{{eva.add_time | time}}</p>
                      </div>
                  </div>
                  <div class="comment">
                      <div class="usrcome bornone">{{eva.content}}</div>
                      <div class="grade">
                          <div class="grade-row">
                              <span>服务态度</span>
                              <div class="starbox">
                                  <em class="star" :class="{on:eva.attitude>=1}"></em>
                                  <em class="star" :class="{on:eva.attitude>=2}"></em>
                                  <em class="star" :class="{on:eva.attitude>=3}"></em>
                                  <em class="star" :class="{on:eva.attitude>=4}"></em>
                              </div>
                          </div>
                          <div class="grade-row">
                              <span>服务时效</span>
                              <div class="starbox">
                                  <em class="star" :class="{on:eva.effect>=1}"></em>
                                  <em class="star" :class="{on:eva.effect>=2}"></em>
                                  <em class="star" :class="{on:eva.effect>=3}"></em>
                                  <em class="star" :class="{on:eva.effect>=4}"></em>
                              </div>
                          </div>
                          <div class="grade-row">
                              <span>服务技能</span>
                              <div class="starbox">
                                  <em class="star" :class="{on:eva.skill>=1}"></em>
                                  <em class="star" :class="{on:eva.skill>=2}"></em>
                                  <em class="star" :class="{on:eva.skill>=3}"></em>
                                  <em class="star" :class="{on:eva.skill>=4}"></em>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>  
              <div class="odetGoods">
                  <div class="gimg">
                      <img :src="eva.image">                
                  </div>
                  <div class="gname db-overflow">{{eva.title}}</div>
                  <a href="javascript:;" class="seebtn">查看详情</a>
              </div>             
            </div>    
          </div>                
          <!-- 技能 -->
          <div class="uhp-demand" v-else-if="is_tab==2">
              <div class="oappTop">
                <p class="oappTitle">技能类型</p>
                <div class="type">
                    <span class="on" v-for="(cat,index) in skillData.category_name">{{cat}}</span>    
                </div>  
              </div>
              <ul class="odetul pdnone">
                <li>
                    <span>服务方式</span>
                    <span class="uhptext" v-if="skillData.type==1">线上服务</span>
                    <span class="uhptext" v-else>线下服务</span>
                </li>                
                <li>
                    <span>服务项目</span>
                    <span class="uhptext">{{skillData.title}}</span>
                </li>                       
              </ul>
              <div class="uhpintroduce">
                  <p class="title">服务介绍</p>
                  <div>{{skillData.describe}}</div>
              </div>
          </div>
          <div class="nomore" v-if="nomore == 1">已经到底啦~</div>
      </div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      userData:{},
      authData:[],
      skillData:{},
      list:[],
      page:1,
      hasAjax:0,
      nomore:0,
      is_tab:0
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getOtherUser();
  },
  mounted(){
    this.loadMore();
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getOtherUser(){
      this.$http.post('/Shop/User/getOtherUser', {id:this.$route.query.id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.userData = returnData.data.userInfo.userData;
          this.authData = returnData.data.userInfo.authData;         
          this.getData();
        }
      });
    },
    getData(){
      var postUrl = this.is_tab==0 ? "/Shop/Service/serviceList" : "/Shop/Evaluate/evaluateList";
      if( this.hasAjax == 0 ){
        this.hasAjax = 1;
        this.$http.post(postUrl, {page:this.page,user_id:this.$route.query.id},{emulateJSON:true}).then(function(response){ 
          this.hasAjax = 0;
          if( this.page == 0 ){
            this.list = this.is_tab==0 ? response.data.data.list : response.data.data.data;
            this.page++;              
          }else{
            if( this.is_tab==0 ? response.data.data.list.length==0 : response.data.data.data.length == 0 ){     
              this.hasAjax = 1;
              this.nomore = 1;
            }else{              
              this.page++;
              this.list = this.list.concat(this.is_tab==0?response.data.data.list:response.data.data.data);
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
        this.$store.commit('scrollFun',{dom:"JuserHomepage",auto:true,bottomCall:function(){   
          that.$store.commit('loading',{show:true,text:'加载中...'});         
          that.getData();
        }})
    },
    getSkill(){
      this.$http.post('/Shop/Skill/skill', {user_id:this.$route.query.id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.skillData = returnData.data;
        }
      });
    },
    ontabFun(type){
      this.is_tab = type;
      this.list = [];
      this.page = 1;
      this.hasAjax = 0;
      this.nomore = 0;
      if( type == 2 ){
        this.getSkill();
      }else{
        this.getData();        
      }
    }

  }

}
</script>

