<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">订单申诉</h1>
      <span class="text" @click="commitFun">保存</span>
		</header>
		<div class="main plg">
       <div class="oappTop">
			    <p class="oappTitle">请选择问题分类</p>
          <div class="type">
              <span :class="{on:is_tab==1}" @click="ontabFun(1)">分摊分类1</span>
              <span :class="{on:is_tab==2}" @click="ontabFun(2)">问题分类2</span>
              <span :class="{on:is_tab==3}" @click="ontabFun(3)">问题分类2</span>
          </div>  
       </div>
       <div class="oappText">
          <textarea maxlength="100" id="Jtextarea" placeholder="请描述您的问题，若是人工服务则请留下您的联系方式，稍后会有专员联系您。" v-model="dataJson.description" @input="changeText"></textarea>
          <div class="oappnum">{{length}}/100</div>
       </div>
       <div class="oappImg">
          <div class="imgbox" v-for="(img,index) in dataJson.images">
              <img :src="img">
              <span class="delbtn" @click="delImgFun(img,index)"></span>
          </div>
          <div class="imgbox">
              <img src="../assets/images/user_btn_add_picture.png">
              <input type="file" name="" accept="image/*" @change="imageuploaded" v-if="(iphone == false && android == false) || iphone == true">
              <input type="button" @click="choose" v-else-if="android == true">
          </div>
       </div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      dataJson:{order_sn:this.$route.params.order_sn,who:this.$route.params.who,type:1,images:[]},
      length : 0,
      is_tab:0,
      iphone : false,
      android : false
    }
  },
  created(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') == -1) {
      if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
            this.iphone = true;
            this.android = false;
        } else {
            this.iphone = false;
            this.android = true;
        }
    }
    window.onChooseResult = this.onChooseResult;
  },
  mounted(){
    
  },
  methods: {
    commitFun(){      
      this.$http.post('/Shop/Order/commitOrderReturn', this.dataJson,{emulateJSON:true}).then(function(response){
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        if( returnData.status == 200000 ){
          this.$router.go(-1);
        }
      });
    },
    changeText(){
      var Jtextarea = document.getElementById("Jtextarea");
      this.length = Jtextarea.value.length;
    },
    imageuploaded(e) {
        var that = this;
        var files = e.target.files || e.dataTransfer.files
        var reader = null;
        reader = new window.FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function(e){
          that.$http.post('/Shop/Public/base64Upload', {image:e.target.result,dir:'Order'},{emulateJSON:true}).then(function(response){
              if( response.data.status == "200000" ){
                  that.dataJson.images.push(response.data.data.image);
              }
          })
        }
    },
    delImgFun(url,index){
      this.$http.post('/Shop/Public/removePhoto', {image:url},{emulateJSON:true}).then(function(response){
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.dataJson.images.splice(index,1);          
        }
      });
    },
    ontabFun:function(tab){
      this.is_tab = tab;
    },
    choose(){
      //点击选择图片，js调用Android打开相册
      var canChooseNumber = 3 - parseInt(this.dataJson.images.length);
      if ( canChooseNumber > 0 ) {
            JSInterface.choose(canChooseNumber);
      } else {
        this.$store.commit('alert',{show:true,text:'最多上传3张图片哦'});
      }      
    },
    onChooseResult(images){
      var imagesData = new Array();
      imagesData = images.split(',');
      for ( var i in imagesData) {      
        this.dataJson.images.push(imagesData[i]);   
      }
    }

  }

}
</script>

