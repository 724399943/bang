<template>
  <div class="content" id="JchioceClassfiy">
    <header class="head">
      <a class="ico back" href="javascript:window.history.go(-1);"></a>
      <h1 class="y-confirm-order-h1">选择分类</h1>
      <span class="text" @click="chioceIdDone">完成</span>
    </header>
    <div class="main plg">
      <div class="c-classfiy">
        <ul>
          <li v-for="(item,index) in skillList" :class="{on:idStatus[item.id]==true}" @click="getChioceId(item.id,item.category_name)">{{item.category_name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      hasAjax: 0,
      level: 2,
      skillList: [],
      selectedIdArr: [],
      selectedIdStr: "",
      idStatus:{},
      skillName:[]
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.loadMore();

  },
  methods: {
    getData: function() {
      if (this.hasAjax == 0) {
        this.hasAjax = 1;
        this.$http.post('/Shop/Service/serviceCategory', { page: this.page, level: this.level }, { emulateJSON: true }).then(function(response) {
          this.hasAjax = 0;
          if (this.page == 0) {
            this.skillList = response.data.data.data;
            this.page++;
            this.idStatus = this.createObj();
          } else {
            if (response.data.data.data.length == 0) {
              this.hasAjax = 1;
            } else {
              this.page++;
              this.skillList = this.skillList.concat(response.data.data.data);
              this.idStatus = this.createObj();
            }
          }
          this.$store.commit('loading', { show: false });
        });
      } else {
        this.$store.commit('loading', { show: false });
      }
    },
    loadMore() {
      var that = this;
      this.$store.commit('scrollFun', {
        dom: "JchioceClassfiy",
        auto: true,
        bottomCall: function() {
          that.$store.commit('loading', { show: true, text: '加载中...' });
          that.getData();
        }
      })
    },
    chioceIdDone: function() {      
      this.$router.push({name:'relatedSkills',params:{id:this.selectedIdStr,skillName:this.skillName.join(",")}});
    },
    getChioceId: function(id,name) {
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
      this.selectedIdStr = this.selectedIdArr.join();
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
      for (var i = 0; i < this.skillList.length; i++) {
        newObj[this.skillList[i].id] = false;
      }
      return newObj;
    }
  }
}
</script>
