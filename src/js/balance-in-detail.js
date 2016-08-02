/*
	收单对账明细
  Ge Liu
 */

'use strict;'
var common = require('common');
var settlementCommon = require('settlementCommon');

var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

// 如果当前查询是从汇总页的选中记录查询
var _queryingFromSelectedSummary = false;

var _selectedSummary = {};

// _DEBUG 本地JSON字符串, 不连服务器本地调试用
var _DEBUG = false;

$(function() {

	common.init('balance-in-detail');

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

$('#formSearch').parsley();

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
    partner: $('#search_partner').val(),
    discountType: $('#search_discountType').val(),
    discountName: $('#search_discountName').val(),
    bizType: $('#search_bizType').val(),
    payStatus: $('#search_payStatus').val(),
    reconciliationStatus: $('#search_reconciliationStatus').val(),
    reason: $('#search_reson').val(),
    orderNo: $('#search_orderNo').val(),
    thdSerialNo: $('#search_thdSerialNo').val(),
    paySequenceNo: $('#search_paySequenceNo').val(),
    checkStatus: $('#search_checkStatus').val(),
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
      url: common.API_HOST + 'settlement/acquiring/queryDetailByMultiMsg',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    // var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": "总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "积分", "bizType": "业务类型", "orderNo": "订单号", "countNum": "票数", "reconciliationDate": "对账日期", "thdSerialNo":"收单方订单号", "costCenter": "成本中心", "externalId": "支付流水", "o2oReceivableAmount": "应收金额", "subsidyType": "补贴方式", "chargeMerchant":"1", "subsidyAmountO2o": "补贴金额", "discountName": "活动/优惠方式名称", "bankAmount":"实收金额", "returnFee":"退票手续费", "payAmount": "支付金额", "serviceAmount": "服务费", "ticketAmount":"交易金额", "reconciliationStatus":"1", "createTime": "支付时间(交易)", "discountType": "优惠方式", "id": 1934, "payStatus": "1", "chargeMerchantNo": "商户号", "partner":"退款承债方", "reason":"1" } ] } } }');
    var res = $.parseJSON('{"meta" : {"result" : "1", "msg" : "操作成功"}, "data" : {"summary" : {}, "detail":{"count" : 2, "records":[{"checkStatus" : "2"}, {"checkStatus" : "2"}]}}}');
    handleData(res);
  }

  return false;
});

function queryFromSelectedSummary() {

  _selectedSummary.pageIndex = _pageIndex;
  var url = common.API_HOST + 'settlement/acquiring/listSummaryDetail?' + settlementCommon.serializeParam(_selectedSummary);

  if (!_DEBUG) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": "总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "积分", "bizType": "业务类型", "orderNo": "订单号", "countNum": "票数", "reconciliationDate": "对账日期", "thdSerialNo":"收单方订单号", "costCenter": "成本中心", "externalId": "支付流水", "o2oReceivableAmount": "应收金额", "subsidyType": "补贴方式", "chargeMerchant":"1", "subsidyAmountO2o": "补贴金额", "discountName": "活动/优惠方式名称", "bankAmount":"实收金额", "returnFee":"退票手续费", "payAmount": "支付金额", "serviceAmount": "服务费", "ticketAmount":"交易金额", "reconciliationStatus":"1", "createTime": "支付时间(交易)", "discountType": "优惠方式", "id": 1934, "payStatus": "1", "chargeMerchantNo": "商户号", "partner":"退款承债方", "reason":"1" } ] } } }');
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
        $('#search_chargeMerchant').val(parameters.chargeMerchant);
        $('#search_chargeMerchantNo').val(parameters.chargeMerchantNo);
        $('#search_payStatus').val(parameters.payStatus)

        _pageIndex = 1;
        useCache = false;
        $('#formSearch').trigger('submit');
      }
      sessionStorage.removeItem('param');
    }
  }
}

// 有可能本页的查询是从汇总页带着查询条件跳过来的
handlePresetQuery();

function handleData(res) {
	_querying = false;

  if (settlementCommon.prehandleData(res)) {
    var totalRecord = res.data.detail.count;
    var record = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, record.length, _pageTotal);

    _(record).forEach(function(item) {
      item.chargeMerchant = settlementCommon.parseMerchant(item.chargeMerchant);
      item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
      item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
      item.reason = settlementCommon.parseReason(item.reason);
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.discountType = settlementCommon.parseDiscountType(item.discountType);
      item.partner = settlementCommon.parsePartner(item.partner);
      item.checkStatusNo = item.checkStatus;
      item.checkStatus = settlementCommon.parseCheckStatus(item.checkStatus);
    });

    if (!_queryingFromSelectedSummary) {
      useCache = true;
    }

    setTableData(record);

    setSummaryTableData(res.data.summary);
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

 $('#formSearch :input:not(:button)').val('');
});

// 导出全部
$('.btn-export-all').click(function(e) {

  e.preventDefault();

  if (_queryingFromSelectedSummary) {
    var param = {'acquiringInfoFormCollection' : _selectedSummary.acquiringInfoFormCollection};

    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/exportSummaryDetail?' + settlementCommon.serializeParam(param),
      type: 'GET',
      dataType: 'json',
    })
    .done(function(res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
      }
    });
  } else {
    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/acquiringInfoListExport',
      type: 'GET',
      dataType: 'json',
      data: searchCache,
    })
    .done(function (res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
      }
    });
  }
});

// 对账完成提交
$('.complete-commit').click(function(e) {

  e.preventDefault();

  if (_queryingFromSelectedSummary) {
    var param = {'acquiringInfoFormCollection' : _selectedSummary.acquiringInfoFormCollection};
    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/confirmSummaryDetail?' + settlementCommon.serializeParam(param),
      type: 'GET',
      dataType: 'json',
      data: param
    })
    .done(function(res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        alert(res.meta.msg);
      }
    });
  } else {
    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/confirmAcquiringInfoBatch',
      type: 'GET',
      dataType: 'json',
      data: searchCache,
    })
    .done(function (res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        alert(res.meta.msg);
      }
    });
  }
});

$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/acquiring/queryAcquiringInfo',
    type: 'GET',
    data: {id: $(this).closest('tr').data('id')},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert('查询数据失败!');
      return false;
    }
    var data = res.data;
    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);

    var operateRecords = data.operateRecords;

    operateRecords.forEach(function(obj) {
      obj.chargeMerchant = settlementCommon.parseMerchant(obj.chargeMerchant);
      obj.bizType = settlementCommon.parseBizType(obj.bizType);
      obj.payStatus = settlementCommon.parsePayStatus(obj.payStatus);
      obj.partner = settlementCommon.parsePartner(obj.partner);
      obj.discountType = settlementCommon.parseDiscountType(obj.discountType);
      obj.reconciliationStatus = settlementCommon.parseReconciliationStatus(obj.reconciliationStatus);
    });


    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);
    $('#payStatus option[value="' + detail.payStatus + '"]').prop('selected', true);

    var checkStatus = $(this).data('checkstatus');
    if (checkStatus == 2 || detail.reconciliationStatus == 4) { // 待审核不能再修改, 出货对账状态为确认的也不能再修改
      $('.detail-area').addClass('read-only');
      $('.detail-area :input').prop('disabled', true);
    }
  });

  $('.modal form').parsley().validate();
});


$(document).on('click', '.modal button[type=submit]', function(event) {
  event.preventDefault();
  $('#popup-detail form').trigger('submit');
});

// 修改详情 "提交"
$(document).on('submit', '#popup-detail form', function(e) {
  e.preventDefault();
  
  if (!$('.modal form').parsley().isValid()) {
    return false;
  }

  $submitButton = $(this).find('button[type=submit]');

  var param = {
    id: $submitButton.data('id'),
    version: $submitButton.data('version'),
    payAmount: $('#payAmount').val(),
    receivablePoint: $('#receivablePoint').val(),
    thdSerialNo: $('#thdSerialNo').val(),
    ticketAmount: $('#ticketAmount').val(),
    serviceAmount: $('#serviceAmount').val(),
    subsidyAmountO2o: $('#subsidyAmountO2o').val(),
    subsidyType: $('#subsidyType').val(),
    returnFee: $('#returnFee').val(),
    partner: $('#partner').val(),
    o2oReceivableAmount: $('#o2oReceivableAmount').val(),
    reconciliationStatus: $('#reconciliationStatus').val(),
    payStatus: $('#payStatus').val(),
    reason: $('#reason').val()
  };

  $.ajax({
    url: common.API_HOST + 'settlement/acquiring/updateDetail',
    type: 'POST',
    data: param
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('提交成功!');
      $('#popup-detail').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});
