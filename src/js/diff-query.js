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
	settlementCommon.datetimepickerRegister($('#auto_beginTime'), $('#auto_endTime'));

	var todayDate = new Date();
  todayDate = common.getDate(todayDate);
  $('#search_beginDate').val(todayDate);
  $('#search_endDate').val(todayDate);
})

$('#formSearch').on('click', 'button[type=submit]', function(e) {
	e.preventDefault();
	$('#dataTable tbody').html('<tr><td colspan="30" align="center">查询中...</td></tr>');
	pager.pageIndex = 1;
	_useCache = false;
	$('#formSearch').trigger('submit');
});

$('#formSearch').submit(function(e) {
	e.preventDefault();

	if (_querying) return false;
	_querying = true;

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

	var param = {
		dateType: $('#search_dateType').val(),
		beginTime: $('#search_beginTime').val(),
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
		url: common.API_HOST + 'settlement/differAppend/queryDifferAppendList.json',
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
		if (res.data == null || res.data.rows.length < 1) {
			var html = '<tr><td colspan="30" align="center">查不到相关数据，请修改查询条件！</td></tr>';
			$('#dataTable tbody').html(html);
			$('#pager').html('');
		} else {
			useCache = true;
			var totalRecord = res.data.detail.count;
			var records = res.data.detail.records;
			pager.pageTotal = Math.ceil(totalRecord / pager.pageSize);
			pager.setPager(totalRecord, pager.pageIndex, records.length, pager.pageTotal);
		}
	}
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
