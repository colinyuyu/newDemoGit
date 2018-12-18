/*
 * wx 封装了微信开放平台的SDK
 * 集成了微信登录、微信分享功能；可用于实现微信账号登录，分享内容到朋友圈或好友
 */
!function(window){
	var w = {
		isInstalled: function(callback){
			/*判断当前设备是否安装微信客户端
			 */
			var wx = api.require('wx');
			wx.isInstalled(function(ret, err){
				if(ret.installed){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					api.toast({
						msg: '请先安装微信客户端'
					});
				}
			});
		},
		shareText: function(args, callback){
			/*分享文本内容
			 * args 内部结构
			 * 	apiKey 从微信开放平台获取的 appid，若不传则从当前 widget 的 config.xml 中读取。
			 * 	scene[timeline(朋友圈)] 场景
			 * 	text 分享的文本
			 */
			var wx = api.require('wx'),
					self = this;
			wx.shareText(args, function(ret, err){
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
			/*分享图片内容
			 * args 内部结构
			 * 	apiKey
			 * 	scene[timeline] 场景
			 * 		session（会话）
			 * 		favorite（收藏）
			 *	thumb 
			 * 		缩略图片的地址，支持 fs://，widget:// 协议。大小不能超过32K，若 contentUrl 为本地图片地址则本参数忽略
			 * 	contentUrl 
			 *		分享图片的 url 地址（支持 fs://、widget:// 和网络路径），长度不能超过10k
			 * 		若为网络图片仅当 scene 为 session 时有效，若为本地图片,大小不能超过10M
			 */
			var wx = api.require('wx'),
					self = this;
			wx.shareImage(args, function(ret, err){
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
			 *  apiKey
			 * 	scene session（会话）| timeline（朋友圈）| favorite（收藏）
			 * 	title 分享网络音频的标题
			 * 	description 分享网络音频的描述
			 * 	thumb 分享网络音频的缩略图地址，要求本地路径（fs://，widget://）大小不能超过32K
			 * 	contentUrl 分享网络音频的 url 地址，长度不能超过10k。
			 */
			var wx = api.require('wx'),
					self = this;
			wx.shareMusic(args, function(ret, err){
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
			/*分享网络视频资源
			 * args 内部结构
			 *  apiKey
			 * 	scene session（会话）| timeline（朋友圈）| favorite（收藏）
			 * 	title 分享网络音频的标题
			 * 	description 分享网络视频的描述。由于微信平台限制，对不同平台部分场景本参数无效
			 * 	thumb 分享网络视频的缩略图地址，要求本地路径（fs://，widget://）大小不能超过32K
			 * 	contentUrl 分享网络视频的 url 地址，长度不能超过10k。
			 */
			var wx = api.require('wx'),
					self = this;
			wx.shareVideo(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					self.disposeError(err);
				}
			});
		},		
		shareWebpage: function(args, callback){
			/*分享享网页
			 * args 内部结构
			 *  apiKey
			 * 	scene session（会话）| timeline（朋友圈）| favorite（收藏）
			 * 	title 分享网页的标题
			 * 	description 分享网页的描述。由于微信平台限制，对不同平台部分场景本参数无效
			 * 	thumb 分享网页的缩略图地址，要求本地路径（fs://，widget://）大小不能超过32K
			 * 	contentUrl 分享网页的 url 地址，长度不能超过10k。
			 */
			var wx = api.require('wx'),
					self = this;
			wx.shareWebpage(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					self.disposeError(err);
				}
			});
		},		
		auth: function(args, callback){
			/*登录授权（用于实现第三方登录）
			 * args 内部结构
			 * 	apiKey
			 * 
			 * @return
			 * 	code getToken 接口需传入此值，用于换取 accessToken
			 */
			var wx = api.require('wx'),
					self = this;
			wx.auth(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback(ret);
					}
				}else{
					if(err && err.code){
						var msg = '';
						switch(err.code){
							case -1:
								msg = '未知错误';
								break;
							case 1:
								msg = '用户取消';
								break;
							case 2:
								msg = '用户拒绝授权';
								break;
							case 3:
								msg = '当前设备未安装微信客户端';
								break;
						}
						api.toast({
							msg: err.code + '-' + msg
						});
					}
				}
			});
		},
		getToken: function(args, callback){
			/*获取授权 accessToken（需要登录授权成功）
			 * args 内部结构
			 * 	apiKey 从微信开放平台获取的 secret，若不传则从当前 widget 的 config.xml 中读取。
			 * 	apiSecret 从微信开放平台获取的 secret，若不传则从当前 widget 的 config.xml 中读取。
			 * 	code 通过 auth 接口授权成功后返回的 code 参数
			 * 
			 * @return
			 * 	accessToken 
			 * 		接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
			 * 	dynamicToken 
			 * 		当 accessToken 过期时把该值传给 refreshToken 接口刷新 accessToken 的有效期。dynamicToken 的有效期为30天
			 * 	expires 
			 * 		数字类型, accessToken 有效期，单位（秒）
			 * 	openId
			 * 		授权用户唯一标识
			 */
			var wx = api.require('wx'),
					self = this;
			wx.getToken(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback(ret);
					}
				}else{
					if(err && err.code){
						var msg = '';
						switch(err.code){
							case -1:
								msg = '未知错误';
								break;
							case 1:
								msg = 'apiKey值为空或非法';
								break;
							case 2:
								msg = 'apiSecret值为空或非法';
								break;
							case 3:
								msg = 'code值为空或非法';
								break;
							case 4:
								msg = '网络超时';
								break;
						}
						api.toast({
							msg: err.code + '-' + msg
						});						
					}
				}
			});
		},
		getUserInfo: function(args, callback){
			/*获取用户信息（需要获取 accessToken 成功）
			 * args 内部结构
			 * 	accessToken getToken 接口或 refreshToken 接口成功获取的 accessToken 值
			 * 	openId getToken 接口或 refreshToken 接口成功获取的 openId 值
			 * 
			 * @return
			 * 	openid 普通用户的标识，对当前开发者帐号唯一
			 * 	nickname 普通用户昵称
			 * 	sex 普通用户性别，1为男性，2为女性
			 * 	headimgurl 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
			 * 	privilege 数组类型；用户特权信息，如微信沃卡用户为（chinaunicom）
			 * 	unionid 用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
			 */
			var wx = api.require('wx'),
					self = this;
			wx.getUserInfo(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback(ret);
					}
				}else{
					if(err && err.code){
						var msg = '';
						switch(err.code){
							case -1:
								msg = '未知错误';
								break;
							case 1:
								msg = 'accessToken 过期';
								return;
							case 2:
								msg = 'openId非法';
								break;
							case 3:
								msg = 'openId值为空';
								break;
							case 4:
								msg = 'accessToken值为空';
								break;
							case 5:
								msg = '(accessToken非法';
								break;
							case 6:
								msg = '网络超时';
								break;
						}
						api.toast({
							msg: err.code + '-' + msg
						});						
					}
				}
			});			
		},
		refreshToken: function(args, callback){
			/*调用 getUserInfo 接口错误码返回1时，代表 accessToken 过期，调用此接口刷新 accessToken
			 * args 内部结构
			 * 	apiKey 从微信开放平台获取的 appid，若不传则从当前 widget 的 config.xml 中读取。
			 * 	dynamicToken: getToken接口或 refreshToken 接口获取的 dynamicToken 值
			 * 
			 * @return
			 * 	accessToken 
			 * 		接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
			 * 	dynamicToken 
			 * 		当 accessToken 过期时把该值传给 refreshToken 接口刷新 accessToken 的有效期。dynamicToken 的有效期为30天
			 * 	expires 
			 * 		数字类型, accessToken 有效期，单位（秒）
			 * 	openId
			 * 		授权用户唯一标识
			 */
			var wx = api.require('wx'),
					self = this;
			wx.refreshToken(args, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback(ret);
					}
				}else{
					if(err && err.code){
						var msg = '';
						switch(err.code){
							case -1:
								msg = '未知错误';
								break;
							case 1:
								msg = 'apiKey值为空或非法';
								break;
							case 2:
								msg = 'apiSecret值为空或非法';
								break;
							case 3:
								msg = 'code值为空或非法';
								break;
							case 4:
								msg = '网络超时';
								break;
						}
						api.toast({
							msg: err.code + '-' + msg
						});						
					}
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
						msg = '未知错误';
						break;
					case 1:
						msg = 'apiKey非法';
						break;
					case 2:
						msg = '用户取消';
						break;
					case 3:
						msg = '发送失败';
						break;
					case 4:
						msg = '授权失败';
						break;
					case 5:
						msg = '微信服务器返回的不支持错误';
						break;
					case 6:
						msg = '当前设备未安装微信客户端';
						break;
					case 7:
						msg = '注册SDK失败';
						break;
				}
				api.toast({
					msg: err.code + '-' + msg
				});
			}
		}
	};
	window.WX = w;
}(window);
