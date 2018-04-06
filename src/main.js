// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/home.js'
import store from './assets/js/store.js'
import VueResource from 'vue-resource'
import vuexI18n from 'vuex-i18n'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.use(VueResource)


store.registerModule('vux', {});
Vue.use(vuexI18n.plugin,store)
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next)  =>{
  if(localStorage.session_id != undefined){
    request.body.session_id = localStorage.session_id;
  }
  next((response) => {
    if(response.data.status==100000){
       // router.push('/login');
    }else{
      return response;
    }
  });
});

router.beforeEach((to,from,next) => {  
  if( to.path == "/login" ){
    next();
  }else{
    if( localStorage.session_id == undefined && ( to.name == "messageIndex" || to.name == "personalCenter") ){
      next({path:'/login'});
    }else{
      next();
    }
  }
})

/* eslint-disable no-new */
var appvue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    //this.getajax()
  },
  http: {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  },
  methods: {

  },
  watch: {
    '$route' (to, from) {
       
    }
  }
})

//转化时间格式
/**              
 * 时间戳转换日期              
 * @param <int> unixTime    待时间戳(秒)              
 * @param <bool> type    返回完整时间('yyyy-MM-dd h:mm:ss' 或者 'yyyy-MM-dd' )                          
 */
Vue.filter('time',function(value,type="YYYY-MM-dd h:mm:ss") {
  var newDate = new Date();
  newDate.setTime(value * 1000);
  Date.prototype.format = function(format) {
         var date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S+": this.getMilliseconds()
         };
         if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
         }
         for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                       format = format.replace(RegExp.$1, RegExp.$1.length == 1
                              ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
         }
         return format;
  }
  return newDate.format(type);
})

/**              
 * 时间戳转换时间             
 * 精确到几分钟前、几小时前
 */
Vue.filter('Time',function(timestamp) {
    timestamp = timestamp * 1000;
    var date = new Date();
    var now = date.getTime(); //当前时间戳

    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var today = date.getTime(); //今天0点时间戳

    var date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var year = date.getTime(); //今年0点时间戳

    var timer = (now - timestamp) / 1000;   // 转换为秒级时间戳
    var tips = '';
    if (timer <= 0) {
        tips = '刚刚';
    } else if (Math.floor(timer/60) <= 0) {
        tips = '刚刚';
    } else if (timer < 3600) {
        tips = Math.floor(timer/60) + '分钟前';
    } else if (timer >= 3600 && (timestamp - today >= 0) ) {
        tips = Math.floor(timer/3600) + '小时前';
    // } else if (timer/86400 <= 31) {
    //     tips = Math.ceil(timer/86400) + '天前';
    } else {
        var date = new Date(timestamp);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        tips = date.getFullYear() + '-' + month + "-" + day;
    }
    return tips;
})
