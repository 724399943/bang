<template>
  <div class="content">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">相关资质</h1>
		</header>
		<div class="main pd">
			 <div class="y-bindphone">
          <ul>              
            <li class="ute" v-for="(auth,index) in authList" :data-index=index :class="{touchleft:is_target == index}" @touchstart="bindEvent(index)">
              <router-link :to="{name:'authDetail',params:{id:auth.id,type:auth.type}}" :data-index=index>
                <span>{{auth.auth_name}}</span>
                <p class="txt"><template v-if="auth.is_auth==0">未认证</template><template v-else>已认证</template></p>
              </router-link>
              <span class="delbtn" @touchstart="delAuth(auth.id,'fixed',index)">删除</span>
            </li>
            <li class="ute" v-for="(other,index) in otherAuthList" :data-index=parseInt(index)+parseInt(authList.length) :class="{touchleft:is_target == parseInt(index)+parseInt(authList.length)}" @touchstart="bindEvent(index)">
              <router-link :to="{name:'authDetail',params:{id:other.id,type:other.type}}" :data-index=parseInt(index)+parseInt(authList.length)>
                <span>{{other.auth_name}}</span>
                <p class="txt"><template v-if="other.is_auth==0">未认证</template><template v-else>已认证</template></p>
              </router-link>
              <span class="delbtn" @touchstart="delAuth(other.id,'other',index)">删除</span>
            </li> 
          </ul>
      </div>
      <router-link :to="{name:'authDetail',params:{type:'add'}}" class="addAptitude">添加其他认证</router-link>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      authList:[],
      otherAuthList:[],
      startX:null,
      is_target:null
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
      this.$http.post('/Shop/Auth/authList', {},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.authList = returnData.data.authList;
          this.otherAuthList = returnData.data.otherAuthList;
        }
      });
    },
    bindEvent : function(index){
      document.addEventListener('touchstart', this.touchSatrtFun(index,event), false);
      document.addEventListener('touchmove', this.touchMoveFun, false);
    },
    touchSatrtFun : function(index,event){
      var that = this;
      var x = Number(event.touches[0].pageX);
      this.startX = x;                   
    },
    touchMoveFun : function(event){  
      var x = Number(event.touches[0].pageX);       
      var index = event.target.parentNode.parentNode.getAttribute('data-index') || event.target.getAttribute('data-index');
      if( x - this.startX < 0 ){
        this.is_target = index;
      }else{
        this.is_target = null;
      }        
    },
    delAuth(id,type,index){
      this.$http.post('/Shop/Auth/delAuth', {id:id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.$store.commit("alert",{show:true,text:"删除成功"});
          if( type == 'fixed' ){
            this.authList.splice(index,1);
          }else{
            this.otherAuthList.splice(index,1);
          }
        }
      });
    }

  }

}
</script>

