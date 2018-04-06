<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">订单详情</h1>
		</header>
		<div class="main pd">
			  <div class="odettop">
            <span v-if="orderData.status==2">进行中</span>   
            <span v-else-if="orderData.status==3">已完成</span>   
            <p>订单编号:{{orderData.order_sn}}</p>
        </div>
        <div class="odetGoods">
            <div class="gimg">
                <img :src="orderData.url">                
            </div>
            <div class="gname db-overflow">{{orderData.title}}</div>
            <router-link :to="{name:'unOrderDetail',query:{order_sn:orderData.order_sn,status:$route.query.status,order_type:$route.query.order_type}}" class="seebtn">查看详情</router-link>
        </div>
        <ul class="odetul">
          <li>
              <span>接收交换服务类型</span>
              <span class="txt" v-if="orderData.type == 1">服务</span>
              <span class="txt" v-else>物品</span>
          </li>
          <li>
              <span>联系人</span>
              <span class="txt">{{orderData.contacts}}</span>
          </li>
          <li>
              <span>联系电话</span>
              <span class="txt">{{orderData.telephone}}</span>
          </li>
          <li>
              <span>联系地址</span>
              <span class="address">{{orderData.province}} {{orderData.city}} {{orderData.county}} {{orderData.address}}</span>
          </li>
          <li>
              <span>需求发布时间</span>
              <span class="txt">{{orderData.add_time | time}}</span>
          </li>
          <li>
              <span>需求确认时间</span>
              <span class="txt">{{orderData.update_time | time}}</span>
          </li>
        </ul>
        <div class="msgBoard" v-if="orderData.status==3">
          <div class="title">评价信息</div>
            <div class="msgRow">
              <div class="user-row mrb" v-for="(eva,index) in evaluateData">
                  <div class="urbox">
                      <div class="imgbox">
                          <img :src="eva.headimgurl">
                      </div>
                      <div class="urmsg">
                          <p class="name">{{eva.nickname}} <span class="lv">{{eva.level_name}}</span></p>
                          <p class="time">{{eva.add_time | time}}</p>
                      </div>
                  </div>
                  <div class="comment">
                      <div class="usrcome bornone">{{eva.content}}</div>
                      <div class="grade">
                          <div class="grade-row">
                              <span>服务态度</span>
                              <div class="starbox">
                                  <em class="star" :class="{on:eva.attitude>=1}"></em>
                                  <em class="star" :class="{on:eva.attitude>=2}"></em>
                                  <em class="star" :class="{on:eva.attitude>=3}"></em>
                                  <em class="star" :class="{on:eva.attitude>=4}"></em>
                              </div>
                          </div>
                          <div class="grade-row">
                              <span>服务时效</span>
                              <div class="starbox">
                                  <em class="star" :class="{on:eva.attitude>=1}"></em>
                                  <em class="star" :class="{on:eva.attitude>=2}"></em>
                                  <em class="star" :class="{on:eva.attitude>=3}"></em>
                                  <em class="star" :class="{on:eva.attitude>=4}"></em>
                              </div>
                          </div>
                          <div class="grade-row">
                              <span>服务技能</span>
                              <div class="starbox">
                                  <em class="star" :class="{on:eva.attitude>=1}"></em>
                                  <em class="star" :class="{on:eva.attitude>=2}"></em>
                                  <em class="star" :class="{on:eva.attitude>=3}"></em>
                                  <em class="star" :class="{on:eva.attitude>=4}"></em>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>               
            </div>          
        </div>
        <footer class="odetfoot">          
          <router-link :to="{name:'orderAppeals',params:{order_sn:$route.query.order_sn,who:1}}" class="cbtn">订单申诉</router-link>
          <a href="javascript:;" class="obtn" v-if="$route.query.status==2" @click="finishOrder($route.query.order_sn,$route.query.order_type)">确认完成</a>              
          <router-link :to="{name:'evaluate',params:{order_sn:$route.query.order_sn,is_server:0}}" class="obtn" v-else-if="$route.query.status==3">评价</router-link> 
      </footer>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      orderData:{},
      evaluateData:[]
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
      this.$http.post('/Shop/Order/orderDetail', {order_sn:this.$route.query.order_sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.orderData = returnData.data.data.orderData[0];
          this.evaluateData = returnData.data.data.evaluateData;
        }
      });
    },
    finishOrder:function(sn,order_type){
      this.$http.post('/Shop/Order/finishOrder', {order_type:order_type,order_sn:sn},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        this.$store.commit("alert",{show:true,text:returnData.message});
        this.$router.go(-1);
      });
    }
  }

}
</script>

