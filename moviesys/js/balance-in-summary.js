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

	/*
	  收单对账汇总
	 */
	
	'use strict;'
	var common = __webpack_require__(1);
	
	var _channels = {};
	var _cities = [];
	var _choosed = [];
	var _movies = {};
	var _pageIndex = 1;
	var _pageSize = 10;
	var _pageTotal = 0;
	var _querying = false;
	var searchCache = {};
	var useCache = false;
	var dataCache;
	var _submitting = false;
	
	var _DEBUG = false;
	
	$(function() {
	
	  common.init('balance-in-summary');
	
	  $('#search_startTime').datetimepicker({
	    format: 'yyyy-mm-dd',
	    language: 'zh-CN',
	    minView: 2,
	    todayHighlight: true,
	    autoclose: true,
	  }).on('changeDate', function (ev) {
	    var startDate = new Date(ev.date.valueOf());
	    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
	    $('#search_endTime').datetimepicker('setStartDate', startDate);
	  });
	
	  $('#search_endTime').datetimepicker({
	    format: 'yyyy-mm-dd',
	    language: 'zh-CN',
	    minView: 2,
	    todayHighlight: true,
	    autoclose: true,
	  }).on('changeDate', function (ev) {
	    var FromEndDate = new Date(ev.date.valueOf());
	    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
	    $('#search_startTime').datetimepicker('setEndDate', FromEndDate);
	  });
	
	  $('#formSearch').parsley();
	});
	
	//handle search form
	$('#formSearch').on('click', 'button[type=submit]', function (event) {
	
	    _pageIndex = 1;
	    useCache = false;
	    $('#formSearch').trigger('submit');
	
	  event.preventDefault();
	});
	
	$('#formSearch').on('submit', function (e) {
	  e.preventDefault();
	
	  // a new search triggered by clicking '查询'
	  if (!useCache) {
	    if (!$('#formSearch').parsley().isValid()) {
	      return false;
	    }
	  }
	
	  var sendData = {
	    dateType: $('#search_dateType').val(),
	    beginTime: $('#search_startTime').val(),
	    endTime: $('#search_endTime').val(),
	    chargeMerchant: $('#search_chargeMerchant').val(),
	    chargeMerchantNo: $('#search_chargeMerchantNo').val(),
	    payStatus: $('#search_payStatus').val(),
	    pageSize: _pageSize,
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
	
	  sendData.pageIndex = _pageIndex;
	
	  if (!_DEBUG) {
	    $.ajax({
	      url: common.API_HOST + 'settlement/acquiring/listSummary',
	      type: 'GET',
	      dataType: 'json',
	      data: sendData,
	    })
	    .done(function (res) {
	      handleData(res);
	    });
	  } else {
	    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": " 总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "21", "recordDetail": [ { "createTime": "支付日期", "chargeMerchant": "1", "chargeMerchantNo": "收单商户号", "payStatus": "1", "ticketAmount": "票价", "returnFee": "退票手续费", "serviceAmount": "服务费", "subsidyAmountO2o": "我方补贴金额", "receivableAmount": "应收金额", "bankAmount": "实收金额" } ] } } }');
	    handleData(res);
	  }
	
	  return false;
	});
	
	function handleData(res) {
	  _querying = false;
	
	  if (~res.meta.result) {
	    if (res.data == null || res.data.detail.count < 1) {
	      var errorMsg = res.meta.msg;
	      $('#dataTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
	      $('#summaryTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
	      $('#pager').html('');
	    } else {
	      useCache = true;
	
	      var totalRecord = res.data.detail.count;
	      var record = res.data.detail.records;
	
	      _pageTotal = Math.ceil(totalRecord / _pageSize);
	      setPager(totalRecord, _pageIndex, record.length, _pageTotal);
	
	      _(record).forEach(function(item) {
	        item.chargeMerchant = parseMerchant(item.chargeMerchant);
	        item.payStatusNo = item.payStatus;
	        item.payStatus = parsePayStatus(item.payStatus);
	      });
	
	      dataCache = record;
	
	      setTableData(dataCache);
	
	      setSummaryTableData(res.data.summary);
	    }
	  }
	}
	
	function setTableData(rows) {
	  var data = { rows: rows };
	  var template = $('#table-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, data);
	  $('#dataTable tbody').html(html);
	}
	
	function setSummaryTableData(data) {
	  var template = $('#summary-table-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, data);
	  $('#summaryTable tbody').html(html);
	}
	
	
	function setPager(total, pageIndex, rowsSize, pageTotal) {
	  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
	  var template = $('#pager-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, data);
	  $('#pager').html(html);
	}
	
	$('#pager').on('click', '.prev,.next', function (e) {
	  e.preventDefault();
	  if ($(this).hasClass('prev')) {
	    if (_pageIndex <= 1) {
	      _pageIndex = 1;
	      alert('已经是第一页！');
	      return false;
	    }
	
	    _pageIndex--;
	  } else {
	    if (_pageIndex >= _pageTotal) {
	      _pageIndex = _pageTotal;
	      alert('已经是最后一页！');
	      return false;
	    }
	
	    _pageIndex++;
	  }
	
	  $('#formSearch').trigger('submit');
	  return false;
	});
	
	$('#pager').on('click', '#btn-pager', function (e) {
	  e.preventDefault();
	  if ('' == $('#pageNo').val()) {
	    return false;
	  }
	
	  var pageNo = parseInt($('#pageNo').val());
	  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
	    alert('要跳转的页码超过了范围！');
	    return false;
	  }
	
	  _pageIndex = pageNo;
	  $('#formSearch').trigger('submit');
	  return false;
	});
	
	$('.btn-reset').click(function(e) {
	  // $('#search_dateType').val('');
	 //  $('#search_startTime').val('');
	 //  $('#search_endTime').val('');
	 //  $('#search_merchantName').val('');
	 //  $('#search_chargeMerchantNo').val('');
	 //  $('#search_payStatus').val('');
	 $('#formSearch :input:not(:button)').val('');
	});
	
	$('.all-detail').click(function(e) {
	  var data = {'type': 0, 'param': searchCache};
	  sessionStorage.setItem('param', JSON.stringify(data));
	  window.location.href = 'balance-in-detail.html';
	});
	
	$('.selected-detail').click(function(e) {
	  var parameters = [];
	
	  $('#dataTable tbody :checkbox:checked').each(function(index) {
	    var rowIndex = $(this).closest('td').parent()[0].sectionRowIndex;
	    var obj = dataCache[rowIndex];
	    var param = {'dateType': searchCache.dateType, 'beginTime': obj.createTime, 'chargeMerchantNo': obj.chargeMerchantNo, 'payStatus':obj.payStatusNo};
	    parameters.push(param);
	  });
	
	  var data = {'type': 1, 'param': parameters};
	  sessionStorage.setItem('param', JSON.stringify(data));
	  window.location.href = 'balance-in-detail.html';
	});
	
	$('.multi-check-all').change(function(e) {
	  e.preventDefault();
	  var isChecked = $(this).is(':checked');
	
	  if (isChecked) {
	    $('#dataTable tbody :checkbox:not(:checked)').prop('checked', true);
	  } else {
	    $('#dataTable tbody :checkbox:checked').prop('checked', false);
	  }
	});
	
	
	$('body').on('change', 'tr > td :checkbox', function(e) {
	  e.preventDefault();
	
	  var isChecked = $(this).is(':checked');
	
	  if (!isChecked) {
	    $('.multi-check-all').prop('checked', false);
	  }
	});
	
	
	/****************************************** Utilities Method **********************************************/
	
	function parseMerchant(merchant) {
	
	  var map = {'1' : '卡中心', '2' : '总行'};
	
	  return map[merchant];
	}
	
	function parsePayStatus(payStatus) {
	  var map = {'1' : '待支付', '2' : '支付成功', '3' : '支付失败', '4' : '退款中', '5' : '退款成功', '6' : '退款失败'};
	
	  return map[payStatus];
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
//# sourceMappingURL=balance-in-summary.js.map