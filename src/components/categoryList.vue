<template>
  	<div class="content">
  		<header class="head">
        <h1 class="y-confirm-order-h1">需求分类</h1>
      </header>
  		<div class="main pd">
  			<div class="nuu-f0f0f5 clearfix" id="content">
            <div class="con-fl-nav br" id="JlevelOne">
                <ul class="all-class">
                    <li v-for="(level,index) in levelOneList" :class="{on:pid==level.id}" @click="ontabFun(level.id)">
                        <a href="javascript:;">{{level.category_name}}</a>
                    </li>                                 
                </ul>
            </div>
            <div class="con-fr-nav" id="JlevelTwo">                
                <div class="igoodsMain">
                  <ul>
                    <li v-for="(item,index) in levelTwoList">
                      <router-link :to="{name:'requirementsList',query:{category_id:item.category_id,pid:item.pid,category_name:item.category_name}}">
                        <div class="imgbox">
                          <img :src="item.app_icon">
                        </div>
                        <p class="gt">{{item.category_name}}</p>                        
                      </router-link>
                    </li>                              
                  </ul>
                  <!-- <p class="nomore">已经到底啦~</p> -->
              </div>        
            </div>
  	     </div>         
  		</div>
  	</div>
</template>
<script>

export default {

  data () {
    return {
      OhasAjax:0,
      Opage:1,
      levelOneList:[],
      ThasAjax:0,
      Tpage:1,
      levelTwoList:[],
      pid:''
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getLevelOne();    
  },
  mounted(){
    this.loadMoreOne();
    this.loadMoreTwo();
    this.$store.commit('loading',{show:false});  
  },
  methods: {
    getLevelOne(){      
      if( this.OhasAjax == 0 ){
        this.OhasAjax = 1;
        this.$http.post('/Shop/Service/serviceCategory', {page:this.Opage,level:1},{emulateJSON:true}).then(function(response){ 
          this.OhasAjax = 0;
          if( this.Opage == 1 ){
            this.pid = response.data.data.data[0].id;
            this.$store.state.is_auth = response.data.user.is_auth;
            localStorage.is_auth = response.data.user.is_auth;
            this.getLevelTwo();
          } 
          if( this.Opage == 0 ){
            this.levelOneList = response.data.data.data;
            this.Opage++;              
          }else{
            if( response.data.data.length == 0 ){                
              this.OhasAjax = 1;
            }else{
              this.Opage++;
              this.levelOneList = this.levelOneList.concat(response.data.data.data);
            }
          }                  
          this.$store.commit('loading',{show:false});                                         
        });        
      }
    },
    loadMoreOne(){         
        var that = this;
        this.$store.commit('scrollFun',{dom:"JlevelOne",auto:false,bottomCall:function(){ 
          that.$store.commit('loading',{show:true,text:'加载中...'});          
          that.getLevelOne();
        }})
    },
    getLevelTwo(){      
      if( this.ThasAjax == 0 ){
        this.ThasAjax = 1;
        this.$http.post('/Shop/Service/serviceCategory', {pid:this.pid,page:this.Tpage,level:2},{emulateJSON:true}).then(function(response){ 
          this.ThasAjax = 0;
          if( this.Tpage == 0 ){
            this.levelTwoList = response.data.data.data;
            this.Tpage++;              
          }else{
            if( response.data.data.length == 0 ){                
              this.ThasAjax = 1;
            }else{
              this.Tpage++;
              this.levelTwoList = this.levelTwoList.concat(response.data.data.data);
            }
          }
          this.$store.commit('loading',{show:false});                                         
        });        
      }
    },
    loadMoreTwo(){         
        var that = this;
        this.$store.commit('scrollFun',{dom:"JlevelTwo",auto:false,bottomCall:function(){   
          that.$store.commit('loading',{show:true,text:'加载中...'});         
          that.getLevelTwo();
        }})
    },
    ontabFun(pid){
      this.pid = pid;
      this.ThasAjax = 0,this.Tpage = 1,this.levelTwoList = [];
      this.$store.commit('loading',{show:true,text:'加载中...'});
      this.getLevelTwo();
    }  

  }

}
</script>

