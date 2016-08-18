/*
	出货对账明细
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
var _submitting = false;

// 如果当前查询是从汇总页的选中记录查询
var _queryingFromSelectedSummary = false;

var _selectedSummary = {};

// _DEBUG 本地JSON字符串, 不连服务器本地调试用
var _DEBUG = false;

$(function() {

	common.init('balance-out-detail');
  
  $('#formSearch').parsley();
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

  if (!useCache) {
    if (!$('#formSearch').parsley().isValid()) {
      return false;
    }
  }

  var sendData = {
  	dateType: $('#search_dateType').val(),
    startTime: $('#search_startTime').val(),
    endTime: $('#search_endTime').val(),
    merchantName: $('#search_merchantName').val(),
    merchantNo: $('#search_merchantNo').val(),
    shipmentStatus: $('#search_shipmentStatus').val(),
    bizType: $('#search_bizType').val(),
    partner: $('#search_partner').val(),
    acquiringReconciliationStatus: $('#search_acquiringReconciliationStatus').val(),
    reconciliationStatus: $('#search_reconciliationStatus').val(),
    reason: $('#search_reason').val(),
    discountType: $('#search_discountType').val(),
    discountName: $('#search_discountName').val(),
    bizOrderNo: $('#search_bizOrderNo').val(),
    thdOrderNo: $('#search_thdOrderNo').val(),
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
      url: common.API_HOST + 'settlement/shipmentInfo/infoList',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    // var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": "总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "积分", "bizType": "业务类型", "orderNo": "订单号", "countNum": "票数", "reconciliationDate": "对账日期", "thdSerialNo":"收单方订单号", "costCenter": "成本中心", "externalId": "支付流水", "o2oReceivableAmount": "应收金额", "subsidyType": "补贴方式", "chargeMerchant":"1", "subsidyAmountO2o": "补贴金额", "discountName": "活动/优惠方式名称", "bankAmount":"实收金额", "returnFee":"退票手续费", "payAmount": "支付金额", "serviceAmount": "服务费", "ticketAmount":"交易金额", "reconciliationStatus":"1", "createTime": "支付时间(交易)", "discountType": "优惠方式", "id": 1934, "payStatus": "1", "chargeMerchantNo": "商户号", "partner":"退款承债方", "reason":"1" } ] } } }');
    var res = $.parseJSON('{"meta" : {"result" : "1", "msg" : "操作成功"}, "data" : {"summary" : {}, "detail":{"count" : 2, "records":[{"checkStatus" : "1"}, {"checkStatus" : "2"}]}}}');
    handleData(res);
  }

  return false;
});

function queryFromSelectedSummary() {

  _selectedSummary.pageIndex = _pageIndex;
  var url = common.API_HOST + 'settlement/shipmentInfo/listSummaryDetail?' + settlementCommon.serializeParam(_selectedSummary);

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
        _selectedSummary = {'shipmentInfoFormCollection': parameters, 'pageSize': _pageSize};

        _queryingFromSelectedSummary = true;
        queryFromSelectedSummary();

      } else if (passedParam.type == 0) { // 从汇总页  查看所有明细
        var parameters = passedParam.param;

        $('#search_dateType').val(parameters.dateType);
        $('#search_startTime').val(parameters.startTime);
        $('#search_endTime').val(parameters.endTime);
        $('#search_merchantName').val(parameters.merchantName);
        $('#search_merchantNo').val(parameters.MerchantNo);
        $('#search_shipmentStatus').val(parameters.shipmentStatus);
        $('#search_bizType').val(parameters.bizType);

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

  if (settlementCommon.prehandleData(res)) {
    var totalRecord = res.data.detail.count;
    var record = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, record.length, _pageTotal);

    _(record).forEach(function(item) {
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
      item.partner = settlementCommon.parsePartner(item.partner);
      item.acquiringReconciliationStatus = settlementCommon.parseReconciliationStatus(item.acquiringReconciliationStatus);
      item.subsidyType = settlementCommon.parseSubsidyType(item.subsidyType);
      item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
      item.reason = settlementCommon.parseOutReason(item.reason);
      item.discountType = settlementCommon.parseDiscountType(item.discountType);
      item.shipmentStatus = settlementCommon.parseShipmentStatus(item.shipmentStatus);
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

$('.btn-export-all').click(function(e) {

  e.preventDefault();

  if (_queryingFromSelectedSummary) {
    var param = {'shipmentInfoFormCollection' : _selectedSummary.shipmentInfoFormCollection};

    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/exportSummaryDetail?' + settlementCommon.serializeParam(param),
      type: 'GET',
      dataType: 'json',
    })
    .done(function(res) {
      if (!!~~res.meta.result) {
        // window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
        alert('您的申请已提交，系统正在为您导出数据，需要约15分钟，\n请至下载列表查看并下载导出结果。\n导出的数据仅保留3天，请及时查看并下载。');
      } else {
        alert(res.meta.msg);
      }
    });
  } else {
    // 参数不能带有页码信息...
    var searchCacheWithoutPagination = $.extend({}, searchCache);
    delete searchCacheWithoutPagination.pageIndex;
    delete searchCacheWithoutPagination.pageSize;

    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/infoListExport', 
      type: 'GET',
      dataType: 'json',
      data: searchCacheWithoutPagination,
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        // window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
        alert('您的申请已提交，系统正在为您导出数据，需要约15分钟，\n请至下载列表查看并下载导出结果。\n导出的数据仅保留3天，请及时查看并下载。');
      } else {
        alert(res.meta.msg);
      }
    });
  }
});

$('.complete-commit').click(function(e) {

  e.preventDefault();

  if (_queryingFromSelectedSummary) {
    var param = {'shipmentInfoFormCollection' : _selectedSummary.shipmentInfoFormCollection};
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/listSummaryDetailUpdate',
      type: 'POST',
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
      url: common.API_HOST + 'settlement/shipmentInfo/updateInfoList',
      type: 'POST',
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

  var id = $(this).closest('tr').data('id');
  var checkStatus = $(this).data('checkstatus');

  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/onlyShipmentInfo',
    type: 'GET',
    data: {id: id},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert('查询数据失败!');
      return false;
    }
    var data = res.data;
    data.detail = data.onlyShipmentInfo;
    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.payStatus = settlementCommon.parsePayStatus(detail.payStatus);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.acquiringReconciliationStatus = settlementCommon.parseReconciliationStatus(detail.acquiringReconciliationStatus);
    detail.subsidyType = settlementCommon.parseSubsidyType(detail.subsidyType);
    detail.partner = settlementCommon.parsePartner(detail.partner);

    var operate = data.operate;

    operate.forEach(function(obj) {
      // obj.subsidyType = settlementCommon.parseSubsidyType(obj.subsidyType);
      // obj.partner = settlementCommon.parsePartner(obj.partner);
      obj.reconciliationStatus = settlementCommon.parseReconciliationStatus(obj.reconciliationStatus);
      obj.shipmentStatus = settlementCommon.parseShipmentStatus(obj.shipmentStatus);
      obj.reason = settlementCommon.parseOutReason(obj.reason);
    });

    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    // $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    // $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#shipmentStatus option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);

    if (checkStatus == 2 || detail.reconciliationStatus == 4) { // 待审核不能再修改, 出货对账状态为确认的也不能再修改
      $('.detail-area').addClass('read-only');
      $('.detail-area :input').prop('readonly', true);
    } else {
      $('#reconciliationStatus option[value=4]').remove();      // 不能在明细的修改里将对账状态设为"确认"
    }
    
    $('#popup-detail form').parsley().validate();
  });
});

$(document).on('click', '.modal button[type=submit]', function(event) {
  event.preventDefault();
  $('#popup-detail form').trigger('submit');
});

// 修改提交
$(document).on('submit', '#popup-detail form', function(e) {
  e.preventDefault();

  if ($('#reconciliationStatus').val() == 1) {
    alert('出货对账状态不能为 ＂未对账＂！');
    return false;
  }

  if (!$('.modal form').parsley().isValid()) {
    return false;
  }

  $submitButton = $(this).find('button[type=submit]');

  var param = {
    id: $submitButton.data('id'),
    oldVersion: $submitButton.data('version'),
    merchantName: $('#merchantName').val(),
    merchantId: $('#merchantNo').val(),
    settleAmount: $('#settleAmount').val(),
    // subsidyAmountO2o: $('#subsidyAmountO2o').val(),
    // subsidyType: $('#subsidyType').val(),
    acceptanceAppropriation: $('#acceptanceAppropriation').val(),
    // returnFee: $('#returnFee').val(),
    // partner: $('#returnFee').val(),
    finalSettleAmount: $('#finalSettleAmount').val(),
    reconciliationStatus: $('#reconciliationStatus').val(),
    shipmentStatus: $('#shipmentStatus').val(),
    reason: $('#reason').val()
  };
  
  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/updateOnlyShipmentInfo',
    data: param,
  }).done(function(res) {
    if (!!~~res.meta.result) {
      alert('提交成功');
      $('#popup-detail').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});
