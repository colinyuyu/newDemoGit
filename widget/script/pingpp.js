/*
 * pingpp支付模块
 */

!function(window){
	var p = {
		pay: function(args, callback){
			/*
			 * json参数 args数据结构
			 * 	number recharge 非充值状态不用填写
			 *  number ordertype 订单类型1充值订单2商品订单3我要测订单4企业测购买订单
			 * 	number id 会员id
			 * 	string token 
			 * 	number orderid 订单号 ps:当订单类型为2时，orderid为数组类型
			 * 	number channel 支付方式：1支付宝；2微信支付
			 */
//			  alert(JSON.stringify(args))
			var pingpp = api.require('pingpp');
			ajax.get({
				ctrl: 'zhiboApp',
				fn: 'generatePayorder',
				showProgress: true,
				data: {
					values: args
				},
				showError: true,
				hideLoading: true,
				success:function(ct){
					pingpp.createPayment({
						charge: ct,
						scheme: 'wx4b76a370fb3c9f60'
					}, function(ret, err){
						// alert('ret'+$api.jsonToStr(ret) + '     err'+$api.jsonToStr(err));
						if(ret){
							switch(ret.result){
								case 'success':
									if(typeof callback === 'function'){
										callback('success');
									}
									break;
								case 'fail':
									// alert('ret'+$api.jsonToStr(ret) + '     err'+$api.jsonToStr(err));
									api.toast({
										msg: '支付失败:' + err.msg,
										location: 'bottom',
										duration: 2000
									});
									if(typeof callback === 'function'){
										callback('fail');
									}
									break;
								case 'cancel':
									api.toast({
										msg: '取消支付',
										location: 'bottom',
										duration: 2000
									});
									if(typeof callback === 'function'){
										callback('cancel');
									}
									break;
								case 'invalid':
									api.toast({
										msg: '支付失败：微信客户端未安装',
										location: 'bottom',
										duration: 2000
									});
									break;
							}
						}else{
							var errMsg = '';
							switch(err.code){
								case 0:
									errMsg = err.msg||'无效的 Charge';
									break;
								case 1:
									errMsg = err.msg||'无效的 Credential';
									break;
								case 2:
									errMsg = err.msg||'无效的渠道';
									break;
								case 3:
									errMsg = err.msg||'微信客户端未安装';
									break;
								case 4:
									errMsg = err.msg||'微信客户端版本不支持 OpenApi';
									break;
								case 5:
									errMsg = err.msg||'取消支付';
									break;
								case 6:
									errMsg = err.msg||'找不到 ViewController';
									break;
								case 7:
									errMsg = err.msg||'测试模式异步通知失败';
									break;
								case 8:
									errMsg = err.msg||'渠道返回失败';
									break;
								case 9:
									errMsg = err.msg||'网络错误';
									break;
								case 10:
									errMsg = err.msg||'未知错误';
									break;
							}
							if(errMsg){
								api.toast({
									msg: (err.code||'') + '-' + errMsg,
									duration: 2000,
									location: 'bottom'
								});
							}else{
								api.alert({
									title: '错误提示',
									msg: '未知错误'
								});
							}
						}					
					});
				}
			});
		}
	};

	window.Pingpp = p;
}(window);