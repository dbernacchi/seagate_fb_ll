/*
 * vExt JS Library 3.0.2
 * Copyright(c) 2006-2009, vExt JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

window.undefined = window.undefined;
vExt = {
    version : '3.0.1'
};
vExt.apply = function(o, c, defaults){
    if(defaults){
        vExt.apply(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};
(function(){
    var idSeed = 0,
        toString = Object.prototype.toString,
        ua = navigator.userAgent.toLowerCase(),
        check = function(r){
            return r.test(ua);
        },
        DOC = document,
        isStrict = DOC.compatMode == "CSS1Compat",
        isOpera = check(/opera/),
        isChrome = check(/chrome/),
        isWebKit = check(/webkit/),
        isSafari = !isChrome && check(/safari/),
        isSafari2 = isSafari && check(/applewebkit\/4/), 
        isSafari3 = isSafari && check(/version\/3/),
        isSafari4 = isSafari && check(/version\/4/),
        isIE = !isOpera && check(/msie/),
        isIE7 = isIE && check(/msie 7/),
        isIE8 = isIE && check(/msie 8/),
        isIE6 = isIE && !isIE7 && !isIE8,
        isGecko = !isWebKit && check(/gecko/),
        isGecko2 = isGecko && check(/rv:1\.8/),
        isGecko3 = isGecko && check(/rv:1\.9/),
        isBorderBox = isIE && !isStrict,
        isWindows = check(/windows|win32/),
        isMac = check(/macintosh|mac os x/),
        isAir = check(/adobeair/),
        isLinux = check(/linux/),
        isSecure = /^https/i.test(window.location.protocol);
    if(isIE6){
        try{
            DOC.execCommand("BackgroundImageCache", false, true);
        }catch(e){}
    }
    vExt.apply(vExt, {
        SSL_SECURE_URL : isSecure && isIE ? 'javascript:""' : 'about:blank', 
        isStrict : isStrict,
        isSecure : isSecure,
        isReady : false,
        enableGarbageCollector : true,
        enableListenerCollection : false,
        USE_NATIVE_JSON : false,
        applyIf : function(o, c){
            if(o){
                for(var p in c){
                    if(!vExt.isDefined(o[p])){
                        o[p] = c[p];
                    }
                }
            }
            return o;
        },
        id : function(el, prefix){
            return (el = vExt.getDom(el) || {}).id = el.id || (prefix || "vext-gen") + (++idSeed);
        },
        extend : function(){
            var io = function(o){
                for(var m in o){
                    this[m] = o[m];
                }
            };
            var oc = Object.prototype.constructor;
            return function(sb, sp, overrides){
                if(vExt.isObject(sp)){
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
                }
                var F = function(){},
                    sbp,
                    spp = sp.prototype;
                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor=sb;
                sb.superclass=spp;
                if(spp.constructor == oc){
                    spp.constructor=sp;
                }
                sb.override = function(o){
                    vExt.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function(){
                    return spp;
                });
                sbp.override = io;
                vExt.override(sb, overrides);
                sb.extend = function(o){return vExt.extend(sb, o);};
                return sb;
            };
        }(),
        override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                vExt.apply(p, overrides);
                if(vExt.isIE && overrides.toString != origclass.toString){
                    p.toString = overrides.toString;
                }
            }
        },
        namespace : function(){
            var o, d;
            vExt.each(arguments, function(v) {
                d = v.split(".");
                o = window[d[0]] = window[d[0]] || {};
                vExt.each(d.slice(1), function(v2){
                    o = o[v2] = o[v2] || {};
                });
            });
            return o;
        },
        urlEncode : function(o, pre){
            var empty,
                buf = [],
                e = encodeURIComponent;
            vExt.iterate(o, function(key, item){
                empty = vExt.isEmpty(item);
                vExt.each(empty ? key : item, function(val){
                    buf.push('&', e(key), '=', (!vExt.isEmpty(val) && (val != key || !empty)) ? (vExt.isDate(val) ? vExt.encode(val).replace(/"/g, '') : e(val)) : '');
                });
            });
            if(!pre){
                buf.shift();
                pre = '';
            }
            return pre + buf.join('');
        },
        urlDecode : function(string, overwrite){
            if(vExt.isEmpty(string)){
                return {};
            }
            var obj = {},
                pairs = string.split('&'),
                d = decodeURIComponent,
                name,
                value;
            vExt.each(pairs, function(pair) {
                pair = pair.split('=');
                name = d(pair[0]);
                value = d(pair[1]);
                obj[name] = overwrite || !obj[name] ? value :
                            [].concat(obj[name]).concat(value);
            });
            return obj;
        },
        urlAppend : function(url, s){
            if(!vExt.isEmpty(s)){
                return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
            }
            return url;
        },
        toArray : function(){
            return isIE ?
                function(a, i, j, res){
                    res = [];
                    vExt.each(a, function(v) {
                        res.push(v);
                    });
                    return res.slice(i || 0, j || res.length);
                } :
                function(a, i, j){
                    return Array.prototype.slice.call(a, i || 0, j || a.length);
                }
        }(),
        isIterable : function(v){
            if(vExt.isArray(v) || v.callee){
                return true;
            }
            if(/NodeList|HTMLCollection/.test(toString.call(v))){
                return true;
            }
            return ((v.nextNode || v.item) && vExt.isNumber(v.length));
        },
        each : function(array, fn, scope){
            if(vExt.isEmpty(array, true)){
                return;
            }
            if(!vExt.isIterable(array) || vExt.isPrimitive(array)){
                array = [array];
            }
            for(var i = 0, len = array.length; i < len; i++){
                if(fn.call(scope || array[i], array[i], i, array) === false){
                    return i;
                };
            }
        },
        iterate : function(obj, fn, scope){
            if(vExt.isEmpty(obj)){
                return;
            }
            if(vExt.isIterable(obj)){
                vExt.each(obj, fn, scope);
                return;
            }else if(vExt.isObject(obj)){
                for(var prop in obj){
                    if(obj.hasOwnProperty(prop)){
                        if(fn.call(scope || obj, prop, obj[prop]) === false){
                            return;
                        };
                    }
                }
            }
        },
        getDom : function(el){
            if(!el || !DOC){
                return null;
            }
            return el.dom ? el.dom : (vExt.isString(el) ? DOC.getElementById(el) : el);
        },
        getBody : function(){
            return vExt.get(DOC.body || DOC.documentElement);
        },
        removeNode : isIE ? function(){
            var d;
            return function(n){
                if(n && n.tagName != 'BODY'){
                    d = d || DOC.createElement('div');
                    d.appendChild(n);
                    d.innerHTML = '';
                }
            }
        }() : function(n){
            if(n && n.parentNode && n.tagName != 'BODY'){
                n.parentNode.removeChild(n);
            }
        },
        isEmpty : function(v, allowBlank){
            return v === null || v === undefined || ((vExt.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },
        isArray : function(v){
            return toString.apply(v) === '[object Array]';
        },
        isDate : function(v){
            return toString.apply(v) === '[object Date]';
        },
        isObject : function(v){
            return v && typeof v == "object";
        },
        isPrimitive : function(v){
            return vExt.isString(v) || vExt.isNumber(v) || vExt.isBoolean(v);
        },
        isFunction : function(v){
            return toString.apply(v) === '[object Function]';
        },
        isNumber : function(v){
            return typeof v === 'number' && isFinite(v);
        },
        isString : function(v){
            return typeof v === 'string';
        },
        isBoolean : function(v){
            return typeof v === 'boolean';
        },
        isDefined : function(v){
            return typeof v !== 'undefined';
        },
        isOpera : isOpera,
        isWebKit : isWebKit,
        isChrome : isChrome,
        isSafari : isSafari,
        isSafari3 : isSafari3,
        isSafari4 : isSafari4,
        isSafari2 : isSafari2,
        isIE : isIE,
        isIE6 : isIE6,
        isIE7 : isIE7,
        isIE8 : isIE8,
        isGecko : isGecko,
        isGecko2 : isGecko2,
        isGecko3 : isGecko3,
        isBorderBox : isBorderBox,
        isLinux : isLinux,
        isWindows : isWindows,
        isMac : isMac,
        isAir : isAir
    });
    vExt.ns = vExt.namespace;
})();
vExt.ns("vExt", "vExt.util", "vExt.lib", "vExt.data");
vExt.apply(Function.prototype, {
    createInterceptor : function(fcn, scope){
        var method = this;
        return !vExt.isFunction(fcn) ?
                this :
                function() {
                    var me = this,
                        args = arguments;
                    fcn.target = me;
                    fcn.method = method;
                    return (fcn.apply(scope || me || window, args) !== false) ?
                            method.apply(me || window, args) :
                            null;
                };
    },
    createCallback : function( ){
        var args = arguments,
            method = this;
        return function() {
            return method.apply(window, args);
        };
    },
    createDelegate : function(obj, args, appendArgs){
        var method = this;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (vExt.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0); 
                var applyArgs = [appendArgs, 0].concat(args); 
                Array.prototype.splice.apply(callArgs, applyArgs); 
            }
            return method.apply(obj || window, callArgs);
        };
    },
    defer : function(millis, obj, args, appendArgs){
        var fn = this.createDelegate(obj, args, appendArgs);
        if(millis > 0){
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    }
});
vExt.applyIf(String, {
    format : function(format){
        var args = vExt.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    }
});
vExt.applyIf(Array.prototype, {
    indexOf : function(o, from){
        var len = this.length;
        from = from || 0;
        from += (from < 0) ? len : 0;
        for (; from < len; ++from){
            if(this[from] === o){
                return from;
            }
        }
        return -1;
    },
    remove : function(o){
        var index = this.indexOf(o);
        if(index != -1){
            this.splice(index, 1);
        }
        return this;
    }
});
vExt.ns("vExt.grid", "vExt.dd", "vExt.tree", "vExt.form", "vExt.menu",
       "vExt.state", "vExt.layout", "vExt.app", "vExt.ux", "vExt.chart", "vExt.direct");
vExt.apply(vExt, function(){
    var E = vExt, 
        idSeed = 0,
        scrollWidth = null;
    return {
        emptyFn : function(){},
        BLANK_IMAGE_URL : vExt.isIE6 || vExt.isIE7 || vExt.isAir ?
                            'http:/' + '/extjs.com/s.gif' :
                            'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        extendX : function(supr, fn){
            return vExt.extend(supr, fn(supr.prototype));
        },
        getDoc : function(){
            return vExt.get(document);
        },
        num : function(v, defaultValue){
            v = Number(vExt.isEmpty(v) || vExt.isBoolean(v) ? NaN : v);
            return isNaN(v)? defaultValue : v;
        },
        value : function(v, defaultValue, allowBlank){
            return vExt.isEmpty(v, allowBlank) ? defaultValue : v;
        },
        escapeRe : function(s) {
            return s.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
        },
        sequence : function(o, name, fn, scope){
            o[name] = o[name].createSequence(fn, scope);
        },
        addBehaviors : function(o){
            if(!vExt.isReady){
                vExt.onReady(function(){
                    vExt.addBehaviors(o);
                });
            } else {
                var cache = {}, 
                    parts,
                    b,
                    s;
                for (b in o) {
                    if ((parts = b.split('@'))[1]) { 
                        s = parts[0];
                        if(!cache[s]){
                            cache[s] = vExt.select(s);
                        }
                        cache[s].on(parts[1], o[b]);
                    }
                }
                cache = null;
            }
        },
        getScrollBarWidth: function(force){
            if(!vExt.isReady){
                return 0;
            }
            if(force === true || scrollWidth === null){
                var div = vExt.getBody().createChild('<div class="x-hide-offsets" style="width:100px;height:50px;overflow:hidden;"><div style="height:200px;"></div></div>'),
                    child = div.child('div', true);
                var w1 = child.offsetWidth;
                div.setStyle('overflow', (vExt.isWebKit || vExt.isGecko) ? 'auto' : 'scroll');
                var w2 = child.offsetWidth;
                div.remove();
                scrollWidth = w1 - w2 + 2;
            }
            return scrollWidth;
        },
        combine : function(){
            var as = arguments, l = as.length, r = [];
            for(var i = 0; i < l; i++){
                var a = as[i];
                if(vExt.isArray(a)){
                    r = r.concat(a);
                }else if(a.length !== undefined && !a.substr){
                    r = r.concat(Array.prototype.slice.call(a, 0));
                }else{
                    r.push(a);
                }
            }
            return r;
        },
        copyTo : function(dest, source, names){
            if(vExt.isString(names)){
                names = names.split(/[,;\s]/);
            }
            vExt.each(names, function(name){
                if(source.hasOwnProperty(name)){
                    dest[name] = source[name];
                }
            }, this);
            return dest;
        },
        destroy : function(){
            vExt.each(arguments, function(arg){
                if(arg){
                    if(vExt.isArray(arg)){
                        this.destroy.apply(this, arg);
                    }else if(vExt.isFunction(arg.destroy)){
                        arg.destroy();
                    }else if(arg.dom){
                        arg.remove();
                    }    
                }
            }, this);
        },
        destroyMembers : function(o, arg1, arg2, etc){
            for(var i = 1, a = arguments, len = a.length; i < len; i++) {
                vExt.destroy(o[a[i]]);
                delete o[a[i]];
            }
        },
        clean : function(arr){
            var ret = [];
            vExt.each(arr, function(v){
                if(!!v){
                    ret.push(v);
                }
            });
            return ret;
        },
        unique : function(arr){
            var ret = [],
                collect = {};
            vExt.each(arr, function(v) {
                if(!collect[v]){
                    ret.push(v);
                }
                collect[v] = true;
            });
            return ret;
        },
        flatten : function(arr){
            var worker = [];
            function rFlatten(a) {
                vExt.each(a, function(v) {
                    if(vExt.isArray(v)){
                        rFlatten(v);
                    }else{
                        worker.push(v);
                    }
                });
                return worker;
            }
            return rFlatten(arr);
        },
        min : function(arr, comp){
            var ret = arr[0];
            comp = comp || function(a,b){ return a < b ? -1 : 1; };
            vExt.each(arr, function(v) {
                ret = comp(ret, v) == -1 ? ret : v;
            });
            return ret;
        },
        max : function(arr, comp){
            var ret = arr[0];
            comp = comp || function(a,b){ return a > b ? 1 : -1; };
            vExt.each(arr, function(v) {
                ret = comp(ret, v) == 1 ? ret : v;
            });
            return ret;
        },
        mean : function(arr){
           return vExt.sum(arr) / arr.length;
        },
        sum : function(arr){
           var ret = 0;
           vExt.each(arr, function(v) {
               ret += v;
           });
           return ret;
        },
        partition : function(arr, truth){
            var ret = [[],[]];
            vExt.each(arr, function(v, i, a) {
                ret[ (truth && truth(v, i, a)) || (!truth && v) ? 0 : 1].push(v);
            });
            return ret;
        },
        invoke : function(arr, methodName){
            var ret = [],
                args = Array.prototype.slice.call(arguments, 2);
            vExt.each(arr, function(v,i) {
                if (v && vExt.isFunction(v[methodName])) {
                    ret.push(v[methodName].apply(v, args));
                } else {
                    ret.push(undefined);
                }
            });
            return ret;
        },
        pluck : function(arr, prop){
            var ret = [];
            vExt.each(arr, function(v) {
                ret.push( v[prop] );
            });
            return ret;
        },
        zip : function(){
            var parts = vExt.partition(arguments, function( val ){ return !vExt.isFunction(val); }),
                arrs = parts[0],
                fn = parts[1][0],
                len = vExt.max(vExt.pluck(arrs, "length")),
                ret = [];
            for (var i = 0; i < len; i++) {
                ret[i] = [];
                if(fn){
                    ret[i] = fn.apply(fn, vExt.pluck(arrs, i));
                }else{
                    for (var j = 0, aLen = arrs.length; j < aLen; j++){
                        ret[i].push( arrs[j][i] );
                    }
                }
            }
            return ret;
        },
        getCmp : function(id){
            return vExt.ComponentMgr.get(id);
        },
        useShims: E.isIE6 || (E.isMac && E.isGecko2),
        type : function(o){
            if(o === undefined || o === null){
                return false;
            }
            if(o.htmlElement){
                return 'element';
            }
            var t = typeof o;
            if(t == 'object' && o.nodeName) {
                switch(o.nodeType) {
                    case 1: return 'element';
                    case 3: return (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
                }
            }
            if(t == 'object' || t == 'function') {
                switch(o.constructor) {
                    case Array: return 'array';
                    case RegExp: return 'regexp';
                    case Date: return 'date';
                }
                if(vExt.isNumber(o.length) && vExt.isFunction(o.item)) {
                    return 'nodelist';
                }
            }
            return t;
        },
        intercept : function(o, name, fn, scope){
            o[name] = o[name].createInterceptor(fn, scope);
        },
        callback : function(cb, scope, args, delay){
            if(vExt.isFunction(cb)){
                if(delay){
                    cb.defer(delay, scope, args || []);
                }else{
                    cb.apply(scope, args || []);
                }
            }
        }
    };
}());
vExt.apply(Function.prototype, {
    createSequence : function(fcn, scope){
        var method = this;
        return !vExt.isFunction(fcn) ?
                this :
                function(){
                    var retval = method.apply(this || window, arguments);
                    fcn.apply(scope || this || window, arguments);
                    return retval;
                };
    }
});
vExt.applyIf(String, {
    escape : function(string) {
        return string.replace(/('|\\)/g, "\\$1");
    },
    leftPad : function (val, size, ch) {
        var result = String(val);
        if(!ch) {
            ch = " ";
        }
        while (result.length < size) {
            result = ch + result;
        }
        return result;
    }
});
String.prototype.toggle = function(value, other){
    return this == value ? other : value;
};
String.prototype.trim = function(){
    var re = /^\s+|\s+$/g;
    return function(){ return this.replace(re, ""); };
}();
Date.prototype.getElapsed = function(date) {
    return Math.abs((date || new Date()).getTime()-this.getTime());
};
vExt.applyIf(Number.prototype, {
    constrain : function(min, max){
        return Math.min(Math.max(this, min), max);
    }
});
vExt.util.TaskRunner = function(interval){
    interval = interval || 10;
    var tasks = [], 
    	removeQueue = [],
    	id = 0,
    	running = false,
    	stopThread = function(){
	        running = false;
	        clearInterval(id);
	        id = 0;
	    },
    	startThread = function(){
	        if(!running){
	            running = true;
	            id = setInterval(runTasks, interval);
	        }
	    },
    	removeTask = function(t){
	        removeQueue.push(t);
	        if(t.onStop){
	            t.onStop.apply(t.scope || t);
	        }
	    },
    	runTasks = function(){
	    	var rqLen = removeQueue.length,
	    		now = new Date().getTime();	    			    		
	        if(rqLen > 0){
	            for(var i = 0; i < rqLen; i++){
	                tasks.remove(removeQueue[i]);
	            }
	            removeQueue = [];
	            if(tasks.length < 1){
	                stopThread();
	                return;
	            }
	        }	        
	        for(var i = 0, t, itime, rt, len = tasks.length; i < len; ++i){
	            t = tasks[i];
	            itime = now - t.taskRunTime;
	            if(t.interval <= itime){
	                rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
	                t.taskRunTime = now;
	                if(rt === false || t.taskRunCount === t.repeat){
	                    removeTask(t);
	                    return;
	                }
	            }
	            if(t.duration && t.duration <= (now - t.taskStartTime)){
	                removeTask(t);
	            }
	        }
	    };
    this.start = function(task){
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };
    this.stop = function(task){
        removeTask(task);
        return task;
    };
    this.stopAll = function(){
        stopThread();
        for(var i = 0, len = tasks.length; i < len; i++){
            if(tasks[i].onStop){
                tasks[i].onStop();
            }
        }
        tasks = [];
        removeQueue = [];
    };
};
vExt.TaskMgr = new vExt.util.TaskRunner();
(function(){
	var libFlyweight;
	function fly(el) {
        if (!libFlyweight) {
            libFlyweight = new vExt.Element.Flyweight();
        }
        libFlyweight.dom = el;
        return libFlyweight;
    }
(function(){
	var doc = document,
		isCSS1 = doc.compatMode == "CSS1Compat",
		MAX = Math.max,		
        ROUND = Math.round,
		PARSEINT = parseInt;
	vExt.lib.Dom = {
	    isAncestor : function(p, c) {
		    var ret = false;
			p = vExt.getDom(p);
			c = vExt.getDom(c);
			if (p && c) {
				if (p.contains) {
					return p.contains(c);
				} else if (p.compareDocumentPosition) {
					return !!(p.compareDocumentPosition(c) & 16);
				} else {
					while (c = c.parentNode) {
						ret = c == p || ret;	        			
					}
				}	            
			}	
			return ret;
		},
        getViewWidth : function(full) {
            return full ? this.getDocumentWidth() : this.getViewportWidth();
        },
        getViewHeight : function(full) {
            return full ? this.getDocumentHeight() : this.getViewportHeight();
        },
        getDocumentHeight: function() {            
            return MAX(!isCSS1 ? doc.body.scrollHeight : doc.documentElement.scrollHeight, this.getViewportHeight());
        },
        getDocumentWidth: function() {            
            return MAX(!isCSS1 ? doc.body.scrollWidth : doc.documentElement.scrollWidth, this.getViewportWidth());
        },
        getViewportHeight: function(){
	        return vExt.isIE ? 
	        	   (vExt.isStrict ? doc.documentElement.clientHeight : doc.body.clientHeight) :
	        	   self.innerHeight;
        },
        getViewportWidth : function() {
	        return !vExt.isStrict && !vExt.isOpera ? doc.body.clientWidth :
	        	   vExt.isIE ? doc.documentElement.clientWidth : self.innerWidth;
        },
        getY : function(el) {
            return this.getXY(el)[1];
        },
        getX : function(el) {
            return this.getXY(el)[0];
        },
        getXY : function(el) {
            var p, 
            	pe, 
            	b,
            	bt, 
            	bl,     
            	dbd,       	
            	x = 0,
            	y = 0, 
            	scroll,
            	hasAbsolute, 
            	bd = (doc.body || doc.documentElement),
            	ret = [0,0];
            el = vExt.getDom(el);
            if(el != bd){
	            if (el.getBoundingClientRect) {
	                b = el.getBoundingClientRect();
	                scroll = fly(document).getScroll();
	                ret = [ROUND(b.left + scroll.left), ROUND(b.top + scroll.top)];
	            } else {  
		            p = el;		
		            hasAbsolute = fly(el).isStyle("position", "absolute");
		            while (p) {
			            pe = fly(p);		
		                x += p.offsetLeft;
		                y += p.offsetTop;
		                hasAbsolute = hasAbsolute || pe.isStyle("position", "absolute");
		                if (vExt.isGecko) {		                    
		                    y += bt = PARSEINT(pe.getStyle("borderTopWidth"), 10) || 0;
		                    x += bl = PARSEINT(pe.getStyle("borderLeftWidth"), 10) || 0;	
		                    if (p != el && !pe.isStyle('overflow','visible')) {
		                        x += bl;
		                        y += bt;
		                    }
		                }
		                p = p.offsetParent;
		            }
		            if (vExt.isSafari && hasAbsolute) {
		                x -= bd.offsetLeft;
		                y -= bd.offsetTop;
		            }
		            if (vExt.isGecko && !hasAbsolute) {
		                dbd = fly(bd);
		                x += PARSEINT(dbd.getStyle("borderLeftWidth"), 10) || 0;
		                y += PARSEINT(dbd.getStyle("borderTopWidth"), 10) || 0;
		            }
		            p = el.parentNode;
		            while (p && p != bd) {
		                if (!vExt.isOpera || (p.tagName != 'TR' && !fly(p).isStyle("display", "inline"))) {
		                    x -= p.scrollLeft;
		                    y -= p.scrollTop;
		                }
		                p = p.parentNode;
		            }
		            ret = [x,y];
	            }
         	}
            return ret
        },
        setXY : function(el, xy) {
            (el = vExt.fly(el, '_setXY')).position();
            var pts = el.translatePoints(xy),
            	style = el.dom.style,
            	pos;            	
            for (pos in pts) {	            
	            if(!isNaN(pts[pos])) style[pos] = pts[pos] + "px"
            }
        },
        setX : function(el, x) {
            this.setXY(el, [x, false]);
        },
        setY : function(el, y) {
            this.setXY(el, [false, y]);
        }
    };
})();
vExt.lib.Dom.getRegion = function(el) {
    return vExt.lib.Region.getRegion(el);
};
vExt.lib.Event = function() {
    var loadComplete = false,
        listeners = [],
        unloadListeners = [],
        retryCount = 0,
        onAvailStack = [],
        _interval,
        locked = false,
        win = window,
        doc = document,
        POLL_RETRYS = 200,
        POLL_INTERVAL = 20,
        EL = 0,
        TYPE = 1,
        FN = 2,
        WFN = 3,
        OBJ = 3,
        ADJ_SCOPE = 4,   
        SCROLLLEFT = 'scrollLeft',
        SCROLLTOP = 'scrollTop',
        UNLOAD = 'unload',
        MOUSEOVER = 'mouseover',
        MOUSEOUT = 'mouseout',
        doAdd = function() {
            var ret;
            if (win.addEventListener) {
                ret = function(el, eventName, fn, capture) {
                    if (eventName == 'mouseenter') {
                        fn = fn.createInterceptor(checkRelatedTarget);
                        el.addEventListener(MOUSEOVER, fn, (capture));
                    } else if (eventName == 'mouseleave') {
                        fn = fn.createInterceptor(checkRelatedTarget);
                        el.addEventListener(MOUSEOUT, fn, (capture));
                    } else {
                        el.addEventListener(eventName, fn, (capture));
                    }
                    return fn;
                };
            } else if (win.attachEvent) {
                ret = function(el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                    return fn;
                };
            } else {
                ret = function(){};
            }
            return ret;
        }(),    
        doRemove = function(){
            var ret;
            if (win.removeEventListener) {
                ret = function (el, eventName, fn, capture) {
                    if (eventName == 'mouseenter') {
                        eventName = MOUSEOVER;
                    } else if (eventName == 'mouseleave') {
                        eventName = MOUSEOUT;
                    }                        
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (win.detachEvent) {
                ret = function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                ret = function(){};
            }
            return ret;
        }();        
    function checkRelatedTarget(e) {
        return !elContains(e.currentTarget, pub.getRelatedTarget(e));
    }
    function elContains(parent, child) {
       if(parent && parent.firstChild){  
         while(child) {
            if(child === parent) {
                return true;
            }
            child = child.parentNode;            
            if(child && (child.nodeType != 1)) {
                child = null;
            }
          }
        }
        return false;
    }
    function _getCacheIndex(el, eventName, fn) {
        var index = -1;
        vExt.each(listeners, function (v,i) {
            if(v && v[FN] == fn && v[EL] == el && v[TYPE] == eventName) {
                index = i;
            }
        });
        return index;
    }
    function _tryPreloadAttach() {
        var ret = false,                
            notAvail = [],
            element,
            tryAgain = !loadComplete || (retryCount > 0);                       
        if (!locked) {
            locked = true;
            vExt.each(onAvailStack, function (v,i,a){
                if(v && (element = doc.getElementById(v.id))){
                    if(!v.checkReady || loadComplete || element.nextSibling || (doc && doc.body)) {
                        element = v.override ? (v.override === true ? v.obj : v.override) : element;
                        v.fn.call(element, v.obj);
                        onAvailStack[i] = null;
                    } else {
                        notAvail.push(v);
                    }
                }   
            });
            retryCount = (notAvail.length === 0) ? 0 : retryCount - 1;
            if (tryAgain) { 
                startInterval();
            } else {
                clearInterval(_interval);
                _interval = null;
            }
            ret = !(locked = false);
        }
        return ret;
    }
    function startInterval() {            
        if(!_interval){                    
            var callback = function() {
                _tryPreloadAttach();
            };
            _interval = setInterval(callback, POLL_INTERVAL);
        }
    }
    function getScroll() {
        var dd = doc.documentElement, 
            db = doc.body;
        if(dd && (dd[SCROLLTOP] || dd[SCROLLLEFT])){
            return [dd[SCROLLLEFT], dd[SCROLLTOP]];
        }else if(db){
            return [db[SCROLLLEFT], db[SCROLLTOP]];
        }else{
            return [0, 0];
        }
    }
    function getPageCoord (ev, xy) {
        ev = ev.browserEvent || ev;
        var coord  = ev['page' + xy];
        if (!coord && coord !== 0) {
            coord = ev['client' + xy] || 0;
            if (vExt.isIE) {
                coord += getScroll()[xy == "X" ? 0 : 1];
            }
        }
        return coord;
    }
    var pub =  {
        onAvailable : function(p_id, p_fn, p_obj, p_override) {             
            onAvailStack.push({ 
                id:         p_id,
                fn:         p_fn,
                obj:        p_obj,
                override:   p_override,
                checkReady: false });
            retryCount = POLL_RETRYS;
            startInterval();
        },
        addListener: function(el, eventName, fn) {
            var ret;                
            el = vExt.getDom(el);                
            if (el && fn) {
                if (UNLOAD == eventName) {
                    ret = !!(unloadListeners[unloadListeners.length] = [el, eventName, fn]);                    
                } else {
                    listeners.push([el, eventName, fn, ret = doAdd(el, eventName, fn, false)]);
                }
            }
            return !!ret;
        },
        removeListener: function(el, eventName, fn) {
            var ret = false,
                index, 
                cacheItem;
            el = vExt.getDom(el);
            if(!fn) {                   
                ret = this.purgeElement(el, false, eventName);
            } else if (UNLOAD == eventName) {   
                vExt.each(unloadListeners, function(v, i, a) {
                    if( v && v[0] == el && v[1] == eventName && v[2] == fn) {
                        unloadListeners.splice(i, 1);
                        ret = true;
                    }
                });
            } else {    
                index = arguments[3] || _getCacheIndex(el, eventName, fn);
                cacheItem = listeners[index];
                if (el && cacheItem) {
                    doRemove(el, eventName, cacheItem[WFN], false);     
                    cacheItem[WFN] = cacheItem[FN] = null;                       
                    listeners.splice(index, 1);     
                    ret = true;
                }
            }
            return ret;
        },
        getTarget : function(ev) {
            ev = ev.browserEvent || ev;                
            return this.resolveTextNode(ev.target || ev.srcElement);
        },
        resolveTextNode : vExt.isGecko ? function(node){
            if(!node){
                return;
            }
            var s = HTMLElement.prototype.toString.call(node);
            if(s == '[xpconnect wrapped native prototype]' || s == '[object XULElement]'){
                return;
            }
            return node.nodeType == 3 ? node.parentNode : node;
        } : function(node){
            return node && node.nodeType == 3 ? node.parentNode : node;
        },
        getRelatedTarget : function(ev) {
            ev = ev.browserEvent || ev;
            return this.resolveTextNode(ev.relatedTarget || 
                    (ev.type == MOUSEOUT ? ev.toElement :
                     ev.type == MOUSEOVER ? ev.fromElement : null));
        },
        getPageX : function(ev) {
            return getPageCoord(ev, "X");
        },
        getPageY : function(ev) {
            return getPageCoord(ev, "Y");
        },
        getXY : function(ev) {                             
            return [this.getPageX(ev), this.getPageY(ev)];
        },
        stopEvent : function(ev) {                            
            this.stopPropagation(ev);
            this.preventDefault(ev);
        },
        stopPropagation : function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },
        preventDefault : function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
        },
        getEvent : function(e) {
            e = e || win.event;
            if (!e) {
                var c = this.getEvent.caller;
                while (c) {
                    e = c.arguments[0];
                    if (e && Event == e.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return e;
        },
        getCharCode : function(ev) {
            ev = ev.browserEvent || ev;
            return ev.charCode || ev.keyCode || 0;
        },
        _load : function(e) {
            loadComplete = true;
            var EU = vExt.lib.Event;    
            if (vExt.isIE && e !== true) {
                doRemove(win, "load", arguments.callee);
            }
        },            
        purgeElement : function(el, recurse, eventName) {
            var me = this;
            vExt.each( me.getListeners(el, eventName), function(v){
                if(v){
                    me.removeListener(el, v.type, v.fn);
                }
            });
            if (recurse && el && el.childNodes) {
                vExt.each(el.childNodes, function(v){
                    me.purgeElement(v, recurse, eventName);
                });
            }
        },
        getListeners : function(el, eventName) {
            var me = this,
                results = [], 
                searchLists;
            if (eventName){  
                searchLists = eventName == UNLOAD ? unloadListeners : listeners;
            }else{
                searchLists = listeners.concat(unloadListeners);
            }
            vExt.each(searchLists, function(v, i){
                if (v && v[EL] == el && (!eventName || eventName == v[TYPE])) {
                    results.push({
                                type:   v[TYPE],
                                fn:     v[FN],
                                obj:    v[OBJ],
                                adjust: v[ADJ_SCOPE],
                                index:  i
                            });
                }   
            });                
            return results.length ? results : null;
        },
        _unload : function(e) {
             var EU = vExt.lib.Event, 
                i, 
                j, 
                l, 
                len, 
                index,
                scope;
            vExt.each(unloadListeners, function(v) {
                if (v) {
                    try{
                        scope =  v[ADJ_SCOPE] ? (v[ADJ_SCOPE] === true ? v[OBJ] : v[ADJ_SCOPE]) :  win; 
                        v[FN].call(scope, EU.getEvent(e), v[OBJ]);
                    }catch(ex){}
                }   
            });     
            unloadListeners = null;
            if(listeners && (j = listeners.length)){                    
                while(j){                        
                    if((l = listeners[index = --j])){
                        EU.removeListener(l[EL], l[TYPE], l[FN], index);
                    }                        
                }
            }
            doRemove(win, UNLOAD, EU._unload);
        }            
    };        
    pub.on = pub.addListener;
    pub.un = pub.removeListener;
    if (doc && doc.body) {
        pub._load(true);
    } else {
        doAdd(win, "load", pub._load);
    }
    doAdd(win, UNLOAD, pub._unload);    
    _tryPreloadAttach();
    return pub;
}();
    vExt.lib.Ajax = function() {	    
	    var activeX = ['MSXML2.XMLHTTP.3.0',
			           'MSXML2.XMLHTTP',
			           'Microsoft.XMLHTTP'],
            CONTENTTYPE = 'Content-Type';
		function setHeader(o) {
	        var conn = o.conn,
	        	prop;
	        function setTheHeaders(conn, headers){
		     	for (prop in headers) {
                    if (headers.hasOwnProperty(prop)) {
                        conn.setRequestHeader(prop, headers[prop]);
                    }
                }   
	        }		
            if (pub.defaultHeaders) {
	            setTheHeaders(conn, pub.defaultHeaders);
            }
            if (pub.headers) {
				setTheHeaders(conn, pub.headers);
                delete pub.headers;                
            }
        }    
        function createExceptionObject(tId, callbackArg, isAbort, isTimeout) {	        
            return {
	            tId : tId,
	            status : isAbort ? -1 : 0,
	            statusText : isAbort ? 'transaction aborted' : 'communication failure',
                isAbort: isAbort,
                isTimeout: isTimeout,
	            argument : callbackArg
            };
        }  
        function initHeader(label, value) {         
			(pub.headers = pub.headers || {})[label] = value;			            
        }
        function createResponseObject(o, callbackArg) {
            var headerObj = {},
                headerStr,              
                conn = o.conn,
                t,
                s;
            try {
                headerStr = o.conn.getAllResponseHeaders();   
                vExt.each(headerStr.replace(/\r\n/g, '\n').split('\n'), function(v){
                    t = v.indexOf(':');
                    if(t >= 0){
                        s = v.substr(0, t).toLowerCase();
                        if(v.charAt(t + 1) == ' '){
                            ++t;
                        }
                        headerObj[s] = v.substr(t + 1);
                    }
                });
            } catch(e) {}
            return {
                tId : o.tId,
                status : conn.status,
                statusText : conn.statusText,
                getResponseHeader : function(header){return headerObj[header.toLowerCase()];},
                getAllResponseHeaders : function(){return headerStr},
                responseText : conn.responseText,
                responseXML : conn.responseXML,
                argument : callbackArg
            };
        }
        function releaseObject(o) {
            o.conn = null;
            o = null;
        }        
        function handleTransactionResponse(o, callback, isAbort, isTimeout) {
            if (!callback) {
                releaseObject(o);
                return;
            }
            var httpStatus, responseObject;
            try {
                if (o.conn.status !== undefined && o.conn.status != 0) {
                    httpStatus = o.conn.status;
                }
                else {
                    httpStatus = 13030;
                }
            }
            catch(e) {
                httpStatus = 13030;
            }
            if ((httpStatus >= 200 && httpStatus < 300) || (vExt.isIE && httpStatus == 1223)) {
                responseObject = createResponseObject(o, callback.argument);
                if (callback.success) {
                    if (!callback.scope) {
                        callback.success(responseObject);
                    }
                    else {
                        callback.success.apply(callback.scope, [responseObject]);
                    }
                }
            }
            else {
                switch (httpStatus) {
                    case 12002:
                    case 12029:
                    case 12030:
                    case 12031:
                    case 12152:
                    case 13030:
                        responseObject = createExceptionObject(o.tId, callback.argument, (isAbort ? isAbort : false), isTimeout);
                        if (callback.failure) {
                            if (!callback.scope) {
                                callback.failure(responseObject);
                            }
                            else {
                                callback.failure.apply(callback.scope, [responseObject]);
                            }
                        }
                        break;
                    default:
                        responseObject = createResponseObject(o, callback.argument);
                        if (callback.failure) {
                            if (!callback.scope) {
                                callback.failure(responseObject);
                            }
                            else {
                                callback.failure.apply(callback.scope, [responseObject]);
                            }
                        }
                }
            }
            releaseObject(o);
            responseObject = null;
        }  
        function handleReadyState(o, callback){
	    callback = callback || {};
            var conn = o.conn,
            	tId = o.tId,
            	poll = pub.poll,
		cbTimeout = callback.timeout || null;
            if (cbTimeout) {
                pub.timeout[tId] = setTimeout(function() {
                    pub.abort(o, callback, true);
                }, cbTimeout);
            }
            poll[tId] = setInterval(
                function() {
                    if (conn && conn.readyState == 4) {
                        clearInterval(poll[tId]);
                        poll[tId] = null;
                        if (cbTimeout) {
                            clearTimeout(pub.timeout[tId]);
                            pub.timeout[tId] = null;
                        }
                        handleTransactionResponse(o, callback);
                    }
                },
                pub.pollInterval);
        }
        function asyncRequest(method, uri, callback, postData) {
            var o = getConnectionObject() || null;
            if (o) {
                o.conn.open(method, uri, true);
                if (pub.useDefaultXhrHeader) {                    
                	initHeader('X-Requested-With', pub.defaultXhrHeader);
                }
                if(postData && pub.useDefaultHeader && (!pub.headers || !pub.headers[CONTENTTYPE])){
                    initHeader(CONTENTTYPE, pub.defaultPostHeader);
                }
                if (pub.defaultHeaders || pub.headers) {
                    setHeader(o);
                }
                handleReadyState(o, callback);
                o.conn.send(postData || null);
            }
            return o;
        }
        function getConnectionObject() {
            var o;      	
            try {
                if (o = createXhrObject(pub.transactionId)) {
                    pub.transactionId++;
                }
            } catch(e) {
            } finally {
                return o;
            }
        }
        function createXhrObject(transactionId) {
            var http;
            try {
                http = new XMLHttpRequest();                
            } catch(e) {
                for (var i = 0; i < activeX.length; ++i) {	            
                    try {
                        http = new ActiveXObject(activeX[i]);                        
                        break;
                    } catch(e) {}
                }
            } finally {
                return {conn : http, tId : transactionId};
            }
        }
	    var pub = {
	        request : function(method, uri, cb, data, options) {
			    if(options){
			        var me = this,		        
			        	xmlData = options.xmlData,
			        	jsonData = options.jsonData,
                        hs;
			        vExt.applyIf(me, options);	        
		            if(xmlData || jsonData){
                        hs = me.headers;
                        if(!hs || !hs[CONTENTTYPE]){
			                initHeader(CONTENTTYPE, xmlData ? 'text/xml' : 'application/json');
                        }
			            data = xmlData || (vExt.isObject(jsonData) ? vExt.encode(jsonData) : jsonData);
			        }
			    }		    		    
			    return asyncRequest(method || options.method || "POST", uri, cb, data);
	        },
	        serializeForm : function(form) {
		        var fElements = form.elements || (document.forms[form] || vExt.getDom(form)).elements,
	            	hasSubmit = false,
	            	encoder = encodeURIComponent,
		        	element,
	            	options, 
	            	name, 
	            	val,             	
	            	data = '',
	            	type;
		        vExt.each(fElements, function(element) {		            
	                name = element.name;	             
					type = element.type;
	                if (!element.disabled && name){
		                if(/select-(one|multiple)/i.test(type)){			                
				            vExt.each(element.options, function(opt) {
					            if (opt.selected) {
						            data += String.format("{0}={1}&", 						            					  
						            					 encoder(name),
                                                         encoder((opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttribute('value') !== null) ? opt.value : opt.text));
                                }								
                            });
		                } else if(!/file|undefined|reset|button/i.test(type)) {
			                if(!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)){
                                data += encoder(name) + '=' + encoder(element.value) + '&';                     
                                hasSubmit = /submit/i.test(type);    
                            } 		                
		                } 
	                }
	            });            
	            return data.substr(0, data.length - 1);
	        },
	        useDefaultHeader : true,
	        defaultPostHeader : 'application/x-www-form-urlencoded; charset=UTF-8',
	        useDefaultXhrHeader : true,
	        defaultXhrHeader : 'XMLHttpRequest',        
	        poll : {},
	        timeout : {},
	        pollInterval : 50,
	        transactionId : 0,
	        abort : function(o, callback, isTimeout) {
		        var me = this,
		        	tId = o.tId,
		        	isAbort = false;
	            if (me.isCallInProgress(o)) {
	                o.conn.abort();
	                clearInterval(me.poll[tId]);
	               	me.poll[tId] = null;
	                if (isTimeout) {
	                    me.timeout[tId] = null;
	                }
	                handleTransactionResponse(o, callback, (isAbort = true), isTimeout);                
	            }
	            return isAbort;
	        },
	        isCallInProgress : function(o) {
	            return o.conn && !{0:true,4:true}[o.conn.readyState];	        
	        }
	    };
	    return pub;
    }();
	vExt.lib.Region = function(t, r, b, l) {
		var me = this;
        me.top = t;
        me[1] = t;
        me.right = r;
        me.bottom = b;
        me.left = l;
        me[0] = l;
    };
    vExt.lib.Region.prototype = {
        contains : function(region) {
	        var me = this;
            return ( region.left >= me.left &&
                     region.right <= me.right &&
                     region.top >= me.top &&
                     region.bottom <= me.bottom );
        },
        getArea : function() {
	        var me = this;
            return ( (me.bottom - me.top) * (me.right - me.left) );
        },
        intersect : function(region) {
            var me = this,
            	t = Math.max(me.top, region.top),
            	r = Math.min(me.right, region.right),
            	b = Math.min(me.bottom, region.bottom),
            	l = Math.max(me.left, region.left);
            if (b >= t && r >= l) {
                return new vExt.lib.Region(t, r, b, l);
            }
        },
        union : function(region) {
	        var me = this,
            	t = Math.min(me.top, region.top),
            	r = Math.max(me.right, region.right),
            	b = Math.max(me.bottom, region.bottom),
            	l = Math.min(me.left, region.left);
            return new vExt.lib.Region(t, r, b, l);
        },
        constrainTo : function(r) {
	        var me = this;
            me.top = me.top.constrain(r.top, r.bottom);
            me.bottom = me.bottom.constrain(r.top, r.bottom);
            me.left = me.left.constrain(r.left, r.right);
            me.right = me.right.constrain(r.left, r.right);
            return me;
        },
        adjust : function(t, l, b, r) {
	        var me = this;
            me.top += t;
            me.left += l;
            me.right += r;
            me.bottom += b;
            return me;
        }
    };
    vExt.lib.Region.getRegion = function(el) {
        var p = vExt.lib.Dom.getXY(el),
        	t = p[1],
        	r = p[0] + el.offsetWidth,
        	b = p[1] + el.offsetHeight,
        	l = p[0];
        return new vExt.lib.Region(t, r, b, l);
    };
	vExt.lib.Point = function(x, y) {
        if (vExt.isArray(x)) {
            y = x[1];
            x = x[0];
        }
        var me = this;
        me.x = me.right = me.left = me[0] = x;
        me.y = me.top = me.bottom = me[1] = y;
    };
    vExt.lib.Point.prototype = new vExt.lib.Region();
(function(){    
    var EXTLIB = vExt.lib,
        noNegatives = /width|height|opacity|padding/i,
        offsetAttribute = /^((width|height)|(top|left))$/,
        defaultUnit = /width|height|top$|bottom$|left$|right$/i,
        offsetUnit =  /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i,
        isset = function(v){
            return typeof v !== 'undefined';
        },
        now = function(){
            return new Date();    
        };
    EXTLIB.Anim = {
        motion : function(el, args, duration, easing, cb, scope) {
            return this.run(el, args, duration, easing, cb, scope, vExt.lib.Motion);
        },
        run : function(el, args, duration, easing, cb, scope, type) {
            type = type || vExt.lib.AnimBase;
            if (typeof easing == "string") {
                easing = vExt.lib.Easing[easing];
            }
            var anim = new type(el, args, duration, easing);
            anim.animateX(function() {
                if(vExt.isFunction(cb)){
                    cb.call(scope);
                }
            });
            return anim;
        }
    };
    EXTLIB.AnimBase = function(el, attributes, duration, method) {
        if (el) {
            this.init(el, attributes, duration, method);
        }
    };
    EXTLIB.AnimBase.prototype = {
        doMethod: function(attr, start, end) {
            var me = this;
            return me.method(me.curFrame, start, end - start, me.totalFrames);
        },
        setAttr: function(attr, val, unit) {
            if (noNegatives.test(attr) && val < 0) {
                val = 0;
            }
            vExt.fly(this.el, '_anim').setStyle(attr, val + unit);
        },
        getAttr: function(attr) {
            var el = vExt.fly(this.el),
                val = el.getStyle(attr),
                a = offsetAttribute.exec(attr) || []
            if (val !== 'auto' && !offsetUnit.test(val)) {
                return parseFloat(val);
            }
            return (!!(a[2]) || (el.getStyle('position') == 'absolute' && !!(a[3]))) ? el.dom['offset' + a[0].charAt(0).toUpperCase() + a[0].substr(1)] : 0;
        },
        getDefaultUnit: function(attr) {
            return defaultUnit.test(attr) ? 'px' : '';
        },
        animateX : function(callback, scope) {
            var me = this,
                f = function() {
                me.onComplete.removeListener(f);
                if (vExt.isFunction(callback)) {
                    callback.call(scope || me, me);
                }
            };
            me.onComplete.addListener(f, me);
            me.animate();
        },
        setRunAttr: function(attr) {            
            var me = this,
                a = this.attributes[attr],
                to = a.to,
                by = a.by,
                from = a.from,
                unit = a.unit,
                ra = (this.runAttrs[attr] = {}),
                end;
            if (!isset(to) && !isset(by)){
                return false;
            }
            var start = isset(from) ? from : me.getAttr(attr);
            if (isset(to)) {
                end = to;
            }else if(isset(by)) {
                if (vExt.isArray(start)){
                    end = [];
                    vExt.each(start, function(v, i){
                        end[i] = v + by[i];
                    });
                }else{
                    end = start + by;
                }
            }
            vExt.apply(ra, {
                start: start,
                end: end,
                unit: isset(unit) ? unit : me.getDefaultUnit(attr)
            });
        },
        init: function(el, attributes, duration, method) {
            var me = this,
                actualFrames = 0,
                mgr = EXTLIB.AnimMgr;
            vExt.apply(me, {
                isAnimated: false,
                startTime: null,
                el: vExt.getDom(el),
                attributes: attributes || {},
                duration: duration || 1,
                method: method || EXTLIB.Easing.easeNone,
                useSec: true,
                curFrame: 0,
                totalFrames: mgr.fps,
                runAttrs: {},
                animate: function(){
                    var me = this,
                        d = me.duration;
                    if(me.isAnimated){
                        return false;
                    }
                    me.curFrame = 0;
                    me.totalFrames = me.useSec ? Math.ceil(mgr.fps * d) : d;
                    mgr.registerElement(me); 
                },
                stop: function(finish){
                    var me = this;
                    if(finish){
                        me.curFrame = me.totalFrames;
                        me._onTween.fire();
                    }
                    mgr.stop(me);
                }
            });
            var onStart = function(){
                var me = this,
                    attr;
                me.onStart.fire();
                me.runAttrs = {};
                for(attr in this.attributes){
                    this.setRunAttr(attr);
                }
                me.isAnimated = true;
                me.startTime = now();
                actualFrames = 0;
            };
            var onTween = function(){
                var me = this;
                me.onTween.fire({
                    duration: now() - me.startTime,
                    curFrame: me.curFrame
                });
                var ra = me.runAttrs;
                for (var attr in ra) {
                    this.setAttr(attr, me.doMethod(attr, ra[attr].start, ra[attr].end), ra[attr].unit);
                }
                ++actualFrames;
            };
            var onComplete = function() {
                var me = this,
                    actual = (now() - me.startTime) / 1000,
                    data = {
                        duration: actual,
                        frames: actualFrames,
                        fps: actualFrames / actual
                    };
                me.isAnimated = false;
                actualFrames = 0;
                me.onComplete.fire(data);
            };
            me.onStart = new vExt.util.Event(me);
            me.onTween = new vExt.util.Event(me);            
            me.onComplete = new vExt.util.Event(me);
            (me._onStart = new vExt.util.Event(me)).addListener(onStart);
            (me._onTween = new vExt.util.Event(me)).addListener(onTween);
            (me._onComplete = new vExt.util.Event(me)).addListener(onComplete); 
        }
    };
    vExt.lib.AnimMgr = new function() {
        var me = this,
            thread = null,
            queue = [],
            tweenCount = 0;
        vExt.apply(me, {
            fps: 1000,
            delay: 1,
            registerElement: function(tween){
                queue.push(tween);
                ++tweenCount;
                tween._onStart.fire();
                me.start();
            },
            unRegister: function(tween, index){
                tween._onComplete.fire();
                index = index || getIndex(tween);
                if (index != -1) {
                    queue.splice(index, 1);
                }
                if (--tweenCount <= 0) {
                    me.stop();
                }
            },
            start: function(){
                if(thread === null){
                    thread = setInterval(me.run, me.delay);
                }
            },
            stop: function(tween){
                if(!tween){
                    clearInterval(thread);
                    for(var i = 0, len = queue.length; i < len; ++i){
                        if(queue[0].isAnimated){
                            me.unRegister(queue[0], 0);
                        }
                    }
                    queue = [];
                    thread = null;
                    tweenCount = 0;
                }else{
                    me.unRegister(tween);
                }
            },
            run: function(){
                var tf;
                vExt.each(queue, function(tween){
                    if(tween && tween.isAnimated){
                        tf = tween.totalFrames;
                        if(tween.curFrame < tf || tf === null){
                            ++tween.curFrame;
                            if(tween.useSec){
                                correctFrame(tween);
                            }
                            tween._onTween.fire();
                        }else{
                            me.stop(tween);
                        }
                    }
                }, me);
            }
        });
        var getIndex = function(anim) {
            var out = -1;
            vExt.each(queue, function(item, idx){
                if(item == anim){
                    out = idx;
                    return false;
                }
            });
            return out;
        };
        var correctFrame = function(tween) {
            var frames = tween.totalFrames,
                frame = tween.curFrame,
                duration = tween.duration,
                expected = (frame * duration * 1000 / frames),
                elapsed = (now() - tween.startTime),
                tweak = 0;
            if(elapsed < duration * 1000){
                tweak = Math.round((elapsed / expected - 1) * frame);
            }else{
                tweak = frames - (frame + 1);
            }
            if(tweak > 0 && isFinite(tweak)){
                if(tween.curFrame + tweak >= frames){
                    tweak = frames - (frame + 1);
                }
                tween.curFrame += tweak;
            }
        };
    };
    EXTLIB.Bezier = new function() {
        this.getPosition = function(points, t) {
            var n = points.length,
                tmp = [],
                c = 1 - t, 
                i,
                j;
            for (i = 0; i < n; ++i) {
                tmp[i] = [points[i][0], points[i][1]];
            }
            for (j = 1; j < n; ++j) {
                for (i = 0; i < n - j; ++i) {
                    tmp[i][0] = c * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                    tmp[i][1] = c * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
                }
            }
            return [ tmp[0][0], tmp[0][1] ];
        };
    };
    EXTLIB.Easing = {
        easeNone: function (t, b, c, d) {
            return c * t / d + b;
        },
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        }
    };
    (function() {
        EXTLIB.Motion = function(el, attributes, duration, method) {
            if (el) {
                EXTLIB.Motion.superclass.constructor.call(this, el, attributes, duration, method);
            }
        };
        vExt.extend(EXTLIB.Motion, vExt.lib.AnimBase);
        var superclass = EXTLIB.Motion.superclass,
            proto = EXTLIB.Motion.prototype,
            pointsRe = /^points$/i;
        vExt.apply(EXTLIB.Motion.prototype, {
            setAttr: function(attr, val, unit){
                var me = this,
                    setAttr = superclass.setAttr;
                if (pointsRe.test(attr)) {
                    unit = unit || 'px';
                    setAttr.call(me, 'left', val[0], unit);
                    setAttr.call(me, 'top', val[1], unit);
                } else {
                    setAttr.call(me, attr, val, unit);
                }
            },
            getAttr: function(attr){
                var me = this,
                    getAttr = superclass.getAttr;
                return pointsRe.test(attr) ? [getAttr.call(me, 'left'), getAttr.call(me, 'top')] : getAttr.call(me, attr);
            },
            doMethod: function(attr, start, end){
                var me = this;
                return pointsRe.test(attr)
                        ? EXTLIB.Bezier.getPosition(me.runAttrs[attr], me.method(me.curFrame, 0, 100, me.totalFrames) / 100)
                        : superclass.doMethod.call(me, attr, start, end);
            },
            setRunAttr: function(attr){
                if(pointsRe.test(attr)){
                    var me = this,
                        el = this.el,
                        points = this.attributes.points,
                        control = points.control || [],
                        from = points.from,
                        to = points.to,
                        by = points.by,
                        DOM = EXTLIB.Dom,
                        start,
                        i,
                        end,
                        len,
                        ra;
                    if(control.length > 0 && !vExt.isArray(control[0])){
                        control = [control];
                    }else{
                    }
                    vExt.fly(el, '_anim').position();
                    DOM.setXY(el, isset(from) ? from : DOM.getXY(el));
                    start = me.getAttr('points');
                    if(isset(to)){
                        end = translateValues.call(me, to, start);
                        for (i = 0,len = control.length; i < len; ++i) {
                            control[i] = translateValues.call(me, control[i], start);
                        }
                    } else if (isset(by)) {
                        end = [start[0] + by[0], start[1] + by[1]];
                        for (i = 0,len = control.length; i < len; ++i) {
                            control[i] = [ start[0] + control[i][0], start[1] + control[i][1] ];
                        }
                    }
                    ra = this.runAttrs[attr] = [start];
                    if (control.length > 0) {
                        ra = ra.concat(control);
                    }
                    ra[ra.length] = end;
                }else{
                    superclass.setRunAttr.call(this, attr);
                }
            }
        });
        var translateValues = function(val, start) {
            var pageXY = EXTLIB.Dom.getXY(this.el);
            return [val[0] - pageXY[0] + start[0], val[1] - pageXY[1] + start[1]];
        };
    })();
})();
(function(){
	var abs = Math.abs,
	 	pi = Math.PI,
	 	asin = Math.asin,
	 	pow = Math.pow,
	 	sin = Math.sin,
		EXTLIB = vExt.lib;
    vExt.apply(EXTLIB.Easing, {
        easeBoth: function (t, b, c, d) {
	        return ((t /= d / 2) < 1)  ?  c / 2 * t * t + b  :  -c / 2 * ((--t) * (t - 2) - 1) + b;               
        },
        easeInStrong: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutStrong: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeBothStrong: function (t, b, c, d) {
            return ((t /= d / 2) < 1)  ?  c / 2 * t * t * t * t + b  :  -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        elasticIn: function (t, b, c, d, a, p) {
	        if (t == 0 || (t /= d) == 1) {
                return t == 0 ? b : b + c;
            }	            
            p = p || (d * .3);	            
			var s;
			if (a >= abs(c)) {
				s = p / (2 * pi) * asin(c / a);
			} else {
				a = c;
				s = p / 4;
			}
            return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p)) + b;
        }, 	
		elasticOut: function (t, b, c, d, a, p) {
	        if (t == 0 || (t /= d) == 1) {
                return t == 0 ? b : b + c;
            }	            
            p = p || (d * .3);	            
			var s;
			if (a >= abs(c)) {
				s = p / (2 * pi) * asin(c / a);
			} else {
				a = c;
				s = p / 4;
			}
            return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p) + c + b;	 
        }, 	
        elasticBoth: function (t, b, c, d, a, p) {
            if (t == 0 || (t /= d / 2) == 2) {
                return t == 0 ? b : b + c;
            }		         	
            p = p || (d * (.3 * 1.5)); 	            
            var s;
            if (a >= abs(c)) {
	            s = p / (2 * pi) * asin(c / a);
            } else {
	            a = c;
                s = p / 4;
            }
            return t < 1 ?
            	   	-.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p)) + b :
                    a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p) * .5 + c + b;
        },
        backIn: function (t, b, c, d, s) {
            s = s ||  1.70158; 	            
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        backOut: function (t, b, c, d, s) {
            if (!s) {
                s = 1.70158;
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        backBoth: function (t, b, c, d, s) {
            s = s || 1.70158; 	            
            return ((t /= d / 2 ) < 1) ?
                    c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b : 	            
            		c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        bounceIn: function (t, b, c, d) {
            return c - EXTLIB.Easing.bounceOut(d - t, 0, c, d) + b;
        },
        bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        },
        bounceBoth: function (t, b, c, d) {
            return (t < d / 2) ?
                   EXTLIB.Easing.bounceIn(t * 2, 0, c, d) * .5 + b : 
            	   EXTLIB.Easing.bounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });
})();
(function() {
    var EXTLIB = vExt.lib;
	EXTLIB.Anim.color = function(el, args, duration, easing, cb, scope) {
	    return EXTLIB.Anim.run(el, args, duration, easing, cb, scope, EXTLIB.ColorAnim);
	}
    EXTLIB.ColorAnim = function(el, attributes, duration, method) {
        EXTLIB.ColorAnim.superclass.constructor.call(this, el, attributes, duration, method);
    };
    vExt.extend(EXTLIB.ColorAnim, EXTLIB.AnimBase);
    var superclass = EXTLIB.ColorAnim.superclass,
    	colorRE = /color$/i,
    	transparentRE = /^transparent|rgba\(0, 0, 0, 0\)$/,
        rgbRE = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
        hexRE= /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
        hex3RE = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i,
        isset = function(v){
            return typeof v !== 'undefined';
        }
    function parseColor(s) {	
        var pi = parseInt,
            base,
            out = null,
            c;
	    if (s.length == 3) {
            return s;
        }
        vExt.each([hexRE, rgbRE, hex3RE], function(re, idx){
            base = (idx % 2 == 0) ? 16 : 10;
            c = re.exec(s);
            if(c && c.length == 4){
                out = [pi(c[1], base), pi(c[2], base), pi(c[3], base)];
                return false;
            }
        });
        return out;
    }	
    vExt.apply(EXTLIB.ColorAnim.prototype, {
        getAttr : function(attr) {
            var me = this,
                el = me.el,
                val;                
            if(colorRE.test(attr)){
                while(el && transparentRE.test(val = vExt.fly(el).getStyle(attr))){
                    el = el.parentNode;
                    val = "fff";
                }
            }else{
                val = superclass.getAttr.call(me, attr);
            }
            return val;
        },
        doMethod : function(attr, start, end) {
            var me = this,
            	val,
            	floor = Math.floor;            
            if(colorRE.test(attr)){
                val = [];
	            vExt.each(start, function(v, i) {
                    val[i] = superclass.doMethod.call(me, attr, v, end[i]);
                });
                val = 'rgb(' + floor(val[0]) + ',' + floor(val[1]) + ',' + floor(val[2]) + ')';
            }else{
                val = superclass.doMethod.call(me, attr, start, end);
            }
            return val;
        },
        setRunAttr : function(attr) {
            var me = this,
                a = me.attributes[attr],
                to = a.to,
                by = a.by,
                ra;
            superclass.setRunAttr.call(me, attr);
            ra = me.runAttrs[attr];
            if(colorRE.test(attr)){
                var start = parseColor(ra.start),
                    end = parseColor(ra.end);
                if(!isset(to) && isset(by)){
                    end = parseColor(by);
                    vExt.each(start, function(item, i){
                        end[i] = item + end[i];
                    });
                }
                ra.start = start;
                ra.end = end;
            }
        }
	});
})();	
(function() {
    var EXTLIB = vExt.lib;
	EXTLIB.Anim.scroll = function(el, args, duration, easing, cb, scope) {	        
	    return EXTLIB.Anim.run(el, args, duration, easing, cb, scope, EXTLIB.Scroll);
	}
    EXTLIB.Scroll = function(el, attributes, duration, method) {
        if(el){
            EXTLIB.Scroll.superclass.constructor.call(this, el, attributes, duration, method);
        }
    };
    vExt.extend(EXTLIB.Scroll, EXTLIB.ColorAnim);
    var superclass = EXTLIB.Scroll.superclass,
    	SCROLL = 'scroll';
    vExt.apply(EXTLIB.Scroll.prototype, {
        doMethod : function(attr, start, end) {
            var val,
            	me = this,
            	curFrame = me.curFrame,
            	totalFrames = me.totalFrames;
            if(attr == SCROLL){
                val = [me.method(curFrame, start[0], end[0] - start[0], totalFrames),
                       me.method(curFrame, start[1], end[1] - start[1], totalFrames)];
            }else{
                val = superclass.doMethod.call(me, attr, start, end);
            }
            return val;
        },
        getAttr : function(attr) {
            var me = this;
            if (attr == SCROLL) {
                return [me.el.scrollLeft, me.el.scrollTop];
            }else{
                return superclass.getAttr.call(me, attr);
            }
        },
        setAttr : function(attr, val, unit) {
            var me = this;
            if(attr == SCROLL){
                me.el.scrollLeft = val[0];
                me.el.scrollTop = val[1];
            }else{
                superclass.setAttr.call(me, attr, val, unit);
            }
        }
    });
})();
	if(vExt.isIE) {
        function fnCleanUp() {
            var p = Function.prototype;
            delete p.createSequence;
            delete p.defer;
            delete p.createDelegate;
            delete p.createCallback;
            delete p.createInterceptor;
            window.detachEvent("onunload", fnCleanUp);
        }
        window.attachEvent("onunload", fnCleanUp);
    }
})();
