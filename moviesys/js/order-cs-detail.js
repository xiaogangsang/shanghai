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
	var _productOrderStatus = [
	{ id: 0, name: '未出票' },
	{ id: 1, name: '出票中' },
	{ id: 2, name: '已出票' },
	{ id: 3, name: '出票失败' },
	{ id: 4, name: '已退票' },
	];
	var _productPayStatus = [
	{ id: 1, name: '待支付' },
	{ id: 2, name: '支付成功' },
	{ id: 3, name: '支付失败' },
	{ id: 5, name: '退款成功' },
	{ id: 6, name: '退款失败' },
	{ id: 9, name: '已关闭' },
	];
	var _transOrderStatus = [
	{ id: 1, name: '待支付' },
	{ id: 2, name: '支付成功' },
	{ id: 3, name: '支付关闭' },
	{ id: 9, name: '已关闭' },
	];
	var _shipInfoStatus = {
	  '02': '出票成功',
	  '03': '出票失败',
	  '04': '出票中',
	  '05': '同步出票状态成功',
	  '06': '同步出票状态失败',
	  '12': '退票成功',
	  '13': '退票失败',
	};
	var _channels = {};
	var _sources = {};
	var _submitting = false;
	
	$(function () {
	  common.init('order-cs');
	  getChannel();
	  getSource();
	
	  var urlParam = common.getUrlParam();
	  if (urlParam.orderId != undefined && urlParam.orderId != '') {
	    $.ajax({
	      url: common.API_HOST + 'order/kf/orderDetail',
	      type: 'POST',
	      dataType: 'json',
	      data: { transOrderNo: urlParam.orderId },
	    })
	    .done(function (res) {
	      if (!!~~res.meta.result) {
	        $('h2').append('：' + urlParam.orderId);
	        $('#transOrderNo').val(res.data.payOrder.transOrderNo);
	        $('#productOrderNo').val(res.data.bizOrder.productOrderNo);
	        $('#couponNo').val(res.data.bizOrder.couponCode);
	
	        _(_channels).forEach(function (channel) {
	          if (channel.channelId == res.data.bizOrder.channelId) {
	            res.data.bizOrder.channelName = channel.channelName;
	          }
	        });
	
	        _(_sources).forEach(function (source) {
	          if (source.sourceId == res.data.bizOrder.thirdParty) {
	            res.data.bizOrder.thirdPartyName = source.sourceName;
	          }
	        });
	
	        _(_transOrderStatus).forEach(function (status) {
	          if (status.id == res.data.payOrder.transOrderStatus) {
	            res.data.payOrder.transOrderStatus = status.name;
	          }
	        });
	
	        _(_productOrderStatus).forEach(function (status) {
	          if (status.id == res.data.bizOrder.productOrderStatus) {
	            res.data.bizOrder.productOrderStatus = status.name;
	          }
	        });
	
	        _(_productPayStatus).forEach(function (status) {
	          if (status.id == res.data.bizOrder.status) {
	            res.data.bizOrder.status = status.name;
	          }
	        });
	
	        res.data.bizOrder.canReturnTicket = false;
	        if (res.data.bizOrder.productOrderStatus == '已出票'
	          && res.data.bizOrder.status == '支付成功'
	          && res.data.bizOrder.wandaTicketId != null
	          && res.data.bizOrder.supportRefund == true) {
	          res.data.bizOrder.canReturnTicket = true;
	        }
	
	        res.data.bizOrder.canReturnCoupon = false;
	        if (res.data.bizOrder.productOrderStatus != '已出票'
	          && res.data.bizOrder.couponId != null) {
	          res.data.bizOrder.canReturnCoupon = true;
	        }
	
	        res.data.bizOrder.canSendSMS = false;
	        if (res.data.bizOrder.smsContent != null && res.data.bizOrder.smsContent != '') {
	          res.data.bizOrder.canSendSMS = true;
	        }
	
	        // if (res.data.bizOrder.ticketInfo != null) {
	        res.data.bizOrder.frontTicket = res.data.bizOrder.ticketInfo==null||res.data.bizOrder.ticketInfo.frontInfo==null ? null : res.data.bizOrder.ticketInfo.frontInfo.codeInfoList;
	
	        //   res.data.bizOrder.haveFrontTicket = true;
	        // } else {
	        //   res.data.bizOrder.haveFrontTicket = false;
	        // }
	
	        // if (res.data.bizOrder.ticketInfo != null) {
	        res.data.bizOrder.machineTicket = res.data.bizOrder.ticketInfo==null||res.data.bizOrder.ticketInfo.machineInfo==null ? null : res.data.bizOrder.ticketInfo.machineInfo.codeInfoList;
	
	        //   res.data.bizOrder.haveMachineTicket = true;
	        // } else {
	        //   res.data.bizOrder.haveMachineTicket = false;
	        // }
	        _(res.data.bizOrder.shipInfo).forEach(function (element) {
	          // _(_shipInfoStatus).forEach(function (shipStatus) {
	          //   if (shipStatus.id == element.status) {
	          //     element.status = shipStatus.name;
	          //   }
	          // });
	          element.status = _shipInfoStatus[element.status];
	        });
	
	        res.data.payOrder.transDetailList = res.data.transDetailList;
	        setPayOrder(res.data.payOrder);
	        setBizOrder(res.data.bizOrder);
	      } else {
	        alert('接口错误：' + res.meta.msg);
	        window.location.href = 'order-cs.html';
	      }
	    });
	  } else {
	    window.location.href = 'order-cs.html';
	  }
	});
	
	function setPayOrder(pay) {
	  var template = $('#pay-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, pay);
	  $('#payOrder').append(html);
	}
	
	function setBizOrder(biz) {
	  var template = $('#biz-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, biz);
	  $('#bizOrder').append(html);
	  $('[data-toggle="tooltip"]').tooltip();
	}
	
	$(document).on('click', '#btn-sendsms', function (event) {
	  event.preventDefault();
	  if (!window.confirm('确定要发送短信吗？')) {
	    return false;
	  }
	
	  var transOrderNo = $('#transOrderNo').val();
	  var productOrderNo = $('#productOrderNo').val();
	  if (transOrderNo == '' || productOrderNo == '') {
	    alert('非法操作，无法获取订单号！');
	    return false;
	  }
	
	  $.ajax({
	    url: common.API_HOST + 'order/kf/sendMessage',
	    type: 'POST',
	    dataType: 'json',
	    data: {
	      transOrderNo: transOrderNo,
	      productOrderNo: productOrderNo,
	    },
	  })
	  .done(function (res) {
	    // console.log(res);
	    if (!!~~res.meta.result) {
	      alert('短信发送成功！');
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	});
	
	$(document).on('click', '#btn-returnCoupon', function (event) {
	  event.preventDefault();
	  if (_submitting) {
	    return false;
	  }
	
	  if (!window.confirm('确定退优惠券吗？')) {
	    return false;
	  }
	
	  _submitting = true;
	
	  $.ajax({
	    url: common.API_HOST + 'order/kf/refundCoupon',
	    type: 'POST',
	    dataType: 'json',
	    data: {
	      productOrderNo: $('#productOrderNo').val(),
	      couponNo: $('#couponNo').val(),
	    },
	  })
	  .done(function (res) {
	    _submitting = false;
	    if (!!~~res.meta.result) {
	      alert('退优惠券成功！');
	      $('#popup-order-return-ticket').modal('hide');
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	});
	
	$(document).on('click', '#btn-returnTicket', function (event) {
	  event.preventDefault();
	  $('#popup-undertaker').modal('show');
	  $('#popup-undertaker form').parsley();
	});
	
	$(document).on('submit', '#popup-undertaker form', function (event) {
	  event.preventDefault();
	  if (_submitting) {
	    return false;
	  }
	
	  if (!window.confirm('确定退票吗？')) {
	    return false;
	  }
	
	  _submitting = true;
	  $('#popup-undertaker button[type=submit]').prop('disabled', true).text('处理中...');
	
	  var sendData = {
	    transOrderNo: $('#transOrderNo').val(),
	    productOrderNo: $('#productOrderNo').val(),
	    // chargeUndertaker: $('input[name=chargeUndertaker]:checked').val(),
	    refundReason: $.trim( $('#popup-undertaker textarea').val() ),
	  };
	  if (sendData.transOrderNo == '' || sendData.productOrderNo == '') {
	    alert('非法操作，无法获取订单号！');
	    $('#popup-undertaker').modal('hide');
	    return false;
	  }
	
	  $.ajax({
	    url: common.API_HOST + '/order/kf/refundTicket',
	    type: 'POST',
	    dataType: 'json',
	    data: sendData,
	  })
	  .done(function (res) {
	    _submitting = false;
	    $('#popup-undertaker button[type=submit]').prop('disabled', false).text('提交');
	    if (!!~~res.meta.result) {
	      alert('退票成功！');
	      $('#popup-undertaker').modal('hide');
	      document.location.reload(true);
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	
	  return false;
	});
	
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
	
	function getSource() {
	  $.ajax({
	    url: common.API_HOST + 'common/sourceList',
	    type: 'GET',
	    dataType: 'json',
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
	      _sources = res.data;
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	}


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
//# sourceMappingURL=order-cs-detail.js.map