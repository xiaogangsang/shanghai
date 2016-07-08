/*
	 拨款日志
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

var detailUseCache = false;
var detailDataCache;
var detailPageIndex = 1;
var detailPageTotal = 0;

var _DEBUG = false;

$(function() {

	common.liquidationInit('money-out-log');

	$('#search_startDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endDate').datetimepicker('setStartDate', startDate);
  });

  $('#search_endDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_startDate').datetimepicker('setEndDate', FromEndDate);
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
    startDate: $('#search_startDate').val(),
    endDate: $('#search_endDate').val(),
    operator: $('#search_operator').val(),
    batchNum: $('#search_batchNum').val(),
    merNo: $('#search_merNo').val(),
    operation: $('#search_operation').val(),
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
      url: 'MovieOps/settlement/operateRecord/getAppRecord',
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
		if (res.data == null || res.data.detail.recordCount < 1) {
      var errorMsg = res.meta.msg;
      $('#dataTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#summaryTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#pager').html('');
		} else {
			useCache = true;

			var totalRecord = res.data.detail.recordCount;
      var record = res.data.detail.recordDetail;

      _pageTotal = Math.ceil(totalRecord / _pageSize);
      setPager(totalRecord, _pageIndex, record.length, _pageTotal);

      _(record).forEach(function(item) {
      	// item.chargeMerchant = parseMerchant(item.chargeMerchant);
       //  item.payStatusNo = item.payStatus;
      	// item.payStatus = parsePayStatus(item.payStatus);
       //  item.appStatus = parseMoneyOutStatus(item.appStatus);
       item.operation = parseOperation(item.operation);
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
  // $('#search_dateType').val('');
  //  $('#search_startTime').val('');
  //  $('#search_endTime').val('');
  //  $('#search_merchantName').val('');
  //  $('#search_merchantNo').val('');
  //  $('#search_payStatus').val('');
  $('#formSearch :input:not(:button)').val('');
});



/****************************************** Utilities Method **********************************************/

function parseOperation(operation) {
  var map = {'1' : '银行退票', '2' : '重拨'};
  return map[type];
}



