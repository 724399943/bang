<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">设置</h1>
		</header>
		<div class="main">
			 <div class="y-bindphone">
          <ul>              
            <li class="ute">
              <router-link to="feedback">
                <span>意见反馈</span>
              </router-link>
            </li>
            <li class="ute">
              <router-link to="commonProblem">
                <span>常见问题</span>
              </router-link>
            </li> 
            <li class="ute">
              <a href="javascript:;">
                <span>清除本地缓存(281M)</span>
              </a>
            </li>                
            <li class="ute">
              <router-link to="aboutUs">
                <span>关于我们</span>
              </router-link>
            </li> 
            <li class="ute">
              <a href="javascript:;">
                <span>版本更新 V1.0</span>
              </a>
            </li> 
            <li class="ute">
              <a href="tel:121215465465">
                <span>联系客服</span>
                <p class="txt">1256548532121</p>
              </a>
            </li>
            <li class="ute">
              <a href="javascript:;" @click="logout">
                <span>退出登录</span>
                <p class="txt"></p>
              </a>
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
      
    }
  },
  created(){
    
  },
  mounted(){
    
  },
  methods: {
    logout(){
      this.$http.post('/Shop/Login/logout', {}, {emulateJSON:true}).then(function(response){
          var returnData = response['data'];
          console.log(returnData);
          if( returnData['status'] == "200000" ){
              localStorage.session_id = "undefined";
              localStorage.is_auth = "undefined";
              this.$router.push({name: 'login'});
          } 
      });
    },
  }

}
</script>

