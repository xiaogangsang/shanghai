'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _formCache = {};
var _querying = false;

$(function () {
	common.init('diff-operation');
	pager.init($('#pager'));
})

$('#formSearch').on('click', 'button[type=sumbit]', function(e) {
	e.preventDefault();
	$('#dataTable tbody').html('<tr><td colspan="30" align="center">查询中...</td></tr>');
	pager.pageIndex = 1;
	_useCache = false;
	$('#formSearch').trigger('sumbit');
});

$('#formSearch').submit(function(e) {
	e.preventDefault();

	if (_querying) return false;
	_querying = true;

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

	var beginTime = $('#search_startTime').val();
	var endTime = $('#search_endTime').val();
	var orderNo = $('#search_orderNo').val();
	var matched = $('#search_matched').val();

	if (!(orderNo || (beginTime && endTime))) {
		alert('查询前请输入结算日期或交易订单号');
		return false;
	}

	var param = {
		beginTime: beginTime,
		endTime: endTime,
		orderNo: orderNo,
		matched: matched,
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
		url: common.API_HOST + 'settle/differDetail/queryDifferDetailList.json',
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

$('#btn-export').click(function(e) {
	e.preventDefault();

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

	var beginTime = $('#search_startTime').val();
	var endTime = $('#search_endTime').val();
	var orderNo = $('#search_orderNo').val();
	var matched = $('#search_matched').val();

	if (!(orderNo || (beginTime && endTime))) {
		alert('查询前请输入结算日期或交易订单号');
		return false;
	}

	var param = {
		beginTime: beginTime,
		endTime: endTime,
		orderNo: orderNo,
		matched: matched
	}

	$.ajax({
		url: common.API_HOST + 'settle/differDetail/queryDefferDetailListExport.json',
		type: 'POST',
		dataType: 'json',
		data: param,
	})
	.done(function() {
		if (!!~~res.meta.result) {
			var fileUrl = res.data.detail.fileUrl;
		}
		if (fileUrl && fileUrl.length > 0) {
			window.location.href = comon.API_HOST + 'settle/differDetail/downloadDifferDetailList.json?fileUrl=' + fileUrl;
		}
	})
	

	if ($('#diffTable tbody tr').length < 1) {
		alert('请先查询再进行此操作!');
		return false;
	}
});

$('#btn-batch').click(function(e) {
	e.preventDefault();

	if ($('#diffTable tbody tr').length < 1) {
		alert('请先查询再进行此操作!');
		return false;
	}

	if (!confirm('即将开始运算，可能需要几分钟，请稍等，系统运算过程中请勿操作系统。')) {
		return;
	}
});