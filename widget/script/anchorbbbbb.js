/*
 * 直播-主播 模块
 */

! function(window) {
	var a = {
		session: {
			roomId: '',
			password: '',
			nickname: ''
		}, //亲加验证信息
		cameraPosition: 'front', //摄像头方向，默认开启前摄像头
		cameraReady: false, //直播镜头是否准备就绪
		flashStatus: false, //闪光灯是否打开
		barragePrice: 1, //弹幕价格，用于打开聊天输入框(Frame)时，传参
		chatState: 0, //禁言状态码，用于打开聊天输入框(Frame)时，传参; 0-正常 1-禁言
		giftArray: [], //礼物数组，监听聊天室的礼物消息，并将其显示到屏幕
		//historyMessageTable-记录直播室聊天记录的数据表的名称，格式：'message_history_用户id_房间id'
		historyMessageTable: '',
		uid: $api.getStorage(CONFIG.memberId), //用户id
		utoken: $api.getStorage(CONFIG.token), //用户token
		memberInfo: $api.getStorage(CONFIG.memberInfo), //用户的个人信息
		audienceId: 0, //当前用户资料卡用户id
		audienceIsGag: 0, //当前资料卡用户禁言状态
		audienceIsManager: 2, //当前资料卡用户管理员状态
		init: function() {
			//直播间初始化
			var ctrl = 'zhiboApp',
				fn = 'getroomid',
			//私密房间信息
				secretPassword = $api.getStorage('secretPassword'),
				secretDiamond = $api.getStorage('secretDiamond'),
				secretState = $api.getStorage('secretState'),
				self = this;

			//异步获取房间信息
			ajax.get({
				ctrl: ctrl,
				fn: fn,
				hideLoading: true,
				showError: true,
				showProgress: true,
				data: {
					values: {
						id: self.uid,
						token: self.utoken,
						secretPassword: secretPassword,
						secretDiamond: secretDiamond,
						secretState: secretState
					}
				},
				success: function(ct) {
				
				//alert(ct.roomid);
				//alert(ct.name);
					//if(ct.name) {
						//设置直播间默认标题
						//$api.val($api.dom('[name = name]'), ct.name);
					//}

					//打开一个空白Frame，用于渲染摄像头捕捉的画面
					api.openFrame({
						name: 'live_camera',
						url: api.wgtRootDir + '/zhibo/html/live/camera.html',
						bounces: false,
						animation: {
							type: 'none',
						}
					});

					//摄像头画面置底
					api.sendFrameToBack({
						from: 'live_camera',
						to: 'live_index'
					});

					//记录亲加的验证信息
					self.session.roomId = ct.roomid;
					self.session.password = ct.pwd;
					self.session.nickname = $api.getStorage(CONFIG.memberInfo).nickname;
					//验证房间信息
//					alert(11111);
					QJ.Core.authRoomSession({ //阿里云自建改亲加加回去大斌
						roomId: ct.roomid, //阿里云自建改亲加加回去大斌
						password: ct.pwd,  //阿里云自建改亲加加回去大斌
						nickname: self.session.nickname, //阿里云自建改亲加加回去大斌
						success: function(ret) { //阿里云自建改亲加加回去大斌
							//验证通过后，初始化推送流
							QJ.Publisher.init(self.session);
							
							// var flag = 1.23
							//						console.log((api.screenWidth/flag) + ':' + (api.screenHeight/flag))

							//设置视频编码参数
							/*
							QJ.Publisher.setVideoPreset({
								width: 540, //api.screenWidth,
								height: 960, //api.screenHeight,
								bps: 1500,
								fps: 24
							});
							*/
							QJ.Publisher.setVideoPreset({
								width: 360, //api.screenWidth,
								height: 640, //api.screenHeight,
								bps: 700,
								fps: 20
							});
							/*
							QJ.Publisher.setVideoPreset({
								width: 360, //api.screenWidth,
								height: 640, //api.screenHeight,
								bps: 400,
								fps: 20
							});
							*/
							//1248.780487804878:1665.040650406504
							//1253.877551020408:1671.8367346938774
							//console.log(api.frameName + ':' + api.winName)

							//在推流之前，需要先打开设备的摄像头
							QJ.Publisher.startPreview({
								preview: 'live_camera',
								position: self.cameraPosition,
								rect: {
									x: 0,
									y: 0,
									w: api.frameWidth,
									h: api.frameHeight
								},
								success: function(ret) {
									self.cameraReady = true;
									$api.css($api.dom('#main'), "background-image: url();")
								}
							});
						} //阿里云自建改亲加加回去大斌
					}); //阿里云自建改亲加加回去大斌

				}
			});
		},
		uploadPosition: function() {
			/**
			 * 上传主播当前位置信息，用于“附近”列表
			 */
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'uploadPosition',
				hideLoading: true,
				showError: true,
				showProgress: true,
				data: {
					values: {
						id: this.uid,
						token: this.utoken,
						x: $api.getStorage('lon'),
						y: $api.getStorage('lat')
					}
				},
				success: function(ct) {
					// Debug.alt('主播位置同步成功')
				}
			})
		},
		live: function() {
			/**
			 * 用户点击“开始直播”按钮
			 */
			
			var name = $api.val($api.dom('[name = name]')),
				self = this,
				ctrl = 'zhiboApp',
				fn = 'live';

			if(!this.cameraReady) {
				Tool.toast('摄像头没有正确打开，请检查摄像头权限是否打开');
				return;
			}
			// if (!name) {
			  // Tool.toast('给直播写个标题吧~');
			  // return;
			// }
		
			QJ.Publisher.login(function() {  ////如果是阿里云推流则注释掉这一正行，因为模式2不需要登录房间先
				
				//打开主播交互层页面
				api.openFrame({
					name: 'live_room',
					url: api.wgtRootDir + '/zhibo/html/live/live_barrage_frame.html',
					bounces: false,
					pageParam: self.session,
					animation: {
						type: "none",
					}
				});
				//将摄像头画面置前
				api.sendFrameToBack({
					from: 'live_index'
				});
				QJ.Publisher.publish();
				//设置是否禁止屏幕休眠
				//主播交互层页面置前
				api.bringFrameToFront({
					from: 'live_room',
				});
				api.setKeepScreenOn({
					keepOn: true
				});
				self.uploadPosition(); //上传主播经纬度
				QJ.Publisher.beginRecording();

				QJ.Publisher.beginRecording();

				ajax.get({
					ctrl: ctrl,
					fn: fn,
					hideLoading: true,
					showError: true,
					showProgress: true,
					data: {
						values: {
							id: self.uid,
							token: self.utoken,
							name: name
						}
					},
					success: function(ct) {}
				});
				QJ.Publisher.addEventListener({ //主播缩小监听 大斌
					name: 'disconnected',
					success: function(ret) {
					//alert(111111111111);
					QJ.Publisher.publish(); //大斌断开后再连
						Debug.alt('disconnected' + JSON.stringify(ret));
					}
				});
				QJ.Publisher.addEventListener({
					name: 'connected',
					success: function(ret) {
						 	
						//alert('推流端连接服务器成功');
					}
				})
				QJ.Publisher.addEventListener({
					name: 'reconnecting',
					success: function(ret) {
					
						Debug.alt('reconnecting' + JSON.stringify(ret));
					}
				});

				 	QJ.Publisher.addEventListener({
				 		name: 'statusUpdate',
				 		callback:function(ret){
				 			alert('statusUpdate'+JSON.stringify(ret));
				 		}
				 	})

				QJ.Publisher.addEventListener({
					name: 'error',
					success: function(ret, err) {
						Debug.alt('ret' + JSON.stringify(ret, null, 2) + 'error' + JSON.stringify(ret, null, 2));
						// switch (ret.code) {
						//   case -102: //网络断开
						//     QJ.Publisher.publisher();
						//     break;
						// }
					}
				});

				QJ.Publisher.addEventListener({
					name: 'forceLogout',
					success: function(ret) {
					
						Debug.alt('forceLogout' + JSON.stringify(ret));
					}
				})

			})   ////如果是阿里云推流则注释掉这一正行

		},
		roomInit: function() {
			/**
			 *直播间初始化
			 * 页面：html/live/live_barrage_frame.html 的第一个执行方法
			 */

			var self = this;
			//页面参数 api.pageParam 来自于页面：html/live/index.html
			// 储存亲加验证信息 session
			if(api.pageParam) {
				//检测页面参数是否正常获取
				this.session = api.pageParam;
				this.historyMessageTable = 'message_history_' + this.uid + '_' + api.pageParam.roomId;
			} else {
				Tool.toast('房间信息异常！将关闭直播');
				setTimeout('api.closeWin();', 500);
			}
			
			//初始化推送流
			QJ.Publisher.init(self.session);
			getRongToken(function(ret1) {
     		//alert(self.uid);
					RongCloud2.init(function(a1,a2) {
						RongCloud2.setConnectionStatusListener();
						RongCloud2.setOnReceiveMessageListener(function(ret) {
							setOnReceiveMessageListener(ret);
						});
						RongCloud2.connect({
							token : ret1.token
						}, function() {
							//新建聊天室
							//alert(ret1.token);
							//加入聊天室
							api.pageParam.memberid=self.uid;
							RongCloud2.joinChatRoom({chatRoomId: self.uid,defMessageCount: -1}, function(ret) {
									if ('success'== ret.status  )
										//alert("加入聊天室成功");
										self.getRoomMessage();
							})
						});
					});
				
			});
			//初始化 亲加 聊天室模块
//			alert(111);
//			QJ.Chat.init(this.session);
//			Anchor.receiveMsgListener(true);
//			//登录聊天室
//			QJ.Chat.login({
//				autoRelogin: true,
//				beforeRelogin: function() {
//					api.toast({
//						location: 'top',
//						msg: '登录聊天服务器失败，正在尝试重连~'
//					});
//				},
//				success: function(ret) {
//					Debug.toast('登录聊天室成功~');
//					//获取直播间面板信息
//					self.getRoomMessage();
//				}
//			});

		},
		getRoomMessage: function() {
		
			/**
			 * 直播登录聊天室成功后，获取聊天室信息
			 * 作用页面：live/live_barrage_frame.html
			 *
			 */
			var self = this;

			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'roomnews',
				data: {
					values: {
						id: this.uid,
						token: this.utoken,
						roomid: this.session.roomId,
						memberid: this.uid
					}
				},
				hideLoading: true,
				showError: true,
				showProgress: false,
				success: function(ct) {
				
				//$api.setStorage('teding', ct.teding||0); //主播端特定礼物写入特定礼物需要更新
					//更新弹幕价格
					//更新用户禁言状态
					Chat.setParams({
						barragePrice: ct.chatprice,
						chatState: ct.chatstate,
						session: self.session
					});
					//更新Gift.js session状态
					Gift.setParams({
						session: self.session
					});

					//更新memberInfo缓存数据
					var memberinfo = $api.getStorage(CONFIG.memberInfo);
					memberinfo.diamonds = ct.diamonds;
					$api.setStorage(CONFIG.memberInfo, memberinfo);

					ct.memberid = self.uid;
					ct.roomid = self.session.roomId;
					//过滤直播公告内容的html标签
					ct.notice = Tool.removeHTMLTag(ct.notice);
					T.html('#wrap', 'main', ct, true);

					//定时获取直播公告
					window.setInterval(self.getRoomNotice, 1000 * 60 * 10);

					//获取在线看直播的人数
					self.setRoomMemberCount();
					//					QJ.Core.getLiveContext({
					//						roomId: self.session.roomId,
					//						password: self.session.password,
					//						nickname: self.session.nickname,
					//						success: function(ret) {
					//							Debug.toast('获取在线人数成功');
					//							if(ret.recordingStatus == 1) {
					//								$api.text($api.dom('.online_count'), ret.playUserCount);
					//							}
					//
					//						}
					//					});

					//创建历史消息数据表，记录历史消息数据，用于上传至服务器
					self.createHistoryMessageTable();
					//alert(11);
				}
			});
		},
		setRoomMemberCount: function() {
			/**
			 * 设置房间在线人数
			 */
			$api.text($api.dom('.online_count'), $api.domAll('.fans').length);
		},
		createHistoryMessageTable: function() {
			/**
			 * 创建历史消息数据表，记录历史消息数据
			 * 作用页面：live/live_barrage_frame.html
			 */
			var self = this;
			DB.createTable({
				table: this.historyMessageTable,
				field: ['memberid', 'roomid', 'type', 'content', 'createdtime'],
				success: function() {
					Debug.toast('创建表成功');
					//检查历史消息数据表，若存在未上传的数据，则上传至服务器
					self.selectHistoryMessageTable();
					//定时上传历史消息到服务器		废弃，改为5000条以上上传
					//					window.setInterval(self.selectHistoryMessageTable, 1000 * 10);
				}
			});
		},
		selectHistoryMessageTable: function(isLiving) {
			/**
			 * 获取历史消息数据表内容，用于上传服务器
			 * 作用页面：live/live_barrage_frame.html
			 * 
			 * @param {Boolean} isLiving	是否直播中，若为直播中，则满5000才上传
			 */
			var self = this;
			// Debug.toast(a.historyMessageTable)
			DB.selectSql({
				sql: 'select * from ' + a.historyMessageTable + ';',
				success: function(data) {
					//           console.log('data: ' + JSON.stringify(data, null, 2))
					//直播开始和直播结束时，有消息直接上传，直播中时，只有消息数大于等于5000条时候上传
					if((!isLiving && data instanceof Array && data.length > 0) || (isLiving && data instanceof Array && data.length >= 5000)) {
						ajax.get({
							ctrl: 'zhiboApp',
							fn: 'savemessage',
							data: {
								values: {
									id: a.uid,
									token: a.utoken,
									roomid: a.session.roomId,
									content: data
								}
							},
							hideLoading: true,
							showError: true,
							showProgress: false,
							success: function(ct) {

								Debug.toast('历史消息上传服务器成功');
								a.clearHistoryMessageTable();
							}
						});
					}
				}
			})
		},
		insertIntoTable: function(data) {
			/**
			 * 将消息插入历史消息数据表
			 * 调用时刻：主播发言 | 收到观众的消息
			 * 作用页面：live/live_barrage_frame.html
			 */
			DB.insert({
				table: this.historyMessageTable,
				data: data,
				success: function() {
					Debug.toast('数据插入成功');
					//检查历史消息是否超过5000条
					Anchor.selectHistoryMessageTable(true);
				}
			});
		},
		clearHistoryMessageTable: function() {
			/**
			 * 清空历史消息数据表
			 * 调用时刻：历史消息数据成功上传服务器
			 * 作用页面：live/live_barrage_frame.html
			 */
			var self = this;
			DB.executeSql({
				sql: 'delete from ' + self.historyMessageTable + ';',
				success: function() {
					// alert('okkk')
					Debug.toast('清空数据表成功');
				}
			});
		},
		getRoomNotice: function() {
			/**
			 * 获取直播间公告
			 * 作用页面：live/live_barrage_frame.html
			 */
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'notice',
				hideLoading: true,
				showError: true,
				showProgress: false,
				success: function(ct) {
					//过滤直播公告内容的html标签
					ct.notice = Tool.removeHTMLTag(ct.notice);
					//直播间发起公告
					QJ.Chat.sendNotify({
						notify: ct.notice
					});
					T.append('.live_msg', 'live_msg_notice', ct)
					$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
				}
			});
		},
		toggleMore: function() {
			/**
			 * 打开/关闭 '更多'菜单
			 * - 分享
			 * - 翻转
			 * - 闪光灯
			 * - 美颜
			 *
			 * 作用页面：live/live_barrage_frame.html
			 */
			if($api.dom('.more.active')) {
				$(".close-more").animate({
					opacity: 0,
					zIndex: 0
				}, 200);
				$(".more-list").animate({
					bottom: '0px',
					opacity: 0
				}, 200, function() {
					$api.removeCls($api.dom('.more.active'), 'active');
				});
			} else {
				$api.addCls($api.dom('.more'), 'active');
				$(".close-more").animate({
					opacity: 1,
					zIndex: 1
				}, 200);
				$(".more-list").animate({
					bottom: '60px',
					opacity: 1
				}, 200);
			}
		},
		share: function(e, shareurl, roomname) {
			/**
			 * 打开分享页面
			 * 作用页面：live/live_barrage_frame.html
			 */
			e.stopPropagation();
			api.openFrame({
				name: 'share',
				url: api.wgtRootDir + '/zhibo/html/component/share.html',
				bgColor: 'transparent',
				rect: {
					x: 0,
					y: 0,
					w: 'auto',
					h: api.frameHeight
				},
				pageParam: {
					shareurl: shareurl,
					roomname: roomname
				}
			});
			this.toggleMore();
			$api.addCls($api.dom('.tools'), 'hidden');
		},
		switchCamera: function(e) {
			/**
			 * 切换摄像头
			 * 作用页面：live/live_barrage_frame.html
			 */
			var flashDom = $api.dom('.flash-img');

			e.stopPropagation();
			if(this.cameraPosition == 'back') {
				/**闪光灯状态标识为已关闭
				 * SDK不支持打开前摄像头时，打开闪光灯
				 * 场景：若用户使用后摄像头且已打开闪光灯，此时，切换到前摄像头，SDK会自动关闭闪光灯
				 * 所以切换到前摄像头时，若闪光灯已打开，需更新UI状态
				 */
				this.flashStatus = false;
				//更新UI
				$api.removeCls(flashDom, 'on');
				this.cameraPosition = 'front';
			} else {
				this.cameraPosition = 'back';
			}
			api.sendEvent({
				name: 'switchCamera'
			});
			this.toggleMore();
		},
		flash: function(e, _this) {
			/**
			 * 打开闪光灯
			 * 作用页面：live/live_barrage_frame.html
			 */
			var flashDom = $api.dom(_this, '.flash-img');
			e.stopPropagation();
			//判断摄像头方向，若是前摄像头，不允许打开闪光灯
			if(this.cameraPosition == 'front') {
				$api.removeCls(flashDom, 'on');
				api.alert({
					title: '温馨提示',
					msg: '前摄像头不支持打开闪光灯'
				})
				return
			}

			$api.toggleCls(flashDom, 'on');

			this.flashStatus = $api.hasCls(flashDom, 'on');
			// QJ.Publisher.setTorchOn({
			//   on: $api.hasCls(flashDom,'on')
			// })

			api.sendEvent({
				name: 'setTorchOn',
				extra: {
					on: this.flashStatus
				}
			});
			this.toggleMore();
		},
		switchBeauty: function(e, _this) {
			/**
			 * 打开/关闭美颜效果
			 * 作用页面：live/live_barrage_frame.html
			 */
			e.stopPropagation();
			var beautyDom = $api.dom(_this, '.beauty-img');
			$api.toggleCls(beautyDom, 'on');
			api.sendEvent({
				name: 'setFilter',
				extra: {
					filter: $api.hasCls(beautyDom, 'on') ? 'smoothSkin' : 'normal'
				}
			});
			this.toggleMore();
		},
		isQuitLive: function() {
			/**
			 * 打开提示框：询问主播是否确定退出直播
			 * 作用页面：live/live_barrage_frame.html
			 */

			var self = this;

			var box = $('.quit_box');
			var body = $('body');
			var bodyHeight = body.height();
			var boxHeight = box.height();
			box.css("top", (bodyHeight - boxHeight) / 2 - 120 + 'px');
			box.css("z-index", '1');
			$(".quit-bg").animate({
				opacity: 1,
				zIndex: 1
			}, 200);
			box.animate({
				top: (bodyHeight - boxHeight) / 2 + 'px',
				opacity: 1
			}, 200);
		},
		closeQuit: function() {
			/**
			 * 打开提示框：询问主播是否确定退出直播
			 * 作用页面：live/live_barrage_frame.html
			 */

			var self = this;
			var box = $('.quit_box');
			var body = $('body');
			var bodyHeight = body.height();
			var boxHeight = box.height();
			box.css("z-index", '-1');
			$(".quit-bg").animate({
				opacity: 0,
				zIndex: 0
			}, 200);
			box.animate({
				top: (bodyHeight - boxHeight) / 2 - 120 + 'px',
				opacity: 0
			}, 200);
		},
		quitLive: function() {
			/**
			 * 主播确定退出直播间
			 * 作用页面：component/quit_liver.html
			 * api.pageParam来自 live/live_barrage_frame.html 的 Anchor.isQuitLive 方法
			 */

			var self = this;

			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'endlive',
				data: {
					values: {
						id: this.uid,
						token: this.utoken,
						roomid: this.session.roomId
					}
				},
				hideLoading: true,
				showError: true,
				showProgress: true,
				success: function(ct) {
				
					/**
					 * 通知页面
					 * - live/index.html
					 * - live/live_barrage_frame.html
					 */
					api.sendEvent({
						name: 'stopPublish'
					});
					//api.closeWin(); //阿里云加的关闭 
				}
			});
		},
		saveVedio: function() {
			/**
			 * 用户要求保留录制视频
			 * 作用页面：component/close_liver.html
			 * api.pageParam来自 component/quit_liver.html 的 页面参数(api.pageParam)
			 */

			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'keeplive',
				data: {
					values: {
						id: this.uid,
						token: this.utoken,
						roomid: api.pageParam.roomId
					}
				},
				hideLoading: true,
				showError: true,
				showProgress: true,
				success: function(ct) {
					Debug.toast('视频保存成功~');
					api.sendEvent({
						name: 'saveLive'
					});
					setTimeout('api.closeWin()', 500);
				}
			});
		},
		receiveMsgListener: function(isLiver) {
			/**
			 * @param     {boolean}     isLiver - 是否主播
			 * 监听聊天室的新消息
			 * 作用页面: live/live_barrage_frame.html
			 */

			var self = this;
			QJ.Chat.addEventListener({
				name: 'receiveMsg',
				receiveMsg: function(ret) {
				
				//机器人
				if(ret.extra == '' || !ret.extra){
					var extra = JSON.parse(ret.text);
					var ext = extra.extra;
					if(ext && typeof ext == 'string' && ext != '') {
						ext = JSON.parse(ext);
					}
				
					switch(extra.type) {
					case 1: //自定义类型：文字消息
						T.append('.live_msg', 'live_msg_text', {
							text: ext.text,
							extra: ext,
							roomid: self.session.roomId
						})
						$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
						if(ext.type == 1) {
							Chat.barrage(ext, ext.text);
						}
						if(isLiver) {
							self.insertIntoTable({
								memberid: ext.memberid,
								roomid: self.session.roomId,
								type: ext.type,
								content: ext.text,
								createdtime: ext.createdtime
							});
						}
						break;
					case 2: //自定义类型：礼物消息
						var liveCharm = $api.dom('.live_charm');
						$api.text(liveCharm, parseInt($api.text(liveCharm)) + parseInt(ext.charm));
						//插入礼物队列，等待展示
						//若队列里已存在该用户送的该礼物，则把number相加
						var flag = -1;
						for(var i = 0; i < Gift.giftArray.length; i++) {
							if(ext.memberid == Gift.giftArray[i].memberid && ext.giftid == Gift.giftArray[i].giftid) {
								flag = i;
								break;
							}
						}
						if(flag != -1) {
							Gift.giftArray[flag].number = parseInt(Gift.giftArray[flag].number) + parseInt(ext.number);
						} else {
							Gift.giftArray.push(ext);
							Gift.showGift();
						}
						break;
					
					}
				}
				
				//机器人结束
				
					var extra = ret.extra;
					
					if(extra && typeof extra == 'string' && extra != '') {
						extra = JSON.parse(extra);
					}
					switch(ret.type) {
						case 1:
							var ext = extra.extra;
							if(ext && typeof ext == 'string' && ext != '') {
								ext = JSON.parse(ext);
							}
							switch(extra.type) {
								case 1: //自定义类型：文字消息
									T.append('.live_msg', 'live_msg_text', {
										text: ret.text,
										extra: ext,
										roomid: self.session.roomId
									})
									$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
									if(ext.type == 1) {
										Chat.barrage(ext, ret.text);
									}
									if(isLiver) {
										self.insertIntoTable({
											memberid: ext.memberid,
											roomid: self.session.roomId,
											type: ext.type,
											content: ret.text,
											createdtime: ext.createdtime
										});
									}
									break;
								case 2: //自定义类型：礼物消息
									var liveCharm = $api.dom('.live_charm');
									$api.text(liveCharm, parseInt($api.text(liveCharm)) + parseInt(ext.charm));
									//插入礼物队列，等待展示
									//若队列里已存在该用户送的该礼物，则把number相加
									var flag = -1;
									for(var i = 0; i < Gift.giftArray.length; i++) {
										if(ext.memberid == Gift.giftArray[i].memberid && ext.giftid == Gift.giftArray[i].giftid) {
											flag = i;
											break;
										}
									}
									if(flag != -1) {
										Gift.giftArray[flag].number = parseInt(Gift.giftArray[flag].number) + parseInt(ext.number);
									} else {
										Gift.giftArray.push(ext);
										Gift.showGift();
									}
									break;
								case 4: //自定义类型：命令消息
									switch(ext.type) {
										case 1: //自定义子类型：观众进入房间
											if(!$api.dom('#fans' + ext.memberid)) {
												ext.roomid = self.session.roomId;
												T.append('.fans_list', 'live_fans', ext);
											}
											//设置房间人数
											self.setRoomMemberCount();
											break;
										case 2: //自定义子类型：观众退出房间
											if($api.dom('#fans' + ext.memberid)) {
												$api.remove($api.dom('#fans' + ext.memberid));
											}
											//设置房间人数
											self.setRoomMemberCount();
											break;
										case 3: //自定义子类型：观众被禁言
										case 4: //自定义子类型：观众禁言被解除
											//渲染禁言公告
											if(ext.targetId instanceof Array && ext.targetId.length > 0) {
												//如果目标id是数组，则为批量处理
												for(var i = 0; i < ext.targetId.length; i++) {
													T.append('.live_msg', 'live_msg_gag', {
														type: ext.type,
														memberid: ext.memberid,
														nickname: ext.nickname,
														targetId: ext.targetId[i],
														targetNickname: ext.targetNickname[i]
													});
													$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
													//判断 禁言目标id为自己的时候，修改自身禁言状态，并发送禁言事件到talk.html
													if(ext.targetId[i] == self.uid) {
														self.chatState = ext.type == 3 ? 1 : 0;
														api.sendEvent({
															name: 'updateChatState',
															extra: {
																chatState: self.chatState
															}
														})
													}
												}
											} else { //否则为单个处理
												//判断 禁言目标id为自己的时候，修改自身禁言状态，并发送禁言事件到talk.html
												T.append('.live_msg', 'live_msg_gag', ext);
												$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
												if(ext.targetId == self.uid) {
													self.chatState = ext.type == 3 ? 1 : 0;
													api.sendEvent({
														name: 'updateChatState',
														extra: {
															chatState: self.chatState
														}
													})
												}
											}
											break;
									}
									break;
								case 5: //自定义消息类型： 爱心消息
									hearts();
									break;
								default:
									break;
							}
							break;
						case 3:
						
						//手机端修复主播端
							//T.append('.live_msg', 'live_msg_notice', {
								//notice: ret.text
							//});
							//$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
							//break;
							var extra = ret;
					var ext = extra.text;
						
						if(ext && typeof ext == 'string' && ext != '') {
						ext = JSON.parse(ret.text);
					}
					
							T.append('.live_msg', 'live_msg_notice', {
								notice: ext.nickName+'送了1个'+ext.giftName
							});
							$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
							break;
						default:
							return;
					}
				}
			});
		},
//		showGift: function(type) {
//			/**
//			 * @param    {number}     type - type = 1时候，为本地送礼物
//			 * 主播收到礼物后，显示礼物样式
//			 * 作用页面: live/live_barrage_frame.html
//			 * 此函数包含两个闭包：rmGift | handler
//			 */
//
//			var giftDoms = $api.domAll('.gift_item'),
//				length = giftDoms.length,
//				self = this,
//				gift,
//				rmGift = function() {
//					/**
//					 * 闭包
//					 * 礼物渲染完毕后，删除展示样式
//					 */
//					var giftDoms = $api.domAll('.gift_item');
//
//					for(var i = 0; i < giftDoms.length; i++) {
//						if(giftDoms[i].id == 'gift' + gift.memberid + '_' + gift.giftid) {
//							self.giftArray.splice(i, 1);
//							break;
//						}
//					}
//
////					$api.remove($api.dom('#gift' + gift.memberid + '_' + gift.giftid));
//					rmGiftAnimation(gift,function(){
//						if(self.giftArray.length > $api.domAll('.gift_item').length) {
//							self.showGift();
//						}
//					});
//				};
//
//			if(length >= 3) {
//				//验证展示礼物条件，当前展示数量需大于3时，暂不做渲染
//				return;
//			}
//			gift = self.giftArray[length];
//
//			//在消息栏上方渲染礼物
////			T.append('.live_gift', 'live_gift', gift);
//			addGiftAnimation(gift);
//			//设置计时器：5秒后清除礼物样式
//			window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
//			self.renderGiftMsg(gift); //在消息栏展示礼物文字消息
//
//			if(gift.number > 1) {
//				if(type) {
//					//礼物发送者本地渲染逻辑
////					$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), gift.number);
//					plus('#gift' + gift.memberid + '_' + gift.giftid + ' .num',gift.number);
//					clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
//					window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
//				} else {
//
//					//触发模拟礼物数叠加
//					var interval = setInterval(handler, Math.floor(Math.random() * 500 + 300));
//
//					function handler() {
//						/**
//						 * 闭包
//						 * 模拟：礼物数量叠加
//						 */
//						var currNum = parseInt($api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num')));
//						if(currNum < gift.number) {
////							$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), currNum + 1);
//							plus('#gift' + gift.memberid + '_' + gift.giftid + ' .num');
//							self.renderGiftMsg(gift);
//							clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
//							window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
//						} else {
//							clearInterval(interval);
//						}
//					}
//
//				}
//			}
//		},
//		renderGiftMsg: function(extra) {
//			/**
//			 * 在消息栏展示礼物文字消息
//			 * @param    {Object}     extra - 礼物对象
//			 */
//			var self = this;
//			T.append('.live_msg', 'live_msg_gift', {
//				extra: extra,
//				roomid: self.session.roomId
//			});
//			$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
//		},
		/*
		 用户资料  方法
		 * */
		getAudience: function(memberid) {
			/**
			 * 获取用户基础信息，并打开资料卡
			 * @param {Number} 用户id
			 * */
			var self = this;
			self.audienceId = memberid;
			$(".audience-bg").animate({
				opacity: 1,
				zIndex: 1,
			}, 200);
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'audience',
				data: {
					values: {
						id: self.uid,
						token: self.utoken,
						roomid: self.session.roomId,
						memberid: self.audienceId
					}
				},
				hideLoading: true,
				showError: true,
				showProgress: false,
				success: function(ct) {
					ct.roomid = self.session.roomId;
					ct.memberid = self.audienceId;
					self.audienceIsGag = ct.gag;
					self.audienceIsManager = ct.manager;
					T.html('.audience-wrap', 'live_audience', ct);
					var box = $('.audience');
					var body = $('body');
					var bodyHeight = body.height();
					var boxHeight = box.height();
					box.css("top", (bodyHeight - boxHeight) / 2 - 120 + 'px');
					box.css("z-index", '1');
					box.animate({
						top: (bodyHeight - boxHeight) / 2 + 'px',
						opacity: 1
					}, 200);
				}
			});
		},
		closeAudience: function() {
			/**
			 * 关闭用户资料卡
			 */
			var box = $('.audience');
			var body = $('body');
			$(".audience-bg").animate({
				opacity: 0,
				zIndex: -1
			}, 200);
			if(box) {
				var boxHeight = box.height();
				var bodyHeight = body.height();
				box.animate({
					top: (bodyHeight - boxHeight) / 2 - 120 + 'px',
					opacity: 0
				}, 200);
				setTimeout(function() {
					box.remove();
				}, 220);
			}
		},
		concern: function(_this, mid) {
			/**
			 * 点击关注
			 * @param {Number} 用户id
			 */
			var status_text = $api.text(_this);
			if(status_text == '已关注') {
				this.unfollow(_this, mid);
			} else {
				this.follow(_this, mid);
			}
		},
		unfollow: function(_this, aid) {
			/**
			 * 取消关注
			 */
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'unfollow',
				data: {
					values: {
						id: $api.getStorage(CONFIG.memberId),
						token: $api.getStorage(CONFIG.token),
						aid: aid
					}
				},
				hideLoading: true,
				showError: true,
				showProgress: false,
				success: function(ct) {
					$api.text(_this, '关注');
					var fans_count = $api.dom('.fans_count');
					$api.text(fans_count, parseInt($api.text(fans_count)) - 1);
					api.sendEvent({
						name: 'follow'
					});
				}
			});
		},
		follow: function(_this, mid) {
			/**
			 * 关注
			 */
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'concern',
				data: {
					values: {
						id: $api.getStorage(CONFIG.memberId),
						token: $api.getStorage(CONFIG.token),
						memberid: mid
					}
				},
				showProgress: false,
				hideLoading: true,
				showError: true,
				success: function(ct) {
					$api.text(_this, '已关注');
					var fans_count = $api.dom('.fans_count');
					$api.text(fans_count, parseInt($api.text(fans_count)) + 1);
					api.sendEvent({
						name: 'follow'
					});
				}
			});
		},
		isblack: function(mid, nickname, avatar, username, tidings, concernstatus) {
			/**
			 * 判断 是否被主播拉黑
			 */
			var self = this;
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'isblack',
				data: {
					values: {
						id: self.uid,
						token: self.utoken,
						memberid: mid
					}
				},
				hideLoading: true,
				showError: false,
				showProgress: false,
				success: function(ct) {
					if(ct.state == 1){
						Tool.toast('您已拉黑该主播,不能进入与TA私聊~');
					}else{
						if(ct.status == 1) {
							Tool.toast('您已被对方拉黑,不能进入与TA私聊~');
						} else {
							self.openTalkWith(mid, nickname, avatar, username, tidings, concernstatus);
						}
					}
				}
			});
		},
		openTalkWith: function(mid, nickname, avatar, username, tidings, concernstatus) {
			/**
			 * 打开私聊
			 */
			var self = this;
			if(mid == self.uid) {
				Tool.toast('自己不能与自己聊天~');
			} else {
				if(tidings == '0' || tidings == '1' && concernstatus == '1') {
					api.openWin({
						name: 　 'talk_with',
						url: api.wgtRootDir + '/zhibo/html/window/talk_with.html',
						pageParam: {
							headerTitle: nickname,
							frameName: 'talk_with',
							frameUrl: api.wgtRootDir + '/zhibo/html/component/talk_with.html',
							frameParam: {
								username: username,
								memberid: mid,
								avatar: avatar,
								nickname: nickname
							}
						},
						slidBackEnabled: false
					});
				} else {
					Tool.toast('TA不接收陌生人私信~');
				}
			}
		},
		black: function(_this, mid) {
			/**
			 * 拉黑
			 */
			var self = this;
			var ctrl = '',
				fn = '',
				msg = '';
			var status_text = $api.text(_this);
			if(status_text == '已拉黑') {
				ctrl = 'zhiboApp';
				fn = 'removebalck';
				msg = '取消拉黑？';
			} else {
				ctrl = 'zhiboApp';
				fn = 'blacks';
				msg = '确定拉黑对方？';
			}
			api.confirm({
				title: '提示信息',
				msg: msg,
				bottons: ['取消', '确定']
			}, function(ret, err) {
				if(ret.buttonIndex == 2) {
					ajax.get({
						ctrl: ctrl,
						fn: fn,
						data: {
							values: {
								id: self.uid,
								token: self.utoken,
								memberid: mid,
								bid: mid
							}
						},
						showProgress: false,
						hideLoading: true,
						showError: true,
						success: function(ct) {
							if(fn == 'blacks') {
								Tool.toast('拉黑成功~');
								$api.text(_this, '已拉黑');
							} else {
								Tool.toast('取消拉黑成功~');
								$api.text(_this, '拉黑');
							}
						}
					});
				}
			})
		},
		manage: function(nickname) {
			var self = this;
			var buttons = [];
			if(self.audienceIsManager == 1) {
				buttons.push('解除管理');
			} else {
				buttons.push('设为管理');
			}
			buttons.push('管理员列表');
			buttons.push('禁言列表'); //管理员管理页面大斌
			buttons.push('踢出房间');
			// 未完成 buttons.push('踢人解除');
			Tool.actionSheet({
				buttons: buttons,
				destructiveTitle: self.audienceIsGag == 1 ? '解除禁言' : '禁言',
				success: function(index) {
			
					switch(index) {
						case 1:
							self.setGag(nickname);
							break;
						case 2:
							self.setManager();
							break;
						case 3:
							openWin('manager_list_win', 'manager_list', '管理员列表', 'live', 'manager_list', true, {
								roomid: self.session.roomId
							});
							break;
						case 4:
							openWin('manager_list_win', 'gag_list', '禁言列表', 'live', 'gag_list', true, {
								roomid: self.session.roomId
							});
							break;
							case 5: ///管理员单独T人 大斌
							
								RongCloud2.sendTextMessage({
						text: '踢人',
						targetId:api.pageParam.memberid,
						conversationType:'CHATROOM',
						extra: {
							type: 8,
							extra: {
								type: 2,
								memberid: self.audienceId,
								fangjianid: api.pageParam.memberid
							}
						}
					});
					Tool.toast('踢人成功~');
				
							
				
							break;
							/*
							case 6: ///解除踢人
							
								RongCloud2.sendTextMessage({
						text: '踢人',
						targetId:api.pageParam.memberid,
						conversationType:'CHATROOM',
						extra: {
							type: 9,
							extra: {
								type: 2,
								memberid: self.audienceId,
								fangjianid: api.pageParam.memberid
							}
						}
					});
					Tool.toast('解除踢人成功~');
				
							
				
							break;
							*/
						default:
							return;
					}
				}
			})
		},
		setGag: function(nickname) {
			/**
			 * 设置 /解除 禁言  总管理员禁言
			 */
			var self = this;
			var ctrl = 'zhiboApp',
				fn = '';
			var mid = [];
			if(self.audienceIsGag == 0) {
				fn = 'gag';
			} else {
				fn = 'notgag';
				mid.push(parseInt(self.audienceId));
			}
			ajax.get({
				ctrl: ctrl,
				fn: fn,
				data: {
					values: {
						id: self.uid,
						token: self.utoken,
						roomid: self.session.roomId,
						memberid: fn == 'notgag' ? mid : self.audienceId
					}
				},
				showProgress: true,
				hideLoading: true,
				showError: true,
				success: function(ct) {
					if(fn == 'gag') {
						Tool.toast('禁言成功~');
						self.audienceIsGag = 1;
					} else {
						Tool.toast('取消禁言成功~');
						self.audienceIsGag = 0;
					}
					/**
					 * 禁言时候发送事件通知 live/live_barrage_frame.html发送禁言命令
					 * self.audienceIsGag  1 禁言  ，0 解除禁言
					 */
					
					api.sendEvent({
						name: 'sendGagOrder',
						extra: {
							isGag: self.audienceIsGag,
							memberid: self.uid,
							nickname: $api.getStorage(CONFIG.memberInfo).nickname,
							targetId: self.audienceId,
							targetNickname: nickname
						}
					})
				}
			});
		},

		setManager: function() {
			/**
			 * 设置 /解除 管理员
			 */
			var self = this;
			var ctrl = 'zhiboApp',
				fn = '';
			if(self.audienceIsManager == 2) {
				fn = 'setmanager';
			} else {
				fn = 'delmanager';
			}
			ajax.get({
				ctrl: ctrl,
				fn: fn,
				data: {
					values: {
						id: self.uid,
						token: self.utoken,
						roomid: self.session.roomId,
						mid: self.audienceId
					}
				},
				showProgress: true,
				hideLoading: true,
				showError: true,
				success: function(ct) {
					if(fn == 'setmanager') {
						Tool.toast('设置管理员成功~');
						self.audienceIsManager = 1;
					} else {
						Tool.toast('解除管理员成功~');
						self.audienceIsManager = 2;
					}
				}
			});
		},
		configSecret: function() {
			var self = this;
			
			 api.ajax({
				url : window.DOMAIN + '/zhiboApp/roommsg',
				method : 'post',
				data : {
					values : {
						id : $api.getStorage(CONFIG.memberId),
								token : $api.getStorage(CONFIG.token),
								roomid : self.session.roomId,
								uid : $api.getStorage(CONFIG.memberId)
					}
				}
			}, function(ret, err) {
				
				
					
					if(ret.content.simi=='0'){ //如果是1就是取消密码的状态
					//开始
			api.confirm({
			    title: '设置是否为私密房间',
			    buttons: ['确认私密', '取消私密','取消操作']
			}, function(ret, err) {
			    var index = ret.buttonIndex;
			    if(index == 1){
			     
				
						
						api.prompt({
							title : '进入房间所需钻石数',
							text : 0,
							buttons : ['确定', '取消']
						}, function(ret, err) {
							var index = ret.buttonIndex;
							var secretDiamondTemp = ret.text;
							var secretPasswordTemp = '111111';
							if (index == 1) {
							
							if (secretPasswordTemp.length == 6 && /^\d+$/.test(parseInt(secretDiamondTemp))) {
							
								ajax.get({
						ctrl : 'zhiboApp',
						fn : 'updateSecret',
						hideLoading : true,
						showError : true,
						showProgress : true,
						data : {
							values : {
								id : $api.getStorage(CONFIG.memberId),
								token : $api.getStorage(CONFIG.token),
								roomid : self.session.roomId,
								secretDiamond : secretDiamondTemp,
								secretPassword : secretPasswordTemp	
							}
						},
						success : function(ct) {
						if(ct.state == 1){
						
						
						$api.text($api.dom('#simi'),'进入房间需' + secretDiamondTemp + '钻石');
							//Tool.alert("设置成功！");
							smtrenclick();
							Tool.toast('设置成功!');
						}else{
						    //alert("设置失败！")
						    Tool.toast('设置失败！');
						}
						
						
						}
						});
									
							
							}	
							
							//var reg = new RegExp("^\d+$");
							if(!/^\d+$/.test(parseInt(secretDiamondTemp)) || secretPasswordTemp.length != 6){  
						        api.alert({
										title : '钻石数或密码位数不正确!'
									}, function(ret, err) {
										 return;
									});
						    } 
							
							} else {
								return;
							}
						});
			    
			    }else if(index == 2){
			    	ajax.get({
						ctrl : 'zhiboApp',
						fn : 'cancelSecret',
						hideLoading : true,
						showError : true,
						showProgress : true,
						data : {
							values : {
								id : $api.getStorage(CONFIG.memberId),
								token : $api.getStorage(CONFIG.token),
								roomid : self.session.roomId
							}
						},
						success : function(ct) {
						if(ct.state == 1){
						$api.text($api.dom('#simi'),'当前为公开房间');
							
							 Tool.toast('已取消私密房间设置！');
						}else{
						   
						    Tool.toast('取消失败！');
						}
						
						
						}
						});
			    
			    	
			    }else{
			      return;
			    }
			});
			//结束
						
								}else{
								//开始
			api.confirm({
			    title: '设置是否为私密房间',
			    buttons: ['确认私密', '取消私密','取消操作']
			}, function(ret, err) {
			    var index = ret.buttonIndex;
			    if(index == 1){
			   
			
						api.prompt({
							title : '进入房间所需钻石数',
							text : 0,
							buttons : ['确定', '取消']
						}, function(ret, err) {
							var index = ret.buttonIndex;
							var secretDiamondTemp = ret.text;
							if (index == 1) {
							
							if (secretPasswordTemp.length == 6 && /^\d+$/.test(parseInt(secretDiamondTemp))) {
							
								ajax.get({
						ctrl : 'zhiboApp',
						fn : 'updateSecret',
						hideLoading : true,
						showError : true,
						showProgress : true,
						data : {
							values : {
								id : $api.getStorage(CONFIG.memberId),
								token : $api.getStorage(CONFIG.token),
								roomid : self.session.roomId,
								secretDiamond : secretDiamondTemp,
								secretPassword : secretPasswordTemp	
							}
						},
						success : function(ct) {
						if(ct.state == 1){
						$api.text($api.dom('#simi'),'房间 密码'+secretPasswordTemp+',进入房间需' + secretDiamondTemp + '钻石');
							//alert("设置成功！");
							Tool.toast('设置成功!');
							
						}else{
						   // alert("设置失败！")
						   
							 Tool.toast('设置失败！');
						}
						
						
						}
						});
									
							
							}	
							
							//var reg = new RegExp("^\d+$");
							if(!/^\d+$/.test(parseInt(secretDiamondTemp)) || secretPasswordTemp.length != 6){  
						        api.alert({
										title : '钻石数或密码位数不正确!'
									}, function(ret, err) {
										 return;
									});
						    } 
							
							} else {
								return;
							}
						});
							
							
						
			    
			    }else if(index == 2){
			    	ajax.get({
						ctrl : 'zhiboApp',
						fn : 'cancelSecret',
						hideLoading : true,
						showError : true,
						showProgress : true,
						data : {
							values : {
								id : $api.getStorage(CONFIG.memberId),
								token : $api.getStorage(CONFIG.token),
								roomid : self.session.roomId
							}
						},
						success : function(ct) {
						if(ct.state == 1){
						$api.text($api.dom('#simi'),'当前为公开房间');
							Tool.toast('已取消私密房间设置！');
							
						}else{
						   
							 Tool.toast('取消失败！');
						}
						
						
						}
						});
			    
			    	
			    }else{
			      return;
			    }
			});
			//结束	
								}
					
					
			});
			
			},
			
		configTime: function() {
		
			var self = this;
			api.confirm({
			    title: '设置是否为时间收费房间',
			    buttons: ['确认收费', '取消收费','取消操作']
			}, function(ret, err) {
			    var index = ret.buttonIndex;
			    if(index == 1){
			     api.prompt({
							title : '请输入收费整数金额(按分钟计)',
							buttons : ['确定', '取消']
						}, function(ret, err) {
							var index = ret.buttonIndex;
							var timePrice = ret.text;
						if (index == 1) {
						
						if(/^[1-9]*[1-9][0-9]*$/.test(parseInt(timePrice))){
						ajax.get({
						ctrl : 'zhiboApp',
						fn : 'updateTimePrice',
						hideLoading : true,
						showError : true,
						showProgress : true,
						data : {
							values : {
								id : $api.getStorage(CONFIG.memberId),
								token : $api.getStorage(CONFIG.token),
								roomid : self.session.roomId,
								timePrice : timePrice
							}
						},
						success : function(ct) {
						if(ct.state == 1){
						//时间收费改前台
						$api.text($api.dom('#shijian'),timePrice+'钻石每分钟');
							//alert("设置成功！");
							
							trenclick();
							Tool.toast('设置成功!');
							
						}else{
						    //alert("设置失败！")
						   
							 Tool.toast('设置失败！');
						}
						
						
						}
						});
						}
						
						if(!/^[1-9]*[1-9][0-9]*$/.test(parseInt(timePrice))){  
						        api.alert({
										title : '输入金额不正确!'
									}, function(ret, err) {
										 return;
									});
						    } 
						    
						}else {
								return;
						}
						}
						);
			    
			    }else if(index == 2){
			    	ajax.get({
						ctrl : 'zhiboApp',
						fn : 'cancelTime',
						hideLoading : true,
						showError : true,
						showProgress : true,
						data : {
							values : {
								id : $api.getStorage(CONFIG.memberId),
								token : $api.getStorage(CONFIG.token),
								roomid : self.session.roomId
							}
						},
						success : function(ct) {
						if(ct.state == 1){
						//时间收费改前台
						$api.text($api.dom('#shijian'),'当前为免费房间');
							Tool.toast('已取消私密房间设置！');
							
						}else{
						
						   
							 Tool.toast('取消失败！');
						}
						
						
						}
						});
			    
			    	
			    }else{
			      return;
			    }
			    }
			    );
			    }
	};

	window.Anchor = a;
}(window);