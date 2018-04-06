<template>
  <div class="content">
  	<header class="head">
			<router-link :to="{name:'userInfo'}" class="ico back"></router-link>
			<h1 class="y-confirm-order-h1">相关技能</h1>
      <span class="text" @click="commit">保存</span>
		</header>
		<div class="main plg">
			 <div class="demtitle skill">
          <router-link to="/chioceClassfiy">
            <span>技能类型</span>
            <div class="txt">{{skillName}}</div>   
          </router-link>         
       </div>
       <div class="placeNav">
           <p class="title">服务方式</p>  
           <nav class="onav">
              <span :class="{on:dataJson.type==1}" @click="getServiceType(1)">线上服务</span>
              <span :class="{on:dataJson.type==2}" @click="getServiceType(2)">线下服务</span>
           </nav> 
       </div>
       <div class="y-bindphone demli">
            <ul>                 
              <li>
                <span>服务项目</span>
                <input type="text" name="" placeholder="请输入" class="txt lf" v-model="dataJson.title">
              </li>                               
              <li class="bornone autoheight">
                <p class="name">服务介绍</p>
                <textarea class="demtxt" placeholder="描述您的服务内容" v-model="dataJson.describe">{{dataJson.describe}}</textarea>
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
      skillName:this.$route.params.skillName,
      dataJson:{
        category_id:this.$route.params.id,
        type:1,
        title:"",
        describe:""
      }
    }
  },
  created(){
    
  },
  methods: {
    commit:function(){
      this.$http.post("Shop/Skill/addSkill",this.dataJson,{emulateJSON:true}).then(function(response){
        if( response.data.status == 200000 ){
          this.$router.push("/userInfo");
        }
        this.$store.commit("alert",{show:true,text:response.data.message});
      })
    },
    getServiceType:function(type){
      this.dataJson.type = type;
    }
  }

}
</script>

