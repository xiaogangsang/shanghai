'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _formCache = {};
var _querying = false;

$(function () {
	common.init('diff-query');
	pager.init($('#pager'));
	// settlementCommon.datetimepickerRegister($('#search_start'), $('#search_endDate'));

	var todayDate = new Date();
  todayDate = common.getDate(todayDate);
  $('#search_startTime').val(todayDate);
  $('#search_endTime').val(todayDate);
})

$('#formSearch').on('click', 'button[type=submit]', function(e) {
	e.preventDefault();
	pager.pageIndex = 1;
	_useCache = false;
	$('#formSearch').trigger('submit');
});

$('#formSearch').submit(function(e) {
	e.preventDefault();

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

	if (_querying) return false;
	_querying = true;

	$('#dataTable tbody').html('<tr><td colspan="30" align="center">查询中...</td></tr>');

	var param = {
		startTime: $('#search_startTime').val(),
		endTime: $('#search_endTime').val(),
		differType: $('#search_diffType').val(),
		channelId: $('#search_channelId').val(),
		processStatus: $('#search_processStatus').val(),
		processType: $('#search_processType').val(),
		orderNo: $('search_orderNo').val(),
		number: $('search_number').val(),
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
		url: common.API_HOST + 'settlement/differAppend/queryDifferAppendList',
		type: 'POST',
		dataType: 'json',
		data: param,
	})
	.done(function(res) {
		handleData(res);
	})
});

function handleData(res) {
	_querying = false;
	if (!!~~res.meta.result) {
		if (res.data == null || res.data.detail.records.length < 1) {
			handleEmptyData(res);
		} else {
			useCache = true;
			var totalRecord = res.data.detail.count;
			var records = res.data.detail.records;
			_records = $.extend(true, {}, records);

			pager.pageTotal = Math.ceil(totalRecord / pager.pageSize);
			pager.setPager(totalRecord, pager.pageIndex, records.length, pager.pageTotal);

			_(records).forEach(function(item) {
				var today = new Date(item.settleDate);
				item.settleDate = common.getDate(today);
			});

			var template = $('#table-template').html();
			Mustache.parse(template);
			var html = Mustache.render(template, {rows: records});
			$('#dataTable tbody').html(html);
		}
	} else {
		handleEmptyData(res);
	}
}

function handleEmptyData (res) {
	var message = res.meta.msg;
	if (!!~~res.meta.result && res.data.detail.records.length < 1) {
		message = '查询成功，无记录。';
	}
	var html = '<tr><td colspan="30" align="center">' + message + '</td></tr>';
	$('#dataTable tbody').html(html);
	$('#pager').html('');
}

$('#btn-batch-delete').click(function(e) {
	e.preventDefault();

	if (!confirm('将删除选中的差异，是否确定？')) {
		return;
	}

	var deleteIds = [];

	$.ajax({
		url: common.API_HOST + 'settlement/differAppend/deleteDifferAppendList.json',
		type: 'GET',
		dataType: 'json',
		data: deleteIds
	})
	.done(function() {
	})
});

$('#btn-export').click(function(e) {
	e.preventDefault();
});
