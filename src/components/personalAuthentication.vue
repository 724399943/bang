<template>
	<div class="content" id="content">		
      <div class="main plg">
      	  <header class="head">
            <a class="ico back" href="javascript:window.history.go('-1');"></a>
            <h1 class="y-confirm-order-h1">实名认证</h1>
            <span class="text" @touchstart="commitAuth">保存</span>
          </header>
          <div class="y-bindphone">
            <ul>              
              <li>
                <span>真实姓名</span>
                <input type="text" name="" placeholder="请输入" class="txt" v-model="dataJson.truename">
              </li>
              <li class="ute" @touchstart="choiceSex('open')">
                  <span>性别</span>
                  <input type="text" name="" class="txt" disabled="disabled" value="" placeholder="请选择" v-model="sex">
              </li> 
              <li class="ute">
                  <span>年龄</span>
                  <input type="text" name="" class="txt" readonly="readonly" value="" id="Jcalendar" placeholder="请选择">
                  <input id="birthday" type="hidden" name="birthday" value="2018-03-13">
              </li>  
              <li class="ute">
                  <span>地区</span>
                  <input type="text" name="" class="txt" readonly="readonly" value="" placeholder="请选择" id="JLAreaclick">
                  <input id="JAreavalue" type="hidden">
                  <input id="province" type="hidden" name="province">
                  <input id="city" type="hidden" name="city">
                  <input id="county" type="hidden" name="county">
              </li>   
              <li>
                <span>身份证号</span>
                <input type="text" name="" placeholder="请输入" class="txt" v-model="dataJson.id_number">
              </li>      
            </ul>
        </div>
        <div class="reg-upload">
            <p class="title">上传身份证件：</p>
            <div class="load-row mar">
                <div class="imgbox">
                    <img src="../assets/images/login_card_me.png" v-if="front==0">
                    <img :src="dataJson.front_url" v-else>
                </div>
                <div class="uploadbtn mal">
                    <img src="../assets/images/home_icon_upload.png" class="add">
                    <p class="pt">身份证正面</p>
                    <input type="file" name="" accept="image/*" @change="imageuploaded($event,'front')" v-if="(iphone == false && android == false) || iphone == true">
                    <input type="button" @click="choose('front')" v-else-if="android == true">
                </div>
            </div>
            <div class="load-row mar">
                <div class="imgbox">
                    <img src="../assets/images/login_card_me_z.png" v-if="back==0">
                    <img :src="dataJson.back_url" v-else>
                </div>
                <div class="uploadbtn mal">
                    <img src="../assets/images/home_icon_upload.png" class="add">
                    <p class="pt">身份证反面</p>
                    <input type="file" name="" accept="image/*" @change="imageuploaded($event,'back')" v-if="(iphone == false && android == false) || iphone == true">
                    <input type="button" @click="choose('back')" v-else-if="android == true">
                </div>
            </div>
        </div>
        <transition name="fade">
          <div class="choiceBox" v-show="is_selSex==1">
              <div class="choice-wrap" :class="{slideUp:is_selSex==1,slideDown:is_selSex==0}">
                <div class="opction">
                    <p class="pt" :class="{on:dataJson.sex==0}" @click="choiceSex('sel',0)">男</p>
                    <p class="pt" :class="{on:dataJson.sex==1}" @click="choiceSex('sel',1)">女</p>
                </div>
                <div class="btn" @click="choiceSex('cancle')">取消</div>
              </div>
          </div>
        </transition>
      </div>
	</div>
</template>
<script>
import {} from '../assets/js/LArea.js';
import {} from '../assets/js/LCalendar.js';
export default {

  data () {
    return {
      dataJson:{auth_name:'实名认证',type:0},
      is_selSex:0,
      sex:null,
      front:0,
      back:0,
      iphone : false,
      android : false,
      imgtype:null
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
  components : {
    
  }, 
  mounted(){
  	this.apifun();
  },
  methods: {
    commitAuth(){
      var that = this;
      this.$http.post('/Shop/Auth/commitAuth', this.dataJson,{emulateJSON:true}).then(function(response){ 
        this.$store.commit('loading',{show:true,text:'提交中...'});
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.$store.commit('loading',{show:false});
          this.$store.state.is_auth = 1;
          localStorage.is_auth = 1;
          this.$store.commit("alert",{show:true,text:returnData.message,call:function(){
            that.$router.push("/");
          }});
        }else{
          this.$store.commit('loading',{show:false});
          this.$store.commit("alert",{show:true,text:returnData.message});
        }
      });
    },
    choiceSex(type,sex){
      if( type == 'open' ){
        this.is_selSex = 1;
      }else if( type == "cancle" ){
        this.is_selSex = 0;
      }else if( type == "sel" ){
        this.dataJson["sex"] = sex;
        this.sex = sex==0 ? "男" : "女"; 
        this.is_selSex = 0;
      }
    },
    imageuploaded(event,type) {
      var that = this;
      var files = event.target.files || event.dataTransfer.files;
      var reader = null;
      reader = new window.FileReader();
      reader.readAsDataURL(files[0]);      
      reader.onload = function(e){
        that.$http.post('/Shop/Public/base64Upload', {image:e.target.result,dir:'Auth'},{emulateJSON:true}).then(function(response){
            if( response.data.status == "200000" ){
              if( type == 'front' ){
                that.dataJson["front_url"] = response.data.data.image;
                that.front = 1;
              }else{
                that.dataJson["back_url"] = response.data.data.image;
                that.back = 1;
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
        this.dataJson["front_url"] = images;
        this.front = 1;
      }else{
        this.dataJson["back_url"] = images;
        this.back = 1;
      }    
    },
    apifun(){
      // 初始化所在地信息
      var that = this;
      var LA = new LArea();
      LA.init({
        'trigger': '#JLAreaclick', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#JAreavalue', //选择完毕后id属性输出到该位置
        'keys': {
          id: 'id',
          name: 'name'
        },
        //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        // 'data': LAreaData ,  //数据源
        'callback': function() {
            that.dataJson['province'] = document.getElementById('province').value
            that.dataJson['city'] = document.getElementById('city').value
            that.dataJson['county'] = document.getElementById('county').value
            that.dataJson['area'] = document.getElementById('JAreavalue').value
          }
      });
      //初始化选择日期
      var calendar = new LCalendar();
        calendar.init({
          'trigger': '#Jcalendar', //标签id
          'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
          'minDate': '1920-01-01', //最小日期
          'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(), //最大日期,
          'callback': function() {
              var birthday = document.getElementById("Jcalendar").value;
              var arr = [];
              arr = birthday.split('-');
              var age = new Date().getFullYear() - parseInt(arr[0]);
              document.getElementById("Jcalendar").value = age;
              that.dataJson["age"] = age;
          }
      });
    }

  }

}
</script>
<style>
  @import '../assets/css/LArea.css';
  @import '../assets/css/LCalendar.css';
</style>