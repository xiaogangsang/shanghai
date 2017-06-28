'use strict;'
var common = require('common');
var settlementCommon = require('settlementCommon');

var reportTable = {
  table: $('#reportTable'), 
  keyMap : [
    {label: '文件名', key: 'chargeMerchantNo'},
    {label: '生成时间', key: 'acquiringOrderType', parseKey: '.'},
    {label: '操作', parseKey: function(item) {
    	return '<a class="download" data-url="' + item.fileUrl + '">下载</a>'
    }}
  ],
};

$(function() {
	common.init('liquidation-report');
	$('#formSearch').parsley();
	settlementCommon.setupDatetimePicker($('#report_startTime'));
	settlementCommon.setupDatetimePicker($('#report_endTime'));
  settlementCommon.formatTableWithData(reportTable);

  $.ajax({
    url: common.API_HOST + 'settlement/genReport/listReports',
    type: 'GET',
    dateType: 'json',
  }).done(function(res) {
    handleData(res);
  });
});

function handleData(res) {
	console.log(res)
}

$('#formSearch').on('submit', function (e) {
	e.preventDefault()

  if (!$('#formSearch').parsley().isValid()) {
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
  	startDate: $('report_startTime').val(),
  	endDate: $('report_endTime').val(),
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
		console.log(res);
	})
}

