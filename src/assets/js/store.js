/**
 * 
 * @authors xu (565657400@qq.com)
 * @date    2017-03-17 11:02:24
 * @version $Id$
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  loadingJson:{text:'加载中..',show:false},
  confirmJson:{show:false, title:'温馨提示',text:'是否确定操作',cencelBtn:'取消',confirmBtn:'确定'},
  alertJson:{show:false, title:'', alertBtn:'确定', text:'操作成功'},
  hezhangJson:{show:false,jsondata:{}},
  popstate:false,
  conn: new Object(),
  messageData:{},
  waitFun:0,
  status:200000,
  chating:0,
  share:0,
  isActive:'index',
  is_auth:0,
  demandImgList:[]
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  loading (state,datajson){
  	 	state.loadingJson.text = datajson.text ? datajson.text:'加载中..';
      state.loadingJson.show = datajson.show ? datajson.show:false;
  },confirm(state,datajson){
      state.confirmJson.show = datajson.show ? datajson.show:false;
      state.confirmJson.title = datajson.title ? datajson.title:'温馨提示';
      state.confirmJson.text = datajson.text ? datajson.text:'是否确定操作';
      state.confirmJson.cencelBtn = datajson.cencelBtn!=undefined ? datajson.cencelBtn:'取消';
      state.confirmJson.confirmBtn = datajson.confirmBtn!=undefined ? datajson.confirmBtn:'确定';
      if(datajson.call){
        state.confirmJson.call = datajson.call;
      }else{
        state.confirmJson.call = false;
      }
  },alert(state,datajson){
      state.alertJson.show = datajson.show ? datajson.show:false;
      state.alertJson.title = datajson.title ? datajson.title:'';
      state.alertJson.text = datajson.text ? datajson.text:'是否确定操作';
      state.alertJson.alertBtn = datajson.alertBtn!=undefined ? datajson.alertBtn:'确定';
      if(datajson.call){
        datajson.call()
      }
  },hezhang(state,datajson){
      state.hezhangJson.show = datajson.show ? datajson.show:false;
      state.hezhangJson.jsondata = datajson.jsondata!=undefined ? datajson.jsondata:{};
  },scrollFun(state,obj){
      var startX = 0, startY = 0;
      function touchSatrtFunc(evt) {
          try
          {
              var touch = evt.touches[0]; //获取第一个触点  
              var x = Number(touch.clientX); //页面触点X坐标  
              var y = Number(touch.clientY); //页面触点Y坐标  
              //记录触点初始位置  
              startX = x;
              startY = y;

          } catch (e) {
              alert( e.message);
          }
      }
      //touchstart事件  
      var obj_dom = document.getElementById(obj.dom);
     obj_dom.addEventListener('touchstart', touchSatrtFunc, false);
     obj_dom.addEventListener('touchmove',scrlllfunction,false);
      function scrlllfunction (ev){
        
          var _point = ev.touches[0];
          var _top,_sh,_dh,bottomAdr
          if(obj.auto){
             // window滚动
              if( document.body.scrollTop ){
                _top = document.body.scrollTop;                
              }else{
                _top = document.documentElement.scrollTop;
              }
              _sh = document.body.scrollHeight;
              _dh = window.innerHeight;
          }else{
             // 标签内容滚动
             _top = obj_dom.scrollTop;
             _sh = obj_dom.scrollHeight;
             _dh = obj_dom.offsetHeight;

          }
            // 什么时候到底部
           bottomAdr = _sh - _dh;
          //判断是否滚到底部加载更多
          if(_top >= bottomAdr-10 && _point.clientY < startY){
            console.log(obj.bb)
              if(obj.bottomCall){
                obj.bottomCall();
              }
          }
          // 到达顶端
          if (_top === 0) {
             if(_sh == _dh){
                 ev.preventDefault();
             }
              // 阻止向下滑动
              if (_point.clientY > startY) {
                  ev.preventDefault();
              } else {
                  // 阻止冒泡
                  // 正常执行
                  ev.stopPropagation();
              }
          } else if (_top == bottomAdr) {
              // 到达底部
              // 阻止向上滑动
              if (_point.clientY < startY) {
                  ev.preventDefault();
              } else {
                  // 阻止冒泡
                  // 正常执行
                  ev.stopPropagation();
              }
          } else if (_top > 0 && _top < bottomAdr) {
              ev.stopPropagation();
          } else {
              ev.preventDefault();
          }
      }
  },imini(state){
        function initMessage(messageData) {
            // var messageData = messageData;
            var messageList = localStorage['messageList'];
            /****处理本地信息*****/ 
            var is_end = true;
            if( !messageList ){
              messageList = [];
              var node = {};
              node.id = messageData.from;
              node.total = 1;
              switch( messageData.messageType ){
                case 'txt':
                  node.type = 1;
                  node.content = messageData.data;
                  break;
                case 'img':
                  node.type = 2;
                  node.content = "[图片]";
                case 'audio':
                  node.type = 3;
                  node.content = "[语音]";
              };
              // node.content = messageData.data;
              node.time = (messageData.ext.time) ? messageData.ext.time : new Date().getTime();
              messageList.push(node);
            }else{
              var messageList = JSON.parse(messageList);
              for(var j=0; j<messageList.length; j++){
                if( messageData.from == messageList[j].id){
                  //本地有用户id,加total,换content
                  ++messageList[j].total;
                  switch( messageData.messageType ){
                    case 'txt':
                    messageList[j].type = 1;
                    messageList[j].content = messageData.data;
                    break;
                  case 'img':
                    messageList[j].type = 2;
                    messageList[j].content = "[图片]";
                  case 'audio':
                    messageList[j].type = 3;
                    messageList[j].content = "[语音]";
                  };
                  messageList[j].time = (messageData.ext.time) ? messageData.ext.time : new Date().getTime();
                  is_end = false;
                  break;
                }
              }
              //本地没有用户id的消息，拼接json数据
              if( is_end ){
                var node = {};
                node.id = messageData.from;
                node.total = 1;
                switch( messageData.messageType ){
                  case 'txt':
                    node.type = 1;
                    node.content = messageData.data;
                  break;
                case 'img':
                    node.type = 2;
                    node.content = "[图片]";
                case 'audio':
                    node.type = 3;
                    node.content = "[语音]";
                };
                node.time = (messageData.ext.time) ? messageData.ext.time : new Date().getTime();
                messageList.push(node);
              }
            }
            localStorage['messageList'] = JSON.stringify(messageList);
        }
        state.conn = new WebIM.connection({
          https: WebIM.config.https,
          url: WebIM.config.xmppURL,
          isAutoLogin: WebIM.config.isAutoLogin,
          isMultiLoginSessions: WebIM.config.isMultiLoginSessions
        });
        state.conn.listen({
          onOpened: function ( message ) {          //连接成功回调
            state.conn.setPresence();  //设置在线  
            console.log('连接成功');
          },  
          onClosed: function ( message ) {console.log('关闭')},         //连接关闭回调
          onTextMessage: function ( message ) {  //收到文本消息
              console.log(message);
              message.method = 'receive';
              message.messageType = 'txt';
              state.messageData = message;
              initMessage(message);
          },    
          onEmojiMessage: function ( message ) {},   //收到表情消息
          onPictureMessage: function ( message ) {
              var options = {url: message.url};
              options.onFileDownloadComplete = function () {
                  // 图片下载成功
                  message.method = 'receive';
                  message.messageType = 'img';
                  state.messageData = message;
                  initMessage(message);
                  console.log('Image download complete!');
              };
              options.onFileDownloadError = function () {
                  // 图片下载失败
                  console.log('Image download failed!');
              };
              WebIM.utils.download.call(state.conn, options);       // 意义待查
          }, //收到图片消息
          onCmdMessage: function ( message ) {
            //initMessage(message);
          },     //收到命令消息
          onAudioMessage: function ( message ) {
            var options = { url: message.url };
    
            options.onFileDownloadComplete = function ( response ) { 
                //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
                var objectURL = WebIM.utils.parseDownloadResponse.call(state.conn, response);
                message.url = objectURL;
                message.method = 'receive';
                message.messageType = 'audio';
                state.messageData = message;
                initMessage(message);
            };  

            options.onFileDownloadError = function () {
                //音频下载失败 
            };  

            //通知服务器将音频转为mp3
            options.headers = { 
              'Accept': 'audio/mp3'
            };

            WebIM.utils.download.call(state.conn, options);
          },   //收到音频消息
          onLocationMessage: function ( message ) {},//收到位置消息
          onFileMessage: function ( message ) {},    //收到文件消息
          onVideoMessage: function ( message ) {},   //收到视频消息
          onPresence: function ( message ) {},       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
          onRoster: function ( message ) {},         //处理好友申请
          onInviteMessage: function ( message ) {},  //处理群组邀请
          onOnline: function () {},                  //本机网络连接成功
          onOffline: function () {
            console.log('本机网络掉线');
          },                 //本机网络掉线
          onError: function ( message ) {}           //失败回调
        });
  },imlogin(state,userMsg){
      // 登陆环信
      var options = { 
        apiUrl: WebIM.config.apiURL,
        user: userMsg.userId,
        pwd: userMsg.passWord,
        appKey: WebIM.config.appkey
      };
      state.conn.open(options);
  },logout(state){
    state.conn.close();
  },sendPrivateText(state,sendJson){
      function saveChat(to, type, content){
        to = to.replace('yjwy', '');
        var content = JSON.stringify({type:type,content:content});
        requestJson = {to_id:to,content:content};
        this.$http.post('/Shop/Chat/saveChat', requestJson, {emulateJSON:true}).then(function(response){}); 
      }
      var id = state.conn.getUniqueId();//生成本地消息id
      var msg = new WebIM.message('txt', id);
      msg.set({
        msg: sendJson.msg,
        to: sendJson.receiveId,    //接收消息对象
        action : 'action',         //用户自定义，cmd消息必填
        ext :sendJson.msgArray,    //用户自扩展的消息内容（群聊用法相同）
        roomType: false,
        chatType: 'singleChat',
        success: function ( id,serverMsgId ) {
            //消息发送成功回调
            console.log('发送成功');
            state.messageData = {
                method : 'send',
                type : 'chat',
                messageType : 'txt',
                data : sendJson.msg,
                ext : sendJson.msgArray,
            };
            saveChat(sendJson.receiveId, 1, sendJson.msg);
            if(sendJson.call){
                sendJson.call()
            }
        }
      }); 
      msg.body.chatType = 'singleChat';
      state.conn.send(msg.body);
  },sendPrivateImg(state,sendJson){
      function saveChat(to, type, content){
        to = to.replace('yjwy', '');
        var content = JSON.stringify({type:type,content:content});
        requestJson = {to_id:to,content:content};
        this.$http.post('/Shop/Chat/saveChat', requestJson, {emulateJSON:true}).then(function(response){}); 
      }
      var id = state.conn.getUniqueId();//生成本地消息id
      var msg = new WebIM.message('img', id);
      var input = document.getElementById('em-widget-img-input');  // 选择图片的input
      var file = WebIM.utils.getFileUrl(input);      // 将图片转化为二进制文件
      var allowType = {
          'jpg': true,
          'gif': true,
          'png': true,
          'bmp': true
      };
      if (file.filetype.toLowerCase() in allowType) {
          msg.set({
              apiUrl: WebIM.config.apiURL,
              file: file,
              to: sendJson.receiveId,     // 接收消息对象
              roomType: false,
              chatType: 'singleChat',
              action : 'action',          //用户自定义，cmd消息必填
              ext : sendJson.msgArray,    //用户自扩展的消息内容（群聊用法相同）
              onFileUploadError: function () {      // 消息上传失败
                  console.log('onFileUploadError');
              },
              onFileUploadComplete: function () {   // 消息上传成功
                  console.log('onFileUploadComplete');
              },
              success: function ( id,serverMsgId ) {                // 消息发送成功
                  console.log("发送成功");
                  state.messageData = {
                      method : 'send',
                      type : 'chat',
                      messageType : 'img',
                      url : msg.value.url,
                      ext : sendJson.msgArray,
                  };
                  saveChat(sendJson.receiveId, 2, msg.value.url);
              },
              flashUpload: WebIM.flashUpload
          });
          state.conn.send(msg.body);
      }
  },


}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})