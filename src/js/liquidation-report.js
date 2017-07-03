'use strict;'
var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _formCache = {};
var _querying = false;

var reportTable = {
  table: $('#reportTable'),
  keyMap : [
    {label: '生成时间', key: 'createTime', parseKey: function(item) {
    	return common.getDate(new Date(item.createTime));
    }},
    {label: '文件名', key: 'reportName'},
    {label: '操作', parseKey: function(item) {
    	return '<button class="btn btn-xs btn-default btn-download" data-url="' + item.reportPath + '">下载</button>';
    }}
  ],
};

$(function() {
	common.init('liquidation-report');
	pager.init($('#pager'));

	pager.pageIndex = 1;
	$('#formSearch').trigger('submit');
	$('#formReport').parsley();

	settlementCommon.setupDatetimePicker($('#report_startTime'));
	settlementCommon.setupDatetimePicker($('#report_endTime'));
  settlementCommon.formatTableWithData(reportTable);
});

$('#formSearch').on('submit', function(e) {
	e.preventDefault();

	if (_querying) return false;
	_querying = true;

	var param = {
		pageSize: pager.pageSize,
		pageIndex: pager.pageIndex,
	}

	if (_useCache) {
		param = _formCache;
		param.pageIndex = pager.pageIndex;
	} else {
		_formCache = param;
	}

  $.ajax({
    url: common.API_HOST + 'settlement/genReport/listReports',
    type: 'GET',
    dateType: 'json',
    data: param
  }).done(function(res) {
  	// res = JSON.parse(res);
    // if (settlementCommon.prehandleData(res)) {
   	if (!!~~res.meta.result) {
      pager.pageTotal = Math.ceil(res.data.reportCount / pager.pageSize);
      pager.setPager(res.data.reportCount, pager.pageIndex, res.data.reportList.length, pager.pageTotal);

      settlementCommon.formatTableWithData(reportTable, res.data.reportList);
    }
  }).always(function(res) {
  	_querying = false;
  });
});

$('#formReport').on('submit', function (e) {
	e.preventDefault()

  if (!$('#formReport').parsley().isValid()) {
    return false;
  }

	var reportType = $('#report_type').val();
	var reportUrl = '';
	switch (+reportType) {
		case 1:
		  reportUrl = 'saleSummary';
			break;
		case 2:
			reportUrl = 'diffDetail';
			break;
		case 3:
			reportUrl = 'merchantSettleDetail';
			break;
		default:
			break;
	}
	genReport(reportUrl, {
  	startDate: $('#report_startTime').val(),
  	endDate: $('#report_endTime').val(),
  	channelId: 3,
  });
});

function genReport(reportUrl, reportParam) {
	$.ajax({
		url: common.API_HOST + 'settlement/genReport/' + reportUrl,
		type: 'POST',
		dataType: 'json',
		data: reportParam,
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
			alert('操作成功，请稍后刷新页面查询');
			$('#formSearch').trigger('submit');
		} else {
			alert(res.meta.msg);
		}
	})
}

$('#reportTable').on('click', '.btn-download', function(e) {
	e.preventDefault();

	var url = $(this).data('url');
	console.log(url);
  window.location.href = common.API_HOST + 'settlement/downloadFile/downloadReport?path=' + url;
});

