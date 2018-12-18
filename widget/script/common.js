/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	module.exports = __webpack_require__(12);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * app/微信 框架配置文件
	 * 创建：2015-11-9
	 * 更新：2016-8-30 : 以常量命名规范 代替 变量命名规范
	 */

	!function(window){
		//项目名称，组成异步地址、分享地址的一部分
		window.PROJECT_NAME = 'zhibo';
		//是否为正式(生产)环境
		window.IS_FORMAL_ENV = true;
		
		//域名

		window.DOMAIN = 'http://zhibo.gzlwks.com';
		//window.DOMAIN = 'http://192.168.1.3';
		window.CONFIG = {
				VERSION: '1.0.0',	//app版本号，是组成本地数据库文件的名称的一部分
		 		DEBUG: IS_FORMAL_ENV ? false : true,
				/*本地数据库配置，用于缓存数据结构*/
		 		DB: {
		 			NAME: PROJECT_NAME,	//数据库名称，一般默认为 PROJECT_NAME
		 			MAIN_TABLE: 'mainTable', /*主表*/
		 			DEBUG: IS_FORMAL_ENV ? false : true		/*是否启动本地数据库调试机制，true则显示报错弹出框*/
		 		},
		 		SHARE_URL: 'http://' + (IS_FORMAL_ENV ? '' : 'test') + PROJECT_NAME,
		 		/*异步请求配置，用于获取服务器端数据*/
		 		AJAX: {
		 		    BASE_URL: DOMAIN + '/index.php'
		 			//BASE_URL: DOMAIN + '/index.php/api'
		 		},
		 		AJ_PUSH: IS_FORMAL_ENV ? false : true,	/*是否绑定极光推送测试*/
		 		QIN_JIA:{
		 			APP_KEY:'37802497156d4c5fb81180248e4c2e56',
		 			ACCESS_SECRET:'79b5c476378d4a3496bf18232b77da7a'
		 		},
		 		userName: 'userName',//用户手机号
		 		memberInfo:'memberInfo',//用户信息
				memberId:'memberId',//用户id
				diamonds:'diamonds',//用户id
				token:'token',//用户密钥
				appVersion: 'appVersion',//版本号
				firstOpen: 'firstOpen',//是否第一次打开app
				lon: 'lon',//经度
				lat: 'lat',//纬度
				qiyuUnreadCount: 'qiyuUnreadCount',//11七鱼客服未读条数
				zbVersion: 89,
		 	};
	}(window);


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	 * APICloud JavaScript Library
	 * Copyright (c) 2014 apicloud.com
	 */
	(function(window){
	    var u = {};
	    var isAndroid = (/android/gi).test(navigator.appVersion);
	    var uzStorage = function(){
	        var ls = window.localStorage;
	        if(isAndroid){
	           ls = os.localStorage();
	        }
	        return ls;
	    };
	    function parseArguments(url, data, fnSuc, dataType) {
	        if (typeof(data) == 'function') {
	            dataType = fnSuc;
	            fnSuc = data;
	            data = undefined;
	        }
	        if (typeof(fnSuc) != 'function') {
	            dataType = fnSuc;
	            fnSuc = undefined;
	        }
	        return {
	            url: url,
	            data: data,
	            fnSuc: fnSuc,
	            dataType: dataType
	        };
	    }
	    u.trim = function(str){
	        if(String.prototype.trim){
	            return str == null ? "" : String.prototype.trim.call(str);
	        }else{
	            return str.replace(/(^\s*)|(\s*$)/g, "");
	        }
	    };
	    u.trimAll = function(str){
	        return str.replace(/\s*/g,'');
	    };
	    u.isElement = function(obj){
	        return !!(obj && obj.nodeType == 1);
	    };
	    u.isArray = function(obj){
	        if(Array.isArray){
	            return Array.isArray(obj);
	        }else{
	            return obj instanceof Array;
	        }
	    };
	    u.isEmptyObject = function(obj){
	        if(JSON.stringify(obj) === '{}'){
	            return true;
	        }
	        return false;
	    };
	    u.addEvt = function(el, name, fn, useCapture){
	        if(!u.isElement(el)){
	            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
	            return;
	        }
	        useCapture = useCapture || false;
	        if(el.addEventListener) {
	            el.addEventListener(name, fn, useCapture);
	        }
	    };
	    u.rmEvt = function(el, name, fn, useCapture){
	        if(!u.isElement(el)){
	            console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
	            return;
	        }
	        useCapture = useCapture || false;
	        if (el.removeEventListener) {
	            el.removeEventListener(name, fn, useCapture);
	        }
	    };
	    u.one = function(el, name, fn, useCapture){
	        if(!u.isElement(el)){
	            console.warn('$api.one Function need el param, el param must be DOM Element');
	            return;
	        }
	        useCapture = useCapture || false;
	        var that = this;
	        var cb = function(){
	            fn && fn();
	            that.rmEvt(el, name, cb, useCapture);
	        };
	        that.addEvt(el, name, cb, useCapture);
	    };
	    u.dom = function(el, selector){
	        if(arguments.length === 1 && typeof arguments[0] == 'string'){
	            if(document.querySelector){
	                return document.querySelector(arguments[0]);
	            }
	        }else if(arguments.length === 2){
	            if(el.querySelector){
	                return el.querySelector(selector);
	            }
	        }
	    };
	    u.domAll = function(el, selector){
	        if(arguments.length === 1 && typeof arguments[0] == 'string'){
	            if(document.querySelectorAll){
	                return document.querySelectorAll(arguments[0]);
	            }
	        }else if(arguments.length === 2){
	            if(el.querySelectorAll){
	                return el.querySelectorAll(selector);
	            }
	        }
	    };
	    u.byId = function(id){
	        return document.getElementById(id);
	    };
	    u.first = function(el, selector){
	        if(arguments.length === 1){
	            if(!u.isElement(el)){
	                console.warn('$api.first Function need el param, el param must be DOM Element');
	                return;
	            }
	            return el.children[0];
	        }
	        if(arguments.length === 2){
	            return this.dom(el, selector+':first-child');
	        }
	    };
	    u.last = function(el, selector){
	        if(arguments.length === 1){
	            if(!u.isElement(el)){
	                console.warn('$api.last Function need el param, el param must be DOM Element');
	                return;
	            }
	            var children = el.children;
	            return children[children.length - 1];
	        }
	        if(arguments.length === 2){
	            return this.dom(el, selector+':last-child');
	        }
	    };
	    u.eq = function(el, index){
	        return this.dom(el, ':nth-child('+ index +')');
	    };
	    u.not = function(el, selector){
	        return this.domAll(el, ':not('+ selector +')');
	    };
	    u.prev = function(el){
	        if(!u.isElement(el)){
	            console.warn('$api.prev Function need el param, el param must be DOM Element');
	            return;
	        }
	        var node = el.previousSibling;
	        if(node.nodeType && node.nodeType === 3){
	            node = node.previousSibling;
	            return node;
	        }
	    };
	    u.next = function(el){
	        if(!u.isElement(el)){
	            console.warn('$api.next Function need el param, el param must be DOM Element');
	            return;
	        }
	        var node = el.nextSibling;
	        if(node.nodeType && node.nodeType === 3){
	            node = node.nextSibling;
	            return node;
	        }
	    };
	    u.closest = function(el, selector){
	        if(!u.isElement(el)){
	            console.warn('$api.closest Function need el param, el param must be DOM Element');
	            return;
	        }
	        var doms, targetDom;
	        var isSame = function(doms, el){
	            var i = 0, len = doms.length;
	            for(i; i<len; i++){
	                if(doms[i].isEqualNode(el)){
	                    return doms[i];
	                }
	            }
	            return false;
	        };
	        var traversal = function(el, selector){
	            doms = u.domAll(el.parentNode, selector);
	            targetDom = isSame(doms, el);
	            while(!targetDom){
	                el = el.parentNode;
	                if(el != null && el.nodeType == el.DOCUMENT_NODE){
	                    return false;
	                }
	                traversal(el, selector);
	            }

	            return targetDom;
	        };

	        return traversal(el, selector);
	    };
	    u.contains = function(parent,el){
	        var mark = false;
	        if(el === parent){
	            mark = true;
	            return mark;
	        }else{
	            do{
	                el = el.parentNode;
	                if(el === parent){
	                    mark = true;
	                    return mark;
	                }
	            }while(el === document.body || el === document.documentElement);

	            return mark;
	        }
	        
	    };
	    u.remove = function(el){
	        if(el && el.parentNode){
	            el.parentNode.removeChild(el);
	        }
	    };
	    u.attr = function(el, name, value){
	        if(!u.isElement(el)){
	            console.warn('$api.attr Function need el param, el param must be DOM Element');
	            return;
	        }
	        if(arguments.length == 2){
	            return el.getAttribute(name);
	        }else if(arguments.length == 3){
	            el.setAttribute(name, value);
	            return el;
	        }
	    };
	    u.removeAttr = function(el, name){
	        if(!u.isElement(el)){
	            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
	            return;
	        }
	        if(arguments.length === 2){
	            el.removeAttribute(name);
	        }
	    };
	    u.hasCls = function(el, cls){
	        if(!u.isElement(el)){
	            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
	            return;
	        }
	        if(el.className.indexOf(cls) > -1){
	            return true;
	        }else{
	            return false;
	        }
	    };
	    u.addCls = function(el, cls){
	        if(!u.isElement(el)){
	            console.warn('$api.addCls Function need el param, el param must be DOM Element');
	            return;
	        }
	        if('classList' in el){
	            el.classList.add(cls);
	        }else{
	            var preCls = el.className;
	            var newCls = preCls +' '+ cls;
	            el.className = newCls;
	        }
	        return el;
	    };
	   u.removeCls = function(el, cls){
	    if(el!=null){
	        if(!u.isElement(el)){
	            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
	            return;
	        }
	        if('classList' in el){
	            el.classList.remove(cls);
	        }else{
	            var preCls = el.className;
	            var newCls = preCls.replace(cls, '');
	            el.className = newCls;
	        }
	        return el;
	        }
	    };
	    u.toggleCls = function(el, cls){
	        if(!u.isElement(el)){
	            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
	            return;
	        }
	       if('classList' in el){
	            el.classList.toggle(cls);
	        }else{
	            if(u.hasCls(el, cls)){
	                u.removeCls(el, cls);
	            }else{
	                u.addCls(el, cls);
	            }
	        }
	        return el;
	    };
	    u.val = function(el, val){
	        if(!u.isElement(el)){
	            console.warn('$api.val Function need el param, el param must be DOM Element');
	            return;
	        }
	        if(arguments.length === 1){
	            switch(el.tagName){
	                case 'SELECT':
	                    var value = el.options[el.selectedIndex].value;
	                    return value;
	                    break;
	                case 'INPUT':
	                    return el.value;
	                    break;
	                case 'TEXTAREA':
	                    return el.value;
	                    break;
	            }
	        }
	        if(arguments.length === 2){
	            switch(el.tagName){
	                case 'SELECT':
	                    el.options[el.selectedIndex].value = val;
	                    return el;
	                    break;
	                case 'INPUT':
	                    el.value = val;
	                    return el;
	                    break;
	                case 'TEXTAREA':
	                    el.value = val;
	                    return el;
	                    break;
	            }
	        }
	        
	    };
	    u.prepend = function(el, html){
	        if(!u.isElement(el)){
	            console.warn('$api.prepend Function need el param, el param must be DOM Element');
	            return;
	        }
	        el.insertAdjacentHTML('afterbegin', html);
	        return el;
	    };
	    u.append = function(el, html){
	        if(!u.isElement(el)){
	            console.warn('$api.append Function need el param, el param must be DOM Element');
	            return;
	        }
	        el.insertAdjacentHTML('beforeend', html);
	        return el;
	    };
	    u.before = function(el, html){
	        if(!u.isElement(el)){
	            console.warn('$api.before Function need el param, el param must be DOM Element');
	            return;
	        }
	        el.insertAdjacentHTML('beforebegin', html);
	        return el;
	    };
	    u.after = function(el, html){
	        if(!u.isElement(el)){
	            console.warn('$api.after Function need el param, el param must be DOM Element');
	            return;
	        }
	        el.insertAdjacentHTML('afterend', html);
	        return el;
	    };
	    u.html = function(el, html){
	        if(!u.isElement(el)){
	            console.warn('$api.html Function need el param, el param must be DOM Element');
	            return;
	        }
	        if(arguments.length === 1){
	            return el.innerHTML;
	        }else if(arguments.length === 2){
	            el.innerHTML = html;
	            return el;
	        }
	    };
	    u.text = function(el, txt){
	        if(!u.isElement(el)){
	            console.warn('$api.text Function need el param, el param must be DOM Element');
	            return;
	        }
	        if(arguments.length === 1){
	            return el.textContent;
	        }else if(arguments.length === 2){
	            el.textContent = txt;
	            return el;
	        }
	    };
	    u.offset = function(el){
	        if(!u.isElement(el)){
	            console.warn('$api.offset Function need el param, el param must be DOM Element');
	            return;
	        }
	        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
	        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

	        var rect = el.getBoundingClientRect();
	        return {
	            l: rect.left + sl,
	            t: rect.top + st,
	            w: el.offsetWidth,
	            h: el.offsetHeight
	        };
	    };
	    u.css = function(el, css){
	        if(!u.isElement(el)){
	            console.warn('$api.css Function need el param, el param must be DOM Element');
	            return;
	        }
	        if(typeof css == 'string' && css.indexOf(':') > 0){
	            el.style && (el.style.cssText += ';' + css);
	        }
	    };
	    u.cssVal = function(el, prop){
	        if(!u.isElement(el)){
	            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
	            return;
	        }
	        if(arguments.length === 2){
	            var computedStyle = window.getComputedStyle(el, null);
	            return computedStyle.getPropertyValue(prop);
	        }
	    };
	    u.jsonToStr = function(json){
	        if(typeof json === 'object'){
	            return JSON && JSON.stringify(json);
	        }
	    };
	    u.strToJson = function(str){
	        if(typeof str === 'string'){
	            return JSON && JSON.parse(str);
	        }
	    };
	    u.setStorage = function(key, value){
	        if(arguments.length === 2){
	            var v = value;
	            if(typeof v == 'object'){
	                v = JSON.stringify(v);
	                v = 'obj-'+ v;
	            }else{
	                v = 'str-'+ v;
	            }
	            var ls = uzStorage();
	            if(ls){
	                ls.setItem(key, v);
	            }
	        }
	    };
	    u.getStorage = function(key){
	        var ls = uzStorage();
	        if(ls){
	            var v = ls.getItem(key);
	            if(!v){return;}
	            if(v.indexOf('obj-') === 0){
	                v = v.slice(4);
	                return JSON.parse(v);
	            }else if(v.indexOf('str-') === 0){
	                return v.slice(4);
	            }
	        }
	    };
	    u.rmStorage = function(key){
	        var ls = uzStorage();
	        if(ls && key){
	            ls.removeItem(key);
	        }
	    };
	    u.clearStorage = function(){
	        var ls = uzStorage();
	        if(ls){
	            ls.clear();
	        }
	    };

	   
	    /*by king*/
	    u.fixIos7Bar = function(el){
	        if(!u.isElement(el)){
	            console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
	            return;
	        }
	        var strDM = api.systemType;
	        if (strDM == 'ios') {
	            var strSV = api.systemVersion;
	            var numSV = parseInt(strSV,10);
	            var fullScreen = api.fullScreen;
	            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
	            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
	                el.style.paddingTop = '20px';
	                $api.css($api.dom('#main'),'padding-bottom:20px');
	            }
	            if(/^10/.test(api.systemVersion) && $api.dom('#footer')){
	            	$api.css($api.dom('#main'),'overflow-y: scroll');
	            	$api.css($api.dom('#main'),'-webkit-overflow-scrolling: touch');
	            }
	        }
	    };
	    u.fixStatusBar = function(el){
	        if(!u.isElement(el)){
	            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
	            return;
	        }
	        var sysType = api.systemType;
	        if(sysType == 'ios'){
	            u.fixIos7Bar(el);
	            if(/^10/.test(api.systemVersion) && $api.dom('#footer')){
	            	$api.css($api.dom('#main'),'overflow-y: scroll');
	            	$api.css($api.dom('#main'),'-webkit-overflow-scrolling: touch');
	            }
	        }else if(sysType == 'android'){
	            var ver = api.systemVersion;
	            ver = parseFloat(ver);
	            if(ver >= 4.4){
	                el.style.paddingTop = '25px';
	            }
	        }
	    };
	    u.toast = function(title, text, time){
	        var opts = {};
	        var show = function(opts, time){
	            api.showProgress(opts);
	            setTimeout(function(){
	                api.hideProgress();
	            },time);
	        };
	        if(arguments.length === 1){
	            var time = time || 500;
	            if(typeof title === 'number'){
	                time = title;
	            }else{
	                opts.title = title+'';
	            }
	            show(opts, time);
	        }else if(arguments.length === 2){
	            var time = time || 500;
	            var text = text;
	            if(typeof text === "number"){
	                var tmp = text;
	                time = tmp;
	                text = null;
	            }
	            if(title){
	                opts.title = title;
	            }
	            if(text){
	                opts.text = text;
	            }
	            show(opts, time);
	        }
	        if(title){
	            opts.title = title;
	        }
	        if(text){
	            opts.text = text;
	        }
	        time = time || 500;
	        show(opts, time);
	    };
	    u.post = function(/*url,data,fnSuc,dataType*/){
	        var argsToJson = parseArguments.apply(null, arguments);
	        var json = {};
	        var fnSuc = argsToJson.fnSuc;
	        argsToJson.url && (json.url = argsToJson.url);
	        argsToJson.data && (json.data = argsToJson.data);
	        if(argsToJson.dataType){
	            var type = argsToJson.dataType.toLowerCase();
	            if (type == 'text'||type == 'json') {
	                json.dataType = type;
	            }
	        }else{
	            json.dataType = 'json';
	        }
	        json.method = 'post';
	        api.ajax(json,
	            function(ret,err){
	                if (ret) {
	                    fnSuc && fnSuc(ret);
	                }
	            }
	        );
	    };
	    u.get = function(/*url,fnSuc,dataType*/){
	        var argsToJson = parseArguments.apply(null, arguments);
	        var json = {};
	        var fnSuc = argsToJson.fnSuc;
	        argsToJson.url && (json.url = argsToJson.url);
	        //argsToJson.data && (json.data = argsToJson.data);
	        if(argsToJson.dataType){
	            var type = argsToJson.dataType.toLowerCase();
	            if (type == 'text'||type == 'json') {
	                json.dataType = type;
	            }
	        }else{
	            json.dataType = 'text';
	        }
	        json.method = 'get';
	        api.ajax(json,
	            function(ret,err){
	                if (ret) {
	                    fnSuc && fnSuc(ret);
	                }
	            }
	        );
	    };

	/*end*/
	    

	    window.$api = u;

	})(window);




/***/ },
/* 3 */
/***/ function(module, exports) {

	/*调试模块
	 * 
	 */
	!function(window){
		var d = {
			alt: function(msg){
				if(CONFIG.DEBUG){
					api.alert({
						title: '提示信息',
						msg: msg,
					});
				}
			},
			toast: function(msg){
				if(CONFIG.DEBUG){
					api.toast({
						location: 'top',
						msg: msg
					});
				}
			}
		};
		window.Debug = d;
	}(window);


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
	 * 模板拼接，必须先导入doT.js
	 * 创建于2016-1-10
	 */
	!function(window){
		var t = {
			html: function(selector, template, data,lazyload,lazyload_container,lazyload_selector){
				$api.html($api.dom(selector), doT.template($api.html($api.dom('[template="'+template+'"]')))(data||''));
				try{
					api.parseTapmode();
					if(lazyload && $(lazyload_selector || 'div.img') && $(lazyload_selector || 'div.img').lazyload){
						$(lazyload_selector || 'div.img').lazyload({
					      effect : "fadeIn",
					      container: $(lazyload_container || selector)
					    });
					}
				}catch(e){
					
				}
			},
			append: function(selector, template, data){
				$api.append($api.dom(selector), doT.template($api.html($api.dom('[template="'+template+'"]')))(data||''));
				try{
					api.parseTapmode();
					if(lazyload && $(lazyload_selector || 'div.img') && $(lazyload_selector || 'div.img').lazyload){
						$(lazyload_selector || 'div.img').lazyload({
					      effect : "fadeIn",
					      container: $(lazyload_container || selector)
					    });
					}
				}catch(e){
					
				}
			},
			prepend: function(selector, template, data,lazyload,lazyload_container,lazyload_selector){
				$api.prepend($api.dom(selector), doT.template($api.html($api.dom('[template="'+template+'"]')))(data||''));
				try{
					api.parseTapmode();
					if(lazyload && $(lazyload_selector || 'div.img') && $(lazyload_selector || 'div.img').lazyload){
						$(lazyload_selector || 'div.img').lazyload({
					      effect : "fadeIn",
					      container: $(lazyload_container || selector)
					    });
					}
				}catch(e){
					
				}
			}
		};
		window.T = t;
	}(window);


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	/*
	 * 创建于2015-05-23
	 * DB模块封装了手机常用数据库sqlite的增删改查语句
	 * 可实现数据的本地存储，极大的简化了数据归档问题
	 *--------------------------------------------------
	 * 更新于：2016-07-27	23:04
	*/

	(function(window){
		var d = {
			init: function(args){
				/**
				 * 打开本地数据库
				 * @param  	{string} 		name			数据库名称，统一使用[CONFIG.DB.NAME]
				 * @param		{string}		path			数据库所在路径，不传时使用默认创建的路径。
				 *                         				支持 fs://、widget://等协议（如fs://user.db）
				 *                         				统一使用['fs://db/'+ CONFIG.DB.NAME +'.db']
				 * @param		{function}	success		初始化完毕后的回调
				 */
				var db = api.require('db'),
						self = this;

				db.openDatabase({
					name: args ? args.name || CONFIG.DB.NAME : CONFIG.DB.NAME,
					path: 'fs://db/'+ CONFIG.DB.NAME + '_' +  CONFIG.VERSION +'.db'
				}, function(ret, err){
					if(ret.status){
						/*数据库	 打开/创建  成功
						 * 创建主表
						 */
						self.createTable({
							table: CONFIG.DB.MAIN_TABLE,
							field: [
								'`key` varchar(100)',
								'`value` text'
							],
							success: function(){
								if(args && 'function' === typeof args.success){
									args.success();
								}
							}
						});
					}else{
						if(CONFIG.DEBUG && CONFIG.DB.DEBUG){
							var msg;
							if(err.msg){
								msg = err.msg;
							}else{
								msg = 'open database error';
							}
							api.alert({
								title: 'openDatabase提示信息',
								msg: msg
							});
						}
					}
				});
			},

			closeDatabase: function(args){
				/**
				 * 关闭数据库
				 * @param		{string}			name				数据库名称，统一使用[CONFIG.DB.NAME]
				 * @param		{function}		success			成功的回调
				 */
				var db = api.require('db'),
						self = this;

				db.closeDatabase({
					name: args ? args.name || CONFIG.DB.NAME : CONFIG.DB.NAME
				}, function(ret, err){
					if(ret.status){
						if(typeof args.success === 'function'){
							args.success();
						}
					}else{
						if(CONFIG.DEBUG && CONFIG.DB.DEBUG){
							api.alert({
								title: 'closeDatabase提示信息',
								msg: err.msg
							});
						}
					}
				});
			},

			createTable: function(args){
				/**
				 * 创建数据表
				 * @param		{string}			table				表名，统一使用[CONFIG.DB.MAIN_TABLE]
				 * @param		{array}				field				数据表的字段
				 * @param		{function}		success			成功的回调
				 */
				var self = this,
						sql = 'create table if not exists ' + args.table + '(' + args.field.join() + ')';
				this.executeSql({
					sql: sql,
					success: function(){
						if('function' === typeof args.success){
							args.success();
						}
					}
				});
			},

			executeSql: function(args) {
				/**
				 * 执行 sql
				 * @param		{string}			dbName			数据库名，统一使用[CONFIG.DB.NAME]
				 * @param		{string}			sql					SQL语句
				 * @param		{function}		success			成功的回调
				 */
				var db = api.require('db');
				db.executeSql({
					name: args.dbName || CONFIG.DB.NAME,
					sql: args.sql
				}, function(ret, err) {
					// alert('executeSql:'+$api.jsonToStr(ret||err));
					if (ret.status) {
						/*执行SQL成功*/
						if('function' === typeof args.success){
							args.success();
						}
					} else {
						/*执行SQL失败*/
						if(CONFIG.DEBUG && CONFIG.DB.DEBUG){
							var msg;
							if(err.msg){
								msg = err.msg;
							}else{
								msg = 'execute sql error';
							}
							api.alert({
								title: 'executeSQL提示信息',
								msg: msg
							});
						}
					}
				});
			},

			selectSql: function(args){
				/**
				 * 执行查询sql命令
				 *
				 * @param		{string}		dbName		数据库名，统一使用[CONFIG.DB.NAME]
				 * @param		{string}		sql				查询SQL语句
				 * @param		{function}	success		成功回调
				 * success
				 * @return	{array}			data			查询结果数据
				 *
				 */
				var db = api.require('db');
				db.selectSql({
					name: args.dbName || CONFIG.DB.NAME,
					sql: args.sql
				}, function(ret, err){
					if(ret.status){
						/*查询sql成功*/
						if('function' === typeof args.success){
							/*ret.data为查询结果(array)*/
							args.success(ret.data);
						}
					}else{
						/*查询sql失败*/
						if(CONFIG.DEBUG && CONFIG.DB.DEBUG){
							var msg;
							if(err.msg){
								msg = err.msg;
							}else{
								msg = 'select sql error';
							}
							api.alert({
								title: 'selectSQL提示信息',
								msg: msg
							});
						}
					}
				});
			},

			setValue: function(args){
				/**
				 * 缓存指定接口的数据到本地
				 * 根据指定key值获取value，每个key值由ctrl与fn组成，即对应一个接口，
				 * 所以，value的值就是该接口的缓存数据
				 *
				 * @param		{string}		key			键名
				 * @param		{string}		value		键值
				 * @param		{number}		flag		根据此值执行insert(0)或update(1)操作
				 * @param		{function}	success	成功的回调
				 *
				 */
				var self = this,
						updateSql = 'update ' + CONFIG.DB.MAIN_TABLE + " set value='" + args.value + "' where key='" + args.key + "'";

				if(args.flag){
					this.executeSql({
						sql: updateSql,
						success: args.success
					});
				}else{
					this.insert({
						data: {
							key: args.key,
							value: args.value
						}
					}, args.success);
				}
			},

			getValue: function(args){
				/**
				 * 获取对应接口的缓存数据
				 * 根据指定key值获取value，每个key值由ctrl与fn组成，即对应一个接口，
				 * 所以，value的值就是该接口的缓存数据
				 *
				 * @param		{string}			key				键名
				 * @param 	{function}		success		成功回调
				 *
				 * @return	{string}			value			对应键名的键值
				 */

				var self = this,
						sql = 'select * from ' + CONFIG.DB.MAIN_TABLE + ' where key="' + args.key + '"';
				this.selectSql({
					sql: sql,
					success: function(data){
						if(typeof args.success === 'function'){
							if(data.length > 0){
								args.success(data[0].value);
							}else{
								//返回空，只为更方便调用者判断
								args.success('');
							}
						}
					}
				});
			},

			insert: function(args){
				/**
				 * 数据插入
				 *
				 * @param		{string}		table			数据主表的名称，统一使用[CONFIG.DB.MAIN_TABLE]
				 * @param		{object}		data			将被插入数据表的数据，即接口返回的新数据将初次插入数据表
				 * @param		{function}	success		成功的回调
				 */
				var sql = 'insert into ' + (args.table || CONFIG.DB.MAIN_TABLE) + ' (' +
									(function(){
										var k = '', t;
										for(var key in args.data){
											k = k + key + ',';
										}
										t = k.slice(0, -1);
										return t;
									})() + ')' + ' values(' +
									(function(){
										var v = '';
										for(var key in args.data){
											v = v + "'" + args.data[key] + "',";
										}
										return v.slice(0, -1);
									})() + ')';
				this.executeSql({
					sql: sql,
					success: args.success
				});
			}

		};



		/*事务*/
		d.transaction = function(dbName, operation, callback){
			var db = api.require('db');
			db.transaction({
				name: dbName,
				operation: operation
			}, function(ret, err){
				if(ret.status){
					/*事务操作成功*/
					if('function' === typeof callback){
						callback();
					}
				}else{
					/*事务操作失败*/
					if(CONFIG.DB.DEBUG){
						var msg;
						if(err.msg){
							msg = err.msg;
						}else{
							msg = 'transaction operation error';
						}
						api.alert({
							title: '提示信息',
							msg: msg
						});
					}
				}
			});
		};


		window.DB = d;
	})(window);


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*封装了各种常用的工具函数
	 * 2015-09-15
	 */

	/**
	 * @author					一元杀网络
	 * @description			封装了各种常用的工具函数
	 * @namespace				Tool
	 * @version					1.0.0
	 */

	! function(window) {
		var tl = {
			/** documented as Tool.initApp */
			initApp: function(args) {
				/**
				 * 初始化APP，即打开app后的第一个展现在用户面前的window，称为首页
				 * 首页的展现分两种模式：
				 * 	1.openWin(默认)
				 *  2.openDrawerLayout抽屉式侧滑window
				 *
				 * @method	initApp
				 * @memberof Tool
				 * @param		{object}	args								参数对象
				 * @param		{string}	args.displayType		展现的模式：win[默认] | drawerLayout
				 * @param		{string}	args.name						首页自定义名称，默认：Init
				 * @param		{string}	args.fileName				首页的 html 文件名
				 * @param		{object}	args.animation			动画参数，默认：{type: 'fade'}，具体内部参数说明参考apicloud文档
				 * @param		{object}	args.leftPane				左边侧滑 window，具体内部参数说明参考apicloud文档
				 * @param		{object}	args.rightPane			右边侧滑 window，具体内部参数说明参考apicloud文档
				 */

				if (args && args.displayType == 'drawerLayout') {
					//首页以openDrawerLayout打开
					api.openDrawerLayout({
						name: args ? args.name ? args.name : 'Init' : 'Init',
						url: api.wgtRootDir + '/zhibo/' + (args ? args.fileName ? args.fileName : 'init' : 'init') + '.html',
						rect: {
							x: 0,
							y: 0,
							w: 'auto',
							h: 'auto'
						},
						bounces: false,
						slidBackEnabled: false,
						animation: args.animation || {
							type: 'fade'
						},
						leftPane: args.leftPane || '',
						rightPane: args.rightPane || '',
						reload: true
					});
				} else {
					//首页以openWin方法打开
					api.openWin({
						name: args ? args.name ? args.name : 'Init' : 'Init',
						url: api.wgtRootDir + '/zhibo/' + (args ? args.fileName ? args.fileName : 'init' : 'init') + '.html',
						rect: {
							x: 0,
							y: 0,
							w: 'auto',
							h: 'auto'
						},
						bounces: false,
						slidBackEnabled: false,
						reload: false,
						animation: args ? args.animation || {
							type: 'fade'
						} : {
							type: 'fade'
						}
					});
				}
			},
			exitApp: function() {
				/**
				 * app退出逻辑，一般在 Init 首页设置
				 * @method	exitApp
				 * @memberof Tool
				 */
				api.addEventListener({
					name: 'keyback'
				}, function(ret, err) {
					api.toast({
						msg: '再按一次返回键退出',
						duration: 2000,
						location: 'bottom'
					});

					api.addEventListener({
						name: 'keyback'
					}, function(ret, err) {
						api.closeWidget({
							silent: true
						});
					});

					setTimeout(function() {
						tl.exitApp();
					}, 2000)
				});
			},
			makeCall: function(phone) {
				/**
				 * 拨打电话
				 * @method	makeCall
				 * @memberof Tool
				 * @param		{string}	phone		电话号码
				 */
				if (phone) {
					api.call({
						type: 'tel_prompt',
						number: phone
					});
				}
			},
			toast: function(msg) {
				/**
				 * 弹出一个定时自动关闭的提示框
				 * @method	toast
				 * @memberof Tool
				 * @param		{string}	msg		提示信息
				 */
				api.toast({
					msg: msg,
					duration: 2000,
					location: 'middle'
				});
			},
			removeHTMLTag: function(htmlCode) {
				/**
				 * 过滤 html 标签
				 * @method	removeHTMLTag
				 * @memberof Tool
				 * @param		{string}	htmlCode		html代码字符串
				 * @return	{string}	已过滤掉html代码的字符串
				 */
				htmlCode = htmlCode.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
				htmlCode = htmlCode.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
				//htmlCode = htmlCode.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
				htmlCode = htmlCode.replace(/&nbsp;/ig, ''); //去掉&nbsp;
				return htmlCode;
			},
			toHTML: function(str) {
				/**
				 * 将字符串中的实体字符转换为 html 代码
				 * @method	toHTML
				 * @memberof Tool
				 * @param		{string}	str		带有实体字符的 html 代码字符串
				 * @return	{string}	html 代码字符串
				 */
				if (str) {
					var regx = /&[l,g]t;|&quot;|&nbsp;|&amp;#39;|&amp;/gm,
						_html = str.replace(regx, function(match) {
							switch (match) {
								case '&amp;#39;':
									return '\'';
								case '&lt;':
									return '<';
								case '&gt;':
									return '>';
								case '&quot;':
									return '"';
								case '&nbsp;':
									return '';
								case '&amp;':
									return '&';
							}
						});
					return _html;
				} else {
					return '';
				}
			},
			imageCompressByQiNiu: function(url, mode, w, h) {
				/**
				 * 七牛图片压缩
				 * 移动端：/0/w/<Width>/h/<Height>
				 * PC端：/2/w/<Width>/h/<Height>
				 * @see 具体文档说明：{@link http://developer.qiniu.com/code/v6/api/kodo-api/image/imageview2.html}
				 *
				 * @method	imageCompressByQiNiu
				 * @memberof Tool
				 * @param		{string}	url		图片在七牛存储空间上的地址
				 * @param		{number}	mode	压缩模式
				 * @param		{number}	w			限定缩略图最大的宽度
				 * @param		{number}	h			限定缩略图最大的高度
				 * @return	{string}	图片压缩后的地址
				 */
				var str ='';
				if(url!=null&&url!=undefined){
				var str = url.substr(-10);
				}
				if(str == 'avatar.jpg'){
					return url;
				}else{
					return url + '?imageView2/' + mode + '/w/' + w + '/h/' + h;
				}
			},
			refreshMoney: function(money, flag) {
				/*更新余额
				 * flag：0扣除金额；1增加金额
				 */
				var memberInfo = $api.getStorage('memberInfo');
				if (flag) {
					memberInfo.money = parseFloat(memberInfo.money) + parseFloat(money);
				} else {
					memberInfo.money = parseFloat(memberInfo.money) - parseFloat(money);
				}
				$api.setStorage('memberInfo', memberInfo);
				api.sendEvent({
					name: 'refreshMoney'
				});
			},
			refreshIntegral: function(integral, flag) {
				/*更新积分
				 * flag：0扣除利币；1增加利币
				 */
				var memberInfo = $api.getStorage('memberInfo');
				if (flag) {
					memberInfo.integral = parseInt(memberInfo.integral) + parseInt(integral);
				} else {
					memberInfo.integral = parseInt(memberInfo.integral) - parseInt(integral);
				}
				$api.setStorage('memberInfo', memberInfo);
				api.sendEvent({
					name: 'refreshIntegral'
				});
			},
			getSomePic: function(args) {
				/*获取多张图片
				 */
				this.getSomeMedia(args);
			},
			getSomeMedia: function(args) {
				/**
				 * 获取多张图片或视频的回调函数
				 * @callback	getSomeMediaCallback
				 * @param		{object}		ret
				 * @param		{object[]}	ret.list - 返回选定的资源信息数组
				 * @param		{string}		ret.list[].path - 资源路径，返回资源在本地的绝对路径
				 * @param		{string}		ret.list[].thumbPath - 缩略图路径，返回资源缩略图在本地的绝对路径
				 * @param		{string}		ret.list[].suffix - 文件后缀名，如：png，jpg, mp4
				 * @param		{number}		ret.list[].size - 资源大小，单位（Bytes）
				 * @param		{string}		ret.list[].time - 资源创建时间，格式：yyyy-MM-dd HH:mm:ss
				 */
				/**
				 * 获取多张图片或视频
				 * @method	getSomeMedia
				 * @memberof Tool
				 * @param  {object}    args - 参数对象
				 * @param  {number}    [args.max=5] - 最多可选的图片数
				 * @param  {object}    [args.sort] - 图片排序方式
				 * @param  {string}    [args.sort.key=time] - 按图片创建时间排序
				 * @param  {string}    [args.sort.order=desc] - 排序方式：desc(新->旧) | asc(旧->新)
				 * @param  {string}    [args.type=picture] - 返回的资源种类：all | picture | video
				 * @param  {object}    [args.scrollToBottom] - 打开媒体资源界面后间隔一段时间开始自动滚动到底部设置
				 * @param  {number}    [args.scrollToBottom.intervalTime=-1] - 打开媒体资源界面后间隔的时间开始自动滚动到底部，单位秒（s），小于零的数表示不滚动到底部
				 * @param  {boolean}   [args.scrollToBottom.anim=true] - 滚动时是否添加动画，android 平台不支持动画效果
				 * @param  {boolean}   [args.transPath=false] - 是否将相册图片地址转换为可以直接使用的本地路径地址（临时文件夹的绝对路径）
				 * @param  {getSomeMediaCallback}  args.success - 成功获取图片的回调
				 */
				var obj = api.require('UIMediaScanner'),
					sort = {
						key: 'time',
						order: 'desc'
					},
					scrollToBottom = {
						intervalTime: -1,
						anim: true
					};
				obj.open({
					type: typeof args === 'object' ? args.type || 'picture' : 'picture',
					column: 4,
					classify: true,
					max: typeof args === 'object' ? args.max || 5 : 5,
					sort: args.sort || sort,
					texts: {
						stateText: '已选择*项',
						cancelText: '取消',
						finishText: '完成'
					},
					styles: {
						bg: '#fff',
						mark: {
							icon: '',
							position: 'bottom_left',
							size: 20
						},
						nav: {
							bg: '#eee',
							stateColor: '#000',
							stateSize: 18,
							cancelBg: 'rgba(0,0,0,0)',
							cancelColor: '#000',
							cancelSize: 18,
							finishBg: 'rgba(0,0,0,0)',
							finishColor: '#000',
							finishSize: 18
						}
					},
					scrollToBottom: args.scrollToBottom || scrollToBottom,
					exchange: true
				}, function(ret) {
					var index = 0; //记录图片索引

					//闭包：将相册图片地址转换为可以直接使用的本地路径地址（临时文件夹的绝对路径）
					function transPath(path) {
						obj.transPath({
							path: path
						}, function(ret2, err) {
							if (ret) {
								ret.list[index].path = ret2.path;
								index += 1;
								if (ret.list.length > index) {
									//继续转换下一张图片路径
									transPath(ret.list[index].path);
								} else {
									//图片路径转换结束，重置索引
									index = 0;
									//执行回调，返回转换路径后的图片数组
									args.success(ret)
								}
							}
						});
					}

					if (ret.list instanceof Array && ret.list.length != 0) {
						if (args.transPath) {
							transPath(ret.list[index].path);
						} else {
							args.success(ret)
						}
					}
				});
			},
			getOnePic: function(args) {
				/*获取单张图片
				 */
				this.getOneMedia(args);
			},
			getOneMedia: function(args) {
				/**
				 * 通过系统相册或拍照获取单张图片的回调函数
				 * @callback	getOneMediaCallback
				 * @param	{object}	ret
				 * @param	{string}	ret.data - 图片路径
				 * @param	{string}	ret.base64Data - base64数据，destinationType为base64时返回
				 * @param	{number}	ret.number - 视频时长（数字类型）
				 */

				/**
				 * 通过系统相册或拍照获取单张图片
				 * @method   getOneMedia
				 * @memberof   Tool
				 * @param  {object}      args
				 * @param  {string}      [args.mediaValue=pic] - 媒体类型: pic | video
				 * @param  {string}      [args.destinationType=url] - 返回图片数据类型: url | base64
				 * @param  {string}      [args.videoQuality=medium] - 视频质量(仅ios): low | medium | high
				 * @param  {string}      [args.sourceType=library] - 图片源类型: library | camera
				 * @param  {string}      [args.encodingType=jpg] - 返回图片类型: jgp | png
				 * @param  {number}      [args.quality=50] - 图片质量，只针对jpg格式图片(0-100整数)
				 * @param  {boolean}     [args.allowEdit=false] - 是否可以选择图片后进行编辑，支持iOS及部分安卓手机
				 * @param  {getOneMediaCallback}    args.success - 成功获取多媒体资源的回调
				 */
				api.getPicture({
					mediaValue: args.mediaValue || 'pic',
					videoQuality: args.videoQuality || 'medium',
					sourceType: args.sourceType || 'library',
					encodingType: args.encodingType || 'jpg',
					destinationType: args.destinationType || 'url',
					quality: args.quality || 100,     //头像图片质量 0－100 ，原为50，现在改为100 －－WU
					allowEdit: typeof args.allowEdit === 'boolean' ? args.allowEdit : false
				}, function(ret, err) {
					if (ret) {
						args.success(ret);
					}
				});
			},
			actionSheet: function(args) {
				/**
				 * actionSheet点击按钮后的回调
				 * @callback	actionSheetCallback
				 * @param	{number}	buttonIndex	- 返回按钮点击序号，从1开始
				 */

				/**
				 * 底部弹出框
				 * @method actionSheet
				 * @memberof Tool
				 * @param  {object}    args
				 * @param  {string}    [args.title] - 标题
				 * @param  {string}    [args.cancelTitle=取消] - 取消按钮标题
				 * @param  {string}    [args.destructiveTitle] - （可选项）红色警示按钮标题，一般用于做一些删除之类操作
				 * @param  {string[]}     [args.buttons] - 按钮
				 * @param  {object}    [args.style=actionSheetStyle] - 样式设置，不传时使用默认样式
				 * @param  {actionSheetCallback}  args.success - 点击按钮后的回调
				 * @example
				 * Tool.actionSheet({
				 *   buttons: ['按钮1', '按钮2'],
				 *   success: function(buttonIndex){
				 *     switch(buttonIndex){
				 *       case 1:
				 *         //code
				 *         break;
				 *     }
				 *   }
				 * })
				 */
				var actionSheetStyle = {
					layerColor: 'rgba(0, 0, 0, 0.3)',
					itemNormalColor: '#F1F1F1',
					itemPressColor: '#007AFF',
					fontNormalColor: '#007AFF',
					fontPressColor: '#F1F1F1'
				};
				api.actionSheet({
					title: args.title || '',
					cancelTitle: args.cancelTitle || '取消',
					buttons: args.buttons,
					destructiveTitle:args.destructiveTitle,
					style: args.style || actionSheetStyle
				}, function(ret, err) {
					args.success(ret.buttonIndex);
				});
			},
			parseDate: function(timestamp) {
				/**
				 * 将时间戳转换为年、月、日、时、分、秒
				 * @method	parseDate
				 * @memberof	Tool
				 * @param		{(number|string)}	timestamp	- 时间戳
				 * @return	{object}	返回的对象包括：year、month、date、hour、minute、second
				 */
				timestamp = timestamp.toString();
				if (timestamp.length == 10) {
					/*PHP返回的时间戳长度为10，JS要求的长度必须13
					 * 若长度不足，则以0补充
					 */
					timestamp = parseInt(timestamp) * 1000;
				}
				var _d = new Date(timestamp);
				return {
					year: _d.getFullYear(),
					month: _d.getMonth() + 1,
					date: _d.getDate(),
					hour: _d.getHours(),
					minute: _d.getMinutes(),
					second: _d.getSeconds(),
				};
			},
			onCall: function() {
				var voiceMag = api.require('voiceMag');
				voiceMag.onCall(); //改为听筒播放音频
			},
			onNormal: function() {
				var voiceMag = api.require('voiceMag');
				voiceMag.onNormal(); //使用扩音器播放音频
			},
			startPlay: function(path) {
				//播放语音
				var voiceMag = api.require('voiceMag');
				voiceMag.startPlay({
					path: path
				});
			},
			stopPlay: function() {
				var voiceMag = api.require('voiceMag');
				voiceMag.stopPlay();
			},
			openPhotoBrowser: function(args) {
				/**
				 * 打开一个图片浏览器，可以 frame（全屏）的形式打开并添加到主窗口上
				 * 开发者可通过 openFrame 打开多个 frame，来自定义上下导航条的样式及其功能。
				 * 本方法支持横竖屏。加载的网络图片会被缓存到本地
				 *
				 *args 内部结构
				 * images 要读取的图片路径组成的数组，图片路径支持fs://、widget://、http://协议
				 * activeIndex[0] 当前要显示的图片在图片路径数组中的索引
				 * placeholderImg 当加载网络图片时显示的占位图路径，要求本地图片路径(widget://、fs://)
				 * bgColor['#000'] 图片浏览器背景色，支持rgb、rgba、#
				 * show 打开浏览器并显示的回调
				 * change 用户切换图片的回调
				 * click 用户单击图片浏览器的回调
				 * loadImgSuccess 网络图片下载成功的回调事件的回调
				 * longPress 用户长按图片事件的回调
				 *
				 *@return
				 * eventType 交互事件类型，取值范围如下：
				 * 		show：打开浏览器并显示
				 * 		change：用户切换图片
				 * 		click：用户单击图片浏览器
				 * 		loadImgSuccess：网络图片下载成功的回调事件
				 * 		longPress：用户长按图片事件
				 * index 数字类型；当前图片在图片路径数组中的索引
				 */
				var photoBrowser = api.require('photoBrowser');
				photoBrowser.open({
					images: args.images,
					activeIndex: args.activeIndex || 0,
					placeholderImg: args.placeholderImg || '',
					bgColor: args.bgColor || '#000'
				}, function(ret, err) {
					switch (ret.eventType) {
						case 'show':
							if (typeof args.show === 'function') {
								args.show(photoBrowser, ret.index);
							}
							break;
						case 'change':
							if (typeof args.change === 'function') {
								args.change(photoBrowser, ret.index);
							}
							break;
						case 'click':
							if (typeof args.click === 'function') {
								args.click(photoBrowser, ret.index);
							}
							break;
						case 'loadImgSuccess':
							if (typeof args.loadImgSuccess === 'function') {
								args.loadImgSuccess(photoBrowser, ret.index);
							}
							break;
						case 'longPress':
							if (typeof args.longPress === 'function') {
								args.longPress(photoBrowser, ret.index);
							}
							break;
					}
				});
			},
			cardReader: function(callback) {
				/*cardReader封装了PayPal的cardio识别库，
				 * 用户只需用摄像头扫描信用卡即可实现卡号的输入
				 *
				 *@ret
				 * 	cardNum 卡号
				 * 	expiryMonth 过期日期的月
				 * 	expiryYear 过期日期的年
				 * 	cvv cvv号
				 */
				var obj = api.require('cardReader');
				obj.open(function(ret, err) {
					if (ret.status) {
						callback(ret);
					}
				});
			},
			shareAction: function(args) {
				/*shareAction 是一个调用系统分享功能的模块，通过该模块能够分享一些最常见的文本，图片信息等
				 *
				 *args 内部结构
				 * text 要分享的文本信息
				 * type 分享文件的类型: text/image/audio/file
				 * path 分享文件的路径，要求本地路径(fs://，widget://)。Android 平台不支持 widget:// 路径
				 */
				var sharedModule = api.require("shareAction");
				sharedModule.share({
					text: args.text,
					type: args.type,
					path: args.path
				});
			},
			formatCurrency: function(num) {
				/**
				 * 将数值四舍五入(保留2位小数)后格式化成金额形式
				 * @method 		formatCurrency
				 * @memberof	Tool
				 * @param			{number}		num			原始金额数值
				 * @return		{float}			已格式化的金额数值
				 */
				num = num.toString().replace(/\$|\,/g, '');
				if (isNaN(num))
					num = "0";
				sign = (num == (num = Math.abs(num)));
				num = Math.floor(num * 100 + 0.50000000001);
				cents = num % 100;
				num = Math.floor(num / 100).toString();
				if (cents < 10)
					cents = "0" + cents;
				for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
					num = num.substring(0, num.length - (4 * i + 3)) + ',' +
					num.substring(num.length - (4 * i + 3));
				return (((sign) ? '' : '-') + num + '.' + cents);
			},
			getCacheSize: function(args) {
				/**
				 * 计算缓存大小
				 * @method	getCacheSize
				 * @memberof	Tool
				 * @param		{object}		args
				 * @param		{string}		args.container		显示缓存大小的节点的选择器标识符
				 */
				api.getCacheSize({
					sync: false
				}, function(ret, err) {
					var size = ret.size / Math.pow(1024, 2);
					$api.text($api.dom(args.container), (size ? size.toFixed(2) : 0) + 'MB');
				});
			},
			clearCache: function(args) {
				/**
				 * 清除缓存后的回调
				 * @callback		clearCacheCallback
				 */

				/**
				 * 清除缓存
				 * @method	 	clearCache
				 * @memberof	Tool
				 * @param			{object}								args
				 * @param			{string}								args.container - 清除缓存后，重新显示缓存大小的节点的选择器标识符
				 */
				var self = this;
				api.confirm({
					title: '提示信息',
					msg: '你确定要清除缓存吗？',
					buttons: ['取消', '确定']
				}, function(ret, err) {
					if (ret.buttonIndex == 2) {
						var fs = api.require('fs');
						api.showProgress({
							title: '处理中...'
						});
						//关闭本地数据库
						DB.closeDatabase({
							name: CONFIG.DB.NAME,
							success: function() {
								//删除数据库文件夹
								fs.rmdir({
									path: 'fs://db'
								}, function(ret, err) {
									if (ret.status) {
										//重新初始化数据库
										DB.init();
										//清除apicloud产生的缓存
										api.clearCache({
											timeThreshold: 0
										}, function(ret, err) {
											api.getCacheSize({
												sync: false
											}, function(ret, err) {
												api.hideProgress();
												//重新计算缓存大小
												self.getCacheSize({
													container: args.container
												});
												api.toast({
													location: 'middle',
													msg: '缓存清理完毕'
												});
											});
										});
									} else {
										api.hideProgress();
										api.toast({
											location: 'middle',
											msg: '缓存清理失败'
										});
									}
								});
							}
						});
					}
				});
			},
			loadImageAsync: function(url) {
				return new Promise(function(resolve, reject) {
					var image = new Image();

					image.onload = function() {
						resolve(image);
					};

					image.onerror = function() {
						reject(new Error('Could not load image at ' + url));
					};

					image.src = url;
				});
			}
		};
		window.Tool = tl;
	}(window);

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
	 * 数据异步请求模块3
	 * 创建于2016-9-16
	 */

	 /**
	  * @author					一元杀网络
	  * @description			数据异步请求模块3
	  * @namespace				ajax
	  * @version					3.0.0
	  */
	(function(window){
		var ajax = {
			args: '',
			baseUrl: '',
			method: 'post',
			timeout: 30,
			cache: true,
			report: false,
			dataType: 'json',
			showLoading: true,
			returnAll: true,
			data: '',
			before: function(args){
				/**
				 * 发起异步请求之前的逻辑处理
				 */
				if(!args.hideLoading){
					var code = ''+
					'<div class="null flex-box" style="z-index: 1;">'+
						'<div class="flex-1">'+
							'加载中...'+
						'</div>'+
					'</div>';
					try{
						if(args.container){
							$api.html($api.dom(args.container), code);
						}else{
							$api.html($api.dom('#main'), code);
						}
					}catch(e){

					}
				}
				if(!!args.showProgress){
					api.showProgress({
						title: args.showProgress.title || '加载中...',
						text: args.showProgress.text || '请稍后...',
						modal: typeof args.showProgress.modal === 'boolean' ? args.showProgress.modal : true
					});
				}
			},
			success: function(ret){
				if(parseInt(ret.statusCode) == 200){
					if(this.args.showProgress){
						api.hideProgress();
					}
					switch(parseInt(ret.body.status)){
						case 200:
							//自家服务器成功返回数据
							this.serverStatus_200(ret);
							break;
						case 404:
							//自家服务器拒绝访问，可能原因：参数传错/传漏
							this.serverStatus_404(ret);
							break;
						case 403:
							//因权限不足，自家服务器拒绝访问，可能原因：登录信息过期/在其他端登录
							this.serverStatus_403(ret);
							break;
					}
					if(this.args.loadType){
						this.loadType();
					}
				}
			},
			serverStatus_200: function(ret){
				//自家服务器返回状态码为200
				var self = this,
						jsonText,
						ct = ret.body.content,
						convertField,
						regx = /'/gm;
				if(this.args.cache && this.args.cache.key){
					//缓存数据到本地数据库
					convertField = this.args.cache.convertField;
					if(convertField){
						//处理需要进行转义的字段
						convertField.forEach(function(value, index){
							var arrangement = value.split('.'),
									field = ct,
									i;
							if(arrangement.length == 1){
								field[arrangement[0]] = field[arrangement[0]].replace(regx, function(match){
									switch(match){
										case "'":
											return "&apos;";
									}
								});
							}else{
								for(i = 0;i<arrangement.length;i++){
									if(i == arrangement.length - 1){
										field[arrangement[i]] = field[arrangement[i]].replace(regx, function(match){
											switch(match){
												case "'":
													return "&apos;";
											}
										});
									}else{
										field = field[arrangement[i]];
									}
								}
							}
						});
					}
					jsonText = JSON.stringify(ret.body.content);
	//					console.log(jsonText)
					/*缓存服务器数据*/
					if(this.localCache != jsonText){
						/*对比数据*/
						DB.setValue({
							key: self.args.cache.key,
							value: jsonText,
							flag: self.localCache ? 1 : 0
						});
					}
				}
				if(typeof this.args.success == 'function'){
					if(this.args.server){
						this.args.success(ret.body, this.localCache);
					}else{
						this.args.success(ret.body.content, this.localCache);
					}
				}
			},
			serverStatus_404: function(ret){
				//自家服务器返回状态码为404
				if(typeof this.args._404 === 'function'){
					this.args._404(ret.body.msg);
				}else{
					if(this.args.showError){
						if(ret.body.msg){
							api.toast({
								msg: ret.body.msg,
								location: 'bottom',
								duration: 3000
							});
						}else{
							api.toast({
								msg: '服务器拒绝访问~',
								location: 'bottom',
								duration: 2000
							});
						}
					}
				}
			},
			serverStatus_403: function(ret){
				//自家服务器返回状态码为403
				if(typeof this.args._403 === 'function'){
					this.args._403();
				}else{
					var logints = $api.getStorage('logints'),
							nowts = new Date().getTime();
					/*验证登录时间戳*/
					if(logints){
						if('string' === typeof logints){
							logints = parseInt(logints);
						}
						if(nowts-logints < 1000*60*60*24*30){
							api.alert({
								title: '提示信息',
								msg: '该账号已在另一设备上登录，你无法进行相关操作，请重新登录'
							}, function(ret,err){
								relogin();
							});
						}else{
							api.alert({
								title: '提示信息',
								msg: '你的账户信息已过期，请重新登陆'
							}, function(ret,err){
								relogin();
							});
						}
					}else{
						api.alert({
							title: '提示信息',
							msg: '请先登录'
						}, function(ret, err){
							relogin();
						});
					}
				}
			},
			loadType: function(){
				//数据异步请求完成后，页面UI后续处理
				switch(this.args.loadType){
					case 1:
						/*去除下拉刷新样式*/
						api.refreshHeaderLoadDone();
						break;
					case 2:
						/*scrolltobottom事件, 去除“加载中...”UI*/
						$api.remove($api.dom('.load-more'));
						break;
				}
			},
			error: function(err){
				if(err){
					console.log(JSON.stringify(err, null, 2))
				}
				//异步请求失败
				api.hideProgress();
				if(this.args.loadType){
					this.loadType();
				}
				var msg =
						(typeof err.statusCode === 'undefined' ? '' : err.statusCode + '/') +
						(typeof err.code === 'undefined' ? '' : err.code + '-') +
						(err.msg ? err.msg : '');
				/*
				api.toast({
					msg: msg || 'unknow error',
					location: 'top',
					duration: 3000
				});
				*/
	//			switch(parseInt(err.statusCode)){
	//				case 0:
	//					//异步请求超时，或网络有问题
	//					this.errorStatusCode_0(err);
	//					break;
	//				case 500:
	//					//服务器遇到了意料不到的情况，不能完成客户的请求
	//					this.errorStatusCode_500(err);
	//					break;
	//			}
			},
			errorStatusCode_0: function(err){
				//异步请求超时，或网络有问题
				switch(parseInt(err.code)){
					case 0:
						//网络有问题
						api.toast({
							msg: '连接错误，请检查网络或者请求配置是否正确',
							location: 'top'
						});
						break;
					case 1:
						//请求超时
						api.toast({
							msg: '网络请求超时，请稍后重试',
							location: 'top'
						});
						break;
				}
			},
			errorStatusCode_500: function(err){
				//服务器遇到了意料不到的情况，不能完成客户的请求

			},
			get: function(args){
				/**
				 * 成功返回缓存数据的回调处理
				 * @callback   getCacheCallback
				 * @param    {object}    cache - 对应接口的本地缓存对象
				 *
				 * 服务器成功返回数据的回调处理
				 * @callback   successCallback
				 * @param    {object}    ct - 对应接口主内容
				 * @param    {object}    cache - 对应接口的本地缓存数据
				 *
				 * 服务器拒绝访问的回调处理
				 * @callback   _404Callback
				 *
				 * 权限不足的回调处理
				 * @callback   _403Callback
				 */

				 /**
				  * 异步请求方法
				  * @method     get
				  * @memberof   ajax
				  * @param      {object}                args
				  * @param      {string}                args.ctrl - 请求接口
				  * @param      {string}                args.fn - 接口方法
				  * @param      {object}                args.cache - 是否使用缓存机制(db模块)
				  * @param      {string}                args.cache.key - 缓存的键值
				  * @param      {getCacheCallback}      args.cache.getCache - 成功返回缓存数据的回调处理
				  * @param      {number}                args.timeout - 异步请求超时设定
				  * @param      {string}                [args.dataType=json] - 数据返回格式
				  * @param      {boolean}               [args.report=false] - 返回请求进度
				  * @param      {string}                args.tag - ajax标识，用于种植异步
				  * @param      {object}                args.data - 接口方法参数
				  * @param      {object}                args.data.values - 以表单方式提交参数(JSON对象)
				  * @param      {object}                args.showProgress - 是否使用菊花进度UI
				  * @param      {string}                [args.showProgress.title=加载中...] - 标题
				  * @param      {string}                [args.showProgress.text=请稍后...] - 内容
				  * @param      {boolean}               [args.showProgress.modal=true] - 是否模态，模态时整个页面将不可交互
				  * @param      {string}                [args.container=#main] - 模板渲染的父节点
				  * @param      {number}                [args.loadType=0] - 数据加载类型:
				  *                                                       0：不填该参数，不做任何操作
				  *                                                       1：下拉刷新
				  *                                                       2：上拉加载更多
				  * @param      {boolean}               [args.hideLoading=false] - 是否隐藏"加载中..."占位代码
				  * @param      {boolean}               [args.showError=false] - 请求失败后(404)，是否显示错误信息
				  * @param      {successCallback}       args.success - 200(服务器成功返回数据)回调处理
				  * @param      {_404Callback}          args._404 - 404(服务器拒绝访问)回调处理
				  * @param      {_403Callback}          args._403 - 403(权限不足)回调处理
					*/


				var self = this;
				this.args = args;

				this.before(args);

				DB.getValue({
					key: args.cache ? args.cache.key : 'null',
					success: function(cache){
						var _url;
						if(cache){
							self.localCache = cache;
							if(args.cache && typeof args.cache.getCache === 'function'){
								args.cache.getCache(cache);
							}
						}else{
							self.localCache = '';
						}
						if(args.url){
							_url = args.url;
						}else{
							args.url = _url = CONFIG.AJAX.BASE_URL + '/' + args.ctrl + '/' + args.fn;
						}
						api.ajax({
							url: _url,
							method: args.method || self.method,
							cache: true,
							headers: args.headers || '',
							report: self.report,
							timeout: args.timeout || self.timeout,
							tag:args.tag,
							dataType: args.dataType || self.dataType,
							returnAll: self.returnAll,
							data: (!!args.data ? args.data : '')
						}, function(ret, err){

							/*jsonp格式转换*/
							if(self.dataType === 'text'){
								try{
									ret.body = $api.strToJson(ret.body.slice(ret.body.indexOf('{'), -2));
								}catch(e){

								}
							}

							if(CONFIG.DEBUG){
								if(args.test){
									Debug.alt('ret'+$api.jsonToStr(ret) + '      err' + $api.jsonToStr(err));
								}
							}

							//alert('ret: ' + JSON.stringify(ret));
							//alert('err: ' + JSON.stringify(err));
	//						console.log('ret' + JSON.stringify(ret) + 'err'+JSON.stringify(err))
//							args.url = CONFIG.AJAX.BASE_URL + '/' + args.ctrl + '/' + args.fn;
							console.log('args: ' + JSON.stringify(args || '', null, 2))
							if(ret){
								if(args && args.fn == 'getAreaList') {
								}else {
									console.log("ret: " + JSON.stringify(ret, null, 2))
								}
								self.success(ret);
							}else{
								self.error(err);
							}
						});
					}
				});
			},
			cancel : function(tag){
				if(tag){
					api.cancelAjax({
					    tag: tag
					});
				}
			}
		};

		window.ajax = ajax;

	})(window);


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
	 * 作用：页面刷新
	 * 创建于 2015-7-17 21:14
	 * 更新：2016-9-24
	 */

	/**
	 * @author				一元杀网络
	 * @description		刷新模块
	 * @namespace			Refresh
	 * @version				3.0.0
	 */

	!function(window){
		var c = {
			init: function(args){
				/**
				 * 成功刷新的回调
				 * @callback		refreshCallback
				 */

				/**
				 * 初始化下拉刷新功能
				 * @method			init
				 * @memberof		Refresh
				 * @param      	{string}                args.ctrl - 请求接口
				 * @param      	{string}                args.fn - 接口方法
				 * @param			 	{object}								args.values - 接口参数
				 * @param				{string}								[args.textColor=#666] - 提示文字的颜色
				 * @param				{string}								args.field - 异步返回的ct里，需要被遍历合成模板的字段，如：ct[field]
				 * @param      	{boolean}               [args.showError=false] - 请求失败后(404)，是否显示错误信息
				 * @param				{string}								[args.container=#main] - 模板渲染的父节点
				 * @param				{string}								[args.template=main] - 模板名称
				 * @param				{refreshCallback}				args.success - 成功刷新的回调
				 */


				api.setRefreshHeaderInfo({
				    visible: true,
				    loadingImg: 'widget://zhibo/res/icon-refresh.png',
				    bgColor: 'rgba(0,0,0,0)',
				    textColor: args.textColor || '#666',
				    textDown: '下拉刷新...',
				    textUp: '松开刷新...',
				    showTime: true
				}, function(ret, err){
					if('none' === api.connectionType){
						api.toast({
							msg: '网络无法连接，请检查网络设备是否正常',
							location: 'bottom',
							duration: 2000
						});
						api.refreshHeaderLoadDone();
						return;
					}
					if(args && args.values){
						if(args.values.id && args.values.token){
							if($api.getStorage('memberInfo')){
								args.values.id = $api.getStorage('memberId');
								args.values.token = $api.getStorage('token');
							}else{
								Tool.toast('请先登录');
								api.refreshHeaderLoadDone();
								return;
							}
						}
					}
					ajax.get({
						ctrl: args.ctrl,
						fn: args.fn,
						data: {
							values: args.values
						},
						hideLoading: true,
						showError: args.showError,
						loadType: 1, //下拉刷新类型
						success: function(ct){
							// $api.html($api.dom(args.container||'#main'), doT.template($api.html($api.dom('[template='+(args.template||'main')+']')))(args.field ? ct[args.field] : ct));
							T.html(args.container||'#main', args.template||'main', args.field ? ct[args.field] : ct);
							api.parseTapmode();
							if('function' === typeof args.success){
								args.success();
							}
						}
					});
				});
			}
		};
		window.Refresh = c;
	}(window);


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
	 * 作用：页面滚动的底部时，加载更多信息
	 * 创建于 2015-7-8 22：18
	 */

	!function(window){
		var c = {
			init: function(args, callback){
				/*
				 * 参数 json args
				 * 				string ctrl
				 * 				string fn
				 * 				json values //异步请求参数
				 * 				boolean showError
				 * 				boolean test
				 *				string template 渲染模板
				 *				string wrapper 渲染父节点, 模板的包裹层节点
				 *				number countType 
				 * 					0 默认统计模式，page/pagesize并用;
				 * 					1 时间戳模式，以时间戳为标识获取更多数据;
				 *				function count 自定义判断加载条件是否符合，针对特殊场景，可为空
				 *					return t{	
				 *						number status (0:马上终止执行下面的逻辑)
				 *						json values	异步请求所需的参数(status=1:返回values)
				 *					}
				 *				string field 异步返回的ct里，需要被遍历合成模板的字段，如：ct[field]
				 *				string countSelector 通过该css选择器获取当前节点数，判断是否符合加载下一个分页数据的条件
				 * 				
				 */
				api.addEventListener({
					name: 'scrolltobottom'
				}, function(ret, err){

					/*判断是否加载中*/
					var loadMoreDom = $api.dom('.load-more');
					if(loadMoreDom){
						return;
					}
					//判读用户是否信息
					if(args && args.values){
						if(args.values.id && args.values.token){
							if($api.getStorage('memberInfo')){
								args.values.id = $api.getStorage('memberId');
								args.values.token = $api.getStorage('token');
							}else{
								Tool.toast('请先登录');
								return;
							}
						}
					}
					if('function' === typeof args.count){
						var t = args.count();
						if(t && t.status){
							if(!args.values){
								args.values = {};
							}
							for(var key in t.values){
								args.values[key] = t.values[key];
							}
						}else{
							return;
						}
					}else{
						if(args.countType){
							/*使用时间戳统计模式
								获取时间戳
							*/
							args.values.time = $api.attr($api.dom(args.countSelector || '#main > div:last-child'), 'timestamp');
						}else{
							/*使用默认统计模式page/pagesize*/
							try{
								var listDoms = $api.domAll(args.countSelector || '#main > div');
								if(listDoms.length == 0 || listDoms.length%10 != 0){
									return;
								}else{
									args.values.page = listDoms.length/10+1;
								}
							}catch(e){
								return;
							}		
						}
					}
						
//					 Debug.alt(JSON.stringify(args.values,null,2));
					/*渲染“加载更多”UI*/
					var loadMoreCode = ''+
							'<div class="load-more">'+
								'正在加载...'+
							'</div>';
					$api.append($api.dom('#main'), loadMoreCode);
					// alert($api.jsonToStr(args.values))
					ajax.get({
						ctrl: args.ctrl,
						fn: args.fn,
						data: {
							values: args.values
						},
						hideLoading: true,
						showError: args.showError,
						test: args.test,
						loadType: 2, //scrolltobottom类型
						success: function(ct){
							if(args.field){
								ct = ct[args.field];
							}
							if(ct instanceof Array && ct.length!=0){
								$api.append($api.dom(args.wrapper||'#main'), doT.template($api.html($api.dom('[template=' + (args.template || 'list') + ']')))(ct));
								api.parseTapmode();
								if(typeof callback === 'function'){
									callback(ct, args.values.page);
								}
							}else{
								api.toast({
									msg: '已经没有更多内容了',
									location: 'bottom',
									duration: 2000
								});
							}
						}
					});
				});
			}
		};
		window.LoadMore = c;
	}(window);

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * 2016-09-25
	 */

	/**
	 * @author          一元杀网络
	 * @description     封装photoBrowser模块常用方法
	 * @namespace       PhotoBrowser
	 * @version         1.0.0
	 */

	! function(window) {
	  var pb = {
	    open: function(args) {
	      /**
	       * 打开图片浏览器后的回调事件
	       * @callback    showCallback
	       *
	       * 用户切换图片的回调事件
	       * @callback    changeCallback
	       * @param       {number}              index - 当前图片在图片路径数组中的索引
	       *
	       * 用户单击图片浏览器的回调事件
	       * @callback    clickCallback
	       * @param       {number}              index - 当前图片在图片路径数组中的索引
	       *
	       * 网络图片下载成功的回调事件
	       * @callback    loadImgSuccessCallback
	       * @param       {number}              index - 当前图片在图片路径数组中的索引
	       *
	       * 网络图片下载失败的回调事件
	       * @callback    loadImgFailCallback
	       * @param       {number}              index - 当前图片在图片路径数组中的索引
	       *
	       * 用户长按图片的回调事件
	       * @callback    longPressCallback
	       * @param       {number}              index - 当前图片在图片路径数组中的索引
	       */

	      /**
	       * 打开图片浏览器
	       * @method      open
	       * @memberof    PhotoBrowser
	       * @param       {object}          args
	       * @param       {object[]}        args.images - 要读取的图片路径组成的数组，图片路径支持 fs://、http:// 协议
	       * @param       {number}          [args.activeIndex=0] - 当前要显示的图片在图片路径数组中的索引
	       * @param       {string}          args.placeholderImg - 当加载网络图片时显示的占位图路径，要求本地图片路径（widget://、fs://）
	       * @param       {string}          [args.bgColor=#000] - 图片浏览器背景色，支持 rgb、rgba、#
	       * @param       {boolean}         [args.zoomEnabled=true] - 是否打开缩放手势识别功能（随手势放大缩小图片）
	       * @param       {showCallback}              打开图片浏览器后的回调事件
	       * @param       {changeCallback}            用户切换图片的回调事件
	       * @param       {clickCallback}             用户单击图片浏览器的回调事件
	       * @param       {loadImgSuccessCallback}    网络图片下载成功的回调事件
	       * @param       {loadImgFailCallback}       网络图片下载失败的回调事件
	       * @param       {longPressCallback}         用户长按图片的回调事件
	       */
	      var photoBrowser = api.require('photoBrowser');
	      photoBrowser.open({
	        images: args.images,
	        activeIndex: args.activeIndex || 0,
	        placeholderImg: args.placeholderImg || '',
	        bgColor: args.bgColor || '#000',
	        zoomEnabled: typeof args.zoomEnabled == 'boolean' ? args.zoomEnabled : true
	      }, function(ret, err) {
	        switch (ret.eventType) {
	          case 'show':
	            if (typeof args.show === 'function') {
	              args.show();
	            }
	            break;
	          case 'change':
	            if (typeof args.change === 'function') {
	              args.change(ret.index);
	            }
	            break;
	          case 'click':
	            if (typeof args.click === 'function') {
	              args.click(ret.index);
	            }
	            break;
	          case 'loadImgSuccess':
	            if (typeof args.loadImgSuccess === 'function') {
	              args.loadImgSuccess(ret.index);
	            }
	            break;
	          case 'loadImgFail':
	            if (typeof args.loadImgFail === 'function') {
	              args.loadImgFail(ret.index);
	            }
	            break;
	          case 'longPress':
	            if (typeof args.longPress === 'function') {
	              args.longPress(ret.index);
	            }
	            break;
	        }
	      });
	    },
	    close: function(){
	      var photoBrowser = api.require('photoBrowser');
	      photoBrowser.close();
	    },
	    show: function(){
	      var photoBrowser = api.require('photoBrowser');
	      photoBrowser.show();
	    },
	    hide: function(){
	      var photoBrowser = api.require('photoBrowser');
	      photoBrowser.hide();
	    }
	  };

	  window.PhotoBrowser = pb;
	}(window);


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
	 * 时间工具函数
	 * 封装于 2015-07-07
	 */
	(function(window){
		var d = {};
		d.t1 = function(pts, flag){
			/*
			*参数
			* string/number pts 过去的时间戳
			* boolean flag: '我的消息'一周之外只显示：月/日
			*/	
			pts = this.formatTS(pts);
			var now = new Date(),
					nts = now.getTime(),
					pass = new Date(pts);
			/*是否在三天内：今天、昨天、前天*/
			var isT = this.isT(pts, now);
			if(isT){
				return isT;
			}
			/*是否在这一周内*/
			var isInWeek = this.isInWeek(pts, now);
			if(isInWeek){
				return isInWeek;
			}
			/*超出一周范围*/
			var moment,
					hours = pass.getHours();
			if(hours>=0 && hours<6){
				moment = '凌晨 ';
			}else if(hours>=6 && hours<12){
				moment = '上午 ';
			}else if(hours == 12){
				moment = '中午 ';
			}else if(hours>12 && hours<18){
				moment = '下午 ';
			}else{
				moment = '晚上 ';
			}		
			if(flag){
				return (pass.getMonth()+1) + '月' + pass.getDate() + '日';
			}else{
				return (pass.getMonth()+1) + '月' + pass.getDate() + '日 ' + moment + (pass.getHours()>9?pass.getHours():'0'+pass.getHours()) + ':' + (pass.getMinutes()>9?pass.getMinutes():'0'+pass.getMinutes());
			}		
		};
		d.t2 = function(ts){
			/*仿微信朋友圈列表发布时间
			 * ts 发布时间戳 
			 */
			ts = this.formatTS(ts);
			var now = new Date(),
					nts = now.getTime(),
					pts = nts - ts; //时间差
			
			if(pts < 1000*60){
				return '刚刚';
			}else if(pts < 1000*60*60){
				return parseInt(pts / 1000 / 60) + '分钟前';
			}else if(pts < 1000*60*60*24){
				return parseInt(pts / 1000 / 60 / 60) + '小时前';
			}else{
				return parseInt(pts / 1000 / 60 / 60 / 24) + '天前';
			}
		};
		d.t3 = function(ts){
			/*仿微信朋友圈-帖子详情内的发布时间
			 * ts 发布时间戳
			 */
			ts = this.formatTS(ts);
			var now = new Date(),
					nts = now.getTime(),
					pass = new Date(ts),
					pyear = pass.getFullYear(),
					phour = pass.getHours(),
					pminute = pass.getMinutes(),
					psecond = pass.getSeconds(),
					pts = nts - ts; //时间差
			pminute = pminute > 9 ? pminute : '0' + pminute;
			if(nts > pts && nts < pts+(24-phour)*60*60*1000+(60-pminute)*60*1000+(60-psecond)*1000){
				//今天发布的
				return phour + ':' + pminute;
			}else if(now.getFullYear() == pyear){
				//今年发布
				return (pass.getMonth() + 1) + '月' + pass.getDate() + '日  ' + phour + ':' + pminute;
			}else{
				//更久以前发布
				return pyear + '年' + (pass.getMonth() + 1) + '月' + pass.getDate() + '日  ' + phour + ':' + pminute;
			}
		};
		d.formatTS = function(ts){
			/*若时间戳为字符串则转型*/
			if('string' === typeof st){
				ts = parseInt(ts);
			}
			/*由于PHP返回的时间戳为10位，不足13位则补充*/
			if(ts.toString().length < 13){
				ts *= 1000;
			}		
			return ts;		
		};
		/*时间格式化f系列方法*/
		d.f1 = function(t, flag){
			var t = new Date(parseInt(t)*1000);
			return t.getFullYear() + flag + (t.getMonth()+1) + flag + t.getDate();
		};
		d.isT = function(pts, now){
			/*是否在三天内：今天、昨天、前天*/
			/*pts为过去时间戳，now为现在的日期对象*/
			pts = this.formatTS(pts);
			var	nts = now.getTime(),
					pass = new Date(pts);
			if((nts-(now.getHours()+24*2)*60*60*1000-now.getMinutes()*60*1000-now.getSeconds()*1000) <= pts){
				var moment;
				/*三天内*/
				if(now.getDate() == pass.getDate()){
					/*今天*/ 
					var hours = pass.getHours();
					if(hours>=0 && hours<6){
						moment = '凌晨 ';
					}else if(hours>=6 && hours<12){
						moment = '上午 ';
					}else if(hours == 12){
						moment = '中午 ';
					}else if(hours>12 && hours<18){
						moment = '下午 ';
					}else{
						moment = '晚上 ';
					}
				}else if((nts-(now.getHours()+24)*60*60*1000-now.getMinutes()*60*1000-now.getSeconds()*1000) <= pts){
					/*昨天*/
					moment = '昨天 ';
				}else if((nts-(now.getHours()+24*2)*60*60*1000-now.getMinutes()*60*1000-now.getSeconds()*1000) <= pts){
					/*前天*/
					moment = '前天 ';
				}
				return (moment||(pass.getMonth()+1)+'月'+pass.getDate()+'日 ') + (pass.getHours()>9?pass.getHours():'0'+pass.getHours()) + ':' + (pass.getMinutes()>9?pass.getMinutes():'0'+pass.getMinutes());
			}
			return false;		
		};
		d.isInWeek = function(pts, now){
			/*是否在这一周内*/
			/*pts为过去时间戳，now为现在的日期对象*/
			var x = now.getDay(),	/*今天星期几*/
					nts = now.getTime(),
					pass = new Date(pts);
			if(x > 3){
				if(nts-(now.getHours()+24*(x==0?6:x))*60*60*1000-now.getMinutes()*60*1000-now.getSeconds()*1000 <= pts){
					var weekDay;
					switch(pass.getDay()){
						case 0:
							weekDay = '周日';
							break;
						case 1:
							weekDay = '周一';
							break;
						case 2:
							weekDay = '周二';
							break;
						case 3:
							weekDay = '周三';
							break;
						case 4:
							weekDay = '周四';
							break;
						case 5:
							weekDay = '周五';
							break;
						case 6:
							weekDay = '周六';
							break;
					}
					return weekDay + ' ' + (pass.getHours()>9?pass.getHours():'0'+pass.getHours()) + ':' + (pass.getMinutes()>9?pass.getMinutes():'0'+pass.getMinutes());
				}
			}
			return false;
		};
		
		window.D = d;
	})(window);



/***/ },
/* 12 */
/***/ function(module, exports) {

	
	/*表单字段验证
	 * 创建于2016-1-27
	 */

	!function(window){
		var f = {
		isPhone: function(val){
			if(val && /^1[3,5,7,8]\d{9}$/.test(val)){
				return true;
			}else{
				return false;
			}
		},
		isEmail: function(val){
			var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if(val && reg.test(val)){
				return true;
			}else{
				return false;
			}
		}
	};
		
		window.Former = f;
	}(window);


/***/ }
/******/ ]);


//验证手机号码合法性
function validatePhone(phone) {
	if (phone) {
		//if (!/^1[3,4,5,7,8]\d{9}$/.test(phone)) {
			//Tool.toast('手机号码不正确~');
			//return false;
		//}
	} else {
		Tool.toast('请填写您的手机号码~');
		return false;
	}
	return true;
}
//验证邮箱合法性
function validateEmail(email) {
	if (email) {
		if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)) {
			Tool.toast('邮箱地址不正确~');
			return false;
		}
	} else {
		Tool.toast('请填写您的邮箱地址~');
		return false;
	}
	return true;
}
//验证密码合法性
function validatePassword(password) {
	if (!password) {
		Tool.toast('密码不能为空~');
		return false;
	} else if (password.length < 6) {
		Tool.toast('密码长度必须大于6位');
		return false;
	} else if (password.indexOf(' ') > -1) {
		Tool.toast('密码不能含有空格');
		return false;
	}
	return true;
}
//验证是否为空
function is_define(value) {
	if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof(value) == 'undefined') {
		return false;
	} else {
		value = value + "";
		value = value.replace(/\s/g, "");
		if (value == "") {
			return false;
		}
		return true;
	}
}

/*替换null字段*/
function rmNull(data) {
	if (data && (data != 'undefined' || data != 'null')) {
		return data;
	} else {
		return '';
	}
}

/*静默更新*/
function smartUpdateFinish(){
	api.addEventListener({
		name:'smartupdatefinish'
	},function(ret,err){
		api.alert({
			title:'提示',
			msg:'新的更新包已经安装成功，重启后生效'
		},function(ret,err){
			api.closeWidget({
				id:'A6937764463108',
				silent:true
			});
		});
	});
}

//获取用户信息
function memberInfo(callback) {
	if($api.getStorage(CONFIG.memberId) && $api.getStorage(CONFIG.token)) {
		//var ctrl = 'my',
		//		fn = 'memberinfo';
		var ctrl = 'zhiboApp',
				fn = 'memberinfo';
		ajax.get({
			ctrl: ctrl,
			fn: fn,
			data: {
				values: {
					id: $api.getStorage(CONFIG.memberId),
					token: $api.getStorage(CONFIG.token)
				}
			},
			hideLoading: true,
			showError: true,
			showProgress: true,
			success: function(ct) {
			//alert(ct.teding);
			//$api.setStorage('teding', ct.teding||0);
				$api.setStorage(CONFIG.memberInfo, ct);
				//$api.setStorage(CONFIG.diamonds, ct.diamonds); 大斌去掉这里
				if(typeof callback == 'function') {
					callback(ct);
				}
			}
		});
	}
}

//极光推送
function jpush(tags, callback) {
	var alias = $api.getStorage(CONFIG.memberInfo).username;
	var param = {
		alias: alias,
		tags: tags
	};
	JPush.init(function(ret) {	
//		Debug.alt('初始化成功!');
		JPush.bindAliasAndTags(param, function() {
//			Debug.alt('绑定别名成功')
			JPush.getRegistrationId(function(ret) {
//				Debug.alt('绑定jpush成功RegistrationId:' + JSON.stringify(ret))
				if(ret && ret.id) {
					updateRegistrationId(ret.id, callback);
				}
			});
		});
		JPush.setListener(function(ret) {
			jpushListen(ret);
		});
		JPush.getDataByTouchNotification(function(ret) {
//			jpushListen(ret);
			if(ret) {
				if(ret.extra) {
					var ct = ret.extra;
					if (typeof ret.extra == "string") {
						ct = $api.strToJson(ret.extra);
					}
					if(ct.status) {
						var memberInfo = $api.getStorage(CONFIG.memberInfo);
						switch(ct.status) {
							//房间
							case 'roomnews'://房间 公告
								break;
							case 'roombans'://房间 禁停
								break;
							//跳转到系统消息
							case 'withdraw': //提现消息
							case 'live': 		 //直播消息
							case 'recharge': //充值消息
							case 'systemnews'://后台发送消息
								openWin('msg','msg','消息','msg','msg');
								break;
						}
					}
				}
			}
		});
	});
}

//绑定极光推送
function setAliasAndTag(param) {
	var ajpush = api.require('ajpush');
	ajpush.bindAliasAndTags(param, function(ret, err) {
		if (ret&&ret.statusCode == '6002') {
			setAliasAndTag(param);
		}
	});
}

//取消极光推送
function updateRegistrationId(rid, callback, showProgress) {
	if($api.getStorage(CONFIG.memberId) && $api.getStorage(CONFIG.token)) {
		ajax.get({
//			ctrl: 'zhiboApp',
//			fn: 'updateRegistrationId',
			ctrl: 'zhiboApp',
			fn: 'updateRegistrationId',
			data: {
				values: {
					id: $api.getStorage(CONFIG.memberId),
					token: $api.getStorage(CONFIG.token),
					rid: rid
				}
			},
			showProgress: showProgress ? true : false,
			showError: true,
			hideLoading: true,
			success:function() {
				if(typeof callback == 'function') {
					callback();
				}
			}
		});
	}
}


//获取消息小红点
function countMsg() {
	if($api.getStorage(CONFIG.memberId) && $api.getStorage(CONFIG.token)) {
		ajax.get({
//			ctrl: 'zhiboApp',
//			fn: 'getUnreadCount',
            ctrl: 'zhiboApp',
			fn: 'getUnreadCount',
			data: {
				values: {
					id: $api.getStorage(CONFIG.memberId),
					token: $api.getStorage(CONFIG.token)
				}
			},
			hideLoading: true,
			// showError: true,
			_403: function(){},
			success: function(ct) {
				$api.setStorage('unreadCount',ct.count);
				var msgDom = $api.dom('.msg_badge');
				if( msgDom && ct.count > 0 ) {
					$api.removeCls(msgDom, 'hidden');
					if($api.dom('.sysmsg_num')){
						$api.text($api.dom('.sysmsg_num'),ct.count);
						$api.removeCls($api.dom('.sysmsg_num'),'hidden');
					}
				}else if(msgDom ) {
					$api.addCls(msgDom, 'hidden');
					if($api.dom('.sysmsg_num')){
						$api.text($api.dom('.sysmsg_num'),0);
						$api.addCls($api.dom('.sysmsg_num'),'hidden');
					}
				}
			}
		});
	}
}

//退出登录
function relogin() {
	var ajpush = api.require('ajpush');
	var alias = 0;
	var tag = 'logout';
	var param = {
		alias: alias,
		tags: [tag]
	};
	//setAliasAndTag(param);
	$api.rmStorage(CONFIG.memberId);
	$api.rmStorage(CONFIG.token);
	$api.rmStorage(CONFIG.memberInfo);
	api.sendEvent({
		name: 'relogin'
	});
	if(api.winName != 'root') {
		api.closeToWin({
			name: 'root'
		});
//		api.closeToWin({
//			name: 'root'
//		});
	}
}

/*格式时间*/
function formatDate(t, format, flag, flag2) {
	/*string format 年 Y 月 M 日 D 时 h 分 m 秒 s 例如 YMDhms
	 * 不填 则 采用动态返回 即当天时间隐藏月份日期  当年时间隐藏年份
	 */
	if (typeof t === 'string') {
		var t = t.replace(/-/g, '/');
		t = new Date(t);
		var now = new Date();
		var month = (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1;
		var date = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();
		var hours = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
		var min = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
		var sec = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
		var result = '';
		var f = flag ? flag : '-';
		var f2 = flag2 ? flag2 : ':';
		if (format) {
			if (format.indexOf('Y') >= 0) {
				result += t.getFullYear();
			}
			if (format.indexOf('M') >= 0 && format.indexOf('Y') < 0) {
				result += month;
			} else if (format.indexOf('M') >= 0) {
				result += f + month;
			}
			if (format.indexOf('D') >= 0) {
				result += f + date;
			}
			if (format.indexOf('h') >= 0 && format.indexOf('D') < 0) {
				result += hours;
			} else if (format.indexOf('h') >= 0) {
				result += ' ' + hours;
			}
			if (format.indexOf('m') >= 0) {
				result += f2 + min;
			}
			if (format.indexOf('s') > 0) {
				result += f2 + sec;
			}
			return result;
		} else {
			if (t.getFullYear() == now.getFullYear()) {
				if (t.getDate() == now.getDate() && t.getMonth() == now.getMonth()) {
					return hours + ':' + min;
				} else {
					return month + '-' + date;
				}
			} else {
				return t.getFullYear() + '-' + month + '-' + date;
			}
		}
	}
}


/*打开win*/
function openWin(winName, frameName, title, url, fUrl, bounces,frameParam,delay) {
	api.openWin({
		name: fUrl,
		url: api.wgtRootDir + '/zhibo/html/window/'+ winName +'.html',
		pageParam:{
			headerTitle: title,
			frameName: frameName,
			frameUrl: api.wgtRootDir + '/zhibo/html/' + url + '/' + fUrl + '.html',
			frameParam: frameParam || {
							title: title
						},
			bounces: bounces || false
		},
		delay: api.systemType == 'ios' ? delay : 0
	});
}

//打开主播、粉丝详情
function openFrame(frameName,url,furl,bounces,type,frameParam){
	api.openFrame({
		name: frameName,
		url: api.wgtRootDir + '/zhibo/html/' + url + '/' + furl + '.html',
		bounces:bounces || false,
		pageParam:frameParam || {},
		animation:{
			type: type ||"push",
			subType:"from_right",
			duration: 300
		}
	})
}

//打开搜索/添加好友
function openSearch(frameParam){
	api.openWin({
		name: 'search',
		url: api.wgtRootDir + '/zhibo/html/window/search.html',
		pageParam:{
			headerTitle: '',
			frameParam: frameParam || {}
		}
	})
}


function openLiveGroup(roomid,memberid,pwd){
//	api.openFrame({
//		name: 'barrage',
//		url: api.wgtRootDir + '/zhibo/html/find/live_barrage_frame.html',
//		pageParam:{
//			roomid: roomid,
//			memberid: memberid
//		},
//		bounces: false
//	})
	api.openFrameGroup({
		name: 'liveGroup',
		scrollEnabled: true,
		preload: 0,
		background: 'transparent',
		rect: {
			x: 0,
			y: 0,
			w: 'auto',
			h: 'auto'
		},
		index:1,
		frames: [{
			name: 'nobarrage',
			scrollToTop: false,
			url: api.wgtRootDir + '/zhibo/html/find/live_nobarrage_frame.html',
			bounces: true,
			pageParam:{
				roomid: roomid,
				memberid: memberid,
				pwd: pwd
			}
		},{
			name: 'barrage',
			scrollToTop: false,
			url: api.wgtRootDir + '/zhibo/html/find/live_barrage_frame.html',
			pageParam:{
				roomid: roomid,
				memberid: memberid,
				pwd: pwd
			},
			bounces: false
		}]
	},function(ret,err){
		
	})
}


//格式化金额
function fmoney(s, n) { 
	console.log(typeof s)
	n = n > 0 && n <= 20 ? n : 2; 
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
	t = ""; 
	for (i = 0; i < l.length; i++) { 
	t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
	} 
	return t.split("").reverse().join("") + "." + r; 
}


//获取融云 token

function getRongToken(callback){
	ajax.get({

		ctrl: 'zhiboApp',
		fn: 'getRongCloudToken',
		data: {
			values: {
				id: $api.getStorage(CONFIG.memberId),
				token: $api.getStorage(CONFIG.token)
			}
		},
		hideLoading: true,
		showError: false,
		showProgress: false,
		success: function(ct) {
		if(ct){
			if('function' === typeof callback){
				callback(ct);
			}
			}
		}
	});
}

/*
function getRongToken(callback){
		
		api.ajax({
		    url: window.DOMAIN + '/zhiboApp/getRongCloudToken',
		    method: 'post',
		    data: {
		        values: {
		            id: $api.getStorage(CONFIG.memberId),
					token: $api.getStorage(CONFIG.token)
		        }
		    }
		}, function(ret, err) {
		       callback(ret.content);
		   
		});

}
*/

/*直播聊天数据表处理 start*/
function createTable(callback){
	DB.createTable({
		table: table,
		field: ['memberid', 'roomid', 'type', 'content', 'createdtime'],
		success: function(){
//			api.toast({
//				location: 'top',
//				msg: '创建表成功'
//			});
			if(typeof callback == 'function'){
				callback();
			}
		}
	})
}

function insertIntoTable(data){
	DB.insert({
		table: table,
		data: data,
		success: function(){
//			api.toast({
//				location: 'top',
//				msg: '数据插入成功'
//			});
		}
	})
}

function selectTable(){
	DB.selectSql({
		sql: 'select * from ' + table + ';',
		success: function(data){
			if(data instanceof Array && data.length > 0){
				ajax.get({
					ctrl: 'zhiboApp',
					fn: 'savemessage',
					data: {
						values: {
							id: values.id,
							token: values.token,
							roomid: values.roomid,
							content: data
						}
					},
					hideLoading: true,
					showError: true,
					showProgress: false,
					success:function(ct){
						Debug.toast('保存成功');
						clearTable();
					}
				});
			}
		}
	})
}

function clearTable(){
	DB.executeSql({
		sql: 'delete from ' + table + ';',
		success: function(){
			Debug.toast('清空数据表成功');
		}
	})
}
/*直播聊天数据表处理end*/

/*直播时候发言（文字&&弹幕）*/
function sendText(text,type,isLiver){
	var memberinfo = $api.getStorage(CONFIG.memberInfo);
	var extra = {
		type: 1,
		extra: {
			memberid: values.id,
			createdtime: formatDate(Date(),'YMDhms'),
			type: type,
			avatar: memberinfo.avatar,
			nickname: memberinfo.nickname,
			level: memberinfo.level,
		}
	};
	
	if(type == 1){
		ajax.get({
			ctrl: 'zhiboApp',
			fn: 'deductions',
			data: {
				values: {
					id: values.id,
					token: values.token,
					type: type,
				}
			},
			hideLoading: true,
			showError: true,
			showProgress: false,
			success:function(ct){
				var memberinfo = $api.getStorage(CONFIG.memberInfo);
				memberinfo.diamonds = ct.diamonds;
				$api.setStorage(CONFIG.memberInfo,memberinfo);
				send();
				Debug.toast('发送成功');
			}
		});
	}else{
		send();
	}
	
	function send(){
		QJ.Chat.sendText({
			text: text,
			extra: extra,
			success:function(ret){
				T.append('.live_msg', 'live_msg_text', {text:text,extra:extra.extra});
				$('.live_msg').scrollTop( $('.live_msg')[0].scrollHeight );
				if(type == 1){
					barrage(extra.extra,text);
				}
				if(isLiver){
					insertIntoTable({
						memberid: values.id,
						roomid: values.roomid,
						type: type,
						content: text,
						createdtime: extra.extra.createdtime
					});
				}
			}
		})
	}
}

function renderGiftMsg(extra){
	T.append('.live_msg', 'live_msg_gift', {extra:extra});
	$('.live_msg').scrollTop( $('.live_msg')[0].scrollHeight );
}

/*渲染弹幕*/
function barrage(extra,text){
	var item={
	   img:extra.avatar, //图片 
	   info:text, //文字 
	   close:false, //显示关闭按钮 
	   duration:8000, //延迟,单位秒,默认6 
	   bottom:0, //距离底部高度,单位px,默认随机 
	   color:'#fff', //颜色,默认白色 
	   old_ie_color:'#000000', //ie低版兼容色,不能与网页背景相同,默认黑色 
	 }
	$('.barrage_list_box').barrager(item);
}

/*监听处理直播接收信息*/
function receiveMsgListener(isLiver){
	QJ.Chat.addEventListener({
		name: 'receiveMsg',
		receiveMsg:function(ret){
			var extra = ret.extra;
			if(extra && typeof extra == 'string' && extra != ''){
				extra = JSON.parse(extra);
			}
			switch(ret.type){
				case 1:
					var ext = extra.extra;
					if(ext && typeof ext == 'string' && ext != ''){
						ext = JSON.parse(ext);
					}
					switch(extra.type){
						case 1:
							T.append('.live_msg','live_msg_text',{text:ret.text,extra:ext})
							$('.live_msg').scrollTop( $('.live_msg')[0].scrollHeight );
							if(ext.type == 1){
								barrage(ext,ret.text);
							}
							if(isLiver){
								insertIntoTable({
									memberid: ext.memberid,
									roomid: values.roomid,
									type: ext.type,
									content: ret.text,
									createdtime: ext.createdtime
								});
							}
							break;
						case 2:
							var liveCharm = $api.dom('.live_charm');
							$api.text(liveCharm,parseInt($api.text(liveCharm)) + parseInt(ext.charm));
							giftArray.push(ext);
							showGift();
							break;
						case 4:
							switch(ext.type){
								case 1:
									if(! $api.dom('#fans'+ext.memberid)){
										ext.roomid = values.roomid;
										T.append('.fans_list','live_fans',ext);
									}
									var count = parseInt($api.html($api.dom('.online_count')));
									getRoomMemberCount(parseInt(count + 1));
									break;
								case 2:
									if($api.dom('#fans'+ext.memberid)){
										$api.remove($api.dom('#fans'+ext.memberid));
									}
									getRoomMemberCount(parseInt($api.html($api.dom('.online_count'))-1));
									break;
								case 3: //自定义子类型：观众被禁言
		            case 4: //自定义子类型：观众禁言被解除
//		            	//渲染禁言公告
//		            	T.append('.live_msg', 'live_msg_gag', ext);
//									$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
//									//判断 禁言目标id为自己的时候，修改自身禁言状态，并发送禁言事件到talk.html
//									if(ext.targetId == values.id){
//										chatstate = ext.type == 3 ? 1 : 0;
//										api.sendEvent({
//											name: 'updateChatState',
//											extra: {
//												chatState: chatstate
//											}
//										})
//									}
									//渲染禁言公告
                	if(ext.targetId instanceof Array && ext.targetId.length > 0){
                		//如果目标id是数组，则为批量处理
                		for(var i = 0;i < ext.targetId.length;i++){
                			T.append('.live_msg', 'live_msg_gag', {
                				type: ext.type,
                				memberid: ext.memberid,
                				nickname: ext.nickname,
                				targetId: ext.targetId[i],
                				targetNickname: ext.targetNickname[i]
                			});
                			$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
                			//判断 禁言目标id为自己的时候，修改自身禁言状态，并发送禁言事件到talk.html
											if(ext.targetId[i] == values.id){
												chatstate = ext.type == 3 ? 1 : 0;
												api.sendEvent({
													name: 'updateChatState',
													extra: {
														chatState: chatstate
													}
												})
											}
                		}
                	}else{	//否则为单个处理
                		//判断 禁言目标id为自己的时候，修改自身禁言状态，并发送禁言事件到talk.html
                		T.append('.live_msg', 'live_msg_gag', ext);
                		$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
										if(ext.targetId == values.id){
											chatstate = ext.type == 3 ? 1 : 0;
											api.sendEvent({
												name: 'updateChatState',
												extra: {
													chatState: chatstate
												}
											})
										}
                	}
		              break;
							}
							break;
						default:
							break;
					}
					break;
				case 3:
					T.append('.live_msg','live_msg_notice',{notice:ret.text});
					$('.live_msg').scrollTop( $('.live_msg')[0].scrollHeight );
					break;
				default :
					return ;
			}
		}
	})
}
/*监听发送聊天信息事件*/
function talk_send_messageListener(isLiver){
	api.addEventListener({
		name: 'talk_send_message'
	},function(ret,err){
		if(ret.value.text){
			sendText(ret.value.text,ret.value.type,isLiver);
		}
	})
}


//直播获取房间消息
function roomnews(callback){
	ajax.get({
		ctrl: 'zhiboApp',
		fn: 'roomnews',
		data: {
			values: values
		},
		hideLoading: true,
		showError: true,
		showProgress: false,
		success: function(ct) {
			ct.memberid = values.memberid;
			ct.roomid = values.roomid;
			chatprice = ct.chatprice;
			chatstate = ct.state;
			var memberinfo = $api.getStorage(CONFIG.memberInfo);
			memberinfo.diamonds = ct.diamonds;
			$api.setStorage(CONFIG.memberInfo,memberinfo);
			
			//过滤直播公告内容的html标签
    ct.notice = Tool.removeHTMLTag(ct.notice);  // 公告不过滤标签了
			T.html('#wrap','main',ct,true);
			if(typeof callback == 'function'){
				callback(ct);
			}
			getRoomMemberCount();
		}
	});
}
// 获取观看直播人数
function getRoomMemberCount(count){
	var playcount = $api.getStorage('playCount');
	if(count){
		$api.html($api.dom('.online_count'),count);
	}else{
		$api.html($api.dom('.online_count'),playcount);
	}
//	QJ.Chat.getRoomMemberCount({
//		success:function(ret){
//			if($api.dom('.online_count')){
//				$api.text($api.dom('.online_count'),count || ret.count)
//			}
//		},
//		error:function(){}
//	})
}

/*验证展示礼物条件，当前展示数量需小于3*/
function showGift(type) {
	var giftDoms = $api.domAll('.gift_item');
	var length = giftDoms.length;
	if(length < 3) {
		showGiftHandler(type);
	}
}
/*处理展示礼物，type = 1时候，为本地送礼物*/
function showGiftHandler(type) {
	var giftDoms = $api.domAll('.gift_item');
	var length = giftDoms.length;
	var gift = giftArray[length]
	T.append('.live_gift', 'live_gift', gift);
	window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
	renderGiftMsg(gift);
	function rmGift() {
		var giftDoms = $api.domAll('.gift_item');
		for(var i = 0; i < giftDoms.length; i++) {
			if(giftDoms[i].id == 'gift' + gift.memberid + '_' + gift.giftid) {
				giftArray.splice(i, 1);
				break;
			}
		}
		$api.remove($api.dom('#gift' + gift.memberid + '_' + gift.giftid));
		if(giftArray.length > $api.domAll('.gift_item').length) {
			showGift();
		}
	}
	if(gift.number > 1) {
		if(type){
			$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), gift.number);
			clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
			window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
		}else{
			var interval = setInterval(handler,Math.floor(Math.random()*500+100));
			function handler(){
				var currNum = parseInt($api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num')));
				if(currNum < gift.number){
					$api.text($api.dom('#gift' + gift.memberid + '_' + gift.giftid + ' .gift_num'), currNum+1);
					renderGiftMsg(gift);
					clearTimeout(window['timeouter' + gift.memberid + '_' + gift.giftid]);
					window['timeouter' + gift.memberid + '_' + gift.giftid] = setTimeout(rmGift, 5000);
				}else{
					clearInterval(interval);
				}
			}
		}
	}
}


//打开 圆点
function openCircle(){
	api.openFrame({
		name: 'circle',
		url: api.wgtRootDir + '/zhibo/html/component/circle.html',
		bgColor: 'rgba(0,0,0,0)',
		bounces: false,
		rect: {
			x: (api.winWidth/2) - 30,
			y: api.winHeight-60,
			w: 60,
			h: 65
		},
		reload: true
	});
}

//一行字体溢出时显示省略号
function ellipsisOne(dom) {
	var dom = dom ? dom : '.text-overflow';
	if(!$(dom)) return;
	if($(dom).html() == '') return;
	$(dom).ellipsis();
}

//打开直播页面
function openLive(roomid,memberid,pwd,avatar){
	api.openWin({
		name: 'look_live',
		url: api.wgtRootDir + '/zhibo/html/find/look_live.html',
		bgColor: 'rgba(0,0,0,0.1)',
		bounces: false,
		pageParam:{
			roomid: roomid,
			memberid: memberid,
			pwd: pwd,
			avatar:avatar
		},
		animation:{
			type:"push",
			subType:"from_right",
			duration:300
		},
		rect:{
			x: 0,
			y: 0,
			w: api.winWidth,
			h: api.winHeight
		},
		delay: api.systemType == 'ios' ? 0 : 300,
		slidBackEnabled:false
	});
}

//打开用户详情
function openProfile(mid){
	api.openWin({
		name: 'profile',
		url: api.wgtRootDir + '/zhibo/html/find/profile.html',
		bgColor: 'transparent',
		bounces: false,
		pageParam:{
			mid:mid
		},
		rect:{
			x: 0,
			y: 0,
			w: api.winWidth,
			h: api.winHeight
		},
		delay: api.systemType == 'ios' ? 0 : 300
	});
}


//打开绑定页面
function openBind(frameParam){
	api.openWin({
		name: "bind",
		url: api.wgtRootDir + '/zhibo/html/window/win.html',
		pageParam:{
			headerTitle: '绑定手机号',
			frameName: "bind",
			frameUrl: api.wgtRootDir + '/zhibo/html/bind.html',
			frameParam: frameParam || {}
		}
	});
}
// 万位数格式化
function parseWan(num) {
			num = parseInt(num);
			var result = 0;
			if(isNaN(num)) {
				return result;
			}
			if(num > 9999) {
				result = (num / 10000).toFixed(1) + '万';
			} else {
				result = num;
			}
			return result;
		}
		
		
		//加密函数大斌
		function tt(word){
		/* 阿里云去掉
		var timestamp = word;
		if(typeof(timestamp)=='undefined'){
		timestamp=0;
		
		}else{
	    timestamp=timestamp.replace(/a/g, "0");
	    timestamp=timestamp.replace(/j/g, "1");
	    timestamp=timestamp.replace(/y/g, "2");
	    timestamp=timestamp.replace(/k/g, "3");
	    timestamp=timestamp.replace(/x/g, "4");
	    timestamp=timestamp.replace(/b/g, "5");
	    timestamp=timestamp.replace(/c/g, "6");
	    timestamp=timestamp.replace(/z/g, "7");
	    timestamp=timestamp.replace(/q/g, "8");
	    timestamp=timestamp.replace(/u/g, "9");
	    timestamp=timestamp.replace(/http/g, "rtmp");
	     timestamp=timestamp.replace(/png/g, "flv");
	   	}
	   	*/
	    return word;
		}
		
	
function setOnReceiveMessageListener(ret){

	//alert("接收融云推送"+JSON.stringify(ret));
							var extra = ret.message.content.extra;
							//alert(stringify(extra));
							//alert(JSON.stringify(ret.message.objectName));
							//alert(JSON.stringify(ret.message.content.text));
					if(extra && typeof extra == 'string' && extra != '') {
						extra = JSON.parse(extra);
					}
					 
					switch(ret.message.objectName) {
						case "RC:TxtMsg":
							var ext = extra.extra;
							if(ext && typeof ext == 'string' && ext != '') {
								ext = JSON.parse(ext);
							}
							
							switch(extra.type) {
								case 1: //自定义消息类型： 文字消息
									T.append('.live_msg', 'live_msg_text', {
										text: ret.message.content.text,
										extra: ext,
										roomid: self.session.roomId
									});
									$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
									if(ext.type == 1) {
									//alert(111);
										Chat.barrage(ext, ret.message.content.text);
									}
									//if(isLiver) {
//										insertIntoTable({
//											memberid: ext.memberid,
//											roomid: values.roomid,
//											type: ext.type,
//											content: ret.message.content.text,
//											createdtime: ext.createdtime
//										});
									//}
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
									//alert(ext.type);
									var count = parseInt($api.html($api.dom('.online_count')));
									switch(ext.type) {
										case 1: //自定义 消息子类型：观众进入直播房间
											if(!$api.dom('#fans' + ext.memberid)) {
												ext.roomid = self.session.roomid;
												//alert(JSON.stringify(ext));
												T.append('.fans_list', 'live_fans', ext);
											}
											//设置房间人数
											$api.text($api.dom('.online_count'), $api.domAll('.fans').length);
											
											break;
										case 2: //自定义 消息子类型：观众退出直播房间
										//alert($api.dom('#fans' + ext.memberid));
											//test111();
											
											//Audience.setRoomMemberCount();
											if($api.dom('#fans' + ext.memberid)) {
												$api.remove($api.dom('#fans' + ext.memberid));
											}
											//设置房间人数
											$api.text($api.dom('.online_count'), $api.domAll('.fans').length);
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
													if(ext.targetId[i] == $api.getStorage(CONFIG.memberId)) {
														api.sendEvent({
															name: 'updateChatState',
															extra: {
																chatState: ext.type == 3 ? 1 : 0
															}
														});
													}
												}
											} else { //否则为单个处理
												//判断 禁言目标id为自己的时候，修改自身禁言状态，并发送禁言事件到talk.html
												T.append('.live_msg', 'live_msg_gag', ext);
												$('.live_msg').scrollTop($('.live_msg')[0].scrollHeight);
												//alert(ext.targetId);alert($api.getStorage(CONFIG.memberId));
												if(ext.targetId == $api.getStorage(CONFIG.memberId)) {
													api.sendEvent({
														name: 'updateChatState',
														extra: {
															chatState: ext.type == 3 ? 1 : 0
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
								case 6: //自定义消息类型： 爱心消息
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
												mid: ext.aid, // 主播id
												roomid: ext.aid //房间id 
											}
										});
									
									break;
									case 7: //自定义消息类型： 踢人的融云触发 大斌加的
								
								
									tren(); //踢人
									
									break;
									case 8: //自定义消息类型： 时间收费踢人的融云触发 大斌加的
								//alert(JSON.stringify(ext.memberid))
								
									trennew(ext.memberid,ext.fangjianid); ///管理员单独T人
									
									break;
									case 9: //自定义消息类型：解除T人  大斌加的  未完成
								//alert(JSON.stringify(ext.memberid))
								
									trennew1(ext.memberid,ext.fangjianid); ///管理员单独T人
									
									break;
									case 10: //私密房间主播端加魅力大斌
									
									var liveCharm = $api.dom('.live_charm');
									$api.text(liveCharm, parseInt($api.text(liveCharm)) + parseInt(ext.charm));
								case 11: //自定义消息类型： 私密收费踢人的融云触发 大斌加的
								
								
									smtren(); //踢人
									
									break;
									
									

								default:
									break;
							}
							break;
						case "RC:InfoNtf": //渲染  直播房间 公告消息
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
					
					if (ret) {
								api.sendEvent({
									name : 'newMessage',
									extra : ret
								});
								setBadge();
							}
					
					
						
						
}

		function setBadge() {
			RongCloud2.getTotalUnreadCount(function(num) {
				// syscount 系统消息 条数  num 为 融云 消息 条数
				var syscount = $api.getStorage('unreadCount'), badge = 0;
				if (num > 0) {
					if (parseInt(syscount) > 0) {
						badge = parseInt(num) + parseInt(syscount);
					} else {
						badge = parseInt(num);
					}
				} else {
					if (parseInt(syscount) > 0) {
						badge = parseInt(syscount);
					} else {
						badge = 0;
					}
				}
				api.setAppIconBadge({
					badge : parseInt(badge)
				});
				if (badge > 0) {
					$api.removeCls($api.dom('.msg_badge'), 'hidden');
				} else {
					$api.addCls($api.dom('.msg_badge'), 'hidden');
				}
			});
		}
		
function sendCloseText(aid){
	//推送主播退出消息
	extra = {
					type: 6,
					extra: {
						type: 2,
						aid: aid,
					}
				};
	RongCloud2.sendTextMessage({
							text: 'text',
							extra: extra,
							targetId:aid,
							conversationType:'CHATROOM',
						});
}
//时间收费转移到这里大斌
function charging(){
shoufei();
var myTimer = api.require('myTimer');
myTimer.startTimer({
    step:60,
    isLoop:true
},function(ret) {
    if(ret.status){
   
   shoufei();
   
    }
});

// window.shijianshoufei=setInterval('shoufei()',60000); 
//在控制台打印s1确认只调用一次。

 }
 //1分钟后收费
 function charging1(){
 var myTimer = api.require('myTimer');
myTimer.startTimer({
    step:60,
    isLoop:true
},function(ret) {
    if(ret.status){
   
   shoufei();
   
    }
});
 //window.shijianshoufei=setInterval('shoufei()',60000); 
//在控制台打印s1确认只调用一次。

 }

function shoufei() {
		
			api.ajax({
		    url: window.DOMAIN + '/zhiboApp/timeCharging',
		    method: 'post',
		    data: {
		        values: {
		            id : $api.getStorage(CONFIG.memberId),
						token : $api.getStorage(CONFIG.token),
						roomid : api.pageParam.roomid,
						memberid : api.pageParam.memberid
		        }
		    }
		}, function(ret, err) {

		       if (ret.state == 0) {
		       //clearInterval(window.shijianshoufei); //清楚定时扣费器
		       var myTimer = api.require('myTimer');
myTimer.stopTimer(function(ret) {
    //alert('删除定时'+JSON.stringify(ret));
});
					api.alert({
								title: '温馨提示',
								msg: '余额不足!'
							});
							Audience.quitLive(); //关闭 余额不足BUG
							quitjs(); //关闭
					}else{
					//alert('aa'+api.pageParam.memberid);
					//alert('bb'+api.pageParam.roomid);
					
					var memberinfo = $api.getStorage(CONFIG.memberInfo);
					
					memberinfo.diamonds = $api.getStorage('timePrice')|| 0;
					//$api.setStorage('teding', ct.teding);
					$api.setStorage(CONFIG.memberInfo, memberinfo);
					
					// 这个是修改用户端魅力，私密 ，暂时无效 var liveCharm = $api.dom('.live_charm');

					//$api.text(liveCharm, '10');
					//alert('eeee'+JSON.stringify(ret.charm));
					//下面这里是发送融云消息，给用户加钱
				
			
			api.sendEvent({  //发送用户端的魅力
    name: 'yonghumeili',
    extra: {
         meili: ret.charm||0
    }
});
					//var liveCharm = $api.dom('.live_charm');// 时间收费用户端定时加魅力大斌
						//	alert('ggss'+ret.charm);
							//alert('1ggss'+liveCharm);
					//$api.text(liveCharm,parseInt($api.text(liveCharm))+parseInt(ret.charm)); // 时间收费用户端定时加魅力大斌		
							
					if(ret.charm>'0'){
					//alert('ee'+JSON.stringify(ret.charm));
					var extra = {
						type : 10,
						extra : {
							
							roomid : api.pageParam.roomid, //房间号
							
							charm : ret.charm|| 0,
							memberid : api.pageParam.memberid 
							
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
					$api.setStorage('sjcharm', 0); //写入魅力
					}
					
					}
		   
		});
		}
		function shoufeism() {
		//开始
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
																		roomid : api.pageParam.roomid,
																		memberid : api.pageParam.memberid
																	}
																},
																success : function(ct) {
																
																	if (ct.state == 1) {
																		var memberinfo = $api.getStorage(CONFIG.memberInfo);
					memberinfo.diamonds = ct.diamonds;
				
					//$api.setStorage('teding', ct.teding);
					$api.setStorage(CONFIG.memberInfo, memberinfo);
					
					// 这个是修改用户端魅力，私密 ，暂时无效 var liveCharm = $api.dom('.live_charm');

					//$api.text(liveCharm, '10');
					
					
					//下面这里是发送融云消息，给用户加钱
					if(ct.charm>'0'){
					var extra = {
						type : 10,
						extra : {
							
							roomid : api.pageParam.roomid, //房间号
							
							charm : ct.charm|| 0,
							memberid : api.pageParam.memberid 
							
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
					$api.setStorage('smcharm', 0); //写入魅力
					}
		
																		
																	}
																}
															});
		
		}
		
		
		function trennew(a,b){ //管理员单独T人,a是被T的人，b是房间号
		
	if($api.getStorage(CONFIG.memberId)==a){
	$api.setStorage('T'+b+a,1);
	 quitjs();
	}
	}
	function trennew1(a,b){ //管理员单独T人,a是被T的人，b是房间号
		
	if($api.getStorage(CONFIG.memberId)==a){
	$api.setStorage('T'+b+a,0);
	
	}
		
		
		}
function tren(){ //时间收费踢人
		api.ajax({
		    url: window.DOMAIN + '/zhiboApp/trenle',
		    method: 'post',
		    data: {
		        values: {
		            id: $api.getStorage(CONFIG.memberId),
					roomid: api.pageParam.roomid, //获取房间号
					zhuboid:api.pageParam.memberid||0
		        }
		    }
		}, function(ret, err) {
		    
		      if(ret.value==2){
		             var myTimer = api.require('myTimer');
myTimer.stopTimer(function(ret) {
    //alert('删除定时'+JSON.stringify(ret));
})
		   return;
		   
		   }else if(ret.value==1){
		         var myTimer = api.require('myTimer');
myTimer.stopTimer(function(ret) {
    //alert('删除定时'+JSON.stringify(ret));
})
		      api.alert({
								title: '时间收费提示',
								msg: '您的钻石不足!'
							});
		      //alert('被T了');
		    quitjs();
		       
		       }else{
		      // api.alert({
								//title: '时间收费开始提示',
								//msg: '一分钟后开始收费!'
							//});
		        //charging(); 1一分钟后开始收取
		         if(ret.timePrice>'0'){
		         api.setFrameAttr({
				name: 'live_camera',
				hidden: true
			});
		        api.confirm({
										title : '时间收费提示',
										msg : '选是'+ret.timePrice+'钻石每分钟，选否退出房间',
										buttons : ['是', '否']
									}, function(ret, err) {
										var index = ret.buttonIndex;
										if (index == '1') {
		      // charging1(); 改为立即收费
		      charging();
		          api.setFrameAttr({
				name: 'live_camera',
				hidden: false
			});
		       }else{
		      quitjs();
		       }
		       });
		       }else{
		       return;
		       
		       }
		       
		       
		   }
		});
		
		
		}
		function smtren(){ //私密房间踢人
		
		api.ajax({
		    url: window.DOMAIN + '/zhiboApp/smtrenle',
		    method: 'post',
		    data: {
		        values: {
		            id: $api.getStorage(CONFIG.memberId),
					roomid: api.pageParam.roomid, //获取房间号
					zhuboid:api.pageParam.memberid||0
		        }
		    }
		}, function(ret, err) {
		
		   if(ret.value==2){
		   return;
		   
		   }else if(ret.value==1){
		      api.alert({
								title: '私密收费提示',
								msg: '您的钻石不足!'
							});
		      //alert('被T了');
		    quitjs();
		       
		       }else{
		      // api.alert({
								//title: '时间收费开始提示',
								//msg: '一分钟后开始收费!'
							//});
		        //charging(); 1一分钟后开始收取
		        if(ret.secretDiamond>'0'){
		           api.setFrameAttr({
				name: 'live_camera',
				hidden: true
			});
		        api.confirm({
										title : '私密收费提示',
										msg : '选是扣除'+ret.secretDiamond+'钻石，选否退出房间',
										buttons : ['是', '否']
									}, function(ret1, err) {
										var index = ret1.buttonIndex;
										if (index == '1') {
		      // charging1(); 改为立即收费
		      
		      shoufeism();
		        api.setFrameAttr({
				name: 'live_camera',
				hidden: false
			});
			
					api.sendEvent({  //发送用户端的魅力
    name: 'yonghumeili',
    extra: {
         meili: ret.secretDiamond||0
    }
});
		       }else{
		      quitjs();
		       }
		       });
		       }else{
		       return;
		       }
		       
		   }
		});
		
		
		}
			function tuichu() { //试看
		api.toast({
									msg : '试看时间结束'
								});
		//alert(api.pageParam.memberid);
		//RongCloud2.quitChatRoom({chatRoomId: api.pageParam.memberid||0}); //关闭后退出聊天室,否额积累下来会卡，大斌
		     var alivcLivePlayer = api.require('alivcLivePlayer');
alivcLivePlayer.destroy();
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
		function quitjs() {
		//alert(api.pageParam.memberid);
		RongCloud2.quitChatRoom({chatRoomId: api.pageParam.memberid}); //关闭后退出聊天室,否额积累下来会卡，大斌
		       var myTimer = api.require('myTimer');
myTimer.stopTimer(function(ret) {
    //alert('删除定时'+JSON.stringify(ret));
})
			api.sendEvent({
				name : 'closeLive'
			});
			var alivcLivePlayer = api.require('alivcLivePlayer');
alivcLivePlayer.destroy();
				api.closeFrameGroup({
					name : 'liveGroup'
				});
				api.closeWin(); //关闭当前窗口
			
		}
		
			//大斌获取私密房间上限
		function shangxian(){
		
		api.ajax({
		    url: window.DOMAIN + '/zhiboApp/shangxian',
		    method: 'post',
		    data: {
		        values: {
		            id: $api.getStorage(CONFIG.memberId),
					roomid: api.pageParam.roomid //获取房间号
		        }
		    }
		}, function(ret, err) {
		  // alert(ret.state==1);
		  if(ret.state == 1){
		
						$api.setStorage('shangxian',ret.shangxian);
							//alert("获取成功！");
						}
		   
		});
		
		}
		//礼物图片缓存开始
		function liwu(){
		 var picspath = '';
		api.ajax({
		    url: window.DOMAIN + '/zhiboApp/gift',
		    method: 'post',
		    data: {
		        values: {
		            id: $api.getStorage(CONFIG.memberId),
					roomid: api.pageParam.roomid //获取房间号
		        }
		    }
		}, function(ret, err) {
		  if(ret.status==200){
		  //开始
		    for (var i=0; i<ret.content.length; i++) {
		     var geshi =  (ret.content[i].img).substring((ret.content[i].img).lastIndexOf('.') + 1).toLowerCase();;
		     
		     var geshis=geshi||gif;
		    var giftid=ret.content[i].id;
	   	
if(typeof($api.getStorage('giftid'+giftid))!='undefined'){ //如果已经下载跳过
continue; //这里要用continue，不能用break等
}

                api.download({
                        url: ret.content[i].img,
                       // report: true,
                        cache: true,
                        savePath: 'fs://'+ret.content[i].id+'.'+geshis,
                        allowResume:true
                },function(ret,err){
                var index = ret.savePath.lastIndexOf("\/");  
var neirong=ret.savePath.substring(index + 1, ret.savePath.length);
var giftid=neirong.substr(0, neirong.indexOf('.'));

                        if(ret.state == 1){
                      
$api.setStorage('giftid'+giftid, ret.savePath);

                        console.log(giftid+'下载成功');
                        }
                     
                });
                
                
                
                
                
                
               
        }
        
        //礼物图片缓存结束
		  //结束
		 
		  
		  }
		   
		});
		
		}
		
		//确认模态框使用方法
		/*
		 * 
		 tanchu('提示','标题', function(ret) {
							if(ret=='ok'){
							
							
							
							
							}
							return;
						});
		
		 * 
		 */
function tanchu(content,title, callback) {
	var dialogBox = api.require('dialogBox');
	dialogBox.sendMessage({
		texts : {
			title: title,
			 /*hintText: '（点击此处修改昵称）',*/
			content : content,
			leftBtnTitle : '取消',
			rightBtnTitle : '确定'
		},
		styles: {
        bg: '#fff',
        w: 270,
       title:{                     //（可选项）JSON 对象；弹窗的 title 样式配置，不传则不显示标题区域
        h: 20,                  //（可选项）数字类型；标题栏高度；默认：60
         bg: '#333', 
        show: { 
                    //（可选项）JSON 对象；标题栏显示文字样式配置
            marginL: 20,         //（可选项）数字类型；显示文本相对于标题栏左边的距离；默认：6
            titleSize: 17,      //（可选项）数字类型；标题字体大小；默认：14
            titleColor: '#000',   //（可选项）字符串类型；标题字体颜色，支持#、rgb、rgba；默认：#000
             bg: '#333'
           
        },
        input:{                 //（可选项）JSON 对象；标题栏输入文本框样式配置
            marginL: 6,         //（可选项）数字类型；输入文本框相对于显示文本的距离，若显示文本不存在，则是与标题栏左边的距离；默认：6
            textSize: 14,       //（可选项）数字类型；输入文本框文本字体大小；默认：14
            textColor: '#000'   //（可选项）字符串类型；输入文本框文本字体颜色，支持#、rgb、rgba；默认：#000
        }
    },
        content: {
            color: '#000',
            size: 17
        },
        left: {
            marginB: 7,
            marginL: 20,
            w: 105,
            h: 35,
            corner: 2,
            bg: '#fff',
            size: 15
        },
        right: {
            marginB: 7,
            marginL: 10,
            w: 130,
            h: 35,
            corner: 2,
            bg: '#fff',
            size: 15
        }
    }
	}, function(ret) {
		if (ret.eventType === 'right') {
			dialogBox.close({
				dialogName : 'sendMessage'
			});
			dialogBox.close({
				dialogName : 'sendMessage'
			});
			callback('ok');

		} else {
			dialogBox.close({
				dialogName : 'sendMessage'
			});
		}

	});

}

			 function huadong(){
  var uislider = api.require('UISlider');
                        uislider.open({
                                animation : true,
                                orientation : 'horizontal',
                                rect : {
                                        x : 0,
                                        y : 100,
                                        size : 300
                                },
                                bubble : {
                                        direction : 'always',
                                        state : 'top',
                                        
                                        h : 25,
                                        size : 12,
                                        color : '#333',
                                        bg : 'rgba(255,255,255,255)',
                                        prefix : '',
                                        suffix : '美白强度'
                                },
                                handler : {
                                        w : 20,
                                        h : 20,
                                        bg : 'widget://res/chatBox/add1.png'
                                },
                                bar : {
                                        h : 10,
                                        bg : '#c8bdbd',
                                        //        active:'',
                                        active : '#ee0849'
                                },
                                value : {
                                        min : 0.0,
                                        max : 1.0,
                                        step : 0.1,
                                        init : 0.1
                                },
                                fixedOn : api.frameName,
                                fixed : false
                        }, function(ret, err) {
                        if(ret.value){
                       Tool.toast(ret.value); //滑动
                        api.require('gotyeLivePublisher').setSmoothSkinFactor({factor: ret.value})
                              // api.require('gotyeLivePublisher').setFilter({filter: 'smoothSkin'});
                             
                                }
                        });
  }
  
  function videoPlay(downUrl,fixedOn){ 
			
			var videoPlayer = api.require('videoPlayer');
videoPlayer.openPlay({
  rect:
    {   x: 0,
        y : 0,
        w : api.winWidth,
        h: api.winHeight+15
    },
    fixedOn: fixedOn||'',
    texts: {
       
    },
    styles: {
      
    head:{                           //（可选项）JSON对象；播放器顶部导航条样式    
       bg: 'rgba(0,0,0,0)',  //（可选项）字符串类型；顶部导航条背景，支持#、rgb、rgba、img；默认：rgba(161,161,161,0.5)
       height: 0,                   //（可选项）数字类型；顶部导航条的高；默认：44
       titleSize: 0,                //（可选项）数字类型；顶部标题字体大小；默认：20
       titleColor: '#fff',           //（可选项）字符串类型；顶部标题字体颜色；默认：#fff
       backSize: 0,                 //（可选项）数字类型；顶部返回按钮大小；默认：44
       backImg:'fs://img/back.png',  //（可选项）字符串类型；顶部返回按钮的背景图片，要求本地路径（widget://、fs://）；默认：返回小箭头图标
       setSize: 0,                  //（可选项）数字类型；顶部右边设置按钮大小；默认：44
       setImg:'fs://img/set.png'     //（可选项）字符串类型；顶部右边设置按钮背景图片，要求本地路径（widget://、fs://）；默认：设置小图标
    },  
    foot:{                           //（可选项）JSON对象；播放器底部导航条样式    
       bg: 'rgba(0,0,0,0)',  //（可选项）字符串类型；底部导航条背景，支持#、rgb、rgba、img；默认：rgba(161,161,161,0.5)
       height: 0,                   //（可选项）数字类型；底部导航条的高；默认：44
       playSize: 0,                 //（可选项）数字类型；底部播放/暂停按钮大小；默认：44
       playImg:'fs://img/back.png',  //（可选项）字符串类型；底部播放按钮的背景图片，要求本地路径（widget://、fs://）；默认：播放按钮图标
       pauseImg:'fs://img/back.png', //（可选项）字符串类型；底部暂停按钮的背景图片，要求本地路径（widget://、fs://）；默认：暂停按钮图标
       nextSize: 0,                 //（可选项）数字类型；底部下一集按钮大小；默认：44
       nextImg:'fs://img/back.png',  //（可选项）字符串类型；底部下一集按钮的背景图片，要求本地路径（widget://、fs://）；默认：下一集按钮图标
       timeSize: 0,                  //（可选项）数字类型；底部时间标签大小；默认：14
       timeColor:'#fff',              //（可选项）字符串类型；底部时间标签颜色，支持#、rgba、rgb；默认：#fff
       sliderImg:'fs://img/slder@2x.png',//（可选项）字符串类型；底部进度条滑块背景图片，要求本地路径（widget://、fs://）；默认：滑块小图标((在iOS上需要添加二倍图或者三倍图,否则会出现毛边))
       progressColor: '#696969',      //（可选项）字符串类型；进度条背景色，支持#、rgba、rgb；默认：#696969
       progressSelected: '#76EE00',   //（可选项）字符串类型；滑动后的进度条背景色，支持#、rgb、rgba；默认：#76EE00
       verticalImg:'',                //（可选项）字符串类型；底部竖屏按钮的背景图片，要求本地路径（widget://、fs://）；默认：竖屏按钮图标              
        horizontalImg:'',             //（可选项）字符串类型；底部横屏按钮的背景图片，要求本地路径（widget://、fs://）；默认：横屏按钮图标
   
}
    },
    path: downUrl, //（可选项）字符串类型；文档的路径，支持网络和本地（fs://）路径；默认：未传值时不播放
    //在 android 平台上不支持 widget://
    autoPlay: true //（可选项）布尔类型；打开时是否自动播放；默认：true（自动播放）
}, function(ret, err) {
    if (ret) {
       alert('cc'+JSON.stringify(ret));
            } else {
      alert('dd'+JSON.stringify(err));
    }
});

/*
			var moviePlayer = api.require('moviePlayer');
		
moviePlayer.open({
          rect:{
          x: 0,
          y: 0,
          w:api.winWidth,
          h:api.winHeight
          },
          styles:{
          head:{
          bg: 'rgba(0,0,0,0)',
          height: 0,
          y:0,
         
          backSize: 0,
        },
          },
           path:downUrl,
           autoPlay: true,
           fixedOn: 'bofangqi',
           isShowStatusBar: false,
           autorotation: false,
            },function(ret, err){
                if(ret){
                	moviePlayer.setShowOrHideControlView({
isShow:false
});
                    // alert(JSON.stringify(ret));
                // } else {
                    // alert(JSON.stringify(err));
                }

});

*/
		}
		
		//美颜
		 function mopi(frameName,gaodu){ //磨皮
  
  //滑动开始
		var uislider = api.require('UISlider');
uislider.open({
    animation: true,
    orientation: 'horizontal',
    rect: {
        x: 10,
        y: gaodu||api.frameHeight/2/6,
        size: api.frameWidth/2-20
    },
    bubble: {
        direction: 'top',
        state: 'always',
        w: 100,
        h: 30,
        size: 14,
        color: 'rgba(255,255,255,255)',
        bg: 'widget://res/slider/bubble.png',
        prefix: '磨皮',
        suffix: ''
    },
    handler: {
        w: 10,
        h: 8,
        bg: 'widget://zhibo/image/handler.png'
    },
    bar: {
        h: 5,
        bg: 'rgba(255,255,255,255)',
        active: 'widget://zhibo/image/bubble.png'
    },
    value: {
        min: 0,
        max: 100,
        step: 1,
        init: $api.getStorage('mopi')
    },
    fixedOn: frameName||api.frameName,
    fixed: false
}, function(ret, err) {
    if (ret) {
           $api.setStorage('meiyan1',ret.id);
       if(ret.eventType=='end'){
 $api.setStorage('mopi',ret.value);
       var alivcLivePusher = api.require('alivcLivePusher'); //新阿里云预览
       alivcLivePusher.setBeautyValues({
  beautyBuffing:parseInt(ret.value),          //磨皮
beautyWhite:$api.getStorage('meibai'),             //美白
beautyRuddy:$api.getStorage('hongrun'),         //红润
beautyCheekPink:$api.getStorage('shoulian'),     //腮红
beautyShortenFace:$api.getStorage('saihong'),         //瘦脸
beautyThinFace:$api.getStorage('xiaolian'),    //下吧,也就是小脸
beautyBigEye:$api.getStorage('dayan'),          //大眼
   
});
 
       }
    } else {
       // alert(JSON.stringify(err));
    }
});
		//滑动结束
  }
   function meibai(frameName,gaodu){ //磨皮
  
  //滑动开始
		var uislider = api.require('UISlider');
uislider.open({
    animation: true,
    orientation: 'horizontal',
    rect: {
        x: api.frameWidth/2+10,
        y: gaodu||api.frameHeight/2/6,
        size: api.frameWidth/2-20
    },
    bubble: {
        direction: 'top',
        state: 'always',
        w: 100,
        h: 30,
        size: 14,
        color: 'rgba(255,255,255,255)',
        bg: 'widget://res/slider/bubble.png',
        prefix: '美白',
        suffix: ''
    },
    handler: {
        w: 10,
        h: 8,
        bg: 'widget://zhibo/image/handler.png'
    },
    bar: {
        h: 5,
        bg: 'rgba(255,255,255,255)',
        active: 'widget://zhibo/image/bubble.png'
    },
    value: {
        min: 0,
        max: 100,
        step: 1,
        init: $api.getStorage('meibai')
    },
     fixedOn: frameName||api.frameName,
    fixed: false
}, function(ret, err) {
    if (ret) {
            $api.setStorage('meiyan2',ret.id);
       if(ret.eventType=='end'){
$api.setStorage('meibai',ret.value);
       var alivcLivePusher = api.require('alivcLivePusher'); //新阿里云预览
       alivcLivePusher.setBeautyValues({
beautyBuffing:$api.getStorage('mopi'),          //磨皮
beautyWhite:parseInt(ret.value),           //美白
beautyRuddy:$api.getStorage('hongrun'),         //红润
beautyCheekPink:$api.getStorage('shoulian'),     //腮红
beautyShortenFace:$api.getStorage('saihong'),         //瘦脸
beautyThinFace:$api.getStorage('xiaolian'),    //下吧,也就是小脸
beautyBigEye:$api.getStorage('dayan'),          //大眼
});
 
       }
    } else {
       // alert(JSON.stringify(err));
    }
});
		//滑动结束
  }
		
			 function hongrun(frameName,gaodu){ //红润
  
  //滑动开始
		var uislider = api.require('UISlider');
uislider.open({
    animation: true,
    orientation: 'horizontal',
    rect: {
        x: 10,
        y: gaodu||(api.frameHeight/2/6)*2,
        size: api.frameWidth/2-20
    },
    bubble: {
        direction: 'top',
        state: 'always',
        w: 100,
        h: 30,
        size: 14,
        color: 'rgba(255,255,255,255)',
        bg: 'widget://res/slider/bubble.png',
        prefix: '红润',
        suffix: ''
    },
    handler: {
        w: 10,
        h: 8,
        bg: 'widget://zhibo/image/handler.png'
    },
    bar: {
        h: 5,
        bg: 'rgba(255,255,255,255)',
        active: 'widget://zhibo/image/bubble.png'
    },
    value: {
        min: 0,
        max: 100,
        step: 1,
        init: $api.getStorage('hongrun')
    },
     fixedOn: frameName||api.frameName,
    fixed: false
}, function(ret, err) {
    if (ret) {
            $api.setStorage('meiyan3',ret.id);
       if(ret.eventType=='end'){
$api.setStorage('hongrun',ret.value);
       var alivcLivePusher = api.require('alivcLivePusher'); //新阿里云预览
       alivcLivePusher.setBeautyValues({
beautyBuffing:$api.getStorage('mopi'),          //磨皮
beautyWhite:$api.getStorage('meibai'),             //美白
beautyRuddy:parseInt(ret.value),        //红润
beautyCheekPink:$api.getStorage('shoulian'),     //腮红
beautyShortenFace:$api.getStorage('saihong'),         //瘦脸
beautyThinFace:$api.getStorage('xiaolian'),    //下吧,也就是小脸
beautyBigEye:$api.getStorage('dayan'),          //大眼
   
});
 
       }
    } else {
       // alert(JSON.stringify(err));
    }
});
		//滑动结束
  }
  	 function saihong(frameName,gaodu){ //小脸 也就是腮红
  
  //滑动开始
		var uislider = api.require('UISlider');
uislider.open({
    animation: true,
    orientation: 'horizontal',
    rect: {
        x: api.frameWidth/2+10,
        y: gaodu||(api.frameHeight/2/6)*2,
        size: api.frameWidth/2-20
    },
    bubble: {
        direction: 'top',
        state: 'always',
        w: 100,
        h: 30,
        size: 14,
        color: 'rgba(255,255,255,255)',
        bg: 'widget://res/slider/bubble.png',
        prefix: '腮红',
        suffix: ''
    },
    handler: {
        w: 10,
        h: 8,
        bg: 'widget://zhibo/image/handler.png'
    },
    bar: {
        h: 5,
        bg: 'rgba(255,255,255,255)',
        active: 'widget://zhibo/image/bubble.png'
    },
    value: {
        min: 0,
        max: 100,
        step: 1,
        init: $api.getStorage('saihong')
    },
     fixedOn: frameName||api.frameName,
    fixed: false
}, function(ret, err) {
    if (ret) {
            $api.setStorage('meiyan4',ret.id);
       if(ret.eventType=='end'){
$api.setStorage('saihong',ret.value);
       var alivcLivePusher = api.require('alivcLivePusher'); //新阿里云预览
       alivcLivePusher.setBeautyValues({
  beautyBuffing:$api.getStorage('mopi'),          //磨皮
beautyWhite:$api.getStorage('meibai'),             //美白
beautyRuddy:$api.getStorage('hongrun'),         //红润
beautyCheekPink:parseInt(ret.value),    //腮红
beautyShortenFace:$api.getStorage('saihong'),         //瘦脸
beautyThinFace:$api.getStorage('xiaolian'),    //下吧,也就是小脸
beautyBigEye:$api.getStorage('dayan'),          //大眼
   
});
 
       }
    } else {
       // alert(JSON.stringify(err));
    }
});
		//滑动结束
  }
  
		 function shoulian(frameName,gaodu){ //瘦脸
  
  //滑动开始
		var uislider = api.require('UISlider');
uislider.open({
    animation: true,
    orientation: 'horizontal',
    rect: {
        x: 10,
        y: gaodu||(api.frameHeight/2/6)*3,
        size: api.frameWidth/2-20
    },
    bubble: {
        direction: 'top',
        state: 'always',
        w: 100,
        h: 30,
        size: 14,
        color: 'rgba(255,255,255,255)',
        bg: 'widget://res/slider/bubble.png',
        prefix: '瘦脸',
        suffix: ''
    },
    handler: {
        w: 10,
        h: 8,
        bg: 'widget://zhibo/image/handler.png'
    },
    bar: {
        h: 5,
        bg: 'rgba(255,255,255,255)',
        active: 'widget://zhibo/image/bubble.png'
    },
    value: {
        min: 0,
        max: 100,
        step: 1,
        init: $api.getStorage('shoulian')
    },
    fixedOn: frameName||api.frameName,
    fixed: false
}, function(ret, err) {
    if (ret) {
            $api.setStorage('meiyan5',ret.id);
       if(ret.eventType=='end'){
      
$api.setStorage('shoulian',ret.value);
       var alivcLivePusher = api.require('alivcLivePusher'); //新阿里云预览
       alivcLivePusher.setBeautyValues({
  beautyBuffing:$api.getStorage('mopi'),          //磨皮
beautyWhite:$api.getStorage('meibai'),             //美白
beautyRuddy:$api.getStorage('hongrun'),         //红润
beautyCheekPink:$api.getStorage('shoulian'),     //腮红
beautyShortenFace:parseInt(ret.value),         //瘦脸
beautyThinFace:$api.getStorage('xiaolian'),    //下吧,也就是小脸
beautyBigEye:$api.getStorage('dayan'),          //大眼
   
   
});
 
       }
    } else {
       // alert(JSON.stringify(err));
    }
});
		//滑动结束
  }
  		 function xiaolian(frameName,gaodu){ //大眼
  
  //滑动开始
		var uislider = api.require('UISlider');
uislider.open({
    animation: true,
    orientation: 'horizontal',
    rect: {
        x: api.frameWidth/2+10,
        y: gaodu||(api.frameHeight/2/6)*3,
        size: api.frameWidth/2-20
    },
    bubble: {
        direction: 'top',
        state: 'always',
        w: 100,
        h: 30,
        size: 14,
        color: 'rgba(255,255,255,255)',
        bg: 'widget://res/slider/bubble.png',
        prefix: '小脸',
        suffix: ''
    },
    handler: {
        w: 10,
        h: 8,
        bg: 'widget://zhibo/image/handler.png'
    },
    bar: {
        h: 5,
        bg: 'rgba(255,255,255,255)',
        active: 'widget://zhibo/image/bubble.png'
    },
    value: {
        min: 0,
        max: 100,
        step: 1,
        init: $api.getStorage('xiaolian')
    },
     fixedOn: frameName||api.frameName,
    fixed: false
}, function(ret, err) {
    if (ret) {
    $api.setStorage('meiyan6',ret.id);
       if(ret.eventType=='end'){
        $api.setStorage('xiaolian',ret.value);
       var alivcLivePusher = api.require('alivcLivePusher'); //新阿里云预览
       alivcLivePusher.setBeautyValues({
 beautyBuffing:$api.getStorage('mopi'),          //磨皮
beautyWhite:$api.getStorage('meibai'),             //美白
beautyRuddy:$api.getStorage('hongrun'),         //红润
beautyCheekPink:$api.getStorage('shoulian'),     //腮红
beautyShortenFace:$api.getStorage('saihong'),         //瘦脸
beautyThinFace:parseInt(ret.value),    //下吧,也就是小脸
beautyBigEye:$api.getStorage('dayan'),          //大眼
   
});
 
       }
    } else {
       // alert(JSON.stringify(err));
    }
});
		//滑动结束
  }
  
  		 function dayan(frameName,gaodu){ //大眼
  
  //滑动开始
		var uislider = api.require('UISlider');
uislider.open({
    animation: true,
    orientation: 'horizontal',
    rect: {
        x: 10,
        y: gaodu||(api.frameHeight/2/6)*4,
        size: api.frameWidth-20
    },
    bubble: {
        direction: 'top',
        state: 'always',
        w: 100,
        h: 30,
        size: 14,
        color: 'rgba(255,255,255,255)',
        bg: 'widget://res/slider/bubble.png',
        prefix: '大眼',
        suffix: ''
    },
    handler: {
        w: 10,
        h: 8,
        bg: 'widget://zhibo/image/handler.png'
    },
    bar: {
        h: 5,
        bg: 'rgba(255,255,255,255)',
        active: 'widget://zhibo/image/bubble.png'
    },
    value: {
        min: 0,
        max: 100,
        step: 1,
        init: $api.getStorage('dayan')
    },
     fixedOn: frameName||api.frameName,
    fixed: false
}, function(ret, err) {
    if (ret) {
    $api.setStorage('meiyan7',ret.id);
       if(ret.eventType=='end'){
        $api.setStorage('dayan',ret.value);
       var alivcLivePusher = api.require('alivcLivePusher'); //新阿里云预览
       alivcLivePusher.setBeautyValues({
    beautyBuffing:$api.getStorage('mopi'),          //磨皮
beautyWhite:$api.getStorage('meibai'),             //美白
beautyRuddy:$api.getStorage('hongrun'),         //红润
beautyCheekPink:$api.getStorage('shoulian'),     //腮红
beautyShortenFace:$api.getStorage('saihong'),         //瘦脸
beautyThinFace:$api.getStorage('xiaolian'),    //下吧,也就是小脸
beautyBigEye:parseInt(ret.value),         //大眼

   
});
 
       }
    } else {
       // alert(JSON.stringify(err));
    }
});
		//滑动结束
  }
		