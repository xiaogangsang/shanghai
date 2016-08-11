/*
  出货对账汇总
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
var dataCache;

// _DEBUG 本地JSON字符串, 不连服务器本地调试用
var _DEBUG = false;

$(function() {

  common.init('balance-out-summary');

  $('#formSearch').parsley();
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

  // a new search triggered by clicking '查询'
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
      url: common.API_HOST + 'settlement/shipmentInfo/summaryList',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalOrderAmount": "交易金额总金额", "totalSubsidyAmountO2o": "补贴金额", "totalReturnFee": "退货手续费总额", "totalSettleAmount": "应付金额", "totalFinalSettleAmount": "实付金额" }, "detail": { "recordCount": "41", "recordDetail": [ { "shipmentDate": "出/退货日期", "merchantName": "二级商户名称", "merchantNo": "二级商户号", "bizType": "业务类别", "orderCount": "订单数", "ticketCount": "张数", "shipmentStatus": "出货状态", "orderAmount": "交易金额", "subsidyAmountO2o": "渠道方补贴金额", "returnFee": "退票手续费", "settleAmount": "应付金额", "finalSettleAmount": "实付金额" } ] } } }');
    handleData(res);
  }

  return false;
});

function handleData(res) {
  _querying = false;

  if (settlementCommon.prehandleData(res)) {
    useCache = true;

    var totalRecord = res.data.detail.count;
    var record = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, record.length, _pageTotal);

    _(record).forEach(function(item) {
      item.bizTypeNo = item.bizType;
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.shipmentStatusNo = item.shipmentStatus;
      item.shipmentStatus = settlementCommon.parseShipmentStatus(item.shipmentStatus);
    });

    dataCache = record;

    setTableData(dataCache);

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

 $('#search_dateType').val('1');
});

$('.all-detail').click(function(e) {
  var data = {'type': 0, 'param': searchCache};
  sessionStorage.setItem('param', JSON.stringify(data));
  window.location.href = 'balance-out-detail.html';
});

$('.selected-detail').click(function(e) {
  var parameters = [];

  $('#dataTable tbody :checkbox:checked').each(function(index) {
    var rowIndex = $(this).closest('td').parent()[0].sectionRowIndex;
    var obj = dataCache[rowIndex];
    var param = {'shipmentDate': obj.shipmentDate, 'merchantNo': obj.merchantNo, 'bizType': obj.bizTypeNo ,'shipmentStatus':obj.shipmentStatusNo};
    parameters.push(param);
  });

  var data = {'type': 1, 'param': parameters};
  sessionStorage.setItem('param', JSON.stringify(data));
  window.location.href = 'balance-out-detail.html';
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
