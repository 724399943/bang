<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">意见反馈</h1>
      <span class="text" @click="commitFun">发布</span>
		</header>
		<div class="main plg">
       <div class="feedwrap">
    			 <textarea placeholder="请描述您的问题，若是人工服务则请留下您的联系方式，稍后会有专员联系您。" maxlength="100" class="feedtext" id="Jtextarea" @input="changeText" v-model="text"></textarea>
           <div class="feednum">{{length}}/100</div>
       </div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      text : "",
      length : 0
    }
  },  
  methods: {
    commitFun : function(){     
      if( !this.text ){
        this.$store.commit("alert",{show:true,text:"请描述您的问题"}); 
        return;
      }
      this.$http.post('/Shop/Setting/feedBack', {text:this.text},{emulateJSON:true}).then(function(response){
        this.text = "";
        this.$store.commit("alert",{show:true,text:response.data.message});                                     
      }); 
    },
    changeText(){
      var Jtextarea = document.getElementById("Jtextarea");
      this.length = Jtextarea.value.length;
    }
  }

}
</script>

