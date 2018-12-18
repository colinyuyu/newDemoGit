/**
 * 亲加直播-基础模块
 * 创建于 2016-10-5
 */

 /**
  * @author					  一元杀网络
  * @description			亲加直播-基础模块
  * @namespace				QJ
  * @version					1.0.0
  */

!function(window){
  var core = {
    registerApp: function(args){
    	this.core = api.require('gotyeLiveCore');
      if(!args)
      	var args={};
//    var core = api.require('gotyeLiveCore');
      this.core.registerApp({
        appKey: args.appKey || CONFIG.QIN_JIA.APP_KEY,
        accessSecret: args.accessSecret || CONFIG.QIN_JIA.ACCESS_SECRET
      });
    },
    setDebugLogEnabled: function(args){
//    var core = api.require('gotyeLiveCore');
      this.core.setDebugLogEnabled({
        enabled: args.enabled
      });
    },
    authRoomSession: function(args){
      var that = this;

      api.require('gotyeLiveCore').authRoomSession({
        type: args.type || 'default',
        roomId: args.roomId,
        password: args.password,
        nickname: args.nickname
      }, function(ret, err){
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
    destroyRoomSession: function(args){
//    var core = api.require('gotyeLiveCore');
      this.core.destroyRoomSession({
        roomId: args.roomId,
        password: args.password,
        nickname: args.nickname
      });
    },
    getLiveContext: function(args){
      var that = this;
      api.require('gotyeLiveCore').getLiveContext({
        roomId: args.roomId,
        password: args.password,
        nickname: args.nickname
      }, function(ret, err){
        console.log(JSON.stringify(ret||err, null, 2))
        if(ret){
          if(typeof args.success === 'function'){
            args.success(ret);
          }
        }else{
          if(err.code == 401){
            //验证失败，重新授权后再调起
            that.authRoomSession({
              roomId: args.roomId,
              password: args.password,
              nickname: args.nickname,
              success: function(ret){
                that.getLiveContext(args);
              }
            });
          }else{
            if(typeof args.error === 'function'){
              args.error(err);
            }else{
              that.disposeError(err);
            }
          }
        }
      });
    },
    getClientUrl: function(args){
      var  that = this;
      this.core.getClientUrl({
        roomId: args.roomId,
        password: args.password,
        nickname: args.nickname
      }, function(ret, err){
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
  QJ.Core = core;
}(window);
