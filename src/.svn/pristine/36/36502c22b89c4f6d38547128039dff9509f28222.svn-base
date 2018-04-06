<template>
  <div class="content">
  	<div class="content" id="content" v-show="selAddress=='close'">
    		<header class="head">
    			<a class="ico back" href="javascript:window.history.go(-1);"></a>
    			<h1 class="y-confirm-order-h1">确认订单</h1>
  		  </header>
    		<div class="main plg">
    			 <div class="placeNav">
               <p class="title">接收交换服务类型</p>  
               <nav class="onav">
                  <span :class="{on:is_tab=='fw'}" @touchstart="ontabFun('fw')">服务</span>
                  <span :class="{on:is_tab=='wp'}" @touchstart="ontabFun('wp')">物品</span>
               </nav> 
           </div>
           <div class="y-bindphone" v-show="is_tab=='fw'">
              <ul>              
                <li class="poli">
                  <span>联系人</span>
                  <input type="text" name="" placeholder="请输入" class="txt" v-model="dataJson.contacts">
                </li>
                <li class="poli">
                  <span>联系电话</span>
                  <input type="number" name="" placeholder="请输入" class="txt" v-model="dataJson.telephone">
                </li>  
              </ul>
           </div>
           <div class="y-bindphone" v-show="is_tab=='wp'">
              <ul>                          
                <li class="ute" @touchstart="choiceComAddress('open')">
                    <span>常用地址</span>
                    <input type="text" name="" class="txt" disabled="disabled" value="" placeholder="选择">
                </li> 
                <li>
                  <span>联系电话</span>
                  <input type="number" name="" placeholder="请输入" class="txt" v-model="dataJson.telephone">
                </li> 
                <li>
                  <span>联系人</span>
                  <input type="text" name="" placeholder="请输入" class="txt" v-model="dataJson.contacts">
                </li>   
                <li class="ute">
                    <span>接收地址</span>
                    <input type="text" name="" class="txt" readonly="readonly" value="" id="JLAreaclick" placeholder="请选择省市区">
                    <input id="JAreavalue" type="hidden">
                    <input id="province" type="hidden" name="province">
                    <input id="city" type="hidden" name="city">
                    <input id="county" type="hidden" name="county">
                </li>  
                <li class="ute address">
                    <span>详细地址</span>
                    <input type="text" name="" class="txt" value="" placeholder="请输入详细地址" id="JDTaddress">
                </li>                     
              </ul>
          </div>
          <div class="placeBtn" @touchstart="commitOrder">确认</div>
    		</div>
    </div>
    <div class="content ploadd" :class="{slideLeft:selAddress=='open'}">
      <header class="head">
      <a class="ico back" href="javascript:;" @click="choiceComAddress('close')"></a>
      <h1 class="y-confirm-order-h1">收货地址</h1>
      </header>
      <div class="main pd">
         <ul class="addressList">
            <li v-for="(item,index) in list" @touchstart="choiceComAddress('sel',index)">
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
import {} from '../assets/js/LArea.js';
export default {

  data () {
    return {
      dataJson:{order_sn:this.$route.query.order_sn},
      is_tab:'fw',
      list:[],
      selAddress:"close",
      area:[]
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
  },
  mounted(){    
    this.$store.commit('loading',{show:false});
    this.apifun();
  },
  methods: {
    commitOrder:function(){
      this.$http.post('/Shop/Order/confirmOrder', this.dataJson,{emulateJSON:true}).then(function(response){
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.$router.push("/receiveOrder");
        }
        this.$store.commit("alert",{show:true,text:returnData.message});
      });
    },
    ontabFun:function(type){
      this.is_tab = type;      
      this.dataJson = {order_sn:this.$route.params.order_sn};
      this.dataJson['type'] = type=='fw' ? 1 : 2;
    },
    getData(){
      this.$http.post('/Shop/Consignee/userConsignee', {},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.list = returnData.data.list;
        }
      });
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
    },
    choiceComAddress(type,index){
      if( type == 'sel' ){        
        this.dataJson["province"] = this.list[index].province;
        this.dataJson["city"] = this.list[index].city;
        this.dataJson["county"] = this.list[index].county;
        this.dataJson["address"] = this.list[index].address;
        this.selAddress = 'close';
        document.getElementById('JLAreaclick').setAttribute('value', this.list[index]['province_name'] + ' - ' + this.list[index]['city_name'] + ' - ' + this.list[index]['county_name']);
        document.getElementById("JDTaddress").value = this.list[index]['address'];
        return;
      }
      this.selAddress = type;
    }

  }

}
</script>
<style>
  @import '../assets/css/LArea.css';
</style>
