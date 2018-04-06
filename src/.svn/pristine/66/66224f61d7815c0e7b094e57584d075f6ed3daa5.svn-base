<template>
  	<div class="content">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">修改昵称</h1>
			<span class="text" @click="saveNickname">保存</span>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<div class="user-input">
          <span>昵称</span>
					<input type="text" name="" placeholder="请输入昵称" v-model="nickname">
				</div>
				<p class="yutips">4-16个字符，仅支持中文、英文大小写、数字</p>
			</div>			
		</div>
  	</div>
</template>
<script>

export default {
  data () {
    return {
      nickname:this.$route.params.nickname
    }
  },
  created(){
    
  },
  components : {
    
  },
  mounted(){
    
  },
  methods: {
    saveNickname(){
      var that = this;
      if( !this.nickname ){
        this.$store.commit('alert',{show:true,text:"请输入昵称"});
        return;
      }
      this.$http.post('/Shop/User/updateUser', {nickname:this.nickname},{emulateJSON:true}).then(function(response){         
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.$store.commit('alert',{show:true,text:returnData.message,call:function(){
            that.$router.go(-1);
          }});
        }else{
          this.$store.commit('alert',{show:true,text:returnData.message});
        }
      });
    }

  }

}
</script>

