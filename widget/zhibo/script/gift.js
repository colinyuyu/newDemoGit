/*
 * 聊天 模块
 */! function(window) {
	var g = {
		session : {
			roomId : '',
			password : '',
			nickname : ''
		}, //亲加验证信息
		giftArray : [], //礼物数组，监听聊天室的礼物消息，并将其显示到屏幕
		uid : $api.getStorage(CONFIG.memberId), //用户id
		utoken : $api.getStorage(CONFIG.token), //用户token
		umemberid : '', //主播id
		setParams : function(args) {
			if (args.session)
				this.session = args.session;
			if (args.umemberid)
				this.umemberid = args.umemberid;
		},
		showGift : function(type) {
		
		//alert('beishu'+JSON.stringify(type));
		//alert('abeishu'+JSON.stringify(beishu));
			/**
			 * @param    {number}     type - type = 1时候，为本地送礼物
			 * 主播收到礼物后，显示礼物样式
			 * 作用页面: live/live_barrage_frame.html
			 * 此函数包含两个闭包：rmGift | handler
			 */

			var giftDoms = $api.domAll('.gift_item'), length = giftDoms.length, self = this, gift, rmGift = function() {
				/**
				 * 闭包
				 * 礼物渲染完毕后，删除展示样式
				 */
				var giftDoms = $api.domAll('.gift_item');

				for (var i = 0; i < giftDoms.length; i++) {
					if (giftDoms[i].id == 'gift' + gift.memberid + '_' + gift.giftid) {
						Gift.giftArray.splice(i, 1);
						break;
					}
				}

				//					$api.remove($api.dom('#gift' + gift.memberid + '_' + gift.giftid));
				Gift.rmGiftAnimation(gift, function() {
					if (Gift.giftArray.length > $api.domAll('.gift_item').length) {
						Gift.showGift();
					}
					if (interval) {
						clearInterval(interval)
					}
				});
			};

			if (length >= 3) {
				//验证展示礼物条件，当前展示数量需大于3时，暂不做渲染
				return;
			}
			gift = Gift.giftArray[length];
			if (!gift) {
				return;
			}

			//在消息栏上方渲染礼物
			//			T.append('.live_gift', 'live_gift', gift);
		
			Gift.addGiftAnimation(gift);
			//设置计时器：5秒后清除礼物样式
			window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
			Gift.renderGiftMsg(gift);
			//在消息栏展示礼物文字消息

			if (gift.number > 1) {
				if (type) {
					//礼物发送者本地渲染逻辑
					//					$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), gift.number);
					Gift.plus('#gift' + gift.memberid + '_' + gift.giftid + ' .num', gift.number);
					clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
					window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
				} else {

				}
			}
			if (!type) {
				//触发模拟礼物数叠加
				var interval = setInterval(handler, Math.floor(Math.random() * 500 + 400));
				function handler() {
					/**
					 * 闭包
					 * 模拟：礼物数量叠加
					 * 当该礼物展示被移除时停止(rmGift里执行clearInterval()或展示栏已不存在该礼物)
					 */
					if (!$api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num')) {
						clearInterval(interval);
						return;
					}
					var currNum = parseInt($api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num')));
					if (currNum < gift.number) {
						//							$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), currNum + 1);
						Gift.plus('#gift' + gift.memberid + '_' + gift.giftid + ' .num');
						Gift.renderGiftMsg(gift);
						clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
						window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
					}
				}

			}
		},
		renderGiftMsg : function(extra) {
			/**
			 * 在消息栏展示礼物文字消息
			 * @param    {Object}     extra - 礼物对象
			 */
		
			var self = this;
			T.append('.live_msg', 'live_msg_gift', {
			
			
				extra : extra,
				roomid : self.session.roomId
			});
			$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
		},
		sendGiftOfLacal : function(gift) {
	
			/*处理本地送礼物*/
			var self = this;
			if ($api.dom('#gift' + gift.memberid + '_' + gift.giftid)) {
				//				$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), parseInt($api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'))) + 1);
				Gift.plus('#gift' + gift.memberid + '_' + gift.giftid + ' .num');
				Gift.renderGiftMsg(gift);
				clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
				window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);

				function rmGift() {
					/**
					 * 闭包
					 * 礼物渲染完毕后，删除展示样式
					 */
					var giftDoms = $api.domAll('.gift_item');
					for (var i = 0; i < giftDoms.length; i++) {
						if (giftDoms[i].id == 'gift' + gift.memberid + '_' + gift.giftid) {
							Gift.giftArray.splice(i, 1);
							break;
						}
					}

					//					$api.remove($api.dom('#gift' + gift.memberid + '_' + gift.giftid));
					Gift.rmGiftAnimation(gift, function() {
						if (Gift.giftArray.length > $api.domAll('.gift_item').length) {
							Gift.showGift(1);
						}
					});
				};
			} else {
				var flag = -1;
				for (var i = 0; i < Gift.giftArray.length; i++) {
					if (gift.memberid == Gift.giftArray[i].memberid && gift.giftid == Gift.giftArray[i].giftid) {
						flag = i;
						break;
					}
				}
				if (flag != -1) {
					Gift.renderGiftMsg(gift);
					Gift.giftArray[flag].number += 1;
				} else {
					Gift.giftArray.push(gift);
					Gift.showGift();  
				}
			}
		},
		pushGiftToServer : function(gift) {
		
		
		
			/**
			 * 处理 发送礼物到服务器 并推送到其他客户端
			 * @param    {String}     	id - 用户id
			 * @param    {String}     	token - 用户token
			 * @param    {String}     memberid - 主播id
			 * @param    {String}     	giftid - 礼物id
			 * @param    {Number}     	number - 礼物数量
			 * 发送事件页面： component/live_gift.htmls
			 */
			var self = this, values = {
				id : this.uid,
				token : this.utoken,
				memberid : this.umemberid,
				roomid : this.session.roomId,
				giftid : gift.giftid,
				number : gift.number
			};
			ajax.get({
				ctrl : 'zhiboApp',
				fn : 'sendgifts',
				data : {
					values : values
				},
				showProgress : false,
				hideLoading : true,
				showError : true,
				success : function(ct) {
				$api.setStorage('moneyyy',ct.moneyyy);
				//alert('umemberid'+this.umemberid);
					//alert('roomid'+this.session.roomId);
				//if(ct.beishu>0){
				     api.sendEvent({  //如果倍数大于0就为1，否则为真实倍数
						name: 'beishu', //如果倍数大于0就为1，否则为真实倍数
						extra: { //如果倍数大于0就为1，否则为真实倍数
							beishu: ct.beishu, //如果倍数大于0就为1，否则为真实倍数
							shuliang: ct.shuliang, //如果倍数大于0就为1，否则为真实倍数
							songuid: $api.getStorage(CONFIG.memberInfo).id, //送礼物的人的ID
						} //如果倍数大于0就为1，否则为真实倍数
					}); //如果倍数大于0就为1，否则为真实倍数
//}

					var memberinfo = $api.getStorage(CONFIG.memberInfo);
					memberinfo.diamonds = ct.diamonds;
					if(ct.beishu>0){ //如果倍数大于0就为1，否则为真实倍数
					var newnumber=1; //如果倍数大于0就为1，否则为真实倍数
					}else{  //如果倍数大于0就为1，否则为真实倍数
					newnumber=gift.number; //如果倍数大于0就为1，否则为真实倍数
					} //如果倍数大于0就为1，否则为真实倍数
					//alert('bb'+ct.teding);
					//$api.setStorage('teding', ct.teding||0);
					$api.setStorage(CONFIG.memberInfo, memberinfo);
					//alert('pp'+$api.getStorage(CONFIG.memberinfo).diamonds);
					var liveCharm = $api.dom('.live_charm');
					$api.text(liveCharm, parseInt($api.text(liveCharm)) + parseInt(ct.charm));
					var extra = {
						type : 2,
						extra : {
							type : 0,
							avatar : gift.avatar,
							nickname : gift.nickname,
							level : memberinfo.level,
							roomid : values.roomid,
							name : gift.name,
							img : $api.getStorage('giftid'+gift.id)||gift.img, //礼物图片缓存读取
							smallimg : gift.smallimg, //静态礼物
							number : newnumber, //如果倍数大于0就为1，否则为真实倍数
							charm : ct.charm,
							beishu : ct.beishu|| 0,
							shuliang : ct.shuliang|| 0,
							memberid : gift.memberid,
							giftid : gift.giftid,
							moneyyy : ct.moneyyy,//中奖了的总值
							//shouid : api.pageParam.memberid //接受礼物的大斌
							shouid : $api.getStorage('room'+api.pageParam.memberid) //接受礼物的大斌ID改为昵称
						}
					}
					RongCloud2.sendTextMessage({
						text : '礼物',
						extra : extra,
						targetId : api.pageParam.memberid,
						conversationType : 'CHATROOM',
						success : function() {
						}
					})
					//along大礼物全场特效  2017/8/28 荣云已经不支持未进入房间  就能发言
					var timess = 0;
					function mycallback(tids, timess) {
	
						setTimeout(function() {
			
							//console.log(tids);
							extra.extra.charm=0; //大斌加的全场礼物其他房间不增加魅力显示
							RongCloud2.sendTextMessage({
								text : '礼物',
								extra : extra,
								targetId : tids, //这个代表接收礼物到房间号 大斌 通过下面的循环把所有的房间礼物显示出来
								conversationType : 'CHATROOM',
								success : function() {
								}
							})

						}, timess)
					}
//alert(JSON.stringify(ct))

if ( ct.res instanceof Array && ct.res.length != 0) {
					for (var i = 0; i < ct.res.length; i++) {
				
						//alert(JSON.stringify(ct));
						var tids = ct.res[i];
						mycallback(tids, timess);
						timess += 100;
					}
					}
				}
			});
		},
		// 礼物入场动画
		addGiftAnimation : function(gift, callback) {
		

			//alert(gift.img);
			var fileExtension = (gift.img).substring((gift.img).lastIndexOf('.') + 1).toLowerCase();
			if (fileExtension == "gif") {
				$api.removeCls($api.dom('.demo'), 'hidden');
//alert('cs'+JSON.stringify(gift));
				T.append('.demo', 'live_gift_big', gift);
			}

			T.append('.live_gift', 'live_gift', gift);
			var selector = '#gift' + gift.memberid + '_' + gift.giftid;
			setTimeout(function() {
				$api.css($api.dom(selector), 'left:0px;opacity:1;')
				setTimeout(function() {
					$api.css($api.dom(selector + ' .gift_img'), 'right:0px;opacity:1;');
					if ( typeof callback === 'function') {
						callback();
					}
				}, 400);
			}, 10);
		},
		// 礼物退场动画
		rmGiftAnimation : function(gift, callback) {

			var fileExtension = (gift.img).substring((gift.img).lastIndexOf('.') + 1).toLowerCase();
			if (fileExtension == "gif") {
				$api.remove($api.dom('#biggift'));
				$api.addCls($api.dom('.demo'), 'hidden');
			}

			var selector = '#gift' + gift.memberid + '_' + gift.giftid;
			var giftDom = $api.dom(selector);
			$api.css(giftDom, 'top:-100px;opacity:0;')
			setTimeout(function() {
				$api.remove(giftDom);
				if ( typeof callback === 'function') {
					callback();
				}
			}, 400);
		},
		//礼物数字动画
		plus : function(selector, count) {
			/**
			 *  改变礼物展示栏礼物的数量为 +1 或相应数字
			 * @param {String} selector	礼物css选择器
			 * @param {Number} count		指定渲染的数字，不传则为原数字+1
			 */
			var _dom = $(selector);

			_dom.stop(true, true);

			_dom.animate({
				fontSize : '25px',
				opacity : 1
			}, 100);

			_dom.animate({
				fontSize : '-=20px',
				opacity : 0.2
			}, 30);

			_dom.animate({
				fontSize : '+=60px', //放大40px
				opacity : 0.2
			}, 60, function() {
				var _dom = $(selector + ' .gift_num'), num = _dom.text();
				_dom.text(count || parseInt(num) + 1)
			});

			_dom.animate({
				fontSize : '-=50px', //缩小10px
				opacity : 0.8
			}, 110);

			_dom.animate({
				fontSize : '+=15px', //放大5px
				opacity : 0.8
			}, 160);

			_dom.animate({
				fontSize : '-=8px', //缩小3px
				opacity : 0.9
			}, 190);

			_dom.animate({
				fontSize : '+=3px', //正常
				opacity : 1
			}, 210);
		},
		//爱心发送开始
		heartsGift : function() {

			var extra = {
				type : 5,
				extra : {
					type : 0
				}
			}
			RongCloud2.sendTextMessage({
				text : '礼物',
				extra : extra,
				targetId : api.pageParam.memberid,
				conversationType : 'CHATROOM',
				success : function() {
				}
			})

		}
		//爱心发送结束
	}
	window.Gift = g;
}(window); 