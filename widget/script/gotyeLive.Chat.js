/**
 * 创建于 2016-10-5
 */

 /**
  * @author					  一元杀网络
  * @description			亲加直播-聊天室模块
  * @namespace				QJ
  * @version					1.0.0
  */

!function(window){
  var chat = {
  	chat : {},
    init: function(args){
//    var chat = api.require('gotyeLiveChat');
			this.chat = api.require('gotyeLiveChat');
      this.chat.init({
        roomId: args.roomId,
        password: args.password,
        nickname: args.nickname
      });
    },
    login: function(args){
      /**
       * 重新登录之前的回调
       * @callback  beforeReloginCallback
       *
       * 登录聊天室
       * @param  {boolean}                 args.autoRelogin - 登录不成功后，自动重新登录
       * @param  {beforeReloginCallback}   args.beforeRelogin - 重新登录之前的回调，此参数需配合autoRelogin一起使用
       */
      var that = this;
      this.chat.login(function(ret, err){
        if(ret && ret.account){
          if(typeof args.success === 'function'){
            args.success(ret);
          }
        }else{
          if(typeof args.error === 'function'){
            args.error(err);
          }else{
            if(args.autoRelogin){
              if(typeof args.beforeRelogin == 'function'){
                args.beforeRelogin();
              }
              chat.login(args);
            }else{
              that.disposeError(err);
            }
          }
        }
      });
    },
    logout: function(args){
//    var chat = api.require('gotyeLiveChat');
      this.chat.logout();
      
    },
    sendText: function(args){
     // alert(JSON.stringify(args.extra));
      //console.log(JSON.stringify(args.extra));
      var that = this;
      this.chat.sendText({
        text: args.text,
        extra: args.extra ? JSON.stringify(args.extra) : ''
      }, function(ret, err){
      
   
        if(err){
          if(typeof args.error === 'function'){
            args.error(err);
          }else{
            //that.disposeError(err); //爱心去掉的提示未登录提示
          }
        }else{
          if(typeof args.success === 'function'){
            args.success();
          }
        }
       
        
      });
    },
    sendNotify: function(args){
      var that = this;
      this.chat.sendNotify({
        notify: args.notify,
        extra: args.extra ? JSON.stringify(args.extra) : ''
      }, function(ret, err){
        if(err){
          if(typeof args.error === 'function'){
            args.error(err);
          }else{
            that.disposeError(err);
          }
        }else{
          if(typeof args.success === 'function'){
            args.success();
          }
        }
      });
    },
    /*停用！！！！！！！！！！！无论传什么TYPE，只能接收到1*/
    sendMessage: function(args){
      var that = this;
      this.chat.sendMessage({
        type: 2,
        text: args.text,
        extra: args.extra ? JSON.stringify(args.extra) : ''
      }, function(ret, err){
        if(err){
          if(typeof args.error === 'function'){
            args.error(err);
          }else{
            that.disposeError(err);
          }
        }else{
          if(typeof args.success === 'function'){
            args.success();
          }
        }
      });
    },
    getRoomMemberCount: function(args){
      var that = this;
      this.chat.getRoomMemberCount(function(ret, err){
        if(ret){
          if(typeof args.success === 'function'){
            args.success(ret);
          }
        }else{
          if(typeof args.error === 'function'){
            args.error(err);
          }else{
            that.disposeError(err);
          }
        }
      });
    },
    currentLoginUser: function(args){
      var that = this;
      this.chat.currentLoginUser(function(ret, err){
        if(ret){
          if(typeof args.success === 'function'){
            args.success(ret);
          }
        }else{
          if(typeof args.error === 'function'){
            args.error(err);
          }else{
            that.disposeError(err);
          }
        }
      });
    },
    addEventListener: function(args){
      var that = this;
      this.chat.addEventListener({
        name: args.name
      }, function(ret, err){
        switch(args.name){
          case 'receiveMsg':
            if(typeof args.receiveMsg === 'function'){
              args.receiveMsg(ret);
            }
            break;
          case 'reconnecting':
            if(typeof args.reconnecting === 'function'){
              args.reconnecting(ret);
            }
            break;
          case 'reloginSuccess':
            if(typeof args.reloginSuccess === 'function'){
              args.reloginSuccess(ret);
            }
            break;
          case 'reloginFailed':
            if(typeof args.reloginFailed === 'function'){
              args.reloginFailed(ret);
            }
            break;
          case 'forceLogout':
            if(typeof args.forceLogout === 'function'){
              args.forceLogout(ret);
            }
            break;
        }
      });
    },
    removeEventListener: function(args){
      this.chat.removeEventListener({
        name: args.name
      });
    },
    removeAllEventListeners: function(args){
      this.chat.removeAllEventListeners();
    },
    disposeError: function(err){
      if(err){
        api.toast({
          location: 'middle',
          msg: err.code + ': ' + err.description
        });
      }
    }
  };
  if(!window.QJ){
    window.QJ = {};
  }
  QJ.Chat = chat;
}(window);
