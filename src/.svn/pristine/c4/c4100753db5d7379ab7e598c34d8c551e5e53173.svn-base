<template>
  <div class="content" id="JreceiveOrder">
  	<header class="head sear">
			<a class="ico whiteback" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1 white">我接收的订单</h1>
		</header>
		<div class="main">
			 <nav class="searNav">
          <span :class="{on:status==2}" @touchstart="ontabFun(2)">进行中</span>
          <span :class="{on:status==3}" @touchstart="ontabFun(3)">已完成</span>
       </nav>
       <ul class="orderList">
          <li v-for="(item,index) in list">
              <div class="onum">订单编号：{{item.order_sn}}<!-- <span>12</span> --></div>
              <div class="cont-row"> 
                  <div @click="jumpRoute(item.order_sn)">                 
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
                      <a href="javascript:;" class="obtn" v-if="status==2" @click="finishOrder(item.order_sn,index)">确认完成</a>
                      <router-link :to="{name:'evaluate',params:{order_sn:item.order_sn,is_server:1}}" class="obtn" v-if="status==3&&item.is_evaluate==0">评价</router-link>
                      <a href="javascript:;" class="obtn" v-else-if="status==3&&item.is_evaluate==1">查看评价</a>
                      <router-link :to="{name:'orderAppeals',params:{order_sn:item.order_sn,who:2}}" class="cbtn">订单申诉</router-link>
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
      status:2,
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
        this.$http.post('/Shop/Order/getOrderList', {order_type:2,status:this.status,page:this.page},{emulateJSON:true}).then(function(response){ 
          this.hasAjax = 0;          
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
        this.$store.commit('scrollFun',{dom:"JreceiveOrder",auto:true,bottomCall:function(){   
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
      this.$store.commit('loading',{show:true,text:'加载中...'});  
      this.getData();
    },
    finishOrder:function(sn,index){
      this.$http.post('/Shop/Order/finishOrder', {order_type:2,order_sn:sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        this.list.splice(index,1);
      });
    },
    jumpRoute(order_sn){      
      this.$router.push({name:'orderDetail',query:{order_sn:order_sn,status:2,order_type:2}});
    }

  }

}
</script>

