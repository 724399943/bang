<template>
  <div class="content">
  		<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">收货地址</h1>
		</header>
		<div class="main pd">
			 <ul class="addressList">
          <li v-for="(item,index) in list" :data-index=index :class="{touchleft:is_target == index}" @touchstart="bindEvent(index)" @touchend="longPressFun(index)">
              <router-link :to="{name:'editAddress',params:{id:item.id}}" :data-index=index>
                  <div class="usr">
                      <span class="lf">{{item.consignee}}</span>
                      <span class="rg">{{item.telephone}}</span>
                  </div>
                  <div class="address"><span v-if="item.is_default==1">[默认地址]</span> <i>{{item.province_name}} {{item.city_name}} {{item.county_name}} {{item.address}}</i></div>
              </router-link>
              <div class="delbtn" @touchstart="delConsignee(item.id,index)"><span>删除</span></div>
          </li>            
       </ul>
       <router-link to="/addAddress" class="addAptitude">新增地址</router-link>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      list:[],
      startX:null,
      is_target:null,
      timer:null,
      timer1:null,
      timer2:null
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
      this.$http.post('/Shop/Consignee/userConsignee', {},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.list = returnData.data.list;
        }
      });
    },
    bindEvent : function(index){
      document.addEventListener('touchstart', this.touchSatrtFun(index,event), false);
      document.addEventListener('touchmove', this.touchMoveFun, false);
    },
    touchSatrtFun : function(index,event){
      var that = this;
      var x = Number(event.touches[0].pageX);
      this.startX = x;  
      this.timer1 = new Date();
      this.timer = setInterval(function(){
        that.timer2 = new Date();
        var time = that.timer2.getTime() - that.timer1.getTime();
        if( time > 1000 ){
          that.is_target = index;
        }
      })            
    },
    touchMoveFun : function(event){  
      var x = Number(event.touches[0].pageX);       
      var index = event.target.parentNode.parentNode.getAttribute('data-index') || event.target.getAttribute('data-index');
      if( x - this.startX < 0 ){
        this.is_target = index;
      }else{
        this.is_target = null;
      }        
    },
    longPressFun : function(index){
      clearInterval(this.timer);      
    },
    delConsignee(id,index){
      this.$http.post('/Shop/Consignee/delConsignee', {id:id},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.list.splice(index,1);
          this.is_target = null;
          this.$store.commit("alert",{show:true,text:returnData.message});
        }
      });
    }

  }

}
</script>

