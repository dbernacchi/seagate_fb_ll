/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
 */
(function (e, t) {
	var n,
	r,
	i = typeof t,
	o = e.document,
	a = e.location,
	s = e.jQuery,
	u = e.$,
	l = {},
	c = [],
	p = "1.9.1",
	f = c.concat,
	d = c.push,
	h = c.slice,
	g = c.indexOf,
	m = l.toString,
	y = l.hasOwnProperty,
	v = p.trim,
	b = function (e, t) {
		return new b.fn.init(e, t, r);
	},
	x = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	w = /\S+/g,
	T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	N = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	k = /^[\],:{}\s]*$/,
	E = /(?:^|:|,)(?:\s*\[)+/g,
	S = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	A = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
	j = /^-ms-/,
	D = /-([\da-z])/gi,
	L = function (e, t) {
		return t.toUpperCase();
	},
	H = function (e) {
		(o.addEventListener || "load" === e.type || "complete" === o.readyState) && (q(), b.ready());
	},
	q = function () {
		o.addEventListener ? (o.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (o.detachEvent("onreadystatechange", H), e.detachEvent("onload", H));
	};
	b.fn = b.prototype = {
		jquery : p,
		constructor : b,
		init : function (e, n, r) {
			var i,
			a;
			if (!e) {
				return this;
			}
			if ("string" == typeof e) {
				if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n) {
					return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
				}
				if (i[1]) {
					if (n = n instanceof b ? n[0] : n, b.merge(this, b.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : o, !0)), C.test(i[1]) && b.isPlainObject(n)) {
						for (i in n) {
							b.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
						}
					}
					return this;
				}
				if (a = o.getElementById(i[2]), a && a.parentNode) {
					if (a.id !== i[2]) {
						return r.find(e);
					}
					this.length = 1,
					this[0] = a;
				}
				return this.context = o,
				this.selector = e,
				this;
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : b.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), b.makeArray(e, this));
		},
		selector : "",
		length : 0,
		size : function () {
			return this.length;
		},
		toArray : function () {
			return h.call(this);
		},
		get : function (e) {
			return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
		},
		pushStack : function (e) {
			var t = b.merge(this.constructor(), e);
			return t.prevObject = this,
			t.context = this.context,
			t;
		},
		each : function (e, t) {
			return b.each(this, e, t);
		},
		ready : function (e) {
			return b.ready.promise().done(e),
			this;
		},
		slice : function () {
			return this.pushStack(h.apply(this, arguments));
		},
		first : function () {
			return this.eq(0);
		},
		last : function () {
			return this.eq(-1);
		},
		eq : function (e) {
			var t = this.length,
			n = +e + (0 > e ? t : 0);
			return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
		},
		map : function (e) {
			return this.pushStack(b.map(this, function (t, n) {
					return e.call(t, n, t);
				}));
		},
		end : function () {
			return this.prevObject || this.constructor(null);
		},
		push : d,
		sort : [].sort,
		splice : [].splice
	},
	b.fn.init.prototype = b.fn,
	b.extend = b.fn.extend = function () {
		var e,
		n,
		r,
		i,
		o,
		a,
		s = arguments[0] || {},
		u = 1,
		l = arguments.length,
		c = !1;
		for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || b.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++) {
			if (null != (o = arguments[u])) {
				for (i in o) {
					e = s[i],
					r = o[i],
					s !== r && (c && r && (b.isPlainObject(r) || (n = b.isArray(r))) ? (n ? (n = !1, a = e && b.isArray(e) ? e : []) : a = e && b.isPlainObject(e) ? e : {}, s[i] = b.extend(c, a, r)) : r !== t && (s[i] = r));
				}
			}
		}
		return s;
	},
	b.extend({
		noConflict : function (t) {
			return e.$ === b && (e.$ = u),
			t && e.jQuery === b && (e.jQuery = s),
			b;
		},
		isReady : !1,
		readyWait : 1,
		holdReady : function (e) {
			e ? b.readyWait++ : b.ready(!0);
		},
		ready : function (e) {
			if (e === !0 ? !--b.readyWait : !b.isReady) {
				if (!o.body) {
					return setTimeout(b.ready);
				}
				b.isReady = !0,
				e !== !0 && --b.readyWait > 0 || (n.resolveWith(o, [b]), b.fn.trigger && b(o).trigger("ready").off("ready"));
			}
		},
		isFunction : function (e) {
			return "function" === b.type(e);
		},
		isArray : Array.isArray || function (e) {
			return "array" === b.type(e);
		},
		isWindow : function (e) {
			return null != e && e == e.window;
		},
		isNumeric : function (e) {
			return !isNaN(parseFloat(e)) && isFinite(e);
		},
		type : function (e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e;
		},
		isPlainObject : function (e) {
			if (!e || "object" !== b.type(e) || e.nodeType || b.isWindow(e)) {
				return !1;
			}
			try {
				if (e.constructor && !y.call(e, "constructor") && !y.call(e.constructor.prototype, "isPrototypeOf")) {
					return !1;
				}
			} catch (n) {
				return !1;
			}
			var r;
			for (r in e) {}

			return r === t || y.call(e, r);
		},
		isEmptyObject : function (e) {
			var t;
			for (t in e) {
				return !1;
			}
			return !0;
		},
		error : function (e) {
			throw Error(e);
		},
		parseHTML : function (e, t, n) {
			if (!e || "string" != typeof e) {
				return null;
			}
			"boolean" == typeof t && (n = t, t = !1),
			t = t || o;
			var r = C.exec(e),
			i = !n && [];
			return r ? [t.createElement(r[1])] : (r = b.buildFragment([e], t, i), i && b(i).remove(), b.merge([], r.childNodes));
		},
		parseJSON : function (n) {
			return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = b.trim(n), n && k.test(n.replace(S, "@").replace(A, "]").replace(E, ""))) ? Function("return " + n)() : (b.error("Invalid JSON: " + n), t);
		},
		parseXML : function (n) {
			var r,
			i;
			if (!n || "string" != typeof n) {
				return null;
			}
			try {
				e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n));
			} catch (o) {
				r = t;
			}
			return r && r.documentElement && !r.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + n),
			r;
		},
		noop : function () {},
		globalEval : function (t) {
			t && b.trim(t) && (e.execScript || function (t) {
				e.eval.call(e, t);
			})(t);
		},
		camelCase : function (e) {
			return e.replace(j, "ms-").replace(D, L);
		},
		nodeName : function (e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
		},
		each : function (e, t, n) {
			var r,
			i = 0,
			o = e.length,
			a = M(e);
			if (n) {
				if (a) {
					for (; o > i; i++) {
						if (r = t.apply(e[i], n), r === !1) {
							break;
						}
					}
				} else {
					for (i in e) {
						if (r = t.apply(e[i], n), r === !1) {
							break;
						}
					}
				}
			} else {
				if (a) {
					for (; o > i; i++) {
						if (r = t.call(e[i], i, e[i]), r === !1) {
							break;
						}
					}
				} else {
					for (i in e) {
						if (r = t.call(e[i], i, e[i]), r === !1) {
							break;
						}
					}
				}
			}
			return e;
		},
		trim : v && !v.call("\ufeff\u00a0") ? function (e) {
			return null == e ? "" : v.call(e);
		}
		 : function (e) {
			return null == e ? "" : (e + "").replace(T, "");
		},
		makeArray : function (e, t) {
			var n = t || [];
			return null != e && (M(Object(e)) ? b.merge(n, "string" == typeof e ? [e] : e) : d.call(n, e)),
			n;
		},
		inArray : function (e, t, n) {
			var r;
			if (t) {
				if (g) {
					return g.call(t, e, n);
				}
				for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) {
					if (n in t && t[n] === e) {
						return n;
					}
				}
			}
			return -1;
		},
		merge : function (e, n) {
			var r = n.length,
			i = e.length,
			o = 0;
			if ("number" == typeof r) {
				for (; r > o; o++) {
					e[i++] = n[o];
				}
			} else {
				while (n[o] !== t) {
					e[i++] = n[o++];
				}
			}
			return e.length = i,
			e;
		},
		grep : function (e, t, n) {
			var r,
			i = [],
			o = 0,
			a = e.length;
			for (n = !!n; a > o; o++) {
				r = !!t(e[o], o),
				n !== r && i.push(e[o]);
			}
			return i;
		},
		map : function (e, t, n) {
			var r,
			i = 0,
			o = e.length,
			a = M(e),
			s = [];
			if (a) {
				for (; o > i; i++) {
					r = t(e[i], i, n),
					null != r && (s[s.length] = r);
				}
			} else {
				for (i in e) {
					r = t(e[i], i, n),
					null != r && (s[s.length] = r);
				}
			}
			return f.apply([], s);
		},
		guid : 1,
		proxy : function (e, n) {
			var r,
			i,
			o;
			return "string" == typeof n && (o = e[n], n = e, e = o),
			b.isFunction(e) ? (r = h.call(arguments, 2), i = function () {
				return e.apply(n || this, r.concat(h.call(arguments)));
			}, i.guid = e.guid = e.guid || b.guid++, i) : t;
		},
		access : function (e, n, r, i, o, a, s) {
			var u = 0,
			l = e.length,
			c = null == r;
			if ("object" === b.type(r)) {
				o = !0;
				for (u in r) {
					b.access(e, n, u, r[u], !0, a, s);
				}
			} else {
				if (i !== t && (o = !0, b.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) {
								return c.call(b(e), n);
							})), n)) {
					for (; l > u; u++) {
						n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
					}
				}
			}
			return o ? e : c ? n.call(e) : l ? n(e[0], r) : a;
		},
		now : function () {
			return (new Date).getTime();
		}
	}),
	b.ready.promise = function (t) {
		if (!n) {
			if (n = b.Deferred(), "complete" === o.readyState) {
				setTimeout(b.ready);
			} else {
				if (o.addEventListener) {
					o.addEventListener("DOMContentLoaded", H, !1),
					e.addEventListener("load", H, !1);
				} else {
					o.attachEvent("onreadystatechange", H),
					e.attachEvent("onload", H);
					var r = !1;
					try {
						r = null == e.frameElement && o.documentElement;
					} catch (i) {}

					r && r.doScroll && function a() {
						if (!b.isReady) {
							try {
								r.doScroll("left");
							} catch (e) {
								return setTimeout(a, 50);
							}
							q(),
							b.ready();
						}
					}
					();
				}
			}
		}
		return n.promise(t);
	},
	b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
		l["[object " + t + "]"] = t.toLowerCase();
	});
	function M(e) {
		var t = e.length,
		n = b.type(e);
		return b.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
	}
	r = b(o);
	var _ = {};
	function F(e) {
		var t = _[e] = {};
		return b.each(e.match(w) || [], function (e, n) {
			t[n] = !0;
		}),
		t;
	}
	b.Callbacks = function (e) {
		e = "string" == typeof e ? _[e] || F(e) : b.extend({}, e);
		var n,
		r,
		i,
		o,
		a,
		s,
		u = [],
		l = !e.once && [],
		c = function (t) {
			for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = u.length, n = !0; u && o > a; a++) {
				if (u[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
					r = !1;
					break;
				}
			}
			n = !1,
			u && (l ? l.length && c(l.shift()) : r ? u = [] : p.disable());
		},
		p = {
			add : function () {
				if (u) {
					var t = u.length;
					(function i(t) {
						b.each(t, function (t, n) {
							var r = b.type(n);
							"function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && i(n);
						});
					})(arguments),
					n ? o = u.length : r && (s = t, c(r));
				}
				return this;
			},
			remove : function () {
				return u && b.each(arguments, function (e, t) {
					var r;
					while ((r = b.inArray(t, u, r)) > -1) {
						u.splice(r, 1),
						n && (o >= r && o--, a >= r && a--);
					}
				}),
				this;
			},
			has : function (e) {
				return e ? b.inArray(e, u) > -1 : !(!u || !u.length);
			},
			empty : function () {
				return u = [],
				this;
			},
			disable : function () {
				return u = l = r = t,
				this;
			},
			disabled : function () {
				return !u;
			},
			lock : function () {
				return l = t,
				r || p.disable(),
				this;
			},
			locked : function () {
				return !l;
			},
			fireWith : function (e, t) {
				return t = t || [],
				t = [e, t.slice ? t.slice() : t],
				!u || i && !l || (n ? l.push(t) : c(t)),
				this;
			},
			fire : function () {
				return p.fireWith(this, arguments),
				this;
			},
			fired : function () {
				return !!i;
			}
		};
		return p;
	},
	b.extend({
		Deferred : function (e) {
			var t = [["resolve", "done", b.Callbacks("once memory"), "resolved"], ["reject", "fail", b.Callbacks("once memory"), "rejected"], ["notify", "progress", b.Callbacks("memory")]],
			n = "pending",
			r = {
				state : function () {
					return n;
				},
				always : function () {
					return i.done(arguments).fail(arguments),
					this;
				},
				then : function () {
					var e = arguments;
					return b.Deferred(function (n) {
						b.each(t, function (t, o) {
							var a = o[0],
							s = b.isFunction(e[t]) && e[t];
							i[o[1]](function () {
								var e = s && s.apply(this, arguments);
								e && b.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments);
							});
						}),
						e = null;
					}).promise();
				},
				promise : function (e) {
					return null != e ? b.extend(e, r) : r;
				}
			},
			i = {};
			return r.pipe = r.then,
			b.each(t, function (e, o) {
				var a = o[2],
				s = o[3];
				r[o[1]] = a.add,
				s && a.add(function () {
					n = s;
				}, t[1^e][2].disable, t[2][2].lock),
				i[o[0]] = function () {
					return i[o[0] + "With"](this === i ? r : this, arguments),
					this;
				},
				i[o[0] + "With"] = a.fireWith;
			}),
			r.promise(i),
			e && e.call(i, i),
			i;
		},
		when : function (e) {
			var t = 0,
			n = h.call(arguments),
			r = n.length,
			i = 1 !== r || e && b.isFunction(e.promise) ? r : 0,
			o = 1 === i ? e : b.Deferred(),
			a = function (e, t, n) {
				return function (r) {
					t[e] = this,
					n[e] = arguments.length > 1 ? h.call(arguments) : r,
					n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n);
				};
			},
			s,
			u,
			l;
			if (r > 1) {
				for (s = Array(r), u = Array(r), l = Array(r); r > t; t++) {
					n[t] && b.isFunction(n[t].promise) ? n[t].promise().done(a(t, l, n)).fail(o.reject).progress(a(t, u, s)) : --i;
				}
			}
			return i || o.resolveWith(l, n),
			o.promise();
		}
	}),
	b.support = function () {
		var t,
		n,
		r,
		a,
		s,
		u,
		l,
		c,
		p,
		f,
		d = o.createElement("div");
		if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*"), r = d.getElementsByTagName("a")[0], !n || !r || !n.length) {
			return {};
		}
		s = o.createElement("select"),
		l = s.appendChild(o.createElement("option")),
		a = d.getElementsByTagName("input")[0],
		r.style.cssText = "top:1px;float:left;opacity:.5",
		t = {
			getSetAttribute : "t" !== d.className,
			leadingWhitespace : 3 === d.firstChild.nodeType,
			tbody : !d.getElementsByTagName("tbody").length,
			htmlSerialize : !!d.getElementsByTagName("link").length,
			style : /top/.test(r.getAttribute("style")),
			hrefNormalized : "/a" === r.getAttribute("href"),
			opacity : /^0.5/.test(r.style.opacity),
			cssFloat : !!r.style.cssFloat,
			checkOn : !!a.value,
			optSelected : l.selected,
			enctype : !!o.createElement("form").enctype,
			html5Clone : "<:nav></:nav>" !== o.createElement("nav").cloneNode(!0).outerHTML,
			boxModel : "CSS1Compat" === o.compatMode,
			deleteExpando : !0,
			noCloneEvent : !0,
			inlineBlockNeedsLayout : !1,
			shrinkWrapBlocks : !1,
			reliableMarginRight : !0,
			boxSizingReliable : !0,
			pixelPosition : !1
		},
		a.checked = !0,
		t.noCloneChecked = a.cloneNode(!0).checked,
		s.disabled = !0,
		t.optDisabled = !l.disabled;
		try {
			delete d.test;
		} catch (h) {
			t.deleteExpando = !1;
		}
		a = o.createElement("input"),
		a.setAttribute("value", ""),
		t.input = "" === a.getAttribute("value"),
		a.value = "t",
		a.setAttribute("type", "radio"),
		t.radioValue = "t" === a.value,
		a.setAttribute("checked", "t"),
		a.setAttribute("name", "t"),
		u = o.createDocumentFragment(),
		u.appendChild(a),
		t.appendChecked = a.checked,
		t.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked,
		d.attachEvent && (d.attachEvent("onclick", function () {
				t.noCloneEvent = !1;
			}), d.cloneNode(!0).click());
		for (f in {
			submit : !0,
			change : !0,
			focusin : !0
		}) {
			d.setAttribute(c = "on" + f, "t"),
			t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1;
		}
		return d.style.backgroundClip = "content-box",
		d.cloneNode(!0).style.backgroundClip = "",
		t.clearCloneStyle = "content-box" === d.style.backgroundClip,
		b(function () {
			var n,
			r,
			a,
			s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			u = o.getElementsByTagName("body")[0];
			u && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", u.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = d.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === a[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === d.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== u.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
							width : "4px"
						}).width, r = d.appendChild(o.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (u.style.zoom = 1)), u.removeChild(n), n = d = a = r = null);
		}),
		n = s = u = l = r = a = null,
		t;
	}
	();
	var O = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	B = /([A-Z])/g;
	function P(e, n, r, i) {
		if (b.acceptData(e)) {
			var o,
			a,
			s = b.expando,
			u = "string" == typeof n,
			l = e.nodeType,
			p = l ? b.cache : e,
			f = l ? e[s] : e[s] && s;
			if (f && p[f] && (i || p[f].data) || !u || r !== t) {
				return f || (l ? e[s] = f = c.pop() || b.guid++ : f = s),
				p[f] || (p[f] = {}, l || (p[f].toJSON = b.noop)),
				("object" == typeof n || "function" == typeof n) && (i ? p[f] = b.extend(p[f], n) : p[f].data = b.extend(p[f].data, n)),
				o = p[f],
				i || (o.data || (o.data = {}), o = o.data),
				r !== t && (o[b.camelCase(n)] = r),
				u ? (a = o[n], null == a && (a = o[b.camelCase(n)])) : a = o,
				a;
			}
		}
	}
	function R(e, t, n) {
		if (b.acceptData(e)) {
			var r,
			i,
			o,
			a = e.nodeType,
			s = a ? b.cache : e,
			u = a ? e[b.expando] : b.expando;
			if (s[u]) {
				if (t && (o = n ? s[u] : s[u].data)) {
					b.isArray(t) ? t = t.concat(b.map(t, b.camelCase)) : t in o ? t = [t] : (t = b.camelCase(t), t = t in o ? [t] : t.split(" "));
					for (r = 0, i = t.length; i > r; r++) {
						delete o[t[r]];
					}
					if (!(n ? $ : b.isEmptyObject)(o)) {
						return;
					}
				}
				(n || (delete s[u].data, $(s[u]))) && (a ? b.cleanData([e], !0) : b.support.deleteExpando || s != s.window ? delete s[u] : s[u] = null);
			}
		}
	}
	b.extend({
		cache : {},
		expando : "jQuery" + (p + Math.random()).replace(/\D/g, ""),
		noData : {
			embed : !0,
			object : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet : !0
		},
		hasData : function (e) {
			return e = e.nodeType ? b.cache[e[b.expando]] : e[b.expando],
			!!e && !$(e);
		},
		data : function (e, t, n) {
			return P(e, t, n);
		},
		removeData : function (e, t) {
			return R(e, t);
		},
		_data : function (e, t, n) {
			return P(e, t, n, !0);
		},
		_removeData : function (e, t) {
			return R(e, t, !0);
		},
		acceptData : function (e) {
			if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) {
				return !1;
			}
			var t = e.nodeName && b.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t;
		}
	}),
	b.fn.extend({
		data : function (e, n) {
			var r,
			i,
			o = this[0],
			a = 0,
			s = null;
			if (e === t) {
				if (this.length && (s = b.data(o), 1 === o.nodeType && !b._data(o, "parsedAttrs"))) {
					for (r = o.attributes; r.length > a; a++) {
						i = r[a].name,
						i.indexOf("data-") || (i = b.camelCase(i.slice(5)), W(o, i, s[i]));
					}
					b._data(o, "parsedAttrs", !0);
				}
				return s;
			}
			return "object" == typeof e ? this.each(function () {
				b.data(this, e);
			}) : b.access(this, function (n) {
				return n === t ? o ? W(o, e, b.data(o, e)) : null : (this.each(function () {
						b.data(this, e, n);
					}), t);
			}, null, n, arguments.length > 1, null, !0);
		},
		removeData : function (e) {
			return this.each(function () {
				b.removeData(this, e);
			});
		}
	});
	function W(e, n, r) {
		if (r === t && 1 === e.nodeType) {
			var i = "data-" + n.replace(B, "-$1").toLowerCase();
			if (r = e.getAttribute(i), "string" == typeof r) {
				try {
					r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : O.test(r) ? b.parseJSON(r) : r;
				} catch (o) {}

				b.data(e, n, r);
			} else {
				r = t;
			}
		}
		return r;
	}
	function $(e) {
		var t;
		for (t in e) {
			if (("data" !== t || !b.isEmptyObject(e[t])) && "toJSON" !== t) {
				return !1;
			}
		}
		return !0;
	}
	b.extend({
		queue : function (e, n, r) {
			var i;
			return e ? (n = (n || "fx") + "queue", i = b._data(e, n), r && (!i || b.isArray(r) ? i = b._data(e, n, b.makeArray(r)) : i.push(r)), i || []) : t;
		},
		dequeue : function (e, t) {
			t = t || "fx";
			var n = b.queue(e, t),
			r = n.length,
			i = n.shift(),
			o = b._queueHooks(e, t),
			a = function () {
				b.dequeue(e, t);
			};
			"inprogress" === i && (i = n.shift(), r--),
			o.cur = i,
			i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)),
			!r && o && o.empty.fire();
		},
		_queueHooks : function (e, t) {
			var n = t + "queueHooks";
			return b._data(e, n) || b._data(e, n, {
				empty : b.Callbacks("once memory").add(function () {
					b._removeData(e, t + "queue"),
					b._removeData(e, n);
				})
			});
		}
	}),
	b.fn.extend({
		queue : function (e, n) {
			var r = 2;
			return "string" != typeof e && (n = e, e = "fx", r--),
			r > arguments.length ? b.queue(this[0], e) : n === t ? this : this.each(function () {
				var t = b.queue(this, e, n);
				b._queueHooks(this, e),
				"fx" === e && "inprogress" !== t[0] && b.dequeue(this, e);
			});
		},
		dequeue : function (e) {
			return this.each(function () {
				b.dequeue(this, e);
			});
		},
		delay : function (e, t) {
			return e = b.fx ? b.fx.speeds[e] || e : e,
			t = t || "fx",
			this.queue(t, function (t, n) {
				var r = setTimeout(t, e);
				n.stop = function () {
					clearTimeout(r);
				};
			});
		},
		clearQueue : function (e) {
			return this.queue(e || "fx", []);
		},
		promise : function (e, n) {
			var r,
			i = 1,
			o = b.Deferred(),
			a = this,
			s = this.length,
			u = function () {
				--i || o.resolveWith(a, [a]);
			};
			"string" != typeof e && (n = e, e = t),
			e = e || "fx";
			while (s--) {
				r = b._data(a[s], e + "queueHooks"),
				r && r.empty && (i++, r.empty.add(u));
			}
			return u(),
			o.promise(n);
		}
	});
	var I,
	z,
	X = /[\t\r\n]/g,
	U = /\r/g,
	V = /^(?:input|select|textarea|button|object)$/i,
	Y = /^(?:a|area)$/i,
	J = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	G = /^(?:checked|selected)$/i,
	Q = b.support.getSetAttribute,
	K = b.support.input;
	b.fn.extend({
		attr : function (e, t) {
			return b.access(this, b.attr, e, t, arguments.length > 1);
		},
		removeAttr : function (e) {
			return this.each(function () {
				b.removeAttr(this, e);
			});
		},
		prop : function (e, t) {
			return b.access(this, b.prop, e, t, arguments.length > 1);
		},
		removeProp : function (e) {
			return e = b.propFix[e] || e,
			this.each(function () {
				try {
					this[e] = t,
					delete this[e];
				} catch (n) {}

			});
		},
		addClass : function (e) {
			var t,
			n,
			r,
			i,
			o,
			a = 0,
			s = this.length,
			u = "string" == typeof e && e;
			if (b.isFunction(e)) {
				return this.each(function (t) {
					b(this).addClass(e.call(this, t, this.className));
				});
			}
			if (u) {
				for (t = (e || "").match(w) || []; s > a; a++) {
					if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : " ")) {
						o = 0;
						while (i = t[o++]) {
							0 > r.indexOf(" " + i + " ") && (r += i + " ");
						}
						n.className = b.trim(r);
					}
				}
			}
			return this;
		},
		removeClass : function (e) {
			var t,
			n,
			r,
			i,
			o,
			a = 0,
			s = this.length,
			u = 0 === arguments.length || "string" == typeof e && e;
			if (b.isFunction(e)) {
				return this.each(function (t) {
					b(this).removeClass(e.call(this, t, this.className));
				});
			}
			if (u) {
				for (t = (e || "").match(w) || []; s > a; a++) {
					if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : "")) {
						o = 0;
						while (i = t[o++]) {
							while (r.indexOf(" " + i + " ") >= 0) {
								r = r.replace(" " + i + " ", " ");
							}
						}
						n.className = e ? b.trim(r) : "";
					}
				}
			}
			return this;
		},
		toggleClass : function (e, t) {
			var n = typeof e,
			r = "boolean" == typeof t;
			return b.isFunction(e) ? this.each(function (n) {
				b(this).toggleClass(e.call(this, n, this.className, t), t);
			}) : this.each(function () {
				if ("string" === n) {
					var o,
					a = 0,
					s = b(this),
					u = t,
					l = e.match(w) || [];
					while (o = l[a++]) {
						u = r ? u : !s.hasClass(o),
						s[u ? "addClass" : "removeClass"](o);
					}
				} else {
					(n === i || "boolean" === n) && (this.className && b._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : b._data(this, "__className__") || "");
				}
			});
		},
		hasClass : function (e) {
			var t = " " + e + " ",
			n = 0,
			r = this.length;
			for (; r > n; n++) {
				if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(X, " ").indexOf(t) >= 0) {
					return !0;
				}
			}
			return !1;
		},
		val : function (e) {
			var n,
			r,
			i,
			o = this[0];
			if (arguments.length) {
				return i = b.isFunction(e),
				this.each(function (n) {
					var o,
					a = b(this);
					1 === this.nodeType && (o = i ? e.call(this, n, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : b.isArray(o) && (o = b.map(o, function (e) {
										return null == e ? "" : e + "";
									})), r = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o));
				});
			}
			if (o) {
				return r = b.valHooks[o.type] || b.valHooks[o.nodeName.toLowerCase()],
				r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(U, "") : null == n ? "" : n);
			}
		}
	}),
	b.extend({
		valHooks : {
			option : {
				get : function (e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text;
				}
			},
			select : {
				get : function (e) {
					var t,
					n,
					r = e.options,
					i = e.selectedIndex,
					o = "select-one" === e.type || 0 > i,
					a = o ? null : [],
					s = o ? i + 1 : r.length,
					u = 0 > i ? s : o ? i : 0;
					for (; s > u; u++) {
						if (n = r[u], !(!n.selected && u !== i || (b.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && b.nodeName(n.parentNode, "optgroup"))) {
							if (t = b(n).val(), o) {
								return t;
							}
							a.push(t);
						}
					}
					return a;
				},
				set : function (e, t) {
					var n = b.makeArray(t);
					return b(e).find("option").each(function () {
						this.selected = b.inArray(b(this).val(), n) >= 0;
					}),
					n.length || (e.selectedIndex = -1),
					n;
				}
			}
		},
		attr : function (e, n, r) {
			var o,
			a,
			s,
			u = e.nodeType;
			if (e && 3 !== u && 8 !== u && 2 !== u) {
				return typeof e.getAttribute === i ? b.prop(e, n, r) : (a = 1 !== u || !b.isXMLDoc(e), a && (n = n.toLowerCase(), o = b.attrHooks[n] || (J.test(n) ? z : I)), r === t ? o && a && "get" in o && null !== (s = o.get(e, n)) ? s : (typeof e.getAttribute !== i && (s = e.getAttribute(n)), null == s ? t : s) : null !== r ? o && a && "set" in o && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r) : (b.removeAttr(e, n), t));
			}
		},
		removeAttr : function (e, t) {
			var n,
			r,
			i = 0,
			o = t && t.match(w);
			if (o && 1 === e.nodeType) {
				while (n = o[i++]) {
					r = b.propFix[n] || n,
					J.test(n) ? !Q && G.test(n) ? e[b.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : b.attr(e, n, ""),
					e.removeAttribute(Q ? n : r);
				}
			}
		},
		attrHooks : {
			type : {
				set : function (e, t) {
					if (!b.support.radioValue && "radio" === t && b.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t),
						n && (e.value = n),
						t;
					}
				}
			}
		},
		propFix : {
			tabindex : "tabIndex",
			readonly : "readOnly",
			"for" : "htmlFor",
			"class" : "className",
			maxlength : "maxLength",
			cellspacing : "cellSpacing",
			cellpadding : "cellPadding",
			rowspan : "rowSpan",
			colspan : "colSpan",
			usemap : "useMap",
			frameborder : "frameBorder",
			contenteditable : "contentEditable"
		},
		prop : function (e, n, r) {
			var i,
			o,
			a,
			s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) {
				return a = 1 !== s || !b.isXMLDoc(e),
				a && (n = b.propFix[n] || n, o = b.propHooks[n]),
				r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n];
			}
		},
		propHooks : {
			tabIndex : {
				get : function (e) {
					var n = e.getAttributeNode("tabindex");
					return n && n.specified ? parseInt(n.value, 10) : V.test(e.nodeName) || Y.test(e.nodeName) && e.href ? 0 : t;
				}
			}
		}
	}),
	z = {
		get : function (e, n) {
			var r = b.prop(e, n),
			i = "boolean" == typeof r && e.getAttribute(n),
			o = "boolean" == typeof r ? K && Q ? null != i : G.test(n) ? e[b.camelCase("default-" + n)] : !!i : e.getAttributeNode(n);
			return o && o.value !== !1 ? n.toLowerCase() : t;
		},
		set : function (e, t, n) {
			return t === !1 ? b.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && b.propFix[n] || n, n) : e[b.camelCase("default-" + n)] = e[n] = !0,
			n;
		}
	},
	K && Q || (b.attrHooks.value = {
			get : function (e, n) {
				var r = e.getAttributeNode(n);
				return b.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t;
			},
			set : function (e, n, r) {
				return b.nodeName(e, "input") ? (e.defaultValue = n, t) : I && I.set(e, n, r);
			}
		}),
	Q || (I = b.valHooks.button = {
			get : function (e, n) {
				var r = e.getAttributeNode(n);
				return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t;
			},
			set : function (e, n, r) {
				var i = e.getAttributeNode(r);
				return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)),
				i.value = n += "",
				"value" === r || n === e.getAttribute(r) ? n : t;
			}
		}, b.attrHooks.contenteditable = {
			get : I.get,
			set : function (e, t, n) {
				I.set(e, "" === t ? !1 : t, n);
			}
		}, b.each(["width", "height"], function (e, n) {
			b.attrHooks[n] = b.extend(b.attrHooks[n], {
					set : function (e, r) {
						return "" === r ? (e.setAttribute(n, "auto"), r) : t;
					}
				});
		})),
	b.support.hrefNormalized || (b.each(["href", "src", "width", "height"], function (e, n) {
			b.attrHooks[n] = b.extend(b.attrHooks[n], {
					get : function (e) {
						var r = e.getAttribute(n, 2);
						return null == r ? t : r;
					}
				});
		}), b.each(["href", "src"], function (e, t) {
			b.propHooks[t] = {
				get : function (e) {
					return e.getAttribute(t, 4);
				}
			};
		})),
	b.support.style || (b.attrHooks.style = {
			get : function (e) {
				return e.style.cssText || t;
			},
			set : function (e, t) {
				return e.style.cssText = t + "";
			}
		}),
	b.support.optSelected || (b.propHooks.selected = b.extend(b.propHooks.selected, {
				get : function (e) {
					var t = e.parentNode;
					return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
					null;
				}
			})),
	b.support.enctype || (b.propFix.enctype = "encoding"),
	b.support.checkOn || b.each(["radio", "checkbox"], function () {
		b.valHooks[this] = {
			get : function (e) {
				return null === e.getAttribute("value") ? "on" : e.value;
			}
		};
	}),
	b.each(["radio", "checkbox"], function () {
		b.valHooks[this] = b.extend(b.valHooks[this], {
				set : function (e, n) {
					return b.isArray(n) ? e.checked = b.inArray(b(e).val(), n) >= 0 : t;
				}
			});
	});
	var Z = /^(?:input|select|textarea)$/i,
	et = /^key/,
	tt = /^(?:mouse|contextmenu)|click/,
	nt = /^(?:focusinfocus|focusoutblur)$/,
	rt = /^([^.]*)(?:\.(.+)|)$/;
	function it() {
		return !0;
	}
	function ot() {
		return !1;
	}
	b.event = {
		global : {},
		add : function (e, n, r, o, a) {
			var s,
			u,
			l,
			c,
			p,
			f,
			d,
			h,
			g,
			m,
			y,
			v = b._data(e);
			if (v) {
				r.handler && (c = r, r = c.handler, a = c.selector),
				r.guid || (r.guid = b.guid++),
				(u = v.events) || (u = v.events = {}),
				(f = v.handle) || (f = v.handle = function (e) {
					return typeof b === i || e && b.event.triggered === e.type ? t : b.event.dispatch.apply(f.elem, arguments);
				}, f.elem = e),
				n = (n || "").match(w) || [""],
				l = n.length;
				while (l--) {
					s = rt.exec(n[l]) || [],
					g = y = s[1],
					m = (s[2] || "").split(".").sort(),
					p = b.event.special[g] || {},
					g = (a ? p.delegateType : p.bindType) || g,
					p = b.event.special[g] || {},
					d = b.extend({
							type : g,
							origType : y,
							data : o,
							handler : r,
							guid : r.guid,
							selector : a,
							needsContext : a && b.expr.match.needsContext.test(a),
							namespace : m.join(".")
						}, c),
					(h = u[g]) || (h = u[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))),
					p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)),
					a ? h.splice(h.delegateCount++, 0, d) : h.push(d),
					b.event.global[g] = !0;
				}
				e = null;
			}
		},
		remove : function (e, t, n, r, i) {
			var o,
			a,
			s,
			u,
			l,
			c,
			p,
			f,
			d,
			h,
			g,
			m = b.hasData(e) && b._data(e);
			if (m && (c = m.events)) {
				t = (t || "").match(w) || [""],
				l = t.length;
				while (l--) {
					if (s = rt.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
						p = b.event.special[d] || {},
						d = (r ? p.delegateType : p.bindType) || d,
						f = c[d] || [],
						s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
						u = o = f.length;
						while (o--) {
							a = f[o],
							!i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a));
						}
						u && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || b.removeEvent(e, d, m.handle), delete c[d]);
					} else {
						for (d in c) {
							b.event.remove(e, d + t[l], n, r, !0);
						}
					}
				}
				b.isEmptyObject(c) && (delete m.handle, b._removeData(e, "events"));
			}
		},
		trigger : function (n, r, i, a) {
			var s,
			u,
			l,
			c,
			p,
			f,
			d,
			h = [i || o],
			g = y.call(n, "type") ? n.type : n,
			m = y.call(n, "namespace") ? n.namespace.split(".") : [];
			if (l = f = i = i || o, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + b.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), u = 0 > g.indexOf(":") && "on" + g, n = n[b.expando] ? n : new b.Event(g, "object" == typeof n && n), n.isTrigger = !0, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : b.makeArray(r, [n]), p = b.event.special[g] || {}, a || !p.trigger || p.trigger.apply(i, r) !== !1)) {
				if (!a && !p.noBubble && !b.isWindow(i)) {
					for (c = p.delegateType || g, nt.test(c + g) || (l = l.parentNode); l; l = l.parentNode) {
						h.push(l),
						f = l;
					}
					f === (i.ownerDocument || o) && h.push(f.defaultView || f.parentWindow || e);
				}
				d = 0;
				while ((l = h[d++]) && !n.isPropagationStopped()) {
					n.type = d > 1 ? c : p.bindType || g,
					s = (b._data(l, "events") || {})[n.type] && b._data(l, "handle"),
					s && s.apply(l, r),
					s = u && l[u],
					s && b.acceptData(l) && s.apply && s.apply(l, r) === !1 && n.preventDefault();
				}
				if (n.type = g, !(a || n.isDefaultPrevented() || p._default && p._default.apply(i.ownerDocument, r) !== !1 || "click" === g && b.nodeName(i, "a") || !b.acceptData(i) || !u || !i[g] || b.isWindow(i))) {
					f = i[u],
					f && (i[u] = null),
					b.event.triggered = g;
					try {
						i[g]();
					} catch (v) {}

					b.event.triggered = t,
					f && (i[u] = f);
				}
				return n.result;
			}
		},
		dispatch : function (e) {
			e = b.event.fix(e);
			var n,
			r,
			i,
			o,
			a,
			s = [],
			u = h.call(arguments),
			l = (b._data(this, "events") || {})[e.type] || [],
			c = b.event.special[e.type] || {};
			if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
				s = b.event.handlers.call(this, e, l),
				n = 0;
				while ((o = s[n++]) && !e.isPropagationStopped()) {
					e.currentTarget = o.elem,
					a = 0;
					while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) {
						(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((b.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
					}
				}
				return c.postDispatch && c.postDispatch.call(this, e),
				e.result;
			}
		},
		handlers : function (e, n) {
			var r,
			i,
			o,
			a,
			s = [],
			u = n.delegateCount,
			l = e.target;
			if (u && l.nodeType && (!e.button || "click" !== e.type)) {
				for (; l != this; l = l.parentNode || this) {
					if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
						for (o = [], a = 0; u > a; a++) {
							i = n[a],
							r = i.selector + " ",
							o[r] === t && (o[r] = i.needsContext ? b(r, this).index(l) >= 0 : b.find(r, this, null, [l]).length),
							o[r] && o.push(i);
						}
						o.length && s.push({
							elem : l,
							handlers : o
						});
					}
				}
			}
			return n.length > u && s.push({
				elem : this,
				handlers : n.slice(u)
			}),
			s;
		},
		fix : function (e) {
			if (e[b.expando]) {
				return e;
			}
			var t,
			n,
			r,
			i = e.type,
			a = e,
			s = this.fixHooks[i];
			s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}),
			r = s.props ? this.props.concat(s.props) : this.props,
			e = new b.Event(a),
			t = r.length;
			while (t--) {
				n = r[t],
				e[n] = a[n];
			}
			return e.target || (e.target = a.srcElement || o),
			3 === e.target.nodeType && (e.target = e.target.parentNode),
			e.metaKey = !!e.metaKey,
			s.filter ? s.filter(e, a) : e;
		},
		props : "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks : {},
		keyHooks : {
			props : "char charCode key keyCode".split(" "),
			filter : function (e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
				e;
			}
		},
		mouseHooks : {
			props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter : function (e, n) {
				var r,
				i,
				a,
				s = n.button,
				u = n.fromElement;
				return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || o, a = i.documentElement, r = i.body, e.pageX = n.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)),
				!e.relatedTarget && u && (e.relatedTarget = u === e.target ? n.toElement : u),
				e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
				e;
			}
		},
		special : {
			load : {
				noBubble : !0
			},
			click : {
				trigger : function () {
					return b.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t;
				}
			},
			focus : {
				trigger : function () {
					if (this !== o.activeElement && this.focus) {
						try {
							return this.focus(),
							!1;
						} catch (e) {}

					}
				},
				delegateType : "focusin"
			},
			blur : {
				trigger : function () {
					return this === o.activeElement && this.blur ? (this.blur(), !1) : t;
				},
				delegateType : "focusout"
			},
			beforeunload : {
				postDispatch : function (e) {
					e.result !== t && (e.originalEvent.returnValue = e.result);
				}
			}
		},
		simulate : function (e, t, n, r) {
			var i = b.extend(new b.Event, n, {
					type : e,
					isSimulated : !0,
					originalEvent : {}

				});
			r ? b.event.trigger(i, null, t) : b.event.dispatch.call(t, i),
			i.isDefaultPrevented() && n.preventDefault();
		}
	},
	b.removeEvent = o.removeEventListener ? function (e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1);
	}
	 : function (e, t, n) {
		var r = "on" + t;
		e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n));
	},
	b.Event = function (e, n) {
		return this instanceof b.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && b.extend(this, n), this.timeStamp = e && e.timeStamp || b.now(), this[b.expando] = !0, t) : new b.Event(e, n);
	},
	b.Event.prototype = {
		isDefaultPrevented : ot,
		isPropagationStopped : ot,
		isImmediatePropagationStopped : ot,
		preventDefault : function () {
			var e = this.originalEvent;
			this.isDefaultPrevented = it,
			e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
		},
		stopPropagation : function () {
			var e = this.originalEvent;
			this.isPropagationStopped = it,
			e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0);
		},
		stopImmediatePropagation : function () {
			this.isImmediatePropagationStopped = it,
			this.stopPropagation();
		}
	},
	b.each({
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	}, function (e, t) {
		b.event.special[e] = {
			delegateType : t,
			bindType : t,
			handle : function (e) {
				var n,
				r = this,
				i = e.relatedTarget,
				o = e.handleObj;
				return (!i || i !== r && !b.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t),
				n;
			}
		};
	}),
	b.support.submitBubbles || (b.event.special.submit = {
			setup : function () {
				return b.nodeName(this, "form") ? !1 : (b.event.add(this, "click._submit keypress._submit", function (e) {
						var n = e.target,
						r = b.nodeName(n, "input") || b.nodeName(n, "button") ? n.form : t;
						r && !b._data(r, "submitBubbles") && (b.event.add(r, "submit._submit", function (e) {
								e._submit_bubble = !0;
							}), b._data(r, "submitBubbles", !0));
					}), t);
			},
			postDispatch : function (e) {
				e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && b.event.simulate("submit", this.parentNode, e, !0));
			},
			teardown : function () {
				return b.nodeName(this, "form") ? !1 : (b.event.remove(this, "._submit"), t);
			}
		}),
	b.support.changeBubbles || (b.event.special.change = {
			setup : function () {
				return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (b.event.add(this, "propertychange._change", function (e) {
							"checked" === e.originalEvent.propertyName && (this._just_changed = !0);
						}), b.event.add(this, "click._change", function (e) {
							this._just_changed && !e.isTrigger && (this._just_changed = !1),
							b.event.simulate("change", this, e, !0);
						})), !1) : (b.event.add(this, "beforeactivate._change", function (e) {
						var t = e.target;
						Z.test(t.nodeName) && !b._data(t, "changeBubbles") && (b.event.add(t, "change._change", function (e) {
								!this.parentNode || e.isSimulated || e.isTrigger || b.event.simulate("change", this.parentNode, e, !0);
							}), b._data(t, "changeBubbles", !0));
					}), t);
			},
			handle : function (e) {
				var n = e.target;
				return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t;
			},
			teardown : function () {
				return b.event.remove(this, "._change"),
				!Z.test(this.nodeName);
			}
		}),
	b.support.focusinBubbles || b.each({
		focus : "focusin",
		blur : "focusout"
	}, function (e, t) {
		var n = 0,
		r = function (e) {
			b.event.simulate(t, e.target, b.event.fix(e), !0);
		};
		b.event.special[t] = {
			setup : function () {
				0 === n++ && o.addEventListener(e, r, !0);
			},
			teardown : function () {
				0 === --n && o.removeEventListener(e, r, !0);
			}
		};
	}),
	b.fn.extend({
		on : function (e, n, r, i, o) {
			var a,
			s;
			if ("object" == typeof e) {
				"string" != typeof n && (r = r || n, n = t);
				for (a in e) {
					this.on(a, n, r, e[a], o);
				}
				return this;
			}
			if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) {
				i = ot;
			} else {
				if (!i) {
					return this;
				}
			}
			return 1 === o && (s = i, i = function (e) {
				return b().off(e),
				s.apply(this, arguments);
			}, i.guid = s.guid || (s.guid = b.guid++)),
			this.each(function () {
				b.event.add(this, e, i, r, n);
			});
		},
		one : function (e, t, n, r) {
			return this.on(e, t, n, r, 1);
		},
		off : function (e, n, r) {
			var i,
			o;
			if (e && e.preventDefault && e.handleObj) {
				return i = e.handleObj,
				b(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler),
				this;
			}
			if ("object" == typeof e) {
				for (o in e) {
					this.off(o, n, e[o]);
				}
				return this;
			}
			return (n === !1 || "function" == typeof n) && (r = n, n = t),
			r === !1 && (r = ot),
			this.each(function () {
				b.event.remove(this, e, r, n);
			});
		},
		bind : function (e, t, n) {
			return this.on(e, null, t, n);
		},
		unbind : function (e, t) {
			return this.off(e, null, t);
		},
		delegate : function (e, t, n, r) {
			return this.on(t, e, n, r);
		},
		undelegate : function (e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
		},
		trigger : function (e, t) {
			return this.each(function () {
				b.event.trigger(e, t, this);
			});
		},
		triggerHandler : function (e, n) {
			var r = this[0];
			return r ? b.event.trigger(e, n, r, !0) : t;
		}
	}),
	function (e, t) {
		var n,
		r,
		i,
		o,
		a,
		s,
		u,
		l,
		c,
		p,
		f,
		d,
		h,
		g,
		m,
		y,
		v,
		x = "sizzle" + -new Date,
		w = e.document,
		T = {},
		N = 0,
		C = 0,
		k = it(),
		E = it(),
		S = it(),
		A = typeof t,
		j = 1 << 31,
		D = [],
		L = D.pop,
		H = D.push,
		q = D.slice,
		M = D.indexOf || function (e) {
			var t = 0,
			n = this.length;
			for (; n > t; t++) {
				if (this[t] === e) {
					return t;
				}
			}
			return -1;
		},
		_ = "[\\x20\\t\\r\\n\\f]",
		F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
		O = F.replace("w", "w#"),
		B = "([*^$|!~]?=)",
		P = "\\[" + _ + "*(" + F + ")" + _ + "*(?:" + B + _ + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + O + ")|)|)" + _ + "*\\]",
		R = ":(" + F + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + P.replace(3, 8) + ")*)|.*)\\)|)",
		W = RegExp("^" + _ + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _ + "+$", "g"),
		$ = RegExp("^" + _ + "*," + _ + "*"),
		I = RegExp("^" + _ + "*([\\x20\\t\\r\\n\\f>+~])" + _ + "*"),
		z = RegExp(R),
		X = RegExp("^" + O + "$"),
		U = {
			ID : RegExp("^#(" + F + ")"),
			CLASS : RegExp("^\\.(" + F + ")"),
			NAME : RegExp("^\\[name=['\"]?(" + F + ")['\"]?\\]"),
			TAG : RegExp("^(" + F.replace("w", "w*") + ")"),
			ATTR : RegExp("^" + P),
			PSEUDO : RegExp("^" + R),
			CHILD : RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _ + "*(even|odd|(([+-]|)(\\d*)n|)" + _ + "*(?:([+-]|)" + _ + "*(\\d+)|))" + _ + "*\\)|)", "i"),
			needsContext : RegExp("^" + _ + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _ + "*((?:-\\d)?\\d*)" + _ + "*\\)|)(?=[^-]|$)", "i")
		},
		V = /[\x20\t\r\n\f]*[+~]/,
		Y = /^[^{]+\{\s*\[native code/,
		J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		G = /^(?:input|select|textarea|button)$/i,
		Q = /^h\d$/i,
		K = /'|\\/g,
		Z = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
		et = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
		tt = function (e, t) {
			var n = "0x" + t - 65536;
			return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n);
		};
		try {
			q.call(w.documentElement.childNodes, 0)[0].nodeType;
		} catch (nt) {
			q = function (e) {
				var t,
				n = [];
				while (t = this[e++]) {
					n.push(t);
				}
				return n;
			};
		}
		function rt(e) {
			return Y.test(e + "");
		}
		function it() {
			var e,
			t = [];
			return e = function (n, r) {
				return t.push(n += " ") > i.cacheLength && delete e[t.shift()],
				e[n] = r;
			};
		}
		function ot(e) {
			return e[x] = !0,
			e;
		}
		function at(e) {
			var t = p.createElement("div");
			try {
				return e(t);
			} catch (n) {
				return !1;
			}
			finally {
				t = null;
			}
		}
		function st(e, t, n, r) {
			var i,
			o,
			a,
			s,
			u,
			l,
			f,
			g,
			m,
			v;
			if ((t ? t.ownerDocument || t : w) !== p && c(t), t = t || p, n = n || [], !e || "string" != typeof e) {
				return n;
			}
			if (1 !== (s = t.nodeType) && 9 !== s) {
				return [];
			}
			if (!d && !r) {
				if (i = J.exec(e)) {
					if (a = i[1]) {
						if (9 === s) {
							if (o = t.getElementById(a), !o || !o.parentNode) {
								return n;
							}
							if (o.id === a) {
								return n.push(o),
								n;
							}
						} else {
							if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && y(t, o) && o.id === a) {
								return n.push(o),
								n;
							}
						}
					} else {
						if (i[2]) {
							return H.apply(n, q.call(t.getElementsByTagName(e), 0)),
							n;
						}
						if ((a = i[3]) && T.getByClassName && t.getElementsByClassName) {
							return H.apply(n, q.call(t.getElementsByClassName(a), 0)),
							n;
						}
					}
				}
				if (T.qsa && !h.test(e)) {
					if (f = !0, g = x, m = t, v = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
						l = ft(e),
						(f = t.getAttribute("id")) ? g = f.replace(K, "\\$&") : t.setAttribute("id", g),
						g = "[id='" + g + "'] ",
						u = l.length;
						while (u--) {
							l[u] = g + dt(l[u]);
						}
						m = V.test(e) && t.parentNode || t,
						v = l.join(",");
					}
					if (v) {
						try {
							return H.apply(n, q.call(m.querySelectorAll(v), 0)),
							n;
						} catch (b) {}

						finally {
							f || t.removeAttribute("id");
						}
					}
				}
			}
			return wt(e.replace(W, "$1"), t, n, r);
		}
		a = st.isXML = function (e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? "HTML" !== t.nodeName : !1;
		},
		c = st.setDocument = function (e) {
			var n = e ? e.ownerDocument || e : w;
			return n !== p && 9 === n.nodeType && n.documentElement ? (p = n, f = n.documentElement, d = a(n), T.tagNameNoComments = at(function (e) {
						return e.appendChild(n.createComment("")),
						!e.getElementsByTagName("*").length;
					}), T.attributes = at(function (e) {
						e.innerHTML = "<select></select>";
						var t = typeof e.lastChild.getAttribute("multiple");
						return "boolean" !== t && "string" !== t;
					}), T.getByClassName = at(function (e) {
						return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
						e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1;
					}), T.getByName = at(function (e) {
						e.id = x + 0,
						e.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>",
						f.insertBefore(e, f.firstChild);
						var t = n.getElementsByName && n.getElementsByName(x).length === 2 + n.getElementsByName(x + 0).length;
						return T.getIdNotName = !n.getElementById(x),
						f.removeChild(e),
						t;
					}), i.attrHandle = at(function (e) {
						return e.innerHTML = "<a href='#'></a>",
						e.firstChild && typeof e.firstChild.getAttribute !== A && "#" === e.firstChild.getAttribute("href");
					}) ? {}

				 : {
				href : function (e) {
					return e.getAttribute("href", 2);
				},
				type : function (e) {
					return e.getAttribute("type");
				}
			}, T.getIdNotName ? (i.find.ID = function (e, t) {
					if (typeof t.getElementById !== A && !d) {
						var n = t.getElementById(e);
						return n && n.parentNode ? [n] : [];
					}
				}, i.filter.ID = function (e) {
					var t = e.replace(et, tt);
					return function (e) {
						return e.getAttribute("id") === t;
					};
				}) : (i.find.ID = function (e, n) {
					if (typeof n.getElementById !== A && !d) {
						var r = n.getElementById(e);
						return r ? r.id === e || typeof r.getAttributeNode !== A && r.getAttributeNode("id").value === e ? [r] : t : [];
					}
				}, i.filter.ID = function (e) {
					var t = e.replace(et, tt);
					return function (e) {
						var n = typeof e.getAttributeNode !== A && e.getAttributeNode("id");
						return n && n.value === t;
					};
				}), i.find.TAG = T.tagNameNoComments ? function (e, n) {
				return typeof n.getElementsByTagName !== A ? n.getElementsByTagName(e) : t;
			}
				 : function (e, t) {
				var n,
				r = [],
				i = 0,
				o = t.getElementsByTagName(e);
				if ("*" === e) {
					while (n = o[i++]) {
						1 === n.nodeType && r.push(n);
					}
					return r;
				}
				return o;
			}, i.find.NAME = T.getByName && function (e, n) {
				return typeof n.getElementsByName !== A ? n.getElementsByName(name) : t;
			}, i.find.CLASS = T.getByClassName && function (e, n) {
				return typeof n.getElementsByClassName === A || d ? t : n.getElementsByClassName(e);
			}, g = [], h = [":focus"], (T.qsa = rt(n.querySelectorAll)) && (at(function (e) {
						e.innerHTML = "<select><option selected=''></option></select>",
						e.querySelectorAll("[selected]").length || h.push("\\[" + _ + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
						e.querySelectorAll(":checked").length || h.push(":checked");
					}), at(function (e) {
						e.innerHTML = "<input type='hidden' i=''/>",
						e.querySelectorAll("[i^='']").length && h.push("[*^$]=" + _ + "*(?:\"\"|'')"),
						e.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled"),
						e.querySelectorAll("*,:x"),
						h.push(",.*:");
					})), (T.matchesSelector = rt(m = f.matchesSelector || f.mozMatchesSelector || f.webkitMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && at(function (e) {
					T.disconnectedMatch = m.call(e, "div"),
					m.call(e, "[s!='']:x"),
					g.push("!=", R);
				}), h = RegExp(h.join("|")), g = RegExp(g.join("|")), y = rt(f.contains) || f.compareDocumentPosition ? function (e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e,
				r = t && t.parentNode;
				return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
			}
				 : function (e, t) {
				if (t) {
					while (t = t.parentNode) {
						if (t === e) {
							return !0;
						}
					}
				}
				return !1;
			}, v = f.compareDocumentPosition ? function (e, t) {
				var r;
				return e === t ? (u = !0, 0) : (r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & r || e.parentNode && 11 === e.parentNode.nodeType ? e === n || y(w, e) ? -1 : t === n || y(w, t) ? 1 : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
			}
				 : function (e, t) {
				var r,
				i = 0,
				o = e.parentNode,
				a = t.parentNode,
				s = [e],
				l = [t];
				if (e === t) {
					return u = !0,
					0;
				}
				if (!o || !a) {
					return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : 0;
				}
				if (o === a) {
					return ut(e, t);
				}
				r = e;
				while (r = r.parentNode) {
					s.unshift(r);
				}
				r = t;
				while (r = r.parentNode) {
					l.unshift(r);
				}
				while (s[i] === l[i]) {
					i++;
				}
				return i ? ut(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0;
			}, u = !1, [0, 0].sort(v), T.detectDuplicates = u, p) : p;
		},
		st.matches = function (e, t) {
			return st(e, null, null, t);
		},
		st.matchesSelector = function (e, t) {
			if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Z, "='$1']"), !(!T.matchesSelector || d || g && g.test(t) || h.test(t))) {
				try {
					var n = m.call(e, t);
					if (n || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) {
						return n;
					}
				} catch (r) {}

			}
			return st(t, p, null, [e]).length > 0;
		},
		st.contains = function (e, t) {
			return (e.ownerDocument || e) !== p && c(e),
			y(e, t);
		},
		st.attr = function (e, t) {
			var n;
			return (e.ownerDocument || e) !== p && c(e),
			d || (t = t.toLowerCase()),
			(n = i.attrHandle[t]) ? n(e) : d || T.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null;
		},
		st.error = function (e) {
			throw Error("Syntax error, unrecognized expression: " + e);
		},
		st.uniqueSort = function (e) {
			var t,
			n = [],
			r = 1,
			i = 0;
			if (u = !T.detectDuplicates, e.sort(v), u) {
				for (; t = e[r]; r++) {
					t === e[r - 1] && (i = n.push(r));
				}
				while (i--) {
					e.splice(n[i], 1);
				}
			}
			return e;
		};
		function ut(e, t) {
			var n = t && e,
			r = n && (~t.sourceIndex || j) - (~e.sourceIndex || j);
			if (r) {
				return r;
			}
			if (n) {
				while (n = n.nextSibling) {
					if (n === t) {
						return -1;
					}
				}
			}
			return e ? 1 : -1;
		}
		function lt(e) {
			return function (t) {
				var n = t.nodeName.toLowerCase();
				return "input" === n && t.type === e;
			};
		}
		function ct(e) {
			return function (t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e;
			};
		}
		function pt(e) {
			return ot(function (t) {
				return t = +t,
				ot(function (n, r) {
					var i,
					o = e([], n.length, t),
					a = o.length;
					while (a--) {
						n[i = o[a]] && (n[i] = !(r[i] = n[i]));
					}
				});
			});
		}
		o = st.getText = function (e) {
			var t,
			n = "",
			r = 0,
			i = e.nodeType;
			if (i) {
				if (1 === i || 9 === i || 11 === i) {
					if ("string" == typeof e.textContent) {
						return e.textContent;
					}
					for (e = e.firstChild; e; e = e.nextSibling) {
						n += o(e);
					}
				} else {
					if (3 === i || 4 === i) {
						return e.nodeValue;
					}
				}
			} else {
				for (; t = e[r]; r++) {
					n += o(t);
				}
			}
			return n;
		},
		i = st.selectors = {
			cacheLength : 50,
			createPseudo : ot,
			match : U,
			find : {},
			relative : {
				">" : {
					dir : "parentNode",
					first : !0
				},
				" " : {
					dir : "parentNode"
				},
				"+" : {
					dir : "previousSibling",
					first : !0
				},
				"~" : {
					dir : "previousSibling"
				}
			},
			preFilter : {
				ATTR : function (e) {
					return e[1] = e[1].replace(et, tt),
					e[3] = (e[4] || e[5] || "").replace(et, tt),
					"~=" === e[2] && (e[3] = " " + e[3] + " "),
					e.slice(0, 4);
				},
				CHILD : function (e) {
					return e[1] = e[1].toLowerCase(),
					"nth" === e[1].slice(0, 3) ? (e[3] || st.error(e[0]), e[4] =  + (e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] =  + (e[7] + e[8] || "odd" === e[3])) : e[3] && st.error(e[0]),
					e;
				},
				PSEUDO : function (e) {
					var t,
					n = !e[5] && e[2];
					return U.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && z.test(n) && (t = ft(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
				}
			},
			filter : {
				TAG : function (e) {
					return "*" === e ? function () {
						return !0;
					}
					 : (e = e.replace(et, tt).toLowerCase(), function (t) {
						return t.nodeName && t.nodeName.toLowerCase() === e;
					});
				},
				CLASS : function (e) {
					var t = k[e + " "];
					return t || (t = RegExp("(^|" + _ + ")" + e + "(" + _ + "|$)")) && k(e, function (e) {
						return t.test(e.className || typeof e.getAttribute !== A && e.getAttribute("class") || "");
					});
				},
				ATTR : function (e, t, n) {
					return function (r) {
						var i = st.attr(r, e);
						return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0;
					};
				},
				CHILD : function (e, t, n, r, i) {
					var o = "nth" !== e.slice(0, 3),
					a = "last" !== e.slice(-4),
					s = "of-type" === t;
					return 1 === r && 0 === i ? function (e) {
						return !!e.parentNode;
					}
					 : function (t, n, u) {
						var l,
						c,
						p,
						f,
						d,
						h,
						g = o !== a ? "nextSibling" : "previousSibling",
						m = t.parentNode,
						y = s && t.nodeName.toLowerCase(),
						v = !u && !s;
						if (m) {
							if (o) {
								while (g) {
									p = t;
									while (p = p[g]) {
										if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) {
											return !1;
										}
									}
									h = g = "only" === e && !h && "nextSibling";
								}
								return !0;
							}
							if (h = [a ? m.firstChild : m.lastChild], a && v) {
								c = m[x] || (m[x] = {}),
								l = c[e] || [],
								d = l[0] === N && l[1],
								f = l[0] === N && l[2],
								p = d && m.childNodes[d];
								while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) {
									if (1 === p.nodeType && ++f && p === t) {
										c[e] = [N, d, f];
										break;
									}
								}
							} else {
								if (v && (l = (t[x] || (t[x] = {}))[e]) && l[0] === N) {
									f = l[1];
								} else {
									while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) {
										if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[x] || (p[x] = {}))[e] = [N, f]), p === t)) {
											break;
										}
									}
								}
							}
							return f -= i,
							f === r || 0 === f % r && f / r >= 0;
						}
					};
				},
				PSEUDO : function (e, t) {
					var n,
					r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
					return r[x] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ot(function (e, n) {
							var i,
							o = r(e, t),
							a = o.length;
							while (a--) {
								i = M.call(e, o[a]),
								e[i] = !(n[i] = o[a]);
							}
						}) : function (e) {
						return r(e, 0, n);
					}) : r;
				}
			},
			pseudos : {
				not : ot(function (e) {
					var t = [],
					n = [],
					r = s(e.replace(W, "$1"));
					return r[x] ? ot(function (e, t, n, i) {
						var o,
						a = r(e, null, i, []),
						s = e.length;
						while (s--) {
							(o = a[s]) && (e[s] = !(t[s] = o));
						}
					}) : function (e, i, o) {
						return t[0] = e,
						r(t, null, o, n),
						!n.pop();
					};
				}),
				has : ot(function (e) {
					return function (t) {
						return st(e, t).length > 0;
					};
				}),
				contains : ot(function (e) {
					return function (t) {
						return (t.textContent || t.innerText || o(t)).indexOf(e) > -1;
					};
				}),
				lang : ot(function (e) {
					return X.test(e || "") || st.error("unsupported lang: " + e),
					e = e.replace(et, tt).toLowerCase(),
					function (t) {
						var n;
						do {
							if (n = d ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) {
								return n = n.toLowerCase(),
								n === e || 0 === n.indexOf(e + "-");
							}
						} while ((t = t.parentNode) && 1 === t.nodeType);
						return !1;
					};
				}),
				target : function (t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id;
				},
				root : function (e) {
					return e === f;
				},
				focus : function (e) {
					return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
				},
				enabled : function (e) {
					return e.disabled === !1;
				},
				disabled : function (e) {
					return e.disabled === !0;
				},
				checked : function (e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !!e.checked || "option" === t && !!e.selected;
				},
				selected : function (e) {
					return e.parentNode && e.parentNode.selectedIndex,
					e.selected === !0;
				},
				empty : function (e) {
					for (e = e.firstChild; e; e = e.nextSibling) {
						if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) {
							return !1;
						}
					}
					return !0;
				},
				parent : function (e) {
					return !i.pseudos.empty(e);
				},
				header : function (e) {
					return Q.test(e.nodeName);
				},
				input : function (e) {
					return G.test(e.nodeName);
				},
				button : function (e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t;
				},
				text : function (e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
				},
				first : pt(function () {
					return [0];
				}),
				last : pt(function (e, t) {
					return [t - 1];
				}),
				eq : pt(function (e, t, n) {
					return [0 > n ? n + t : n];
				}),
				even : pt(function (e, t) {
					var n = 0;
					for (; t > n; n += 2) {
						e.push(n);
					}
					return e;
				}),
				odd : pt(function (e, t) {
					var n = 1;
					for (; t > n; n += 2) {
						e.push(n);
					}
					return e;
				}),
				lt : pt(function (e, t, n) {
					var r = 0 > n ? n + t : n;
					for (; --r >= 0; ) {
						e.push(r);
					}
					return e;
				}),
				gt : pt(function (e, t, n) {
					var r = 0 > n ? n + t : n;
					for (; t > ++r; ) {
						e.push(r);
					}
					return e;
				})
			}
		};
		for (n in {
			radio : !0,
			checkbox : !0,
			file : !0,
			password : !0,
			image : !0
		}) {
			i.pseudos[n] = lt(n);
		}
		for (n in {
			submit : !0,
			reset : !0
		}) {
			i.pseudos[n] = ct(n);
		}
		function ft(e, t) {
			var n,
			r,
			o,
			a,
			s,
			u,
			l,
			c = E[e + " "];
			if (c) {
				return t ? 0 : c.slice(0);
			}
			s = e,
			u = [],
			l = i.preFilter;
			while (s) {
				(!n || (r = $.exec(s))) && (r && (s = s.slice(r[0].length) || s), u.push(o = [])),
				n = !1,
				(r = I.exec(s)) && (n = r.shift(), o.push({
						value : n,
						type : r[0].replace(W, " ")
					}), s = s.slice(n.length));
				for (a in i.filter) {
					!(r = U[a].exec(s)) || l[a] && !(r = l[a](r)) || (n = r.shift(), o.push({
							value : n,
							type : a,
							matches : r
						}), s = s.slice(n.length));
				}
				if (!n) {
					break;
				}
			}
			return t ? s.length : s ? st.error(e) : E(e, u).slice(0);
		}
		function dt(e) {
			var t = 0,
			n = e.length,
			r = "";
			for (; n > t; t++) {
				r += e[t].value;
			}
			return r;
		}
		function ht(e, t, n) {
			var i = t.dir,
			o = n && "parentNode" === i,
			a = C++;
			return t.first ? function (t, n, r) {
				while (t = t[i]) {
					if (1 === t.nodeType || o) {
						return e(t, n, r);
					}
				}
			}
			 : function (t, n, s) {
				var u,
				l,
				c,
				p = N + " " + a;
				if (s) {
					while (t = t[i]) {
						if ((1 === t.nodeType || o) && e(t, n, s)) {
							return !0;
						}
					}
				} else {
					while (t = t[i]) {
						if (1 === t.nodeType || o) {
							if (c = t[x] || (t[x] = {}), (l = c[i]) && l[0] === p) {
								if ((u = l[1]) === !0 || u === r) {
									return u === !0;
								}
							} else {
								if (l = c[i] = [p], l[1] = e(t, n, s) || r, l[1] === !0) {
									return !0;
								}
							}
						}
					}
				}
			};
		}
		function gt(e) {
			return e.length > 1 ? function (t, n, r) {
				var i = e.length;
				while (i--) {
					if (!e[i](t, n, r)) {
						return !1;
					}
				}
				return !0;
			}
			 : e[0];
		}
		function mt(e, t, n, r, i) {
			var o,
			a = [],
			s = 0,
			u = e.length,
			l = null != t;
			for (; u > s; s++) {
				(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
			}
			return a;
		}
		function yt(e, t, n, r, i, o) {
			return r && !r[x] && (r = yt(r)),
			i && !i[x] && (i = yt(i, o)),
			ot(function (o, a, s, u) {
				var l,
				c,
				p,
				f = [],
				d = [],
				h = a.length,
				g = o || xt(t || "*", s.nodeType ? [s] : s, []),
				m = !e || !o && t ? g : mt(g, f, e, s, u),
				y = n ? i || (o ? e : h || r) ? [] : a : m;
				if (n && n(m, y, s, u), r) {
					l = mt(y, d),
					r(l, [], s, u),
					c = l.length;
					while (c--) {
						(p = l[c]) && (y[d[c]] = !(m[d[c]] = p));
					}
				}
				if (o) {
					if (i || e) {
						if (i) {
							l = [],
							c = y.length;
							while (c--) {
								(p = y[c]) && l.push(m[c] = p);
							}
							i(null, y = [], l, u);
						}
						c = y.length;
						while (c--) {
							(p = y[c]) && (l = i ? M.call(o, p) : f[c]) > -1 && (o[l] = !(a[l] = p));
						}
					}
				} else {
					y = mt(y === a ? y.splice(h, y.length) : y),
					i ? i(null, a, y, u) : H.apply(a, y);
				}
			});
		}
		function vt(e) {
			var t,
			n,
			r,
			o = e.length,
			a = i.relative[e[0].type],
			s = a || i.relative[" "],
			u = a ? 1 : 0,
			c = ht(function (e) {
					return e === t;
				}, s, !0),
			p = ht(function (e) {
					return M.call(t, e) > -1;
				}, s, !0),
			f = [function (e, n, r) {
					return !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r));
				}
			];
			for (; o > u; u++) {
				if (n = i.relative[e[u].type]) {
					f = [ht(gt(f), n)];
				} else {
					if (n = i.filter[e[u].type].apply(null, e[u].matches), n[x]) {
						for (r = ++u; o > r; r++) {
							if (i.relative[e[r].type]) {
								break;
							}
						}
						return yt(u > 1 && gt(f), u > 1 && dt(e.slice(0, u - 1)).replace(W, "$1"), n, r > u && vt(e.slice(u, r)), o > r && vt(e = e.slice(r)), o > r && dt(e));
					}
					f.push(n);
				}
			}
			return gt(f);
		}
		function bt(e, t) {
			var n = 0,
			o = t.length > 0,
			a = e.length > 0,
			s = function (s, u, c, f, d) {
				var h,
				g,
				m,
				y = [],
				v = 0,
				b = "0",
				x = s && [],
				w = null != d,
				T = l,
				C = s || a && i.find.TAG("*", d && u.parentNode || u),
				k = N += null == T ? 1 : Math.random() || 0.1;
				for (w && (l = u !== p && u, r = n); null != (h = C[b]); b++) {
					if (a && h) {
						g = 0;
						while (m = e[g++]) {
							if (m(h, u, c)) {
								f.push(h);
								break;
							}
						}
						w && (N = k, r = ++n);
					}
					o && ((h = !m && h) && v--, s && x.push(h));
				}
				if (v += b, o && b !== v) {
					g = 0;
					while (m = t[g++]) {
						m(x, y, u, c);
					}
					if (s) {
						if (v > 0) {
							while (b--) {
								x[b] || y[b] || (y[b] = L.call(f));
							}
						}
						y = mt(y);
					}
					H.apply(f, y),
					w && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(f);
				}
				return w && (N = k, l = T),
				x;
			};
			return o ? ot(s) : s;
		}
		s = st.compile = function (e, t) {
			var n,
			r = [],
			i = [],
			o = S[e + " "];
			if (!o) {
				t || (t = ft(e)),
				n = t.length;
				while (n--) {
					o = vt(t[n]),
					o[x] ? r.push(o) : i.push(o);
				}
				o = S(e, bt(i, r));
			}
			return o;
		};
		function xt(e, t, n) {
			var r = 0,
			i = t.length;
			for (; i > r; r++) {
				st(e, t[r], n);
			}
			return n;
		}
		function wt(e, t, n, r) {
			var o,
			a,
			u,
			l,
			c,
			p = ft(e);
			if (!r && 1 === p.length) {
				if (a = p[0] = p[0].slice(0), a.length > 2 && "ID" === (u = a[0]).type && 9 === t.nodeType && !d && i.relative[a[1].type]) {
					if (t = i.find.ID(u.matches[0].replace(et, tt), t)[0], !t) {
						return n;
					}
					e = e.slice(a.shift().value.length);
				}
				o = U.needsContext.test(e) ? 0 : a.length;
				while (o--) {
					if (u = a[o], i.relative[l = u.type]) {
						break;
					}
					if ((c = i.find[l]) && (r = c(u.matches[0].replace(et, tt), V.test(a[0].type) && t.parentNode || t))) {
						if (a.splice(o, 1), e = r.length && dt(a), !e) {
							return H.apply(n, q.call(r, 0)),
							n;
						}
						break;
					}
				}
			}
			return s(e, p)(r, t, d, n, V.test(e)),
			n;
		}
		i.pseudos.nth = i.pseudos.eq;
		function Tt() {}

		i.filters = Tt.prototype = i.pseudos,
		i.setFilters = new Tt,
		c(),
		st.attr = b.attr,
		b.find = st,
		b.expr = st.selectors,
		b.expr[":"] = b.expr.pseudos,
		b.unique = st.uniqueSort,
		b.text = st.getText,
		b.isXMLDoc = st.isXML,
		b.contains = st.contains;
	}
	(e);
	var at = /Until$/,
	st = /^(?:parents|prev(?:Until|All))/,
	ut = /^.[^:#\[\.,]*$/,
	lt = b.expr.match.needsContext,
	ct = {
		children : !0,
		contents : !0,
		next : !0,
		prev : !0
	};
	b.fn.extend({
		find : function (e) {
			var t,
			n,
			r,
			i = this.length;
			if ("string" != typeof e) {
				return r = this,
				this.pushStack(b(e).filter(function () {
						for (t = 0; i > t; t++) {
							if (b.contains(r[t], this)) {
								return !0;
							}
						}
					}));
			}
			for (n = [], t = 0; i > t; t++) {
				b.find(e, this[t], n);
			}
			return n = this.pushStack(i > 1 ? b.unique(n) : n),
			n.selector = (this.selector ? this.selector + " " : "") + e,
			n;
		},
		has : function (e) {
			var t,
			n = b(e, this),
			r = n.length;
			return this.filter(function () {
				for (t = 0; r > t; t++) {
					if (b.contains(this, n[t])) {
						return !0;
					}
				}
			});
		},
		not : function (e) {
			return this.pushStack(ft(this, e, !1));
		},
		filter : function (e) {
			return this.pushStack(ft(this, e, !0));
		},
		is : function (e) {
			return !!e && ("string" == typeof e ? lt.test(e) ? b(e, this.context).index(this[0]) >= 0 : b.filter(e, this).length > 0 : this.filter(e).length > 0);
		},
		closest : function (e, t) {
			var n,
			r = 0,
			i = this.length,
			o = [],
			a = lt.test(e) || "string" != typeof e ? b(e, t || this.context) : 0;
			for (; i > r; r++) {
				n = this[r];
				while (n && n.ownerDocument && n !== t && 11 !== n.nodeType) {
					if (a ? a.index(n) > -1 : b.find.matchesSelector(n, e)) {
						o.push(n);
						break;
					}
					n = n.parentNode;
				}
			}
			return this.pushStack(o.length > 1 ? b.unique(o) : o);
		},
		index : function (e) {
			return e ? "string" == typeof e ? b.inArray(this[0], b(e)) : b.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
		},
		add : function (e, t) {
			var n = "string" == typeof e ? b(e, t) : b.makeArray(e && e.nodeType ? [e] : e),
			r = b.merge(this.get(), n);
			return this.pushStack(b.unique(r));
		},
		addBack : function (e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
		}
	}),
	b.fn.andSelf = b.fn.addBack;
	function pt(e, t) {
		do {
			e = e[t];
		} while (e && 1 !== e.nodeType);
		return e;
	}
	b.each({
		parent : function (e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null;
		},
		parents : function (e) {
			return b.dir(e, "parentNode");
		},
		parentsUntil : function (e, t, n) {
			return b.dir(e, "parentNode", n);
		},
		next : function (e) {
			return pt(e, "nextSibling");
		},
		prev : function (e) {
			return pt(e, "previousSibling");
		},
		nextAll : function (e) {
			return b.dir(e, "nextSibling");
		},
		prevAll : function (e) {
			return b.dir(e, "previousSibling");
		},
		nextUntil : function (e, t, n) {
			return b.dir(e, "nextSibling", n);
		},
		prevUntil : function (e, t, n) {
			return b.dir(e, "previousSibling", n);
		},
		siblings : function (e) {
			return b.sibling((e.parentNode || {}).firstChild, e);
		},
		children : function (e) {
			return b.sibling(e.firstChild);
		},
		contents : function (e) {
			return b.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : b.merge([], e.childNodes);
		}
	}, function (e, t) {
		b.fn[e] = function (n, r) {
			var i = b.map(this, t, n);
			return at.test(e) || (r = n),
			r && "string" == typeof r && (i = b.filter(r, i)),
			i = this.length > 1 && !ct[e] ? b.unique(i) : i,
			this.length > 1 && st.test(e) && (i = i.reverse()),
			this.pushStack(i);
		};
	}),
	b.extend({
		filter : function (e, t, n) {
			return n && (e = ":not(" + e + ")"),
			1 === t.length ? b.find.matchesSelector(t[0], e) ? [t[0]] : [] : b.find.matches(e, t);
		},
		dir : function (e, n, r) {
			var i = [],
			o = e[n];
			while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !b(o).is(r))) {
				1 === o.nodeType && i.push(o),
				o = o[n];
			}
			return i;
		},
		sibling : function (e, t) {
			var n = [];
			for (; e; e = e.nextSibling) {
				1 === e.nodeType && e !== t && n.push(e);
			}
			return n;
		}
	});
	function ft(e, t, n) {
		if (t = t || 0, b.isFunction(t)) {
			return b.grep(e, function (e, r) {
				var i = !!t.call(e, r, e);
				return i === n;
			});
		}
		if (t.nodeType) {
			return b.grep(e, function (e) {
				return e === t === n;
			});
		}
		if ("string" == typeof t) {
			var r = b.grep(e, function (e) {
					return 1 === e.nodeType;
				});
			if (ut.test(t)) {
				return b.filter(t, r, !n);
			}
			t = b.filter(t, r);
		}
		return b.grep(e, function (e) {
			return b.inArray(e, t) >= 0 === n;
		});
	}
	function dt(e) {
		var t = ht.split("|"),
		n = e.createDocumentFragment();
		if (n.createElement) {
			while (t.length) {
				n.createElement(t.pop());
			}
		}
		return n;
	}
	var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	gt = / jQuery\d+="(?:null|\d+)"/g,
	mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"),
	yt = /^\s+/,
	vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	bt = /<([\w:]+)/,
	xt = /<tbody/i,
	wt = /<|&#?\w+;/,
	Tt = /<(?:script|style|link)/i,
	Nt = /^(?:checkbox|radio)$/i,
	Ct = /checked\s*(?:[^=]|=\s*.checked.)/i,
	kt = /^$|\/(?:java|ecma)script/i,
	Et = /^true\/(.*)/,
	St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	At = {
		option : [1, "<select multiple='multiple'>", "</select>"],
		legend : [1, "<fieldset>", "</fieldset>"],
		area : [1, "<map>", "</map>"],
		param : [1, "<object>", "</object>"],
		thead : [1, "<table>", "</table>"],
		tr : [2, "<table><tbody>", "</tbody></table>"],
		col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default : b.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	},
	jt = dt(o),
	Dt = jt.appendChild(o.createElement("div"));
	At.optgroup = At.option,
	At.tbody = At.tfoot = At.colgroup = At.caption = At.thead,
	At.th = At.td,
	b.fn.extend({
		text : function (e) {
			return b.access(this, function (e) {
				return e === t ? b.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e));
			}, null, e, arguments.length);
		},
		wrapAll : function (e) {
			if (b.isFunction(e)) {
				return this.each(function (t) {
					b(this).wrapAll(e.call(this, t));
				});
			}
			if (this[0]) {
				var t = b(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]),
				t.map(function () {
					var e = this;
					while (e.firstChild && 1 === e.firstChild.nodeType) {
						e = e.firstChild;
					}
					return e;
				}).append(this);
			}
			return this;
		},
		wrapInner : function (e) {
			return b.isFunction(e) ? this.each(function (t) {
				b(this).wrapInner(e.call(this, t));
			}) : this.each(function () {
				var t = b(this),
				n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e);
			});
		},
		wrap : function (e) {
			var t = b.isFunction(e);
			return this.each(function (n) {
				b(this).wrapAll(t ? e.call(this, n) : e);
			});
		},
		unwrap : function () {
			return this.parent().each(function () {
				b.nodeName(this, "body") || b(this).replaceWith(this.childNodes);
			}).end();
		},
		append : function () {
			return this.domManip(arguments, !0, function (e) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e);
			});
		},
		prepend : function () {
			return this.domManip(arguments, !0, function (e) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild);
			});
		},
		before : function () {
			return this.domManip(arguments, !1, function (e) {
				this.parentNode && this.parentNode.insertBefore(e, this);
			});
		},
		after : function () {
			return this.domManip(arguments, !1, function (e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
			});
		},
		remove : function (e, t) {
			var n,
			r = 0;
			for (; null != (n = this[r]); r++) {
				(!e || b.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || b.cleanData(Ot(n)), n.parentNode && (t && b.contains(n.ownerDocument, n) && Mt(Ot(n, "script")), n.parentNode.removeChild(n)));
			}
			return this;
		},
		empty : function () {
			var e,
			t = 0;
			for (; null != (e = this[t]); t++) {
				1 === e.nodeType && b.cleanData(Ot(e, !1));
				while (e.firstChild) {
					e.removeChild(e.firstChild);
				}
				e.options && b.nodeName(e, "select") && (e.options.length = 0);
			}
			return this;
		},
		clone : function (e, t) {
			return e = null == e ? !1 : e,
			t = null == t ? e : t,
			this.map(function () {
				return b.clone(this, e, t);
			});
		},
		html : function (e) {
			return b.access(this, function (e) {
				var n = this[0] || {},
				r = 0,
				i = this.length;
				if (e === t) {
					return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t;
				}
				if (!("string" != typeof e || Tt.test(e) || !b.support.htmlSerialize && mt.test(e) || !b.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(vt, "<$1></$2>");
					try {
						for (; i > r; r++) {
							n = this[r] || {},
							1 === n.nodeType && (b.cleanData(Ot(n, !1)), n.innerHTML = e);
						}
						n = 0;
					} catch (o) {}

				}
				n && this.empty().append(e);
			}, null, e, arguments.length);
		},
		replaceWith : function (e) {
			var t = b.isFunction(e);
			return t || "string" == typeof e || (e = b(e).not(this).detach()),
			this.domManip([e], !0, function (e) {
				var t = this.nextSibling,
				n = this.parentNode;
				n && (b(this).remove(), n.insertBefore(e, t));
			});
		},
		detach : function (e) {
			return this.remove(e, !0);
		},
		domManip : function (e, n, r) {
			e = f.apply([], e);
			var i,
			o,
			a,
			s,
			u,
			l,
			c = 0,
			p = this.length,
			d = this,
			h = p - 1,
			g = e[0],
			m = b.isFunction(g);
			if (m || !(1 >= p || "string" != typeof g || b.support.checkClone) && Ct.test(g)) {
				return this.each(function (i) {
					var o = d.eq(i);
					m && (e[0] = g.call(this, i, n ? o.html() : t)),
					o.domManip(e, n, r);
				});
			}
			if (p && (l = b.buildFragment(e, this[0].ownerDocument, !1, this), i = l.firstChild, 1 === l.childNodes.length && (l = i), i)) {
				for (n = n && b.nodeName(i, "tr"), s = b.map(Ot(l, "script"), Ht), a = s.length; p > c; c++) {
					o = l,
					c !== h && (o = b.clone(o, !0, !0), a && b.merge(s, Ot(o, "script"))),
					r.call(n && b.nodeName(this[c], "table") ? Lt(this[c], "tbody") : this[c], o, c);
				}
				if (a) {
					for (u = s[s.length - 1].ownerDocument, b.map(s, qt), c = 0; a > c; c++) {
						o = s[c],
						kt.test(o.type || "") && !b._data(o, "globalEval") && b.contains(u, o) && (o.src ? b.ajax({
								url : o.src,
								type : "GET",
								dataType : "script",
								async : !1,
								global : !1,
								"throws" : !0
							}) : b.globalEval((o.text || o.textContent || o.innerHTML || "").replace(St, "")));
					}
				}
				l = i = null;
			}
			return this;
		}
	});
	function Lt(e, t) {
		return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t));
	}
	function Ht(e) {
		var t = e.getAttributeNode("type");
		return e.type = (t && t.specified) + "/" + e.type,
		e;
	}
	function qt(e) {
		var t = Et.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"),
		e;
	}
	function Mt(e, t) {
		var n,
		r = 0;
		for (; null != (n = e[r]); r++) {
			b._data(n, "globalEval", !t || b._data(t[r], "globalEval"));
		}
	}
	function _t(e, t) {
		if (1 === t.nodeType && b.hasData(e)) {
			var n,
			r,
			i,
			o = b._data(e),
			a = b._data(t, o),
			s = o.events;
			if (s) {
				delete a.handle,
				a.events = {};
				for (n in s) {
					for (r = 0, i = s[n].length; i > r; r++) {
						b.event.add(t, n, s[n][r]);
					}
				}
			}
			a.data && (a.data = b.extend({}, a.data));
		}
	}
	function Ft(e, t) {
		var n,
		r,
		i;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !b.support.noCloneEvent && t[b.expando]) {
				i = b._data(t);
				for (r in i.events) {
					b.removeEvent(t, r, i.handle);
				}
				t.removeAttribute(b.expando);
			}
			"script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), b.support.html5Clone && e.innerHTML && !b.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Nt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
		}
	}
	b.each({
		appendTo : "append",
		prependTo : "prepend",
		insertBefore : "before",
		insertAfter : "after",
		replaceAll : "replaceWith"
	}, function (e, t) {
		b.fn[e] = function (e) {
			var n,
			r = 0,
			i = [],
			o = b(e),
			a = o.length - 1;
			for (; a >= r; r++) {
				n = r === a ? this : this.clone(!0),
				b(o[r])[t](n),
				d.apply(i, n.get());
			}
			return this.pushStack(i);
		};
	});
	function Ot(e, n) {
		var r,
		o,
		a = 0,
		s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
		if (!s) {
			for (s = [], r = e.childNodes || e; null != (o = r[a]); a++) {
				!n || b.nodeName(o, n) ? s.push(o) : b.merge(s, Ot(o, n));
			}
		}
		return n === t || n && b.nodeName(e, n) ? b.merge([e], s) : s;
	}
	function Bt(e) {
		Nt.test(e.type) && (e.defaultChecked = e.checked);
	}
	b.extend({
		clone : function (e, t, n) {
			var r,
			i,
			o,
			a,
			s,
			u = b.contains(e.ownerDocument, e);
			if (b.support.html5Clone || b.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(b.support.noCloneEvent && b.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || b.isXMLDoc(e))) {
				for (r = Ot(o), s = Ot(e), a = 0;
					null != (i = s[a]); ++a) {
					r[a] && Ft(i, r[a]);
				}
			}
			if (t) {
				if (n) {
					for (s = s || Ot(e), r = r || Ot(o), a = 0; null != (i = s[a]); a++) {
						_t(i, r[a]);
					}
				} else {
					_t(e, o);
				}
			}
			return r = Ot(o, "script"),
			r.length > 0 && Mt(r, !u && Ot(e, "script")),
			r = s = i = null,
			o;
		},
		buildFragment : function (e, t, n, r) {
			var i,
			o,
			a,
			s,
			u,
			l,
			c,
			p = e.length,
			f = dt(t),
			d = [],
			h = 0;
			for (; p > h; h++) {
				if (o = e[h], o || 0 === o) {
					if ("object" === b.type(o)) {
						b.merge(d, o.nodeType ? [o] : o);
					} else {
						if (wt.test(o)) {
							s = s || f.appendChild(t.createElement("div")),
							u = (bt.exec(o) || ["", ""])[1].toLowerCase(),
							c = At[u] || At._default,
							s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2],
							i = c[0];
							while (i--) {
								s = s.lastChild;
							}
							if (!b.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !b.support.tbody) {
								o = "table" !== u || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild,
								i = o && o.childNodes.length;
								while (i--) {
									b.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
								}
							}
							b.merge(d, s.childNodes),
							s.textContent = "";
							while (s.firstChild) {
								s.removeChild(s.firstChild);
							}
							s = f.lastChild;
						} else {
							d.push(t.createTextNode(o));
						}
					}
				}
			}
			s && f.removeChild(s),
			b.support.appendChecked || b.grep(Ot(d, "input"), Bt),
			h = 0;
			while (o = d[h++]) {
				if ((!r || -1 === b.inArray(o, r)) && (a = b.contains(o.ownerDocument, o), s = Ot(f.appendChild(o), "script"), a && Mt(s), n)) {
					i = 0;
					while (o = s[i++]) {
						kt.test(o.type || "") && n.push(o);
					}
				}
			}
			return s = null,
			f;
		},
		cleanData : function (e, t) {
			var n,
			r,
			o,
			a,
			s = 0,
			u = b.expando,
			l = b.cache,
			p = b.support.deleteExpando,
			f = b.event.special;
			for (; null != (n = e[s]); s++) {
				if ((t || b.acceptData(n)) && (o = n[u], a = o && l[o])) {
					if (a.events) {
						for (r in a.events) {
							f[r] ? b.event.remove(n, r) : b.removeEvent(n, r, a.handle);
						}
					}
					l[o] && (delete l[o], p ? delete n[u] : typeof n.removeAttribute !== i ? n.removeAttribute(u) : n[u] = null, c.push(o));
				}
			}
		}
	});
	var Pt,
	Rt,
	Wt,
	$t = /alpha\([^)]*\)/i,
	It = /opacity\s*=\s*([^)]*)/,
	zt = /^(top|right|bottom|left)$/,
	Xt = /^(none|table(?!-c[ea]).+)/,
	Ut = /^margin/,
	Vt = RegExp("^(" + x + ")(.*)$", "i"),
	Yt = RegExp("^(" + x + ")(?!px)[a-z%]+$", "i"),
	Jt = RegExp("^([+-])=(" + x + ")", "i"),
	Gt = {
		BODY : "block"
	},
	Qt = {
		position : "absolute",
		visibility : "hidden",
		display : "block"
	},
	Kt = {
		letterSpacing : 0,
		fontWeight : 400
	},
	Zt = ["Top", "Right", "Bottom", "Left"],
	en = ["Webkit", "O", "Moz", "ms"];
	function tn(e, t) {
		if (t in e) {
			return t;
		}
		var n = t.charAt(0).toUpperCase() + t.slice(1),
		r = t,
		i = en.length;
		while (i--) {
			if (t = en[i] + n, t in e) {
				return t;
			}
		}
		return r;
	}
	function nn(e, t) {
		return e = t || e,
		"none" === b.css(e, "display") || !b.contains(e.ownerDocument, e);
	}
	function rn(e, t) {
		var n,
		r,
		i,
		o = [],
		a = 0,
		s = e.length;
		for (; s > a; a++) {
			r = e[a],
			r.style && (o[a] = b._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = b._data(r, "olddisplay", un(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && b._data(r, "olddisplay", i ? n : b.css(r, "display"))));
		}
		for (a = 0; s > a; a++) {
			r = e[a],
			r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
		}
		return e;
	}
	b.fn.extend({
		css : function (e, n) {
			return b.access(this, function (e, n, r) {
				var i,
				o,
				a = {},
				s = 0;
				if (b.isArray(n)) {
					for (o = Rt(e), i = n.length; i > s; s++) {
						a[n[s]] = b.css(e, n[s], !1, o);
					}
					return a;
				}
				return r !== t ? b.style(e, n, r) : b.css(e, n);
			}, e, n, arguments.length > 1);
		},
		show : function () {
			return rn(this, !0);
		},
		hide : function () {
			return rn(this);
		},
		toggle : function (e) {
			var t = "boolean" == typeof e;
			return this.each(function () {
				(t ? e : nn(this)) ? b(this).show() : b(this).hide();
			});
		}
	}),
	b.extend({
		cssHooks : {
			opacity : {
				get : function (e, t) {
					if (t) {
						var n = Wt(e, "opacity");
						return "" === n ? "1" : n;
					}
				}
			}
		},
		cssNumber : {
			columnCount : !0,
			fillOpacity : !0,
			fontWeight : !0,
			lineHeight : !0,
			opacity : !0,
			orphans : !0,
			widows : !0,
			zIndex : !0,
			zoom : !0
		},
		cssProps : {
			"float" : b.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style : function (e, n, r, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o,
				a,
				s,
				u = b.camelCase(n),
				l = e.style;
				if (n = b.cssProps[u] || (b.cssProps[u] = tn(l, u)), s = b.cssHooks[n] || b.cssHooks[u], r === t) {
					return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
				}
				if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(b.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || b.cssNumber[u] || (r += "px"), b.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) {
					try {
						l[n] = r;
					} catch (c) {}

				}
			}
		},
		css : function (e, n, r, i) {
			var o,
			a,
			s,
			u = b.camelCase(n);
			return n = b.cssProps[u] || (b.cssProps[u] = tn(e.style, u)),
			s = b.cssHooks[n] || b.cssHooks[u],
			s && "get" in s && (a = s.get(e, !0, r)),
			a === t && (a = Wt(e, n, i)),
			"normal" === a && n in Kt && (a = Kt[n]),
			"" === r || r ? (o = parseFloat(a), r === !0 || b.isNumeric(o) ? o || 0 : a) : a;
		},
		swap : function (e, t, n, r) {
			var i,
			o,
			a = {};
			for (o in t) {
				a[o] = e.style[o],
				e.style[o] = t[o];
			}
			i = n.apply(e, r || []);
			for (o in t) {
				e.style[o] = a[o];
			}
			return i;
		}
	}),
	e.getComputedStyle ? (Rt = function (t) {
		return e.getComputedStyle(t, null);
	}, Wt = function (e, n, r) {
		var i,
		o,
		a,
		s = r || Rt(e),
		u = s ? s.getPropertyValue(n) || s[n] : t,
		l = e.style;
		return s && ("" !== u || b.contains(e.ownerDocument, e) || (u = b.style(e, n)), Yt.test(u) && Ut.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)),
		u;
	}) : o.documentElement.currentStyle && (Rt = function (e) {
		return e.currentStyle;
	}, Wt = function (e, n, r) {
		var i,
		o,
		a,
		s = r || Rt(e),
		u = s ? s[n] : t,
		l = e.style;
		return null == u && l && l[n] && (u = l[n]),
		Yt.test(u) && !zt.test(n) && (i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)),
		"" === u ? "auto" : u;
	});
	function on(e, t, n) {
		var r = Vt.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
	}
	function an(e, t, n, r, i) {
		var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
		a = 0;
		for (; 4 > o; o += 2) {
			"margin" === n && (a += b.css(e, n + Zt[o], !0, i)),
			r ? ("content" === n && (a -= b.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= b.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += b.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += b.css(e, "border" + Zt[o] + "Width", !0, i)));
		}
		return a;
	}
	function sn(e, t, n) {
		var r = !0,
		i = "width" === t ? e.offsetWidth : e.offsetHeight,
		o = Rt(e),
		a = b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, o);
		if (0 >= i || null == i) {
			if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) {
				return i;
			}
			r = a && (b.support.boxSizingReliable || i === e.style[t]),
			i = parseFloat(i) || 0;
		}
		return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px";
	}
	function un(e) {
		var t = o,
		n = Gt[e];
		return n || (n = ln(e, t), "none" !== n && n || (Pt = (Pt || b("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = ln(e, t), Pt.detach()), Gt[e] = n),
		n;
	}
	function ln(e, t) {
		var n = b(t.createElement(e)).appendTo(t.body),
		r = b.css(n[0], "display");
		return n.remove(),
		r;
	}
	b.each(["height", "width"], function (e, n) {
		b.cssHooks[n] = {
			get : function (e, r, i) {
				return r ? 0 === e.offsetWidth && Xt.test(b.css(e, "display")) ? b.swap(e, Qt, function () {
					return sn(e, n, i);
				}) : sn(e, n, i) : t;
			},
			set : function (e, t, r) {
				var i = r && Rt(e);
				return on(e, t, r ? an(e, n, r, b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, i), i) : 0);
			}
		};
	}),
	b.support.opacity || (b.cssHooks.opacity = {
			get : function (e, t) {
				return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
			},
			set : function (e, t) {
				var n = e.style,
				r = e.currentStyle,
				i = b.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				o = r && r.filter || n.filter || "";
				n.zoom = 1,
				(t >= 1 || "" === t) && "" === b.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i);
			}
		}),
	b(function () {
		b.support.reliableMarginRight || (b.cssHooks.marginRight = {
				get : function (e, n) {
					return n ? b.swap(e, {
						display : "inline-block"
					}, Wt, [e, "marginRight"]) : t;
				}
			}),
		!b.support.pixelPosition && b.fn.position && b.each(["top", "left"], function (e, n) {
			b.cssHooks[n] = {
				get : function (e, r) {
					return r ? (r = Wt(e, n), Yt.test(r) ? b(e).position()[n] + "px" : r) : t;
				}
			};
		});
	}),
	b.expr && b.expr.filters && (b.expr.filters.hidden = function (e) {
		return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !b.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || b.css(e, "display"));
	}, b.expr.filters.visible = function (e) {
		return !b.expr.filters.hidden(e);
	}),
	b.each({
		margin : "",
		padding : "",
		border : "Width"
	}, function (e, t) {
		b.cssHooks[e + t] = {
			expand : function (n) {
				var r = 0,
				i = {},
				o = "string" == typeof n ? n.split(" ") : [n];
				for (; 4 > r; r++) {
					i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0];
				}
				return i;
			}
		},
		Ut.test(e) || (b.cssHooks[e + t].set = on);
	});
	var cn = /%20/g,
	pn = /\[\]$/,
	fn = /\r?\n/g,
	dn = /^(?:submit|button|image|reset|file)$/i,
	hn = /^(?:input|select|textarea|keygen)/i;
	b.fn.extend({
		serialize : function () {
			return b.param(this.serializeArray());
		},
		serializeArray : function () {
			return this.map(function () {
				var e = b.prop(this, "elements");
				return e ? b.makeArray(e) : this;
			}).filter(function () {
				var e = this.type;
				return this.name && !b(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Nt.test(e));
			}).map(function (e, t) {
				var n = b(this).val();
				return null == n ? null : b.isArray(n) ? b.map(n, function (e) {
					return {
						name : t.name,
						value : e.replace(fn, "\r\n")
					};
				}) : {
					name : t.name,
					value : n.replace(fn, "\r\n")
				};
			}).get();
		}
	}),
	b.param = function (e, n) {
		var r,
		i = [],
		o = function (e, t) {
			t = b.isFunction(t) ? t() : null == t ? "" : t,
			i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
		};
		if (n === t && (n = b.ajaxSettings && b.ajaxSettings.traditional), b.isArray(e) || e.jquery && !b.isPlainObject(e)) {
			b.each(e, function () {
				o(this.name, this.value);
			});
		} else {
			for (r in e) {
				gn(r, e[r], n, o);
			}
		}
		return i.join("&").replace(cn, "+");
	};
	function gn(e, t, n, r) {
		var i;
		if (b.isArray(t)) {
			b.each(t, function (t, i) {
				n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
			});
		} else {
			if (n || "object" !== b.type(t)) {
				r(e, t);
			} else {
				for (i in t) {
					gn(e + "[" + i + "]", t[i], n, r);
				}
			}
		}
	}
	b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
		b.fn[t] = function (e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
		};
	}),
	b.fn.hover = function (e, t) {
		return this.mouseenter(e).mouseleave(t || e);
	};
	var mn,
	yn,
	vn = b.now(),
	bn = /\?/,
	xn = /#.*$/,
	wn = /([?&])_=[^&]*/,
	Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
	Nn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	Cn = /^(?:GET|HEAD)$/,
	kn = /^\/\//,
	En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
	Sn = b.fn.load,
	An = {},
	jn = {},
	Dn = "*/".concat("*");
	try {
		yn = a.href;
	} catch (Ln) {
		yn = o.createElement("a"),
		yn.href = "",
		yn = yn.href;
	}
	mn = En.exec(yn.toLowerCase()) || [];
	function Hn(e) {
		return function (t, n) {
			"string" != typeof t && (n = t, t = "*");
			var r,
			i = 0,
			o = t.toLowerCase().match(w) || [];
			if (b.isFunction(n)) {
				while (r = o[i++]) {
					"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
				}
			}
		};
	}
	function qn(e, n, r, i) {
		var o = {},
		a = e === jn;
		function s(u) {
			var l;
			return o[u] = !0,
			b.each(e[u] || [], function (e, u) {
				var c = u(n, r, i);
				return "string" != typeof c || a || o[c] ? a ? !(l = c) : t : (n.dataTypes.unshift(c), s(c), !1);
			}),
			l;
		}
		return s(n.dataTypes[0]) || !o["*"] && s("*");
	}
	function Mn(e, n) {
		var r,
		i,
		o = b.ajaxSettings.flatOptions || {};
		for (i in n) {
			n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
		}
		return r && b.extend(!0, e, r),
		e;
	}
	b.fn.load = function (e, n, r) {
		if ("string" != typeof e && Sn) {
			return Sn.apply(this, arguments);
		}
		var i,
		o,
		a,
		s = this,
		u = e.indexOf(" ");
		return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)),
		b.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"),
		s.length > 0 && b.ajax({
			url : e,
			type : a,
			dataType : "html",
			data : n
		}).done(function (e) {
			o = arguments,
			s.html(i ? b("<div>").append(b.parseHTML(e)).find(i) : e);
		}).complete(r && function (e, t) {
			s.each(r, o || [e.responseText, t, e]);
		}),
		this;
	},
	b.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
		b.fn[t] = function (e) {
			return this.on(t, e);
		};
	}),
	b.each(["get", "post"], function (e, n) {
		b[n] = function (e, r, i, o) {
			return b.isFunction(r) && (o = o || i, i = r, r = t),
			b.ajax({
				url : e,
				type : n,
				dataType : o,
				data : r,
				success : i
			});
		};
	}),
	b.extend({
		active : 0,
		lastModified : {},
		etag : {},
		ajaxSettings : {
			url : yn,
			type : "GET",
			isLocal : Nn.test(mn[1]),
			global : !0,
			processData : !0,
			async : !0,
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			accepts : {
				"*" : Dn,
				text : "text/plain",
				html : "text/html",
				xml : "application/xml, text/xml",
				json : "application/json, text/javascript"
			},
			contents : {
				xml : /xml/,
				html : /html/,
				json : /json/
			},
			responseFields : {
				xml : "responseXML",
				text : "responseText"
			},
			converters : {
				"* text" : e.String,
				"text html" : !0,
				"text json" : b.parseJSON,
				"text xml" : b.parseXML
			},
			flatOptions : {
				url : !0,
				context : !0
			}
		},
		ajaxSetup : function (e, t) {
			return t ? Mn(Mn(e, b.ajaxSettings), t) : Mn(b.ajaxSettings, e);
		},
		ajaxPrefilter : Hn(An),
		ajaxTransport : Hn(jn),
		ajax : function (e, n) {
			"object" == typeof e && (n = e, e = t),
			n = n || {};
			var r,
			i,
			o,
			a,
			s,
			u,
			l,
			c,
			p = b.ajaxSetup({}, n),
			f = p.context || p,
			d = p.context && (f.nodeType || f.jquery) ? b(f) : b.event,
			h = b.Deferred(),
			g = b.Callbacks("once memory"),
			m = p.statusCode || {},
			y = {},
			v = {},
			x = 0,
			T = "canceled",
			N = {
				readyState : 0,
				getResponseHeader : function (e) {
					var t;
					if (2 === x) {
						if (!c) {
							c = {};
							while (t = Tn.exec(a)) {
								c[t[1].toLowerCase()] = t[2];
							}
						}
						t = c[e.toLowerCase()];
					}
					return null == t ? null : t;
				},
				getAllResponseHeaders : function () {
					return 2 === x ? a : null;
				},
				setRequestHeader : function (e, t) {
					var n = e.toLowerCase();
					return x || (e = v[n] = v[n] || e, y[e] = t),
					this;
				},
				overrideMimeType : function (e) {
					return x || (p.mimeType = e),
					this;
				},
				statusCode : function (e) {
					var t;
					if (e) {
						if (2 > x) {
							for (t in e) {
								m[t] = [m[t], e[t]];
							}
						} else {
							N.always(e[N.status]);
						}
					}
					return this;
				},
				abort : function (e) {
					var t = e || T;
					return l && l.abort(t),
					k(0, t),
					this;
				}
			};
			if (h.promise(N).complete = g.add, N.success = N.done, N.error = N.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = b.trim(p.dataType || "*").toLowerCase().match(w) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (mn[3] || ("http:" === mn[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = b.param(p.data, p.traditional)), qn(An, p, n, N), 2 === x) {
				return N;
			}
			u = p.global,
			u && 0 === b.active++ && b.event.trigger("ajaxStart"),
			p.type = p.type.toUpperCase(),
			p.hasContent = !Cn.test(p.type),
			o = p.url,
			p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)),
			p.ifModified && (b.lastModified[o] && N.setRequestHeader("If-Modified-Since", b.lastModified[o]), b.etag[o] && N.setRequestHeader("If-None-Match", b.etag[o])),
			(p.data && p.hasContent && p.contentType !== !1 || n.contentType) && N.setRequestHeader("Content-Type", p.contentType),
			N.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]);
			for (i in p.headers) {
				N.setRequestHeader(i, p.headers[i]);
			}
			if (p.beforeSend && (p.beforeSend.call(f, N, p) === !1 || 2 === x)) {
				return N.abort();
			}
			T = "abort";
			for (i in {
				success : 1,
				error : 1,
				complete : 1
			}) {
				N[i](p[i]);
			}
			if (l = qn(jn, p, n, N)) {
				N.readyState = 1,
				u && d.trigger("ajaxSend", [N, p]),
				p.async && p.timeout > 0 && (s = setTimeout(function () {
							N.abort("timeout");
						}, p.timeout));
				try {
					x = 1,
					l.send(y, k);
				} catch (C) {
					if (!(2 > x)) {
						throw C;
					}
					k(-1, C);
				}
			} else {
				k(-1, "No Transport");
			}
			function k(e, n, r, i) {
				var c,
				y,
				v,
				w,
				T,
				C = n;
				2 !== x && (x = 2, s && clearTimeout(s), l = t, a = i || "", N.readyState = e > 0 ? 4 : 0, r && (w = _n(p, N, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (T = N.getResponseHeader("Last-Modified"), T && (b.lastModified[o] = T), T = N.getResponseHeader("etag"), T && (b.etag[o] = T)), 204 === e ? (c = !0, C = "nocontent") : 304 === e ? (c = !0, C = "notmodified") : (c = Fn(p, w), C = c.state, y = c.data, v = c.error, c = !v)) : (v = C, (e || !C) && (C = "error", 0 > e && (e = 0))), N.status = e, N.statusText = (n || C) + "", c ? h.resolveWith(f, [y, C, N]) : h.rejectWith(f, [N, C, v]), N.statusCode(m), m = t, u && d.trigger(c ? "ajaxSuccess" : "ajaxError", [N, p, c ? y : v]), g.fireWith(f, [N, C]), u && (d.trigger("ajaxComplete", [N, p]), --b.active || b.event.trigger("ajaxStop")));
			}
			return N;
		},
		getScript : function (e, n) {
			return b.get(e, t, n, "script");
		},
		getJSON : function (e, t, n) {
			return b.get(e, t, n, "json");
		}
	});
	function _n(e, n, r) {
		var i,
		o,
		a,
		s,
		u = e.contents,
		l = e.dataTypes,
		c = e.responseFields;
		for (s in c) {
			s in r && (n[c[s]] = r[s]);
		}
		while ("*" === l[0]) {
			l.shift(),
			o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
		}
		if (o) {
			for (s in u) {
				if (u[s] && u[s].test(o)) {
					l.unshift(s);
					break;
				}
			}
		}
		if (l[0]in r) {
			a = l[0];
		} else {
			for (s in r) {
				if (!l[0] || e.converters[s + " " + l[0]]) {
					a = s;
					break;
				}
				i || (i = s);
			}
			a = a || i;
		}
		return a ? (a !== l[0] && l.unshift(a), r[a]) : t;
	}
	function Fn(e, t) {
		var n,
		r,
		i,
		o,
		a = {},
		s = 0,
		u = e.dataTypes.slice(),
		l = u[0];
		if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), u[1]) {
			for (i in e.converters) {
				a[i.toLowerCase()] = e.converters[i];
			}
		}
		for (; r = u[++s]; ) {
			if ("*" !== r) {
				if ("*" !== l && l !== r) {
					if (i = a[l + " " + r] || a["* " + r], !i) {
						for (n in a) {
							if (o = n.split(" "), o[1] === r && (i = a[l + " " + o[0]] || a["* " + o[0]])) {
								i === !0 ? i = a[n] : a[n] !== !0 && (r = o[0], u.splice(s--, 0, r));
								break;
							}
						}
					}
					if (i !== !0) {
						if (i && e["throws"]) {
							t = i(t);
						} else {
							try {
								t = i(t);
							} catch (c) {
								return {
									state : "parsererror",
									error : i ? c : "No conversion from " + l + " to " + r
								};
							}
						}
					}
				}
				l = r;
			}
		}
		return {
			state : "success",
			data : t
		};
	}
	b.ajaxSetup({
		accepts : {
			script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents : {
			script : /(?:java|ecma)script/
		},
		converters : {
			"text script" : function (e) {
				return b.globalEval(e),
				e;
			}
		}
	}),
	b.ajaxPrefilter("script", function (e) {
		e.cache === t && (e.cache = !1),
		e.crossDomain && (e.type = "GET", e.global = !1);
	}),
	b.ajaxTransport("script", function (e) {
		if (e.crossDomain) {
			var n,
			r = o.head || b("head")[0] || o.documentElement;
			return {
				send : function (t, i) {
					n = o.createElement("script"),
					n.async = !0,
					e.scriptCharset && (n.charset = e.scriptCharset),
					n.src = e.url,
					n.onload = n.onreadystatechange = function (e, t) {
						(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"));
					},
					r.insertBefore(n, r.firstChild);
				},
				abort : function () {
					n && n.onload(t, !0);
				}
			};
		}
	});
	var On = [],
	Bn = /(=)\?(?=&|$)|\?\?/;
	b.ajaxSetup({
		jsonp : "callback",
		jsonpCallback : function () {
			var e = On.pop() || b.expando + "_" + vn++;
			return this[e] = !0,
			e;
		}
	}),
	b.ajaxPrefilter("json jsonp", function (n, r, i) {
		var o,
		a,
		s,
		u = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
		return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = b.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () {
			return s || b.error(o + " was not called"),
			s[0];
		}, n.dataTypes[0] = "json", a = e[o], e[o] = function () {
			s = arguments;
		}, i.always(function () {
				e[o] = a,
				n[o] && (n.jsonpCallback = r.jsonpCallback, On.push(o)),
				s && b.isFunction(a) && a(s[0]),
				s = a = t;
			}), "script") : t;
	});
	var Pn,
	Rn,
	Wn = 0,
	$n = e.ActiveXObject && function () {
		var e;
		for (e in Pn) {
			Pn[e](t, !0);
		}
	};
	function In() {
		try {
			return new e.XMLHttpRequest;
		} catch (t) {}

	}
	function zn() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP");
		} catch (t) {}

	}
	b.ajaxSettings.xhr = e.ActiveXObject ? function () {
		return !this.isLocal && In() || zn();
	}
	 : In,
	Rn = b.ajaxSettings.xhr(),
	b.support.cors = !!Rn && "withCredentials" in Rn,
	Rn = b.support.ajax = !!Rn,
	Rn && b.ajaxTransport(function (n) {
		if (!n.crossDomain || b.support.cors) {
			var r;
			return {
				send : function (i, o) {
					var a,
					s,
					u = n.xhr();
					if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields) {
						for (s in n.xhrFields) {
							u[s] = n.xhrFields[s];
						}
					}
					n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType),
					n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (s in i) {
							u.setRequestHeader(s, i[s]);
						}
					} catch (l) {}

					u.send(n.hasContent && n.data || null),
					r = function (e, i) {
						var s,
						l,
						c,
						p;
						try {
							if (r && (i || 4 === u.readyState)) {
								if (r = t, a && (u.onreadystatechange = b.noop, $n && delete Pn[a]), i) {
									4 !== u.readyState && u.abort();
								} else {
									p = {},
									s = u.status,
									l = u.getAllResponseHeaders(),
									"string" == typeof u.responseText && (p.text = u.responseText);
									try {
										c = u.statusText;
									} catch (f) {
										c = "";
									}
									s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404;
								}
							}
						} catch (d) {
							i || o(-1, d);
						}
						p && o(s, c, p, l);
					},
					n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, b(e).unload($n)), Pn[a] = r), u.onreadystatechange = r) : r();
				},
				abort : function () {
					r && r(t, !0);
				}
			};
		}
	});
	var Xn,
	Un,
	Vn = /^(?:toggle|show|hide)$/,
	Yn = RegExp("^(?:([+-])=|)(" + x + ")([a-z%]*)$", "i"),
	Jn = /queueHooks$/,
	Gn = [nr],
	Qn = {
		"*" : [function (e, t) {
				var n,
				r,
				i = this.createTween(e, t),
				o = Yn.exec(t),
				a = i.cur(),
				s = +a || 0,
				u = 1,
				l = 20;
				if (o) {
					if (n = +o[2], r = o[3] || (b.cssNumber[e] ? "" : "px"), "px" !== r && s) {
						s = b.css(i.elem, e, !0) || n || 1;
						do {
							u = u || ".5",
							s /= u,
							b.style(i.elem, e, s + r);
						} while (u !== (u = i.cur() / a) && 1 !== u && --l);
					}
					i.unit = r,
					i.start = s,
					i.end = o[1] ? s + (o[1] + 1) * n : n;
				}
				return i;
			}
		]
	};
	function Kn() {
		return setTimeout(function () {
			Xn = t;
		}),
		Xn = b.now();
	}
	function Zn(e, t) {
		b.each(t, function (t, n) {
			var r = (Qn[t] || []).concat(Qn["*"]),
			i = 0,
			o = r.length;
			for (; o > i; i++) {
				if (r[i].call(e, t, n)) {
					return;
				}
			}
		});
	}
	function er(e, t, n) {
		var r,
		i,
		o = 0,
		a = Gn.length,
		s = b.Deferred().always(function () {
				delete u.elem;
			}),
		u = function () {
			if (i) {
				return !1;
			}
			var t = Xn || Kn(),
			n = Math.max(0, l.startTime + l.duration - t),
			r = n / l.duration || 0,
			o = 1 - r,
			a = 0,
			u = l.tweens.length;
			for (; u > a; a++) {
				l.tweens[a].run(o);
			}
			return s.notifyWith(e, [l, o, n]),
			1 > o && u ? n : (s.resolveWith(e, [l]), !1);
		},
		l = s.promise({
				elem : e,
				props : b.extend({}, t),
				opts : b.extend(!0, {
					specialEasing : {}

				}, n),
				originalProperties : t,
				originalOptions : n,
				startTime : Xn || Kn(),
				duration : n.duration,
				tweens : [],
				createTween : function (t, n) {
					var r = b.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
					return l.tweens.push(r),
					r;
				},
				stop : function (t) {
					var n = 0,
					r = t ? l.tweens.length : 0;
					if (i) {
						return this;
					}
					for (i = !0; r > n; n++) {
						l.tweens[n].run(1);
					}
					return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]),
					this;
				}
			}),
		c = l.props;
		for (tr(c, l.opts.specialEasing); a > o; o++) {
			if (r = Gn[o].call(l, e, c, l.opts)) {
				return r;
			}
		}
		return Zn(l, c),
		b.isFunction(l.opts.start) && l.opts.start.call(e, l),
		b.fx.timer(b.extend(u, {
				elem : e,
				anim : l,
				queue : l.opts.queue
			})),
		l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
	}
	function tr(e, t) {
		var n,
		r,
		i,
		o,
		a;
		for (i in e) {
			if (r = b.camelCase(i), o = t[r], n = e[i], b.isArray(n) && (o = n[1], n = e[i] = n[0]), i !== r && (e[r] = n, delete e[i]), a = b.cssHooks[r], a && "expand" in a) {
				n = a.expand(n),
				delete e[r];
				for (i in n) {
					i in e || (e[i] = n[i], t[i] = o);
				}
			} else {
				t[r] = o;
			}
		}
	}
	b.Animation = b.extend(er, {
			tweener : function (e, t) {
				b.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
				var n,
				r = 0,
				i = e.length;
				for (; i > r; r++) {
					n = e[r],
					Qn[n] = Qn[n] || [],
					Qn[n].unshift(t);
				}
			},
			prefilter : function (e, t) {
				t ? Gn.unshift(e) : Gn.push(e);
			}
		});
	function nr(e, t, n) {
		var r,
		i,
		o,
		a,
		s,
		u,
		l,
		c,
		p,
		f = this,
		d = e.style,
		h = {},
		g = [],
		m = e.nodeType && nn(e);
		n.queue || (c = b._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, p = c.empty.fire, c.empty.fire = function () {
				c.unqueued || p();
			}), c.unqueued++, f.always(function () {
				f.always(function () {
					c.unqueued--,
					b.queue(e, "fx").length || c.empty.fire();
				});
			})),
		1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === b.css(e, "display") && "none" === b.css(e, "float") && (b.support.inlineBlockNeedsLayout && "inline" !== un(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")),
		n.overflow && (d.overflow = "hidden", b.support.shrinkWrapBlocks || f.always(function () {
				d.overflow = n.overflow[0],
				d.overflowX = n.overflow[1],
				d.overflowY = n.overflow[2];
			}));
		for (i in t) {
			if (a = t[i], Vn.exec(a)) {
				if (delete t[i], u = u || "toggle" === a, a === (m ? "hide" : "show")) {
					continue;
				}
				g.push(i);
			}
		}
		if (o = g.length) {
			s = b._data(e, "fxshow") || b._data(e, "fxshow", {}),
			"hidden" in s && (m = s.hidden),
			u && (s.hidden = !m),
			m ? b(e).show() : f.done(function () {
				b(e).hide();
			}),
			f.done(function () {
				var t;
				b._removeData(e, "fxshow");
				for (t in h) {
					b.style(e, t, h[t]);
				}
			});
			for (i = 0; o > i; i++) {
				r = g[i],
				l = f.createTween(r, m ? s[r] : 0),
				h[r] = s[r] || b.style(e, r),
				r in s || (s[r] = l.start, m && (l.end = l.start, l.start = "width" === r || "height" === r ? 1 : 0));
			}
		}
	}
	function rr(e, t, n, r, i) {
		return new rr.prototype.init(e, t, n, r, i);
	}
	b.Tween = rr,
	rr.prototype = {
		constructor : rr,
		init : function (e, t, n, r, i, o) {
			this.elem = e,
			this.prop = n,
			this.easing = i || "swing",
			this.options = t,
			this.start = this.now = this.cur(),
			this.end = r,
			this.unit = o || (b.cssNumber[n] ? "" : "px");
		},
		cur : function () {
			var e = rr.propHooks[this.prop];
			return e && e.get ? e.get(this) : rr.propHooks._default.get(this);
		},
		run : function (e) {
			var t,
			n = rr.propHooks[this.prop];
			return this.pos = t = this.options.duration ? b.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
			this.now = (this.end - this.start) * t + this.start,
			this.options.step && this.options.step.call(this.elem, this.now, this),
			n && n.set ? n.set(this) : rr.propHooks._default.set(this),
			this;
		}
	},
	rr.prototype.init.prototype = rr.prototype,
	rr.propHooks = {
		_default : {
			get : function (e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = b.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop];
			},
			set : function (e) {
				b.fx.step[e.prop] ? b.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[b.cssProps[e.prop]] || b.cssHooks[e.prop]) ? b.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
			}
		}
	},
	rr.propHooks.scrollTop = rr.propHooks.scrollLeft = {
		set : function (e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
		}
	},
	b.each(["toggle", "show", "hide"], function (e, t) {
		var n = b.fn[t];
		b.fn[t] = function (e, r, i) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i);
		};
	}),
	b.fn.extend({
		fadeTo : function (e, t, n, r) {
			return this.filter(nn).css("opacity", 0).show().end().animate({
				opacity : t
			}, e, n, r);
		},
		animate : function (e, t, n, r) {
			var i = b.isEmptyObject(e),
			o = b.speed(t, n, r),
			a = function () {
				var t = er(this, b.extend({}, e), o);
				a.finish = function () {
					t.stop(!0);
				},
				(i || b._data(this, "finish")) && t.stop(!0);
			};
			return a.finish = a,
			i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
		},
		stop : function (e, n, r) {
			var i = function (e) {
				var t = e.stop;
				delete e.stop,
				t(r);
			};
			return "string" != typeof e && (r = n, n = e, e = t),
			n && e !== !1 && this.queue(e || "fx", []),
			this.each(function () {
				var t = !0,
				n = null != e && e + "queueHooks",
				o = b.timers,
				a = b._data(this);
				if (n) {
					a[n] && a[n].stop && i(a[n]);
				} else {
					for (n in a) {
						a[n] && a[n].stop && Jn.test(n) && i(a[n]);
					}
				}
				for (n = o.length; n--; ) {
					o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
				}
				(t || !r) && b.dequeue(this, e);
			});
		},
		finish : function (e) {
			return e !== !1 && (e = e || "fx"),
			this.each(function () {
				var t,
				n = b._data(this),
				r = n[e + "queue"],
				i = n[e + "queueHooks"],
				o = b.timers,
				a = r ? r.length : 0;
				for (n.finish = !0, b.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--; ) {
					o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				}
				for (t = 0; a > t; t++) {
					r[t] && r[t].finish && r[t].finish.call(this);
				}
				delete n.finish;
			});
		}
	});
	function ir(e, t) {
		var n,
		r = {
			height : e
		},
		i = 0;
		for (t = t ? 1 : 0; 4 > i; i += 2 - t) {
			n = Zt[i],
			r["margin" + n] = r["padding" + n] = e;
		}
		return t && (r.opacity = r.width = e),
		r;
	}
	b.each({
		slideDown : ir("show"),
		slideUp : ir("hide"),
		slideToggle : ir("toggle"),
		fadeIn : {
			opacity : "show"
		},
		fadeOut : {
			opacity : "hide"
		},
		fadeToggle : {
			opacity : "toggle"
		}
	}, function (e, t) {
		b.fn[e] = function (e, n, r) {
			return this.animate(t, e, n, r);
		};
	}),
	b.speed = function (e, t, n) {
		var r = e && "object" == typeof e ? b.extend({}, e) : {
			complete : n || !n && t || b.isFunction(e) && e,
			duration : e,
			easing : n && t || t && !b.isFunction(t) && t
		};
		return r.duration = b.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in b.fx.speeds ? b.fx.speeds[r.duration] : b.fx.speeds._default,
		(null == r.queue || r.queue === !0) && (r.queue = "fx"),
		r.old = r.complete,
		r.complete = function () {
			b.isFunction(r.old) && r.old.call(this),
			r.queue && b.dequeue(this, r.queue);
		},
		r;
	},
	b.easing = {
		linear : function (e) {
			return e;
		},
		swing : function (e) {
			return 0.5 - Math.cos(e * Math.PI) / 2;
		}
	},
	b.timers = [],
	b.fx = rr.prototype.init,
	b.fx.tick = function () {
		var e,
		n = b.timers,
		r = 0;
		for (Xn = b.now(); n.length > r; r++) {
			e = n[r],
			e() || n[r] !== e || n.splice(r--, 1);
		}
		n.length || b.fx.stop(),
		Xn = t;
	},
	b.fx.timer = function (e) {
		e() && b.timers.push(e) && b.fx.start();
	},
	b.fx.interval = 13,
	b.fx.start = function () {
		Un || (Un = setInterval(b.fx.tick, b.fx.interval));
	},
	b.fx.stop = function () {
		clearInterval(Un),
		Un = null;
	},
	b.fx.speeds = {
		slow : 600,
		fast : 200,
		_default : 400
	},
	b.fx.step = {},
	b.expr && b.expr.filters && (b.expr.filters.animated = function (e) {
		return b.grep(b.timers, function (t) {
			return e === t.elem;
		}).length;
	}),
	b.fn.offset = function (e) {
		if (arguments.length) {
			return e === t ? this : this.each(function (t) {
				b.offset.setOffset(this, e, t);
			});
		}
		var n,
		r,
		o = {
			top : 0,
			left : 0
		},
		a = this[0],
		s = a && a.ownerDocument;
		if (s) {
			return n = s.documentElement,
			b.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), {
				top : o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
				left : o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
			}) : o;
		}
	},
	b.offset = {
		setOffset : function (e, t, n) {
			var r = b.css(e, "position");
			"static" === r && (e.style.position = "relative");
			var i = b(e),
			o = i.offset(),
			a = b.css(e, "top"),
			s = b.css(e, "left"),
			u = ("absolute" === r || "fixed" === r) && b.inArray("auto", [a, s]) > -1,
			l = {},
			c = {},
			p,
			f;
			u ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0),
			b.isFunction(t) && (t = t.call(e, n, o)),
			null != t.top && (l.top = t.top - o.top + p),
			null != t.left && (l.left = t.left - o.left + f),
			"using" in t ? t.using.call(e, l) : i.css(l);
		}
	},
	b.fn.extend({
		position : function () {
			if (this[0]) {
				var e,
				t,
				n = {
					top : 0,
					left : 0
				},
				r = this[0];
				return "fixed" === b.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), b.nodeName(e[0], "html") || (n = e.offset()), n.top += b.css(e[0], "borderTopWidth", !0), n.left += b.css(e[0], "borderLeftWidth", !0)), {
					top : t.top - n.top - b.css(r, "marginTop", !0),
					left : t.left - n.left - b.css(r, "marginLeft", !0)
				};
			}
		},
		offsetParent : function () {
			return this.map(function () {
				var e = this.offsetParent || o.documentElement;
				while (e && !b.nodeName(e, "html") && "static" === b.css(e, "position")) {
					e = e.offsetParent;
				}
				return e || o.documentElement;
			});
		}
	}),
	b.each({
		scrollLeft : "pageXOffset",
		scrollTop : "pageYOffset"
	}, function (e, n) {
		var r = /Y/.test(n);
		b.fn[e] = function (i) {
			return b.access(this, function (e, i, o) {
				var a = or(e);
				return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? b(a).scrollLeft() : o, r ? o : b(a).scrollTop()) : e[i] = o, t);
			}, e, i, arguments.length, null);
		};
	});
	function or(e) {
		return b.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1;
	}
	b.each({
		Height : "height",
		Width : "width"
	}, function (e, n) {
		b.each({
			padding : "inner" + e,
			content : n,
			"" : "outer" + e
		}, function (r, i) {
			b.fn[i] = function (i, o) {
				var a = arguments.length && (r || "boolean" != typeof i),
				s = r || (i === !0 || o === !0 ? "margin" : "border");
				return b.access(this, function (n, r, i) {
					var o;
					return b.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? b.css(n, r, s) : b.style(n, r, i, s);
				}, n, a ? i : t, a, null);
			};
		});
	}),
	e.jQuery = e.$ = b,
	"function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
		return b;
	});
})(window);
/*!
 * jQuery Migrate - v1.1.0 - 2013-01-31
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function (jQuery, window, undefined) {
	var warnedAbout = {};
	jQuery.migrateWarnings = [];
	jQuery.migrateMute = true;
	if (!jQuery.migrateMute && window.console && console.log) {
		console.log("JQMIGRATE: Logging is active");
	}
	if (jQuery.migrateTrace === undefined) {
		jQuery.migrateTrace = true;
	}
	jQuery.migrateReset = function () {
		warnedAbout = {};
		jQuery.migrateWarnings.length = 0;
	};
	function migrateWarn(msg) {
		if (!warnedAbout[msg]) {
			warnedAbout[msg] = true;
			jQuery.migrateWarnings.push(msg);
			if (window.console && console.warn && !jQuery.migrateMute) {
				console.warn("JQMIGRATE: " + msg);
				if (jQuery.migrateTrace && console.trace) {
					console.trace();
				}
			}
		}
	}
	function migrateWarnProp(obj, prop, value, msg) {
		if (Object.defineProperty) {
			try {
				Object.defineProperty(obj, prop, {
					configurable : true,
					enumerable : true,
					get : function () {
						migrateWarn(msg);
						return value;
					},
					set : function (newValue) {
						migrateWarn(msg);
						value = newValue;
					}
				});
				return;
			} catch (err) {}

		}
		jQuery._definePropertyBroken = true;
		obj[prop] = value;
	}
	if (document.compatMode === "BackCompat") {
		migrateWarn("jQuery is not compatible with Quirks Mode");
	}
	var attrFn = {},
	oldAttr = jQuery.attr,
	valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get || function () {
		return null;
	},
	valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set || function () {
		return undefined;
	},
	rnoType = /^(?:input|button)$/i,
	rnoAttrNodeType = /^[238]$/,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	ruseDefault = /^(?:checked|selected)$/i;
	migrateWarnProp(jQuery, "attrFn", attrFn, "jQuery.attrFn is deprecated");
	jQuery.attr = function (elem, name, value, pass) {
		var lowerName = name.toLowerCase(),
		nType = elem && elem.nodeType;
		if (pass && oldAttr.length < 4) {
			migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
			if (elem && !rnoAttrNodeType.test(nType) && jQuery.isFunction(jQuery.fn[name])) {
				return jQuery(elem)[name](value);
			}
		}
		if (name === "type" && value !== undefined && rnoType.test(elem.nodeName) && elem.parentNode) {
			migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
		}
		if (!jQuery.attrHooks[lowerName] && rboolean.test(lowerName)) {
			jQuery.attrHooks[lowerName] = {
				get : function (elem, name) {
					var attrNode,
					property = jQuery.prop(elem, name);
					return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
				},
				set : function (elem, value, name) {
					var propName;
					if (value === false) {
						jQuery.removeAttr(elem, name);
					} else {
						propName = jQuery.propFix[name] || name;
						if (propName in elem) {
							elem[propName] = true;
						}
						elem.setAttribute(name, name.toLowerCase());
					}
					return name;
				}
			};
			if (ruseDefault.test(lowerName)) {
				migrateWarn("jQuery.fn.attr('" + lowerName + "') may use property instead of attribute");
			}
		}
		return oldAttr.call(jQuery, elem, name, value);
	};
	jQuery.attrHooks.value = {
		get : function (elem, name) {
			var nodeName = (elem.nodeName || "").toLowerCase();
			if (nodeName === "button") {
				return valueAttrGet.apply(this, arguments);
			}
			if (nodeName !== "input" && nodeName !== "option") {
				migrateWarn("jQuery.fn.attr('value') no longer gets properties");
			}
			return name in elem ? elem.value : null;
		},
		set : function (elem, value) {
			var nodeName = (elem.nodeName || "").toLowerCase();
			if (nodeName === "button") {
				return valueAttrSet.apply(this, arguments);
			}
			if (nodeName !== "input" && nodeName !== "option") {
				migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");
			}
			elem.value = value;
		}
	};
	var matched,
	browser,
	oldInit = jQuery.fn.init,
	oldParseJSON = jQuery.parseJSON,
	rquickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;
	jQuery.fn.init = function (selector, context, rootjQuery) {
		var match;
		if (selector && typeof selector === "string" && !jQuery.isPlainObject(context) && (match = rquickExpr.exec(selector)) && match[1]) {
			if (selector.charAt(0) !== "<") {
				migrateWarn("$(html) HTML strings must start with '<' character");
			}
			if (context && context.context) {
				context = context.context;
			}
			if (jQuery.parseHTML) {
				return oldInit.call(this, jQuery.parseHTML(jQuery.trim(selector), context, true), context, rootjQuery);
			}
		}
		return oldInit.apply(this, arguments);
	};
	jQuery.fn.init.prototype = jQuery.fn;
	jQuery.parseJSON = function (json) {
		if (!json && json !== null) {
			migrateWarn("jQuery.parseJSON requires a valid JSON string");
			return null;
		}
		return oldParseJSON.apply(this, arguments);
	};
	jQuery.uaMatch = function (ua) {
		ua = ua.toLowerCase();
		var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
		return {
			browser : match[1] || "",
			version : match[2] || "0"
		};
	};
	matched = jQuery.uaMatch(navigator.userAgent);
	browser = {};
	if (matched.browser) {
		browser[matched.browser] = true;
		browser.version = matched.version;
	}
	if (browser.chrome) {
		browser.webkit = true;
	} else {
		if (browser.webkit) {
			browser.safari = true;
		}
	}
	jQuery.browser = browser;
	migrateWarnProp(jQuery, "browser", browser, "jQuery.browser is deprecated");
	jQuery.sub = function () {
		function jQuerySub(selector, context) {
			return new jQuerySub.fn.init(selector, context);
		}
		jQuery.extend(true, jQuerySub, this);
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init(selector, context) {
			if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
				context = jQuerySub(context);
			}
			return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		migrateWarn("jQuery.sub() is deprecated");
		return jQuerySub;
	};
	var oldFnData = jQuery.fn.data;
	jQuery.fn.data = function (name) {
		var ret,
		evt,
		elem = this[0];
		if (elem && name === "events" && arguments.length === 1) {
			ret = jQuery.data(elem, name);
			evt = jQuery._data(elem, name);
			if ((ret === undefined || ret === evt) && evt !== undefined) {
				migrateWarn("Use of jQuery.fn.data('events') is deprecated");
				return evt;
			}
		}
		return oldFnData.apply(this, arguments);
	};
	var rscriptType = /\/(java|ecma)script/i,
	oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack;
	jQuery.fn.andSelf = function () {
		migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
		return oldSelf.apply(this, arguments);
	};
	if (!jQuery.clean) {
		jQuery.clean = function (elems, context, fragment, scripts) {
			context = context || document;
			context = !context.nodeType && context[0] || context;
			context = context.ownerDocument || context;
			migrateWarn("jQuery.clean() is deprecated");
			var i,
			elem,
			handleScript,
			jsTags,
			ret = [];
			jQuery.merge(ret, jQuery.buildFragment(elems, context).childNodes);
			if (fragment) {
				handleScript = function (elem) {
					if (!elem.type || rscriptType.test(elem.type)) {
						return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem);
					}
				};
				for (i = 0; (elem = ret[i]) != null; i++) {
					if (!(jQuery.nodeName(elem, "script") && handleScript(elem))) {
						fragment.appendChild(elem);
						if (typeof elem.getElementsByTagName !== "undefined") {
							jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript);
							ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
							i += jsTags.length;
						}
					}
				}
			}
			return ret;
		};
	}
	var eventAdd = jQuery.event.add,
	eventRemove = jQuery.event.remove,
	eventTrigger = jQuery.event.trigger,
	oldToggle = jQuery.fn.toggle,
	oldLive = jQuery.fn.live,
	oldDie = jQuery.fn.die,
	ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
	rajaxEvent = new RegExp("\\b(?:" + ajaxEvents + ")\\b"),
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	hoverHack = function (events) {
		if (typeof(events) != "string" || jQuery.event.special.hover) {
			return events;
		}
		if (rhoverHack.test(events)) {
			migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");
		}
		return events && events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
	};
	if (jQuery.event.props && jQuery.event.props[0] !== "attrChange") {
		jQuery.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement");
	}
	if (jQuery.event.dispatch) {
		migrateWarnProp(jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated");
	}
	jQuery.event.add = function (elem, types, handler, data, selector) {
		if (elem !== document && rajaxEvent.test(types)) {
			migrateWarn("AJAX events should be attached to document: " + types);
		}
		eventAdd.call(this, elem, hoverHack(types || ""), handler, data, selector);
	};
	jQuery.event.remove = function (elem, types, handler, selector, mappedTypes) {
		eventRemove.call(this, elem, hoverHack(types) || "", handler, selector, mappedTypes);
	};
	jQuery.fn.error = function () {
		var args = Array.prototype.slice.call(arguments, 0);
		migrateWarn("jQuery.fn.error() is deprecated");
		args.splice(0, 0, "error");
		if (arguments.length) {
			return this.bind.apply(this, args);
		}
		this.triggerHandler.apply(this, args);
		return this;
	};
	jQuery.fn.toggle = function (fn, fn2) {
		if (!jQuery.isFunction(fn) || !jQuery.isFunction(fn2)) {
			return oldToggle.apply(this, arguments);
		}
		migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");
		var args = arguments,
		guid = fn.guid || jQuery.guid++,
		i = 0,
		toggler = function (event) {
			var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
			jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
			event.preventDefault();
			return args[lastToggle].apply(this, arguments) || false;
		};
		toggler.guid = guid;
		while (i < args.length) {
			args[i++].guid = guid;
		}
		return this.click(toggler);
	};
	jQuery.fn.live = function (types, data, fn) {
		migrateWarn("jQuery.fn.live() is deprecated");
		if (oldLive) {
			return oldLive.apply(this, arguments);
		}
		jQuery(this.context).on(types, this.selector, data, fn);
		return this;
	};
	jQuery.fn.die = function (types, fn) {
		migrateWarn("jQuery.fn.die() is deprecated");
		if (oldDie) {
			return oldDie.apply(this, arguments);
		}
		jQuery(this.context).off(types, this.selector || "**", fn);
		return this;
	};
	jQuery.event.trigger = function (event, data, elem, onlyHandlers) {
		if (!elem & !rajaxEvent.test(event)) {
			migrateWarn("Global events are undocumented and deprecated");
		}
		return eventTrigger.call(this, event, data, elem || document, onlyHandlers);
	};
	jQuery.each(ajaxEvents.split("|"), function (_, name) {
		jQuery.event.special[name] = {
			setup : function () {
				var elem = this;
				if (elem !== document) {
					jQuery.event.add(document, name + "." + jQuery.guid, function () {
						jQuery.event.trigger(name, null, elem, true);
					});
					jQuery._data(this, name, jQuery.guid++);
				}
				return false;
			},
			teardown : function () {
				if (this !== document) {
					jQuery.event.remove(document, name + "." + jQuery._data(this, name));
				}
				return false;
			}
		};
	});
})(jQuery, window);
/*! jQuery UI - v1.10.3 - 2013-08-28
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.resizable.js, jquery.ui.sortable.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.menu.js
 * Copyright 2013 jQuery Foundation and other contributors Licensed MIT */
(function (e, t) {
	function i(t, i) {
		var a,
		n,
		r,
		o = t.nodeName.toLowerCase();
		return "area" === o ? (a = t.parentNode, n = a.name, t.href && n && "map" === a.nodeName.toLowerCase() ? (r = e("img[usemap=#" + n + "]")[0], !!r && s(r)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && s(t);
	}
	function s(t) {
		return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () {
			return "hidden" === e.css(this, "visibility");
		}).length;
	}
	var a = 0,
	n = /^ui-id-\d+$/;
	e.ui = e.ui || {},
	e.extend(e.ui, {
		version : "1.10.3",
		keyCode : {
			BACKSPACE : 8,
			COMMA : 188,
			DELETE : 46,
			DOWN : 40,
			END : 35,
			ENTER : 13,
			ESCAPE : 27,
			HOME : 36,
			LEFT : 37,
			NUMPAD_ADD : 107,
			NUMPAD_DECIMAL : 110,
			NUMPAD_DIVIDE : 111,
			NUMPAD_ENTER : 108,
			NUMPAD_MULTIPLY : 106,
			NUMPAD_SUBTRACT : 109,
			PAGE_DOWN : 34,
			PAGE_UP : 33,
			PERIOD : 190,
			RIGHT : 39,
			SPACE : 32,
			TAB : 9,
			UP : 38
		}
	}),
	e.fn.extend({
		focus : function (t) {
			return function (i, s) {
				return "number" == typeof i ? this.each(function () {
					var t = this;
					setTimeout(function () {
						e(t).focus(),
						s && s.call(t);
					}, i);
				}) : t.apply(this, arguments);
			};
		}
		(e.fn.focus),
		scrollParent : function () {
			var t;
			return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
					return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
				}).eq(0) : this.parents().filter(function () {
					return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
				}).eq(0),
			/fixed/.test(this.css("position")) || !t.length ? e(document) : t;
		},
		zIndex : function (i) {
			if (i !== t) {
				return this.css("zIndex", i);
			}
			if (this.length) {
				for (var s, a, n = e(this[0]); n.length && n[0] !== document; ) {
					if (s = n.css("position"), ("absolute" === s || "relative" === s || "fixed" === s) && (a = parseInt(n.css("zIndex"), 10), !isNaN(a) && 0 !== a)) {
						return a;
					}
					n = n.parent();
				}
			}
			return 0;
		},
		uniqueId : function () {
			return this.each(function () {
				this.id || (this.id = "ui-id-" + ++a);
			});
		},
		removeUniqueId : function () {
			return this.each(function () {
				n.test(this.id) && e(this).removeAttr("id");
			});
		}
	}),
	e.extend(e.expr[":"], {
		data : e.expr.createPseudo ? e.expr.createPseudo(function (t) {
			return function (i) {
				return !!e.data(i, t);
			};
		}) : function (t, i, s) {
			return !!e.data(t, s[3]);
		},
		focusable : function (t) {
			return i(t, !isNaN(e.attr(t, "tabindex")));
		},
		tabbable : function (t) {
			var s = e.attr(t, "tabindex"),
			a = isNaN(s);
			return (a || s >= 0) && i(t, !a);
		}
	}),
	e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (i, s) {
		function a(t, i, s, a) {
			return e.each(n, function () {
				i -= parseFloat(e.css(t, "padding" + this)) || 0,
				s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
				a && (i -= parseFloat(e.css(t, "margin" + this)) || 0);
			}),
			i;
		}
		var n = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"],
		r = s.toLowerCase(),
		o = {
			innerWidth : e.fn.innerWidth,
			innerHeight : e.fn.innerHeight,
			outerWidth : e.fn.outerWidth,
			outerHeight : e.fn.outerHeight
		};
		e.fn["inner" + s] = function (i) {
			return i === t ? o["inner" + s].call(this) : this.each(function () {
				e(this).css(r, a(this, i) + "px");
			});
		},
		e.fn["outer" + s] = function (t, i) {
			return "number" != typeof t ? o["outer" + s].call(this, t) : this.each(function () {
				e(this).css(r, a(this, t, !0, i) + "px");
			});
		};
	}),
	e.fn.addBack || (e.fn.addBack = function (e) {
		return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
	}),
	e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
		return function (i) {
			return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this);
		};
	}
		(e.fn.removeData)),
	e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
	e.support.selectstart = "onselectstart" in document.createElement("div"),
	e.fn.extend({
		disableSelection : function () {
			return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
				e.preventDefault();
			});
		},
		enableSelection : function () {
			return this.unbind(".ui-disableSelection");
		}
	}),
	e.extend(e.ui, {
		plugin : {
			add : function (t, i, s) {
				var a,
				n = e.ui[t].prototype;
				for (a in s) {
					n.plugins[a] = n.plugins[a] || [],
					n.plugins[a].push([i, s[a]]);
				}
			},
			call : function (e, t, i) {
				var s,
				a = e.plugins[t];
				if (a && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) {
					for (s = 0; a.length > s; s++) {
						e.options[a[s][0]] && a[s][1].apply(e.element, i);
					}
				}
			}
		},
		hasScroll : function (t, i) {
			if ("hidden" === e(t).css("overflow")) {
				return !1;
			}
			var s = i && "left" === i ? "scrollLeft" : "scrollTop",
			a = !1;
			return t[s] > 0 ? !0 : (t[s] = 1, a = t[s] > 0, t[s] = 0, a);
		}
	});
})(jQuery);
(function (e, t) {
	var i = 0,
	s = Array.prototype.slice,
	n = e.cleanData;
	e.cleanData = function (t) {
		for (var i, s = 0; null != (i = t[s]); s++) {
			try {
				e(i).triggerHandler("remove");
			} catch (a) {}

		}
		n(t);
	},
	e.widget = function (i, s, n) {
		var a,
		r,
		o,
		h,
		l = {},
		u = i.split(".")[0];
		i = i.split(".")[1],
		a = u + "-" + i,
		n || (n = s, s = e.Widget),
		e.expr[":"][a.toLowerCase()] = function (t) {
			return !!e.data(t, a);
		},
		e[u] = e[u] || {},
		r = e[u][i],
		o = e[u][i] = function (e, i) {
			return this._createWidget ? (arguments.length && this._createWidget(e, i), t) : new o(e, i);
		},
		e.extend(o, r, {
			version : n.version,
			_proto : e.extend({}, n),
			_childConstructors : []
		}),
		h = new s,
		h.options = e.widget.extend({}, h.options),
		e.each(n, function (i, n) {
			return e.isFunction(n) ? (l[i] = function () {
				var e = function () {
					return s.prototype[i].apply(this, arguments);
				},
				t = function (e) {
					return s.prototype[i].apply(this, e);
				};
				return function () {
					var i,
					s = this._super,
					a = this._superApply;
					return this._super = e,
					this._superApply = t,
					i = n.apply(this, arguments),
					this._super = s,
					this._superApply = a,
					i;
				};
			}
				(), t) : (l[i] = n, t);
		}),
		o.prototype = e.widget.extend(h, {
				widgetEventPrefix : r ? h.widgetEventPrefix : i
			}, l, {
				constructor : o,
				namespace : u,
				widgetName : i,
				widgetFullName : a
			}),
		r ? (e.each(r._childConstructors, function (t, i) {
				var s = i.prototype;
				e.widget(s.namespace + "." + s.widgetName, o, i._proto);
			}), delete r._childConstructors) : s._childConstructors.push(o),
		e.widget.bridge(i, o);
	},
	e.widget.extend = function (i) {
		for (var n, a, r = s.call(arguments, 1), o = 0, h = r.length; h > o; o++) {
			for (n in r[o]) {
				a = r[o][n],
				r[o].hasOwnProperty(n) && a !== t && (i[n] = e.isPlainObject(a) ? e.isPlainObject(i[n]) ? e.widget.extend({}, i[n], a) : e.widget.extend({}, a) : a);
			}
		}
		return i;
	},
	e.widget.bridge = function (i, n) {
		var a = n.prototype.widgetFullName || i;
		e.fn[i] = function (r) {
			var o = "string" == typeof r,
			h = s.call(arguments, 1),
			l = this;
			return r = !o && h.length ? e.widget.extend.apply(null, [r].concat(h)) : r,
			o ? this.each(function () {
				var s,
				n = e.data(this, a);
				return n ? e.isFunction(n[r]) && "_" !== r.charAt(0) ? (s = n[r].apply(n, h), s !== n && s !== t ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : t) : e.error("no such method '" + r + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + r + "'");
			}) : this.each(function () {
				var t = e.data(this, a);
				t ? t.option(r || {})._init() : e.data(this, a, new n(r, this));
			}),
			l;
		};
	},
	e.Widget = function () {},
	e.Widget._childConstructors = [],
	e.Widget.prototype = {
		widgetName : "widget",
		widgetEventPrefix : "",
		defaultElement : "<div>",
		options : {
			disabled : !1,
			create : null
		},
		_createWidget : function (t, s) {
			s = e(s || this.defaultElement || this)[0],
			this.element = e(s),
			this.uuid = i++,
			this.eventNamespace = "." + this.widgetName + this.uuid,
			this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t),
			this.bindings = e(),
			this.hoverable = e(),
			this.focusable = e(),
			s !== this && (e.data(s, this.widgetFullName, this), this._on(!0, this.element, {
					remove : function (e) {
						e.target === s && this.destroy();
					}
				}), this.document = e(s.style ? s.ownerDocument : s.document || s), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)),
			this._create(),
			this._trigger("create", null, this._getCreateEventData()),
			this._init();
		},
		_getCreateOptions : e.noop,
		_getCreateEventData : e.noop,
		_create : e.noop,
		_init : e.noop,
		destroy : function () {
			this._destroy(),
			this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),
			this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
			this.bindings.unbind(this.eventNamespace),
			this.hoverable.removeClass("ui-state-hover"),
			this.focusable.removeClass("ui-state-focus");
		},
		_destroy : e.noop,
		widget : function () {
			return this.element;
		},
		option : function (i, s) {
			var n,
			a,
			r,
			o = i;
			if (0 === arguments.length) {
				return e.widget.extend({}, this.options);
			}
			if ("string" == typeof i) {
				if (o = {}, n = i.split("."), i = n.shift(), n.length) {
					for (a = o[i] = e.widget.extend({}, this.options[i]), r = 0; n.length - 1 > r; r++) {
						a[n[r]] = a[n[r]] || {},
						a = a[n[r]];
					}
					if (i = n.pop(), s === t) {
						return a[i] === t ? null : a[i];
					}
					a[i] = s;
				} else {
					if (s === t) {
						return this.options[i] === t ? null : this.options[i];
					}
					o[i] = s;
				}
			}
			return this._setOptions(o),
			this;
		},
		_setOptions : function (e) {
			var t;
			for (t in e) {
				this._setOption(t, e[t]);
			}
			return this;
		},
		_setOption : function (e, t) {
			return this.options[e] = t,
			"disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")),
			this;
		},
		enable : function () {
			return this._setOption("disabled", !1);
		},
		disable : function () {
			return this._setOption("disabled", !0);
		},
		_on : function (i, s, n) {
			var a,
			r = this;
			"boolean" != typeof i && (n = s, s = i, i = !1),
			n ? (s = a = e(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, a = this.widget()),
			e.each(n, function (n, o) {
				function h() {
					return i || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? r[o] : o).apply(r, arguments) : t;
				}
				"string" != typeof o && (h.guid = o.guid = o.guid || h.guid || e.guid++);
				var l = n.match(/^(\w+)\s*(.*)$/),
				u = l[1] + r.eventNamespace,
				c = l[2];
				c ? a.delegate(c, u, h) : s.bind(u, h);
			});
		},
		_off : function (e, t) {
			t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
			e.unbind(t).undelegate(t);
		},
		_delay : function (e, t) {
			function i() {
				return ("string" == typeof e ? s[e] : e).apply(s, arguments);
			}
			var s = this;
			return setTimeout(i, t || 0);
		},
		_hoverable : function (t) {
			this.hoverable = this.hoverable.add(t),
			this._on(t, {
				mouseenter : function (t) {
					e(t.currentTarget).addClass("ui-state-hover");
				},
				mouseleave : function (t) {
					e(t.currentTarget).removeClass("ui-state-hover");
				}
			});
		},
		_focusable : function (t) {
			this.focusable = this.focusable.add(t),
			this._on(t, {
				focusin : function (t) {
					e(t.currentTarget).addClass("ui-state-focus");
				},
				focusout : function (t) {
					e(t.currentTarget).removeClass("ui-state-focus");
				}
			});
		},
		_trigger : function (t, i, s) {
			var n,
			a,
			r = this.options[t];
			if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) {
				for (n in a) {
					n in i || (i[n] = a[n]);
				}
			}
			return this.element.trigger(i, s),
			!(e.isFunction(r) && r.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented());
		}
	},
	e.each({
		show : "fadeIn",
		hide : "fadeOut"
	}, function (t, i) {
		e.Widget.prototype["_" + t] = function (s, n, a) {
			"string" == typeof n && (n = {
					effect : n
				});
			var r,
			o = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
			n = n || {},
			"number" == typeof n && (n = {
					duration : n
				}),
			r = !e.isEmptyObject(n),
			n.complete = a,
			n.delay && s.delay(n.delay),
			r && e.effects && e.effects.effect[o] ? s[t](n) : o !== t && s[o] ? s[o](n.duration, n.easing, a) : s.queue(function (i) {
				e(this)[t](),
				a && a.call(s[0]),
				i();
			});
		};
	});
})(jQuery);
(function (e) {
	var t = !1;
	e(document).mouseup(function () {
		t = !1;
	}),
	e.widget("ui.mouse", {
		version : "1.10.3",
		options : {
			cancel : "input,textarea,button,select,option",
			distance : 1,
			delay : 0
		},
		_mouseInit : function () {
			var t = this;
			this.element.bind("mousedown." + this.widgetName, function (e) {
				return t._mouseDown(e);
			}).bind("click." + this.widgetName, function (i) {
				return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined;
			}),
			this.started = !1;
		},
		_mouseDestroy : function () {
			this.element.unbind("." + this.widgetName),
			this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
		},
		_mouseDown : function (i) {
			if (!t) {
				this._mouseStarted && this._mouseUp(i),
				this._mouseDownEvent = i;
				var s = this,
				n = 1 === i.which,
				a = "string" == typeof this.options.cancel && i.target.nodeName ? e(i.target).closest(this.options.cancel).length : !1;
				return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
								s.mouseDelayMet = !0;
							}, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === e.data(i.target, this.widgetName + ".preventClickEvent") && e.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
						return s._mouseMove(e);
					}, this._mouseUpDelegate = function (e) {
						return s._mouseUp(e);
					}, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)) : !0;
			}
		},
		_mouseMove : function (t) {
			return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted);
		},
		_mouseUp : function (t) {
			return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
			this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)),
			!1;
		},
		_mouseDistanceMet : function (e) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance;
		},
		_mouseDelayMet : function () {
			return this.mouseDelayMet;
		},
		_mouseStart : function () {},
		_mouseDrag : function () {},
		_mouseStop : function () {},
		_mouseCapture : function () {
			return !0;
		}
	});
})(jQuery);
(function (t, e) {
	function i(t, e, i) {
		return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)];
	}
	function s(e, i) {
		return parseInt(t.css(e, i), 10) || 0;
	}
	function n(e) {
		var i = e[0];
		return 9 === i.nodeType ? {
			width : e.width(),
			height : e.height(),
			offset : {
				top : 0,
				left : 0
			}
		}
		 : t.isWindow(i) ? {
			width : e.width(),
			height : e.height(),
			offset : {
				top : e.scrollTop(),
				left : e.scrollLeft()
			}
		}
		 : i.preventDefault ? {
			width : 0,
			height : 0,
			offset : {
				top : i.pageY,
				left : i.pageX
			}
		}
		 : {
			width : e.outerWidth(),
			height : e.outerHeight(),
			offset : e.offset()
		};
	}
	t.ui = t.ui || {};
	var a,
	o = Math.max,
	r = Math.abs,
	h = Math.round,
	l = /left|center|right/,
	c = /top|center|bottom/,
	u = /[\+\-]\d+(\.[\d]+)?%?/,
	d = /^\w+/,
	p = /%$/,
	f = t.fn.position;
	t.position = {
		scrollbarWidth : function () {
			if (a !== e) {
				return a;
			}
			var i,
			s,
			n = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
			o = n.children()[0];
			return t("body").append(n),
			i = o.offsetWidth,
			n.css("overflow", "scroll"),
			s = o.offsetWidth,
			i === s && (s = n[0].clientWidth),
			n.remove(),
			a = i - s;
		},
		getScrollInfo : function (e) {
			var i = e.isWindow ? "" : e.element.css("overflow-x"),
			s = e.isWindow ? "" : e.element.css("overflow-y"),
			n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
			a = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
			return {
				width : a ? t.position.scrollbarWidth() : 0,
				height : n ? t.position.scrollbarWidth() : 0
			};
		},
		getWithinInfo : function (e) {
			var i = t(e || window),
			s = t.isWindow(i[0]);
			return {
				element : i,
				isWindow : s,
				offset : i.offset() || {
					left : 0,
					top : 0
				},
				scrollLeft : i.scrollLeft(),
				scrollTop : i.scrollTop(),
				width : s ? i.width() : i.outerWidth(),
				height : s ? i.height() : i.outerHeight()
			};
		}
	},
	t.fn.position = function (e) {
		if (!e || !e.of) {
			return f.apply(this, arguments);
		}
		e = t.extend({}, e);
		var a,
		p,
		m,
		g,
		v,
		b,
		_ = t(e.of),
		y = t.position.getWithinInfo(e.within),
		w = t.position.getScrollInfo(y),
		x = (e.collision || "flip").split(" "),
		k = {};
		return b = n(_),
		_[0].preventDefault && (e.at = "left top"),
		p = b.width,
		m = b.height,
		g = b.offset,
		v = t.extend({}, g),
		t.each(["my", "at"], function () {
			var t,
			i,
			s = (e[this] || "").split(" ");
			1 === s.length && (s = l.test(s[0]) ? s.concat(["center"]) : c.test(s[0]) ? ["center"].concat(s) : ["center", "center"]),
			s[0] = l.test(s[0]) ? s[0] : "center",
			s[1] = c.test(s[1]) ? s[1] : "center",
			t = u.exec(s[0]),
			i = u.exec(s[1]),
			k[this] = [t ? t[0] : 0, i ? i[0] : 0],
			e[this] = [d.exec(s[0])[0], d.exec(s[1])[0]];
		}),
		1 === x.length && (x[1] = x[0]),
		"right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2),
		"bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2),
		a = i(k.at, p, m),
		v.left += a[0],
		v.top += a[1],
		this.each(function () {
			var n,
			l,
			c = t(this),
			u = c.outerWidth(),
			d = c.outerHeight(),
			f = s(this, "marginLeft"),
			b = s(this, "marginTop"),
			D = u + f + s(this, "marginRight") + w.width,
			T = d + b + s(this, "marginBottom") + w.height,
			C = t.extend({}, v),
			M = i(k.my, c.outerWidth(), c.outerHeight());
			"right" === e.my[0] ? C.left -= u : "center" === e.my[0] && (C.left -= u / 2),
			"bottom" === e.my[1] ? C.top -= d : "center" === e.my[1] && (C.top -= d / 2),
			C.left += M[0],
			C.top += M[1],
			t.support.offsetFractions || (C.left = h(C.left), C.top = h(C.top)),
			n = {
				marginLeft : f,
				marginTop : b
			},
			t.each(["left", "top"], function (i, s) {
				t.ui.position[x[i]] && t.ui.position[x[i]][s](C, {
					targetWidth : p,
					targetHeight : m,
					elemWidth : u,
					elemHeight : d,
					collisionPosition : n,
					collisionWidth : D,
					collisionHeight : T,
					offset : [a[0] + M[0], a[1] + M[1]],
					my : e.my,
					at : e.at,
					within : y,
					elem : c
				});
			}),
			e.using && (l = function (t) {
				var i = g.left - C.left,
				s = i + p - u,
				n = g.top - C.top,
				a = n + m - d,
				h = {
					target : {
						element : _,
						left : g.left,
						top : g.top,
						width : p,
						height : m
					},
					element : {
						element : c,
						left : C.left,
						top : C.top,
						width : u,
						height : d
					},
					horizontal : 0 > s ? "left" : i > 0 ? "right" : "center",
					vertical : 0 > a ? "top" : n > 0 ? "bottom" : "middle"
				};
				u > p && p > r(i + s) && (h.horizontal = "center"),
				d > m && m > r(n + a) && (h.vertical = "middle"),
				h.important = o(r(i), r(s)) > o(r(n), r(a)) ? "horizontal" : "vertical",
				e.using.call(this, t, h);
			}),
			c.offset(t.extend(C, {
					using : l
				}));
		});
	},
	t.ui.position = {
		fit : {
			left : function (t, e) {
				var i,
				s = e.within,
				n = s.isWindow ? s.scrollLeft : s.offset.left,
				a = s.width,
				r = t.left - e.collisionPosition.marginLeft,
				h = n - r,
				l = r + e.collisionWidth - a - n;
				e.collisionWidth > a ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - a - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = o(t.left - r, t.left);
			},
			top : function (t, e) {
				var i,
				s = e.within,
				n = s.isWindow ? s.scrollTop : s.offset.top,
				a = e.within.height,
				r = t.top - e.collisionPosition.marginTop,
				h = n - r,
				l = r + e.collisionHeight - a - n;
				e.collisionHeight > a ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - a - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = o(t.top - r, t.top);
			}
		},
		flip : {
			left : function (t, e) {
				var i,
				s,
				n = e.within,
				a = n.offset.left + n.scrollLeft,
				o = n.width,
				h = n.isWindow ? n.scrollLeft : n.offset.left,
				l = t.left - e.collisionPosition.marginLeft,
				c = l - h,
				u = l + e.collisionWidth - o - h,
				d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
				p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
				f = -2 * e.offset[0];
				0 > c ? (i = t.left + d + p + f + e.collisionWidth - o - a, (0 > i || r(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || u > r(s)) && (t.left += d + p + f));
			},
			top : function (t, e) {
				var i,
				s,
				n = e.within,
				a = n.offset.top + n.scrollTop,
				o = n.height,
				h = n.isWindow ? n.scrollTop : n.offset.top,
				l = t.top - e.collisionPosition.marginTop,
				c = l - h,
				u = l + e.collisionHeight - o - h,
				d = "top" === e.my[1],
				p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
				f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
				m = -2 * e.offset[1];
				0 > c ? (s = t.top + p + f + m + e.collisionHeight - o - a, t.top + p + f + m > c && (0 > s || r(c) > s) && (t.top += p + f + m)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - h, t.top + p + f + m > u && (i > 0 || u > r(i)) && (t.top += p + f + m));
			}
		},
		flipfit : {
			left : function () {
				t.ui.position.flip.left.apply(this, arguments),
				t.ui.position.fit.left.apply(this, arguments);
			},
			top : function () {
				t.ui.position.flip.top.apply(this, arguments),
				t.ui.position.fit.top.apply(this, arguments);
			}
		}
	},
	function () {
		var e,
		i,
		s,
		n,
		a,
		o = document.getElementsByTagName("body")[0],
		r = document.createElement("div");
		e = document.createElement(o ? "div" : "body"),
		s = {
			visibility : "hidden",
			width : 0,
			height : 0,
			border : 0,
			margin : 0,
			background : "none"
		},
		o && t.extend(s, {
			position : "absolute",
			left : "-1000px",
			top : "-1000px"
		});
		for (a in s) {
			e.style[a] = s[a];
		}
		e.appendChild(r),
		i = o || document.documentElement,
		i.insertBefore(e, i.firstChild),
		r.style.cssText = "position: absolute; left: 10.7432222px;",
		n = t(r).offset().left,
		t.support.offsetFractions = n > 10 && 11 > n,
		e.innerHTML = "",
		i.removeChild(e);
	}
	();
})(jQuery);
(function (e) {
	e.widget("ui.draggable", e.ui.mouse, {
		version : "1.10.3",
		widgetEventPrefix : "drag",
		options : {
			addClasses : !0,
			appendTo : "parent",
			axis : !1,
			connectToSortable : !1,
			containment : !1,
			cursor : "auto",
			cursorAt : !1,
			grid : !1,
			handle : !1,
			helper : "original",
			iframeFix : !1,
			opacity : !1,
			refreshPositions : !1,
			revert : !1,
			revertDuration : 500,
			scope : "default",
			scroll : !0,
			scrollSensitivity : 20,
			scrollSpeed : 20,
			snap : !1,
			snapMode : "both",
			snapTolerance : 20,
			stack : !1,
			zIndex : !1,
			drag : null,
			start : null,
			stop : null
		},
		_create : function () {
			"original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"),
			this.options.addClasses && this.element.addClass("ui-draggable"),
			this.options.disabled && this.element.addClass("ui-draggable-disabled"),
			this._mouseInit();
		},
		_destroy : function () {
			this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
			this._mouseDestroy();
		},
		_mouseCapture : function (t) {
			var i = this.options;
			return this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function () {
						e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
							width : this.offsetWidth + "px",
							height : this.offsetHeight + "px",
							position : "absolute",
							opacity : "0.001",
							zIndex : 1000
						}).css(e(this).offset()).appendTo("body");
					}), !0) : !1);
		},
		_mouseStart : function (t) {
			var i = this.options;
			return this.helper = this._createHelper(t),
			this.helper.addClass("ui-draggable-dragging"),
			this._cacheHelperProportions(),
			e.ui.ddmanager && (e.ui.ddmanager.current = this),
			this._cacheMargins(),
			this.cssPosition = this.helper.css("position"),
			this.scrollParent = this.helper.scrollParent(),
			this.offsetParent = this.helper.offsetParent(),
			this.offsetParentCssPosition = this.offsetParent.css("position"),
			this.offset = this.positionAbs = this.element.offset(),
			this.offset = {
				top : this.offset.top - this.margins.top,
				left : this.offset.left - this.margins.left
			},
			this.offset.scroll = !1,
			e.extend(this.offset, {
				click : {
					left : t.pageX - this.offset.left,
					top : t.pageY - this.offset.top
				},
				parent : this._getParentOffset(),
				relative : this._getRelativeOffset()
			}),
			this.originalPosition = this.position = this._generatePosition(t),
			this.originalPageX = t.pageX,
			this.originalPageY = t.pageY,
			i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
			this._setContainment(),
			this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0);
		},
		_mouseDrag : function (t, i) {
			if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) {
				var s = this._uiHash();
				if (this._trigger("drag", t, s) === !1) {
					return this._mouseUp({}),
					!1;
				}
				this.position = s.position;
			}
			return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
			this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
			e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
			!1;
		},
		_mouseStop : function (t) {
			var i = this,
			s = !1;
			return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)),
			this.dropped && (s = this.dropped, this.dropped = !1),
			"original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
					i._trigger("stop", t) !== !1 && i._clear();
				}) : this._trigger("stop", t) !== !1 && this._clear(), !1) : !1;
		},
		_mouseUp : function (t) {
			return e("div.ui-draggable-iframeFix").each(function () {
				this.parentNode.removeChild(this);
			}),
			e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t),
			e.ui.mouse.prototype._mouseUp.call(this, t);
		},
		cancel : function () {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
			this;
		},
		_getHandle : function (t) {
			return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0;
		},
		_createHelper : function (t) {
			var i = this.options,
			s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
			return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo),
			s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"),
			s;
		},
		_adjustOffsetFromHelper : function (t) {
			"string" == typeof t && (t = t.split(" ")),
			e.isArray(t) && (t = {
					left : +t[0],
					top : +t[1] || 0
				}),
			"left" in t && (this.offset.click.left = t.left + this.margins.left),
			"right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
			"top" in t && (this.offset.click.top = t.top + this.margins.top),
			"bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
		},
		_getParentOffset : function () {
			var t = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()),
			(this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
					top : 0,
					left : 0
				}), {
				top : t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left : t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			};
		},
		_getRelativeOffset : function () {
			if ("relative" === this.cssPosition) {
				var e = this.element.position();
				return {
					top : e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left : e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				};
			}
			return {
				top : 0,
				left : 0
			};
		},
		_cacheMargins : function () {
			this.margins = {
				left : parseInt(this.element.css("marginLeft"), 10) || 0,
				top : parseInt(this.element.css("marginTop"), 10) || 0,
				right : parseInt(this.element.css("marginRight"), 10) || 0,
				bottom : parseInt(this.element.css("marginBottom"), 10) || 0
			};
		},
		_cacheHelperProportions : function () {
			this.helperProportions = {
				width : this.helper.outerWidth(),
				height : this.helper.outerHeight()
			};
		},
		_setContainment : function () {
			var t,
			i,
			s,
			n = this.options;
			return n.containment ? "window" === n.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === n.containment ? (this.containment = [0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : n.containment.constructor === Array ? (this.containment = n.containment, undefined) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), undefined) : (this.containment = null, undefined);
		},
		_convertPositionTo : function (t, i) {
			i || (i = this.position);
			var s = "absolute" === t ? 1 : -1,
			n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
			return this.offset.scroll || (this.offset.scroll = {
					top : n.scrollTop(),
					left : n.scrollLeft()
				}), {
				top : i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s,
				left : i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s
			};
		},
		_generatePosition : function (t) {
			var i,
			s,
			n,
			a,
			o = this.options,
			r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
			h = t.pageX,
			l = t.pageY;
			return this.offset.scroll || (this.offset.scroll = {
					top : r.scrollTop(),
					left : r.scrollLeft()
				}),
			this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a)), {
				top : l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
				left : h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
			};
		},
		_clear : function () {
			this.helper.removeClass("ui-draggable-dragging"),
			this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
			this.helper = null,
			this.cancelHelperRemoval = !1;
		},
		_trigger : function (t, i, s) {
			return s = s || this._uiHash(),
			e.ui.plugin.call(this, t, [i, s]),
			"drag" === t && (this.positionAbs = this._convertPositionTo("absolute")),
			e.Widget.prototype._trigger.call(this, t, i, s);
		},
		plugins : {},
		_uiHash : function () {
			return {
				helper : this.helper,
				position : this.position,
				originalPosition : this.originalPosition,
				offset : this.positionAbs
			};
		}
	}),
	e.ui.plugin.add("draggable", "connectToSortable", {
		start : function (t, i) {
			var s = e(this).data("ui-draggable"),
			n = s.options,
			a = e.extend({}, i, {
					item : s.element
				});
			s.sortables = [],
			e(n.connectToSortable).each(function () {
				var i = e.data(this, "ui-sortable");
				i && !i.options.disabled && (s.sortables.push({
						instance : i,
						shouldRevert : i.options.revert
					}), i.refreshPositions(), i._trigger("activate", t, a));
			});
		},
		stop : function (t, i) {
			var s = e(this).data("ui-draggable"),
			n = e.extend({}, i, {
					item : s.element
				});
			e.each(s.sortables, function () {
				this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({
						top : "auto",
						left : "auto"
					})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, n));
			});
		},
		drag : function (t, i) {
			var s = e(this).data("ui-draggable"),
			n = this;
			e.each(s.sortables, function () {
				var a = !1,
				o = this;
				this.instance.positionAbs = s.positionAbs,
				this.instance.helperProportions = s.helperProportions,
				this.instance.offset.click = s.offset.click,
				this.instance._intersectsWith(this.instance.containerCache) && (a = !0, e.each(s.sortables, function () {
						return this.instance.positionAbs = s.positionAbs,
						this.instance.helperProportions = s.helperProportions,
						this.instance.offset.click = s.offset.click,
						this !== o && this.instance._intersectsWith(this.instance.containerCache) && e.contains(o.instance.element[0], this.instance.element[0]) && (a = !1),
						a;
					})),
				a ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
						return i.helper[0];
					}, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", t), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", t), s.dropped = !1);
			});
		}
	}),
	e.ui.plugin.add("draggable", "cursor", {
		start : function () {
			var t = e("body"),
			i = e(this).data("ui-draggable").options;
			t.css("cursor") && (i._cursor = t.css("cursor")),
			t.css("cursor", i.cursor);
		},
		stop : function () {
			var t = e(this).data("ui-draggable").options;
			t._cursor && e("body").css("cursor", t._cursor);
		}
	}),
	e.ui.plugin.add("draggable", "opacity", {
		start : function (t, i) {
			var s = e(i.helper),
			n = e(this).data("ui-draggable").options;
			s.css("opacity") && (n._opacity = s.css("opacity")),
			s.css("opacity", n.opacity);
		},
		stop : function (t, i) {
			var s = e(this).data("ui-draggable").options;
			s._opacity && e(i.helper).css("opacity", s._opacity);
		}
	}),
	e.ui.plugin.add("draggable", "scroll", {
		start : function () {
			var t = e(this).data("ui-draggable");
			t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset());
		},
		drag : function (t) {
			var i = e(this).data("ui-draggable"),
			s = i.options,
			n = !1;
			i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (t.pageY - e(document).scrollTop() < s.scrollSensitivity ? n = e(document).scrollTop(e(document).scrollTop() - s.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < s.scrollSensitivity && (n = e(document).scrollTop(e(document).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (t.pageX - e(document).scrollLeft() < s.scrollSensitivity ? n = e(document).scrollLeft(e(document).scrollLeft() - s.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < s.scrollSensitivity && (n = e(document).scrollLeft(e(document).scrollLeft() + s.scrollSpeed)))),
			n !== !1 && e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(i, t);
		}
	}),
	e.ui.plugin.add("draggable", "snap", {
		start : function () {
			var t = e(this).data("ui-draggable"),
			i = t.options;
			t.snapElements = [],
			e(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function () {
				var i = e(this),
				s = i.offset();
				this !== t.element[0] && t.snapElements.push({
					item : this,
					width : i.outerWidth(),
					height : i.outerHeight(),
					top : s.top,
					left : s.left
				});
			});
		},
		drag : function (t, i) {
			var s,
			n,
			a,
			o,
			r,
			h,
			l,
			u,
			c,
			d,
			p = e(this).data("ui-draggable"),
			f = p.options,
			m = f.snapTolerance,
			g = i.offset.left,
			v = g + p.helperProportions.width,
			b = i.offset.top,
			y = b + p.helperProportions.height;
			for (c = p.snapElements.length - 1; c >= 0; c--) {
				r = p.snapElements[c].left,
				h = r + p.snapElements[c].width,
				l = p.snapElements[c].top,
				u = l + p.snapElements[c].height,
				r - m > v || g > h + m || l - m > y || b > u + m || !e.contains(p.snapElements[c].item.ownerDocument, p.snapElements[c].item) ? (p.snapElements[c].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), {
							snapItem : p.snapElements[c].item
						})), p.snapElements[c].snapping = !1) : ("inner" !== f.snapMode && (s = m >= Math.abs(l - y), n = m >= Math.abs(u - b), a = m >= Math.abs(r - v), o = m >= Math.abs(h - g), s && (i.position.top = p._convertPositionTo("relative", {
									top : l - p.helperProportions.height,
									left : 0
								}).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
									top : u,
									left : 0
								}).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", {
									top : 0,
									left : r - p.helperProportions.width
								}).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
									top : 0,
									left : h
								}).left - p.margins.left)), d = s || n || a || o, "outer" !== f.snapMode && (s = m >= Math.abs(l - b), n = m >= Math.abs(u - y), a = m >= Math.abs(r - g), o = m >= Math.abs(h - v), s && (i.position.top = p._convertPositionTo("relative", {
									top : l,
									left : 0
								}).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
									top : u - p.helperProportions.height,
									left : 0
								}).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", {
									top : 0,
									left : r
								}).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
									top : 0,
									left : h - p.helperProportions.width
								}).left - p.margins.left)), !p.snapElements[c].snapping && (s || n || a || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), {
							snapItem : p.snapElements[c].item
						})), p.snapElements[c].snapping = s || n || a || o || d);
			}
		}
	}),
	e.ui.plugin.add("draggable", "stack", {
		start : function () {
			var t,
			i = this.data("ui-draggable").options,
			s = e.makeArray(e(i.stack)).sort(function (t, i) {
					return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0);
				});
			s.length && (t = parseInt(e(s[0]).css("zIndex"), 10) || 0, e(s).each(function (i) {
					e(this).css("zIndex", t + i);
				}), this.css("zIndex", t + s.length));
		}
	}),
	e.ui.plugin.add("draggable", "zIndex", {
		start : function (t, i) {
			var s = e(i.helper),
			n = e(this).data("ui-draggable").options;
			s.css("zIndex") && (n._zIndex = s.css("zIndex")),
			s.css("zIndex", n.zIndex);
		},
		stop : function (t, i) {
			var s = e(this).data("ui-draggable").options;
			s._zIndex && e(i.helper).css("zIndex", s._zIndex);
		}
	});
})(jQuery);
(function (e) {
	function t(e) {
		return parseInt(e, 10) || 0;
	}
	function i(e) {
		return !isNaN(parseInt(e, 10));
	}
	e.widget("ui.resizable", e.ui.mouse, {
		version : "1.10.3",
		widgetEventPrefix : "resize",
		options : {
			alsoResize : !1,
			animate : !1,
			animateDuration : "slow",
			animateEasing : "swing",
			aspectRatio : !1,
			autoHide : !1,
			containment : !1,
			ghost : !1,
			grid : !1,
			handles : "e,s,se",
			helper : !1,
			maxHeight : null,
			maxWidth : null,
			minHeight : 10,
			minWidth : 10,
			zIndex : 90,
			resize : null,
			start : null,
			stop : null
		},
		_create : function () {
			var t,
			i,
			s,
			n,
			a,
			o = this,
			r = this.options;
			if (this.element.addClass("ui-resizable"), e.extend(this, {
					_aspectRatio : !!r.aspectRatio,
					aspectRatio : r.aspectRatio,
					originalElement : this.element,
					_proportionallyResizeElements : [],
					_helper : r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
				}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
							position : this.element.css("position"),
							width : this.element.outerWidth(),
							height : this.element.outerHeight(),
							top : this.element.css("top"),
							left : this.element.css("left")
						})), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
						marginLeft : this.originalElement.css("marginLeft"),
						marginTop : this.originalElement.css("marginTop"),
						marginRight : this.originalElement.css("marginRight"),
						marginBottom : this.originalElement.css("marginBottom")
					}), this.originalElement.css({
						marginLeft : 0,
						marginTop : 0,
						marginRight : 0,
						marginBottom : 0
					}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
							position : "static",
							zoom : 1,
							display : "block"
						})), this.originalElement.css({
						margin : this.originalElement.css("margin")
					}), this._proportionallyResize()), this.handles = r.handles || (e(".ui-resizable-handle", this.element).length ? {
						n : ".ui-resizable-n",
						e : ".ui-resizable-e",
						s : ".ui-resizable-s",
						w : ".ui-resizable-w",
						se : ".ui-resizable-se",
						sw : ".ui-resizable-sw",
						ne : ".ui-resizable-ne",
						nw : ".ui-resizable-nw"
					}
						 : "e,s,se"), this.handles.constructor === String) {
				for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), t = this.handles.split(","), this.handles = {}, i = 0; t.length > i; i++) {
					s = e.trim(t[i]),
					a = "ui-resizable-" + s,
					n = e("<div class='ui-resizable-handle " + a + "'></div>"),
					n.css({
						zIndex : r.zIndex
					}),
					"se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
					this.handles[s] = ".ui-resizable-" + s,
					this.element.append(n);
				}
			}
			this._renderAxis = function (t) {
				var i,
				s,
				n,
				a;
				t = t || this.element;
				for (i in this.handles) {
					this.handles[i].constructor === String && (this.handles[i] = e(this.handles[i], this.element).show()),
					this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = e(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(n, a), this._proportionallyResize()),
					e(this.handles[i]).length;
				}
			},
			this._renderAxis(this.element),
			this._handles = e(".ui-resizable-handle", this.element).disableSelection(),
			this._handles.mouseover(function () {
				o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1] ? n[1] : "se");
			}),
			r.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
					r.disabled || (e(this).removeClass("ui-resizable-autohide"), o._handles.show());
				}).mouseleave(function () {
					r.disabled || o.resizing || (e(this).addClass("ui-resizable-autohide"), o._handles.hide());
				})),
			this._mouseInit();
		},
		_destroy : function () {
			this._mouseDestroy();
			var t,
			i = function (t) {
				e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
			};
			return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
					position : t.css("position"),
					width : t.outerWidth(),
					height : t.outerHeight(),
					top : t.css("top"),
					left : t.css("left")
				}).insertAfter(t), t.remove()),
			this.originalElement.css("resize", this.originalResizeStyle),
			i(this.originalElement),
			this;
		},
		_mouseCapture : function (t) {
			var i,
			s,
			n = !1;
			for (i in this.handles) {
				s = e(this.handles[i])[0],
				(s === t.target || e.contains(s, t.target)) && (n = !0);
			}
			return !this.options.disabled && n;
		},
		_mouseStart : function (i) {
			var s,
			n,
			a,
			o = this.options,
			r = this.element.position(),
			h = this.element;
			return this.resizing = !0,
			/absolute/.test(h.css("position")) ? h.css({
				position : "absolute",
				top : h.css("top"),
				left : h.css("left")
			}) : h.is(".ui-draggable") && h.css({
				position : "absolute",
				top : r.top,
				left : r.left
			}),
			this._renderProxy(),
			s = t(this.helper.css("left")),
			n = t(this.helper.css("top")),
			o.containment && (s += e(o.containment).scrollLeft() || 0, n += e(o.containment).scrollTop() || 0),
			this.offset = this.helper.offset(),
			this.position = {
				left : s,
				top : n
			},
			this.size = this._helper ? {
				width : h.outerWidth(),
				height : h.outerHeight()
			}
			 : {
				width : h.width(),
				height : h.height()
			},
			this.originalSize = this._helper ? {
				width : h.outerWidth(),
				height : h.outerHeight()
			}
			 : {
				width : h.width(),
				height : h.height()
			},
			this.originalPosition = {
				left : s,
				top : n
			},
			this.sizeDiff = {
				width : h.outerWidth() - h.width(),
				height : h.outerHeight() - h.height()
			},
			this.originalMousePosition = {
				left : i.pageX,
				top : i.pageY
			},
			this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
			a = e(".ui-resizable-" + this.axis).css("cursor"),
			e("body").css("cursor", "auto" === a ? this.axis + "-resize" : a),
			h.addClass("ui-resizable-resizing"),
			this._propagate("start", i),
			!0;
		},
		_mouseDrag : function (t) {
			var i,
			s = this.helper,
			n = {},
			a = this.originalMousePosition,
			o = this.axis,
			r = this.position.top,
			h = this.position.left,
			l = this.size.width,
			u = this.size.height,
			c = t.pageX - a.left || 0,
			d = t.pageY - a.top || 0,
			p = this._change[o];
			return p ? (i = p.apply(this, [t, c, d]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), this.position.top !== r && (n.top = this.position.top + "px"), this.position.left !== h && (n.left = this.position.left + "px"), this.size.width !== l && (n.width = this.size.width + "px"), this.size.height !== u && (n.height = this.size.height + "px"), s.css(n), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(n) || this._trigger("resize", t, this.ui()), !1) : !1;
		},
		_mouseStop : function (t) {
			this.resizing = !1;
			var i,
			s,
			n,
			a,
			o,
			r,
			h,
			l = this.options,
			u = this;
			return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && e.ui.hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, a = s ? 0 : u.sizeDiff.width, o = {
					width : u.helper.width() - a,
					height : u.helper.height() - n
				}, r = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, h = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, l.animate || this.element.css(e.extend(o, {
						top : h,
						left : r
					})), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !l.animate && this._proportionallyResize()),
			e("body").css("cursor", "auto"),
			this.element.removeClass("ui-resizable-resizing"),
			this._propagate("stop", t),
			this._helper && this.helper.remove(),
			!1;
		},
		_updateVirtualBoundaries : function (e) {
			var t,
			s,
			n,
			a,
			o,
			r = this.options;
			o = {
				minWidth : i(r.minWidth) ? r.minWidth : 0,
				maxWidth : i(r.maxWidth) ? r.maxWidth : 1 / 0,
				minHeight : i(r.minHeight) ? r.minHeight : 0,
				maxHeight : i(r.maxHeight) ? r.maxHeight : 1 / 0
			},
			(this._aspectRatio || e) && (t = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, s = o.maxHeight * this.aspectRatio, a = o.maxWidth / this.aspectRatio, t > o.minWidth && (o.minWidth = t), n > o.minHeight && (o.minHeight = n), o.maxWidth > s && (o.maxWidth = s), o.maxHeight > a && (o.maxHeight = a)),
			this._vBoundaries = o;
		},
		_updateCache : function (e) {
			this.offset = this.helper.offset(),
			i(e.left) && (this.position.left = e.left),
			i(e.top) && (this.position.top = e.top),
			i(e.height) && (this.size.height = e.height),
			i(e.width) && (this.size.width = e.width);
		},
		_updateRatio : function (e) {
			var t = this.position,
			s = this.size,
			n = this.axis;
			return i(e.height) ? e.width = e.height * this.aspectRatio : i(e.width) && (e.height = e.width / this.aspectRatio),
			"sw" === n && (e.left = t.left + (s.width - e.width), e.top = null),
			"nw" === n && (e.top = t.top + (s.height - e.height), e.left = t.left + (s.width - e.width)),
			e;
		},
		_respectSize : function (e) {
			var t = this._vBoundaries,
			s = this.axis,
			n = i(e.width) && t.maxWidth && t.maxWidth < e.width,
			a = i(e.height) && t.maxHeight && t.maxHeight < e.height,
			o = i(e.width) && t.minWidth && t.minWidth > e.width,
			r = i(e.height) && t.minHeight && t.minHeight > e.height,
			h = this.originalPosition.left + this.originalSize.width,
			l = this.position.top + this.size.height,
			u = /sw|nw|w/.test(s),
			c = /nw|ne|n/.test(s);
			return o && (e.width = t.minWidth),
			r && (e.height = t.minHeight),
			n && (e.width = t.maxWidth),
			a && (e.height = t.maxHeight),
			o && u && (e.left = h - t.minWidth),
			n && u && (e.left = h - t.maxWidth),
			r && c && (e.top = l - t.minHeight),
			a && c && (e.top = l - t.maxHeight),
			e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null,
			e;
		},
		_proportionallyResize : function () {
			if (this._proportionallyResizeElements.length) {
				var e,
				t,
				i,
				s,
				n,
				a = this.helper || this.element;
				for (e = 0; this._proportionallyResizeElements.length > e; e++) {
					if (n = this._proportionallyResizeElements[e], !this.borderDif) {
						for (this.borderDif = [], i = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], t = 0; i.length > t; t++) {
							this.borderDif[t] = (parseInt(i[t], 10) || 0) + (parseInt(s[t], 10) || 0);
						}
					}
					n.css({
						height : a.height() - this.borderDif[0] - this.borderDif[2] || 0,
						width : a.width() - this.borderDif[1] - this.borderDif[3] || 0
					});
				}
			}
		},
		_renderProxy : function () {
			var t = this.element,
			i = this.options;
			this.elementOffset = t.offset(),
			this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
					width : this.element.outerWidth() - 1,
					height : this.element.outerHeight() - 1,
					position : "absolute",
					left : this.elementOffset.left + "px",
					top : this.elementOffset.top + "px",
					zIndex : ++i.zIndex
				}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
		},
		_change : {
			e : function (e, t) {
				return {
					width : this.originalSize.width + t
				};
			},
			w : function (e, t) {
				var i = this.originalSize,
				s = this.originalPosition;
				return {
					left : s.left + t,
					width : i.width - t
				};
			},
			n : function (e, t, i) {
				var s = this.originalSize,
				n = this.originalPosition;
				return {
					top : n.top + i,
					height : s.height - i
				};
			},
			s : function (e, t, i) {
				return {
					height : this.originalSize.height + i
				};
			},
			se : function (t, i, s) {
				return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s]));
			},
			sw : function (t, i, s) {
				return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s]));
			},
			ne : function (t, i, s) {
				return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s]));
			},
			nw : function (t, i, s) {
				return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s]));
			}
		},
		_propagate : function (t, i) {
			e.ui.plugin.call(this, t, [i, this.ui()]),
			"resize" !== t && this._trigger(t, i, this.ui());
		},
		plugins : {},
		ui : function () {
			return {
				originalElement : this.originalElement,
				element : this.element,
				helper : this.helper,
				position : this.position,
				size : this.size,
				originalSize : this.originalSize,
				originalPosition : this.originalPosition
			};
		}
	}),
	e.ui.plugin.add("resizable", "animate", {
		stop : function (t) {
			var i = e(this).data("ui-resizable"),
			s = i.options,
			n = i._proportionallyResizeElements,
			a = n.length && /textarea/i.test(n[0].nodeName),
			o = a && e.ui.hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
			r = a ? 0 : i.sizeDiff.width,
			h = {
				width : i.size.width - r,
				height : i.size.height - o
			},
			l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
			u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
			i.element.animate(e.extend(h, u && l ? {
					top : u,
					left : l
				}
					 : {}), {
				duration : s.animateDuration,
				easing : s.animateEasing,
				step : function () {
					var s = {
						width : parseInt(i.element.css("width"), 10),
						height : parseInt(i.element.css("height"), 10),
						top : parseInt(i.element.css("top"), 10),
						left : parseInt(i.element.css("left"), 10)
					};
					n && n.length && e(n[0]).css({
						width : s.width,
						height : s.height
					}),
					i._updateCache(s),
					i._propagate("resize", t);
				}
			});
		}
	}),
	e.ui.plugin.add("resizable", "containment", {
		start : function () {
			var i,
			s,
			n,
			a,
			o,
			r,
			h,
			l = e(this).data("ui-resizable"),
			u = l.options,
			c = l.element,
			d = u.containment,
			p = d instanceof e ? d.get(0) : /parent/.test(d) ? c.parent().get(0) : d;
			p && (l.containerElement = e(p), /document/.test(d) || d === document ? (l.containerOffset = {
						left : 0,
						top : 0
					}, l.containerPosition = {
						left : 0,
						top : 0
					}, l.parentData = {
						element : e(document),
						left : 0,
						top : 0,
						width : e(document).width(),
						height : e(document).height() || document.body.parentNode.scrollHeight
					}) : (i = e(p), s = [], e(["Top", "Right", "Left", "Bottom"]).each(function (e, n) {
						s[e] = t(i.css("padding" + n));
					}), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = {
						height : i.innerHeight() - s[3],
						width : i.innerWidth() - s[1]
					}, n = l.containerOffset, a = l.containerSize.height, o = l.containerSize.width, r = e.ui.hasScroll(p, "left") ? p.scrollWidth : o, h = e.ui.hasScroll(p) ? p.scrollHeight : a, l.parentData = {
						element : p,
						left : n.left,
						top : n.top,
						width : r,
						height : h
					}));
		},
		resize : function (t) {
			var i,
			s,
			n,
			a,
			o = e(this).data("ui-resizable"),
			r = o.options,
			h = o.containerOffset,
			l = o.position,
			u = o._aspectRatio || t.shiftKey,
			c = {
				top : 0,
				left : 0
			},
			d = o.containerElement;
			d[0] !== document && /static/.test(d.css("position")) && (c = h),
			l.left < (o._helper ? h.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - h.left : o.position.left - c.left), u && (o.size.height = o.size.width / o.aspectRatio), o.position.left = r.helper ? h.left : 0),
			l.top < (o._helper ? h.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - h.top : o.position.top), u && (o.size.width = o.size.height * o.aspectRatio), o.position.top = o._helper ? h.top : 0),
			o.offset.left = o.parentData.left + o.position.left,
			o.offset.top = o.parentData.top + o.position.top,
			i = Math.abs((o._helper ? o.offset.left - c.left : o.offset.left - c.left) + o.sizeDiff.width),
			s = Math.abs((o._helper ? o.offset.top - c.top : o.offset.top - h.top) + o.sizeDiff.height),
			n = o.containerElement.get(0) === o.element.parent().get(0),
			a = /relative|absolute/.test(o.containerElement.css("position")),
			n && a && (i -= o.parentData.left),
			i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, u && (o.size.height = o.size.width / o.aspectRatio)),
			s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, u && (o.size.width = o.size.height * o.aspectRatio));
		},
		stop : function () {
			var t = e(this).data("ui-resizable"),
			i = t.options,
			s = t.containerOffset,
			n = t.containerPosition,
			a = t.containerElement,
			o = e(t.helper),
			r = o.offset(),
			h = o.outerWidth() - t.sizeDiff.width,
			l = o.outerHeight() - t.sizeDiff.height;
			t._helper && !i.animate && /relative/.test(a.css("position")) && e(this).css({
				left : r.left - n.left - s.left,
				width : h,
				height : l
			}),
			t._helper && !i.animate && /static/.test(a.css("position")) && e(this).css({
				left : r.left - n.left - s.left,
				width : h,
				height : l
			});
		}
	}),
	e.ui.plugin.add("resizable", "alsoResize", {
		start : function () {
			var t = e(this).data("ui-resizable"),
			i = t.options,
			s = function (t) {
				e(t).each(function () {
					var t = e(this);
					t.data("ui-resizable-alsoresize", {
						width : parseInt(t.width(), 10),
						height : parseInt(t.height(), 10),
						left : parseInt(t.css("left"), 10),
						top : parseInt(t.css("top"), 10)
					});
				});
			};
			"object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : e.each(i.alsoResize, function (e) {
				s(e);
			});
		},
		resize : function (t, i) {
			var s = e(this).data("ui-resizable"),
			n = s.options,
			a = s.originalSize,
			o = s.originalPosition,
			r = {
				height : s.size.height - a.height || 0,
				width : s.size.width - a.width || 0,
				top : s.position.top - o.top || 0,
				left : s.position.left - o.left || 0
			},
			h = function (t, s) {
				e(t).each(function () {
					var t = e(this),
					n = e(this).data("ui-resizable-alsoresize"),
					a = {},
					o = s && s.length ? s : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
					e.each(o, function (e, t) {
						var i = (n[t] || 0) + (r[t] || 0);
						i && i >= 0 && (a[t] = i || null);
					}),
					t.css(a);
				});
			};
			"object" != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize) : e.each(n.alsoResize, function (e, t) {
				h(e, t);
			});
		},
		stop : function () {
			e(this).removeData("resizable-alsoresize");
		}
	}),
	e.ui.plugin.add("resizable", "ghost", {
		start : function () {
			var t = e(this).data("ui-resizable"),
			i = t.options,
			s = t.size;
			t.ghost = t.originalElement.clone(),
			t.ghost.css({
				opacity : 0.25,
				display : "block",
				position : "relative",
				height : s.height,
				width : s.width,
				margin : 0,
				left : 0,
				top : 0
			}).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""),
			t.ghost.appendTo(t.helper);
		},
		resize : function () {
			var t = e(this).data("ui-resizable");
			t.ghost && t.ghost.css({
				position : "relative",
				height : t.size.height,
				width : t.size.width
			});
		},
		stop : function () {
			var t = e(this).data("ui-resizable");
			t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));
		}
	}),
	e.ui.plugin.add("resizable", "grid", {
		resize : function () {
			var t = e(this).data("ui-resizable"),
			i = t.options,
			s = t.size,
			n = t.originalSize,
			a = t.originalPosition,
			o = t.axis,
			r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
			h = r[0] || 1,
			l = r[1] || 1,
			u = Math.round((s.width - n.width) / h) * h,
			c = Math.round((s.height - n.height) / l) * l,
			d = n.width + u,
			p = n.height + c,
			f = i.maxWidth && d > i.maxWidth,
			m = i.maxHeight && p > i.maxHeight,
			g = i.minWidth && i.minWidth > d,
			v = i.minHeight && i.minHeight > p;
			i.grid = r,
			g && (d += h),
			v && (p += l),
			f && (d -= h),
			m && (p -= l),
			/^(se|s|e)$/.test(o) ? (t.size.width = d, t.size.height = p) : /^(ne)$/.test(o) ? (t.size.width = d, t.size.height = p, t.position.top = a.top - c) : /^(sw)$/.test(o) ? (t.size.width = d, t.size.height = p, t.position.left = a.left - u) : (t.size.width = d, t.size.height = p, t.position.top = a.top - c, t.position.left = a.left - u);
		}
	});
})(jQuery);
(function (t) {
	function e(t, e, i) {
		return t > e && e + i > t;
	}
	function i(t) {
		return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"));
	}
	t.widget("ui.sortable", t.ui.mouse, {
		version : "1.10.3",
		widgetEventPrefix : "sort",
		ready : !1,
		options : {
			appendTo : "parent",
			axis : !1,
			connectWith : !1,
			containment : !1,
			cursor : "auto",
			cursorAt : !1,
			dropOnEmpty : !0,
			forcePlaceholderSize : !1,
			forceHelperSize : !1,
			grid : !1,
			handle : !1,
			helper : "original",
			items : "> *",
			opacity : !1,
			placeholder : !1,
			revert : !1,
			scroll : !0,
			scrollSensitivity : 20,
			scrollSpeed : 20,
			scope : "default",
			tolerance : "intersect",
			zIndex : 1000,
			activate : null,
			beforeStop : null,
			change : null,
			deactivate : null,
			out : null,
			over : null,
			receive : null,
			remove : null,
			sort : null,
			start : null,
			stop : null,
			update : null
		},
		_create : function () {
			var t = this.options;
			this.containerCache = {},
			this.element.addClass("ui-sortable"),
			this.refresh(),
			this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1,
			this.offset = this.element.offset(),
			this._mouseInit(),
			this.ready = !0;
		},
		_destroy : function () {
			this.element.removeClass("ui-sortable ui-sortable-disabled"),
			this._mouseDestroy();
			for (var t = this.items.length - 1; t >= 0; t--) {
				this.items[t].item.removeData(this.widgetName + "-item");
			}
			return this;
		},
		_setOption : function (e, i) {
			"disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments);
		},
		_mouseCapture : function (e, i) {
			var s = null,
			n = !1,
			a = this;
			return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
					return t.data(this, a.widgetName + "-item") === a ? (s = t(this), !1) : undefined;
				}), t.data(e.target, a.widgetName + "-item") === a && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function () {
						this === e.target && (n = !0);
					}), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1);
		},
		_mouseStart : function (e, i, s) {
			var n,
			a,
			o = this.options;
			if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
					top : this.offset.top - this.margins.top,
					left : this.offset.left - this.margins.left
				}, t.extend(this.offset, {
					click : {
						left : e.pageX - this.offset.left,
						top : e.pageY - this.offset.top
					},
					parent : this._getParentOffset(),
					relative : this._getRelativeOffset()
				}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
					prev : this.currentItem.prev()[0],
					parent : this.currentItem.parent()[0]
				}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (a = this.document.find("body"), this.storedCursor = a.css("cursor"), a.css("cursor", o.cursor), this.storedStylesheet = t("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(a)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) {
				for (n = this.containers.length - 1; n >= 0; n--) {
					this.containers[n]._trigger("activate", e, this._uiHash(this));
				}
			}
			return t.ui.ddmanager && (t.ui.ddmanager.current = this),
			t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
			this.dragging = !0,
			this.helper.addClass("ui-sortable-helper"),
			this._mouseDrag(e),
			!0;
		},
		_mouseDrag : function (e) {
			var i,
			s,
			n,
			a,
			o = this.options,
			r = !1;
			for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + o.scrollSpeed : e.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + o.scrollSpeed : e.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (e.pageY - t(document).scrollTop() < o.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - o.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < o.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + o.scrollSpeed)), e.pageX - t(document).scrollLeft() < o.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - o.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < o.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + o.scrollSpeed))), r !== !1 && t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) {
				if (s = this.items[i], n = s.item[0], a = this._intersectsWithPointer(s), a && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === a ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
					if (this.direction = 1 === a ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) {
						break;
					}
					this._rearrange(e, s),
					this._trigger("change", e, this._uiHash());
					break;
				}
			}
			return this._contactContainers(e),
			t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
			this._trigger("sort", e, this._uiHash()),
			this.lastPositionAbs = this.positionAbs,
			!1;
		},
		_mouseStop : function (e, i) {
			if (e) {
				if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
					var s = this,
					n = this.placeholder.offset(),
					a = this.options.axis,
					o = {};
					a && "x" !== a || (o.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)),
					a && "y" !== a || (o.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)),
					this.reverting = !0,
					t(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function () {
						s._clear(e);
					});
				} else {
					this._clear(e, i);
				}
				return !1;
			}
		},
		cancel : function () {
			if (this.dragging) {
				this._mouseUp({
					target : null
				}),
				"original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
				for (var e = this.containers.length - 1; e >= 0; e--) {
					this.containers[e]._trigger("deactivate", null, this._uiHash(this)),
					this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0);
				}
			}
			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
					helper : null,
					dragging : !1,
					reverting : !1,
					_noFinalSort : null
				}), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)),
			this;
		},
		serialize : function (e) {
			var i = this._getItemsAsjQuery(e && e.connected),
			s = [];
			return e = e || {},
			t(i).each(function () {
				var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
				i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]));
			}),
			!s.length && e.key && s.push(e.key + "="),
			s.join("&");
		},
		toArray : function (e) {
			var i = this._getItemsAsjQuery(e && e.connected),
			s = [];
			return e = e || {},
			i.each(function () {
				s.push(t(e.item || this).attr(e.attribute || "id") || "");
			}),
			s;
		},
		_intersectsWith : function (t) {
			var e = this.positionAbs.left,
			i = e + this.helperProportions.width,
			s = this.positionAbs.top,
			n = s + this.helperProportions.height,
			a = t.left,
			o = a + t.width,
			r = t.top,
			h = r + t.height,
			l = this.offset.click.top,
			c = this.offset.click.left,
			u = "x" === this.options.axis || s + l > r && h > s + l,
			d = "y" === this.options.axis || e + c > a && o > e + c,
			p = u && d;
			return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > a && o > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2;
		},
		_intersectsWithPointer : function (t) {
			var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height),
			s = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width),
			n = i && s,
			a = this._getDragVerticalDirection(),
			o = this._getDragHorizontalDirection();
			return n ? this.floating ? o && "right" === o || "down" === a ? 2 : 1 : a && ("down" === a ? 2 : 1) : !1;
		},
		_intersectsWithSides : function (t) {
			var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
			s = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
			n = this._getDragVerticalDirection(),
			a = this._getDragHorizontalDirection();
			return this.floating && a ? "right" === a && s || "left" === a && !s : n && ("down" === n && i || "up" === n && !i);
		},
		_getDragVerticalDirection : function () {
			var t = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 !== t && (t > 0 ? "down" : "up");
		},
		_getDragHorizontalDirection : function () {
			var t = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 !== t && (t > 0 ? "right" : "left");
		},
		refresh : function (t) {
			return this._refreshItems(t),
			this.refreshPositions(),
			this;
		},
		_connectWith : function () {
			var t = this.options;
			return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith;
		},
		_getItemsAsjQuery : function (e) {
			var i,
			s,
			n,
			a,
			o = [],
			r = [],
			h = this._connectWith();
			if (h && e) {
				for (i = h.length - 1; i >= 0; i--) {
					for (n = t(h[i]), s = n.length - 1; s >= 0; s--) {
						a = t.data(n[s], this.widgetFullName),
						a && a !== this && !a.options.disabled && r.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
					}
				}
			}
			for (r.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
							options : this.options,
							item : this.currentItem
						}) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = r.length - 1; i >= 0; i--) {
				r[i][0].each(function () {
					o.push(this);
				});
			}
			return t(o);
		},
		_removeCurrentsFromItems : function () {
			var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
			this.items = t.grep(this.items, function (t) {
					for (var i = 0; e.length > i; i++) {
						if (e[i] === t.item[0]) {
							return !1;
						}
					}
					return !0;
				});
		},
		_refreshItems : function (e) {
			this.items = [],
			this.containers = [this];
			var i,
			s,
			n,
			a,
			o,
			r,
			h,
			l,
			c = this.items,
			u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
						item : this.currentItem
					}) : t(this.options.items, this.element), this]],
			d = this._connectWith();
			if (d && this.ready) {
				for (i = d.length - 1; i >= 0; i--) {
					for (n = t(d[i]), s = n.length - 1; s >= 0; s--) {
						a = t.data(n[s], this.widgetFullName),
						a && a !== this && !a.options.disabled && (u.push([t.isFunction(a.options.items) ? a.options.items.call(a.element[0], e, {
										item : this.currentItem
									}) : t(a.options.items, a.element), a]), this.containers.push(a));
					}
				}
			}
			for (i = u.length - 1; i >= 0; i--) {
				for (o = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) {
					h = t(r[s]),
					h.data(this.widgetName + "-item", o),
					c.push({
						item : h,
						instance : o,
						width : 0,
						height : 0,
						left : 0,
						top : 0
					});
				}
			}
		},
		refreshPositions : function (e) {
			this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			var i,
			s,
			n,
			a;
			for (i = this.items.length - 1; i >= 0; i--) {
				s = this.items[i],
				s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), a = n.offset(), s.left = a.left, s.top = a.top);
			}
			if (this.options.custom && this.options.custom.refreshContainers) {
				this.options.custom.refreshContainers.call(this);
			} else {
				for (i = this.containers.length - 1; i >= 0; i--) {
					a = this.containers[i].element.offset(),
					this.containers[i].containerCache.left = a.left,
					this.containers[i].containerCache.top = a.top,
					this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
					this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
				}
			}
			return this;
		},
		_createPlaceholder : function (e) {
			e = e || this;
			var i,
			s = e.options;
			s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
					element : function () {
						var s = e.currentItem[0].nodeName.toLowerCase(),
						n = t("<" + s + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
						return "tr" === s ? e.currentItem.children().each(function () {
							t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(n);
						}) : "img" === s && n.attr("src", e.currentItem.attr("src")),
						i || n.css("visibility", "hidden"),
						n;
					},
					update : function (t, n) {
						(!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)));
					}
				}),
			e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)),
			e.currentItem.after(e.placeholder),
			s.placeholder.update(e, e.placeholder);
		},
		_contactContainers : function (s) {
			var n,
			a,
			o,
			r,
			h,
			l,
			c,
			u,
			d,
			p,
			f = null,
			m = null;
			for (n = this.containers.length - 1; n >= 0; n--) {
				if (!t.contains(this.currentItem[0], this.containers[n].element[0])) {
					if (this._intersectsWith(this.containers[n].containerCache)) {
						if (f && t.contains(this.containers[n].element[0], f.element[0])) {
							continue;
						}
						f = this.containers[n],
						m = n;
					} else {
						this.containers[n].containerCache.over && (this.containers[n]._trigger("out", s, this._uiHash(this)), this.containers[n].containerCache.over = 0);
					}
				}
			}
			if (f) {
				if (1 === this.containers.length) {
					this.containers[m].containerCache.over || (this.containers[m]._trigger("over", s, this._uiHash(this)), this.containers[m].containerCache.over = 1);
				} else {
					for (o = 10000, r = null, p = f.floating || i(this.currentItem), h = p ? "left" : "top", l = p ? "width" : "height", c = this.positionAbs[h] + this.offset.click[h], a = this.items.length - 1; a >= 0; a--) {
						t.contains(this.containers[m].element[0], this.items[a].item[0]) && this.items[a].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[a].top, this.items[a].height)) && (u = this.items[a].item.offset()[h], d = !1, Math.abs(u - c) > Math.abs(u + this.items[a][l] - c) && (d = !0, u += this.items[a][l]), o > Math.abs(u - c) && (o = Math.abs(u - c), r = this.items[a], this.direction = d ? "up" : "down"));
					}
					if (!r && !this.options.dropOnEmpty) {
						return;
					}
					if (this.currentContainer === this.containers[m]) {
						return;
					}
					r ? this._rearrange(s, r, null, !0) : this._rearrange(s, null, this.containers[m].element, !0),
					this._trigger("change", s, this._uiHash()),
					this.containers[m]._trigger("change", s, this._uiHash(this)),
					this.currentContainer = this.containers[m],
					this.options.placeholder.update(this.currentContainer, this.placeholder),
					this.containers[m]._trigger("over", s, this._uiHash(this)),
					this.containers[m].containerCache.over = 1;
				}
			}
		},
		_createHelper : function (e) {
			var i = this.options,
			s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
			return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]),
			s[0] === this.currentItem[0] && (this._storedCSS = {
					width : this.currentItem[0].style.width,
					height : this.currentItem[0].style.height,
					position : this.currentItem.css("position"),
					top : this.currentItem.css("top"),
					left : this.currentItem.css("left")
				}),
			(!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()),
			(!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()),
			s;
		},
		_adjustOffsetFromHelper : function (e) {
			"string" == typeof e && (e = e.split(" ")),
			t.isArray(e) && (e = {
					left : +e[0],
					top : +e[1] || 0
				}),
			"left" in e && (this.offset.click.left = e.left + this.margins.left),
			"right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
			"top" in e && (this.offset.click.top = e.top + this.margins.top),
			"bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
		},
		_getParentOffset : function () {
			this.offsetParent = this.helper.offsetParent();
			var e = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()),
			(this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
					top : 0,
					left : 0
				}), {
				top : e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left : e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			};
		},
		_getRelativeOffset : function () {
			if ("relative" === this.cssPosition) {
				var t = this.currentItem.position();
				return {
					top : t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left : t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				};
			}
			return {
				top : 0,
				left : 0
			};
		},
		_cacheMargins : function () {
			this.margins = {
				left : parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top : parseInt(this.currentItem.css("marginTop"), 10) || 0
			};
		},
		_cacheHelperProportions : function () {
			this.helperProportions = {
				width : this.helper.outerWidth(),
				height : this.helper.outerHeight()
			};
		},
		_setContainment : function () {
			var e,
			i,
			s,
			n = this.options;
			"parent" === n.containment && (n.containment = this.helper[0].parentNode),
			("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
			/^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]);
		},
		_convertPositionTo : function (e, i) {
			i || (i = this.position);
			var s = "absolute" === e ? 1 : -1,
			n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
			a = /(html|body)/i.test(n[0].tagName);
			return {
				top : i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : n.scrollTop()) * s,
				left : i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : n.scrollLeft()) * s
			};
		},
		_generatePosition : function (e) {
			var i,
			s,
			n = this.options,
			a = e.pageX,
			o = e.pageY,
			r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
			h = /(html|body)/i.test(r[0].tagName);
			return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
			this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (a = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (a = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1], o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0], a = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
				top : o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
				left : a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
			};
		},
		_rearrange : function (t, e, i, s) {
			i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling),
			this.counter = this.counter ? ++this.counter : 1;
			var n = this.counter;
			this._delay(function () {
				n === this.counter && this.refreshPositions(!s);
			});
		},
		_clear : function (t, e) {
			this.reverting = !1;
			var i,
			s = [];
			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
				for (i in this._storedCSS) {
					("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
				}
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else {
				this.currentItem.show();
			}
			for (this.fromOutside && !e && s.push(function (t) {
					this._trigger("receive", t, this._uiHash(this.fromOutside));
				}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function (t) {
					this._trigger("update", t, this._uiHash());
				}), this !== this.currentContainer && (e || (s.push(function (t) {
							this._trigger("remove", t, this._uiHash());
						}), s.push(function (t) {
							return function (e) {
								t._trigger("receive", e, this._uiHash(this));
							};
						}
							.call(this, this.currentContainer)), s.push(function (t) {
							return function (e) {
								t._trigger("update", e, this._uiHash(this));
							};
						}
							.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) {
				e || s.push(function (t) {
					return function (e) {
						t._trigger("deactivate", e, this._uiHash(this));
					};
				}
					.call(this, this.containers[i])),
				this.containers[i].containerCache.over && (s.push(function (t) {
						return function (e) {
							t._trigger("out", e, this._uiHash(this));
						};
					}
						.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
			}
			if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
				if (!e) {
					for (this._trigger("beforeStop", t, this._uiHash()), i = 0; s.length > i; i++) {
						s[i].call(this, t);
					}
					this._trigger("stop", t, this._uiHash());
				}
				return this.fromOutside = !1,
				!1;
			}
			if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
				for (i = 0; s.length > i; i++) {
					s[i].call(this, t);
				}
				this._trigger("stop", t, this._uiHash());
			}
			return this.fromOutside = !1,
			!0;
		},
		_trigger : function () {
			t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
		},
		_uiHash : function (e) {
			var i = e || this;
			return {
				helper : i.helper,
				placeholder : i.placeholder || t([]),
				position : i.position,
				originalPosition : i.originalPosition,
				offset : i.positionAbs,
				item : i.currentItem,
				sender : e ? e.element : null
			};
		}
	});
})(jQuery);
(function (t) {
	var e = 0,
	i = {},
	s = {};
	i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide",
	s.height = s.paddingTop = s.paddingBottom = s.borderTopWidth = s.borderBottomWidth = "show",
	t.widget("ui.accordion", {
		version : "1.10.3",
		options : {
			active : 0,
			animate : {},
			collapsible : !1,
			event : "click",
			header : "> li > :first-child,> :not(li):even",
			heightStyle : "auto",
			icons : {
				activeHeader : "ui-icon-triangle-1-s",
				header : "ui-icon-triangle-1-e"
			},
			activate : null,
			beforeActivate : null
		},
		_create : function () {
			var e = this.options;
			this.prevShow = this.prevHide = t(),
			this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"),
			e.collapsible || e.active !== !1 && null != e.active || (e.active = 0),
			this._processPanels(),
			0 > e.active && (e.active += this.headers.length),
			this._refresh();
		},
		_getCreateEventData : function () {
			return {
				header : this.active,
				panel : this.active.length ? this.active.next() : t(),
				content : this.active.length ? this.active.next() : t()
			};
		},
		_createIcons : function () {
			var e = this.options.icons;
			e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"));
		},
		_destroyIcons : function () {
			this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove();
		},
		_destroy : function () {
			var t;
			this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),
			this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function () {
				/^ui-accordion/.test(this.id) && this.removeAttribute("id");
			}),
			this._destroyIcons(),
			t = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function () {
					/^ui-accordion/.test(this.id) && this.removeAttribute("id");
				}),
			"content" !== this.options.heightStyle && t.css("height", "");
		},
		_setOption : function (t, e) {
			return "active" === t ? (this._activate(e), undefined) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), "disabled" === t && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e), undefined);
		},
		_keydown : function (e) {
			if (!e.altKey && !e.ctrlKey) {
				var i = t.ui.keyCode,
				s = this.headers.length,
				n = this.headers.index(e.target),
				a = !1;
				switch (e.keyCode) {
				case i.RIGHT:
				case i.DOWN:
					a = this.headers[(n + 1) % s];
					break;
				case i.LEFT:
				case i.UP:
					a = this.headers[(n - 1 + s) % s];
					break;
				case i.SPACE:
				case i.ENTER:
					this._eventHandler(e);
					break;
				case i.HOME:
					a = this.headers[0];
					break;
				case i.END:
					a = this.headers[s - 1];
				}
				a && (t(e.target).attr("tabIndex", -1), t(a).attr("tabIndex", 0), a.focus(), e.preventDefault());
			}
		},
		_panelKeyDown : function (e) {
			e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus();
		},
		refresh : function () {
			var e = this.options;
			this._processPanels(),
			e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active),
			this._destroyIcons(),
			this._refresh();
		},
		_processPanels : function () {
			this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),
			this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide();
		},
		_refresh : function () {
			var i,
			s = this.options,
			n = s.heightStyle,
			a = this.element.parent(),
			o = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e);
			this.active = this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),
			this.active.next().addClass("ui-accordion-content-active").show(),
			this.headers.attr("role", "tab").each(function (e) {
				var i = t(this),
				s = i.attr("id"),
				n = i.next(),
				a = n.attr("id");
				s || (s = o + "-header-" + e, i.attr("id", s)),
				a || (a = o + "-panel-" + e, n.attr("id", a)),
				i.attr("aria-controls", a),
				n.attr("aria-labelledby", s);
			}).next().attr("role", "tabpanel"),
			this.headers.not(this.active).attr({
				"aria-selected" : "false",
				tabIndex : -1
			}).next().attr({
				"aria-expanded" : "false",
				"aria-hidden" : "true"
			}).hide(),
			this.active.length ? this.active.attr({
				"aria-selected" : "true",
				tabIndex : 0
			}).next().attr({
				"aria-expanded" : "true",
				"aria-hidden" : "false"
			}) : this.headers.eq(0).attr("tabIndex", 0),
			this._createIcons(),
			this._setupEvents(s.event),
			"fill" === n ? (i = a.height(), this.element.siblings(":visible").each(function () {
					var e = t(this),
					s = e.css("position");
					"absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0));
				}), this.headers.each(function () {
					i -= t(this).outerHeight(!0);
				}), this.headers.next().each(function () {
					t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()));
				}).css("overflow", "auto")) : "auto" === n && (i = 0, this.headers.next().each(function () {
					i = Math.max(i, t(this).css("height", "").height());
				}).height(i));
		},
		_activate : function (e) {
			var i = this._findActive(e)[0];
			i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
					target : i,
					currentTarget : i,
					preventDefault : t.noop
				}));
		},
		_findActive : function (e) {
			return "number" == typeof e ? this.headers.eq(e) : t();
		},
		_setupEvents : function (e) {
			var i = {
				keydown : "_keydown"
			};
			e && t.each(e.split(" "), function (t, e) {
				i[e] = "_eventHandler";
			}),
			this._off(this.headers.add(this.headers.next())),
			this._on(this.headers, i),
			this._on(this.headers.next(), {
				keydown : "_panelKeyDown"
			}),
			this._hoverable(this.headers),
			this._focusable(this.headers);
		},
		_eventHandler : function (e) {
			var i = this.options,
			s = this.active,
			n = t(e.currentTarget),
			a = n[0] === s[0],
			o = a && i.collapsible,
			r = o ? t() : n.next(),
			h = s.next(),
			l = {
				oldHeader : s,
				oldPanel : h,
				newHeader : o ? t() : n,
				newPanel : r
			};
			e.preventDefault(),
			a && !i.collapsible || this._trigger("beforeActivate", e, l) === !1 || (i.active = o ? !1 : this.headers.index(n), this.active = a ? t() : n, this._toggle(l), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), a || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active")));
		},
		_toggle : function (e) {
			var i = e.newPanel,
			s = this.prevShow.length ? this.prevShow : e.oldPanel;
			this.prevShow.add(this.prevHide).stop(!0, !0),
			this.prevShow = i,
			this.prevHide = s,
			this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)),
			s.attr({
				"aria-expanded" : "false",
				"aria-hidden" : "true"
			}),
			s.prev().attr("aria-selected", "false"),
			i.length && s.length ? s.prev().attr("tabIndex", -1) : i.length && this.headers.filter(function () {
				return 0 === t(this).attr("tabIndex");
			}).attr("tabIndex", -1),
			i.attr({
				"aria-expanded" : "true",
				"aria-hidden" : "false"
			}).prev().attr({
				"aria-selected" : "true",
				tabIndex : 0
			});
		},
		_animate : function (t, e, n) {
			var a,
			o,
			r,
			h = this,
			l = 0,
			c = t.length && (!e.length || t.index() < e.index()),
			u = this.options.animate || {},
			d = c && u.down || u,
			p = function () {
				h._toggleComplete(n);
			};
			return "number" == typeof d && (r = d),
			"string" == typeof d && (o = d),
			o = o || d.easing || u.easing,
			r = r || d.duration || u.duration,
			e.length ? t.length ? (a = t.show().outerHeight(), e.animate(i, {
					duration : r,
					easing : o,
					step : function (t, e) {
						e.now = Math.round(t);
					}
				}), t.hide().animate(s, {
					duration : r,
					easing : o,
					complete : p,
					step : function (t, i) {
						i.now = Math.round(t),
						"height" !== i.prop ? l += i.now : "content" !== h.options.heightStyle && (i.now = Math.round(a - e.outerHeight() - l), l = 0);
					}
				}), undefined) : e.animate(i, r, o, p) : t.animate(s, r, o, p);
		},
		_toggleComplete : function (t) {
			var e = t.oldPanel;
			e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),
			e.length && (e.parent()[0].className = e.parent()[0].className),
			this._trigger("activate", null, t);
		}
	});
})(jQuery);
(function (t) {
	var e = 0;
	t.widget("ui.autocomplete", {
		version : "1.10.3",
		defaultElement : "<input>",
		options : {
			appendTo : null,
			autoFocus : !1,
			delay : 300,
			minLength : 1,
			position : {
				my : "left top",
				at : "left bottom",
				collision : "none"
			},
			source : null,
			change : null,
			close : null,
			focus : null,
			open : null,
			response : null,
			search : null,
			select : null
		},
		pending : 0,
		_create : function () {
			var e,
			i,
			s,
			n = this.element[0].nodeName.toLowerCase(),
			a = "textarea" === n,
			o = "input" === n;
			this.isMultiLine = a ? !0 : o ? !1 : this.element.prop("isContentEditable"),
			this.valueMethod = this.element[a || o ? "val" : "text"],
			this.isNewMenu = !0,
			this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
			this._on(this.element, {
				keydown : function (n) {
					if (this.element.prop("readOnly")) {
						return e = !0,
						s = !0,
						i = !0,
						undefined;
					}
					e = !1,
					s = !1,
					i = !1;
					var a = t.ui.keyCode;
					switch (n.keyCode) {
					case a.PAGE_UP:
						e = !0,
						this._move("previousPage", n);
						break;
					case a.PAGE_DOWN:
						e = !0,
						this._move("nextPage", n);
						break;
					case a.UP:
						e = !0,
						this._keyEvent("previous", n);
						break;
					case a.DOWN:
						e = !0,
						this._keyEvent("next", n);
						break;
					case a.ENTER:
					case a.NUMPAD_ENTER:
						this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
						break;
					case a.TAB:
						this.menu.active && this.menu.select(n);
						break;
					case a.ESCAPE:
						this.menu.element.is(":visible") && (this._value(this.term), this.close(n), n.preventDefault());
						break;
					default:
						i = !0,
						this._searchTimeout(n);
					}
				},
				keypress : function (s) {
					if (e) {
						return e = !1,
						(!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(),
						undefined;
					}
					if (!i) {
						var n = t.ui.keyCode;
						switch (s.keyCode) {
						case n.PAGE_UP:
							this._move("previousPage", s);
							break;
						case n.PAGE_DOWN:
							this._move("nextPage", s);
							break;
						case n.UP:
							this._keyEvent("previous", s);
							break;
						case n.DOWN:
							this._keyEvent("next", s);
						}
					}
				},
				input : function (t) {
					return s ? (s = !1, t.preventDefault(), undefined) : (this._searchTimeout(t), undefined);
				},
				focus : function () {
					this.selectedItem = null,
					this.previous = this._value();
				},
				blur : function (t) {
					return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(t), this._change(t), undefined);
				}
			}),
			this._initSource(),
			this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
					role : null
				}).hide().data("ui-menu"),
			this._on(this.menu.element, {
				mousedown : function (e) {
					e.preventDefault(),
					this.cancelBlur = !0,
					this._delay(function () {
						delete this.cancelBlur;
					});
					var i = this.menu.element[0];
					t(e.target).closest(".ui-menu-item").length || this._delay(function () {
						var e = this;
						this.document.one("mousedown", function (s) {
							s.target === e.element[0] || s.target === i || t.contains(i, s.target) || e.close();
						});
					});
				},
				menufocus : function (e, i) {
					if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type))) {
						return this.menu.blur(),
						this.document.one("mousemove", function () {
							t(e.target).trigger(e.originalEvent);
						}),
						undefined;
					}
					var s = i.item.data("ui-autocomplete-item");
					!1 !== this._trigger("focus", e, {
						item : s
					}) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value) : this.liveRegion.text(s.value);
				},
				menuselect : function (t, e) {
					var i = e.item.data("ui-autocomplete-item"),
					s = this.previous;
					this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function () {
							this.previous = s,
							this.selectedItem = i;
						})),
					!1 !== this._trigger("select", t, {
						item : i
					}) && this._value(i.value),
					this.term = this._value(),
					this.close(t),
					this.selectedItem = i;
				}
			}),
			this.liveRegion = t("<span>", {
					role : "status",
					"aria-live" : "polite"
				}).addClass("ui-helper-hidden-accessible").insertBefore(this.element),
			this._on(this.window, {
				beforeunload : function () {
					this.element.removeAttr("autocomplete");
				}
			});
		},
		_destroy : function () {
			clearTimeout(this.searching),
			this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),
			this.menu.element.remove(),
			this.liveRegion.remove();
		},
		_setOption : function (t, e) {
			this._super(t, e),
			"source" === t && this._initSource(),
			"appendTo" === t && this.menu.element.appendTo(this._appendTo()),
			"disabled" === t && e && this.xhr && this.xhr.abort();
		},
		_appendTo : function () {
			var e = this.options.appendTo;
			return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)),
			e || (e = this.element.closest(".ui-front")),
			e.length || (e = this.document[0].body),
			e;
		},
		_initSource : function () {
			var e,
			i,
			s = this;
			t.isArray(this.options.source) ? (e = this.options.source, this.source = function (i, s) {
				s(t.ui.autocomplete.filter(e, i.term));
			}) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (e, n) {
				s.xhr && s.xhr.abort(),
				s.xhr = t.ajax({
						url : i,
						data : e,
						dataType : "json",
						success : function (t) {
							n(t);
						},
						error : function () {
							n([]);
						}
					});
			}) : this.source = this.options.source;
		},
		_searchTimeout : function (t) {
			clearTimeout(this.searching),
			this.searching = this._delay(function () {
					this.term !== this._value() && (this.selectedItem = null, this.search(null, t));
				}, this.options.delay);
		},
		search : function (t, e) {
			return t = null != t ? t : this._value(),
			this.term = this._value(),
			t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : undefined;
		},
		_search : function (t) {
			this.pending++,
			this.element.addClass("ui-autocomplete-loading"),
			this.cancelSearch = !1,
			this.source({
				term : t
			}, this._response());
		},
		_response : function () {
			var t = this,
			i = ++e;
			return function (s) {
				i === e && t.__response(s),
				t.pending--,
				t.pending || t.element.removeClass("ui-autocomplete-loading");
			};
		},
		__response : function (t) {
			t && (t = this._normalize(t)),
			this._trigger("response", null, {
				content : t
			}),
			!this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close();
		},
		close : function (t) {
			this.cancelSearch = !0,
			this._close(t);
		},
		_close : function (t) {
			this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t));
		},
		_change : function (t) {
			this.previous !== this._value() && this._trigger("change", t, {
				item : this.selectedItem
			});
		},
		_normalize : function (e) {
			return e.length && e[0].label && e[0].value ? e : t.map(e, function (e) {
				return "string" == typeof e ? {
					label : e,
					value : e
				}
				 : t.extend({
					label : e.label || e.value,
					value : e.value || e.label
				}, e);
			});
		},
		_suggest : function (e) {
			var i = this.menu.element.empty();
			this._renderMenu(i, e),
			this.isNewMenu = !0,
			this.menu.refresh(),
			i.show(),
			this._resizeMenu(),
			i.position(t.extend({
					of : this.element
				}, this.options.position)),
			this.options.autoFocus && this.menu.next();
		},
		_resizeMenu : function () {
			var t = this.menu.element;
			t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()));
		},
		_renderMenu : function (e, i) {
			var s = this;
			t.each(i, function (t, i) {
				s._renderItemData(e, i);
			});
		},
		_renderItemData : function (t, e) {
			return this._renderItem(t, e).data("ui-autocomplete-item", e);
		},
		_renderItem : function (e, i) {
			return t("<li>").append(t("<a>").text(i.label)).appendTo(e);
		},
		_move : function (t, e) {
			return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[t](e), undefined) : (this.search(null, e), undefined);
		},
		widget : function () {
			return this.menu.element;
		},
		_value : function () {
			return this.valueMethod.apply(this.element, arguments);
		},
		_keyEvent : function (t, e) {
			(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault());
		}
	}),
	t.extend(t.ui.autocomplete, {
		escapeRegex : function (t) {
			return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
		},
		filter : function (e, i) {
			var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
			return t.grep(e, function (t) {
				return s.test(t.label || t.value || t);
			});
		}
	}),
	t.widget("ui.autocomplete", t.ui.autocomplete, {
		options : {
			messages : {
				noResults : "No search results.",
				results : function (t) {
					return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
				}
			}
		},
		__response : function (t) {
			var e;
			this._superApply(arguments),
			this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e));
		}
	});
})(jQuery);
(function (t) {
	t.widget("ui.menu", {
		version : "1.10.3",
		defaultElement : "<ul>",
		delay : 300,
		options : {
			icons : {
				submenu : "ui-icon-carat-1-e"
			},
			menus : "ul",
			position : {
				my : "left top",
				at : "right top"
			},
			role : "menu",
			blur : null,
			focus : null,
			select : null
		},
		_create : function () {
			this.activeMenu = this.element,
			this.mouseHandled = !1,
			this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
				role : this.options.role,
				tabIndex : 0
			}).bind("click" + this.eventNamespace, t.proxy(function (t) {
					this.options.disabled && t.preventDefault();
				}, this)),
			this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
			this._on({
				"mousedown .ui-menu-item > a" : function (t) {
					t.preventDefault();
				},
				"click .ui-state-disabled > a" : function (t) {
					t.preventDefault();
				},
				"click .ui-menu-item:has(a)" : function (e) {
					var i = t(e.target).closest(".ui-menu-item");
					!this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(e), i.has(".ui-menu").length ? this.expand(e) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
				},
				"mouseenter .ui-menu-item" : function (e) {
					var i = t(e.currentTarget);
					i.siblings().children(".ui-state-active").removeClass("ui-state-active"),
					this.focus(e, i);
				},
				mouseleave : "collapseAll",
				"mouseleave .ui-menu" : "collapseAll",
				focus : function (t, e) {
					var i = this.active || this.element.children(".ui-menu-item").eq(0);
					e || this.focus(t, i);
				},
				blur : function (e) {
					this._delay(function () {
						t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e);
					});
				},
				keydown : "_keydown"
			}),
			this.refresh(),
			this._on(this.document, {
				click : function (e) {
					t(e.target).closest(".ui-menu").length || this.collapseAll(e),
					this.mouseHandled = !1;
				}
			});
		},
		_destroy : function () {
			this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),
			this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
				var e = t(this);
				e.data("ui-menu-submenu-carat") && e.remove();
			}),
			this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
		},
		_keydown : function (e) {
			function i(t) {
				return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
			}
			var s,
			n,
			a,
			o,
			r,
			h = !0;
			switch (e.keyCode) {
			case t.ui.keyCode.PAGE_UP:
				this.previousPage(e);
				break;
			case t.ui.keyCode.PAGE_DOWN:
				this.nextPage(e);
				break;
			case t.ui.keyCode.HOME:
				this._move("first", "first", e);
				break;
			case t.ui.keyCode.END:
				this._move("last", "last", e);
				break;
			case t.ui.keyCode.UP:
				this.previous(e);
				break;
			case t.ui.keyCode.DOWN:
				this.next(e);
				break;
			case t.ui.keyCode.LEFT:
				this.collapse(e);
				break;
			case t.ui.keyCode.RIGHT:
				this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
				break;
			case t.ui.keyCode.ENTER:
			case t.ui.keyCode.SPACE:
				this._activate(e);
				break;
			case t.ui.keyCode.ESCAPE:
				this.collapse(e);
				break;
			default:
				h = !1,
				n = this.previousFilter || "",
				a = String.fromCharCode(e.keyCode),
				o = !1,
				clearTimeout(this.filterTimer),
				a === n ? o = !0 : a = n + a,
				r = RegExp("^" + i(a), "i"),
				s = this.activeMenu.children(".ui-menu-item").filter(function () {
						return r.test(t(this).children("a").text());
					}),
				s = o && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s,
				s.length || (a = String.fromCharCode(e.keyCode), r = RegExp("^" + i(a), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function () {
							return r.test(t(this).children("a").text());
						})),
				s.length ? (this.focus(e, s), s.length > 1 ? (this.previousFilter = a, this.filterTimer = this._delay(function () {
								delete this.previousFilter;
							}, 1000)) : delete this.previousFilter) : delete this.previousFilter;
			}
			h && e.preventDefault();
		},
		_activate : function (t) {
			this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t));
		},
		refresh : function () {
			var e,
			i = this.options.icons.submenu,
			s = this.element.find(this.options.menus);
			s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
				role : this.options.role,
				"aria-hidden" : "true",
				"aria-expanded" : "false"
			}).each(function () {
				var e = t(this),
				s = e.prev("a"),
				n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
				s.attr("aria-haspopup", "true").prepend(n),
				e.attr("aria-labelledby", s.attr("id"));
			}),
			e = s.add(this.element),
			e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
				tabIndex : -1,
				role : this._itemRole()
			}),
			e.children(":not(.ui-menu-item)").each(function () {
				var e = t(this);
				/[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider");
			}),
			e.children(".ui-state-disabled").attr("aria-disabled", "true"),
			this.active && !t.contains(this.element[0], this.active[0]) && this.blur();
		},
		_itemRole : function () {
			return {
				menu : "menuitem",
				listbox : "option"
			}
			[this.options.role];
		},
		_setOption : function (t, e) {
			"icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),
			this._super(t, e);
		},
		focus : function (t, e) {
			var i,
			s;
			this.blur(t, t && "focus" === t.type),
			this._scrollIntoView(e),
			this.active = e.first(),
			s = this.active.children("a").addClass("ui-state-focus"),
			this.options.role && this.element.attr("aria-activedescendant", s.attr("id")),
			this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),
			t && "keydown" === t.type ? this._close() : this.timer = this._delay(function () {
					this._close();
				}, this.delay),
			i = e.children(".ui-menu"),
			i.length && /^mouse/.test(t.type) && this._startOpening(i),
			this.activeMenu = e.parent(),
			this._trigger("focus", t, {
				item : e
			});
		},
		_scrollIntoView : function (e) {
			var i,
			s,
			n,
			a,
			o,
			r;
			this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = e.height(), 0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r));
		},
		blur : function (t, e) {
			e || clearTimeout(this.timer),
			this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
					item : this.active
				}));
		},
		_startOpening : function (t) {
			clearTimeout(this.timer),
			"true" === t.attr("aria-hidden") && (this.timer = this._delay(function () {
						this._close(),
						this._open(t);
					}, this.delay));
		},
		_open : function (e) {
			var i = t.extend({
					of : this.active
				}, this.options.position);
			clearTimeout(this.timer),
			this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
			e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i);
		},
		collapseAll : function (e, i) {
			clearTimeout(this.timer),
			this.timer = this._delay(function () {
					var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
					s.length || (s = this.element),
					this._close(s),
					this.blur(e),
					this.activeMenu = s;
				}, this.delay);
		},
		_close : function (t) {
			t || (t = this.active ? this.active.parent() : this.element),
			t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active");
		},
		collapse : function (t) {
			var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
			e && e.length && (this._close(), this.focus(t, e));
		},
		expand : function (t) {
			var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
			e && e.length && (this._open(e.parent()), this._delay(function () {
					this.focus(t, e);
				}));
		},
		next : function (t) {
			this._move("next", "first", t);
		},
		previous : function (t) {
			this._move("prev", "last", t);
		},
		isFirstItem : function () {
			return this.active && !this.active.prevAll(".ui-menu-item").length;
		},
		isLastItem : function () {
			return this.active && !this.active.nextAll(".ui-menu-item").length;
		},
		_move : function (t, e, i) {
			var s;
			this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)),
			s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()),
			this.focus(i, s);
		},
		nextPage : function (e) {
			var i,
			s,
			n;
			return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
							return i = t(this),
							0 > i.offset().top - s - n;
						}), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(e), undefined);
		},
		previousPage : function (e) {
			var i,
			s,
			n;
			return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
							return i = t(this),
							i.offset().top - s + n > 0;
						}), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(e), undefined);
		},
		_hasScroll : function () {
			return this.element.outerHeight() < this.element.prop("scrollHeight");
		},
		select : function (e) {
			this.active = this.active || t(e.target).closest(".ui-menu-item");
			var i = {
				item : this.active
			};
			this.active.has(".ui-menu").length || this.collapseAll(e, !0),
			this._trigger("select", e, i);
		}
	});
})(jQuery);
(function ($) {
	$.fn.ezMark = function (options) {
		options = options || {};
		var defaultOpt = {
			checkboxCls : options.checkboxCls || "ez-checkbox",
			radioCls : options.radioCls || "ez-radio",
			checkedCls : options.checkedCls || "ez-checked",
			selectedCls : options.selectedCls || "ez-selected",
			hideCls : "ez-hide"
		};
		return this.each(function () {
			var $this = $(this);
			var wrapTag = $this.attr("type") == "checkbox" ? '<div class="' + defaultOpt.checkboxCls + '">' : '<div class="' + defaultOpt.radioCls + '">';
			if ($this.attr("type") == "checkbox") {
				$this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function () {
					if ($(this).is(":checked")) {
						$(this).parent().addClass(defaultOpt.checkedCls);
					} else {
						$(this).parent().removeClass(defaultOpt.checkedCls);
					}
				});
				if ($this.is(":checked")) {
					$this.parent().addClass(defaultOpt.checkedCls);
				}
			} else {
				if ($this.attr("type") == "radio") {
					$this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function () {
						$('input[name="' + $(this).attr("name") + '"]').each(function () {
							if ($(this).is(":checked")) {
								$(this).parent().addClass(defaultOpt.selectedCls);
							} else {
								$(this).parent().removeClass(defaultOpt.selectedCls);
							}
						});
					});
					if ($this.is(":checked")) {
						$this.parent().addClass(defaultOpt.selectedCls);
					}
				}
			}
		});
	};
})(jQuery);
var ss_form_element = "";
var ss_popup_element = "";
var ss_seq = ["g"];
var ss_g_one_name_to_display = "Suggestion";
var ss_g_more_names_to_display = "Suggestions";
var ss_g_max_to_display = 10;
var ss_max_to_display = 12;
var ss_wait_millisec = 300;
var ss_delay_millisec = 30;
var ss_gsa_host = "www.seagate.com/ww";
var SS_OUTPUT_FORMAT_LEGACY = "legacy";
var SS_OUTPUT_FORMAT_OPEN_SEARCH = "os";
var SS_OUTPUT_FORMAT_RICH = "rich";
var ss_protocol = SS_OUTPUT_FORMAT_RICH;
var ss_allow_non_query = true;
var ss_non_query_empty_title = "No Title";
var sugg_search_string = "";
var ss_allow_debug = false;
var ss_cached = [];
var ss_qbackup = null;
var ss_qshown = null;
var ss_loc = -1;
var ss_waiting = 0;
var ss_painting = false;
var ss_key_handling_queue = null;
var ss_painting_queue = null;
var ss_dismissed = false;
var ss_panic = false;
var SS_ROW_CLASS = "ss-gac-a";
var SS_ROW_SELECTED_CLASS = "ss-gac-b";
if (!Array.indexOf) {
	Array.prototype.indexOf = function (obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	};
}
var ss_debug = new ss_Debugger();
function ss_composeSuggestUri(qVal, suggestForm) {
	var siteVal = suggestForm.site ? suggestForm.site.value : null;
	var clientVal = suggestForm.client ? suggestForm.client.value : null;
	if (!qVal || !siteVal || !clientVal) {
		return null;
	}
	var accessVal = (suggestForm.access && suggestForm.access.value) ? suggestForm.access.value : "p";
	var uri = "/suggest";
	if (SS_OUTPUT_FORMAT_LEGACY == ss_protocol) {
		uri = uri + "?token=" + encodeURIComponent(qVal) + "&max_matches=" + ss_g_max_to_display;
	} else {
		uri = uri + "?q=" + encodeURIComponent(qVal) + "&max=" + ss_g_max_to_display;
	}
	uri = uri + "&site=" + encodeURIComponent(siteVal) + "&client=" + encodeURIComponent(clientVal) + "&access=" + encodeURIComponent(accessVal) + "&format=" + encodeURIComponent(ss_protocol);
	return uri;
}
function ss_suggest(qVal) {
	var startTimeMs = new Date().getTime();
	if (!ss_cached[qVal]) {
		ss_cached[qVal] = {};
	}
	var suggestForm = document.getElementById(ss_form_element);
	var uri = ss_composeSuggestUri(qVal, suggestForm);
	if (!uri) {
		return;
	}
	var url = ss_gsa_host ? "http://" + ss_gsa_host + uri : uri;
	if (ss_panic) {
		alert("ss_suggest() AJAX: " + url);
	}
	var xmlhttp = XH_XmlHttpCreate();
	var handler = function () {
		if (xmlhttp.readyState == XML_READY_STATE_COMPLETED) {
			if (ss_panic) {
				alert("ss_suggest() AJAX: " + xmlhttp.responseText);
			}
			var suggested;
			try {
				suggested = eval("(" + xmlhttp.responseText + ")");
			} catch (e) {
				ss_cached[qVal].g = null;
				ss_show(qVal);
				return;
			}
			if (ss_use.g) {
				try {
					switch (ss_protocol) {
					case SS_OUTPUT_FORMAT_LEGACY:
					default:
						var suggestions = suggested;
						if (suggestions && suggestions.length > 0) {
							var found = false;
							ss_cached[qVal].g = [];
							var max = (ss_g_max_to_display <= 0) ? suggestions.length : Math.min(ss_g_max_to_display, suggestions.length);
							for (var si = 0; si < max; si++) {
								ss_cached[qVal].g[si] = {
									"q" : suggestions[si]
								};
								found = true;
							}
							if (!found) {
								ss_cached[qVal].g = null;
							}
						} else {
							ss_cached[qVal].g = null;
						}
						break;
					case SS_OUTPUT_FORMAT_OPEN_SEARCH:
						if (suggested.length > 1) {
							var suggestions = suggested[1];
							if (suggestions && suggestions.length > 0) {
								var found = false;
								ss_cached[qVal].g = [];
								var max = (ss_g_max_to_display <= 0) ? suggestions.length : Math.min(ss_g_max_to_display, suggestions.length);
								for (var si = 0; si < max; si++) {
									if (suggestions[si] && suggestions[si] != suggested[0]) {
										ss_cached[qVal].g[si] = {
											"q" : suggestions[si]
										};
										found = true;
									} else {
										if ((suggested.length > 3) && ss_allow_non_query) {
											var title = (suggested[2].length > si) ? null : suggested[2][si];
											var url = (suggested[3].length > si) ? null : suggested[3][si];
											if (url) {
												title = !title ? ss_non_query_empty_title : title;
												ss_cached[qVal].g[si] = {
													"t" : title,
													"u" : url
												};
												found = true;
											}
										}
									}
								}
								if (!found) {
									ss_cached[qVal].g = null;
								}
							} else {
								ss_cached[qVal].g = null;
							}
						} else {
							ss_cached[qVal].g = null;
						}
						break;
					case SS_OUTPUT_FORMAT_RICH:
						var suggestions = suggested.results;
						if (suggestions && suggestions.length > 0) {
							var found = false;
							ss_cached[qVal].g = [];
							var max = (ss_g_max_to_display <= 0) ? suggestions.length : Math.min(ss_g_max_to_display, suggestions.length);
							for (var si = 0; si < max; si++) {
								if (suggestions[si].name && suggestions[si].name != suggested.query) {
									ss_cached[qVal].g[si] = {
										"q" : suggestions[si].name
									};
									found = true;
								} else {
									if (ss_allow_non_query) {
										var title = suggestions[si].content;
										var url = suggestions[si].moreDetailsUrl;
										if (url) {
											title = !title ? ss_non_query_empty_title : title;
											ss_cached[qVal].g[si] = {
												"t" : title,
												"u" : url
											};
											found = true;
										}
									}
								}
							}
							if (!found) {
								ss_cached[qVal].g = null;
							}
						} else {
							ss_cached[qVal].g = null;
						}
						break;
					}
				} catch (e) {
					ss_cached[qVal].g = null;
				}
			}
			if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
				var stopTimeMs = new Date().getTime();
				ss_debug.addRequestDebugLine(qVal, "suggest", stopTimeMs - startTimeMs, ss_cached[qVal]);
			}
			ss_show(qVal);
		}
	};
	XH_XmlHttpPOST(xmlhttp, url, "", handler);
}
function ss_processed(qVal) {
	if (!ss_cached[qVal] && ss_use.g) {
		return false;
	}
	return true;
}
function ss_handleAllKey(e) {
	var kid = (window.event) ? window.event.keyCode : e.keyCode;
	switch (kid) {
	case 40:
	case 38:
		break;
	case 9:
		break;
	case 16:
		if (ss_form_element != "") {
			ss_qbackup = null;
			ss_dismissed = true;
			ss_clear(true);
			var qry = document.getElementById(ss_form_element).q.value;
			if (!ss_processed(qry)) {
				if (ss_panic) {
					alert("run ajax when key off");
				}
				ss_suggest(qry);
			}
		}
		break;
	case 113:
		if (!ss_allow_debug) {
			break;
		}
		if (ss_debug && ss_debug.getDebugMode()) {
			ss_debug.deactivateConsole();
		} else {
			ss_debug.activateConsole();
		}
		break;
	default:
		break;
	}
}
function ss_handleKey(e, tableID, formID) {
	ss_popup_element = tableID;
	ss_form_element = formID;
	var kid = (window.event) ? window.event.keyCode : e.keyCode;
	var fo = document.getElementById(ss_form_element);
	var qnow = (!ss_qbackup) ? fo.q.value : ss_qbackup;
	var sum = 0;
	var tbl = document.getElementById(ss_popup_element);
	switch (kid) {
	case 40:
		ss_dismissed = false;
		if (ss_processed(qnow)) {
			sum = ss_countSuggestions(qnow);
			if (sum > 0) {
				if (tbl.style.visibility == "hidden") {
					ss_show(qnow);
					break;
				}
				if (ss_qbackup) {
					ss_loc++;
				} else {
					ss_qbackup = qnow;
					ss_loc = 0;
				}
				while (ss_loc >= sum) {
					ss_loc -= sum;
				}
				var rows = tbl.getElementsByTagName("tr");
				for (var ri = 0; ri < rows.length - 1; ri++) {
					if (ri == ss_loc) {
						rows[ri].className = SS_ROW_SELECTED_CLASS;
					} else {
						rows[ri].className = SS_ROW_CLASS;
					}
				}
				var suggestion = ss_locateSuggestion(qnow, ss_loc);
				if (suggestion.q) {
					fo.q.value = suggestion.q;
				} else {
					fo.q.value = ss_qbackup;
				}
			}
		} else {
			if (ss_panic) {
				alert("run ajax when key down");
			}
			ss_suggest(qnow);
		}
		break;
	case 38:
		ss_dismissed = false;
		if (ss_processed(qnow)) {
			sum = ss_countSuggestions(qnow);
			if (sum > 0) {
				if (tbl.style.visibility == "hidden") {
					ss_show(qnow);
					break;
				}
				if (ss_qbackup) {
					ss_loc--;
				} else {
					ss_qbackup = qnow;
					ss_loc = -1;
				}
				while (ss_loc < 0) {
					ss_loc += sum;
				}
				var rows = tbl.getElementsByTagName("tr");
				for (var ri = 0; ri < rows.length - 1; ri++) {
					if (ri == ss_loc) {
						rows[ri].className = SS_ROW_SELECTED_CLASS;
					} else {
						rows[ri].className = SS_ROW_CLASS;
					}
				}
				var suggestion = ss_locateSuggestion(qnow, ss_loc);
				if (suggestion.q) {
					fo.q.value = suggestion.q;
				} else {
					fo.q.value = ss_qbackup;
				}
			}
		} else {
			if (ss_panic) {
				alert("run ajax when key up");
			}
			ss_suggest(qnow);
		}
		break;
	case 13:
		var url = null;
		if (ss_processed(qnow) && ss_qbackup && ss_loc > -1) {
			var suggestion = ss_locateSuggestion(ss_qbackup, ss_loc);
			if (suggestion.u) {
				url = suggestion.u;
			}
		}
		ss_qbackup = null;
		ss_dismissed = true;
		ss_clear();
		if (url) {
			window.location.href = url;
		}
		break;
	case 27:
		if (ss_qbackup) {
			fo.q.value = ss_qbackup;
			ss_qbackup = null;
		}
		ss_dismissed = true;
		ss_clear();
		break;
	case 37:
	case 39:
	case 9:
	case 16:
		break;
	default:
		ss_dismissed = false;
		if (fo.q.value == ss_qshown) {}
		else {
			if (ss_key_handling_queue) {
				clearTimeout(ss_key_handling_queue);
			}
			ss_qbackup = null;
			ss_loc = -1;
			ss_waiting++;
			if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
				ss_debug.addWaitDebugLine(fo.q.value, "queue", ss_wait_millisec);
			}
			ss_key_handling_queue = setTimeout('ss_handleQuery("' + ss_escape(fo.q.value) + '", ' + ss_waiting + ")", ss_wait_millisec);
		}
		break;
	}
}
function ss_handleQuery(query, waiting1) {
	if (waiting1 != ss_waiting) {
		return;
	}
	ss_waiting = 0;
	if (query == "") {
		ss_clear();
	} else {
		if (!ss_processed(query)) {
			if (ss_panic) {
				alert("run ajax when key change");
			}
			ss_suggest(query);
		} else {
			ss_show(query);
		}
	}
}
function ss_sf() {
	document.getElementById(ss_form_element).q.focus();
	ss_dismissed = false;
}
function ss_clear(nofocus) {
	ss_qshown = null;
	var fo = document.getElementById(ss_form_element);
	var qnow = (!ss_qbackup) ? fo.q.value : ss_qbackup;
	ss_hide(qnow);
	if (!nofocus) {
		ss_sf();
	}
}
function ss_hide(qry) {
	var tbl = document.getElementById(ss_popup_element);
	if (tbl.style.visibility == "visible") {
		if (ss_panic) {
			alert("close suggestion box");
		}
		if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
			ss_debug.addHideDebugLine(qry, "hide");
		}
		tbl.style.visibility = "hidden";
	}
}
function ss_show(qry) {
	var currentQry = document.getElementById(ss_form_element).q.value;
	if (currentQry != qry) {
		if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
			ss_debug.addHideDebugLine(qry, "skip");
		}
		return;
	}
	var startTimeMs = new Date().getTime();
	if (ss_dismissed) {
		ss_qshown = null;
		ss_hide(qry);
		return;
	}
	if (!ss_processed(qry)) {
		return;
	}
	if (qry == "") {
		ss_hide(qry);
		return;
	}
	var g = ss_cached[qry] ? ss_cached[qry].g : null;
	var disp = false;
	if (ss_use.g && g) {
		disp = true;
	}
	if (!disp) {
		ss_qshown = null;
		ss_hide(qry);
		return;
	}
	if (ss_painting) {
		if (ss_painting_queue) {
			clearTimeout(ss_painting_queue);
		}
		if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
			ss_debug.addWaitDebugLine(qry, "delay", ss_delay_millisec);
		}
		ss_painting_queue = setTimeout('ss_show("' + ss_escape(qry) + '")', ss_delay_millisec);
		return;
	} else {
		ss_painting = true;
	}
	var tbl = document.getElementById(ss_popup_element);
	for (var ri = tbl.rows.length - 1; ri > -1; ri--) {
		tbl.deleteRow(ri);
	}
	var cnt = 0;
	for (var z = 0; z < ss_seq.length; z++) {
		switch (ss_seq[z]) {
		case "g":
			cnt += ss_showSuggestion(g, cnt, tbl);
			break;
		}
		if (ss_max_to_display > 0 && cnt >= ss_max_to_display) {
			break;
		}
	}
	if (cnt > 0) {
		var row = tbl.insertRow(-1);
		row.className = "ss-gac-e";
		var cls = document.createElement("td");
		cls.colSpan = 2;
		var clsTxt = document.createElement("span");
		clsTxt.onclick = function () {
			ss_qbackup = null;
			ss_clear();
			var query = document.getElementById(ss_form_element).q.value;
			if (!ss_processed(query)) {
				ss_dismissed = true;
				if (ss_panic) {
					alert("run ajax when mouse close");
				}
				ss_suggest(query);
			}
		};
		clsTxt.appendChild(document.createTextNode("close"));
		cls.appendChild(clsTxt);
		row.appendChild(cls);
		tbl.style.visibility = "visible";
		ss_qshown = qry;
		if (ss_panic) {
			alert("open suggestion box for " + qry);
		}
		if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
			var stopTimeMs = new Date().getTime();
			ss_debug.addShowDebugLine(qry, stopTimeMs - startTimeMs, ss_cached[qry], cnt);
		}
	} else {
		ss_hide(qry);
	}
	ss_painting = false;
}
function ss_showSuggestion(g, cnt, tbl) {
	if (ss_max_to_display > 0 && cnt >= ss_max_to_display) {
		return 0;
	}
	if (g && g.length > 0) {
		sugg_search_string = "";
		for (var i = 0; i < g.length; i++) {
			var row = tbl.insertRow(-1);
			row.onclick = function setStyle() {
				document.getElementById(ss_popup_element).style.visibility = "hidden";
			};
			row.onmousemove = ss_handleMouseM;
			row.className = SS_ROW_CLASS;
			var alt = document.createElement("td");
			if (g[i].q) {
				sugg_search_string = sugg_search_string + g[i].q + "##";
				alt.appendChild(document.createTextNode(g[i].q));
			} else {
				alt.innerHTML = "<i>" + g[i].t + "</i>";
			}
			alt.className = "ss-gac-c";
			row.appendChild(alt);
			var clue = "";
			if (i == 0 && g.length == 1) {
				clue = ss_g_one_name_to_display;
			} else {
				if (i == 0) {
					clue = ss_g_more_names_to_display;
				}
			}
			var typ = document.createElement("td");
			typ.appendChild(document.createTextNode(clue));
			typ.className = "ss-gac-d";
			row.appendChild(typ);
			if (ss_max_to_display > 0 && cnt + i + 1 >= ss_max_to_display) {
				return i + 1;
			}
		}
		sugg_search_string = sugg_search_string.substr(0, sugg_search_string.length - 2);
		document.getElementById(ss_form_element).sugg_search_string.value = sugg_search_string;
		return g.length;
	}
	return 0;
}
function ss_handleMouseM() {
	var fo = document.getElementById(ss_form_element);
	var tbl = document.getElementById(ss_popup_element);
	var rows = tbl.getElementsByTagName("tr");
	for (var ri = 0; ri < rows.length - 1; ri++) {
		if (rows[ri] == this && rows[ri].className != SS_ROW_SELECTED_CLASS) {
			rows[ri].className = SS_ROW_SELECTED_CLASS;
			if (!ss_qbackup) {
				ss_qbackup = fo.q.value;
			}
			ss_loc = ri;
			var suggestion = ss_locateSuggestion(ss_qbackup, ss_loc);
			if (suggestion.q) {
				fo.q.value = suggestion.q;
			} else {
				fo.q.value = ss_qbackup;
			}
		} else {
			if (rows[ri] != this) {
				rows[ri].className = SS_ROW_CLASS;
			}
		}
	}
	ss_sf();
	return true;
}
function ss_countSuggestions(query) {
	var cnt = 0;
	for (var i = 0; i < ss_seq.length; i++) {
		switch (ss_seq[i]) {
		case "g":
			cnt += ss_cached[query].g ? ss_cached[query].g.length : 0;
			break;
		}
		if (ss_max_to_display > 0 && cnt >= ss_max_to_display) {
			return ss_max_to_display;
		}
	}
	return cnt;
}
function ss_locateSuggestion(query, loc) {
	var cnt1 = 0;
	var cnt2 = 0;
	var type = null;
	for (var z = 0; z < ss_seq.length; z++) {
		switch (ss_seq[z]) {
		case "g":
			cnt2 += ss_cached[query].g ? ss_cached[query].g.length : 0;
			break;
		}
		if (loc >= cnt1 && loc < cnt2) {
			switch (ss_seq[z]) {
			case "g":
				var qV = ss_cached[query].g[loc - cnt1].q;
				if (qV) {
					return {
						"q" : qV
					};
				} else {
					return {
						"u" : ss_cached[query].g[loc - cnt1].u
					};
				}
			}
			break;
		}
		cnt1 = cnt2;
	}
	return null;
}
function ss_escape(query) {
	return query.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
}
function ss_escapeDbg(query) {
	var escapedQuery = "";
	var ch = query.split("");
	for (var i = 0; i < ch.length; i++) {
		switch (ch[i]) {
		case "&":
			escapedQuery += "&amp;";
			break;
		case "<":
			escapedQuery += "&lt;";
			break;
		case ">":
			escapedQuery += "&gt;";
			break;
		default:
			escapedQuery += ch[i];
			break;
		}
	}
	return escapedQuery;
}
function ss_Debugger() {
	this.debugMode = false;
}
ss_Debugger.DEBUG_CONSOLE_ID = "ss_debug_console";
ss_Debugger.DEBUG_CONTENT_ID = "ss_debug_content";
ss_Debugger.DEBUG_TOGGLE_ID = "ss_debug_toggle";
ss_Debugger.prototype.getDebugMode = function () {
	return this.debugMode;
};
ss_Debugger.prototype.activateConsole = function () {
	var console = document.getElementById(ss_Debugger.DEBUG_CONSOLE_ID);
	if (console) {
		console.style.display = "block";
	} else {
		var dc = document.createElement("div");
		dc.id = ss_Debugger.DEBUG_CONSOLE_ID;
		dc.zIndex = 100;
		dc.className = "expanded";
		var title = document.createElement("h1");
		title.appendChild(document.createTextNode("GSA Suggest Debug Console"));
		title.style.display = "inline";
		dc.appendChild(title);
		var actn = document.createElement("div");
		var btn = document.createElement("button");
		btn.onclick = function (event) {
			var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
			if (debugContent) {
				for (var ri = debugContent.rows.length - 1; ri > 0; ri--) {
					debugContent.deleteRow(ri);
				}
			}
		};
		btn.appendChild(document.createTextNode("Clear console"));
		actn.appendChild(btn);
		btn = document.createElement("button");
		btn.onclick = function (event) {
			ss_cached = [];
		};
		btn.appendChild(document.createTextNode("Clear cache"));
		actn.appendChild(btn);
		btn = document.createElement("button");
		btn.id = ss_Debugger.DEBUG_TOGGLE_ID;
		btn.onclick = function (event) {
			var debugConsole = document.getElementById(ss_Debugger.DEBUG_CONSOLE_ID);
			if (debugConsole) {
				var b = document.getElementById(ss_Debugger.DEBUG_TOGGLE_ID);
				if (debugConsole.className.indexOf("expanded") != -1) {
					debugConsole.className = debugConsole.className.replace(/expanded/, "contracted");
					b.innerHTML = "Maximize";
				} else {
					debugConsole.className = debugConsole.className.replace(/contracted/, "expanded");
					b.innerHTML = "Minimize";
				}
			}
		};
		btn.appendChild(document.createTextNode("Minimize"));
		actn.appendChild(btn);
		actn.style.display = "inline";
		dc.appendChild(actn);
		dc.appendChild(document.createElement("br"));
		var pane = document.createElement("table");
		pane.id = ss_Debugger.DEBUG_CONTENT_ID;
		var dhr = pane.insertRow(-1);
		var dhc = document.createElement("th");
		dhc.innerHTML = "Query";
		dhr.appendChild(dhc);
		dhc = document.createElement("th");
		dhc.innerHTML = "Type";
		dhr.appendChild(dhc);
		dhc = document.createElement("th");
		dhc.innerHTML = "Time";
		dhr.appendChild(dhc);
		dhc = document.createElement("th");
		dhc.innerHTML = "g";
		dhr.appendChild(dhc);
		dhc = document.createElement("th");
		dhc.innerHTML = "Total";
		dhr.appendChild(dhc);
		dc.appendChild(pane);
		document.body.appendChild(dc);
	}
	this.debugMode = true;
};
ss_Debugger.prototype.deactivateConsole = function () {
	var console = document.getElementById(ss_Debugger.DEBUG_CONSOLE_ID);
	if (console) {
		console.style.display = "none";
	}
	this.debugMode = false;
};
ss_Debugger.prototype.addRequestDebugLine = function (query, type, time, obj) {
	var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
	if (debugContent) {
		var currentRow = debugContent.insertRow(1);
		var currentCell = document.createElement("td");
		currentCell.innerHTML = "&lt;" + ss_escapeDbg(query) + "&gt;";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.innerHTML = type;
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.className = "no";
		currentCell.innerHTML = time + " ms";
		currentRow.appendChild(currentCell);
		switch (type) {
		case "suggest":
			currentCell = document.createElement("td");
			currentCell.className = "no";
			currentCell.innerHTML = (obj.g ? obj.g.length : 0);
			currentRow.appendChild(currentCell);
			currentCell = document.createElement("td");
			currentRow.appendChild(currentCell);
			break;
		default:
			currentCell = document.createElement("td");
			currentRow.appendChild(currentCell);
			currentCell = document.createElement("td");
			currentRow.appendChild(currentCell);
			break;
		}
	}
};
ss_Debugger.prototype.addShowDebugLine = function (query, time, o, total) {
	var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
	if (debugContent) {
		var currentRow = debugContent.insertRow(1);
		var currentCell = document.createElement("td");
		currentCell.innerHTML = "&lt;" + ss_escapeDbg(query) + "&gt;";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.innerHTML = "<i>show</i>";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.className = "no";
		currentCell.innerHTML = time + " ms";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.className = "no";
		currentCell.innerHTML = (o ? (o.g ? o.g.length : 0) : 0);
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.className = "no";
		currentCell.innerHTML = total;
		currentRow.appendChild(currentCell);
	}
};
ss_Debugger.prototype.addHideDebugLine = function (query, type) {
	var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
	if (debugContent) {
		var currentRow = debugContent.insertRow(1);
		var currentCell = document.createElement("td");
		currentCell.innerHTML = "&lt;" + ss_escapeDbg(query) + "&gt;";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.innerHTML = "<i>" + type + "</i>";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.className = "no";
		currentCell.innerHTML = "0 ms";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentRow.appendChild(currentCell);
	}
};
ss_Debugger.prototype.addWaitDebugLine = function (query, type, time) {
	var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
	if (debugContent) {
		var currentRow = debugContent.insertRow(1);
		var currentCell = document.createElement("td");
		currentCell.innerHTML = "&lt;" + ss_escapeDbg(query) + "&gt;";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.innerHTML = "<i>" + type + "</i>";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentCell.className = "no";
		currentCell.innerHTML = time + " ms";
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentRow.appendChild(currentCell);
		currentCell = document.createElement("td");
		currentRow.appendChild(currentCell);
	}
};
var ss_use = {};
ss_use.g = ss_seq.indexOf("g") >= 0 ? true : false;
document.onkeyup = ss_handleAllKey;
jQuery.fn.extend({
	getUrlParam : function (strParamName) {
		strParamName = escape(unescape(strParamName));
		var returnVal = new Array();
		var qString = null;
		if ($(this).attr("nodeName") == "#document") {
			if (window.location.search.search(strParamName) > -1) {
				qString = window.location.search.substr(1, window.location.search.length).split("&");
			}
		} else {
			if ($(this).attr("src") != "undefined") {
				var strHref = $(this).attr("src");
				if (strHref.indexOf("?") > -1) {
					var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
					qString = strQueryString.split("&");
				}
			} else {
				if ($(this).attr("href") != "undefined") {
					var strHref = $(this).attr("href");
					if (strHref.indexOf("?") > -1) {
						var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
						qString = strQueryString.split("&");
					}
				} else {
					return null;
				}
			}
		}
		if (qString == null) {
			return null;
		}
		for (var i = 0; i < qString.length; i++) {
			var index = qString[i].indexOf("=");
			if (index >= 0) {
				var strCurrentParamName = escape(unescape(qString[i].substr(0, index)));
				if (strCurrentParamName == strParamName) {
					returnVal.push(qString[i].substr(index + 1));
				}
			}
		}
		if (returnVal.length == 0) {
			return null;
		} else {
			if (returnVal.length == 1) {
				return returnVal[0];
			} else {
				return returnVal;
			}
		}
	}
});
var ecommLocaleMap = {
	"ecommLocalesList" : [{
			"ecommLocale" : "pl-pl",
			"seaLocale" : "pl-pl",
			"drLocale" : "pl_PL",
			"currency" : "PLN"
		}, {
			"ecommLocale" : "en-us",
			"seaLocale" : "en-us",
			"drLocale" : "en_US",
			"currency" : "USD"
		}, {
			"ecommLocale" : "en-ca",
			"seaLocale" : "en-ca",
			"drLocale" : "en_CA",
			"currency" : "CAD"
		}, {
			"ecommLocale" : "es-es",
			"seaLocale" : "es-es",
			"drLocale" : "es_ES",
			"currency" : "EUR"
		}, {
			"ecommLocale" : "en-ie",
			"seaLocale" : "en-gb",
			"drLocale" : "en_IE",
			"currency" : "EUR"
		}, {
			"ecommLocale" : "en-se",
			"seaLocale" : "en-gb",
			"drLocale" : "en_IE",
			"currency" : "SEK"
		}, {
			"ecommLocale" : "en-au",
			"seaLocale" : "en-au",
			"drLocale" : "en_AU",
			"currency" : "AUD"
		}, {
			"ecommLocale" : "en-dk",
			"seaLocale" : "en-gb",
			"drLocale" : "en_IE",
			"currency" : "DKK"
		}, {
			"ecommLocale" : "de-de",
			"seaLocale" : "de-de",
			"drLocale" : "de_DE",
			"currency" : "EUR"
		}, {
			"ecommLocale" : "en-ro",
			"seaLocale" : "en-gb",
			"drLocale" : "en_IE",
			"currency" : "RON"
		}, {
			"ecommLocale" : "en-lt",
			"seaLocale" : "en-gb",
			"drLocale" : "en_IE",
			"currency" : "LTL"
		}, {
			"ecommLocale" : "fr-fr",
			"seaLocale" : "fr-fr",
			"drLocale" : "fr_FR",
			"currency" : "EUR"
		}, {
			"ecommLocale" : "en-hu",
			"seaLocale" : "en-gb",
			"drLocale" : "en_IE",
			"currency" : "HUF"
		}, {
			"ecommLocale" : "en-cz",
			"seaLocale" : "en-gb",
			"drLocale" : "en_IE",
			"currency" : "CZK"
		}, {
			"ecommLocale" : "it-it",
			"seaLocale" : "it-it",
			"drLocale" : "it_IT",
			"currency" : "EUR"
		}, {
			"ecommLocale" : "en-gb",
			"seaLocale" : "en-gb",
			"drLocale" : "en_GB",
			"currency" : "GBP"
		}
	]
};
var gsaEcommLocaleMap = {
	"gsaEcommLocalesList" : []
};
function removeNotProdReady() {
	var host = window.location.host;
	var parts = host.split(".");
	var subdomain = parts[0];
	if (subdomain.indexOf("prod") == -1 && subdomain.indexOf("edit") == -1 && subdomain.indexOf("review") == -1 && subdomain.indexOf("tst") == -1 && subdomain.indexOf("dev") == -1 && subdomain.indexOf("stg") == -1) {
		$(".edit-only").remove();
	}
}
if (typeof(rcLocaleJS) == "undefined") {
	var rcLocaleJS = "";
}
if (typeof(spp_ProfileURL) == "undefined") {
	var spp_ProfileURL = "";
}
if (typeof(gsaSite) == "undefined") {
	var gsaSite = "";
}
if (typeof(gsaURL) == "undefined") {
	var gsaURL = "";
}
if (typeof(serverHost) == "undefined") {
	var serverHost = "";
}
var gblComStoreId;
if (gblComStoreId == null) {
	gblComStoreId = "sgateus";
}
var gblComLocale;
if (gblComLocale == null) {
	gblComLocale = "en_US";
}
var loggedinUserName = getCookie("USERDETAIL");
var isSeagateDirectUser = getCookie("isSDUSER");
var IsSppUser = "false";
var sdUrl = "/portal/site/direct";
var sppUrl = "/partners";
var sppLocale = "";
var DR_addToCart_URL = "https://shop.seagate.com/store/" + gblComStoreId + "/" + gblComLocale + "/AddItemToRequisition";
var DR_cartInfo_URL = "https://shop.seagate.com/store/" + gblComStoreId + "/DisplayPage/id.DRCartSummaryJSONPage/output.json/jsonp.CartInfo.updateCartDisplay";
var CartInfo = {
	init : function () {
		if (gblComStoreId != null && gblComStoreId != "null") {
			jQuery.getScript(DR_cartInfo_URL);
		}
	},
	updateCartDisplay : function (arg) {
		if (arg.lineItems == 0) {
			$("#headerCart").removeClass("btn-info");
			$("#headerCart").addClass("btn-primary");
		} else {
			$("#headerCart").removeClass("btn-primary");
			$("#headerCart").addClass("btn-info");
		}
		$("#cartLineItems").html(arg.lineItems);
	}
};
var DR_cartInfo_URL_x_New = "https://shop.seagate.com/store/" + gblComStoreId + "/DisplayPage/id.DRCartSummaryJSONPage/output.json/jsonp.CartInfoX_New.updateCartDisplay";
var CartInfoX_New = {
	init : function () {
		if (gblComStoreId != null && gblComStoreId != "null") {
			jQuery.getScript(DR_cartInfo_URL_x_New);
		}
	},
	updateCartDisplay : function (arg) {
		$("#cartLineItems_new").each(function () {
			$(this).after("<i>" + arg.lineItems + "</i>");
		});
	}
};
function setLoginState() {
	loggedinUserName = getCookie("USERDETAIL");
	IsSppUser = getCookie("ISSPPUSER");
	sppLocale = getCookie("SPPLOCALE");
	isSeagateDirectUser = getCookie("isSDUSER");
	if (document.getElementById("login-div") != null && document.getElementById("logout-div") != null) {
		if (typeof(loggedinUserName) != "undefined" && !isStringNullOrEmpty(loggedinUserName)) {
			document.getElementById("login-div").style.display = "none";
			document.getElementById("logout-div").style.display = "block";
			document.getElementById("userName").innerHTML = loggedinUserName;
		} else {
			document.getElementById("login-div").style.display = "block";
			document.getElementById("logout-div").style.display = "none";
			document.getElementById("userName").innerHTML = "";
		}
	}
	var userRole = getCookie("USERROLE");
	if (isStringNullOrEmpty(userRole)) {
		return;
	}
	if (userRole == "CI") {
		hideLocaleSelector();
		$("#dashboard").attr("href", labels.my_dashboard_url_ci);
		$("#profile").attr("href", labels.my_profile_url_ci);
		$("#logout").attr("href", "javascript:Logout('" + labels.logout_url_ci + "');");
	} else {
		if (userRole == "Employee") {
			setSessionCookie("USERDETAIL", "");
		} else {
			if (userRole == "Supplier") {
				$("#dashboard").attr("href", labels.my_dashboard_url_supplier);
				$("#profile").attr("href", labels.my_profile_url_supplier);
				$("#logout").attr("href", "javascript:Logout('" + labels.logout_url + "');");
			} else {
				if (userRole == "d" || userRole == "o") {
					$("#dashboard").attr("href", labels.my_dashboard_url_sd);
					$("#profile").attr("href", labels.my_profile_url_sd);
					$("#logout").attr("href", "javascript:Logout('" + labels.logout_url + "');");
				} else {
					if (userRole.indexOf("spp") != -1) {
						$("#dashboard").attr("href", labels.my_dashboard_url_spp);
						$("#gearbtn").attr("href", labels.my_profile_url_spp);
						$("#profile").attr("href", labels.my_profile_url_spp);
						$("#logout").attr("href", "javascript:Logout('" + labels.logout_url + "');");
						if (document.URL.indexOf("/partners/my-spp-dashboard") != -1) {
							hideLocaleSelector();
							currentCountry = getCountryForLocale(sppLocale);
						} else {
							if (document.URL.indexOf("/spp_EventDetails_vf") != -1 || document.URL.indexOf("/apex/SPP_PersonProfile_VF") != -1 || document.URL.indexOf("/apex/SPP_CompanyProfile_VF") != -1) {
								hideLocaleSelector();
							}
						}
						$("ul.breadcrumbs").find("li").each(function (index, value) {
							if (index == 0) {
								$(this).html("<a href='javascript:showSecurePage(sppUrl)'>" + labels.spp_home + "</a>");
							}
						});
						$("ul.nav-breadcrumb").find("li").each(function (index, value) {
							if (index == 0) {
								$(this).html("<a href='javascript:showSecurePage(sppUrl)'>" + labels.spp_home + "</a><span class='divider'>/</span>");
							}
						});
					} else {
						$("#dashboard").hide();
						$("#profile").attr("href", labels.my_profile_url_non_consumer);
						$("#logout").attr("href", "javascript:Logout('" + labels.logout_url + "');");
					}
				}
			}
		}
	}
}
function setLoginState_New() {
	loggedinUserName = getCookie("USERDETAIL");
	IsSppUser = getCookie("ISSPPUSER");
	sppLocale = getCookie("SPPLOCALE");
	isSeagateDirectUser = getCookie("isSDUSER");
	if (document.getElementById("not-logged-in") != null && document.getElementById("logged-in") != null) {
		if (typeof(loggedinUserName) != "undefined" && !isStringNullOrEmpty(loggedinUserName)) {
			$("#login-wrapper").addClass("logged-box");
			$("#logged-in-hello").html(loggedinUserName);
			$("#login-text").css("display", "none");
			$("#logged-in-hello").css("display", "inline-block");
			$(".arrow-down-icon").css("display", "inline-block");
		} else {
			$("#login-wrapper").removeClass("logged-box");
			$("#login-text").css("display", "inline-block");
			$("#logged-in-hello").css("display", "none");
			$(".arrow-down-icon").css("display", "inline-block");
		}
	}
}
function setLoginState_New_Mega_Nav() {
	loggedinUserName = getCookie("USERDETAIL");
	IsSppUser = getCookie("ISSPPUSER");
	sppLocale = getCookie("SPPLOCALE");
	isSeagateDirectUser = getCookie("isSDUSER");
	if (document.getElementById("not-logged-in-new") != null && document.getElementById("logged-in-new") != null) {
		if (typeof(loggedinUserName) != "undefined" && !isStringNullOrEmpty(loggedinUserName)) {
			$("#logged-in-hello-new").text(loggedinUserName);
			$("#logged-in-new").css("display", "");
			$("#not-logged-in-new").css("display", "none");
		} else {
			$("#logged-in-new").css("display", "none");
			$("#not-logged-in-new").css("display", "");
		}
	}
}
function hideLocaleSelector() {
	var selector = $(".globe-icon");
	selector.removeAttr("data-toggle").removeAttr("href");
	selector.hover(function () {
		$(this).css("text-decoration", "none");
		$(this).css("cursor", "default");
		$(".globe-icon .ss-icon:hover").css("color", "#333");
	});
}
function isStringNullOrEmpty(str) {
	if (str != null && str != "null" && str != "") {
		return false;
	}
	return true;
}
function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) {
			return null;
		}
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}
function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}
function Logout(redirectUrl) {
	window.top.name = "something_unique";
	deleteCookie("SMSESSION", "/", ".seagate.com");
	deleteCookie("USERDETAIL", "/", ".seagate.com");
	deleteCookie("LOCALSMSESSION", "/", ".seagate.com");
	deleteCookie("ISSPPUSER", "/", ".seagate.com");
	deleteCookie("userSelectedLocaleCookie", "/", ".seagate.com");
	deleteCookie("SPPLOCALE", "/", ".seagate.com");
	deleteCookie("isSDUSER", "/", ".seagate.com");
	deleteCookie("ISCIUSER", "/", ".seagate.com");
	deleteCookie("CILOCALE", "/", ".seagate.com");
	deleteCookie("USERROLE", "/", ".seagate.com");
	$.cookie("spp-news-alert-box-status", null, {
		path : "/"
	});
	document.location.href = redirectUrl;
	return false;
}
function replaceHttp(str, strt) {
	if (str.indexOf("http://") != -1 || str.indexOf("https://") != -1) {
		var firstIndex = str.indexOf("http://");
		if (firstIndex == -1) {
			firstIndex = str.indexOf("https://");
		}
		var newStr = str.substring(0, firstIndex);
		var rest = str.substring(firstIndex, str.length);
		var restt = strt.substring(firstIndex, strt.length);
		var blankIndex = rest.indexOf(" ");
		var blankIndext = restt.indexOf(" ");
		var url = "";
		var urlt = "";
		var restWO = "";
		var restWOt = "";
		if (blankIndext == -1) {
			urlt = restt;
		} else {
			urlt = strt.substring(firstIndex, firstIndex + blankIndext);
			restWOt = restt.substring(blankIndex, restt.length);
		}
		if (blankIndex == -1) {
			url = rest;
		} else {
			url = str.substring(firstIndex, firstIndex + blankIndex);
			restWO = rest.substring(blankIndex, rest.length);
		}
		newStr = newStr + "<a href='" + urlt + "'>" + url + "</a>";
		if (restWO.indexOf("http://") != -1 || restWO.indexOf("https://") != -1) {
			restWO = replaceHttp(restWO, restWOt);
		}
		newStr = newStr + restWO;
		return newStr;
	} else {
		return str;
	}
}
function getTwitterFeed(userId, id, listSelector) {
	$.ajax({
		type : "GET",
		url : ("https:" == document.location.protocol ? "https://" : "http://") + "search.twitter.com/search.json?callback=?&rpp=1&q=from:" + userId,
		dataType : "json",
		error : function () {
			$("#" + id).remove();
			$("#newsBarHoldLI").fadeGallery({
				listSelector : listSelector,
				navCreate : true,
				swichTime : 7000,
				delay : 800,
				fadeIEfix : false,
				mouseOverPause : true
			});
		},
		success : function (dataString) {
			if (dataString != null && dataString != "" && dataString.results.length > 0 && dataString.results[0].text != "undefined" && dataString.results[0].text != "") {
				var latestTweet = dataString.results[0].text;
				var atseagate = "@" + userId + ": ";
				var atseagateD = "<strong>@" + userId + ": </strong>";
				latestTweet = atseagate + latestTweet;
				var len = latestTweet.length;
				var latestTweetD = "";
				var points = "";
				if (len <= 120) {
					latestTweetD = replaceHttp(latestTweet, latestTweet);
				} else {
					var latestTweet120 = latestTweet.substring(0, 120);
					latestTweetD = replaceHttp(latestTweet120, latestTweet);
					points = "...";
				}
				latestTweetD = atseagateD + latestTweetD.substring(atseagate.length, latestTweetD.length);
				$("#" + id).html(latestTweetD + points);
			} else {
				$("#" + id).remove();
			}
			$("#newsBarHoldLI").fadeGallery({
				listSelector : listSelector,
				navCreate : true,
				swichTime : 7000,
				delay : 800,
				fadeIEfix : false,
				mouseOverPause : true
			});
		}
	});
}
var pagenotfound = true;
function setConsumerTargetUrl() {
	var acct = document.getElementById("consumer-accountSelect");
	var trg = document.getElementById("consumer-target");
	trg.value = acct.value;
}
function showSecurePage(secureUrl) {
	if (secureUrl.indexOf("http://") == -1) {
		secureUrl = httpsURL + secureUrl;
	}
	if (!isStringNullOrEmpty(loggedinUserName)) {
		if (IsSppUser == "true") {
			window.location.href = secureUrl.replace("http://", "https://");
		} else {
			if (isSeagateDirectUser == "true") {
				window.location.href = secureUrl.replace("http://", "https://");
			} else {
				window.location.href = secureUrl.replace("https://", "http://");
			}
		}
	} else {
		window.location.href = secureUrl.replace("https://", "http://");
	}
}
function submitSearchFormPromo() {
	var searchMsg = document.getElementById("searchMSG").value;
	var formId = "suggestion_form2";
	var qv = document.getElementById(formId).q.value;
	if (!qv || !($.trim(qv)) || qv == searchMsg || qv == "") {
		return false;
	} else {
		var n = rcLocaleJS.split("-");
		var localeURL = "/" + n[1] + "/" + n[0];
		if (rcLocaleJS == "en-us") {
			localeURL = "";
		}
		window.location.href = "//" + serverHost + localeURL + "/search/?keyword=" + encoding(qv);
		return false;
	}
}
function submitSearchFormPromoX_New(device) {
	var searchMsg = document.getElementById("searchMSG").value;
	var qv = document.getElementById("suggestion_form2_" + device).q.value;
	var searchHost = serverHost;
	searchHost = serverHost.replace(/^.*\/\//, "");
	if (typeof(rcLocaleJS) == "undefined" || rcLocaleJS == "") {
		var rcLocaleJS = "en-us";
	}
	if (!qv || !($.trim(qv)) || qv == searchMsg || qv == "") {
		return false;
	} else {
		var n = rcLocaleJS.split("-");
		var localeURL = "/" + n[1] + "/" + n[0];
		if (rcLocaleJS == "en-us") {
			localeURL = "";
		}
		window.location.href = "//" + searchHost + localeURL + "/search/?keyword=" + qv;
		return false;
	}
}
function submitSearchForm404() {
	var qv = document.getElementById("suggestion_form404").q.value;
	if (!qv || !($.trim(qv)) || qv == searchMsg || qv == "") {
		return false;
	} else {
		var n = rcLocaleJS.split("-");
		var localeURL = "/" + n[1] + "/" + n[0];
		if (rcLocaleJS == "en-us") {
			localeURL = "";
		}
		window.location.href = "//" + serverHost + localeURL + "/search/?keyword=" + encoding(qv);
		return false;
	}
}
function encoding(source) {
	var target = source;
	target = encodeURI(target);
	target = target.replace(/\@/g, "%40");
	target = target.replace(/\#/g, "%23");
	target = target.replace(/\\$/g, "%24");
	target = target.replace(/\&/g, "%26");
	target = target.replace(/\=/g, "%3D");
	target = target.replace(/\//g, "%2F");
	target = target.replace(/\,/g, "%2C");
	target = target.replace(/\;/g, "%3B");
	target = target.replace(/\?/g, "%3F");
	target = target.replace(/\+/g, "%2B");
	target = target.replace(/\'/g, "%27");
	target = target.replace(/\=/g, "%3D");
	return target;
}
$("#searchPromo").keydown(function (e) {
	e = e || window.event;
	if (document.getElementById("suggestion_form2") != undefined) {
		document.getElementById("suggestion_form2").className = "";
	}
});
function suggSearchApply(suggSearch) {
	document.getElementById("suggestion_form2").querySearch.value = suggSearch;
	document.getElementById("suggestion_form2").q.value = suggSearch;
	submitSearchFormPromo();
}
$(document).ready(function () {
	var clearCart = getCookie("clearCart");
	if (clearCart != null) {
		document.getElementById("ClearCartIframe").src = "http://shop.seagate.com/store/sgateus/" + clearCart + "/ResetShoppingCart";
		removeCookie("clearCart");
	}
	setViewCartLink();
	$(".globe-icon").on("click touchstart", function (e) {
		if ($(".view-cart > i").length != 0 && $(".view-cart > i").text() != "0") {
			$(".nav-footer-cart-warning").show();
		} else {
			if ($(".view-cart > i").length == 0 && getEcommLocale() != "") {
				$(".nav-footer-cart-warning").show();
			}
		}
	});
	$(".nav-footer-checkbox").on("click touchstart", function (e) {
		e.preventDefault();
		if ($(".nav-footer-checked").css("display") == "inline-block" || $(".nav-footer-checked").css("display") == "block") {
			$(".nav-footer-checked").css("display", "none");
			$(".nav-footer-unchecked").css("display", "inline-block");
			$("#nav-footer-remember").prop("checked", false);
		} else {
			$(".nav-footer-unchecked").css("display", "none");
			$(".nav-footer-checked").css("display", "inline-block");
			$("#nav-footer-remember").prop("checked", true);
		}
	});
	removeNotProdReady();
	var autoSugglistener = window.addEventListener;
	var autoSuggEventType = "load";
	if (!autoSugglistener) {
		autoSugglistener = window.attachEvent;
		autoSuggEventType = "onload";
	}
	autoSugglistener(autoSuggEventType, function () {
		var searchHost = serverHost;
		searchHost = serverHost.replace(/^.*\/\//, "");
		$("#searchPromo").autocomplete({
			source : "//" + searchHost + "/ww/autoSuggest?site=" + gsaSite + "&host=" + gsaURL + "&rcLocaleJS=" + rcLocaleJS,
			select : function (event, item) {
				$("#searchPromo").val(item.item.value);
				if (this.form.id == "domore_form") {
					submitdoMoreSearchForm();
				} else {
					submitSearchFormPromo();
				}
			}
		});
	}, false);
	autoSugglistener(autoSuggEventType, function () {
		var searchHost = serverHost;
		searchHost = serverHost.replace(/^.*\/\//, "");
		$("#searchPromoX-desk").autocomplete({
			source : "//" + searchHost + "/ww/autoSuggest?site=" + gsaSite + "&host=" + gsaURL + "&rcLocaleJS=" + rcLocaleJS,
			select : function (event, item) {
				$("#searchPromoX-desk").val(item.item.value);
				submitSearchFormPromoX_New("desk");
			}
		});
	}, false);
	autoSugglistener(autoSuggEventType, function () {
		var searchHost = serverHost;
		searchHost = serverHost.replace(/^.*\/\//, "");
		$("#searchPromoX-mobile").autocomplete({
			source : "//" + searchHost + "/ww/autoSuggest?site=" + gsaSite + "&host=" + gsaURL + "&rcLocaleJS=" + rcLocaleJS,
			select : function (event, item) {
				$("#searchPromoX-mobile").val(item.item.value);
				submitSearchFormPromoX_New("mobile");
			}
		});
	}, false);
	autoSugglistener(autoSuggEventType, function () {
		$("#spp-support-search-textbox").autocomplete({
			source : "//" + serverHost + "/ww/autoSuggest?site=" + gsaSite + "&host=" + gsaURL + "&rcLocaleJS=" + rcLocaleJS,
			select : function (event, item) {
				$("#spp-support-search-textbox").val(item.item.value);
				$("#spp-search-support").submit();
			}
		});
	}, false);
	var smeSessionCookie = getCookie("SMSESSION");
	var userDetail = getCookie("USERDETAIL");
	setLoginState();
	setLoginState_New();
	setLoginState_New_Mega_Nav();
	displayCartIcon();
	if (typeof(loginVar == "undefined")) {
		var loginVar = "xxx";
	}
	$.ajax({
		type : "GET",
		url : labels.consumer_util_url,
		dataType : "jsonp",
		success : function (data) {
			var userRole = "";
			var isCIUser = data.isCIUser;
			if (isCIUser) {
				userRole = "CI";
				setSessionCookie("USERDETAIL", data.userName);
				setSessionCookie("ISCIUSER", data.isCIUser);
				setSessionCookie("CILOCALE", data.CILocale);
				setSessionCookie("USERROLE", userRole);
				setLoginState();
				setLoginState_New();
				setLoginState_New_Mega_Nav();
				displayCartIcon();
			} else {
				if ((!isStringNullOrEmpty(smeSessionCookie) && (isStringNullOrEmpty(userDetail))) || userDetail != loginVar.userName) {
					displayHeader();
				}
			}
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			if ((!isStringNullOrEmpty(smeSessionCookie) && (isStringNullOrEmpty(userDetail))) || userDetail != loginVar.userName) {
				displayHeader();
			}
		},
		crossDomain : true,
		jsonpCallback : "results"
	});
	$("#login-div li").mouseover(function () {
		$("#header .searchForm").css("visibility", "hidden");
	}).mouseout(function () {
		$("#header .searchForm").css("visibility", "visible");
	});
	if ($("#partnerLoginFrm")[0]) {
		$("#formPassword").keyup(function (e) {
			if (e.which == 13) {
				e.preventDefault();
				loginSubmit();
			}
		});
	}
	var navTab = $(document).getUrlParam("navtab");
	var subNavTab = $(document).getUrlParam("subnavtab");
	if (navTab) {
		var navTabLink = "#" + navTab + "-li4";
		var navTabContent = "#" + navTab + "-cd4";
		var navTabContentF = $(navTabContent).parents("div.tab4");
		var navTabContentF1 = $(navTabContent).parents("div.tab");
		if ($(navTabLink).html()) {
			$(navTabLink).siblings().removeClass("active");
			$(navTabLink).addClass("active");
			if (navTabContentF.length > 0) {
				navTabContentF.siblings().removeClass("active");
				navTabContentF.addClass("active");
			}
			if ($(navTabLink).length > 0) {
				$(navTabLink).click();
			}
		}
		if (subNavTab) {
			var subNavTabLink = "#" + subNavTab + "-li3";
			var subNavTabContent = "#" + subNavTab + "-cd3";
			var subNavTabContentF = $(subNavTabContent).parents("div.tab3");
			if ($(subNavTabLink).html()) {
				$(subNavTabLink).siblings().removeClass("active");
				$(subNavTabLink).addClass("active");
				if (subNavTabContentF.length > 0) {
					subNavTabContentF.siblings().removeClass("active").css({
						"position" : "absolute",
						"top" : "-99999px",
						"left" : "-99999px"
					});
					subNavTabContentF.addClass("active").css({
						"position" : "static",
						"top" : "0px",
						"left" : "0px"
					});
				}
				if ($(subNavTabLink).length > 0) {
					$(subNavTabLink).click();
				}
			}
		}
	}
	$("a.videoCallBtn_Popup").click(function () {
		if ($("#videoPopup").length > 0) {
			$("#videoPopup .title").html($(this).attr("videotitle"));
			var videoContentHtml = '<object width="648" height="422">' + '<param name="movie" value="' + $(this).attr("videourl") + '"></param>' + '<embed src="' + $(this).attr("videourl") + '" type="application/x-shockwave-flash" width="648" height="422" wmode="transparent" allowfullscreen="true"></embed>' + '<param name="allowFullScreen" value="true"></object>';
			$(".video").html(videoContentHtml);
		}
	});
	if (isSeagateDirectUser == "true") {
		$("ul.breadcrumbs").find("li").each(function (index, value) {
			if (index == 0) {
				$(this).html("<a href='javascript:showSecurePage(sdUrl)'>" + labels.seagate_direct_home + "</a>");
			}
		});
		$("ul.nav-breadcrumb").find("li").each(function (index, value) {
			if (index == 0) {
				$(this).html("<a href='javascript:showSecurePage(sdUrl)'>" + labels.seagate_direct_home + "</a><span class='divider'>/</span>");
			}
		});
	}
	if (IsSppUser == "true") {
		$("ul.breadcrumbs").find("li").each(function (index, value) {
			if (index == 0) {
				$(this).html("<a href='javascript:showSecurePage(sppUrl)'>" + labels.spp_home + "</a>");
			}
		});
		$("ul.nav-breadcrumb").find("li").each(function (index, value) {
			if (index == 0) {
				$(this).html("<a href='javascript:showSecurePage(sppUrl)'>" + labels.spp_home + "</a><span class='divider'>/</span>");
			}
		});
	}
	if ($(".support-downloads.support-pdp").length > 0) {
		generateSupportDownloadsDocumentsLinks();
	}
});
$(window).load(function () {
	if ($("#cartSection").length != 0) {
		CartInfo.init();
	}
	if ($("#cartLineItems_new").length != 0) {
		CartInfoX_New.init();
	}
});
function generateCollapse(ulId, key) {
	var $Ul = $("#" + ulId);
	var $Lis = null;
	if ($Ul != null) {
		$Lis = $Ul.children();
	}
	if ($Lis == null || $Lis.length == 0) {
		$Ul.prev().remove();
		$Ul.remove();
	} else {
		if ($Lis.length > 5) {
			var collapseStr = '<li><i class="ss-navigateright"></i>' + '<div class="support-pdp-list-item">' + '<a href="#" class="collapse-toggle" data-toggle="collapse" data-target="#collapse-' + ulId + '">' + key + "</a>" + "</div>" + '<div class="collapse-content collapse" id="collapse-' + ulId + '" style="height:0px">' + '<div class="collapse-inner">' + '<ul class="support-pdp-list unstyled">';
			$Lis.each(function (i, val) {
				if (i > 4) {
					collapseStr = collapseStr + "<li>" + val.innerHTML + "</li>";
					$(val).remove();
				}
			});
			collapseStr = collapseStr + "</ul></div></div></li>";
			$Ul.html($Ul.html() + collapseStr);
		}
	}
}
function generateSupportDownloadsDocumentsLinks() {
	var SeeAllDownloadsText = $("#SeeAllDownloads").val();
	generateCollapse("supportDownloads", SeeAllDownloadsText);
	var $supportDownloadsReal = $("#supportDownloadsReal");
	if ($supportDownloadsReal != null) {
		$("#supportDownloadsMark").replaceWith($("#supportDownloadsReal").html());
		$("#supportDownloadsMark").attr("display", "block");
		$("#supportDownloadsReal").remove();
	}
	var SeeAllDocumentsText = $("#SeeAllDocuments").val();
	generateCollapse("supportDocuments", SeeAllDocumentsText);
	var $supportKeyLinks = $("#supportKeyLinks");
	if ($supportKeyLinks != null && $supportKeyLinks.children().length > 5 && "${foundPDP}" == "true") {
		var $pdpLi = $supportKeyLinks.children().last();
		$supportKeyLinks.children().eq(3).after($pdpLi);
	}
	var SeeAllKeyLinksText = $("#SeeAllKeyLinks").val();
	generateCollapse("supportKeyLinks", SeeAllKeyLinksText);
}
function getEcommLocale() {
	var ecommLocale = "";
	ecommLocale = getCookie(LOCALE_COOKIE_NAME_ECOMM_TEMP);
	if (ecommLocale == null) {
		ecommLocale = getCookie(LOCALE_COOKIE_NAME_ECOMM_PERMANENT);
	}
	if (ecommLocale == null && SUPPORTED_ECOMM_LOCALE.indexOf(rcLocaleJS) != -1) {
		ecommLocale = rcLocaleJS;
	} else {
		if (ecommLocale == null) {
			ecommLocale = "";
		}
	}
	if (SUPPORTED_ECOMM_LOCALE.indexOf(ecommLocale) == -1) {
		ecommLocale = "";
	}
	return ecommLocale;
}
function getEcommCurrency() {
	for (i = 0; i < ecommLocaleMap.ecommLocalesList.length; i++) {
		if (ecommLocaleMap.ecommLocalesList[i].ecommLocale == getEcommLocale()) {
			return ecommLocaleMap.ecommLocalesList[i].currency;
		}
	}
}
function getDrLocale() {
	for (i = 0; i < ecommLocaleMap.ecommLocalesList.length; i++) {
		if (ecommLocaleMap.ecommLocalesList[i].ecommLocale == getEcommLocale()) {
			return ecommLocaleMap.ecommLocalesList[i].drLocale;
		}
	}
}
function setViewCartLink() {
	if (typeof(ecommLocaleMap != "undefined")) {
		var drLocale = getDrLocale();
		$(".view-cart").attr("href", "https://shop.seagate.com/servlet/ControllerServlet?Action=DisplayPage&Env=BASE&id=ThreePgCheckoutShoppingCartPage&Locale=" + drLocale + "&SiteID=sgateus");
	} else {
		$(".view-cart").attr("href", "https://shop.seagate.com/servlet/ControllerServlet?Action=DisplayPage&Env=BASE&id=ThreePgCheckoutShoppingCartPage&Locale=en_US&SiteID=sgateus");
	}
}
function displayCartIcon() {
	var ecommLocale = getEcommLocale();
	if (ecommLocale != "") {
		$(".gn-cart.gn-icon").css("display", "");
		$(".gn-store").css("display", "");
	}
}
function displayHeader() {
	$.ajax({
		type : "GET",
		url : httpsURL + "/ww/jsp/common/configUtil.jsp",
		dataType : "jsonp",
		success : function (data) {
			setSessionCookie("USERDETAIL", data.userName);
			setSessionCookie("ISSPPUSER", data.isSppUser);
			setSessionCookie("SPPLOCALE", data.SppLocale);
			var userRole = data.userRole;
			var userGroup = data.userGroup;
			if (userGroup != "undefined" && userGroup.indexOf("cn=all seagate suppliers") != -1) {
				userRole = "Supplier";
			} else {
				if (userRole == "" && userGroup.indexOf("o=seagate.com") != -1) {
					userRole = "Employee";
				}
			}
			setSessionCookie("USERROLE", userRole);
			setLoginState();
			setLoginState_New();
			setLoginState_New_Mega_Nav();
			displayCartIcon();
		},
		crossDomain : true,
		jsonpCallback : "results"
	});
}
$(document).ready(function () {
	$(".nav-list .noclick>a").css("cursor", "default").css("text-decoration", "none");
	$(".nav-list .noclick>a").click(function (e) {
		e.preventDefault();
	});
});
(function (root, doc, factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], function ($) {
			factory($, root, doc);
			return $.mobile;
		});
	} else {
		factory(root.jQuery, root, doc);
	}
}
	(this, document, function (jQuery, window, document, undefined) {
		(function ($, window, document, undefined) {
			var dataPropertyName = "virtualMouseBindings",
			touchTargetPropertyName = "virtualTouchID",
			virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
			touchEventProps = "clientX clientY pageX pageY screenX screenY".split(" "),
			mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
			mouseEventProps = $.event.props.concat(mouseHookProps),
			activeDocHandlers = {},
			resetTimerID = 0,
			startX = 0,
			startY = 0,
			didScroll = false,
			clickBlockList = [],
			blockMouseTriggers = false,
			blockTouchTriggers = false,
			eventCaptureSupported = "addEventListener" in document,
			$document = $(document),
			nextTouchID = 1,
			lastTouchID = 0,
			threshold,
			i;
			$.vmouse = {
				moveDistanceThreshold : 10,
				clickDistanceThreshold : 10,
				resetTimerDuration : 1500
			};
			function getNativeEvent(event) {
				while (event && typeof event.originalEvent !== "undefined") {
					event = event.originalEvent;
				}
				return event;
			}
			function createVirtualEvent(event, eventType) {
				var t = event.type,
				oe,
				props,
				ne,
				prop,
				ct,
				touch,
				i,
				j,
				len;
				event = $.Event(event);
				event.type = eventType;
				oe = event.originalEvent;
				props = $.event.props;
				if (t.search(/^(mouse|click)/) > -1) {
					props = mouseEventProps;
				}
				if (oe) {
					for (i = props.length, prop; i; ) {
						prop = props[--i];
						event[prop] = oe[prop];
					}
				}
				if (t.search(/mouse(down|up)|click/) > -1 && !event.which) {
					event.which = 1;
				}
				if (t.search(/^touch/) !== -1) {
					ne = getNativeEvent(oe);
					t = ne.touches;
					ct = ne.changedTouches;
					touch = (t && t.length) ? t[0] : ((ct && ct.length) ? ct[0] : undefined);
					if (touch) {
						for (j = 0, len = touchEventProps.length; j < len; j++) {
							prop = touchEventProps[j];
							event[prop] = touch[prop];
						}
					}
				}
				return event;
			}
			function getVirtualBindingFlags(element) {
				var flags = {},
				b,
				k;
				while (element) {
					b = $.data(element, dataPropertyName);
					for (k in b) {
						if (b[k]) {
							flags[k] = flags.hasVirtualBinding = true;
						}
					}
					element = element.parentNode;
				}
				return flags;
			}
			function getClosestElementWithVirtualBinding(element, eventType) {
				var b;
				while (element) {
					b = $.data(element, dataPropertyName);
					if (b && (!eventType || b[eventType])) {
						return element;
					}
					element = element.parentNode;
				}
				return null;
			}
			function enableTouchBindings() {
				blockTouchTriggers = false;
			}
			function disableTouchBindings() {
				blockTouchTriggers = true;
			}
			function enableMouseBindings() {
				lastTouchID = 0;
				clickBlockList.length = 0;
				blockMouseTriggers = false;
				disableTouchBindings();
			}
			function disableMouseBindings() {
				enableTouchBindings();
			}
			function startResetTimer() {
				clearResetTimer();
				resetTimerID = setTimeout(function () {
						resetTimerID = 0;
						enableMouseBindings();
					}, $.vmouse.resetTimerDuration);
			}
			function clearResetTimer() {
				if (resetTimerID) {
					clearTimeout(resetTimerID);
					resetTimerID = 0;
				}
			}
			function triggerVirtualEvent(eventType, event, flags) {
				var ve;
				if ((flags && flags[eventType]) || (!flags && getClosestElementWithVirtualBinding(event.target, eventType))) {
					ve = createVirtualEvent(event, eventType);
					$(event.target).trigger(ve);
				}
				return ve;
			}
			function mouseEventCallback(event) {
				var touchID = $.data(event.target, touchTargetPropertyName),
				ve;
				if (!blockMouseTriggers && (!lastTouchID || lastTouchID !== touchID)) {
					ve = triggerVirtualEvent("v" + event.type, event);
					if (ve) {
						if (ve.isDefaultPrevented()) {
							event.preventDefault();
						}
						if (ve.isPropagationStopped()) {
							event.stopPropagation();
						}
						if (ve.isImmediatePropagationStopped()) {
							event.stopImmediatePropagation();
						}
					}
				}
			}
			function handleTouchStart(event) {
				var touches = getNativeEvent(event).touches,
				target,
				flags,
				t;
				if (touches && touches.length === 1) {
					target = event.target;
					flags = getVirtualBindingFlags(target);
					if (flags.hasVirtualBinding) {
						lastTouchID = nextTouchID++;
						$.data(target, touchTargetPropertyName, lastTouchID);
						clearResetTimer();
						disableMouseBindings();
						didScroll = false;
						t = getNativeEvent(event).touches[0];
						startX = t.pageX;
						startY = t.pageY;
						triggerVirtualEvent("vmouseover", event, flags);
						triggerVirtualEvent("vmousedown", event, flags);
					}
				}
			}
			function handleScroll(event) {
				if (blockTouchTriggers) {
					return;
				}
				if (!didScroll) {
					triggerVirtualEvent("vmousecancel", event, getVirtualBindingFlags(event.target));
				}
				didScroll = true;
				startResetTimer();
			}
			function handleTouchMove(event) {
				if (blockTouchTriggers) {
					return;
				}
				var t = getNativeEvent(event).touches[0],
				didCancel = didScroll,
				moveThreshold = $.vmouse.moveDistanceThreshold,
				flags = getVirtualBindingFlags(event.target);
				didScroll = didScroll || (Math.abs(t.pageX - startX) > moveThreshold || Math.abs(t.pageY - startY) > moveThreshold);
				if (didScroll && !didCancel) {
					triggerVirtualEvent("vmousecancel", event, flags);
				}
				triggerVirtualEvent("vmousemove", event, flags);
				startResetTimer();
			}
			function handleTouchEnd(event) {
				if (blockTouchTriggers) {
					return;
				}
				disableTouchBindings();
				var flags = getVirtualBindingFlags(event.target),
				ve,
				t;
				triggerVirtualEvent("vmouseup", event, flags);
				if (!didScroll) {
					ve = triggerVirtualEvent("vclick", event, flags);
					if (ve && ve.isDefaultPrevented()) {
						t = getNativeEvent(event).changedTouches[0];
						clickBlockList.push({
							touchID : lastTouchID,
							x : t.clientX,
							y : t.clientY
						});
						blockMouseTriggers = true;
					}
				}
				triggerVirtualEvent("vmouseout", event, flags);
				didScroll = false;
				startResetTimer();
			}
			function hasVirtualBindings(ele) {
				var bindings = $.data(ele, dataPropertyName),
				k;
				if (bindings) {
					for (k in bindings) {
						if (bindings[k]) {
							return true;
						}
					}
				}
				return false;
			}
			function dummyMouseHandler() {}

			function getSpecialEventObject(eventType) {
				var realType = eventType.substr(1);
				return {
					setup : function () {
						if (!hasVirtualBindings(this)) {
							$.data(this, dataPropertyName, {});
						}
						var bindings = $.data(this, dataPropertyName);
						bindings[eventType] = true;
						activeDocHandlers[eventType] = (activeDocHandlers[eventType] || 0) + 1;
						if (activeDocHandlers[eventType] === 1) {
							$document.bind(realType, mouseEventCallback);
						}
						$(this).bind(realType, dummyMouseHandler);
						if (eventCaptureSupported) {
							activeDocHandlers["touchstart"] = (activeDocHandlers["touchstart"] || 0) + 1;
							if (activeDocHandlers["touchstart"] === 1) {
								$document.bind("touchstart", handleTouchStart).bind("touchend", handleTouchEnd).bind("touchmove", handleTouchMove).bind("scroll", handleScroll);
							}
						}
					},
					teardown : function () {
						--activeDocHandlers[eventType];
						if (!activeDocHandlers[eventType]) {
							$document.unbind(realType, mouseEventCallback);
						}
						if (eventCaptureSupported) {
							--activeDocHandlers["touchstart"];
							if (!activeDocHandlers["touchstart"]) {
								$document.unbind("touchstart", handleTouchStart).unbind("touchmove", handleTouchMove).unbind("touchend", handleTouchEnd).unbind("scroll", handleScroll);
							}
						}
						var $this = $(this),
						bindings = $.data(this, dataPropertyName);
						if (bindings) {
							bindings[eventType] = false;
						}
						$this.unbind(realType, dummyMouseHandler);
						if (!hasVirtualBindings(this)) {
							$this.removeData(dataPropertyName);
						}
					}
				};
			}
			for (i = 0; i < virtualEventNames.length; i++) {
				$.event.special[virtualEventNames[i]] = getSpecialEventObject(virtualEventNames[i]);
			}
			if (eventCaptureSupported) {
				document.addEventListener("click", function (e) {
					var cnt = clickBlockList.length,
					target = e.target,
					x,
					y,
					ele,
					i,
					o,
					touchID;
					if (cnt) {
						x = e.clientX;
						y = e.clientY;
						threshold = $.vmouse.clickDistanceThreshold;
						ele = target;
						while (ele) {
							for (i = 0; i < cnt; i++) {
								o = clickBlockList[i];
								touchID = 0;
								if ((ele === target && Math.abs(o.x - x) < threshold && Math.abs(o.y - y) < threshold) || $.data(ele, touchTargetPropertyName) === o.touchID) {
									e.preventDefault();
									e.stopPropagation();
									return;
								}
							}
							ele = ele.parentNode;
						}
					}
				}, true);
			}
		})(jQuery, window, document);
		(function ($) {
			$.mobile = {};
		}
			(jQuery));
		(function ($, undefined) {
			var support = {
				touch : "ontouchend" in document
			};
			$.mobile.support = $.mobile.support || {};
			$.extend($.support, support);
			$.extend($.mobile.support, support);
		}
			(jQuery));
		(function ($, window, undefined) {
			var $document = $(document),
			supportTouch = $.mobile.support.touch,
			scrollEvent = "touchmove scroll",
			touchStartEvent = supportTouch ? "touchstart" : "mousedown",
			touchStopEvent = supportTouch ? "touchend" : "mouseup",
			touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
			$.each(("touchstart touchmove touchend " + "tap taphold " + "swipe swipeleft swiperight " + "scrollstart scrollstop").split(" "), function (i, name) {
				$.fn[name] = function (fn) {
					return fn ? this.bind(name, fn) : this.trigger(name);
				};
				if ($.attrFn) {
					$.attrFn[name] = true;
				}
			});
			function triggerCustomEvent(obj, eventType, event, bubble) {
				var originalType = event.type;
				event.type = eventType;
				if (bubble) {
					$.event.trigger(event, undefined, obj);
				} else {
					$.event.dispatch.call(obj, event);
				}
				event.type = originalType;
			}
			$.event.special.scrollstart = {
				enabled : true,
				setup : function () {
					var thisObject = this,
					$this = $(thisObject),
					scrolling,
					timer;
					function trigger(event, state) {
						scrolling = state;
						triggerCustomEvent(thisObject, scrolling ? "scrollstart" : "scrollstop", event);
					}
					$this.bind(scrollEvent, function (event) {
						if (!$.event.special.scrollstart.enabled) {
							return;
						}
						if (!scrolling) {
							trigger(event, true);
						}
						clearTimeout(timer);
						timer = setTimeout(function () {
								trigger(event, false);
							}, 50);
					});
				},
				teardown : function () {
					$(this).unbind(scrollEvent);
				}
			};
			$.event.special.tap = {
				tapholdThreshold : 750,
				emitTapOnTaphold : true,
				setup : function () {
					var thisObject = this,
					$this = $(thisObject),
					isTaphold = false;
					$this.bind("vmousedown", function (event) {
						isTaphold = false;
						if (event.which && event.which !== 1) {
							return false;
						}
						var origTarget = event.target,
						timer;
						function clearTapTimer() {
							clearTimeout(timer);
						}
						function clearTapHandlers() {
							clearTapTimer();
							$this.unbind("vclick", clickHandler).unbind("vmouseup", clearTapTimer);
							$document.unbind("vmousecancel", clearTapHandlers);
						}
						function clickHandler(event) {
							clearTapHandlers();
							if (!isTaphold && origTarget === event.target) {
								triggerCustomEvent(thisObject, "tap", event);
							} else {
								if (isTaphold) {
									event.preventDefault();
								}
							}
						}
						$this.bind("vmouseup", clearTapTimer).bind("vclick", clickHandler);
						$document.bind("vmousecancel", clearTapHandlers);
						timer = setTimeout(function () {
								if (!$.event.special.tap.emitTapOnTaphold) {
									isTaphold = true;
								}
								triggerCustomEvent(thisObject, "taphold", $.Event("taphold", {
										target : origTarget
									}));
							}, $.event.special.tap.tapholdThreshold);
					});
				},
				teardown : function () {
					$(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup");
					$document.unbind("vmousecancel");
				}
			};
			$.event.special.swipe = {
				scrollSupressionThreshold : 30,
				durationThreshold : 1000,
				horizontalDistanceThreshold : 30,
				verticalDistanceThreshold : 30,
				getLocation : function (event) {
					var winPageX = window.pageXOffset,
					winPageY = window.pageYOffset,
					x = event.clientX,
					y = event.clientY;
					if (event.pageY === 0 && Math.floor(y) > Math.floor(event.pageY) || event.pageX === 0 && Math.floor(x) > Math.floor(event.pageX)) {
						x = x - winPageX;
						y = y - winPageY;
					} else {
						if (y < (event.pageY - winPageY) || x < (event.pageX - winPageX)) {
							x = event.pageX - winPageX;
							y = event.pageY - winPageY;
						}
					}
					return {
						x : x,
						y : y
					};
				},
				start : function (event) {
					var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
					location = $.event.special.swipe.getLocation(data);
					return {
						time : (new Date()).getTime(),
						coords : [location.x, location.y],
						origin : $(event.target)
					};
				},
				stop : function (event) {
					var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
					location = $.event.special.swipe.getLocation(data);
					return {
						time : (new Date()).getTime(),
						coords : [location.x, location.y]
					};
				},
				handleSwipe : function (start, stop, thisObject, origTarget) {
					if (stop.time - start.time < $.event.special.swipe.durationThreshold && Math.abs(start.coords[0] - stop.coords[0]) > $.event.special.swipe.horizontalDistanceThreshold && Math.abs(start.coords[1] - stop.coords[1]) < $.event.special.swipe.verticalDistanceThreshold) {
						var direction = start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight";
						triggerCustomEvent(thisObject, "swipe", $.Event("swipe", {
								target : origTarget,
								swipestart : start,
								swipestop : stop
							}), true);
						triggerCustomEvent(thisObject, direction, $.Event(direction, {
								target : origTarget,
								swipestart : start,
								swipestop : stop
							}), true);
						return true;
					}
					return false;
				},
				eventInProgress : false,
				setup : function () {
					var events,
					thisObject = this,
					$this = $(thisObject),
					context = {};
					events = $.data(this, "mobile-events");
					if (!events) {
						events = {
							length : 0
						};
						$.data(this, "mobile-events", events);
					}
					events.length++;
					events.swipe = context;
					context.start = function (event) {
						if ($.event.special.swipe.eventInProgress) {
							return;
						}
						$.event.special.swipe.eventInProgress = true;
						var stop,
						start = $.event.special.swipe.start(event),
						origTarget = event.target,
						emitted = false;
						context.move = function (event) {
							if (!start) {
								return;
							}
							stop = $.event.special.swipe.stop(event);
							if (!emitted) {
								emitted = $.event.special.swipe.handleSwipe(start, stop, thisObject, origTarget);
								if (emitted) {
									$.event.special.swipe.eventInProgress = false;
								}
							}
							if (Math.abs(start.coords[0] - stop.coords[0]) > $.event.special.swipe.scrollSupressionThreshold) {
								event.preventDefault();
							}
						};
						context.stop = function () {
							emitted = true;
							$.event.special.swipe.eventInProgress = false;
							$document.off(touchMoveEvent, context.move);
							context.move = null;
						};
						$document.on(touchMoveEvent, context.move).one(touchStopEvent, context.stop);
					};
					$this.on(touchStartEvent, context.start);
				},
				teardown : function () {
					var events,
					context;
					events = $.data(this, "mobile-events");
					if (events) {
						context = events.swipe;
						delete events.swipe;
						events.length--;
						if (events.length === 0) {
							$.removeData(this, "mobile-events");
						}
					}
					if (context) {
						if (context.start) {
							$(this).off(touchStartEvent, context.start);
						}
						if (context.move) {
							$document.off(touchMoveEvent, context.move);
						}
						if (context.stop) {
							$document.off(touchStopEvent, context.stop);
						}
					}
				}
			};
			$.each({
				scrollstop : "scrollstart",
				taphold : "tap",
				swipeleft : "swipe.left",
				swiperight : "swipe.right"
			}, function (event, sourceEvent) {
				$.event.special[event] = {
					setup : function () {
						$(this).bind(sourceEvent, $.noop);
					},
					teardown : function () {
						$(this).unbind(sourceEvent);
					}
				};
			});
		})(jQuery, this);
	}));
+function($) {
	function transitionEnd() {
		var el = document.createElement("bootstrap");
		var transEndEventNames = {
			WebkitTransition : "webkitTransitionEnd",
			MozTransition : "transitionend",
			OTransition : "oTransitionEnd otransitionend",
			transition : "transitionend"
		};
		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return {
					end : transEndEventNames[name]
				};
			}
		}
		return false;
	}
	$.fn.emulateTransitionEnd = function (duration) {
		var called = false,
		$el = this;
		$(this).one($.support.transition.end, function () {
			called = true;
		});
		var callback = function () {
			if (!called) {
				$($el).trigger($.support.transition.end);
			}
		};
		setTimeout(callback, duration);
		return this;
	};
	$(function () {
		$.support.transition = transitionEnd();
	});
}
(jQuery);
!function ($) {
	var dismiss = '[data-dismiss="alert"]',
	Alert = function (el) {
		$(el).on("click", dismiss, this.close);
	};
	Alert.prototype.close = function (e) {
		var $this = $(this),
		selector = $this.attr("data-target"),
		$parent;
		if (!selector) {
			selector = $this.attr("href");
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
		}
		$parent = $(selector);
		e && e.preventDefault();
		$parent.length || ($parent = $this.hasClass("alert") ? $this : $this.parent());
		$parent.trigger(e = $.Event("close"));
		if (e.isDefaultPrevented()) {
			return;
		}
		$parent.removeClass("in");
		function removeElement() {
			$parent.trigger("closed").remove();
		}
		$.support.transition && $parent.hasClass("fade") ? $parent.on($.support.transition.end, removeElement) : removeElement();
	};
	$.fn.alert = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("alert");
			if (!data) {
				$this.data("alert", (data = new Alert(this)));
			}
			if (typeof option == "string") {
				data[option].call($this);
			}
		});
	};
	$.fn.alert.Constructor = Alert;
	$(function () {
		$("body").on("click.alert.data-api", dismiss, Alert.prototype.close);
	});
}
(window.jQuery);
!function ($) {
	var Button = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.button.defaults, options);
	};
	Button.prototype.setState = function (state) {
		var d = "disabled",
		$el = this.$element,
		data = $el.data(),
		val = $el.is("input") ? "val" : "html";
		state = state + "Text";
		data.resetText || $el.data("resetText", $el[val]());
		$el[val](data[state] || this.options[state]);
		setTimeout(function () {
			state == "loadingText" ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
		}, 0);
	};
	Button.prototype.toggle = function () {
		var $parent = this.$element.parent('[data-toggle="buttons-radio"]');
		$parent && $parent.find(".active").removeClass("active");
		this.$element.toggleClass("active");
	};
	$.fn.button = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("button"),
			options = typeof option == "object" && option;
			if (!data) {
				$this.data("button", (data = new Button(this, options)));
			}
			if (option == "toggle") {
				data.toggle();
			} else {
				if (option) {
					data.setState(option);
				}
			}
		});
	};
	$.fn.button.defaults = {
		loadingText : "loading..."
	};
	$.fn.button.Constructor = Button;
	$(function () {
		$("body").on("click.button.data-api", "[data-toggle^=button]", function (e) {
			var $btn = $(e.target);
			if (!$btn.hasClass("btn")) {
				$btn = $btn.closest(".btn");
			}
			$btn.button("toggle");
		});
	});
}
(window.jQuery);
!function ($) {
	var Carousel = function (element, options) {
		this.$element = $(element);
		this.options = options;
		this.options.slide && this.slide(this.options.slide);
		this.options.pause == "hover" && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this));
	};
	Carousel.prototype = {
		cycle : function (e) {
			if (!e) {
				this.paused = false;
			}
			this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
			return this;
		},
		to : function (pos) {
			var $active = this.$element.find(".active"),
			children = $active.parent().children(),
			activePos = children.index($active),
			that = this;
			if (pos > (children.length - 1) || pos < 0) {
				return;
			}
			if (this.sliding) {
				return this.$element.one("slid", function () {
					that.to(pos);
				});
			}
			if (activePos == pos) {
				return this.pause().cycle();
			}
			return this.slide(pos > activePos ? "next" : "prev", $(children[pos]));
		},
		pause : function (e) {
			if (!e) {
				this.paused = true;
			}
			clearInterval(this.interval);
			this.interval = null;
			return this;
		},
		next : function () {
			if (this.sliding) {
				return;
			}
			return this.slide("next");
		},
		prev : function () {
			if (this.sliding) {
				return;
			}
			return this.slide("prev");
		},
		slide : function (type, next) {
			var $active = this.$element.find(".active"),
			$next = next || $active[type](),
			isCycling = this.interval,
			direction = type == "next" ? "left" : "right",
			fallback = type == "next" ? "first" : "last",
			that = this,
			e = $.Event("slide");
			this.sliding = true;
			isCycling && this.pause();
			$next = $next.length ? $next : this.$element.find(".item")[fallback]();
			if ($next.hasClass("active")) {
				return;
			}
			if ($.support.transition && this.$element.hasClass("slide")) {
				this.$element.trigger(e);
				if (e.isDefaultPrevented()) {
					return;
				}
				$next.addClass(type);
				$next[0].offsetWidth;
				$active.addClass(direction);
				$next.addClass(direction);
				this.$element.one($.support.transition.end, function () {
					$next.removeClass([type, direction].join(" ")).addClass("active");
					$active.removeClass(["active", direction].join(" "));
					that.sliding = false;
					setTimeout(function () {
						that.$element.trigger("slid");
					}, 0);
				});
			} else {
				this.$element.trigger(e);
				if (e.isDefaultPrevented()) {
					return;
				}
				$active.removeClass("active");
				$next.addClass("active");
				this.sliding = false;
				this.$element.trigger("slid");
			}
			isCycling && this.cycle();
			return this;
		}
	};
	$.fn.carousel = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("carousel"),
			options = $.extend({}, $.fn.carousel.defaults, typeof option == "object" && option);
			if (!data) {
				$this.data("carousel", (data = new Carousel(this, options)));
			}
			if (typeof option == "number") {
				data.to(option);
			} else {
				if (typeof option == "string" || (option = options.slide)) {
					data[option]();
				} else {
					if (options.interval) {
						data.cycle();
					}
				}
			}
		});
	};
	$.fn.carousel.defaults = {
		interval : 5000,
		pause : "hover"
	};
	$.fn.carousel.Constructor = Carousel;
	$(function () {
		$("body").on("click.carousel.data-api", "[data-slide]", function (e) {
			var $this = $(this),
			href,
			$target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")),
			options = !$target.data("modal") && $.extend({}, $target.data(), $this.data());
			$target.carousel(options);
			e.preventDefault();
		});
	});
}
(window.jQuery);
!function ($) {
	var Collapse = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.collapse.defaults, options);
		if (this.options.parent) {
			this.$parent = $(this.options.parent);
		}
		this.options.toggle && this.toggle();
	};
	Collapse.prototype = {
		constructor : Collapse,
		dimension : function () {
			var hasWidth = this.$element.hasClass("width");
			return hasWidth ? "width" : "height";
		},
		show : function () {
			var dimension,
			scroll,
			actives,
			hasData;
			if (this.transitioning || this.$element.hasClass("in")) {
				return;
			}
			dimension = this.dimension();
			scroll = $.camelCase(["scroll", dimension].join("-"));
			actives = this.$parent && this.$parent.find("> .accordion-group > .in");
			if (actives && actives.length) {
				hasData = actives.data("collapse");
				if (hasData && hasData.transitioning) {
					return;
				}
				actives.collapse("hide");
				hasData || actives.data("collapse", null);
			}
			this.$element[dimension](0);
			this.transition("addClass", $.Event("show"), "shown");
			$.support.transition && this.$element[dimension](this.$element[0][scroll]);
		},
		hide : function () {
			var dimension;
			if (this.transitioning || !this.$element.hasClass("in")) {
				return;
			}
			dimension = this.dimension();
			this.reset(this.$element[dimension]());
			this.transition("removeClass", $.Event("hide"), "hidden");
			this.$element[dimension](0);
		},
		reset : function (size) {
			var dimension = this.dimension();
			this.$element.removeClass("collapse")[dimension](size || "auto")[0].offsetWidth;
			this.$element[size !== null ? "addClass" : "removeClass"]("collapse");
			return this;
		},
		transition : function (method, startEvent, completeEvent) {
			var that = this,
			complete = function () {
				if (startEvent.type == "show") {
					that.reset();
				}
				that.transitioning = 0;
				that.$element.trigger(completeEvent);
			};
			this.$element.trigger(startEvent);
			if (startEvent.isDefaultPrevented()) {
				return;
			}
			this.transitioning = 1;
			this.$element[method]("in");
			$.support.transition && this.$element.hasClass("collapse") ? this.$element.one($.support.transition.end, complete) : complete();
		},
		toggle : function () {
			this[this.$element.hasClass("in") ? "hide" : "show"]();
		}
	};
	var old = $.fn.collapse;
	$.fn.collapse = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("collapse"),
			options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == "object" && option);
			if (!data) {
				$this.data("collapse", (data = new Collapse(this, options)));
			}
			if (typeof option == "string") {
				data[option]();
			}
		});
	};
	$.fn.collapse.defaults = {
		toggle : true
	};
	$.fn.collapse.Constructor = Collapse;
	$.fn.collapse.noConflict = function () {
		$.fn.collapse = old;
		return this;
	};
	$(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (e) {
		var $this = $(this),
		href,
		target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""),
		option = $(target).data("collapse") ? "toggle" : $this.data();
		$this[$(target).hasClass("in") ? "addClass" : "removeClass"]("collapsed");
		$(target).collapse(option);
	});
}
(window.jQuery);
!function ($) {
	var toggle = '[data-toggle="dropdown"]',
	Dropdown = function (element) {
		var $el = $(element).on("click.dropdown.data-api", this.toggle);
		$("html").on("click.dropdown.data-api", function () {
			$el.parent().removeClass("open");
		});
	};
	Dropdown.prototype = {
		constructor : Dropdown,
		toggle : function (e) {
			var $this = $(this),
			$parent,
			selector,
			isActive;
			if ($this.is(".disabled, :disabled")) {
				return;
			}
			selector = $this.attr("data-target");
			if (!selector) {
				selector = $this.attr("href");
				selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
			}
			$parent = $(selector);
			$parent.length || ($parent = $this.parent());
			isActive = $parent.hasClass("open");
			clearMenus();
			if (!isActive) {
				$parent.toggleClass("open");
			}
			return false;
		}
	};
	function clearMenus() {
		$(toggle).parent().removeClass("open");
	}
	$.fn.dropdown = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("dropdown");
			if (!data) {
				$this.data("dropdown", (data = new Dropdown(this)));
			}
			if (typeof option == "string") {
				data[option].call($this);
			}
		});
	};
	$.fn.dropdown.Constructor = Dropdown;
	$(function () {
		$("html").on("click.dropdown.data-api", clearMenus);
		$("body").on("click.dropdown", ".dropdown form", function (e) {
			e.stopPropagation();
		}).on("click.dropdown.data-api", toggle, Dropdown.prototype.toggle);
	});
}
(window.jQuery);
+function($) {
	var Modal = function (element, options) {
		this.options = options;
		this.$body = $(document.body);
		this.$element = $(element);
		this.$backdrop = this.isShown = null;
		this.scrollbarWidth = 0;
		if (this.options.remote) {
			this.$element.find(".modal-content").load(this.options.remote, $.proxy(function () {
					this.$element.trigger("loaded.bs.modal");
				}, this));
		}
	};
	Modal.DEFAULTS = {
		backdrop : true,
		keyboard : true,
		show : true
	};
	Modal.prototype.toggle = function (_relatedTarget) {
		return this.isShown ? this.hide() : this.show(_relatedTarget);
	};
	Modal.prototype.show = function (_relatedTarget) {
		var that = this;
		var e = $.Event("show.bs.modal", {
				relatedTarget : _relatedTarget
			});
		this.$element.trigger(e);
		if (this.isShown || e.isDefaultPrevented()) {
			return;
		}
		this.isShown = true;
		this.checkScrollbar();
		this.$body.addClass("modal-open");
		this.setScrollbar();
		this.escape();
		this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
		this.backdrop(function () {
			var transition = $.support.transition && that.$element.hasClass("fade");
			if (!that.$element.parent().length) {
				that.$element.appendTo(that.$body);
			}
			that.$element.show().scrollTop(0);
			if (transition) {
				that.$element[0].offsetWidth;
			}
			that.$element.addClass("in").attr("aria-hidden", false);
			that.enforceFocus();
			var e = $.Event("shown.bs.modal", {
					relatedTarget : _relatedTarget
				});
			transition ? that.$element.find(".modal-dialog").one($.support.transition.end, function () {
				that.$element.trigger("focus").trigger(e);
			}).emulateTransitionEnd(300) : that.$element.trigger("focus").trigger(e);
		});
	};
	Modal.prototype.hide = function (e) {
		if (e) {
			e.preventDefault();
		}
		e = $.Event("hide.bs.modal");
		this.$element.trigger(e);
		if (!this.isShown || e.isDefaultPrevented()) {
			return;
		}
		this.isShown = false;
		this.$body.removeClass("modal-open");
		this.resetScrollbar();
		this.escape();
		$(document).off("focusin.bs.modal");
		this.$element.removeClass("in").attr("aria-hidden", true).off("click.dismiss.bs.modal");
		$.support.transition && this.$element.hasClass("fade") ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal();
	};
	Modal.prototype.enforceFocus = function () {
		$(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function (e) {
				if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
					this.$element.trigger("focus");
				}
			}, this));
	};
	Modal.prototype.escape = function () {
		if (this.isShown && this.options.keyboard) {
			this.$element.on("keyup.dismiss.bs.modal", $.proxy(function (e) {
					e.which == 27 && this.hide();
				}, this));
		} else {
			if (!this.isShown) {
				this.$element.off("keyup.dismiss.bs.modal");
			}
		}
	};
	Modal.prototype.hideModal = function () {
		var that = this;
		this.$element.hide();
		this.backdrop(function () {
			that.removeBackdrop();
			that.$element.trigger("hidden.bs.modal");
		});
	};
	Modal.prototype.removeBackdrop = function () {
		this.$backdrop && this.$backdrop.remove();
		this.$backdrop = null;
	};
	Modal.prototype.backdrop = function (callback) {
		var animate = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.options.backdrop) {
			var doAnimate = $.support.transition && animate;
			this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(this.$body);
			this.$element.on("click.dismiss.bs.modal", $.proxy(function (e) {
					if (e.target !== e.currentTarget) {
						return;
					}
					this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
				}, this));
			if (doAnimate) {
				this.$backdrop[0].offsetWidth;
			}
			this.$backdrop.addClass("in");
			if (!callback) {
				return;
			}
			doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
		} else {
			if (!this.isShown && this.$backdrop) {
				this.$backdrop.removeClass("in");
				$.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
			} else {
				if (callback) {
					callback();
				}
			}
		}
	};
	Modal.prototype.checkScrollbar = function () {
		if (document.body.clientWidth >= window.innerWidth) {
			return;
		}
		this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar();
	};
	Modal.prototype.setScrollbar = function () {
		var bodyPad = parseInt(this.$body.css("padding-right") || 0);
		if (this.scrollbarWidth) {
			this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
		}
	};
	Modal.prototype.resetScrollbar = function () {
		this.$body.css("padding-right", "");
	};
	Modal.prototype.measureScrollbar = function () {
		var scrollDiv = document.createElement("div");
		scrollDiv.className = "modal-scrollbar-measure";
		this.$body.append(scrollDiv);
		var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		this.$body[0].removeChild(scrollDiv);
		return scrollbarWidth;
	};
	var old = $.fn.modal;
	$.fn.modal = function (option, _relatedTarget) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data("bs.modal");
			var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == "object" && option);
			if (!data) {
				$this.data("bs.modal", (data = new Modal(this, options)));
			}
			if (typeof option == "string") {
				data[option](_relatedTarget);
			} else {
				if (options.show) {
					data.show(_relatedTarget);
				}
			}
		});
	};
	$.fn.modal.Constructor = Modal;
	$.fn.modal.noConflict = function () {
		$.fn.modal = old;
		return this;
	};
	$(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (e) {
		var $this = $(this);
		var href = $this.attr("href");
		var $target = $($this.attr("data-target") || (href && href.replace(/.*(?=#[^\s]+$)/, "")));
		var option = $target.data("bs.modal") ? "toggle" : $.extend({
				remote : !/#/.test(href) && href
			}, $target.data(), $this.data());
		if ($this.is("a")) {
			e.preventDefault();
		}
		$target.modal(option, this).one("hide", function () {
			$this.is(":visible") && $this.trigger("focus");
		});
	});
}
(jQuery);
!function ($) {
	var Tooltip = function (element, options) {
		this.init("tooltip", element, options);
	};
	Tooltip.prototype = {
		constructor : Tooltip,
		init : function (type, element, options) {
			var eventIn,
			eventOut;
			this.type = type;
			this.$element = $(element);
			this.options = this.getOptions(options);
			this.enabled = true;
			if (this.options.trigger != "manual") {
				eventIn = this.options.trigger == "hover" ? "mouseenter" : "focus";
				eventOut = this.options.trigger == "hover" ? "mouseleave" : "blur";
				this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this));
				this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this));
			}
			this.options.selector ? (this._options = $.extend({}, this.options, {
						trigger : "manual",
						selector : ""
					})) : this.fixTitle();
		},
		getOptions : function (options) {
			options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data());
			if (options.delay && typeof options.delay == "number") {
				options.delay = {
					show : options.delay,
					hide : options.delay
				};
			}
			return options;
		},
		enter : function (e) {
			var self = $(e.currentTarget)[this.type](this._options).data(this.type);
			if (!self.options.delay || !self.options.delay.show) {
				return self.show();
			}
			clearTimeout(this.timeout);
			self.hoverState = "in";
			this.timeout = setTimeout(function () {
					if (self.hoverState == "in") {
						self.show();
					}
				}, self.options.delay.show);
		},
		leave : function (e) {
			var self = $(e.currentTarget)[this.type](this._options).data(this.type);
			if (!self.options.delay || !self.options.delay.hide) {
				return self.hide();
			}
			clearTimeout(this.timeout);
			self.hoverState = "out";
			this.timeout = setTimeout(function () {
					if (self.hoverState == "out") {
						self.hide();
					}
				}, self.options.delay.hide);
		},
		show : function () {
			var $tip,
			inside,
			pos,
			actualWidth,
			actualHeight,
			placement,
			tp;
			if (this.hasContent() && this.enabled) {
				$tip = this.tip();
				this.setContent();
				if (this.options.animation) {
					$tip.addClass("fade");
				}
				placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
				inside = /in/.test(placement);
				$tip.remove().css({
					top : 0,
					left : 0,
					display : "block"
				}).appendTo(inside ? this.$element : document.body);
				pos = this.getPosition(inside);
				actualWidth = $tip[0].offsetWidth;
				actualHeight = $tip[0].offsetHeight;
				switch (inside ? placement.split(" ")[1] : placement) {
				case "bottom":
					tp = {
						top : pos.top + pos.height,
						left : pos.left + pos.width / 2 - actualWidth / 2
					};
					break;
				case "top":
					tp = {
						top : pos.top - actualHeight,
						left : pos.left + pos.width / 2 - actualWidth / 2
					};
					break;
				case "left":
					tp = {
						top : pos.top + pos.height / 2 - actualHeight / 2,
						left : pos.left - actualWidth
					};
					break;
				case "right":
					tp = {
						top : pos.top + pos.height / 2 - actualHeight / 2,
						left : pos.left + pos.width
					};
					break;
				}
				$tip.css(tp).addClass(placement).addClass("in");
			}
		},
		isHTML : function (text) {
			return typeof text != "string" || (text.charAt(0) === "<" && text.charAt(text.length - 1) === ">" && text.length >= 3) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text);
		},
		setContent : function () {
			var $tip = this.tip(),
			title = this.getTitle();
			$tip.find(".tooltip-inner")[this.isHTML(title) ? "html" : "text"](title);
			$tip.removeClass("fade in top bottom left right");
		},
		hide : function () {
			var that = this,
			$tip = this.tip();
			$tip.removeClass("in");
			function removeWithAnimation() {
				var timeout = setTimeout(function () {
						$tip.off($.support.transition.end).remove();
					}, 500);
				$tip.one($.support.transition.end, function () {
					clearTimeout(timeout);
					$tip.remove();
				});
			}
			$.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() : $tip.remove();
		},
		fixTitle : function () {
			var $e = this.$element;
			if ($e.attr("title") || typeof($e.attr("data-original-title")) != "string") {
				$e.attr("data-original-title", $e.attr("title") || "").removeAttr("title");
			}
		},
		hasContent : function () {
			return this.getTitle();
		},
		getPosition : function (inside) {
			return $.extend({}, (inside ? {
					top : 0,
					left : 0
				}
					 : this.$element.offset()), {
				width : this.$element[0].offsetWidth,
				height : this.$element[0].offsetHeight
			});
		},
		getTitle : function () {
			var title,
			$e = this.$element,
			o = this.options;
			title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
			return title;
		},
		tip : function () {
			return this.$tip = this.$tip || $(this.options.template);
		},
		validate : function () {
			if (!this.$element[0].parentNode) {
				this.hide();
				this.$element = null;
				this.options = null;
			}
		},
		enable : function () {
			this.enabled = true;
		},
		disable : function () {
			this.enabled = false;
		},
		toggleEnabled : function () {
			this.enabled = !this.enabled;
		},
		toggle : function () {
			this[this.tip().hasClass("in") ? "hide" : "show"]();
		}
	};
	$.fn.tooltip = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("tooltip"),
			options = typeof option == "object" && option;
			if (!data) {
				$this.data("tooltip", (data = new Tooltip(this, options)));
			}
			if (typeof option == "string") {
				data[option]();
			}
		});
	};
	$.fn.tooltip.Constructor = Tooltip;
	$.fn.tooltip.defaults = {
		animation : true,
		placement : "top",
		selector : false,
		template : '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger : "hover",
		title : "",
		delay : 0
	};
}
(window.jQuery);
!function ($) {
	var Popover = function (element, options) {
		this.init("popover", element, options);
	};
	Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
			constructor : Popover,
			setContent : function () {
				var $tip = this.tip(),
				title = this.getTitle(),
				content = this.getContent();
				$tip.find(".popover-title")[this.isHTML(title) ? "html" : "text"](title);
				$tip.find(".popover-content > *")[this.isHTML(content) ? "html" : "text"](content);
				$tip.removeClass("fade top bottom left right in");
			},
			hasContent : function () {
				return this.getTitle() || this.getContent();
			},
			getContent : function () {
				var content,
				$e = this.$element,
				o = this.options;
				content = $e.attr("data-content") || (typeof o.content == "function" ? o.content.call($e[0]) : o.content);
				return content;
			},
			tip : function () {
				if (!this.$tip) {
					this.$tip = $(this.options.template);
				}
				return this.$tip;
			}
		});
	$.fn.popover = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("popover"),
			options = typeof option == "object" && option;
			if (!data) {
				$this.data("popover", (data = new Popover(this, options)));
			}
			if (typeof option == "string") {
				data[option]();
			}
		});
	};
	$.fn.popover.Constructor = Popover;
	$.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
			placement : "right",
			content : "",
			template : '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
		});
}
(window.jQuery);
!function ($) {
	function ScrollSpy(element, options) {
		var process = $.proxy(this.process, this),
		$element = $(element).is("body") ? $(window) : $(element),
		href;
		this.options = $.extend({}, $.fn.scrollspy.defaults, options);
		this.$scrollElement = $element.on("scroll.scroll.data-api", process);
		this.selector = (this.options.target || ((href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")) || "") + " .nav li > a";
		this.$body = $("body");
		this.refresh();
		this.process();
	}
	ScrollSpy.prototype = {
		constructor : ScrollSpy,
		refresh : function () {
			var self = this,
			$targets;
			this.offsets = $([]);
			this.targets = $([]);
			$targets = this.$body.find(this.selector).map(function () {
					var $el = $(this),
					href = $el.data("target") || $el.attr("href"),
					$href = /^#\w/.test(href) && $(href);
					return ($href && href.length && [[$href.position().top, href]]) || null;
				}).sort(function (a, b) {
					return a[0] - b[0];
				}).each(function () {
					self.offsets.push(this[0]);
					self.targets.push(this[1]);
				});
		},
		process : function () {
			var scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
			scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
			maxScroll = scrollHeight - this.$scrollElement.height(),
			offsets = this.offsets,
			targets = this.targets,
			activeTarget = this.activeTarget,
			i;
			if (scrollTop >= maxScroll) {
				return activeTarget != (i = targets.last()[0]) && this.activate(i);
			}
			for (i = offsets.length; i--; ) {
				activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
			}
		},
		activate : function (target) {
			var active,
			selector;
			this.activeTarget = target;
			$(this.selector).parent(".active").removeClass("active");
			selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
			active = $(selector).parent("li").addClass("active");
			if (active.parent(".dropdown-menu")) {
				active = active.closest("li.dropdown").addClass("active");
			}
			active.trigger("activate");
		}
	};
	$.fn.scrollspy = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("scrollspy"),
			options = typeof option == "object" && option;
			if (!data) {
				$this.data("scrollspy", (data = new ScrollSpy(this, options)));
			}
			if (typeof option == "string") {
				data[option]();
			}
		});
	};
	$.fn.scrollspy.Constructor = ScrollSpy;
	$.fn.scrollspy.defaults = {
		offset : 10
	};
	$(function () {
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this);
			$spy.scrollspy($spy.data());
		});
	});
}
(window.jQuery);
!function ($) {
	var Tab = function (element) {
		this.element = $(element);
	};
	Tab.prototype = {
		constructor : Tab,
		show : function () {
			var $this = this.element,
			$ul = $this.closest("ul:not(.dropdown-menu)"),
			selector = $this.attr("data-target"),
			previous,
			$target,
			e;
			if (!selector) {
				selector = $this.attr("href");
				selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
			}
			if ($this.parent("li").hasClass("active")) {
				return;
			}
			previous = $ul.find(".active a").last()[0];
			e = $.Event("show", {
					relatedTarget : previous
				});
			$this.trigger(e);
			if (e.isDefaultPrevented()) {
				return;
			}
			$target = $(selector);
			this.activate($this.parent("li"), $ul);
			this.activate($target, $target.parent(), function () {
				$this.trigger({
					type : "shown",
					relatedTarget : previous
				});
			});
		},
		activate : function (element, container, callback) {
			var $active = container.find("> .active"),
			transition = callback && $.support.transition && $active.hasClass("fade");
			function next() {
				$active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
				element.addClass("active");
				if (transition) {
					element[0].offsetWidth;
					element.addClass("in");
				} else {
					element.removeClass("fade");
				}
				if (element.parent(".dropdown-menu")) {
					element.closest("li.dropdown").addClass("active");
				}
				callback && callback();
			}
			transition ? $active.one($.support.transition.end, next) : next();
			$active.removeClass("in");
		}
	};
	$.fn.tab = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("tab");
			if (!data) {
				$this.data("tab", (data = new Tab(this)));
			}
			if (typeof option == "string") {
				data[option]();
			}
		});
	};
	$.fn.tab.Constructor = Tab;
	$(function () {
		$("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
			e.preventDefault();
			$(this).tab("show");
		});
	});
}
(window.jQuery);
!function ($) {
	var Typeahead = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.typeahead.defaults, options);
		this.matcher = this.options.matcher || this.matcher;
		this.sorter = this.options.sorter || this.sorter;
		this.highlighter = this.options.highlighter || this.highlighter;
		this.updater = this.options.updater || this.updater;
		this.$menu = $(this.options.menu).appendTo("body");
		this.source = this.options.source;
		this.shown = false;
		this.listen();
	};
	Typeahead.prototype = {
		constructor : Typeahead,
		select : function () {
			var val = this.$menu.find(".active").attr("data-value");
			this.$element.val(this.updater(val)).change();
			return this.hide();
		},
		updater : function (item) {
			return item;
		},
		show : function () {
			var pos = $.extend({}, this.$element.offset(), {
					height : this.$element[0].offsetHeight
				});
			this.$menu.css({
				top : pos.top + pos.height,
				left : pos.left
			});
			this.$menu.show();
			this.shown = true;
			return this;
		},
		hide : function () {
			this.$menu.hide();
			this.shown = false;
			return this;
		},
		lookup : function (event) {
			var that = this,
			items,
			q;
			this.query = this.$element.val();
			if (!this.query) {
				return this.shown ? this.hide() : this;
			}
			items = $.grep(this.source, function (item) {
					return that.matcher(item);
				});
			items = this.sorter(items);
			if (!items.length) {
				return this.shown ? this.hide() : this;
			}
			return this.render(items.slice(0, this.options.items)).show();
		},
		matcher : function (item) {
			return ~item.toLowerCase().indexOf(this.query.toLowerCase());
		},
		sorter : function (items) {
			var beginswith = [],
			caseSensitive = [],
			caseInsensitive = [],
			item;
			while (item = items.shift()) {
				if (!item.toLowerCase().indexOf(this.query.toLowerCase())) {
					beginswith.push(item);
				} else {
					if (~item.indexOf(this.query)) {
						caseSensitive.push(item);
					} else {
						caseInsensitive.push(item);
					}
				}
			}
			return beginswith.concat(caseSensitive, caseInsensitive);
		},
		highlighter : function (item) {
			var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
			return item.replace(new RegExp("(" + query + ")", "ig"), function ($1, match) {
				return "<strong>" + match + "</strong>";
			});
		},
		render : function (items) {
			var that = this;
			items = $(items).map(function (i, item) {
					i = $(that.options.item).attr("data-value", item);
					i.find("a").html(that.highlighter(item));
					return i[0];
				});
			items.first().addClass("active");
			this.$menu.html(items);
			return this;
		},
		next : function (event) {
			var active = this.$menu.find(".active").removeClass("active"),
			next = active.next();
			if (!next.length) {
				next = $(this.$menu.find("li")[0]);
			}
			next.addClass("active");
		},
		prev : function (event) {
			var active = this.$menu.find(".active").removeClass("active"),
			prev = active.prev();
			if (!prev.length) {
				prev = this.$menu.find("li").last();
			}
			prev.addClass("active");
		},
		listen : function () {
			this.$element.on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this));
			if ($.browser.webkit || $.browser.msie) {
				this.$element.on("keydown", $.proxy(this.keypress, this));
			}
			this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this));
		},
		keyup : function (e) {
			switch (e.keyCode) {
			case 40:
			case 38:
				break;
			case 9:
			case 13:
				if (!this.shown) {
					return;
				}
				this.select();
				break;
			case 27:
				if (!this.shown) {
					return;
				}
				this.hide();
				break;
			default:
				this.lookup();
			}
			e.stopPropagation();
			e.preventDefault();
		},
		keypress : function (e) {
			if (!this.shown) {
				return;
			}
			switch (e.keyCode) {
			case 9:
			case 13:
			case 27:
				e.preventDefault();
				break;
			case 38:
				if (e.type != "keydown") {
					break;
				}
				e.preventDefault();
				this.prev();
				break;
			case 40:
				if (e.type != "keydown") {
					break;
				}
				e.preventDefault();
				this.next();
				break;
			}
			e.stopPropagation();
		},
		blur : function (e) {
			var that = this;
			setTimeout(function () {
				that.hide();
			}, 150);
		},
		click : function (e) {
			e.stopPropagation();
			e.preventDefault();
			this.select();
		},
		mouseenter : function (e) {
			this.$menu.find(".active").removeClass("active");
			$(e.currentTarget).addClass("active");
		}
	};
	$.fn.typeahead = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data("typeahead"),
			options = typeof option == "object" && option;
			if (!data) {
				$this.data("typeahead", (data = new Typeahead(this, options)));
			}
			if (typeof option == "string") {
				data[option]();
			}
		});
	};
	$.fn.typeahead.defaults = {
		source : [],
		items : 8,
		menu : '<ul class="typeahead dropdown-menu"></ul>',
		item : '<li><a href="#"></a></li>'
	};
	$.fn.typeahead.Constructor = Typeahead;
	$(function () {
		$("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (e) {
			var $this = $(this);
			if ($this.data("typeahead")) {
				return;
			}
			e.preventDefault();
			$this.typeahead($this.data());
		});
	});
}
(window.jQuery);
(function (a, b, c) {
	function d(a) {
		return "[object Function]" == o.call(a);
	}
	function e(a) {
		return "string" == typeof a;
	}
	function f() {}

	function g(a) {
		return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
	}
	function h() {
		var a = p.shift();
		q = 1,
		a ? a.t ? m(function () {
			("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
		}, 0) : (a(), h()) : q = 0;
	}
	function i(a, c, d, e, f, i, j) {
		function k(b) {
			if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
				"img" != a && m(function () {
					t.removeChild(l);
				}, 50);
				for (var d in y[c]) {
					y[c].hasOwnProperty(d) && y[c][d].onload();
				}
			}
		}
		var j = j || B.errorTimeout,
		l = b.createElement(a),
		o = 0,
		r = 0,
		u = {
			t : d,
			s : c,
			e : f,
			a : i,
			x : j
		};
		1 === y[c] && (r = 1, y[c] = []),
		"object" == a ? l.data = c : (l.src = c, l.type = a),
		l.width = l.height = "0",
		l.onerror = l.onload = l.onreadystatechange = function () {
			k.call(this, r);
		},
		p.splice(e, 0, u),
		"img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l));
	}
	function j(a, b, c, d, f) {
		return q = 0,
		b = b || "j",
		e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()),
		this;
	}
	function k() {
		var a = B;
		return a.loader = {
			load : j,
			i : 0
		},
		a;
	}
	var l = b.documentElement,
	m = a.setTimeout,
	n = b.getElementsByTagName("script")[0],
	o = {}

	.toString,
	p = [],
	q = 0,
	r = "MozAppearance" in l.style,
	s = r && !!b.createRange().compareNode,
	t = s ? l : n.parentNode,
	l = a.opera && "[object Opera]" == o.call(a.opera),
	l = !!b.attachEvent && !l,
	u = r ? "object" : l ? "script" : "img",
	v = l ? "script" : u,
	w = Array.isArray || function (a) {
		return "[object Array]" == o.call(a);
	},
	x = [],
	y = {},
	z = {
		timeout : function (a, b) {
			return b.length && (a.timeout = b[0]),
			a;
		}
	},
	A,
	B;
	B = function (a) {
		function b(a) {
			var a = a.split("!"),
			b = x.length,
			c = a.pop(),
			d = a.length,
			c = {
				url : c,
				origUrl : c,
				prefixes : a
			},
			e,
			f,
			g;
			for (f = 0; f < d; f++) {
				g = a[f].split("="),
				(e = z[g.shift()]) && (c = e(c, g));
			}
			for (f = 0; f < b; f++) {
				c = x[f](c);
			}
			return c;
		}
		function g(a, e, f, g, h) {
			var i = b(a),
			j = i.autoCallback;
			i.url.split(".").pop().split("?").shift(),
			i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
						k(),
						e && e(i.origUrl, h, g),
						j && j(i.origUrl, h, g),
						y[i.url] = 2;
					})));
		}
		function h(a, b) {
			function c(a, c) {
				if (a) {
					if (e(a)) {
						c || (j = function () {
							var a = [].slice.call(arguments);
							k.apply(this, a),
							l();
						}),
						g(a, j, b, 0, h);
					} else {
						if (Object(a) === a) {
							for (n in m = function () {
								var b = 0,
								c;
								for (c in a) {
									a.hasOwnProperty(c) && b++;
								}
								return b;
							}
								(), a) {
								a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
										var a = [].slice.call(arguments);
										k.apply(this, a),
										l();
									}
										 : j[n] = function (a) {
										return function () {
											var b = [].slice.call(arguments);
											a && a.apply(this, b),
											l();
										};
									}
										(k[n])), g(a[n], j, b, n, h));
							}
						}
					}
				} else {
					!c && l();
				}
			}
			var h = !!a.test,
			i = a.load || a.both,
			j = a.callback || f,
			k = j,
			l = a.complete || f,
			m,
			n;
			c(h ? a.yep : a.nope, !!i),
			i && c(i);
		}
		var i,
		j,
		l = this.yepnope.loader;
		if (e(a)) {
			g(a, 0, l, 0);
		} else {
			if (w(a)) {
				for (i = 0; i < a.length; i++) {
					j = a[i],
					e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
				}
			} else {
				Object(a) === a && h(a, l);
			}
		}
	},
	B.addPrefix = function (a, b) {
		z[a] = b;
	},
	B.addFilter = function (a) {
		x.push(a);
	},
	B.errorTimeout = 10000,
	null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () {
			b.removeEventListener("DOMContentLoaded", A, 0),
			b.readyState = "complete";
		}, 0)),
	a.yepnope = k(),
	a.yepnope.executeStack = h,
	a.yepnope.injectJs = function (a, c, d, e, i, j) {
		var k = b.createElement("script"),
		l,
		o,
		e = e || B.errorTimeout;
		k.src = a;
		for (o in d) {
			k.setAttribute(o, d[o]);
		}
		c = j ? h : c || f,
		k.onreadystatechange = k.onload = function () {
			!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
		},
		m(function () {
			l || (l = 1, c(1));
		}, e),
		i ? k.onload() : n.parentNode.insertBefore(k, n);
	},
	a.yepnope.injectCss = function (a, c, d, e, g, i) {
		var e = b.createElement("link"),
		j,
		c = i ? h : c || f;
		e.href = a,
		e.rel = "stylesheet",
		e.type = "text/css";
		for (j in d) {
			e.setAttribute(j, d[j]);
		}
		g || (n.parentNode.insertBefore(e, n), m(c, 0));
	};
})(this, document);
/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else {
		if (typeof exports === "object") {
			factory(require("jquery"));
		} else {
			factory(jQuery);
		}
	}
}
	(function ($) {
		var pluses = /\+/g;
		function encode(s) {
			return config.raw ? s : encodeURIComponent(s);
		}
		function decode(s) {
			return config.raw ? s : decodeURIComponent(s);
		}
		function stringifyCookieValue(value) {
			return encode(config.json ? JSON.stringify(value) : String(value));
		}
		function parseCookieValue(s) {
			if (s.indexOf('"') === 0) {
				s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
			}
			try {
				s = decodeURIComponent(s.replace(pluses, " "));
				return config.json ? JSON.parse(s) : s;
			} catch (e) {}

		}
		function read(s, converter) {
			var value = config.raw ? s : parseCookieValue(s);
			return $.isFunction(converter) ? converter(value) : value;
		}
		var config = $.cookie = function (key, value, options) {
			if (value !== undefined && !$.isFunction(value)) {
				options = $.extend({}, config.defaults, options);
				if (typeof options.expires === "number") {
					var days = options.expires,
					t = options.expires = new Date();
					t.setTime(+t + days * 86400000);
				}
				return (document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join(""));
			}
			var result = key ? undefined : {};
			var cookies = document.cookie ? document.cookie.split("; ") : [];
			for (var i = 0, l = cookies.length; i < l; i++) {
				var parts = cookies[i].split("=");
				var name = decode(parts.shift());
				var cookie = parts.join("=");
				if (key && key === name) {
					result = read(cookie, value);
					break;
				}
				if (!key && (cookie = read(cookie)) !== undefined) {
					result[name] = cookie;
				}
			}
			return result;
		};
		config.defaults = {};
		$.removeCookie = function (key, options) {
			if ($.cookie(key) === undefined) {
				return false;
			}
			$.cookie(key, "", $.extend({}, options, {
					expires : -1
				}));
			return !$.cookie(key);
		};
	}));
var Mobify = window.Mobify = window.Mobify || {};
Mobify.$ = Mobify.$ || window.Zepto || window.jQuery;
Mobify.UI = Mobify.UI || {
	classPrefix : "m-"
};
(function ($, document) {
	$.support = $.support || {};
	$.extend($.support, {
		"touch" : "ontouchend" in document
	});
})(Mobify.$, document);
Mobify.UI.Utils = (function ($) {
	var exports = {},
	has = $.support;
	exports.events = (has.touch) ? {
		down : "touchstart",
		move : "touchmove",
		up : "touchend"
	}
	 : {
		down : "mousedown",
		move : "mousemove",
		up : "mouseup"
	};
	exports.getCursorPosition = (has.touch) ? function (e) {
		e = e.originalEvent || e;
		return {
			x : e.touches[0].clientX,
			y : e.touches[0].clientY
		};
	}
	 : function (e) {
		return {
			x : e.clientX,
			y : e.clientY
		};
	};
	exports.getProperty = function (name) {
		var prefixes = ["Webkit", "Moz", "O", "ms", ""],
		testStyle = document.createElement("div").style;
		for (var i = 0; i < prefixes.length; ++i) {
			if (testStyle[prefixes[i] + name] !== undefined) {
				return prefixes[i] + name;
			}
		}
		return;
	};
	$.extend(has, {
		"transform" : !!(exports.getProperty("Transform")),
		"transform3d" : !!(window.WebKitCSSMatrix && "m11" in new WebKitCSSMatrix())
	});
	var leftProperty = exports.getProperty("left");
	exports.translateX = function (element, delta) {
		if (typeof delta == "number") {
			if (!isNaN(delta)) {
				delta = delta + "px";
			} else {
				delta = "0px";
			}
		}
		element.style.left = delta;
	};
	var transitionProperty = exports.getProperty("Transition"),
	durationProperty = exports.getProperty("TransitionDuration");
	exports.setTransitions = function (element, enable) {
		if (enable) {
			element.style[durationProperty] = "";
		} else {
			element.style[durationProperty] = "0s";
		}
	};
	exports.requestAnimationFrame = (function () {
		var prefixed = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		});
		var requestAnimationFrame = function () {
			prefixed.apply(window, arguments);
		};
		return requestAnimationFrame;
	})();
	return exports;
})(Mobify.$);
Mobify.UI.Carousel = (function ($, Utils) {
	var defaults = {
		dragRadius : 10,
		moveRadius : 20,
		classPrefix : undefined,
		classNames : {
			outer : "carousel",
			inner : "carousel-inner",
			item : "item",
			center : "center",
			touch : "has-touch",
			dragging : "dragging",
			active : "active"
		},
		rotation : 5000,
		step : 1,
		slideName : "data-slide"
	},
	has = $.support;
	var Carousel = function (element, options) {
		this.setOptions(options);
		this.initElements(element);
		this.initOffsets();
		this.initAnimation();
		this.bind();
	};
	Carousel.defaults = defaults;
	Carousel.prototype.begin = function () {
		var _this = this;
		this.interval = (this.delay) ? setTimeout(function () {
			_this.next(_this.delay);
		}, this.delay) : 0;
	};
	Carousel.prototype.transitionEnd = function (e) {
		if (this.delay != undefined) {
			this.begin();
		} else {
			if (this.parentElement._carousel.delay) {
				this.parentElement._carousel.begin();
			}
		}
	};
	Carousel.prototype.setOptions = function (opts) {
		var options = this.options || $.extend({}, defaults, opts);
		options.classNames = $.extend({}, options.classNames, opts.classNames || {});
		options.classPrefix = options.classPrefix || Mobify.UI.classPrefix;
		this.options = options;
		this.delay = options.rotation;
		this.step = options.step;
		this.slideName = options.slideName;
	};
	Carousel.prototype.initElements = function (element) {
		this._index = 1;
		this.element = element;
		this.$element = $(element);
		this.$inner = this.$element.find("." + this._getClass("inner"));
		this.realInnerHtml = this.$inner.html();
		var length = this.$inner.children().length;
		var slideCount = length;
		if (length % this.step != 0) {
			var addCount = (Math.floor(length / this.step) + 1) * this.step - length;
			for (var i = 0; i < addCount; i++) {
				this.$inner.html(this.$inner.html() + '<div class="m-item" style=""></div>');
			}
			slideCount = Math.floor(length / this.step) + 1;
		} else {
			slideCount = length / this.step;
		}
		var slideStr = "";
		for (var i = 1; i <= slideCount; i++) {
			slideStr = slideStr + '<a href="#" ' + this.slideName + '="' + i + '">&#8226;</a>';
		}
		this.$element.find(".m-carousel-controls.m-carousel-pagination").html(slideStr);
		this.$items = this.$inner.children();
		this.$start = this.$items.eq(0);
		this.$sec = this.$items.eq(1);
		this.$current = this.$items.eq(this._index);
		this._length = this.$items.length;
		this._alignment = this.$element.hasClass(this._getClass("center")) ? 0.5 : 0;
		if (isArEm) {
			var parentObj = this.$inner;
			var childObj = this.$items;
			var total = childObj.length;
			childObj.each(function (i) {
				parentObj.append(childObj.eq((total - 1) - i));
			});
		}
	};
	Carousel.prototype.initOffsets = function () {
		this._offset = 0;
		this._offsetDrag = 0;
	};
	Carousel.prototype.initAnimation = function () {
		this.animating = false;
		this.dragging = false;
		this._needsUpdate = false;
		this._enableAnimation();
	};
	Carousel.prototype._getClass = function (id) {
		return this.options.classPrefix + this.options.classNames[id];
	};
	Carousel.prototype._enableAnimation = function () {
		if (this.animating) {
			return;
		}
		Utils.setTransitions(this.$inner[0], true);
		this.$inner.removeClass(this._getClass("dragging"));
		this.animating = true;
	};
	Carousel.prototype._disableAnimation = function () {
		if (!this.animating) {
			return;
		}
		Utils.setTransitions(this.$inner[0], false);
		this.$inner.addClass(this._getClass("dragging"));
		this.animating = false;
	};
	Carousel.prototype.update = function () {
		if (this._needsUpdate) {
			return;
		}
		var self = this;
		this._needsUpdate = true;
		Utils.requestAnimationFrame(function () {
			self._update();
		});
	};
	Carousel.prototype._update = function () {
		if (!this._needsUpdate) {
			return;
		}
		var x = Math.round(this._offset + this._offsetDrag);
		Utils.translateX(this.$inner[0], x);
		this._needsUpdate = false;
	};
	Carousel.prototype.bind = function () {
		var abs = Math.abs,
		dragging = false,
		canceled = false,
		dragRadius = this.options.dragRadius,
		xy,
		dx,
		dy,
		dragThresholdMet,
		self = this,
		$element = this.$element,
		$inner = this.$inner,
		opts = this.options,
		dragLimit = this.$element.width(),
		lockLeft = false,
		lockRight = false;
		function start(e) {
			if (!has.touch) {
				e.preventDefault();
			}
			dragging = true;
			canceled = false;
			xy = Utils.getCursorPosition(e);
			dx = 0;
			dy = 0;
			dragThresholdMet = false;
			self._disableAnimation();
			lockLeft = self._index == 1;
			lockRight = self._index == self._length;
		}
		function drag(e) {
			if (!dragging || canceled) {
				return;
			}
			var newXY = Utils.getCursorPosition(e);
			dx = xy.x - newXY.x;
			dy = xy.y - newXY.y;
			if (dragThresholdMet || abs(dx) > abs(dy) && (abs(dx) > dragRadius)) {
				dragThresholdMet = true;
				e.preventDefault();
				if (lockLeft && (dx < 0)) {
					dx = dx * (-dragLimit) / (dx - dragLimit);
				} else {
					if (lockRight && (dx > 0)) {
						dx = dx * (dragLimit) / (dx + dragLimit);
					}
				}
				self._offsetDrag = -dx;
				self.update();
			} else {
				if ((abs(dy) > abs(dx)) && (abs(dy) > dragRadius)) {
					canceled = true;
				}
			}
		}
		function end(e) {
			if (!dragging) {
				return;
			}
			dragging = false;
			self._enableAnimation();
			if (!canceled && abs(dx) > opts.moveRadius) {
				if (dx > 0) {
					isArEm ? self.prev() : self.next();
				} else {
					isArEm ? self.next() : self.prev();
				}
			} else {
				self._offsetDrag = 0;
				self.update();
			}
		}
		function click(e) {
			if (dragThresholdMet) {
				e.preventDefault();
			}
		}
		$inner.on(Utils.events.down + ".carousel", start).on(Utils.events.move + ".carousel", drag).on(Utils.events.up + ".carousel", end).on("click.carousel", click).on("mouseout.carousel", end);
		$element.on("click", "[" + this.slideName + "]", function (e) {
			e.preventDefault();
			var action = $(this).attr(self.slideName),
			index = parseInt(action, 10);
			if (isArEm) {
				if (action == "next") {
					action = "prev";
				} else {
					action = "next";
				}
			}
			$element[0]._carousel.delay = 0;
			clearTimeout($element[0]._carousel.interval);
			if (isNaN(index)) {
				self[action]();
			} else {
				self.move((index - 1) * self.step + 1);
			}
		});
		$element.on("afterSlide", function (e, previousSlide, nextSlide) {
			self.$items.eq(previousSlide - 1).removeClass(self._getClass("active"));
			self.$items.eq(nextSlide - 1).addClass(self._getClass("active"));
			self.$element.find("[" + self.slideName + "='" + previousSlide + "']").removeClass(self._getClass("active"));
			self.$element.find("[" + self.slideName + "='" + nextSlide + "']").addClass(self._getClass("active"));
		});
		if (isArEm) {
			this.move(this._length - this.step + 1);
		} else {
			$element.trigger("beforeSlide", [1, 1]);
			$element.trigger("afterSlide", [1, 1]);
		}
		self.$inner.bind("transitionend", self.transitionEnd);
		self.$inner.bind("webkitTransitionEnd", self.transitionEnd);
		self.update();
		self.begin();
	};
	Carousel.prototype.unbind = function () {
		this.$inner.off();
	};
	Carousel.prototype.destroy = function () {
		this.unbind();
		this.$element.trigger("destroy");
		this.$element.remove();
		this.$element = null;
		this.$inner = null;
		this.$start = null;
		this.$current = null;
	};
	Carousel.prototype.move = function (newIndex, opts) {
		var $element = this.$element,
		$inner = this.$inner,
		$items = this.$items,
		$start = this.$start,
		$current = this.$current,
		length = this._length,
		index = this._index;
		opts = opts || {};
		if (newIndex < 1) {
			newIndex = 1;
		} else {
			if (newIndex > this._length) {
				newIndex = length;
			}
		}
		if (newIndex == this._index) {}

		$element.trigger("beforeSlide", [index, newIndex]);
		this.$current = $current = $items.eq(newIndex - 1);
		var currentOffset = $current.prop("offsetLeft") + $current.prop("clientWidth") * this._alignment,
		startOffset = $start.prop("offsetLeft") + $start.prop("clientWidth") * this._alignment;
		var transitionOffset =  - (currentOffset - startOffset);
		if (isArEm) {
			transitionOffset = currentOffset - startOffset;
		}
		this._offset = transitionOffset;
		this._offsetDrag = 0;
		this._index = newIndex;
		this.update();
		var previousSlide = index;
		var nextSlide = newIndex;
		if (newIndex % this.step == 0) {
			previousSlide = index / this.step;
		} else {
			previousSlide = Math.floor(index / this.step) + 1;
		}
		if (newIndex % this.step == 0) {
			nextSlide = newIndex / this.step;
		} else {
			nextSlide = Math.floor(newIndex / this.step) + 1;
		}
		$element.trigger("afterSlide", [previousSlide, nextSlide]);
		if (navigator.userAgent.indexOf("MSIE") && navigator.userAgent.indexOf("MSIE") > -1) {
			this.transitionEnd();
		}
	};
	Carousel.prototype.next = function (delay) {
		this.delay = delay || 0;
		clearTimeout(this.interval);
		if (isArEm) {
			var maxLength = this._length;
			if (this._length % this.step != 0) {
				maxLength = (Math.floor(this._length / this.step) + 1) * this.step;
			}
			if (this._index - this.step > 0) {
				this.move(this._index - this.step);
			} else {
				this.move(maxLength - this.step + 1);
			}
		} else {
			if (this._index <= this._length - this.step) {
				this.move(this._index + this.step);
			} else {
				this.move(1);
			}
		}
	};
	Carousel.prototype.prev = function (delay) {
		this.delay = delay || 0;
		clearTimeout(this.interval);
		if (isArEm) {
			var maxLength = this._length;
			if (this._length % this.step != 0) {
				maxLength = (Math.floor(this._length / this.step) + 1) * this.step;
			}
			if (this._index + this.step < maxLength) {
				this.move(this._index + this.step);
			} else {
				this.move(1);
			}
		} else {
			if (this._index > this.step) {
				this.move(this._index - this.step);
			} else {
				var lastIndex = Math.floor(this._length / this.step - 1) * this.step + 1;
				this.move(lastIndex);
			}
		}
	};
	return Carousel;
})(Mobify.$, Mobify.UI.Utils);
(function ($) {
	$.fn.carousel = function (action, options) {
		var initOptions = $.extend({}, $.fn.carousel.defaults, options);
		if (typeof action == "object") {
			initOptions = $(initOptions, action);
			options = null;
			action = null;
		}
		this.each(function () {
			var $this = $(this),
			carousel = this._carousel;
			if (!carousel) {
				carousel = new Mobify.UI.Carousel(this, initOptions);
			}
			if (action) {
				carousel[action](options);
				if (action === "destroy") {
					carousel = null;
				}
			}
			this._carousel = carousel;
		});
		return this;
	};
	$.fn.carousel.defaults = {};
})(Mobify.$);
(function (a, b, c) {
	var d = a.document,
	e = a.Modernizr,
	f = function (a) {
		return a.charAt(0).toUpperCase() + a.slice(1);
	},
	g = "Moz Webkit O Ms".split(" "),
	h = function (a) {
		var b = d.documentElement.style,
		c;
		if (typeof b[a] == "string") {
			return a;
		}
		a = f(a);
		for (var e = 0, h = g.length; e < h; e++) {
			c = g[e] + a;
			if (typeof b[c] == "string") {
				return c;
			}
		}
	},
	i = h("transform"),
	j = h("transitionProperty"),
	k = {
		csstransforms : function () {
			return !!i;
		},
		csstransforms3d : function () {
			var a = !!h("perspective");
			if (a) {
				var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
				d = "@media (" + c.join("transform-3d),(") + "modernizr)",
				e = b("<style>" + d + "{#modernizr{height:3px}}</style>").appendTo("head"),
				f = b('<div id="modernizr" />').appendTo("html");
				a = f.height() === 3,
				f.remove(),
				e.remove();
			}
			return a;
		},
		csstransitions : function () {
			return !!j;
		}
	},
	l;
	if (e) {
		for (l in k) {
			e.hasOwnProperty(l) || e.addTest(l, k[l]);
		}
	} else {
		e = a.Modernizr = {
			_version : "1.6ish: miniModernizr for Isotope"
		};
		var m = " ",
		n;
		for (l in k) {
			n = k[l](),
			e[l] = n,
			m += " " + (n ? "" : "no-") + l;
		}
		b("html").addClass(m);
	}
	if (e.csstransforms) {
		var o = e.csstransforms3d ? {
			translate : function (a) {
				var ar = a[0];
				if (isArEm) {
					ar = -a[0];
				}
				return "translate3d(" + ar + "px, " + a[1] + "px, 0) ";
			},
			scale : function (a) {
				return "scale3d(" + a + ", " + a + ", 1) ";
			}
		}
		 : {
			translate : function (a) {
				var ar = a[0];
				if (isArEm) {
					ar = -a[0];
				}
				return "translate(" + ar + "px, " + a[1] + "px) ";
			},
			scale : function (a) {
				return "scale(" + a + ") ";
			}
		},
		p = function (a, c, d) {
			var e = b.data(a, "isoTransform") || {},
			f = {},
			g,
			h = {},
			j;
			f[c] = d,
			b.extend(e, f);
			for (g in e) {
				j = e[g],
				h[g] = o[g](j);
			}
			var k = h.translate || "",
			l = h.scale || "",
			m = k + l;
			b.data(a, "isoTransform", e),
			a.style[i] = m;
		};
		b.cssNumber.scale = !0,
		b.cssHooks.scale = {
			set : function (a, b) {
				p(a, "scale", b);
			},
			get : function (a, c) {
				var d = b.data(a, "isoTransform");
				return d && d.scale ? d.scale : 1;
			}
		},
		b.fx.step.scale = function (a) {
			b.cssHooks.scale.set(a.elem, a.now + a.unit);
		},
		b.cssNumber.translate = !0,
		b.cssHooks.translate = {
			set : function (a, b) {
				p(a, "translate", b);
			},
			get : function (a, c) {
				var d = b.data(a, "isoTransform");
				return d && d.translate ? d.translate : [0, 0];
			}
		};
	}
	var q,
	r;
	e.csstransitions && (q = {
			WebkitTransitionProperty : "webkitTransitionEnd",
			MozTransitionProperty : "transitionend",
			OTransitionProperty : "oTransitionEnd otransitionend",
			transitionProperty : "transitionend"
		}
		[j], r = h("transitionDuration"));
	var s = b.event,
	t = b.event.handle ? "handle" : "dispatch",
	u;
	s.special.smartresize = {
		setup : function () {
			b(this).bind("resize", s.special.smartresize.handler);
		},
		teardown : function () {
			b(this).unbind("resize", s.special.smartresize.handler);
		},
		handler : function (a, b) {
			var c = this,
			d = arguments;
			a.type = "smartresize",
			u && clearTimeout(u),
			u = setTimeout(function () {
					s[t].apply(c, d);
				}, b === "execAsap" ? 0 : 100);
		}
	},
	b.fn.smartresize = function (a) {
		return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"]);
	},
	b.Isotope = function (a, c, d) {
		this.element = b(c),
		this._create(a),
		this._init(d);
	};
	var v = ["width", "height"],
	w = b(a);
	b.Isotope.settings = {
		resizable : !0,
		layoutMode : "masonry",
		containerClass : "isotope",
		itemClass : "isotope-item",
		hiddenClass : "isotope-hidden",
		hiddenStyle : {
			opacity : 0,
			scale : 0.001
		},
		visibleStyle : {
			opacity : 1,
			scale : 1
		},
		containerStyle : {
			position : "relative",
			overflow : "hidden"
		},
		animationEngine : "best-available",
		animationOptions : {
			queue : !1,
			duration : 800
		},
		sortBy : "original-order",
		sortAscending : !0,
		resizesContainer : !0,
		transformsEnabled : !0,
		itemPositionDataEnabled : !1
	},
	b.Isotope.prototype = {
		_create : function (a) {
			this.options = b.extend({}, b.Isotope.settings, a),
			this.styleQueue = [],
			this.elemCount = 0;
			var c = this.element[0].style;
			this.originalStyle = {};
			var d = v.slice(0);
			for (var e in this.options.containerStyle) {
				d.push(e);
			}
			for (var f = 0, g = d.length; f < g; f++) {
				e = d[f],
				this.originalStyle[e] = c[e] || "";
			}
			this.element.css(this.options.containerStyle),
			this._updateAnimationEngine(),
			this._updateUsingTransforms();
			var h = {
				"original-order" : function (a, b) {
					return b.elemCount++,
					b.elemCount;
				},
				random : function () {
					return Math.random();
				}
			};
			this.options.getSortData = b.extend(this.options.getSortData, h),
			this.reloadItems(),
			this.offset = {
				left : parseInt(this.element.css("padding-left") || 0, 10),
				top : parseInt(this.element.css("padding-top") || 0, 10)
			};
			var i = this;
			setTimeout(function () {
				i.element.addClass(i.options.containerClass);
			}, 0),
			this.options.resizable && w.bind("smartresize.isotope", function () {
				i.resize();
			}),
			this.element.delegate("." + this.options.hiddenClass, "click", function () {
				return !1;
			});
		},
		_getAtoms : function (a) {
			if (isArEm) {
				var b = this.options.itemSelector,
				c = b ? a.filter(b).add(a.find(b)) : a,
				d = {
					position : "absolute"
				};
				return c = c.filter(function (a, b) {
						return b.nodeType === 1;
					}),
				this.usingTransforms && (d.right = 0, d.top = 0),
				c.css(d).addClass(this.options.itemClass),
				this.updateSortData(c, !0),
				c;
			} else {
				var b = this.options.itemSelector,
				c = b ? a.filter(b).add(a.find(b)) : a,
				d = {
					position : "absolute"
				};
				return c = c.filter(function (a, b) {
						return b.nodeType === 1;
					}),
				this.usingTransforms && (d.left = 0, d.top = 0),
				c.css(d).addClass(this.options.itemClass),
				this.updateSortData(c, !0),
				c;
			}
		},
		_init : function (a) {
			this.$filteredAtoms = this._filter(this.$allAtoms),
			this._sort(),
			this.reLayout(a);
		},
		option : function (a) {
			if (b.isPlainObject(a)) {
				this.options = b.extend(!0, this.options, a);
				var c;
				for (var d in a) {
					c = "_update" + f(d),
					this[c] && this[c]();
				}
			}
		},
		_updateAnimationEngine : function () {
			var a = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""),
			b;
			switch (a) {
			case "css":
			case "none":
				b = !1;
				break;
			case "jquery":
				b = !0;
				break;
			default:
				b = !e.csstransitions;
			}
			this.isUsingJQueryAnimation = b,
			this._updateUsingTransforms();
		},
		_updateTransformsEnabled : function () {
			this._updateUsingTransforms();
		},
		_updateUsingTransforms : function () {
			var a = this.usingTransforms = this.options.transformsEnabled && e.csstransforms && e.csstransitions && !this.isUsingJQueryAnimation;
			a || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale),
			this.getPositionStyles = a ? this._translate : this._positionAbs;
		},
		_filter : function (a) {
			var b = this.options.filter === "" ? "*" : this.options.filter;
			if (!b) {
				return a;
			}
			var c = this.options.hiddenClass,
			d = "." + c,
			e = a.filter(d),
			f = e;
			if (b !== "*") {
				f = e.filter(b);
				var g = a.not(d).not(b).addClass(c);
				this.styleQueue.push({
					$el : g,
					style : this.options.hiddenStyle
				});
			}
			return this.styleQueue.push({
				$el : f,
				style : this.options.visibleStyle
			}),
			f.removeClass(c),
			a.filter(b);
		},
		updateSortData : function (a, c) {
			var d = this,
			e = this.options.getSortData,
			f,
			g;
			a.each(function () {
				f = b(this),
				g = {};
				for (var a in e) {
					!c && a === "original-order" ? g[a] = b.data(this, "isotope-sort-data")[a] : g[a] = e[a](f, d);
				}
				b.data(this, "isotope-sort-data", g);
			});
		},
		_sort : function () {
			var a = this.options.sortBy,
			b = this._getSorter,
			c = this.options.sortAscending ? 1 : -1,
			d = function (d, e) {
				var f = b(d, a),
				g = b(e, a);
				return f === g && a !== "original-order" && (f = b(d, "original-order"), g = b(e, "original-order")),
				(f > g ? 1 : f < g ? -1 : 0) * c;
			};
			this.$filteredAtoms.sort(d);
		},
		_getSorter : function (a, c) {
			return b.data(a, "isotope-sort-data")[c];
		},
		_translate : function (a, b) {
			return {
				translate : [a, b]
			};
		},
		_positionAbs : function (a, b) {
			if (isArEm) {
				return {
					right : a,
					top : b
				};
			} else {
				return {
					left : a,
					top : b
				};
			}
		},
		_pushPosition : function (a, b, c) {
			b = Math.round(b + this.offset.left),
			c = Math.round(c + this.offset.top);
			var d = this.getPositionStyles(b, c);
			this.styleQueue.push({
				$el : a,
				style : d
			}),
			this.options.itemPositionDataEnabled && a.data("isotope-item-position", {
				x : b,
				y : c
			});
		},
		layout : function (a, b) {
			var c = this.options.layoutMode;
			this["_" + c + "Layout"](a);
			if (this.options.resizesContainer) {
				var d = this["_" + c + "GetContainerSize"]();
				this.styleQueue.push({
					$el : this.element,
					style : d
				});
			}
			this._processStyleQueue(a, b),
			this.isLaidOut = !0;
		},
		_processStyleQueue : function (a, c) {
			var d = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css",
			f = this.options.animationOptions,
			g = this.options.onLayout,
			h,
			i,
			j,
			k;
			i = function (a, b) {
				b.$el[d](b.style, f);
			};
			if (this._isInserting && this.isUsingJQueryAnimation) {
				i = function (a, b) {
					h = b.$el.hasClass("no-transition") ? "css" : d,
					b.$el[h](b.style, f);
				};
			} else {
				if (c || g || f.complete) {
					var l = !1,
					m = [c, g, f.complete],
					n = this;
					j = !0,
					k = function () {
						if (l) {
							return;
						}
						var b;
						for (var c = 0, d = m.length; c < d; c++) {
							b = m[c],
							typeof b == "function" && b.call(n.element, a, n);
						}
						l = !0;
					};
					if (this.isUsingJQueryAnimation && d === "animate") {
						f.complete = k,
						j = !1;
					} else {
						if (e.csstransitions) {
							var o = 0,
							p = this.styleQueue[0],
							s = p && p.$el,
							t;
							while (!s || !s.length) {
								t = this.styleQueue[o++];
								if (!t) {
									return;
								}
								s = t.$el;
							}
							var u = parseFloat(getComputedStyle(s[0])[r]);
							u > 0 && (i = function (a, b) {
								b.$el[d](b.style, f).one(q, k);
							}, j = !1);
						}
					}
				}
			}
			b.each(this.styleQueue, i),
			j && k(),
			this.styleQueue = [];
		},
		resize : function () {
			this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout();
		},
		reLayout : function (a) {
			this["_" + this.options.layoutMode + "Reset"](),
			this.layout(this.$filteredAtoms, a);
		},
		addItems : function (a, b) {
			var c = this._getAtoms(a);
			this.$allAtoms = this.$allAtoms.add(c),
			b && b(c);
		},
		insert : function (a, b) {
			this.element.append(a);
			var c = this;
			this.addItems(a, function (a) {
				var d = c._filter(a);
				c._addHideAppended(d),
				c._sort(),
				c.reLayout(),
				c._revealAppended(d, b);
			});
		},
		appended : function (a, b) {
			var c = this;
			this.addItems(a, function (a) {
				c._addHideAppended(a),
				c.layout(a),
				c._revealAppended(a, b);
			});
		},
		_addHideAppended : function (a) {
			this.$filteredAtoms = this.$filteredAtoms.add(a),
			a.addClass("no-transition"),
			this._isInserting = !0,
			this.styleQueue.push({
				$el : a,
				style : this.options.hiddenStyle
			});
		},
		_revealAppended : function (a, b) {
			var c = this;
			setTimeout(function () {
				a.removeClass("no-transition"),
				c.styleQueue.push({
					$el : a,
					style : c.options.visibleStyle
				}),
				c._isInserting = !1,
				c._processStyleQueue(a, b);
			}, 10);
		},
		reloadItems : function () {
			this.$allAtoms = this._getAtoms(this.element.children());
		},
		remove : function (a, b) {
			this.$allAtoms = this.$allAtoms.not(a),
			this.$filteredAtoms = this.$filteredAtoms.not(a);
			var c = this,
			d = function () {
				a.remove(),
				b && b.call(c.element);
			};
			a.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({
					$el : a,
					style : this.options.hiddenStyle
				}), this._sort(), this.reLayout(d)) : d();
		},
		shuffle : function (a) {
			this.updateSortData(this.$allAtoms),
			this.options.sortBy = "random",
			this._sort(),
			this.reLayout(a);
		},
		destroy : function () {
			var a = this.usingTransforms,
			b = this.options;
			this.$allAtoms.removeClass(b.hiddenClass + " " + b.itemClass).each(function () {
				var b = this.style;
				b.position = "",
				b.top = "",
				b.left = "",
				b.opacity = "",
				a && (b[i] = "");
			});
			var c = this.element[0].style;
			for (var d in this.originalStyle) {
				c[d] = this.originalStyle[d];
			}
			this.element.unbind(".isotope").undelegate("." + b.hiddenClass, "click").removeClass(b.containerClass).removeData("isotope"),
			w.unbind(".isotope");
		},
		_getSegments : function (a) {
			var b = this.options.layoutMode,
			c = a ? "rowHeight" : "columnWidth",
			d = a ? "height" : "width",
			e = a ? "rows" : "cols",
			g = this.element[d](),
			h,
			i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + f(d)](!0) || g;
			h = Math.floor(g / i),
			h = Math.max(h, 1),
			this[b][e] = h,
			this[b][c] = i;
		},
		_checkIfSegmentsChanged : function (a) {
			var b = this.options.layoutMode,
			c = a ? "rows" : "cols",
			d = this[b][c];
			return this._getSegments(a),
			this[b][c] !== d;
		},
		_masonryReset : function () {
			this.masonry = {},
			this._getSegments();
			var a = this.masonry.cols;
			this.masonry.colYs = [];
			while (a--) {
				this.masonry.colYs.push(0);
			}
		},
		_masonryLayout : function (a) {
			var c = this,
			d = c.masonry;
			a.each(function () {
				var a = b(this),
				e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
				e = Math.min(e, d.cols);
				if (e === 1) {
					c._masonryPlaceBrick(a, d.colYs);
				} else {
					var f = d.cols + 1 - e,
					g = [],
					h,
					i;
					for (i = 0; i < f; i++) {
						h = d.colYs.slice(i, i + e),
						g[i] = Math.max.apply(Math, h);
					}
					c._masonryPlaceBrick(a, g);
				}
			});
		},
		_masonryPlaceBrick : function (a, b) {
			var c = Math.min.apply(Math, b),
			d = 0;
			for (var e = 0, f = b.length; e < f; e++) {
				if (b[e] === c) {
					d = e;
					break;
				}
			}
			var g = this.masonry.columnWidth * d,
			h = c;
			this._pushPosition(a, g, h);
			var i = c + a.outerHeight(!0),
			j = this.masonry.cols + 1 - f;
			for (e = 0; e < j; e++) {
				this.masonry.colYs[d + e] = i;
			}
		},
		_masonryGetContainerSize : function () {
			var a = Math.max.apply(Math, this.masonry.colYs);
			return {
				height : a
			};
		},
		_masonryResizeChanged : function () {
			return this._checkIfSegmentsChanged();
		},
		_fitRowsReset : function () {
			this.fitRows = {
				x : 0,
				y : 0,
				height : 0
			};
		},
		_fitRowsLayout : function (a) {
			var c = this,
			d = this.element.width(),
			e = this.fitRows;
			a.each(function () {
				var a = b(this),
				f = a.outerWidth(!0),
				g = a.outerHeight(!0);
				e.x !== 0 && f + e.x > d && (e.x = 0, e.y = e.height),
				c._pushPosition(a, e.x, e.y),
				e.height = Math.max(e.y + g, e.height),
				e.x += f;
			});
		},
		_fitRowsGetContainerSize : function () {
			return {
				height : this.fitRows.height
			};
		},
		_fitRowsResizeChanged : function () {
			return !0;
		},
		_cellsByRowReset : function () {
			this.cellsByRow = {
				index : 0
			},
			this._getSegments(),
			this._getSegments(!0);
		},
		_cellsByRowLayout : function (a) {
			var c = this,
			d = this.cellsByRow;
			a.each(function () {
				var a = b(this),
				e = d.index % d.cols,
				f = Math.floor(d.index / d.cols),
				g = (e + 0.5) * d.columnWidth - a.outerWidth(!0) / 2,
				h = (f + 0.5) * d.rowHeight - a.outerHeight(!0) / 2;
				c._pushPosition(a, g, h),
				d.index++;
			});
		},
		_cellsByRowGetContainerSize : function () {
			return {
				height : Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
			};
		},
		_cellsByRowResizeChanged : function () {
			return this._checkIfSegmentsChanged();
		},
		_straightDownReset : function () {
			this.straightDown = {
				y : 0
			};
		},
		_straightDownLayout : function (a) {
			var c = this;
			a.each(function (a) {
				var d = b(this);
				c._pushPosition(d, 0, c.straightDown.y),
				c.straightDown.y += d.outerHeight(!0);
			});
		},
		_straightDownGetContainerSize : function () {
			return {
				height : this.straightDown.y
			};
		},
		_straightDownResizeChanged : function () {
			return !0;
		},
		_masonryHorizontalReset : function () {
			this.masonryHorizontal = {},
			this._getSegments(!0);
			var a = this.masonryHorizontal.rows;
			this.masonryHorizontal.rowXs = [];
			while (a--) {
				this.masonryHorizontal.rowXs.push(0);
			}
		},
		_masonryHorizontalLayout : function (a) {
			var c = this,
			d = c.masonryHorizontal;
			a.each(function () {
				var a = b(this),
				e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
				e = Math.min(e, d.rows);
				if (e === 1) {
					c._masonryHorizontalPlaceBrick(a, d.rowXs);
				} else {
					var f = d.rows + 1 - e,
					g = [],
					h,
					i;
					for (i = 0; i < f; i++) {
						h = d.rowXs.slice(i, i + e),
						g[i] = Math.max.apply(Math, h);
					}
					c._masonryHorizontalPlaceBrick(a, g);
				}
			});
		},
		_masonryHorizontalPlaceBrick : function (a, b) {
			var c = Math.min.apply(Math, b),
			d = 0;
			for (var e = 0, f = b.length; e < f; e++) {
				if (b[e] === c) {
					d = e;
					break;
				}
			}
			var g = c,
			h = this.masonryHorizontal.rowHeight * d;
			this._pushPosition(a, g, h);
			var i = c + a.outerWidth(!0),
			j = this.masonryHorizontal.rows + 1 - f;
			for (e = 0; e < j; e++) {
				this.masonryHorizontal.rowXs[d + e] = i;
			}
		},
		_masonryHorizontalGetContainerSize : function () {
			var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
			return {
				width : a
			};
		},
		_masonryHorizontalResizeChanged : function () {
			return this._checkIfSegmentsChanged(!0);
		},
		_fitColumnsReset : function () {
			this.fitColumns = {
				x : 0,
				y : 0,
				width : 0
			};
		},
		_fitColumnsLayout : function (a) {
			var c = this,
			d = this.element.height(),
			e = this.fitColumns;
			a.each(function () {
				var a = b(this),
				f = a.outerWidth(!0),
				g = a.outerHeight(!0);
				e.y !== 0 && g + e.y > d && (e.x = e.width, e.y = 0),
				c._pushPosition(a, e.x, e.y),
				e.width = Math.max(e.x + f, e.width),
				e.y += g;
			});
		},
		_fitColumnsGetContainerSize : function () {
			return {
				width : this.fitColumns.width
			};
		},
		_fitColumnsResizeChanged : function () {
			return !0;
		},
		_cellsByColumnReset : function () {
			this.cellsByColumn = {
				index : 0
			},
			this._getSegments(),
			this._getSegments(!0);
		},
		_cellsByColumnLayout : function (a) {
			var c = this,
			d = this.cellsByColumn;
			a.each(function () {
				var a = b(this),
				e = Math.floor(d.index / d.rows),
				f = d.index % d.rows,
				g = (e + 0.5) * d.columnWidth - a.outerWidth(!0) / 2,
				h = (f + 0.5) * d.rowHeight - a.outerHeight(!0) / 2;
				c._pushPosition(a, g, h),
				d.index++;
			});
		},
		_cellsByColumnGetContainerSize : function () {
			return {
				width : Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
			};
		},
		_cellsByColumnResizeChanged : function () {
			return this._checkIfSegmentsChanged(!0);
		},
		_straightAcrossReset : function () {
			this.straightAcross = {
				x : 0
			};
		},
		_straightAcrossLayout : function (a) {
			var c = this;
			a.each(function (a) {
				var d = b(this);
				c._pushPosition(d, c.straightAcross.x, 0),
				c.straightAcross.x += d.outerWidth(!0);
			});
		},
		_straightAcrossGetContainerSize : function () {
			return {
				width : this.straightAcross.x
			};
		},
		_straightAcrossResizeChanged : function () {
			return !0;
		}
	},
	b.fn.imagesLoaded = function (a) {
		function h() {
			a.call(c, d);
		}
		function i(a) {
			var c = a.target;
			c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)));
		}
		var c = this,
		d = c.find("img").add(c.filter("img")),
		e = d.length,
		f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
		g = [];
		return e || h(),
		d.bind("load.imagesLoaded error.imagesLoaded", i).each(function () {
			var a = this.src;
			this.src = f,
			this.src = a;
		}),
		c;
	};
	var x = function (b) {
		a.console && a.console.error(b);
	};
	b.fn.isotope = function (a, c) {
		if (typeof a == "string") {
			var d = Array.prototype.slice.call(arguments, 1);
			this.each(function () {
				var c = b.data(this, "isotope");
				if (!c) {
					x("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'");
					return;
				}
				if (!b.isFunction(c[a]) || a.charAt(0) === "_") {
					x("no such method '" + a + "' for isotope instance");
					return;
				}
				c[a].apply(c, d);
			});
		} else {
			this.each(function () {
				var d = b.data(this, "isotope");
				d ? (d.option(a), d._init(c)) : b.data(this, "isotope", new b.Isotope(a, this, c));
			});
		}
		return this;
	};
})(window, jQuery);
window.Swipe = function (element, options) {
	if (!element) {
		return null;
	}
	var _this = this;
	this.options = options || {};
	this.index = this.options.startSlide || 0;
	this.speed = this.options.speed || 300;
	this.callback = this.options.callback || function () {};
	this.delay = this.options.auto || 0;
	this.container = element;
	this.element = this.container.children[0];
	this.container.style.overflow = "hidden";
	this.element.style.listStyle = "none";
	this.setup();
	this.begin();
	if (this.element.addEventListener) {
		this.element.addEventListener("touchstart", this, false);
		this.element.addEventListener("touchmove", this, false);
		this.element.addEventListener("touchend", this, false);
		this.element.addEventListener("webkitTransitionEnd", this, false);
		this.element.addEventListener("msTransitionEnd", this, false);
		this.element.addEventListener("oTransitionEnd", this, false);
		this.element.addEventListener("transitionend", this, false);
		window.addEventListener("resize", this, false);
	}
};
Swipe.prototype = {
	setup : function () {
		this.slides = this.element.children;
		this.length = this.slides.length;
		if (this.length < 2) {
			return null;
		}
		this.width = $(this.container).width();
		if (!this.width) {
			return null;
		}
		this.container.style.visibility = "hidden";
		this.element.style.width = (this.slides.length * this.width) + "px";
		var index = this.slides.length;
		while (index--) {
			var el = this.slides[index];
			el.style.width = this.width + "px";
			el.style.display = "table-cell";
			el.style.verticalAlign = "top";
			if ($(this.element).parent().hasClass("carousel-image-only") && $(this).find(".carousel-inner").length > 0) {
				var elImg = el.getElementsByTagName("img");
				if (elImg) {
					elImg[0].style.width = this.width + "px";
				}
			}
		}
		if (isArEm) {
			this.index = this.length - 1;
		}
		this.slide(this.index, 0);
		this.container.style.visibility = "visible";
	},
	slide : function (index, duration) {
		var style = this.element.style;
		if (duration === undefined) {
			duration = this.speed;
		}
		style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + "ms";
		style.MozTransform = style.webkitTransform = "translate3d(" +  - (index * this.width) + "px,0,0)";
		style.msTransform = style.OTransform = "translateX(" +  - (index * this.width) + "px)";
		if (navigator.userAgent.indexOf("MSIE 8") && navigator.userAgent.indexOf("MSIE 8") > -1) {
			style.left =  - (index * this.width) + "px";
		}
		this.index = index;
		if (navigator.userAgent.indexOf("MSIE") && navigator.userAgent.indexOf("MSIE") > -1) {
			this.transitionEnd(this);
		}
	},
	getPos : function () {
		return this.index;
	},
	prev : function (delay) {
		this.delay = delay || 0;
		clearTimeout(this.interval);
		if (this.index) {
			$(".carousel-control.left.carousel-illustrated.disable").removeClass("disable");
			$(".carousel-control.right.carousel-illustrated.disable").removeClass("disable");
			if (this.index - 1 == 0) {
				$(".carousel-control.left.carousel-illustrated").addClass("disable");
			}
			this.slide(this.index - 1, this.speed);
		}
	},
	prevPop : function (delay) {
		this.delay = delay || 0;
		clearTimeout(this.interval);
		if (this.index) {
			$(".carousel-control.left.carousel-mediaPopup.disable").removeClass("disable");
			$(".carousel-control.right.carousel-mediaPopup.disable").removeClass("disable");
			if (this.index - 1 == 0) {
				$(".carousel-control.carousel-mediaPopup.left").addClass("disable");
			}
			this.slide(this.index - 1, this.speed);
		}
	},
	next : function (delay) {
		this.delay = delay || 0;
		clearTimeout(this.interval);
		if (this.index < this.length - 1) {
			$(".carousel-control.right.carousel-illustrated.disable").removeClass("disable");
			$(".carousel-control.left.carousel-illustrated.disable").removeClass("disable");
			this.slide(this.index + 1, this.speed);
			if (this.index == this.length - 1) {
				$(".carousel-control.carousel-illustrated.right").addClass("disable");
			}
		}
	},
	nextPop : function (delay) {
		this.delay = delay || 0;
		clearTimeout(this.interval);
		if (this.index < this.length - 1) {
			$(".carousel-control.right.carousel-mediaPopup.disable").removeClass("disable");
			$(".carousel-control.left.carousel-mediaPopup.disable").removeClass("disable");
			this.slide(this.index + 1, this.speed);
			if (this.index == this.length - 1) {
				$(".carousel-control.carousel-mediaPopup.right").addClass("disable");
			}
		}
	},
	begin : function () {
		var _this = this;
		this.interval = (this.delay) ? setTimeout(function () {
			if (isArEm) {
				_this.prev(_this.delay);
			} else {
				_this.next(_this.delay);
			}
		}, this.delay) : 0;
	},
	stop : function () {
		this.delay = 0;
		clearTimeout(this.interval);
	},
	resume : function () {
		this.delay = this.options.auto || 0;
		this.begin();
	},
	handleEvent : function (e) {
		switch (e.type) {
		case "touchstart":
			this.onTouchStart(e);
			break;
		case "touchmove":
			this.onTouchMove(e);
			break;
		case "touchend":
			this.onTouchEnd(e);
			break;
		case "webkitTransitionEnd":
		case "msTransitionEnd":
		case "oTransitionEnd":
		case "transitionend":
			this.transitionEnd(e);
			break;
		case "resize":
			this.setup();
			break;
		}
	},
	transitionEnd : function (e) {
		if (this.delay) {
			this.begin();
		}
		this.callback(e, this.index, this.slides[this.index]);
	},
	onTouchStart : function (e) {
		this.start = {
			pageX : e.touches[0].pageX,
			pageY : e.touches[0].pageY,
			time : Number(new Date())
		};
		this.isScrolling = undefined;
		this.deltaX = 0;
		this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;
		e.stopPropagation();
	},
	onTouchMove : function (e) {
		if (e.touches.length > 1 || e.scale && e.scale !== 1) {
			return;
		}
		this.deltaX = e.touches[0].pageX - this.start.pageX;
		if (typeof this.isScrolling == "undefined") {
			this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY));
		}
		if (!this.isScrolling) {
			e.preventDefault();
			clearTimeout(this.interval);
			this.deltaX = this.deltaX / ((!this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0) ? (Math.abs(this.deltaX) / this.width + 1) : 1);
			this.element.style.MozTransform = this.element.style.webkitTransform = "translate3d(" + (this.deltaX - this.index * this.width) + "px,0,0)";
			e.stopPropagation();
		}
	},
	onTouchEnd : function (e) {
		var isValidSlide = Number(new Date()) - this.start.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 2,
		isPastBounds = !this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0;
		if (!this.isScrolling) {
			this.slide(this.index + (isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0), this.speed);
		}
	}
};
function carouselSwipe(mm) {
	var carouselSlider = {};
	var z_model = 0;
	$(".carousel").each(function (index) {
		if (typeof(mm) != "undefined") {
			z_model++;
			$(".carousel-control.right.carousel-mediaPopup.disable").removeClass("disable");
			$(".carousel-control.left.carousel-mediaPopup.disable").removeClass("disable");
			if (isArEm) {
				$(".carousel-control.right.carousel-mediaPopup").addClass("disable");
			} else {
				$(".carousel-control.left.carousel-mediaPopup").addClass("disable");
			}
		} else {
			if (isArEm) {
				$(".carousel-control.right").addClass("disable");
			} else {
				$(".carousel-control.left").addClass("disable");
			}
		}
		if (z_model != 1) {
			var currentItemId = $(this).attr("id");
			var callbackCheck = 0;
			var rotation = 5000;
			if ($(this).attr("data-rotation")) {
				rotation = parseInt($(this).attr("data-rotation"), 2);
			}
			carouselSlider[currentItemId] = new Swipe(this, {
					auto : rotation,
					callback : function (e, pos) {
						if (callbackCheck === 1) {
							var i = carouselSlider[currentItemId].bullets.length;
							while (i--) {
								carouselSlider[currentItemId].bullets[i].className = " ";
							}
							carouselSlider[currentItemId].bullets[pos].className = "on";
						}
					}
				});
			if (isArEm) {
				var parentObj = carouselSlider[currentItemId].element;
				var childObj = carouselSlider[currentItemId].slides;
				var total = childObj.length;
				$(childObj).each(function (i) {
					$(parentObj).append($(childObj).eq((total - 1) - i));
				});
			}
			callbackCheck = 1;
			if ($(this).find(".carousel-control").length > 0) {
				carouselSlider[currentItemId].bullets = $(this).find(".carousel-position").find("span");
				if (carouselSlider[currentItemId].bullets.length < 1) {
					carouselSlider[currentItemId].bullets = $(this).parent().find(".carousel-position").find("span");
				}
				var j = carouselSlider[currentItemId].bullets.length;
				while (j--) {
					carouselSlider[currentItemId].bullets[j].className = " ";
				}
				carouselSlider[currentItemId].bullets[carouselSlider[currentItemId].getPos()].className = "on";
				$(this).find(".carousel-control.carousel-illustrated.left").click(function () {
					carouselSlider[currentItemId].prev();
				});
				$(this).find(".carousel-control.carousel-illustrated.right").click(function () {
					carouselSlider[currentItemId].next();
				});
				$(this).find(".carousel-control.carousel-mediaPopup.left").click(function () {
					carouselSlider[currentItemId].prevPop();
				});
				$(this).find(".carousel-control.carousel-mediaPopup.right").click(function () {
					carouselSlider[currentItemId].nextPop();
				});
			}
		}
	});
}
$(".modal").on("shown.bs.modal", function () {
	carouselSwipe("open");
});
!function ($) {
	$.fn.tiles = function () {
		return this.each(function () {
			var tileList = $(this);
			tileList.isotope({
				itemSelector : ".span3",
				layoutMode : "fitRows"
			});
			var selectedCategories = [];
			var categoryGroups = $(".tile-categories-list").find(".tile-category-tab-dropdown-menu");
			var allCategoryLinks = categoryGroups.find("a");
			if (categoryGroups.length > 0) {
				categoryGroups.each(function (index) {
					var categoryLinks = $(this).find("li.active a");
					categoryLinks.each(function () {
						var filterValue = $(this).attr("data-filter");
						selectedCategories.push(filterValue);
					});
				});
				allCategoryLinks.click(function () {
					var currentFilter = $(this).attr("data-filter");
					var selector = "";
					var currentFilterIndex = $(this).parents(".tile-category-tab-control").index();
					currentFilterIndex = Math.floor(currentFilterIndex / 2);
					selectedCategories[currentFilterIndex] = currentFilter;
					for (var i = 0; i < selectedCategories.length; i++) {
						if (selectedCategories[i] != "*") {
							selector = selector + selectedCategories[i];
						}
					}
					tileList.isotope({
						filter : selector
					});
				});
			}
		});
	};
}
(window.jQuery);
!function ($) {
	$.fn.newsAlertsBar = function () {
		String.prototype.parseURL = function () {
			return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+.[A-Za-z0-9-_:%&~?\/.=]+/g, function (url) {
				return url.link(url);
			});
		};
		String.prototype.parseUsername = function () {
			return this.replace(/[@]+[A-Za-z0-9-_]+/g, function (u) {
				var username = u.replace("@", "");
				return u.link("https://twitter.com/" + username);
			});
		};
		String.prototype.parseHashtag = function () {
			return this.replace(/[#]+[A-Za-z0-9-_]+/g, function (t) {
				var tag = t.replace("#", "%23");
				return t.link("https://twitter.com/search?q=" + tag + "&src=hash");
			});
		};
		var interval;
		var index = 0;
		var news = $(".news-alerts-bar-links li");
		$(".news-alerts-bar").hover(function () {
			clearInterval(interval);
		}, function () {
			interval = setInterval(rotate, 5000);
		});
		function rotate() {
			news.eq(index).hide();
			index = (index + 1) % news.length;
			news.eq(index).show();
		}
		function start() {
			news = $(".news-alerts-bar-links li");
			interval = setInterval(rotate, 5000);
		}
		function getRecentTweet() {
			var twitterListItem = $(".news-alerts-bar-links .twitter");
			if (!(twitterListItem.length > 0)) {
				return;
			}
			var twitterUserId = twitterListItem.attr("data-twitter-user-id");
			if (twitterUserId.length > 0) {
				var twitterAPI = "/ww/jsp/common/twitter.jsp?screen_name=" + twitterUserId;
				$.getJSON(twitterAPI).done(function (userTimeline) {
					if (userTimeline.length > 0) {
						var now = new Date();
						var tweetCreatedDate = new Date(userTimeline[0].created_at);
						var tweetAge = now - tweetCreatedDate;
						var tweetExpiration = 604800000;
						if (tweetAge < tweetExpiration) {
							var tweet = userTimeline[0].text;
							tweet = tweet.parseURL().parseUsername().parseHashtag();
							tweet = "<strong>@" + twitterUserId + ":</strong> " + tweet;
							twitterListItem.append(tweet);
						} else {
							twitterListItem.remove();
						}
					} else {
						twitterListItem.remove();
					}
					start();
				}).fail(function () {
					twitterListItem.remove();
					start();
				});
			}
		}
		getRecentTweet();
	};
}
(window.jQuery);
!function ($) {
	$.fn.jobsNewsTicker = function () {
		var interval;
		var index = 0;
		var news = $(".jobs-news-ticker-links li");
		$(".jobs-news-ticker").hover(function () {
			clearInterval(interval);
		}, function () {
			interval = setInterval(rotate, 5000);
		});
		function rotate() {
			news.eq(index).hide();
			index = (index + 1) % news.length;
			news.eq(index).show();
		}
		function start() {
			news = $(".jobs-news-ticker-links li");
			interval = setInterval(rotate, 5000);
		}
		start();
	};
}
(window.jQuery);
!function ($) {
	$.fn.flatTabs = function () {
		function closeTabs(action) {
			if (action === "close") {
				$(".flat-tab").each(function () {
					if (!$(this).hasClass("active-flat-tab")) {
						$(this).removeClass("flat-tab-mobile-show");
					}
				});
			} else {
				if (action === "open") {
					$(".flat-tab").each(function () {
						if (!$(this).hasClass("active-flat-tab")) {
							$(this).addClass("flat-tab-mobile-show");
						}
					});
				} else {
					return console.log("Action parameter not recognized");
				}
			}
		}
		$(".active-flat-tab").on("click", function (e) {
			e.preventDefault();
			if ($(this).hasClass("active-flat-tab-opened")) {
				if ($(window).width() < 980) {
					$(this).removeClass("active-flat-tab-opened");
					$(this).addClass("active-flat-tab-closed");
					closeTabs("close");
				}
				return;
			}
			if ($(this).hasClass("active-flat-tab-closed")) {
				if ($(window).width() < 980) {
					$(this).removeClass("active-flat-tab-closed");
					$(this).addClass("active-flat-tab-opened");
					closeTabs("open");
				}
				return;
			}
		});
		var flatTabs = $("div.flat-tabs").first(),
		tOffset = flatTabs.offset();
	};
}
(window.jQuery);
!function ($) {
	$.fn.videoCarousel = function () {
		$(".video-carousel-nav ul li a").click(function (e) {
			e.preventDefault();
			$(".video-carousel-list li").removeClass("current");
			$(".video-carousel-content-list li").removeClass("current");
			$($(this).attr("href") + "-video").addClass("current");
			$($(this).attr("href") + "-content").addClass("current");
			$(".video-carousel-nav a").removeClass("current");
			$(this).addClass("current");
		});
		$(".video-carousel-nav a.nav-right").click(function (e) {
			e.preventDefault();
			var currentVideo = $(".video-carousel-nav a.current").parent();
			var nextVideo = currentVideo.next().find("a");
			if (nextVideo.length > 0) {
				var nextVideoParent = nextVideo.parent();
				if (nextVideoParent.hasClass("stx-hide")) {
					var nextVideoIndex = nextVideoParent.index();
					$(".video-carousel-nav li:nth-child(" + (nextVideoIndex - 3) + ")").addClass("stx-hide");
					nextVideoParent.removeClass("stx-hide");
				}
				$(".video-carousel-list li").removeClass("current");
				$(".video-carousel-content-list li").removeClass("current");
				$(nextVideo.attr("href") + "-video").addClass("current");
				$(nextVideo.attr("href") + "-content").addClass("current");
				$(".video-carousel-nav a").removeClass("current");
				nextVideo.addClass("current");
			}
		});
		$(".video-carousel-nav a.nav-left").click(function (e) {
			e.preventDefault();
			var currentVideo = $(".video-carousel-nav a.current").parent();
			var nextVideo = currentVideo.prev().find("a");
			if (nextVideo.length > 0) {
				var nextVideoParent = nextVideo.parent();
				if (nextVideoParent.hasClass("stx-hide")) {
					var nextVideoIndex = nextVideoParent.index();
					$(".video-carousel-nav li:nth-child(" + (nextVideoIndex + 5) + ")").addClass("stx-hide");
					nextVideoParent.removeClass("stx-hide");
				}
				$(".video-carousel-list li").removeClass("current");
				$(".video-carousel-content-list li").removeClass("current");
				$(nextVideo.attr("href") + "-video").addClass("current");
				$(nextVideo.attr("href") + "-content").addClass("current");
				$(".video-carousel-nav a").removeClass("current");
				nextVideo.addClass("current");
			}
		});
	};
}
(window.jQuery);
function setSameElementHeight(e) {
	var tallest = 0;
	$(e).each(function () {
		$(this).css("height", "auto");
		if ($(this).height() > tallest) {
			tallest = $(this).height();
		}
	});
	$(e).height(tallest);
}
function resetElementHeight(e) {
	$(e).each(function () {
		$(this).css("height", "auto");
	});
}
function getProductGridPricesModle(){
	//alert($("#support-search-price").val());
}
function getProductGridPrices() {
	var POP = "value-add";
	var dr_pid = "";
	var stx_store = false;
	var dr_locale = "";
	var ecomm_currency = "";
	var ecomm_locale = getEcommLocale();
	if (ecomm_locale != "") {
		stx_store = true;
	} else {
		return;
	}
	for (i = 0; i < ecommLocaleMap.ecommLocalesList.length; i++) {
		if (ecommLocaleMap.ecommLocalesList[i].ecommLocale == ecomm_locale) {
			dr_locale = ecommLocaleMap.ecommLocalesList[i].drLocale;
			ecomm_currency = ecommLocaleMap.ecommLocalesList[i].currency;
		}
	}
	var productGridItems = [];
	$(".teaser-product-grid-item-pid").each(function (i) {
		productGridItem = {};
		productGridItem.div = $(this).parent();
		productGridItem.pid = $(this).val();
		productGridItems.push(productGridItem);
	});
	if (productGridItems.length > 0) {
		var productGridPids = [];
		for (var i = 0; i < productGridItems.length; i++) {
			if (productGridItems[i].pid.length > 0) {
				productGridPids.push(productGridItems[i].pid);
			}
		}
		if (productGridPids.length > 0) {
			var drURL = "/ww/jsp/common/drproduct.jsp?drProductId=" + productGridPids + "&drLocale=" + dr_locale + "&currency=" + ecomm_currency;
			$.getJSON(drURL, function (data) {
				for (var j = 0; j < productGridItems.length; j++) {
					var storeProduct = getStoreProduct(productGridItems[j].pid, data.storeProduct);
					if (storeProduct != null) {
						if (storeProduct.price != storeProduct.discountedPrice) {
							$(productGridItems[j].div).append("<div class='price-discount-message'>" + labels.sale + "</div><div class='price-discount'>" + storeProduct.discountedPrice + "</div><div class='price sale'>" + storeProduct.price + "</div>");
						} else {
							$(productGridItems[j].div).append("<div class='price'>" + storeProduct.price + "</div>");
						}
					}
				}
			});
			$(".teaser-product-grid").find(".teaser-product-grid-item-pid").each(function () {
				dr_pid = $(this).attr("value");
				$(this).parents("div.teaser-product-grid-item").find("a.teaser-product-grid-item-button").attr("href", "http://shop.seagate.com/store/sgateus/" + dr_locale + "/buy/productID." + dr_pid + "/quantity.1/Currency." + ecomm_currency);
			});
		}
	}
}
function getStoreProduct(pid, storeProducts) {
	for (var j = 0; j < storeProducts.length; j++) {
		if (storeProducts[j].pid == pid) {
			return storeProducts[j];
		}
	}
	return null;
}
function teaserProductGridItemHeight() {
	if ($(window).width() > 767) {
		setSameElementHeight(".teaser-product-grid-item-name");
		setSameElementHeight(".teaser-product-grid-item-message");
		setSameElementHeight(".teaser-product-grid-item-proposition");
	} else {
		resetElementHeight(".teaser-product-grid-item-name");
		resetElementHeight(".teaser-product-grid-item-message");
		resetElementHeight(".teaser-product-grid-item-proposition");
	}
}
$(function () {
	$(".page-anchor").on("click touchstart", function (e) {
		e.preventDefault();
		var top_offset = 115;
		if ($("#nav-wrapper").hasClass("nav-wrapper-mobile-width")) {
			top_offset = 0;
		}
		$("html, body").animate({
			scrollTop : $($(this).attr("href")).offset().top - top_offset
		}, 500);
	});
});
function stickyHeaders() {
	var stickyHeaders = $(".sticky-header");
	for (var i = 0; i < stickyHeaders.length; i++) {
		var header = $(stickyHeaders[i]);
		var nextHeader = $(stickyHeaders[i + 1]);
		var holder = header.prev(".sticky-header-placeholder");
		var windowTop = $(this).scrollTop();
		var holderOffset = holder.offset();
		var nextHeaderOffset = nextHeader.offset();
		if (windowTop > holderOffset.top) {
			if (nextHeader.length > 0) {
				var dif = nextHeaderOffset.top - windowTop;
				if (dif < header.height()) {
					header.css("position", "fixed").css("top", "-" + (header.height() - dif) + "px");
					header.addClass("sticky-header-active");
				} else {
					holder.css("height", header.height() + "px");
					header.css("position", "fixed").css("top", "0px");
					header.addClass("sticky-header-active");
				}
			} else {
				holder.css("height", header.height() + "px");
				header.css("position", "fixed").css("top", "0px");
				header.addClass("sticky-header-active");
			}
		} else {
			holder.css("height", "0px");
			if (stickyPosArray[i] == "" || stickyPosArray[i] == "static") {
				header.css("position", "static").css("top", "0px");
			} else {
				header.css("position", stickyPosArray[i]).css("top", "0px");
			}
			header.removeClass("sticky-header-active");
		}
	}
}
if ($(".banner-home").length > 0) {
	var bannerHomeTimer = null;
	var bannerHomeLength = $(".banner-home").find(".banner-item").length;
	var bannerHomeIndex = 1;
	var bannerHomeSingle = false;
	if (bannerHomeLength === 1) {
		bannerHomeSingle = true;
	}
	var bannerHomeIndexMax = bannerHomeLength - 1;
	var bannerHomeClicked = false;
}
function bannerHomeDisplay(bannerItem) {
	if (bannerHomeTimer != null) {
		clearTimeout(bannerHomeTimer);
	}
	var currentBanner = $(".banner-item-current");
	if (!currentBanner.is(bannerItem)) {
		currentBanner.removeClass("banner-item-current").find(".banner-content-wrapper").removeClass("banner-content-top");
		$(".banner-home-controls a").removeClass("current");
		$("a[href=" + bannerItem + "]").addClass("current");
		$(bannerItem).addClass("banner-item-visible banner-item-current").find(".banner-content-wrapper").addClass("banner-content-top");
		currentBanner.removeClass("banner-item-visible");
		if (bannerHomeIndex < bannerHomeIndexMax) {
			bannerHomeIndex++;
		} else {
			bannerHomeIndex = 0;
		}
	}
	if (!bannerHomeClicked) {
		bannerHomeRotate();
	}
}
function bannerHomeRotate() {
	if (bannerHomeSingle != true) {
		bannerHomeTimer = setTimeout("bannerHomeDisplay($('.banner-home-controls li:eq(' + bannerHomeIndex + ')').find('a').attr('href'));", 5000);
	}
}
$(document).ready(function () {
	if ($(".m-carousel.carousel-illustrated").length > 0) {
		var width = window.innerWidth;
		var step = 4;
		if (width < 980) {
			step = 2;
		}
		$(".m-carousel.carousel-illustrated").carousel("", {
			rotation : 0,
			step : step,
			slideName : "data-slider"
		});
	}
	$(window).resize(function () {
		var width = window.innerWidth;
		if ($(".m-carousel.carousel-illustrated").length > 0) {
			$(".m-carousel.carousel-illustrated").each(function () {
				var carousel = this._carousel;
				if (width < 980) {
					carousel.step = 2;
				} else {
					carousel.step = 4;
				}
				carousel.$inner.html(carousel.realInnerHtml);
				carousel.initElements(this);
				if (isArEm) {
					carousel.move(carousel._length - carousel.step + 1);
				} else {
					carousel.move(1);
				}
			});
		}
	});
	if ($(".col-tab-right").length > 0) {
		$(".col-tab-right").each(function () {
			$(this).on("click", function () {
				if ($(this).hasClass("closed-tab")) {
					$(this).parent().parent().find(".col-content").slideDown(500);
					$(this).removeClass("closed-tab").addClass("opened-tab");
				} else {
					$(this).parent().parent().find(".col-content").slideUp(500);
					$(this).removeClass("opened-tab").addClass("closed-tab");
				}
			});
		});
	}
	$(".tiles").tiles();
	$('.tab-to-drop-dropdown > ul > li a[data-toggle="tab"]').on("shown", function (e) {
		$(".tab-to-drop-display").html($(this).html());
	});
	$('.tab-drop .drop-menu a[data-toggle="tab"]').on("shown", function (e) {
		var selectedTab = $(this).parents(".tab-drop").children(".selected");
		selectedTab.html($(this).html());
	});
	$(".accordion-body.collapse").on("show", function () {
		$(this).parent().find("a").addClass("open");
	});
	$(".accordion-body.collapse").on("hide", function () {
		$(this).parent().find("a").removeClass("open");
	});
	var placeholderSupported = ("placeholder" in document.createElement("input"));
	if (placeholderSupported === false) {
		$.getScript("/ww/universal/js/placeholder_polyfill.jquery.min.js");
	}
	$(".tab-drop").each(function () {
		var fisrtChannelName = $(this).find(".drop .drop-menu li.active a").html();
		$(this).find(".selected").html(fisrtChannelName);
	});
	if ($(".banner-home").length > 0) {
		$(".banner-home-controls a").click(function (e) {
			e.preventDefault();
			bannerHomeClicked = true;
			clearTimeout(bannerHomeTimer);
			bannerHomeIndex = $(this).parent().index();
			bannerHomeDisplay($(this).attr("href"));
		});
		$(".banner-home").each(function () {
			$(this).mouseenter(function () {
				clearTimeout(bannerHomeTimer);
			}).mouseleave(function () {
				if (!bannerHomeClicked) {
					bannerHomeRotate();
				}
			});
			$(this).on("swiperight", function () {
				bannerHomeClicked = true;
				clearTimeout(bannerHomeTimer);
				bannerHomeDisplay($(".banner-home-controls li:eq(" + bannerHomeIndex + ")").find("a").attr("href"));
			});
			$(this).on("swipeleft", function () {
				bannerHomeClicked = true;
				clearTimeout(bannerHomeTimer);
				if (bannerHomeIndex >= 2) {
					bannerHomeIndex = bannerHomeIndex - 2;
				} else {
					if (bannerHomeIndex == 1) {
						bannerHomeIndex = bannerHomeIndexMax;
					} else {
						bannerHomeIndex = bannerHomeIndexMax - 1;
					}
				}
				bannerHomeDisplay($(".banner-home-controls li:eq(" + (bannerHomeIndex) + ")").find("a").attr("href"));
			});
		});
		bannerHomeRotate();
	}
	$("button#burger").click(function () {
		if ($("#nav-wrapper").width() == 0) {
			$("#nav-wrapper").addClass("nav-wrapper-mobile-width-open");
			$("#mobile-wrapper").css("max-width", "340px");
			$("#nav-opacity").css("display", "block");
			if ($("#mega-nav-container").hasClass("light")) {
				$("button#burger").addClass("light-active");
			}
		} else {
			$("#nav-wrapper").removeClass("nav-wrapper-mobile-width-open");
			$("#mobile-wrapper").css("max-width", "0");
			$("#nav-opacity").css("display", "none");
			if ($("#mega-nav-container").hasClass("light")) {
				$("button#burger").removeClass("light-active");
			}
		}
		$("#mobile-wrapper").addClass("mobile-wrapper-mobile-height");
	});
	$("#nav-opacity").click(function () {
		$("#nav-wrapper").removeClass("nav-wrapper-mobile-width-open");
		$("#mobile-wrapper").css("max-width", "0");
		$("#nav-opacity").css("display", "none");
		if ($("#mega-nav-container").hasClass("light")) {
			$("button#burger").removeClass("light-active");
		}
	});
	$(function () {
		$(".vtab > li > a").click(function (e) {
			e.preventDefault();
		});
		$(".vtab>li").click(function (e) {
			if ($(window).width() < 781) {
				e.preventDefault();
				$(".mega-nav>li").addClass("open");
				$("div#vtab-back").removeClass("hidden");
				setTimeout(function () {
					$("div#category-name").removeClass("hidden");
				}, 400);
				var newcontent = $(this).children().attr("href");
				$(newcontent).addClass("open");
				var height;
				if (($(document).height()) > ($(".mega-nav-tab").height() + 200)) {
					height = $(document).height();
				} else {
					height = $(".mega-nav-tab").height() + 200;
				}
				$("#mobile-wrapper").css("height", height + "px");
				var lev1 = $(this).parents("li.mega-lev1-left").children("a").text();
				$("div#vtab-back>a").text(lev1);
				$("div#vtab-back>a").prepend('<div class="arrow-left"></div> ');
				var category = $(this).children("a").text();
				$("div#category-name>div>span").text(category);
				var catLevel = $(this).parents("li.mega-lev1-left").index();
				var fixTopMargin = $(this).children("a").attr("href");
				var topMargin = (72 - ((catLevel - 1) * 46));
				$(fixTopMargin).css("margin-top", topMargin + "px");
			}
		});
		$("div#vtab-back").click(function (e) {
			e.preventDefault();
			$(".mega-nav>li").removeClass("open");
			$(".vtab>li").removeClass("open");
			setTimeout(function () {
				$(".mega-nav-contentblock").removeClass("open");
			}, 500);
			$("div#vtab-back").addClass("hidden");
			$("div#category-name").addClass("hidden");
		});
		$(".vtab>li").on("mouseover", function (e) {
			e.preventDefault();
			if ($(this).hasClass("open")) {}
			else {
				if ($(this).hasClass("avail-item")) {
					var ulId = $(this).parent().attr("id");
					var oldcontent = $("#" + ulId + ">li.open>a").attr("href");
					var newcontent = $(this).children("a").attr("href");
					$(newcontent).removeClass("hidden");
					$(oldcontent).addClass("hidden");
					$("#" + ulId + ">li").removeClass("open");
					$(this).addClass("open");
				}
			}
		});
		$("#vtab1 a").on("mouseclick", function (e) {
			e.preventDefault();
			if ($(this).hasClass("open")) {}
			else {
				var oldcontent = $("#vtab3 a.open").attr("href");
				var newcontent = $(this).attr("href");
				$(newcontent).removeClass("hidden");
				$(oldcontent).addClass("hidden");
				$("#vtab3 a").removeClass("open");
				$(this).addClass("open");
			}
		});
	});
	$("ul.vtab").click(function () {
		return false;
	});
	$(".mega-nav > li.mega-lev1-left").not(".nav-store-link").click(function () {
		if (!$(this).is("ul.vtab")) {
			if ($(this).closest("li.mega-lev1-left").hasClass("active")) {
				$(this).closest("li.mega-lev1-left").removeClass("active");
			} else {
				$(".mega-nav li.mega-lev1-left").removeClass("active");
				$(this).closest("li.mega-lev1-left").addClass("active");
			}
		}
	});
	yepnope({
		test : $(".pdp-tab").length > 0,
		yep : "/ww/universal/js/stx-product-detail-page.min.js",
		callback : function () {
			if (!($("#support-tab").hasClass("active"))) {
				$("#productConfigurator").ProductConfigurator();
				createAccessoriesResellersLinks();
			}
		}
	});
	if ($(".news-alerts-bar").length > 0) {
		$.fn.newsAlertsBar();
	}
	if ($(".jobs-news-ticker").length > 0) {
		$.fn.jobsNewsTicker();
	}
	if ($(".video-carousel").length > 0) {
		$.fn.videoCarousel();
	}
	if ($("div.flat-tabs").length > 0) {
		$.fn.flatTabs();
	}
	if ($(".teaser-product-grid-item-pid").length > 0) {
		getProductGridPrices();
	}
	if ($("#support-search-price").length > 0) {
		getProductGridPricesModle();
	}
	if ($(".teaser-product-grid-item").length > 0) {
		teaserProductGridItemHeight();
		$(window).resize(function () {
			teaserProductGridItemHeight();
		});
	}
	yepnope({
		test : $(".spp-page").length > 0,
		yep : "/ww/universal/js/stx-spp-page.min.js"
	});
	carouselSwipe();
	if ($(".gutter0 .link-item-med-img").length > 0) {
		$(".gutter0 .link-item-med-img:first").find(".col-tab-right.closed-tab").removeClass("closed-tab").addClass("opened-tab");
		$(".gutter0 .link-item-med-img:first").find(".col-content.closed-tab-content").removeClass("closed-tab-content").addClass("opened-tab-content");
	}
	yepnope({
		test : $(".pm-page-cover").length > 0,
		yep : "/ww/universal/js/jquery.textfill.min.js"
	});
	yepnope({
		test : $(".pm-page").length > 0,
		yep : "/ww/universal/js/stx-product-manual.min.js"
	});
});
$(window).ready(function () {
	var width = $(this).width();
	var height = $(this).height() + 200;
	if (width < 781) {
		$("#mobile-wrapper").addClass("mobile-wrapper-mobile-height");
		$(".mega-nav li.mega-lev1-left.expand").css("background", "linear-gradient(to right, #E3E3E3 0%, #E3E3E3 275px, #333333 275px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)");
	} else {
		$("#mobile-wrapper").removeClass("mobile-wrapper-mobile-height");
		$(".mega-nav li.mega-lev1-left.expand").css("background", "none");
	}
	if (width < 387) {
		var newval = Math.round(275 - ((387 - width)));
		$(".mega-nav li.mega-lev1-left.expand").css("background", "linear-gradient(to right, #E3E3E3 0%, #E3E3E3 " + newval + "px, #333333 " + newval + "px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)");
	} else {}

	var scrollTop = $(window).scrollTop();
	height = height - 246 + scrollTop;
	$("#vtab-store").css("top", height + "px");
});
$(window).resize(function () {
	var width = $(this).innerWidth();
	var height = $(this).height() + 200;
	if (width < 765) {
		$("#mobile-wrapper").addClass("mobile-wrapper-mobile-height");
		$(".mega-nav li.mega-lev1-left.expand").css("background", "linear-gradient(to right, #E3E3E3 0%, #E3E3E3 275px, #333333 275px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)");
		$("#nav-wrapper").addClass("nav-wrapper-mobile-width");
	} else {
		$("#mobile-wrapper").removeClass("mobile-wrapper-mobile-height");
		$(".mega-nav li.mega-lev1-left.expand").css("background", "none");
		$("#nav-wrapper").removeClass("nav-wrapper-mobile-width , nav-wrapper-mobile-width-open");
		$("#burger").removeClass("light-active");
		$("#nav-opacity").css("display", "none");
	}
	if (width < 387) {
		var newval = Math.round(275 - ((387 - width)));
		$(".mega-nav li.mega-lev1-left.expand").css("background", "linear-gradient(to right, #E3E3E3 0%, #E3E3E3 " + newval + "px, #333333 " + newval + "px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)");
	} else {}

	var scrollTop = $(window).scrollTop();
	height = height - 246 + scrollTop;
	$("#vtab-store").css("top", height + "px");
});
var isLight;
$(window).ready(function () {
	if ($("#mega-nav-container").hasClass("light")) {
		isLight = true;
	}
});
$(window).on("scroll", function () {
	var scrollTop = $(window).scrollTop();
	if ($("#mega-nav-container").hasClass("sticky-nav") && (scrollTop == 0)) {
		$("#mega-nav-container").removeClass("sticky-nav");
		if (!isLight) {
			$("#mega-nav-container").removeClass("light");
		}
	} else {
		if ($("#mega-nav-container").hasClass("sticky-nav")) {}
		else {
			$("#mega-nav-container").addClass("sticky-nav");
			if (!isLight) {
				$("#mega-nav-container").addClass("light");
			}
		}
	}
});
if ($(".sticky-header").length > 0) {
	var stickyPosArray = new Array();
	for (var i = 0; i < $(".sticky-header").length; i++) {
		var header = $(".sticky-header").eq(i);
		var headerPos = header.css("position");
		stickyPosArray.push(headerPos);
	}
	$(document).scroll(function () {
		stickyHeaders();
	});
}
function pressReleaseBack() {
	window.location.reload();
}
$(document).ready(function () {
	if ($("#tree")[0] && $(".qa-dv")[0]) {
		$.getScript("/ww/universal/qa/abixTreeList.js", function () {
			$("#tree").abixTreeList();
			$("#show-long").click(function (e) {
				e.preventDefault();
				$("#tree").find("li").children("span.long").show();
				$("#tree").find("li").children("span.short").hide();
			});
			$("#show-short").click(function (e) {
				e.preventDefault();
				$("#tree").find("li").children("span.long").hide();
				$("#tree").find("li").children("span.short").show();
			});
			document.onkeydown = function () {
				var oEvent = window.event;
				if (oEvent.keyCode == 70 && oEvent.ctrlKey) {
					$("#tree-expand-all").click();
				}
			};
		});
	}
	if ($(".pdp-ar-item")[0]) {
		var size = $(".pdp-ar-box").find("li").length;
		if (size > 0 && size < 5) {
			$(".pdp-ar-box").find("li").width("25%");
		}
	}
	if ($("#jobSearchForm")[0]) {
		$("#jobSearchForm").submit(function (e) {
			e.preventDefault();
			var jobSearchUrl = $("#jobSearchUrl").val();
			var searchWords = $("#jobSearchKeyWords").val();
			var defaultWords = $("#jobSearchWords").val();
			if (searchWords != defaultWords && searchWords != "") {
				if (jobSearchUrl.indexOf("[lng]") != -1) {
					jobSearchUrl = jobSearchUrl.replace("[lng]", getKeyValueFromCookie("stxEdgescape", "long"));
					jobSearchUrl = jobSearchUrl.replace("[lat]", getKeyValueFromCookie("stxEdgescape", "lat"));
					jobSearchUrl = jobSearchUrl + searchWords;
				} else {
					jobSearchUrl = jobSearchUrl + searchWords;
				}
				document.getElementById("jobSearchForm").action = jobSearchUrl;
				document.getElementById("jobSearchForm").submit();
			}
		});
		$(".jobs-search-go").click(function (e) {
			e.preventDefault();
			var myform = $("#jobSearchForm");
			myform.submit();
		});
		$(".jobs-search-phone").click(function (e) {
			e.preventDefault();
			var myform = $("#jobSearchForm");
			myform.submit();
		});
	}
	if ($("#searchPressDivID")[0]) {
		var page = 1;
		var start = 0;
		$(".press-release-search-go").click(function (e) {
			e.preventDefault();
			page = 1;
			start = 0;
			var myform = $(".press-release-sl-form-wrapper");
			myform.submit();
		});
		$(".pressrelease-go").click(function (e) {
			page = 1;
			start = 0;
			e.preventDefault();
			$("#pgNumber").val(1);
			var keyword = $("#pressReleaseLongKey").val();
			$("#pressReleaseKey").val(keyword);
			var myform = $(".press-release-sl-form-wrapper");
			myform.submit();
		});
		$(document).on("click", ".pageNumber", function (e) {
			e.preventDefault();
			start = ($(this).html() - 1) * 10;
			page = Number($(this).html());
			$("#pgNumber").val(page);
			var keyword = $("#pressReleaseKeyWord").val();
			$("#pressReleaseKey").val(keyword);
			var myform = $(".press-release-sl-form-wrapper");
			myform.submit();
		});
		$(document).on("click", ".next", function (e) {
			e.preventDefault();
			var pagenumber = Number($("#pgNumber").val());
			pagenumber = pagenumber + 1;
			start = (pagenumber - 1) * 10;
			page = pagenumber;
			$("#pgNumber").val(pagenumber);
			var keyword = $("#pressReleaseKeyWord").val();
			$("#pressReleaseKey").val(keyword);
			var myform = $(".press-release-sl-form-wrapper");
			myform.submit();
		});
		$(document).on("click", ".previous", function (e) {
			e.preventDefault();
			var pagenumber = Number($("#pgNumber").val());
			pagenumber = pagenumber - 1;
			start = (pagenumber - 1) * 10;
			page = pagenumber;
			$("#pgNumber").val(pagenumber);
			var keyword = $("#pressReleaseKeyWord").val();
			$("#pressReleaseKey").val(keyword);
			var myform = $(".press-release-sl-form-wrapper");
			myform.submit();
		});
		$(".press-release-sr-form-wrapper").submit(function (e) {
			page = 1;
			start = 0;
			e.preventDefault();
			var keyword = $("#pressReleaseLongKey").val();
			$("#pressReleaseKey").val(keyword);
			var myform = $(".press-release-sl-form-wrapper");
			myform.submit();
		});
		$(".press-release-sl-form-wrapper").submit(function (e) {
			e.preventDefault();
			var nowDate = new Date();
			var nowYear = nowDate.getFullYear();
			var nowTime = nowYear + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
			var jspPressRelease = "/ww/universal/display-views/press-release-ajax.jsp";
			var gsaQuery = $("#pressReleaseUrl").val();
			var optionVaule = $("#pressReleaseSortBy").find("option:selected").attr("value");
			var defaultKey = $("#search-default-key").val();
			if (optionVaule == "Relevance") {
				gsaQuery = gsaQuery.replace(/&sort=date:D:S:d1/g, "");
			}
			var keyword = "";
			keyword = $("#pressReleaseKey").val();
			$("#pressReleaseLongKey").val(keyword);
			if (keyword == defaultKey || keyword == "") {
				return false;
			}
			keyword = $.trim(keyword);
			gsaQuery = gsaQuery + "&q=" + encoding(keyword) + "+inmeta:publicationDate:daterange:.." + nowTime + "&start=" + start;
			jspPressRelease = jspPressRelease + "?" + gsaQuery;
			$("#press-release-list").hide();
			$("#press-release-result").show();
			pressReleaseAjax(jspPressRelease, keyword, page);
		});
		var jspPressRelease = "/ww/universal/display-views/press-release-ajax.jsp";
		var gsaQuery = $("#pressReleaseUrl").val();
		var nowDate = new Date();
		var nowYear = nowDate.getFullYear();
		var nowTime = nowYear + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
		var keyword = "";
		var tempJspGsaQuery = gsaQuery;
		var tempJspPressRelease = jspPressRelease;
		gsaQuery = gsaQuery + "&q=+inmeta:publicationDate:daterange:..&start=0" + "&num=1";
		jspPressRelease = jspPressRelease + "?" + gsaQuery;
		var defLanguage = $("#defLanguage").val();
		if ($("#press-release-select-value").text() == "") {
			var slectOption = "";
			$("#press-release-select-value").text(nowYear);
			for (var i = 0; i <= 5; i++) {
				slectOption += "<option value=" + (nowYear - i) + ">" + (nowYear - i) + "</option>";
			}
			$("#press-release-select").html(slectOption);
			var yearHtml = $(".pull-left").html();
			$.ajax({
				type : "POST",
				cache : false,
				url : jspPressRelease,
				data : "keyword=&locale=" + defLanguage + "&page=" + page + "&yearDrop=" + true,
				success : function (html) {
					$(".pull-left").html(html);
					if ($("#press-release-select-value").text() == "") {
						$(".pull-left").html(yearHtml);
					}
				}
			});
		}
		$(document).on("change", ".pull-left #press-release-select", function () {
			$("#searchPressDivID").html($("#loading").val());
			$("#press-release-select-value").text($(this).val());
			var _tempJspGsaQuery = "";
			if ($(this).val() == nowYear) {
				var _tempJspGsaQuery = tempJspGsaQuery + "&q=+inmeta:publicationDate:daterange:" + $(this).val() + "-01-01" + ".." + nowTime + "&start=0" + "&num=1000";
			} else {
				var _tempJspGsaQuery = tempJspGsaQuery + "&q=+inmeta:publicationDate:daterange:" + $(this).val() + "-01-01" + ".." + $(this).val() + "-12-31" + "&start=0" + "&num=1000";
			}
			_tempJspGsaQuery = tempJspPressRelease + "?" + _tempJspGsaQuery;
			pressReleaseAjax(_tempJspGsaQuery, keyword, 0);
		});
		$("#pressReleaseSortBy").change(function () {
			$("#sortByValue").text($("#pressReleaseSortBy  option:selected").text());
			page = 1;
			start = 0;
			$("#pgNumber").val(1);
			var myform = $(".press-release-sl-form-wrapper");
			myform.submit();
		});
	}
});
function encoding(source) {
	var target = source;
	target = encodeURI(target);
	target = target.replace(/\@/g, "%40");
	target = target.replace(/\#/g, "%23");
	target = target.replace(/\\$/g, "%24");
	target = target.replace(/\&/g, "%26");
	target = target.replace(/\=/g, "%3D");
	target = target.replace(/\//g, "%2F");
	target = target.replace(/\,/g, "%2C");
	target = target.replace(/\;/g, "%3B");
	target = target.replace(/\?/g, "%3F");
	target = target.replace(/\+/g, "%2B");
	target = target.replace(/\'/g, "%27");
	target = target.replace(/\=/g, "%3D");
	return target;
}
function decoding(source) {
	var target = source;
	target = target.replace("%26", "&");
	target = target.replace("%3F", "?");
	target = target.replace("%40", "@");
	target = target.replace("%23", "#");
	target = target.replace("%3D", "=");
	target = target.replace("%2F", "/");
	target = target.replace("%2C", ",");
	target = target.replace("%3B", ";");
	target = target.replace("%2B", "+");
	target = target.replace("%27", "'");
	target = decodeURI(target);
	return target;
}
function pressReleaseAjax(url, keyword, page) {
	var searchUrl = url;
	var keyWords = keyword;
	var defLanguage = $("#defLanguage").val();
	$.ajax({
		type : "POST",
		cache : false,
		url : searchUrl,
		data : "keyword=" + encodeURIComponent(keyWords) + "&locale=" + defLanguage + "&page=" + page,
		success : function (html) {
			if (keyWords == "") {
				$("#searchPressDivID").html(html);
			} else {
				$("#press-release-sr-content").html(html);
				$("#total").text($("#totalRecord").val());
				$("#pressReleaseT").text($("#pressReleaseTime").val());
			}
		}
	});
}
var GlobalNav = (function ($) {
	var defaults = {
		"gnContainer" : ".gn-container:eq(0)",
		"stickyHeader" : ".sticky-header",
		"globalNav" : ".global-nav-oz",
		"gnMenu" : ".gn-menu",
		"menuList" : "ul.gn-menu-list > li",
		"gnDropdown" : ".gn-dropdown",
		"gnMenuItemLevel1" : ".gn-menu-item-1lvl",
		"gnMenuItemLevel2" : ".gn-menu-item-2lvl",
		"gnMenuItemLevel3" : ".gn-menu-box-3lvl",
		"pulledMenuClass" : "gn-menu-pulled",
		"pulledDropClass" : "gn-drop-pulled",
		"openedMenuClass" : "gn-menu-opened",
		"gnSideToggle" : ".gn-side-toggle",
		"gnIconContainer" : ".gn-icon-container",
		"gnSideWrapper" : ".gn-side-wrapper",
		"gnSideContainer" : ".gn-side-container",
		"sideOpenedClass" : "gn-side-opened",
		"gnSubMenuOpenedClass" : "gn-sub-menu-opened",
		"gnSubMenuSelectedClass" : "gn-sub-menu-selected",
		"gnUser" : "gn-user",
		"pulledClass" : "gn-user-pulled",
		"gnUserOpenedClass" : "gn-user-opened",
		"dropOverlary" : ".gn-drop-overlay",
		"sideOverlary" : ".gn-side-overlay",
		"gnStore" : ".gn-store",
		"gnPostStickyClass" : "gn-post-sticky",
		"gnPreStickyClass" : "gn-pre-sticky",
		"stickyHeaderActiveClass" : "sticky-header-active"
	};
	var GlobalNav = function (options) {
		options = $.extend(defaults, options);
		this.options = options;
		this.$gnContainer = $(options.gnContainer);
		this.$stickyHeader = this.$gnContainer.find(options.stickyHeader);
		this.$globalNav = this.$gnContainer.find(options.globalNav);
		this.$gnMenu = this.$globalNav.find(options.gnMenu);
		this.$gnMenuList = this.$gnMenu.find(options.menuList);
		this.$gnMenuItemLevel1 = this.$gnMenuList.find(options.gnMenuItemLevel1);
		this.$gnDropdown = this.$gnMenuList.find(options.gnDropdown);
		this.$gnSubMenuItemLevel2 = this.$gnDropdown.find(options.gnMenuItemLevel2);
		this.$gnSubMenuItemLevel3 = this.$gnDropdown.find(options.gnMenuItemLevel3);
		this.$gnStore = this.$globalNav.find(options.gnStore);
		this.$gnSideToggle = this.$globalNav.find(options.gnSideToggle);
		this.$gnIconContainer = this.$gnSideToggle.find(options.gnIconContainer);
		this.$gnSideWrapper = this.$globalNav.find(options.gnSideWrapper);
		this.$gnSideContainer = this.$gnSideWrapper.find(options.gnSideContainer);
		this.$dropOverlary = this.$globalNav.find(options.dropOverlary);
		this.$sideOverlary = this.$globalNav.find(options.sideOverlary);
		this.globalNavHeight = this.$globalNav.outerHeight();
	};
	GlobalNav.prototype.init = function () {
		var that = this;
		this.$gnMenuItemLevel1.children("a").on("mouseenter touchstart", function (e) {
			that.stickyHeader();
			that.toggleMenu($(this).parent().parent(), e.type);
			if (e.type == "touchstart") {
				that.togglePullMenu($(this).parent().parent());
				that.globalUser.hideMenu(that.globalUser.$gnUser);
				return false;
			} else {
				that.pullMenu($(this).parent().parent());
			}
		});
		this.$gnMenuItemLevel1.children("a").on("click", function (e) {
			e.preventDefault();
		});
		this.$gnMenuItemLevel1.children("span").on("click", function (e) {
			that.toggleMenu($(this).parent().parent(), e.type);
			that.togglePullMenu($(this).parent().parent());
		});
		this.$gnMenu.on("mouseleave", "li." + this.options.pulledMenuClass, function (e) {
			that.hideMenu($(this));
			that.toggleMenu($(this), e.type);
		});
		this.$gnMenuList.parent().on("mouseleave", function (e) {
			that.setStickyHeader();
		});
		$("body").on("touchstart", function (e) {
			var $target = $(e.target);
			if ($target.parents("." + that.options.pulledMenuClass).length <= 0 && !$target.hasClass(that.options.pulledMenuClass)) {
				that.hidePulledMenu();
				that.setStickyHeader();
			}
		});
		this.$gnSubMenuItemLevel2.children("span").on("click", function (e) {
			if ($(this).parent().siblings(that.options.gnMenuItemLevel3).length > 0) {
				that.$gnStore.hide();
				that.openLevel3($(this));
				that.$gnStore.delay(300).fadeIn(100);
			}
		});
		this.$gnSubMenuItemLevel3.find("> a").on("click", function (e) {
			e.preventDefault();
			that.$gnStore.hide();
			that.closeLevel3();
			that.$gnStore.delay(300).fadeIn(100);
		});
		this.$gnIconContainer.on("click", function (e) {
			var $globalNav = $(this).parents(that.options.globalNav);
			if ($globalNav.hasClass(that.options.sideOpenedClass)) {
				$globalNav.removeClass(that.options.sideOpenedClass);
				that.hideOverlay("side");
			} else {
				$globalNav.addClass(that.options.sideOpenedClass);
				that.$gnSideWrapper.css("height", that.getOverlayHeight(that.$gnSideContainer));
				that.showOverlay(that.$gnSideContainer, "side");
			}
			if ($globalNav.hasClass(that.options.gnUserOpenedClass)) {
				$globalNav.removeClass(that.options.gnUserOpenedClass);
				(that.globalUser.$gnUser).removeClass(that.options.pulledClass);
			}
		});
		this.$sideOverlary.on("touchstart click", function (e) {
			if (that.$globalNav.hasClass(that.options.sideOpenedClass)) {
				that.$globalNav.removeClass(that.options.sideOpenedClass);
				that.hideOverlay("side");
			}
			if (e.type == "touchstart") {
				return false;
			}
		});
	};
	GlobalNav.prototype.setStickyHeader = function (arg) {
		this.$gnContainer.removeClass(this.options.gnPostStickyClass).removeClass(this.options.gnPreStickyClass);
		if (typeof(arg) != "undefined") {
			this.$gnContainer.addClass(arg);
		}
	};
	GlobalNav.prototype.stickyHeader = function () {
		if (!this.$gnContainer.hasClass(this.options.gnPostStickyClass) && !this.$gnContainer.hasClass(this.options.gnPreStickyClass)) {
			if (this.$stickyHeader.hasClass(this.options.stickyHeaderActiveClass)) {
				this.setStickyHeader(this.options.gnPostStickyClass);
			} else {
				this.setStickyHeader(this.options.gnPreStickyClass);
			}
		}
	};
	GlobalNav.prototype.togglePullMenu = function ($this) {
		if ($this.hasClass(this.options.pulledMenuClass)) {
			this.hideMenu($this);
		} else {
			this.pullMenu($this);
		}
	};
	GlobalNav.prototype.pullMenu = function ($this) {
		$this.siblings("li." + this.options.pulledMenuClass).removeClass(this.options.pulledMenuClass);
		if ($this.find(this.options.gnDropdown).length) {
			$this.addClass(this.options.pulledMenuClass);
			this.$globalNav.addClass(this.options.pulledDropClass);
			this.showOverlay(this.$gnDropdown, "drop");
			this.setSameHeight($this);
		}
		this.closeLevel3();
	};
	GlobalNav.prototype.hideMenu = function ($this) {
		$this.removeClass(this.options.pulledMenuClass);
		this.$globalNav.removeClass(this.options.pulledDropClass);
		this.hideOverlay("drop");
	};
	GlobalNav.prototype.hidePulledMenu = function () {
		var $pulledMenu = this.$gnMenu.find(this.options.menuList + "." + this.options.pulledMenuClass);
		if ($pulledMenu.length > 0) {
			this.hideMenu($pulledMenu);
		}
	};
	GlobalNav.prototype.toggleMenu = function ($this, eventType) {
		$this.siblings().removeClass(this.options.openedMenuClass);
		if (eventType == "mouseenter") {
			$this.addClass(this.options.openedMenuClass);
		}
		if (eventType == "mouseleave") {}
		else {
			$this.siblings().find(this.options.gnDropdown).css("height", "");
			$this.toggleClass(this.options.openedMenuClass);
			var $gnDropdown = $this.find(this.options.gnDropdown);
			if ($this.hasClass(this.options.openedMenuClass)) {
				$gnDropdown.css("height", $gnDropdown.find(".container").innerHeight());
			} else {
				$gnDropdown.css("height", "");
			}
		}
	};
	GlobalNav.prototype.openLevel3 = function ($this) {
		this.$gnMenu.addClass(this.options.gnSubMenuOpenedClass);
		var $gnMenuItemLevel3 = $this.parent().siblings(this.options.gnMenuItemLevel3);
		$gnMenuItemLevel3.addClass(this.options.gnSubMenuSelectedClass);
		var gnMenuItemLevel3Height = $gnMenuItemLevel3.innerHeight();
		this.$gnMenu.css("height", gnMenuItemLevel3Height);
	};
	GlobalNav.prototype.closeLevel3 = function () {
		this.$gnMenu.removeClass(this.options.gnSubMenuOpenedClass);
		this.$gnSubMenuItemLevel3.removeClass(this.options.gnSubMenuSelectedClass);
		this.$gnMenu.css("height", "");
	};
	GlobalNav.prototype.getOverlayHeight = function ($obj, type) {
		var overlayHeight = $(document).innerHeight();
		var objHeight = $obj.innerHeight();
		if ($obj.hasClass(this.options.gnDropdown.substring(1, this.options.gnDropdown.length))) {
			objHeight = objHeight + this.globalNavHeight;
		}
		if (objHeight > overlayHeight) {
			overlayHeight = objHeight;
		}
		if ($obj.hasClass(this.options.gnDropdown.substring(1, this.options.gnDropdown.length)) || type == "user") {
			if (!this.$gnContainer.parents(".home-page").length) {
				overlayHeight -= this.globalNavHeight;
			}
		}
		return overlayHeight;
	};
	GlobalNav.prototype.showOverlay = function ($obj, type) {
		if (type == "drop") {
			this.$dropOverlary.css("height", this.getOverlayHeight($obj, type));
		} else {
			this.$sideOverlary.css("height", this.getOverlayHeight($obj, type));
		}
	};
	GlobalNav.prototype.hideOverlay = function (type) {
		if (type == "drop") {
			this.$dropOverlary.css("height", 0);
		} else {
			if (type == "side") {
				this.$sideOverlary.css("height", 0);
			}
		}
	};
	GlobalNav.prototype.setSameHeight = function ($this) {
		var $gnDropdown = $this.find(this.options.gnDropdown);
		var $span9 = $gnDropdown.find(this.options.gnDropdown + "-menu > .span9");
		var $span3 = $gnDropdown.find(this.options.gnDropdown + "-menu > .span3");
		var height9 = $span9.innerHeight();
		var height3 = $span3.innerHeight();
		if (height9 != 0 && height3 != 0) {
			if (height9 > height3) {
				$span3.css("height", height9);
			} else {
				$span9.css("height", height3);
			}
		}
	};
	GlobalNav.prototype.setGlobalUser = function (globalUser) {
		this.globalUser = globalUser;
	};
	GlobalNav.prototype.setDebugLogger = function (debugLogger) {
		this.debugLogger = debugLogger;
	};
	return GlobalNav;
}
	(jQuery));
var GlobalSearch = (function ($) {
	var defaults = {
		"gnContainer" : ".gn-container:eq(0)",
		"gnSearchInput" : "input.gn-search-input",
		"gnSearchClear" : ".gn-search-clear"
	};
	var GlobalSearch = function (options) {
		options = $.extend(defaults, options);
		this.options = options;
		this.$gnContainer = $(options.gnContainer);
		this.$gnSearchInput = this.$gnContainer.find(options.gnSearchInput);
		this.$gnSearchClear = this.$gnSearchInput.siblings(options.gnSearchClear);
		this.defaultInputValue = this.$gnSearchInput.val();
	};
	GlobalSearch.prototype.init = function () {
		var that = this;
		this.$gnSearchInput.on("keyup", function () {
			var $gnSearchClear = $(this).siblings(that.options.gnSearchClear);
			var keyword = $(this).val();
			if (keyword != "") {
				$gnSearchClear.removeClass("hide");
			} else {
				$gnSearchClear.addClass("hide");
			}
		});
		this.$gnSearchClear.click(function (e) {
			e.preventDefault();
			$(this).siblings(that.options.gnSearchInput).val(that.defaultInputValue);
			$(this).addClass("hide");
		});
	};
	return GlobalSearch;
}
	(jQuery));
var GlobalUser = (function ($) {
	var defaults = {
		"gnContainer" : ".gn-container:eq(0)",
		"globalNav" : ".global-nav-oz",
		"gnUser" : ".gn-user",
		"gnIconContainer" : ".gn-icon-container",
		"gnUserDrop" : ".gn-user-drop",
		"closeUser" : ".user-delete",
		"pulledClass" : "gn-user-pulled",
		"gnUserOpenedClass" : "gn-user-opened"
	};
	var GlobalUser = function (options) {
		options = $.extend(defaults, options);
		this.options = options;
		this.$gnContainer = $(options.gnContainer);
		this.$globalNav = this.$gnContainer.find(options.globalNav);
		this.$gnUser = this.$gnContainer.find(options.gnUser);
		this.$gnIconContainer = this.$gnUser.find(options.gnIconContainer);
		this.$gnUserDrop = this.$gnUser.find(options.gnUserDrop);
		this.$closeUser = this.$gnUserDrop.find(options.closeUser);
	};
	GlobalUser.prototype.init = function () {
		var that = this;
		this.$gnIconContainer.children("span").on("click", function () {
			if ($(this).parents(that.options.globalNav).hasClass(that.options.gnUserOpenedClass)) {
				that.hideMenu($(this).parent().parent());
			} else {
				that.showMenu($(this).parent().parent(), "portrait");
			}
		});
		this.$closeUser.on("click", function (e) {
			that.hideMenu(that.$gnUser);
		});
		$("body").on("touchstart", function (e) {
			var $target = $(e.target);
			if ($target.hasClass(that.options.closeUser.substring(1, that.options.closeUser.length)) || (!$target.hasClass(that.options.gnUserDrop.substring(1, that.options.gnUserDrop.length)) && $target.parents(that.options.gnUserDrop).length <= 0)) {
				var $pulledMenu = that.$stickyHeader.find(that.options.gnUser + "." + that.options.pulledClass);
				if ($pulledMenu.length > 0) {
					that.hideMenu($pulledMenu);
				}
			}
		});
	};
	GlobalUser.prototype.showMenu = function ($this, screenMode) {
		this.$globalNav.addClass(this.options.gnUserOpenedClass);
		if (screenMode == "portrait") {
			var height = $(window).innerHeight();
			height -= this.$globalNav.innerHeight();
			this.$gnUserDrop.css("min-height", height);
			$this.removeClass("portrait").removeClass("landscape").addClass("portrait");
		} else {
			$this.removeClass("portrait").removeClass("landscape").addClass("landscape");
		}
		this.globalNav.showOverlay(this.globalNav.$gnSideContainer, "user");
	};
	GlobalUser.prototype.hideMenu = function ($this) {
		this.globalNav.hideOverlay(this.globalNav.$gnSideContainer, "side");
		$this.removeClass(this.options.pulledClass);
		$(this.options.globalNav).removeClass(this.options.gnUserOpenedClass);
	};
	GlobalUser.prototype.setGlobalNav = function (globalNav) {
		this.globalNav = globalNav;
	};
	return GlobalUser;
}
	(jQuery));
var DebugLogger = (function ($) {
	var DebugLogger = function () {
		this.debugTextarea = $(".debug-textarea");
		if (this.debugTextarea.length <= 0) {
			this.debugTextarea = $("<textarea/>").addClass("debug-textarea").css({
					"position" : "absolute",
					"left" : 0,
					"bottom" : 0,
					"width" : "50%",
					"height" : "100px",
					"z-index" : 9999
				});
		}
	};
	DebugLogger.prototype.init = function () {
		this.debugTextarea.appendTo($("body"));
	};
	DebugLogger.prototype.log = function (log) {
		this.debugTextarea.val(log + "\n" + this.debugTextarea.val());
	};
	return DebugLogger;
}
	(jQuery));
$(function () {
	if ($(".gn-container").length > 0) {
		var globalNav = new GlobalNav({});
		globalNav.init();
		var globalSearch = new GlobalSearch({});
		globalSearch.init();
		var globalUser = new GlobalUser({});
		globalUser.init();
		globalNav.setGlobalUser(globalUser);
		globalUser.setGlobalNav(globalNav);
	}
});
!function ($) {
	$.fn.dropDownTabs = function ($activeTab) {
		$activeTab.on("click", "li.active", function (e) {
			e.preventDefault();
			var $tabParent = $(this).parent();
			if ($(this).hasClass("active-tab-opened")) {
				if ($(window).width() < 768) {
					$(this).removeClass("active-tab-opened");
					$(this).addClass("active-tab-closed");
					$tabParent.children("li:not('.active')").removeClass("tab-mobile-show").removeClass("active-tab-opened").removeClass("active-tab-closed");
				}
			} else {
				if ($(window).width() < 768) {
					$(this).removeClass("active-tab-closed");
					$(this).addClass("active-tab-opened");
					$tabParent.children("li").addClass("tab-mobile-show");
					$tabParent.children("li:not('.active')").removeClass("active-tab-opened").removeClass("active-tab-closed");
				}
			}
		});
	};
}
(window.jQuery);
$(function () {
	if ($(".search-nav").length > 0) {
		$.fn.dropDownTabs($(".search-nav"));
	}
});
function setHeightForProductAnchorRow() {
	if ($(".pdp-anchor-row").length > 0) {
		if ($(".pdp-anchor-row .hidden-tablet").css("display") == "none") {
			var $item = $(".pdp-anchor-row .pdp-ar-item > a");
			$(".pdp-anchor-row .pdp-ar-item > a").height(getMaxItemHeight($item));
			$(".pdp-anchor-row .pdp-ar-item .pdp-ar-item-link").addClass("pdp-ar-tablet");
		} else {
			$(".pdp-anchor-row .pdp-ar-item > a").height("auto");
			$(".pdp-anchor-row .pdp-ar-item .pdp-ar-item-link").removeClass("pdp-ar-tablet");
		}
	}
}
function getMaxItemHeight($item) {
	return maxHeight = Math.max.apply(null, $item.map(function () {
				return $(this).height();
			}).get());
}
$(function () {
	setHeightForProductAnchorRow();
	$(window).resize(function () {
		setHeightForProductAnchorRow();
	});
});
var DR_cartInfo_URL_x = "https://shop.seagate.com/store/" + gblComStoreId + "/DisplayPage/id.DRCartSummaryJSONPage/output.json/jsonp.CartInfoX.updateCartDisplay";
var CartInfoX = {
	init : function () {
		if (gblComStoreId != null && gblComStoreId != "null") {
			jQuery.getScript(DR_cartInfo_URL_x);
		}
	},
	updateCartDisplay : function (arg) {
		if (arg.lineItems == 0) {
			$("#iconShopimg").removeClass("btn-info");
			$("#iconShopimg").addClass("btn-primary");
		} else {
			$("#iconShopimg").removeClass("btn-primary");
			$("#iconShopimg").addClass("btn-info");
		}
		$("#cartLineItems").html(arg.lineItems);
	}
};
if ($("#cartSection").length != 0) {
	CartInfoX.init();
}
function submitSearchFormPromoX() {
	var searchMsg = document.getElementById("searchMSG").value;
	var qv = document.getElementById("suggestion_form2").q.value;
	if (!qv || !($.trim(qv)) || qv == searchMsg || qv == "") {
		$("#suggestion_form2").addClass("error");
		$("#searchPromoX").blur(function () {
			$("#suggestion_form2").removeClass("error");
		});
		$("#searchPromoX").keydown(function () {
			$("#suggestion_form2").removeClass("error");
		});
		$("input.nav-header-search-submit").blur(function () {
			$("#suggestion_form2").removeClass("error");
		});
		return false;
	} else {
		var n = rcLocaleJS.split("-");
		var localeURL = "/" + n[1] + "/" + n[0];
		if (rcLocaleJS == "en-us") {
			localeURL = "";
		}
		window.location.href = "//" + serverHost + localeURL + "/search/?keyword=" + qv;
		return false;
	}
}
$(document).ready(function () {
	carouselSwipe();
	var autoSugglistener = window.addEventListener;
	var autoSuggEventType = "load";
	if (!autoSugglistener) {
		autoSugglistener = window.attachEvent;
		autoSuggEventType = "onload";
	}
	autoSugglistener(autoSuggEventType, function () {
		$("#searchPromoX").autocomplete({
			source : "//" + serverHost + "/ww/autoSuggest?site=" + gsaSite + "&host=" + gsaURL + "&rcLocaleJS=" + rcLocaleJS,
			select : function (event, item) {
				$("#searchPromoX").val(item.item.value);
				submitSearchFormPromoX();
			}
		});
	}, false);
	if ($("#youtubeIdStr-productSummary")[0] != undefined || $("#youtubeIdStr-videoCarousel")[0] != undefined) {
		var tag = document.createElement("script");
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	try {
		showAlertMessage();
	} catch (ex) {}

});
var playerArray = new Array();
function onYouTubeIframeAPIReady() {
	var youtubeIdStr = "";
	if ($("#youtubeIdStr-productSummary")[0] != undefined) {
		youtubeIdStr = $("#youtubeIdStr-productSummary").attr("youtubeIdStr");
	}
	if ($("#youtubeIdStr-videoCarousel")[0] != undefined) {
		youtubeIdStr = $("#youtubeIdStr-videoCarousel").attr("youtubeIdStr");
	}
	if (youtubeIdStr != "") {
		var youtubeIdArray = youtubeIdStr.split(";");
		var arrayLength = youtubeIdArray.length - 1;
		for (var i = 0; i < arrayLength; i++) {
			var item = youtubeIdArray[i];
			var itemArray = item.split(",");
			var id = itemArray[0];
			var youtubeID = itemArray[1];
			var player = new YT.Player(id, {
					height : "360",
					width : "640",
					videoId : youtubeID,
					playerVars : {
						"html5" : "1"
					},
					events : {
						"onStateChange" : onPlayerStateChange
					}
				});
			playerArray.push(player);
		}
	}
}
function onPlayerStateChange(event) {
	if ($(".m-carousel-controls")[0] != undefined) {
		$(".m-carousel-controls>.m-active").click();
	}
	if ($(".video-carousel-list")[0] != undefined) {
		var currentPlayerID = $(".video-carousel-list>.current").find("iframe").attr("id");
		var currentPlayerIndex = currentPlayerID.substr(7);
		for (var i = 0; i < playerArray.length; i++) {
			if (i != currentPlayerIndex) {
				playerArray[i].pauseVideo();
			}
		}
	}
	if ($(".m-active").find("video-wrapper") != undefined) {
		var currentPlayerID = $(".m-item.m-active").find("iframe").attr("id");
		var currentPlayerIndexList = currentPlayerID.split("-");
		var currentPlayerIndex = currentPlayerIndexList[1];
		for (var i = 0; i < playerArray.length; i++) {
			if (i != currentPlayerIndex) {
				playerArray[i].pauseVideo();
			}
		}
	}
}
window.JSON || (window.JSON = {}), function () {
	function f(a) {
		return a < 10 ? "0" + a : a;
	}
	function quote(a) {
		return escapable.lastIndex = 0,
		escapable.test(a) ? '"' + a.replace(escapable, function (a) {
			var b = meta[a];
			return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' : '"' + a + '"';
	}
	function str(a, b) {
		var c,
		d,
		e,
		f,
		g = gap,
		h,
		i = b[a];
		i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)),
		typeof rep == "function" && (i = rep.call(b, a, i));
		switch (typeof i) {
		case "string":
			return quote(i);
		case "number":
			return isFinite(i) ? String(i) : "null";
		case "boolean":
		case "null":
			return String(i);
		case "object":
			if (!i) {
				return "null";
			}
			gap += indent,
			h = [];
			if (Object.prototype.toString.apply(i) === "[object Array]") {
				f = i.length;
				for (c = 0; c < f; c += 1) {
					h[c] = str(c, i) || "null";
				}
				return e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]",
				gap = g,
				e;
			}
			if (rep && typeof rep == "object") {
				f = rep.length;
				for (c = 0; c < f; c += 1) {
					d = rep[c],
					typeof d == "string" && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
				}
			} else {
				for (d in i) {
					Object.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
				}
			}
			return e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}",
			gap = g,
			e;
		}
	}
	"use strict",
	typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (a) {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
		return this.valueOf();
	});
	var JSON = window.JSON,
	cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	gap,
	indent,
	meta = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	},
	rep;
	typeof JSON.stringify != "function" && (JSON.stringify = function (a, b, c) {
		var d;
		gap = "",
		indent = "";
		if (typeof c == "number") {
			for (d = 0; d < c; d += 1) {
				indent += " ";
			}
		} else {
			typeof c == "string" && (indent = c);
		}
		rep = b;
		if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number") {
			return str("", {
				"" : a
			});
		}
		throw new Error("JSON.stringify");
	}),
	typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
		function walk(a, b) {
			var c,
			d,
			e = a[b];
			if (e && typeof e == "object") {
				for (c in e) {
					Object.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
				}
			}
			return reviver.call(a, b, e);
		}
		var j;
		text = String(text),
		cx.lastIndex = 0,
		cx.test(text) && (text = text.replace(cx, function (a) {
					return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
				}));
		if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
			return j = eval("(" + text + ")"),
			typeof reviver == "function" ? walk({
				"" : j
			}, "") : j;
		}
		throw new SyntaxError("JSON.parse");
	});
}
(), function (a, b) {
	var c = a.History = a.History || {},
	d = a.jQuery;
	if (typeof c.Adapter != "undefined") {
		throw new Error("History.js Adapter has already been loaded...");
	}
	c.Adapter = {
		bind : function (a, b, c) {
			d(a).bind(b, c);
		},
		trigger : function (a, b, c) {
			d(a).trigger(b, c);
		},
		extractEventData : function (a, c, d) {
			var e = c && c.originalEvent && c.originalEvent[a] || d && d[a] || b;
			return e;
		},
		onDomLoad : function (a) {
			d(a);
		}
	},
	typeof c.init != "undefined" && c.init();
}
(window), function (a, b) {
	var c = a.document,
	d = a.setTimeout || d,
	e = a.clearTimeout || e,
	f = a.setInterval || f,
	g = a.History = a.History || {};
	if (typeof g.initHtml4 != "undefined") {
		throw new Error("History.js HTML4 Support has already been loaded...");
	}
	g.initHtml4 = function () {
		if (typeof g.initHtml4.initialized != "undefined") {
			return !1;
		}
		g.initHtml4.initialized = !0,
		g.enabled = !0,
		g.savedHashes = [],
		g.isLastHash = function (a) {
			var b = g.getHashByIndex(),
			c;
			return c = a === b,
			c;
		},
		g.saveHash = function (a) {
			return g.isLastHash(a) ? !1 : (g.savedHashes.push(a), !0);
		},
		g.getHashByIndex = function (a) {
			var b = null;
			return typeof a == "undefined" ? b = g.savedHashes[g.savedHashes.length - 1] : a < 0 ? b = g.savedHashes[g.savedHashes.length + a] : b = g.savedHashes[a],
			b;
		},
		g.discardedHashes = {},
		g.discardedStates = {},
		g.discardState = function (a, b, c) {
			var d = g.getHashByState(a),
			e;
			return e = {
				discardedState : a,
				backState : c,
				forwardState : b
			},
			g.discardedStates[d] = e,
			!0;
		},
		g.discardHash = function (a, b, c) {
			var d = {
				discardedHash : a,
				backState : c,
				forwardState : b
			};
			return g.discardedHashes[a] = d,
			!0;
		},
		g.discardedState = function (a) {
			var b = g.getHashByState(a),
			c;
			return c = g.discardedStates[b] || !1,
			c;
		},
		g.discardedHash = function (a) {
			var b = g.discardedHashes[a] || !1;
			return b;
		},
		g.recycleState = function (a) {
			var b = g.getHashByState(a);
			return g.discardedState(a) && delete g.discardedStates[b],
			!0;
		},
		g.emulated.hashChange && (g.hashChangeInit = function () {
			g.checkerFunction = null;
			var b = "",
			d,
			e,
			h,
			i;
			return g.isInternetExplorer() ? (d = "historyjs-iframe", e = c.createElement("iframe"), e.setAttribute("id", d), e.style.display = "none", c.body.appendChild(e), e.contentWindow.document.open(), e.contentWindow.document.close(), h = "", i = !1, g.checkerFunction = function () {
				if (i) {
					return !1;
				}
				i = !0;
				var c = g.getHash() || "",
				d = g.unescapeHash(e.contentWindow.document.location.hash) || "";
				return c !== b ? (b = c, d !== c && (h = d = c, e.contentWindow.document.open(), e.contentWindow.document.close(), e.contentWindow.document.location.hash = g.escapeHash(c)), g.Adapter.trigger(a, "hashchange")) : d !== h && (h = d, g.setHash(d, !1)),
				i = !1,
				!0;
			}) : g.checkerFunction = function () {
				var c = g.getHash();
				return c !== b && (b = c, g.Adapter.trigger(a, "hashchange")),
				!0;
			},
			g.intervalList.push(f(g.checkerFunction, g.options.hashChangeInterval)),
			!0;
		}, g.Adapter.onDomLoad(g.hashChangeInit)),
		g.emulated.pushState && (g.onHashChange = function (b) {
			var d = b && b.newURL || c.location.href,
			e = g.getHashByUrl(d),
			f = null,
			h = null,
			i = null,
			j;
			return g.isLastHash(e) ? (g.busy(!1), !1) : (g.doubleCheckComplete(), g.saveHash(e), e && g.isTraditionalAnchor(e) ? (g.Adapter.trigger(a, "anchorchange"), g.busy(!1), !1) : (f = g.extractState(g.getFullUrl(e || c.location.href, !1), !0), g.isLastSavedState(f) ? (g.busy(!1), !1) : (h = g.getHashByState(f), j = g.discardedState(f), j ? (g.getHashByIndex(-2) === g.getHashByState(j.forwardState) ? g.back(!1) : g.forward(!1), !1) : (g.pushState(f.data, f.title, f.url, !1), !0))));
		}, g.Adapter.bind(a, "hashchange", g.onHashChange), g.pushState = function (b, d, e, f) {
			if (g.getHashByUrl(e)) {
				throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
			}
			if (f !== !1 && g.busy()) {
				return g.pushQueue({
					scope : g,
					callback : g.pushState,
					args : arguments,
					queue : f
				}),
				!1;
			}
			g.busy(!0);
			var h = g.createStateObject(b, d, e),
			i = g.getHashByState(h),
			j = g.getState(!1),
			k = g.getHashByState(j),
			l = g.getHash();
			return g.storeState(h),
			g.expectedStateId = h.id,
			g.recycleState(h),
			g.setTitle(h),
			i === k ? (g.busy(!1), !1) : i !== l && i !== g.getShortUrl(c.location.href) ? (g.setHash(i, !1), !1) : (g.saveState(h), g.Adapter.trigger(a, "statechange"), g.busy(!1), !0);
		}, g.replaceState = function (a, b, c, d) {
			if (g.getHashByUrl(c)) {
				throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
			}
			if (d !== !1 && g.busy()) {
				return g.pushQueue({
					scope : g,
					callback : g.replaceState,
					args : arguments,
					queue : d
				}),
				!1;
			}
			g.busy(!0);
			var e = g.createStateObject(a, b, c),
			f = g.getState(!1),
			h = g.getStateByIndex(-2);
			return g.discardState(f, e, h),
			g.pushState(e.data, e.title, e.url, !1),
			!0;
		}),
		g.emulated.pushState && g.getHash() && !g.emulated.hashChange && g.Adapter.onDomLoad(function () {
			g.Adapter.trigger(a, "hashchange");
		});
	},
	typeof g.init != "undefined" && g.init();
}
(window), function (a, b) {
	var c = a.console || b,
	d = a.document,
	e = a.navigator,
	f = a.sessionStorage || !1,
	g = a.setTimeout,
	h = a.clearTimeout,
	i = a.setInterval,
	j = a.clearInterval,
	k = a.JSON,
	l = a.alert,
	m = a.History = a.History || {},
	n = a.history;
	k.stringify = k.stringify || k.encode,
	k.parse = k.parse || k.decode;
	if (typeof m.init != "undefined") {
		throw new Error("History.js Core has already been loaded...");
	}
	m.init = function () {
		return typeof m.Adapter == "undefined" ? !1 : (typeof m.initCore != "undefined" && m.initCore(), typeof m.initHtml4 != "undefined" && m.initHtml4(), !0);
	},
	m.initCore = function () {
		if (typeof m.initCore.initialized != "undefined") {
			return !1;
		}
		m.initCore.initialized = !0,
		m.options = m.options || {},
		m.options.hashChangeInterval = m.options.hashChangeInterval || 100,
		m.options.safariPollInterval = m.options.safariPollInterval || 500,
		m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500,
		m.options.storeInterval = m.options.storeInterval || 1000,
		m.options.busyDelay = m.options.busyDelay || 250,
		m.options.debug = m.options.debug || !1,
		m.options.initialTitle = m.options.initialTitle || d.title,
		m.intervalList = [],
		m.clearAllIntervals = function () {
			var a,
			b = m.intervalList;
			if (typeof b != "undefined" && b !== null) {
				for (a = 0; a < b.length; a++) {
					j(b[a]);
				}
				m.intervalList = null;
			}
		},
		m.debug = function () {
			(m.options.debug || !1) && m.log.apply(m, arguments);
		},
		m.log = function () {
			var a = typeof c != "undefined" && typeof c.log != "undefined" && typeof c.log.apply != "undefined",
			b = d.getElementById("log"),
			e,
			f,
			g,
			h,
			i;
			a ? (h = Array.prototype.slice.call(arguments), e = h.shift(), typeof c.debug != "undefined" ? c.debug.apply(c, [e, h]) : c.log.apply(c, [e, h])) : e = "\n" + arguments[0] + "\n";
			for (f = 1, g = arguments.length; f < g; ++f) {
				i = arguments[f];
				if (typeof i == "object" && typeof k != "undefined") {
					try {
						i = k.stringify(i);
					} catch (j) {}

				}
				e += "\n" + i + "\n";
			}
			return b ? (b.value += e + "\n-----\n", b.scrollTop = b.scrollHeight - b.clientHeight) : a || l(e),
			!0;
		},
		m.getInternetExplorerMajorVersion = function () {
			var a = m.getInternetExplorerMajorVersion.cached = typeof m.getInternetExplorerMajorVersion.cached != "undefined" ? m.getInternetExplorerMajorVersion.cached : function () {
				var a = 3,
				b = d.createElement("div"),
				c = b.getElementsByTagName("i");
				while ((b.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") && c[0]) {}

				return a > 4 ? a : !1;
			}
			();
			return a;
		},
		m.isInternetExplorer = function () {
			var a = m.isInternetExplorer.cached = typeof m.isInternetExplorer.cached != "undefined" ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion());
			return a;
		},
		m.emulated = {
			pushState : !Boolean(a.history && a.history.pushState && a.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),
			hashChange : Boolean(!("onhashchange" in a || "onhashchange" in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)
		},
		m.enabled = !m.emulated.pushState,
		m.bugs = {
			setHash : Boolean(!m.emulated.pushState && e.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
			safariPoll : Boolean(!m.emulated.pushState && e.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
			ieDoubleCheck : Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),
			hashEscape : Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)
		},
		m.isEmptyObject = function (a) {
			for (var b in a) {
				return !1;
			}
			return !0;
		},
		m.cloneObject = function (a) {
			var b,
			c;
			return a ? (b = k.stringify(a), c = k.parse(b)) : c = {},
			c;
		},
		m.getRootUrl = function () {
			var a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
			if (d.location.port || !1) {
				a += ":" + d.location.port;
			}
			return a += "/",
			a;
		},
		m.getBaseHref = function () {
			var a = d.getElementsByTagName("base"),
			b = null,
			c = "";
			return a.length === 1 && (b = a[0], c = b.href.replace(/[^\/]+$/, "")),
			c = c.replace(/\/+$/, ""),
			c && (c += "/"),
			c;
		},
		m.getBaseUrl = function () {
			var a = m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
			return a;
		},
		m.getPageUrl = function () {
			var a = m.getState(!1, !1),
			b = (a || {}).url || d.location.href,
			c;
			return c = b.replace(/\/+$/, "").replace(/[^\/]+$/, function (a, b, c) {
					return /\./.test(a) ? a : a + "/";
				}),
			c;
		},
		m.getBasePageUrl = function () {
			var a = d.location.href.replace(/[#\?].*/, "").replace(/[^\/]+$/, function (a, b, c) {
					return /[^\/]$/.test(a) ? "" : a;
				}).replace(/\/+$/, "") + "/";
			return a;
		},
		m.getFullUrl = function (a, b) {
			var c = a,
			d = a.substring(0, 1);
			return b = typeof b == "undefined" ? !0 : b,
			/[a-z]+\:\/\//.test(a) || (d === "/" ? c = m.getRootUrl() + a.replace(/^\/+/, "") : d === "#" ? c = m.getPageUrl().replace(/#.*/, "") + a : d === "?" ? c = m.getPageUrl().replace(/[\?#].*/, "") + a : b ? c = m.getBaseUrl() + a.replace(/^(\.\/)+/, "") : c = m.getBasePageUrl() + a.replace(/^(\.\/)+/, "")),
			c.replace(/\#$/, "");
		},
		m.getShortUrl = function (a) {
			var b = a,
			c = m.getBaseUrl(),
			d = m.getRootUrl();
			return m.emulated.pushState && (b = b.replace(c, "")),
			b = b.replace(d, "/"),
			m.isTraditionalAnchor(b) && (b = "./" + b),
			b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""),
			b;
		},
		m.store = {},
		m.idToState = m.idToState || {},
		m.stateToId = m.stateToId || {},
		m.urlToId = m.urlToId || {},
		m.storedStates = m.storedStates || [],
		m.savedStates = m.savedStates || [],
		m.normalizeStore = function () {
			m.store.idToState = m.store.idToState || {},
			m.store.urlToId = m.store.urlToId || {},
			m.store.stateToId = m.store.stateToId || {};
		},
		m.getState = function (a, b) {
			typeof a == "undefined" && (a = !0),
			typeof b == "undefined" && (b = !0);
			var c = m.getLastSavedState();
			return !c && b && (c = m.createStateObject()),
			a && (c = m.cloneObject(c), c.url = c.cleanUrl || c.url),
			c;
		},
		m.getIdByState = function (a) {
			var b = m.extractId(a.url),
			c;
			if (!b) {
				c = m.getStateString(a);
				if (typeof m.stateToId[c] != "undefined") {
					b = m.stateToId[c];
				} else {
					if (typeof m.store.stateToId[c] != "undefined") {
						b = m.store.stateToId[c];
					} else {
						for (; ; ) {
							b = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
							if (typeof m.idToState[b] == "undefined" && typeof m.store.idToState[b] == "undefined") {
								break;
							}
						}
						m.stateToId[c] = b,
						m.idToState[b] = a;
					}
				}
			}
			return b;
		},
		m.normalizeState = function (a) {
			var b,
			c;
			if (!a || typeof a != "object") {
				a = {};
			}
			if (typeof a.normalized != "undefined") {
				return a;
			}
			if (!a.data || typeof a.data != "object") {
				a.data = {};
			}
			b = {},
			b.normalized = !0,
			b.title = a.title || "",
			b.url = m.getFullUrl(m.unescapeString(a.url || d.location.href)),
			b.hash = m.getShortUrl(b.url),
			b.data = m.cloneObject(a.data),
			b.id = m.getIdByState(b),
			b.cleanUrl = b.url.replace(/\??\&_suid.*/, ""),
			b.url = b.cleanUrl,
			c = !m.isEmptyObject(b.data);
			if (b.title || c) {
				b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ""),
				/\?/.test(b.hash) || (b.hash += "?"),
				b.hash += "&_suid=" + b.id;
			}
			return b.hashedUrl = m.getFullUrl(b.hash),
			(m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl),
			b;
		},
		m.createStateObject = function (a, b, c) {
			var d = {
				data : a,
				title : b,
				url : c
			};
			return d = m.normalizeState(d),
			d;
		},
		m.getStateById = function (a) {
			a = String(a);
			var c = m.idToState[a] || m.store.idToState[a] || b;
			return c;
		},
		m.getStateString = function (a) {
			var b,
			c,
			d;
			return b = m.normalizeState(a),
			c = {
				data : b.data,
				title : a.title,
				url : a.url
			},
			d = k.stringify(c),
			d;
		},
		m.getStateId = function (a) {
			var b,
			c;
			return b = m.normalizeState(a),
			c = b.id,
			c;
		},
		m.getHashByState = function (a) {
			var b,
			c;
			return b = m.normalizeState(a),
			c = b.hash,
			c;
		},
		m.extractId = function (a) {
			var b,
			c,
			d;
			return c = /(.*)\&_suid=([0-9]+)$/.exec(a),
			d = c ? c[1] || a : a,
			b = c ? String(c[2] || "") : "",
			b || !1;
		},
		m.isTraditionalAnchor = function (a) {
			var b = !/[\/\?\.]/.test(a);
			return b;
		},
		m.extractState = function (a, b) {
			var c = null,
			d,
			e;
			return b = b || !1,
			d = m.extractId(a),
			d && (c = m.getStateById(d)),
			c || (e = m.getFullUrl(a), d = m.getIdByUrl(e) || !1, d && (c = m.getStateById(d)), !c && b && !m.isTraditionalAnchor(a) && (c = m.createStateObject(null, null, e))),
			c;
		},
		m.getIdByUrl = function (a) {
			var c = m.urlToId[a] || m.store.urlToId[a] || b;
			return c;
		},
		m.getLastSavedState = function () {
			return m.savedStates[m.savedStates.length - 1] || b;
		},
		m.getLastStoredState = function () {
			return m.storedStates[m.storedStates.length - 1] || b;
		},
		m.hasUrlDuplicate = function (a) {
			var b = !1,
			c;
			return c = m.extractState(a.url),
			b = c && c.id !== a.id,
			b;
		},
		m.storeState = function (a) {
			return m.urlToId[a.url] = a.id,
			m.storedStates.push(m.cloneObject(a)),
			a;
		},
		m.isLastSavedState = function (a) {
			var b = !1,
			c,
			d,
			e;
			return m.savedStates.length && (c = a.id, d = m.getLastSavedState(), e = d.id, b = c === e),
			b;
		},
		m.saveState = function (a) {
			return m.isLastSavedState(a) ? !1 : (m.savedStates.push(m.cloneObject(a)), !0);
		},
		m.getStateByIndex = function (a) {
			var b = null;
			return typeof a == "undefined" ? b = m.savedStates[m.savedStates.length - 1] : a < 0 ? b = m.savedStates[m.savedStates.length + a] : b = m.savedStates[a],
			b;
		},
		m.getHash = function () {
			var a = m.unescapeHash(d.location.hash);
			return a;
		},
		m.unescapeString = function (b) {
			var c = b,
			d;
			for (; ; ) {
				d = a.unescape(c);
				if (d === c) {
					break;
				}
				c = d;
			}
			return c;
		},
		m.unescapeHash = function (a) {
			var b = m.normalizeHash(a);
			return b = m.unescapeString(b),
			b;
		},
		m.normalizeHash = function (a) {
			var b = a.replace(/[^#]*#/, "").replace(/#.*/, "");
			return b;
		},
		m.setHash = function (a, b) {
			var c,
			e,
			f;
			return b !== !1 && m.busy() ? (m.pushQueue({
					scope : m,
					callback : m.setHash,
					args : arguments,
					queue : b
				}), !1) : (c = m.escapeHash(a), m.busy(!0), e = m.extractState(a, !0), e && !m.emulated.pushState ? m.pushState(e.data, e.title, e.url, !1) : d.location.hash !== c && (m.bugs.setHash ? (f = m.getPageUrl(), m.pushState(null, null, f + "#" + c, !1)) : d.location.hash = c), m);
		},
		m.escapeHash = function (b) {
			var c = m.normalizeHash(b);
			return c = a.escape(c),
			m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")),
			c;
		},
		m.getHashByUrl = function (a) {
			var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
			return b = m.unescapeHash(b),
			b;
		},
		m.setTitle = function (a) {
			var b = a.title,
			c;
			b || (c = m.getStateByIndex(0), c && c.url === a.url && (b = c.title || m.options.initialTitle));
			try {
				d.getElementsByTagName("title")[0].innerHTML = b.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ");
			} catch (e) {}

			return d.title = b,
			m;
		},
		m.queues = [],
		m.busy = function (a) {
			typeof a != "undefined" ? m.busy.flag = a : typeof m.busy.flag == "undefined" && (m.busy.flag = !1);
			if (!m.busy.flag) {
				h(m.busy.timeout);
				var b = function () {
					var a,
					c,
					d;
					if (m.busy.flag) {
						return;
					}
					for (a = m.queues.length - 1; a >= 0; --a) {
						c = m.queues[a];
						if (c.length === 0) {
							continue;
						}
						d = c.shift(),
						m.fireQueueItem(d),
						m.busy.timeout = g(b, m.options.busyDelay);
					}
				};
				m.busy.timeout = g(b, m.options.busyDelay);
			}
			return m.busy.flag;
		},
		m.busy.flag = !1,
		m.fireQueueItem = function (a) {
			return a.callback.apply(a.scope || m, a.args || []);
		},
		m.pushQueue = function (a) {
			return m.queues[a.queue || 0] = m.queues[a.queue || 0] || [],
			m.queues[a.queue || 0].push(a),
			m;
		},
		m.queue = function (a, b) {
			return typeof a == "function" && (a = {
					callback : a
				}),
			typeof b != "undefined" && (a.queue = b),
			m.busy() ? m.pushQueue(a) : m.fireQueueItem(a),
			m;
		},
		m.clearQueue = function () {
			return m.busy.flag = !1,
			m.queues = [],
			m;
		},
		m.stateChanged = !1,
		m.doubleChecker = !1,
		m.doubleCheckComplete = function () {
			return m.stateChanged = !0,
			m.doubleCheckClear(),
			m;
		},
		m.doubleCheckClear = function () {
			return m.doubleChecker && (h(m.doubleChecker), m.doubleChecker = !1),
			m;
		},
		m.doubleCheck = function (a) {
			return m.stateChanged = !1,
			m.doubleCheckClear(),
			m.bugs.ieDoubleCheck && (m.doubleChecker = g(function () {
						return m.doubleCheckClear(),
						m.stateChanged || a(),
						!0;
					}, m.options.doubleCheckInterval)),
			m;
		},
		m.safariStatePoll = function () {
			var b = m.extractState(d.location.href),
			c;
			if (!m.isLastSavedState(b)) {
				c = b;
			} else {
				return;
			}
			return c || (c = m.createStateObject()),
			m.Adapter.trigger(a, "popstate"),
			m;
		},
		m.back = function (a) {
			return a !== !1 && m.busy() ? (m.pushQueue({
					scope : m,
					callback : m.back,
					args : arguments,
					queue : a
				}), !1) : (m.busy(!0), m.doubleCheck(function () {
					m.back(!1);
				}), n.go(-1), !0);
		},
		m.forward = function (a) {
			return a !== !1 && m.busy() ? (m.pushQueue({
					scope : m,
					callback : m.forward,
					args : arguments,
					queue : a
				}), !1) : (m.busy(!0), m.doubleCheck(function () {
					m.forward(!1);
				}), n.go(1), !0);
		},
		m.go = function (a, b) {
			var c;
			if (a > 0) {
				for (c = 1; c <= a; ++c) {
					m.forward(b);
				}
			} else {
				if (!(a < 0)) {
					throw new Error("History.go: History.go requires a positive or negative integer passed.");
				}
				for (c = -1; c >= a; --c) {
					m.back(b);
				}
			}
			return m;
		};
		if (m.emulated.pushState) {
			var o = function () {};
			m.pushState = m.pushState || o,
			m.replaceState = m.replaceState || o;
		} else {
			m.onPopState = function (b, c) {
				var e = !1,
				f = !1,
				g,
				h;
				return m.doubleCheckComplete(),
				g = m.getHash(),
				g ? (h = m.extractState(g || d.location.href, !0), h ? m.replaceState(h.data, h.title, h.url, !1) : (m.Adapter.trigger(a, "anchorchange"), m.busy(!1)), m.expectedStateId = !1, !1) : (e = m.Adapter.extractEventData("state", b, c) || !1, e ? f = m.getStateById(e) : m.expectedStateId ? f = m.getStateById(m.expectedStateId) : f = m.extractState(d.location.href), f || (f = m.createStateObject(null, null, d.location.href)), m.expectedStateId = !1, m.isLastSavedState(f) ? (m.busy(!1), !1) : (m.storeState(f), m.saveState(f), m.setTitle(f), m.Adapter.trigger(a, "statechange"), m.busy(!1), !0));
			},
			m.Adapter.bind(a, "popstate", m.onPopState),
			m.pushState = function (b, c, d, e) {
				if (m.getHashByUrl(d) && m.emulated.pushState) {
					throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
				}
				if (e !== !1 && m.busy()) {
					return m.pushQueue({
						scope : m,
						callback : m.pushState,
						args : arguments,
						queue : e
					}),
					!1;
				}
				m.busy(!0);
				var f = m.createStateObject(b, c, d);
				return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.pushState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")),
				!0;
			},
			m.replaceState = function (b, c, d, e) {
				if (m.getHashByUrl(d) && m.emulated.pushState) {
					throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
				}
				if (e !== !1 && m.busy()) {
					return m.pushQueue({
						scope : m,
						callback : m.replaceState,
						args : arguments,
						queue : e
					}),
					!1;
				}
				m.busy(!0);
				var f = m.createStateObject(b, c, d);
				return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.replaceState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")),
				!0;
			};
		}
		if (f) {
			try {
				m.store = k.parse(f.getItem("History.store")) || {};
			} catch (p) {
				m.store = {};
			}
			m.normalizeStore();
		} else {
			m.store = {},
			m.normalizeStore();
		}
		m.Adapter.bind(a, "beforeunload", m.clearAllIntervals),
		m.Adapter.bind(a, "unload", m.clearAllIntervals),
		m.saveState(m.storeState(m.extractState(d.location.href, !0))),
		f && (m.onUnload = function () {
			var a,
			b;
			try {
				a = k.parse(f.getItem("History.store")) || {};
			} catch (c) {
				a = {};
			}
			a.idToState = a.idToState || {},
			a.urlToId = a.urlToId || {},
			a.stateToId = a.stateToId || {};
			for (b in m.idToState) {
				if (!m.idToState.hasOwnProperty(b)) {
					continue;
				}
				a.idToState[b] = m.idToState[b];
			}
			for (b in m.urlToId) {
				if (!m.urlToId.hasOwnProperty(b)) {
					continue;
				}
				a.urlToId[b] = m.urlToId[b];
			}
			for (b in m.stateToId) {
				if (!m.stateToId.hasOwnProperty(b)) {
					continue;
				}
				a.stateToId[b] = m.stateToId[b];
			}
			m.store = a,
			m.normalizeStore(),
			f.setItem("History.store", k.stringify(a));
		}, m.intervalList.push(i(m.onUnload, m.options.storeInterval)), m.Adapter.bind(a, "beforeunload", m.onUnload), m.Adapter.bind(a, "unload", m.onUnload));
		if (!m.emulated.pushState) {
			m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval));
			if (e.vendor === "Apple Computer, Inc." || (e.appCodeName || "") === "Mozilla") {
				m.Adapter.bind(a, "hashchange", function () {
					m.Adapter.trigger(a, "popstate");
				}),
				m.getHash() && m.Adapter.onDomLoad(function () {
					m.Adapter.trigger(a, "hashchange");
				});
			}
		}
	},
	m.init();
}
(window);
if ($("#searchPageBox")[0]) {
	var stx = {
		global : {}

	};
	stx.global.utils = {
		getUrlParam : function (param) {}

	};
	stx.global.vars = {
		"exampleKey" : "value"
	};
	stx.search = {
		keyword : $("#searchPageBox").val(),
		mainTabAjax : "/ww/universal/display-views/search-results-ajax.jsp",
		kbfilterAjax : "/ww/universal/display-views/search-filter-kb.jsp",
		relatedAjax : "/ww/universal/display-views/search-related-results-ajax.jsp",
		start : 0,
		num : 10,
		relatednum : 3,
		site : stxProperties.allCollectionSite,
		client : stxProperties.client,
		kbclient : "kb_frontend",
		kbSite : "KB",
		ie : "utf8",
		oe : "utf8",
		tlen : "100",
		getfields : "*",
		lr : stxProperties.lr,
		filter : "0",
		sort : "date:D:L:d1",
		requiredfields : "",
		currentnavtab : "nav-tabs-all",
		kbfilter : "",
		output : "xml_no_dtd",
		initLoad : "true",
		suggestionkeyword : "",
		searchUrlPrefix : stxProperties.searchURLPrefix,
		allCollectionSite : stxProperties.allCollectionSite,
		supportSite : stxProperties.supportSite,
		domoreSite : stxProperties.domoreSite,
		productFinderSite : stxProperties.productFinderSite,
		waitingText : stxProperties.waitingText,
		rclocale : stxProperties.rclocale,
		searchResultsAllTitle : stxProperties.searchResultsAllTitle,
		searchResultsPsTitle : stxProperties.searchResultsPsTitle,
		searchResultsKbTitle : stxProperties.searchResultsKbTitle,
		searchResultsSpTitle : stxProperties.searchResultsSpTitle,
		searchResultsDomoreTitle : stxProperties.searchResultsDomoreTitle,
		switchSpellingSuggestion : "0",
		initLoading : "true",
		pageTitle : $(document).attr("title"),
		init : function () {
			$("#searchPageBox").keyup(function (event) {
				if (event.keyCode == 13) {
					stx.search.initLoad = "true";
					stx.search.keyword = $("#searchPageBox").val();
					stx.search.start = "0";
					stx.search.requiredfields = "";
					stx.search.kbfilter = "";
					stx.search.suggestionkeyword = "";
					History.pushState({
						keyword : stx.search.keyword,
						start : stx.search.start,
						num : stx.search.num,
						relatednum : stx.search.relatednum,
						currentnavtab : stx.search.currentnavtab,
						kbfilter : stx.search.kbfilter,
						suggestionkeyword : stx.search.suggestionkeyword,
						rclocale : stx.search.rclocale,
						requiredfields : stx.search.requiredfields,
						switchSpellingSuggestion : "0"
					}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + "&s=0");
					stx.search.forceHideSuggestionDiv();
				}
			});
			$("#searchSubmitButton").click(function (event) {
				stx.search.initLoad = "true";
				stx.search.keyword = $("#searchPageBox").val();
				stx.search.start = "0";
				stx.search.requiredfields = "";
				stx.search.kbfilter = "";
				stx.search.suggestionkeyword = "";
				History.pushState({
					keyword : stx.search.keyword,
					start : stx.search.start,
					num : stx.search.num,
					relatednum : stx.search.relatednum,
					currentnavtab : stx.search.currentnavtab,
					kbfilter : stx.search.kbfilter,
					suggestionkeyword : stx.search.suggestionkeyword,
					rclocale : stx.search.rclocale,
					requiredfields : stx.search.requiredfields,
					switchSpellingSuggestion : "0"
				}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + "&s=0");
				stx.search.forceHideSuggestionDiv();
			});
			$("ul.search-nav.nav.nav-tabs > li").each(function (index) {
				$(this).click(function (event) {
					event.preventDefault();
					this.currentnavtab = $(this).attr("id");
					var ss_ = "0";
					if (stx.search.switchSpellingSuggestion == "5") {
						ss_ = "5";
					} else {
						ss_ = "1";
						stx.search.switchSpellingSuggestion = "1";
						if (stx.search.suggestionkeyword != "") {
							stx.search.keyword = stx.search.suggestionkeyword;
							$("#searchPageBox").val(stx.search.suggestionkeyword);
						}
					}
					if ($(this).attr("id") == "nav-tabs-all") {
						stx.search.initLoad = "false";
						stx.search.site = stx.search.allCollectionSite;
						if (stx.search.initLoading != "true") {
							stx.search.start = "0";
						}
						stx.search.currentnavtab = "nav-tabs-all";
						stx.search.resetKbfilter();
						stx.search.updateTitle(stx.search.searchResultsAllTitle);
						stx.search.activeTabs("nav-tabs-all");
						History.pushState({
							keyword : stx.search.keyword,
							start : stx.search.start,
							num : stx.search.num,
							relatednum : stx.search.relatednum,
							currentnavtab : stx.search.currentnavtab,
							kbfilter : stx.search.kbfilter,
							suggestionkeyword : stx.search.suggestionkeyword,
							rclocale : stx.search.rclocale,
							requiredfields : stx.search.requiredfields,
							switchSpellingSuggestion : ss_
						}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + ss_);
						stx.search.forceShowRightSection("search-results-right-ps");
						stx.search.forceShowRightSection("search-results-right-sp");
						stx.search.forceShowRightSection("search-results-right-articles");
						stx.search.forceShowRightSection("search-results-right-kb");
						stx.search.moveKbFilter("down");
					} else {
						if ($(this).attr("id") == "nav-tabs-ps") {
							stx.search.initLoad = "false";
							stx.search.site = stx.search.productFinderSite;
							if (stx.search.initLoading != "true") {
								stx.search.start = "0";
							}
							stx.search.currentnavtab = "nav-tabs-ps";
							stx.search.resetKbfilter();
							stx.search.updateTitle(stx.search.searchResultsPsTitle);
							stx.search.activeTabs("nav-tabs-ps");
							History.pushState({
								keyword : stx.search.keyword,
								start : stx.search.start,
								num : stx.search.num,
								relatednum : stx.search.relatednum,
								currentnavtab : stx.search.currentnavtab,
								kbfilter : stx.search.kbfilter,
								suggestionkeyword : stx.search.suggestionkeyword,
								rclocale : stx.search.rclocale,
								requiredfields : stx.search.requiredfields,
								switchSpellingSuggestion : ss_
							}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + ss_);
							stx.search.forceHideRightSection("search-results-right-ps");
							stx.search.forceShowRightSection("search-results-right-sp");
							stx.search.forceShowRightSection("search-results-right-articles");
							stx.search.forceShowRightSection("search-results-right-kb");
							stx.search.moveKbFilter("down");
						} else {
							if ($(this).attr("id") == "nav-tabs-sp") {
								stx.search.initLoad = "false";
								stx.search.site = stx.search.supportSite;
								if (stx.search.initLoading != "true") {
									stx.search.start = "0";
								}
								stx.search.currentnavtab = "nav-tabs-sp";
								stx.search.resetKbfilter();
								stx.search.updateTitle(stx.search.searchResultsSpTitle);
								stx.search.activeTabs("nav-tabs-sp");
								History.pushState({
									keyword : stx.search.keyword,
									start : stx.search.start,
									num : stx.search.num,
									relatednum : stx.search.relatednum,
									currentnavtab : stx.search.currentnavtab,
									kbfilter : stx.search.kbfilter,
									suggestionkeyword : stx.search.suggestionkeyword,
									rclocale : stx.search.rclocale,
									requiredfields : stx.search.requiredfields,
									switchSpellingSuggestion : ss_
								}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + ss_);
								stx.search.forceHideRightSection("search-results-right-sp");
								stx.search.forceShowRightSection("search-results-right-ps");
								stx.search.forceShowRightSection("search-results-right-articles");
								stx.search.forceShowRightSection("search-results-right-kb");
								stx.search.moveKbFilter("down");
							} else {
								if ($(this).attr("id") == "nav-tabs-kb") {
									stx.search.initLoad = "false";
									stx.search.site = stx.search.kbSite;
									stx.search.currentnavtab = "nav-tabs-kb";
									stx.search.updateTitle(stx.search.searchResultsKbTitle);
									stx.search.activeTabs("nav-tabs-kb");
									if (stx.search.initLoading != "true") {
										stx.search.start = "0";
										stx.search.resetKbfilter();
										History.pushState({
											keyword : stx.search.keyword,
											start : stx.search.start,
											num : stx.search.num,
											relatednum : stx.search.relatednum,
											currentnavtab : stx.search.currentnavtab,
											kbfilter : stx.search.kbfilter,
											suggestionkeyword : stx.search.suggestionkeyword,
											rclocale : stx.search.rclocale,
											requiredfields : stx.search.requiredfields,
											switchSpellingSuggestion : ss_
										}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + ss_);
										stx.search.forceShowRightSection("search-results-right-ps");
										stx.search.forceShowRightSection("search-results-right-sp");
										stx.search.forceShowRightSection("search-results-right-articles");
										stx.search.forceShowRightSection("search-results-right-kb");
									}
								} else {
									if ($(this).attr("id") == "nav-tabs-articles") {
										stx.search.initLoad = "false";
										stx.search.site = stx.search.domoreSite;
										if (stx.search.initLoading != "true") {
											stx.search.start = "0";
										}
										stx.search.currentnavtab = "nav-tabs-articles";
										stx.search.resetKbfilter();
										stx.search.updateTitle(stx.search.searchResultsDomoreTitle);
										stx.search.activeTabs("nav-tabs-articles");
										History.pushState({
											keyword : stx.search.keyword,
											start : stx.search.start,
											num : stx.search.num,
											relatednum : stx.search.relatednum,
											currentnavtab : stx.search.currentnavtab,
											kbfilter : stx.search.kbfilter,
											suggestionkeyword : stx.search.suggestionkeyword,
											rclocale : stx.search.rclocale,
											requiredfields : stx.search.requiredfields,
											switchSpellingSuggestion : ss_
										}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + ss_);
										stx.search.forceHideRightSection("search-results-right-articles");
										stx.search.forceShowRightSection("search-results-right-ps");
										stx.search.forceShowRightSection("search-results-right-sp");
										stx.search.forceShowRightSection("search-results-right-kb");
										stx.search.moveKbFilter("down");
									}
								}
							}
						}
					}
				});
			});
			this.showRelatedSection("search-results-right-sp", this.supportSite);
			this.showRelatedSection("search-results-right-articles", this.domoreSite);
			this.showRelatedSection("search-results-right-kb", this.kbSite);
			this.showRelatedSection("search-results-right-ps", this.productFinderSite);
			if (this.currentnavtab == "nav-tabs-sp") {
				this.initLoading = "true";
				$("#nav-tabs-sp").click();
				this.showMainTab();
			} else {
				if (this.currentnavtab == "nav-tabs-articles") {
					this.initLoading = "true";
					$("#nav-tabs-articles").click();
					this.showMainTab();
				} else {
					if (this.currentnavtab == "nav-tabs-ps") {
						this.initLoading = "true";
						$("#nav-tabs-ps").click();
						this.showMainTab();
					} else {
						if (this.currentnavtab == "nav-tabs-kb") {
							this.initLoading = "true";
							$("#nav-tabs-kb").click();
							this.showMainTab();
							this.updateKBfilter();
						} else {
							this.initLoading = "true";
							this.showMainTab();
						}
					}
				}
			}
			stx.search.initLoading = "false";
		},
		getInitLoading : function () {},
		forceHideRightSection : function (sectionId) {
			$("#" + sectionId).hide();
		},
		forceShowRightSection : function (sectionId) {
			$("#" + sectionId).show();
		},
		forceHideSuggestionDiv : function () {
			$("ul.ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all").hide();
		},
		resetKbfilter : function () {
			this.requiredfields = "";
			this.kbfilter = "";
		},
		activeTabs : function (tabId) {
			$("#" + tabId).removeClass("search-tab").addClass("active");
			$("#" + tabId).siblings().removeClass("active").addClass("search-tab");
		},
		updateHidden : function () {
			$("#keyword").val(this.keyword);
			$("#site").val(this.site);
			$("#currentnavtab").val(this.currentnavtab);
			$("#kbfilter").val(this.kbfilter);
			$("#start").val(this.start);
			$("#num").val(this.num);
			$("#client").val(this.client);
			$("#output").val(this.output);
			$("#ie").val(this.ie);
			$("#oe").val(this.oe);
			$("#tlen").val(this.tlen);
			$("#getfields").val(this.getfields);
			$("#lr").val(this.lr);
			$("#filter").val(this.filter);
			$("#sort").val(this.sort);
			$("#requiredfields").val(this.requiredfields);
			$("#rclocale").val(this.rclocale);
			$("#suggestionkeyword").val(this.suggestionkeyword);
			$("#switchSpellingSuggestion").val(this.switchSpellingSuggestion);
		},
		bottomPagination : function (index) {
			this.initLoad = "false";
			this.start = index;
		},
		showMainTab : function () {
			this.forceHideSuggestionDiv();
			$("#search-results-body").html(this.waitingText);
			$.ajax({
				type : "post",
				url : this.mainTabAjax,
				cache : false,
				timeout : 30000,
				data : {
					"site" : this.site,
					"start" : this.start,
					"num" : this.num,
					"client" : this.client,
					"output" : this.output,
					"ie" : this.ie,
					"oe" : this.oe,
					"tlen" : this.tlen,
					"getfields" : this.getfields,
					"lr" : this.lr,
					"filter" : this.filter,
					"sort" : this.sort,
					"q" : this.keyword,
					"requiredfields" : this.requiredfields,
					"rclocale" : this.rclocale,
					"searchUrlPrefix" : this.searchUrlPrefix,
					"switchSpellingSuggestion" : this.switchSpellingSuggestion
				},
				beforeSend : function () {
					stx.search.updateHidden();
				},
				success : function (msg) {
					$("#search-results-body").html(msg);
					if ($("#spellingQueryHiddenDiv")[0] != undefined) {
						$("#search-term-suggestion").show();
						$("#search-term-suggestion-instead").show();
						$("#search-term-suggestion-do-you-mean").hide();
						$("#spellingSuggestionHref").text($("#spellingQueryHiddenDiv").html());
						$("#spellingQueryHref").text(stx.search.keyword);
						$("#spellingDoYouMeanHref").text($("#spellingQueryHiddenDiv").html());
						stx.search.suggestionkeyword = $("#spellingQueryHiddenDiv").html();
						if (stx.search.switchSpellingSuggestion == "1" || stx.search.switchSpellingSuggestion == "2") {
							$("#search-term-suggestion").hide();
							$("#search-term-suggestion-instead").hide();
							$("#search-term-suggestion-do-you-mean").hide();
						} else {
							if (stx.search.switchSpellingSuggestion == "5") {
								$("#search-term-suggestion").hide();
								$("#search-term-suggestion-instead").hide();
								$("#search-term-suggestion-do-you-mean").show();
							} else {
								$("#search-term-suggestion").show();
								$("#search-term-suggestion-instead").show();
								$("#search-term-suggestion-do-you-mean").hide();
							}
						}
						$("#spellingSuggestionHref").click(function (event) {
							event.preventDefault();
							$("#searchPageBox").val(stx.search.suggestionkeyword);
							stx.search.keyword = stx.search.suggestionkeyword;
							stx.search.start = "0";
							if (stx.search.currentnavtab == "nav-tabs-sp") {
								$("#nav-tabs-sp").click();
							} else {
								if (stx.search.currentnavtab == "nav-tabs-articles") {
									$("#nav-tabs-articles").click();
								} else {
									if (stx.search.currentnavtab == "nav-tabs-ps") {
										$("#nav-tabs-ps").click();
									} else {
										if (stx.search.currentnavtab == "nav-tabs-kb") {
											$("#nav-tabs-kb").click();
										} else {
											$("#nav-tabs-all").click();
										}
									}
								}
							}
						});
						$("#spellingQueryHref").click(function (event) {
							event.preventDefault();
							stx.search.switchSpellingSuggestion = "5";
							History.pushState({
								keyword : stx.search.keyword,
								start : "0",
								num : stx.search.num,
								relatednum : stx.search.relatednum,
								currentnavtab : stx.search.currentnavtab,
								kbfilter : stx.search.kbfilter,
								suggestionkeyword : stx.search.suggestionkeyword,
								rclocale : stx.search.rclocale,
								requiredfields : stx.search.requiredfields,
								switchSpellingSuggestion : "5"
							}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=0" + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=5");
							stx.search.showRelatedSection("search-results-right-sp", stx.search.supportSite);
							stx.search.showRelatedSection("search-results-right-articles", stx.search.domoreSite);
							stx.search.showRelatedSection("search-results-right-kb", stx.search.kbSite);
							stx.search.showRelatedSection("search-results-right-ps", stx.search.productFinderSite);
						});
						$("#spellingDoYouMeanHref").click(function (event) {
							event.preventDefault();
							stx.search.switchSpellingSuggestion = "6";
							stx.search.keyword = stx.search.suggestionkeyword;
							$("#searchPageBox").val(stx.search.suggestionkeyword);
							History.pushState({
								keyword : stx.search.keyword,
								start : "0",
								num : stx.search.num,
								relatednum : stx.search.relatednum,
								currentnavtab : stx.search.currentnavtab,
								kbfilter : stx.search.kbfilter,
								suggestionkeyword : stx.search.suggestionkeyword,
								rclocale : stx.search.rclocale,
								requiredfields : stx.search.requiredfields,
								switchSpellingSuggestion : "6"
							}, stx.search.keyword, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=0" + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=6");
							stx.search.showRelatedSection("search-results-right-sp", stx.search.supportSite);
							stx.search.showRelatedSection("search-results-right-articles", stx.search.domoreSite);
							stx.search.showRelatedSection("search-results-right-kb", stx.search.kbSite);
							stx.search.showRelatedSection("search-results-right-ps", stx.search.productFinderSite);
						});
					} else {
						$("#search-term-suggestion").hide();
						$("#search-term-suggestion-instead").hide();
						$("#search-term-suggestion-do-you-mean").hide();
						if (stx.search.switchSpellingSuggestion == "5") {
							$("#search-term-suggestion-do-you-mean").show();
						}
					}
					var prevPageNum = 0;
					var nextPageNum = 0;
					if ($("#prevPageNum")[0]) {
						prevPageNum = $("#prevPageNum").text();
						$("li > a.arrow-button.previous").click(function (event) {
							event.preventDefault();
							if (stx.search.switchSpellingSuggestion != "5") {
								stx.search.switchSpellingSuggestion = "1";
								if (stx.search.suggestionkeyword != "") {
									stx.search.keyword = stx.search.suggestionkeyword;
									$("#searchPageBox").val(stx.search.suggestionkeyword);
								}
							}
							stx.search.bottomPagination(prevPageNum);
							History.pushState({
								keyword : stx.search.keyword,
								start : prevPageNum,
								num : stx.search.num,
								relatednum : stx.search.relatednum,
								currentnavtab : stx.search.currentnavtab,
								kbfilter : stx.search.kbfilter,
								suggestionkeyword : stx.search.suggestionkeyword,
								rclocale : stx.search.rclocale,
								requiredfields : stx.search.requiredfields,
								switchSpellingSuggestion : stx.search.switchSpellingSuggestion
							}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + prevPageNum + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + stx.search.switchSpellingSuggestion);
						});
					}
					if ($("#nextPageNum")[0]) {
						nextPageNum = $("#nextPageNum").text();
						$("li > a.arrow-button.next").click(function (event) {
							event.preventDefault();
							if (stx.search.switchSpellingSuggestion != "5") {
								stx.search.switchSpellingSuggestion = "1";
								if (stx.search.suggestionkeyword != "") {
									stx.search.keyword = stx.search.suggestionkeyword;
									$("#searchPageBox").val(stx.search.suggestionkeyword);
								}
							}
							stx.search.bottomPagination(nextPageNum);
							History.pushState({
								keyword : stx.search.keyword,
								start : nextPageNum,
								num : stx.search.num,
								relatednum : stx.search.relatednum,
								currentnavtab : stx.search.currentnavtab,
								kbfilter : stx.search.kbfilter,
								suggestionkeyword : stx.search.suggestionkeyword,
								rclocale : stx.search.rclocale,
								requiredfields : stx.search.requiredfields,
								switchSpellingSuggestion : stx.search.switchSpellingSuggestion
							}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + nextPageNum + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + stx.search.switchSpellingSuggestion);
						});
					}
					$("li.hidden-phone").each(function (index) {
						var htmlDisplayNumberIndex = $(this).find("a").text();
						var gsaStartIndex = (htmlDisplayNumberIndex - 1) * stx.search.num;
						$(this).click(function (event) {
							event.preventDefault();
							if (!$(this).hasClass("active")) {
								if (stx.search.switchSpellingSuggestion != "5") {
									stx.search.switchSpellingSuggestion = "1";
									if (stx.search.suggestionkeyword != "") {
										stx.search.keyword = stx.search.suggestionkeyword;
										$("#searchPageBox").val(stx.search.suggestionkeyword);
									}
								}
								stx.search.bottomPagination(gsaStartIndex);
								History.pushState({
									keyword : stx.search.keyword,
									start : gsaStartIndex,
									num : stx.search.num,
									relatednum : stx.search.relatednum,
									currentnavtab : stx.search.currentnavtab,
									kbfilter : stx.search.kbfilter,
									suggestionkeyword : stx.search.suggestionkeyword,
									rclocale : stx.search.rclocale,
									requiredfields : stx.search.requiredfields,
									switchSpellingSuggestion : stx.search.switchSpellingSuggestion
								}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + gsaStartIndex + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + stx.search.switchSpellingSuggestion);
							}
						});
					});
				},
				error : function (jqXHR, textStatus, errorThrown) {
					$("#search-results-body").html("<!--" + errorThrown + "-->");
				}
			});
		},
		showRelatedSection : function (sectionId, collection) {
			if (this.keyword == "") {
				return;
			}
			$("#" + sectionId).html(this.waitingText);
			var related_products = "";
			if (sectionId == "search-results-right-ps") {
				var gsalang = this.rclocale;
				gsalang = gsalang.toLowerCase().replace("_", "-");
				related_products = "(relatedproducts:true).(lang:" + gsalang + ")";
			} else {
				if (sectionId == "search-results-right-kb") {
					related_products = stx.search.requiredfields;
				}
			}
			$.ajax({
				type : "post",
				url : this.relatedAjax,
				cache : false,
				timeout : 30000,
				data : {
					"site" : collection,
					"start" : "0",
					"num" : this.relatednum,
					"client" : this.client,
					"output" : this.output,
					"ie" : this.ie,
					"oe" : this.oe,
					"tlen" : this.tlen,
					"getfields" : this.getfields,
					"lr" : this.lr,
					"filter" : this.filter,
					"sort" : this.sort,
					"q" : this.keyword,
					"requiredfields" : related_products,
					"sectionId" : sectionId,
					"rclocale" : this.rclocale,
					"searchUrlPrefix" : this.searchUrlPrefix,
					"switchSpellingSuggestion" : this.switchSpellingSuggestion
				},
				beforeSend : function () {
					stx.search.updateHidden();
				},
				success : function (msg) {
					$("#" + sectionId).html(msg);
					if (sectionId == "search-results-right-sp") {
						$("#search-results-right-sp-link").click(function (event) {
							event.preventDefault();
							$("#nav-tabs-sp").click();
						});
					} else {
						if (sectionId == "search-results-right-articles") {
							$("#search-results-right-articles-link").click(function (event) {
								event.preventDefault();
								$("#nav-tabs-articles").click();
							});
						} else {
							if (sectionId == "search-results-right-ps") {
								$("#search-results-right-ps-link").click(function (event) {
									event.preventDefault();
									$("#nav-tabs-ps").click();
								});
							} else {
								if (sectionId == "search-results-right-kb") {
									$("#search-results-right-kb-link").click(function (event) {
										event.preventDefault();
										$("#nav-tabs-kb").click();
									});
								}
							}
						}
					}
				},
				error : function (jqXHR, textStatus, errorThrown) {
					$("#" + sectionId).html("<!--" + errorThrown + "-->");
				}
			});
		},
		updateKBfilter : function () {
			if (this.keyword == "") {
				return;
			}
			$("#search-results-right-kb-filter").show();
			$("#search-results-right-kb-filter").html(this.waitingText);
			$.ajax({
				type : "post",
				url : this.kbfilterAjax,
				cache : false,
				timeout : 30000,
				data : {
					"site" : this.kbSite,
					"start" : "0",
					"num" : this.num,
					"client" : this.kbclient,
					"output" : this.output,
					"ie" : this.ie,
					"oe" : this.oe,
					"tlen" : this.tlen,
					"getfields" : this.getfields,
					"lr" : this.lr,
					"filter" : this.filter,
					"sort" : this.sort,
					"q" : this.keyword,
					"requiredfields" : this.requiredfields,
					"rclocale" : this.rclocale,
					"searchUrlPrefix" : this.searchUrlPrefix,
					"switchSpellingSuggestion" : this.switchSpellingSuggestion
				},
				success : function (msg) {
					$("#search-results-right-kb-filter").html(msg);
					$("input.kb.checkbox").click(function (event) {
						if ($(this).attr("checked")) {
							$(this).parent().parent().siblings("li").each(function () {
								var checkbox = $(this).find("input.kb.checkbox");
								checkbox.attr("checked", false);
							});
							stx.search.kbfilter = $(this).attr("value");
							stx.search.requiredfields = $(this).parents("div.collapse").prev().find("a.accordion-toggle.search-filter-kb-toggle").text();
							stx.search.requiredfields = "(" + $.trim(stx.search.requiredfields) + ":" + $.trim(doubleEncoding(stx.search.kbfilter)) + ")";
							stx.search.start = "0";
							stx.search.site = stx.search.kbSite;
							History.pushState({
								keyword : stx.search.keyword,
								start : stx.search.start,
								num : stx.search.num,
								relatednum : stx.search.relatednum,
								currentnavtab : stx.search.currentnavtab,
								kbfilter : stx.search.kbfilter,
								suggestionkeyword : stx.search.suggestionkeyword,
								rclocale : stx.search.rclocale,
								requiredfields : stx.search.requiredfields,
								switchSpellingSuggestion : stx.search.switchSpellingSuggestion
							}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + stx.search.switchSpellingSuggestion);
						} else {
							stx.search.kbfilter = "";
							stx.search.requiredfields = "";
							stx.search.start = "0";
							stx.search.site = stx.search.kbSite;
							History.pushState({
								keyword : stx.search.keyword,
								start : stx.search.start,
								num : stx.search.num,
								relatednum : stx.search.relatednum,
								currentnavtab : stx.search.currentnavtab,
								kbfilter : stx.search.kbfilter,
								suggestionkeyword : stx.search.suggestionkeyword,
								rclocale : stx.search.rclocale,
								requiredfields : stx.search.requiredfields,
								switchSpellingSuggestion : stx.search.switchSpellingSuggestion
							}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + stx.search.switchSpellingSuggestion);
						}
					});
					if (stx.search.kbfilter != "") {
						var flag = "false";
						var accordion_group_kb = $("div.accordion-group.kb");
						accordion_group_kb.each(function (index) {
							var accordion_group_kb_obj = $(this);
							var according_heading = accordion_group_kb_obj.find("div.accordion-heading");
							var according_body = accordion_group_kb_obj.find("div.accordion-body.collapse");
							var li = accordion_group_kb_obj.find("div.search-filter-kb-list.accordion-inner").find("li");
							li.each(function (index_) {
								var check = $(this).find("input:checkbox");
								if (index_ != 5) {
									if (check.attr("value") == stx.search.kbfilter) {
										flag = "true";
										check.attr("checked", true);
									}
								}
							});
							if (flag == "true") {
								according_heading.addClass("open");
								according_body.eq(0).addClass("in");
							} else {
								according_heading.removeClass("open");
								according_body.eq(0).removeClass("in");
							}
							flag = "false";
						});
					}
					$(".collapse").on("show", function (e) {
						e.stopPropagation();
						$(this).siblings().addClass("open");
					});
					$(".collapse").on("hide", function (e) {
						e.stopPropagation();
						$(this).siblings().removeClass("open");
					});
					if ($(".search-filter-kb-more-heading input").length > 0) {
						var moreCheckbox = $(".search-filter-kb-more-heading input");
						$(moreCheckbox).click(function () {
							$(this).parent().siblings().click();
						});
					}
					$("a.btn.reset.filter.kb").click(function () {
						stx.search.requiredfields = "";
						stx.search.kbfilter = "";
						History.pushState({
							keyword : stx.search.keyword,
							start : "0",
							num : stx.search.num,
							relatednum : stx.search.relatednum,
							currentnavtab : stx.search.currentnavtab,
							kbfilter : stx.search.kbfilter,
							suggestionkeyword : stx.search.suggestionkeyword,
							rclocale : stx.search.rclocale,
							requiredfields : stx.search.requiredfields,
							switchSpellingSuggestion : stx.search.switchSpellingSuggestion
						}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=0&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + stx.search.suggestionkeyword + "&s=" + stx.search.switchSpellingSuggestion);
						stx.search.resetKbfilter();
						stx.search.moveKbFilter("up");
					});
					stx.search.moveKbFilter("up");
				},
				error : function (jqXHR, textStatus, errorThrown) {
					$("#search-results-right-kb-filter").html("<!--" + errorThrown + "-->");
				}
			});
		},
		moveKbFilter : function (top) {
			if (top == "up") {
				$("#search-results-right-kb").hide();
			} else {
				if (top == "down") {
					$("#search-results-right-kb").show();
					$("#search-results-right-kb-filter").hide();
				}
			}
		},
		updateTitle : function (filterName) {
			if ($(".page-title").length > 0) {
				$(".page-title").html('<h1 class="page-title-heading">' + filterName + "</h1>");
			}
		},
		submitSearch : function (event) {
			this.keyword = $("#searchPageBox").val();
			if (this.keyword == "") {
				$("form.form-search").addClass("error");
				return false;
			} else {
				$("form.form-search").removeClass("error");
			}
			var requiredfields_ = this.requiredfields;
			if (this.currentnavtab == "nav-tabs-all") {
				this.site = this.allCollectionSite;
				this.requiredfields = "";
				stx.search.forceShowRightSection("search-results-right-ps");
				stx.search.forceShowRightSection("search-results-right-sp");
				stx.search.forceShowRightSection("search-results-right-articles");
				stx.search.forceShowRightSection("search-results-right-kb");
				stx.search.moveKbFilter("down");
			} else {
				if (this.currentnavtab == "nav-tabs-articles") {
					this.site = this.domoreSite;
					this.requiredfields = "";
					stx.search.forceShowRightSection("search-results-right-ps");
					stx.search.forceShowRightSection("search-results-right-sp");
					stx.search.forceHideRightSection("search-results-right-articles");
					stx.search.forceShowRightSection("search-results-right-kb");
					stx.search.moveKbFilter("down");
				} else {
					if (this.currentnavtab == "nav-tabs-ps") {
						this.site = this.productFinderSite;
						this.requiredfields = "";
						stx.search.forceHideRightSection("search-results-right-ps");
						stx.search.forceShowRightSection("search-results-right-sp");
						stx.search.forceShowRightSection("search-results-right-articles");
						stx.search.forceShowRightSection("search-results-right-kb");
						stx.search.moveKbFilter("down");
					} else {
						if (this.currentnavtab == "nav-tabs-kb") {
							this.site = this.kbSite;
							stx.search.forceShowRightSection("search-results-right-ps");
							stx.search.forceShowRightSection("search-results-right-sp");
							stx.search.forceShowRightSection("search-results-right-articles");
							stx.search.forceHideRightSection("search-results-right-kb");
							stx.search.moveKbFilter("up");
						} else {
							if (this.currentnavtab == "nav-tabs-sp") {
								this.site = this.supportSite;
								this.requiredfields = "";
								stx.search.forceShowRightSection("search-results-right-ps");
								stx.search.forceHideRightSection("search-results-right-sp");
								stx.search.forceShowRightSection("search-results-right-articles");
								stx.search.forceShowRightSection("search-results-right-kb");
								stx.search.moveKbFilter("down");
							} else {
								this.site = this.allCollectionSite;
								this.requiredfields = "";
								stx.search.forceShowRightSection("search-results-right-ps");
								stx.search.forceShowRightSection("search-results-right-sp");
								stx.search.forceShowRightSection("search-results-right-articles");
								stx.search.forceShowRightSection("search-results-right-kb");
								stx.search.moveKbFilter("down");
							}
						}
					}
				}
			}
			this.forceHideSuggestionDiv();
			this.showMainTab();
			this.requiredfields = requiredfields_;
			if (this.initLoad == "true") {
				this.showRelatedSection("search-results-right-sp", this.supportSite);
				this.showRelatedSection("search-results-right-articles", this.domoreSite);
				this.showRelatedSection("search-results-right-ps", this.productFinderSite);
				this.showRelatedSection("search-results-right-kb", this.kbSite);
				if (this.currentnavtab == "nav-tabs-kb") {
					this.updateKBfilter();
				} else {
					stx.search.moveKbFilter("down");
				}
			} else {
				if (this.currentnavtab == "nav-tabs-kb") {
					this.updateKBfilter();
				} else {
					stx.search.moveKbFilter("down");
				}
			}
			if (stx.search.currentnavtab == "nav-tabs-all") {
				stx.search.updateTitle(stx.search.searchResultsAllTitle);
			} else {
				if (stx.search.currentnavtab == "nav-tabs-ps") {
					stx.search.updateTitle(stx.search.searchResultsPsTitle);
				} else {
					if (stx.search.currentnavtab == "nav-tabs-sp") {
						stx.search.updateTitle(stx.search.searchResultsSpTitle);
					} else {
						if (stx.search.currentnavtab == "nav-tabs-kb") {
							stx.search.updateTitle(stx.search.searchResultsKbTitle);
						} else {
							if (stx.search.currentnavtab == "nav-tabs-articles") {
								stx.search.updateTitle(stx.search.searchResultsDomoreTitle);
							} else {
								stx.search.updateTitle(stx.search.searchResultsAllTitle);
							}
						}
					}
				}
			}
		}
	};
	$(document).ready(function () {
		var allVars = $.getUrlVars();
		var byKeyword = "";
		var s = window.location.href.slice(window.location.href.lastIndexOf("keyword") + 8);
		if (s.length == 1) {
			byKeyword = s;
		} else {
			byKeyword = decoding($.getUrlVar("keyword"));
		}
		var tab = $.getUrlVar("tab");
		var start = $.getUrlVar("start");
		var requiredfields = $.getUrlVar("r");
		var kbfilter = $.getUrlVar("kbfilter");
		var switchSpelling = $.getUrlVar("s");
		var sugg = $.getUrlVar("sugg");
		if ($("#search-results-body")[0]) {
			var History = window.History;
			var State = History.getState();
			History.Adapter.bind(window, "statechange", function (event) {
				var State = History.getState();
				var url = State.url;
				var History_Data = State.data;
				var History_Data_keyword = History_Data.keyword;
				if (History_Data_keyword == undefined) {}
				else {
					var History_Data_currentnavtab = History_Data.currentnavtab;
					var History_Data_suggestionkeyword = History_Data.suggestionkeyword;
					var History_Data_kbfilter = History_Data.kbfilter;
					var History_Data_start = History_Data.start;
					var History_Data_requiredfields = History_Data.requiredfields;
					var History_Data_switchSpellingSuggestion = History_Data.switchSpellingSuggestion;
					stx.search.keyword = History_Data_keyword;
					stx.search.currentnavtab = History_Data_currentnavtab;
					stx.search.start = History_Data_start;
					stx.search.requiredfields = History_Data_requiredfields;
					stx.search.kbfilter = History_Data_kbfilter;
					stx.search.switchSpellingSuggestion = History_Data_switchSpellingSuggestion;
					stx.search.suggestionkeyword = History_Data_suggestionkeyword;
					$("#searchPageBox").val(History_Data_keyword);
					stx.search.activeTabs(stx.search.currentnavtab);
					stx.search.submitSearch(event);
				}
			});
			stx.search.keyword = byKeyword;
			stx.search.currentnavtab = tab;
			stx.search.start = start;
			stx.search.requiredfields = requiredfields;
			stx.search.kbfilter = kbfilter;
			stx.search.switchSpellingSuggestion = switchSpelling;
			stx.search.suggestionkeyword = sugg;
			if (stx.search.switchSpellingSuggestion == "") {
				stx.search.switchSpellingSuggestion = "0";
			}
			if (stx.search.currentnavtab == "") {
				stx.search.currentnavtab = "nav-tabs-all";
			}
			if (stx.search.start == "") {
				stx.search.start = "0";
			}
			$("#searchPageBox").val(byKeyword);
			stx.search.initLoading = "true";
			stx.search.init();
		}
		if ($("#searchPageBox")[0]) {
			var listener = window.addEventListener;
			var eventType = "load";
			if (!listener) {
				listener = window.attachEvent;
				eventType = "onload";
			}
			listener(eventType, function () {
				$("#searchPageBox").autocomplete({
					source : "/ww/autoSuggest?site=" + gsaSite + "&host=" + gsaURL + "&rcLocaleJS=" + rcLocaleJS,
					select : function (event, item) {
						$("#searchPageBox").val(item.item.value);
						stx.search.keyword = item.item.value;
						stx.search.initLoad = "true";
						stx.search.start = "0";
						stx.search.requiredfields = "";
						stx.search.kbfilter = "";
						stx.search.suggestionkeyword = "";
						History.pushState({
							keyword : stx.search.keyword,
							start : stx.search.start,
							num : stx.search.num,
							relatednum : stx.search.relatednum,
							currentnavtab : stx.search.currentnavtab,
							kbfilter : stx.search.kbfilter,
							suggestionkeyword : stx.search.suggestionkeyword,
							rclocale : stx.search.rclocale,
							requiredfields : stx.search.requiredfields,
							switchSpellingSuggestion : "0"
						}, stx.search.pageTitle, "?keyword=" + stx.search.keyword + "&tab=" + stx.search.currentnavtab + "&start=" + stx.search.start + "&r=" + stx.search.requiredfields + "&kbfilter=" + stx.search.kbfilter + "&sugg=" + "&s=0");
						stx.search.forceHideSuggestionDiv();
					}
				});
			}, false);
		}
	});
}
var initalPageLoad = true;
var loadingTimes = 0;
var countOfKBDiv = 0;
var firstTagFlag = "all";
var showPcFlag = "false";
var showMacFlag = "false";
var showOtherFlag = "false";
var showAllFlag = "false";
function supportPDP(obj) {
	var pdh_marketing_name = $(obj).find("input[name='pdh_marketing_name']").val();
	var pdp_locale = $(obj).find("input[name='pdp_locale']").val();
	var pdp_kb_page_id = $(obj).find("input[name='pdp_kb_page_id']").val();
	var pdp_text_label = $(obj).find("input[name='pdp_text_label']").val();
	var pdp_os = $("#pdp_os").val();
	var pdp_locale = $("#pdp_locale").val();
	var pdp_searchurlprefix = $("#pdp_searchurlprefix").val();
	var pdp_search_client = $("#pdp_search_client").val();
	var pdp_search_lr = $("#pdp_search_lr").val();
	var pdp_requiredfields = "";
	if ($.trim(pdp_os) == "") {
		var pdp_requiredfields = "(pdp_kb:true)" + "." + "(locale:" + pdp_locale + ")";
	} else {
		var pdp_requiredfields = "(pdp_kb:true)" + "." + "(os:" + pdp_os + ")" + "." + "(locale:" + pdp_locale + ")";
	}
	var pdh_marketing_name_array = pdh_marketing_name.split(",");
	if (pdh_marketing_name_array != null && pdh_marketing_name_array.length > 0) {
		pdp_requiredfields = pdp_requiredfields + ".";
		for (var i = 0; i < pdh_marketing_name_array.length; i++) {
			if (i != pdh_marketing_name_array.length - 1) {
				var pdh_marketing_name_val = doubleEncoding(pdh_marketing_name_array[i]);
				pdp_requiredfields = pdp_requiredfields + "(pdh_marketing_name:" + pdh_marketing_name_val + ")" + "|";
			} else {
				var pdh_marketing_name_val = doubleEncoding(pdh_marketing_name_array[i]);
				pdp_requiredfields = pdp_requiredfields + "(pdh_marketing_name:" + pdh_marketing_name_val + ")";
			}
		}
	}
	$.ajax({
		type : "post",
		url : "/ww/universal/display-views/support-pdp-kb-ajax.jsp",
		cache : false,
		timeout : 30000,
		data : {
			"site" : "pdp_kb",
			"start" : "0",
			"num" : "100",
			"client" : pdp_search_client,
			"output" : "xml_no_dtd",
			"ie" : "utf8",
			"oe" : "utf8",
			"tlen" : "100",
			"getfields" : "*",
			"lr" : pdp_search_lr,
			"filter" : "0",
			"sort" : "date:D:L:d1",
			"q" : "",
			"requiredfields" : pdp_requiredfields,
			"rclocale" : pdp_locale,
			"searchUrlPrefix" : pdp_searchurlprefix,
			"maxlength" : "4",
			"textlabel" : pdp_text_label,
			"pageId" : pdp_kb_page_id
		},
		beforeSend : function () {},
		success : function (msg) {
			$("div.support-kb-items.support-pdp." + pdp_kb_page_id + "").html(msg);
			loadingTimes++;
			if ($("#totalRecord" + pdp_kb_page_id + "").val() != "0") {
				collapseArrow();
				initalKBTag(pdp_kb_page_id);
			}
		},
		error : function (jqXHR, textStatus, errorThrown) {
			loadingTimes++;
			$("div.support-kb-items.support-pdp." + pdp_kb_page_id + "").html("<!--" + errorThrown + "-->");
		}
	});
}
$(document).ready(function () {
	$("#pc").click(function (event) {
		event.preventDefault();
		if (!$(this).hasClass("button-teal")) {
			$(this).addClass("button-teal");
			$(this).siblings().removeClass("button-teal");
			changeKB("Microsoft");
		}
	});
	$("#mac").click(function (event) {
		event.preventDefault();
		if (!$(this).hasClass("button-teal")) {
			$(this).addClass("button-teal");
			$(this).siblings().removeClass("button-teal");
			changeKB("Apple");
		}
	});
	$("#all").click(function (event) {
		event.preventDefault();
		if (!$(this).hasClass("button-teal")) {
			$(this).addClass("button-teal");
			$(this).siblings().removeClass("button-teal");
			changeKB("All");
		}
	});
	$("#other").click(function (event) {
		event.preventDefault();
		if (!$(this).hasClass("button-teal")) {
			$(this).addClass("button-teal");
			$(this).siblings().removeClass("button-teal");
			changeKB("Other");
		}
	});
	$(".collapse-toggle").click(function (event) {
		event.preventDefault();
	});
	if ($("div.support-kb-items.support-pdp")[0]) {
		var buttonList = new Array();
		$(".showPcClass").each(function (event) {
			var value = $(this).attr("value");
			if (value == "true") {
				$("#pc").show();
				buttonList.push($("#pc"));
			}
		});
		$(".showMacClass").each(function (event) {
			var value = $(this).attr("value");
			if (value == "true") {
				$("#mac").show();
				buttonList.push($("#mac"));
			}
		});
		$(".showOtherClass").each(function (event) {
			var value = $(this).attr("value");
			if (value == "true") {
				$("#other").show();
				buttonList.push($("#other"));
			}
		});
		$(".showAllClass").each(function (event) {
			var value = $(this).attr("value");
			if (value == "true") {
				$("#all").show();
				buttonList.push($("#all"));
			}
		});
		if (buttonList.length != 0) {
			if (buttonList.length == 1) {
				buttonList[0].addClass("buttonBorder");
			} else {
				if (buttonList[0].attr("id") == buttonList[buttonList.length - 1].attr("id")) {
					buttonList[0].addClass("buttonBorder");
				} else {
					buttonList[0].addClass("buttonBorderFirst");
					buttonList[buttonList.length - 1].addClass("buttonBorderLast");
				}
			}
		}
	}
});
var youtubePrefix = "//www.youtube.com/embed/";
var youtubeParameters = "?modestbranding=1&rel=0&autohide=1";
function changeKB(os) {
	var maxLength = 4;
	$("div.pageId").each(function () {
		var text = $.trim($(this).text());
		var kbJSON = "kbJSON" + text;
		var parentDiv = $("div.support-kb-items.support-pdp." + text).empty();
		var domString = "";
		var jsonResults = kbjsons[kbJSON].results;
		$.each(jsonResults, function (i, items) {
			var jsonOs = items;
			var osValue = jsonOs.os;
			if (os == osValue) {
				var jsonTopics = jsonOs.topic;
				$.each(jsonTopics, function (i, items) {
					var topic = items;
					var topicLabel = topic.label;
					domString += "<h2>" + topicLabel + "</h2>";
					var jsonSubTopics = topic.subtopic;
					domString += '<ul class="support-pdp-list unstyled">';
					$.each(jsonSubTopics, function (i, items) {
						var subtopic = items;
						var subtopicLabel = subtopic.label;
						var links = subtopic.links;
						var viewMoreRandomLink = parseInt(999999 * Math.random());
						var linkSize = links.length;
						var hasViewMore = false;
						$.each(links, function (i, items) {
							var link = items;
							var url = link.url;
							var title = link.title;
							var viewmore_label = link.viewmore_label;
							var featured = link.featured;
							var video = link.video;
							var videoId = link.video_ID;
							var video_expend = link.video_expanded;
							var videoRandom = parseInt(999999 * Math.random());
							if (i > (maxLength - 1)) {
								if (!hasViewMore) {
									hasViewMore = true;
									domString += "<li>";
								}
								if (i == maxLength) {
									domString += '<i class="ss-navigateright"></i>';
									domString += '<div class="support-pdp-list-item clearfix">';
									domString += '<a href="#" class="collapse-toggle collapsed" data-toggle="collapse" data-target="#' + viewMoreRandomLink + '">' + viewmore_label + "</a>";
									domString += "</div>";
									domString += '<div class="collapse-content collapse" id="' + viewMoreRandomLink + '">';
									domString += '<div class="collapse-inner">';
									domString += '<ul class="support-pdp-list unstyled">';
								}
								if (video == "1") {
									domString += "<li>";
									domString += '<i class="ss-video"></i>';
									domString += ' <div class="support-pdp-list-item clearfix">';
									if (video_expend == "1") {
										domString += '<a href="#" class="collapse-toggle" data-toggle="collapse" data-target="#' + videoRandom + '">' + title + "</a>";
									} else {
										domString += '<a href="#" class="collapse-toggle collapsed" data-toggle="collapse" data-target="#' + videoRandom + '">' + title + "</a>";
									}
									if (featured == "1") {
										domString += '<span class="label">Featured</span>';
									}
									domString += "</div>";
									if (video_expend == "1") {
										domString += '<div class="collapse-content in collapse" id="' + videoRandom + '" >';
									} else {
										domString += '<div class="collapse-content collapse" id="' + videoRandom + '" style="height: 0px;">';
									}
									domString += '<div class="collapse-inner">';
									domString += '<div class="video">';
									domString += '<div class="video-wrapper">';
									domString += '<iframe type="text/html" width="640" height="360" src="' + youtubePrefix + videoId + youtubeParameters + '" frameborder="0" allowfullscreen=""></iframe>';
									domString += "</div>";
									domString += "</div>";
									domString += "</div>";
									domString += "</div>";
									domString += "</li>";
								} else {
									if (url.lastIndexOf(".pdf") != -1) {
										domString += "<li>";
										domString += '<i class="ss-file"></i>';
										domString += '<div class="support-pdp-list-item clearfix">';
										domString += '<a href="' + url + '">' + title + "</a> ";
										if (featured == "1") {
											domString += '<span class="label">Featured</span>';
										}
										domString += " </div>";
										domString += "</li>";
									} else {
										domString += "<li>";
										domString += '<div class="support-pdp-list-item clearfix">';
										domString += '<a href="' + url + '">' + title + "</a> ";
										if (featured == "1") {
											domString += '<span class="label">Featured</span>';
										}
										domString += " </div>";
										domString += "</li>";
									}
								}
							} else {
								if (video == "1") {
									domString += "<li>";
									domString += '<i class="ss-video"></i>';
									domString += ' <div class="support-pdp-list-item clearfix">';
									if (video_expend == "1") {
										domString += '<a href="#" class="collapse-toggle" data-toggle="collapse" data-target="#' + videoRandom + '">' + title + "</a>";
									} else {
										domString += '<a href="#" class="collapse-toggle collapsed" data-toggle="collapse" data-target="#' + videoRandom + '">' + title + "</a>";
									}
									if (featured == "1") {
										domString += '<span class="label">Featured</span>';
									}
									domString += "</div>";
									if (video_expend == "1") {
										domString += '<div class="collapse-content in collapse" id="' + videoRandom + '" >';
									} else {
										domString += '<div class="collapse-content collapse" id="' + videoRandom + '" style="height: 0px;">';
									}
									domString += '<div class="collapse-inner">';
									domString += '<div class="video">';
									domString += '<div class="video-wrapper">';
									domString += '<iframe type="text/html" width="640" height="360" src="' + youtubePrefix + videoId + youtubeParameters + '" frameborder="0" allowfullscreen=""></iframe>';
									domString += "</div>";
									domString += "</div>";
									domString += "</div>";
									domString += "</div>";
									domString += "</li>";
								} else {
									if (url.lastIndexOf(".pdf") != -1) {
										domString += "<li>";
										domString += '<i class="ss-file"></i>';
										domString += '<div class="support-pdp-list-item clearfix">';
										domString += '<a href="' + url + '">' + title + "</a> ";
										if (featured == "1") {
											domString += '<span class="label">Featured</span>';
										}
										domString += " </div>";
										domString += "</li>";
									} else {
										domString += "<li>";
										domString += '<div class="support-pdp-list-item clearfix">';
										domString += '<a href="' + url + '">' + title + "</a> ";
										if (featured == "1") {
											domString += '<span class="label">Featured</span>';
										}
										domString += " </div>";
										domString += "</li>";
									}
								}
							}
						});
						if (hasViewMore) {
							domString += "</ul>";
							domString += "</div>";
							domString += "</div>";
							domString += "</li>";
						}
					});
					domString += "</ul>";
				});
			}
		});
		parentDiv.append(domString);
	});
	$(".collapse-toggle").click(function (e) {
		e.preventDefault();
	});
}
function changeButtonColor(currentOS) {
	if (currentOS == undefined) {
		$(".button.support.pdp.kb.tag").each(function (event) {
			var currentTagVal = $(this).val();
			if ((currentTagVal.toUpperCase() == firstTagFlag.toUpperCase()) && (currentTagVal.toUpperCase() == "ALL")) {
				$(this).addClass("button-teal");
			} else {
				$(this).removeClass("button-teal");
			}
		});
	} else {
		$(".button.support.pdp.kb.tag").each(function (event) {
			if ($(this).val().toUpperCase() == currentOS.toUpperCase()) {
				$(this).addClass("button-teal");
			} else {
				$(this).removeClass("button-teal");
			}
		});
	}
}
function initalKBTag(pageId) {
	if ($("#firstTagFlag_").val() != "all") {
		$("#firstTagFlag_").val($("#firstTagFlag" + pageId + "").val());
		firstTagFlag = $("#firstTagFlag_").val();
	}
	if ($("#showPcFlag_").val() == "false") {
		$("#showPcFlag_").val($("#showPcFlag" + pageId + "").val());
		showPcFlag = $("#showPcFlag_").val();
	}
	if ($("#showMacFlag_").val() == "false") {
		$("#showMacFlag_").val($("#showMacFlag" + pageId + "").val());
		showMacFlag = $("#showMacFlag_").val();
	}
	if ($("#showOtherFlag_").val() == "false") {
		$("#showOtherFlag_").val($("#showOtherFlag" + pageId + "").val());
		showOtherFlag = $("#showOtherFlag_").val();
	}
	if ($("#showAllFlag_").val() == "false") {
		$("#showAllFlag_").val($("#showAllFlag" + pageId + "").val());
		showAllFlag = $("#showAllFlag_").val();
	}
	if (showPcFlag == "true") {
		$("#pc").show();
	}
	if (showMacFlag == "true") {
		$("#mac").show();
	}
	if (showOtherFlag == "true") {
		$("#other").show();
	}
	if (showAllFlag == "true") {
		$("#all").show();
	}
	if (loadingTimes == countOfKBDiv) {
		changeButtonColor();
	}
}
$.extend({
	getUrlVars : function () {
		var vars = [],
		hash;
		var hashes = window.location.href.slice(window.location.href.lastIndexOf("?") + 1).split("&");
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split("=");
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar : function (name) {
		var value = $.getUrlVars()[name];
		if (value == undefined) {
			value = "";
		}
		return value;
	}
});
$(document).ready(function () {
	if ($("#pdhtitle")[0]) {
		var allVars = $.getUrlVars();
		var q = $.getUrlVar("q");
		if (q != "") {
			$.ajax({
				type : "post",
				url : "/ww/jsp/support/productDetails/pdhtitleajax.jsp",
				cache : false,
				timeout : 30000,
				data : {
					"searchURLPrefix" : pdh_data.searchURLPrefix,
					"site" : pdh_data.site,
					"locale" : pdh_data.locale,
					"start" : pdh_data.start,
					"num" : pdh_data.num,
					"client" : pdh_data.client,
					"ie" : pdh_data.ie,
					"oe" : pdh_data.oe,
					"tlen" : pdh_data.tlen,
					"getfields" : pdh_data.getfields,
					"lr" : pdh_data.lr,
					"filter" : pdh_data.filter,
					"sort" : pdh_data.sort,
					"requiredfields" : pdh_data.requiredfields,
					"output" : pdh_data.output,
					"q" : q
				},
				beforeSend : function () {},
				success : function (msg) {
					$("#pdhtitle").html(msg);
					var pdh_type = $("#pdh_type").text();
					var pdh_title = $("#pdh_title").html();
					$("#pdhtitle").html(pdh_title);
					$("html head").find("title").html(pdh_title);
				},
				error : function (jqXHR, textStatus, errorThrown) {
					$("#pdhtitle").html("<!--" + errorThrown + "-->");
				}
			});
		}
	}
	if ($("#support-search-textbox")[0]) {
		$("#support-search-textbox").autocomplete({
			source : "//" + serverHost + "/ww/autoSuggest?site=" + gsaSite + "&host=" + gsaURL + "&rcLocaleJS=" + rcLocaleJS,
			select : function (event, item) {
				$("#support-search-textbox").val(item.item.value);
				submitSearch_supportSearchBox();
			}
		});
	}
});
function submitSearch_supportSearchBox(defaultStr) {
	var qv = document.getElementById("support-search-textbox").value;
	if (($.trim(qv)).length >= 1 && qv != defaultStr) {
		var n = rcLocaleJS.split("-");
		var localeURL = "/" + n[1] + "/" + n[0];
		if (rcLocaleJS == "en-us") {
			localeURL = "";
		}
		window.location.href = "//" + serverHost + localeURL + "/search/?tab=nav-tabs-sp&keyword=" + encoding(qv);
		return false;
	} else {
		return false;
	}
}
function checkDefaultText(value) {
	if (value == defaultStr) {
		$("#support-search-textbox").val("");
		return;
	}
	if (value == "" || value == null) {
		$("#support-search-textbox").val(defaultStr);
		return;
	}
}
function collapseArrow() {
	$(".collapse-toggle").click(function (e) {
		e.preventDefault();
	});
	if ($('.collapse-toggle[data-toggle="collapse"]').length > 0) {
		var togglers = $('.collapse-toggle[data-toggle="collapse"]');
		togglers.each(function () {
			var collapseToggle = $(this);
			var collapseIcon = $(this).parent().siblings("i");
			var collapseData = $(collapseToggle.data("target"));
			var collapseDataSub = $(collapseData).find(".collapse-content");
			if (collapseIcon.hasClass("ss-navigateright") || collapseIcon.hasClass("ss-navigatedown")) {
				collapseData.on("hide", function () {
					collapseIcon.attr("class", "ss-navigateright");
				}).on("show", function () {
					collapseIcon.attr("class", "ss-navigatedown");
				});
				collapseDataSub.on("show, hide", function (e) {
					e.stopPropagation();
				});
			}
		});
	}
}
function createResellerLinks() {
	var RGID = getRGID(rcLocaleJS, "embed");
	$(".ciModelNumber").each(function (index) {
		var sku = $(this).text();
		$.getScript("http://seagate.links.channelintelligence.com/scripts/cii_CBL_DataService.asp?sSKU=" + sku + "&nRGID=" + RGID, function () {
			var ciButtonScript = "cii_ShowCBLButton('" + sku + "', oCIIPrimaryLink, oCIIAlternateLink, " + index + ", '" + RGID + "', CI_LinkID);";
			var ciButtonScriptOutput = eval(ciButtonScript);
			if (ciButtonScriptOutput.length > 0) {
				var ciButtonHTML = "";
				for (var i = 0; i < 3; i++) {
					if (i === 2) {
						ciButtonScriptOutput[i] = ciButtonScriptOutput[i].replace(">", ' class="button button-orange button-s">');
					}
					ciButtonHTML += ciButtonScriptOutput[i];
				}
				ciButtonHTML += labels.buy_now + "</a>";
				$(".ciModelNumber:contains(" + sku + ")").parents(".pdp-related-products-price").html(ciButtonHTML);
			}
		});
	});
}
function getRGID(locale, type) {
	if (!locale) {
		return null;
	} else {
		for (var i = 0; i < ciLocaleMap.locales.length; i++) {
			if (typeof(ciLocaleMap.locales[i]) != "undefined" && ciLocaleMap.locales[i].name.indexOf(locale) != -1) {
				if (type.indexOf("xml") != -1) {
					return ciLocaleMap.locales[i].xml;
				} else {
					if (type.indexOf("embed") != -1) {
						return ciLocaleMap.locales[i].embed;
					} else {
						return null;
					}
				}
			}
		}
	}
}
function submitSupportPDPSearchFormPromo() {
	var searchMsg = document.getElementById("searchMSG").value;
	var qv = document.getElementById("suggestion_form_support_pdp").q.value;
	var prodName = document.getElementById("suggestion_form_support_pdp").productName.value;
	if (!qv || !($.trim(qv)) || qv == searchMsg || qv == "") {
		return false;
	} else {
		var n = rcLocaleJS.split("-");
		var localeURL = "/" + n[1] + "/" + n[0];
		if (rcLocaleJS == "en-us") {
			localeURL = "";
		}
		var qvWithProdName = prodName + " " + encoding(qv);
		window.location.href = "//" + serverHost + localeURL + "/search/?keyword=" + qvWithProdName + "&tab=nav-tabs-kb&start=0&r=&kbfilter=&sugg=&s=1";
		return false;
	}
}
function doubleEncoding(source) {
	var target = source;
	target = encodeURI(target);
	target = encodeURI(target);
	target = target.replace(/\!/g, "%2521");
	target = target.replace(/\#/g, "%2523");
	target = target.replace(/\\$/g, "%2524");
	target = target.replace(/\&/g, "%2526");
	target = target.replace(/\'/g, "%2527");
	target = target.replace(/\(/g, "%2528");
	target = target.replace(/\)/g, "%2529");
	target = target.replace(/\*/g, "%252B");
	target = target.replace(/\+/g, "%252B");
	target = target.replace(/\,/g, "%252C");
	target = target.replace(/\-/g, "%252D");
	target = target.replace(/\./g, "%252E");
	target = target.replace(/\//g, "%252F");
	target = target.replace(/\:/g, "%253A");
	target = target.replace(/\;/g, "%253B");
	target = target.replace(/\=/g, "%253D");
	target = target.replace(/\?/g, "%253F");
	target = target.replace(/\@/g, "%2540");
	target = target.replace(/\_/g, "%255F");
	target = target.replace(/\~/g, "%257E");
	return target;
}
if (/(MSIE [7-9]\.|Opera.*Version\/(10\.[5-9]|(11|12)\.)|Chrome\/([1-9]|10)\.|Version\/[2-4][\.0-9]+ Safari\/|Version\/(4\.0\.[4-9]|4\.[1-9]|5\.0)[\.0-9]+? Mobile\/.*Safari\/|Android [1-2]\.|BlackBerry.*WebKit)/.test(navigator.userAgent) && !/(IEMobile)/.test(navigator.userAgent)) {
	var ss_set = {
		"notifications disabled" : "\uD83D\uDD15",
		"notification disabled" : "\uD83D\uDD15",
		"notificationsdisabled" : "\uD83D\uDD15",
		"notificationdisabled" : "\uD83D\uDD15",
		"telephone disabled" : "\uE300",
		"telephonedisabled" : "\uE300",
		"writing disabled" : "\uE071",
		"remove calendar" : "\uF071",
		"calendar remove" : "\uF071",
		"calendar delete" : "\uF073",
		"writingdisabled" : "\uE071",
		"delete calendar" : "\uF073",
		"pencil disabled" : "\uE071",
		"calendarremove" : "\uF071",
		"phone disabled" : "\uE300",
		"check calendar" : "\uF072",
		"navigate right" : "\u25BB",
		"pencildisabled" : "\uE071",
		"removecalendar" : "\uF071",
		"calendar check" : "\uF072",
		"deletecalendar" : "\uF073",
		"download cloud" : "\uEB00",
		"battery medium" : "\uEA11",
		"calendardelete" : "\uF073",
		"cloud download" : "\uEB00",
		"medium battery" : "\uEA11",
		"ellipsis chat" : "\uE399",
		"mediumbattery" : "\uEA11",
		"bell disabled" : "\uD83D\uDD15",
		"clouddownload" : "\uEB00",
		"shopping cart" : "\uE500",
		"calendarcheck" : "\uF072",
		"phonedisabled" : "\uE300",
		"female avatar" : "\uD83D\uDC67",
		"notifications" : "\uD83D\uDD14",
		"call disabled" : "\uE300",
		"battery empty" : "\uEA13",
		"navigateright" : "\u25BB",
		"empty battery" : "\uEA13",
		"batterymedium" : "\uEA11",
		"checkcalendar" : "\uF072",
		"navigate down" : "\uF501",
		"navigate left" : "\u25C5",
		"downloadcloud" : "\uEB00",
		"navigateleft" : "\u25C5",
		"ellipsischat" : "\uE399",
		"navigatedown" : "\uF501",
		"batteryempty" : "\uEA13",
		"battery high" : "\uEA10",
		"notification" : "\uD83D\uDD14",
		"battery full" : "\uD83D\uDD0B",
		"calldisabled" : "\uE300",
		"femaleavatar" : "\uD83D\uDC67",
		"rotate right" : "\u21BB",
		"calendar add" : "\uF070",
		"high battery" : "\uEA10",
		"emptybattery" : "\uEA13",
		"cloud upload" : "\uEB40",
		"direct right" : "\u25B9",
		"full battery" : "\uD83D\uDD0B",
		"add calendar" : "\uF070",
		"upload cloud" : "\uEB40",
		"belldisabled" : "\uD83D\uDD15",
		"fast forward" : "\u23E9",
		"skip forward" : "\u23ED",
		"mobile phone" : "\uD83D\uDCF1",
		"shoppingcart" : "\uE500",
		"direct left" : "\u25C3",
		"low battery" : "\uEA12",
		"skipforward" : "\u23ED",
		"rotateright" : "\u21BB",
		"male avatar" : "\uD83D\uDC64",
		"direct down" : "\u25BE",
		"videocamera" : "\uD83D\uDCF9",
		"female user" : "\uD83D\uDC67",
		"information" : "\u2139",
		"thumbs down" : "\uD83D\uDC4E",
		"photographs" : "\uD83C\uDF04",
		"calendaradd" : "\uF070",
		"rotate left" : "\u21BA",
		"high volume" : "\uD83D\uDD0A",
		"batteryhigh" : "\uEA10",
		"credit card" : "\uD83D\uDCB3",
		"batteryfull" : "\uD83D\uDD0B",
		"navigate up" : "\uF500",
		"dollar sign" : "\uD83D\uDCB2",
		"fastforward" : "\u23E9",
		"mobilephone" : "\uD83D\uDCF1",
		"battery low" : "\uEA12",
		"addcalendar" : "\uF070",
		"fullbattery" : "\uD83D\uDD0B",
		"uploadcloud" : "\uEB40",
		"delete date" : "\uF073",
		"remove date" : "\uF071",
		"volume high" : "\uD83D\uDD0A",
		"directright" : "\u25B9",
		"cloudupload" : "\uEB40",
		"highbattery" : "\uEA10",
		"navigation" : "\uE670",
		"smartphone" : "\uD83D\uDCF1",
		"screenshot" : "\u2316",
		"dollarsign" : "\uD83D\uDCB2",
		"creditcard" : "\uD83D\uDCB3",
		"hard drive" : "\uE7B0",
		"femaleuser" : "\uD83D\uDC67",
		"maleavatar" : "\uD83D\uDC64",
		"removedate" : "\uF071",
		"microphone" : "\uD83C\uDFA4",
		"low volume" : "\uD83D\uDD09",
		"volume low" : "\uD83D\uDD09",
		"highvolume" : "\uD83D\uDD0A",
		"check date" : "\uF072",
		"volumehigh" : "\uD83D\uDD0A",
		"deletedate" : "\uF073",
		"cell phone" : "\uD83D\uDCF1",
		"directions" : "\uE672",
		"photograph" : "\uD83C\uDF04",
		"half heart" : "\uE1A0",
		"thumbsdown" : "\uD83D\uDC4E",
		"disapprove" : "\uD83D\uDC4E",
		"lowbattery" : "\uEA12",
		"down right" : "\u2B0A",
		"batterylow" : "\uEA12",
		"thumbnails" : "\uE9A3",
		"navigateup" : "\uF500",
		"attachment" : "\uD83D\uDCCE",
		"visibility" : "\uD83D\uDC40",
		"pull quote" : "\u201C",
		"descending" : "\u25BE",
		"directdown" : "\u25BE",
		"directleft" : "\u25C3",
		"connection" : "\uEB85",
		"rotateleft" : "\u21BA",
		"eyedropper" : "\uE200",
		"volumelow" : "\uD83D\uDD09",
		"stopwatch" : "\u23F1",
		"warehouse" : "\uE602",
		"paperclip" : "\uD83D\uDCCE",
		"backspace" : "\u232B",
		"ascending" : "\u25B4",
		"half star" : "\uE1A1",
		"cellphone" : "\uD83D\uDCF1",
		"lightbulb" : "\uD83D\uDCA1",
		"thumbs up" : "\uD83D\uDC4D",
		"down left" : "\u2B0B",
		"newspaper" : "\uD83D\uDCF0",
		"direct up" : "\u25B4",
		"checkdate" : "\uF072",
		"halfheart" : "\uE1A0",
		"bar chart" : "\uD83D\uDCCA",
		"harddrive" : "\uE7B0",
		"male user" : "\uD83D\uDC64",
		"pie chart" : "\uE570",
		"downright" : "\u2B0A",
		"skip back" : "\u23EE",
		"musicnote" : "\u266B",
		"dashboard" : "\uF000",
		"briefcase" : "\uD83D\uDCBC",
		"pullquote" : "\u201C",
		"telephone" : "\uD83D\uDCDE",
		"checkmark" : "\u2713",
		"lowvolume" : "\uD83D\uDD09",
		"buildings" : "\uD83C\uDFE2",
		"crosshair" : "\u2316",
		"open book" : "\uD83D\uDCD6",
		"add date" : "\uF070",
		"notebook" : "\uD83D\uDCD3",
		"document" : "\uD83D\uDCC4",
		"skipback" : "\u23EE",
		"typeface" : "\uED01",
		"transfer" : "\u21C6",
		"redirect" : "\u21AA",
		"computer" : "\uD83D\uDCBB",
		"contract" : "\uEE01",
		"question" : "\u2753",
		"sign out" : "\uEE02",
		"download" : "\uEB01",
		"pictures" : "\uD83C\uDF04",
		"subtract" : "\u002D",
		"settings" : "\u2699",
		"database" : "\uE7A0",
		"location" : "\uE6D0",
		"signpost" : "\uE672",
		"navigate" : "\uE670",
		"calendar" : "\uD83D\uDCC5",
		"barchart" : "\uD83D\uDCCA",
		"openbook" : "\uD83D\uDCD6",
		"maleuser" : "\uD83D\uDC64",
		"ellipsis" : "\u2026",
		"envelope" : "\u2709",
		"facetime" : "\uE320",
		"end call" : "\uE300",
		"halfstar" : "\uE1A1",
		"favorite" : "\u22C6",
		"thumbsup" : "\uD83D\uDC4D",
		"up right" : "\u2B08",
		"bookmark" : "\uD83D\uDD16",
		"keywords" : "\uE100",
		"downleft" : "\u2B0B",
		"trashcan" : "\uE0D0",
		"insecure" : "\uD83D\uDD13",
		"unlocked" : "\uD83D\uDD13",
		"previous" : "\u25C5",
		"directup" : "\u25B4",
		"zoom out" : "\uE003",
		"dropdown" : "\u25BE",
		"piechart" : "\uE570",
		"caution" : "\u26D4",
		"desktop" : "\uD83D\uDCBB",
		"zoom in" : "\uE002",
		"display" : "\uD83D\uDCBB",
		"monitor" : "\uD83D\uDCBB",
		"windows" : "\uE202",
		"warning" : "\u26A0",
		"descend" : "\u25BE",
		"package" : "\uD83D\uDCE6",
		"upright" : "\u2B08",
		"droplet" : "\uD83D\uDCA7",
		"keyword" : "\uE100",
		"printer" : "\u2399",
		"private" : "\uD83D\uDD12",
		"avatars" : "\uD83D\uDC65",
		"dictate" : "\uD83C\uDFA4",
		"battery" : "\uD83D\uDD0B",
		"zoomout" : "\uE003",
		"checked" : "\u2713",
		"speaker" : "\uD83D\uDD08",
		"comment" : "\uD83D\uDCAC",
		"forward" : "\u27A1",
		"up left" : "\u2B09",
		"approve" : "\uD83D\uDC4D",
		"endcall" : "\uE300",
		"compass" : "\uE671",
		"retweet" : "\uF600",
		"loading" : "\uEB83",
		"shuffle" : "\uD83D\uDD00",
		"syncing" : "\uEB82",
		"visible" : "\uD83D\uDC40",
		"airplay" : "\uE800",
		"adddate" : "\uF070",
		"picture" : "\uD83C\uDF04",
		"dislike" : "\uD83D\uDC4E",
		"compose" : "\uD83D\uDCDD",
		"refresh" : "\u21BB",
		"columns" : "\uE9A2",
		"signout" : "\uEE02",
		"log out" : "\uEE02",
		"target" : "\u25CE",
		"cursor" : "\uE001",
		"search" : "\uD83D\uDD0E",
		"zoomin" : "\uE002",
		"tablet" : "\uEA01",
		"laptop" : "\uEA00",
		"funnel" : "\uE9B0",
		"upload" : "\uEB41",
		"attach" : "\uD83D\uDCCE",
		"filter" : "\uE9B0",
		"pencil" : "\u270E",
		"ascend" : "\u25B4",
		"eraser" : "\u2710",
		"locked" : "\uD83D\uDD12",
		"secure" : "\uD83D\uDD12",
		"unlock" : "\uD83D\uDD13",
		"replay" : "\u21BA",
		"public" : "\uD83D\uDD13",
		"repeat" : "\uD83D\uDD01",
		"folder" : "\uD83D\uDCC1",
		"upleft" : "\u2B09",
		"iphone" : "\uD83D\uDCF1",
		"tagged" : "\uE100",
		"rewind" : "\u23EA",
		"record" : "\u25CF",
		"layout" : "\uEDA0",
		"action" : "\uEE00",
		"expand" : "\u2922",
		"sample" : "\uE200",
		"layers" : "\uE202",
		"videos" : "\uD83D\uDCF9",
		"photos" : "\uD83C\uDF04",
		"stroke" : "\uE241",
		"logout" : "\uEE02",
		"images" : "\uD83C\uDF04",
		"hyphen" : "\u002D",
		"remove" : "\u002D",
		"camera" : "\uD83D\uDCF7",
		"volume" : "\uD83D\uDD08",
		"delete" : "\u2421",
		"avatar" : "\uD83D\uDC64",
		"locate" : "\uE670",
		"mobile" : "\uD83D\uDCF1",
		"pause" : "\uE8A0",
		"zelda" : "\uE1A0",
		"write" : "\u270E",
		"nodes" : "\uEB85",
		"merge" : "\uEB81",
		"alert" : "\u26A0",
		"video" : "\uD83D\uDCF9",
		"world" : "\uD83C\uDF0E",
		"print" : "\u2399",
		"trash" : "\uE0D0",
		"photo" : "\uD83C\uDF04",
		"right" : "\u27A1",
		"image" : "\uD83C\uDF04",
		"phone" : "\uD83D\uDCDE",
		"reply" : "\u21A9",
		"heart" : "\u2665",
		"minus" : "\u002D",
		"erase" : "\u2710",
		"quote" : "\u201C",
		"check" : "\u2713",
		"sound" : "\uD83D\uDD08",
		"flask" : "\uF4C0",
		"share" : "\uEE00",
		"close" : "\u2421",
		"email" : "\u2709",
		"inbox" : "\uD83D\uDCE5",
		"visit" : "\uEE00",
		"audio" : "\u266B",
		"music" : "\u266B",
		"users" : "\uD83D\uDC65",
		"price" : "\uD83D\uDCB2",
		"house" : "\u2302",
		"timer" : "\u23F1",
		"cloud" : "\u2601",
		"eject" : "\u23CF",
		"earth" : "\uD83C\uDF0E",
		"globe" : "\uD83C\uDF0E",
		"clock" : "\u23F2",
		"list" : "\uED50",
		"time" : "\u23F2",
		"cell" : "\uD83D\uDCF1",
		"zoom" : "\uE002",
		"date" : "\uD83D\uDCC5",
		"home" : "\u2302",
		"ipad" : "\uEA01",
		"bell" : "\uD83D\uDD14",
		"cost" : "\uD83D\uDCB2",
		"cart" : "\uE500",
		"view" : "\uD83D\uDC40",
		"gear" : "\u2699",
		"user" : "\uD83D\uDC64",
		"talk" : "\uD83D\uDCAC",
		"chat" : "\uD83D\uDCAC",
		"look" : "\uD83D\uDC40",
		"fork" : "\uEB80",
		"mail" : "\u2709",
		"send" : "\uE350",
		"link" : "\uD83D\uDD17",
		"move" : "\uE070",
		"call" : "\uD83D\uDCDE",
		"plus" : "\u002B",
		"exit" : "\uEE02",
		"fill" : "\uE240",
		"info" : "\u2139",
		"crop" : "\uE201",
		"play" : "\u25B6",
		"star" : "\u22C6",
		"help" : "\u2753",
		"work" : "\uD83D\uDCBC",
		"stop" : "\u25A0",
		"drop" : "\uD83D\uDCA7",
		"love" : "\u2665",
		"edit" : "\u270E",
		"rows" : "\uE9A1",
		"city" : "\uD83C\uDFE2",
		"like" : "\uD83D\uDC4D",
		"redo" : "\u21BB",
		"flag" : "\u2691",
		"font" : "\uED01",
		"tags" : "\uE100",
		"down" : "\u2B07",
		"grid" : "\uE9A0",
		"text" : "\uED00",
		"left" : "\u2B05",
		"back" : "\u2B05",
		"skip" : "\u23ED",
		"page" : "\uD83D\uDCC4",
		"news" : "\uD83D\uDCF0",
		"sync" : "\uEB82",
		"file" : "\uD83D\uDCC4",
		"wifi" : "\uEB84",
		"next" : "\u25BB",
		"undo" : "\u21BA",
		"book" : "\uD83D\uDCD5",
		"lock" : "\uD83D\uDD12",
		"idea" : "\uD83D\uDCA1",
		"key" : "\uD83D\uDD11",
		"tag" : "\uE100",
		"fax" : "\uD83D\uDCE0",
		"map" : "\uE673",
		"out" : "\uEE00",
		"rss" : "\uE310",
		"add" : "\u002B",
		"ban" : "\uD83D\uDEAB",
		"cog" : "\u2699",
		"eye" : "\uD83D\uDC40",
		"hdd" : "\uE7B0",
		"box" : "\uD83D\uDCE6",
		"pin" : "\uD83D\uDCCD",
		"mic" : "\uD83C\uDFA4",
		"up" : "\u2B06"
	};
	if (typeof ss_icons !== "object" || typeof ss_icons !== "object") {
		var ss_icons = ss_set;
		var ss_keywords = [];
		for (var i in ss_set) {
			ss_keywords.push(i);
		}
	} else {
		for (var i in ss_set) {
			ss_icons[i] = ss_set[i];
			ss_keywords.push(i);
		}
	}
	if (typeof ss_legacy !== "function") {
		!function (a, b) {
			typeof module != "undefined" ? module.exports = b() : typeof define == "function" && typeof define.amd == "object" ? define(b) : this[a] = b();
		}
		("ss_ready", function (a) {
			function m(a) {
				l = 1;
				while (a = b.shift()) {
					a();
				}
			}
			var b = [],
			c,
			d = !1,
			e = document,
			f = e.documentElement,
			g = f.doScroll,
			h = "DOMContentLoaded",
			i = "addEventListener",
			j = "onreadystatechange",
			k = "readyState",
			l = /^loade|c/.test(e[k]);
			return e[i] && e[i](h, c = function () {
				e.removeEventListener(h, c, d),
				m();
			}, d),
			g && e.attachEvent(j, c = function () {
				/^c/.test(e[k]) && (e.detachEvent(j, c), m());
			}),
			a = g ? function (c) {
				self != top ? l ? c() : b.push(c) : function () {
					try {
						f.doScroll("left");
					} catch (b) {
						return setTimeout(function () {
							a(c);
						}, 50);
					}
					c();
				}
				();
			}
			 : function (a) {
				l ? a() : b.push(a);
			};
		});
		var ss_legacy = function (node) {
			if (!node instanceof Object) {
				return false;
			}
			if (node.length) {
				for (var i = 0; i < node.length; i++) {
					ss_legacy(node[i]);
				}
				return;
			}
			if (node.value) {
				node.value = ss_liga(node.value);
			} else {
				if (node.nodeValue) {
					node.nodeValue = ss_liga(node.nodeValue);
				} else {
					if (node.innerHTML) {
						node.innerHTML = ss_liga(node.innerHTML);
					}
				}
			}
		};
		var ss_getElementsByClassName = function (node, classname) {
			if (document.querySelectorAll) {
				return document.querySelectorAll("." + classname);
			}
			var a = [];
			var re = new RegExp("(^| )" + classname + "( |$)");
			var els = node.getElementsByTagName("*");
			for (var i = 0, j = els.length; i < j; i++) {
				if (re.test(els[i].className)) {
					a.push(els[i]);
				}
			}
			return a;
		};
		var ss_liga = function (that) {
			var re = new RegExp(ss_keywords.join("|").replace(/[-[\]{}()*+?.,\\^$#\s]/g, "\\$&"), "gi");
			return that.replace(re, function (v) {
				return ss_icons[v.toLowerCase()];
			});
		};
		ss_ready(function () {
			if (document.getElementsByClassName) {
				ss_legacy(document.getElementsByClassName("ss-icon"));
			} else {
				ss_legacy(ss_getElementsByClassName(document.body, "ss-icon"));
			}
		});
	}
}
