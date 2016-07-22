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
		 拨款汇总
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
	
	var detailUseCache = false;
	var detailDataCache;
	var detailPageIndex = 1;
	var detailPageTotal = 0;
	
	var _DEBUG = false;
	
	$(function() {
	
		common.init('money-out-summary');
	
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
	});
	
	//handle search form
	$('#formSearch').on('click', 'button[type=submit]', function (event) {
	  event.preventDefault();
	  _pageIndex = 1;
	  useCache = false;
	  $('#formSearch').trigger('submit');
	});
	
	$('#formSearch').on('submit', function (e) {
	  e.preventDefault();
	  var sendData = {
	  	dateType: $('#search_dateType').val(),
	    beginTime: $('#search_startTime').val(),
	    endTime: $('#search_endTime').val(),
	    merchantName: $('#search_merchantName').val(),
	    merchantNo: $('#search_merchantNo').val(),
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
	      url: common.API_HOST + 'settlement/merchantSummary/getMerchantSummaryList',
	      type: 'GET',
	      dataType: 'json',
	      data: sendData,
	    })
	    .done(function (res) {
	      handleData(res);
	    });
	  } else {
	    var res = $.parseJSON('{"meta" : {"result" : "1","msg" : "操作成功"},"data" : {"total" : 42,"record" : [ {"appAmount" : 95,"merNo" : "308010700103175","merchantSummaryId" : 127,"accNo" : "78978","accName" : "光大银行某某账户","merName" : "测试商户","batchNum" : "20160704164343","appDate" : "2016-07-04","appStatus" : 7}, {"appAmount" : 190,"merNo" : "308010700103175","merchantSummaryId" : 128,"accNo" : "78978","accName" : "光大银行某某账户","merName" : "测试商户","batchNum" : "20160704164407","appDate" : "2016-07-04","appStatus" : 7} ]}}');
	    handleData(res);
	  }
	
	  return false;
	});
	
	function handleData(res) {
		_querying = false;
	
		if (~res.meta.result) {
			if (res.data == null || res.data.total < 1) {
	      var errorMsg = res.meta.msg;
	      $('#dataTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
	      $('#summaryTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
	      $('#pager').html('');
			} else {
				useCache = true;
	
				var totalRecord = res.data.total;
	      var record = res.data.record;
	
	      _pageTotal = Math.ceil(totalRecord / _pageSize);
	      setPager(totalRecord, _pageIndex, record.length, _pageTotal);
	
	      _(record).forEach(function(item) {
	      	item.chargeMerchant = parseMerchant(item.chargeMerchant);
	        item.payStatusNo = item.payStatus;
	      	item.payStatus = parsePayStatus(item.payStatus);
	
	        var moneyOutStatus = item.appStatus;
	        item.resend = (moneyOutStatus == 3 || moneyOutStatus == 4 || moneyOutStatus == 6);
	        item.refused = (moneyOutStatus == 2 || moneyOutStatus == 7);
	        item.appStatus = parseMoneyOutStatus(item.appStatus);
	      });
	
	      // record[1] = record[0];
	      dataCache = record;
	
	      setTableData(dataCache);
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
	  $('#formSearch :input:not(:button)').val('');
	});
	
	$('.btn-detail-reset').click(function(e) {
	  $('#detailFormSearch :input:not(:button)').val('');
	});
	
	$('.btn-batch-resend').click(function(e) {
	  e.preventDefault();
	  batchOperate(2);
	});
	
	$('.btn-batch-refused').click(function(e) {
	  e.preventDefault();
	  batchOperate(1);
	});
	
	function batchOperate(operateCode) {
	  var parameters = [];
	
	  $('#dataTable tbody :checkbox:checked').each(function(index) {
	    parameters.push($(this).data('id'));
	  });
	
	  if (parameters.length == 0) {
	    alert('请至少选择一条记录');
	  } else {
	    operate(operateCode, parameters);
	    $('.multi-check-all').prop('checked', false).change();
	  }
	}
	
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
	
	
	$('#dataTable').on('click', '.see-detail', function(e) {
	  e.preventDefault();
	
	  detailDataCache = {
	    merchantSummaryId: $(this).data('id')
	  };
	
	  var template = $('#detail-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, {});
	  $('#popup-detail .modal-body').html(html);
	
	  $('#popup-detail').modal('show');
	
	  $('#detailFormSearch button[type=submit]').click();
	});
	
	$('#dataTable').on('click', '.resend', function(e) {
	  e.preventDefault();
	
	  var idList = [$(this).data('id')];
	
	  operate(2, idList);
	});
	
	$('#dataTable').on('click', '.refused', function(e) {
	  e.preventDefault();
	
	  var idList = [$(this).data('id')];
	
	  operate(1, idList);
	});
	
	/*
	  operateCode: 1: 银行退票; 2:重拨
	*/
	function operate(operateCode, idList) {
	
	  var data = {merchantSummaryIdList: idList, appStatus: operateCode};
	  $.ajax({
	    url: common.API_HOST + "settlement/merchantSummary/updateMerchantSummaryStatus",
	    type: "POST",
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(data)
	  })
	  .done(function(res) {
	    alert(res.meta.msg);
	    $('#formSearch').trigger('submit');
	  });
	}
	
	
	/****************************************** detail *******************************************/
	$('body').on('click', '#detailFormSearch button[type=submit]', function(e) {
	  e.preventDefault();
	  detailUseCache = false;
	  detailPageIndex = 1;
	  $('#detailFormSearch').trigger('submit');
	});
	
	$('body').on('submit', '#detailFormSearch', function(e) {
	  e.preventDefault();
	
	  var sendData = {
	    merchantSummaryId: detailDataCache.merchantSummaryId,
	    ticketType: $('#search_ticketType').val(),
	    movieOrderNo: $('#search_movieOrderNo').val(),
	    payOrderNo: $('#search_payOrderNo').val(),
	    partnerOrderNo: $('#search_partnerOrderNo').val(),
	    channelType: $('#search_channelType').val(),
	    businessType: $('#search_businessType').val(),
	    pageSize: _pageSize,
	  };
	
	  if (detailUseCache) {
	    sendData = searchCache;
	  } else {
	    searchCache = sendData;
	  }
	
	  sendData.pageIndex = detailPageIndex;
	
	  if (!_DEBUG) {
	    $.ajax({
	      url: common.API_HOST + 'settlement/appropriationInfo/getAppropriationInfoList',
	      type: 'GET',
	      dataType: 'json',
	      data: sendData,
	    })
	    .done(function(res) {
	      handleDetailData(res);
	    });
	  } else {
	    var res = $.parseJSON('{"meta": {"result": "1","msg": "操作成功"},"data":{"detail":{"recordCount":"41","recordDetail":[{"productOrderNo":"商品订单号","partnerOrderNo":"合作方订单号","payOrderNo":"交易订单号","shipmentDate":"出/退货时间（格式yyyy-MM-dd HH:mm:ss）","appDate":"拨款日期（格式yyyy-MM-dd）","ticketType":"票类","channelType":"1","businessType":"1","orderNo":"影票交易订单号","shipmentStatus":"1","payStatus":"1","refundPartner":"1","discountType":"1","discountName":"优惠名称","refundFree":"退货手续费（单位：元）","appAmount":"拨款金额（单位：元）"},{"productOrderNo":"商品订单号","partnerOrderNo":"合作方订单号","payOrderNo":"交易订单号","shipmentDate":"出/退货时间（格式yyyy-MM-dd HH:mm:ss）","appDate":"拨款日期（格式yyyy-MM-dd）","ticketType":"票类","channelType":"渠道(1掌上生活，2手机银行)","businessType":"业务类别（1：影票，2退票手续费）","orderNo":"影票交易订单号","shipmentStatus":"出货状态（1未出货，2出货失败，3出货成功，4退货失败，5退货成功）","payStatus":"支付状态（1未支付，2支付成功，3支付失败，4未退款，5退款成功，6退款失败）","refundPartner":"退款承担方（1o2o，2tp方，3渠道方）","discountType":"优惠方式（1活动，2优惠券）","discountName":"优惠名称","refundFree":"退货手续费（单位：元）","appAmount":"拨款金额（单位：元）"}]}}}');
	    handleDetailData(res);
	  }
	});
	
	
	function handleDetailData(res) {
	  if (~res.meta.result) {
	    if (res.data == null || res.data.total < 1) {
	      var errorMsg = res.meta.msg;
	      $('#detailDataTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
	      $('#detailPager').html('');
	    } else {
	      detailUseCache = true;
	      var totalRecord = res.data.total;
	      var record = res.data.record;
	
	      detailPageTotal = Math.ceil(totalRecord / _pageSize);
	      setDetailPager(totalRecord, detailPageIndex, record.length, detailPageTotal);
	
	      _(record).forEach(function(item) {
	        item.channelType = parseChannelType(item.channelType);
	        item.businessType = parseBusinessType(item.businessType);
	        item.shipmentStatus = parseShipmentStatus(item.shipmentStatus);
	        item.payStatus = parsePayStatus(item.payStatus);
	        item.refundPartner = parseRefundPartner(item.refundPartner);
	        item.discountType = parseDiscountType(item.discountType);
	      });
	
	      detailDataCache = record;
	      setDetailTableData(detailDataCache);
	    }
	  }
	}
	
	function setDetailTableData(rows) {
	  var data = {rows: rows};
	  var template = $('#detail-table-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, data);
	  $('#detailDataTable tbody').html(html);
	}
	
	$('body').on('click', '.btn-detail-reset', function(e) {
	  e.preventDefault();
	
	  $('#detailFormSearch :input:not(:button)').val('');
	});
	
	
	function setDetailPager(total, pageIndex, rowsSize, pageTotal) {
	  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
	  var template = $('#detail-pager-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, data);
	  $('#detailPager').html(html);
	}
	
	$('body').on('click', '#detailPager .prev,.next', function (e) {
	  e.preventDefault();
	  if ($(this).hasClass('prev')) {
	    if (detailPageIndex <= 1) {
	      detailPageIndex = 1;
	      alert('已经是第一页！');
	      return false;
	    }
	
	    detailPageIndex--;
	  } else {
	    if (detailPageIndex >= detailPageTotal) {
	      detailPageIndex = detailPageTotal;
	      alert('已经是最后一页！');
	      return false;
	    }
	
	    detailPageIndex++;
	  }
	
	  $('#detailFormSearch').trigger('submit');
	  return false;
	});
	
	$('body').on('click', '#detailPager #detail-btn-pager', function (e) {
	  e.preventDefault();
	  if ('' == $('#detailPageNo').val()) {
	    return false;
	  }
	
	  var pageNo = parseInt($('#detailPageNo').val());
	  if (NaN == pageNo || pageNo < 1 || pageNo > detailPageTotal) {
	    alert('要跳转的页码超过了范围！');
	    return false;
	  }
	
	  detailPageIndex = pageNo;
	  $('#detailFormSearch').trigger('submit');
	  return false;
	});
	
	
	
	/****************************************** Utilities Method **********************************************/
	
	function parseMerchant(merchant) {
	
	  var map = {'1' : '卡中心', '2' : '总行'};
	
	  return map[merchant];
	}
	
	function parsePayStatus(payStatus) {
	  var map = {'1' : '待支付', '2' : '支付成功', '3' : '支付失败', '4' : '退款成功', '5' : '退款失败', '6' : '已关闭'};
	
	  return map[payStatus];
	}
	
	function parseMoneyOutStatus(outStatus) {
	  var map = {'1' : '待拨款', '2' : '首次拨款成功', '3' : '暂停拨款', '4' : '银行退票', '5' : '待重拨', '6' : '生成拨款文件失败', '7' : '重拨成功'};
	  return map[outStatus];
	}
	
	function parseBusinessType(businessType) {
	  var map = {'1' : '影票', '2' : '退票手续费'};
	
	  return map[businessType];
	}
	
	function parseShipmentStatus(status) {
	  var map = {'1' : '未出货(初始化状态)', '2' : '出货成功', '3' : '出货失败', '4' : '出货中', '5' : '待定', '6' : '待定', '7' : '退货成功', '8' : '退货失败'};
	
	  return map[status];
	}
	
	function parseRefundPartner(partner) {
	  var map = {'1' : 'O2O', '2' : 'TP方', '3' : '渠道方'};
	  return map[partner];
	}
	
	function parseDiscountType(type) {
	  var map = {'1' : '活动', '2' : '优惠券'};
	
	  return map[type];
	}
	
	function parseChannelType(type) {
	  var map = {'1' : '掌上生活', '2' : '手机银行'};
	  return map[type];
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
//# sourceMappingURL=money-out-summary.js.map