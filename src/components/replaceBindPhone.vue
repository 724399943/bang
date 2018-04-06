<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">更换绑定手机</h1>
		</header>
		<div class="main">
        <div class="bindp-nav">
          <div class="navline" :class="step==1"><div class="linebox"><div class="line"></div></div></div>
          <div class="nav-box lf" :class="{on:step==0}">
            <div class="dotBox"><div class="dot"></div></div>
            <p class="txt">验证原手机</p>
          </div>
          <div class="nav-box rg" :class="{on:step==1}">
            <div class="dotBox"><div class="dot"></div></div>
            <p class="txt">绑定新手机</p>
          </div>
        </div>
        <!-- 验证 -->
        <template v-if="step == 0">
  			  <form class="test_form">
            <div class="login_box">
              <div class="login_input">
                <span class="name">手机号</span>
                <input type="number" placeholder="请输入手机号" v-model="dataJson.account">
              </div>
              <div class="login_input">
                <span class="name">验证码</span>
                <input type="number" placeholder="请输入验证码" v-model="dataJson.verify">
                <a href="javascript:;" class="codeBtn" id="getCode" @click="getCode" v-if="noget==1">获取验证码</a>
                <a href="javascript:;" class="codeBtn res" v-else>重新发送({{settimes}})</a>
              </div> 
              <p class="bindph">更换绑定手机账号不影响您的账户信息，更换之后，请使用新的手机号码登录。</p>
              <a href="javascript:;" class="login_btn rbindbtn" @click="verifyPhoneFun">更换</a>
            </div>
          </form> 
        </template>
        <!-- 更换 -->
        <template v-else>
          <form class="test_form">
            <div class="login_box">
              <div class="login_input">
                <span class="name">手机号</span>
                <input type="number" placeholder="请输入手机号" v-model="dataJson.account">
              </div>
              <div class="login_input">
                <span class="name">验证码</span>
                <input type="number" placeholder="请输入验证码" v-model="dataJson.verify">
                <a href="javascript:;" class="codeBtn" id="getCode" @click="getCode" v-if="noget==1">获取验证码</a>
                <a href="javascript:;" class="codeBtn res" v-else>重新发送({{settimes}})</a>
              </div> 
              <a href="javascript:;" class="login_btn rbindbtn" @click="changePhone">确定</a>
            </div>
          </form> 
        </template>
        <div class="login_tips" v-if="is_tips == 1">{{tips}}</div>
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
      codeType:4,
      step:0
    }
  },
  created(){
    
  },
  methods: {
    verifyPhoneFun(){
      var that = this;
      if ( !this.dataJson.account ) {
        this.processTips(1, '请输入手机号码');
        return; 
      } else if ( !this.verifyPhone(this.dataJson.account) ) {
        this.processTips(1, '请输入正确的账号');
        return;
      } else if ( !this.dataJson.verify ) {
        this.processTips(1, '请输入验证码');
      }else{
        this.$http.post('/Shop/Login/verifyPhone', this.dataJson,{emulateJSON:true}).then(function(response){ 
          var returnData = response['data'];
          if( returnData.status == 200000 ){   
            this.step = 1;         
            this.codeType = 3;
            this.noget = 1;
            this.settimes = 0;
            this.dataJson = {};
          }else{
            this.processTips(1, returnData.message);
          }
        });
      }
    },
    changePhone(){
      var that = this;
      console.log(this.dataJson.account);
      console.log(this.dataJson.verify); 
      if ( !this.dataJson.account ) {
        this.processTips(1, '请输入手机号码');
        return; 
      } else if ( !this.verifyPhone(this.dataJson.account) ) {
        this.processTips(1, '请输入正确的账号');
        return;
      } else if ( !this.dataJson.verify ) {
        this.processTips(1, '请输入验证码');
      }else{
        this.$http.post('/Shop/Login/changePhone', {phone:this.dataJson.account,verify:this.dataJson.verify},{emulateJSON:true}).then(function(response){ 
          var returnData = response['data'];
          if( returnData.status == 200000 ){
            this.$router.push("/login");
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
      if ( !this.dataJson.account ) {
        this.processTips(1, '请输入手机号码');
        return;
      } else if ( !this.verifyPhone(this.dataJson.account) ) {
        this.processTips(1, '手机号码格式不正确');
        return;
      } else {
        var that = this;
        if ( that.noget == 1 ) {
        that.$http.post('/Shop/Login/getVerifyCode', {account:this.dataJson.account,type:this.codeType}, {emulateJSON:true}).then(function(response){
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
    }

  }

}
</script>

