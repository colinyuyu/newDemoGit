/**
 * 创建于 2016-10-5
 */

 /**
  * @author					  一元杀网络
  * @description			亲加直播-播放器模块
  * @namespace				QJ
  * @version					1.0.0
  */
!function(window){
  var player = {
    init: function(args){
   //alert(api.pageParam.avatar);
 
    	api.openFrame({
				name: 'live_camera_1',
				url: api.wgtRootDir + '/zhibo/html/find/live_camera.html',
				bgColor: 'transparent',
				pageParam:{
					avatar: api.pageParam.avatar
				},
					rect: {
									x: 0,
									y: 0,
									w: api.winWidth,
									h: api.winHeight
								},
				bounces: false,
			});
     // var player = api.require('gotyeLivePlayer');
      var alivcLivePlayer = api.require('alivcLivePlayer');
alivcLivePlayer.initPlayer({
fixedOn:'live_camera_1',
fixed:'false',
rect: {
									x: 0,
									y: 0,
									w: api.winWidth,
									h: api.winHeight
								},
},function(ret){


    //alert(JSON.stringify(ret));
})
      
//    if(args.iosreview == 1){
//    
////    player.init({
////    	 url: args.videoURL
////    });
//    //alert(JSON.stringify(args.videoURL));
//    }else{
//     
////    player.init({
////    //url: args.videoURL  //阿里云自建改亲加加回去大斌
////    	session:{  //阿里云自建改亲加加回去大斌
////    		roomId: args.roomId,  //阿里云自建改亲加加回去大斌
////			    password: args.password, //阿里云自建改亲加加回去大斌
////			   nickname:args.nickname  //阿里云自建改亲加加回去大斌
////    	}
////    });
//    
//    }
    },
    play: function(args){
  //  alert(JSON.stringify(api.pageParam.videoURL));
//    var player = api.require('gotyeLivePlayer');
//    player.play({
//    	playView: args.playView,
//    	fixed: args.fixed || false,
//    	quality: args.quality || 'high'
//    });
var alivcLivePlayer = api.require('alivcLivePlayer');
alivcLivePlayer.prepareToPlay(
{
url:api.pageParam.videoURL
},function(ret){
   // alert('准备播放'+JSON.stringify(ret));
   

   if(ret.status){
alivcLivePlayer.play();
  	api.addEventListener({
				name: 'keyback'
			}, function() {
			return false;
			
			});
}
})
    },
    stop: function(args){
     var alivcLivePlayer = api.require('alivcLivePlayer');
alivcLivePlayer.stop();
alivcLivePlayer.destroy();
      console.log(5)
    },
    setMute: function(args){
     
      var alivcLivePlayer = api.require('alivcLivePlayer');
alivcLivePlayer.setMuteMode({
    isMute:args.mute
});
    },
    getMuteStatus: function(args){
      var player = api.require('gotyeLivePlayer');
      player.getMuteStatus({
      	mute: args.mute
      },function(ret,err){
      	if(typeof callback == 'function'){
					callback(ret);
				}
      	if (err) {
	       // alert(JSON.stringify(err));
	    	}
      });
    },
    getInfo: function(args){
      var player = api.require('gotyeLivePlayer');
    },
    setDisplayMode: function(args){
//    var player = api.require('gotyeLivePlayer');
//    player.setDisplayMode({
//    	mode: args.mode || 'aspectFill'
//    })

 var alivcLivePlayer = api.require('alivcLivePlayer');
alivcLivePlayer.setVideoScalingMode({
    scalingMode:args.mode || 'corp' //设置阿里云播放全屏
});
    },
    switchToQuality: function(args){
      var player = api.require('gotyeLivePlayer');
    },
    getVideoQuality: function(args){
      var player = api.require('gotyeLivePlayer');
    },
    getAvailableQualities: function(args){
      var player = api.require('gotyeLivePlayer');
    },
    addEventListener: function(args){
    
//  var alivcLivePlayer = api.require('alivcLivePlayer');
//alivcLivePlayer.addEventListener(function(ret){
//     alert('addEventListener'+JSON.stringify(ret));
//});
//    var player = api.require('gotyeLivePlayer');
//     player.addEventListener({
//      name: args.name
//    }, function(ret, err){
//      switch(args.name){
//        case 'connected':
//          if(typeof args.connected === 'function'){
//            args.connected(ret);
//          }
//          break;
//        case 'disconnected':
//          if(typeof args.disconnected === 'function'){
//            args.disconnected(ret);
//          }
//          break;
//        case 'reconnecting':
//          if(typeof args.reconnecting === 'function'){
//            args.reconnecting(ret);
//          }
//          break;
//        case 'buffering':
//          if(typeof args.buffering === 'function'){
//            args.buffering(ret);
//          }
//          break;
//        case 'bufferCompleted':
//          if(typeof args.bufferCompleted === 'function'){
//            args.bufferCompleted(ret);
//          }
//          break;
//        case 'statusUpdate':
//          if(typeof args.statusUpdate === 'function'){
//            args.statusUpdate(ret);
//          }
//          break;
//        case 'error':
//          if(typeof args.error === 'function'){
//            args.error(ret);
//          }
//          break;
//        case 'liveStop':
//          if(typeof args.liveStop === 'function'){
//            args.liveStop(ret);
//          }
//          break;
//        case 'liveStart':
//          if(typeof args.liveStart === 'function'){
//            args.liveStart(ret);
//          }
//          break;
//      }
//    });
    },
    removeEventListener: function(args){
      var player = api.require('gotyeLivePlayer');
    },
    removeAllEventListeners: function(args){
      var player = api.require('gotyeLivePlayer');
    }
  };
  if(!window.QJ){
    window.QJ = {};
  }
  QJ.Player = player;
}(window);
