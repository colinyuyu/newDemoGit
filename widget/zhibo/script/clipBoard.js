/*
 * clipBoard模块封装剪切板的相关功能，可实现向剪切版复制、读取字符串相关操作。
 */

!function(window){
	var cb = {
		set: function(args){
			/*设置剪切板内容
			 *args 内部结构
			 * value 要复制到剪切板的字符串，可为空，若为空则清空剪切板
			 */
			var obj = api.require('clipBoard');
			obj.set({
				value: args.value
			}, function(ret, err){
				if(ret.status){
					api.toast({
						msg: '内容复制成功',
						location: 'middle'
					});
				}else{
					if(config.debug){
						api.alert({
							title: 'clipBoard提示',
							msg: err.msg || 'occur error'
						});
					}
				}
			});
		},
		get: function(args){
			/*获取剪切板中的数据
			 *args 内容结构
			 * success 回调
			 */
			var obj = api.require('clipBoard');
			obj.get(function(ret, err){
				args.success(ret);
			});
		}
	};
	
	window.ClipBoard = cb;
}(window);
