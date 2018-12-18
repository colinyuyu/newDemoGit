/**
 * 创建于 2016-10-5
 */

/**
 * @author					  一元杀网络
 * @description			亲加直播-直播模块
 * @namespace				QJ
 * @version					1.0.0
 */! function(window) {
	//	var per = api.require('gotyeLivePublisher');

	var pub = {
		init : function(args) {
		var alivcLivePusher = api.require('alivcLivePusher');
alivcLivePusher.initPusher({
    resolution:'540P',
    beautyMode:'professional',
    beautyEnable:'true',
},function(ret){
   // alert(JSON.stringify(ret));
    if(ret.status){
    
    //alert(222);
    //alivcLivePusher.showDebugView();
  
    }
})
//			this.publisher = api.require('gotyeLivePublisher');
//			var userid = $api.getStorage(CONFIG.memberId);
//			//加UID作为阿里云流
//
//			this.publisher.init({
//			url : 'rtmp://video-center.alivecdn.com/live/'+$api.getStorage(CONFIG.memberId)+'?vhost=tui2.uyicp.cn'
//			
//		
//			});
		},
		startPreview : function(args) {
	//alert('args.preview'+args.preview);
		var alivcLivePusher = api.require('alivcLivePusher'); //新阿里云预览
alivcLivePusher.startPreview(

{
fixedOn:args.preview,
fixed:'false',
rect: {
									x: 0,
									y: 0,
									w: api.frameWidth,
									h: api.frameHeight
								},
},function(ret){
 if(ret.status){
 alivcLivePusher.setpreviewDisplayMode( //设置阿里云推流全屏
{
displayModel:2,
},function(ret){
    //alert('全屏');
});
//$api.setStorage('mopi',50);      这部分转移到首页，否则每次都重新调用了，
//$api.setStorage('meibai',50);
//$api.setStorage('hongrun',50);
//$api.setStorage('saihong',10);
//$api.setStorage('shoulian',10);
//$api.setStorage('xiaolian',10);
//$api.setStorage('dayan',10);
alivcLivePusher.setBeautyValues({
 beautyBuffing:$api.getStorage('mopi')||50, //磨皮
 beautyWhite:$api.getStorage('meibai')||50, //美白
    beautyRuddy:$api.getStorage('hongrun')||50, //红润
    beautyShortenFace:$api.getStorage('shoulian')||10, //瘦脸
    beautyCheekPink:$api.getStorage('saihong')||10, //腮红
    beautyThinFace:$api.getStorage('xiaolian')||10, //小脸
     beautyBigEye:$api.getStorage('dayan')||10, //大眼程度
});



}
   
})
//			this.publisher.startPreview({
//				preview : args.preview,
//				position : args.position || 'front',
//				rect : args.rect || ''
//			}, function(ret, err) {
//				if ( typeof args.success == 'function') {
//					args.success(ret);
//				}
//				if (err) {
//					//alert(JSON.stringify(err));
//					alert("请检查拍照、闪光灯权限");
//				}
//			});
		},
		publish : function(args) {
		
			//模式一需要先登录直播间
			// this.publisher.publish();
			 var alivcLivePusher = api.require('alivcLivePusher');
			   alivcLivePusher.startPush(
    {	
   url:'rtmp://video-center.alivecdn.com/live/'+$api.getStorage(CONFIG.memberId)+'?vhost=tui.gzlwks.com'
  // url:'rtmp://tuitui.ozhong.com/live/'+$api.getStorage(CONFIG.memberId)
   
    },function(ret){
    if(ret.status){
    //alert('推送成功'+JSON.stringify(ret));
  
    }
    
})
			
		},
		unpublish : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.unpublish();
		},
		stop : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			//this.publisher.stop();
			var alivcLivePusher = api.require('alivcLivePusher');
alivcLivePusher.destroy(); //阿里云直播销毁 销毁后美颜才生效
alivcLivePusher.stopPush();
		},
		switchCamera : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			api.require('alivcLivePusher').switchCamera();
			
		},
		addWatermark : function(args) {
			var publisher = api.require('gotyeLivePublisher');
		},
		clearWatermark : function(args) {
			var publisher = api.require('gotyeLivePublisher');
		},

		setTorchOn : function(args) {
			var publisher = api.require('gotyeLivePublisher');
			// console.log('args:' + JSON.stringify(args, null, 2))
			publisher.setTorchOn(args);
		},

		getTorchStatus : function(args) {
			//不能正常获取闪光灯状态
			var publisher = api.require('gotyeLivePublisher');
			publisher.getTorchStatus(function(ret, err) {
				// console.log(JSON.stringify(ret, null, 2))
				if (ret) {
					if ( typeof args.success == 'function') {
						args.success(ret);
					}
				}
			});
		},
		setMute : function(args) {
			var publisher = api.require('gotyeLivePublisher');
		},
		getMuteStatus : function(args) {
			var publisher = api.require('gotyeLivePublisher');
		},
		setVideoPreset : function(args) {
			/**
			 * 宽高比例 540 : 960
			 */
			//			var publisher = api.require('gotyeLivePublisher');
			//ipad特殊处理
			//			if(/ipad/i.test(api.deviceModel)){
			//				args.width = args.width / 2;
			//				args.height = args.height / 2;
			//			}
			// var w = args.width,	//拷贝原始宽度
			// 		h = args.height;	//拷贝原始高度

			// console.log(w + ':' + h);
			// args.width = 360;
			// args.height = args.width * h / w;
			// console.log(args.width + ':' + args.height)
			/*
			this.publisher.setVideoPreset({
				width : 360, //api.screenWidth,
				height : 640, //api.screenHeight,
				bps : 600,
				fps : 20
			});
			*/
//			this.publisher.setVideoPreset({
//				width: args.width, //648,	//756,
//				height: args.height, //1152, //1344,
//				bps: args.bps,
//				fps: args.fps
//			});
		},
		getVideoPreset : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.getVideoPreset(function(ret, err) {
				if (ret) {
					if ( typeof args.success == 'function') {
						args.success();
					}
				} else {
					if ( typeof args.error == 'function') {
						args.error();
					}
				}
			});
		},
		setFilter : function(args) {
			/*	args
			filter:'normal'     //normal  表示不添加滤镜，smoothSkin  表示美白磨皮滤镜
			* */
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.setFilter(args)
		},
		getFilter : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.getFilter(function(ret) {
				if (ret) {
					if ( typeof args.success == 'function') {
						args.success();
					}
				}
			});

		},
		setSmoothSkinFactor : function(args) {
		
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.setSmoothSkinFactor(args)
		},
		getSmoothSkinFactor : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.getSmoothSkinFactor(function(ret) {
				if (ret) {
					if ( typeof args.success == 'function') {
						args.success();
					}
				}
			});
		},
		getInfo : function(args) {
			var publisher = api.require('gotyeLivePublisher');
		},
		addEventListener : function(args) {
		//alert('args.name'+args.name);
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.addEventListener({
				name : args.name
			}, function(ret, err) {
				if ( typeof args.success === 'function') {
					args.success(ret, err);
				}
			})
		},
		removeEventListener : function(args) {
			var publisher = api.require('gotyeLivePublisher');
		},
		removeAllEventListeners : function(args) {
			var publisher = api.require('gotyeLivePublisher');
		},
		login : function(args, callback) {
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.login({
				force : true
			}, function(ret, err) {
				if ( typeof args == 'function') {
					args();
				} else if ( typeof callback == 'function') {
					callback();
				}
				if (err) {
					//					alert(JSON.stringify(err));
					console.log(JSON.stringify(err, null, 2))
				}
			});
		},
		logout : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.logout();
		},
		beginRecording : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.beginRecording();
		},
		endRecording : function(args) {
			//			var publisher = api.require('gotyeLivePublisher');
			this.publisher.endRecording(function(ret, err) {
				if ( typeof args == 'function') {
					args(ret, err);
				}
			});
		}
	};
	if (!window.QJ) {
		window.QJ = {};
	}
	QJ.Publisher = pub;
}(window);
