/*
 * 直播-观众模块
 */

! function(window) {
	var au = {
		session: {
			roomId: '',
			password: '',
			nickname: ''
		},
		barragePrice: 1, //弹幕价格，用于打开聊天输入框(Frame)时，传参
		chatState: 0, //禁言状态码，用于打开聊天输入框(Frame)时，传参; 0-正常 1-禁言
		giftArray: [], //礼物数组，监听聊天室的礼物消息，并将其显示到屏幕
		uid: $api.getStorage(CONFIG.memberId), //用户id
		utoken: $api.getStorage(CONFIG.token), //用户token
		umemberid: '', //主播id
		memberInfo: $api.getStorage(CONFIG.memberInfo), //用户的个人信息
		audienceId: 0, //当前用户资料卡用户id
		audienceIsGag: 0, //当前资料卡用户禁言状态
		audienceIsManager: 2, //当前资料卡用户管理员状态
		roomName: '', //分享观看直播房间名称
		shareUrl: '', //分享观看直播房间url
		timer: '', //时间
		giftList: '',//礼物列表
		giftInfo: {
			giftid: 0,
			number: 0,
			img: '',
			smallimg: '',//静态礼物
			name: '',
			price: '',
			memberid: $api.getStorage(CONFIG.memberId),
			avatar: $api.getStorage(CONFIG.memberInfo)&&$api.getStorage(CONFIG.memberInfo).avatar,
			nickname: $api.getStorage(CONFIG.memberInfo)&&$api.getStorage(CONFIG.memberInfo).nickname,
			level: $api.getStorage(CONFIG.memberInfo)&&$api.getStorage(CONFIG.memberInfo).level
		}, //礼物参数
		liansongTimeout: true,//连送礼物间隔
		openLive: function(roomid, memberid, pwd, avatar,secretState,iosreview,videoURL) {
		//alert(memberid);//return;
		//var videoURL='rtmp://47.93.198.248/live22/'+memberid; //阿里云播放地址 录像部分去掉
			function goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL) {
			
			var memberinfo = $api.getStorage(CONFIG.memberInfo);
			//超级管理员部分开始
			if(memberinfo.admin==1){
				
							$api.setStorage('smcharm', 0); //私密写入钻石数，不加
							$api.setStorage('sjcharm', 0); //私密写入钻石数，不加
								
								goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL);
								return;
							
							}
							//超级管理员结束开始
			
		/*
		if($api.getStorage('T'+memberid+$api.getStorage(CONFIG.memberId))=='1'){ //判断是否T出房间了
		
		Tool.toast('您暂时不能进入该房间~');
		return false;
		}
		*/
		
				api.openWin({
					name : 'look_live',
					url : api.wgtRootDir + '/zhibo/html/find/look_live2.html',
					bgColor : 'rgba(0,0,0,0.1)', //'transparent',
					bounces : false,
					reload :true ,
					pageParam : {
						roomid : roomid,
						memberid : memberid, //主播用户id
						pwd : pwd,
						avatar : avatar,
						iosreview : iosreview, //是否为录像
						videoURL : videoURL
					},
					animation : {
						type : "push",
						subType : "from_right",
						duration : 300
					},
					rect : {
						x : 0,
						y : 0,
						w : api.winWidth,
						h : api.winHeight
					},
					delay : api.systemType == 'ios' ? 0 : 300,
					slidBackEnabled : false
				});
		
			};
			
			
			//查询私密跟房间
			ajax.get({
					ctrl : 'zhiboApp',
					fn : 'chaxun',
					hideLoading : true,
					showError : true,
					showProgress : false,
					data : {
						values : {
							id : memberid, //用主播的ID$api.getStorage(CONFIG.memberId),
							token : $api.getStorage(CONFIG.token),
							roomid : roomid,
							uid : $api.getStorage(CONFIG.memberId)
						}
					},
					success : function(ct) {
					 var secretPassword = parseInt(ct.secretPassword)||0;  //密码
					 var secretDiamond = parseInt(ct.secretDiamond)||0; //私密所需钻石
					 var timePrice = ct.timePrice||0; //时间收费所需钻石
					 //var userDiamond = ct.diamonds||0; 缓存大斌修改
					 var userDiamond = parseInt($api.getStorage(CONFIG.memberInfo).diamonds)||0; //自己的余额
					if(ct.shikan>0){ //试看
					
					if(secretPassword>0||secretDiamond>0||timePrice>0){
				
						var myTimer = api.require('myTimer');
myTimer.startTimer({
    step:ct.shikan/1000,
    isLoop:false
},function(ret) {

    if(ret.status){
  api.toast({
									msg : '试看时间结束'
								});
		//alert(api.pageParam.memberid);
		//RongCloud2.quitChatRoom({chatRoomId: api.pageParam.memberid||0}); //关闭后退出聊天室,否额积累下来会卡，大斌
	
			api.sendEvent({
				name : 'closeLive'
			});
			
				api.closeFrameGroup({
					name : 'liveGroup'
				});
				api.closeToWin({
	                name: 'Init'
                });
   
    }
});
				//setTimeout("tuichu()",ct.shikan);
			}
				goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL);
				return false;
				
				
				}
					//return;
					if (timePrice != '0'&&timePrice>'0') {
					//时间收费开始
				
						api.confirm({
								title : '该房间每分钟需付费' + timePrice + '钻石',
								buttons : ['确定', '取消']
							}, function(ret, err) {
								var index = ret.buttonIndex;
								if (index == 1) {
								
									
							
								
									if (userDiamond < timePrice) {
		
													api.alert({
														title : '您有' + userDiamond + '钻石，钻石数不足!',
														msg : '进入房间需' + timePrice + '钻石',
													}, function(ret, err) {
														return;
													});
		
												} else{
												
								$api.setStorage('sjcharm', ct.sjcharm||0); //时间写入魅力
								
									
									goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL);
									}
								} else {
									return;
								}
							});
					
					//时间收费结束
					//return;
					}else if(secretDiamond!='0'&&secretDiamond>'0'){	
					//私密房间开始
					if (userDiamond < secretDiamond) {
		
													api.alert({
														title : '您有' + userDiamond + '钻石，钻石数不足!',
														msg : '进入房间需' + secretDiamond + '钻石',
													}, function(ret, err) {
														return;
													});
		
												}else if(secretDiamond!='0'&&secretDiamond>'0'){
												
												
												
																								api.confirm({ 
														title : '进入房间需' + secretDiamond + '钻石',
														buttons : ['确定', '取消']
													}, function(ret, err) {
														var index = ret.buttonIndex;
														
														if (index == 1) {
															ajax.get({
																ctrl : 'zhiboApp',
																fn : 'addsecret',
																hideLoading : true,
																showError : true,
																showProgress : true,
																data : {
																	values : {
																		id : $api.getStorage(CONFIG.memberId),
																		token : $api.getStorage(CONFIG.token),
																		roomid : roomid,
																		memberid : memberid
																	}
																},
																success : function(ct1) {
																
																	if (ct1.state == 1) {
		if(ct1.stat==1){														
		$api.setStorage('smcharm', ct1.charm||0); //私密写入魅力
			}else{
			$api.setStorage('smcharm', 0); //私密写入魅力
			}				
								
							goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL);
																		
																	}else{
																	return;
																	}
																}
															});
		
														} else {
															return;
														}
		
													});//私密房间扣钻石结束部分
											return;
												}else{
											$api.setStorage('smcharm', '0'); //私密写入魅力
							$api.setStorage('sjcharm', '0'); //私密写入魅力
								
							goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL);
																		
												
												}
					
					//私密房间结束
					//return;
					}else{ //这里是直接进入房间
					$api.setStorage('smcharm', '0'); //私密写入魅力
							$api.setStorage('sjcharm', '0'); //私密写入魅力
					goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL);
					}
					
					}
					
					})
			//goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL); //大斌直接进入房间测试
			//return;
			
			//goRoom(roomid, memberid, pwd, avatar, iosreview, videoURL);
			/**
			 * 打开观看直播界面
			 * 作用页面：find/hot.html
			 * @param {String}      roomid - 房间id
			 * @param {String}      memberid - 主播用户id
			 * @param {String}      pwd - 直播室观看密码
			 * @param {String}      avatar - 主播头像，作为过渡图片
			 */
			//私密房间进入流程
			
		
		},
		init: function(args) {
			/**
			 * 观看直播初始化
			 * 作用页面: find/look_live.html
			 * api.pageParam 来自 find/hot.html 的 openLive 方法
			 */

			var self = this;

			//设置背景图，等待视频缓冲
//			$api.css($api.dom('.img'), 'background-image:url(' + api.pageParam.avatar + ')');

			//打开直播画面窗口
			

			this.session.roomId = api.pageParam.roomid;
			this.session.password = api.pageParam.pwd;
			this.session.nickname = this.memberInfo.nickname;
			this.umemberid = api.pageParam.memberid;
			//苹果审核 是否为录像
			self.session.iosreview = api.pageParam.iosreview;
			self.session.videoURL = api.pageParam.videoURL;
			
			//QJ.Core.registerApp();
			//QJ.Core.setDebugLogEnabled({
				//enabled: true
			//});
			
			//监听: 观众退出直播间事件
			this.addCloseLiveEventListener();

			//获取观众手机ip
			api.require('ipAddress').getIp(function(ret, err) {
				// Debug.alt(JSON.stringify(ret, null, 2))
				ajax.get({
					ctrl: 'zhiboApp',
					fn: 'startlook',
					data: {
						values: {
							ip: ret.ip || '',
							id: self.uid,
							token: self.utoken,
							roomid: self.session.roomId
						}
					},
					hideLoading: true,
					showError: true,
					showProgress: true,
					success: function(ct) {
						//设置禁止休眠
						api.setKeepScreenOn({
							keepOn: true
						});
						//验证房间信息
//						QJ.Core.authRoomSession({
//							roomId: self.session.roomId,
//							password: self.session.password,
//							nickname: self.session.nickname,
//							success: function() {
								//查询直播间详情, 获取在线看直播的人数，直播状态
//								QJ.Core.getLiveContext({
//									roomId: self.session.roomId,
//									password: self.session.password,
//									nickname: self.session.nickname,
//									success: function(ret) {
//										console.log(JSON.stringify(ret, null, 2))
											//缓存当前在线观看人数
										$api.setStorage('playCount', ret.playUserCount);
										//判断直播是否已结束
										if(ret.recordingStatus == 0) {
											//直播结束 打开 直播已结束页面
											//添加苹果审核
											
											if(self.session.iosreview == 1){
											
											//初始化播放器
											
											QJ.Player.init(self.session);
											//预先 打开交互层页面	
											self.openLiveFrame(); 
									
											//在画面没出来之前，隐藏Frame
											api.setFrameAttr({
												name: 'live_camera',
												hidden: true
											});
											
											api.bringFrameToFront({
										    from: 'barrage'
											});
											//开始接收视频推送流
											QJ.Player.play({
												playView: 'live_camera', //视频显示的窗口名称, 窗口必须为frame类型
												quality: 'high' //视频的清晰度
											});
											/**
											 * 设置视频的显示模式
											 * 保持比例撑满，视频会按照比例放大直到撑满屏幕为止
											 */
											QJ.Player.setDisplayMode({
												mode: 'corp'
											});

											//监听: 成功获取直播画面事件
											QJ.Player.addEventListener({
												name: 'connected',
												connected: function() {
												alert('connected');
													//先显示直播画面Frame
													api.setFrameAttr({
														name: 'live_camera',
														hidden: false
													});

													//仿黑屏措施: 500ms后关闭等待遮罩层
													setTimeout(function() {
														api.closeFrame({
															name: 'live_camera_1'
														});
													}, 500)
												}
											});

											//监听: 主播已经结束直播
											self.addLiveStopEventListener();
											
											
											}else{
											//直播结束 打开 直播已结束页面
											
											api.openFrame({
												name: 'close_live',
												url: api.wgtRootDir + '/html/component/close_live.html',
												bgColor: 'transparent',
												rect: {
													x: 0,
													y: 0,
													w: 'auto',
													h: api.frameHeight
												},
												pageParam: {
													mid: self.umemberid,// 主播id
													roomid: self.session.roomId	//房间 id									
												}
											});
											
											/**
											 * 发送事件: init_hot
											 * 接收页面: find/hot.html & find/nearby.html
											 * 作用: 刷新列表
											 */
											api.sendEvent({
												name: 'init_hot'
											});
											
											}
										} else {
											//初始化播放器
											//alert(JSON.stringify(self.session.review));//self.session.review
											//QJ.Core.registerApp();
											QJ.Player.init(self.session);
											//预先 打开交互层页面	
											self.openLiveFrame(); 
											//在画面没出来之前，隐藏Frame
											api.setFrameAttr({
												name: 'live_camera',
												hidden: true
											});
											api.bringFrameToFront({
										    from: 'barrage'
											});
											if(self.session.iosreview==2){ //录像用播放器播放
											
											
											var videoPlayer = api.require('videoPlayer');
											var func = function (ret) {
            //return Math.random()*ret+1;
            
            var ltime=Math.random()*ret+1||0;
        //  alert(ltime);
           if(ltime>0){
            videoPlayer.seekTo({
    seconds: ltime
});
videoPlayer.start();
 api.setFrameAttr({
														name: 'live_camera',
														hidden: false
													});
  

}

            func= function(ret){};
        }
											if(api.systemType == 'ios'){
											videoPlayer.open({
    path: api.pageParam.videoURL,
    scalingMode:'scaleToFill',
    fixedOn:'live_camera_1',
    rect: {
        x: 0,
        y: 0,
        w: api.winWidth,
        h: api.winHeight
    },
}, function(ret, err) {
//alert('aa'+JSON.stringify(ret));
  if (ret.status) {

func(ret.duration);



        //alert(JSON.stringify(ret));
    } else {
        //alert(JSON.stringify(err));
    }
    
});
											}else{
										//安卓开始
										videoPlayer.open({
    path: api.pageParam.videoURL,
    scalingMode:'scaleToFill',
    fixedOn:'live_camera_1',
    autoPlay:false,
    rect: {
        x: 0,
        y: 0,
        w: api.winWidth,
        h: api.winHeight
    },
}, function(ret, err) {

//alert('aa'+JSON.stringify(ret));
 
//videoPlayer.setPath({
    path: api.pageParam.videoURL,

//}, function(ret1, err) {
 //alert('bb'+JSON.stringify(ret1.duration/1000));
 func(1800);
//});
//alert(JSON.stringify(ret));

 
 //videoPlayer.stop();





        //alert(JSON.stringify(ret));
     
    
});
										//安卓结束	
											
											
											}									



										
}else{
											
											QJ.Player.play({  //这个是传输的地方
												playView: 'live_camera', //视频显示的窗口名称, 窗口必须为frame类型
												quality: 'high', //视频的清晰度
												
											});
											}
											/**
											 * 设置视频的显示模式
											 * 保持比例撑满，视频会按照比例放大直到撑满屏幕为止
											 */
											QJ.Player.setDisplayMode({
												mode: 'aspectFill'
											});

											//监听: 成功获取直播画面事件
											QJ.Player.addEventListener({
												name: 'connected',
												connected: function() {
													//先显示直播画面Frame
													api.setFrameAttr({
														name: 'live_camera',
														hidden: false
													});

													//仿黑屏措施: 500ms后关闭等待遮罩层
													setTimeout(function() {
														api.closeFrame({
															name: 'live_camera_1'
														});
													}, 500)
												}
											});

											//监听: 主播已经结束直播
											self.addLiveStopEventListener();
										}
									},
									error: function(err) {
										api.toast({
											location: 'middle',
											msg: err.code + ': ' + err.description,
											duration: 500
										});
										setTimeout(function() {
											api.closeWin();
										}, 500);
//									}
//								});
//							}
//						});
					}
				});
			});
			//this.smallinit();
		},
		addCloseLiveEventListener: function() {
			/**
			 * 监听: 观众退出直播间事件
			 */

			var self = this;

			api.addEventListener({
				name: 'closeLive'
			}, function() {
				//销毁房间信息
				//QJ.Core.de3stroyRoomSession(self.session);
				QJ.Player.stop();
				//设置休眠
				api.setKeepScreenOn({
					keepOn: false
				});
				api.closeFrame({
					name: 'live_gift'
				});
				api.closeFrame({
					name: 'share'
				});
				api.closeFrame({
					name: 'talk'
				});
				setTimeout(function() {
					api.closeWin();
				}, 500)
			});
		},
		openLiveFrame: function() {
			/**
			 * 打开交互层页面
			 * 作用页面: find/look_live.html
			 * api.pageParam 来自 find/hot.html 的 openLive 方法
			 */
			//alert(api.pageParam.memberid);
			var self = this; //大斌观众端打开直播
			api.openFrame({
				name: 'barrage',
				url: api.wgtRootDir + '/zhibo/html/find/live_frame.html',
				bgColor: 'transparent',
				reload : true,
				pageParam: {
					roomid: api.pageParam.roomid,
					memberid: api.pageParam.memberid, //主播用户id
					pwd: api.pageParam.pwd
				}
			});
		},
		addLiveStopEventListener: function() {
			/**
			 * 监听：主播已经结束直播
			 * 作用页面: find/look_live.html
			 */
			var self = this;
			QJ.Player.addEventListener({
				name: 'liveStop',
				liveStop: function(ret) {
					api.openFrame({
						name: 'close_live',
						url: api.wgtRootDir + '/zhibo/html/component/close_live.html',
						bgColor: 'transparent',
						rect: {
							x: 0,
							y: 0,
							w: 'auto',
							h: api.frameHeight
						},
						pageParam: {
							mid: self.umemberid, // 主播id
							roomid: self.session.roomId //房间id 
						}
					});
				}
			});
		},
		quitLive: function() {
			/**
			 * 退出直播间
			 * ajax 请求记录结束观看直播
			 * @param {String} id      用户 id
			 * @param {String} token   用户 token
			 * @param {String} roomid  房间 roomid
			 * @param {String} ip			 ip地址
			 */
			var self = this,
				extra = {
					type: 4,
					extra: {
						type: 2,
						memberid: this.uid,
					}
				};
			//api.require('ipAddress').getIp(function(ret, err) {  大斌去掉获取IP
				ajax.get({
					ctrl: 'zhiboApp',
					fn: 'endlook',
					data: {
						values: {
							id: self.uid,
							token: self.utoken,
							roomid: self.session.roomId,
							ip: '1'
						}
					},
					hideLoading: true,
					showError: true,
					showProgress: false,
					success: function(ct) {
					
					//console.log('g1g'+JSON.stringify(self.umemberid));
				
						//记录成功后 发送 退出直播间消息
						///alert(222);
						RongCloud2.sendTextMessage({
							text: '退出直播',
							extra: extra,
							targetId:api.pageParam.memberid,
							conversationType:'CHATROOM',
						});
						//退出聊天室 不再接收聊天信息
						//QJ.Chat.logout();
						RongCloud2.quitChatRoom({chatRoomId: self.umemberid});
						/**
						 * 发送事件: closeLive
						 * 接收页面: find/live_frame.html
						 * 作用: 关闭直播房间操作
						 */
						api.sendEvent({
							name: 'closeLive'
						});
						api.sendEvent({  //用户端退出后触发融云
    					name: 'zhubo'
						});
						var alivcLivePlayer = api.require('alivcLivePlayer');
alivcLivePlayer.destroy();
						setTimeout(function() {
							api.closeFrame();
						}, 500);
					}
				});
			//}); 大斌去掉获取IP
    },
    chatInit: function(){
    	/**
    	 * 观众端 初始化
    	 * 页面： html/find/live_frame.html 的第一个执行方法
    	 * api.pageParam 来自 find/hot.html 的 openLive 方法
     	*/
     	var self = this;
     	if(api.pageParam){
     		this.session.roomId = api.pageParam.roomid;
     		this.session.password = api.pageParam.pwd;
     		this.session.nickname = this.memberInfo.nickname;
     		this.umemberid = api.pageParam.memberid;//主播id
     		Gift.setParams({
     			umemberid:api.pageParam.memberid
     		});//主播id
     	}
     	
     	//alert(api.pageParam.memberid);
     	getRongToken(function(ret1) {
     	
					RongCloud2.init(function() {
						RongCloud2.setConnectionStatusListener();
						RongCloud2.setOnReceiveMessageListener(function(ret) { 
							setOnReceiveMessageListener(ret);
						});
						
						RongCloud2.connect({
							token : ret1.token
						}, function(success,error) {
						if(success){
						///alert(JSON.stringify(success));
							RongCloud2.joinChatRoom({chatRoomId: self.umemberid,defMessageCount: -1}, function(ret) {
									if ('success'== ret.status  )
										//alert("加入聊天室成功");
										   	var extra = {
												type: 4,
												extra: {
													type: 1,
													memberid: self.uid, //观众id
													nickname: self.memberInfo.nickname,
													avatar: self.memberInfo.avatar
												}
											};
											RongCloud2.sendTextMessage({
												text: '观看直播',
												extra: extra,
												targetId:api.pageParam.memberid,
												conversationType:'CHATROOM',
											});
											self.getRoomMessage();
											var smcharm=$api.getStorage('smcharm')||0;	
			if(smcharm!='0'&&smcharm>'0'){
											//私密房间 主播端加钱
											var extra11 = {
						type : 10,
						extra : {
							
							roomid : api.pageParam.roomid, //房间号
							
							charm : smcharm|| 0,
							memberid : api.pageParam.memberid
							
						}
					}
					RongCloud2.sendTextMessage({
						text : '礼物',
						extra : extra11,
						targetId : api.pageParam.memberid,
						conversationType : 'CHATROOM',
						success : function() {
						}
					})
					$api.setStorage('smcharm', 0); //私密写入魅力
							
					//11111111111111111111111111111
					}
					//时间收费主播端加钱
					
					var sjcharm=$api.getStorage('sjcharm')||0;	
			if(sjcharm!='0'&&sjcharm>'0'){
											//私密房间 主播端加钱
											var extra22 = {
						type : 10,
						extra : {
							
							roomid : api.pageParam.roomid, //房间号
							
							charm : sjcharm|| 0,
							memberid : api.pageParam.memberid
							
						}
					}
					RongCloud2.sendTextMessage({
						text : '礼物',
						extra : extra22,
						targetId : api.pageParam.memberid,
						conversationType : 'CHATROOM',
						success : function() {
						}
					})
					$api.setStorage('sjcharm', 0); //私密写入魅力
					}
					
										
										
						})
						
						}else{
							api.alert({
							title : '请重新登录房间!'
						}, function(ret, err) {
							api.closeWin({
								
							});
							return;
						});
						}
						});
					});
				
			});
			
			
			//alert(111);
     	
		
     	//初始化 聊天室
     	//alert(2222);
//   	QJ.Chat.init(this.session);
//   	//登录 聊天室
//   	var extra = {
//				type: 4,
//				extra: {
//					type: 1,
//					memberid: this.uid, //观众id
//					nickname: this.memberInfo.nickname,
//					avatar: this.memberInfo.avatar
//				}
//			};
//			self.receiveMsgListener();
//			QJ.Chat.login({
//				success: function(ret) {
//					Debug.toast('登录聊天服务器成功~');
//					QJ.Chat.sendText({
//						text: '观看直播',
//						extra: extra
//					});
//					//获取 直播间 房间信息
//					self.getRoomMessage();
//				},
//				autoRelogin: true,
//				beforeRelogin: function() {
//					api.toast({
//						location: 'top',
//						msg: '登录聊天服务器失败，正在尝试重连~'
//					});
//				}
//			});
		},
		getRoomMessage: function() {
			/**
			 * 观众端  登录聊天室成功后  获取直播房间信息
			 *  作用页面： html/find/live_frame.html
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
						memberid: this.umemberid //主播 id
					}
				},
				hideLoading: true,
				showError: true,
				showProgress: false,
				success: function(ct) {
				
				//$api.setStorage('teding', ct.teding||0); //用户端特定礼物写入特定礼物需要更新
					//更新弹幕价格 和用户 禁言状态
					Chat.setParams({
						barragePrice: ct.chatprice,
						chatState: ct.chatstate,
						session: self.session,
						sendLevel:ct.sendLevel
					});
					//更新Gift.js session状态
					Gift.setParams({
						session: self.session
					});
					// 更新 memberInfo 缓存数据
					var memberinfo = $api.getStorage(CONFIG.memberInfo);
					//memberinfo.diamonds = ct.diamonds; //钻石显示不对，大斌先去掉，这里变0了
					//$api.setStorage(CONFIG.memberInfo, memberinfo); //钻石显示不对，大斌先去掉，这里变0了

					ct.memberid = self.umemberid;
					ct.roomid = self.session.roomId;
					//过滤直播公告内容的html标签
					ct.notice = Tool.removeHTMLTag(ct.notice);
					T.html('#wrap', 'main', ct, true);
					//激活左右 滑动交互层
					self.closeSwipe();
					//激活向上滑动
					//取消向上滑动 self.showNextPage();
					//将 图片 用淡入方式显示出来
					$('div.img').lazyload({
						effect: "fadeIn"
					});
					//如果有粉丝列表  阻止冒泡
					if($api.dom('#fans_list')) {
						touch.on($api.dom('#fans_list'), 'swipestart swiping swipeleft swipe drag dragstart touchstart touchmove', function(event) {
							event.stopPropagation();
						});
						touch.on($api.dom('#fans_list'), 'swipeend dragend touchend', function(event) {
							event.stopPropagation();
						});
					}
					//获取 在线观看直播的人数
					Chat.sendText("来了，欢迎~~", 0);
					//RongCloud2.sendTextMessage("来了，欢迎~~", 0);
					self.setRoomMemberCount();
					var swiper2 = new Swiper('.swiper-container2', {
						direction: 'vertical',
						pagination: '.swiper-p2', 
						slidesPerView : 4,
						slidesPerGroup : 1,
					});
			
				}
			});
		},
		addSetAudienceEventListener: function() {
			/*
			 * 监听 点击 打开 聊天输入框
			 * 监听接收页面： find/live_frame.html
			 */
			api.addEventListener({
				name: 'setTalkbg'
			}, function() {
				if($api.hasCls($api.dom('.tools'), 'hidden')) {
					$('.talk_bg').animate({
						opacity: 1,
						zIndex: 1,
					});
				}
			})
		},
		closeTalk: function(){
			/*
			 * 隐藏 聊天背景
			 */
			
			$('.talk_bg').animate({
				opacity: 0,
				zIndex: -1,
			});
			//关闭 聊天 输入框
			$api.dom('#talk').blur();
			Chat.closeChatInput();
		},
		setRoomMemberCount: function() {
			/**
			 * 获取 在线观看直播的人数
			 */
			$api.text($api.dom('.online_count'), $api.domAll('.fans').length);
		},
		closeSwipe: function() {
			/*
			 * 交互层 切换
			 * */
			window.mySwipe = new Swipe(document.getElementById('slider'), {
				startSlide: 1,
				auto: 0,
				speed: 400,
				continuous: false,
				disableScroll: false,
				stopPropagation: false,
				callback: function(index, elem) {
					try {} catch(e) {}
				},
				transitionEnd: function(index, elem) {}
			});
		},
				
		showNextPage: function() {
			//20170216 上拉切换主播
			//alert(this.session.roomId);
			//var myroomsid=this.session.roomId;
			var self=this;
			var extra = {
					type: 4,
					extra: {
						type: 2,
						memberid: $api.getStorage(CONFIG.memberId),
					}
				};
			touch.on('#slider', 'swipeup swipedown', function(ev) {
				//alert(ev.distanceX);
				//alert(api.pageParam.roomid);
				ajax.get({
					ctrl : 'zhiboApp',
					fn : 'getNextPage',
					data : {
						values : {
							id : $api.getStorage(CONFIG.memberId),
							token : $api.getStorage(CONFIG.token),
							roomid:api.pageParam.roomid,
							type:ev.type
						}
					},
					hideLoading : true,
					showError : true,
					showProgress : true,
					success : function(ct1) {
					//alert(self.session);
						//QJ.Core.destroyRoomSession(self.session);
						QJ.Player.stop();
						api.closeToWin({
						    name: 'look_live'
						});
//						//设置休眠
//						api.setKeepScreenOn({
//							keepOn: false
//						});
						api.closeFrame({
							name: 'live_gift'
						});
						api.closeFrame({
							name: 'share'
						});
						api.closeFrame({
							name: 'talk'
						});
					
						RongCloud2.sendTextMessage({
							text: '退出直播',
							extra: extra,
							targetId:api.pageParam.memberid,
							conversationType:'CHATROOM',
						});
						//退出聊天室 不再接收聊天信息
						//QJ.Chat.logout();
						RongCloud2.quitChatRoom({chatRoomId: self.umemberid});
						//记录成功后 发送 退出直播间消息
//						QJ.Chat.sendText({
//							text: '退出直播',
//							extra: extra
//						});
//						//退出聊天室 不再接收聊天信息
//						QJ.Chat.logout();
						/**
						 * 发送事件: closeLive
						 * 接收页面: find/live_frame.html
						 * 作用: 关闭直播房间操作
						 */
//						api.sendEvent({
//							name: 'closeLive'
//						});
						//setTimeout(function() {
							//api.closeWin();
							//console.log(JSON.stringify(ct1));
							//alert(ct1.roomlist[0].id);
							api.pageParam.roomid=ct1.roomlist[0].id;
							api.pageParam.memberid=ct1.roomlist[0].memberid;
							
							//直播房间 初始化
			//self.chatInit();
//			//将底部工具栏显示
//			self.addShowToolsEventListener();
//			//监听 安卓点击返回键 退出直播房间
//			self.addkeyBackEventListener();
//			//监听 本地发送礼物
//			self.addsendGiftOfLacalEventListener();
//			//监听 处理发送礼物
//			self.addpushGiftToServerEventListener();
//			//监听 在查看主播详情 关注主播
//			self.addfollowEventListener();
//			//监听 充值成功 
//			self.addDiamondsEventListener();
//			//监听 是否打开聊天框
//			self.addSetAudienceEventListener();
							//alert(api.pageParam.roomid);
							//self.init();
							self.openLive(ct1.roomlist[0].id,ct1.roomlist[0].memberid,"222222",Tool.imageCompressByQiNiu(ct1.roomlist[0].avatar,0,200,200),ct1.roomlist[0].secretState,ct1.roomlist[0].iosreview,ct1.roomlist[0].videoURL);
							
						//}, 500)
						
						
//								api.openWin({
//							name : 'look_live',
//							url : api.wgtRootDir + '/zhibo/html/find/look_live2.html',
//							bgColor : 'rgba(0,0,0,0.1)', //'transparent',
//							bounces : false,
//							pageParam : {
//								roomid : ct1.roomlist[0].id,
//								memberid : ct1.roomlist[0].memberid, //主播用户id
//								pwd : "222222",
//								avatar : Tool.imageCompressByQiNiu(ct1.roomlist[0].avatar,0,200,200),
//								iosreview : ct1.roomlist[0].iosreview, //是否为录像
//								videoURL : ct1.roomlist[0].videoURL
//							},
//							animation : {
//								type : "push",
//								subType : "from_right",
//								duration : 300
//							},
//							rect : {
//								x : 0,
//								y : 0,
//								w : api.winWidth,
//								h : api.winHeight
//							},
//							delay : api.systemType == 'ios' ? 0 : 300,
//							slidBackEnabled : false
//						});


					}
				});
		
				//self.openLive('295109', '6520', null, Tool.imageCompressByQiNiu("http://ojaewa2ze.bkt.clouddn.com/tbg7rv9jrjb7ek7fktls83ett0", 0, 200, 200), '0', '1', "http://qiong2.yiyuansha.com/bbb.flv");
			});
		},


		addShowToolsEventListener: function() {
			//将底部工具栏显示
			api.addEventListener({
				name: 'bottom'
			}, function(ret) {
				$api.removeCls($api.dom('.tools'), 'hidden');
				$api.css($api.dom('.live_msg'), 'visibility:visible');
			});
		},
		addkeyBackEventListener: function() {
			/*
			 * 监听 安卓手机点击 返回键 关闭直播房间
			 * */
			var self = this,
				extra = {
					type: 4,
					extra: {
						type: 2,
						memberid: this.uid,
					}
				};
			api.addEventListener({
				name: 'keyback'
			}, function() {
			RongCloud2.sendTextMessage({
							text: '退出直播',
							extra: extra,
							targetId:api.pageParam.memberid,
							conversationType:'CHATROOM',
						});
						//退出聊天室 不再接收聊天信息
						//QJ.Chat.logout();
						RongCloud2.quitChatRoom({chatRoomId: self.umemberid});
				//发送 退出直播房间消息
//				QJ.Chat.sendText({
//					text: '退出直播',
//					extra: extra
//				});
//				//退出聊天室 不再接收聊天信息
//				QJ.Chat.logout();
				/**
				 * 发送事件: closeLive
				 * 接收页面: find/live_frame.html
				 * 作用: 关闭直播房间操作
				 */
				api.sendEvent({
					name: 'closeLive'
				});
				setTimeout(function() {
					api.closeFrame();
				}, 500);
			});
		},
		receiveMsgListener: function(isLiver) {
			/**
			 * 观众端  监听处理直播房间接收消息处理
			 *  作用页面： html/find/live_frame.html
			 */
			var self = this;

			QJ.Chat.addEventListener({
				name: 'receiveMsg',
				receiveMsg: function(ret) {
				
			
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
								case 1: //自定义消息类型： 文字消息
									T.append('.live_msg', 'live_msg_text', {
										text: ret.text,
										extra: ext,
										roomid: self.session.roomId
									});
									$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
									if(ext.type == 1) {
										Chat.barrage(ext, ret.text);
									}
									if(isLiver) {
										self.insertIntoTable({
											memberid: ext.memberid,
											roomid: values.roomid,
											type: ext.type,
											content: ret.text,
											createdtime: ext.createdtime
										});
									}
									break;
								case 2: //自定义消息类型： 礼物消息
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
								case 4: //自定义消息类型： 命令消息
									//获取当前直播房间人数
									var count = parseInt($api.html($api.dom('.online_count')));
									switch(ext.type) {
										case 1: //自定义 消息子类型：观众进入直播房间
											if(!$api.dom('#fans' + ext.memberid)) {
												ext.roomid = self.session.roomid;
												T.append('.fans_list', 'live_fans', ext);
											}
											//设置房间人数
											self.setRoomMemberCount();
											break;
										case 2: //自定义 消息子类型：观众退出直播房间
											if($api.dom('#fans' + ext.memberid)) {
												$api.remove($api.dom('#fans' + ext.memberid));
											}
											//设置房间人数
											self.setRoomMemberCount();
											break;
										case 3: //自定义 消息子类型：观众被禁言
										case 4: //自定义 消息子类型：观众禁言被解除
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
														});
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
													});
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
						case 3: //渲染  直播房间 公告消息
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
			})
		},
		share: function(shareurl, roomname) {
			/**
			 * 观众端  打开分享页面
			 *  api.pageParam 来自于页面： html/find/live_frame.html
			 *  @param {String}      shareurl - 分享观看直播url
			 *  @param {String}      roomname - 直播房间名称
			 */
			this.shareUrl = shareurl;
			this.roomName = roomname;
			$('.share_bg').animate({
				opacity: 1,
				zIndex: 1,
			}, 200);
			var box = $('#share');
			box.animate({
				bottom: 0,
				zIndex: 2,
				opacity: 1,
			}, 200);
			$api.addCls($api.dom('.tools'), 'hidden');
		},
		closeShare: function() {
			/**
			 * 观众端 关闭分享页面
			 **/
			$('.share_bg').animate({
				opacity: 0,
				zIndex: -1,
			}, 200);
			var box = $('#share');
			if(box) {
				box.animate({
					bottom: '-150px',
					opacity: 0,
				}, 200);
				api.sendEvent({
					name: 'bottom'
				});
			}
		},
		gift: function() {
			/*
			 * 点击 打开 礼物选择页
			 */
			var self = this;
			$('.gift_bg').animate({
				opacity: 1,
				zIndex: 1,
			}, 200);
			
			if($api.dom('.tools') && $api.dom('.live_msg')){
				setTimeout(function(){
					$api.addCls($api.dom('.tools'), 'hidden');
				$api.css($api.dom('.live_msg'), 'visibility:hidden');
				},100)
			}
			
			if(this.giftList != ''){
			//if(false){
		
			
				
				T.html('.gift_wrap', 'gift_box', this.giftList);
				$api.html($api.dom('.diamond_num'),parseInt($api.getStorage(CONFIG.memberInfo).diamonds));
				
//				ajax.get({			
//					ctrl: 'zhiboApp',
//					fn: 'memberDiamonds', //原来屎memberDiamonds，更改缓存后
//					data: {
//						values: {
//							id: $api.getStorage(CONFIG.memberId),
//							token: $api.getStorage(CONFIG.token)
//						}
//					},
//					hideLoading: true,
//					showError: true,
//					showProgress: false,
//					success: function(ct) {
//						
//						$api.html($api.dom('.diamond_num'),parseInt(ct.diamonds||0));
//					}
//				});
				$('.img').lazyload({
					container: '#gift',
		      effect : "fadeIn"
		    });
				var box = $('.gift_box');
				box.css('bottom', '-280px');
				box.animate({
					zIndex: 2,
					bottom: 0,
					opacity: 1
				}, 200);
				self.giftSwipe();
				ellipsisOne();
			}else{
				ajax.get({
					ctrl: 'zhiboApp',
					fn: 'gift',
					data: {
						values: {
							id: self.uid,
							token: self.utoken
						}
					},
					hideLoading: true,
					showError: true,
					showProgress: false,
					success: function(ct) {
					//alert($api.getStorage(CONFIG.memberInfo).diamonds);
					if ( ct instanceof Array && ct.length != 0) {
					console.log('第一次'+JSON.stringify(ct));
						self.giftList = ct;
						T.html('.gift_wrap', 'gift_box', ct);
						$api.html($api.dom('.diamond_num'),parseInt($api.getStorage(CONFIG.memberInfo).diamonds));
						
//					ajax.get({			
//					ctrl: 'zhiboApp',
//					fn: 'memberDiamonds', //原来屎memberDiamonds，更改缓存后
//					data: {
//						values: {
//							id: $api.getStorage(CONFIG.memberId),
//							token: $api.getStorage(CONFIG.token)
//						}
//					},
//					hideLoading: true,
//					showError: true,
//					showProgress: false,
//					success: function(ct) {
//						
//						$api.html($api.dom('.diamond_num'),parseInt(ct.diamonds||0));
//					}
//				});
						
						$('.img').lazyload({
							container: '#gift',
				      effect : "fadeIn"
				    });
						var box = $('.gift_box');
						box.css('bottom', '-280px');
						box.animate({
							zIndex: 2,
							bottom: 0,
							opacity: 1,
						}, 200);
						self.giftSwipe();
						ellipsisOne();
					}
					
					}
				});
			}
		},
		closeGift: function() {
			/*
			 * 关闭  礼物选择页
			 */
			var self = this;
			// 处理 送出礼物
			if(this.giftInfo.giftid != 0 && this.giftInfo.number > 0) {
				this.GiftPushServer(null,self.giftInfo);
				self.giftInfo.number = 0;
			}
			$('.gift_bg').animate({
				opacity: 0,
				zIndex: -1,
			}, 200);
			var box = $('.gift_box');
			if(box) {
				box.animate({
					bottom: '-280px', //底部苹果点击不了，原来是bottom: '-250px',
					opacity: 0,
				}, 200);
				api.sendEvent({
					name: 'bottom'
				});
			}
		},
		getP: function(i, it) {
			/*
			 * 计算 页数
			 */
			var page = 0;
			page = parseInt(it / 8);
			if(it % 8 != 0) {
				page += 1;
			}
			var more = it % 8;
			if(i == parseInt(page - 1)) {
				if(more == 0) {
					more = 8;
				}
				return parseInt(8 * (i) + more);
			}
			return parseInt(8 * (i + 1));
		},
		getPage: function(page) {
			/*
			 * 计算 礼物 长度
			 */
			var len = 0;
			len = parseInt(page / 8);
			if(page % 8 != 0) {
				len += 1;
			}
			return len;
		},
		giftSwipe: function() {
			/*
			 * 礼物  左右切换 swipe
			 */
			window.gift = new Swipe(document.getElementById('gift'), {
				startSlide: 0,
				auto: 0,
				speed: 400,
				continuous: false, //礼物循环滑动
				disableScroll: false,
				stopPropagation: false,
				callback: function(index, elem) {
					try {
						var pointer = $api.byId('pointer');
						var p = $api.domAll(pointer, '.point');
						if(index == p.length) {
							for(var i = 0; i < p.length; i++) {
								$api.removeCls(p[i], 'active');
							}
							$api.addCls($api.byId('p0'), 'active');
						} else if(index - p.length == 1) {
							for(var i = 0; i < p.length; i++) {
								$api.removeCls(p[i], 'active');
							}
							$api.addCls($api.byId('p1'), 'active');
						} else {
							for(var i = 0; i < p.length; i++) {
								$api.removeCls(p[i], 'active');
							}
							$api.addCls($api.byId('p' + index), 'active');
						}
					} catch(e) {}
				},
				transitionEnd: function(index, elem) {}
			});
		},
		selectGift: function(_this, event,xingyun) {
			/*
			 * 选择 礼物
			 */
			
			//alert(xingyun);
			if(xingyun == 1){
	
		//$api.addCls($api.dom('.send'), 'hidden');
		$api.removeCls($api.dom('.sendzu0'), 'hidden');
		$api.removeCls($api.dom('.sendzu1'), 'hidden');
		$api.removeCls($api.dom('.sendzu2'), 'hidden');
		$api.removeCls($api.dom('.sendzu3'), 'hidden');
		//$api.addCls($api.dom('.liansong'), 'hidden');
		}else{
		$api.addCls($api.dom('.liansong'), 'hidden');
			//$api.removeCls($api.dom('.sendd'), 'hidden');
		//$api.addCls($api.dom('.send'), 'hidden');
		$api.addCls($api.dom('.sendzu0'), 'hidden');
		$api.addCls($api.dom('.sendzu1'), 'hidden');
		$api.addCls($api.dom('.sendzu2'), 'hidden');
		$api.addCls($api.dom('.sendzu3'), 'hidden');
		}
			event.stopPropagation();
			var self = this,
				select_yes = $api.dom(_this, '.ct-icon-select-yes'),
				check = $api.domAll('.check');
			// 处理 送出礼物
			if(this.giftInfo.giftid != 0 && this.giftInfo.number > 0) {
				self.GiftPushServer(1,self.giftInfo);
				self.giftInfo.number=0;
			}
			var gift = JSON.parse($api.attr(_this, 'gift'));
			//alert($api.getStorage('giftid'+gift.id));
			this.giftInfo.giftid = gift.id;
			this.giftInfo.number = 0;
			this.giftInfo.price = gift.price;
			this.giftInfo.img = $api.getStorage('giftid'+gift.id)||gift.img; //礼物图片缓存读取
			this.giftInfo.smallimg = gift.smallimg; //静态礼物
			this.giftInfo.name = gift.name;
			//this.giftInfo.shouid = api.pageParam.memberid; //接受礼物的大斌
			this.giftInfo.shouid = $api.getStorage('room'+api.pageParam.memberid); //接受礼物的大斌ID改为昵称
			
			//alert($api.getStorage('room'+api.pageParam.memberid));
			if(check.length != 0) {
				$api.addCls(check[0], 'hidden');
				$api.removeCls(check[0], 'check');
			}
			if($api.hasCls(select_yes), 'hidden') {
				$api.removeCls(select_yes, 'hidden');
				$api.addCls(select_yes, 'check');
			}
		},
		GiftPushServer: function(notclose,ginfo) {
			/*
			 * 处理 上传到服务器 
			 */
			var self = this;
			if(this.timer != '') {
				clearInterval(this.timer);
			}
			if(notclose) {
				$api.removeCls($api.dom('.send'), 'hidden')
				$api.addCls($api.dom('.liansong'), 'hidden');
				$api.text($api.dom('.liansong > span'), 5);
			}
			api.sendEvent({
				name: 'pushGiftToServer',
				extra: ginfo
			})
		},
		sendGift: function(liansong,xingyun) {
			/*
			 * 本地处理 发送礼物
			 */
			var self = this;
			if(self.liansongTimeout){
				self.liansongTimeout = false;
				setTimeout(function(){
					self.liansongTimeout=true;
				},300);
			}else{
				return ;
			}
			if(this.giftInfo.giftid == 0) {
				Tool.toast('请选择要送给主播的礼物~');
				return;
			}
			//幸运礼物连送补丁
			if(xingyun>0){
			if(parseInt($api.text($api.dom('.diamond_num'))) < parseInt(this.giftInfo.price*xingyun)) {
				Tool.toast('钻石余额不足，请充值~');
				return;
			} else {
			
				$api.text($api.dom('.diamond_num'), parseInt($api.text($api.dom('.diamond_num'))) - parseInt(this.giftInfo.price*xingyun));
			}
			}else{
			
			if(parseInt($api.text($api.dom('.diamond_num'))) < parseInt(this.giftInfo.price)) {
				Tool.toast('钻石余额不足，请充值~');
				return;
			} else {
			
				$api.text($api.dom('.diamond_num'), parseInt($api.text($api.dom('.diamond_num'))) - parseInt(this.giftInfo.price));
			}
			
			
			
			}
			//幸运礼物连送补丁
			
//			if(parseInt($api.text($api.dom('.diamond_num'))) < parseInt(this.giftInfo.price)) {
//				Tool.toast('钻石余额不足，请充值~');
//				return;
//			} else {
//			
//				$api.text($api.dom('.diamond_num'), parseInt($api.text($api.dom('.diamond_num'))) - parseInt(this.giftInfo.price));
//			}


			if(liansong>0){ //幸运礼物
			this.giftInfo.number += liansong;
			}else{
			this.giftInfo.number += 1;
			}
			if(this.timer != '') {
				clearInterval(this.timer);
			} 
			$api.text($api.dom('.liansong > span'), 5);
			if(!liansong) {
				$api.addCls($api.dom('.send'), 'hidden');
				$api.removeCls($api.dom('.liansong'), 'hidden')
			}
			

				api.addEventListener({
	            name:'beishu'
            },function(ret,err){
      
         //  alert('beishu返回'+JSON.stringify(ret.value.songuid)); &&$api.getStorage(CONFIG.memberInfo).id!=ret.value.songuid
            		if(ret.value.beishu >0){
			var newgiftInfo ={
			giftid :self.giftInfo.giftid,
			number :self.giftInfo.number,
			nickname :self.giftInfo.nickname,
			price :self.giftInfo.price,
			img :$api.getStorage('giftid'+self.giftInfo.id)||self.giftInfo.img,
			smallimg :self.giftInfo.smallimg,
			name :self.giftInfo.name,
			shuliang :ret.value.shuliang,
			level:$api.getStorage(CONFIG.memberInfo).level,
			shouid :$api.getStorage('room'+api.pageParam.memberid),
			songuid: $api.getStorage(CONFIG.memberInfo).id, //送礼物的人的ID
			moneyyy : $api.getStorage('moneyyy'),
			beishu :ret.value.beishu
			}

			api.sendEvent({
				name: 'sendGiftOfLacal',
				extra: newgiftInfo
			})
			}
            });
			
			
			
		//	alert('rr'+JSON.stringify(self.giftInfo));
			api.sendEvent({
				name: 'sendGiftOfLacal',
				extra: self.giftInfo
			})
			var time = 5;

			function timeInterval() {
				time -= 1;
				if(time == 0) {
					self.GiftPushServer(1,self.giftInfo);
					self.giftInfo.number=0;
				} else {
					$api.text($api.dom('.liansong > span'), time);
				}
			}
			this.timer = setInterval(timeInterval, 1000);
		},
		addDiamondsEventListener: function() {
			//监听充值成功
			api.addEventListener({
				name: 'diamonds'
			}, function(ret) {
				if(ret && ret.value) {
					var diamonds = ret.value.diamonds,
						memberinfo = $api.getStorage(CONFIG.memberInfo);
					memberinfo.diamonds = parseInt(diamonds);
					$api.html($api.dom('.diamond_num'), parseInt(diamonds));
					$api.setStorage(CONFIG.memberInfo, memberinfo);
				}
			});
		},
//		showGift: function(type) {
//			/**
//			 * @param    {number}     type - type = 1时候，为本地送礼物
//			 * 本地送礼物后，显示礼物样式
//			 * 作用页面: find/live_frame.html
//			 * 此函数包含两个闭包：rmGift | handler
//			 */
//			var self = this,
//				giftDoms = $api.domAll('.gift_item'),
//				length = giftDoms.length,
//				gift,
//				rmGift = function() {
//					/**
//					 * 闭包
//					 * 礼物渲染完毕后，删除展示样式
//					 */
//					var giftDoms = $api.domAll('.gift_item');
//					for(var i = 0; i < giftDoms.length; i++) {
//						if(giftDoms[i].id == 'gift' + gift.memberid + '_' + gift.giftid) {
//							self.giftArray.splice(i, 1);
//							break;
//						}
//					}
//					$api.remove($api.dom('#gift' + gift.memberid + '_' + gift.giftid));
//					if(self.giftArray.length > $api.domAll('.gift_item').length) {
//						self.showGift();
//					}
//				};
//			if(length >= 3) {
//				//验证展示礼物条件，当前展示数量需大于3时，暂不做渲染
//				return;
//			}
//			gift = self.giftArray[length];
//
//			//渲染礼物
//			T.append('.live_gift', 'live_gift', gift);
//			//设置计时器：5秒后清除礼物样式
//			window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
//			//在消息栏展示礼物文字消息
//			self.renderGiftMsg(gift);
//
//			if(gift.number > 1) {
//				if(type) { // 礼物发送者本地渲染逻辑
//					$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), gift.number);
//					clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
//					window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
//				} else {
//					//触发模拟礼物数叠加
//					var interval = setInterval(handler, Math.floor(Math.random() * 500 + 100));
//
//					function handler() {
//						/**
//						 * 闭包
//						 * 模拟：礼物数量叠加
//						 */
//						var currNum = parseInt($api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num')));
//						if(currNum < gift.number) {
//							$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), currNum + 1);
//							self.renderGiftMsg(gift);
//							clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
//							window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
//						} else {
//							clearInterval(interval);
//						}
//					}
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
//		sendGiftOfLacal: function(gift) {
//			/*处理本地送礼物*/
//			var self = this;
//			if($api.dom('#gift' + gift.memberid + '_' + gift.giftid)) {
//				$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), parseInt($api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'))) + 1);
//				self.renderGiftMsg(gift);
//				clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
//				window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
//
//				function rmGift() {
//					var giftDoms = $api.domAll('.gift_item');
//					for(var i = 0; i < giftDoms.length; i++) {
//						if(giftDoms[i].id == 'gift' + gift.memberid + '_' + gift.giftid) {
//							self.giftArray.splice(i, 1);
//							break;
//						}
//					}
//					$api.remove($api.dom('#gift' + gift.memberid + '_' + gift.giftid));
//					if(self.giftArray.length > $api.domAll('.gift_item').length) {
//						self.showGift(1);
//					}
//				}
//			} else {
//				var flag = -1;
//				for(var i = 0; i < self.giftArray.length; i++) {
//					if(gift.memberid == self.giftArray[i].memberid && gift.giftid == self.giftArray[i].giftid) {
//						flag = i;
//						break;
//					}
//				}
//				if(flag != -1) {
//					self.renderGiftMsg(gift);
//					self.giftArray[flag].number += 1;
//				} else {
//					self.giftArray.push(gift);
//					self.showGift();
//				}
//			}
//		},
		addsendGiftOfLacalEventListener: function() {
			/**
			 * 监听事件 处理本地 发送礼物
			 * @param    {Object}     extra - 礼物对象
			 * 发送事件页面： component/live_gift.htmls
			 */
			var self = this;
			api.addEventListener({
				name: 'sendGiftOfLacal'
			}, function(ret, err) {
				if(ret && ret.value) {
					Gift.sendGiftOfLacal(ret.value);
				}
			});
		},
		addpushGiftToServerEventListener: function() {
			/**
			 * 监听事件 处理 发送礼物到服务器 并推送到其他客户端
			 * @param    {Object}     extra - 礼物对象
			 * 发送事件页面： component/live_gift.htmls
			 */
			var self = this;
			api.addEventListener({
				name: 'pushGiftToServer'
			}, function(ret, err) {
				if(ret && ret.value) {
					Gift.pushGiftToServer(ret.value);
				}
			});
		},
//		pushGiftToServer: function(gift) {
//			/**
//			 * 处理 发送礼物到服务器 并推送到其他客户端
//			 * @param    {String}     	id - 用户id
//			 * @param    {String}     	token - 用户token
//			 * @param    {String}     memberid - 主播id
//			 * @param    {String}     	giftid - 礼物id
//			 * @param    {Number}     	number - 礼物数量
//			 * 发送事件页面： component/live_gift.htmls
//			 */
//			var self = this,
//				values = {
//					id: this.uid,
//					token: this.utoken,
//					memberid: this.umemberid,
//					roomid: this.session.roomId,
//					giftid: gift.giftid,
//					number: gift.number
//				};
//			ajax.get({
//				ctrl: 'zhiboApp',
//				fn: 'sendgifts',
//				data: {
//					values: values
//				},
//				showProgress: false,
//				hideLoading: true,
//				showError: true,
//				success: function(ct) {
//					var memberinfo = $api.getStorage(CONFIG.memberInfo);
//					memberinfo.diamonds = ct.diamonds;
//					$api.setStorage(CONFIG.memberInfo, memberinfo);
//					var liveCharm = $api.dom('.live_charm');
//					$api.text(liveCharm, parseInt($api.text(liveCharm)) + parseInt(ct.charm));
//					var extra = {
//						type: 2,
//						extra: {
//							type: 0,
//							avatar: gift.avatar,
//							nickname: gift.nickname,
//							level: memberinfo.level,
//							roomid: values.roomid,
//							name: gift.name,
//							img: gift.img,
//							number: gift.number,
//							charm: ct.charm,
//							memberid: gift.memberid,
//							giftid: gift.giftid
//						}
//					}
//					QJ.Chat.sendText({
//						text: '礼物',
//						extra: extra,
//						success: function() {}
//					})
//				}
//			});
//		},
		getAnchor: function(memberid) {
			/**
			 * 获取用户基础信息，打开用户详情
			 * @param {String}      roomid - 房间id
			 * @param {String}      memberid - 主播用户id
			 */
			var self = this;
			if(memberid == this.uid) {
				return;
			}
			this.audienceId = memberid;
			$('.audience-bg').animate({
				opacity: 1,
				zIndex: 1,
			}, 200);
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'getnews',
				data: {
					values: {
						id: this.uid,
						token: this.utoken,
						memberid: self.audienceId,
						roomid: self.session.roomId
					}
				},
				hideLoading: true,
				showError: true,
				showProgress: false,
				success: function(ct) {
					self.audienceIsGag = ct.gag;
					self.mubiao=ct.nickname; //大斌
					self.audienceIsManager = ct.manager;
					ct.memberid = self.umemberid;
					T.html('.audience-wrap', 'audience_detail', ct);
					$('.img').lazyload({
						container: '.anchor',
			      effect : "fadeIn"
			    });
					var box = $('.anchor'),
						body = $('body'),
						bodyHeight = body.height(),
						boxHeight = box.height();
					box.css('top', (bodyHeight - boxHeight) / 2 - 120 + 'px');
					box.css('z-index', '1');
					box.animate({
						top: (bodyHeight - boxHeight) / 2 + 'px',
						opacity: 1
					}, 200);
				}
			});
		},
		closeAnchor: function() {
			/**
			 * 关闭用户资料卡
			 */
			var box = $('.anchor'),
				body = $('body');
			$('.audience-bg').animate({
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
			 * @param {String} mid 用户id
			 */
			var status_text;
			if($api.dom('.anchor')) {
				status_text = $api.text(_this);
			} else {
				status_text = $api.text($api.dom(_this, 'span'));
			}
			if(status_text == '已关注') {
				this.unfollow(_this, mid);
			} else {
				this.follow(_this, mid);
			}
		},
		unfollow: function(_this, aid) {
			/**
			 * 取消关注
			 * @param {String} aid 用户id
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
				showProgress: true,
				success: function(ct) {
					if($api.dom('.anchor')) {
						$api.text(_this, '关注');
					}
					if($api.dom('.fans_num')) {
						var fans_num = $api.text($api.dom('.fans_num'));
						if(parseInt(fans_num) == 0) {
							$api.html($api.dom('.fans_num'), 0);
						} else {
							$api.text($api.dom('.fans_num'), parseInt(fans_num) - 1);
						}
					}
					api.sendEvent({
						name: 'follow',
						extra: {
							fid: aid
						}
					});
				}
			});
		},
		follow: function(_this, mid) {
			/**
			 * 关注
			 * @param {String} mid 用户id
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
				showProgress: true,
				hideLoading: true,
				showError: true,
				success: function(ct) {
					if($api.dom('.anchor')) {
						$api.text(_this, '已关注');
					}
					if($api.dom('.fans_num')) {
						var fans_num = $api.text($api.dom('.fans_num'));
						if(parseInt(fans_num) == 0) {
							$api.html($api.dom('.fans_num'), 0);
						} else {
							$api.text($api.dom('.fans_num'), parseInt(fans_num) + 1);
						}
					}
					api.sendEvent({
						name: 'follow',
						extra: {
							fid: mid
						}
					});
				}
			});
		},
		addfollowEventListener: function() {
			//监听 在 查看主播详情时 关注主播改变文字状态
			var self = this;
			api.addEventListener({
				name: 'follow'
			}, function(ret) {
				if(ret && ret.value) {
					if(ret.value.fid == self.umemberid) {
						if($api.text($api.dom('.zhubo .follow > span')) == '关注') {
							$api.addCls($api.dom('.zhubo .follow'),'hidden');
							$api.text($api.dom('.zhubo .follow > span'), '已关注');
						} else {
							$api.removeCls($api.dom('.zhubo .follow'),'hidden');
							$api.text($api.dom('.zhubo .follow > span'), '关注');
						}
					}
				}
			});
		},
		openReport: function(_this, mid, rid) {
			/**
			 * 打开举报页面 或 管理
			 * @param {String} mid 用户id
			 * @param {String} rid 房间id
			 */
			var self = this;
			var report = $api.text(_this);
			if(report == '举报') {
				api.openWin({
					name: 'report',
					url: api.wgtRootDir + '/zhibo/html/window/win.html',
					pageParam: {
						headerTitle: "举报用户",
						frameName: 'report',
						frameUrl: api.wgtRootDir + '/zhibo/html/find/report.html',
						frameParam: {
							mid: mid
						}
					}
				});
				setTimeout(function() {
					self.closeAnchor();
				}, 300)
			} else {
				//判断是否 被禁言
				self.isGag(mid, rid);
			}
		},
		isGag: function(mid, rid) {
			/**
			 * 判断是否被禁言 
			 * @param {String} mid 用户id
			 * @param {String} rid 房间id
			 */
			var self = this;
			Tool.actionSheet({
				destructiveTitle: this.audienceIsGag == 0 ? '禁言' : '解除禁言',
				buttons: ['禁言列表'],
				style: {
					layerColor: 'rgba(0, 0, 0, 0.6)',
					itemPressColor: '#E8E8EA',
					fontNormalColor: '#000',
				},
				success: function(ret) {
					switch(ret) {
						case 1:
							if(self.audienceIsGag == 0) {
								self.gag(0, mid, rid);
							} else {
								self.gag(1, mid, rid);
							}
							break;
						case 2:
							self.openGagList(rid);
							break;
					}
				}
			});
		},
		gag: function(status, memberid, rid) {
		
		//大斌禁言 守护 没好
		
			/**
			 * 设置禁言 / 解除禁言  守护
			 * @param {Number} status 禁言状态 1 为 解除禁言  0 为 禁言处理
			 * @param {String} mid 用户id
			 * @param {String} rid 房间id
			 */
			var self = this,
				fn,
				mid = []; // 用户id 数组  禁言列表 可做 批量 取消禁言
			
		
			if(status == 1) {
				fn = 'notgag';
				mid.push(parseInt(memberid));
			} else {
				fn = 'gag';
			}
			ajax.get({
				ctrl: 'zhiboApp',
				fn: fn,
				data: {
					values: {
						id: self.uid,
						token: self.utoken,
						memberid: fn == 'notgag' ? 　mid　 : 　memberid,
						roomid: self.session.roomId
					}
				},
				showProgress: true,
				hideLoading: true,
				showError: true,
				success: function(ct) {
					if(fn == 'gag') {
						api.toast({
							msg: '已禁言~',
							duration: 500,
							location: 'middle'
						});
						console.log(JSON.stringify(self));
						
						self.audienceIsGag = 1;
					} else {
						api.toast({
							msg: '已解除禁言~',
							duration: 500,
							location: 'middle'
						});
						self.audienceIsGag = 0;
					}
					//console.log(JSON.stringify(self.audienceId));
					//console.log(JSON.stringify(self));
					//大斌守护发起
						api.sendEvent({
						name: 'sendGagOrder',
						extra: {
							isGag: self.audienceIsGag,
							memberid: self.uid,
							nickname: $api.getStorage(CONFIG.memberInfo).nickname,
							targetId: self.audienceId,
							targetNickname: self.mubiao
						}
					})
				}
			});
		},
		openGagList: function(rid) {
			api.openWin({
				name: 'gagList',
				url: api.wgtRootDir + '/zhibo/html/window/win.html',
				pageParam: {
					headerTitle: "禁言列表",
					frameName: 'gagList',
					frameUrl: api.wgtRootDir + '/zhibo/html/find/gag_list.html',
					frameParam: {
						roomid: rid
					}
				}
			});
		},
		isBlack: function(mid, nickname, avatar, username, tidings, concernstatus) {
			/**
			 * 判断是否被主播拉黑
			 * @param {String} mid 用户id
			 */
			var self = this,
				values = {
					id: this.uid,
					token: this.utoken,
					memberid: mid
				};
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'isblack',
				data: {
					values: values
				},
				hideLoading: true,
				showError: false,
				showProgress: false,
				success: function(ct) {
					if(ct.state == 1){
						Tool.toast('您已拉黑该主播,不能进入与TA私聊~');
					}else{
						if(ct.status == 1) {
							Tool.toast('您已被主播拉黑,不能进入与TA私聊~');
						} else {
							//打开聊天通讯
							self.openTalkWith(mid, nickname, avatar, username, tidings, concernstatus);
						}
					}
				}
			});
			setTimeout(function() {
				self.closeAnchor();
			}, 300)
		},
		openTalkWith: function(mid, nickname, avatar, username, tidings, concernstatus) {
			/**
			 * 打开聊天通讯
			 * @param {String} mid 			用户id
			 * @param {String} username 用户电话
			 * @param {String} avatar   用户头像
			 * @param {String} nickname 用户昵称
			 * @param {String} concernstatus 该用户是否关注你
			 * @param {String} tidings  该用户是否开启不接收陌生人私信
			 */
			
			var self = this;
			if(mid == this.uid) {
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
		openProfile: function(mid) {
			/*
			 * 打开 用户详情
			 */
			var self = this;
			api.openWin({
				name: 'profile',
				url: api.wgtRootDir + '/zhibo/html/find/profile.html',
				bgColor: 'transparent',
				bounces: false,
				pageParam: {
					mid: mid
				},
				rect: {
					x: 0,
					y: 0,
					w: api.winWidth,
					h: api.winHeight
				},
				delay: api.systemType == 'ios' ? 0 : 300
			});
			setTimeout(function() {
				self.closeAnchor();
			}, 300)
		},
		shareWx: function() {
			// 分享 微信朋友圈
			var self = this;
			WX.shareWebpage({
				apiKey: '',
				scene: 'session',
				title: '我在看' + this.roomName + '的直播,一起来看吧~',
				thumb: 'widget://zhibo/image/fenxiang.png',
				contentUrl: this.shareUrl
			}, function(ret, err) {
				Tool.toast('分享成功~');
			});
			Audience.closeShare();
		},
		shareWxFriend: function() {
			//分享 微信好友
			var self = this;
			WX.shareWebpage({
				apiKey: '',
				scene: 'timeline',
				title: '我在看' + self.roomName + '的直播,一起来看吧~',
				thumb: 'widget://zhibo/image/fenxiang.png',
				contentUrl: self.shareUrl
			}, function(ret, err) {
				Tool.toast('分享成功~');
			});
			Audience.closeShare();
		},
		weibo: function() {
			// 分享 微博
			var self = this;
			Weibo.shareWebPage({
				title: '我在看' + self.roomName + '的直播,一起来看吧~',
				thumb: 'widget://zhibo/image/fenxiang.png',
				description: '',
				contentUrl: self.shareUrl
			}, function(ret, err) {
				Tool.toast('分享成功~');
			});
			Audience.closeShare();
		},
		shareQQ: function() {
			//分享 qq 好友
			var self = this;
			QQ.shareWebPage({
				type: 'QFriend',
				url: self.shareUrl,
				title: '我在看' + self.roomName + '的直播,一起来看吧~',
				description: '',
				imgUrl: 'widget://zhibo/image/fenxiang.png'
			}, function(ret, err) {
				Tool.toast('分享成功~');
			});
			Audience.closeShare();
		},
		smallinit: function(args) {
			/**
			 * 观看直播初始化
			 * 作用页面: find/look_live.html
			 * api.pageParam 来自 find/hot.html 的 openLive 方法
			 */

			var self = this;
			
			var argsarray = {};

			//设置背景图，等待视频缓冲
//			$api.css($api.dom('.img'), 'background-image:url(' + api.pageParam.avatar + ')');

			//打开直播画面窗口
			api.openFrame({
				name: 'small_camera',
				url: api.wgtRootDir + '/zhibo/html/find/small_camera.html',
				bgColor: 'transparent',
				bounces: false,
				rect: {
					 	x:0,             //左上角x坐标
					    y:0,             //左上角y坐标
					    w:100,           //宽度，若传'auto'，页面从x位置开始自动充满父页面宽度
					    h:100   
				},
				pageParam: {
					avatar: api.pageParam.avatar
				}
			});

			argsarray.roomId = '296193';
			argsarray.password = '222222';
			argsarray.nickname = 'Administrator.6522';
			argsarray.umemberid = '6522';
			//苹果审核 是否为录像
			argsarray.iosreview = '1';
			argsarray.videoURL = 'http://qiong2.yiyuansha.com/aaa.flv';
			
//			QJS.Core.registerApp();
//			QJS.Core.setDebugLogEnabled({
//				enabled: true
//			});

			//监听: 观众退出直播间事件
			this.addCloseLiveEventListener();

			//获取观众手机ip
			api.require('ipAddress').getIp(function(ret, err) {
				// Debug.alt(JSON.stringify(ret, null, 2))
				
				ajax.get({
					ctrl: 'zhiboApp',
					fn: 'startlook',
					data: {
						values: {
							ip: ret.ip || '',
							id: self.uid,
							token: self.utoken,
							roomid: argsarray.roomId
						}
					},
					hideLoading: true,
					showError: true,
					showProgress: true,
					success: function(ct) {
						//设置禁止休眠
						api.setKeepScreenOn({
							keepOn: true
						});
						//验证房间信息
						QJS.Core.authRoomSession({
							roomId: argsarray.roomId,
							password: argsarray.password,
							nickname: argsarray.nickname,
							success: function() {
								//查询直播间详情, 获取在线看直播的人数，直播状态
								QJS.Core.getLiveContext({
									roomId: argsarray.roomId,
									password: argsarray.password,
									nickname: argsarray.nickname,
									success: function(ret) {
										console.log(JSON.stringify(ret, null, 2))
											//缓存当前在线观看人数
										$api.setStorage('playCount', ret.playUserCount);
										//判断直播是否已结束
										if(ret.recordingStatus == 0) {
											//直播结束 打开 直播已结束页面
											//添加苹果审核
											
											if(argsarray.iosreview == 1){
											
											//初始化播放器
											
											QJS.Player.init(argsarray);
											//预先 打开交互层页面	
											/*
											self.openLiveFrame(); 
											//在画面没出来之前，隐藏Frame
											api.setFrameAttr({
												name: 'small_camera',
												hidden: true
											});
											api.bringFrameToFront({
										    from: 'barrage'
											});
											*/
											//开始接收视频推送流
											QJS.Player.play({
												playView: 'small_camera', //视频显示的窗口名称, 窗口必须为frame类型
												quality: 'high' //视频的清晰度
											});
											/**
											 * 设置视频的显示模式
											 * 保持比例撑满，视频会按照比例放大直到撑满屏幕为止
											 */
											QJS.Player.setDisplayMode({
												mode: 'aspectFill'
											});

											//监听: 成功获取直播画面事件
											QJS.Player.addEventListener({
												name: 'connected',
												connected: function() {
													//先显示直播画面Frame
													api.setFrameAttr({
														name: 'smalll_camera',
														hidden: false
													});

													//仿黑屏措施: 500ms后关闭等待遮罩层
													setTimeout(function() {
														api.closeFrame({
															name: 'live_camera_1'
														});
													}, 500)
												}
											});

											//监听: 主播已经结束直播
											self.addLiveStopEventListener();
											
											
											}else{
											//直播结束 打开 直播已结束页面
											
											api.openFrame({
												name: 'close_live',
												url: api.wgtRootDir + '/zhibo/html/component/close_live.html',
												bgColor: 'transparent',
												rect: {
													x: 0,
													y: 0,
													w: 'auto',
													h: api.frameHeight
												},
												pageParam: {
													mid: argsarray.umemberid,// 主播id
													roomid: argsarray.roomId	//房间 id									
												}
											});
											
											/**
											 * 发送事件: init_hot
											 * 接收页面: find/hot.html & find/nearby.html
											 * 作用: 刷新列表
											 */
											api.sendEvent({
												name: 'init_hot'
											});
											
											}
										} else {
											//初始化播放器
											//alert(JSON.stringify(self.session.review));//self.session.review
											//QJ.Core.registerApp();
											QJS.Player.init(argsarray);
											//预先 打开交互层页面	
											self.openLiveFrame(); 
											//在画面没出来之前，隐藏Frame
											api.setFrameAttr({
												name: 'small_camera',
												hidden: true
											});
											api.bringFrameToFront({
										    from: 'barrage'
											});
											//开始接收视频推送流
											QJS.Player.play({
												playView: 'small_camera', //视频显示的窗口名称, 窗口必须为frame类型
												quality: 'high' //视频的清晰度
											});
											/**
											 * 设置视频的显示模式
											 * 保持比例撑满，视频会按照比例放大直到撑满屏幕为止
											 */
											QJS.Player.setDisplayMode({
												mode: 'aspectFill'
											});

											//监听: 成功获取直播画面事件
											QJS.Player.addEventListener({
												name: 'connected',
												connected: function() {
													//先显示直播画面Frame
													api.setFrameAttr({
														name: 'small_camera',
														hidden: false
													});

													//仿黑屏措施: 500ms后关闭等待遮罩层
													setTimeout(function() {
														api.closeFrame({
															name: 'live_camera_1'
														});
													}, 500)
												}
											});

											//监听: 主播已经结束直播
											self.addLiveStopEventListener();
										}
									},
									error: function(err) {
										api.toast({
											location: 'middle',
											msg: err.code + ': ' + err.description,
											duration: 500
										});
										setTimeout(function() {
											api.closeWin();
										}, 500);
									}
								});
							}
						});
					}
				});
			});
		}
		
	};

	window.Audience = au;
}(window);