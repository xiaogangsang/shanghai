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

	'use strict;'
	
	var common = __webpack_require__(1);
	var _channels = {};
	// var _pageIndex = 1;
	// var _pageSize = 10;
	// var _pageTotal = 0;
	var _querying = false;
	var searchCache = {};
	var useCache = false;
	
	$(function () {
	  common.init('coupon-record');
	  getChannel();
	});
	
	//handle search form
	$('#formSearch').on('click', 'button[type=submit]', function (event) {
	  event.preventDefault();
	  // _pageIndex = 1;
	  useCache = false;
	  $('#formSearch').trigger('submit');
	});
	
	$('#formSearch').on('submit', function (e) {
	  e.preventDefault();
	  if ($.trim($('#search_couponCode').val()) == '' && $.trim($('#search_userId').val()) == '') {
	    alert('优惠券码或归属用户ID，至少填写一项！');
	    return false;
	  }
	
	  var sendData = {
	    couponCode: $.trim($('#search_couponCode').val()),
	    userId: $.trim($('#search_userId').val()),
	    // pageSize: _pageSize,
	  };
	  if (!!_querying) {
	    return false;
	  }
	
	  _querying = true;
	  if (useCache) {
	    sendData = searchCache;
	  } else {
	    searchCache = sendData;
	  }
	
	  // sendData.pageIndex = _pageIndex;
	
	  $.ajax({
	    url: common.API_HOST + 'couponCode/list',
	    type: 'POST',
	    dataType: 'json',
	    data: sendData,
	  })
	  .done(function (res) {
	    _querying = false;
	    if (!!~~res.meta.result) {
	      if (res.data == null || res.data.length < 1) {
	        $('#dataTable tbody').html('<tr><td colspan="7" align="center">查不到相关数据，请修改查询条件！</td></tr>');
	        // $('#pager').html('');
	      } else {
	        useCache = true;
	
	        var hasFlow = false;
	
	        if (res.data.type == 'new') {
	          hasFlow = true;
	        } else {
	          if (res.data.list == null || res.data.list.rows.length < 1) {
	            alert('暂无流水记录！');
	            return false;
	          }
	
	          var orderUrl = 'order-cs-detail.html';
	          if ($('#menu-order').css('display') == 'block') {
	            orderUrl = 'order-detail.html';
	          }
	
	          var data = { rows: res.data.list.rows, orderUrl: orderUrl };
	          var template = $('#flow-template').html();
	          Mustache.parse(template);
	          var html = Mustache.render(template, data);
	          $('#flowTable tbody').html(html);
	          $('#popup-coupon-flow').modal('show');
	          return false;
	        }
	        // _pageIndex = res.data.pageIndex;
	        // _pageTotal = Math.ceil(res.data.total / _pageSize);
	        // setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
	        _(res.data.list).forEach(function (item) {
	
	          item.hasFlow = hasFlow;
	
	          switch (item.source) {
	            case 'PRODUCE':
	              item.source = '批量产码';
	            break;
	            case 'SEND':
	              item.source = '批量灌码';
	            break;
	            case 'BUY_CMBCC':
	              item.source = '掌上生活购买';
	            break;
	            case 'BUY_CMB':
	              item.source = '手机银行购买';
	            break;
	            default:
	            break;
	          }
	
	          switch (item.status) {
	            case 'DELETED':
	              item.status = '已废弃';
	            break;
	            case 'ACTIVE':
	              item.status = '可使用';
	            break;
	            case 'USED':
	              item.status = '已使用';
	            break;
	            case 'EXPIRE':
	              item.status = '已过期';
	            break;
	            default:
	            break;
	          }
	        });
	
	        setTableData(res.data.list);
	      }
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	
	  return false;
	});
	
	$('#dataTable').on('click', '.btn-flow', function (event) {
	  event.preventDefault();
	  $.ajax({
	    url: common.API_HOST + 'usedCouponLog/list',
	    // url: 'http://172.16.0.50:8080/movie-ops/usedCouponLog/list',
	    type: 'POST',
	    dataType: 'json',
	    data: { couponCode: $(this).closest('tr').data('code') },
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
	      if (res.data == null || res.data.rows.length < 1) {
	        alert('暂无流水记录！');
	        return false;
	      }
	
	      var orderUrl = 'order-cs-detail.html';
	      if ($('#menu-order').css('display') == 'block') {
	        orderUrl = 'order-detail.html';
	      }
	
	      var data = { rows: res.data.rows, orderUrl: orderUrl };
	      var template = $('#flow-template').html();
	      Mustache.parse(template);
	      var html = Mustache.render(template, data);
	      $('#flowTable tbody').html(html);
	      $('#popup-coupon-flow').modal('show');
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	});
	
	// $('#pager').on('click', '.prev,.next', function (e) {
	//   e.preventDefault();
	//   if ($(this).hasClass('prev')) {
	//     if (_pageIndex <= 1) {
	//       _pageIndex = 1;
	//       alert('已经是第一页！');
	//       return false;
	//     }
	
	//     _pageIndex--;
	//   } else {
	//     if (_pageIndex >= _pageTotal) {
	//       _pageIndex = _pageTotal;
	//       alert('已经是最后一页！');
	//       return false;
	//     }
	
	//     _pageIndex++;
	//   }
	
	//   $('#formSearch').trigger('submit');
	//   return false;
	// });
	
	// $('#pager').on('click', '#btn-pager', function (e) {
	//   e.preventDefault();
	//   if (~~$('#pageNo').val() == 0) {
	//     return false;
	//   }
	
	//   var pageNo = parseInt($('#pageNo').val());
	//   if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
	//     alert('要跳转的页码超过了范围！');
	//     return false;
	//   }
	
	//   _pageIndex = pageNo;
	//   $('#formSearch').trigger('submit');
	//   return false;
	// });
	
	function getChannel() {
	  $.ajax({
	    url: common.API_HOST + 'common/channelList',
	    type: 'GET',
	    dataType: 'json',
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
	      _channels = res.data;
	    } else {
	      alert('获取渠道列表失败：' + res.meta.msg);
	    }
	  });
	}
	
	function setTableData(rows) {
	  var orderUrl = 'order-cs-detail.html';
	  if ($('#menu-order').css('display') == 'block') {
	    orderUrl = 'order-detail.html';
	  }
	
	  var data = { rows: rows, orderUrl: orderUrl };
	  var template = $('#table-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, data);
	  $('#dataTable tbody').html(html);
	}
	
	// function setPager(total, pageIndex, rowsSize, pageTotal) {
	//   var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
	//   var template = $('#pager-template').html();
	//   Mustache.parse(template);
	//   var html = Mustache.render(template, data);
	//   $('#pager').html(html);
	// }


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict;'
	
	__webpack_require__(2);
	var common = {};
	
	common.API_HOST = window.location.protocol + '//' + window.location.host + '/MovieOps/';
	
	common.init = function (pageName) {
	  common.checkLogin();
	  common.showMenu(pageName);
	  common.setLoginName();
	
	  $.ajaxSetup({
	    error: function (jqXHR, textStatus, errorThrown) {
	      var errorMsg = jqXHR.status + '：未知错误！';
	      var redirectUrl = document.location.href;
	      switch (jqXHR.status){
	        case (500):
	          errorMsg = jqXHR.status + '：服务器无响应，请稍后再试！';
	        break;
	        case (401):
	          errorMsg = jqXHR.status + '：未登录或登陆超时，请尝试重新登陆！';
	          redirectUrl = 'login.html?logout';
	        break;
	        case (403):
	          errorMsg = jqXHR.status + '：没有权限，请尝试重新登陆！';
	          redirectUrl = 'login.html?logout';
	        break;
	        case (404):
	          errorMsg = jqXHR.status + '：服务器暂时无法访问，请稍后再试！';
	        break;
	        case (408):
	          errorMsg = jqXHR.status + '：请求超时，请稍后再试！';
	        break;
	        case (0):
	          errorMsg = jqXHR.status + '：貌似断网了！';
	        break;
	      }
	      $('<div class="modal fade" data-keyboard="false" data-backdrop="static"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">错误提示</h4></div><div class="modal-body"><p style="text-align:center;">' + errorMsg + '</p></div><div class="modal-footer"><a href="' + redirectUrl + '" class="btn btn-primary">确定</a></div></div></div></div>').appendTo('body').modal('show');
	      throw new Error('Abort, error ' + jqXHR.status);
	    },
	  });
	};
	
	common.showMenu = function (pageName) {
	  var allowMenus = sessionStorage.getItem('menuAuthority') != null ? sessionStorage.getItem('menuAuthority').split(',') : null;
	  if (pageName != undefined && pageName != '' && $('#menu-' + pageName).size() > 0) {
	    var menuId = '' + $('#menu-' + pageName).data('id');
	    if (allowMenus.indexOf(menuId) < 0) {
	      common.logout();
	      window.location.href = 'login.html';
	    }
	
	    $('#menu-' + pageName).addClass('active').closest('.panel-collapse').collapse('show');
	
	  }
	
	  var $menus = $('#menu .list-group-item');
	  $menus.each(function (index, el) {
	    menuId = '' + $(el).data('id');
	    if (allowMenus.indexOf(menuId) > -1) {
	      $(el).show();
	      $(el).closest('.panel').show();
	    }
	  });
	};
	
	common.checkLogin = function () {
	  if (sessionStorage.getItem('menuAuthority') == null || Cookies.get('Xtoken') == undefined) {
	    common.logout();
	    window.location.href = 'login.html';
	  }
	};
	
	common.setLoginName = function () {
	  var loginName = Cookies.get('name');
	  if (loginName != undefined && loginName != '') {
	    $('#loginName').text(loginName);
	  }
	};
	
	common.logout = function () {
	  Cookies.remove('Xtoken');
	  Cookies.remove('name');
	  sessionStorage.setItem('cityAuthority', '');
	  sessionStorage.setItem('channelAuthority', '');
	  sessionStorage.setItem('menuAuthority', '');
	};
	
	common.getDate = function (date) {
	  if (date == undefined || date == '') {
	    date = new Date();
	  }
	
	  var YYYY = date.getFullYear().toString();
	  var MM = (date.getMonth() + 1).toString();
	  var DD = date.getDate().toString();
	  MM = MM[1] ? MM : '0' + MM[0];
	  DD = DD[1] ? DD : '0' + DD[0];
	  return YYYY + '-' + MM + '-' + DD;
	};
	
	common.getUrlParam = function () {
	  var paramArr = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split('&');
	  for (var i = 0; i < vars.length; i++) {
	    var pair = vars[i].split(/=(.+)?/);
	    if (typeof paramArr[pair[0]] === 'undefined') {
	      paramArr[pair[0]] = decodeURIComponent(pair[1]);
	    } else if (typeof paramArr[pair[0]] === 'string') {
	      var arr = [paramArr[pair[0]], decodeURIComponent(pair[1])];
	      paramArr[pair[0]] = arr;
	    } else {
	      paramArr[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  }
	
	  return paramArr;
	};
	
	module.exports = common;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Cookies"] = __webpack_require__(3);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.1
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}
	
		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}
	
				// Write
	
				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);
	
					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}
	
					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}
	
					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}
	
					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);
	
					return (document.cookie = [
						key, '=', value,
						attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
						attributes.path    && '; path=' + attributes.path,
						attributes.domain  && '; domain=' + attributes.domain,
						attributes.secure ? '; secure' : ''
					].join(''));
				}
	
				// Read
	
				if (!key) {
					result = {};
				}
	
				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;
	
				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var name = parts[0].replace(rdecode, decodeURIComponent);
					var cookie = parts.slice(1).join('=');
	
					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}
	
					try {
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);
	
						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}
	
						if (key === name) {
							result = cookie;
							break;
						}
	
						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}
	
				return result;
			}
	
			api.set = api;
			api.get = function (key) {
				return api(key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};
	
			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};
	
			api.withConverter = init;
	
			return api;
		}
	
		return init(function () {});
	}));


/***/ }
/******/ ]);
//# sourceMappingURL=coupon-record.js.map