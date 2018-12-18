/*
 * qq封装了qq开放平台的SDK，实现了qq登陆，空间分享等大部分功能
 */
!function(window){
	var q = {
		installed: function(callback){
			/*判断当前设备是否安装了QQ客户端
			 */
			var qq = api.require('qq');
			qq.installed(function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					api.toast({
						msg: '请先安装QQ客户端'
					});
					return;
				}
			});
		},
		login: function(args, callback){
			/**登陆qq
			 * args 内部结构
			 * 	apiKey 从腾讯开放平台申请的app key，可为空，为空则从当前widget的config文件读取
			 * 
			 * @return
			 * 	accessToken qq登陆token
			 * 	openId 
			 */
			var qq = api.require('qq');
			qq.login({
				apiKey: args.apiKey || ''
			}, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback(ret);
					}
				}else{
					if(err.msg){
						api.toast({
							msg: err.msg
						});
					}					
				}
			});
		},
		logout: function(callback){
			/*登出qq
			 */
			var qq = api.require('qq');
			qq.logout(function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					if(err.msg){
						api.toast({
							msg: err.msg
						});
					}					
				}
			});
		},
		getUserInfo: function(callback){
			/*获取用户信息
			 * @return
			 * 	province 用户所在省份
			 * 	city 用户所在城市
			 * 	figureurl	空间小头像（30）地址
			 * 	figureurl_1	空间小头像（50）地址
			 * 	figureurl_2 空间小头像（100）地址
			 * 	figureurl_qq_1 用户小头像（40）地址
			 * 	figureurl_qq_2 用户大头像（100）地址
			 * 	gender 用户性别
			 * 	is_yellow_vip 是否为黄钻用户
			 * 	yellow_vip_level 用户账户黄钻等级
			 * 	level 用户账号等级	
			 * 	nickname 用户昵称
			 * 	year 用户出生年份
			 */
			var qq = api.require('qq');
			qq.getUserInfo(function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback(ret.info);
					}
				}else{
					if(err.msg){
						api.toast({
							msg: err.msg
						});
					}
				}
			});
		},
		shareText: function(text, callback){
			/*分享纯文本到好友
			 * 注意：android不支持此接口
			 * text 要分享的文本
			 */
			var qq = api.require('qq');
			qq.shareText({
				text: text
			}, function(ret, err){
				if(ret.status){
					if(typeof callback === 'function'){
						callback();
					}
				}
			});
		},
		shareWebPage: function(args, callback){
			/*分享网页到空间/好友
			 * args 内部结构
			 * 	type 分享内容到好友或空间，取值范围QZone，QFriend，可为空
			 * 	url 要分享的网页链接地址
			 * 	title 要分享的网页标题
			 * 	description 网页描述
			 * 	imgUrl 要分享的新闻缩略图的url(网络/本地资源)图片,若 type 为 QZone 则本参数在 Android上仅支持网络图片
			 */
			var qq = api.require('qq'),
					self = this;
			qq.shareNews(args, function(ret, err){
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
			/*分享音乐到空间/好友
			 * args 内部结构
			 * 	type 分享内容到好友或空间，取值范围QZone，QFriend，可为空
			 * 	url 要分享的音乐链接地址
			 * 	title 要分享的音乐名
			 * 	description 要分享的音乐描述
			 * 	imgUrl 要分享的音乐缩略图url(网络/本地资源图片)，若 type 为 QZone 则本参数在 Android上仅支持网络图片
			 */
			var qq = api.require('qq'),
					self = this;
			qq.shareMusic(args, function(ret, err){
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
			/*分享视频到空间/好友
			 * args 内部结构
			 * 	type 分享内容到好友或空间，取值范围QZone，QFriend，可为空
			 * 	url 要分享的视频链接地址
			 * 	title 要分享的视频标题
			 * 	description 要分享的视频描述
			 * 	imgUrl 要分享的视频缩略图路径（网络/本地资源图片），不能为空，若 type 为 QZone 则本参数在 Android 上仅支持网络图片
			 */
			var qq = api.require('qq'),
					self = this;
			qq.shareVideo(args, function(ret, err){
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
			/*错误信息处理
			 */
			if(err && err.msg){
				api.toast({
					msg: err.msg
				});
			}
		}
	};
	window.QQ = q;
}(window);
