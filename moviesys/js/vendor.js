/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/liuge/Workspace/moviesys/dist/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(11);
	__webpack_require__(13);
	__webpack_require__(14);
	
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["jQuery"] = __webpack_require__(5);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["$"] = __webpack_require__(6);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.12.3 | (c) jQuery Foundation | jquery.org/license */
	!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="1.12.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(!l.ownFirst)for(b in a)return k.call(a,b);for(b in a);return void 0===b||k.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(h)return h.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=e.call(arguments,2),d=function(){return a.apply(b||this,c.concat(e.call(arguments)))},d.guid=a.guid=a.guid||n.guid++,d):void 0},now:function(){return+new Date},support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}if(f=d.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return A.find(a);this.length=1,this[0]=f}return this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||(e=n.uniqueSort(e)),D.test(a)&&(e=e.reverse())),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=!0,c||j.disable(),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.addEventListener?(d.removeEventListener("DOMContentLoaded",K),a.removeEventListener("load",K)):(d.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(d.addEventListener||"load"===a.event.type||"complete"===d.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll)a.setTimeout(n.ready);else if(d.addEventListener)d.addEventListener("DOMContentLoaded",K),a.addEventListener("load",K);else{d.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&d.documentElement}catch(e){}c&&c.doScroll&&!function f(){if(!n.isReady){try{c.doScroll("left")}catch(b){return a.setTimeout(f,50)}J(),n.ready()}}()}return I.promise(b)},n.ready.promise();var L;for(L in n(l))break;l.ownFirst="0"===L,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c,e;c=d.getElementsByTagName("body")[0],c&&c.style&&(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",l.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(e))}),function(){var a=d.createElement("div");l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}a=null}();var M=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b},N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0;
	}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(M(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),"object"!=typeof b&&"function"!=typeof b||(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function S(a,b,c){if(M(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=void 0)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}}),function(){var a;l.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,e;return c=d.getElementsByTagName("body")[0],c&&c.style?(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(d.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(e),a):void 0}}();var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),V=["Top","Right","Bottom","Left"],W=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function X(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&U.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var Y=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)Y(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Z=/^(?:checkbox|radio)$/i,$=/<([\w:-]+)/,_=/^$|\/(?:java|ecma)script/i,aa=/^\s+/,ba="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a){var b=ba.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}!function(){var a=d.createElement("div"),b=d.createDocumentFragment(),c=d.createElement("input");a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l.leadingWhitespace=3===a.firstChild.nodeType,l.tbody=!a.getElementsByTagName("tbody").length,l.htmlSerialize=!!a.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==d.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,b.appendChild(c),l.appendChecked=c.checked,a.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!a.cloneNode(!0).lastChild.defaultValue,b.appendChild(a),c=d.createElement("input"),c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),a.appendChild(c),l.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!!a.addEventListener,a[n.expando]=1,l.attributes=!a.getAttribute(n.expando)}();var da={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};da.optgroup=da.option,da.tbody=da.tfoot=da.colgroup=da.caption=da.thead,da.th=da.td;function ea(a,b){var c,d,e=0,f="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ea(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function fa(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}var ga=/<|&#?\w+;/,ha=/<tbody/i;function ia(a){Z.test(a.type)&&(a.defaultChecked=a.checked)}function ja(a,b,c,d,e){for(var f,g,h,i,j,k,m,o=a.length,p=ca(b),q=[],r=0;o>r;r++)if(g=a[r],g||0===g)if("object"===n.type(g))n.merge(q,g.nodeType?[g]:g);else if(ga.test(g)){i=i||p.appendChild(b.createElement("div")),j=($.exec(g)||["",""])[1].toLowerCase(),m=da[j]||da._default,i.innerHTML=m[1]+n.htmlPrefilter(g)+m[2],f=m[0];while(f--)i=i.lastChild;if(!l.leadingWhitespace&&aa.test(g)&&q.push(b.createTextNode(aa.exec(g)[0])),!l.tbody){g="table"!==j||ha.test(g)?"<table>"!==m[1]||ha.test(g)?0:i:i.firstChild,f=g&&g.childNodes.length;while(f--)n.nodeName(k=g.childNodes[f],"tbody")&&!k.childNodes.length&&g.removeChild(k)}n.merge(q,i.childNodes),i.textContent="";while(i.firstChild)i.removeChild(i.firstChild);i=p.lastChild}else q.push(b.createTextNode(g));i&&p.removeChild(i),l.appendChecked||n.grep(ea(q,"input"),ia),r=0;while(g=q[r++])if(d&&n.inArray(g,d)>-1)e&&e.push(g);else if(h=n.contains(g.ownerDocument,g),i=ea(p.appendChild(g),"script"),h&&fa(i),c){f=0;while(g=i[f++])_.test(g.type||"")&&c.push(g)}return i=null,p}!function(){var b,c,e=d.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b]=c in a)||(e.setAttribute(c,"t"),l[b]=e.attributes[c].expando===!1);e=null}();var ka=/^(?:input|select|textarea)$/i,la=/^key/,ma=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,na=/^(?:focusinfocus|focusoutblur)$/,oa=/^([^.]*)(?:\.(.+)|)/;function pa(){return!0}function qa(){return!1}function ra(){try{return d.activeElement}catch(a){}}function sa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)sa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=qa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return"undefined"==typeof n||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(G)||[""],h=b.length;while(h--)f=oa.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=oa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(i=m=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!na.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),h=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),l=n.event.special[q]||{},f||!l.trigger||l.trigger.apply(e,c)!==!1)){if(!f&&!l.noBubble&&!n.isWindow(e)){for(j=l.delegateType||q,na.test(j+q)||(i=i.parentNode);i;i=i.parentNode)p.push(i),m=i;m===(e.ownerDocument||d)&&p.push(m.defaultView||m.parentWindow||a)}o=0;while((i=p[o++])&&!b.isPropagationStopped())b.type=o>1?j:l.bindType||q,g=(n._data(i,"events")||{})[b.type]&&n._data(i,"handle"),g&&g.apply(i,c),g=h&&i[h],g&&g.apply&&M(i)&&(b.result=g.apply(i,c),b.result===!1&&b.preventDefault());if(b.type=q,!f&&!b.isDefaultPrevented()&&(!l._default||l._default.apply(p.pop(),c)===!1)&&M(e)&&h&&e[q]&&!n.isWindow(e)){m=e[h],m&&(e[h]=null),n.event.triggered=q;try{e[q]()}catch(s){}n.event.triggered=void 0,m&&(e[h]=m)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ma.test(f)?this.mouseHooks:la.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=g.srcElement||d),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,h.filter?h.filter(a,g):a},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button,h=b.fromElement;return null==a.pageX&&null!=b.clientX&&(e=a.target.ownerDocument||d,f=e.documentElement,c=e.body,a.pageX=b.clientX+(f&&f.scrollLeft||c&&c.scrollLeft||0)-(f&&f.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(f&&f.scrollTop||c&&c.scrollTop||0)-(f&&f.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?b.toElement:h),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ra()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ra()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=d.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?pa:qa):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:qa,isPropagationStopped:qa,isImmediatePropagationStopped:qa,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=pa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=pa,a&&!this.isSimulated&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=pa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submit||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?n.prop(b,"form"):void 0;c&&!n._data(c,"submit")&&(n.event.add(c,"submit._submit",function(a){a._submitBubble=!0}),n._data(c,"submit",!0))})},postDispatch:function(a){a._submitBubble&&(delete a._submitBubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.change||(n.event.special.change={setup:function(){return ka.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._justChanged=!0)}),n.event.add(this,"click._change",function(a){this._justChanged&&!a.isTrigger&&(this._justChanged=!1),n.event.simulate("change",this,a)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;ka.test(b.nodeName)&&!n._data(b,"change")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a)}),n._data(b,"change",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!ka.test(this.nodeName)}}),l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d){return sa(this,a,b,c,d)},one:function(a,b,c,d){return sa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=qa),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ta=/ jQuery\d+="(?:null|\d+)"/g,ua=new RegExp("<(?:"+ba+")[\\s/>]","i"),va=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,wa=/<script|<style|<link/i,xa=/checked\s*(?:[^=]|=\s*.checked.)/i,ya=/^true\/(.*)/,za=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Aa=ca(d),Ba=Aa.appendChild(d.createElement("div"));function Ca(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Da(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function Ea(a){var b=ya.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Ga(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(Da(b).text=a.text,Ea(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Z.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}}function Ha(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&xa.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(o&&(k=ja(b,a[0].ownerDocument,!1,a,d),e=k.firstChild,1===k.childNodes.length&&(k=e),e||d)){for(i=n.map(ea(k,"script"),Da),h=i.length;o>m;m++)g=k,m!==p&&(g=n.clone(g,!0,!0),h&&n.merge(i,ea(g,"script"))),c.call(a[m],g,m);if(h)for(j=i[i.length-1].ownerDocument,n.map(i,Ea),m=0;h>m;m++)g=i[m],_.test(g.type||"")&&!n._data(g,"globalEval")&&n.contains(j,g)&&(g.src?n._evalUrl&&n._evalUrl(g.src):n.globalEval((g.text||g.textContent||g.innerHTML||"").replace(za,"")));k=e=null}return a}function Ia(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(ea(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&fa(ea(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(va,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ua.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(Ba.innerHTML=a.outerHTML,Ba.removeChild(f=Ba.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ea(f),h=ea(a),g=0;null!=(e=h[g]);++g)d[g]&&Ga(e,d[g]);if(b)if(c)for(h=h||ea(a),d=d||ea(f),g=0;null!=(e=h[g]);g++)Fa(e,d[g]);else Fa(a,f);return d=ea(f,"script"),d.length>0&&fa(d,!i&&ea(a,"script")),d=h=e=null,f},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.attributes,m=n.event.special;null!=(d=a[h]);h++)if((b||M(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k||"undefined"==typeof d.removeAttribute?d[i]=void 0:d.removeAttribute(i),c.push(f))}}}),n.fn.extend({domManip:Ha,detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return Y(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||d).createTextNode(a))},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ea(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return Y(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(ta,""):void 0;if("string"==typeof a&&!wa.test(a)&&(l.htmlSerialize||!ua.test(a))&&(l.leadingWhitespace||!aa.test(a))&&!da[($.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ea(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(ea(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],f=n(a),h=f.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(f[d])[b](c),g.apply(e,c.get());return this.pushStack(e)}});var Ja,Ka={HTML:"block",BODY:"block"};function La(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function Ma(a){var b=d,c=Ka[a];return c||(c=La(a,b),"none"!==c&&c||(Ja=(Ja||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ja[0].contentWindow||Ja[0].contentDocument).document,b.write(),b.close(),c=La(a,b),Ja.detach()),Ka[a]=c),c}var Na=/^margin/,Oa=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Pa=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Qa=d.documentElement;!function(){var b,c,e,f,g,h,i=d.createElement("div"),j=d.createElement("div");if(j.style){j.style.cssText="float:left;opacity:.5",l.opacity="0.5"===j.style.opacity,l.cssFloat=!!j.style.cssFloat,j.style.backgroundClip="content-box",j.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===j.style.backgroundClip,i=d.createElement("div"),i.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",j.innerHTML="",i.appendChild(j),l.boxSizing=""===j.style.boxSizing||""===j.style.MozBoxSizing||""===j.style.WebkitBoxSizing,n.extend(l,{reliableHiddenOffsets:function(){return null==b&&k(),f},boxSizingReliable:function(){return null==b&&k(),e},pixelMarginRight:function(){return null==b&&k(),c},pixelPosition:function(){return null==b&&k(),b},reliableMarginRight:function(){return null==b&&k(),g},reliableMarginLeft:function(){return null==b&&k(),h}});function k(){var k,l,m=d.documentElement;m.appendChild(i),j.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",b=e=h=!1,c=g=!0,a.getComputedStyle&&(l=a.getComputedStyle(j),b="1%"!==(l||{}).top,h="2px"===(l||{}).marginLeft,e="4px"===(l||{width:"4px"}).width,j.style.marginRight="50%",c="4px"===(l||{marginRight:"4px"}).marginRight,k=j.appendChild(d.createElement("div")),k.style.cssText=j.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",k.style.marginRight=k.style.width="0",j.style.width="1px",g=!parseFloat((a.getComputedStyle(k)||{}).marginRight),j.removeChild(k)),j.style.display="none",f=0===j.getClientRects().length,f&&(j.style.display="",j.innerHTML="<table><tr><td></td><td>t</td></tr></table>",k=j.getElementsByTagName("td"),k[0].style.cssText="margin:0;border:0;padding:0;display:none",f=0===k[0].offsetHeight,f&&(k[0].style.display="",k[1].style.display="none",f=0===k[0].offsetHeight)),m.removeChild(i)}}}();var Ra,Sa,Ta=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ra=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Oa.test(g)&&Na.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0===g?g:g+""}):Qa.currentStyle&&(Ra=function(a){return a.currentStyle},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Oa.test(g)&&!Ta.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Ua(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Va=/alpha\([^)]*\)/i,Wa=/opacity\s*=\s*([^)]*)/i,Xa=/^(none|table(?!-c[ea]).+)/,Ya=new RegExp("^("+T+")(.*)$","i"),Za={position:"absolute",visibility:"hidden",display:"block"},$a={letterSpacing:"0",fontWeight:"400"},_a=["Webkit","O","Moz","ms"],ab=d.createElement("div").style;function bb(a){if(a in ab)return a;var b=a.charAt(0).toUpperCase()+a.slice(1),c=_a.length;while(c--)if(a=_a[c]+b,a in ab)return a}function cb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&W(d)&&(f[g]=n._data(d,"olddisplay",Ma(d.nodeName)))):(e=W(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function db(a,b,c){var d=Ya.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function eb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+V[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+V[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+V[f]+"Width",!0,e))):(g+=n.css(a,"padding"+V[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+V[f]+"Width",!0,e)));return g}function fb(b,c,e){var f=!0,g="width"===c?b.offsetWidth:b.offsetHeight,h=Ra(b),i=l.boxSizing&&"border-box"===n.css(b,"boxSizing",!1,h);if(d.msFullscreenElement&&a.top!==a&&b.getClientRects().length&&(g=Math.round(100*b.getBoundingClientRect()[c])),0>=g||null==g){if(g=Sa(b,c,h),(0>g||null==g)&&(g=b.style[c]),Oa.test(g))return g;f=i&&(l.boxSizingReliable()||g===b.style[c]),g=parseFloat(g)||0}return g+eb(b,c,e||(i?"border":"content"),f,h)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Sa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=U.exec(c))&&e[1]&&(c=X(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Sa(a,b,d)),"normal"===f&&b in $a&&(f=$a[b]),""===c||c?(e=parseFloat(f),c===!0||isFinite(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Xa.test(n.css(a,"display"))&&0===a.offsetWidth?Pa(a,Za,function(){return fb(a,b,d)}):fb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return db(a,c,d?eb(a,b,d,l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Wa.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Va,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Va.test(f)?f.replace(Va,e):f+" "+e)}}),n.cssHooks.marginRight=Ua(l.reliableMarginRight,function(a,b){return b?Pa(a,{display:"inline-block"},Sa,[a,"marginRight"]):void 0}),n.cssHooks.marginLeft=Ua(l.reliableMarginLeft,function(a,b){
	return b?(parseFloat(Sa(a,"marginLeft"))||(n.contains(a.ownerDocument,a)?a.getBoundingClientRect().left-Pa(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}):0))+"px":void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+V[d]+b]=f[d]||f[d-2]||f[0];return e}},Na.test(a)||(n.cssHooks[a+b].set=db)}),n.fn.extend({css:function(a,b){return Y(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return cb(this,!0)},hide:function(){return cb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){W(this)?n(this).show():n(this).hide()})}});function gb(a,b,c,d,e){return new gb.prototype.init(a,b,c,d,e)}n.Tween=gb,gb.prototype={constructor:gb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=gb.propHooks[this.prop];return a&&a.get?a.get(this):gb.propHooks._default.get(this)},run:function(a){var b,c=gb.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):gb.propHooks._default.set(this),this}},gb.prototype.init.prototype=gb.prototype,gb.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},gb.propHooks.scrollTop=gb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=gb.prototype.init,n.fx.step={};var hb,ib,jb=/^(?:toggle|show|hide)$/,kb=/queueHooks$/;function lb(){return a.setTimeout(function(){hb=void 0}),hb=n.now()}function mb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=V[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function nb(a,b,c){for(var d,e=(qb.tweeners[b]||[]).concat(qb.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ob(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&W(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k="none"===j?n._data(a,"olddisplay")||Ma(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==Ma(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],jb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(o))"inline"===("none"===j?Ma(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=nb(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function pb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function qb(a,b,c){var d,e,f=0,g=qb.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=hb||lb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:hb||lb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(pb(k,j.opts.specialEasing);g>f;f++)if(d=qb.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,nb,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(qb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return X(c.elem,a,U.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],qb.tweeners[c]=qb.tweeners[c]||[],qb.tweeners[c].unshift(b)},prefilters:[ob],prefilter:function(a,b){b?qb.prefilters.unshift(a):qb.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(W).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=qb(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&kb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(mb(b,!0),a,d,e)}}),n.each({slideDown:mb("show"),slideUp:mb("hide"),slideToggle:mb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(hb=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),hb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ib||(ib=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(ib),ib=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a,b=d.createElement("input"),c=d.createElement("div"),e=d.createElement("select"),f=e.appendChild(d.createElement("option"));c=d.createElement("div"),c.setAttribute("className","t"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],b.setAttribute("type","checkbox"),c.appendChild(b),a=c.getElementsByTagName("a")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==c.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=f.selected,l.enctype=!!d.createElement("form").enctype,e.disabled=!0,l.optDisabled=!f.disabled,b=d.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value}();var rb=/\r/g,sb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(sb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>-1)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var tb,ub,vb=n.expr.attrHandle,wb=/^(?:checked|selected)$/i,xb=l.getSetAttribute,yb=l.input;n.fn.extend({attr:function(a,b){return Y(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ub:tb)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?yb&&xb||!wb.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(xb?c:d)}}),ub={set:function(a,b,c){return b===!1?n.removeAttr(a,c):yb&&xb||!wb.test(c)?a.setAttribute(!xb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=vb[b]||n.find.attr;yb&&xb||!wb.test(b)?vb[b]=function(a,b,d){var e,f;return d||(f=vb[b],vb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,vb[b]=f),e}:vb[b]=function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),yb&&xb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):tb&&tb.set(a,b,c)}}),xb||(tb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},vb.id=vb.name=vb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:tb.set},n.attrHooks.contenteditable={set:function(a,b,c){tb.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var zb=/^(?:input|select|textarea|button|object)$/i,Ab=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return Y(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):zb.test(a.nodeName)||Ab.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var Bb=/[\t\r\n\f]/g;function Cb(a){return n.attr(a,"class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,Cb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,Cb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,Cb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=Cb(this),b&&n._data(this,"__className__",b),n.attr(this,"class",b||a===!1?"":n._data(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+Cb(c)+" ").replace(Bb," ").indexOf(b)>-1)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Db=a.location,Eb=n.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(Gb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new a.DOMParser,c=d.parseFromString(b,"text/xml")):(c=new a.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var Hb=/#.*$/,Ib=/([?&])_=[^&]*/,Jb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Kb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Lb=/^(?:GET|HEAD)$/,Mb=/^\/\//,Nb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ob={},Pb={},Qb="*/".concat("*"),Rb=Db.href,Sb=Nb.exec(Rb.toLowerCase())||[];function Tb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Ub(a,b,c,d){var e={},f=a===Pb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Vb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Wb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Xb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Rb,type:"GET",isLocal:Kb.test(Sb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Qb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Vb(Vb(a,n.ajaxSettings),b):Vb(n.ajaxSettings,a)},ajaxPrefilter:Tb(Ob),ajaxTransport:Tb(Pb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var d,e,f,g,h,i,j,k,l=n.ajaxSetup({},c),m=l.context||l,o=l.context&&(m.nodeType||m.jquery)?n(m):n.event,p=n.Deferred(),q=n.Callbacks("once memory"),r=l.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,getResponseHeader:function(a){var b;if(2===u){if(!k){k={};while(b=Jb.exec(g))k[b[1].toLowerCase()]=b[2]}b=k[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===u?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return u||(a=t[c]=t[c]||a,s[a]=b),this},overrideMimeType:function(a){return u||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>u)for(b in a)r[b]=[r[b],a[b]];else w.always(a[w.status]);return this},abort:function(a){var b=a||v;return j&&j.abort(b),y(0,b),this}};if(p.promise(w).complete=q.add,w.success=w.done,w.error=w.fail,l.url=((b||l.url||Rb)+"").replace(Hb,"").replace(Mb,Sb[1]+"//"),l.type=c.method||c.type||l.method||l.type,l.dataTypes=n.trim(l.dataType||"*").toLowerCase().match(G)||[""],null==l.crossDomain&&(d=Nb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Sb[1]&&d[2]===Sb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Sb[3]||("http:"===Sb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=n.param(l.data,l.traditional)),Ub(Ob,l,c,w),2===u)return w;i=n.event&&l.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Lb.test(l.type),f=l.url,l.hasContent||(l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=Ib.test(f)?f.replace(Ib,"$1_="+Eb++):f+(Fb.test(f)?"&":"?")+"_="+Eb++)),l.ifModified&&(n.lastModified[f]&&w.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&w.setRequestHeader("If-None-Match",n.etag[f])),(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&w.setRequestHeader("Content-Type",l.contentType),w.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Qb+"; q=0.01":""):l.accepts["*"]);for(e in l.headers)w.setRequestHeader(e,l.headers[e]);if(l.beforeSend&&(l.beforeSend.call(m,w,l)===!1||2===u))return w.abort();v="abort";for(e in{success:1,error:1,complete:1})w[e](l[e]);if(j=Ub(Pb,l,c,w)){if(w.readyState=1,i&&o.trigger("ajaxSend",[w,l]),2===u)return w;l.async&&l.timeout>0&&(h=a.setTimeout(function(){w.abort("timeout")},l.timeout));try{u=1,j.send(s,y)}catch(x){if(!(2>u))throw x;y(-1,x)}}else y(-1,"No Transport");function y(b,c,d,e){var k,s,t,v,x,y=c;2!==u&&(u=2,h&&a.clearTimeout(h),j=void 0,g=e||"",w.readyState=b>0?4:0,k=b>=200&&300>b||304===b,d&&(v=Wb(l,w,d)),v=Xb(l,v,w,k),k?(l.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(n.lastModified[f]=x),x=w.getResponseHeader("etag"),x&&(n.etag[f]=x)),204===b||"HEAD"===l.type?y="nocontent":304===b?y="notmodified":(y=v.state,s=v.data,t=v.error,k=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),w.status=b,w.statusText=(c||y)+"",k?p.resolveWith(m,[s,y,w]):p.rejectWith(m,[w,y,t]),w.statusCode(r),r=void 0,i&&o.trigger(k?"ajaxSuccess":"ajaxError",[w,l,k?s:t]),q.fireWith(m,[w,y]),i&&(o.trigger("ajaxComplete",[w,l]),--n.active||n.event.trigger("ajaxStop")))}return w},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}});function Yb(a){return a.style&&a.style.display||n.css(a,"display")}function Zb(a){while(a&&1===a.nodeType){if("none"===Yb(a)||"hidden"===a.type)return!0;a=a.parentNode}return!1}n.expr.filters.hidden=function(a){return l.reliableHiddenOffsets()?a.offsetWidth<=0&&a.offsetHeight<=0&&!a.getClientRects().length:Zb(a)},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var $b=/%20/g,_b=/\[\]$/,ac=/\r?\n/g,bc=/^(?:submit|button|image|reset|file)$/i,cc=/^(?:input|select|textarea|keygen)/i;function dc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||_b.test(a)?d(a,e):dc(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)dc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)dc(c,a[c],b,e);return d.join("&").replace($b,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&cc.test(this.nodeName)&&!bc.test(a)&&(this.checked||!Z.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(ac,"\r\n")}}):{name:b.name,value:c.replace(ac,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return this.isLocal?ic():d.documentMode>8?hc():/^(get|post|head|put|delete|options)$/i.test(this.type)&&hc()||ic()}:hc;var ec=0,fc={},gc=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in fc)fc[a](void 0,!0)}),l.cors=!!gc&&"withCredentials"in gc,gc=l.ajax=!!gc,gc&&n.ajaxTransport(function(b){if(!b.crossDomain||l.cors){var c;return{send:function(d,e){var f,g=b.xhr(),h=++ec;if(g.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(f in b.xhrFields)g[f]=b.xhrFields[f];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType),b.crossDomain||d["X-Requested-With"]||(d["X-Requested-With"]="XMLHttpRequest");for(f in d)void 0!==d[f]&&g.setRequestHeader(f,d[f]+"");g.send(b.hasContent&&b.data||null),c=function(a,d){var f,i,j;if(c&&(d||4===g.readyState))if(delete fc[h],c=void 0,g.onreadystatechange=n.noop,d)4!==g.readyState&&g.abort();else{j={},f=g.status,"string"==typeof g.responseText&&(j.text=g.responseText);try{i=g.statusText}catch(k){i=""}f||!b.isLocal||b.crossDomain?1223===f&&(f=204):f=j.text?200:404}j&&e(f,i,j,g.getAllResponseHeaders())},b.async?4===g.readyState?a.setTimeout(c):g.onreadystatechange=fc[h]=c:c()},abort:function(){c&&c(void 0,!0)}}}});function hc(){try{return new a.XMLHttpRequest}catch(b){}}function ic(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=d.head||n("head")[0]||d.documentElement;return{send:function(e,f){b=d.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||f(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var jc=[],kc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=jc.pop()||n.expando+"_"+Eb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(kc.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&kc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(kc,"$1"+e):b.jsonp!==!1&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,jc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ja([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var lc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&lc)return lc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h,a.length)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function mc(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?("undefined"!=typeof e.getBoundingClientRect&&(d=e.getBoundingClientRect()),c=mc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Qa})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return Y(this,function(a,d,e){var f=mc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ua(l.pixelPosition,function(a,c){return c?(c=Sa(a,b),Oa.test(c)?n(a).position()[b]+"px":c):void 0;
	})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return Y(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"=="function"&&__webpack_require__(7)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return n}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var nc=a.jQuery,oc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=oc),b&&a.jQuery===n&&(a.jQuery=nc),n},b||(a.jQuery=a.$=n),n});


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*!
	 * Bootstrap v3.3.6 (http://getbootstrap.com)
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under the MIT license
	 */
	if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
	d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * lodash 4.7.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash core -o ./dist/lodash.core.js`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	;(function() {
	
	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;
	
	  /** Used as the semantic version number. */
	  var VERSION = '4.7.0';
	
	  /** Used as the `TypeError` message for "Functions" methods. */
	  var FUNC_ERROR_TEXT = 'Expected a function';
	
	  /** Used to compose bitmasks for wrapper metadata. */
	  var BIND_FLAG = 1,
	      PARTIAL_FLAG = 32;
	
	  /** Used to compose bitmasks for comparison styles. */
	  var UNORDERED_COMPARE_FLAG = 1,
	      PARTIAL_COMPARE_FLAG = 2;
	
	  /** Used as references for various `Number` constants. */
	  var INFINITY = 1 / 0,
	      MAX_SAFE_INTEGER = 9007199254740991;
	
	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      genTag = '[object GeneratorFunction]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      stringTag = '[object String]';
	
	  /** Used to match HTML entities and HTML characters. */
	  var reUnescapedHtml = /[&<>"'`]/g,
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
	
	  /** Used to detect unsigned integer values. */
	  var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '`': '&#96;'
	  };
	
	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };
	
	  /** Detect free variable `exports`. */
	  var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	    ? exports
	    : undefined;
	
	  /** Detect free variable `module`. */
	  var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	    ? module
	    : undefined;
	
	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = (freeModule && freeModule.exports === freeExports)
	    ? freeExports
	    : undefined;
	
	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	  /** Detect free variable `self`. */
	  var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	  /** Detect free variable `window`. */
	  var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	  /** Detect `this` as the global object. */
	  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it's the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = freeGlobal ||
	    ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	      freeSelf || thisGlobal || Function('return this')();
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Creates a new array concatenating `array` with `other`.
	   *
	   * @private
	   * @param {Array} array The first array to concatenate.
	   * @param {Array} other The second array to concatenate.
	   * @returns {Array} Returns the new concatenated array.
	   */
	  function arrayConcat(array, other) {
	    return arrayPush(copyArray(array), values);
	  }
	
	  /**
	   * Appends the elements of `values` to `array`.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {Array} values The values to append.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayPush(array, values) {
	    array.push.apply(array, values);
	    return array;
	  }
	
	  /**
	   * The base implementation of methods like `_.max` and `_.min` which accepts a
	   * `comparator` to determine the extremum value.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The iteratee invoked per iteration.
	   * @param {Function} comparator The comparator used to compare values.
	   * @returns {*} Returns the extremum value.
	   */
	  function baseExtremum(array, iteratee, comparator) {
	    var index = -1,
	        length = array.length;
	
	    while (++index < length) {
	      var value = array[index],
	          current = iteratee(value);
	
	      if (current != null && (computed === undefined
	            ? current === current
	            : comparator(current, computed)
	          )) {
	        var computed = current,
	            result = value;
	      }
	    }
	    return result;
	  }
	
	  /**
	   * The base implementation of methods like `_.find` and `_.findKey`, without
	   * support for iteratee shorthands, which iterates over `collection` using
	   * `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to search.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @param {boolean} [retKey] Specify returning the key of the found element
	   *  instead of the element itself.
	   * @returns {*} Returns the found element or its key, else `undefined`.
	   */
	  function baseFind(collection, predicate, eachFunc, retKey) {
	    var result;
	    eachFunc(collection, function(value, key, collection) {
	      if (predicate(value, key, collection)) {
	        result = retKey ? key : value;
	        return false;
	      }
	    });
	    return result;
	  }
	
	  /**
	   * The base implementation of `_.reduce` and `_.reduceRight`, without support
	   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} accumulator The initial value.
	   * @param {boolean} initAccum Specify using the first or last element of
	   *  `collection` as the initial value.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @returns {*} Returns the accumulated value.
	   */
	  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	    eachFunc(collection, function(value, index, collection) {
	      accumulator = initAccum
	        ? (initAccum = false, value)
	        : iteratee(accumulator, value, index, collection);
	    });
	    return accumulator;
	  }
	
	  /**
	   * The base implementation of `_.times` without support for iteratee shorthands
	   * or max array length checks.
	   *
	   * @private
	   * @param {number} n The number of times to invoke `iteratee`.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the array of results.
	   */
	  function baseTimes(n, iteratee) {
	    var index = -1,
	        result = Array(n);
	
	    while (++index < n) {
	      result[index] = iteratee(index);
	    }
	    return result;
	  }
	
	  /**
	   * The base implementation of `_.values` and `_.valuesIn` which creates an
	   * array of `object` property values corresponding to the property names
	   * of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the array of property values.
	   */
	  function baseValues(object, props) {
	    return baseMap(props, function(key) {
	      return object[key];
	    });
	  }
	
	  /**
	   * Checks if `value` is a global object.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	   */
	  function checkGlobal(value) {
	    return (value && value.Object === Object) ? value : null;
	  }
	
	  /**
	   * Compares values to sort them in ascending order.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */
	  function compareAscending(value, other) {
	    if (value !== other) {
	      var valIsNull = value === null,
	          valIsUndef = value === undefined,
	          valIsReflexive = value === value;
	
	      var othIsNull = other === null,
	          othIsUndef = other === undefined,
	          othIsReflexive = other === other;
	
	      if ((value > other && !othIsNull) || !valIsReflexive ||
	          (valIsNull && !othIsUndef && othIsReflexive) ||
	          (valIsUndef && othIsReflexive)) {
	        return 1;
	      }
	      if ((value < other && !valIsNull) || !othIsReflexive ||
	          (othIsNull && !valIsUndef && valIsReflexive) ||
	          (othIsUndef && valIsReflexive)) {
	        return -1;
	      }
	    }
	    return 0;
	  }
	
	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeHtmlChar(chr) {
	    return htmlEscapes[chr];
	  }
	
	  /**
	   * Checks if `value` is a host object in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	   */
	  function isHostObject(value) {
	    // Many host objects are `Object` objects that can coerce to strings
	    // despite having improperly defined `toString` methods.
	    var result = false;
	    if (value != null && typeof value.toString != 'function') {
	      try {
	        result = !!(value + '');
	      } catch (e) {}
	    }
	    return result;
	  }
	
	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return value > -1 && value % 1 == 0 && value < length;
	  }
	
	  /**
	   * Converts `iterator` to an array.
	   *
	   * @private
	   * @param {Object} iterator The iterator to convert.
	   * @returns {Array} Returns the converted array.
	   */
	  function iteratorToArray(iterator) {
	    var data,
	        result = [];
	
	    while (!(data = iterator.next()).done) {
	      result.push(data.value);
	    }
	    return result;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /** Used for built-in method references. */
	  var arrayProto = Array.prototype,
	      objectProto = Object.prototype;
	
	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;
	
	  /** Used to generate unique IDs. */
	  var idCounter = 0;
	
	  /**
	   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	   * of values.
	   */
	  var objectToString = objectProto.toString;
	
	  /** Used to restore the original `_` reference in `_.noConflict`. */
	  var oldDash = root._;
	
	  /** Built-in value references. */
	  var Reflect = root.Reflect,
	      Symbol = root.Symbol,
	      Uint8Array = root.Uint8Array,
	      enumerate = Reflect ? Reflect.enumerate : undefined,
	      objectCreate = Object.create,
	      propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	  /* Built-in method references for those with the same name as other `lodash` methods. */
	  var nativeIsFinite = root.isFinite,
	      nativeKeys = Object.keys,
	      nativeMax = Math.max;
	
	  /** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	  var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Creates a `lodash` object which wraps `value` to enable implicit method
	   * chain sequences. Methods that operate on and return arrays, collections,
	   * and functions can be chained together. Methods that retrieve a single value
	   * or may return a primitive value will automatically end the chain sequence
	   * and return the unwrapped value. Otherwise, the value must be unwrapped
	   * with `_#value`.
	   *
	   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	   * enabled using `_.chain`.
	   *
	   * The execution of chained methods is lazy, that is, it's deferred until
	   * `_#value` is implicitly or explicitly called.
	   *
	   * Lazy evaluation allows several methods to support shortcut fusion.
	   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	   * the creation of intermediate arrays and can greatly reduce the number of
	   * iteratee executions. Sections of a chain sequence qualify for shortcut
	   * fusion if the section is applied to an array of at least two hundred
	   * elements and any iteratees accept only one argument. The heuristic for
	   * whether a section qualifies for shortcut fusion is subject to change.
	   *
	   * Chaining is supported in custom builds as long as the `_#value` method is
	   * directly or indirectly included in the build.
	   *
	   * In addition to lodash methods, wrappers have `Array` and `String` methods.
	   *
	   * The wrapper `Array` methods are:
	   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	   *
	   * The wrapper `String` methods are:
	   * `replace` and `split`
	   *
	   * The wrapper methods that support shortcut fusion are:
	   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	   *
	   * The chainable wrapper methods are:
	   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	   * `zipObject`, `zipObjectDeep`, and `zipWith`
	   *
	   * The wrapper methods that are **not** chainable by default are:
	   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `divide`, `each`,
	   * `eachRight`, `endsWith`, `eq`, `escape`, `escapeRegExp`, `every`, `find`,
	   * `findIndex`, `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `first`,
	   * `floor`, `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`,
	   * `forOwnRight`, `get`, `gt`, `gte`, `has`, `hasIn`, `head`, `identity`,
	   * `includes`, `indexOf`, `inRange`, `invoke`, `isArguments`, `isArray`,
	   * `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`, `isBoolean`, `isBuffer`,
	   * `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`, `isError`,
	   * `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMap`, `isMatch`,
	   * `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`,
	   * `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`, `isSafeInteger`,
	   * `isSet`, `isString`, `isUndefined`, `isTypedArray`, `isWeakMap`, `isWeakSet`,
	   * `join`, `kebabCase`, `last`, `lastIndexOf`, `lowerCase`, `lowerFirst`,
	   * `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`, `min`, `minBy`, `multiply`,
	   * `noConflict`, `noop`, `now`, `pad`, `padEnd`, `padStart`, `parseInt`,
	   * `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`, `round`,
	   * `runInContext`, `sample`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
	   * `sortedIndexBy`, `sortedLastIndex`, `sortedLastIndexBy`, `startCase`,
	   * `startsWith`, `subtract`, `sum`, `sumBy`, `template`, `times`, `toInteger`,
	   * `toJSON`, `toLength`, `toLower`, `toNumber`, `toSafeInteger`, `toString`,
	   * `toUpper`, `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`,
	   * `uniqueId`, `upperCase`, `upperFirst`, `value`, and `words`
	   *
	   * @name _
	   * @constructor
	   * @category Seq
	   * @param {*} value The value to wrap in a `lodash` instance.
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * function square(n) {
	   *   return n * n;
	   * }
	   *
	   * var wrapped = _([1, 2, 3]);
	   *
	   * // Returns an unwrapped value.
	   * wrapped.reduce(_.add);
	   * // => 6
	   *
	   * // Returns a wrapped value.
	   * var squares = wrapped.map(square);
	   *
	   * _.isArray(squares);
	   * // => false
	   *
	   * _.isArray(squares.value());
	   * // => true
	   */
	  function lodash(value) {
	    return value instanceof LodashWrapper
	      ? value
	      : new LodashWrapper(value);
	  }
	
	  /**
	   * The base constructor for creating `lodash` wrapper objects.
	   *
	   * @private
	   * @param {*} value The value to wrap.
	   * @param {boolean} [chainAll] Enable explicit method chain sequences.
	   */
	  function LodashWrapper(value, chainAll) {
	    this.__wrapped__ = value;
	    this.__actions__ = [];
	    this.__chain__ = !!chainAll;
	  }
	
	  LodashWrapper.prototype = baseCreate(lodash.prototype);
	  LodashWrapper.prototype.constructor = LodashWrapper;
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Used by `_.defaults` to customize its `_.assignIn` use.
	   *
	   * @private
	   * @param {*} objValue The destination value.
	   * @param {*} srcValue The source value.
	   * @param {string} key The key of the property to assign.
	   * @param {Object} object The parent object of `objValue`.
	   * @returns {*} Returns the value to assign.
	   */
	  function assignInDefaults(objValue, srcValue, key, object) {
	    if (objValue === undefined ||
	        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	      return srcValue;
	    }
	    return objValue;
	  }
	
	  /**
	   * Assigns `value` to `key` of `object` if the existing value is not equivalent
	   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	   * for equality comparisons.
	   *
	   * @private
	   * @param {Object} object The object to modify.
	   * @param {string} key The key of the property to assign.
	   * @param {*} value The value to assign.
	   */
	  function assignValue(object, key, value) {
	    var objValue = object[key];
	    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = value;
	    }
	  }
	
	  /**
	   * The base implementation of `_.create` without support for assigning
	   * properties to the created object.
	   *
	   * @private
	   * @param {Object} prototype The object to inherit from.
	   * @returns {Object} Returns the new object.
	   */
	  function baseCreate(proto) {
	    return isObject(proto) ? objectCreate(proto) : {};
	  }
	
	  /**
	   * The base implementation of `_.delay` and `_.defer` which accepts an array
	   * of `func` arguments.
	   *
	   * @private
	   * @param {Function} func The function to delay.
	   * @param {number} wait The number of milliseconds to delay invocation.
	   * @param {Object} args The arguments to provide to `func`.
	   * @returns {number} Returns the timer id.
	   */
	  function baseDelay(func, wait, args) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    return setTimeout(function() { func.apply(undefined, args); }, wait);
	  }
	
	  /**
	   * The base implementation of `_.forEach` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array|Object} Returns `collection`.
	   */
	  var baseEach = createBaseEach(baseForOwn);
	
	  /**
	   * The base implementation of `_.every` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check,
	   *  else `false`
	   */
	  function baseEvery(collection, predicate) {
	    var result = true;
	    baseEach(collection, function(value, index, collection) {
	      result = !!predicate(value, index, collection);
	      return result;
	    });
	    return result;
	  }
	
	  /**
	   * The base implementation of `_.filter` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   */
	  function baseFilter(collection, predicate) {
	    var result = [];
	    baseEach(collection, function(value, index, collection) {
	      if (predicate(value, index, collection)) {
	        result.push(value);
	      }
	    });
	    return result;
	  }
	
	  /**
	   * The base implementation of `_.flatten` with support for restricting flattening.
	   *
	   * @private
	   * @param {Array} array The array to flatten.
	   * @param {number} depth The maximum recursion depth.
	   * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	   * @param {Array} [result=[]] The initial result value.
	   * @returns {Array} Returns the new flattened array.
	   */
	  function baseFlatten(array, depth, isStrict, result) {
	    result || (result = []);
	
	    var index = -1,
	        length = array.length;
	
	    while (++index < length) {
	      var value = array[index];
	      if (depth > 0 && isArrayLikeObject(value) &&
	          (isStrict || isArray(value) || isArguments(value))) {
	        if (depth > 1) {
	          // Recursively flatten arrays (susceptible to call stack limits).
	          baseFlatten(value, depth - 1, isStrict, result);
	        } else {
	          arrayPush(result, value);
	        }
	      } else if (!isStrict) {
	        result[result.length] = value;
	      }
	    }
	    return result;
	  }
	
	  /**
	   * The base implementation of `baseForOwn` which iterates over `object`
	   * properties returned by `keysFunc` invoking `iteratee` for each property.
	   * Iteratee functions may exit iteration early by explicitly returning `false`.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {Function} keysFunc The function to get the keys of `object`.
	   * @returns {Object} Returns `object`.
	   */
	  var baseFor = createBaseFor();
	
	  /**
	   * The base implementation of `_.forOwn` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForOwn(object, iteratee) {
	    return object && baseFor(object, iteratee, keys);
	  }
	
	  /**
	   * The base implementation of `_.functions` which creates an array of
	   * `object` function property names filtered from `props`.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @param {Array} props The property names to filter.
	   * @returns {Array} Returns the new array of filtered property names.
	   */
	  function baseFunctions(object, props) {
	    return baseFilter(props, function(key) {
	      return isFunction(object[key]);
	    });
	  }
	
	  /**
	   * The base implementation of `_.isEqual` which supports partial comparisons
	   * and tracks traversed objects.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @param {Function} [customizer] The function to customize comparisons.
	   * @param {boolean} [bitmask] The bitmask of comparison flags.
	   *  The bitmask may be composed of the following flags:
	   *     1 - Unordered comparison
	   *     2 - Partial comparison
	   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   */
	  function baseIsEqual(value, other, customizer, bitmask, stack) {
	    if (value === other) {
	      return true;
	    }
	    if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	      return value !== value && other !== other;
	    }
	    return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	  }
	
	  /**
	   * A specialized version of `baseIsEqual` for arrays and objects which performs
	   * deep comparisons and tracks traversed objects enabling objects with circular
	   * references to be compared.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Function} [customizer] The function to customize comparisons.
	   * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	   *  for more details.
	   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	    var objIsArr = isArray(object),
	        othIsArr = isArray(other),
	        objTag = arrayTag,
	        othTag = arrayTag;
	
	    if (!objIsArr) {
	      objTag = objectToString.call(object);
	      objTag = objTag == argsTag ? objectTag : objTag;
	    }
	    if (!othIsArr) {
	      othTag = objectToString.call(other);
	      othTag = othTag == argsTag ? objectTag : othTag;
	    }
	    var objIsObj = objTag == objectTag && !isHostObject(object),
	        othIsObj = othTag == objectTag && !isHostObject(other),
	        isSameTag = objTag == othTag;
	
	    stack || (stack = []);
	    var stacked = find(stack, function(entry) {
	      return entry[0] === object;
	    });
	    if (stacked && stacked[1]) {
	      return stacked[1] == other;
	    }
	    stack.push([object, other]);
	    if (isSameTag && !objIsObj) {
	      var result = (objIsArr || isTypedArray(object))
	        ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	        : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	      stack.pop();
	      return result;
	    }
	    if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	      if (objIsWrapped || othIsWrapped) {
	        var objUnwrapped = objIsWrapped ? object.value() : object,
	            othUnwrapped = othIsWrapped ? other.value() : other;
	
	        var result = equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	        stack.pop();
	        return result;
	      }
	    }
	    if (!isSameTag) {
	      return false;
	    }
	    var result = equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	    stack.pop();
	    return result;
	  }
	
	  /**
	   * The base implementation of `_.iteratee`.
	   *
	   * @private
	   * @param {*} [value=_.identity] The value to convert to an iteratee.
	   * @returns {Function} Returns the iteratee.
	   */
	  function baseIteratee(func) {
	    if (typeof func == 'function') {
	      return func;
	    }
	    if (func == null) {
	      return identity;
	    }
	    return (typeof func == 'object' ? baseMatches : baseProperty)(func);
	  }
	
	  /**
	   * The base implementation of `_.keys` which doesn't skip the constructor
	   * property of prototypes or treat sparse arrays as dense.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function baseKeys(object) {
	    return nativeKeys(Object(object));
	  }
	
	  /**
	   * The base implementation of `_.keysIn` which doesn't skip the constructor
	   * property of prototypes or treat sparse arrays as dense.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function baseKeysIn(object) {
	    object = object == null ? object : Object(object);
	
	    var result = [];
	    for (var key in object) {
	      result.push(key);
	    }
	    return result;
	  }
	
	  // Fallback for IE < 9 with es6-shim.
	  if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	    baseKeysIn = function(object) {
	      return iteratorToArray(enumerate(object));
	    };
	  }
	
	  /**
	   * The base implementation of `_.map` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   */
	  function baseMap(collection, iteratee) {
	    var index = -1,
	        result = isArrayLike(collection) ? Array(collection.length) : [];
	
	    baseEach(collection, function(value, key, collection) {
	      result[++index] = iteratee(value, key, collection);
	    });
	    return result;
	  }
	
	  /**
	   * The base implementation of `_.matches` which doesn't clone `source`.
	   *
	   * @private
	   * @param {Object} source The object of property values to match.
	   * @returns {Function} Returns the new function.
	   */
	  function baseMatches(source) {
	    var props = keys(source);
	    return function(object) {
	      var length = props.length;
	      if (object == null) {
	        return !length;
	      }
	      object = Object(object);
	      while (length--) {
	        var key = props[length];
	        if (!(key in object &&
	              baseIsEqual(source[key], object[key], undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG)
	            )) {
	          return false;
	        }
	      }
	      return true;
	    };
	  }
	
	  /**
	   * The base implementation of `_.pick` without support for individual
	   * property identifiers.
	   *
	   * @private
	   * @param {Object} object The source object.
	   * @param {string[]} props The property identifiers to pick.
	   * @returns {Object} Returns the new object.
	   */
	  function basePick(object, props) {
	    object = Object(object);
	    return reduce(props, function(result, key) {
	      if (key in object) {
	        result[key] = object[key];
	      }
	      return result;
	    }, {});
	  }
	
	  /**
	   * The base implementation of `_.property` without support for deep paths.
	   *
	   * @private
	   * @param {string} key The key of the property to get.
	   * @returns {Function} Returns the new function.
	   */
	  function baseProperty(key) {
	    return function(object) {
	      return object == null ? undefined : object[key];
	    };
	  }
	
	  /**
	   * The base implementation of `_.slice` without an iteratee call guard.
	   *
	   * @private
	   * @param {Array} array The array to slice.
	   * @param {number} [start=0] The start position.
	   * @param {number} [end=array.length] The end position.
	   * @returns {Array} Returns the slice of `array`.
	   */
	  function baseSlice(array, start, end) {
	    var index = -1,
	        length = array.length;
	
	    if (start < 0) {
	      start = -start > length ? 0 : (length + start);
	    }
	    end = end > length ? length : end;
	    if (end < 0) {
	      end += length;
	    }
	    length = start > end ? 0 : ((end - start) >>> 0);
	    start >>>= 0;
	
	    var result = Array(length);
	    while (++index < length) {
	      result[index] = array[index + start];
	    }
	    return result;
	  }
	
	  /**
	   * Copies the values of `source` to `array`.
	   *
	   * @private
	   * @param {Array} source The array to copy values from.
	   * @param {Array} [array=[]] The array to copy values to.
	   * @returns {Array} Returns `array`.
	   */
	  function copyArray(source) {
	    return baseSlice(source, 0, source.length);
	  }
	
	  /**
	   * The base implementation of `_.some` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if any element passes the predicate check,
	   *  else `false`.
	   */
	  function baseSome(collection, predicate) {
	    var result;
	
	    baseEach(collection, function(value, index, collection) {
	      result = predicate(value, index, collection);
	      return !result;
	    });
	    return !!result;
	  }
	
	  /**
	   * The base implementation of `wrapperValue` which returns the result of
	   * performing a sequence of actions on the unwrapped `value`, where each
	   * successive action is supplied the return value of the previous.
	   *
	   * @private
	   * @param {*} value The unwrapped value.
	   * @param {Array} actions Actions to perform to resolve the unwrapped value.
	   * @returns {*} Returns the resolved value.
	   */
	  function baseWrapperValue(value, actions) {
	    var result = value;
	    return reduce(actions, function(result, action) {
	      return action.func.apply(action.thisArg, arrayPush([result], action.args));
	    }, result);
	  }
	
	  /**
	   * Copies properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Array} props The property identifiers to copy.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @returns {Object} Returns `object`.
	   */
	  var copyObject = copyObjectWith;
	
	  /**
	   * This function is like `copyObject` except that it accepts a function to
	   * customize copied values.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Array} props The property identifiers to copy.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @param {Function} [customizer] The function to customize copied values.
	   * @returns {Object} Returns `object`.
	   */
	  function copyObjectWith(source, props, object, customizer) {
	    object || (object = {});
	
	    var index = -1,
	        length = props.length;
	
	    while (++index < length) {
	      var key = props[index];
	
	      var newValue = customizer
	        ? customizer(object[key], source[key], key, object, source)
	        : source[key];
	
	      assignValue(object, key, newValue);
	    }
	    return object;
	  }
	
	  /**
	   * Creates a function like `_.assign`.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return rest(function(object, sources) {
	      var index = -1,
	          length = sources.length,
	          customizer = length > 1 ? sources[length - 1] : undefined;
	
	      customizer = typeof customizer == 'function'
	        ? (length--, customizer)
	        : undefined;
	
	      object = Object(object);
	      while (++index < length) {
	        var source = sources[index];
	        if (source) {
	          assigner(object, source, index, customizer);
	        }
	      }
	      return object;
	    });
	  }
	
	  /**
	   * Creates a `baseEach` or `baseEachRight` function.
	   *
	   * @private
	   * @param {Function} eachFunc The function to iterate over a collection.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {Function} Returns the new base function.
	   */
	  function createBaseEach(eachFunc, fromRight) {
	    return function(collection, iteratee) {
	      if (collection == null) {
	        return collection;
	      }
	      if (!isArrayLike(collection)) {
	        return eachFunc(collection, iteratee);
	      }
	      var length = collection.length,
	          index = fromRight ? length : -1,
	          iterable = Object(collection);
	
	      while ((fromRight ? index-- : ++index < length)) {
	        if (iteratee(iterable[index], index, iterable) === false) {
	          break;
	        }
	      }
	      return collection;
	    };
	  }
	
	  /**
	   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	   *
	   * @private
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {Function} Returns the new base function.
	   */
	  function createBaseFor(fromRight) {
	    return function(object, iteratee, keysFunc) {
	      var index = -1,
	          iterable = Object(object),
	          props = keysFunc(object),
	          length = props.length;
	
	      while (length--) {
	        var key = props[fromRight ? length : ++index];
	        if (iteratee(iterable[key], key, iterable) === false) {
	          break;
	        }
	      }
	      return object;
	    };
	  }
	
	  /**
	   * Creates a function that produces an instance of `Ctor` regardless of
	   * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	   *
	   * @private
	   * @param {Function} Ctor The constructor to wrap.
	   * @returns {Function} Returns the new wrapped function.
	   */
	  function createCtorWrapper(Ctor) {
	    return function() {
	      // Use a `switch` statement to work with class constructors.
	      // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	      // for more details.
	      var args = arguments;
	      var thisBinding = baseCreate(Ctor.prototype),
	          result = Ctor.apply(thisBinding, args);
	
	      // Mimic the constructor's `return` behavior.
	      // See https://es5.github.io/#x13.2.2 for more details.
	      return isObject(result) ? result : thisBinding;
	    };
	  }
	
	  /**
	   * Creates a function that wraps `func` to invoke it with the optional `this`
	   * binding of `thisArg` and the `partials` prepended to those provided to
	   * the wrapper.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	   *  for more details.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {Array} partials The arguments to prepend to those provided to
	   *  the new function.
	   * @returns {Function} Returns the new wrapped function.
	   */
	  function createPartialWrapper(func, bitmask, thisArg, partials) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    var isBind = bitmask & BIND_FLAG,
	        Ctor = createCtorWrapper(func);
	
	    function wrapper() {
	      var argsIndex = -1,
	          argsLength = arguments.length,
	          leftIndex = -1,
	          leftLength = partials.length,
	          args = Array(leftLength + argsLength),
	          fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	
	      while (++leftIndex < leftLength) {
	        args[leftIndex] = partials[leftIndex];
	      }
	      while (argsLength--) {
	        args[leftIndex++] = arguments[++argsIndex];
	      }
	      return fn.apply(isBind ? thisArg : this, args);
	    }
	    return wrapper;
	  }
	
	  /**
	   * A specialized version of `baseIsEqualDeep` for arrays with support for
	   * partial deep comparisons.
	   *
	   * @private
	   * @param {Array} array The array to compare.
	   * @param {Array} other The other array to compare.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Function} customizer The function to customize comparisons.
	   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	   *  for more details.
	   * @param {Object} stack Tracks traversed `array` and `other` objects.
	   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	   */
	  function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	    var index = -1,
	        isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	        isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	        arrLength = array.length,
	        othLength = other.length;
	
	    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	      return false;
	    }
	    var result = true;
	
	    // Ignore non-index properties.
	    while (++index < arrLength) {
	      var arrValue = array[index],
	          othValue = other[index];
	
	      var compared;
	      if (compared !== undefined) {
	        if (compared) {
	          continue;
	        }
	        result = false;
	        break;
	      }
	      // Recursively compare arrays (susceptible to call stack limits).
	      if (isUnordered) {
	        if (!baseSome(other, function(othValue) {
	              return arrValue === othValue ||
	                equalFunc(arrValue, othValue, customizer, bitmask, stack);
	            })) {
	          result = false;
	          break;
	        }
	      } else if (!(
	            arrValue === othValue ||
	              equalFunc(arrValue, othValue, customizer, bitmask, stack)
	          )) {
	        result = false;
	        break;
	      }
	    }
	    return result;
	  }
	
	  /**
	   * A specialized version of `baseIsEqualDeep` for comparing objects of
	   * the same `toStringTag`.
	   *
	   * **Note:** This function only supports comparing values with tags of
	   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {string} tag The `toStringTag` of the objects to compare.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Function} customizer The function to customize comparisons.
	   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	   *  for more details.
	   * @param {Object} stack Tracks traversed `object` and `other` objects.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	    switch (tag) {
	
	      case boolTag:
	      case dateTag:
	        // Coerce dates and booleans to numbers, dates to milliseconds and
	        // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	        // not equal.
	        return +object == +other;
	
	      case errorTag:
	        return object.name == other.name && object.message == other.message;
	
	      case numberTag:
	        // Treat `NaN` vs. `NaN` as equal.
	        return (object != +object) ? other != +other : object == +other;
	
	      case regexpTag:
	      case stringTag:
	        // Coerce regexes to strings and treat strings, primitives and objects,
	        // as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	        return object == (other + '');
	
	    }
	    return false;
	  }
	
	  /**
	   * A specialized version of `baseIsEqualDeep` for objects with support for
	   * partial deep comparisons.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Function} customizer The function to customize comparisons.
	   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	   *  for more details.
	   * @param {Object} stack Tracks traversed `object` and `other` objects.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	    var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	        objProps = keys(object),
	        objLength = objProps.length,
	        othProps = keys(other),
	        othLength = othProps.length;
	
	    if (objLength != othLength && !isPartial) {
	      return false;
	    }
	    var index = objLength;
	    while (index--) {
	      var key = objProps[index];
	      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	        return false;
	      }
	    }
	    var result = true;
	
	    var skipCtor = isPartial;
	    while (++index < objLength) {
	      key = objProps[index];
	      var objValue = object[key],
	          othValue = other[key];
	
	      var compared;
	      // Recursively compare objects (susceptible to call stack limits).
	      if (!(compared === undefined
	            ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	            : compared
	          )) {
	        result = false;
	        break;
	      }
	      skipCtor || (skipCtor = key == 'constructor');
	    }
	    if (result && !skipCtor) {
	      var objCtor = object.constructor,
	          othCtor = other.constructor;
	
	      // Non `Object` object instances with different constructors are not equal.
	      if (objCtor != othCtor &&
	          ('constructor' in object && 'constructor' in other) &&
	          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	        result = false;
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Gets the "length" property value of `object`.
	   *
	   * **Note:** This function is used to avoid a
	   * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	   * Safari on at least iOS 8.1-8.3 ARM64.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {*} Returns the "length" value.
	   */
	  var getLength = baseProperty('length');
	
	  /**
	   * Creates an array of index keys for `object` values of arrays,
	   * `arguments` objects, and strings, otherwise `null` is returned.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array|null} Returns index keys, else `null`.
	   */
	  function indexKeys(object) {
	    var length = object ? object.length : undefined;
	    if (isLength(length) &&
	        (isArray(object) || isString(object) || isArguments(object))) {
	      return baseTimes(length, String);
	    }
	    return null;
	  }
	
	  /**
	   * Checks if `value` is likely a prototype object.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	   */
	  function isPrototype(value) {
	    var Ctor = value && value.constructor,
	        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	    return value === proto;
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Creates an array with all falsey values removed. The values `false`, `null`,
	   * `0`, `""`, `undefined`, and `NaN` are falsey.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Array
	   * @param {Array} array The array to compact.
	   * @returns {Array} Returns the new array of filtered values.
	   * @example
	   *
	   * _.compact([0, 1, false, 2, '', 3]);
	   * // => [1, 2, 3]
	   */
	  function compact(array) {
	    return baseFilter(array, Boolean);
	  }
	
	  /**
	   * Creates a new array concatenating `array` with any additional arrays
	   * and/or values.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Array
	   * @param {Array} array The array to concatenate.
	   * @param {...*} [values] The values to concatenate.
	   * @returns {Array} Returns the new concatenated array.
	   * @example
	   *
	   * var array = [1];
	   * var other = _.concat(array, 2, [3], [[4]]);
	   *
	   * console.log(other);
	   * // => [1, 2, 3, [4]]
	   *
	   * console.log(array);
	   * // => [1]
	   */
	  function concat() {
	    var length = arguments.length,
	        array = castArray(arguments[0]);
	
	    if (length < 2) {
	      return length ? copyArray(array) : [];
	    }
	    var args = Array(length - 1);
	    while (length--) {
	      args[length - 1] = arguments[length];
	    }
	    return arrayConcat(array, baseFlatten(args, 1));
	  }
	
	  /**
	   * Flattens `array` a single level deep.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Array
	   * @param {Array} array The array to flatten.
	   * @returns {Array} Returns the new flattened array.
	   * @example
	   *
	   * _.flatten([1, [2, [3, [4]], 5]]);
	   * // => [1, 2, [3, [4]], 5]
	   */
	  function flatten(array) {
	    var length = array ? array.length : 0;
	    return length ? baseFlatten(array, 1) : [];
	  }
	
	  /**
	   * Recursively flattens `array`.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Array
	   * @param {Array} array The array to flatten.
	   * @returns {Array} Returns the new flattened array.
	   * @example
	   *
	   * _.flattenDeep([1, [2, [3, [4]], 5]]);
	   * // => [1, 2, 3, 4, 5]
	   */
	  function flattenDeep(array) {
	    var length = array ? array.length : 0;
	    return length ? baseFlatten(array, INFINITY) : [];
	  }
	
	  /**
	   * Gets the first element of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @alias first
	   * @category Array
	   * @param {Array} array The array to query.
	   * @returns {*} Returns the first element of `array`.
	   * @example
	   *
	   * _.head([1, 2, 3]);
	   * // => 1
	   *
	   * _.head([]);
	   * // => undefined
	   */
	  function head(array) {
	    return array ? array[0] : undefined;
	  }
	
	  /**
	   * Gets the index at which the first occurrence of `value` is found in `array`
	   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	   * for equality comparisons. If `fromIndex` is negative, it's used as the offset
	   * from the end of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Array
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   * @example
	   *
	   * _.indexOf([1, 2, 1, 2], 2);
	   * // => 1
	   *
	   * // Search from the `fromIndex`.
	   * _.indexOf([1, 2, 1, 2], 2, 2);
	   * // => 3
	   */
	  function indexOf(array, value, fromIndex) {
	    var length = array ? array.length : 0;
	    if (typeof fromIndex == 'number') {
	      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
	    } else {
	      fromIndex = 0;
	    }
	    var index = (fromIndex || 0) - 1,
	        isReflexive = value === value;
	
	    while (++index < length) {
	      var other = array[index];
	      if ((isReflexive ? other === value : other !== other)) {
	        return index;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * Gets the last element of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Array
	   * @param {Array} array The array to query.
	   * @returns {*} Returns the last element of `array`.
	   * @example
	   *
	   * _.last([1, 2, 3]);
	   * // => 3
	   */
	  function last(array) {
	    var length = array ? array.length : 0;
	    return length ? array[length - 1] : undefined;
	  }
	
	  /**
	   * Creates a slice of `array` from `start` up to, but not including, `end`.
	   *
	   * **Note:** This method is used instead of
	   * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
	   * returned.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Array
	   * @param {Array} array The array to slice.
	   * @param {number} [start=0] The start position.
	   * @param {number} [end=array.length] The end position.
	   * @returns {Array} Returns the slice of `array`.
	   */
	  function slice(array, start, end) {
	    var length = array ? array.length : 0;
	    start = start == null ? 0 : +start;
	    end = end === undefined ? length : +end;
	    return length ? baseSlice(array, start, end) : [];
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Creates a `lodash` wrapper instance that wraps `value` with explicit method
	   * chain sequences enabled. The result of such sequences must be unwrapped
	   * with `_#value`.
	   *
	   * @static
	   * @memberOf _
	   * @since 1.3.0
	   * @category Seq
	   * @param {*} value The value to wrap.
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney',  'age': 36 },
	   *   { 'user': 'fred',    'age': 40 },
	   *   { 'user': 'pebbles', 'age': 1 }
	   * ];
	   *
	   * var youngest = _
	   *   .chain(users)
	   *   .sortBy('age')
	   *   .map(function(o) {
	   *     return o.user + ' is ' + o.age;
	   *   })
	   *   .head()
	   *   .value();
	   * // => 'pebbles is 1'
	   */
	  function chain(value) {
	    var result = lodash(value);
	    result.__chain__ = true;
	    return result;
	  }
	
	  /**
	   * This method invokes `interceptor` and returns `value`. The interceptor
	   * is invoked with one argument; (value). The purpose of this method is to
	   * "tap into" a method chain sequence in order to modify intermediate results.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Seq
	   * @param {*} value The value to provide to `interceptor`.
	   * @param {Function} interceptor The function to invoke.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * _([1, 2, 3])
	   *  .tap(function(array) {
	   *    // Mutate input array.
	   *    array.pop();
	   *  })
	   *  .reverse()
	   *  .value();
	   * // => [2, 1]
	   */
	  function tap(value, interceptor) {
	    interceptor(value);
	    return value;
	  }
	
	  /**
	   * This method is like `_.tap` except that it returns the result of `interceptor`.
	   * The purpose of this method is to "pass thru" values replacing intermediate
	   * results in a method chain sequence.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Seq
	   * @param {*} value The value to provide to `interceptor`.
	   * @param {Function} interceptor The function to invoke.
	   * @returns {*} Returns the result of `interceptor`.
	   * @example
	   *
	   * _('  abc  ')
	   *  .chain()
	   *  .trim()
	   *  .thru(function(value) {
	   *    return [value];
	   *  })
	   *  .value();
	   * // => ['abc']
	   */
	  function thru(value, interceptor) {
	    return interceptor(value);
	  }
	
	  /**
	   * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
	   *
	   * @name chain
	   * @memberOf _
	   * @since 0.1.0
	   * @category Seq
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36 },
	   *   { 'user': 'fred',   'age': 40 }
	   * ];
	   *
	   * // A sequence without explicit chaining.
	   * _(users).head();
	   * // => { 'user': 'barney', 'age': 36 }
	   *
	   * // A sequence with explicit chaining.
	   * _(users)
	   *   .chain()
	   *   .head()
	   *   .pick('user')
	   *   .value();
	   * // => { 'user': 'barney' }
	   */
	  function wrapperChain() {
	    return chain(this);
	  }
	
	  /**
	   * Executes the chain sequence to resolve the unwrapped value.
	   *
	   * @name value
	   * @memberOf _
	   * @since 0.1.0
	   * @alias toJSON, valueOf
	   * @category Seq
	   * @returns {*} Returns the resolved unwrapped value.
	   * @example
	   *
	   * _([1, 2, 3]).value();
	   * // => [1, 2, 3]
	   */
	  function wrapperValue() {
	    return baseWrapperValue(this.__wrapped__, this.__actions__);
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Checks if `predicate` returns truthy for **all** elements of `collection`.
	   * Iteration is stopped once `predicate` returns falsey. The predicate is
	   * invoked with three arguments: (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Array|Function|Object|string} [predicate=_.identity]
	   *  The function invoked per iteration.
	   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check,
	   *  else `false`.
	   * @example
	   *
	   * _.every([true, 1, null, 'yes'], Boolean);
	   * // => false
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': false },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.every(users, { 'user': 'barney', 'active': false });
	   * // => false
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.every(users, ['active', false]);
	   * // => true
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.every(users, 'active');
	   * // => false
	   */
	  function every(collection, predicate, guard) {
	    predicate = guard ? undefined : predicate;
	    return baseEvery(collection, baseIteratee(predicate));
	  }
	
	  /**
	   * Iterates over elements of `collection`, returning an array of all elements
	   * `predicate` returns truthy for. The predicate is invoked with three
	   * arguments: (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Array|Function|Object|string} [predicate=_.identity]
	   *  The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': true },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * _.filter(users, function(o) { return !o.active; });
	   * // => objects for ['fred']
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.filter(users, { 'age': 36, 'active': true });
	   * // => objects for ['barney']
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.filter(users, ['active', false]);
	   * // => objects for ['fred']
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.filter(users, 'active');
	   * // => objects for ['barney']
	   */
	  function filter(collection, predicate) {
	    return baseFilter(collection, baseIteratee(predicate));
	  }
	
	  /**
	   * Iterates over elements of `collection`, returning the first element
	   * `predicate` returns truthy for. The predicate is invoked with three
	   * arguments: (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to search.
	   * @param {Array|Function|Object|string} [predicate=_.identity]
	   *  The function invoked per iteration.
	   * @returns {*} Returns the matched element, else `undefined`.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney',  'age': 36, 'active': true },
	   *   { 'user': 'fred',    'age': 40, 'active': false },
	   *   { 'user': 'pebbles', 'age': 1,  'active': true }
	   * ];
	   *
	   * _.find(users, function(o) { return o.age < 40; });
	   * // => object for 'barney'
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.find(users, { 'age': 1, 'active': true });
	   * // => object for 'pebbles'
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.find(users, ['active', false]);
	   * // => object for 'fred'
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.find(users, 'active');
	   * // => object for 'barney'
	   */
	  function find(collection, predicate) {
	    return baseFind(collection, baseIteratee(predicate), baseEach);
	  }
	
	  /**
	   * Iterates over elements of `collection` invoking `iteratee` for each element.
	   * The iteratee is invoked with three arguments: (value, index|key, collection).
	   * Iteratee functions may exit iteration early by explicitly returning `false`.
	   *
	   * **Note:** As with other "Collections" methods, objects with a "length"
	   * property are iterated like arrays. To avoid this behavior use `_.forIn`
	   * or `_.forOwn` for object iteration.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @alias each
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @returns {Array|Object} Returns `collection`.
	   * @example
	   *
	   * _([1, 2]).forEach(function(value) {
	   *   console.log(value);
	   * });
	   * // => Logs `1` then `2`.
	   *
	   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	   *   console.log(key);
	   * });
	   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	   */
	  function forEach(collection, iteratee) {
	    return baseEach(collection, baseIteratee(iteratee));
	  }
	
	  /**
	   * Creates an array of values by running each element in `collection` through
	   * `iteratee`. The iteratee is invoked with three arguments:
	   * (value, index|key, collection).
	   *
	   * Many lodash methods are guarded to work as iteratees for methods like
	   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	   *
	   * The guarded methods are:
	   * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
	   * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
	   * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
	   * and `words`
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Array|Function|Object|string} [iteratee=_.identity]
	   *  The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   * @example
	   *
	   * function square(n) {
	   *   return n * n;
	   * }
	   *
	   * _.map([4, 8], square);
	   * // => [16, 64]
	   *
	   * _.map({ 'a': 4, 'b': 8 }, square);
	   * // => [16, 64] (iteration order is not guaranteed)
	   *
	   * var users = [
	   *   { 'user': 'barney' },
	   *   { 'user': 'fred' }
	   * ];
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.map(users, 'user');
	   * // => ['barney', 'fred']
	   */
	  function map(collection, iteratee) {
	    return baseMap(collection, baseIteratee(iteratee));
	  }
	
	  /**
	   * Reduces `collection` to a value which is the accumulated result of running
	   * each element in `collection` through `iteratee`, where each successive
	   * invocation is supplied the return value of the previous. If `accumulator`
	   * is not given the first element of `collection` is used as the initial
	   * value. The iteratee is invoked with four arguments:
	   * (accumulator, value, index|key, collection).
	   *
	   * Many lodash methods are guarded to work as iteratees for methods like
	   * `_.reduce`, `_.reduceRight`, and `_.transform`.
	   *
	   * The guarded methods are:
	   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	   * and `sortBy`
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @returns {*} Returns the accumulated value.
	   * @example
	   *
	   * _.reduce([1, 2], function(sum, n) {
	   *   return sum + n;
	   * }, 0);
	   * // => 3
	   *
	   * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	   *   (result[value] || (result[value] = [])).push(key);
	   *   return result;
	   * }, {});
	   * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	   */
	  function reduce(collection, iteratee, accumulator) {
	    return baseReduce(collection, baseIteratee(iteratee), accumulator, arguments.length < 3, baseEach);
	  }
	
	  /**
	   * Gets the size of `collection` by returning its length for array-like
	   * values or the number of own enumerable string keyed properties for objects.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to inspect.
	   * @returns {number} Returns the collection size.
	   * @example
	   *
	   * _.size([1, 2, 3]);
	   * // => 3
	   *
	   * _.size({ 'a': 1, 'b': 2 });
	   * // => 2
	   *
	   * _.size('pebbles');
	   * // => 7
	   */
	  function size(collection) {
	    if (collection == null) {
	      return 0;
	    }
	    collection = isArrayLike(collection) ? collection : keys(collection);
	    return collection.length;
	  }
	
	  /**
	   * Checks if `predicate` returns truthy for **any** element of `collection`.
	   * Iteration is stopped once `predicate` returns truthy. The predicate is
	   * invoked with three arguments: (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Array|Function|Object|string} [predicate=_.identity]
	   *  The function invoked per iteration.
	   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	   * @returns {boolean} Returns `true` if any element passes the predicate check,
	   *  else `false`.
	   * @example
	   *
	   * _.some([null, 0, 'yes', false], Boolean);
	   * // => true
	   *
	   * var users = [
	   *   { 'user': 'barney', 'active': true },
	   *   { 'user': 'fred',   'active': false }
	   * ];
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.some(users, { 'user': 'barney', 'active': false });
	   * // => false
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.some(users, ['active', false]);
	   * // => true
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.some(users, 'active');
	   * // => true
	   */
	  function some(collection, predicate, guard) {
	    predicate = guard ? undefined : predicate;
	    return baseSome(collection, baseIteratee(predicate));
	  }
	
	  /**
	   * Creates an array of elements, sorted in ascending order by the results of
	   * running each element in a collection through each iteratee. This method
	   * performs a stable sort, that is, it preserves the original sort order of
	   * equal elements. The iteratees are invoked with one argument: (value).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])}
	   *  [iteratees=[_.identity]] The iteratees to sort by, specified individually
	   *  or in arrays.
	   * @returns {Array} Returns the new sorted array.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'fred',   'age': 48 },
	   *   { 'user': 'barney', 'age': 36 },
	   *   { 'user': 'fred',   'age': 40 },
	   *   { 'user': 'barney', 'age': 34 }
	   * ];
	   *
	   * _.sortBy(users, function(o) { return o.user; });
	   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	   *
	   * _.sortBy(users, ['user', 'age']);
	   * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
	   *
	   * _.sortBy(users, 'user', function(o) {
	   *   return Math.floor(o.age / 10);
	   * });
	   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	   */
	  function sortBy(collection, iteratee) {
	    var index = 0;
	    iteratee = baseIteratee(iteratee);
	
	    return baseMap(baseMap(collection, function(value, key, collection) {
	      return { 'value': value, 'index': index++, 'criteria': iteratee(value, key, collection) };
	    }).sort(function(object, other) {
	      return compareAscending(object.criteria, other.criteria) || (object.index - other.index);
	    }), baseProperty('value'));
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Creates a function that invokes `func`, with the `this` binding and arguments
	   * of the created function, while it's called less than `n` times. Subsequent
	   * calls to the created function return the result of the last `func` invocation.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Function
	   * @param {number} n The number of calls at which `func` is no longer invoked.
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * jQuery(element).on('click', _.before(5, addContactToList));
	   * // => allows adding up to 4 contacts to the list
	   */
	  function before(n, func) {
	    var result;
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    n = toInteger(n);
	    return function() {
	      if (--n > 0) {
	        result = func.apply(this, arguments);
	      }
	      if (n <= 1) {
	        func = undefined;
	      }
	      return result;
	    };
	  }
	
	  /**
	   * Creates a function that invokes `func` with the `this` binding of `thisArg`
	   * and prepends any additional `_.bind` arguments to those provided to the
	   * bound function.
	   *
	   * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	   * may be used as a placeholder for partially applied arguments.
	   *
	   * **Note:** Unlike native `Function#bind` this method doesn't set the "length"
	   * property of bound functions.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Function
	   * @param {Function} func The function to bind.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {...*} [partials] The arguments to be partially applied.
	   * @returns {Function} Returns the new bound function.
	   * @example
	   *
	   * var greet = function(greeting, punctuation) {
	   *   return greeting + ' ' + this.user + punctuation;
	   * };
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * var bound = _.bind(greet, object, 'hi');
	   * bound('!');
	   * // => 'hi fred!'
	   *
	   * // Bound with placeholders.
	   * var bound = _.bind(greet, object, _, '!');
	   * bound('hi');
	   * // => 'hi fred!'
	   */
	  var bind = rest(function(func, thisArg, partials) {
	    return createPartialWrapper(func, BIND_FLAG | PARTIAL_FLAG, thisArg, partials);
	  });
	
	  /**
	   * Defers invoking the `func` until the current call stack has cleared. Any
	   * additional arguments are provided to `func` when it's invoked.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Function
	   * @param {Function} func The function to defer.
	   * @param {...*} [args] The arguments to invoke `func` with.
	   * @returns {number} Returns the timer id.
	   * @example
	   *
	   * _.defer(function(text) {
	   *   console.log(text);
	   * }, 'deferred');
	   * // => Logs 'deferred' after one or more milliseconds.
	   */
	  var defer = rest(function(func, args) {
	    return baseDelay(func, 1, args);
	  });
	
	  /**
	   * Invokes `func` after `wait` milliseconds. Any additional arguments are
	   * provided to `func` when it's invoked.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Function
	   * @param {Function} func The function to delay.
	   * @param {number} wait The number of milliseconds to delay invocation.
	   * @param {...*} [args] The arguments to invoke `func` with.
	   * @returns {number} Returns the timer id.
	   * @example
	   *
	   * _.delay(function(text) {
	   *   console.log(text);
	   * }, 1000, 'later');
	   * // => Logs 'later' after one second.
	   */
	  var delay = rest(function(func, wait, args) {
	    return baseDelay(func, toNumber(wait) || 0, args);
	  });
	
	  /**
	   * Creates a function that negates the result of the predicate `func`. The
	   * `func` predicate is invoked with the `this` binding and arguments of the
	   * created function.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Function
	   * @param {Function} predicate The predicate to negate.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * function isEven(n) {
	   *   return n % 2 == 0;
	   * }
	   *
	   * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	   * // => [1, 3, 5]
	   */
	  function negate(predicate) {
	    if (typeof predicate != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  }
	
	  /**
	   * Creates a function that is restricted to invoking `func` once. Repeat calls
	   * to the function return the value of the first invocation. The `func` is
	   * invoked with the `this` binding and arguments of the created function.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Function
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * var initialize = _.once(createApplication);
	   * initialize();
	   * initialize();
	   * // `initialize` invokes `createApplication` once
	   */
	  function once(func) {
	    return before(2, func);
	  }
	
	  /**
	   * Creates a function that invokes `func` with the `this` binding of the
	   * created function and arguments from `start` and beyond provided as
	   * an array.
	   *
	   * **Note:** This method is based on the
	   * [rest parameter](https://mdn.io/rest_parameters).
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Function
	   * @param {Function} func The function to apply a rest parameter to.
	   * @param {number} [start=func.length-1] The start position of the rest parameter.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var say = _.rest(function(what, names) {
	   *   return what + ' ' + _.initial(names).join(', ') +
	   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	   * });
	   *
	   * say('hello', 'fred', 'barney', 'pebbles');
	   * // => 'hello fred, barney, & pebbles'
	   */
	  function rest(func, start) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	    return function() {
	      var args = arguments,
	          index = -1,
	          length = nativeMax(args.length - start, 0),
	          array = Array(length);
	
	      while (++index < length) {
	        array[index] = args[start + index];
	      }
	      var otherArgs = Array(start + 1);
	      index = -1;
	      while (++index < start) {
	        otherArgs[index] = args[index];
	      }
	      otherArgs[start] = array;
	      return func.apply(this, otherArgs);
	    };
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Casts `value` as an array if it's not one.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.4.0
	   * @category Lang
	   * @param {*} value The value to inspect.
	   * @returns {Array} Returns the cast array.
	   * @example
	   *
	   * _.castArray(1);
	   * // => [1]
	   *
	   * _.castArray({ 'a': 1 });
	   * // => [{ 'a': 1 }]
	   *
	   * _.castArray('abc');
	   * // => ['abc']
	   *
	   * _.castArray(null);
	   * // => [null]
	   *
	   * _.castArray(undefined);
	   * // => [undefined]
	   *
	   * _.castArray();
	   * // => []
	   *
	   * var array = [1, 2, 3];
	   * console.log(_.castArray(array) === array);
	   * // => true
	   */
	  function castArray() {
	    if (!arguments.length) {
	      return [];
	    }
	    var value = arguments[0];
	    return isArray(value) ? value : [value];
	  }
	
	  /**
	   * Creates a shallow clone of `value`.
	   *
	   * **Note:** This method is loosely based on the
	   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	   * and supports cloning arrays, array buffers, booleans, date objects, maps,
	   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	   * arrays. The own enumerable properties of `arguments` objects are cloned
	   * as plain objects. An empty object is returned for uncloneable values such
	   * as error objects, functions, DOM nodes, and WeakMaps.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to clone.
	   * @returns {*} Returns the cloned value.
	   * @example
	   *
	   * var objects = [{ 'a': 1 }, { 'b': 2 }];
	   *
	   * var shallow = _.clone(objects);
	   * console.log(shallow[0] === objects[0]);
	   * // => true
	   */
	  function clone(value) {
	    if (!isObject(value)) {
	      return value;
	    }
	    return isArray(value) ? copyArray(value) : copyObject(value, keys(value));
	  }
	
	  /**
	   * Performs a
	   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	   * comparison between two values to determine if they are equivalent.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   * var other = { 'user': 'fred' };
	   *
	   * _.eq(object, object);
	   * // => true
	   *
	   * _.eq(object, other);
	   * // => false
	   *
	   * _.eq('a', 'a');
	   * // => true
	   *
	   * _.eq('a', Object('a'));
	   * // => false
	   *
	   * _.eq(NaN, NaN);
	   * // => true
	   */
	  function eq(value, other) {
	    return value === other || (value !== value && other !== other);
	  }
	
	  /**
	   * Checks if `value` is greater than `other`.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.9.0
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if `value` is greater than `other`,
	   *  else `false`.
	   * @example
	   *
	   * _.gt(3, 1);
	   * // => true
	   *
	   * _.gt(3, 3);
	   * // => false
	   *
	   * _.gt(1, 3);
	   * // => false
	   */
	  function gt(value, other) {
	    return value > other;
	  }
	
	  /**
	   * Checks if `value` is likely an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified,
	   *  else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	      (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	  }
	
	  /**
	   * Checks if `value` is classified as an `Array` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @type {Function}
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified,
	   *  else `false`.
	   * @example
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   *
	   * _.isArray(document.body.children);
	   * // => false
	   *
	   * _.isArray('abc');
	   * // => false
	   *
	   * _.isArray(_.noop);
	   * // => false
	   */
	  var isArray = Array.isArray;
	
	  /**
	   * Checks if `value` is array-like. A value is considered array-like if it's
	   * not a function and has a `value.length` that's an integer greater than or
	   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	   * @example
	   *
	   * _.isArrayLike([1, 2, 3]);
	   * // => true
	   *
	   * _.isArrayLike(document.body.children);
	   * // => true
	   *
	   * _.isArrayLike('abc');
	   * // => true
	   *
	   * _.isArrayLike(_.noop);
	   * // => false
	   */
	  function isArrayLike(value) {
	    return value != null && isLength(getLength(value)) && !isFunction(value);
	  }
	
	  /**
	   * This method is like `_.isArrayLike` except that it also checks if `value`
	   * is an object.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an array-like object,
	   *  else `false`.
	   * @example
	   *
	   * _.isArrayLikeObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isArrayLikeObject(document.body.children);
	   * // => true
	   *
	   * _.isArrayLikeObject('abc');
	   * // => false
	   *
	   * _.isArrayLikeObject(_.noop);
	   * // => false
	   */
	  function isArrayLikeObject(value) {
	    return isObjectLike(value) && isArrayLike(value);
	  }
	
	  /**
	   * Checks if `value` is classified as a boolean primitive or object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified,
	   *  else `false`.
	   * @example
	   *
	   * _.isBoolean(false);
	   * // => true
	   *
	   * _.isBoolean(null);
	   * // => false
	   */
	  function isBoolean(value) {
	    return value === true || value === false ||
	      (isObjectLike(value) && objectToString.call(value) == boolTag);
	  }
	
	  /**
	   * Checks if `value` is classified as a `Date` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified,
	   *  else `false`.
	   * @example
	   *
	   * _.isDate(new Date);
	   * // => true
	   *
	   * _.isDate('Mon April 23 2012');
	   * // => false
	   */
	  function isDate(value) {
	    return isObjectLike(value) && objectToString.call(value) == dateTag;
	  }
	
	  /**
	   * Checks if `value` is an empty object, collection, map, or set.
	   *
	   * Objects are considered empty if they have no own enumerable string keyed
	   * properties.
	   *
	   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	   * jQuery-like collections are considered empty if they have a `length` of `0`.
	   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	   * @example
	   *
	   * _.isEmpty(null);
	   * // => true
	   *
	   * _.isEmpty(true);
	   * // => true
	   *
	   * _.isEmpty(1);
	   * // => true
	   *
	   * _.isEmpty([1, 2, 3]);
	   * // => false
	   *
	   * _.isEmpty({ 'a': 1 });
	   * // => false
	   */
	  function isEmpty(value) {
	    if (isArrayLike(value) &&
	        (isArray(value) || isString(value) ||
	          isFunction(value.splice) || isArguments(value))) {
	      return !value.length;
	    }
	    for (var key in value) {
	      if (hasOwnProperty.call(value, key)) {
	        return false;
	      }
	    }
	    return !(nonEnumShadows && keys(value).length);
	  }
	
	  /**
	   * Performs a deep comparison between two values to determine if they are
	   * equivalent.
	   *
	   * **Note:** This method supports comparing arrays, array buffers, booleans,
	   * date objects, error objects, maps, numbers, `Object` objects, regexes,
	   * sets, strings, symbols, and typed arrays. `Object` objects are compared
	   * by their own, not inherited, enumerable properties. Functions and DOM
	   * nodes are **not** supported.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if the values are equivalent,
	   *  else `false`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   * var other = { 'user': 'fred' };
	   *
	   * _.isEqual(object, other);
	   * // => true
	   *
	   * object === other;
	   * // => false
	   */
	  function isEqual(value, other) {
	    return baseIsEqual(value, other);
	  }
	
	  /**
	   * Checks if `value` is a finite primitive number.
	   *
	   * **Note:** This method is based on
	   * [`Number.isFinite`](https://mdn.io/Number/isFinite).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a finite number,
	   *  else `false`.
	   * @example
	   *
	   * _.isFinite(3);
	   * // => true
	   *
	   * _.isFinite(Number.MAX_VALUE);
	   * // => true
	   *
	   * _.isFinite(3.14);
	   * // => true
	   *
	   * _.isFinite(Infinity);
	   * // => false
	   */
	  function isFinite(value) {
	    return typeof value == 'number' && nativeIsFinite(value);
	  }
	
	  /**
	   * Checks if `value` is classified as a `Function` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified,
	   *  else `false`.
	   * @example
	   *
	   * _.isFunction(_);
	   * // => true
	   *
	   * _.isFunction(/abc/);
	   * // => false
	   */
	  function isFunction(value) {
	    // The use of `Object#toString` avoids issues with the `typeof` operator
	    // in Safari 8 which returns 'object' for typed array and weak map constructors,
	    // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	    var tag = isObject(value) ? objectToString.call(value) : '';
	    return tag == funcTag || tag == genTag;
	  }
	
	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This function is loosely based on
	   * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a valid length,
	   *  else `false`.
	   * @example
	   *
	   * _.isLength(3);
	   * // => true
	   *
	   * _.isLength(Number.MIN_VALUE);
	   * // => false
	   *
	   * _.isLength(Infinity);
	   * // => false
	   *
	   * _.isLength('3');
	   * // => false
	   */
	  function isLength(value) {
	    return typeof value == 'number' &&
	      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	  }
	
	  /**
	   * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	   * @example
	   *
	   * _.isObject({});
	   * // => true
	   *
	   * _.isObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isObject(_.noop);
	   * // => true
	   *
	   * _.isObject(null);
	   * // => false
	   */
	  function isObject(value) {
	    var type = typeof value;
	    return !!value && (type == 'object' || type == 'function');
	  }
	
	  /**
	   * Checks if `value` is object-like. A value is object-like if it's not `null`
	   * and has a `typeof` result of "object".
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   * @example
	   *
	   * _.isObjectLike({});
	   * // => true
	   *
	   * _.isObjectLike([1, 2, 3]);
	   * // => true
	   *
	   * _.isObjectLike(_.noop);
	   * // => false
	   *
	   * _.isObjectLike(null);
	   * // => false
	   */
	  function isObjectLike(value) {
	    return !!value && typeof value == 'object';
	  }
	
	  /**
	   * Checks if `value` is `NaN`.
	   *
	   * **Note:** This method is not the same as
	   * [`isNaN`](https://es5.github.io/#x15.1.2.4) which returns `true` for
	   * `undefined` and other non-numeric values.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	   * @example
	   *
	   * _.isNaN(NaN);
	   * // => true
	   *
	   * _.isNaN(new Number(NaN));
	   * // => true
	   *
	   * isNaN(undefined);
	   * // => true
	   *
	   * _.isNaN(undefined);
	   * // => false
	   */
	  function isNaN(value) {
	    // An `NaN` primitive is the only value that is not equal to itself.
	    // Perform the `toStringTag` check first to avoid errors with some
	    // ActiveX objects in IE.
	    return isNumber(value) && value != +value;
	  }
	
	  /**
	   * Checks if `value` is `null`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	   * @example
	   *
	   * _.isNull(null);
	   * // => true
	   *
	   * _.isNull(void 0);
	   * // => false
	   */
	  function isNull(value) {
	    return value === null;
	  }
	
	  /**
	   * Checks if `value` is classified as a `Number` primitive or object.
	   *
	   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	   * classified as numbers, use the `_.isFinite` method.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified,
	   *  else `false`.
	   * @example
	   *
	   * _.isNumber(3);
	   * // => true
	   *
	   * _.isNumber(Number.MIN_VALUE);
	   * // => true
	   *
	   * _.isNumber(Infinity);
	   * // => true
	   *
	   * _.isNumber('3');
	   * // => false
	   */
	  function isNumber(value) {
	    return typeof value == 'number' ||
	      (isObjectLike(value) && objectToString.call(value) == numberTag);
	  }
	
	  /**
	   * Checks if `value` is classified as a `RegExp` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified,
	   *  else `false`.
	   * @example
	   *
	   * _.isRegExp(/abc/);
	   * // => true
	   *
	   * _.isRegExp('/abc/');
	   * // => false
	   */
	  function isRegExp(value) {
	    return isObject(value) && objectToString.call(value) == regexpTag;
	  }
	
	  /**
	   * Checks if `value` is classified as a `String` primitive or object.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified,
	   *  else `false`.
	   * @example
	   *
	   * _.isString('abc');
	   * // => true
	   *
	   * _.isString(1);
	   * // => false
	   */
	  function isString(value) {
	    return typeof value == 'string' ||
	      (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	  }
	
	  /**
	   * Checks if `value` is `undefined`.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	   * @example
	   *
	   * _.isUndefined(void 0);
	   * // => true
	   *
	   * _.isUndefined(null);
	   * // => false
	   */
	  function isUndefined(value) {
	    return value === undefined;
	  }
	
	  /**
	   * Checks if `value` is less than `other`.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.9.0
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if `value` is less than `other`,
	   *  else `false`.
	   * @example
	   *
	   * _.lt(1, 3);
	   * // => true
	   *
	   * _.lt(3, 3);
	   * // => false
	   *
	   * _.lt(3, 1);
	   * // => false
	   */
	  function lt(value, other) {
	    return value < other;
	  }
	
	  /**
	   * Converts `value` to an array.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {Array} Returns the converted array.
	   * @example
	   *
	   * _.toArray({ 'a': 1, 'b': 2 });
	   * // => [1, 2]
	   *
	   * _.toArray('abc');
	   * // => ['a', 'b', 'c']
	   *
	   * _.toArray(1);
	   * // => []
	   *
	   * _.toArray(null);
	   * // => []
	   */
	  function toArray(value) {
	    if (!isArrayLike(value)) {
	      return values(value);
	    }
	    return value.length ? copyArray(value) : [];
	  }
	
	  /**
	   * Converts `value` to an integer.
	   *
	   * **Note:** This function is loosely based on
	   * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {number} Returns the converted integer.
	   * @example
	   *
	   * _.toInteger(3);
	   * // => 3
	   *
	   * _.toInteger(Number.MIN_VALUE);
	   * // => 0
	   *
	   * _.toInteger(Infinity);
	   * // => 1.7976931348623157e+308
	   *
	   * _.toInteger('3');
	   * // => 3
	   */
	  var toInteger = Number;
	
	  /**
	   * Converts `value` to a number.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to process.
	   * @returns {number} Returns the number.
	   * @example
	   *
	   * _.toNumber(3);
	   * // => 3
	   *
	   * _.toNumber(Number.MIN_VALUE);
	   * // => 5e-324
	   *
	   * _.toNumber(Infinity);
	   * // => Infinity
	   *
	   * _.toNumber('3');
	   * // => 3
	   */
	  var toNumber = Number;
	
	  /**
	   * Converts `value` to a string if it's not one. An empty string is returned
	   * for `null` and `undefined` values. The sign of `-0` is preserved.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   * @example
	   *
	   * _.toString(null);
	   * // => ''
	   *
	   * _.toString(-0);
	   * // => '-0'
	   *
	   * _.toString([1, 2, 3]);
	   * // => '1,2,3'
	   */
	  function toString(value) {
	    if (typeof value == 'string') {
	      return value;
	    }
	    return value == null ? '' : (value + '');
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Assigns own enumerable string keyed properties of source objects to the
	   * destination object. Source objects are applied from left to right.
	   * Subsequent sources overwrite property assignments of previous sources.
	   *
	   * **Note:** This method mutates `object` and is loosely based on
	   * [`Object.assign`](https://mdn.io/Object/assign).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.10.0
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * function Foo() {
	   *   this.c = 3;
	   * }
	   *
	   * function Bar() {
	   *   this.e = 5;
	   * }
	   *
	   * Foo.prototype.d = 4;
	   * Bar.prototype.f = 6;
	   *
	   * _.assign({ 'a': 1 }, new Foo, new Bar);
	   * // => { 'a': 1, 'c': 3, 'e': 5 }
	   */
	  var assign = createAssigner(function(object, source) {
	    copyObject(source, keys(source), object);
	  });
	
	  /**
	   * This method is like `_.assign` except that it iterates over own and
	   * inherited source properties.
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @alias extend
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * function Foo() {
	   *   this.b = 2;
	   * }
	   *
	   * function Bar() {
	   *   this.d = 4;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   * Bar.prototype.e = 5;
	   *
	   * _.assignIn({ 'a': 1 }, new Foo, new Bar);
	   * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
	   */
	  var assignIn = createAssigner(function(object, source) {
	    copyObject(source, keysIn(source), object);
	  });
	
	  /**
	   * This method is like `_.assignIn` except that it accepts `customizer`
	   * which is invoked to produce the assigned values. If `customizer` returns
	   * `undefined` assignment is handled by the method instead. The `customizer`
	   * is invoked with five arguments: (objValue, srcValue, key, object, source).
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @alias extendWith
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} sources The source objects.
	   * @param {Function} [customizer] The function to customize assigned values.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * function customizer(objValue, srcValue) {
	   *   return _.isUndefined(objValue) ? srcValue : objValue;
	   * }
	   *
	   * var defaults = _.partialRight(_.assignInWith, customizer);
	   *
	   * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	   * // => { 'a': 1, 'b': 2 }
	   */
	  var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	    copyObjectWith(source, keysIn(source), object, customizer);
	  });
	
	  /**
	   * Creates an object that inherits from the `prototype` object. If a
	   * `properties` object is given its own enumerable string keyed properties
	   * are assigned to the created object.
	   *
	   * @static
	   * @memberOf _
	   * @since 2.3.0
	   * @category Object
	   * @param {Object} prototype The object to inherit from.
	   * @param {Object} [properties] The properties to assign to the object.
	   * @returns {Object} Returns the new object.
	   * @example
	   *
	   * function Shape() {
	   *   this.x = 0;
	   *   this.y = 0;
	   * }
	   *
	   * function Circle() {
	   *   Shape.call(this);
	   * }
	   *
	   * Circle.prototype = _.create(Shape.prototype, {
	   *   'constructor': Circle
	   * });
	   *
	   * var circle = new Circle;
	   * circle instanceof Circle;
	   * // => true
	   *
	   * circle instanceof Shape;
	   * // => true
	   */
	  function create(prototype, properties) {
	    var result = baseCreate(prototype);
	    return properties ? assign(result, properties) : result;
	  }
	
	  /**
	   * Assigns own and inherited enumerable string keyed properties of source
	   * objects to the destination object for all destination properties that
	   * resolve to `undefined`. Source objects are applied from left to right.
	   * Once a property is set, additional values of the same property are ignored.
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	   * // => { 'user': 'barney', 'age': 36 }
	   */
	  var defaults = rest(function(args) {
	    args.push(undefined, assignInDefaults);
	    return assignInWith.apply(undefined, args);
	  });
	
	  /**
	   * Checks if `path` is a direct property of `object`.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @param {Array|string} path The path to check.
	   * @returns {boolean} Returns `true` if `path` exists, else `false`.
	   * @example
	   *
	   * var object = { 'a': { 'b': { 'c': 3 } } };
	   * var other = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	   *
	   * _.has(object, 'a');
	   * // => true
	   *
	   * _.has(object, 'a.b.c');
	   * // => true
	   *
	   * _.has(object, ['a', 'b', 'c']);
	   * // => true
	   *
	   * _.has(other, 'a');
	   * // => false
	   */
	  function has(object, path) {
	    return object != null && hasOwnProperty.call(object, path);
	  }
	
	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	   * for more details.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keys(new Foo);
	   * // => ['a', 'b'] (iteration order is not guaranteed)
	   *
	   * _.keys('hi');
	   * // => ['0', '1']
	   */
	  function keys(object) {
	    var isProto = isPrototype(object);
	    if (!(isProto || isArrayLike(object))) {
	      return baseKeys(object);
	    }
	    var indexes = indexKeys(object),
	        skipIndexes = !!indexes,
	        result = indexes || [],
	        length = result.length;
	
	    for (var key in object) {
	      if (hasOwnProperty.call(object, key) &&
	          !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	          !(isProto && key == 'constructor')) {
	        result.push(key);
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  function keysIn(object) {
	    var index = -1,
	        isProto = isPrototype(object),
	        props = baseKeysIn(object),
	        propsLength = props.length,
	        indexes = indexKeys(object),
	        skipIndexes = !!indexes,
	        result = indexes || [],
	        length = result.length;
	
	    while (++index < propsLength) {
	      var key = props[index];
	      if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	        result.push(key);
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Creates an object composed of the picked `object` properties.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The source object.
	   * @param {...(string|string[])} [props] The property identifiers to pick,
	   *  specified individually or in arrays.
	   * @returns {Object} Returns the new object.
	   * @example
	   *
	   * var object = { 'a': 1, 'b': '2', 'c': 3 };
	   *
	   * _.pick(object, ['a', 'c']);
	   * // => { 'a': 1, 'c': 3 }
	   */
	  var pick = rest(function(object, props) {
	    return object == null ? {} : basePick(object, baseFlatten(props, 1));
	  });
	
	  /**
	   * This method is like `_.get` except that if the resolved value is a
	   * function it's invoked with the `this` binding of its parent object and
	   * its result is returned.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @param {Array|string} path The path of the property to resolve.
	   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	   * @returns {*} Returns the resolved value.
	   * @example
	   *
	   * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	   *
	   * _.result(object, 'a[0].b.c1');
	   * // => 3
	   *
	   * _.result(object, 'a[0].b.c2');
	   * // => 4
	   *
	   * _.result(object, 'a[0].b.c3', 'default');
	   * // => 'default'
	   *
	   * _.result(object, 'a[0].b.c3', _.constant('default'));
	   * // => 'default'
	   */
	  function result(object, path, defaultValue) {
	    var value = object == null ? undefined : object[path];
	    if (value === undefined) {
	      value = defaultValue;
	    }
	    return isFunction(value) ? value.call(object) : value;
	  }
	
	  /**
	   * Creates an array of the own enumerable string keyed property values of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property values.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.values(new Foo);
	   * // => [1, 2] (iteration order is not guaranteed)
	   *
	   * _.values('hi');
	   * // => ['h', 'i']
	   */
	  function values(object) {
	    return object ? baseValues(object, keys(object)) : [];
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
	   * their corresponding HTML entities.
	   *
	   * **Note:** No other characters are escaped. To escape additional
	   * characters use a third-party library like [_he_](https://mths.be/he).
	   *
	   * Though the ">" character is escaped for symmetry, characters like
	   * ">" and "/" don't need escaping in HTML and have no special meaning
	   * unless they're part of a tag or unquoted attribute value. See
	   * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	   * (under "semi-related fun fact") for more details.
	   *
	   * Backticks are escaped because in IE < 9, they can break out of
	   * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	   * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	   * [#133](https://html5sec.org/#133) of the
	   * [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
	   *
	   * When working with HTML you should always
	   * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
	   * XSS vectors.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escape('fred, barney, & pebbles');
	   * // => 'fred, barney, &amp; pebbles'
	   */
	  function escape(string) {
	    string = toString(string);
	    return (string && reHasUnescapedHtml.test(string))
	      ? string.replace(reUnescapedHtml, escapeHtmlChar)
	      : string;
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * This method returns the first argument given to it.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Util
	   * @param {*} value Any value.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.identity(object) === object;
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }
	
	  /**
	   * Creates a function that invokes `func` with the arguments of the created
	   * function. If `func` is a property name the created function returns the
	   * property value for a given element. If `func` is an array or object the
	   * created function returns `true` for elements that contain the equivalent
	   * source properties, otherwise it returns `false`.
	   *
	   * @static
	   * @since 4.0.0
	   * @memberOf _
	   * @category Util
	   * @param {*} [func=_.identity] The value to convert to a callback.
	   * @returns {Function} Returns the callback.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': true },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
	   * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.filter(users, _.iteratee(['user', 'fred']));
	   * // => [{ 'user': 'fred', 'age': 40 }]
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.map(users, _.iteratee('user'));
	   * // => ['barney', 'fred']
	   *
	   * // Create custom iteratee shorthands.
	   * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
	   *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
	   *     return func.test(string);
	   *   };
	   * });
	   *
	   * _.filter(['abc', 'def'], /ef/);
	   * // => ['def']
	   */
	  var iteratee = baseIteratee;
	
	  /**
	   * Creates a function that performs a partial deep comparison between a given
	   * object and `source`, returning `true` if the given object has equivalent
	   * property values, else `false`. The created function is equivalent to
	   * `_.isMatch` with a `source` partially applied.
	   *
	   * **Note:** This method supports comparing the same values as `_.isEqual`.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Util
	   * @param {Object} source The object of property values to match.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': true },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * _.filter(users, _.matches({ 'age': 40, 'active': false }));
	   * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
	   */
	  function matches(source) {
	    return baseMatches(assign({}, source));
	  }
	
	  /**
	   * Adds all own enumerable string keyed function properties of a source
	   * object to the destination object. If `object` is a function then methods
	   * are added to its prototype as well.
	   *
	   * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	   * avoid conflicts caused by modifying the original.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Util
	   * @param {Function|Object} [object=lodash] The destination object.
	   * @param {Object} source The object of functions to add.
	   * @param {Object} [options={}] The options object.
	   * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
	   * @returns {Function|Object} Returns `object`.
	   * @example
	   *
	   * function vowels(string) {
	   *   return _.filter(string, function(v) {
	   *     return /[aeiou]/i.test(v);
	   *   });
	   * }
	   *
	   * _.mixin({ 'vowels': vowels });
	   * _.vowels('fred');
	   * // => ['e']
	   *
	   * _('fred').vowels().value();
	   * // => ['e']
	   *
	   * _.mixin({ 'vowels': vowels }, { 'chain': false });
	   * _('fred').vowels();
	   * // => ['e']
	   */
	  function mixin(object, source, options) {
	    var props = keys(source),
	        methodNames = baseFunctions(source, props);
	
	    if (options == null &&
	        !(isObject(source) && (methodNames.length || !props.length))) {
	      options = source;
	      source = object;
	      object = this;
	      methodNames = baseFunctions(source, keys(source));
	    }
	    var chain = (isObject(options) && 'chain' in options) ? options.chain : true,
	        isFunc = isFunction(object);
	
	    baseEach(methodNames, function(methodName) {
	      var func = source[methodName];
	      object[methodName] = func;
	      if (isFunc) {
	        object.prototype[methodName] = function() {
	          var chainAll = this.__chain__;
	          if (chain || chainAll) {
	            var result = object(this.__wrapped__),
	                actions = result.__actions__ = copyArray(this.__actions__);
	
	            actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
	            result.__chain__ = chainAll;
	            return result;
	          }
	          return func.apply(object, arrayPush([this.value()], arguments));
	        };
	      }
	    });
	
	    return object;
	  }
	
	  /**
	   * Reverts the `_` variable to its previous value and returns a reference to
	   * the `lodash` function.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Util
	   * @returns {Function} Returns the `lodash` function.
	   * @example
	   *
	   * var lodash = _.noConflict();
	   */
	  function noConflict() {
	    if (root._ === this) {
	      root._ = oldDash;
	    }
	    return this;
	  }
	
	  /**
	   * A no-operation function that returns `undefined` regardless of the
	   * arguments it receives.
	   *
	   * @static
	   * @memberOf _
	   * @since 2.3.0
	   * @category Util
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.noop(object) === undefined;
	   * // => true
	   */
	  function noop() {
	    // No operation performed.
	  }
	
	  /**
	   * Generates a unique ID. If `prefix` is given the ID is appended to it.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Util
	   * @param {string} [prefix=''] The value to prefix the ID with.
	   * @returns {string} Returns the unique ID.
	   * @example
	   *
	   * _.uniqueId('contact_');
	   * // => 'contact_104'
	   *
	   * _.uniqueId();
	   * // => '105'
	   */
	  function uniqueId(prefix) {
	    var id = ++idCounter;
	    return toString(prefix) + id;
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * Computes the maximum value of `array`. If `array` is empty or falsey
	   * `undefined` is returned.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Math
	   * @param {Array} array The array to iterate over.
	   * @returns {*} Returns the maximum value.
	   * @example
	   *
	   * _.max([4, 2, 8, 6]);
	   * // => 8
	   *
	   * _.max([]);
	   * // => undefined
	   */
	  function max(array) {
	    return (array && array.length)
	      ? baseExtremum(array, identity, gt)
	      : undefined;
	  }
	
	  /**
	   * Computes the minimum value of `array`. If `array` is empty or falsey
	   * `undefined` is returned.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Math
	   * @param {Array} array The array to iterate over.
	   * @returns {*} Returns the minimum value.
	   * @example
	   *
	   * _.min([4, 2, 8, 6]);
	   * // => 2
	   *
	   * _.min([]);
	   * // => undefined
	   */
	  function min(array) {
	    return (array && array.length)
	      ? baseExtremum(array, identity, lt)
	      : undefined;
	  }
	
	  /*------------------------------------------------------------------------*/
	
	  // Add methods that return wrapped values in chain sequences.
	  lodash.assignIn = assignIn;
	  lodash.before = before;
	  lodash.bind = bind;
	  lodash.chain = chain;
	  lodash.compact = compact;
	  lodash.concat = concat;
	  lodash.create = create;
	  lodash.defaults = defaults;
	  lodash.defer = defer;
	  lodash.delay = delay;
	  lodash.filter = filter;
	  lodash.flatten = flatten;
	  lodash.flattenDeep = flattenDeep;
	  lodash.iteratee = iteratee;
	  lodash.keys = keys;
	  lodash.map = map;
	  lodash.matches = matches;
	  lodash.mixin = mixin;
	  lodash.negate = negate;
	  lodash.once = once;
	  lodash.pick = pick;
	  lodash.slice = slice;
	  lodash.sortBy = sortBy;
	  lodash.tap = tap;
	  lodash.thru = thru;
	  lodash.toArray = toArray;
	  lodash.values = values;
	
	  // Add aliases.
	  lodash.extend = assignIn;
	
	  // Add methods to `lodash.prototype`.
	  mixin(lodash, lodash);
	
	  /*------------------------------------------------------------------------*/
	
	  // Add methods that return unwrapped values in chain sequences.
	  lodash.clone = clone;
	  lodash.escape = escape;
	  lodash.every = every;
	  lodash.find = find;
	  lodash.forEach = forEach;
	  lodash.has = has;
	  lodash.head = head;
	  lodash.identity = identity;
	  lodash.indexOf = indexOf;
	  lodash.isArguments = isArguments;
	  lodash.isArray = isArray;
	  lodash.isBoolean = isBoolean;
	  lodash.isDate = isDate;
	  lodash.isEmpty = isEmpty;
	  lodash.isEqual = isEqual;
	  lodash.isFinite = isFinite;
	  lodash.isFunction = isFunction;
	  lodash.isNaN = isNaN;
	  lodash.isNull = isNull;
	  lodash.isNumber = isNumber;
	  lodash.isObject = isObject;
	  lodash.isRegExp = isRegExp;
	  lodash.isString = isString;
	  lodash.isUndefined = isUndefined;
	  lodash.last = last;
	  lodash.max = max;
	  lodash.min = min;
	  lodash.noConflict = noConflict;
	  lodash.noop = noop;
	  lodash.reduce = reduce;
	  lodash.result = result;
	  lodash.size = size;
	  lodash.some = some;
	  lodash.uniqueId = uniqueId;
	
	  // Add aliases.
	  lodash.each = forEach;
	  lodash.first = head;
	
	  mixin(lodash, (function() {
	    var source = {};
	    baseForOwn(lodash, function(func, methodName) {
	      if (!hasOwnProperty.call(lodash.prototype, methodName)) {
	        source[methodName] = func;
	      }
	    });
	    return source;
	  }()), { 'chain': false });
	
	  /*------------------------------------------------------------------------*/
	
	  /**
	   * The semantic version number.
	   *
	   * @static
	   * @memberOf _
	   * @type {string}
	   */
	  lodash.VERSION = VERSION;
	
	  // Add `Array` methods to `lodash.prototype`.
	  baseEach(['pop', 'join', 'replace', 'reverse', 'split', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
	    var func = (/^(?:replace|split)$/.test(methodName) ? String.prototype : arrayProto)[methodName],
	        chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
	        retUnwrapped = /^(?:pop|join|replace|shift)$/.test(methodName);
	
	    lodash.prototype[methodName] = function() {
	      var args = arguments;
	      if (retUnwrapped && !this.__chain__) {
	        var value = this.value();
	        return func.apply(isArray(value) ? value : [], args);
	      }
	      return this[chainName](function(value) {
	        return func.apply(isArray(value) ? value : [], args);
	      });
	    };
	  });
	
	  // Add chain sequence methods to the `lodash` wrapper.
	  lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
	
	  /*--------------------------------------------------------------------------*/
	
	  // Expose lodash on the free variable `window` or `self` when available. This
	  // prevents errors in cases where lodash is loaded by a script tag in the presence
	  // of an AMD loader. See http://requirejs.org/docs/errors.html#mismatch for more details.
	  (freeWindow || freeSelf || {})._ = lodash;
	
	  // Some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return lodash;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
	  else if (freeExports && freeModule) {
	    // Export for Node.js.
	    if (moduleExports) {
	      (freeModule.exports = lodash)._ = lodash;
	    }
	    // Export for CommonJS support.
	    freeExports._ = lodash;
	  }
	  else {
	    // Export to the global object.
	    root._ = lodash;
	  }
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module), (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Mustache"] = __webpack_require__(12);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */
	
	/*global define: false Mustache: true*/
	
	(function defineMustache (global, factory) {
	  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
	    factory(exports); // CommonJS
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	  } else {
	    global.Mustache = {};
	    factory(global.Mustache); // script, wsh, asp
	  }
	}(this, function mustacheFactory (mustache) {
	
	  var objectToString = Object.prototype.toString;
	  var isArray = Array.isArray || function isArrayPolyfill (object) {
	    return objectToString.call(object) === '[object Array]';
	  };
	
	  function isFunction (object) {
	    return typeof object === 'function';
	  }
	
	  /**
	   * More correct typeof string handling array
	   * which normally returns typeof 'object'
	   */
	  function typeStr (obj) {
	    return isArray(obj) ? 'array' : typeof obj;
	  }
	
	  function escapeRegExp (string) {
	    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	  }
	
	  /**
	   * Null safe way of checking whether or not an object,
	   * including its prototype, has a given property
	   */
	  function hasProperty (obj, propName) {
	    return obj != null && typeof obj === 'object' && (propName in obj);
	  }
	
	  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
	  // See https://github.com/janl/mustache.js/issues/189
	  var regExpTest = RegExp.prototype.test;
	  function testRegExp (re, string) {
	    return regExpTest.call(re, string);
	  }
	
	  var nonSpaceRe = /\S/;
	  function isWhitespace (string) {
	    return !testRegExp(nonSpaceRe, string);
	  }
	
	  var entityMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '/': '&#x2F;',
	    '`': '&#x60;',
	    '=': '&#x3D;'
	  };
	
	  function escapeHtml (string) {
	    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
	      return entityMap[s];
	    });
	  }
	
	  var whiteRe = /\s*/;
	  var spaceRe = /\s+/;
	  var equalsRe = /\s*=/;
	  var curlyRe = /\s*\}/;
	  var tagRe = /#|\^|\/|>|\{|&|=|!/;
	
	  /**
	   * Breaks up the given `template` string into a tree of tokens. If the `tags`
	   * argument is given here it must be an array with two string values: the
	   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
	   * course, the default is to use mustaches (i.e. mustache.tags).
	   *
	   * A token is an array with at least 4 elements. The first element is the
	   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
	   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
	   * all text that appears outside a symbol this element is "text".
	   *
	   * The second element of a token is its "value". For mustache tags this is
	   * whatever else was inside the tag besides the opening symbol. For text tokens
	   * this is the text itself.
	   *
	   * The third and fourth elements of the token are the start and end indices,
	   * respectively, of the token in the original template.
	   *
	   * Tokens that are the root node of a subtree contain two more elements: 1) an
	   * array of tokens in the subtree and 2) the index in the original template at
	   * which the closing tag for that section begins.
	   */
	  function parseTemplate (template, tags) {
	    if (!template)
	      return [];
	
	    var sections = [];     // Stack to hold section tokens
	    var tokens = [];       // Buffer to hold the tokens
	    var spaces = [];       // Indices of whitespace tokens on the current line
	    var hasTag = false;    // Is there a {{tag}} on the current line?
	    var nonSpace = false;  // Is there a non-space char on the current line?
	
	    // Strips all whitespace tokens array for the current line
	    // if there was a {{#tag}} on it and otherwise only space.
	    function stripSpace () {
	      if (hasTag && !nonSpace) {
	        while (spaces.length)
	          delete tokens[spaces.pop()];
	      } else {
	        spaces = [];
	      }
	
	      hasTag = false;
	      nonSpace = false;
	    }
	
	    var openingTagRe, closingTagRe, closingCurlyRe;
	    function compileTags (tagsToCompile) {
	      if (typeof tagsToCompile === 'string')
	        tagsToCompile = tagsToCompile.split(spaceRe, 2);
	
	      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
	        throw new Error('Invalid tags: ' + tagsToCompile);
	
	      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
	      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
	      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
	    }
	
	    compileTags(tags || mustache.tags);
	
	    var scanner = new Scanner(template);
	
	    var start, type, value, chr, token, openSection;
	    while (!scanner.eos()) {
	      start = scanner.pos;
	
	      // Match any text between tags.
	      value = scanner.scanUntil(openingTagRe);
	
	      if (value) {
	        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
	          chr = value.charAt(i);
	
	          if (isWhitespace(chr)) {
	            spaces.push(tokens.length);
	          } else {
	            nonSpace = true;
	          }
	
	          tokens.push([ 'text', chr, start, start + 1 ]);
	          start += 1;
	
	          // Check for whitespace on the current line.
	          if (chr === '\n')
	            stripSpace();
	        }
	      }
	
	      // Match the opening tag.
	      if (!scanner.scan(openingTagRe))
	        break;
	
	      hasTag = true;
	
	      // Get the tag type.
	      type = scanner.scan(tagRe) || 'name';
	      scanner.scan(whiteRe);
	
	      // Get the tag value.
	      if (type === '=') {
	        value = scanner.scanUntil(equalsRe);
	        scanner.scan(equalsRe);
	        scanner.scanUntil(closingTagRe);
	      } else if (type === '{') {
	        value = scanner.scanUntil(closingCurlyRe);
	        scanner.scan(curlyRe);
	        scanner.scanUntil(closingTagRe);
	        type = '&';
	      } else {
	        value = scanner.scanUntil(closingTagRe);
	      }
	
	      // Match the closing tag.
	      if (!scanner.scan(closingTagRe))
	        throw new Error('Unclosed tag at ' + scanner.pos);
	
	      token = [ type, value, start, scanner.pos ];
	      tokens.push(token);
	
	      if (type === '#' || type === '^') {
	        sections.push(token);
	      } else if (type === '/') {
	        // Check section nesting.
	        openSection = sections.pop();
	
	        if (!openSection)
	          throw new Error('Unopened section "' + value + '" at ' + start);
	
	        if (openSection[1] !== value)
	          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
	      } else if (type === 'name' || type === '{' || type === '&') {
	        nonSpace = true;
	      } else if (type === '=') {
	        // Set the tags for the next time around.
	        compileTags(value);
	      }
	    }
	
	    // Make sure there are no open sections when we're done.
	    openSection = sections.pop();
	
	    if (openSection)
	      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
	
	    return nestTokens(squashTokens(tokens));
	  }
	
	  /**
	   * Combines the values of consecutive text tokens in the given `tokens` array
	   * to a single token.
	   */
	  function squashTokens (tokens) {
	    var squashedTokens = [];
	
	    var token, lastToken;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];
	
	      if (token) {
	        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
	          lastToken[1] += token[1];
	          lastToken[3] = token[3];
	        } else {
	          squashedTokens.push(token);
	          lastToken = token;
	        }
	      }
	    }
	
	    return squashedTokens;
	  }
	
	  /**
	   * Forms the given array of `tokens` into a nested tree structure where
	   * tokens that represent a section have two additional items: 1) an array of
	   * all tokens that appear in that section and 2) the index in the original
	   * template that represents the end of that section.
	   */
	  function nestTokens (tokens) {
	    var nestedTokens = [];
	    var collector = nestedTokens;
	    var sections = [];
	
	    var token, section;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];
	
	      switch (token[0]) {
	        case '#':
	        case '^':
	          collector.push(token);
	          sections.push(token);
	          collector = token[4] = [];
	          break;
	        case '/':
	          section = sections.pop();
	          section[5] = token[2];
	          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
	          break;
	        default:
	          collector.push(token);
	      }
	    }
	
	    return nestedTokens;
	  }
	
	  /**
	   * A simple string scanner that is used by the template parser to find
	   * tokens in template strings.
	   */
	  function Scanner (string) {
	    this.string = string;
	    this.tail = string;
	    this.pos = 0;
	  }
	
	  /**
	   * Returns `true` if the tail is empty (end of string).
	   */
	  Scanner.prototype.eos = function eos () {
	    return this.tail === '';
	  };
	
	  /**
	   * Tries to match the given regular expression at the current position.
	   * Returns the matched text if it can match, the empty string otherwise.
	   */
	  Scanner.prototype.scan = function scan (re) {
	    var match = this.tail.match(re);
	
	    if (!match || match.index !== 0)
	      return '';
	
	    var string = match[0];
	
	    this.tail = this.tail.substring(string.length);
	    this.pos += string.length;
	
	    return string;
	  };
	
	  /**
	   * Skips all text until the given regular expression can be matched. Returns
	   * the skipped string, which is the entire tail if no match can be made.
	   */
	  Scanner.prototype.scanUntil = function scanUntil (re) {
	    var index = this.tail.search(re), match;
	
	    switch (index) {
	      case -1:
	        match = this.tail;
	        this.tail = '';
	        break;
	      case 0:
	        match = '';
	        break;
	      default:
	        match = this.tail.substring(0, index);
	        this.tail = this.tail.substring(index);
	    }
	
	    this.pos += match.length;
	
	    return match;
	  };
	
	  /**
	   * Represents a rendering context by wrapping a view object and
	   * maintaining a reference to the parent context.
	   */
	  function Context (view, parentContext) {
	    this.view = view;
	    this.cache = { '.': this.view };
	    this.parent = parentContext;
	  }
	
	  /**
	   * Creates a new context using the given view with this context
	   * as the parent.
	   */
	  Context.prototype.push = function push (view) {
	    return new Context(view, this);
	  };
	
	  /**
	   * Returns the value of the given name in this context, traversing
	   * up the context hierarchy if the value is absent in this context's view.
	   */
	  Context.prototype.lookup = function lookup (name) {
	    var cache = this.cache;
	
	    var value;
	    if (cache.hasOwnProperty(name)) {
	      value = cache[name];
	    } else {
	      var context = this, names, index, lookupHit = false;
	
	      while (context) {
	        if (name.indexOf('.') > 0) {
	          value = context.view;
	          names = name.split('.');
	          index = 0;
	
	          /**
	           * Using the dot notion path in `name`, we descend through the
	           * nested objects.
	           *
	           * To be certain that the lookup has been successful, we have to
	           * check if the last object in the path actually has the property
	           * we are looking for. We store the result in `lookupHit`.
	           *
	           * This is specially necessary for when the value has been set to
	           * `undefined` and we want to avoid looking up parent contexts.
	           **/
	          while (value != null && index < names.length) {
	            if (index === names.length - 1)
	              lookupHit = hasProperty(value, names[index]);
	
	            value = value[names[index++]];
	          }
	        } else {
	          value = context.view[name];
	          lookupHit = hasProperty(context.view, name);
	        }
	
	        if (lookupHit)
	          break;
	
	        context = context.parent;
	      }
	
	      cache[name] = value;
	    }
	
	    if (isFunction(value))
	      value = value.call(this.view);
	
	    return value;
	  };
	
	  /**
	   * A Writer knows how to take a stream of tokens and render them to a
	   * string, given a context. It also maintains a cache of templates to
	   * avoid the need to parse the same template twice.
	   */
	  function Writer () {
	    this.cache = {};
	  }
	
	  /**
	   * Clears all cached templates in this writer.
	   */
	  Writer.prototype.clearCache = function clearCache () {
	    this.cache = {};
	  };
	
	  /**
	   * Parses and caches the given `template` and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function parse (template, tags) {
	    var cache = this.cache;
	    var tokens = cache[template];
	
	    if (tokens == null)
	      tokens = cache[template] = parseTemplate(template, tags);
	
	    return tokens;
	  };
	
	  /**
	   * High-level method that is used to render the given `template` with
	   * the given `view`.
	   *
	   * The optional `partials` argument may be an object that contains the
	   * names and templates of partials that are used in the template. It may
	   * also be a function that is used to load partial templates on the fly
	   * that takes a single argument: the name of the partial.
	   */
	  Writer.prototype.render = function render (template, view, partials) {
	    var tokens = this.parse(template);
	    var context = (view instanceof Context) ? view : new Context(view);
	    return this.renderTokens(tokens, context, partials, template);
	  };
	
	  /**
	   * Low-level method that renders the given array of `tokens` using
	   * the given `context` and `partials`.
	   *
	   * Note: The `originalTemplate` is only ever used to extract the portion
	   * of the original template that was contained in a higher-order section.
	   * If the template doesn't use higher-order sections, this argument may
	   * be omitted.
	   */
	  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
	    var buffer = '';
	
	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];
	
	      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
	      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
	      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
	      else if (symbol === '&') value = this.unescapedValue(token, context);
	      else if (symbol === 'name') value = this.escapedValue(token, context);
	      else if (symbol === 'text') value = this.rawValue(token);
	
	      if (value !== undefined)
	        buffer += value;
	    }
	
	    return buffer;
	  };
	
	  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
	    var self = this;
	    var buffer = '';
	    var value = context.lookup(token[1]);
	
	    // This function is used to render an arbitrary template
	    // in the current context by higher-order sections.
	    function subRender (template) {
	      return self.render(template, context, partials);
	    }
	
	    if (!value) return;
	
	    if (isArray(value)) {
	      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
	      }
	    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
	      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
	    } else if (isFunction(value)) {
	      if (typeof originalTemplate !== 'string')
	        throw new Error('Cannot use higher-order sections without the original template');
	
	      // Extract the portion of the original template that the section contains.
	      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
	
	      if (value != null)
	        buffer += value;
	    } else {
	      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
	    }
	    return buffer;
	  };
	
	  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
	    var value = context.lookup(token[1]);
	
	    // Use JavaScript's definition of falsy. Include empty arrays.
	    // See https://github.com/janl/mustache.js/issues/186
	    if (!value || (isArray(value) && value.length === 0))
	      return this.renderTokens(token[4], context, partials, originalTemplate);
	  };
	
	  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
	    if (!partials) return;
	
	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null)
	      return this.renderTokens(this.parse(value), context, partials, value);
	  };
	
	  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return value;
	  };
	
	  Writer.prototype.escapedValue = function escapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return mustache.escape(value);
	  };
	
	  Writer.prototype.rawValue = function rawValue (token) {
	    return token[1];
	  };
	
	  mustache.name = 'mustache.js';
	  mustache.version = '2.2.1';
	  mustache.tags = [ '{{', '}}' ];
	
	  // All high-level mustache.* functions use this writer.
	  var defaultWriter = new Writer();
	
	  /**
	   * Clears all cached templates in the default writer.
	   */
	  mustache.clearCache = function clearCache () {
	    return defaultWriter.clearCache();
	  };
	
	  /**
	   * Parses and caches the given template in the default writer and returns the
	   * array of tokens it contains. Doing this ahead of time avoids the need to
	   * parse templates on the fly as they are rendered.
	   */
	  mustache.parse = function parse (template, tags) {
	    return defaultWriter.parse(template, tags);
	  };
	
	  /**
	   * Renders the `template` with the given `view` and `partials` using the
	   * default writer.
	   */
	  mustache.render = function render (template, view, partials) {
	    if (typeof template !== 'string') {
	      throw new TypeError('Invalid template! Template should be a "string" ' +
	                          'but "' + typeStr(template) + '" was given as the first ' +
	                          'argument for mustache#render(template, view, partials)');
	    }
	
	    return defaultWriter.render(template, view, partials);
	  };
	
	  // This is here for backwards compatibility with 0.4.x.,
	  /*eslint-disable */ // eslint wants camel cased function name
	  mustache.to_html = function to_html (template, view, partials, send) {
	    /*eslint-enable*/
	
	    var result = mustache.render(template, view, partials);
	
	    if (isFunction(send)) {
	      send(result);
	    } else {
	      return result;
	    }
	  };
	
	  // Export the escaping function so that the user may override it.
	  // See https://github.com/janl/mustache.js/issues/244
	  mustache.escape = escapeHtml;
	
	  // Export these mainly for testing, but also for advanced usage.
	  mustache.Scanner = Scanner;
	  mustache.Context = Context;
	  mustache.Writer = Writer;
	
	}));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	* Parsley.js
	* Version 2.3.10 - built Thu, Apr 14th 2016, 6:04 pm
	* http://parsleyjs.org
	* Guillaume Potier - <guillaume@wisembly.com>
	* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
	* MIT Licensed
	*/
	function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}var _slice=Array.prototype.slice;!function(e,t){ true?module.exports=t(__webpack_require__(4)):"function"==typeof define&&define.amd?define(["jquery"],t):e.parsley=t(e.jQuery)}(this,function(e){"use strict";function t(e,t){return e.parsleyAdaptedCallback||(e.parsleyAdaptedCallback=function(){var i=Array.prototype.slice.call(arguments,0);i.unshift(this),e.apply(t||R,i)}),e.parsleyAdaptedCallback}function i(e){return 0===e.lastIndexOf(q,0)?e.substr(q.length):e}/**
	   * inputevent - Alleviate browser bugs for input events
	   * https://github.com/marcandre/inputevent
	   * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
	   * @author Marc-Andre Lafortune <github@marc-andre.ca>
	   * @license MIT
	   */
	function n(){var t=this,i=window||global;e.extend(this,{isNativeEvent:function(e){return e.originalEvent&&e.originalEvent.isTrusted!==!1},fakeInputEvent:function(i){t.isNativeEvent(i)&&e(i.target).trigger("input")},misbehaves:function(i){t.isNativeEvent(i)&&(t.behavesOk(i),e(document).on("change.inputevent",i.data.selector,t.fakeInputEvent),t.fakeInputEvent(i))},behavesOk:function(i){t.isNativeEvent(i)&&e(document).off("input.inputevent",i.data.selector,t.behavesOk).off("change.inputevent",i.data.selector,t.misbehaves)},install:function(){if(!i.inputEventPatched){i.inputEventPatched="0.0.3";for(var n=["select",'input[type="checkbox"]','input[type="radio"]','input[type="file"]'],r=0;r<n.length;r++){var s=n[r];e(document).on("input.inputevent",s,{selector:s},t.behavesOk).on("change.inputevent",s,{selector:s},t.misbehaves)}}},uninstall:function(){delete i.inputEventPatched,e(document).off(".inputevent")}})}var r=1,s={},a={attr:function(e,t,i){var n,r,s,a=new RegExp("^"+t,"i");if("undefined"==typeof i)i={};else for(n in i)i.hasOwnProperty(n)&&delete i[n];if("undefined"==typeof e||"undefined"==typeof e[0])return i;for(s=e[0].attributes,n=s.length;n--;)r=s[n],r&&r.specified&&a.test(r.name)&&(i[this.camelize(r.name.slice(t.length))]=this.deserializeValue(r.value));return i},checkAttr:function(e,t,i){return e.is("["+t+i+"]")},setAttr:function(e,t,i,n){e[0].setAttribute(this.dasherize(t+i),String(n))},generateID:function(){return""+r++},deserializeValue:function(t){var i;try{return t?"true"==t||("false"==t?!1:"null"==t?null:isNaN(i=Number(t))?/^[\[\{]/.test(t)?e.parseJSON(t):t:i):t}catch(n){return t}},camelize:function(e){return e.replace(/-+(.)?/g,function(e,t){return t?t.toUpperCase():""})},dasherize:function(e){return e.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()},warn:function(){var e;window.console&&"function"==typeof window.console.warn&&(e=window.console).warn.apply(e,arguments)},warnOnce:function(e){s[e]||(s[e]=!0,this.warn.apply(this,arguments))},_resetWarnings:function(){s={}},trimString:function(e){return e.replace(/^\s+|\s+$/g,"")},namespaceEvents:function(t,i){return t=this.trimString(t||"").split(/\s+/),t[0]?e.map(t,function(e){return e+"."+i}).join(" "):""},objectCreate:Object.create||function(){var e=function(){};return function(t){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof t)throw TypeError("Argument must be an object");e.prototype=t;var i=new e;return e.prototype=null,i}}()},o=a,l={namespace:"data-parsley-",inputs:"input, textarea, select",excluded:"input[type=button], input[type=submit], input[type=reset], input[type=hidden]",priorityEnabled:!0,multiple:null,group:null,uiEnabled:!0,validationThreshold:3,focus:"first",trigger:!1,triggerAfterFailure:"input",errorClass:"parsley-error",successClass:"parsley-success",classHandler:function(e){},errorsContainer:function(e){},errorsWrapper:'<ul class="parsley-errors-list"></ul>',errorTemplate:"<li></li>"},u=function(){this.__id__=o.generateID()};u.prototype={asyncSupport:!0,_pipeAccordingToValidationResult:function(){var t=this,i=function(){var i=e.Deferred();return!0!==t.validationResult&&i.reject(),i.resolve().promise()};return[i,i]},actualizeOptions:function(){return o.attr(this.$element,this.options.namespace,this.domOptions),this.parent&&this.parent.actualizeOptions&&this.parent.actualizeOptions(),this},_resetOptions:function(e){this.domOptions=o.objectCreate(this.parent.options),this.options=o.objectCreate(this.domOptions);for(var t in e)e.hasOwnProperty(t)&&(this.options[t]=e[t]);this.actualizeOptions()},_listeners:null,on:function(e,t){this._listeners=this._listeners||{};var i=this._listeners[e]=this._listeners[e]||[];return i.push(t),this},subscribe:function(t,i){e.listenTo(this,t.toLowerCase(),i)},off:function(e,t){var i=this._listeners&&this._listeners[e];if(i)if(t)for(var n=i.length;n--;)i[n]===t&&i.splice(n,1);else delete this._listeners[e];return this},unsubscribe:function(t,i){e.unsubscribeTo(this,t.toLowerCase())},trigger:function(e,t,i){t=t||this;var n,r=this._listeners&&this._listeners[e];if(r)for(var s=r.length;s--;)if(n=r[s].call(t,t,i),n===!1)return n;return this.parent?this.parent.trigger(e,t,i):!0},reset:function(){if("ParsleyForm"!==this.__class__)return this._resetUI(),this._trigger("reset");for(var e=0;e<this.fields.length;e++)this.fields[e].reset();this._trigger("reset")},destroy:function(){if(this._destroyUI(),"ParsleyForm"!==this.__class__)return this.$element.removeData("Parsley"),this.$element.removeData("ParsleyFieldMultiple"),void this._trigger("destroy");for(var e=0;e<this.fields.length;e++)this.fields[e].destroy();this.$element.removeData("Parsley"),this._trigger("destroy")},asyncIsValid:function(e,t){return o.warnOnce("asyncIsValid is deprecated; please use whenValid instead"),this.whenValid({group:e,force:t})},_findRelated:function(){return this.options.multiple?this.parent.$element.find("["+this.options.namespace+'multiple="'+this.options.multiple+'"]'):this.$element}};var d={string:function(e){return e},integer:function(e){if(isNaN(e))throw'Requirement is not an integer: "'+e+'"';return parseInt(e,10)},number:function(e){if(isNaN(e))throw'Requirement is not a number: "'+e+'"';return parseFloat(e)},reference:function(t){var i=e(t);if(0===i.length)throw'No such reference: "'+t+'"';return i},"boolean":function(e){return"false"!==e},object:function(e){return o.deserializeValue(e)},regexp:function(e){var t="";return/^\/.*\/(?:[gimy]*)$/.test(e)?(t=e.replace(/.*\/([gimy]*)$/,"$1"),e=e.replace(new RegExp("^/(.*?)/"+t+"$"),"$1")):e="^"+e+"$",new RegExp(e,t)}},h=function(e,t){var i=e.match(/^\s*\[(.*)\]\s*$/);if(!i)throw'Requirement is not an array: "'+e+'"';var n=i[1].split(",").map(o.trimString);if(n.length!==t)throw"Requirement has "+n.length+" values when "+t+" are needed";return n},p=function(e,t){var i=d[e||"string"];if(!i)throw'Unknown requirement specification: "'+e+'"';return i(t)},c=function(e,t,i){var n=null,r={};for(var s in e)if(s){var a=i(s);"string"==typeof a&&(a=p(e[s],a)),r[s]=a}else n=p(e[s],t);return[n,r]},f=function(t){e.extend(!0,this,t)};f.prototype={validate:function(t,i){if(this.fn)return arguments.length>3&&(i=[].slice.call(arguments,1,-1)),this.fn.call(this,t,i);if(e.isArray(t)){if(!this.validateMultiple)throw"Validator `"+this.name+"` does not handle multiple values";return this.validateMultiple.apply(this,arguments)}if(this.validateNumber)return isNaN(t)?!1:(arguments[0]=parseFloat(arguments[0]),this.validateNumber.apply(this,arguments));if(this.validateString)return this.validateString.apply(this,arguments);throw"Validator `"+this.name+"` only handles multiple values"},parseRequirements:function(t,i){if("string"!=typeof t)return e.isArray(t)?t:[t];var n=this.requirementType;if(e.isArray(n)){for(var r=h(t,n.length),s=0;s<r.length;s++)r[s]=p(n[s],r[s]);return r}return e.isPlainObject(n)?c(n,t,i):[p(n,t)]},requirementType:"string",priority:2};var m=function(e,t){this.__class__="ParsleyValidatorRegistry",this.locale="en",this.init(e||{},t||{})},g={email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,number:/^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,integer:/^-?\d+$/,digits:/^\d+$/,alphanum:/^\w+$/i,url:new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$","i")};g.range=g.number;var v=function(e){var t=(""+e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return t?Math.max(0,(t[1]?t[1].length:0)-(t[2]?+t[2]:0)):0};m.prototype={init:function(t,i){this.catalog=i,this.validators=e.extend({},this.validators);for(var n in t)this.addValidator(n,t[n].fn,t[n].priority);window.Parsley.trigger("parsley:validator:init")},setLocale:function(e){if("undefined"==typeof this.catalog[e])throw new Error(e+" is not available in the catalog");return this.locale=e,this},addCatalog:function(e,t,i){return"object"==typeof t&&(this.catalog[e]=t),!0===i?this.setLocale(e):this},addMessage:function(e,t,i){return"undefined"==typeof this.catalog[e]&&(this.catalog[e]={}),this.catalog[e][t]=i,this},addMessages:function(e,t){for(var i in t)this.addMessage(e,i,t[i]);return this},addValidator:function(e,t,i){if(this.validators[e])o.warn('Validator "'+e+'" is already defined.');else if(l.hasOwnProperty(e))return void o.warn('"'+e+'" is a restricted keyword and is not a valid validator name.');return this._setValidator.apply(this,arguments)},updateValidator:function(e,t,i){return this.validators[e]?this._setValidator.apply(this,arguments):(o.warn('Validator "'+e+'" is not already defined.'),this.addValidator.apply(this,arguments))},removeValidator:function(e){return this.validators[e]||o.warn('Validator "'+e+'" is not defined.'),delete this.validators[e],this},_setValidator:function(e,t,i){"object"!=typeof t&&(t={fn:t,priority:i}),t.validate||(t=new f(t)),this.validators[e]=t;for(var n in t.messages||{})this.addMessage(n,e,t.messages[n]);return this},getErrorMessage:function(e){var t;if("type"===e.name){var i=this.catalog[this.locale][e.name]||{};t=i[e.requirements]}else t=this.formatMessage(this.catalog[this.locale][e.name],e.requirements);return t||this.catalog[this.locale].defaultMessage||this.catalog.en.defaultMessage},formatMessage:function(e,t){if("object"==typeof t){for(var i in t)e=this.formatMessage(e,t[i]);return e}return"string"==typeof e?e.replace(/%s/i,t):""},validators:{notblank:{validateString:function(e){return/\S/.test(e)},priority:2},required:{validateMultiple:function(e){return e.length>0},validateString:function(e){return/\S/.test(e)},priority:512},type:{validateString:function(e,t){var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=i.step,r=void 0===n?"1":n,s=i.base,a=void 0===s?0:s,o=g[t];if(!o)throw new Error("validator type `"+t+"` is not supported");if(!o.test(e))return!1;if("number"===t&&!/^any$/i.test(r||"")){var l=Number(e),u=Math.max(v(r),v(a));if(v(l)>u)return!1;var d=function(e){return Math.round(e*Math.pow(10,u))};if((d(l)-d(a))%d(r)!=0)return!1}return!0},requirementType:{"":"string",step:"string",base:"number"},priority:256},pattern:{validateString:function(e,t){return t.test(e)},requirementType:"regexp",priority:64},minlength:{validateString:function(e,t){return e.length>=t},requirementType:"integer",priority:30},maxlength:{validateString:function(e,t){return e.length<=t},requirementType:"integer",priority:30},length:{validateString:function(e,t,i){return e.length>=t&&e.length<=i},requirementType:["integer","integer"],priority:30},mincheck:{validateMultiple:function(e,t){return e.length>=t},requirementType:"integer",priority:30},maxcheck:{validateMultiple:function(e,t){return e.length<=t},requirementType:"integer",priority:30},check:{validateMultiple:function(e,t,i){return e.length>=t&&e.length<=i},requirementType:["integer","integer"],priority:30},min:{validateNumber:function(e,t){return e>=t},requirementType:"number",priority:30},max:{validateNumber:function(e,t){return t>=e},requirementType:"number",priority:30},range:{validateNumber:function(e,t,i){return e>=t&&i>=e},requirementType:["number","number"],priority:30},equalto:{validateString:function(t,i){var n=e(i);return n.length?t===n.val():t===i},priority:256}}};var y={},_=function k(e,t,i){for(var n=[],r=[],s=0;s<e.length;s++){for(var a=!1,o=0;o<t.length;o++)if(e[s].assert.name===t[o].assert.name){a=!0;break}a?r.push(e[s]):n.push(e[s])}return{kept:r,added:n,removed:i?[]:k(t,e,!0).added}};y.Form={_actualizeTriggers:function(){var e=this;this.$element.on("submit.Parsley",function(t){e.onSubmitValidate(t)}),this.$element.on("click.Parsley",'input[type="submit"], button[type="submit"]',function(t){e.onSubmitButton(t)}),!1!==this.options.uiEnabled&&this.$element.attr("novalidate","")},focus:function(){if(this._focusedField=null,!0===this.validationResult||"none"===this.options.focus)return null;for(var e=0;e<this.fields.length;e++){var t=this.fields[e];if(!0!==t.validationResult&&t.validationResult.length>0&&"undefined"==typeof t.options.noFocus&&(this._focusedField=t.$element,"first"===this.options.focus))break}return null===this._focusedField?null:this._focusedField.focus()},_destroyUI:function(){this.$element.off(".Parsley")}},y.Field={_reflowUI:function(){if(this._buildUI(),this._ui){var e=_(this.validationResult,this._ui.lastValidationResult);this._ui.lastValidationResult=this.validationResult,this._manageStatusClass(),this._manageErrorsMessages(e),this._actualizeTriggers(),!e.kept.length&&!e.added.length||this._failedOnce||(this._failedOnce=!0,this._actualizeTriggers())}},getErrorsMessages:function(){if(!0===this.validationResult)return[];for(var e=[],t=0;t<this.validationResult.length;t++)e.push(this.validationResult[t].errorMessage||this._getErrorMessage(this.validationResult[t].assert));return e},addError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.message,n=t.assert,r=t.updateClass,s=void 0===r?!0:r;this._buildUI(),this._addError(e,{message:i,assert:n}),s&&this._errorClass()},updateError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.message,n=t.assert,r=t.updateClass,s=void 0===r?!0:r;this._buildUI(),this._updateError(e,{message:i,assert:n}),s&&this._errorClass()},removeError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.updateClass,n=void 0===i?!0:i;this._buildUI(),this._removeError(e),n&&this._manageStatusClass()},_manageStatusClass:function(){this.hasConstraints()&&this.needsValidation()&&!0===this.validationResult?this._successClass():this.validationResult.length>0?this._errorClass():this._resetClass()},_manageErrorsMessages:function(t){if("undefined"==typeof this.options.errorsMessagesDisabled){if("undefined"!=typeof this.options.errorMessage)return t.added.length||t.kept.length?(this._insertErrorWrapper(),0===this._ui.$errorsWrapper.find(".parsley-custom-error-message").length&&this._ui.$errorsWrapper.append(e(this.options.errorTemplate).addClass("parsley-custom-error-message")),this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)):this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();for(var i=0;i<t.removed.length;i++)this._removeError(t.removed[i].assert.name);for(i=0;i<t.added.length;i++)this._addError(t.added[i].assert.name,{message:t.added[i].errorMessage,assert:t.added[i].assert});for(i=0;i<t.kept.length;i++)this._updateError(t.kept[i].assert.name,{message:t.kept[i].errorMessage,assert:t.kept[i].assert})}},_addError:function(t,i){var n=i.message,r=i.assert;this._insertErrorWrapper(),this._ui.$errorsWrapper.addClass("filled").append(e(this.options.errorTemplate).addClass("parsley-"+t).html(n||this._getErrorMessage(r)))},_updateError:function(e,t){var i=t.message,n=t.assert;this._ui.$errorsWrapper.addClass("filled").find(".parsley-"+e).html(i||this._getErrorMessage(n))},_removeError:function(e){this._ui.$errorsWrapper.removeClass("filled").find(".parsley-"+e).remove()},_getErrorMessage:function(e){var t=e.name+"Message";return"undefined"!=typeof this.options[t]?window.Parsley.formatMessage(this.options[t],e.requirements):window.Parsley.getErrorMessage(e)},_buildUI:function(){if(!this._ui&&!1!==this.options.uiEnabled){var t={};this.$element.attr(this.options.namespace+"id",this.__id__),t.$errorClassHandler=this._manageClassHandler(),t.errorsWrapperId="parsley-id-"+(this.options.multiple?"multiple-"+this.options.multiple:this.__id__),t.$errorsWrapper=e(this.options.errorsWrapper).attr("id",t.errorsWrapperId),t.lastValidationResult=[],t.validationInformationVisible=!1,this._ui=t}},_manageClassHandler:function(){if("string"==typeof this.options.classHandler&&e(this.options.classHandler).length)return e(this.options.classHandler);var t=this.options.classHandler.call(this,this);return"undefined"!=typeof t&&t.length?t:!this.options.multiple||this.$element.is("select")?this.$element:this.$element.parent()},_insertErrorWrapper:function(){var t;if(0!==this._ui.$errorsWrapper.parent().length)return this._ui.$errorsWrapper.parent();if("string"==typeof this.options.errorsContainer){if(e(this.options.errorsContainer).length)return e(this.options.errorsContainer).append(this._ui.$errorsWrapper);o.warn("The errors container `"+this.options.errorsContainer+"` does not exist in DOM")}else"function"==typeof this.options.errorsContainer&&(t=this.options.errorsContainer.call(this,this));if("undefined"!=typeof t&&t.length)return t.append(this._ui.$errorsWrapper);var i=this.$element;return this.options.multiple&&(i=i.parent()),i.after(this._ui.$errorsWrapper)},_actualizeTriggers:function(){var e=this,t=this._findRelated();t.off(".Parsley"),this._failedOnce?t.on(o.namespaceEvents(this.options.triggerAfterFailure,"Parsley"),function(){e.validate()}):t.on(o.namespaceEvents(this.options.trigger,"Parsley"),function(t){e._eventValidate(t)})},_eventValidate:function(e){(!/key|input/.test(e.type)||this._ui&&this._ui.validationInformationVisible||!(this.getValue().length<=this.options.validationThreshold))&&this.validate()},_resetUI:function(){this._failedOnce=!1,this._actualizeTriggers(),"undefined"!=typeof this._ui&&(this._ui.$errorsWrapper.removeClass("filled").children().remove(),this._resetClass(),this._ui.lastValidationResult=[],this._ui.validationInformationVisible=!1)},_destroyUI:function(){this._resetUI(),"undefined"!=typeof this._ui&&this._ui.$errorsWrapper.remove(),delete this._ui},_successClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)},_errorClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)},_resetClass:function(){this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)}};var w=function(t,i,n){this.__class__="ParsleyForm",this.$element=e(t),this.domOptions=i,this.options=n,this.parent=window.Parsley,this.fields=[],this.validationResult=null},b={pending:null,resolved:!0,rejected:!1};w.prototype={onSubmitValidate:function(e){var t=this;if(!0!==e.parsley){var i=this._$submitSource||this.$element.find('input[type="submit"], button[type="submit"]').first();if(this._$submitSource=null,this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!0),!i.is("[formnovalidate]")){var n=this.whenValidate({event:e});"resolved"===n.state()&&!1!==this._trigger("submit")||(e.stopImmediatePropagation(),e.preventDefault(),"pending"===n.state()&&n.done(function(){t._submit(i)}))}}},onSubmitButton:function(t){this._$submitSource=e(t.target)},_submit:function(t){if(!1!==this._trigger("submit")){if(t){var i=this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!1);0===i.length&&(i=e('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)),i.attr({name:t.attr("name"),value:t.attr("value")})}this.$element.trigger(e.extend(e.Event("submit"),{parsley:!0}))}},validate:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){o.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1],s=i[2];t={group:n,force:r,event:s}}return b[this.whenValidate(t).state()]},whenValidate:function(){var t,i=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=n.group,s=n.force,a=n.event;this.submitEvent=a,a&&(this.submitEvent=e.extend({},a,{preventDefault:function(){o.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"),i.validationResult=!1}})),this.validationResult=!0,this._trigger("validate"),this._refreshFields();var l=this._withoutReactualizingFormOptions(function(){return e.map(i.fields,function(e){return e.whenValidate({force:s,group:r})})});return(t=e.when.apply(e,_toConsumableArray(l)).done(function(){i._trigger("success")}).fail(function(){i.validationResult=!1,i.focus(),i._trigger("error")}).always(function(){i._trigger("validated")})).pipe.apply(t,_toConsumableArray(this._pipeAccordingToValidationResult()))},isValid:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){o.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1];t={group:n,force:r}}return b[this.whenValid(t).state()]},whenValid:function(){var t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.group,r=i.force;this._refreshFields();var s=this._withoutReactualizingFormOptions(function(){return e.map(t.fields,function(e){return e.whenValid({group:n,force:r})})});return e.when.apply(e,_toConsumableArray(s))},_refreshFields:function(){return this.actualizeOptions()._bindFields()},_bindFields:function(){var t=this,i=this.fields;return this.fields=[],this.fieldsMappedById={},this._withoutReactualizingFormOptions(function(){t.$element.find(t.options.inputs).not(t.options.excluded).each(function(e,i){var n=new window.Parsley.Factory(i,{},t);"ParsleyField"!==n.__class__&&"ParsleyFieldMultiple"!==n.__class__||!0===n.options.excluded||"undefined"==typeof t.fieldsMappedById[n.__class__+"-"+n.__id__]&&(t.fieldsMappedById[n.__class__+"-"+n.__id__]=n,t.fields.push(n))}),e(i).not(t.fields).each(function(e,t){t._trigger("reset")})}),this},_withoutReactualizingFormOptions:function(e){var t=this.actualizeOptions;this.actualizeOptions=function(){return this};var i=e();return this.actualizeOptions=t,i},_trigger:function(e){return this.trigger("form:"+e)}};var F=function(t,i,n,r,s){if(!/ParsleyField/.test(t.__class__))throw new Error("ParsleyField or ParsleyFieldMultiple instance expected");var a=window.Parsley._validatorRegistry.validators[i],o=new f(a);e.extend(this,{validator:o,name:i,requirements:n,priority:r||t.options[i+"Priority"]||o.priority,isDomConstraint:!0===s}),this._parseRequirements(t.options)},C=function(e){var t=e[0].toUpperCase();return t+e.slice(1)};F.prototype={validate:function(e,t){var i=this.requirementList.slice(0);return i.unshift(e),i.push(t),this.validator.validate.apply(this.validator,i)},_parseRequirements:function(e){var t=this;this.requirementList=this.validator.parseRequirements(this.requirements,function(i){return e[t.name+C(i)]})}};var $=function(t,i,n,r){this.__class__="ParsleyField",this.$element=e(t),"undefined"!=typeof r&&(this.parent=r),this.options=n,this.domOptions=i,this.constraints=[],this.constraintsByName={},this.validationResult=!0,this._bindConstraints()},x={pending:null,resolved:!0,rejected:!1};$.prototype={validate:function(t){arguments.length>=1&&!e.isPlainObject(t)&&(o.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."),t={options:t});var i=this.whenValidate(t);if(!i)return!0;switch(i.state()){case"pending":return null;case"resolved":return!0;case"rejected":return this.validationResult}},whenValidate:function(){var e,t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.force,r=i.group;return this.refreshConstraints(),!r||this._isInGroup(r)?(this.value=this.getValue(),this._trigger("validate"),(e=this.whenValid({force:n,value:this.value,_refreshed:!0}).always(function(){t._reflowUI()}).done(function(){t._trigger("success")}).fail(function(){t._trigger("error")}).always(function(){t._trigger("validated")})).pipe.apply(e,_toConsumableArray(this._pipeAccordingToValidationResult()))):void 0},hasConstraints:function(){return 0!==this.constraints.length},needsValidation:function(e){return"undefined"==typeof e&&(e=this.getValue()),e.length||this._isRequired()||"undefined"!=typeof this.options.validateIfEmpty?!0:!1},_isInGroup:function(t){return e.isArray(this.options.group)?-1!==e.inArray(t,this.options.group):this.options.group===t},isValid:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){o.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1];t={force:n,value:r}}var s=this.whenValid(t);return s?x[s.state()]:!0},whenValid:function(){var t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.force,r=void 0===n?!1:n,s=i.value,a=i.group,o=i._refreshed;if(o||this.refreshConstraints(),!a||this._isInGroup(a)){if(this.validationResult=!0,!this.hasConstraints())return e.when();if(("undefined"==typeof s||null===s)&&(s=this.getValue()),!this.needsValidation(s)&&!0!==r)return e.when();var l=this._getGroupedConstraints(),u=[];return e.each(l,function(i,n){var r=e.when.apply(e,_toConsumableArray(e.map(n,function(e){return t._validateConstraint(s,e)})));return u.push(r),"rejected"===r.state()?!1:void 0}),e.when.apply(e,u)}},_validateConstraint:function(t,i){var n=this,r=i.validate(t,this);return!1===r&&(r=e.Deferred().reject()),e.when(r).fail(function(e){n.validationResult instanceof Array||(n.validationResult=[]),n.validationResult.push({assert:i,errorMessage:"string"==typeof e&&e})})},getValue:function(){var e;return e="function"==typeof this.options.value?this.options.value(this):"undefined"!=typeof this.options.value?this.options.value:this.$element.val(),"undefined"==typeof e||null===e?"":this._handleWhitespace(e)},refreshConstraints:function(){return this.actualizeOptions()._bindConstraints()},addConstraint:function(e,t,i,n){if(window.Parsley._validatorRegistry.validators[e]){var r=new F(this,e,t,i,n);"undefined"!==this.constraintsByName[r.name]&&this.removeConstraint(r.name),this.constraints.push(r),this.constraintsByName[r.name]=r}return this},removeConstraint:function(e){for(var t=0;t<this.constraints.length;t++)if(e===this.constraints[t].name){this.constraints.splice(t,1);break}return delete this.constraintsByName[e],this},updateConstraint:function(e,t,i){return this.removeConstraint(e).addConstraint(e,t,i)},_bindConstraints:function(){for(var e=[],t={},i=0;i<this.constraints.length;i++)!1===this.constraints[i].isDomConstraint&&(e.push(this.constraints[i]),t[this.constraints[i].name]=this.constraints[i]);this.constraints=e,this.constraintsByName=t;for(var n in this.options)this.addConstraint(n,this.options[n],void 0,!0);return this._bindHtml5Constraints()},_bindHtml5Constraints:function(){(this.$element.hasClass("required")||this.$element.attr("required"))&&this.addConstraint("required",!0,void 0,!0),"string"==typeof this.$element.attr("pattern")&&this.addConstraint("pattern",this.$element.attr("pattern"),void 0,!0),"undefined"!=typeof this.$element.attr("min")&&"undefined"!=typeof this.$element.attr("max")?this.addConstraint("range",[this.$element.attr("min"),this.$element.attr("max")],void 0,!0):"undefined"!=typeof this.$element.attr("min")?this.addConstraint("min",this.$element.attr("min"),void 0,!0):"undefined"!=typeof this.$element.attr("max")&&this.addConstraint("max",this.$element.attr("max"),void 0,!0),"undefined"!=typeof this.$element.attr("minlength")&&"undefined"!=typeof this.$element.attr("maxlength")?this.addConstraint("length",[this.$element.attr("minlength"),this.$element.attr("maxlength")],void 0,!0):"undefined"!=typeof this.$element.attr("minlength")?this.addConstraint("minlength",this.$element.attr("minlength"),void 0,!0):"undefined"!=typeof this.$element.attr("maxlength")&&this.addConstraint("maxlength",this.$element.attr("maxlength"),void 0,!0);var e=this.$element.attr("type");return"undefined"==typeof e?this:"number"===e?this.addConstraint("type",["number",{step:this.$element.attr("step"),base:this.$element.attr("min")||this.$element.attr("value")}],void 0,!0):/^(email|url|range)$/i.test(e)?this.addConstraint("type",e,void 0,!0):this},_isRequired:function(){return"undefined"==typeof this.constraintsByName.required?!1:!1!==this.constraintsByName.required.requirements},_trigger:function(e){return this.trigger("field:"+e)},_handleWhitespace:function(e){return!0===this.options.trimValue&&o.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'),"squish"===this.options.whitespace&&(e=e.replace(/\s{2,}/g," ")),("trim"===this.options.whitespace||"squish"===this.options.whitespace||!0===this.options.trimValue)&&(e=o.trimString(e)),e},_getGroupedConstraints:function(){if(!1===this.options.priorityEnabled)return[this.constraints];for(var e=[],t={},i=0;i<this.constraints.length;i++){var n=this.constraints[i].priority;t[n]||e.push(t[n]=[]),t[n].push(this.constraints[i])}return e.sort(function(e,t){return t[0].priority-e[0].priority}),e}};var E=$,P=function(){this.__class__="ParsleyFieldMultiple"};P.prototype={addElement:function(e){return this.$elements.push(e),this},refreshConstraints:function(){var t;if(this.constraints=[],this.$element.is("select"))return this.actualizeOptions()._bindConstraints(),this;for(var i=0;i<this.$elements.length;i++)if(e("html").has(this.$elements[i]).length){t=this.$elements[i].data("ParsleyFieldMultiple").refreshConstraints().constraints;for(var n=0;n<t.length;n++)this.addConstraint(t[n].name,t[n].requirements,t[n].priority,t[n].isDomConstraint)}else this.$elements.splice(i,1);return this},getValue:function(){if("function"==typeof this.options.value)return this.options.value(this);if("undefined"!=typeof this.options.value)return this.options.value;if(this.$element.is("input[type=radio]"))return this._findRelated().filter(":checked").val()||"";if(this.$element.is("input[type=checkbox]")){var t=[];return this._findRelated().filter(":checked").each(function(){t.push(e(this).val())}),t}return this.$element.is("select")&&null===this.$element.val()?[]:this.$element.val()},_init:function(){return this.$elements=[this.$element],this}};var V=function(t,i,n){this.$element=e(t);var r=this.$element.data("Parsley");if(r)return"undefined"!=typeof n&&r.parent===window.Parsley&&(r.parent=n,r._resetOptions(r.options)),r;if(!this.$element.length)throw new Error("You must bind Parsley on an existing element.");if("undefined"!=typeof n&&"ParsleyForm"!==n.__class__)throw new Error("Parent instance must be a ParsleyForm instance");return this.parent=n||window.Parsley,this.init(i)};V.prototype={init:function(e){return this.__class__="Parsley",this.__version__="2.3.10",this.__id__=o.generateID(),this._resetOptions(e),this.$element.is("form")||o.checkAttr(this.$element,this.options.namespace,"validate")&&!this.$element.is(this.options.inputs)?this.bind("parsleyForm"):this.isMultiple()?this.handleMultiple():this.bind("parsleyField")},isMultiple:function(){return this.$element.is("input[type=radio], input[type=checkbox]")||this.$element.is("select")&&"undefined"!=typeof this.$element.attr("multiple")},handleMultiple:function(){var t,i,n=this;if(this.options.multiple||("undefined"!=typeof this.$element.attr("name")&&this.$element.attr("name").length?this.options.multiple=t=this.$element.attr("name"):"undefined"!=typeof this.$element.attr("id")&&this.$element.attr("id").length&&(this.options.multiple=this.$element.attr("id"))),
	this.$element.is("select")&&"undefined"!=typeof this.$element.attr("multiple"))return this.options.multiple=this.options.multiple||this.__id__,this.bind("parsleyFieldMultiple");if(!this.options.multiple)return o.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.",this.$element),this;this.options.multiple=this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g,""),"undefined"!=typeof t&&e('input[name="'+t+'"]').each(function(t,i){e(i).is("input[type=radio], input[type=checkbox]")&&e(i).attr(n.options.namespace+"multiple",n.options.multiple)});for(var r=this._findRelated(),s=0;s<r.length;s++)if(i=e(r.get(s)).data("Parsley"),"undefined"!=typeof i){this.$element.data("ParsleyFieldMultiple")||i.addElement(this.$element);break}return this.bind("parsleyField",!0),i||this.bind("parsleyFieldMultiple")},bind:function(t,i){var n;switch(t){case"parsleyForm":n=e.extend(new w(this.$element,this.domOptions,this.options),new u,window.ParsleyExtend)._bindFields();break;case"parsleyField":n=e.extend(new E(this.$element,this.domOptions,this.options,this.parent),new u,window.ParsleyExtend);break;case"parsleyFieldMultiple":n=e.extend(new E(this.$element,this.domOptions,this.options,this.parent),new P,new u,window.ParsleyExtend)._init();break;default:throw new Error(t+"is not a supported Parsley type")}return this.options.multiple&&o.setAttr(this.$element,this.options.namespace,"multiple",this.options.multiple),"undefined"!=typeof i?(this.$element.data("ParsleyFieldMultiple",n),n):(this.$element.data("Parsley",n),n._actualizeTriggers(),n._trigger("init"),n)}};var M=e.fn.jquery.split(".");if(parseInt(M[0])<=1&&parseInt(M[1])<8)throw"The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";M.forEach||o.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");var O=e.extend(new u,{$element:e(document),actualizeOptions:null,_resetOptions:null,Factory:V,version:"2.3.10"});e.extend(E.prototype,y.Field,u.prototype),e.extend(w.prototype,y.Form,u.prototype),e.extend(V.prototype,u.prototype),e.fn.parsley=e.fn.psly=function(t){if(this.length>1){var i=[];return this.each(function(){i.push(e(this).parsley(t))}),i}return e(this).length?new V(this,t):void o.warn("You must bind Parsley on an existing element.")},"undefined"==typeof window.ParsleyExtend&&(window.ParsleyExtend={}),O.options=e.extend(o.objectCreate(l),window.ParsleyConfig),window.ParsleyConfig=O.options,window.Parsley=window.psly=O,window.ParsleyUtils=o;var A=window.Parsley._validatorRegistry=new m(window.ParsleyConfig.validators,window.ParsleyConfig.i18n);window.ParsleyValidator={},e.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator".split(" "),function(t,i){window.Parsley[i]=e.proxy(A,i),window.ParsleyValidator[i]=function(){var e;return o.warnOnce("Accessing the method '"+i+"' through ParsleyValidator is deprecated. Simply call 'window.Parsley."+i+"(...)'"),(e=window.Parsley)[i].apply(e,arguments)}}),window.Parsley.UI=y,window.ParsleyUI={removeError:function(e,t,i){var n=!0!==i;return o.warnOnce("Accessing ParsleyUI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."),e.removeError(t,{updateClass:n})},getErrorsMessages:function(e){return o.warnOnce("Accessing ParsleyUI is deprecated. Call 'getErrorsMessages' on the instance directly."),e.getErrorsMessages()}},e.each("addError updateError".split(" "),function(e,t){window.ParsleyUI[t]=function(e,i,n,r,s){var a=!0!==s;return o.warnOnce("Accessing ParsleyUI is deprecated. Call '"+t+"' on the instance directly. Please comment in issue 1073 as to your need to call this method."),e[t](i,{message:n,assert:r,updateClass:a})}}),!1!==window.ParsleyConfig.autoBind&&e(function(){e("[data-parsley-validate]").length&&e("[data-parsley-validate]").parsley()});var R=e({}),T=function(){o.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")},q="parsley:";e.listen=function(e,n){var r;if(T(),"object"==typeof arguments[1]&&"function"==typeof arguments[2]&&(r=arguments[1],n=arguments[2]),"function"!=typeof n)throw new Error("Wrong parameters");window.Parsley.on(i(e),t(n,r))},e.listenTo=function(e,n,r){if(T(),!(e instanceof E||e instanceof w))throw new Error("Must give Parsley instance");if("string"!=typeof n||"function"!=typeof r)throw new Error("Wrong parameters");e.on(i(n),t(r))},e.unsubscribe=function(e,t){if(T(),"string"!=typeof e||"function"!=typeof t)throw new Error("Wrong arguments");window.Parsley.off(i(e),t.parsleyAdaptedCallback)},e.unsubscribeTo=function(e,t){if(T(),!(e instanceof E||e instanceof w))throw new Error("Must give Parsley instance");e.off(i(t))},e.unsubscribeAll=function(t){T(),window.Parsley.off(i(t)),e("form,input,textarea,select").each(function(){var n=e(this).data("Parsley");n&&n.off(i(t))})},e.emit=function(e,t){var n;T();var r=t instanceof E||t instanceof w,s=Array.prototype.slice.call(arguments,r?2:1);s.unshift(i(e)),r||(t=window.Parsley),(n=t).trigger.apply(n,_toConsumableArray(s))};e.extend(!0,O,{asyncValidators:{"default":{fn:function(e){return e.status>=200&&e.status<300},url:!1},reverse:{fn:function(e){return e.status<200||e.status>=300},url:!1}},addAsyncValidator:function(e,t,i,n){return O.asyncValidators[e]={fn:t,url:i||!1,options:n||{}},this}}),O.addValidator("remote",{requirementType:{"":"string",validator:"string",reverse:"boolean",options:"object"},validateString:function(t,i,n,r){var s,a,o={},l=n.validator||(!0===n.reverse?"reverse":"default");if("undefined"==typeof O.asyncValidators[l])throw new Error("Calling an undefined async validator: `"+l+"`");i=O.asyncValidators[l].url||i,i.indexOf("{value}")>-1?i=i.replace("{value}",encodeURIComponent(t)):o[r.$element.attr("name")||r.$element.attr("id")]=t;var u=e.extend(!0,n.options||{},O.asyncValidators[l].options);s=e.extend(!0,{},{url:i,data:o,type:"GET"},u),r.trigger("field:ajaxoptions",r,s),a=e.param(s),"undefined"==typeof O._remoteCache&&(O._remoteCache={});var d=O._remoteCache[a]=O._remoteCache[a]||e.ajax(s),h=function(){var t=O.asyncValidators[l].fn.call(r,d,i,n);return t||(t=e.Deferred().reject()),e.when(t)};return d.then(h,h)},priority:-1}),O.on("form:submit",function(){O._remoteCache={}}),window.ParsleyExtend.addAsyncValidator=function(){return ParsleyUtils.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"),O.addAsyncValidator.apply(O,arguments)},O.addMessages("en",{defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",number:"This value should be a valid number.",integer:"This value should be a valid integer.",digits:"This value should be digits.",alphanum:"This value should be alphanumeric."},notblank:"This value should not be blank.",required:"This value is required.",pattern:"This value seems to be invalid.",min:"This value should be greater than or equal to %s.",max:"This value should be lower than or equal to %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or fewer.",length:"This value length is invalid. It should be between %s and %s characters long.",mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or fewer.",check:"You must select between %s and %s choices.",equalto:"This value should be the same."}),O.setLocale("en");var D=new n;D.install();var I=O;return I});
	//# sourceMappingURL=parsley.min.js.map
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	// Validation errors messages for Parsley
	// Load this after Parsley
	
	Parsley.addMessages('zh-cn', {
	  defaultMessage: "不正确的值",
	  type: {
	    email:        "请输入一个有效的电子邮箱地址",
	    url:          "请输入一个有效的链接",
	    number:       "请输入正确的数字",
	    integer:      "请输入正确的整数",
	    digits:       "请输入正确的号码",
	    alphanum:     "请输入字母或数字"
	  },
	  notblank:       "请输入值",
	  required:       "必填项",
	  pattern:        "格式不正确",
	  min:            "输入值请大于或等于 %s",
	  max:            "输入值请小于或等于 %s",
	  range:          "输入值应该在 %s 到 %s 之间",
	  minlength:      "请输入至少 %s 个字符",
	  maxlength:      "请输入至多 %s 个字符",
	  length:         "字符长度应该在 %s 到 %s 之间",
	  mincheck:       "请至少选择 %s 个选项",
	  maxcheck:       "请选择不超过 %s 个选项",
	  check:          "请选择 %s 到 %s 个选项",
	  equalto:        "输入值不同"
	});
	
	Parsley.setLocale('zh-cn');


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * @license
	 *
	 * Multiselect v2.2.6
	 * http://crlcu.github.io/multiselect/
	 *
	 * Copyright (c) 2015 Adrian Crisan
	 * Licensed under the MIT license (https://github.com/crlcu/multiselect/blob/master/LICENSE)
	 */
	if("undefined"==typeof jQuery)throw new Error("multiselect requires jQuery");!function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<7)throw new Error("multiselect requires jQuery version 1.7 or higher")}(jQuery),function(t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):t(jQuery)}(function(t){"use strict";var e=function(t){function e(e,o){var i=e.prop("id");this.$left=e,this.$right=t(t(o.right).length?o.right:"#"+i+"_to"),this.actions={$leftAll:t(t(o.leftAll).length?o.leftAll:"#"+i+"_leftAll"),$rightAll:t(t(o.rightAll).length?o.rightAll:"#"+i+"_rightAll"),$leftSelected:t(t(o.leftSelected).length?o.leftSelected:"#"+i+"_leftSelected"),$rightSelected:t(t(o.rightSelected).length?o.rightSelected:"#"+i+"_rightSelected"),$undo:t(t(o.undo).length?o.undo:"#"+i+"_undo"),$redo:t(t(o.redo).length?o.redo:"#"+i+"_redo")},delete o.leftAll,delete o.leftSelected,delete o.right,delete o.rightAll,delete o.rightSelected,this.options={keepRenderingSort:o.keepRenderingSort,submitAllLeft:void 0!==o.submitAllLeft?o.submitAllLeft:!0,submitAllRight:void 0!==o.submitAllRight?o.submitAllRight:!0,search:o.search},delete o.keepRenderingSort,o.submitAllLeft,o.submitAllRight,o.search,this.callbacks=o,this.init()}return e.prototype={undoStack:[],redoStack:[],init:function(){var e=this;(e.$left.find("optgroup").length||e.$right.find("optgroup").length)&&(e.callbacks.sort=!1,e.options.search=!1),e.options.keepRenderingSort&&(e.skipInitSort=!0,e.callbacks.sort=function(e,o){return t(e).data("position")>t(o).data("position")?1:-1},e.$left.find("option").each(function(e,o){t(o).data("position",e)}),e.$right.find("option").each(function(e,o){t(o).data("position",e)})),"function"==typeof e.callbacks.startUp&&e.callbacks.startUp(e.$left,e.$right),e.skipInitSort||"function"!=typeof e.callbacks.sort||(e.$left.mSort(e.callbacks.sort),e.$right.each(function(o,i){t(i).mSort(e.callbacks.sort)})),e.options.search&&e.options.search.left&&(e.options.search.$left=t(e.options.search.left),e.$left.before(e.options.search.$left)),e.options.search&&e.options.search.right&&(e.options.search.$right=t(e.options.search.right),e.$right.before(t(e.options.search.$right))),e.events()},events:function(){var e=this;e.options.search&&e.options.search.$left&&e.options.search.$left.on("keyup",function(t){if(this.value){e.$left.find('option:search("'+this.value+'")').mShow(),e.$left.find('option:not(:search("'+this.value+'"))').mHide()}else e.$left.find("option").mShow()}),e.options.search&&e.options.search.$right&&e.options.search.$right.on("keyup",function(t){if(this.value){e.$right.find('option:search("'+this.value+'")').mShow(),e.$right.find('option:not(:search("'+this.value+'"))').mHide()}else e.$right.find("option").mShow()}),e.$right.closest("form").on("submit",function(t){e.$left.find("option").prop("selected",e.options.submitAllLeft),e.$right.find("option").prop("selected",e.options.submitAllRight)}),e.$left.on("dblclick","option",function(t){t.preventDefault();var o=e.$left.find("option:selected");o.length&&e.moveToRight(o,t)}),e.$right.on("dblclick","option",function(t){t.preventDefault();var o=e.$right.find("option:selected");o.length&&e.moveToLeft(o,t)}),(navigator.userAgent.match(/MSIE/i)||navigator.userAgent.indexOf("Trident/")>0||navigator.userAgent.indexOf("Edge/")>0)&&(e.$left.dblclick(function(t){e.actions.$rightSelected.trigger("click")}),e.$right.dblclick(function(t){e.actions.$leftSelected.trigger("click")})),e.actions.$rightSelected.on("click",function(o){o.preventDefault();var i=e.$left.find("option:selected");i.length&&e.moveToRight(i,o),t(this).blur()}),e.actions.$leftSelected.on("click",function(o){o.preventDefault();var i=e.$right.find("option:selected");i.length&&e.moveToLeft(i,o),t(this).blur()}),e.actions.$rightAll.on("click",function(o){o.preventDefault();var i=e.$left.children(":not(span):not(.hidden)");i.length&&e.moveToRight(i,o),t(this).blur()}),e.actions.$leftAll.on("click",function(o){o.preventDefault();var i=e.$right.children(":not(span):not(.hidden)");i.length&&e.moveToLeft(i,o),t(this).blur()}),e.actions.$undo.on("click",function(t){t.preventDefault(),e.undo(t)}),e.actions.$redo.on("click",function(t){t.preventDefault(),e.redo(t)})},moveToRight:function(e,o,i,n){var r=this;return"function"==typeof r.callbacks.moveToRight?r.callbacks.moveToRight(r,e,o,i,n):"function"!=typeof r.callbacks.beforeMoveToRight||i||r.callbacks.beforeMoveToRight(r.$left,r.$right,e)?(e.each(function(e,o){var i=t(o);if(i.parent().is("optgroup")){var n=i.parent(),l=r.$right.find('optgroup[label="'+n.prop("label")+'"]');l.length||(l=n.clone(),l.children().remove()),i=l.append(i),n.removeIfEmpty()}r.$right.move(i)}),n||(r.undoStack.push(["right",e]),r.redoStack=[]),"function"!=typeof r.callbacks.sort||i||r.$right.mSort(r.callbacks.sort),"function"!=typeof r.callbacks.afterMoveToRight||i||r.callbacks.afterMoveToRight(r.$left,r.$right,e),r):!1},moveToLeft:function(e,o,i,n){var r=this;return"function"==typeof r.callbacks.moveToLeft?r.callbacks.moveToLeft(r,e,o,i,n):"function"!=typeof r.callbacks.beforeMoveToLeft||i||r.callbacks.beforeMoveToLeft(r.$left,r.$right,e)?(e.each(function(e,o){var i=t(o);if(i.is("optgroup")||i.parent().is("optgroup")){var n=i.is("optgroup")?i:i.parent(),l=r.$left.find('optgroup[label="'+n.prop("label")+'"]');l.length||(l=n.clone(),l.children().remove()),i=l.append(i.is("optgroup")?i.children():i),n.removeIfEmpty()}r.$left.move(i)}),n||(r.undoStack.push(["left",e]),r.redoStack=[]),"function"!=typeof r.callbacks.sort||i||r.$left.mSort(r.callbacks.sort),"function"!=typeof r.callbacks.afterMoveToLeft||i||r.callbacks.afterMoveToLeft(r.$left,r.$right,e),r):!1},undo:function(t){var e=this,o=e.undoStack.pop();if(o)switch(e.redoStack.push(o),o[0]){case"left":e.moveToRight(o[1],t,!1,!0);break;case"right":e.moveToLeft(o[1],t,!1,!0)}},redo:function(t){var e=this,o=e.redoStack.pop();if(o)switch(e.undoStack.push(o),o[0]){case"left":e.moveToLeft(o[1],t,!1,!0);break;case"right":e.moveToRight(o[1],t,!1,!0)}}},e}(t);t.multiselect={defaults:{startUp:function(t,e){e.find("option").each(function(e,o){var i=t.find('option[value="'+o.value+'"]'),n=i.parent();i.remove(),"OPTGROUP"==n.prop("tagName")&&n.removeIfEmpty()})},beforeMoveToRight:function(t,e,o){return!0},afterMoveToRight:function(t,e,o){},beforeMoveToLeft:function(t,e,o){return!0},afterMoveToLeft:function(t,e,o){},sort:function(t,e){return"NA"==t.innerHTML?1:"NA"==e.innerHTML?-1:t.innerHTML>e.innerHTML?1:-1}}};var o=window.navigator.userAgent,i=o.indexOf("MSIE ")+o.indexOf("Trident/")+o.indexOf("Edge/")>-3;t.fn.multiselect=function(o){return this.each(function(){var i=t(this),n=i.data(),r=t.extend({},t.multiselect.defaults,n,o);return new e(i,r)})},t.fn.move=function(t){return this.append(t).find("option").prop("selected",!1),this},t.fn.removeIfEmpty=function(){return this.children().length||this.remove(),this},t.fn.mShow=function(){return this.removeClass("hidden").show(),i&&this.each(function(e,o){t(o).parent().is("span")&&t(o).parent().replaceWith(o),t(o).show()}),this},t.fn.mHide=function(){return this.addClass("hidden").hide(),i&&this.each(function(e,o){t(o).parent().is("span")||t(o).wrap("<span>").hide()}),this},t.fn.mSort=function(t){return this.find("option").sort(t).appendTo(this),this},t.expr[":"].search=t.expr.createPseudo(function(e){return function(o){return t(o).text().toUpperCase().indexOf(e.toUpperCase())>=0}})});


/***/ },
/* 16 */
/***/ function(module, exports) {

	(function() {
	  var $, AbstractChosen, Chosen, SelectParser, _ref,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
	
	  SelectParser = (function() {
	    function SelectParser() {
	      this.options_index = 0;
	      this.parsed = [];
	    }
	
	    SelectParser.prototype.add_node = function(child) {
	      if (child.nodeName.toUpperCase() === "OPTGROUP") {
	        return this.add_group(child);
	      } else {
	        return this.add_option(child);
	      }
	    };
	
	    SelectParser.prototype.add_group = function(group) {
	      var group_position, option, _i, _len, _ref, _results;
	      group_position = this.parsed.length;
	      this.parsed.push({
	        array_index: group_position,
	        group: true,
	        label: this.escapeExpression(group.label),
	        title: group.title ? group.title : void 0,
	        children: 0,
	        disabled: group.disabled,
	        classes: group.className
	      });
	      _ref = group.childNodes;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        option = _ref[_i];
	        _results.push(this.add_option(option, group_position, group.disabled));
	      }
	      return _results;
	    };
	
	    SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
	      if (option.nodeName.toUpperCase() === "OPTION") {
	        if (option.text !== "") {
	          if (group_position != null) {
	            this.parsed[group_position].children += 1;
	          }
	          this.parsed.push({
	            array_index: this.parsed.length,
	            options_index: this.options_index,
	            value: option.value,
	            text: option.text,
	            html: option.innerHTML,
	            title: option.title ? option.title : void 0,
	            selected: option.selected,
	            disabled: group_disabled === true ? group_disabled : option.disabled,
	            group_array_index: group_position,
	            group_label: group_position != null ? this.parsed[group_position].label : null,
	            classes: option.className,
	            style: option.style.cssText
	          });
	        } else {
	          this.parsed.push({
	            array_index: this.parsed.length,
	            options_index: this.options_index,
	            empty: true
	          });
	        }
	        return this.options_index += 1;
	      }
	    };
	
	    SelectParser.prototype.escapeExpression = function(text) {
	      var map, unsafe_chars;
	      if ((text == null) || text === false) {
	        return "";
	      }
	      if (!/[\&\<\>\"\'\`]/.test(text)) {
	        return text;
	      }
	      map = {
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&quot;",
	        "'": "&#x27;",
	        "`": "&#x60;"
	      };
	      unsafe_chars = /&(?!\w+;)|[\<\>\"\'\`]/g;
	      return text.replace(unsafe_chars, function(chr) {
	        return map[chr] || "&amp;";
	      });
	    };
	
	    return SelectParser;
	
	  })();
	
	  SelectParser.select_to_array = function(select) {
	    var child, parser, _i, _len, _ref;
	    parser = new SelectParser();
	    _ref = select.childNodes;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      child = _ref[_i];
	      parser.add_node(child);
	    }
	    return parser.parsed;
	  };
	
	  AbstractChosen = (function() {
	    function AbstractChosen(form_field, options) {
	      this.form_field = form_field;
	      this.options = options != null ? options : {};
	      if (!AbstractChosen.browser_is_supported()) {
	        return;
	      }
	      this.is_multiple = this.form_field.multiple;
	      this.set_default_text();
	      this.set_default_values();
	      this.setup();
	      this.set_up_html();
	      this.register_observers();
	      this.on_ready();
	    }
	
	    AbstractChosen.prototype.set_default_values = function() {
	      var _this = this;
	      this.click_test_action = function(evt) {
	        return _this.test_active_click(evt);
	      };
	      this.activate_action = function(evt) {
	        return _this.activate_field(evt);
	      };
	      this.active_field = false;
	      this.mouse_on_container = false;
	      this.results_showing = false;
	      this.result_highlighted = null;
	      this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
	      this.disable_search_threshold = this.options.disable_search_threshold || 0;
	      this.disable_search = this.options.disable_search || false;
	      this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
	      this.group_search = this.options.group_search != null ? this.options.group_search : true;
	      this.search_contains = this.options.search_contains || false;
	      this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
	      this.max_selected_options = this.options.max_selected_options || Infinity;
	      this.inherit_select_classes = this.options.inherit_select_classes || false;
	      this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
	      this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
	      this.include_group_label_in_selected = this.options.include_group_label_in_selected || false;
	      return this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY;
	    };
	
	    AbstractChosen.prototype.set_default_text = function() {
	      if (this.form_field.getAttribute("data-placeholder")) {
	        this.default_text = this.form_field.getAttribute("data-placeholder");
	      } else if (this.is_multiple) {
	        this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
	      } else {
	        this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
	      }
	      return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
	    };
	
	    AbstractChosen.prototype.choice_label = function(item) {
	      if (this.include_group_label_in_selected && (item.group_label != null)) {
	        return "<b class='group-name'>" + item.group_label + "</b>" + item.html;
	      } else {
	        return item.html;
	      }
	    };
	
	    AbstractChosen.prototype.mouse_enter = function() {
	      return this.mouse_on_container = true;
	    };
	
	    AbstractChosen.prototype.mouse_leave = function() {
	      return this.mouse_on_container = false;
	    };
	
	    AbstractChosen.prototype.input_focus = function(evt) {
	      var _this = this;
	      if (this.is_multiple) {
	        if (!this.active_field) {
	          return setTimeout((function() {
	            return _this.container_mousedown();
	          }), 50);
	        }
	      } else {
	        if (!this.active_field) {
	          return this.activate_field();
	        }
	      }
	    };
	
	    AbstractChosen.prototype.input_blur = function(evt) {
	      var _this = this;
	      if (!this.mouse_on_container) {
	        this.active_field = false;
	        return setTimeout((function() {
	          return _this.blur_test();
	        }), 100);
	      }
	    };
	
	    AbstractChosen.prototype.results_option_build = function(options) {
	      var content, data, data_content, shown_results, _i, _len, _ref;
	      content = '';
	      shown_results = 0;
	      _ref = this.results_data;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        data = _ref[_i];
	        data_content = '';
	        if (data.group) {
	          data_content = this.result_add_group(data);
	        } else {
	          data_content = this.result_add_option(data);
	        }
	        if (data_content !== '') {
	          shown_results++;
	          content += data_content;
	        }
	        if (options != null ? options.first : void 0) {
	          if (data.selected && this.is_multiple) {
	            this.choice_build(data);
	          } else if (data.selected && !this.is_multiple) {
	            this.single_set_selected_text(this.choice_label(data));
	          }
	        }
	        if (shown_results >= this.max_shown_results) {
	          break;
	        }
	      }
	      return content;
	    };
	
	    AbstractChosen.prototype.result_add_option = function(option) {
	      var classes, option_el;
	      if (!option.search_match) {
	        return '';
	      }
	      if (!this.include_option_in_results(option)) {
	        return '';
	      }
	      classes = [];
	      if (!option.disabled && !(option.selected && this.is_multiple)) {
	        classes.push("active-result");
	      }
	      if (option.disabled && !(option.selected && this.is_multiple)) {
	        classes.push("disabled-result");
	      }
	      if (option.selected) {
	        classes.push("result-selected");
	      }
	      if (option.group_array_index != null) {
	        classes.push("group-option");
	      }
	      if (option.classes !== "") {
	        classes.push(option.classes);
	      }
	      option_el = document.createElement("li");
	      option_el.className = classes.join(" ");
	      option_el.style.cssText = option.style;
	      option_el.setAttribute("data-option-array-index", option.array_index);
	      option_el.innerHTML = option.search_text;
	      if (option.title) {
	        option_el.title = option.title;
	      }
	      return this.outerHTML(option_el);
	    };
	
	    AbstractChosen.prototype.result_add_group = function(group) {
	      var classes, group_el;
	      if (!(group.search_match || group.group_match)) {
	        return '';
	      }
	      if (!(group.active_options > 0)) {
	        return '';
	      }
	      classes = [];
	      classes.push("group-result");
	      if (group.classes) {
	        classes.push(group.classes);
	      }
	      group_el = document.createElement("li");
	      group_el.className = classes.join(" ");
	      group_el.innerHTML = group.search_text;
	      if (group.title) {
	        group_el.title = group.title;
	      }
	      return this.outerHTML(group_el);
	    };
	
	    AbstractChosen.prototype.results_update_field = function() {
	      this.set_default_text();
	      if (!this.is_multiple) {
	        this.results_reset_cleanup();
	      }
	      this.result_clear_highlight();
	      this.results_build();
	      if (this.results_showing) {
	        return this.winnow_results();
	      }
	    };
	
	    AbstractChosen.prototype.reset_single_select_options = function() {
	      var result, _i, _len, _ref, _results;
	      _ref = this.results_data;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        result = _ref[_i];
	        if (result.selected) {
	          _results.push(result.selected = false);
	        } else {
	          _results.push(void 0);
	        }
	      }
	      return _results;
	    };
	
	    AbstractChosen.prototype.results_toggle = function() {
	      if (this.results_showing) {
	        return this.results_hide();
	      } else {
	        return this.results_show();
	      }
	    };
	
	    AbstractChosen.prototype.results_search = function(evt) {
	      if (this.results_showing) {
	        return this.winnow_results();
	      } else {
	        return this.results_show();
	      }
	    };
	
	    AbstractChosen.prototype.winnow_results = function() {
	      var escapedSearchText, option, regex, results, results_group, searchText, startpos, text, zregex, _i, _len, _ref;
	      this.no_results_clear();
	      results = 0;
	      searchText = this.get_search_text();
	      escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	      zregex = new RegExp(escapedSearchText, 'i');
	      regex = this.get_search_regex(escapedSearchText);
	      _ref = this.results_data;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        option = _ref[_i];
	        option.search_match = false;
	        results_group = null;
	        if (this.include_option_in_results(option)) {
	          if (option.group) {
	            option.group_match = false;
	            option.active_options = 0;
	          }
	          if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
	            results_group = this.results_data[option.group_array_index];
	            if (results_group.active_options === 0 && results_group.search_match) {
	              results += 1;
	            }
	            results_group.active_options += 1;
	          }
	          option.search_text = option.group ? option.label : option.html;
	          if (!(option.group && !this.group_search)) {
	            option.search_match = this.search_string_match(option.search_text, regex);
	            if (option.search_match && !option.group) {
	              results += 1;
	            }
	            if (option.search_match) {
	              if (searchText.length) {
	                startpos = option.search_text.search(zregex);
	                text = option.search_text.substr(0, startpos + searchText.length) + '</em>' + option.search_text.substr(startpos + searchText.length);
	                option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
	              }
	              if (results_group != null) {
	                results_group.group_match = true;
	              }
	            } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
	              option.search_match = true;
	            }
	          }
	        }
	      }
	      this.result_clear_highlight();
	      if (results < 1 && searchText.length) {
	        this.update_results_content("");
	        return this.no_results(searchText);
	      } else {
	        this.update_results_content(this.results_option_build());
	        return this.winnow_results_set_highlight();
	      }
	    };
	
	    AbstractChosen.prototype.get_search_regex = function(escaped_search_string) {
	      var regex_anchor;
	      regex_anchor = this.search_contains ? "" : "^";
	      return new RegExp(regex_anchor + escaped_search_string, 'i');
	    };
	
	    AbstractChosen.prototype.search_string_match = function(search_string, regex) {
	      var part, parts, _i, _len;
	      if (regex.test(search_string)) {
	        return true;
	      } else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
	        parts = search_string.replace(/\[|\]/g, "").split(" ");
	        if (parts.length) {
	          for (_i = 0, _len = parts.length; _i < _len; _i++) {
	            part = parts[_i];
	            if (regex.test(part)) {
	              return true;
	            }
	          }
	        }
	      }
	    };
	
	    AbstractChosen.prototype.choices_count = function() {
	      var option, _i, _len, _ref;
	      if (this.selected_option_count != null) {
	        return this.selected_option_count;
	      }
	      this.selected_option_count = 0;
	      _ref = this.form_field.options;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        option = _ref[_i];
	        if (option.selected) {
	          this.selected_option_count += 1;
	        }
	      }
	      return this.selected_option_count;
	    };
	
	    AbstractChosen.prototype.choices_click = function(evt) {
	      evt.preventDefault();
	      if (!(this.results_showing || this.is_disabled)) {
	        return this.results_show();
	      }
	    };
	
	    AbstractChosen.prototype.keyup_checker = function(evt) {
	      var stroke, _ref;
	      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
	      this.search_field_scale();
	      switch (stroke) {
	        case 8:
	          if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
	            return this.keydown_backstroke();
	          } else if (!this.pending_backstroke) {
	            this.result_clear_highlight();
	            return this.results_search();
	          }
	          break;
	        case 13:
	          evt.preventDefault();
	          if (this.results_showing) {
	            return this.result_select(evt);
	          }
	          break;
	        case 27:
	          if (this.results_showing) {
	            this.results_hide();
	          }
	          return true;
	        case 9:
	        case 38:
	        case 40:
	        case 16:
	        case 91:
	        case 17:
	        case 18:
	          break;
	        default:
	          return this.results_search();
	      }
	    };
	
	    AbstractChosen.prototype.clipboard_event_checker = function(evt) {
	      var _this = this;
	      return setTimeout((function() {
	        return _this.results_search();
	      }), 50);
	    };
	
	    AbstractChosen.prototype.container_width = function() {
	      if (this.options.width != null) {
	        return this.options.width;
	      } else {
	        return "" + this.form_field.offsetWidth + "px";
	      }
	    };
	
	    AbstractChosen.prototype.include_option_in_results = function(option) {
	      if (this.is_multiple && (!this.display_selected_options && option.selected)) {
	        return false;
	      }
	      if (!this.display_disabled_options && option.disabled) {
	        return false;
	      }
	      if (option.empty) {
	        return false;
	      }
	      return true;
	    };
	
	    AbstractChosen.prototype.search_results_touchstart = function(evt) {
	      this.touch_started = true;
	      return this.search_results_mouseover(evt);
	    };
	
	    AbstractChosen.prototype.search_results_touchmove = function(evt) {
	      this.touch_started = false;
	      return this.search_results_mouseout(evt);
	    };
	
	    AbstractChosen.prototype.search_results_touchend = function(evt) {
	      if (this.touch_started) {
	        return this.search_results_mouseup(evt);
	      }
	    };
	
	    AbstractChosen.prototype.outerHTML = function(element) {
	      var tmp;
	      if (element.outerHTML) {
	        return element.outerHTML;
	      }
	      tmp = document.createElement("div");
	      tmp.appendChild(element);
	      return tmp.innerHTML;
	    };
	
	    AbstractChosen.browser_is_supported = function() {
	      if (/iP(od|hone)/i.test(window.navigator.userAgent)) {
	        return false;
	      }
	      if (/Android/i.test(window.navigator.userAgent)) {
	        if (/Mobile/i.test(window.navigator.userAgent)) {
	          return false;
	        }
	      }
	      if (/IEMobile/i.test(window.navigator.userAgent)) {
	        return false;
	      }
	      if (/Windows Phone/i.test(window.navigator.userAgent)) {
	        return false;
	      }
	      if (/BlackBerry/i.test(window.navigator.userAgent)) {
	        return false;
	      }
	      if (/BB10/i.test(window.navigator.userAgent)) {
	        return false;
	      }
	      if (window.navigator.appName === "Microsoft Internet Explorer") {
	        return document.documentMode >= 8;
	      }
	      return true;
	    };
	
	    AbstractChosen.default_multiple_text = "Select Some Options";
	
	    AbstractChosen.default_single_text = "Select an Option";
	
	    AbstractChosen.default_no_result_text = "No results match";
	
	    return AbstractChosen;
	
	  })();
	
	  $ = jQuery;
	
	  $.fn.extend({
	    chosen: function(options) {
	      if (!AbstractChosen.browser_is_supported()) {
	        return this;
	      }
	      return this.each(function(input_field) {
	        var $this, chosen;
	        $this = $(this);
	        chosen = $this.data('chosen');
	        if (options === 'destroy') {
	          if (chosen instanceof Chosen) {
	            chosen.destroy();
	          }
	          return;
	        }
	        if (!(chosen instanceof Chosen)) {
	          $this.data('chosen', new Chosen(this, options));
	        }
	      });
	    }
	  });
	
	  Chosen = (function(_super) {
	    __extends(Chosen, _super);
	
	    function Chosen() {
	      _ref = Chosen.__super__.constructor.apply(this, arguments);
	      return _ref;
	    }
	
	    Chosen.prototype.setup = function() {
	      this.form_field_jq = $(this.form_field);
	      this.current_selectedIndex = this.form_field.selectedIndex;
	      return this.is_rtl = this.form_field_jq.hasClass("chosen-rtl");
	    };
	
	    Chosen.prototype.set_up_html = function() {
	      var container_classes, container_props;
	      container_classes = ["chosen-container"];
	      container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
	      if (this.inherit_select_classes && this.form_field.className) {
	        container_classes.push(this.form_field.className);
	      }
	      if (this.is_rtl) {
	        container_classes.push("chosen-rtl");
	      }
	      container_props = {
	        'class': container_classes.join(' '),
	        'style': "width: " + (this.container_width()) + ";",
	        'title': this.form_field.title
	      };
	      if (this.form_field.id.length) {
	        container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
	      }
	      this.container = $("<div />", container_props);
	      if (this.is_multiple) {
	        this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>');
	      } else {
	        this.container.html('<a class="chosen-single chosen-default"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>');
	      }
	      this.form_field_jq.hide().after(this.container);
	      this.dropdown = this.container.find('div.chosen-drop').first();
	      this.search_field = this.container.find('input').first();
	      this.search_results = this.container.find('ul.chosen-results').first();
	      this.search_field_scale();
	      this.search_no_results = this.container.find('li.no-results').first();
	      if (this.is_multiple) {
	        this.search_choices = this.container.find('ul.chosen-choices').first();
	        this.search_container = this.container.find('li.search-field').first();
	      } else {
	        this.search_container = this.container.find('div.chosen-search').first();
	        this.selected_item = this.container.find('.chosen-single').first();
	      }
	      this.results_build();
	      this.set_tab_index();
	      return this.set_label_behavior();
	    };
	
	    Chosen.prototype.on_ready = function() {
	      return this.form_field_jq.trigger("chosen:ready", {
	        chosen: this
	      });
	    };
	
	    Chosen.prototype.register_observers = function() {
	      var _this = this;
	      this.container.bind('touchstart.chosen', function(evt) {
	        _this.container_mousedown(evt);
	        return evt.preventDefault();
	      });
	      this.container.bind('touchend.chosen', function(evt) {
	        _this.container_mouseup(evt);
	        return evt.preventDefault();
	      });
	      this.container.bind('mousedown.chosen', function(evt) {
	        _this.container_mousedown(evt);
	      });
	      this.container.bind('mouseup.chosen', function(evt) {
	        _this.container_mouseup(evt);
	      });
	      this.container.bind('mouseenter.chosen', function(evt) {
	        _this.mouse_enter(evt);
	      });
	      this.container.bind('mouseleave.chosen', function(evt) {
	        _this.mouse_leave(evt);
	      });
	      this.search_results.bind('mouseup.chosen', function(evt) {
	        _this.search_results_mouseup(evt);
	      });
	      this.search_results.bind('mouseover.chosen', function(evt) {
	        _this.search_results_mouseover(evt);
	      });
	      this.search_results.bind('mouseout.chosen', function(evt) {
	        _this.search_results_mouseout(evt);
	      });
	      this.search_results.bind('mousewheel.chosen DOMMouseScroll.chosen', function(evt) {
	        _this.search_results_mousewheel(evt);
	      });
	      this.search_results.bind('touchstart.chosen', function(evt) {
	        _this.search_results_touchstart(evt);
	      });
	      this.search_results.bind('touchmove.chosen', function(evt) {
	        _this.search_results_touchmove(evt);
	      });
	      this.search_results.bind('touchend.chosen', function(evt) {
	        _this.search_results_touchend(evt);
	      });
	      this.form_field_jq.bind("chosen:updated.chosen", function(evt) {
	        _this.results_update_field(evt);
	      });
	      this.form_field_jq.bind("chosen:activate.chosen", function(evt) {
	        _this.activate_field(evt);
	      });
	      this.form_field_jq.bind("chosen:open.chosen", function(evt) {
	        _this.container_mousedown(evt);
	      });
	      this.form_field_jq.bind("chosen:close.chosen", function(evt) {
	        _this.input_blur(evt);
	      });
	      this.search_field.bind('blur.chosen', function(evt) {
	        _this.input_blur(evt);
	      });
	      this.search_field.bind('keyup.chosen', function(evt) {
	        _this.keyup_checker(evt);
	      });
	      this.search_field.bind('keydown.chosen', function(evt) {
	        _this.keydown_checker(evt);
	      });
	      this.search_field.bind('focus.chosen', function(evt) {
	        _this.input_focus(evt);
	      });
	      this.search_field.bind('cut.chosen', function(evt) {
	        _this.clipboard_event_checker(evt);
	      });
	      this.search_field.bind('paste.chosen', function(evt) {
	        _this.clipboard_event_checker(evt);
	      });
	      if (this.is_multiple) {
	        return this.search_choices.bind('click.chosen', function(evt) {
	          _this.choices_click(evt);
	        });
	      } else {
	        return this.container.bind('click.chosen', function(evt) {
	          evt.preventDefault();
	        });
	      }
	    };
	
	    Chosen.prototype.destroy = function() {
	      $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
	      if (this.search_field[0].tabIndex) {
	        this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
	      }
	      this.container.remove();
	      this.form_field_jq.removeData('chosen');
	      return this.form_field_jq.show();
	    };
	
	    Chosen.prototype.search_field_disabled = function() {
	      this.is_disabled = this.form_field_jq[0].disabled;
	      if (this.is_disabled) {
	        this.container.addClass('chosen-disabled');
	        this.search_field[0].disabled = true;
	        if (!this.is_multiple) {
	          this.selected_item.unbind("focus.chosen", this.activate_action);
	        }
	        return this.close_field();
	      } else {
	        this.container.removeClass('chosen-disabled');
	        this.search_field[0].disabled = false;
	        if (!this.is_multiple) {
	          return this.selected_item.bind("focus.chosen", this.activate_action);
	        }
	      }
	    };
	
	    Chosen.prototype.container_mousedown = function(evt) {
	      if (!this.is_disabled) {
	        if (evt && evt.type === "mousedown" && !this.results_showing) {
	          evt.preventDefault();
	        }
	        if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
	          if (!this.active_field) {
	            if (this.is_multiple) {
	              this.search_field.val("");
	            }
	            $(this.container[0].ownerDocument).bind('click.chosen', this.click_test_action);
	            this.results_show();
	          } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
	            evt.preventDefault();
	            this.results_toggle();
	          }
	          return this.activate_field();
	        }
	      }
	    };
	
	    Chosen.prototype.container_mouseup = function(evt) {
	      if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
	        return this.results_reset(evt);
	      }
	    };
	
	    Chosen.prototype.search_results_mousewheel = function(evt) {
	      var delta;
	      if (evt.originalEvent) {
	        delta = evt.originalEvent.deltaY || -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
	      }
	      if (delta != null) {
	        evt.preventDefault();
	        if (evt.type === 'DOMMouseScroll') {
	          delta = delta * 40;
	        }
	        return this.search_results.scrollTop(delta + this.search_results.scrollTop());
	      }
	    };
	
	    Chosen.prototype.blur_test = function(evt) {
	      if (!this.active_field && this.container.hasClass("chosen-container-active")) {
	        return this.close_field();
	      }
	    };
	
	    Chosen.prototype.close_field = function() {
	      $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
	      this.active_field = false;
	      this.results_hide();
	      this.container.removeClass("chosen-container-active");
	      this.clear_backstroke();
	      this.show_search_field_default();
	      return this.search_field_scale();
	    };
	
	    Chosen.prototype.activate_field = function() {
	      this.container.addClass("chosen-container-active");
	      this.active_field = true;
	      this.search_field.val(this.search_field.val());
	      return this.search_field.focus();
	    };
	
	    Chosen.prototype.test_active_click = function(evt) {
	      var active_container;
	      active_container = $(evt.target).closest('.chosen-container');
	      if (active_container.length && this.container[0] === active_container[0]) {
	        return this.active_field = true;
	      } else {
	        return this.close_field();
	      }
	    };
	
	    Chosen.prototype.results_build = function() {
	      this.parsing = true;
	      this.selected_option_count = null;
	      this.results_data = SelectParser.select_to_array(this.form_field);
	      if (this.is_multiple) {
	        this.search_choices.find("li.search-choice").remove();
	      } else if (!this.is_multiple) {
	        this.single_set_selected_text();
	        if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
	          this.search_field[0].readOnly = true;
	          this.container.addClass("chosen-container-single-nosearch");
	        } else {
	          this.search_field[0].readOnly = false;
	          this.container.removeClass("chosen-container-single-nosearch");
	        }
	      }
	      this.update_results_content(this.results_option_build({
	        first: true
	      }));
	      this.search_field_disabled();
	      this.show_search_field_default();
	      this.search_field_scale();
	      return this.parsing = false;
	    };
	
	    Chosen.prototype.result_do_highlight = function(el) {
	      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
	      if (el.length) {
	        this.result_clear_highlight();
	        this.result_highlight = el;
	        this.result_highlight.addClass("highlighted");
	        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
	        visible_top = this.search_results.scrollTop();
	        visible_bottom = maxHeight + visible_top;
	        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
	        high_bottom = high_top + this.result_highlight.outerHeight();
	        if (high_bottom >= visible_bottom) {
	          return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
	        } else if (high_top < visible_top) {
	          return this.search_results.scrollTop(high_top);
	        }
	      }
	    };
	
	    Chosen.prototype.result_clear_highlight = function() {
	      if (this.result_highlight) {
	        this.result_highlight.removeClass("highlighted");
	      }
	      return this.result_highlight = null;
	    };
	
	    Chosen.prototype.results_show = function() {
	      if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
	        this.form_field_jq.trigger("chosen:maxselected", {
	          chosen: this
	        });
	        return false;
	      }
	      this.container.addClass("chosen-with-drop");
	      this.results_showing = true;
	      this.search_field.focus();
	      this.search_field.val(this.search_field.val());
	      this.winnow_results();
	      return this.form_field_jq.trigger("chosen:showing_dropdown", {
	        chosen: this
	      });
	    };
	
	    Chosen.prototype.update_results_content = function(content) {
	      return this.search_results.html(content);
	    };
	
	    Chosen.prototype.results_hide = function() {
	      if (this.results_showing) {
	        this.result_clear_highlight();
	        this.container.removeClass("chosen-with-drop");
	        this.form_field_jq.trigger("chosen:hiding_dropdown", {
	          chosen: this
	        });
	      }
	      return this.results_showing = false;
	    };
	
	    Chosen.prototype.set_tab_index = function(el) {
	      var ti;
	      if (this.form_field.tabIndex) {
	        ti = this.form_field.tabIndex;
	        this.form_field.tabIndex = -1;
	        return this.search_field[0].tabIndex = ti;
	      }
	    };
	
	    Chosen.prototype.set_label_behavior = function() {
	      var _this = this;
	      this.form_field_label = this.form_field_jq.parents("label");
	      if (!this.form_field_label.length && this.form_field.id.length) {
	        this.form_field_label = $("label[for='" + this.form_field.id + "']");
	      }
	      if (this.form_field_label.length > 0) {
	        return this.form_field_label.bind('click.chosen', function(evt) {
	          if (_this.is_multiple) {
	            return _this.container_mousedown(evt);
	          } else {
	            return _this.activate_field();
	          }
	        });
	      }
	    };
	
	    Chosen.prototype.show_search_field_default = function() {
	      if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
	        this.search_field.val(this.default_text);
	        return this.search_field.addClass("default");
	      } else {
	        this.search_field.val("");
	        return this.search_field.removeClass("default");
	      }
	    };
	
	    Chosen.prototype.search_results_mouseup = function(evt) {
	      var target;
	      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
	      if (target.length) {
	        this.result_highlight = target;
	        this.result_select(evt);
	        return this.search_field.focus();
	      }
	    };
	
	    Chosen.prototype.search_results_mouseover = function(evt) {
	      var target;
	      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
	      if (target) {
	        return this.result_do_highlight(target);
	      }
	    };
	
	    Chosen.prototype.search_results_mouseout = function(evt) {
	      if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
	        return this.result_clear_highlight();
	      }
	    };
	
	    Chosen.prototype.choice_build = function(item) {
	      var choice, close_link,
	        _this = this;
	      choice = $('<li />', {
	        "class": "search-choice"
	      }).html("<span>" + (this.choice_label(item)) + "</span>");
	      if (item.disabled) {
	        choice.addClass('search-choice-disabled');
	      } else {
	        close_link = $('<a />', {
	          "class": 'search-choice-close',
	          'data-option-array-index': item.array_index
	        });
	        close_link.bind('click.chosen', function(evt) {
	          return _this.choice_destroy_link_click(evt);
	        });
	        choice.append(close_link);
	      }
	      return this.search_container.before(choice);
	    };
	
	    Chosen.prototype.choice_destroy_link_click = function(evt) {
	      evt.preventDefault();
	      evt.stopPropagation();
	      if (!this.is_disabled) {
	        return this.choice_destroy($(evt.target));
	      }
	    };
	
	    Chosen.prototype.choice_destroy = function(link) {
	      if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
	        this.show_search_field_default();
	        if (this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1) {
	          this.results_hide();
	        }
	        link.parents('li').first().remove();
	        return this.search_field_scale();
	      }
	    };
	
	    Chosen.prototype.results_reset = function() {
	      this.reset_single_select_options();
	      this.form_field.options[0].selected = true;
	      this.single_set_selected_text();
	      this.show_search_field_default();
	      this.results_reset_cleanup();
	      this.form_field_jq.trigger("change");
	      if (this.active_field) {
	        return this.results_hide();
	      }
	    };
	
	    Chosen.prototype.results_reset_cleanup = function() {
	      this.current_selectedIndex = this.form_field.selectedIndex;
	      return this.selected_item.find("abbr").remove();
	    };
	
	    Chosen.prototype.result_select = function(evt) {
	      var high, item;
	      if (this.result_highlight) {
	        high = this.result_highlight;
	        this.result_clear_highlight();
	        if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
	          this.form_field_jq.trigger("chosen:maxselected", {
	            chosen: this
	          });
	          return false;
	        }
	        if (this.is_multiple) {
	          high.removeClass("active-result");
	        } else {
	          this.reset_single_select_options();
	        }
	        high.addClass("result-selected");
	        item = this.results_data[high[0].getAttribute("data-option-array-index")];
	        item.selected = true;
	        this.form_field.options[item.options_index].selected = true;
	        this.selected_option_count = null;
	        if (this.is_multiple) {
	          this.choice_build(item);
	        } else {
	          this.single_set_selected_text(this.choice_label(item));
	        }
	        if (!((evt.metaKey || evt.ctrlKey) && this.is_multiple)) {
	          this.results_hide();
	        }
	        this.show_search_field_default();
	        if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
	          this.form_field_jq.trigger("change", {
	            'selected': this.form_field.options[item.options_index].value
	          });
	        }
	        this.current_selectedIndex = this.form_field.selectedIndex;
	        evt.preventDefault();
	        return this.search_field_scale();
	      }
	    };
	
	    Chosen.prototype.single_set_selected_text = function(text) {
	      if (text == null) {
	        text = this.default_text;
	      }
	      if (text === this.default_text) {
	        this.selected_item.addClass("chosen-default");
	      } else {
	        this.single_deselect_control_build();
	        this.selected_item.removeClass("chosen-default");
	      }
	      return this.selected_item.find("span").html(text);
	    };
	
	    Chosen.prototype.result_deselect = function(pos) {
	      var result_data;
	      result_data = this.results_data[pos];
	      if (!this.form_field.options[result_data.options_index].disabled) {
	        result_data.selected = false;
	        this.form_field.options[result_data.options_index].selected = false;
	        this.selected_option_count = null;
	        this.result_clear_highlight();
	        if (this.results_showing) {
	          this.winnow_results();
	        }
	        this.form_field_jq.trigger("change", {
	          deselected: this.form_field.options[result_data.options_index].value
	        });
	        this.search_field_scale();
	        return true;
	      } else {
	        return false;
	      }
	    };
	
	    Chosen.prototype.single_deselect_control_build = function() {
	      if (!this.allow_single_deselect) {
	        return;
	      }
	      if (!this.selected_item.find("abbr").length) {
	        this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
	      }
	      return this.selected_item.addClass("chosen-single-with-deselect");
	    };
	
	    Chosen.prototype.get_search_text = function() {
	      return $('<div/>').text($.trim(this.search_field.val())).html();
	    };
	
	    Chosen.prototype.winnow_results_set_highlight = function() {
	      var do_high, selected_results;
	      selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
	      do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
	      if (do_high != null) {
	        return this.result_do_highlight(do_high);
	      }
	    };
	
	    Chosen.prototype.no_results = function(terms) {
	      var no_results_html;
	      no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
	      no_results_html.find("span").first().html(terms);
	      this.search_results.append(no_results_html);
	      return this.form_field_jq.trigger("chosen:no_results", {
	        chosen: this
	      });
	    };
	
	    Chosen.prototype.no_results_clear = function() {
	      return this.search_results.find(".no-results").remove();
	    };
	
	    Chosen.prototype.keydown_arrow = function() {
	      var next_sib;
	      if (this.results_showing && this.result_highlight) {
	        next_sib = this.result_highlight.nextAll("li.active-result").first();
	        if (next_sib) {
	          return this.result_do_highlight(next_sib);
	        }
	      } else {
	        return this.results_show();
	      }
	    };
	
	    Chosen.prototype.keyup_arrow = function() {
	      var prev_sibs;
	      if (!this.results_showing && !this.is_multiple) {
	        return this.results_show();
	      } else if (this.result_highlight) {
	        prev_sibs = this.result_highlight.prevAll("li.active-result");
	        if (prev_sibs.length) {
	          return this.result_do_highlight(prev_sibs.first());
	        } else {
	          if (this.choices_count() > 0) {
	            this.results_hide();
	          }
	          return this.result_clear_highlight();
	        }
	      }
	    };
	
	    Chosen.prototype.keydown_backstroke = function() {
	      var next_available_destroy;
	      if (this.pending_backstroke) {
	        this.choice_destroy(this.pending_backstroke.find("a").first());
	        return this.clear_backstroke();
	      } else {
	        next_available_destroy = this.search_container.siblings("li.search-choice").last();
	        if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
	          this.pending_backstroke = next_available_destroy;
	          if (this.single_backstroke_delete) {
	            return this.keydown_backstroke();
	          } else {
	            return this.pending_backstroke.addClass("search-choice-focus");
	          }
	        }
	      }
	    };
	
	    Chosen.prototype.clear_backstroke = function() {
	      if (this.pending_backstroke) {
	        this.pending_backstroke.removeClass("search-choice-focus");
	      }
	      return this.pending_backstroke = null;
	    };
	
	    Chosen.prototype.keydown_checker = function(evt) {
	      var stroke, _ref1;
	      stroke = (_ref1 = evt.which) != null ? _ref1 : evt.keyCode;
	      this.search_field_scale();
	      if (stroke !== 8 && this.pending_backstroke) {
	        this.clear_backstroke();
	      }
	      switch (stroke) {
	        case 8:
	          this.backstroke_length = this.search_field.val().length;
	          break;
	        case 9:
	          if (this.results_showing && !this.is_multiple) {
	            this.result_select(evt);
	          }
	          this.mouse_on_container = false;
	          break;
	        case 13:
	          if (this.results_showing) {
	            evt.preventDefault();
	          }
	          break;
	        case 32:
	          if (this.disable_search) {
	            evt.preventDefault();
	          }
	          break;
	        case 38:
	          evt.preventDefault();
	          this.keyup_arrow();
	          break;
	        case 40:
	          evt.preventDefault();
	          this.keydown_arrow();
	          break;
	      }
	    };
	
	    Chosen.prototype.search_field_scale = function() {
	      var div, f_width, h, style, style_block, styles, w, _i, _len;
	      if (this.is_multiple) {
	        h = 0;
	        w = 0;
	        style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
	        styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
	        for (_i = 0, _len = styles.length; _i < _len; _i++) {
	          style = styles[_i];
	          style_block += style + ":" + this.search_field.css(style) + ";";
	        }
	        div = $('<div />', {
	          'style': style_block
	        });
	        div.text(this.search_field.val());
	        $('body').append(div);
	        w = div.width() + 25;
	        div.remove();
	        f_width = this.container.outerWidth();
	        if (w > f_width - 10) {
	          w = f_width - 10;
	        }
	        return this.search_field.css({
	          'width': w + 'px'
	        });
	      }
	    };
	
	    return Chosen;
	
	  })(AbstractChosen);
	
	}).call(this);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* =========================================================
	 * bootstrap-datetimepicker.js
	 * =========================================================
	 * Copyright 2012 Stefan Petre
	 *
	 * Improvements by Andrew Rowls
	 * Improvements by Sébastien Malot
	 * Improvements by Yun Lai
	 * Improvements by Kenneth Henderick
	 * Improvements by CuGBabyBeaR
	 * Improvements by Christian Vaas <auspex@auspex.eu>
	 *
	 * Project URL : http://www.malot.fr/bootstrap-datetimepicker
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */
	
	(function(factory){
	    if (true)
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    else if (typeof exports === 'object')
	      factory(require('jquery'));
	    else
	      factory(jQuery);
	
	}(function($, undefined){
	
	  // Add ECMA262-5 Array methods if not supported natively (IE8)
	  if (!('indexOf' in Array.prototype)) {
	    Array.prototype.indexOf = function (find, i) {
	      if (i === undefined) i = 0;
	      if (i < 0) i += this.length;
	      if (i < 0) i = 0;
	      for (var n = this.length; i < n; i++) {
	        if (i in this && this[i] === find) {
	          return i;
	        }
	      }
	      return -1;
	    }
	  }
	
	  function elementOrParentIsFixed (element) {
	    var $element = $(element);
	    var $checkElements = $element.add($element.parents());
	    var isFixed = false;
	    $checkElements.each(function(){
	      if ($(this).css('position') === 'fixed') {
	        isFixed = true;
	        return false;
	      }
	    });
	    return isFixed;
	  }
	
	  function UTCDate() {
	    return new Date(Date.UTC.apply(Date, arguments));
	  }
	
	  function UTCToday() {
	    var today = new Date();
	    return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds(), 0);
	  }
	
	  // Picker object
	  var Datetimepicker = function (element, options) {
	    var that = this;
	
	    this.element = $(element);
	
	    // add container for single page application
	    // when page switch the datetimepicker div will be removed also.
	    this.container = options.container || 'body';
	
	    this.language = options.language || this.element.data('date-language') || 'en';
	    this.language = this.language in dates ? this.language : this.language.split('-')[0]; // fr-CA fallback to fr
	    this.language = this.language in dates ? this.language : 'en';
	    this.isRTL = dates[this.language].rtl || false;
	    this.formatType = options.formatType || this.element.data('format-type') || 'standard';
	    this.format = DPGlobal.parseFormat(options.format || this.element.data('date-format') || dates[this.language].format || DPGlobal.getDefaultFormat(this.formatType, 'input'), this.formatType);
	    this.isInline = false;
	    this.isVisible = false;
	    this.isInput = this.element.is('input');
	    this.fontAwesome = options.fontAwesome || this.element.data('font-awesome') || false;
	
	    this.bootcssVer = options.bootcssVer || (this.isInput ? (this.element.is('.form-control') ? 3 : 2) : ( this.bootcssVer = this.element.is('.input-group') ? 3 : 2 ));
	
	    this.component = this.element.is('.date') ? ( this.bootcssVer == 3 ? this.element.find('.input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-remove, .input-group-addon .glyphicon-calendar, .input-group-addon .fa-calendar, .input-group-addon .fa-clock-o').parent() : this.element.find('.add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar, .add-on .fa-calendar, .add-on .fa-clock-o').parent()) : false;
	    this.componentReset = this.element.is('.date') ? ( this.bootcssVer == 3 ? this.element.find('.input-group-addon .glyphicon-remove, .input-group-addon .fa-times').parent():this.element.find('.add-on .icon-remove, .add-on .fa-times').parent()) : false;
	    this.hasInput = this.component && this.element.find('input').length;
	    if (this.component && this.component.length === 0) {
	      this.component = false;
	    }
	    this.linkField = options.linkField || this.element.data('link-field') || false;
	    this.linkFormat = DPGlobal.parseFormat(options.linkFormat || this.element.data('link-format') || DPGlobal.getDefaultFormat(this.formatType, 'link'), this.formatType);
	    this.minuteStep = options.minuteStep || this.element.data('minute-step') || 5;
	    this.pickerPosition = options.pickerPosition || this.element.data('picker-position') || 'bottom-right';
	    this.showMeridian = options.showMeridian || this.element.data('show-meridian') || false;
	    this.initialDate = options.initialDate || new Date();
	    this.zIndex = options.zIndex || this.element.data('z-index') || undefined;
	    this.title = typeof options.title === 'undefined' ? false : options.title;
	
	    this.icons = {
	      leftArrow: this.fontAwesome ? 'fa-arrow-left' : (this.bootcssVer === 3 ? 'glyphicon-arrow-left' : 'icon-arrow-left'),
	      rightArrow: this.fontAwesome ? 'fa-arrow-right' : (this.bootcssVer === 3 ? 'glyphicon-arrow-right' : 'icon-arrow-right')
	    }
	    this.icontype = this.fontAwesome ? 'fa' : 'glyphicon';
	
	    this._attachEvents();
	
	    this.clickedOutside = function (e) {
	        // Clicked outside the datetimepicker, hide it
	        if ($(e.target).closest('.datetimepicker').length === 0) {
	            that.hide();
	        }
	    }
	
	    this.formatViewType = 'datetime';
	    if ('formatViewType' in options) {
	      this.formatViewType = options.formatViewType;
	    } else if ('formatViewType' in this.element.data()) {
	      this.formatViewType = this.element.data('formatViewType');
	    }
	
	    this.minView = 0;
	    if ('minView' in options) {
	      this.minView = options.minView;
	    } else if ('minView' in this.element.data()) {
	      this.minView = this.element.data('min-view');
	    }
	    this.minView = DPGlobal.convertViewMode(this.minView);
	
	    this.maxView = DPGlobal.modes.length - 1;
	    if ('maxView' in options) {
	      this.maxView = options.maxView;
	    } else if ('maxView' in this.element.data()) {
	      this.maxView = this.element.data('max-view');
	    }
	    this.maxView = DPGlobal.convertViewMode(this.maxView);
	
	    this.wheelViewModeNavigation = false;
	    if ('wheelViewModeNavigation' in options) {
	      this.wheelViewModeNavigation = options.wheelViewModeNavigation;
	    } else if ('wheelViewModeNavigation' in this.element.data()) {
	      this.wheelViewModeNavigation = this.element.data('view-mode-wheel-navigation');
	    }
	
	    this.wheelViewModeNavigationInverseDirection = false;
	
	    if ('wheelViewModeNavigationInverseDirection' in options) {
	      this.wheelViewModeNavigationInverseDirection = options.wheelViewModeNavigationInverseDirection;
	    } else if ('wheelViewModeNavigationInverseDirection' in this.element.data()) {
	      this.wheelViewModeNavigationInverseDirection = this.element.data('view-mode-wheel-navigation-inverse-dir');
	    }
	
	    this.wheelViewModeNavigationDelay = 100;
	    if ('wheelViewModeNavigationDelay' in options) {
	      this.wheelViewModeNavigationDelay = options.wheelViewModeNavigationDelay;
	    } else if ('wheelViewModeNavigationDelay' in this.element.data()) {
	      this.wheelViewModeNavigationDelay = this.element.data('view-mode-wheel-navigation-delay');
	    }
	
	    this.startViewMode = 2;
	    if ('startView' in options) {
	      this.startViewMode = options.startView;
	    } else if ('startView' in this.element.data()) {
	      this.startViewMode = this.element.data('start-view');
	    }
	    this.startViewMode = DPGlobal.convertViewMode(this.startViewMode);
	    this.viewMode = this.startViewMode;
	
	    this.viewSelect = this.minView;
	    if ('viewSelect' in options) {
	      this.viewSelect = options.viewSelect;
	    } else if ('viewSelect' in this.element.data()) {
	      this.viewSelect = this.element.data('view-select');
	    }
	    this.viewSelect = DPGlobal.convertViewMode(this.viewSelect);
	
	    this.forceParse = true;
	    if ('forceParse' in options) {
	      this.forceParse = options.forceParse;
	    } else if ('dateForceParse' in this.element.data()) {
	      this.forceParse = this.element.data('date-force-parse');
	    }
	    var template = this.bootcssVer === 3 ? DPGlobal.templateV3 : DPGlobal.template;
	    while (template.indexOf('{iconType}') !== -1) {
	      template = template.replace('{iconType}', this.icontype);
	    }
	    while (template.indexOf('{leftArrow}') !== -1) {
	      template = template.replace('{leftArrow}', this.icons.leftArrow);
	    }
	    while (template.indexOf('{rightArrow}') !== -1) {
	      template = template.replace('{rightArrow}', this.icons.rightArrow);
	    }
	    this.picker = $(template)
	      .appendTo(this.isInline ? this.element : this.container) // 'body')
	      .on({
	        click:     $.proxy(this.click, this),
	        mousedown: $.proxy(this.mousedown, this)
	      });
	
	    if (this.wheelViewModeNavigation) {
	      if ($.fn.mousewheel) {
	        this.picker.on({mousewheel: $.proxy(this.mousewheel, this)});
	      } else {
	        console.log('Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option');
	      }
	    }
	
	    if (this.isInline) {
	      this.picker.addClass('datetimepicker-inline');
	    } else {
	      this.picker.addClass('datetimepicker-dropdown-' + this.pickerPosition + ' dropdown-menu');
	    }
	    if (this.isRTL) {
	      this.picker.addClass('datetimepicker-rtl');
	      var selector = this.bootcssVer === 3 ? '.prev span, .next span' : '.prev i, .next i';
	      this.picker.find(selector).toggleClass(this.icons.leftArrow + ' ' + this.icons.rightArrow);
	    }
	
	    $(document).on('mousedown', this.clickedOutside);
	
	    this.autoclose = false;
	    if ('autoclose' in options) {
	      this.autoclose = options.autoclose;
	    } else if ('dateAutoclose' in this.element.data()) {
	      this.autoclose = this.element.data('date-autoclose');
	    }
	
	    this.keyboardNavigation = true;
	    if ('keyboardNavigation' in options) {
	      this.keyboardNavigation = options.keyboardNavigation;
	    } else if ('dateKeyboardNavigation' in this.element.data()) {
	      this.keyboardNavigation = this.element.data('date-keyboard-navigation');
	    }
	
	    this.todayBtn = (options.todayBtn || this.element.data('date-today-btn') || false);
	    this.clearBtn = (options.clearBtn || this.element.data('date-clear-btn') || false);
	    this.todayHighlight = (options.todayHighlight || this.element.data('date-today-highlight') || false);
	
	    this.weekStart = ((options.weekStart || this.element.data('date-weekstart') || dates[this.language].weekStart || 0) % 7);
	    this.weekEnd = ((this.weekStart + 6) % 7);
	    this.startDate = -Infinity;
	    this.endDate = Infinity;
	    this.datesDisabled = [];
	    this.daysOfWeekDisabled = [];
	    this.setStartDate(options.startDate || this.element.data('date-startdate'));
	    this.setEndDate(options.endDate || this.element.data('date-enddate'));
	    this.setDatesDisabled(options.datesDisabled || this.element.data('date-dates-disabled'));
	    this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data('date-days-of-week-disabled'));
	    this.setMinutesDisabled(options.minutesDisabled || this.element.data('date-minute-disabled'));
	    this.setHoursDisabled(options.hoursDisabled || this.element.data('date-hour-disabled'));
	    this.fillDow();
	    this.fillMonths();
	    this.update();
	    this.showMode();
	
	    if (this.isInline) {
	      this.show();
	    }
	  };
	
	  Datetimepicker.prototype = {
	    constructor: Datetimepicker,
	
	    _events:       [],
	    _attachEvents: function () {
	      this._detachEvents();
	      if (this.isInput) { // single input
	        this._events = [
	          [this.element, {
	            focus:   $.proxy(this.show, this),
	            keyup:   $.proxy(this.update, this),
	            keydown: $.proxy(this.keydown, this)
	          }]
	        ];
	      }
	      else if (this.component && this.hasInput) { // component: input + button
	        this._events = [
	          // For components that are not readonly, allow keyboard nav
	          [this.element.find('input'), {
	            focus:   $.proxy(this.show, this),
	            keyup:   $.proxy(this.update, this),
	            keydown: $.proxy(this.keydown, this)
	          }],
	          [this.component, {
	            click: $.proxy(this.show, this)
	          }]
	        ];
	        if (this.componentReset) {
	          this._events.push([
	            this.componentReset,
	            {click: $.proxy(this.reset, this)}
	          ]);
	        }
	      }
	      else if (this.element.is('div')) {  // inline datetimepicker
	        this.isInline = true;
	      }
	      else {
	        this._events = [
	          [this.element, {
	            click: $.proxy(this.show, this)
	          }]
	        ];
	      }
	      for (var i = 0, el, ev; i < this._events.length; i++) {
	        el = this._events[i][0];
	        ev = this._events[i][1];
	        el.on(ev);
	      }
	    },
	
	    _detachEvents: function () {
	      for (var i = 0, el, ev; i < this._events.length; i++) {
	        el = this._events[i][0];
	        ev = this._events[i][1];
	        el.off(ev);
	      }
	      this._events = [];
	    },
	
	    show: function (e) {
	      this.picker.show();
	      this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
	      if (this.forceParse) {
	        this.update();
	      }
	      this.place();
	      $(window).on('resize', $.proxy(this.place, this));
	      if (e) {
	        e.stopPropagation();
	        e.preventDefault();
	      }
	      this.isVisible = true;
	      this.element.trigger({
	        type: 'show',
	        date: this.date
	      });
	    },
	
	    hide: function (e) {
	      if (!this.isVisible) return;
	      if (this.isInline) return;
	      this.picker.hide();
	      $(window).off('resize', this.place);
	      this.viewMode = this.startViewMode;
	      this.showMode();
	      if (!this.isInput) {
	        $(document).off('mousedown', this.hide);
	      }
	
	      if (
	        this.forceParse &&
	          (
	            this.isInput && this.element.val() ||
	              this.hasInput && this.element.find('input').val()
	            )
	        )
	        this.setValue();
	      this.isVisible = false;
	      this.element.trigger({
	        type: 'hide',
	        date: this.date
	      });
	    },
	
	    remove: function () {
	      this._detachEvents();
	      $(document).off('mousedown', this.clickedOutside);
	      this.picker.remove();
	      delete this.picker;
	      delete this.element.data().datetimepicker;
	    },
	
	    getDate: function () {
	      var d = this.getUTCDate();
	      return new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
	    },
	
	    getUTCDate: function () {
	      return this.date;
	    },
	
	    getInitialDate: function () {
	      return this.initialDate
	    },
	
	    setInitialDate: function (initialDate) {
	      this.initialDate = initialDate;
	    },
	
	    setDate: function (d) {
	      this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)));
	    },
	
	    setUTCDate: function (d) {
	      if (d >= this.startDate && d <= this.endDate) {
	        this.date = d;
	        this.setValue();
	        this.viewDate = this.date;
	        this.fill();
	      } else {
	        this.element.trigger({
	          type:      'outOfRange',
	          date:      d,
	          startDate: this.startDate,
	          endDate:   this.endDate
	        });
	      }
	    },
	
	    setFormat: function (format) {
	      this.format = DPGlobal.parseFormat(format, this.formatType);
	      var element;
	      if (this.isInput) {
	        element = this.element;
	      } else if (this.component) {
	        element = this.element.find('input');
	      }
	      if (element && element.val()) {
	        this.setValue();
	      }
	    },
	
	    setValue: function () {
	      var formatted = this.getFormattedDate();
	      if (!this.isInput) {
	        if (this.component) {
	          this.element.find('input').val(formatted);
	        }
	        this.element.data('date', formatted);
	      } else {
	        this.element.val(formatted);
	      }
	      if (this.linkField) {
	        $('#' + this.linkField).val(this.getFormattedDate(this.linkFormat));
	      }
	    },
	
	    getFormattedDate: function (format) {
	      if (format == undefined) format = this.format;
	      return DPGlobal.formatDate(this.date, format, this.language, this.formatType);
	    },
	
	    setStartDate: function (startDate) {
	      this.startDate = startDate || -Infinity;
	      if (this.startDate !== -Infinity) {
	        this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language, this.formatType);
	      }
	      this.update();
	      this.updateNavArrows();
	    },
	
	    setEndDate: function (endDate) {
	      this.endDate = endDate || Infinity;
	      if (this.endDate !== Infinity) {
	        this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language, this.formatType);
	      }
	      this.update();
	      this.updateNavArrows();
	    },
	
	    setDatesDisabled: function (datesDisabled) {
	      this.datesDisabled = datesDisabled || [];
	      if (!$.isArray(this.datesDisabled)) {
	        this.datesDisabled = this.datesDisabled.split(/,\s*/);
	      }
	      this.datesDisabled = $.map(this.datesDisabled, function (d) {
	        return DPGlobal.parseDate(d, this.format, this.language, this.formatType).toDateString();
	      });
	      this.update();
	      this.updateNavArrows();
	    },
	
	    setTitle: function (selector, value) {
	      return this.picker.find(selector)
	        .find('th:eq(1)')
	        .text(this.title === false ? value : this.title);
	    },
	
	    setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
	      this.daysOfWeekDisabled = daysOfWeekDisabled || [];
	      if (!$.isArray(this.daysOfWeekDisabled)) {
	        this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/);
	      }
	      this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled, function (d) {
	        return parseInt(d, 10);
	      });
	      this.update();
	      this.updateNavArrows();
	    },
	
	    setMinutesDisabled: function (minutesDisabled) {
	      this.minutesDisabled = minutesDisabled || [];
	      if (!$.isArray(this.minutesDisabled)) {
	        this.minutesDisabled = this.minutesDisabled.split(/,\s*/);
	      }
	      this.minutesDisabled = $.map(this.minutesDisabled, function (d) {
	        return parseInt(d, 10);
	      });
	      this.update();
	      this.updateNavArrows();
	    },
	
	    setHoursDisabled: function (hoursDisabled) {
	      this.hoursDisabled = hoursDisabled || [];
	      if (!$.isArray(this.hoursDisabled)) {
	        this.hoursDisabled = this.hoursDisabled.split(/,\s*/);
	      }
	      this.hoursDisabled = $.map(this.hoursDisabled, function (d) {
	        return parseInt(d, 10);
	      });
	      this.update();
	      this.updateNavArrows();
	    },
	
	    place: function () {
	      if (this.isInline) return;
	
	      if (!this.zIndex) {
	        var index_highest = 0;
	        $('div').each(function () {
	          var index_current = parseInt($(this).css('zIndex'), 10);
	          if (index_current > index_highest) {
	            index_highest = index_current;
	          }
	        });
	        this.zIndex = index_highest + 10;
	      }
	
	      var offset, top, left, containerOffset;
	      if (this.container instanceof $) {
	        containerOffset = this.container.offset();
	      } else {
	        containerOffset = $(this.container).offset();
	      }
	
	      if (this.component) {
	        offset = this.component.offset();
	        left = offset.left;
	        if (this.pickerPosition == 'bottom-left' || this.pickerPosition == 'top-left') {
	          left += this.component.outerWidth() - this.picker.outerWidth();
	        }
	      } else {
	        offset = this.element.offset();
	        left = offset.left;
	        if (this.pickerPosition == 'bottom-left' || this.pickerPosition == 'top-left') {
	          left += this.element.outerWidth() - this.picker.outerWidth();
	        }
	      }
	
	      var bodyWidth = document.body.clientWidth || window.innerWidth;
	      if (left + 220 > bodyWidth) {
	        left = bodyWidth - 220;
	      }
	
	      if (this.pickerPosition == 'top-left' || this.pickerPosition == 'top-right') {
	        top = offset.top - this.picker.outerHeight();
	      } else {
	        top = offset.top + this.height;
	      }
	
	      top = top - containerOffset.top;
	      left = left - containerOffset.left;
	
	      this.picker.css({
	        top:    top,
	        left:   left,
	        zIndex: this.zIndex
	      });
	    },
	
	    update: function () {
	      var date, fromArgs = false;
	      if (arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
	        date = arguments[0];
	        fromArgs = true;
	      } else {
	        date = (this.isInput ? this.element.val() : this.element.find('input').val()) || this.element.data('date') || this.initialDate;
	        if (typeof date == 'string' || date instanceof String) {
	          date = date.replace(/^\s+|\s+$/g,'');
	        }
	      }
	
	      if (!date) {
	        date = new Date();
	        fromArgs = false;
	      }
	
	      this.date = DPGlobal.parseDate(date, this.format, this.language, this.formatType);
	
	      if (fromArgs) this.setValue();
	
	      if (this.date < this.startDate) {
	        this.viewDate = new Date(this.startDate);
	      } else if (this.date > this.endDate) {
	        this.viewDate = new Date(this.endDate);
	      } else {
	        this.viewDate = new Date(this.date);
	      }
	      this.fill();
	    },
	
	    fillDow: function () {
	      var dowCnt = this.weekStart,
	        html = '<tr>';
	      while (dowCnt < this.weekStart + 7) {
	        html += '<th class="dow">' + dates[this.language].daysMin[(dowCnt++) % 7] + '</th>';
	      }
	      html += '</tr>';
	      this.picker.find('.datetimepicker-days thead').append(html);
	    },
	
	    fillMonths: function () {
	      var html = '',
	        i = 0;
	      while (i < 12) {
	        html += '<span class="month">' + dates[this.language].monthsShort[i++] + '</span>';
	      }
	      this.picker.find('.datetimepicker-months td').html(html);
	    },
	
	    fill: function () {
	      if (this.date == null || this.viewDate == null) {
	        return;
	      }
	      var d = new Date(this.viewDate),
	        year = d.getUTCFullYear(),
	        month = d.getUTCMonth(),
	        dayMonth = d.getUTCDate(),
	        hours = d.getUTCHours(),
	        minutes = d.getUTCMinutes(),
	        startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
	        startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() + 1 : -Infinity,
	        endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
	        endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() + 1 : Infinity,
	        currentDate = (new UTCDate(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate())).valueOf(),
	        today = new Date();
	      this.setTitle('.datetimepicker-days', dates[this.language].months[month] + ' ' + year)
	      if (this.formatViewType == 'time') {
	        var formatted = this.getFormattedDate();
	        this.setTitle('.datetimepicker-hours', formatted);
	        this.setTitle('.datetimepicker-minutes', formatted);
	      } else {
	        this.setTitle('.datetimepicker-hours', dayMonth + ' ' + dates[this.language].months[month] + ' ' + year);
	        this.setTitle('.datetimepicker-minutes', dayMonth + ' ' + dates[this.language].months[month] + ' ' + year);
	      }
	      this.picker.find('tfoot th.today')
	        .text(dates[this.language].today || dates['en'].today)
	        .toggle(this.todayBtn !== false);
	      this.picker.find('tfoot th.clear')
	        .text(dates[this.language].clear || dates['en'].clear)
	        .toggle(this.clearBtn !== false);
	      this.updateNavArrows();
	      this.fillMonths();
	      /*var prevMonth = UTCDate(year, month, 0,0,0,0,0);
	       prevMonth.setUTCDate(prevMonth.getDate() - (prevMonth.getUTCDay() - this.weekStart + 7)%7);*/
	      var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
	        day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
	      prevMonth.setUTCDate(day);
	      prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
	      var nextMonth = new Date(prevMonth);
	      nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
	      nextMonth = nextMonth.valueOf();
	      var html = [];
	      var clsName;
	      while (prevMonth.valueOf() < nextMonth) {
	        if (prevMonth.getUTCDay() == this.weekStart) {
	          html.push('<tr>');
	        }
	        clsName = '';
	        if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
	          clsName += ' old';
	        } else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
	          clsName += ' new';
	        }
	        // Compare internal UTC date with local today, not UTC today
	        if (this.todayHighlight &&
	          prevMonth.getUTCFullYear() == today.getFullYear() &&
	          prevMonth.getUTCMonth() == today.getMonth() &&
	          prevMonth.getUTCDate() == today.getDate()) {
	          clsName += ' today';
	        }
	        if (prevMonth.valueOf() == currentDate) {
	          clsName += ' active';
	        }
	        if ((prevMonth.valueOf() + 86400000) <= this.startDate || prevMonth.valueOf() > this.endDate ||
	          $.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1 ||
						$.inArray(prevMonth.toDateString(), this.datesDisabled) !== -1) {
	          clsName += ' disabled';
	        }
	        html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + '</td>');
	        if (prevMonth.getUTCDay() == this.weekEnd) {
	          html.push('</tr>');
	        }
	        prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
	      }
	      this.picker.find('.datetimepicker-days tbody').empty().append(html.join(''));
	
	      html = [];
	      var txt = '', meridian = '', meridianOld = '';
	      var hoursDisabled = this.hoursDisabled || [];
	      for (var i = 0; i < 24; i++) {
	        if (hoursDisabled.indexOf(i) !== -1) continue;
	        var actual = UTCDate(year, month, dayMonth, i);
	        clsName = '';
	        // We want the previous hour for the startDate
	        if ((actual.valueOf() + 3600000) <= this.startDate || actual.valueOf() > this.endDate) {
	          clsName += ' disabled';
	        } else if (hours == i) {
	          clsName += ' active';
	        }
	        if (this.showMeridian && dates[this.language].meridiem.length == 2) {
	          meridian = (i < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
	          if (meridian != meridianOld) {
	            if (meridianOld != '') {
	              html.push('</fieldset>');
	            }
	            html.push('<fieldset class="hour"><legend>' + meridian.toUpperCase() + '</legend>');
	          }
	          meridianOld = meridian;
	          txt = (i % 12 ? i % 12 : 12);
	          html.push('<span class="hour' + clsName + ' hour_' + (i < 12 ? 'am' : 'pm') + '">' + txt + '</span>');
	          if (i == 23) {
	            html.push('</fieldset>');
	          }
	        } else {
	          txt = i + ':00';
	          html.push('<span class="hour' + clsName + '">' + txt + '</span>');
	        }
	      }
	      this.picker.find('.datetimepicker-hours td').html(html.join(''));
	
	      html = [];
	      txt = '', meridian = '', meridianOld = '';
	      var minutesDisabled = this.minutesDisabled || [];
	      for (var i = 0; i < 60; i += this.minuteStep) {
	        if (minutesDisabled.indexOf(i) !== -1) continue;
	        var actual = UTCDate(year, month, dayMonth, hours, i, 0);
	        clsName = '';
	        if (actual.valueOf() < this.startDate || actual.valueOf() > this.endDate) {
	          clsName += ' disabled';
	        } else if (Math.floor(minutes / this.minuteStep) == Math.floor(i / this.minuteStep)) {
	          clsName += ' active';
	        }
	        if (this.showMeridian && dates[this.language].meridiem.length == 2) {
	          meridian = (hours < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
	          if (meridian != meridianOld) {
	            if (meridianOld != '') {
	              html.push('</fieldset>');
	            }
	            html.push('<fieldset class="minute"><legend>' + meridian.toUpperCase() + '</legend>');
	          }
	          meridianOld = meridian;
	          txt = (hours % 12 ? hours % 12 : 12);
	          //html.push('<span class="minute'+clsName+' minute_'+(hours<12?'am':'pm')+'">'+txt+'</span>');
	          html.push('<span class="minute' + clsName + '">' + txt + ':' + (i < 10 ? '0' + i : i) + '</span>');
	          if (i == 59) {
	            html.push('</fieldset>');
	          }
	        } else {
	          txt = i + ':00';
	          //html.push('<span class="hour'+clsName+'">'+txt+'</span>');
	          html.push('<span class="minute' + clsName + '">' + hours + ':' + (i < 10 ? '0' + i : i) + '</span>');
	        }
	      }
	      this.picker.find('.datetimepicker-minutes td').html(html.join(''));
	
	      var currentYear = this.date.getUTCFullYear();
	      var months = this.setTitle('.datetimepicker-months', year)
	        .end()
	        .find('span').removeClass('active');
	      if (currentYear == year) {
	        // getUTCMonths() returns 0 based, and we need to select the next one
	        // To cater bootstrap 2 we don't need to select the next one
	        var offset = months.length - 12;
	        months.eq(this.date.getUTCMonth() + offset).addClass('active');
	      }
	      if (year < startYear || year > endYear) {
	        months.addClass('disabled');
	      }
	      if (year == startYear) {
	        months.slice(0, startMonth + 1).addClass('disabled');
	      }
	      if (year == endYear) {
	        months.slice(endMonth).addClass('disabled');
	      }
	
	      html = '';
	      year = parseInt(year / 10, 10) * 10;
	      var yearCont = this.setTitle('.datetimepicker-years', year + '-' + (year + 9))
	        .end()
	        .find('td');
	      year -= 1;
	      for (var i = -1; i < 11; i++) {
	        html += '<span class="year' + (i == -1 || i == 10 ? ' old' : '') + (currentYear == year ? ' active' : '') + (year < startYear || year > endYear ? ' disabled' : '') + '">' + year + '</span>';
	        year += 1;
	      }
	      yearCont.html(html);
	      this.place();
	    },
	
	    updateNavArrows: function () {
	      var d = new Date(this.viewDate),
	        year = d.getUTCFullYear(),
	        month = d.getUTCMonth(),
	        day = d.getUTCDate(),
	        hour = d.getUTCHours();
	      switch (this.viewMode) {
	        case 0:
	          if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
	            && month <= this.startDate.getUTCMonth()
	            && day <= this.startDate.getUTCDate()
	            && hour <= this.startDate.getUTCHours()) {
	            this.picker.find('.prev').css({visibility: 'hidden'});
	          } else {
	            this.picker.find('.prev').css({visibility: 'visible'});
	          }
	          if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
	            && month >= this.endDate.getUTCMonth()
	            && day >= this.endDate.getUTCDate()
	            && hour >= this.endDate.getUTCHours()) {
	            this.picker.find('.next').css({visibility: 'hidden'});
	          } else {
	            this.picker.find('.next').css({visibility: 'visible'});
	          }
	          break;
	        case 1:
	          if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
	            && month <= this.startDate.getUTCMonth()
	            && day <= this.startDate.getUTCDate()) {
	            this.picker.find('.prev').css({visibility: 'hidden'});
	          } else {
	            this.picker.find('.prev').css({visibility: 'visible'});
	          }
	          if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
	            && month >= this.endDate.getUTCMonth()
	            && day >= this.endDate.getUTCDate()) {
	            this.picker.find('.next').css({visibility: 'hidden'});
	          } else {
	            this.picker.find('.next').css({visibility: 'visible'});
	          }
	          break;
	        case 2:
	          if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
	            && month <= this.startDate.getUTCMonth()) {
	            this.picker.find('.prev').css({visibility: 'hidden'});
	          } else {
	            this.picker.find('.prev').css({visibility: 'visible'});
	          }
	          if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
	            && month >= this.endDate.getUTCMonth()) {
	            this.picker.find('.next').css({visibility: 'hidden'});
	          } else {
	            this.picker.find('.next').css({visibility: 'visible'});
	          }
	          break;
	        case 3:
	        case 4:
	          if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
	            this.picker.find('.prev').css({visibility: 'hidden'});
	          } else {
	            this.picker.find('.prev').css({visibility: 'visible'});
	          }
	          if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
	            this.picker.find('.next').css({visibility: 'hidden'});
	          } else {
	            this.picker.find('.next').css({visibility: 'visible'});
	          }
	          break;
	      }
	    },
	
	    mousewheel: function (e) {
	
	      e.preventDefault();
	      e.stopPropagation();
	
	      if (this.wheelPause) {
	        return;
	      }
	
	      this.wheelPause = true;
	
	      var originalEvent = e.originalEvent;
	
	      var delta = originalEvent.wheelDelta;
	
	      var mode = delta > 0 ? 1 : (delta === 0) ? 0 : -1;
	
	      if (this.wheelViewModeNavigationInverseDirection) {
	        mode = -mode;
	      }
	
	      this.showMode(mode);
	
	      setTimeout($.proxy(function () {
	
	        this.wheelPause = false
	
	      }, this), this.wheelViewModeNavigationDelay);
	
	    },
	
	    click: function (e) {
	      e.stopPropagation();
	      e.preventDefault();
	      var target = $(e.target).closest('span, td, th, legend');
	      if (target.is('.' + this.icontype)) {
	        target = $(target).parent().closest('span, td, th, legend');
	      }
	      if (target.length == 1) {
	        if (target.is('.disabled')) {
	          this.element.trigger({
	            type:      'outOfRange',
	            date:      this.viewDate,
	            startDate: this.startDate,
	            endDate:   this.endDate
	          });
	          return;
	        }
	        switch (target[0].nodeName.toLowerCase()) {
	          case 'th':
	            switch (target[0].className) {
	              case 'switch':
	                this.showMode(1);
	                break;
	              case 'prev':
	              case 'next':
	                var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
	                switch (this.viewMode) {
	                  case 0:
	                    this.viewDate = this.moveHour(this.viewDate, dir);
	                    break;
	                  case 1:
	                    this.viewDate = this.moveDate(this.viewDate, dir);
	                    break;
	                  case 2:
	                    this.viewDate = this.moveMonth(this.viewDate, dir);
	                    break;
	                  case 3:
	                  case 4:
	                    this.viewDate = this.moveYear(this.viewDate, dir);
	                    break;
	                }
	                this.fill();
	                this.element.trigger({
	                  type:      target[0].className + ':' + this.convertViewModeText(this.viewMode),
	                  date:      this.viewDate,
	                  startDate: this.startDate,
	                  endDate:   this.endDate
	                });
	                break;
	              case 'clear':
	                this.reset();
	                if (this.autoclose) {
	                  this.hide();
	                }
	                break;
	              case 'today':
	                var date = new Date();
	                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
	
	                // Respect startDate and endDate.
	                if (date < this.startDate) date = this.startDate;
	                else if (date > this.endDate) date = this.endDate;
	
	                this.viewMode = this.startViewMode;
	                this.showMode(0);
	                this._setDate(date);
	                this.fill();
	                if (this.autoclose) {
	                  this.hide();
	                }
	                break;
	            }
	            break;
	          case 'span':
	            if (!target.is('.disabled')) {
	              var year = this.viewDate.getUTCFullYear(),
	                month = this.viewDate.getUTCMonth(),
	                day = this.viewDate.getUTCDate(),
	                hours = this.viewDate.getUTCHours(),
	                minutes = this.viewDate.getUTCMinutes(),
	                seconds = this.viewDate.getUTCSeconds();
	
	              if (target.is('.month')) {
	                this.viewDate.setUTCDate(1);
	                month = target.parent().find('span').index(target);
	                day = this.viewDate.getUTCDate();
	                this.viewDate.setUTCMonth(month);
	                this.element.trigger({
	                  type: 'changeMonth',
	                  date: this.viewDate
	                });
	                if (this.viewSelect >= 3) {
	                  this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
	                }
	              } else if (target.is('.year')) {
	                this.viewDate.setUTCDate(1);
	                year = parseInt(target.text(), 10) || 0;
	                this.viewDate.setUTCFullYear(year);
	                this.element.trigger({
	                  type: 'changeYear',
	                  date: this.viewDate
	                });
	                if (this.viewSelect >= 4) {
	                  this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
	                }
	              } else if (target.is('.hour')) {
	                hours = parseInt(target.text(), 10) || 0;
	                if (target.hasClass('hour_am') || target.hasClass('hour_pm')) {
	                  if (hours == 12 && target.hasClass('hour_am')) {
	                    hours = 0;
	                  } else if (hours != 12 && target.hasClass('hour_pm')) {
	                    hours += 12;
	                  }
	                }
	                this.viewDate.setUTCHours(hours);
	                this.element.trigger({
	                  type: 'changeHour',
	                  date: this.viewDate
	                });
	                if (this.viewSelect >= 1) {
	                  this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
	                }
	              } else if (target.is('.minute')) {
	                minutes = parseInt(target.text().substr(target.text().indexOf(':') + 1), 10) || 0;
	                this.viewDate.setUTCMinutes(minutes);
	                this.element.trigger({
	                  type: 'changeMinute',
	                  date: this.viewDate
	                });
	                if (this.viewSelect >= 0) {
	                  this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
	                }
	              }
	              if (this.viewMode != 0) {
	                var oldViewMode = this.viewMode;
	                this.showMode(-1);
	                this.fill();
	                if (oldViewMode == this.viewMode && this.autoclose) {
	                  this.hide();
	                }
	              } else {
	                this.fill();
	                if (this.autoclose) {
	                  this.hide();
	                }
	              }
	            }
	            break;
	          case 'td':
	            if (target.is('.day') && !target.is('.disabled')) {
	              var day = parseInt(target.text(), 10) || 1;
	              var year = this.viewDate.getUTCFullYear(),
	                month = this.viewDate.getUTCMonth(),
	                hours = this.viewDate.getUTCHours(),
	                minutes = this.viewDate.getUTCMinutes(),
	                seconds = this.viewDate.getUTCSeconds();
	              if (target.is('.old')) {
	                if (month === 0) {
	                  month = 11;
	                  year -= 1;
	                } else {
	                  month -= 1;
	                }
	              } else if (target.is('.new')) {
	                if (month == 11) {
	                  month = 0;
	                  year += 1;
	                } else {
	                  month += 1;
	                }
	              }
	              this.viewDate.setUTCFullYear(year);
	              this.viewDate.setUTCMonth(month, day);
	              this.element.trigger({
	                type: 'changeDay',
	                date: this.viewDate
	              });
	              if (this.viewSelect >= 2) {
	                this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
	              }
	            }
	            var oldViewMode = this.viewMode;
	            this.showMode(-1);
	            this.fill();
	            if (oldViewMode == this.viewMode && this.autoclose) {
	              this.hide();
	            }
	            break;
	        }
	      }
	    },
	
	    _setDate: function (date, which) {
	      if (!which || which == 'date')
	        this.date = date;
	      if (!which || which == 'view')
	        this.viewDate = date;
	      this.fill();
	      this.setValue();
	      var element;
	      if (this.isInput) {
	        element = this.element;
	      } else if (this.component) {
	        element = this.element.find('input');
	      }
	      if (element) {
	        element.change();
	        if (this.autoclose && (!which || which == 'date')) {
	          //this.hide();
	        }
	      }
	      this.element.trigger({
	        type: 'changeDate',
	        date: this.getDate()
	      });
	      if(date == null)
	        this.date = this.viewDate;
	    },
	
	    moveMinute: function (date, dir) {
	      if (!dir) return date;
	      var new_date = new Date(date.valueOf());
	      //dir = dir > 0 ? 1 : -1;
	      new_date.setUTCMinutes(new_date.getUTCMinutes() + (dir * this.minuteStep));
	      return new_date;
	    },
	
	    moveHour: function (date, dir) {
	      if (!dir) return date;
	      var new_date = new Date(date.valueOf());
	      //dir = dir > 0 ? 1 : -1;
	      new_date.setUTCHours(new_date.getUTCHours() + dir);
	      return new_date;
	    },
	
	    moveDate: function (date, dir) {
	      if (!dir) return date;
	      var new_date = new Date(date.valueOf());
	      //dir = dir > 0 ? 1 : -1;
	      new_date.setUTCDate(new_date.getUTCDate() + dir);
	      return new_date;
	    },
	
	    moveMonth: function (date, dir) {
	      if (!dir) return date;
	      var new_date = new Date(date.valueOf()),
	        day = new_date.getUTCDate(),
	        month = new_date.getUTCMonth(),
	        mag = Math.abs(dir),
	        new_month, test;
	      dir = dir > 0 ? 1 : -1;
	      if (mag == 1) {
	        test = dir == -1
	          // If going back one month, make sure month is not current month
	          // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
	          ? function () {
	          return new_date.getUTCMonth() == month;
	        }
	          // If going forward one month, make sure month is as expected
	          // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
	          : function () {
	          return new_date.getUTCMonth() != new_month;
	        };
	        new_month = month + dir;
	        new_date.setUTCMonth(new_month);
	        // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
	        if (new_month < 0 || new_month > 11)
	          new_month = (new_month + 12) % 12;
	      } else {
	        // For magnitudes >1, move one month at a time...
	        for (var i = 0; i < mag; i++)
	          // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
	          new_date = this.moveMonth(new_date, dir);
	        // ...then reset the day, keeping it in the new month
	        new_month = new_date.getUTCMonth();
	        new_date.setUTCDate(day);
	        test = function () {
	          return new_month != new_date.getUTCMonth();
	        };
	      }
	      // Common date-resetting loop -- if date is beyond end of month, make it
	      // end of month
	      while (test()) {
	        new_date.setUTCDate(--day);
	        new_date.setUTCMonth(new_month);
	      }
	      return new_date;
	    },
	
	    moveYear: function (date, dir) {
	      return this.moveMonth(date, dir * 12);
	    },
	
	    dateWithinRange: function (date) {
	      return date >= this.startDate && date <= this.endDate;
	    },
	
	    keydown: function (e) {
	      if (this.picker.is(':not(:visible)')) {
	        if (e.keyCode == 27) // allow escape to hide and re-show picker
	          this.show();
	        return;
	      }
	      var dateChanged = false,
	        dir, day, month,
	        newDate, newViewDate;
	      switch (e.keyCode) {
	        case 27: // escape
	          this.hide();
	          e.preventDefault();
	          break;
	        case 37: // left
	        case 39: // right
	          if (!this.keyboardNavigation) break;
	          dir = e.keyCode == 37 ? -1 : 1;
	          viewMode = this.viewMode;
	          if (e.ctrlKey) {
	            viewMode += 2;
	          } else if (e.shiftKey) {
	            viewMode += 1;
	          }
	          if (viewMode == 4) {
	            newDate = this.moveYear(this.date, dir);
	            newViewDate = this.moveYear(this.viewDate, dir);
	          } else if (viewMode == 3) {
	            newDate = this.moveMonth(this.date, dir);
	            newViewDate = this.moveMonth(this.viewDate, dir);
	          } else if (viewMode == 2) {
	            newDate = this.moveDate(this.date, dir);
	            newViewDate = this.moveDate(this.viewDate, dir);
	          } else if (viewMode == 1) {
	            newDate = this.moveHour(this.date, dir);
	            newViewDate = this.moveHour(this.viewDate, dir);
	          } else if (viewMode == 0) {
	            newDate = this.moveMinute(this.date, dir);
	            newViewDate = this.moveMinute(this.viewDate, dir);
	          }
	          if (this.dateWithinRange(newDate)) {
	            this.date = newDate;
	            this.viewDate = newViewDate;
	            this.setValue();
	            this.update();
	            e.preventDefault();
	            dateChanged = true;
	          }
	          break;
	        case 38: // up
	        case 40: // down
	          if (!this.keyboardNavigation) break;
	          dir = e.keyCode == 38 ? -1 : 1;
	          viewMode = this.viewMode;
	          if (e.ctrlKey) {
	            viewMode += 2;
	          } else if (e.shiftKey) {
	            viewMode += 1;
	          }
	          if (viewMode == 4) {
	            newDate = this.moveYear(this.date, dir);
	            newViewDate = this.moveYear(this.viewDate, dir);
	          } else if (viewMode == 3) {
	            newDate = this.moveMonth(this.date, dir);
	            newViewDate = this.moveMonth(this.viewDate, dir);
	          } else if (viewMode == 2) {
	            newDate = this.moveDate(this.date, dir * 7);
	            newViewDate = this.moveDate(this.viewDate, dir * 7);
	          } else if (viewMode == 1) {
	            if (this.showMeridian) {
	              newDate = this.moveHour(this.date, dir * 6);
	              newViewDate = this.moveHour(this.viewDate, dir * 6);
	            } else {
	              newDate = this.moveHour(this.date, dir * 4);
	              newViewDate = this.moveHour(this.viewDate, dir * 4);
	            }
	          } else if (viewMode == 0) {
	            newDate = this.moveMinute(this.date, dir * 4);
	            newViewDate = this.moveMinute(this.viewDate, dir * 4);
	          }
	          if (this.dateWithinRange(newDate)) {
	            this.date = newDate;
	            this.viewDate = newViewDate;
	            this.setValue();
	            this.update();
	            e.preventDefault();
	            dateChanged = true;
	          }
	          break;
	        case 13: // enter
	          if (this.viewMode != 0) {
	            var oldViewMode = this.viewMode;
	            this.showMode(-1);
	            this.fill();
	            if (oldViewMode == this.viewMode && this.autoclose) {
	              this.hide();
	            }
	          } else {
	            this.fill();
	            if (this.autoclose) {
	              this.hide();
	            }
	          }
	          e.preventDefault();
	          break;
	        case 9: // tab
	          this.hide();
	          break;
	      }
	      if (dateChanged) {
	        var element;
	        if (this.isInput) {
	          element = this.element;
	        } else if (this.component) {
	          element = this.element.find('input');
	        }
	        if (element) {
	          element.change();
	        }
	        this.element.trigger({
	          type: 'changeDate',
	          date: this.getDate()
	        });
	      }
	    },
	
	    showMode: function (dir) {
	      if (dir) {
	        var newViewMode = Math.max(0, Math.min(DPGlobal.modes.length - 1, this.viewMode + dir));
	        if (newViewMode >= this.minView && newViewMode <= this.maxView) {
	          this.element.trigger({
	            type:        'changeMode',
	            date:        this.viewDate,
	            oldViewMode: this.viewMode,
	            newViewMode: newViewMode
	          });
	
	          this.viewMode = newViewMode;
	        }
	      }
	      /*
	       vitalets: fixing bug of very special conditions:
	       jquery 1.7.1 + webkit + show inline datetimepicker in bootstrap popover.
	       Method show() does not set display css correctly and datetimepicker is not shown.
	       Changed to .css('display', 'block') solve the problem.
	       See https://github.com/vitalets/x-editable/issues/37
	
	       In jquery 1.7.2+ everything works fine.
	       */
	      //this.picker.find('>div').hide().filter('.datetimepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
	      this.picker.find('>div').hide().filter('.datetimepicker-' + DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
	      this.updateNavArrows();
	    },
	
	    reset: function (e) {
	      this._setDate(null, 'date');
	    },
	
	    convertViewModeText:  function (viewMode) {
	      switch (viewMode) {
	        case 4:
	          return 'decade';
	        case 3:
	          return 'year';
	        case 2:
	          return 'month';
	        case 1:
	          return 'day';
	        case 0:
	          return 'hour';
	      }
	    }
	  };
	
	  var old = $.fn.datetimepicker;
	  $.fn.datetimepicker = function (option) {
	    var args = Array.apply(null, arguments);
	    args.shift();
	    var internal_return;
	    this.each(function () {
	      var $this = $(this),
	        data = $this.data('datetimepicker'),
	        options = typeof option == 'object' && option;
	      if (!data) {
	        $this.data('datetimepicker', (data = new Datetimepicker(this, $.extend({}, $.fn.datetimepicker.defaults, options))));
	      }
	      if (typeof option == 'string' && typeof data[option] == 'function') {
	        internal_return = data[option].apply(data, args);
	        if (internal_return !== undefined) {
	          return false;
	        }
	      }
	    });
	    if (internal_return !== undefined)
	      return internal_return;
	    else
	      return this;
	  };
	
	  $.fn.datetimepicker.defaults = {
	  };
	  $.fn.datetimepicker.Constructor = Datetimepicker;
	  var dates = $.fn.datetimepicker.dates = {
	    en: {
	      days:        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	      daysShort:   ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	      daysMin:     ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
	      months:      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	      meridiem:    ['am', 'pm'],
	      suffix:      ['st', 'nd', 'rd', 'th'],
	      today:       'Today',
	      clear:       'Clear'
	    }
	  };
	
	  var DPGlobal = {
	    modes:            [
	      {
	        clsName: 'minutes',
	        navFnc:  'Hours',
	        navStep: 1
	      },
	      {
	        clsName: 'hours',
	        navFnc:  'Date',
	        navStep: 1
	      },
	      {
	        clsName: 'days',
	        navFnc:  'Month',
	        navStep: 1
	      },
	      {
	        clsName: 'months',
	        navFnc:  'FullYear',
	        navStep: 1
	      },
	      {
	        clsName: 'years',
	        navFnc:  'FullYear',
	        navStep: 10
	      }
	    ],
	    isLeapYear:       function (year) {
	      return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
	    },
	    getDaysInMonth:   function (year, month) {
	      return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
	    },
	    getDefaultFormat: function (type, field) {
	      if (type == 'standard') {
	        if (field == 'input')
	          return 'yyyy-mm-dd hh:ii';
	        else
	          return 'yyyy-mm-dd hh:ii:ss';
	      } else if (type == 'php') {
	        if (field == 'input')
	          return 'Y-m-d H:i';
	        else
	          return 'Y-m-d H:i:s';
	      } else {
	        throw new Error('Invalid format type.');
	      }
	    },
	    validParts: function (type) {
	      if (type == 'standard') {
	        return /t|hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
	      } else if (type == 'php') {
	        return /[dDjlNwzFmMnStyYaABgGhHis]/g;
	      } else {
	        throw new Error('Invalid format type.');
	      }
	    },
	    nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
	    parseFormat: function (format, type) {
	      // IE treats \0 as a string end in inputs (truncating the value),
	      // so it's a bad format delimiter, anyway
	      var separators = format.replace(this.validParts(type), '\0').split('\0'),
	        parts = format.match(this.validParts(type));
	      if (!separators || !separators.length || !parts || parts.length == 0) {
	        throw new Error('Invalid date format.');
	      }
	      return {separators: separators, parts: parts};
	    },
	    parseDate: function (date, format, language, type) {
	      if (date instanceof Date) {
	        var dateUTC = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
	        dateUTC.setMilliseconds(0);
	        return dateUTC;
	      }
	      if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
	        format = this.parseFormat('yyyy-mm-dd', type);
	      }
	      if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
	        format = this.parseFormat('yyyy-mm-dd hh:ii', type);
	      }
	      if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
	        format = this.parseFormat('yyyy-mm-dd hh:ii:ss', type);
	      }
	      if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
	        var part_re = /([-+]\d+)([dmwy])/,
	          parts = date.match(/([-+]\d+)([dmwy])/g),
	          part, dir;
	        date = new Date();
	        for (var i = 0; i < parts.length; i++) {
	          part = part_re.exec(parts[i]);
	          dir = parseInt(part[1]);
	          switch (part[2]) {
	            case 'd':
	              date.setUTCDate(date.getUTCDate() + dir);
	              break;
	            case 'm':
	              date = Datetimepicker.prototype.moveMonth.call(Datetimepicker.prototype, date, dir);
	              break;
	            case 'w':
	              date.setUTCDate(date.getUTCDate() + dir * 7);
	              break;
	            case 'y':
	              date = Datetimepicker.prototype.moveYear.call(Datetimepicker.prototype, date, dir);
	              break;
	          }
	        }
	        return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), 0);
	      }
	      var parts = date && date.toString().match(this.nonpunctuation) || [],
	        date = new Date(0, 0, 0, 0, 0, 0, 0),
	        parsed = {},
	        setters_order = ['hh', 'h', 'ii', 'i', 'ss', 's', 'yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'D', 'DD', 'd', 'dd', 'H', 'HH', 'p', 'P'],
	        setters_map = {
	          hh:   function (d, v) {
	            return d.setUTCHours(v);
	          },
	          h:    function (d, v) {
	            return d.setUTCHours(v);
	          },
	          HH:   function (d, v) {
	            return d.setUTCHours(v == 12 ? 0 : v);
	          },
	          H:    function (d, v) {
	            return d.setUTCHours(v == 12 ? 0 : v);
	          },
	          ii:   function (d, v) {
	            return d.setUTCMinutes(v);
	          },
	          i:    function (d, v) {
	            return d.setUTCMinutes(v);
	          },
	          ss:   function (d, v) {
	            return d.setUTCSeconds(v);
	          },
	          s:    function (d, v) {
	            return d.setUTCSeconds(v);
	          },
	          yyyy: function (d, v) {
	            return d.setUTCFullYear(v);
	          },
	          yy:   function (d, v) {
	            return d.setUTCFullYear(2000 + v);
	          },
	          m:    function (d, v) {
	            v -= 1;
	            while (v < 0) v += 12;
	            v %= 12;
	            d.setUTCMonth(v);
	            while (d.getUTCMonth() != v)
	              if (isNaN(d.getUTCMonth()))
	                return d;
	              else
	                d.setUTCDate(d.getUTCDate() - 1);
	            return d;
	          },
	          d:    function (d, v) {
	            return d.setUTCDate(v);
	          },
	          p:    function (d, v) {
	            return d.setUTCHours(v == 1 ? d.getUTCHours() + 12 : d.getUTCHours());
	          }
	        },
	        val, filtered, part;
	      setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
	      setters_map['dd'] = setters_map['d'];
	      setters_map['P'] = setters_map['p'];
	      date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
	      if (parts.length == format.parts.length) {
	        for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
	          val = parseInt(parts[i], 10);
	          part = format.parts[i];
	          if (isNaN(val)) {
	            switch (part) {
	              case 'MM':
	                filtered = $(dates[language].months).filter(function () {
	                  var m = this.slice(0, parts[i].length),
	                    p = parts[i].slice(0, m.length);
	                  return m == p;
	                });
	                val = $.inArray(filtered[0], dates[language].months) + 1;
	                break;
	              case 'M':
	                filtered = $(dates[language].monthsShort).filter(function () {
	                  var m = this.slice(0, parts[i].length),
	                    p = parts[i].slice(0, m.length);
	                  return m.toLowerCase() == p.toLowerCase();
	                });
	                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
	                break;
	              case 'p':
	              case 'P':
	                val = $.inArray(parts[i].toLowerCase(), dates[language].meridiem);
	                break;
	            }
	          }
	          parsed[part] = val;
	        }
	        for (var i = 0, s; i < setters_order.length; i++) {
	          s = setters_order[i];
	          if (s in parsed && !isNaN(parsed[s]))
	            setters_map[s](date, parsed[s])
	        }
	      }
	      return date;
	    },
	    formatDate:       function (date, format, language, type) {
	      if (date == null) {
	        return '';
	      }
	      var val;
	      if (type == 'standard') {
	        val = {
	          t:    date.getTime(),
	          // year
	          yy:   date.getUTCFullYear().toString().substring(2),
	          yyyy: date.getUTCFullYear(),
	          // month
	          m:    date.getUTCMonth() + 1,
	          M:    dates[language].monthsShort[date.getUTCMonth()],
	          MM:   dates[language].months[date.getUTCMonth()],
	          // day
	          d:    date.getUTCDate(),
	          D:    dates[language].daysShort[date.getUTCDay()],
	          DD:   dates[language].days[date.getUTCDay()],
	          p:    (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
	          // hour
	          h:    date.getUTCHours(),
	          // minute
	          i:    date.getUTCMinutes(),
	          // second
	          s:    date.getUTCSeconds()
	        };
	
	        if (dates[language].meridiem.length == 2) {
	          val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
	        }
	        else {
	          val.H = val.h;
	        }
	        val.HH = (val.H < 10 ? '0' : '') + val.H;
	        val.P = val.p.toUpperCase();
	        val.hh = (val.h < 10 ? '0' : '') + val.h;
	        val.ii = (val.i < 10 ? '0' : '') + val.i;
	        val.ss = (val.s < 10 ? '0' : '') + val.s;
	        val.dd = (val.d < 10 ? '0' : '') + val.d;
	        val.mm = (val.m < 10 ? '0' : '') + val.m;
	      } else if (type == 'php') {
	        // php format
	        val = {
	          // year
	          y: date.getUTCFullYear().toString().substring(2),
	          Y: date.getUTCFullYear(),
	          // month
	          F: dates[language].months[date.getUTCMonth()],
	          M: dates[language].monthsShort[date.getUTCMonth()],
	          n: date.getUTCMonth() + 1,
	          t: DPGlobal.getDaysInMonth(date.getUTCFullYear(), date.getUTCMonth()),
	          // day
	          j: date.getUTCDate(),
	          l: dates[language].days[date.getUTCDay()],
	          D: dates[language].daysShort[date.getUTCDay()],
	          w: date.getUTCDay(), // 0 -> 6
	          N: (date.getUTCDay() == 0 ? 7 : date.getUTCDay()),       // 1 -> 7
	          S: (date.getUTCDate() % 10 <= dates[language].suffix.length ? dates[language].suffix[date.getUTCDate() % 10 - 1] : ''),
	          // hour
	          a: (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
	          g: (date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12),
	          G: date.getUTCHours(),
	          // minute
	          i: date.getUTCMinutes(),
	          // second
	          s: date.getUTCSeconds()
	        };
	        val.m = (val.n < 10 ? '0' : '') + val.n;
	        val.d = (val.j < 10 ? '0' : '') + val.j;
	        val.A = val.a.toString().toUpperCase();
	        val.h = (val.g < 10 ? '0' : '') + val.g;
	        val.H = (val.G < 10 ? '0' : '') + val.G;
	        val.i = (val.i < 10 ? '0' : '') + val.i;
	        val.s = (val.s < 10 ? '0' : '') + val.s;
	      } else {
	        throw new Error('Invalid format type.');
	      }
	      var date = [],
	        seps = $.extend([], format.separators);
	      for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
	        if (seps.length) {
	          date.push(seps.shift());
	        }
	        date.push(val[format.parts[i]]);
	      }
	      if (seps.length) {
	        date.push(seps.shift());
	      }
	      return date.join('');
	    },
	    convertViewMode:  function (viewMode) {
	      switch (viewMode) {
	        case 4:
	        case 'decade':
	          viewMode = 4;
	          break;
	        case 3:
	        case 'year':
	          viewMode = 3;
	          break;
	        case 2:
	        case 'month':
	          viewMode = 2;
	          break;
	        case 1:
	        case 'day':
	          viewMode = 1;
	          break;
	        case 0:
	        case 'hour':
	          viewMode = 0;
	          break;
	      }
	
	      return viewMode;
	    },
	    headTemplate: '<thead>' +
	                '<tr>' +
	                '<th class="prev"><i class="{iconType} {leftArrow}"/></th>' +
	                '<th colspan="5" class="switch"></th>' +
	                '<th class="next"><i class="{iconType} {rightArrow}"/></th>' +
	                '</tr>' +
	      '</thead>',
	    headTemplateV3: '<thead>' +
	                '<tr>' +
	                '<th class="prev"><span class="{iconType} {leftArrow}"></span> </th>' +
	                '<th colspan="5" class="switch"></th>' +
	                '<th class="next"><span class="{iconType} {rightArrow}"></span> </th>' +
	                '</tr>' +
	      '</thead>',
	    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
	    footTemplate: '<tfoot>' + 
	                    '<tr><th colspan="7" class="today"></th></tr>' +
	                    '<tr><th colspan="7" class="clear"></th></tr>' +
	                  '</tfoot>'
	  };
	  DPGlobal.template = '<div class="datetimepicker">' +
	    '<div class="datetimepicker-minutes">' +
	    '<table class=" table-condensed">' +
	    DPGlobal.headTemplate +
	    DPGlobal.contTemplate +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '<div class="datetimepicker-hours">' +
	    '<table class=" table-condensed">' +
	    DPGlobal.headTemplate +
	    DPGlobal.contTemplate +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '<div class="datetimepicker-days">' +
	    '<table class=" table-condensed">' +
	    DPGlobal.headTemplate +
	    '<tbody></tbody>' +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '<div class="datetimepicker-months">' +
	    '<table class="table-condensed">' +
	    DPGlobal.headTemplate +
	    DPGlobal.contTemplate +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '<div class="datetimepicker-years">' +
	    '<table class="table-condensed">' +
	    DPGlobal.headTemplate +
	    DPGlobal.contTemplate +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '</div>';
	  DPGlobal.templateV3 = '<div class="datetimepicker">' +
	    '<div class="datetimepicker-minutes">' +
	    '<table class=" table-condensed">' +
	    DPGlobal.headTemplateV3 +
	    DPGlobal.contTemplate +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '<div class="datetimepicker-hours">' +
	    '<table class=" table-condensed">' +
	    DPGlobal.headTemplateV3 +
	    DPGlobal.contTemplate +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '<div class="datetimepicker-days">' +
	    '<table class=" table-condensed">' +
	    DPGlobal.headTemplateV3 +
	    '<tbody></tbody>' +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '<div class="datetimepicker-months">' +
	    '<table class="table-condensed">' +
	    DPGlobal.headTemplateV3 +
	    DPGlobal.contTemplate +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '<div class="datetimepicker-years">' +
	    '<table class="table-condensed">' +
	    DPGlobal.headTemplateV3 +
	    DPGlobal.contTemplate +
	    DPGlobal.footTemplate +
	    '</table>' +
	    '</div>' +
	    '</div>';
	  $.fn.datetimepicker.DPGlobal = DPGlobal;
	
	  /* DATETIMEPICKER NO CONFLICT
	   * =================== */
	
	  $.fn.datetimepicker.noConflict = function () {
	    $.fn.datetimepicker = old;
	    return this;
	  };
	
	  /* DATETIMEPICKER DATA-API
	   * ================== */
	
	  $(document).on(
	    'focus.datetimepicker.data-api click.datetimepicker.data-api',
	    '[data-provide="datetimepicker"]',
	    function (e) {
	      var $this = $(this);
	      if ($this.data('datetimepicker')) return;
	      e.preventDefault();
	      // component click requires us to explicitly show it
	      $this.datetimepicker('show');
	    }
	  );
	  $(function () {
	    $('[data-provide="datetimepicker-inline"]').datetimepicker();
	  });
	
	}));


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Simplified Chinese translation for bootstrap-datetimepicker
	 * Yuan Cheung <advanimal@gmail.com>
	 */
	;(function($){
		$.fn.datetimepicker.dates['zh-CN'] = {
				days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
				daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
				daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
				months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				today: "今天",
				suffix: [],
				meridiem: ["上午", "下午"]
		};
	}(jQuery));


/***/ }
/******/ ]);
//# sourceMappingURL=vendor.js.map