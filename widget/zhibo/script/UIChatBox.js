/*
 * 创建于 2016-1-10
 */

!function(window){
	var cb = {
		sourcePath: 'widget://zhibo/res/chatBox/emotion', //表情源文件.
		/* 存储表情信息: JSON对象,以 表情字符 为属性名, 以 表情图片URL 为值.*/
		emotionData: '',
		talkFrame: '', //聊天记录存放区
		
		init: function(args){
			var self = this,
					panelHeight,
					chatBox = api.require('UIChatBox');
			//准备表情
			this.getImgsPaths(this.sourcePath, function(emotion){
			    self.emotionData = emotion;
			});
			
			chatBox.open({
				emotionPath: self.sourcePath,
				extras: {
		    	titleSize: 10,
		    	titleColor: '#a3a3a3',
		    	btns: [{
		    		title: '拍照',
		    		normalImg: 'widget://zhibo/res/chatBox/cam1.png',
		    		activeImg: 'widget://zhibo/res/chatBox/cam2.png'
		    	},{
		    		title: '相册',
		    		normalImg: 'widget://zhibo/res/chatBox/album1.png',
		    		activeImg: 'widget://zhibo/res/chatBox/album2.png'
		    	},{
		    		title: '礼物',
		    		normalImg: 'widget://zhibo/res/chatBox/gift1.png',
		    		activeImg: 'widget://zhibo/res/chatBox/gift2.png'
		    	}]
		    },
		    styles: {
	        inputBar: {
            borderColor: '#d9d9d9',
            bgColor: '#f2f2f2'
	        },
	        inputBox: {
            borderColor: '#B3B3B3',
            bgColor: '#FFFFFF',
            normalImg: 'widget://zhibo/res/chatBox/bt1.png',
            activeImg: 'widget://zhibo/res/chatBox/bt2.png'
	        },
	        emotionBtn: {
            normalImg: 'widget://zhibo/res/chatBox/face1.png',
            activeImg: 'widget://zhibo/res/chatBox/face2.png'
	        },
	        keyboardBtn: {
            normalImg: 'widget://zhibo/res/chatBox/key1.png',
            activeImg: 'widget://zhibo/res/chatBox/key2.png'
	        },
	        extrasBtn: {//附加功能按钮样式
	        	normalImg: 'widget://zhibo/res/chatBox/add1.png',
	        	activeImg: 'widget://zhibo/res/chatBox/add2.png'
	        },
	        speechBtn: {//输入框左侧语音按钮样式
	        	normalImg: 'widget://zhibo/res/chatBox/voice1.png',
	        	activeImg: 'widget://zhibo/res/chatBox/voice2.png'
	        },
	        recordBtn: {  //JSON对象；“按住 录音”按钮的样式
		        normalBg: 'widget://zhibo/res/chatBox/bt1.png',
		        activeBg: 'widget://zhibo/res/chatBox/bt2.png',
		        color: '#909090'
			    },
	        indicator: {
            target: 'both',
            color: '#c4c4c4',
            activeColor: '#9e9e9e'
	        }
		    },				
			}, function(ret){
				switch(ret.eventType){
					case 'send':
						/* 用户输入了表情或者文字. */
						if(ret.msg){
							// var sendMsg = self.transText(ret.msg);
							api.sendEvent({
								name: 'iTalk',
								extra: {
									content: ret.msg,
									msg: self.transText(ret.msg),
									type: 'txt'
								}
							});
			//				self.chatBoxModule.resignFirstResponder();
						}
					break;
					case 'clickExtras':
						switch(ret.index){
							case 0:
								/*拍照*/
								Tool.getOnePic({
									sourceType: 'camera',
									quality: 100,
									success:function(ret){
										if(ret.data){
											api.sendEvent({
												name: 'iTalk',
												extra: {
													type: 'img',
													message: {
														content: {
															imagePath: ret.data
														},
														sentTime: new Date().getTime()
													}
												}
											});
										}
									}
								});
							break;
							case 1:
								/*本地相册*/
								Tool.getSomePic({
									max: 9,
									type: 'picture',
									transPath: true,
									success:function(ret){
										/*重新整理ret的数据结构，使其适配模板结构*/
										ret.list.forEach(function(value, index, arr){
											value.content = new Object();
											value.content.imagePath = value.path;
											/*发送时间戳作唯一标识*/
											value.sentTime = new Date().getTime() + index;
										});
										api.sendEvent({
											name: 'iTalk',
											extra: {
												type: 'img',
												message: ret.list
											}
										});
									}
								});
							break;
							case 2:
								/* 礼物 iphonex*/ 
								api.openFrame({
									name: 'gift',
									url: api.wgtRootDir + '/zhibo/html/component/gift.html',
									rect: {
										x: 0,
										y: api.frameHeight - panelHeight- (api.deviceModel=='iPhone10,3'||api.deviceModel=='iPhone10,6'?40:0),
										w: 'auto',
										h: 220
									},
									pageParam:{
										memberid: args.memberid
									}
								})
						}
				}
				if(ret.eventType == 'send'){
					/* 用户输入了表情或者文字. */
					if(ret.msg){
						// var sendMsg = self.transText(ret.msg);
						api.sendEvent({
							name: 'iTalk',
							extra: {
								content: self.transText(ret.msg)
							}
						});
		//				self.chatBoxModule.resignFirstResponder();
					}					
				}
			});
			/*注册chatBox监听机制*/
			chatBox.addEventListener({
				target: 'inputBar',
				name: 'move'
			}, function(ret){
				var header = $api.dom('#header'),
						headerPos = $api.offset(header);
				panelHeight = ret.panelHeight;
//				api.setFrameAttr({
//					name: 'talk_with',
//					rect: {
//						x: 0,
//						y: headerPos.h,
//						w: api.winWidth,
//						h: api.winHeight - headerPos.h - ret.inputBarHeight - ret.panelHeight - ('ios'==api.systemType?0:10)
//					}
//				});		
	api.setFrameAttr({
					name: 'talk_with',
					rect: {
						x: 0,
						y: headerPos.h,
						w: api.winWidth,
						h: $api.getStorage('winHeight')  - headerPos.h - ret.inputBarHeight - ret.panelHeight - ('ios'==api.systemType?0:10)
					}
				});	
				api.execScript({
					name: 'talk_with',
					frameName: 'talk_with',
					script: "scrollToBottom()"
				});				
			});
			
			/* chatbox 监听按下 左侧语音按钮 */
			chatBox.addEventListener({
				target: 'inputBar',
				name: 'showRecord'
			},function(ret){
				//当点击 其他 按钮时 关闭 礼物 frame
				api.closeFrame({
					name: 'gift'
				});
			});
			
			/* chatbox 监听按下 表情 按钮*/
			chatBox.addEventListener({
				target: 'inputBar',
				name: 'showEmotion'
			},function(ret){
				//当点击 其他 按钮时 关闭 礼物 frame
				api.closeFrame({
					name: 'gift'
				});
			});
			
			/* chatbox 监听按下 附加 按钮*/
			chatBox.addEventListener({
				target: 'inputBar',
				name: 'showExtras'
			},function(ret){
				//当点击 其他 按钮时 关闭 礼物 frame
				api.closeFrame({
					name: 'gift'
				});
			});
			
			/*注册chatbox监听按下录音监听*/
			chatBox.addEventListener({
				target: 'recordBtn',
				name: 'press'
			}, function(ret){
				api.openFrame({
					name: 'record_mask',
					url: api.wgtRootDir + '/zhibo/html/component/record_mask.html',
					rect: {
						x: 0,
						y: 0,
						w: 'auto',
						h: 'auto'
					}
				});
				/*启动录音逻辑*/
				api.startRecord({
				  path: 'fs://record/' + new Date().getTime() + '.amr'
				});
			});
			chatBox.addEventListener({
				target: 'recordBtn',
				name: 'press_cancel'
			}, function(ret){
				api.closeFrame({
					name: 'record_mask'
				});
				/*录音完毕，启动发送逻辑*/
				api.stopRecord(function(ret, err){
					if(ret){
						api.sendEvent({
							name: 'iTalk',
							extra: {
								type: 'vc',
								duration: ret.duration,
								voicePath: ret.path
							}
						});
					}
				});
			});
			chatBox.addEventListener({
				target: 'recordBtn',
				name: 'move_out'
			}, function(ret){
				api.sendEvent({
					name: 'record_move_out'
				});
			});
			
			chatBox.addEventListener({
				target: 'recordBtn',
				name: 'move_out_cancel'
			}, function(ret){
				api.sendEvent({
					name: 'record_move_out_cancel'
				});
				/*停止录音*/
				api.stopRecord(function(ret, err){
					if(ret){
						var fs = api.require('fs');
						fs.remove({
					    path: ret.path
						});
					}
				});
			});
			
			chatBox.addEventListener({
				target: 'recordBtn',
				name: 'move_in'
			}, function(ret){
				api.sendEvent({
					name: 'record_move_in'
				});
			});
		},
		setValue: function(value){
			/*设置输入框的值*/
			var self = this,
					chatBox = api.require('UIChatBox');
			chatBox.value({
				msg: value
			});
		},
		getValue: function(callback){
			/*获取输入框的值*/
			var self = this,
					chatBox = api.require('UIChatBox');
			chatBox.value(function(ret, err){
		    if(ret) {
          if ("function" === typeof(callback)) {
						callback(ret.msg);
					}
		    }else {
          //alert( JSON.stringify( err ) );
		    }
			});
		},
		/*
		 * 一个工具方法: 可以获取 所有表情图片的名称和真实url地址, 以JSON对像形式返回;
		 * 其中以"表情文本"为属性名, 以"图片真实路径"为属性值. 
		 */
		getImgsPaths: function(sourcePathOfChatBox, callback) {
			var jsonPath = sourcePathOfChatBox + ".json";
	
			api.readFile({
				path: jsonPath
			}, function(ret, err) {
				if (ret.status) {
					var emotionArray = JSON.parse(ret.data),
							emotion = {};
	
					for (var idx in emotionArray) {
						var emotionItem = emotionArray[idx];
	
						var emotionText = emotionItem["text"];
						var emotionUrl = "api.wgtRootDir/res/chatBox/emotion/" + emotionItem["name"] + ".png";
	
						emotion[emotionText] = emotionUrl;
					}
	
					/* 把 emotion对象 回调出去. */
					if ("function" === typeof(callback)) {
						callback(emotion);
					}
	
				}
			});
		},		
		transText: function(text, imgWidth, imgHeight) {
			var self = this,
					imgWidth = imgWidth || 25,
					imgHeight = imgHeight || 25;
	
			var regx = /\[(.*?)\]/gm;
			
			var textTransed = text.replace(regx, function(match) {
				var imgSrc = self.emotionData[match];
	
				if (!imgSrc) { /* 说明不对应任何表情,直接返回即可.*/
					return match;
				}
	
				var img = "<img class='expression' src='" + imgSrc + "' />";
	
				return img;
			});
	
			return textTransed;
		},
		getImgsText: function(txt, callback) {
			//表情转文字
			var self = this;
			var jsonPath = self.sourcePath + ".json";
	
			api.readFile({
				path: jsonPath
			}, function(ret, err) {
				if (ret.status) {
					var textArray = JSON.parse(ret.data),
							_text = {};
	
					for (var idt in textArray) {
						var textItem = textArray[idt];
	
						var textName = textItem["name"];
						var textText = textItem["text"];
	
						_text[textName] = textText;
					}
					
					var regx = /<img class=\'expression\' src=\'api.wgtRootDir\/res\/chatBox\/emotion\/(.*?).png\' \/>/gm,
					textTransed = txt.replace(regx, function(match) {
						var reg =  /(\&[l,g]t;)|(<img)|(class=\'expression\')|(src=\')|(api.wgtRootDir\/res\/chatBox\/emotion\/)|(\')|(\/>)|(.png)|( )/gm,
								_html = match.replace(reg, function(Rmatch){
									switch(Rmatch){
										case '\' \/>':
											return '';
										case '\ ':
											return '';
										case ' ':
											return '';
										case '\'':
											return '';
										case '\/>':
											return '';
										case '<img':
											return '';
										case 'class=\'expression\'':
											return '';
										case 'src=\'':
											return '';
										case '.png':
											return '';
										case 'api.wgtRootDir\/res\/chatBox\/emotion\/':
											return '';
										case '&lt;':
											return '<';
										case '&gt;':
											return '>';
									}
								});
						var text = _text[_html];
						if(!text) {
							return _html;
						}
						return text;	
					});
					/* 把 emotion对象 回调出去. */
					if ("function" === typeof(callback)) {
						callback(textTransed);
					}
	
				}
			});
		}
	};
	
	window.UIChatBox = cb;
	
}(window);
