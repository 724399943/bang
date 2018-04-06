<template>
  <div class="content" id="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">收货地址</h1>
      <span class="text" @touchstart="addConsignee">保存</span>
		</header>
		<div class="main plg">
			 <div class="y-bindphone">
          <ul>              
            <li>
              <span>收件人</span>
              <input type="text" name="" placeholder="请输入真实姓名" class="txt" v-model="dataJson.consignee">
            </li>
            <li>
              <span>联系电话</span>
              <input type="text" name="" placeholder="请输入手机号码" class="txt" v-model="dataJson.telephone">
            </li>
            <li class="ute">
                <span>地址</span>
                <input type="text" name="" class="txt badd" readonly="readonly" value="" placeholder="请选择省市区" id="JLAreaclick">
                <input id="JAreavalue" type="hidden">
                <input id="province" type="hidden" name="province">
                <input id="city" type="hidden" name="city">
                <input id="county" type="hidden" name="county">
            </li>  
            <li class="address bornone">
                <span>详细地址</span>
                <input type="text" name="" class="txt" value="" placeholder="请输入详情地址" v-model="dataJson.address">
            </li>  
            <li class="mtop">
              <span>设为默认地址</span>
              <div class="check_box addcheck">
                  <input type="checkbox" name="" id="check" v-model="is_default">
                  <label for="check"></label>
              </div>
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
      dataJson:{},
      is_default:null
    }
  },
  created(){
    
  },
  mounted(){
    this.apifun();
  },
  methods: {
    addConsignee(){
      this.dataJson.is_default = (this.is_default)?1:0;            
      this.$http.post('/Shop/Consignee/addConsignee', this.dataJson,{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.$router.go(-1);
        }else{
          this.$store.commit("alert",{show:true,text:returnData.message});          
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
    }

  }

}
</script>
<style>
  @import '../assets/css/LArea.css';
</style>
