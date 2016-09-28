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

var balanceIn = false;

// _DEBUG 本地JSON字符串, 不连服务器本地调试用
var _DEBUG = false;

$(function() {

  var location = window.location.href;

  var parts = location.split('/');

  var html = parts[parts.length - 1];

  balanceIn = (html.indexOf('balance-in') > -1);

  if (balanceIn) {
    common.init('balance-in-file-operate-result');
  } else {
    common.init('balance-out-file-operate-result');
  }

  $('#search_status').html(settlementCommon.optionsHTML(settlementCommon.balanceFileStatus, true));

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

  _pageSize = $('#search_pageSize').val() || 10;

  var sendData = {
    fileType: (balanceIn ? '1' : '2'),
    beginTime: $('#search_startTime').val(),
    endTime: $('#search_endTime').val(),
    fileStatus: $('#search_status').val(),
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
      url: common.API_HOST + 'settlement/batchUploadFileRecord/selectByCondition',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : {"detail": {"records":[{"fileName":"153311629.xls","finishTime":"2016-09-22","createTime":"2016-09-22","fileStatus":"3","id":"11","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-22","createTime":"2016-09-22","fileStatus":"3","id":"12","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-22","createTime":"2016-09-22","fileStatus":"3","id":"13","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-22","createTime":"2016-09-22","fileStatus":"3","id":"14","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-22","createTime":"2016-09-22","fileStatus":"3","id":"15","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-22","createTime":"2016-09-22","fileStatus":"3","id":"16","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-22","createTime":"2016-09-22","fileStatus":"3","id":"17","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-23","createTime":"2016-09-23","fileStatus":"3","id":"18","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-23","createTime":"2016-09-23","fileStatus":"3","id":"19","userId":"1111","fileType":"1"},{"fileName":"153311629.xls","finishTime":"2016-09-23","createTime":"2016-09-23","fileStatus":"3","id":"20","userId":"1111","fileType":"1"}],"count":29 } }}');
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
      item.fileType = settlementCommon.parseBalanceFileType(item.fileType);
      item.fileStatus = settlementCommon.parseBalanceFileStatus(item.fileStatus);
    });

    dataCache = record;

    setTableData(dataCache);
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
