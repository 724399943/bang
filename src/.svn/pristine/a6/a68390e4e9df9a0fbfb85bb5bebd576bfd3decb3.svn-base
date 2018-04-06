<template>
	<div class="content">		
      <div class="main pd">
      	  <header class="head">
            <a class="ico back" href="javascript:window.history.go('-1');"></a>
            <h1 class="y-confirm-order-h1">用户注册</h1>
          </header>
		  <form class="login_form">
            <div class="login_box">
              <div class="login_input">
                <span class="name">手机号</span>
                <input type="number" placeholder="请输入手机号" v-model="dataJson.phone">
              </div>
              <div class="login_input">
                <span class="name">验证码</span>
                <input type="number" placeholder="请输入验证码" v-model="dataJson.verify">
                <a href="javascript:;" class="codeBtn" id="getCode" @click="getCode" v-if="noget">获取验证码</a>
                <a href="javascript:;" class="codeBtn res" v-else>重新发送({{settimes}})</a>
              </div> 
              <div class="login_input">
                <span class="name">密码</span>
                <input type="password" id="Kpassword" placeholder="6-16字符，英文、数字、符号" v-model="dataJson.password"> 
                <em :class="{on:openEye == true}" @click="showEye"></em>
              </div> 
              <div class="agree">注册代表已阅读且同意 <router-link to="/userAgreement" class="txt">《用户协议》</router-link></div>
              <a href="javascript:;" class="login_btn" @click="register">注册</a>
            </div>
          </form>     
          <div class="login_tips" v-if="is_tips == 1">{{tips}}</div>
          <transition name="fade">
          <div class="reg_tips" v-if="is_alert == 1">
          	   <img src="../assets/images/login_input_icon_ok.png" class="ico">
          	   <p class="pt">注册成功</p>
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
      noget : 1,
      settimes : 60,
      openEye:false,
      is_alert:0
    }
  },
  created(){
    
  },     
  mounted(){
  	
  },
  methods: {
    register(){
      var that = this;
      if ( !this.dataJson.phone ) {
        this.processTips(1, '请输入手机号码');
        return; 
      } else if ( !this.verifyPhone(this.dataJson.phone) ) {
        this.processTips(1, '请输入正确的账号');
        return;
      } else if ( !this.dataJson.verify ) {
        this.processTips(1, '请输入验证码');
      }else if ( !this.dataJson.password ) {
        this.processTips(1, '请输入密码');
      }else{
        this.$http.post('/Shop/Login/register', this.dataJson,{emulateJSON:true}).then(function(response){ 
          var returnData = response['data'];
          if( returnData.status == 200000 ){
            this.is_alert = 1;
            setTimeout(function(){
              that.is_alert = 0;
              that.$router.push("/selectUserType");
            },3000)
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
    getCode : function(){      
      if ( !this.dataJson.phone ) {
        this.processTips(1, '请输入手机号码');
        return;
      } else if ( !this.verifyPhone(this.dataJson.phone) ) {
        this.processTips(1, '手机号码格式不正确');
        return;
      } else {
        var that = this;
        if ( that.noget == 1 ) {
        that.$http.post('/Shop/Login/getVerifyCode', {account:this.dataJson.phone,type:0}, {emulateJSON:true}).then(function(response){
          var returnData = response['data'];
          if( returnData['status'] == '200000' ){
            var getCode = document.getElementById('getCode');
            that.settime(getCode);      
          }else{
            that.processTips(1, returnData['message']);
          }     
        });
      }
      }
    },
    settime : function(object){
        var that = this;
        if ( that.settimes == 0 ) { 
            object.innerText = "获取验证码";
            that.noget = 1;
            that.settimes = 60; 
        } else { 
            object.innerText = "重新发送("+ that.settimes +")";
            that.noget = 0;
            that.settimes--;
            setTimeout(function(){ that.settime(object) }, 1000);
        } 
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
    }

  }

}
</script>