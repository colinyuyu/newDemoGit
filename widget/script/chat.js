/*
 * 聊天 模块
 */! function(window) {
	var c = {
		session : {
			roomId : '',
			password : '',
			nickname : ''
		}, //亲加验证信息
		barragePrice : $api.getStorage('dmprice')||8, //弹幕价格，用于打开聊天输入框(Frame)时，传参
		chatState : 0, //禁言状态码，用于打开聊天输入框(Frame)时，传参; 0-正常 1-禁言
		sendLevel : 0,
		uid : $api.getStorage(CONFIG.memberId), //用户id
		utoken : $api.getStorage(CONFIG.token), //用户token
		memberInfo : $api.getStorage(CONFIG.memberInfo), //用户的个人信息
		setParams : function(args) {
			if (args.chatState)
				this.chatState = args.chatState;
			if (args.barragePrice)
				this.barragePrice = $api.getStorage('dmprice')||args.barragePrice; //弹幕价格后台控制，从缓存读取,hotlist写入
			if (args.session)
				this.session = args.session;
			if (args.sendLevel)
				this.sendLevel = args.sendLevel;
		},
		openChatInput : function(e) {
			/**
			 * 打开聊天输入框界面
			 * 作用页面: live/live_barrage_frame.html
			 */
			e.stopPropagation();
			/**
			 * 发送监听  打开聊天输入框背景
			 * 作用页面: find/live_frame.html
			 */
			api.sendEvent({
				name : 'setTalkbg'
			});
			$api.css($api.dom('#talk_box'), 'opacity:1;z-index:1;bottom:0px;');
			$api.addCls($api.dom('.tools'), 'hidden');
			this.chatInputInit();
		},
		chatInputInit : function() {
			/**
			 * 聊天输入框界面 初始化
			 * 作用页面: component/talk.html
			 * api.pageParam来自 live/live_barrage_frame.html 页面的 Chat.openChatInput
			 *
			 */
			var param = api.pageParam, inputDom = $api.dom('#talk'), inputPos = $api.offset(inputDom), self = this;
			//大斌特定礼物才能聊天
		
			
			/* 特定礼物转移到私信里
			var  teding=$api.getStorage('teding');
			if (teding =='1') {
			
				$api.attr($api.dom('[name=talk]'), 'disabled', 'disabled');
				$api.attr($api.dom('[name=talk]'), 'placeholder',  '刷指定礼物才能继续聊天');
				$api.css($api.dom('.send>div'), 'color:grey');
			}else{
			
			
			$api.removeAttr($api.dom('[name=talk]'), 'disabled');
			$api.attr($api.dom('[name=talk]'), 'placeholder', '和大家说点什么');
			}
			*/
			if (self.chatState == 1) {
				//用户被禁言
				$api.attr($api.dom('[name=talk]'), 'disabled', 'disabled');
				$api.attr($api.dom('[name=talk]'), 'placeholder', '您已被管理员禁言，无法发言');
				$api.css($api.dom('.send>div'), 'color:grey');
			}
			//20170828 along 聊天等级权限
			var memberInfo = $api.getStorage('memberInfo');
			//alert(JSON.stringify(memberInfo));
			if (parseInt(memberInfo.level) < parseInt(self.sendLevel)) {
				$api.attr($api.dom('[name=talk]'), 'disabled', 'disabled');
				$api.attr($api.dom('[name=talk]'), 'placeholder', parseInt(self.sendLevel) + '级以下用户无法发言');
				$api.css($api.dom('.send>div'), 'color:grey');
			}
			
			if (parseInt(memberInfo.level) < parseInt(self.sendLevel)) {
				$api.attr($api.dom('[name=talk]'), 'disabled', 'disabled');
				
				$api.attr($api.dom('[name=talk]'), 'placeholder', parseInt(self.sendLevel) + '级以下用户无法发言');
				$api.css($api.dom('.send>div'), 'color:grey');
			}

			// $('#talk').trigger("click");
			setTimeout(function() {
				$api.dom('#talk').focus();
			}, 220);

			//滚动到底部，防止键盘遮挡输入框
			$('body').animate({
				scrollTop : $api.offset($api.dom('body')).h
			}, 600);

			$('#talk').focus(function(e) {
				$('body').animate({
					scrollTop : $api.offset($api.dom('body')).h
				}, 600);
			});
			// 添加监听 更新禁言状态
			api.addEventListener({
				name : 'updateChatState'
			}, function(ret, err) {
				if (ret && ret.value) {
					self.chatState = ret.value.chatState;
					if (self.chatState == 1) {
						$api.attr($api.dom('[name=talk]'), 'disabled', 'disabled');
						$api.attr($api.dom('[name=talk]'), 'placeholder', '您已被管理员禁言，无法发言');
						$api.css($api.dom('.send>div'), 'color:grey');
					} else {
						//$api.attr($api.dom('[name=talk]'), 'disabled', false);
						$api.removeAttr($api.dom('[name=talk]'), 'disabled');
						//以上方法已经过时 along
						if ($api.dom('.msg-barrage-on')) {
							$api.attr($api.dom('[name=talk]'), 'placeholder', '开启大喇叭，' + self.barragePrice + '钻石/条');
						} else {
							$api.attr($api.dom('[name=talk]'), 'placeholder', '和大家说点什么');
						}
						$api.css($api.dom('.send>div'), 'color: #FE5F99');
					}
				}
			})
			$api.one($api.dom('#main'), 'click', function() {
				self.closeChatInput();
			});
		},
		closeChatInput : function() {
			/**
			 * 关闭聊天输入框界面
			 * 作用页面: component/talk.html
			 */
			api.sendEvent({
				name : 'bottom'
			});
			// api.setFrameAttr({
			//   name: 'talk',
			//   hidden: true
			// });
			$api.css($api.dom('#talk_box'), 'opacity:0;z-index:-1;bottom:-52px;');
			$api.rmEvt($api.dom('#main'), 'click', function() {
			});

			$api.rmEvt($api.dom('#main'), 'touch', function() {
			});
		},
		switchBarrageBtn : function(_this) {
			/**
			 * 打开/关闭 发送弹幕消息功能
			 * 作用页面: component/talk.html
			 */

			if (this.chatState == 1) {
				return;
			}
			if ($api.dom('.msg-barrage-off')) {
				$api.removeCls(_this, 'msg-barrage-off');
				$api.addCls(_this, 'msg-barrage-on');
				$api.attr($api.dom('[name=talk]'), 'placeholder', '开启大喇叭，' + this.barragePrice + '钻石/条');
			} else {
				$api.addCls(_this, 'msg-barrage-off');
				$api.removeCls(_this, 'msg-barrage-on');
				$api.attr($api.dom('[name=talk]'), 'placeholder', '和大家说点什么');
			}

			setTimeout(function() {
				document.getElementById('talk').focus();
			}, 100)
		},
		sendTextEvent : function(isLiver) {
			/**
			 * 触发：发送文字消息 事件: talk_send_message
			 * 事件接收页面：live/live_barrage_frame.html
			 * 作用页面: component/talk.html
			 *
			 * @param {Boolean} isLiver		//是否为主播
			 */

			var talkInputDom = $api.dom('[name = talk]');
			if (this.chatState == 1) {
				Tool.toast('您已被管理员禁言，无法发言');
				return;
			}
			var text = $api.val(talkInputDom), type = 0;
			//普通文字消息

			if ($api.dom('.msg-barrage-on')) {
				type = 1;
				//弹幕消息

				//检查用户余额
				if (parseInt($api.getStorage(CONFIG.memberInfo).diamonds) < this.barragePrice) {
					Tool.toast('钻石余额不足，请充值~');
					return;
				}
			}

			if (!text || $api.trimAll(text).length == 0) {
				Tool.toast('请输入消息内容');
				return;
			}

			//			api.sendEvent({
			//				name: 'talk_send_message',
			//				extra: {
			//					text: text,
			//					type: type
			//				}
			//			});
			this.sendText(text, type, isLiver);
			//清空文字输入框
			$api.val(talkInputDom, '');
			setTimeout(function() {
				document.getElementById('talk').focus();
			}, 100)
		},
		sendText : function(text, type, isLiver) {
			/**
			 * 直播时候发言（文字&&弹幕）
			 * 收到来自 component/talk.html 的 talk_send_message 事件后，发送消息
			 * 作用页面: live/live_barrage_frame.html
			 */

			var self = this, extra = {
				type : 1,
				extra : {
					memberid : this.uid,
					createdtime : formatDate(Date(), 'YMDhms'),
					type : type,
					avatar : this.memberInfo.avatar,
					nickname : this.memberInfo.nickname,
					level : this.memberInfo.level,
					is_vip : $api.getStorage(CONFIG.memberInfo).is_vip||0  //vip显示皇冠
				}
			};

			function send() {
				//闭包
				RongCloud2.sendTextMessage({
					text : text,
					extra : extra,
					targetId : api.pageParam.memberid,
					conversationType : 'CHATROOM',
					success : function(ret) {
						T.append('.live_msg', 'live_msg_text', {
							text : text,
							extra : extra.extra,
							roomid : self.session.roomId
						});
						//消息栏滚动到底部
						$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
						if (type == 1) {
							//展示弹幕
							self.barrage(extra.extra, text);
						}
						if (isLiver) {
							//缓存消息
							Anchor.insertIntoTable({
								memberid : self.uid,
								roomid : self.session.roomId,
								type : type,
								content : text,
								createdtime : extra.extra.createdtime
							});
						}
					}
				})
			};

			if (type == 1) {
				//用户发送弹幕消息，通知服务器扣费
				ajax.get({
					ctrl : 'zhiboApp',
					fn : 'deductions',
					data : {
						values : {
							id : this.uid,
							token : this.utoken,
							type : type,
						}
					},
					hideLoading : true,
					showError : true,
					showProgress : false,
					success : function(ct) {
						var memberinfo = $api.getStorage(CONFIG.memberInfo);
						memberinfo.diamonds = ct.diamonds;
						self.memberInfo = memberinfo;
						$api.setStorage(CONFIG.memberInfo, memberinfo);
						send();
						Tool.toast('弹幕发送成功');
					}
				});
			} else {
				//普通文字消息
				send();
			}
		},
		barrage : function(extra, text) {
			/**
			 * 发送弹幕消息
			 * 作用页面: live/live_barrage_frame.html
			 */
			var item = {
				img : extra.avatar, //图片
				info : text, //文字
				close : false, //显示关闭按钮
				duration : 8000, //延迟,单位秒,默认6
				bottom : Math.floor(Math.random() * ($('body').height() - 315) + 185), //距离底部高度,单位px,默认随机
				color : '#fff', //颜色,默认白色
				old_ie_color : '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色
			}
			$('.barrage_list_box').barrager(item);
		},
	}
	window.Chat = c;
}(window);
