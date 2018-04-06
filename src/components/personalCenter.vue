<template>
  <div class="content">
  	<header class="head bdnone">
			<h1 class="y-confirm-order-h1">个人中心</h1>
		</header>
		<div class="main pd">
      <div class="basicHeadBox">
        <router-link to="/userInfo">
          <div class="imgbox">
              <img :src="userInfo.headimgurl">
              <span class="lv">{{userInfo.level_name}}</span>
          </div>
          <p class="name">{{userInfo.nickname}}</p>          
        </router-link>
      </div> 
      <div class="menuList">
          <ul>
              <li>
                  <router-link to="/userInfo">
                      <em class="ico1"></em>
                      <span>用户资料</span>
                      <em class="ei"></em>
                  </router-link>
              </li>
              <li>
                  <router-link to="/consigneeList">
                      <em class="ico2"></em>
                      <span>收货地址管理</span>
                      <em class="ei"></em>
                  </router-link>
              </li>
              <li>
                  <router-link to="/publishedOrder">
                      <em class="ico3"></em>
                      <span>我发布的订单</span>
                      <em class="ei"></em>
                  </router-link>
              </li>
              <li>
                  <router-link to="/receiveOrder">
                      <em class="ico4"></em>
                      <span>我接收的订单</span>
                      <em class="ei"></em>
                  </router-link>
              </li>
              <li>
                  <router-link to="/myCollection">
                      <em class="ico5"></em>
                      <span>我的收藏</span>
                      <em class="ei"></em>
                  </router-link>
              </li>
              <li>
                  <router-link to="/myAttention">
                      <em class="ico6"></em>
                      <span>我的关注</span>
                      <em class="ei"></em>
                  </router-link>
              </li>
              <li>
                  <router-link to="/setUp">
                      <em class="ico7"></em>
                      <span>设置</span>
                      <em class="ei"></em>
                  </router-link>
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
      userInfo:{}
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
      this.$http.post('/Shop/User/userInfo', {},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.userInfo = returnData.data.userInfo;
          this.$store.state.is_auth = returnData.user.is_auth;
          localStorage.is_auth = returnData.user.is_auth;
        }
      });
    }
  }

}
</script>

