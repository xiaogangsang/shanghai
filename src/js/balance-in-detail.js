/*
	收单对账汇总
 */

'use strict;'
var common = require('common');

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
var _submitting = false;

// 如果当前查询是从汇总页的选中记录查询
var _queryingFromSelectedSummary = false;

var _selectedSummary = {};

var _DEBUG = true;

$(function() {

	common.liquidationInit('balance-in-detail');

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

// handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();

  _pageIndex = 1;
  useCache = false;
  _queryingFromSelectedSummary = false;
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
    partner: $('#search_partner').val(),
    dicountType: $('#search_dicountType').val(),
    dicountName: $('#search_dicountName').val(),
    bizType: $('#search_bizType').val(),
    payStatus: $('#search_payStatus').val(),
    reconciliationStatus: $('#search_reconciliationStatus').val(),
    reason: $('#search_reson').val(),
    orderNo: $('#search_orderNo').val(),
    thdSerialNo: $('#search_thdSerialNo').val(),
    paySequenceNo: $('#search_paySequenceNo').val(),
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
      url: 'movie-ops/settlement/acquiringInfo/listSummary',// TODO: URL
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": "总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "积分", "bizType": "业务类型", "orderNo": "订单号", "countNum": "票数", "reconciliationDate": "对账日期", "thdSerialNo":"收单方订单号", "costCenter": "成本中心", "externalId": "支付流水", "o2oReceivableAmount": "应收金额", "subsidyType": "补贴方式", "chargeMerchant":"1", "subsidyAmountO2o": "补贴金额", "discountName": "活动/优惠方式名称", "bankAmount":"实收金额", "returnFee":"退票手续费", "payAmount": "支付金额", "serviceAmount": "服务费", "ticketAmount":"交易金额", "reconciliationStatus":"对账状态", "createTime": "支付时间(交易)", "discountType": "优惠方式", "id": 1934, "payStatus": "1", "merchantNo": "商户号", "partner":"退款承债方", "reason":"原因" } ] } } }');
    handleData(res);
  }

  return false;
});

function queryFromSelectedSummary() {

  _selectedSummary.pageIndex = _pageIndex;

  if (!_DEBUG) {
    $.ajax({
      url: 'movie-ops/settlement/acquiring/queryMultiDetail',
      type: 'GET',
      dataType: 'json',
      data: _selectedSummary,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": "总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "积分", "bizType": "业务类型", "orderNo": "订单号", "countNum": "票数", "reconciliationDate": "对账日期", "thdSerialNo":"收单方订单号", "costCenter": "成本中心", "externalId": "支付流水", "o2oReceivableAmount": "应收金额", "subsidyType": "补贴方式", "chargeMerchant":"1", "subsidyAmountO2o": "补贴金额", "discountName": "活动/优惠方式名称", "bankAmount":"实收金额", "returnFee":"退票手续费", "payAmount": "支付金额", "serviceAmount": "服务费", "ticketAmount":"交易金额", "reconciliationStatus":"对账状态", "createTime": "支付时间(交易)", "discountType": "优惠方式", "id": 1934, "payStatus": "1", "merchantNo": "商户号", "partner":"退款承债方", "reason":"原因" } ] } } }');
    handleData(res);
  }
}

function handlePresetQuery() {

  var sessionParam = sessionStorage.param;
  if (sessionParam) {
    var passedParam = JSON.parse(sessionParam);

    if (passedParam) {
      // 从汇总页  查看选中明细
      if (passedParam.type == 1) {
        var parameters = passedParam.param;

        _pageIndex = 1;
        _selectedSummary = {'acquiringInfoFormCollection': parameters, 'pageSize': _pageSize};

        _queryingFromSelectedSummary = true;
        queryFromSelectedSummary();

      } else if (passedParam.type == 0) { // 从汇总页  查看所有明细
        var parameters = passedParam.param;

        $('#search_dateType').val(parameters.dateType);
        $('#search_startTime').val(parameters.beginTime);
        $('#search_endTime').val(parameters.endTime);
        $('#search_merchantName').val(parameters.merchantName);
        $('#search_merchantNo').val(parameters.merchantNo);
        $('#search_payStatus').val(parameters.payStatus)

        _pageIndex = 1;
        useCache = false;
        $('#formSearch').trigger('submit');
      }
      sessionStorage.removeItem('param');
    }
  }
}

handlePresetQuery();

function handleData(res) {
	_querying = false;

	if (~res.meta.result) {
		if (res.data.detail.recordCount < 1) {
			$('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
			$('#summaryTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
      $('#pager').html('');
		} else {
			var totalRecord = res.data.detail.recordCount;
      var record = res.data.detail.recordDetail;

      _pageTotal = Math.ceil(totalRecord / _pageSize);
      setPager(totalRecord, _pageIndex, record.length, _pageTotal);

      _(record).forEach(function(item) {
      	item.chargeMerchant = parseMerchant(item.chargeMerchant);
      	item.payStatus = parsePayStatus(item.payStatus);
      });

      if (!_queryingFromSelectedSummary) {
        useCache = true;
      }

      setTableData(record);

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

  if (_queryingFromSelectedSummary) {
    queryFromSelectedSummary();
  } else {
    $('#formSearch').trigger('submit');
  }
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

  if (_queryingFromSelectedSummary) {
    queryFromSelectedSummary();
  } else {
    $('#formSearch').trigger('submit');
  }

  return false;
});

$('.btn-reset').click(function(e) {
	// $('#search_dateType').val('');
 //  $('#search_startTime').val('');
 //  $('#search_endTime').val('');
 //  $('#search_merchantName').val('');
 //  $('#search_merchantNo').val('');
 //  $('#search_payStatus').val('');

 $('#formSearch :input:not(:button)').val('');
});

$('.complete-commit').click(function(e) {
  // TODO: 对账完成提交
  $.ajax({
      url: 'movie-ops/settlement/acquiringInfo/listSummary',// TODO: URL
      type: 'GET',
      dataType: 'json',
      data: searchCache,
    })
    .done(function (res) {
    });
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



