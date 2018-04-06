<template>
  	<div class="content">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">个性签名</h1>
			<span class="text" @click="saveSignature">保存</span>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<div class="user-input">
          <span>个性签名</span>
					<input type="text" name="" placeholder="请输入签名" v-model="signature">
				</div>
			</div>			
		</div>
  	</div>
</template>
<script>

export default {
  data () {
    return {
      signature:this.$route.params.signature
    }
  },
  created(){
    
  },
  components : {
    
  },
  mounted(){
    
  },
  methods: {
    saveSignature(){
      var that = this;
      if( !this.signature ){
        this.$store.commit('alert',{show:true,text:"请输入签名"});
        return;
      }
      this.$http.post('/Shop/User/updateUser', {signature:this.signature},{emulateJSON:true}).then(function(response){         
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

