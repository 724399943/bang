<template>
  	<div class="content">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">职业身份</h1>
			<span class="text" @click="saveJob">保存</span>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<div class="user-input">
          <span>职业身份</span>
					<input type="text" name="" placeholder="请输入身份" v-model="job">
				</div>
			</div>			
		</div>
  	</div>
</template>
<script>

export default {
  data () {
    return {
      job:this.$route.params.job
    }
  },
  created(){
    
  },
  components : {
    
  },
  mounted(){
    
  },
  methods: {
    saveJob(){
      var that = this;
      if( !this.job ){
        this.$store.commit('alert',{show:true,text:"请输入身份"});
        return;
      }
      this.$http.post('/Shop/User/updateUser', {job:this.job},{emulateJSON:true}).then(function(response){         
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

