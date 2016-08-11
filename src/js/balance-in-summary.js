/*
  收单对账汇总
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
var dataCache;

// _DEBUG 本地JSON字符串, 不连服务器本地调试用
var _DEBUG = false;

$(function() {

  common.init('balance-in-summary');

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
    var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : { "summary" : { "totalSubsidyAmountO2o" : "20598", "totalBankAmount" : "0", "totalServiceAmount" : "0", "totalReturnFee" : "0", "totalO2oReceivableAmount" : "24000", "totalTicketAmount" : "9002", "totalOrderCount" : "27" }, "detail" : { "records" : [ { "date" : "2016-07-11", "subsidyAmountO2o" : 65658, "bankAmount" : 0, "ticketAmount" : 31942, "chargeMerchant" : 1, "dateType" : "payDate", "serviceAmount" : 0, "chargeMerchantNo" : "7652345", "o2oReceivableAmount" : 46940, "payStatus" : 2 }, { "date" : "2016-07-11", "subsidyAmountO2o" : -48859, "bankAmount" : 0, "ticketAmount" : -22941, "chargeMerchant" : 1, "dateType" : "payDate", "returnFee" : 0, "chargeMerchantNo" : "7652345", "o2oReceivableAmount" : -22941, "payStatus" : 5 }, { "date" : "2016-07-11", "subsidyAmountO2o" : 28395, "bankAmount" : 0, "ticketAmount" : 5, "chargeMerchant" : 2, "dateType" : "payDate", "serviceAmount" : 0, "chargeMerchantNo" : "3243", "o2oReceivableAmount" : 5, "payStatus" : 2 }, { "date" : "2016-07-11", "subsidyAmountO2o" : -24596, "bankAmount" : 0, "ticketAmount" : -4, "chargeMerchant" : 2, "dateType" : "payDate", "returnFee" : 0, "chargeMerchantNo" : "3243", "o2oReceivableAmount" : -4, "payStatus" : 5 } ], "count" : 4 } } }');
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
      item.chargeMerchant = settlementCommon.parseMerchant(item.chargeMerchant);
      item.payStatusNo = item.payStatus;
      item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
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
    var param = {'dateType': searchCache.dateType, 'beginTime': obj.date, 'chargeMerchantNo': obj.chargeMerchantNo, 'payStatus':obj.payStatusNo};
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
