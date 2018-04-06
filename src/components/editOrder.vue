<template>
  <div class="content">
    <div class="content" id="content" v-show="selAddress=='close'">
    	<header class="head">
  			<a class="ico back" href="javascript:window.history.go(-1);"></a>
  			<h1 class="y-confirm-order-h1">需求内容</h1>
  		</header>
  		<div class="main plg">
  			 <div class="demtitle">
            <span>需求标题</span>
            <input type="text" name="" class="txt" value="" placeholder="请输入" v-model="dataJson.title">   
         </div>
         <div class="placeNav">
             <p class="title">接收交换服务类型</p>  
             <nav class="onav">
                <span :class="{on:dataJson.type==1}" @touchstart="ontabFun('nav',1)">服务</span>
                <span :class="{on:dataJson.type==2}" @touchstart="ontabFun('nav',2)">物品</span>
             </nav> 
         </div>
         <div class="y-bindphone demli">
              <ul>   
                <li class="autoheight">
                  <p class="name">需求描述</p>
                  <textarea class="demtxt" placeholder="描述您的需求，可附上时间、地点等描述" v-model="dataJson.describe"></textarea>
                </li>  
                <!-- 服务 -->
                <template v-if="dataJson.type==1">
                <li>
                  <span>联系人</span>
                  <input type="text" name="" placeholder="请输入" class="txt" v-model="dataJson.contacts">
                </li>   
                <li>
                  <span>联系电话</span>
                  <input type="number" name="" placeholder="请输入" class="txt" v-model="dataJson.phone">
                </li>
                </template>
                <!-- 物品 -->
                <template v-else-if="dataJson.type==2">
                <li class="autoheight" @click="choiceAddress('open')">
                  <div class="usr">
                    <span>{{dataJson.contacts}}</span>
                    <div class="phone">{{dataJson.phone}}</div>
                  </div>
                  <div class="demadd">{{dataJson.province}} {{dataJson.city}} {{dataJson.county}} {{dataJson.address}}</div>
                </li> 
                </template>              
                <li class="autoheight">
                  <p class="name">提供描述服务</p>
                  <textarea class="demtxt" placeholder="描述您的需求，可附上时间、地点等描述" v-model="dataJson.provide_describe"></textarea>
                </li>                                             
              </ul>
          </div>
          <div class="dempart">
              <p class="name">图片</p>
              <div class="photoList">
                  <div class="imgbox" v-for="(img,index) in dataJson.images">
                      <img :src="img">
                      <em class="closed" @click="delImage(img,index)"></em>
                  </div>                
                  <div class="imgbox">
                      <img src="../assets/images/home_btn_picture_add.png">
                      <input type="file" name="" accept="image/*" @change="imageuploaded">
                  </div>
              </div>
          </div>
          <div class="dempart">
              <p class="name">需求有效期</p>
              <div class="demdate">
                  <span :class="{on:dataJson.validity_time==1}" @touchstart="ontabFun('time',1)">一天</span>
                  <span :class="{on:dataJson.validity_time==2}" @touchstart="ontabFun('time',2)">一周</span>
                  <span :class="{on:dataJson.validity_time==3}" @touchstart="ontabFun('time',3)">一月</span>
                  <span :class="{on:dataJson.validity_time==4}" @touchstart="ontabFun('time',4)">三月</span>
                  <span :class="{on:dataJson.validity_time==5}" @touchstart="ontabFun('time',5)">一年</span>
              </div>
          </div>
          <div class="demrule">
            <div class="check_box">
                <input type="checkbox" name="" id="check" v-model="is_check" @change="checkFun">
                <label for="check"></label>
            </div>
            我已阅读且同意<router-link to="/publishRule" class="rule">《需求发布规则》</router-link>
          </div>
          <div class="placeBtn" @touchstart="commitDemand">确认发布</div>
  		</div>
    </div>
    <div class="content ploadd" :class="{slideLeft:selAddress=='open'}">
      <header class="head">
      <a class="ico back" href="javascript:;" @click="choiceAddress('close')"></a>
      <h1 class="y-confirm-order-h1">收货地址</h1>
      </header>
      <div class="main pd">
         <ul class="addressList">
            <li v-for="(item,index) in list" @touchstart="choiceAddress('sel',item.id,index)">
              <a href="javascript:;">
                <div class="usr">
                    <span class="lf">{{item.consignee}}</span>
                    <span class="rg">{{item.telephone}}</span>
                </div>
                <div class="address"><span v-if="item.is_default==1">[默认地址]</span> <i>{{item.province_name}} {{item.city_name}} {{item.county_name}} {{item.address}}</i></div>
              </a>
            </li>            
         </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      dataJson:{order_sn:this.$route.query.order_sn},
      selAddress:"close",
      list:[],
      is_check:null
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
      this.$http.post('/Shop/Order/editOrderDetail', {order_sn:this.dataJson.order_sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.dataJson = returnData.data.data;
        }
      });
      this.$http.post('/Shop/Consignee/userConsignee', {},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.list = returnData.data.list;
        }
      });
    },
    commitDemand(){      
      var commitJson = {};
      commitJson["order_sn"] = this.$route.query.order_sn;
      commitJson["title"] = this.dataJson.title;
      commitJson["type"] = this.dataJson.type;
      commitJson["describe"] = this.dataJson.describe;
      commitJson["provide_describe"] = this.dataJson.provide_describe;
      commitJson["validity_time"] = this.dataJson.validity_time;
      commitJson["agree"] = this.dataJson.agree;
      commitJson["images"] = this.dataJson.images;    
      if( this.dataJson.type == 1 ){
        commitJson["contacts"] = this.dataJson.contacts;
        commitJson["phone"] = this.dataJson.phone;
      }else if( this.dataJson.type == 2 && this.dataJson.consignee_id ){
        commitJson["consignee_id"] = this.dataJson.consignee_id;
      }
      if( !commitJson["agree"] ){
        this.$store.commit("alert",{show:true,text:"请先阅读发布规则"});
        return;
      }
      console.log(JSON.stringify(this.dataJson.images));
      console.log(commitJson);
      this.$http.post('/Shop/Order/editOrder', commitJson,{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.$router.go(-1);
        }
        this.$store.commit("alert",{show:true,text:returnData.message});
      });
    },
    ontabFun(type,tab){
      if( type == "nav" ){
        this.dataJson.type = tab;
      }else{
        this.dataJson.validity_time = tab;
      }
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
                  that.dataJson["images"].push(response.data.data.image);
              }
          })
        }
    },
    delImage(url,index){
      this.$http.post('/Shop/Public/removePhoto', {image: url},{emulateJSON:true}).then(function(response){
        if ( response.data.status == '200000' ) {
          this.dataJson.images.splice(index, 1);
        }
      })
    },
    choiceAddress(type,id,index){
      if( type == "sel" ){
        this.dataJson["consignee_id"] = id;
        this.dataJson["province"] = this.list[index]["province_name"];
        this.dataJson["city"] = this.list[index]["city_name"];
        this.dataJson["county"] = this.list[index]["county_name"];
        this.dataJson["contacts"] = this.list[index]["consignee"];
        this.dataJson["phone"] = this.list[index]["telephone"];
        this.selAddress = "close";
        return;
      }
      this.selAddress = type;
    },
    checkFun:function(){
      this.dataJson.agree = this.is_check==false ? "" : 1;
    }

  }

}
</script>

