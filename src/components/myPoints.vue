<template>
  <div class="content" id="JmyPoints">
  	<header class="head point">
			<a class="ico whiteback" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1 white">信用分</h1>
		</header>
		<div class="main">
			 <div class="pointTop">
          <div class="num">{{myPoint}}</div>   
          <div class="btn"><router-link to="/integralRule" class="rule">积分规则</router-link></div>          
       </div>
       <div class="pointLog">
          <div class="pointName">积分变更记录</div>
          <ul>              
              <li v-for="(item,index) in list">
                  <p class="txt">
                    <template v-if="item.event_type == 0">
                        资料补充完整
                    </template>
                    <template v-else-if="item.event_type == 1">
                        完成一次订单
                    </template>
                    <template v-else-if="item.event_type == 2">
                        订单被申诉成功
                    </template>
                    <span class="fen" :class="{jian:item.type==0}">积分<template v-if="item.type==0">-</template><template v-else>+</template>{{item.num}}</span>
                  </p>
                  <p class="time">{{item.add_time | time}}</p>
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
      list:[],
      myPoint:"",
      hasAjax:0,
      page:0,
      nomore:0
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
        this.$http.post('/Shop/Point/pointList', {},{emulateJSON:true}).then(function(response){   
          this.hasAjax = 0;
          if( this.page == 0 ){
            this.list = response.data.data.list;
            this.myPoint = response.data.data.myPoint;
            this.page++;              
          }else{
            if( response.data.data.list.length == 0 ){                
              this.hasAjax = 1;
              this.nomore = 1;
            }else{
              this.page++;
              this.list = this.list.concat(response.data.data.list);
            }
          }
          this.$store.commit('loading',{show:false});                                         
        });        
      }
    },
    loadMore(){         
        var that = this;
        this.$store.commit('scrollFun',{dom:"JmyPoints",auto:true,bottomCall:function(){           
          that.getData();
        }})
    }
  }

}
</script>

