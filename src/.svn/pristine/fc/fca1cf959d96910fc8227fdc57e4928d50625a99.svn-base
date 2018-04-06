<template>
  <div class="content" id="Jaddlabels">
    <div class="content" v-if="sellable=='close'">
    	<header class="head bdnone">
        <a class="ico back" href="javascript:window.history.go(-1);"></a>
  			<h1 class="y-confirm-order-h1">编辑({{imgIndex}}/{{demandImgList.length}})</h1>
        <span class="text" @click="jumpSave">确定</span>
  		</header>
  		<div class="main">      
         <div class="lab-img">
            <swiper auto dots-position="center" :height="height" v-model="imgIndex">
              <template v-for="(img,index) in demandImgList">
                <swiper-item class="black">                
                  <a href="javascript:;">
                    <img class="Sw-img" :src="img">
                  </a>              
                </swiper-item>   
              </template>                     
            </swiper>
         </div>
         <div class="c-classfiy clpd">
            <ul class="clearfix">
              <li class="on" @click="choiceLable('open')">点击添加标签</li> 
              <li class="clli" v-for="(item,index) in skillName">{{item}}<em class="closed" @click="dellabel(index)"></em></li>
            </ul>
          </div>
  		</div>
    </div>
    <div class="content ploadd" :class="{slideLeft:sellable=='open'}">
      <header class="head">
        <a class="ico back" href="javascript:;" @click="choiceLable('close')"></a>
        <h1 class="y-confirm-order-h1">选择分类</h1>
        <span class="text" @click="choiceLable('close')">完成</span>
      </header>
      <div class="main plg">
         <div class="c-classfiy">
            <ul class="clearfix">
                <li v-for="(lable,index) in lableList" :class="{on:idStatus[lable.id]==true}" @click="sellables(lable.id,lable.category_name,index)">{{lable.category_name}}</li>                
            </ul>   
         </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Swiper,SwiperItem} from 'vux/src/components/swiper'
export default {

  data () {
    return {
      demandImgList:[],
      imgIndex:1,
      height:"180px",
      sellable:"close",
      lableList:[],
      page:1,
      hasAjax:0,
      idStatus:{},
      selectedIdArr: [],
      skillName:[],
      tag:""
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.demandImgList = this.$store.state.demandImgList;
    this.setXheight();
    this.getData();
  },
  components : {
    Swiper,
    SwiperItem
  },
  mounted(){
    this.loadMore();
    this.$store.commit('loading',{show:false});
  },
  methods: {
    setXheight(){
      let h = window.innerHeight;
      this.height = h*0.6 + "px";
    },
    choiceLable(type){
      this.sellable = type;      
    },
    getData(){
      if( this.hasAjax == 0 ){
        this.hasAjax = 1;
        this.$http.post('/Shop/Service/serviceCategory', {page:this.page,level:2},{emulateJSON:true}).then(function(response){  
          this.hasAjax = 0;
          if( this.page == 0 ){
            this.lableList = response.data.data.data;
            this.page++;    
            this.idStatus = this.createObj();         
          }else{
            if( response.data.data.data.length == 0 ){                
              this.hasAjax = 1;
              this.nomore = 1;
            }else{
              this.page++;
              this.lableList = this.lableList.concat(response.data.data.data);      
              this.idStatus = this.createObj();        
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
        this.$store.commit('scrollFun',{dom:"Jaddlabels",auto:true,bottomCall:function(){   
          that.$store.commit('loading',{show:true,text:'加载中...'});         
          that.getData();
        }})
    },
    sellables:function(id,name,index){
      this.idStatus[id] = !this.idStatus[id];
      if (this.idStatus[id]) {
        this.selectedIdArr.push(id);
        this.skillName.push(name);
      } else {
        var num = this.findTargetId(id);    
        if (num > -1) {
          this.selectedIdArr.splice(num, 1);
          this.skillName.splice(num, 1);
        }
      }      
    },
    findTargetId: function(id) {
      for (var i = 0; i < this.selectedIdArr.length; i++){
        if (this.selectedIdArr[i] == id) {
          return i;
        }  
      }
      return -1;
    },
    createObj: function() {
      var newObj = {};
      for (var i = 0; i < this.lableList.length; i++) {
        newObj[this.lableList[i].id] = false;
      }
      return newObj;
    },
    jumpSave(){
      this.tag = this.selectedIdArr.join(",");      
      this.$router.push({name:'demandContent',params:{tag:this.tag}});
    },
    dellabel(index){
      var that = this;
      this.selectedIdArr.splice(index,1);
      this.skillName.splice(index,1);
      this.idStatus = this.createObj();
      for( var i = 0;i < this.selectedIdArr.length;i++ ){
        that.idStatus[that.selectedIdArr[i]] = true;
      }     
    }
  }

}
</script>

