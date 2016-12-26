'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _formCache = {};
var _querying = false;
var _records = {}

var _matched = {1 : '是', 2 : '否'};

$(function () {
	common.init('diff-operation');
	pager.init($('#pager'));
	settlementCommon.datetimepickerRegister($('#auto_startTime'), $('#auto_endTime'));
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

	var beginTime = $('#search_startTime').val();
	var endTime = $('#search_endTime').val();
	var orderNo = $('#search_orderNo').val();
	var matched = $('#search_matched').val();

	if (!(orderNo || (beginTime && endTime))) {
		alert('查询前请输入结算日期或交易订单号');
		return false;
	}

	if (_querying) return false;
	_querying = true;

	$('#dataTable tbody').html('<tr><td colspan="30" align="center">查询中...</td></tr>');

	var param = {
		startTime: beginTime,
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
		url: common.API_HOST + 'settlement/differDetail/queryDifferDetailList',
		type: 'GET',
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
				item.matched = _matched[item.matched];
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
		alert('导出前请输入结算日期或交易订单号');
		return false;
	}

	$('#hud-overlay').show();

	var param = {
		beginTime: beginTime,
		endTime: endTime,
		orderNo: orderNo,
		matched: matched,
	}

	$.ajax({
		url: common.API_HOST + 'settlement/differDetail/queryDefferDetailListExport',
		type: 'POST',
		dataType: 'json',
		data: param,
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
			var fileUrl = res.data.detail.fileUrl;
		}
		if (fileUrl && fileUrl.length > 0) {
			window.location.href = comon.API_HOST + 'settlement/differDetail/downloadDifferDetailList?fileUrl=' + fileUrl;
		}
	})
	.always(function() {
		$('#hud-overlay').hide();
	});

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

	$('#hud-overlay').show();

	$.ajax({
		url: common.API_HOST + 'settlement/differAppend/autoHandleDifferAppend',
		type: 'GET',
		dataType: 'json',
	})
	.done(function(res) {

	})
	.always(function () {
		$('#hud-overlay').hide();
	})
});

$('#formAutoDiff').submit(function(e) {
	e.preventDefault();

	$('#formAutoDiff').parsley().validate();
	if (!$('#formAutoDiff').parsley().isValid()) {
	    return false;
	}

	$('#hud-overlay').show();

	var param = {
		beginTime: $('#auto_beginTime').val(),
		endTime: $('#auto_endTime').val()
	}
	$.ajax({
		url: common.API_HOST +  'settlement/differDetail/autoHandleDifferDetail',
		type: 'GET',
		dataType: 'json',
		data: param
	})
	.done(function(res) {

	})
	.always(function () {
		$('#hud-overlay').hide();
	})

});

$('#btn-sync').click(function(e) {
	e.preventDefault();

	$.ajax({
		url: common.API_HOST + 'settlement/differDetail/syncShipmentInfoStatus/check',
		type: 'GET',
		dataType: 'json'
	})
	.done(function() {
		if (!!~~res.meta.result) {
			if (res.data.detail.checkStatus) {
				$.ajax({
					url: common.API_HOST + 'settlement/differDetail/syncShipmentInfoStatus',
					type: 'GET',
					dataType: 'json',
				})
				.done(function() {
					console.log("success");
				})
			}
		}
	})
});

$('body').on('change', 'tr > td :checkbox', function(e) {
  e.preventDefault();

  var isChecked = $(this).is(':checked');
  if (!isChecked) {
    $('.multi-check-all').prop('checked', false);
  }
});