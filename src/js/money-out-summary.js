/*
	 拨款汇总
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

var _DEBUG = true;

$(function() {

	common.liquidationInit('money-out-summary');

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
      url: 'MovieOps/settlement/merchantSummary/getMerchantSummaryList',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{"meta" : {"result" : "1","msg" : "操作成功"},"data" : {"total" : 2,"record" : [ {"appAmount" : 95,"merNo" : "308010700103175","merchantSummaryId" : 127,"accNo" : "78978","accName" : "光大银行某某账户","merName" : "测试商户","batchNum" : "20160704164343","appDate" : "2016-07-04","appStatus" : 7}, {"appAmount" : 190,"merNo" : "308010700103175","merchantSummaryId" : 128,"accNo" : "78978","accName" : "光大银行某某账户","merName" : "测试商户","batchNum" : "20160704164407","appDate" : "2016-07-04","appStatus" : 7} ]}}');
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
  // $('#search_dateType').val('');
  //  $('#search_startTime').val('');
  //  $('#search_endTime').val('');
  //  $('#search_merchantName').val('');
  //  $('#search_merchantNo').val('');
  //  $('#search_payStatus').val('');
  $('#formSearch :input:not(:button)').val('');
});

$('.btn-detail-reset').click(function(e) {
  $('#detailFormSearch :input:not(:button)').val('');
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
    var param = {'dateType': searchCache.dateType, 'beginTime': obj.createTime, 'merchantNo': obj.merchantNo, 'payStatus':obj.payStatusNo};
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


$('#dataTable').on('click', '.see-detail', function(e) {
  var rowIndex = $(this).closest('td').parent()[0].sectionRowIndex;
  var obj = dataCache[rowIndex];

  detailDataCache = {
    merchantSummaryId: obj.merchantSummaryId
  };

  var template = $('#detail-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, {});
  $('#popup-detail .modal-body').html(html);

  $('#popup-detail').modal('show');

  $('#detailFormSearch button[type=submit]').click();
});


/****************************************** detail *******************************************/
$('body').on('click', '#detailFormSearch button[type=submit]', function(e) {
  e.preventDefault();
  detailUseCache = false;
  detailPageIndex = 1;
  $('#detailFormSearch').trigger('submit');
});

$('body').on('submit', '#detailFormSearch', function(e) {
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

  if (_DEBUG) {
    $.ajax({
      url: 'MovieOps/settlement/appropriationInfo/getAppropriationInfoList',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function(res) {
      handleDetailData(res);
    });
  } else {
    // TODO: debug data
  }
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



