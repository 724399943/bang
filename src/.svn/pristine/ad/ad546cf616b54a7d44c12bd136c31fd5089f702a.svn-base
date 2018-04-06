<template>
  <div id="app">
    <transition name="fade-slide">
      <router-view class="router-view"></router-view>
    </transition>
    <VFooter v-if="$store.state.isActive=='index' || $store.state.isActive=='categoryList' || $store.state.isActive=='messageIndex' || $store.state.isActive=='personalCenter'"></VFooter>
    <!-- 操作提示框 -->
    <confirm v-model="$store.state.confirmJson.show" :title="$store.state.confirmJson.title" @on-cancel="onCancel" @on-confirm="onConfirm" :cancel-text="$store.state.confirmJson.cencelBtn" :confirm-text='$store.state.confirmJson.confirmBtn'>
      <p style="text-align:center;">{{ $store.state.confirmJson.text }}</p>
    </confirm>
    <!-- 加载 -->
    <loading :show="$store.state.loadingJson.show" :text="$store.state.loadingJson.text"></loading>
    <!-- 提示框 -->
    <alert v-model="$store.state.alertJson.show" :title="$store.state.alertJson.title" :button-text="$store.state.alertJson.alertBtn" @on-hide="onHide" >{{$store.state.alertJson.text}}</alert>
  </div>
</template>

<script>
import Confirm from 'vux/src/components/confirm'
import Loading from 'vux/src/components/loading'
import Alert   from 'vux/src/components/alert'
import VFooter from './components/Footer'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      
    }
  },
  components: {
    Loading,
    Confirm,
    Alert,
    VFooter
  },
  created: function (store) {
      this.loadData()
    // if(this.$route.query.session_id !='' && this.$route.query.session_id !=undefined){
    //   localStorage.session_id = this.$route.query.session_id;
    // } 
    this.$store.state.isActive = this.$route.name;       
  },
  watch:{
      $route (to,from) {          
          this.$store.state.isActive = to.name;          
      } 
  },
  computed: {
     // ...mapState({
     //    direction: state => state.vux.direction
     // })
  },
  methods: {
      loadData(){

      },onCancel(){

      },onConfirm(){
        if(this.$store.state.confirmJson.call){
          this.$store.state.confirmJson.call();
        }
      },onHide(){

      },loginFun(){
        
      },share(){


      }
  }
  
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/style.css';
</style>
