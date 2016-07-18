/*
  出货对账汇总
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
var dataCache;
var _submitting = false;

var _DEBUG = false;

$(function() {

  common.init('balance-out-summary');

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
      // data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalOrderAmount": "交易金额总金额", "totalSubsidyAmountO2o": "补贴金额", "totalReturnFee": "退货手续费总额", "totalSettlementAmount": "应付金额", "totalFinalSettlementAmount": "实付金额" }, "detail": { "recordCount": "41", "recordDetail": [ { "shipmentDate": "出/退货日期", "merchantName": "二级商户名称", "merchantNo": "二级商户号", "bizType": "业务类别", "orderCount": "订单数", "ticketCount": "张数", "shipmentStatus": "出货状态", "orderAmount": "交易金额", "subsidyAmountO2o": "我方补贴金额", "returnFee": "退票手续费", "settlementAmount": "应付金额", "finalSettlementAmount": "实付金额" } ] } } }');
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
        item.bizTypeNo = item.bizType;
        item.bizType = parseBizType(item.bizType);
        item.shipmentStatusNo = item.shipmentStatus;
        item.shipmentStatus = parseShipmentStatus(item.shipmentStatus);
      });

      // record[1] = record[0];
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


/****************************************** Utilities Method **********************************************/

function parseShipmentStatus(status) {
  var map = {'1' : '未出货(初始化状态)', '2' : '出货成功', '3' : '出货失败', '4' : '出货中', '5' : '待定', '6' : '待定', '7' : '退货成功', '8' : '退货失败'};

  return map[status];
}

function parseBizType(type) {
  var map = {'1' : '在线选座', '2' : '退货手续费'};

  return map[type];
}




