/*
 * videoPlayer 封装了视频播放功能（不支持音频播放）。
 * 可快进、快退设置播放位置等操作，亦可设置屏幕亮度和系统声音大小。
 * 通过监听接口可获取模块上的各种手势操作事件。
 * 使用本模块时可把本模块当做一个 frame 添加在 window 或 frame 上。
 * Android 平台上支持的的视频文件格式有：MP4、3gp；
 * IOS 平台上支持的视频文件格式有：MOV，MP4，M4V。
 * 本模块封装了两道播放方案：
 * 		一，通过调用 play 接口，直接打开一个自带默认播放界面的播放器；
 * 		二，通过 open 接口，打开一个纯播放器界面，再配合 frame 自定义完整的播放页面，通过start、pause、stop等接口控制播放操作。
 * 
 * 创建于2016-2-16
 */

!function(window){
	var vp = {
		play: function(args){
			/*打开一个自带界面的视频播放器，本播放器为全屏横屏显示，
			 * 支持屏幕随设备自动旋转。用户单击播放器时，会弹出 foot 和 head 导航条，再次单击则关闭之。
			 * 仅 setPath 接口对本接口打开的播放器有效
			 * 
			 *args 内部结构
			 * title 顶部标题文字
			 * styles[styles] 模块的样式设置
			 * path 文件的路径，支持网络和本地（fs://）路径，在 android 平台上不支持 widget
			 * autoPlay[true] 打开时是否自动播放
			 * coverImg 封面图路径，播放器打开尚未播放时的封面图，要求本地路径(widget://、fs://)
			 * autorotation[true] 视频播放页面是否支持自动旋转（横竖屏），若为 false 则手动点击右下角按钮旋转
			 */
			var videoPlayer = api.require('videoPlayer'),
					styles = {
						head: { //播放器顶部导航条样式
							bg: 'rgba(161,161,161,0.5)', //顶部导航条背景，支持#、rgb、rgba、img
							height: 44, //顶部导航条的高
							titleSize: 20, //顶部标题字体大小
							titleColor: '#fff', //顶部标题字体颜色
							backSize: 44, //顶部返回按钮大小
							//backImg: '', //默认：返回小箭头图标, 顶部返回按钮的背景图片，要求本地路径(widget://、fs://)
							setSize: 44, //顶部右边设置按钮大小
							//setImg: '' //默认：设置小图标, 顶部右边设置按钮背景图片，要求本地路径(widget://、fs://)
						},
						foot: { //播放器底部导航条样式
							bg: 'rgba(161,161,161,0.5)', //底部导航条背景，支持#、rgb、rgba、img
							height: 44, //底部导航条的高
							playSize: 44, //底部播放/暂停按钮大小
							//playImg: '', //默认：播放按钮图标, 底部播放按钮的背景图片，要求本地路径(widget://、fs://)
							//pauseImg: '', //默认：暂停按钮图标, 底部暂停按钮的背景图片，要求本地路径(widget://、fs://)
							nextSize: 44, //底部下一集按钮大小
							//nextImg: '', //默认：下一集按钮图标, 底部下一集按钮的背景图片，要求本地路径(widget://、fs://)
							timeSize: 14, //底部时间标签大小
							timeColor: '#fff', //底部时间标签颜色，支持#、rgba、rgb；
							//sliderImg: '', //默认：滑块小图标, 底部进度条滑块背景图片，要求本地路径(widget://、fs://)
							progressColor: '#696969', //进度条背景色，支持#、rgba、rgb
							progressSelected: '#76EE00' //滑动后的进度条背景色，支持#、rgb、rgba
						}
					};
					
			videoPlayer.play({
				texts: {
					head: {
						title: args.title
					}
				},
				styles: styles,
				path: args.path,
				autoPlay: args.autoPlay || true,
				coverImg: args.coverImg || '',
				autorotation: args.autorotation || true
			}, function(ret, err){
				switch(ret.eventType){
					case 'show':
						if(typeof args.show === 'function'){
							args.show();
						}
						break;
					case 'back':
						if(typeof args.back === 'function'){
							args.back();
						}
						break;
					case 'play':
						if(typeof args.play === 'function'){
							args.play();
						}
						break;
					case 'pause':
						if(typeof args.pause === 'function'){
							args.pause();
						}
						break;
					case 'next':
						if(typeof args.next === 'function'){
							args.next();
						}
						break;
					case 'failed':
						if(typeof args.failed === 'function'){
							args.failed();
						}
						break;
				}
			});
		}
	};
	
	window.VideoPlayer = vp;
}(window);
