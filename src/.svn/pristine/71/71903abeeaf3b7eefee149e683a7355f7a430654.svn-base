<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">信用积分规则</h1>
		</header>
		<div class="main">
			   <div class="interRule">
            <div class="miao" v-html="description">
                
            </div>   
            <div class="interAddList">
                <div class="addrow">
                  <div class="addbox">
                    <div class="nape lf"><p class="title">加分项</p></div> 
                    <div class="nape rg"><p class="title">分数</p></div>                                       
                  </div>
                  <div class="addbox" v-for="(add,index) in addRule">
                    <div class="nape lf"><p class="pt">{{add.config_name}}</p></div>    
                    <div class="nape rg"><p class="fen">积分+{{add.config_value}}</p></div>                     
                  </div>                
                </div>
                <div class="addrow">
                  <div class="addbox">
                    <div class="nape lf"><p class="title">减分项</p></div> 
                    <div class="nape rg"><p class="title">分数</p></div>                                       
                  </div>
                  <div class="addbox" v-for="(del,index) in delRule">
                    <div class="nape lf"><p class="pt">{{del.config_name}}</p></div>    
                    <div class="nape rg"><p class="fen">积分-{{del.config_value}}</p></div>                     
                  </div>                    
                </div>
                <div class="addrow">
                  <div class="addbox">
                    <div class="nape lf"><p class="title">积分等级</p></div> 
                    <div class="nape rg"><p class="title">所需积分</p></div>                            
                  </div>
                  <div class="addbox" v-for="(lev,index) in pointLevel">
                    <div class="nape lf"><p class="pt">{{lev.level_name}}</p></div>    
                    <div class="nape rg"><p class="fen">{{lev.point}}</p></div>                                    
                  </div>                    
                </div>                
            </div>
         </div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      description:"",
      addRule:[],
      delRule:[],
      pointLevel:[]
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
      this.$http.post('/Shop/Point/pointRule', {},{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
        if( returnData.status == 200000 ){
          this.description = returnData.data.description;
          this.addRule = returnData.data.addRule;
          this.delRule = returnData.data.delRule;
          this.pointLevel = returnData.data.pointLevel;
        }
      });
    }
  }

}
</script>

