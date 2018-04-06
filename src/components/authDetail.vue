<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1"><template v-if="$route.params.type != 'add'">{{dataJson.auth_name}}</template><template v-else>其他认证</template></h1>
      <span class="text" @touchstart="commitAuth">保存</span>
		</header>
		<div class="main plg">
        <div class="y-bindphone" v-if="$route.params.type==0">
            <ul>              
              <li>
                <span>真实姓名</span>
                <input type="text" name="" placeholder="请输入" class="txt" v-model="dataJson.truename">
              </li>     
              <li>
                <span>身份证号</span>
                <input type="text" name="" placeholder="请输入" class="txt" v-model="dataJson.id_number">
              </li>                  
            </ul>
        </div>
			 <div class="y-bindphone" v-else>
            <ul>              
              <li>
                <span>认证名称</span>
                <input type="text" name="" placeholder="请输入" class="txt" v-model="dataJson.auth_name">
              </li>                                    
            </ul>
        </div>
        <div class="reg-upload">
            <p class="title">上传证件：</p>
            <div class="load-row mar">
                <div class="imgbox" v-if="front==1" @touchstart="seeBigImg(1,dataJson.front_url)">
                    <img :src="dataJson.front_url">
                    <div class="imgmask">
                        <p class="imtips">点击查看大图</p>
                    </div>
                </div> 
                <div class="imgbox" v-if="back==1" @touchstart="seeBigImg(1,dataJson.back_url,1)">
                    <img :src="dataJson.back_url">
                    <div class="imgmask">
                        <p class="imtips">点击查看大图</p>
                    </div>
                </div>                
            </div>
            <div class="load-row">                
                <div class="uploadbtn mr">
                    <img src="../assets/images/home_icon_upload.png" class="add">
                    <p class="pt">
                        <template v-if="$route.params.type==0">身份证正面</template>
                        <template v-else-if="$route.params.type==1">营业执照正面</template>
                        <template v-else-if="$route.params.type==3 || $route.params.type==6 || $route.params.type=='add'">证件正面</template>
                        <template v-else-if="$route.params.type==4">驾驶证正面</template>
                        <template v-else-if="$route.params.type==5">行驶证正面</template>
                    </p>
                    <input type="file" name="" accept="image/*" @change="imageuploaded($event,'front')" v-if="(iphone == false && android == false) || iphone == true">
                    <input type="button" @click="choose('front')" v-else-if="android == true">
                </div>
                <div class="uploadbtn">
                    <img src="../assets/images/home_icon_upload.png" class="add">
                    <p class="pt">
                        <template v-if="$route.params.type==0">身份证反面</template>
                        <template v-else-if="$route.params.type==1">营业执照反面</template>
                        <template v-else-if="$route.params.type==3 || $route.params.type==6 || $route.params.type=='add'">证件反面</template>
                        <template v-else-if="$route.params.type==4">驾驶证反面</template>
                        <template v-else-if="$route.params.type==5">行驶证反面</template>
                    </p>
                    <input type="file" name="" accept="image/*" @change="imageuploaded($event,'back')" v-if="(iphone == false && android == false) || iphone == true">
                    <input type="button" @click="choose('back')" v-else-if="android == true">
                </div>
            </div>
        </div>
        <div class="bigImgBox" v-if="is_big==true" @touchstart="seeBigImg(0)">
            <img :src="is_bigUrl">
        </div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      dataJson:{},
      is_big:false,
      is_bigUrl:null,
      front:0,
      back:0,
      iphone : false,
      android : false,
      imgtype:null
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    if( this.$route.params.type != 'add' ){
      this.getData();      
    }
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
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
      this.$http.post('/Shop/Auth/authDetail', {id:this.$route.params.id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.dataJson = returnData.data.data;
          this.front = this.dataJson.front_url != 'undefined' ? 1 : 0;
          this.back = this.dataJson.back_url != 'undefined' ? 1 : 0;
        }
      });
    },
    seeBigImg(type,url){
      this.is_big = type==1 ? true : false;
      this.is_bigUrl = url;
    },
    commitAuth(){
      console.log(this.dataJson);
      let authJson = {};
      if( this.$route.params.type != 'add' ){
        authJson["id"] = this.dataJson.id;        
      }
      authJson["front_url"] = this.dataJson.front_url;
      authJson["back_url"] = this.dataJson.back_url;
      authJson["auth_name"] = this.dataJson.auth_name;
      authJson["type"] = this.$route.params.type=='add' ? 6 : this.$route.params.type;
      if( this.$route.params.type == 0 ){
        authJson["truename"] = this.dataJson.truename;
        authJson["id_number"] = this.dataJson.id_number;
        authJson["sex"] = this.dataJson.sex;
        authJson["age"] = this.dataJson.age;
        authJson["province"] = this.dataJson.province;
        authJson["city"] = this.dataJson.city;
        authJson["area"] = this.dataJson.area;
      }else if( this.$route.params.type == 1 ){
        authJson["company_name"] = this.dataJson.company_name;
        authJson["representative"] = this.dataJson.representative;
      }
      console.log(authJson);
      // return;
      this.$http.post('/Shop/Auth/commitAuth', authJson,{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.$store.commit("alert",{show:true,text:returnData.message});
          this.$router.go(-1);
        }
      });
    },
    imageuploaded(event,type) {
        var that = this;
        var files = event.target.files || event.dataTransfer.files
        var reader = null;
        reader = new window.FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function(e){
          that.$http.post('/Shop/Public/base64Upload', {image:e.target.result,dir:'Auth'},{emulateJSON:true}).then(function(response){
              if( response.data.status == "200000" ){
                if( type == 'front' ){
                  that.front = 1;
                  console.log(that.front);
                  that.dataJson["front_url"] = response.data.data.image;
                }else{
                  that.back = 1;
                  that.dataJson["back_url"] = response.data.data.image;
                }
                if( that.$route.params.type == 'add' ){
                  that.front = that.dataJson.front_url ? 1 : 0;
                  that.back = that.dataJson.back_url ? 1 : 0;
                }
              }
          })
        }
    },
    choose(type){
      this.imgtype = type;
      //点击选择图片，js调用Android打开相册
        JSInterface.choose(1);
    },
    onChooseResult(images){
      if( this.imgtype == 'front' ){
        this.front = 1;
        this.dataJson["front_url"] = images;
      }else{
        this.back = 1;
        this.dataJson["back_url"] = images;
      }
      if( this.$route.params.type == 'add' ){
        this.front = this.dataJson.front_url ? 1 : 0;
        this.back = this.dataJson.back_url ? 1 : 0;
      }    
    }

  }

}
</script>

