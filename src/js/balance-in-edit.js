/*
  支付流水修改记录 & 支付流水修改审核
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

// 是查看提交的修改(false)还是审核(true)
var approval = false;

$(function() {

  var parts = window.location.href.split('/');
  var htmlName = parts[parts.length - 1];
  approval = htmlName.indexOf('approval') > -1;

  if (approval) {
    common.init('balance-in-edit-approval');
  } else {
    common.init('balance-in-edit-submitted');
  }
  
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
    periodStart: $('#search_startTime').val(),
    periodEnd: $('#search_endTime').val(),
    chargeMerchant: $('#search_chargeMerchant').val(),
    chargeMerchantNo: $('#search_chargeMerchantNo').val(),
    partner: $('#search_partner').val(),
    discountType: $('#search_discountType').val(),
    discountName: $('#search_discountName').val(),
    bizType: $('#search_bizType').val(),
    payStatus: $('#search_payStatus').val(),
    reconciliationStatus: $('#search_reconciliationStatus').val(),
    reason: $('#search_reason').val(),
    orderNo: $('#search_orderNo').val(),
    thdSerialNo: $('#search_thdSerialNo').val(),
    paySequenceNo: $('#search_paySequenceNo').val(),
    checkStatus: approval ? 2 : $('#search_checkStatus').val(),
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

  if (approval) {
    sendData.checkStatus = 2;
  }

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/list',
    type: 'GET',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    handleData(res);
  });

  return false;
});

function handleData(res) {
	_querying = false;

  if (settlementCommon.prehandleData(res)) {
    var totalRecord = res.data.detail.count;
    var record = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, record.length, _pageTotal);

    _(record).forEach(function(item) {
      item.canEdit = (item.checkStatus != 2 && item.reconciliationStatus != 4); // 待审核状态不能再修改, 对账状态为确认的也不能修改
      item.chargeMerchant = settlementCommon.parseMerchant(item.chargeMerchant);
      item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
      item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
      item.reason = settlementCommon.parseReason(item.reason);
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.discountType = settlementCommon.parseDiscountType(item.discountType);
      item.partner = settlementCommon.parsePartner(item.partner);
      item.checkStatus = settlementCommon.parseCheckStatus(item.checkStatus);
    });

    if (!_queryingFromSelectedSummary) {
      useCache = true;
    }

    setTableData(record);
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

$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/acquiring/queryAcquiringInfo',
    type: 'GET',
    data: {id: $(this).data('id')},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert('查询数据失败!');
      return false;
    }
    var data = res.data;
    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.payStatus = settlementCommon.parsePayStatus(detail.payStatus);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);

    if (data.operateRecords) {
      formatEditHistory(data.operateRecords);
    }
    
    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);
  });

  $('.modal form').parsley().validate();
});

// 查看详情
$('#dataTable').on('click', '.btn-detail', function (e) {

  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/queryAcquiringCheckDiff',
    type: 'GET',
    data: {id: $(this).data('id')},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert('查询数据失败!');
      return false;
    }
    var data = res.data;
    data.detail = data.lastDetail;
    data.detail.currentDetail = data.currentDetail;
    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);

    if (data.operateRecords) {
      formatEditHistory(data.operateRecords);
    }

    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    $('.detail-area').addClass('compare');
    $('.detail-area.compare :input').prop('readonly', true);
    

    $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#shipmentStatus option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);
    $('#payStatus option[value="' + detail.payStatus + '"]').prop('selected', true);

    detail = detail.currentDetail;
    $('#subsidyTypeNew option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#partnerNew option[value="' + detail.partner + '"]').prop('selected', true);
    $('#shipmentStatusNew option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
    $('#reconciliationStatusNew option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reasonNew option[value="' + detail.reason + '"]').prop('selected', true);
    $('#payStatusNew option[value="' + detail.payStatus + '"]').prop('selected', true);
  });
});


// 修改记录列表的状态码转换
function formatEditHistory(operateRecords) {
  operateRecords.forEach(function(obj) {
    obj.chargeMerchant = settlementCommon.parseMerchant(obj.chargeMerchant);
    obj.bizType = settlementCommon.parseBizType(obj.bizType);
    obj.payStatus = settlementCommon.parsePayStatus(obj.payStatus);
    obj.partner = settlementCommon.parsePartner(obj.partner);
    obj.discountType = settlementCommon.parseDiscountType(obj.discountType);
    obj.reconciliationStatus = settlementCommon.parseReconciliationStatus(obj.reconciliationStatus);
    obj.reason = settlementCommon.parseReason(obj.reason);
  });
}


// 审核通过
$('#dataTable').on('click', '.btn-approval', function (e) {

  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/updateAcquiringCheck',
    type: 'POST',
    data: {id: $(this).data('id'), checkStatus: $(this).data('checkstatus'), version: $(this).data('version')},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert(res.meta.msg);
      return false;
    } else {
      alert('操作成功!');
      $('#popup-detail').modal('hide');
      $('#formSearch').trigger('submit');
    }
  });
});

$(document).on('click', '.modal button[type=submit]', function(event) {
  event.preventDefault();
  $('#popup-detail form').trigger('submit');
});

// 修改详情 "提交"
$(document).on('submit', '#popup-detail form', function(e) {
  e.preventDefault();

  if ($('#reconciliationStatus').val() == 1) {
    alert('收单对账状态不能为 ＂未对账＂！');
    return false;
  }

  if (!$('.modal form').parsley().isValid()) {
    return false;
  }

  var createTime = $('#createTime').val();

  var date = new Date(createTime);

  if (isNaN(date)) {
    alert('支付时间内容有错误, 请重新修改');
    return false;
  }

  $submitButton = $(this).find('button[type=submit]');

  var param = {
    id: $submitButton.data('id'),
    version: $submitButton.data('version'),
    createTime: createTime,
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
