<template>
  <div class="content" id="JpublishedOrder">
  	<header class="head sear">
			<a class="ico whiteback" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1 white">我发布的订单</h1>
		</header>
		<div class="main navtop">
			 <nav class="searNav pdnone nfix">
          <span :class="{on:status==1}" @touchstart="ontabFun(1)">未确认<template v-if="status==1">({{totalNumber}})</template></span>   
          <span :class="{on:status==2}" @touchstart="ontabFun(2)">进行中<template v-if="status==2">({{totalNumber}})</template></span>
          <span :class="{on:status==3}" @touchstart="ontabFun(3)">已完成<template v-if="status==3">({{totalNumber}})</template></span>
       </nav>
       <ul class="orderList">
          <li v-for="(item,index) in list">
              <div class="onum">订单编号：{{item.order_sn}}<!-- <span>12</span> --></div>
              <div class="cont-row">    
                <div @touchstart="jumpRoute(item.order_sn,item.id,status)">              
                  <div class="describe">{{item.title}}</div>
                  <template v-if="item.images">
                    <div class="picture" v-if="item.images.length == 1">
                        <template v-for="(oimg,index) in item.images">
                          <img :src="oimg">                  
                        </template>
                    </div>
                    <div class="imgList" v-else>
                        <div class="imgbox" v-for="(img,index) in item.images">
                            <img :src="img">
                        </div>                      
                    </div>
                  </template>                 
                  <div class="urgent db-overflow">{{item.describe}}</div>
                  <div class="order db-overflow">{{item.provide_describe}}</div>
                </div>
                <div class="olbtnbox clearfix">
                    <router-link :to="{name:'editOrder',query:{order_sn:item.order_sn}}" class="obtn" v-if="status==1">修改订单</router-link>
                    <a href="javascript:;" class="obtn" v-if="status==2" @click="finishOrder(item.order_sn,index)">确认完成</a>
                    <router-link :to="{name:'evaluate',params:{order_sn:item.order_sn,is_server:0}}"  class="obtn" v-if="status==3&&item.is_evaluate==0">评价</router-link>
                    <router-link :to="{name:'orderDetail',query:{order_sn:item.order_sn,status:status}}" class="obtn" v-else-if="status==3&&item.is_evaluate==1">查看评价</router-link>
                    <a href="javascript:;" class="cbtn" v-if="status==1" @click="cancelOrder(item.order_sn,index)">取消订单</a>
                    <router-link :to="{name:'orderAppeals',params:{order_sn:item.order_sn,who:1}}" class="cbtn" v-if="status==2||status==3&&item.can_return==0">订单申诉</router-link>
                </div>
              </div> 
          </li>
       </ul>
       <div class="nomore" v-if="nomore == 1">已经到底啦~</div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      list:[],
      page:1,
      hasAjax:0,
      nomore:0,
      status:1,
      totalNumber:null,
      user:{}
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
  },
  mounted(){
    this.loadMore();
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
      if( this.hasAjax == 0 ){
        this.hasAjax = 1;
        this.$http.post('/Shop/Order/getOrderList', {order_type:1,status:this.status,page:this.page},{emulateJSON:true}).then(function(response){ 
          this.hasAjax = 0;
          if( this.page == 1 ){this.totalNumber = response.data.data.totalNumber;this.user = response.data.user};
          if( this.page == 0 ){
            this.list = response.data.data.data;
            this.page++;              
          }else{
            if( response.data.data.data.length == 0 ){                
              this.hasAjax = 1;
              this.nomore = 1;
            }else{              
              this.page++;
              this.list = this.list.concat(response.data.data.data);
            }
          }
          this.$store.commit('loading',{show:false});                                         
        });        
      }else{
        this.$store.commit('loading',{show:false});                                         
      }
    },
    loadMore(){         
        var that = this;
        this.$store.commit('scrollFun',{dom:"JpublishedOrder",auto:true,bottomCall:function(){   
          that.$store.commit('loading',{show:true,text:'加载中...'});         
          that.getData();
        }})
    },
    ontabFun(status){
      this.status = status;
      this.page = 1;
      this.hasAjax = 0;
      this.nomore = 0;
      this.list = [];
      this.totalNumber = null;
      this.$store.commit('loading',{show:true,text:'加载中...'});  
      this.getData();
    },
    jumpRoute(order_sn,id,status){
      if( status == 1 ){
        this.$router.push({name:'unOrderDetail',query:{order_sn:order_sn,id:id,status:status}});
      }else{
        this.$router.push({name:'orderDetail',query:{order_sn:order_sn,status:status}});
      }
    },
    finishOrder:function(sn,index){
      this.$http.post('/Shop/Order/finishOrder', {order_type:1,order_sn:sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        this.list.splice(index,1);
      });
    },
    cancelOrder(order_sn,index){
      this.$http.post('/Shop/Order/cancelOrder', {order_sn:order_sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        this.list.splice(index,1);
      });
    }

  }

}
</script>

