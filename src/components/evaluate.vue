<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">评价</h1>
      <span class="text" @click="commit">确定</span>
		</header>
		<div class="main plg">
			 <div class="evatitle">请选择评分</div>
       <div class="grade">
          <div class="grade-row eva">
              <span>服务态度</span>
              <div class="starbox">
                  <em class="star" :class="{on:dataJson.attitude >=1}" @click="getAttitudeStar(1)"></em>
                  <em class="star" :class="{on:dataJson.attitude >=2}" @click="getAttitudeStar(2)"></em>
                  <em class="star" :class="{on:dataJson.attitude >=3}" @click="getAttitudeStar(3)"></em>
                  <em class="star" :class="{on:dataJson.attitude >=4}" @click="getAttitudeStar(4)"></em>
              </div>
          </div>
          <div class="grade-row eva">
              <span>服务时效</span>
              <div class="starbox">
                  <em class="star" :class="{on:dataJson.effect >=1}" @click="getEffectStar(1)"></em>
                  <em class="star" :class="{on:dataJson.effect >=2}" @click="getEffectStar(2)"></em>
                  <em class="star" :class="{on:dataJson.effect >=3}" @click="getEffectStar(3)"></em>
                  <em class="star" :class="{on:dataJson.effect >=4}" @click="getEffectStar(4)"></em>
              </div>
          </div>
          <div class="grade-row eva">
              <span>服务技能</span>
              <div class="starbox">
                  <em class="star" :class="{on:dataJson.skill >=1}" @click="getSkillStar(1)"></em>
                  <em class="star" :class="{on:dataJson.skill >=2}" @click="getSkillStar(2)"></em>
                  <em class="star" :class="{on:dataJson.skill >=3}" @click="getSkillStar(3)"></em>
                  <em class="star" :class="{on:dataJson.skill >=4}" @click="getSkillStar(4)"></em>
              </div>
          </div>
      </div>
      <div class="evamiao">
          <textarea placeholder="请描述" maxlength="100" v-model="dataJson.content"></textarea>
          <div class="textnum">{{dataJson.content.length}}/100</div>
      </div>
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      dataJson:{
        order_sn:this.$route.params.order_sn,
        is_server:this.$route.params.is_server,
        attitude:0,
        effect:0,
        skill:0,
        content:"",
      }
    }
  },
  created(){
    
  },
  mounted(){
    
  },
  methods: {
    commit:function(){  
      this.$http.post('/Shop/Evaluate/toEvaluate', this.dataJson,{emulateJSON:true}).then(function(response){ 
        var returnData = response['data'];
          this.$router.go(-1);
        this.$store.commit("alert",{show:true,text:returnData.message});
      });
    },
    getAttitudeStar:function(star){
      this.dataJson.attitude = star;
    },
    getEffectStar:function(star){
      this.dataJson.effect = star;
    },
    getSkillStar:function(star){
      this.dataJson.skill = star;
    }
  }

}
</script>

