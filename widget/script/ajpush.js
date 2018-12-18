/*
 * 极光推送模块
 */
!function(window){
	var j = {
		init: function(callback){
			//初始化推送服务，只Android有效，ios上会自动初始化
			var ajpush = api.require('ajpush');
			if(api.systemType === 'android'){
				ajpush.init(function(ret) {
			    if(ret && ret.status){
			      if(typeof callback === 'function'){
			      	callback();
			      }
			    }
				});
			}else{
	      if(typeof callback === 'function'){
	      	callback();
	      }
			}
		},
		setListener: function(callback){
			//设置消息监听
			var ajpush = api.require('ajpush');
			ajpush.setListener(function(ret){
				if(typeof callback === 'function'){
					callback(ret);
				}
			});
		},
		bindAliasAndTags: function(args, callback){
			//绑定用户别名和标签。服务端可以指定别名和标签进行消息推送
			var ajpush = api.require('ajpush');
			ajpush.bindAliasAndTags(args, function(ret){
				if(ret&&ret.statusCode == 0){
					//绑定成功
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					Debug.alt('绑定失败：'+JSON.stringify(ret));
				}
			});
		},
		stopPush: function(callback){
			//停止Push推送。只Android有效。
			var ajpush = api.require('ajpush');
			ajpush.stopPush(function(ret){
				if(ret && ret.status){
					if(typeof callback === 'function'){
						callback();
					}					
				}
			});
		},
		resumePush: function(callback){
			//恢复Push推送。只Android有效。
			var ajpush = api.require('ajpush');
			ajpush.resumePush(function(ret){
				if(ret && ret.status){
					if(typeof callback === 'function'){
						callback();
					}					
				}				
			});
		},
		setBadge: function(badge, callback){
			//设置应用图标右上角数字，只iOS有效。
			var ajpush = api.require('ajpush');
			ajpush.setBadge({
			  badge: badge
			});
			if(typeof callback === 'function'){
				callback();
			}
		},
		getRegistrationId: function(callback){
			/*
			 * 集成了JPush SDK的应用程序在第一次成功注册到JPush服务器时，
			 * JPush服务器会给客户端返回一个唯一的该设备的标识RegistrationID。
			 * JPush SDK会以广播的形式发送RegistrationID到应用程序。
			 * 应用程序可以把此RegistrationID保存于自己的应用服务器上，
			 * 然后就可以根据 RegistrationID来向设备推送消息或者通知
			 */
			var ajpush = api.require('ajpush');
			ajpush.getRegistrationId(function(ret){
//				Debug.alt(JSON.stringify(ret))
			  if(typeof callback === 'function'){
			  	callback(ret);
			  }
			});
		},
		getDataByTouchNotification: function(callback){
			if(api.systemType == 'ios'){
			/*
			 * 在iOS平台，当应用在后台时，使用极光推送发送通知时,
			 * （消息只有应用在前台才能收到），系统会往设备发送通知。
			 */
				api.addEventListener({
					name:'noticeclicked'
				}, function(ret,err){
			    if(ret && ret.value){
						if(typeof callback === 'function'){
							callback(ret.value);
						}
			    }
				});		
			}else{
				/*
				 * 在Android平台，使用极光推送发送通知、消息等类型推送时，极光推送模块会往设备状态栏上发送通知，
				 * 当通知被点击后，APICloud会将本次推送的内容通过事件监听回调的方式交给开发者。
				 */
				api.addEventListener({
					name: 'appintent'
				}, function(ret, err) {
					if (ret && ret.appParam && ret.appParam.ajpush) {
						if(typeof callback === 'function'){
							callback(ret.appParam.ajpush);
						}						
					}
				});		
			}
		}
	};
	window.JPush = j;
}(window);
