<template>
	<div class="content">		
      <div class="main pd" id="Jloginmain">
      	  <header class="head">
            <a class="ico back" href="javascript:window.history.go('-1');"></a>
            <h1 class="y-confirm-order-h1"></h1>
          </header>
          <img src="../assets/images/logo.png" class="login_logo">
          <form class="login_form">
            <div class="login_box">
              <div class="login_input">
                <span class="name">手机</span>
                <input type="number" placeholder="请输入手机号" v-model="dataJson.account">
              </div> 
              <div class="login_input">
                <span class="name">密码</span>
                <input type="password" id="Kpassword" placeholder="请输入密码" v-model="dataJson.password"> 
                <em :class="{on:openEye == true}" @click="showEye"></em>
              </div> 
              <div class="linput">
                <router-link to="/register" class="lset">新用户注册</router-link> 
                <router-link to="/forgotPassword" class="lpass">忘记密码</router-link>
              </div>
            </div>
          </form>
          <a href="javascript:;" class="login_btn" @click="signIn">登录</a>
          <div class="cooperative-login" id="Jlogin">  
              <p class="pt">第三方登录</p>                  
              <div class="box">
                  <a href="mitchell://third_login?type=sina_weibo" class="l-g-b">
                      <img src="../assets/images/login_icon_w.png">
                  </a>
                  <a href="mitchell://third_login?type=wechat" class="l-g-b">
                      <img src="../assets/images/login_icon_what.png">
                  </a>
                  <a href="mitchell://third_login?type=qq" class="l-g-b">
                      <img src="../assets/images/login_icon_qq.png">
                  </a>
              </div>
          </div>
          <div class="login_tips" v-if="is_tips == 1">{{tips}}</div>
          <transition name="fade">
            <div class="login-alert" v-if="is_alert == 1">
                <div class="login-alertBox">
                      <div class="txt">该账号未注册</div>
                      <div class="btnBox">
                          <a href="javascript:;" @click="closeAlert">取消</a>
                          <router-link to="/register" class="reg">注册</router-link>
                      </div>
                </div>
            </div>
          </transition>
      </div>
	</div>
</template>
<script>
export default {

  data () {
    return {
      dataJson:{},
      is_tips:0,
      tips:"",
      is_alert:0,
      openEye:false
    }
  },
  created(){
    
  },   
  components : {
    
  }, 
  mounted(){
  	this.focusFun();
  },
  methods: {
    signIn(){
      if ( !this.dataJson.account ) {
        this.processTips(1, '请输入手机号码');
        return;
      } else if ( !this.verifyPhone(this.dataJson.account) ) {
        this.processTips(1, '请输入正确的账号');
        return;
      } else if ( !this.dataJson.password ) {
        this.processTips(1, '请输入密码');
      }else{
        this.$http.post('/Shop/Login/login', this.dataJson,{emulateJSON:true}).then(function(response){ 
          var returnData = response['data'];
          if( returnData.status == 200000 ){
            localStorage.session_id = "undefined";
            localStorage.is_auth = "undefined";
            localStorage.session_id = returnData['data']['session_id'];
            localStorage.is_auth = returnData["user"]["is_auth"];
            window.location.href = "mitchell://login?user_id="+ returnData['data']['userId'] +'&session_id='+ returnData['data']['session_id'] +'&headimgurl='+ returnData['data']['headimgurl'] + '&nickname=' +returnData['data']['nickname'];
            window.onEaseLoginStatus = this.onEaseLoginStatus;
            this.$router.push('/');
          }else if( returnData.status == 500020 ){
            this.is_alert = 1;
          }else{
            this.processTips(1, returnData.message);
          }
        });
      }
    },
    verifyPhone : function(telephone){
      var telReg = !!telephone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[6780]|18[0-9]|14[57])[0-9]{8}$/);
      return telReg;
    },
    processTips : function(show, tips){
      var that = this;
      this.is_tips = show;    
      this.tips = tips;
      setTimeout(function(){
        that.is_tips = 0;that.tips = "";
      },3000)
    },
    showEye : function(){
      var password = document.getElementById('Kpassword');
      if ( this.openEye == false ) {
        this.openEye = true;
        password.setAttribute('type', 'text');
      } else {
        this.openEye = false;
        password.setAttribute('type', 'password');
      }
    },
    closeAlert:function(){
      this.is_alert = 0;
    },
    focusFun:function(){
      var h = window.innerHeight;
      document.getElementById("Jloginmain").style.height = h - 90 +"px";
      document.getElementById("Jloginmain").style.position = "relative";
    },
    onEaseLoginStatus:function(status){
      if( status == false ){
        localStorage.session_id = "undefined";
        localStorage.is_auth = "undefined";
      }
    }

  }

}
</script>