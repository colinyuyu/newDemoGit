/*
 * weibo 封装了新浪微博开放平台的移动端 SDK，使用此模块可实现
 * 新浪微博授权登录，获取用户信息，分享文本、图片、音频、视频、网页
 * 等信息到微博移动客户端的功能
 */
!function(window){
	var wei = {
		isInstalled: function(callback){
			/*判断是否已安装新浪微博客户端
			 */
			var weibo = api.require('weibo');
			weibo.isInstalled(function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					api.toast({
						msg: '请先安装新浪微博客户端'
					});
					return;
				}
			});
		},
		auth: function(args, callback){
			/*授权登录（用于实现第三方登录）
			 * args 内部结构
			 * 	apiKey 从新浪微博开放平台申请的 App Key，若不传则从当前 widget的 config.xml中读取
			 * 	registUrl 在新浪微博开放平台创建应用时（应用信息 -> 高级信息 -> 授权设置）自定义填写的回调 url
			 * 
			 * @return
			 *  token 从新浪微博服务器获取的 accessToken，接口调用凭证，传给 getUserInfo 接口获取用户信息
			 * 	userId 从新浪微博服务器获取的 userId，新浪微博分配的用户id，传给 getUserInfo 接口获取用户信息
			 */
			var weibo = api.require('weibo'),
					self = this;
			weibo.auth({
				apiKey: args.apiKey || '',
				registUrl: args.registUrl || ''
			}, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback(ret);
					}
				}else{
					self.disposeError(err);				
				}
			});
		},
		cancelAuth: function(callback){
			/*取消授权，退出登录状态
			 */
			var weibo = api.require('weibo');
			weibo.cancelAuth(function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					if(err && err.code){
						var msg = '';
						switch(err.code){
							case 1:
								msg = '尚未登录';
								return;
						}
						api.toast({
							msg: msg
						});						
					}				
				}
			});
		},
		getUserInfo: function(args, callback){
			/*获取用户信息
			 * args 内部结构
			 * 	token 登录账号获取的token值    默认值：当前已登录账号的 token
			 * 	userId 登录账号获取的 userId 默认值：当前已登录账号的 userId
			 * @return 
			 * 	userInfo { 
			 * 		JSON对象；获取的用户信息（微博返回）
			 * }
			 */
			var weibo = api.require('weibo');
			weibo.getUserInfo({
				token: args.token || '',
				userId: args.userId || ''
			}, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback(ret.userInfo);
					}
				}else{
					if(err && err.code){
						var msg = '';
						switch(err.code){
							case -1:
								msg = 'token 或 userId 非法';
								break;
							case 1:
								msg = '网络超时';
								return;
						}
						api.toast({
							msg: msg
						});						
					}
				}
			});
		},
		shareText: function(text, callback){
			/*分享纯文本
			 * text 分享的文本，长度小于140个汉字
			 */
			var weibo = api.require('weibo'),
					self = this;
			weibo.shareText({
				text: text
			}, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					self.disposeError(err);
				}
			});
		},
		shareWebPage: function(args, callback){
			/*分享网页
			 * args 内部结构
			 * 	text 分享的文本，长度小于140个汉字
			 * 	title 分享网页的标题
			 * 	description 分享网页的描述
			 * 	thumb 分享网页的缩略图地址，要求本地路径（fs://、widget://），大小小于32k
			 * 	contentUrl 分享网页的 url 地址，不能为空且长度不能超过255
			 */
			var weibo = api.require('weibo'),
					self = this;
			weibo.shareWebPage(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					self.disposeError(err);
				}
			});
		},
		shareImage: function(args, callback){
			/*分享网页
			 * args 内部结构
			 * 	text 分享的文本，长度小于140个汉字
			 * 	imageUrl 分享的图片路径，要求本地路径（fs://、widget://），大小不能超过10M
			 */
			var weibo = api.require('weibo'),
					self = this;
			weibo.shareImage(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					self.disposeError(err);
				}
			});
		},
		shareMusic: function(args, callback){
			/*分享网络音频资源
			 * args 内部结构
			 * 	text 分享的文本，长度小于140个汉字
			 * 	title 分享网络音频的标题
			 * 	description 分享网页的描述
			 * 	thumb 分享网页的缩略图地址，要求本地路径（fs://、widget://），大小小于32k
			 * 	contentUrl 分享网页的 url 地址，不能为空且长度不能超过255
			 */
			var weibo = api.require('weibo'),
					self = this;
			weibo.shareMusic(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					self.disposeError(err);
				}
			});
		},
		shareVideo: function(args, callback){
			/*分享网络音频资源
			 * args 内部结构
			 * 	text 分享的文本，长度小于140个汉字
			 * 	title 分享网络视频的标题，不能为空且长度小于1k
			 * 	description 分享网络视频的描述，长度小于1k
			 * 	thumb 分享网络视频的缩略图地址，要求本地路径（fs://、widget://），大小小于32k
			 * 	contentUrl 分享网络视频的 url 地址，不能为空且长度不能超过255
			 */
			var weibo = api.require('weibo'),
					self = this;
			weibo.shareVideo(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					self.disposeError(err);
				}
			});
		},
		disposeError: function(err){
			/*错误处理
			 */
			if(err && err.code){
				var msg = '';
				switch(err.code){
					case -1:
						msg = 'apiKey 值非法';
						break;
					case 1:
						msg = '用户取消';
						break;
					case 2:
						msg = '发送失败';
						break;
					case 3:
						msg = '授权失败';
						break;
					case 4:
						msg = '不支持的请求';
						break;
					case 5:
						msg = '未知错误';
						break;
				}
				api.toast({
//					msg: err.code + '-' + msg
					msg: msg
				});
			}
		}
	};
	window.Weibo = wei;
}(window);
